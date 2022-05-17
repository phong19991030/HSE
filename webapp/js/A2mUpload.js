//var uploadDefaultOpt= loadScript("uploadConfig.js", uploadDefaultOpt);

//var imported = document.createElement('script');
//imported.src = '../uploadConfig.js';
//document.head.appendChild(imported);

/*
* jQuery File Download Plugin v1.4.5
*
* http://www.johnculviner.com
*
* Copyright (c) 2013 - John Culviner
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* !!!!NOTE!!!!
* You must also write a cookie in conjunction with using this plugin as mentioned in the orignal post:
* http://johnculviner.com/jquery-file-download-plugin-for-ajax-like-feature-rich-file-downloads/
* !!!!NOTE!!!!
*/
(function($,window){var htmlSpecialCharsRegEx=/[<>&\r\n"']/gm;var htmlSpecialCharsPlaceHolders={'<':'lt;','>':'gt;','&':'amp;','\r':"#13;",'\n':"#10;",'"':'quot;',"'":'#39;'};$.extend({fileDownload:function(fileUrl,options){var settings=$.extend({preparingMessageHtml:null,failMessageHtml:null,androidPostUnsupportedMessageHtml:"Unfortunately your Android browser doesn't support this type of file download. Please try again with a different browser.",dialogOptions:{modal:true},prepareCallback:function(url){},successCallback:function(url){},abortCallback:function(url){},failCallback:function(responseHtml,url,error){},httpMethod:"GET",data:null,checkInterval:100,cookieName:"fileDownload",cookieValue:"true",cookiePath:"/",cookieDomain:null,popupWindowTitle:"Initiating file download...",encodeHTMLEntities:true},options);var deferred=new $.Deferred();var userAgent=(navigator.userAgent||navigator.vendor||window.opera).toLowerCase();var isIos;var isAndroid;var isOtherMobileBrowser;if(/ip(ad|hone|od)/.test(userAgent)){isIos=true}else if(userAgent.indexOf('android')!==-1){isAndroid=true}else{isOtherMobileBrowser=/avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|playbook|silk|iemobile|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0,4))}var httpMethodUpper=settings.httpMethod.toUpperCase();if(isAndroid&&httpMethodUpper!=="GET"&&settings.androidPostUnsupportedMessageHtml){if($().dialog){$("<div>").html(settings.androidPostUnsupportedMessageHtml).dialog(settings.dialogOptions)}else{alert(settings.androidPostUnsupportedMessageHtml)}return deferred.reject()}var $preparingDialog=null;var internalCallbacks={onPrepare:function(url){if(settings.preparingMessageHtml){$preparingDialog=$("<div>").html(settings.preparingMessageHtml).dialog(settings.dialogOptions)}else if(settings.prepareCallback){settings.prepareCallback(url)}},onSuccess:function(url){if($preparingDialog){$preparingDialog.dialog('close')}settings.successCallback(url);deferred.resolve(url)},onAbort:function(url){if($preparingDialog){$preparingDialog.dialog('close')};settings.abortCallback(url);deferred.reject(url)},onFail:function(responseHtml,url,error){if($preparingDialog){$preparingDialog.dialog('close')}if(settings.failMessageHtml){$("<div>").html(settings.failMessageHtml).dialog(settings.dialogOptions)}settings.failCallback(responseHtml,url,error);deferred.reject(responseHtml,url)}};internalCallbacks.onPrepare(fileUrl);if(settings.data!==null&&typeof settings.data!=="string"){settings.data=$.param(settings.data)}var $iframe,downloadWindow,formDoc,$form;if(httpMethodUpper==="GET"){if(settings.data!==null){var qsStart=fileUrl.indexOf('?');if(qsStart!==-1){if(fileUrl.substring(fileUrl.length-1)!=="&"){fileUrl=fileUrl+"&"}}else{fileUrl=fileUrl+"?"}fileUrl=fileUrl+settings.data}if(isIos||isAndroid){downloadWindow=window.open(fileUrl);downloadWindow.document.title=settings.popupWindowTitle;window.focus()}else if(isOtherMobileBrowser){window.location(fileUrl)}else{$iframe=$("<iframe>").hide().prop("src",fileUrl).appendTo("body")}}else{var formInnerHtml="";if(settings.data!==null){$.each(settings.data.replace(/\+/g,' ').split("&"),function(){var kvp=this.split("=");var k=kvp[0];kvp.shift();var v=kvp.join("=");kvp=[k,v];var key=settings.encodeHTMLEntities?htmlSpecialCharsEntityEncode(decodeURIComponent(kvp[0])):decodeURIComponent(kvp[0]);if(key){var value=settings.encodeHTMLEntities?htmlSpecialCharsEntityEncode(decodeURIComponent(kvp[1])):decodeURIComponent(kvp[1]);formInnerHtml+='<input type="hidden" name="'+key+'" value="'+value+'" />'}})}if(isOtherMobileBrowser){$form=$("<form>").appendTo("body");$form.hide().prop('method',settings.httpMethod).prop('action',fileUrl).html(formInnerHtml)}else{if(isIos){downloadWindow=window.open("about:blank");downloadWindow.document.title=settings.popupWindowTitle;formDoc=downloadWindow.document;window.focus()}else{$iframe=$("<iframe style='display: none' src='about:blank'></iframe>").appendTo("body");formDoc=getiframeDocument($iframe)}formDoc.write("<html><head></head><body><form method='"+settings.httpMethod+"' action='"+fileUrl+"'>"+formInnerHtml+"</form>"+settings.popupWindowTitle+"</body></html>");$form=$(formDoc).find('form')}$form.submit()}setTimeout(checkFileDownloadComplete,settings.checkInterval);function checkFileDownloadComplete(){var cookieValue=settings.cookieValue;if(typeof cookieValue=='string'){cookieValue=cookieValue.toLowerCase()}var lowerCaseCookie=settings.cookieName.toLowerCase()+"="+cookieValue;if(document.cookie.toLowerCase().indexOf(lowerCaseCookie)>-1){internalCallbacks.onSuccess(fileUrl);var cookieData=settings.cookieName+"=; path="+settings.cookiePath+"; expires="+new Date(0).toUTCString()+";";if(settings.cookieDomain)cookieData+=" domain="+settings.cookieDomain+";";document.cookie=cookieData;cleanUp(false);return}if(downloadWindow||$iframe){try{var formDoc=downloadWindow?downloadWindow.document:getiframeDocument($iframe);if(formDoc&&formDoc.body!==null&&formDoc.body.innerHTML.length){var isFailure=true;if($form&&$form.length){var $contents=$(formDoc.body).contents().first();try{if($contents.length&&$contents[0]===$form[0]){isFailure=false}}catch(e){if(e&&e.number==-2146828218){isFailure=true}else{throw e;}}}if(isFailure){setTimeout(function(){internalCallbacks.onFail(formDoc.body.innerHTML,fileUrl);cleanUp(true)},100);return}}}catch(err){internalCallbacks.onFail('',fileUrl,err);cleanUp(true);return}}setTimeout(checkFileDownloadComplete,settings.checkInterval)}function getiframeDocument($iframe){var iframeDoc=$iframe[0].contentWindow||$iframe[0].contentDocument;if(iframeDoc.document){iframeDoc=iframeDoc.document}return iframeDoc}function cleanUp(isFailure){setTimeout(function(){if(downloadWindow){if(isAndroid){downloadWindow.close()}if(isIos){if(downloadWindow.focus){downloadWindow.focus();if(isFailure){downloadWindow.close()}}}}},0)}function htmlSpecialCharsEntityEncode(str){return str.replace(htmlSpecialCharsRegEx,function(match){return'&'+htmlSpecialCharsPlaceHolders[match]})}var promise=deferred.promise();promise.abort=function(){cleanUp();$iframe.attr('src','').html('');internalCallbacks.onAbort(fileUrl)};return promise}})})(jQuery,this||window);
/* sweet alert */
!function(e,t,n){"use strict";!function o(e,t,n){function a(s,l){if(!t[s]){if(!e[s]){var i="function"==typeof require&&require;if(!l&&i)return i(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[s]={exports:{}};e[s][0].call(c.exports,function(t){var n=e[s][1][t];return a(n?n:t)},c,c.exports,o,e,t,n)}return t[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)a(n[s]);return a}({1:[function(o,a,r){var s=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(r,"__esModule",{value:!0});var l,i,u,c,d=o("./modules/handle-dom"),f=o("./modules/utils"),p=o("./modules/handle-swal-dom"),m=o("./modules/handle-click"),v=o("./modules/handle-key"),y=s(v),h=o("./modules/default-params"),b=s(h),g=o("./modules/set-params"),w=s(g);r["default"]=u=c=function(){function o(e){var t=a;return t[e]===n?b["default"][e]:t[e]}var a=arguments[0];if(d.addClass(t.body,"stop-scrolling"),p.resetInput(),a===n)return f.logStr("SweetAlert expects at least 1 attribute!"),!1;var r=f.extend({},b["default"]);switch(typeof a){case"string":r.title=a,r.text=arguments[1]||"",r.type=arguments[2]||"";break;case"object":if(a.title===n)return f.logStr('Missing "title" argument!'),!1;r.title=a.title;for(var s in b["default"])r[s]=o(s);r.confirmButtonText=r.showCancelButton?"Confirm":b["default"].confirmButtonText,r.confirmButtonText=o("confirmButtonText"),r.doneFunction=arguments[1]||null;break;default:return f.logStr('Unexpected type of argument! Expected "string" or "object", got '+typeof a),!1}w["default"](r),p.fixVerticalPosition(),p.openModal(arguments[1]);for(var u=p.getModal(),v=u.querySelectorAll("button"),h=["onclick","onmouseover","onmouseout","onmousedown","onmouseup","onfocus"],g=function(e){return m.handleButton(e,r,u)},C=0;C<v.length;C++)for(var S=0;S<h.length;S++){var x=h[S];v[C][x]=g}p.getOverlay().onclick=g,l=e.onkeydown;var k=function(e){return y["default"](e,r,u)};e.onkeydown=k,e.onfocus=function(){setTimeout(function(){i!==n&&(i.focus(),i=n)},0)},c.enableButtons()},u.setDefaults=c.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");f.extend(b["default"],e)},u.close=c.close=function(){var o=p.getModal();d.fadeOut(p.getOverlay(),5),d.fadeOut(o,5),d.removeClass(o,"showSweetAlert"),d.addClass(o,"hideSweetAlert"),d.removeClass(o,"visible");var a=o.querySelector(".sa-icon.sa-success");d.removeClass(a,"animate"),d.removeClass(a.querySelector(".sa-tip"),"animateSuccessTip"),d.removeClass(a.querySelector(".sa-long"),"animateSuccessLong");var r=o.querySelector(".sa-icon.sa-error");d.removeClass(r,"animateErrorIcon"),d.removeClass(r.querySelector(".sa-x-mark"),"animateXMark");var s=o.querySelector(".sa-icon.sa-warning");return d.removeClass(s,"pulseWarning"),d.removeClass(s.querySelector(".sa-body"),"pulseWarningIns"),d.removeClass(s.querySelector(".sa-dot"),"pulseWarningIns"),setTimeout(function(){var e=o.getAttribute("data-custom-class");d.removeClass(o,e)},300),d.removeClass(t.body,"stop-scrolling"),e.onkeydown=l,e.previousActiveElement&&e.previousActiveElement.focus(),i=n,clearTimeout(o.timeout),!0},u.showInputError=c.showInputError=function(e){var t=p.getModal(),n=t.querySelector(".sa-input-error");d.addClass(n,"show");var o=t.querySelector(".sa-error-container");d.addClass(o,"show"),o.querySelector("p").innerHTML=e,setTimeout(function(){u.enableButtons()},1),t.querySelector("input").focus()},u.resetInputError=c.resetInputError=function(e){if(e&&13===e.keyCode)return!1;var t=p.getModal(),n=t.querySelector(".sa-input-error");d.removeClass(n,"show");var o=t.querySelector(".sa-error-container");d.removeClass(o,"show")},u.disableButtons=c.disableButtons=function(){var e=p.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!0,n.disabled=!0},u.enableButtons=c.enableButtons=function(){var e=p.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!1,n.disabled=!1},"undefined"!=typeof e?e.sweetAlert=e.swal=u:f.logStr("SweetAlert is a frontend module!"),a.exports=r["default"]},{"./modules/default-params":2,"./modules/handle-click":3,"./modules/handle-dom":4,"./modules/handle-key":5,"./modules/handle-swal-dom":6,"./modules/set-params":8,"./modules/utils":9}],2:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o={title:"",text:"",type:null,allowOutsideClick:!1,showConfirmButton:!0,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#8CD4F5",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null,customClass:"",html:!1,animation:!0,allowEscapeKey:!0,inputType:"text",inputPlaceholder:"",inputValue:"",showLoaderOnConfirm:!1};n["default"]=o,t.exports=n["default"]},{}],3:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=t("./utils"),r=(t("./handle-swal-dom"),t("./handle-dom")),s=function(t,n,o){function s(e){m&&n.confirmButtonColor&&(p.style.backgroundColor=e)}var u,c,d,f=t||e.event,p=f.target||f.srcElement,m=-1!==p.className.indexOf("confirm"),v=-1!==p.className.indexOf("sweet-overlay"),y=r.hasClass(o,"visible"),h=n.doneFunction&&"true"===o.getAttribute("data-has-done-function");switch(m&&n.confirmButtonColor&&(u=n.confirmButtonColor,c=a.colorLuminance(u,-.04),d=a.colorLuminance(u,-.14)),f.type){case"mouseover":s(c);break;case"mouseout":s(u);break;case"mousedown":s(d);break;case"mouseup":s(c);break;case"focus":var b=o.querySelector("button.confirm"),g=o.querySelector("button.cancel");m?g.style.boxShadow="none":b.style.boxShadow="none";break;case"click":var w=o===p,C=r.isDescendant(o,p);if(!w&&!C&&y&&!n.allowOutsideClick)break;m&&h&&y?l(o,n):h&&y||v?i(o,n):r.isDescendant(o,p)&&"BUTTON"===p.tagName&&sweetAlert.close()}},l=function(e,t){var n=!0;r.hasClass(e,"show-input")&&(n=e.querySelector("input").value,n||(n="")),t.doneFunction(n),t.closeOnConfirm&&sweetAlert.close(),t.showLoaderOnConfirm&&sweetAlert.disableButtons()},i=function(e,t){var n=String(t.doneFunction).replace(/\s/g,""),o="function("===n.substring(0,9)&&")"!==n.substring(9,10);o&&t.doneFunction(!1),t.closeOnCancel&&sweetAlert.close()};o["default"]={handleButton:s,handleConfirm:l,handleCancel:i},n.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],4:[function(n,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},s=function(e,t){r(e,t)||(e.className+=" "+t)},l=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(r(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},i=function(e){var n=t.createElement("div");return n.appendChild(t.createTextNode(e)),n.innerHTML},u=function(e){e.style.opacity="",e.style.display="block"},c=function(e){if(e&&!e.length)return u(e);for(var t=0;t<e.length;++t)u(e[t])},d=function(e){e.style.opacity="",e.style.display="none"},f=function(e){if(e&&!e.length)return d(e);for(var t=0;t<e.length;++t)d(e[t])},p=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},m=function(e){e.style.left="-9999px",e.style.display="block";var t,n=e.clientHeight;return t="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(e).getPropertyValue("padding-top"),10):parseInt(e.currentStyle.padding),e.style.left="",e.style.display="none","-"+parseInt((n+t)/2)+"px"},v=function(e,t){if(+e.style.opacity<1){t=t||16,e.style.opacity=0,e.style.display="block";var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(o,t)});o()}e.style.display="block"},y=function(e,t){t=t||16,e.style.opacity=1;var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(o,t):e.style.display="none"});o()},h=function(n){if("function"==typeof MouseEvent){var o=new MouseEvent("click",{view:e,bubbles:!1,cancelable:!0});n.dispatchEvent(o)}else if(t.createEvent){var a=t.createEvent("MouseEvents");a.initEvent("click",!1,!1),n.dispatchEvent(a)}else t.createEventObject?n.fireEvent("onclick"):"function"==typeof n.onclick&&n.onclick()},b=function(t){"function"==typeof t.stopPropagation?(t.stopPropagation(),t.preventDefault()):e.event&&e.event.hasOwnProperty("cancelBubble")&&(e.event.cancelBubble=!0)};a.hasClass=r,a.addClass=s,a.removeClass=l,a.escapeHtml=i,a._show=u,a.show=c,a._hide=d,a.hide=f,a.isDescendant=p,a.getTopMargin=m,a.fadeIn=v,a.fadeOut=y,a.fireClick=h,a.stopEventPropagation=b},{}],5:[function(t,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=t("./handle-dom"),s=t("./handle-swal-dom"),l=function(t,o,a){var l=t||e.event,i=l.keyCode||l.which,u=a.querySelector("button.confirm"),c=a.querySelector("button.cancel"),d=a.querySelectorAll("button[tabindex]");if(-1!==[9,13,32,27].indexOf(i)){for(var f=l.target||l.srcElement,p=-1,m=0;m<d.length;m++)if(f===d[m]){p=m;break}9===i?(f=-1===p?u:p===d.length-1?d[0]:d[p+1],r.stopEventPropagation(l),f.focus(),o.confirmButtonColor&&s.setFocusStyle(f,o.confirmButtonColor)):13===i?("INPUT"===f.tagName&&(f=u,u.focus()),f=-1===p?u:n):27===i&&o.allowEscapeKey===!0?(f=c,r.fireClick(f,l)):f=n}};a["default"]=l,o.exports=a["default"]},{"./handle-dom":4,"./handle-swal-dom":6}],6:[function(n,o,a){var r=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(a,"__esModule",{value:!0});var s=n("./utils"),l=n("./handle-dom"),i=n("./default-params"),u=r(i),c=n("./injected-html"),d=r(c),f=".sweet-alert",p=".sweet-overlay",m=function(){var e=t.createElement("div");for(e.innerHTML=d["default"];e.firstChild;)t.body.appendChild(e.firstChild)},v=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var e=t.querySelector(f);return e||(m(),e=v()),e}),y=function(){var e=v();return e?e.querySelector("input"):void 0},h=function(){return t.querySelector(p)},b=function(e,t){var n=s.hexToRgb(t);e.style.boxShadow="0 0 2px rgba("+n+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"},g=function(n){var o=v();l.fadeIn(h(),10),l.show(o),l.addClass(o,"showSweetAlert"),l.removeClass(o,"hideSweetAlert"),e.previousActiveElement=t.activeElement;var a=o.querySelector("button.confirm");a.focus(),setTimeout(function(){l.addClass(o,"visible")},500);var r=o.getAttribute("data-timer");if("null"!==r&&""!==r){var s=n;o.timeout=setTimeout(function(){var e=(s||null)&&"true"===o.getAttribute("data-has-done-function");e?s(null):sweetAlert.close()},r)}},w=function(){var e=v(),t=y();l.removeClass(e,"show-input"),t.value=u["default"].inputValue,t.setAttribute("type",u["default"].inputType),t.setAttribute("placeholder",u["default"].inputPlaceholder),C()},C=function(e){if(e&&13===e.keyCode)return!1;var t=v(),n=t.querySelector(".sa-input-error");l.removeClass(n,"show");var o=t.querySelector(".sa-error-container");l.removeClass(o,"show")},S=function(){var e=v();e.style.marginTop=l.getTopMargin(v())};a.sweetAlertInitialize=m,a.getModal=v,a.getOverlay=h,a.getInput=y,a.setFocusStyle=b,a.openModal=g,a.resetInput=w,a.resetInputError=C,a.fixVerticalPosition=S},{"./default-params":2,"./handle-dom":4,"./injected-html":7,"./utils":9}],7:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>';n["default"]=o,t.exports=n["default"]},{}],8:[function(e,t,o){Object.defineProperty(o,"__esModule",{value:!0});var a=e("./utils"),r=e("./handle-swal-dom"),s=e("./handle-dom"),l=["error","warning","info","success","input","prompt"],i=function(e){var t=r.getModal(),o=t.querySelector("h2"),i=t.querySelector("p"),u=t.querySelector("button.cancel"),c=t.querySelector("button.confirm");if(o.innerHTML=e.html?e.title:s.escapeHtml(e.title).split("\n").join("<br>"),i.innerHTML=e.html?e.text:s.escapeHtml(e.text||"").split("\n").join("<br>"),e.text&&s.show(i),e.customClass)s.addClass(t,e.customClass),t.setAttribute("data-custom-class",e.customClass);else{var d=t.getAttribute("data-custom-class");s.removeClass(t,d),t.setAttribute("data-custom-class","")}if(s.hide(t.querySelectorAll(".sa-icon")),e.type&&!a.isIE8()){var f=function(){for(var o=!1,a=0;a<l.length;a++)if(e.type===l[a]){o=!0;break}if(!o)return logStr("Unknown alert type: "+e.type),{v:!1};var i=["success","error","warning","info"],u=n;-1!==i.indexOf(e.type)&&(u=t.querySelector(".sa-icon.sa-"+e.type),s.show(u));var c=r.getInput();switch(e.type){case"success":s.addClass(u,"animate"),s.addClass(u.querySelector(".sa-tip"),"animateSuccessTip"),s.addClass(u.querySelector(".sa-long"),"animateSuccessLong");break;case"error":s.addClass(u,"animateErrorIcon"),s.addClass(u.querySelector(".sa-x-mark"),"animateXMark");break;case"warning":s.addClass(u,"pulseWarning"),s.addClass(u.querySelector(".sa-body"),"pulseWarningIns"),s.addClass(u.querySelector(".sa-dot"),"pulseWarningIns");break;case"input":case"prompt":c.setAttribute("type",e.inputType),c.value=e.inputValue,c.setAttribute("placeholder",e.inputPlaceholder),s.addClass(t,"show-input"),setTimeout(function(){c.focus(),c.addEventListener("keyup",swal.resetInputError)},400)}}();if("object"==typeof f)return f.v}if(e.imageUrl){var p=t.querySelector(".sa-icon.sa-custom");p.style.backgroundImage="url("+e.imageUrl+")",s.show(p);var m=80,v=80;if(e.imageSize){var y=e.imageSize.toString().split("x"),h=y[0],b=y[1];h&&b?(m=h,v=b):logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+e.imageSize)}p.setAttribute("style",p.getAttribute("style")+"width:"+m+"px; height:"+v+"px")}t.setAttribute("data-has-cancel-button",e.showCancelButton),e.showCancelButton?u.style.display="inline-block":s.hide(u),t.setAttribute("data-has-confirm-button",e.showConfirmButton),e.showConfirmButton?c.style.display="inline-block":s.hide(c),e.cancelButtonText&&(u.innerHTML=s.escapeHtml(e.cancelButtonText)),e.confirmButtonText&&(c.innerHTML=s.escapeHtml(e.confirmButtonText)),e.confirmButtonColor&&(c.style.backgroundColor=e.confirmButtonColor,c.style.borderLeftColor=e.confirmLoadingButtonColor,c.style.borderRightColor=e.confirmLoadingButtonColor,r.setFocusStyle(c,e.confirmButtonColor)),t.setAttribute("data-allow-outside-click",e.allowOutsideClick);var g=e.doneFunction?!0:!1;t.setAttribute("data-has-done-function",g),e.animation?"string"==typeof e.animation?t.setAttribute("data-animation",e.animation):t.setAttribute("data-animation","pop"):t.setAttribute("data-animation","none"),t.setAttribute("data-timer",e.timer)};o["default"]=i,t.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],9:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},r=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?parseInt(t[1],16)+", "+parseInt(t[2],16)+", "+parseInt(t[3],16):null},s=function(){return e.attachEvent&&!e.addEventListener},l=function(t){e.console&&e.console.log("SweetAlert: "+t)},i=function(e,t){e=String(e).replace(/[^0-9a-f]/gi,""),e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;var n,o,a="#";for(o=0;3>o;o++)n=parseInt(e.substr(2*o,2),16),n=Math.round(Math.min(Math.max(0,n+n*t),255)).toString(16),a+=("00"+n).substr(n.length);return a};o.extend=a,o.hexToRgb=r,o.isIE8=s,o.logStr=l,o.colorLuminance=i},{}]},{},[1]),"function"==typeof define&&define.amd?define(function(){return sweetAlert}):"undefined"!=typeof module&&module.exports&&(module.exports=sweetAlert)}(window,document);
//********************************************************************************************
/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.1.3
 *
 * Requires: 1.2.2+
 */
;(function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?module.exports=c:c(jQuery)})(function(c){function l(b){var a=b||window.event,h=[].slice.call(arguments,1),d=0,e=0,f=0,g=0,g=0;b=c.event.fix(a);b.type="mousewheel";a.wheelDelta&&(d=a.wheelDelta);a.detail&&(d=-1*a.detail);a.deltaY&&(d=f=-1*a.deltaY);a.deltaX&&(e=a.deltaX,d=-1*e);void 0!==a.wheelDeltaY&&(f=a.wheelDeltaY);void 0!==a.wheelDeltaX&&(e=-1*a.wheelDeltaX);g=Math.abs(d);if(!m||g<m)m=g;g=Math.max(Math.abs(f),
    Math.abs(e));if(!k||g<k)k=g;a=0<d?"floor":"ceil";d=Math[a](d/m);e=Math[a](e/k);f=Math[a](f/k);try{b.originalEvent.hasOwnProperty("wheelDelta")}catch(l){f=d}h.unshift(b,d,e,f);return(c.event.dispatch||c.event.handle).apply(this,h)}var n=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||9<=document.documentMode?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],m,k;if(c.event.fixHooks)for(var p=n.length;p;)c.event.fixHooks[n[--p]]=c.event.mouseHooks;
    c.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var b=h.length;b;)this.addEventListener(h[--b],l,!1);else this.onmousewheel=l},teardown:function(){if(this.removeEventListener)for(var b=h.length;b;)this.removeEventListener(h[--b],l,!1);else this.onmousewheel=null}};c.fn.extend({mousewheel:function(b){return b?this.bind("mousewheel",b):this.trigger("mousewheel")},unmousewheel:function(b){return this.unbind("mousewheel",b)}})});
//********************************************************************************************

function isNeroSupport() {
	return (typeof(File) !== 'undefined')
            &&
            (typeof(Blob) !== 'undefined')
            &&
            (typeof(FileList) !== 'undefined')
            &&
            (!!Blob.prototype.webkitSlice || !!Blob.prototype.mozSlice || !!Blob.prototype.slice || false);
}

var defaultMessage = {
    NotSupportBrowser : '지원하지 않는 브라우저입니다.',
    NotValidateLicense: '잘못된 라이센스입니다.',
    NotFoundConf: "설정파일을 찾을수 없습니다.",
    NotFoundDesign: "디자인설정파일을 찾을수 없습니다.",
    CheckBrowser: '사용하는 브라우저에서는 파일 다운로드를 지원하지 않습니다. 브라우저를 확인해주세요.',
    TotalSizeError: '총 파일 크기는 {1} 를 넘을수 없습니다.',
    MaxFileCountError: '한번에 {1} 파일 이상 업로드 할수 없습니다.',
    MinFileCountError: '한번에 {1} 파일 이상 업로드 해야 합니다.',
    MinFileSizeError: '{1} 의 크기가 너무 작습니다. {2} 보다 커야 업로드 할수 있습니다.',
    MaxFileSizeError: '{1} 의 크기가 너무 큽니다. {2} 보다 작아야 업로드 할수 있습니다.',
    FileWhiteTypeError: '{1} 파일은 업로드 할 수 없습니다. 다음과 같은 파일만 업로드가 허용됩니다. \r\n\"[{2}]\"',
    FileBlackTypeError: '{1} 파일은 업로드 할 수 없습니다. 다음과 같은 파일은 업로드가 제한됩니다. \r\n\"[{2}]\"',
    PopupAllow: '정상적인 사용을 위해서 팝업을 허용해주세요.',
    DownloadError: "다운로드 에러",
    DeleteError: "파일 삭제 에러",
    GetfileError: "파일을 가져오는데 에러가 발생했습니다.",
    DeleteConfirm: {
        title: "삭제하시겠습니까?",
        text: "삭제시 파일을 복구할 수 없습니다!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "네, 삭제하겠습니다.",
        closeOnConfirm: false
    },
    DuplicateUpload: {
        title: "삭제하시겠습니까?",
        text: "{1}\\r\\n 위 파일은 기존에 업로드 하던 이력이 존재하나, 다른 파일로 보입니다. \\r\\n새 파일로 업로드하시겠습니까?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "네, 새로 업로드하겠습니다.",
        closeOnConfirm: false
    }
}

var jsLocation = $('script[src*=A2mUpload]').attr('src');

var uploadDefault = {};
var designDefault = {};
var comMessage;

var readConfigFiles = function () {


    if (jsLocation) {
        jsLocation = jsLocation.replace('/A2mUpload.js', '');
        var imported = document.createElement('script');
        imported.src = jsLocation + '/uploadConfig.js';
        document.head.appendChild(imported);

        var dsimported = document.createElement('script');
        dsimported.src = jsLocation + '/designConfig.js';
        document.head.appendChild(dsimported);

        var messageName = '';

        $.ajax({
            url: jsLocation + '/uploadConfig.js',
            dataType: 'script',
            async: false,
            success: function (data, textStatus, jqXHR) {
                uploadDefault = uploadDefaultOpt;
                var lang = getLang();
                messageName = messageConfig[lang];
            },
            complete: function () {

            }, error: function () {
                comMessage = defaultMessage;
                swal(comMessage.NotFoundConf);
            }
        });
        $.ajax({
            url: jsLocation + '/' + messageName,
            dataType: 'script',
            async: false,
            success: function (data, textStatus, jqXHR) {
                comMessage = message;
            },
            complete: function () {

            }, error: function () {
                comMessage = defaultMessage;
                swal(comMessage.NotFoundConf);
            }
        });
        $.ajax({
            url: jsLocation + '/designConfig.js',
            dataType: 'script',
            async: false,
            success: function (data, textStatus, jqXHR) {
                designDefault = designDefaultOpt;
            },
            complete: function () {

            }, error: function () {
                comMessage = defaultMessage;
                swal(comMessage.NotFoundDesign);
            }
        });


//	 $.getScript(jsLocation + "/" + messageConfig[lang]).done(function() {
//         var messageImported = document.createElement('script');
//         messageImported.src = jsLocation + "/" + messageConfig[lang];
//         document.head.appendChild(messageImported);
//         comMessage = message;
//     }).fail(function () {
//    	 comMessage = defaultMessage;
//     })


//     $.getScript(jsLocation+'/designConfig.js').done(function() {
//         designDefault = designDefaultOpt;
//     }).fail(function(){
//         swal(comMessage.NotFoundDesign);
//     });
//	if($('script[src*=uploadConfig]').attr('src')){
//		uploadDefault = uploadDefaultOpt;
//		comMessage = message;
//	}else{
//		swal('설정파일을 찾을 수가 없습니다.')
//	}
    }
}

readConfigFiles();

function getLang() {
    var userLang = (navigator.language || navigator.userLanguage).toLowerCase();
    userLang = userLang.split('-')[0];
    return userLang;
}

function DevelopLogger(dmsName, developMode) {
    var checker;
    var lv;
    if(isBool(developMode)){
        checker = developMode;
        lv = 0;
    }else{
        checker = developMode.enable;
        lv = levelChange(developMode.printLevel);
    }
    var t = '-';
    var c = ':';
    var tag = ' ::: #' + dmsName + ' :';
    var info = 'INFO' + tag;
    var log = 'LOG' + tag;
    var debug = 'DEBUG' + tag;
    var warn = 'WARN' + tag;
    var err = 'ERROR' + tag;

    this.logger = function(f, name, param, obj){
        if(checker) {
            var lev;
            if (isNull(f)) lev = 1;
            else lev = levelChange(f);

            if(lv <= lev){
                var msg = '';
                switch (f){
                    case 'e':
                        msg = '[ ' + name + ' ] ' + c;
                        break;
                    case 't':
                        msg = typeChecker(name, param, obj);
                        break;
                    default:
                        msg = makeMessage(name, param);
                        break;
                }
                switch (lev){
                    case 1:
                        if(isNull(obj)) console.info(info, msg);
                        else console.info(info, msg, t, obj);
                        break;
                    case 2:
                        if(isNull(obj)) console.log(debug, msg);
                        else console.log(debug, msg, t, obj);
                        break;
                    case 3:
                        if(isNull(obj)) console.debug(debug, msg);
                        else console.debug(debug, msg, t, obj);
                        break;
                    case 4:
                        if(!isNull(msg))
                            console.warn(warn, msg);
                        break;
                    case 5:
                        console.error(err, msg, param);
                        break;
                }
            }
        }
        return param;
    };

    function makeMessage(name, param){
        if(isNull(param))
            return name;
        else return name + t + param;
    }

    function typeChecker(name, param, typeArr) {
        var chk = isNull(param);
        if(chk) {
            return name + ' 값이 null 혹은 undefined 입니다.';
        }
        chk = false;
        if(!isNull(typeArr)) {
            if (isList(typeArr)) {
                $.each(typeArr, function (i, type) {
                    chk = chk || isCorrectType(param, type);
                });
            } else if(isString(typeArr)) {
                chk = isCorrectType(param, typeArr);
            }
        }
        if(!chk){
            return name + ' 값이 ' +typeArr+'에 속하지 않습니다.';
        }
        return null;
    };

    function levelChange(level){
        switch (level){
            default:
            case 'a':
                return 0;
            case 'i':
                return 1;
            case 'l':
                return 2;
            case 'd':
                return 3;
            case 'w':
            case 't':
                return 4;
            case 'e':
                return 5;
        }
    }

    function isCorrectType(param, type) {
        var chk = isNull(param);

        if(chk)
            return false;

        switch (type) {
            case 'number':
                chk = chk || isNumber(param);
                break;
            case 'string':
                chk = chk || isString(param);
                break;
            case 'bool':
                chk = chk || isBool(param);
                break;
            case 'object':
                chk = chk || isObject(param);
                break;
            case 'lfufile':
                chk = chk || isLfuFile(param);
                break;
            case 'dmsfile':
                chk = chk || isDmsFile(param);
                break;
            case 'list':
                chk = chk || isList(param);
                break;
            case 'dmsfilelist':
                chk = chk || isDmsFileList(param);
                break;
            case 'lfufilelist':
                chk = chk || isLfuFileList(param);
                break;
            case 'function':
                chk = chk || isFunction(param);
                break;
            case 'functionlist':
                chk = chk || isFunctionList(param);
                break;
        }

        return chk;
    }

    function isNull(value){
        return (value == null || value == undefined);
    }

    function isNumber(value){
        return (typeof value === "number" && isFinite(value));
    }

    function isString(value){
        return (typeof value === 'string' || value instanceof String);
    }

    function isBool(value){
        return (typeof value === 'boolean');
    }

    function isObject(value){
        return (typeof value === 'object');
    }

    function isLfuFile(value){
        if(isObject(value))
            return (!isNull(value) && !isNull(value.largefileuploadObj));
        else return false;
    }

    function isDmsFile(value){
        if(isObject(value))
            return (!isLfuFile(value) && !isNull(value.uniqueIdentifier) && !isNull(value.fileName)
                && !isNull(value.fileSize) && !isNull(value.filePath));
        else return false;
    }

    function isList(value){
        return Array.isArray(value);
    }

    function isLfuFileList(value){
        if(isList(value)){
            var chk = true;
            $.each(value, function(i, file){
                chk = chk && isLfuFile(file);
            });
            return chk;
        }else return false;
    }

    function isDmsFileList(value){
        if(isList(value)){
            var chk = true;
            $.each(value, function(i, file){
                chk = chk && isDmsFile(file);
            });
            return chk;
        }else return false;
    }

   function isFunction(value){
        return (typeof value === 'function');
    }

    function isFunctionList(value){
       if(isList(value)){
           var chk = true;
           $.each(value, function(i, event){
               chk = chk && isFunction(event);
           });
           return chk;
       }else return false;
    }
}

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, arg) {
        var arr = Object(this),
            len = arr.length >>> 0,
            thisArg = arg ? arg : undefined,
            i;
        if (typeof fn !== 'function') {
            throw new TypeError();
        }
        for (i = 0; i < len; i += 1) {
            if (arr.hasOwnProperty(i)) {
                fn.call(thisArg, arr[i], i, arr);
            }
        }
        return undefined;
    };
}

if(!Array.prototype.contains){
    Array.prototype.contains = function(element) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == element) {
                return true;
            }
        }
        return false;
    }
}

function makeSence(name, parameters) {
    var setc = comMessage[name];
    var param = "";

    if (name != "DeleteConfirm" && name != "DuplicateUpload") {
        if (setc.match(/{\d+}/g).length != 0) {
            parameters.forEach(function (parameter, index) {
                //String.format(setc, parameter);
                setc = setc.replace(/{(\d+)}/g, function (match, number) {
                    return typeof number != 'undefined' ? parameters[number - 1] : match;
                });
            });
        }
    }else if(name == "DuplicateUpload"){
        if (setc.text.match(/{\d+}/g).length != 0) {
            parameters.forEach(function (parameter, index) {
                //String.format(setc, parameter);
                setc.text = setc.text.replace(/{(\d+)}/g, function (match, number) {
                    return typeof number != 'undefined' ? parameters[number - 1] : match;
                });
            });
        }
    }
    return setc;
}

(function () {
    "use strict";

    var LargeFileUpload = function (opts) {
        if (!(this instanceof LargeFileUpload)) {
            return new LargeFileUpload(opts);
        }
        this.version = 1.0;
        this.largeFileUploadId = new Date().getTime();
        // SUPPORTED BY BROWSER?
        // Check if these features are support by the browser:
        // - File object type
        // - Blob object type
        // - FileList object type
        // - slicing files
        this.support =  isNeroSupport();


        // PROPERTIES
        var $ = this;
        $.files = [];
        var defaultPolicyList = ['.*ml', '[a-z]'];

        $.defaults = {
            chunkSize: 1 * 1024 * 1024,
            forceChunkSize: false,
            simultaneousUploads: 3,
            fileParameterName: 'file',
            chunkNumberParameterName: 'largefileuploadChunkNumber',
            chunkSizeParameterName: 'largefileuploadChunkSize',
            currentChunkSizeParameterName: 'largefileuploadCurrentChunkSize',
            totalSizeParameterName: 'largefileuploadTotalSize',
            typeParameterName: 'largefileuploadType',
            identifierParameterName: 'largefileuploadIdentifier',
            fileNameParameterName: 'largefileuploadFilename',
            relativePathParameterName: 'largefileuploadRelativePath',
            totalChunksParameterName: 'largefileuploadTotalChunks',
            licenseKeyName: 'licenseKey',
            throttleProgressCallbacks: 0.5,
            query: {},
            headers: {},
            preprocess: null,
            method: 'multipart',
            uploadMethod: 'POST',
            testMethod: 'GET',
            prioritizeFirstAndLastChunk: false,
            target: '/',
            parameterNamespace: '',
            testChunks: true,
            generateUniqueIdentifier: null,
            getTarget: null,
            maxChunkRetries: undefined,
            chunkRetryInterval: undefined,
            permanentErrors: [400, 404, 415, 500, 501],
            maxFiles: undefined,
            withCredentials: false,
            xhrTimeout: 0,
            clearInput: true,
            totalMaxSize: undefined,
            totalFileSizeErrorCallback: function (files, errorCount) {
                var totalMaxSize = $.getOpt('totalMaxSize');
                swal(makeSence('TotalSizeError', [$h.formatSize(totalMaxSize)]));
            },
            maxFileCount: undefined,
            minFileCount: undefined,
            maxFileCountErrorCallback: function (files, errorCount) {
                var maxFileCount = $.getOpt('maxFileCount');
                swal(makeSence('MaxFileCountError', [maxFileCount]));
            },
            minFileCountErrorCallback: function (files, errorCount) {
                var minFileCount = $.getOpt('minFileCount');
                swal(makeSence('MinFileCountError', [minFileCount]));
            },
            minFileSize: 1,
            minFileSizeErrorCallback: function (file, errorCount) {
                swal(makeSence('MinFileSizeError', [file.fileName || file.name, $h.formatSize($.getOpt('minFileSize'))]));
            },
            maxFileSize: undefined,
            maxFileSizeErrorCallback: function (file, errorCount) {
                swal(makeSence('MaxFileSizeError', [file.fileName || file.name, $h.formatSize($.getOpt('maxFileSize'))]));
            },
            blockPolicy: 'black',
            blackExtension: [],
            whiteExtension: [],
            fileTypeErrorCallback: function (file, errorCount) {
                if ($.getOpt('blockPolicy') == 'black')
                    swal(makeSence('FileBlackTypeError', [file.name || file.fileName, defaultPolicyList.concat($.getOpt('blackExtension'))]));
                else
                    swal(makeSence('FileWhiteTypeError', [file.name || file.fileName, $.getOpt('whiteExtension')]));
            }
        };
        $.opts = opts || {};
        $.getOpt = function (o) {
            var $opt = this;
            // Get multiple option if passed an array
            if (o instanceof Array) {
                var options = {};
                $h.each(o, function (option) {
                    options[option] = $opt.getOpt(option);
                });
                return options;
            }
            // Otherwise, just return a simple option
            if ($opt instanceof LargeFileUploadChunk) {
                if (typeof $opt.opts[o] !== 'undefined') {
                    return $opt.opts[o];
                }
                else {
                    $opt = $opt.fileObj;
                }
            }
            if ($opt instanceof LargeFileUploadFile) {
                if (typeof $opt.opts[o] !== 'undefined') {
                    return $opt.opts[o];
                }
                else {
                    $opt = $opt.largefileuploadObj;
                }
            }
            if ($opt instanceof LargeFileUpload) {
                if (typeof $opt.opts[o] !== 'undefined') {
                    return $opt.opts[o];
                }
                else {
                    return $opt.defaults[o];
                }
            }
        };
        $.developLogger = new DevelopLogger($.getOpt('dom').attr('id'), $.getOpt('developMode'));

        // EVENTS
        // catchAll(event, ...)
        // fileSuccess(file), fileProgress(file), fileAdded(file, event), filesAdded(files, filesSkipped), fileRetry(file),
        // fileError(file, message), complete(), progress(), error(message, file), pause()
        $.events = [];
        $.on = function (event, callback) {
            $.events.push(event.toLowerCase(), callback);
        };
        $.fire = function () {
            // `arguments` is an object, not array, in FF, so:
            var args = [];
            for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
            // Find event listeners, and support pseudo-event `catchAll`
            var event = args[0].toLowerCase();
            for (var i = 0; i <= $.events.length; i += 2) {
                if ($.events[i] == event) $.events[i + 1].apply($, args.slice(1));
                if ($.events[i] == 'catchall') $.events[i + 1].apply(null, args);
            }
            if (event == 'fileerror') $.fire('error', args[2], args[1]);
            if (event == 'fileprogress') $.fire('progress');
        };


        // INTERNAL HELPER METHODS (handy, but ultimately not part of uploading)
        var $h = {
            stopEvent: function (e) {
                e.stopPropagation();
                e.preventDefault();
            },
            each: function (o, callback) {
                if (typeof(o.length) !== 'undefined') {
                    for (var i = 0; i < o.length; i++) {
                        // Array or FileList
                        if (callback(o[i]) === false) return;
                    }
                } else {
                    for (i in o) {
                        // Object
                        if (callback(i, o[i]) === false) return;
                    }
                }
            },
            generateUniqueIdentifier: function (file, event) {
                var custom = $.getOpt('generateUniqueIdentifier');
                if (typeof custom === 'function') {
                    return custom(file, event);
                }
                var relativePath = file.webkitRelativePath || file.fileName || file.name; // Some confusion in different versions of Firefox
                var size = file.size;
				
                var id =$.sessionid.replace(/\./g,'') + '' + size + new Date().getTime() + '-' + relativePath.replace(/[^0-9a-zA-Z_-]/img, '');
                id = id.replace(/=/gi, "_");
                $.developLogger.logger('i', 'generateUniqueIdentifier', id);
                return (id);
            },
            contains: function (array, test) {
                var result = false;

                $h.each(array, function (value) {
                    if (value == test) {
                        result = true;
                        return false;
                    }
                    return true;
                });

                return result;
            },
            formatSize: function (size) {
                if (size < 1024) {
                    return size + ' bytes';
                } else if (size < 1024 * 1024) {
                    return (size / 1024.0).toFixed(0) + ' KB';
                } else if (size < 1024 * 1024 * 1024) {
                    return (size / 1024.0 / 1024.0).toFixed(1) + ' MB';
                } else {
                    return (size / 1024.0 / 1024.0 / 1024.0).toFixed(1) + ' GB';
                }
            },
            getTarget: function (params) {
                var target = $.getOpt('target');
                if (typeof target === 'function') {
                    return target(params);
                }
                if (target.indexOf('?') < 0) {
                    target += '?';
                } else {
                    target += '&';
                }
                return target + params.join('&');
            },
            getPreTarget: function (params){
                var target = $.getOpt('target').replace('upload', 'preUpload');
                if (typeof target === 'function') {
                    return target(params);
                }
                if (target.indexOf('?') < 0) {
                    target += '?';
                } else {
                    target += '&';
                }
                return target + params.join('&');
            }
        };

        var onDrop = function (event) {
            $h.stopEvent(event);

            //handle dropped things as items if we can (this lets us deal with folders nicer in some cases)
            if (event.dataTransfer && event.dataTransfer.items) {
                loadFiles(event.dataTransfer.items, event);
            }
            //else handle them as files
            else if (event.dataTransfer && event.dataTransfer.files) {
                loadFiles(event.dataTransfer.files, event);
            }
        };
        var preventDefault = function (e) {
            e.preventDefault();
        };

        /**
         * processes a single upload item (file or directory)
         * @param {Object} item item to upload, may be file or directory entry
         * @param {string} path current file path
         * @param {File[]} items list of files to append new items to
         * @param {Function} cb callback invoked when item is processed
         */
        function processItem(item, path, items, cb) {
            var entry;
            if (item.isFile) {
                // file provided
                return item.file(function (file) {
                    file.relativePath = path + file.name;
                    items.push(file);
                    cb();
                });
            } else if (item.isDirectory) {
                // item is already a directory entry, just assign
                entry = item;
            } else if (item instanceof File) {
                items.push(item);
            }
            if ('function' === typeof item.webkitGetAsEntry) {
                // get entry from file object
                entry = item.webkitGetAsEntry();
            }
            if (entry && entry.isDirectory) {
                // directory provided, process it
                return processDirectory(entry, path + entry.name + '/', items, cb);
            }
            if ('function' === typeof item.getAsFile) {
                // item represents a File object, convert it
                item = item.getAsFile();
                item.relativePath = path + item.name;
                items.push(item);
            }
            cb(); // indicate processing is done
        }


        /**
         * cps-style list iteration.
         * invokes all functions in list and waits for their callback to be
         * triggered.
         * @param  {Function[]}   items list of functions expecting callback parameter
         * @param  {Function} cb    callback to trigger after the last callback has been invoked
         */
        function processCallbacks(items, cb) {
            if (!items || items.length === 0) {
                // empty or no list, invoke callback
                return cb();
            }
            // invoke current function, pass the next part as continuation
            items[0](function () {
                processCallbacks(items.slice(1), cb);
            });
        }

        /**
         * recursively traverse directory and collect files to upload
         * @param  {Object}   directory directory to process
         * @param  {string}   path      current path
         * @param  {File[]}   items     target list of items
         * @param  {Function} cb        callback invoked after traversing directory
         */
        function processDirectory(directory, path, items, cb) {
            var dirReader = directory.createReader();
            dirReader.readEntries(function (entries) {
                if (!entries.length) {
                    // empty directory, skip
                    return cb();
                }
                // process all conversion callbacks, finally invoke own one
                processCallbacks(
                    entries.map(function (entry) {
                        // bind all properties except for callback
                        return processItem.bind(null, entry, path, items);
                    }),
                    cb
                );
            });
        }

        /**
         * process items to extract files to be uploaded
         * @param  {File[]} items items to process
         * @param  {Event} event event that led to upload
         */
        function loadFiles(items, event) {
            if (!items.length) {
                return; // nothing to do
            }
            $.fire('beforeAdd');
            var files = [];
            processCallbacks(
                Array.prototype.map.call(items, function (item) {
                    // bind all properties except for callback
                    return processItem.bind(null, item, "", files);
                }),
                function () {
                    if (files.length) {
                        // at least one file found
                        appendFilesFromFileList(files, event);
                    }
                }
            );
        };
        $.appendMinFilesCountFromFileList = function () {
            // check for uploading too less files
            var dms = $.getOpt('dom').data('dms');
            var errorCount = 0;
            var o = $.getOpt(['minFileCount', 'minFileCountErrorCallback']);

            if (typeof(o.minFileCount) !== 'undefined' && o.minFileCount > 0 && o.minFileCount > ($.files.length + dms.getSize())) {

                o.minFileCountErrorCallback($.files, errorCount++);
                return false;

            } else {
                return true;
            }

        }
        var appendFilesFromFileList = function (fileList, event) {
            // check for uploading too many files
            var dms = jQuery($.getOpt('dom')).data('dms');
            var errorCount = 0;
            var o = $.getOpt(['blockPolicy', 'blackExtension', 'whiteExtension', 'maxFileCount', 'minFileCount', 'minFileSize', 'maxFileSize', 'totalMaxSize', 'maxFileCountErrorCallback', 'minFileCountErrorCallback', 'minFileSizeErrorCallback', 'maxFileSizeErrorCallback', 'fileTypeErrorCallback', 'totalFileSizeErrorCallback']);
            if (typeof(o.maxFileCount) !== 'undefined' && o.maxFileCount > 0 && o.maxFileCount < (fileList.length + dms.getSize())) {
                // if single-file upload, file is already added, and trying to add 1
                // new file, simply replace the already-added file
                o.maxFileCountErrorCallback(fileList, errorCount++);
                return false;
            }

            var files = [], filesSkipped = [], remaining = fileList.length;
            var decreaseReamining = function () {
                if (!--remaining) {
                    // all files processed, trigger event
                    if (!files.length && !filesSkipped.length) {
                        // no succeeded files, just skip
                        return;
                    }
                    window.setTimeout(function () {
                        $.fire('filesAdded', files, filesSkipped);
                    }, 0);
                }
            };
            //total size added && file policy
            var totSize = 0;
            $h.each(fileList, function (file) {
                totSize += file.size;
            });
            if (typeof(o.totalMaxSize) !== 'undefined' && o.totalMaxSize > 0 && o.totalMaxSize < (totSize + dms.getTotalFileSize())) {
                o.totalFileSizeErrorCallback(fileList, errorCount++);
                return false;
            }

            var policy = o.blockPolicy;
            var isBlack = policy == 'black';
            var policyList = policy != 'black' ? o.whiteExtension : o.blackExtension;

            var extPolicyMatcher = function (ext, mPolicyList) {
                for (var idx = 0; idx < mPolicyList.length; idx++) {
                    var obj = new RegExp(mPolicyList[idx]);
                    var matching = ext.match(obj);
                    if (matching != null && matching[0] === ext) {
                        return true;
                    }
                }
                return false;
            };

            $h.each(fileList, function (file) {
                var fileName = file.name;
                var ext = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
                if (fileName.indexOf('.') == -1) {
                    o.fileTypeErrorCallback(file, errorCount++);
                    return false;
                } else if (extPolicyMatcher(ext, defaultPolicyList) | (isBlack == extPolicyMatcher(ext, policyList))) {
                    o.fileTypeErrorCallback(file, errorCount++);
                    return false;
                }

//	        if(o.fileType.length > 0){
//				var fileTypeFound = false;
//				for(var index in o.fileType){
//				  var extension = '.' + o.fileType[index];
//				  if(fileName.indexOf(extension, fileName.length - extension.length) !== -1){
//				    fileTypeFound = true;
//				    break;
//				  }
//				}
//				if (!fileTypeFound) {
//				  o.fileTypeErrorCallback(file, errorCount++);
//				  return false;
//				}
//	        }

                if (typeof(o.minFileSize) !== 'undefined' && o.minFileSize != '' && o.minFileSize > 0 && file.size < o.minFileSize) {
                    o.minFileSizeErrorCallback(file, errorCount++);
                    return false;
                }
                if (typeof(o.maxFileSize) !== 'undefined' && o.maxFileSize != '' && o.maxFileSize > 0 && file.size > o.maxFileSize) {
                    o.maxFileSizeErrorCallback(file, errorCount++);
                    return false;
                }

                function addFile(uniqueIdentifier) {
                    var pathIndex = $.files.length ? $.files.length : 0;
                    if (!$.getFromUniqueIdentifier(uniqueIdentifier)) {
                        (function () {
                            file.uniqueIdentifier = String(uniqueIdentifier);
                            var f = new LargeFileUploadFile($, file, String(uniqueIdentifier));
                            $.files.push(f);
                            files.push(f);
                            f.container = (typeof event != 'undefined' ? event.srcElement : null);
                            window.setTimeout(function () {
                                $.fire('fileAdded', f, event)
                            }, 0);
                        })()
                    } else {
                        filesSkipped.push(file);
                    }
                    ;
                    decreaseReamining();
                }

                // directories have size == 0
                var uniqueIdentifier = String($h.generateUniqueIdentifier(file, event));
                if (uniqueIdentifier && typeof uniqueIdentifier.then === 'function') {
                    // Promise or Promise-like object provided as unique identifier
                    uniqueIdentifier
                        .then(
                            function (uniqueIdentifier) {
                                // unique identifier generation succeeded
                                addFile(uniqueIdentifier);
                            },
                            function () {
                                // unique identifier generation failed
                                // skip further processing, only decrease file count
                                decreaseReamining();
                            }
                        );
                } else {
                    // non-Promise provided as unique identifier, process
                    // synchronously
                    addFile(uniqueIdentifier);
                }
            });

        };

        // INTERNAL OBJECT TYPES
        function LargeFileUploadFile(largefileuploadObj, file, uniqueIdentifier) {
            var $ = this;
            $.currentNum = -1;
            $.opts = {};
            $.startTime = 0;
            $.getOpt = largefileuploadObj.getOpt;
            $._prevProgress = 0;
            $.largefileuploadObj = largefileuploadObj;
            $.file = file;
            $.fileName = file.fileName || file.name; // Some confusion in different versions of Firefox
            $.size = file.size;
            $.relativePath = file.relativePath || file.webkitRelativePath || $.fileName;
            $.uniqueIdentifier = String(uniqueIdentifier);
            $._pause = false;
            $.container = '';
            var _error = uniqueIdentifier !== undefined;

            // Callback when something happens within the chunk
            var chunkEvent = function (event, message) {
                // event can be 'progress', 'success', 'error' or 'retry'
                switch (event) {
                    case 'progress':
                        $.largefileuploadObj.fire('fileProgress', $);
                        break;
                    case 'error':
                        $.abort();
                        _error = true;
                        $.chunks = [];
                        $.largefileuploadObj.fire('fileError', $, message);
                        break;
                    case 'success':
                        if (_error) return;
                        $.largefileuploadObj.fire('fileProgress', $); // it's at least progress
                        if ($.isComplete()) {
                            $.largefileuploadObj.fire('fileSuccess', $, message);
                        }
                        break;
                    case 'retry':
                        $.largefileuploadObj.fire('fileRetry', $);
                        break;
                }
            };

            // Main code to set up a file object with chunks,
            // packaged to be able to handle retries if needed.
            $.chunks = [];
            $.abort = function () {
                // Stop current uploads
                var abortCount = 0;
                $h.each($.chunks, function (c) {
                    if (c.status() == 'uploading') {
                        c.abort();
                        abortCount++;
                    }
                });
                if (abortCount > 0) $.largefileuploadObj.fire('fileProgress', $);
            };
            $.cancel = function () {
                // Reset this file to be void
                var _chunks = $.chunks;
                $.chunks = [];
                // Stop current uploads
                $h.each(_chunks, function (c) {
                    if (c.status() == 'uploading') {
                        c.abort();
                        $.largefileuploadObj.uploadNextChunk();
                    }
                });
                $.largefileuploadObj.removeFile($);
                $.largefileuploadObj.fire('fileProgress', $);
            };
            $.retry = function () {
                $.bootstrap();
                var firedRetry = false;
                $.largefileuploadObj.on('chunkingComplete', function () {
                    if (!firedRetry) $.largefileuploadObj.upload();
                    firedRetry = true;
                });
            };
            $.bootstrap = function () {
                $.abort();
                _error = false;
                // Rebuild stack of chunks from file
                $.chunks = [];
                $._prevProgress = 0;
                var round = $.getOpt('forceChunkSize') ? Math.ceil : Math.floor;
                var maxOffset = Math.max(round($.file.size / $.getOpt('chunkSize')), 1);
                for (var offset = 0; offset < maxOffset; offset++) {
                    (function (offset) {
                        window.setTimeout(function () {
                            $.chunks.push(new LargeFileUploadChunk($.largefileuploadObj, $, offset, chunkEvent));
                            $.largefileuploadObj.fire('chunkingProgress', $, offset / maxOffset);
                        }, 0);
                    })(offset)
                }
                window.setTimeout(function () {
                    $.largefileuploadObj.fire('chunkingComplete', $);
                }, 0);
            };
            $.progress = function () {
                if (_error) return (1);
                // Sum up progress across everything
                var ret = 0;
                var error = false;
                $h.each($.chunks, function (c) {
                    if (c.status() == 'error') error = true;
                    ret += c.progress(true); // get chunk progress relative to entire file
                });
                ret = (error ? 1 : (ret > 0.99999 ? 1 : ret));
                ret = Math.max($._prevProgress, ret); // We don't want to lose percentages when an upload is paused
                $._prevProgress = ret;
                return (ret);
            };
            $.timeprogress = function () {
                if ($.startTime === 0) {
                    $.startTime = new Date().getTime();
                }
                var currentTime = new Date().getTime();
                var timePassed = currentTime - $.startTime;
                var reamining = timePassed / $.progress() - timePassed;
                return (reamining);
            };
            $.uploadSpeed = function () {
                var currentSize = $.size * $.progress();
                return currentSize / (new Date().getTime() - ($.startTime === 0 ? new Date().getTime() : $.startTime)) * 1000;
            };
            $.isUploading = function () {
                var uploading = false;
                $h.each($.chunks, function (chunk) {
                    if (chunk.status() == 'uploading') {
                        uploading = true;
                        return (false);
                    }
                });
                return (uploading);
            };
            $.isComplete = function () {
                var outstanding = false;
                $h.each($.chunks, function (chunk) {
                    var status = chunk.status();
                    if (status == 'pending' || status == 'uploading' || chunk.preprocessState === 1) {
                        outstanding = true;
                        return (false);
                    }
                });
                return (!outstanding);
            };
            $.pause = function (pause) {
                if (typeof(pause) === 'undefined') {
                    $._pause = ($._pause ? false : true);
                } else {
                    $._pause = pause;
                }
            };
            $.isPaused = function () {
                return $._pause;
            };


            // Bootstrap and return
            $.largefileuploadObj.fire('chunkingStart', $);
            $.bootstrap();
            return (this);
        }


        function LargeFileUploadChunk(largefileuploadObj, fileObj, offset, callback) {
            var $ = this;
            $.opts = {};
            $.getOpt = largefileuploadObj.getOpt;
            $.largefileuploadObj = largefileuploadObj;
            $.fileObj = fileObj;
            $.fileObjSize = fileObj.size;
            $.fileObjType = fileObj.file.type;
            $.offset = offset;
            $.callback = callback;
            $.lastProgressCallback = (new Date);
            $.tested = false;
            $.retries = 0;
            $.pendingRetry = false;
            $.preprocessState = 0; // 0 = unprocessed, 1 = processing, 2 = finished

            // Computed properties
            var chunkSize = $.getOpt('chunkSize');
            $.loaded = 0;
            $.startByte = $.offset * chunkSize;
            $.endByte = Math.min($.fileObjSize, ($.offset + 1) * chunkSize);
            if ($.fileObjSize - $.endByte < chunkSize && !$.getOpt('forceChunkSize')) {
                // The last chunk will be bigger than the chunk size, but less than 2*chunkSize
                $.endByte = $.fileObjSize;
            }
            $.xhr = null;

            // test() makes a GET request without any data to see if the chunk has already been uploaded in a previous session
            $.test = function () {
                // Set up request and listen for event
                $.xhr = new XMLHttpRequest();

                var testHandler = function (e) {
                    $.tested = true;
                    var status = $.status();
                    if (status == 'success') {
                        $.callback(status, $.message());
                        $.largefileuploadObj.uploadNextChunk();
                    } else {
                        $.send();
                    }
                };
                $.xhr.addEventListener('load', testHandler, false);
                $.xhr.addEventListener('error', testHandler, false);
                $.xhr.addEventListener('timeout', testHandler, false);

                // Add data from the query options
                var params = [];
                var parameterNamespace = $.getOpt('parameterNamespace');
                var customQuery = $.getOpt('query');
                if (typeof customQuery == 'function') customQuery = customQuery($.fileObj, $);
                $h.each(customQuery, function (k, v) {
                    params.push([encodeURIComponent(parameterNamespace + k), encodeURIComponent(v)].join('='));
                });
                // Add extra data to identify chunk
                params = params.concat(
                    [
                        // define key/value pairs for additional parameters
                        ['chunkNumberParameterName', $.offset + 1],
                        ['chunkSizeParameterName', $.getOpt('chunkSize')],
                        ['currentChunkSizeParameterName', $.endByte - $.startByte],
                        ['totalSizeParameterName', $.fileObjSize],
                        ['typeParameterName', $.fileObjType],
                        ['identifierParameterName', $.fileObj.uniqueIdentifier],
                        ['fileNameParameterName', $.fileObj.fileName],
                        ['relativePathParameterName', $.fileObj.relativePath],
                        ['totalChunksParameterName', $.fileObj.chunks.length]
                    ].filter(function (pair) {
                        // include items that resolve to truthy values
                        // i.e. exclude false, null, undefined and empty strings
                        return $.getOpt(pair[0]);
                    })
                        .map(function (pair) {
                            // map each key/value pair to its final form
                            return [
                                parameterNamespace + $.getOpt(pair[0]),
                                encodeURIComponent(pair[1])
                            ].join('=');
                        })
                );
                // Append the relevant chunk and send it
                $.xhr.open($.getOpt('testMethod'), $h.getTarget(params));
                $.xhr.timeout = $.getOpt('xhrTimeout');
                $.xhr.withCredentials = $.getOpt('withCredentials');
                // Add data from header options
                var customHeaders = $.getOpt('headers');
                if (typeof customHeaders === 'function') {
                    customHeaders = customHeaders($.fileObj, $);
                }
                $h.each(customHeaders, function (k, v) {
                    $.xhr.setRequestHeader(k, v);
                });
                $.xhr.send(null);
            };

            $.preprocessFinished = function () {
                $.preprocessState = 2;
                $.send();
            };

            // send() uploads the actual data in a POST call
            $.send = function () {
                var preprocess = $.getOpt('preprocess');
                if (typeof preprocess === 'function') {
                    switch ($.preprocessState) {
                        case 0:
                            $.preprocessState = 1;
                            preprocess($);
                            return;
                        case 1:
                            return;
                        case 2:
                            break;
                    }
                }
                if ($.getOpt('testChunks') && !$.tested) {
                    $.test();
                    return;
                }

                // Set up request and listen for event
                $.xhr = new XMLHttpRequest();

                // Progress
                $.xhr.upload.addEventListener('progress', function (e) {
                    if ((new Date) - $.lastProgressCallback > $.getOpt('throttleProgressCallbacks') * 1000) {
                        $.callback('progress');
                        $.lastProgressCallback = (new Date);
                    }
                    $.loaded = e.loaded || 0;
                }, false);
                $.loaded = 0;
                $.pendingRetry = false;
                $.callback('progress');

                // Done (either done, failed or retry)
                var doneHandler = function (e) {
                    var status = $.status();
                    if (status == 'success' || status == 'error') {
                        $.callback(status, $.message());
                        $.largefileuploadObj.uploadNextChunk();
                    } else {
                        $.callback('retry', $.message());
                        $.abort();
                        $.retries++;
                        var retryInterval = $.getOpt('chunkRetryInterval');
                        if (retryInterval !== undefined) {
                            $.pendingRetry = true;
                            setTimeout($.send, retryInterval);
                        } else {
                            $.send();
                        }
                    }
                };
                $.xhr.addEventListener('load', doneHandler, false);
                $.xhr.addEventListener('error', doneHandler, false);
                $.xhr.addEventListener('timeout', doneHandler, false);

                // Set up the basic query data from LargeFileUpload
                var query = [
                    ['chunkNumberParameterName', $.offset + 1],
                    ['chunkSizeParameterName', $.getOpt('chunkSize')],
                    ['currentChunkSizeParameterName', $.endByte - $.startByte],
                    ['totalSizeParameterName', $.fileObjSize],
                    ['typeParameterName', $.fileObjType],
                    ['identifierParameterName', $.fileObj.uniqueIdentifier],
                    ['fileNameParameterName', $.fileObj.fileName],
                    ['relativePathParameterName', $.fileObj.relativePath],
                    ['totalChunksParameterName', $.fileObj.chunks.length],
                    ['licenseKeyName', $.getOpt('licenseKey')]
                ].filter(function (pair) {
                    // include items that resolve to truthy values
                    // i.e. exclude false, null, undefined and empty strings
                    return $.getOpt(pair[0]);
                })
                    .reduce(function (query, pair) {
                        // assign query key/value
                        query[$.getOpt(pair[0])] = pair[1];
                        return query;
                    }, {});
                // Mix in custom data
                var customQuery = $.getOpt('query');
                if (typeof customQuery == 'function') customQuery = customQuery($.fileObj, $);
                $h.each(customQuery, function (k, v) {
                    query[k] = v;
                });

                var func = ($.fileObj.file.slice ? 'slice' : ($.fileObj.file.mozSlice ? 'mozSlice' : ($.fileObj.file.webkitSlice ? 'webkitSlice' : 'slice'))),
                    bytes = $.fileObj.file[func]($.startByte, $.endByte),
                    data = null,
                    target = $.getOpt('target');

                var parameterNamespace = $.getOpt('parameterNamespace');
                if ($.getOpt('method') === 'octet') {
                    // Add data from the query options
                    data = bytes;
                    var params = [];
                    $h.each(query, function (k, v) {
                        params.push([encodeURIComponent(parameterNamespace + k), encodeURIComponent(v)].join('='));
                    });
                    target = $h.getTarget(params);
                } else {
                    // Add data from the query options
                    data = new FormData();
                    $h.each(query, function (k, v) {
                        data.append(parameterNamespace + k, v);
                    });
                    data.append(parameterNamespace + $.getOpt('fileParameterName'), bytes);
                }
                var method = $.getOpt('uploadMethod');
                $.xhr.open(method, target);
                if ($.getOpt('method') === 'octet') {
                    $.xhr.setRequestHeader('Content-Type', 'application/octet-stream');
                }
                $.xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
                $.xhr.timeout = $.getOpt('xhrTimeout');
                $.xhr.withCredentials = $.getOpt('withCredentials');
                // Add data from header options
                var customHeaders = $.getOpt('headers');
                if (typeof customHeaders === 'function') {
                    customHeaders = customHeaders($.fileObj, $);
                }
                $h.each(customHeaders, function (k, v) {
                    $.xhr.setRequestHeader(k, v);
                });
                $.xhr.send(data);
            };
            $.abort = function () {
                // Abort and reset
                if ($.xhr) $.xhr.abort();
                $.xhr = null;
            };
            $.status = function () {
                // Returns: 'pending', 'uploading', 'success', 'error'
                if ($.pendingRetry) {
                    // if pending retry then that's effectively the same as actively uploading,
                    // there might just be a slight delay before the retry starts
                    return ('uploading');
                } else if (!$.xhr) {
                    return ('pending');
                } else if ($.xhr.readyState < 4) {
                    // Status is really 'OPENED', 'HEADERS_RECEIVED' or 'LOADING' - meaning that stuff is happening
                    return ('uploading');
                } else {
                    if ($.xhr.status == 200 || $.xhr.status == 201) {
                        // HTTP 200, 201 (created)
                        return ('success');
                    } else if ($h.contains($.getOpt('permanentErrors'), $.xhr.status) || $.retries >= $.getOpt('maxChunkRetries')) {
                        // HTTP 415/500/501, permanent error
                        return ('error');
                    } else {
                        // this should never happen, but we'll reset and queue a retry
                        // a likely case for this would be 503 service unavailable
                        $.abort();
                        return ('pending');
                    }
                }
            };
            $.message = function () {
                return ($.xhr ? $.xhr.responseText : '');
            };
            $.progress = function (relative) {
                if (typeof(relative) === 'undefined') relative = false;
                var factor = (relative ? ($.endByte - $.startByte) / $.fileObjSize : 1);
                if ($.pendingRetry) return (0);
                if (!$.xhr || !$.xhr.status) factor *= .95;
                var s = $.status();
                switch (s) {
                    case 'success':
                    case 'error':
                        return (1 * factor);
                    case 'pending':
                        return (0 * factor);
                    default:
                        return ($.loaded / ($.endByte - $.startByte) * factor);
                }
            };
            return (this);
        }

        // QUEUE
        $.uploadNextChunk = function () {
            var found = false;
            // In some cases (such as videos) it's really handy to upload the first
            // and last chunk of a file quickly; this let's the server check the file's
            // metadata and determine if there's even a point in continuing.
            if ($.getOpt('prioritizeFirstAndLastChunk')) {
                $h.each($.files, function (file) {
                    if (file.chunks.length && file.chunks[0].status() == 'pending' && file.chunks[0].preprocessState === 0) {
                        file.chunks[0].send();
                        found = true;
                        return (false);
                    }
                    if (file.chunks.length > 1 && file.chunks[file.chunks.length - 1].status() == 'pending' && file.chunks[file.chunks.length - 1].preprocessState === 0) {
                        file.chunks[file.chunks.length - 1].send();
                        found = true;
                        return (false);
                    }
                });
                if (found) return (true);
            }

            // Now, simply look for the next, best thing to upload
            $h.each($.files, function (file) {
                if (file.isPaused() === false) {
                    for(var i = file.currentNum + 1; i < file.chunks.length; i++){
                        if (file.chunks[i].status() == 'pending' && file.chunks[i].preprocessState === 0) {
                            file.currentNum = i;
                            file.chunks[i].send();
                            found = true;
                            return (false);
                        }
                    }
                }
                if (found) return (false);
            });
            if (found) return (true);

            // The are no more outstanding chunks to upload, check is everything is done
            var outstanding = false;
            $h.each($.files, function (file) {
                if (!file.isComplete()) {
                    outstanding = true;
                    return (false);
                }
            });
            if (!outstanding) {
                // All chunks have been uploaded, complete
                $.fire('complete');
            }
            return (false);
        };

        // PUBLIC METHODS ASSIGN BROWSE
        $.assignBrowse = function (domNodes, isDirectory) {
            if (typeof(domNodes.length) == 'undefined') domNodes = [domNodes];

            $h.each(domNodes, function (domNode) {
                var input;
                if (domNode.tagName === 'INPUT' && domNode.type === 'file') {
                    input = domNode;
                } else {
                	input = jQuery('#largefileupload-file-select' + $.largeFileUploadId)[0];
                    input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.style.display = 'none';
                    domNode.addEventListener('click', function () {
                        input.style.opacity = 0;
                        input.style.display = 'block';
                        input.focus();
                        input.click();
                        input.style.display = 'none';
                    }, false);
                    domNode.appendChild(input);
                }
                var maxFiles = $.getOpt('maxFiles');
                input.setAttribute('id', 'largefileupload-file-select' + $.largeFileUploadId);
                if (typeof(maxFiles) === 'undefined' || maxFiles != 1) {
                    input.setAttribute('multiple', 'multiple');
                } else {
                    input.removeAttribute('multiple');
                }
                if (isDirectory) {
                    input.setAttribute('webkitdirectory', 'webkitdirectory');
                } else {
                    input.removeAttribute('webkitdirectory');
                }
                // When new files are added, simply append them to the overall list
                input.addEventListener('change', function (e) {
                	if(!isNeroSupport()) {
                		var fileObj, pathHeader , pathMiddle, pathEnd, allFilename, fileName, extName;
                		fileObj = e.target.value;
                		pathHeader = fileObj.lastIndexOf("\\");
                        pathMiddle = fileObj.lastIndexOf(".");
                        pathEnd = fileObj.length;
                        fileName = fileObj.substring(pathHeader+1, pathMiddle);
                        extName = fileObj.substring(pathMiddle+1, pathEnd);
                        allFilename = fileName+"."+extName;

                        e.target.files = [{
                			name : allFilename,
                			size : 0,
                			type : ''
                		}];
                		
                		var newInput = input.cloneNode();
                		jQuery(input).after(newInput);
                		input.setAttribute('id', fileName.replace(/ /gi, "") + "_" + extName);
                		input.setAttribute('class', 'largefileupload-file-select-ie-input');
                		jQuery(input).data('fileName', allFilename);

                		if(!$.fileInputList) {
                			$.fileInputList = [];
                		}
                		
                		$.fileInputList.push(input);
                		
                		newInput.addEventListener('change', arguments.callee);
                		input.removeEventListener("click", arguments.callee);
                	}
                    appendFilesFromFileList(e.target.files, e);
                    var clearInput = $.getOpt('clearInput');
                    if (clearInput) {
                        e.target.value = '';
                    }
                }, false);
            });
        };
        $.assignDrop = function (domNodes) {
            if (typeof(domNodes.length) == 'undefined') domNodes = [domNodes];

            $h.each(domNodes, function (domNode) {
                domNode.addEventListener('dragover', preventDefault, false);
                domNode.addEventListener('dragenter', preventDefault, false);
                domNode.addEventListener('drop', onDrop, false);
            });
        };
        $.unAssignDrop = function (domNodes) {
            if (typeof(domNodes.length) == 'undefined') domNodes = [domNodes];

            $h.each(domNodes, function (domNode) {
                domNode.removeEventListener('dragover', preventDefault);
                domNode.removeEventListener('dragenter', preventDefault);
                domNode.removeEventListener('drop', onDrop);
            });
        };
        $.isUploading = function () {
            var uploading = false;
            $h.each($.files, function (file) {
                if (file.isUploading()) {
                    uploading = true;
                    return (false);
                }
            });
            return (uploading);
        };
        $.isPaused = function () {
            var isPaused = false;
            $h.each($.files, function (file) {
                if (file.isPaused()) {
                    isPaused = true;
                    return (false);
                }
            });
            return (isPaused);
        };
        //upload function ngocupload
        $.upload = function () {
            // Make sure we don't start too many uploads at once
            if ($.isUploading()) return true;
            // Kick off the queue
            $.fire('uploadStart');
            var param = [];
            $h.each($.files, function (file) {
                param.push({
                    'largefileuploadChunkSize' : file.getOpt('chunkSize'),
                    'largefileuploadTotalSize' : file.size,
                    'largefileuploadIdentifier' : file.uniqueIdentifier,
                    'largefileuploadFilename' : file.fileName,
                    'largefileuploadRelativePath' : file.relativePath
                });
            });
            var fileJson = JSON.stringify(param);
            jQuery.ajax({
                url: $.getOpt('pretarget'),
                type: 'post',
                data: {files: fileJson},
                cache: false,
                suppressErrors: false,
                success: function (data, textStatus, jqXHR) {
                    var resArray = data.split(', ');
                    var idxArray = [];
                    var checker = false;
                    for(var i = 0; i < resArray.length; i++){
                        if(resArray[i].match(/false/)){
                            idxArray.push(i);
                            checker = true;
                        }
                    }
                    if(checker){
                        var msg = '';
                        $h.each(idxArray, function (idx) {
                            msg += $.files[idx].fileName + '\r\n';
                        });
                        swal(makeSence('DuplicateUpload', [msg]), function(isValid){
                            if(isValid){
                                jQuery.ajax({
                                    url: $.getOpt('cleartarget'),
                                    type: 'post',
                                    data: {files: fileJson},
                                    cache: false,
                                    suppressErrors: false,
                                    success: function (data, textStatus, jqXHR) {
                                        for (var num = 1; num <= $.getOpt('simultaneousUploads'); num++) {
                                            $.uploadNextChunk();
                                        }
                                        swal.close();
                                    }
                                });
                            }else{
                                for (var num = 1; num <= $.getOpt('simultaneousUploads'); num++) {
                                    $.uploadNextChunk();
                                }
                                swal.close();
                            }
                        });
                    }else {
                        for (var num = 1; num <= $.getOpt('simultaneousUploads'); num++) {
                            $.uploadNextChunk();
                        }
                    }
                }
            });
            return true;
        };
        $.pause = function () {
            // Resume all chunks currently being uploaded
            $h.each($.files, function (file) {
                file.abort();
                file.pause()
            });
            $.fire('pause');
        };
        $.cancel = function () {
            $.fire('beforeCancel');
            for (var i = $.files.length - 1; i >= 0; i--) {
                $.files[i].cancel();
            }
            $.fire('cancel');
        };
        $.progress = function () {
            var totalDone = 0;
            var totalSize = 0;
            // Resume all chunks currently being uploaded
            $h.each($.files, function (file) {
                totalDone += file.progress() * file.size;
                totalSize += file.size;
            });
            return (totalSize > 0 ? totalDone / totalSize : 0);
        };
        $.addFile = function (file, event) {
            appendFilesFromFileList([file], event);
        };
        $.removeFileByUIdentifier = function (uniqueIdentifier) {
            var ret = false;
            $h.each($.files, function (f) {
                if (f.uniqueIdentifier == String(uniqueIdentifier)) ret = f;
            });
            ret.abort();
            for (var i = $.files.length - 1; i >= 0; i--) {
                if ($.files[i] === ret) {
                    $.files.splice(i, 1);
                }
            }

            if ($.isUploading()) {
                $.uploadNextChunk();
            }

            jQuery('.largefileupload-file-' + uniqueIdentifier).remove();
            //doing
            if (false) {
                jQuery('.progress-bar').css({width: 100 + '%'});
            }
        };
        $.removeFile = function (file) {
            for (var i = $.files.length - 1; i >= 0; i--) {
                if ($.files[i] === file) {
                    $.files.splice(i, 1);
                }
            }
        };
        $.getFromUniqueIdentifier = function (uniqueIdentifier) {
            var ret = false;
            $h.each($.files, function (f) {
                if (f.uniqueIdentifier == uniqueIdentifier) ret = f;
            });
            return (ret);
        };
        $.getSize = function () {
            var totalSize = 0;
            $h.each($.files, function (file) {
                totalSize += file.size;
            });
            return (totalSize);
        };
        $.handleDropEvent = function (e) {
            onDrop(e);
        };
        $.handleChangeEvent = function (e) {
            appendFilesFromFileList(e.target.files, e);
            e.target.value = '';
        };

        return (this);
    };


    // Node.js-style export for Node and Component
    if (typeof module != 'undefined') {
        module.exports = LargeFileUpload;
    } else if (typeof define === "function" && define.amd) {
        // AMD/requirejs: Define the module
        define(function () {
            return LargeFileUpload;
        });
    } else {
        // Browser: Expose to window
        window.LargeFileUpload = LargeFileUpload;
    }

})();
//********************************************************************************************


Date.prototype.yyyymmdd = function () {
    var mdate = this.getDate();
    var mmonth = this.getMonth() + 1;
    var myear = this.getFullYear();
    return myear + mmonth + mdate;
};
Date.prototype.yyyy_mm_dd = function () {
    var mdate = this.getDate();
    var mmonth = this.getMonth() + 1;
    var myear = this.getFullYear();
    return myear + '-' + mmonth + '-' + mdate;
};
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

/**
 * Utility method to format bytes into the most logical magnitude (KB, MB,
 * or GB).
 */
Number.prototype.formatBytes = function () {
    var units = ['B', 'KB', 'MB', 'GB', 'TB'],
        bytes = this,
        i;

    for (i = 0; bytes >= 1024 && i < 4; i++) {
        bytes /= 1024;
    }

    return bytes.toFixed(2) + units[i];
}

var formatSize = function (size) {
    if (size < 1024) {
        return size + ' bytes';
    } else if (size < 1024 * 1024) {
        return (size / 1024.0).toFixed(0) + ' KB';
    } else if (size < 1024 * 1024 * 1024) {
        return (size / 1024.0 / 1024.0).toFixed(1) + ' MB';
    } else {
        return (size / 1024.0 / 1024.0 / 1024.0).toFixed(1) + ' GB';
    }
}
var formatTimeSize = function (size) {
    if (size < 1000) {
        return size + ' mini seconds';
    } else if (size < 60 * 1000) {
        return (size / 1000.0).toFixed(0) + ' seconds';
    } else if (size < 60 * 60 * 1000) {
        return (size / 60.0 / 1000.0).toFixed(1) + ' Minutes';
    } else {
        return (size / 60.0 / 60.0 / 1000.0).toFixed(1) + '  Hours';
    }
}


AJAXRequest = function (url, callback, failCallback) {
    var xmlhttp = new XMLHttpRequest();
    if ("withCredentials" in xmlhttp) {
        // for Chrome, Firefox, Opera
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200 || xmlhttp.status == 304) {
                    callback(xmlhttp.responseText);
                } else {
                    setTimeout(failCallback, 0);
                }
            }
        }

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    } else {
        // for IE
        var xdr = new XDomainRequest();
        xdr.onerror = function () {
            setTimeout(failCallback, 0);
        };
        xdr.ontimeout = function () {
            setTimeout(failCallback, 0);
        };
        xdr.onload = function () {
            callback(xdr.responseText);
        };

        xdr.open("get", url);
        xdr.send();
    }
};


//###############################################################################################

(function ($) {

    $.fn.A2mUpload = function (opts) {
        var $a2mUpload = this;

        /**
         * @maxFileSize The maximum allowed file size. (Default: undefined)
         * @minFileSize The minimum allowed file size. (Default: undefined)
         * @maxFiles Indicates how many files can be uploaded in a single session. Valid values are any positive integer and undefined for no limit. (Default: undefined)
         * @headers Extra headers to include in the multipart POST with data. This can be an object or a function that allows you to construct and return a value, based on supplied file (Default: {})
         * @uploadMethod HTTP method to use when sending chunks to the server (POST, PUT, PATCH) (Default: POST)
         * @method Method to use when sending chunks to the server (multipart or octet) (Default: multipart)
         * @query Extra parameters to include in the multipart request with data. This can be an object or a function. If a function, it will be passed a LargeFileUploadFile and a LargeFileUploadChunk object (Default: {})
         * @typeParameterName The name of the file type POST parameter to use for the file chunk (Default: largefileuploadType)
         */
        var A2mDms = function (opts) {
            this.version = 1.0;
            this.dmsId = new Date().getTime();
            // PROPERTIES
            var $context = this;
            $context.data = [],
                $context.getData = function () {
                    var dataArray = [];
                    try {
                        if ($context.data.length != 0) {
                            $.each($context.data, function (index, value) {
                                dataArray.push({
                                    uniqueIdentifier: $context.lfu.developLogger.logger('t', 'uniqueIdentifier', String(value.uniqueIdentifier), 'string'),
                                    isUploaded: true,
                                    fileName: $context.lfu.developLogger.logger('t', 'fileName', value.fileName, 'string'),
                                    fileSize: $context.lfu.developLogger.logger('t', 'fileSize', value.fileSize, 'number'),
                                    obj: $context.lfu.developLogger.logger('t','obj', value, 'dmsfile')
                                });
                            })
                        }
                        if ($context.lfu != null && $context.lfu.files.length != 0) {
                            $.each($context.lfu.files, function (index, value) {
                                dataArray.push({
                                    uniqueIdentifier: $context.lfu.developLogger.logger('t', 'uniqueIdentifier', String(value.uniqueIdentifier), 'string'),
                                    isUploaded: false,
                                    fileName: $context.lfu.developLogger.logger('t', 'fileName', value.fileName, 'string'),
                                    fileSize: $context.lfu.developLogger.logger('t', 'fileSize', value.size, 'number'),
                                    obj: $context.lfu.developLogger.logger('t', 'obj', value, 'lfufile')
                                });
                            })
                        }
                    } catch (e){
                        $context.developLogger.logger('e', 'getData', e);
                    }
                    return dataArray;
                },
                $context.getDataByUIdentifier = function (uid) {
                    $context.lfu.developLogger.logger('t', 'uniqueIdentifier',uid, 'string');
                    var file = null;
                    try {
                        $.each($context.getData(), function (index, value) {
                            if (value.uniqueIdentifier == uid) {
                                file = value;
                            }
                        });
                    } catch (e){
                        $context.developLogger.logger('e', 'getDataByUIdentifier', e);
                    }
                    return file;
                },
                $context.getDataByIdx = function (idx) {
                    $context.lfu.developLogger.logger('t', 'idx',idx, 'number');
                    return $context.getData()[idx];
                },
                $context.getFileSizeByIdx = function (idx) {
                    $context.lfu.developLogger.logger('t', 'idx', idx, 'number');
                    $context.lfu.developLogger.logger('t', 'fileSize', $context.getData()[idx].fileSize, 'number');
                    return $context.getData()[idx].fileSize;
                },
                $context.getFileSizeByUIdentifier = function (uid) {
                    $context.lfu.developLogger.logger('t', 'uniqueIdentifier', uid, 'string');
                    var size = -1;
                    var file = $context.getDataByUIdentifier(uid);
                    try {
                        if (file != null)
                            size = file.fileSize;
                    }catch (e){
                        $context.lfu.developLogger.logger('e', 'getFileSizeByUIdentifier', e);
                    }
                    $context.lfu.developLogger.logger('t', 'fileSize', size, 'number');
                    return size;
                },
                $context.getTotalFileSize = function () {
                    var totalSize = 0;
                    try {
                        $.each($context.getData(), function (index, value) {
                            totalSize += value.fileSize;
                        });
                    }catch (e){
                        $context.lfu.developLogger.logger('e', 'getTotalFileSize', e);
                    }
                    return totalSize;
                },
                $context.getSize = function () {
                    return $context.getData().length;
                },
                $context.getIdxByUIdentifier = function (uid) {
                    $context.lfu.developLogger.logger('t', 'uniqueIdentifier', uid, 'string');
                    var i = -1;
                    $.each($context.getData(), function (index, value) {
                        i++;
                        try {
                            if (value.uniqueIdentifier == uid) {
                                return false;
                            }
                        }catch (e){
                            $context.lfu.developLogger.logger('e', 'getIdxByUIdentifier', e);
                        }
                    });
                    return i;
                },
                $context.getUIdentifierByIdx = function (idx) {
                    try {
                        $context.lfu.developLogger.logger('t', 'idx', idx, 'string');
                        return String($context.getData()[idx].uniqueIdentifier);
                    } catch (e){
                        $context.lfu.developLogger.logger('e', 'getUIdentifierByIdx', e);
                    }
                },
                $context.addData = function (myData) {
                    $context.lfu.developLogger.logger('t', 'dmsData', myData, ['dmsfile', 'dmsfilelist']);
                    try {
                        $context.pushData(myData);
                        $context.refreshUI();
                    } catch (e){
                        $context.lfu.developLogger.logger('e', 'addData', e);
                    }
                },
                $context.setData = function (myData) {
                    $context.lfu.developLogger.logger('t', 'dmsData', myData, ['dmsfile', 'dmsfilelist']);
                    try {
                        $context.removeAll();
                        for (var i = 0; i < myData.length; i++) {
                            myData[i].uploaded = true;
                        }
                        $context.pushData(myData);
                        $context.refreshUI();
                    } catch (e){
                        $context.lfu.developLogger.logger('e', 'setData', e);
                    }
                },
                $context.reset = function () {
                    try {
                    	var opts = $context.opts;
                    	var tempA2mUpload = $a2mUpload;
                    	
                    	$context.destroy();

                    	$($a2mUpload).A2mUpload(opts);
                    } catch (e){
                        $context.lfu.developLogger.logger('e', 'reset', e);
                    }
                },
                $context.removeDataByIdx = function (idx) {
                    $context.lfu.developLogger.logger('t', 'removeDataByIdx', idx, 'number');
                    try {
                        if (idx != -1) {
                            var file = $context.getData()[idx];
                            if (file.isUploaded) $context.data.splice(idx, 1);
                            else $context.lfu.removeFileByUIdentifier(String(file.uniqueIdentifier));
                            $context.refreshUI();
                            return file;
                        } else return false;
                    }catch(e){
                        $context.lfu.developLogger.logger('e', 'removeDataByIdx', e);
                        return false;
                    }
                },
                $context.removeDataByUIdentifier = function (uid) {
                    $context.lfu.developLogger.logger('t', 'removeDataByUIdentifier', uid, 'string');
                    return $context.removeDataByIdx($context.getIdxByUIdentifier(uid));
                },
                $context.removeAll = function () {
                    try {
                        $context.data = [];
                        $context.lfu.data = [];
                        $context.refreshUI();
                    }catch (e){
                        $context.lfu.developLogger.logger('e', 'removeAll', e);
                    }
                },
                $context.pushData = function (myFile) {
                    $context.lfu.developLogger.logger('t', 'pushData', myFile, ['dmsfile', 'dmsfilelist']);
                    try {
                        if (myFile instanceof Array) {
                            $.each(myFile, function (idx, file) {
                                $context.pushData(file);
                            });
                        } else {
                            myFile.contextPath = $context.getOpt('contextPath');
                            myFile.baseControllerPath = $context.getOpt('baseControllerPath');
                            $context.data.push(myFile);
                        }
                    }catch (e) {
                        $context.lfu.developLogger.logger('e', 'pushData', e);
                    }
                },
                $context.refreshUI = function () {
                    try {
                    	$('.a2m-dms-dialog .largefileupload-list').html('');
                    	if($context.getOpt('dropAreaView'))
                    		$($a2mUpload).find('.largefileupload-list').html('');
                    	else
                    		$($a2mUpload).find(".largefileupload-selector").children().not($('.largefileupload-browse').parents()).remove();
                        if ($context.getSize() == 0) {
                            $($a2mUpload).find(".largefileupload-foreground").hide();
                            $($a2mUpload).find(".largefileupload-background").show();
                            $($a2mUpload).find(".largefileupload-checkbox-header").attr("checked", false);
                        } else {
                            $.each($context.getData(), function (idx, data) {
                                fileForm(data, $context.lfu.getOpt('dom'));
                            });
                        }
                    }catch (e) {
                        $context.lfu.developLogger.logger('e', 'refreshUI', e);
                    }
                },
                $context.upload = function () {
                    try {
                        if ($context.lfu.appendMinFilesCountFromFileList()) {
                            $context.a2mDmsUI.pushA2mDms($context);
                            if ($context.lfu.files.length > 0) {
                                $context.a2mDmsUI.upload();
                            } else {
                                $context.a2mDmsUI.complete($context);

                                // var onUploadComplete = $context.getOpt('onUploadComplete');
                                // if (onUploadComplete) {
                                //     onUploadComplete();
                                // }
                            }
                        }
                    } catch (e) {
                        $context.lfu.developLogger.logger('e', 'upload', e);
                    }
                };

            $context.getPath = function (path){
                if($context.opts.functionExtType == undefined){
                    ($context.opts.contextPath + $context.opts.baseControllerPath + "/" + path + '.jsp');
                }else
                    return ($context.opts.contextPath + $context.opts.baseControllerPath + "/" + path + '.' + $context.opts.functionExtType);
            };
            $context.defaults = {
                contextPath: "",
                baseControllerPath: "/fum/fum_0101",
                pauseImageUrl: "/images/pause.png",
                resumeImageUrl: "/images/resume.png",
                closeImageUrl: "/images/close.png",
                blockPolicy: 'black',
                blackExtension: [],
                whiteExtension: [],
                controlType: 'UPLOADBOX',
                developMode: false,
                // width: '100%',
                // height: '294px',
                dropAreaView: true,
                design: designDefault,
            };

            $context.defaults.transmitDirection={
                upload:$context.defaults.contextPath + $context.defaults.baseControllerPath + "/upload.jsp",
                delete:$context.defaults.contextPath + $context.defaults.baseControllerPath + "/deleteFiles.jsp",
                download:$context.defaults.contextPath + $context.defaults.baseControllerPath + "/downloadFile.jsp",
                zip:$context.defaults.contextPath + $context.defaults.baseControllerPath + "/zipFiles.jsp",                
                downloadZip:$context.defaults.contextPath + $context.defaults.baseControllerPath + "/downloadZipFile.jsp",
                progress:$context.defaults.contextPath + $context.defaults.baseControllerPath + "/progressDownloadFile.jsp",
                deletetemp:$context.defaults.contextPath + $context.defaults.baseControllerPath + "/deleteTempFile.jsp",
                clearupload:$context.defaults.contextPath + $context.defaults.baseControllerPath + "/clearUpload.jsp",
                foldercheck:$context.defaults.contextPath + $context.defaults.baseControllerPath + "/folderCheck.jsp",
                preupload:$context.defaults.contextPath + $context.defaults.baseControllerPath + "/preUpload.jsp",
                ieUpload:$context.defaults.contextPath + $context.defaults.baseControllerPath + "/ieUpload.jsp"
            }


            // grobal Default variable - user can config
            var $uploadOpts = {};
            // uploadDefaultOpt is null when user not import the uploadConfig.js
            if (uploadDefault) {
                // is not null
                $uploadOpts = $.extend($uploadOpts, $context.defaults, uploadDefault);
            } else {
                // is null
                $uploadOpts = $.extend($uploadOpts, $context.defaults)
            }

            // merge the object
            $context.opts = $.extend({}, $uploadOpts, opts);

            var $designOpts = {};
            // uploadDefaultOpt is null when user not import the uploadConfig.js
            if (designDefault) {
                // is not null
                $designOpts = $.extend(true, $designOpts, $context.defaults.design, designDefault);
            } else {
                // is null
                $designOpts = $.extend($designOpts, $context.defaults.design)
            }

            // merge the object
            $context.opts.design = $.extend(true, {}, $designOpts, opts.design);
            // save target
            // $context.opts
            $context.getOpt = function (o) {
                if($context.lfu != null)
                    $context.lfu.developLogger.logger('t', 'getOpt', o, ['string', 'array']);
                try {
                    var $opt = this;
                    // Get multiple option if passed an array,
                    if (o instanceof Array) {
                        var options = {};
                        $h.each(o, function (option) {
                            options[option] = $opt.getOpt(option);
                        });
                        return options;
                    } else {
                        if ($opt instanceof A2mDms) {
                            if (typeof $opt.opts[o] !== 'undefined') {
                                return $opt.opts[o];
                            }
                            else {
                                return $opt.defaults[o];
                            }
                        }
                    }
                } catch (e){
                    $context.lfu.developLogger.logger('e', getOpt, e);
                }
            };

            // EVENTS
            // catchAll(event, ...)
            $context.events = [];
            $context.on = function (event, callback) {
                $context.events.push(event.toLowerCase(), callback);
            };
            $context.fire = function () {
                // `arguments` is an object, not array, in FF, so:
                var args = [];
                for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
                // Find event listeners, and support pseudo-event `catchAll`
                var event = args[0].toLowerCase();
                for (var i = 0; i <= $context.events.length; i += 2) {
                    if ($context.events[i] == event) $context.events[i + 1].apply($context, args.slice(1));
                    if ($context.events[i] == 'catchall') $context.events[i + 1].apply(null, args);
                }
                if (event == 'fileerror') $context.fire('error', args[2], args[1]);
                if (event == 'fileprogress') $context.fire('progress');
            };
            // INTERNAL HELPER METHODS (handy, but ultimately not part of uploading)
            var $h = {
                stopEvent: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                },
                each: function (o, callback) {
                    if (typeof(o.length) !== 'undefined') {
                        for (var i = 0; i < o.length; i++) {
                            // Array or FileList
                            if (callback(o[i]) === false) return;
                        }
                    } else {
                        for (i in o) {
                            // Object
                            if (callback(i, o[i]) === false) return;
                        }
                    }
                },
                contains: function (array, test) {
                    var result = false;

                    $h.each(array, function (value) {
                        if (value == test) {
                            result = true;
                            return false;
                        }
                        return true;
                    });

                    return result;
                },
                getTarget: function (params) {
                    var target = $.getOpt('target');
                    if (typeof target === 'function') {
                        return target(params);
                    }
                    if (target.indexOf('?') < 0) {
                        target += '?';
                    } else {
                        target += '&';
                    }
                    return target + params.join('&');
                }
            };
            $context.lfu = null;
            $context.a2mDmsUI = null;

            $context.init = function () {
                $($a2mUpload).data('dms', $context);

                // a2mDmsUI 전역변수버전
                // if( typeof a2mDmsUI === 'undefined' || a2mDmsUI === null ){
                // a2mDmsUI = new A2mDmsUI($context.opts);
                // a2mDmsUI.buildUploadBox();
                // }
                // $context.a2mDmsUI = a2mDmsUI;
                //$context.a2mDmsUI.pushA2mDms($context);

                // a2mDmsUI groupID / form 기반 생성버전
                // if($context.getOpt('groupId') != 'undefined' && $context.getOpt('groupId') != null ){
                //     var dmsArray = $('.largefile-layout-form');
                //     var check = false;
                //     for(var i = 0; i < dmsArray.size(); i++){
                //         if($(dmsArray[i]).data('dms').a2mDmsUI.getOpt('groupId') == $context.getOpt('groupId')){
                //             $context.a2mDmsUI = $(dmsArray[i]).data('dms').a2mDmsUI;
                //             check = true;
                //             break;
                //         }
                //     }
                //     if(!check){
                //         $context.a2mDmsUI = new A2mDmsUI($context.opts);
                //         $context.a2mDmsUI.buildUploadBox();
                //     }
                // }else if($a2mUpload.closest('form').size() != 0){
                //     var dmsArray = $a2mUpload.closest('form').find('.largefile-layout-form');
                //     if(dmsArray.size() == 0){
                //       $context.a2mDmsUI = new A2mDmsUI($context.opts);
                //       $context.a2mDmsUI.buildUploadBox();
                //     }else{
                //       $context.a2mDmsUI = $($a2mUpload.closest('form').find('.largefile-layout-form')[0]).data('dms').a2mDmsUI;
                //     }
                // }else{
                //     $context.a2mDmsUI = new A2mDmsUI($context.opts);
                //     $context.a2mDmsUI.buildUploadBox();
                // }
                //$context.a2mDmsUI.pushA2mDms($context);

                // a2mDmsUI only 1
                var dmsArray = $('.largefile-layout-form');
                var check = false;
                if (dmsArray.length != 0) {
                    $context.a2mDmsUI = $(dmsArray[0]).data('dms').a2mDmsUI;
                } else {
                    $context.a2mDmsUI = new A2mDmsUI($context.opts);
                    $context.a2mDmsUI.buildUploadBox();
                }

                $context.lfu = new LargeFileUpload({
                    target: $context.opts.transmitDirection.upload === undefined ? $context.defaults.transmitDirection.upload:$context.getPath($context.opts.transmitDirection.upload),
                    cleartarget:$context.opts.transmitDirection.clearupload === undefined ? $context.defaults.transmitDirection.clearupload:$context.getPath($context.opts.transmitDirection.clearupload),
                    pretarget:$context.opts.transmitDirection.preupload === undefined ? $context.defaults.transmitDirection.preupload:$context.getPath($context.opts.transmitDirection.preupload),
                    dom: $a2mUpload,
                    maxFileSize: $context.getOpt('maxFileSize'),
                    minFileSize: $context.getOpt('minFileSize'),
                    maxFileCount: $context.getOpt('maxFileCount'),
                    minFileCount: $context.getOpt('minFileCount'),
                    totalMaxSize: $context.getOpt('totalMaxSize'),
                    maxChunkRetries: $context.getOpt('maxChunkRetries'),
                    chunkRetryInterval: $context.getOpt('chunkRetryInterval'),
                    blockPolicy: $context.getOpt('blockPolicy'),
                    licenseKey: $context.getOpt('licenseKey'),
                    developMode: $context.getOpt('developMode'),
                    blackExtension: $context.getOpt('blackExtension'),
                    whiteExtension: $context.getOpt('whiteExtension'),
                    chunkSize: 1 * 1024 * 1024,
                    simultaneousUploads: 4,
                    testChunks: true,
                    throttleProgressCallbacks: 1,
                    method: "octet",
                    query: data
                });

//                if($context.lfu.support == false) {
//                    return false;
//                }

                $context.lfu.developLogger.logger('i', 'init');

                if (!$a2mUpload.hasClass('largefile-layout-form'))
                    $a2mUpload.addClass('largefile-layout-form');
                design = new Design(opts);


                buildUploadBox();

                $a2mUpload.data('dmsId', this.dmsId)

                var data = {};
//				data.blockPolicy=$context.getOpt('blockPolicy');
                data.groupId = $context.getOpt('groupId');
                data.licenseKey = $context.getOpt('licenseKey');
//				data.contextMenu=$context.getOpt('contextMenu');
//				data.blackExtension=$context.getOpt('blackExtension');
//				data.whiteExtension=$context.getOpt('whiteExtension');


                //$a2mUpload.data($context.lfu);
                //global
                //lfu = $context.lfu;

                // LargeFileUpload.js isn't supported, fall back on a different method
//                if (!$context.lfu.support) {
//                    $a2mUpload.find('.largefileupload-error').show();
//                } else
                	if ($context.getOpt('controlType') == 'UPLOADBOX') {
                    // Show a place for dropping/selecting files
//     			          $('.largefileupload-drop').show(); - JM
                    if ($context.getOpt('dropAreaView') === true)
                        $context.lfu.assignDrop($a2mUpload.find('.largefileupload-drop')[0]);
                    $context.lfu.assignBrowse($a2mUpload.find('.largefileupload-browse')[0]);

                    // Handle file add event
                    $context.lfu.on('fileAdded', function (file, e) {
                        // Show progress pabr
                        $context.lfu.developLogger.logger('i','fileAdded', file.uniqueIdentifier);
                        if ($context.lfu.isUploading() === true || $context.lfu.isPaused() === true) {
                            $context.a2mDmsUI.fileAdded($context.lfu, file);
                        }

                        fileForm(file, $context.lfu.getOpt('dom'));
                        $($context.lfu.getOpt('dom')).find(".largefileupload-checkbox-header").attr("checked", false);

                        var onFileAdded = $context.getOpt('onFileAdded');
                        if (onFileAdded) {
                            $($context.lfu.getOpt('dom')).find(".largefileupload-foreground").show();
                            $($context.lfu.getOpt('dom')).find(".largefileupload-background").hide();
                            onFileAdded($context, file);
                        }
                    });
                    $context.lfu.on('pause', function (e) {
                        $context.lfu.developLogger.logger('i', 'pause');
                        $context.a2mDmsUI.pause($context.lfu, e);

                        var onPause = $context.getOpt('onPause');
                        if (onPause) {
                            onPause();
                        }
                    });
                    $context.lfu.on('uploadStart', function (e) {
                        $context.lfu.developLogger.logger('i', 'uploadStart');

                        if (!$context.a2mDmsUI.isUploadStart) {
                            $context.a2mDmsUI.uploadStart($context.lfu, e);
                            $context.a2mDmsUI.isUploadStart = true;

                            var onUploadStart = $context.getOpt('onUploadStart');

                            if (onUploadStart) {
                                onUploadStart();
                            }
                        }
                    });
                    $context.lfu.on('complete', function (e) {
                        $context.lfu.developLogger.logger('i', 'uploadComplete');

                        $context.a2mDmsUI.complete($context, e);
                    });
                    $context.lfu.on('fileSuccess', function (file, message) {
                        //alert(message);
                        $context.lfu.developLogger.logger('i', 'uploadSuccess - ' + file.uniqueIdentifier + " : " + message);

                        $context.a2mDmsUI.fileSuccess($context.lfu, file, message);

                        $context.pushData(JSON.parse(message));

                    });
                    $context.lfu.on('fileError', function (file, message) {
                        $context.lfu.developLogger.logger('i', 'uploadError - ' + file.uniqueIdentifier);

                        $context.a2mDmsUI.fileError($context.lfu, file, message);
                    });
                    $context.lfu.on('fileProgress', function (file) {
                        $context.lfu.developLogger.logger('i', 'uploadProgress - ' + file.uniqueIdentifier);

                        $context.a2mDmsUI.fileProgress($context.lfu, file);
                        var onFileProgress = $context.getOpt('onFileProgress');
                        if (onFileProgress) {
                            onFileProgress($context, file);
                        }
                    });
                }

                if ($context.getOpt('data') != undefined && $context.getOpt('data') != null)
                    $context.setData($context.getOpt('data'));

                var onInit = $context.getOpt('onInit');
                if (onInit) {
                	setTimeout(function(){
                		onInit($context);
                	}, 0);
                }
            };

            var fileListForm = function (fileList, obj) {
                $.each(fileList, function (i, file) {
                    fileForm(file, obj);
                })
            };


            var fileForm = function (file, obj) {
                $context.lfu.developLogger.logger('i', '파일 row 생성', file.uniqueIdentifier);
                var design = $context.getOpt('design');
                var size = 0;
                if (typeof file.fileSize === 'undefined')
                    size = file.size;
                else
                    size = file.fileSize;
                // will be change
                //var ext = fileExtension(file);
                //var ext = file.fileName.slice((file.fileName.lastIndexOf(".") - 1 >>> 0) + 2);
                var fileRow = '';
                if ($context.getOpt('dropAreaView') === true) {
                    //var design = $.extend($context.getOpt('design'),$context.defaults.design);
                    var listheight = $(obj).height();
                    if(design.component.Toolbar.layout == "top" || design.component.Toolbar.layout == "bottom")
                    {
                        if(design.component.Toolbar.size.indexOf("%") == -1)
                        {
                            listheight = listheight - design.component.Toolbar.size;
                        }
                        else
                        {
                            listheight = listheight * ((100 - design.component.Toolbar.size.replace("%", ""))*0.01);
                        }
                    }
                    var $largefileupload_file = $("<tr>", {
                        class: "largefileupload-file-" + file.uniqueIdentifier
                    });

                    var $nametd = $("<td>", {
                        class: design.component.fileList.columns.class,
                        style: "text-overflow: ellipsis; overflow-x: hidden; white-space: nowrap; -o-text-overflow: ellipsis; max-width:"
                        + (design.component.fileList.width[0].indexOf("%") == -1 ? design.component.fileList.width[0] :
                            obj.find(".largefileupload-foreground").width() * (design.component.fileList.width[0].replace("%", "") * 0.01))
                        + "px;width:" + (design.component.fileList.width[0].indexOf("%") == -1 ? design.component.fileList.width[0] :
                            obj.find(".largefileupload-foreground").width() * (design.component.fileList.width[0].replace("%", "") * 0.01))
                        + "px;height:" + (design.component.fileList.height[1].indexOf("%") == -1 ? design.component.fileList.height[1] :
                            listheight * (design.component.fileList.height[1].replace("%", "") * 0.01)) + "px;" +
                        design.component.fileList.columns.css
                    }).appendTo($largefileupload_file);
                    var $check = $("<input>", {
                        type: "checkbox",
                        class: "largefileupload-checkbox",
                        id : "largefileupload-file-checkbox-" + file.uniqueIdentifier,
                        value: String(file.uniqueIdentifier)
                    }).appendTo($nametd);

                    var $checkLabel = $("<label>", {
                        class: "largefileupload-checkbox-label",
                        for: "largefileupload-file-checkbox-" + file.uniqueIdentifier,
                        text: "선택"
                    }).appendTo($nametd);

                    var downJs = "$('.largefileupload-checkbox[value="+ file.uniqueIdentifier+"]').trigger('click');$('.largefileupload-download').trigger('click');"
                        + "$('.largefileupload-checkbox[value="+ file.uniqueIdentifier+"]').trigger('click');";

                    var $span1 = $("<span>", {
                        class: "largefileupload-file-name",
                        style: "padding-left: 12px;",
                        title: file.fileName,
                        onclick: downJs
                    }).appendTo($nametd);


                    /*var $span2 = $("<span>",{
                        class:"largefileupload-file-name-tooltip",
                        style:"display: inline-block;border: 1px solid black;visibility: hidden;background-color: white;"
                        +"color: black;text-align: center;padding: 5px 2px;border-radius: 6px;position: absolute;z-index: 1;"//
                    }).appendTo($span1);*/


                    var $sizetd = $("<td>", {
                        class: design.component.fileList.columns.class,
                        style: design.component.fileList.columns.css + "width:" + (design.component.fileList.width[1].indexOf("%") == -1 ? design.component.fileList.width[1] :
                            obj.find(".largefileupload-foreground").width() * (design.component.fileList.width[1].replace("%", "") * 0.01))
                        + "px;height:" + (design.component.fileList.height[1].indexOf("%") == -1 ? design.component.fileList.height[1] :
                            listheight * (design.component.fileList.height[1].replace("%", "") * 0.01)) + "px;"
                    }).appendTo($largefileupload_file);
                    var $sizespan = $("<span>", {
                        class: "largefileupload-file-size-" + file.uniqueIdentifier,
                        text: formatSize(size)
                    }).appendTo($sizetd);


                    $(obj).find('.largefileupload-list').append($largefileupload_file[0].outerHTML);

                    // var fileAction = '<a href="#" onclick="a2mDmsUI.removeFileByUIdentifier(\'' + file.uniqueIdentifier + '\')" class="progress-remove-link-' + file.uniqueIdentifier + '"><img src="' + $context.getOpt('contextPath') + $context.getOpt('closeImageUrl') + '" title="Delete upload" height="10px" width="10px"/></a>';

//				fileAction = fileAction + '<a href="#" onclick="a2mDmsUI.downloadFileByUIdentifier(\''+file.uniqueIdentifier+'\')" class="btn btn-info btn-xs progress-download-link-'+file.uniqueIdentifier+'" style="display:none;">Download</a><br/>';
//				fileAction = fileAction + '<a href="#" onclick="a2mDmsUI.deleteFileByUIdentifier(\''+file.uniqueIdentifier+'\')" class="btn btn-warning btn-xs progress-delete-link-'+file.uniqueIdentifier+'" style="display:none;">Delete</a>';

                    // $(obj).find('.largefileupload-action-' + file.uniqueIdentifier).html(fileAction);
                    $(obj).find('.largefileupload-file-' + file.uniqueIdentifier + ' .largefileupload-file-name').append(file.fileName);


                    //파일명으로 교체
                    $(obj).find('.largefileupload-file-ico').addClass('ico_xlsx');

                    $(obj).find('input[class=largefileupload-checkbox]').on('change', function () {
                        var arr = $(obj).find('input[class=largefileupload-checkbox]:checked');
                        var downloadable = true;
                        if (arr.length == $('input[class=largefileupload-checkbox]').length)
                            $(obj).find('.largefileupload-checkbox-header').prop("checked", true);
                        else
                            $(obj).find('.largefileupload-checkbox-header').prop("checked", false);

                        $.each(arr, function (index, value) {
                            if ($($a2mUpload).data('dms').getDataByUIdentifier(value.value).isUploaded && downloadable)
                                downloadable = true;
                            else downloadable = false;
                        })
                        if (arr.length > 0) {
                            if (downloadable) {
                                $(obj).find('.largefileupload-download').children('img').css('opacity', 1.0);
                                $(obj).find('.largefileupload-download').css('opacity', 1.0);
                                $(obj).find('.largefileupload-download').off('click');
                                $(obj).find('.largefileupload-download').attr("href", "javascript:;");
                                $(obj).find('.largefileupload-download').on('click', function () {
                                    var arr = $.makeArray($($a2mUpload).find('input[class=largefileupload-checkbox]:checked').map(function () {
                                        return $(this).attr('value');
                                    }));

                                    if (arr.length == 1) {
                                        $context.downloadFileByUIdentifier(String(arr[0]), opts);
                                    } else if (arr.length > 0) {
                                        var downloadArray = [];
                                        $.each(arr, function (i, value) {
                                            downloadArray.push($context.getDataByUIdentifier(value).obj);
                                        });
                                        $context.downloadFiles(downloadArray, opts);
                                    }
                                });
                            } else {
                                $(obj).find('.largefileupload-download').removeAttr("href");
                                $(obj).find('.largefileupload-download').children('img').css('opacity', 0.6);
                                $(obj).find('.largefileupload-download').css('opacity', 0.6);
                                $(obj).find('.largefileupload-download').off('click');
                            }
                            $(obj).find('.largefileupload-delete').children('img').css('opacity', 1.0);
                            $(obj).find('.largefileupload-delete').attr("href", "javascript:;");
                            $(obj).find('.largefileupload-delete').css('opacity', 1.0);
                        } else {
                            $(obj).find('.largefileupload-download').children('img').css('opacity', 0.6);
                            $(obj).find('.largefileupload-download').css('opacity', 0.6);
                            $(obj).find('.largefileupload-delete').children('img').css('opacity', 0.6);
                            $(obj).find('.largefileupload-delete').css('opacity', 0.6);

                            $(obj).find('.largefileupload-download').removeAttr("href");
                            $(obj).find('.largefileupload-delete').removeAttr("href");
                        }
                    });

                    var size_text = formatSize($context.getTotalFileSize()).split(" ");
                    $(obj).find('.largefileupload-total').html("<b style='color:" + design.component.Toolbar.info.textcolor + "'>총 <p class='largefileupload-total-number' style='display:inline-block;color:" + design.component.Toolbar.info.accentTextcolor + "'>" + $context.getSize() + "</p> 개 / <p class='largefileupload-total-number' style='display:inline-block;color:" + design.component.Toolbar.info.accentTextcolor + "'> " + size_text[0] + "</p> " + size_text[1] + "</b>");

                    $(obj).find(".largefileupload-foreground").show();
                    $(obj).find(".largefileupload-background").hide();


                }
                else {
                    if ($context.getData().length > 1) {
                        $context.removeDataByIdx(0);
                    }
                    $(obj).find(".largefileupload-selector").children().not($('.largefileupload-browse').parents()).remove();


                    var file = $context.getData()[0];
                    var defaultSrc = $context.getOpt('contextPath') + "/images/";
                    var fieldName = $context.getOpt('inputName') ? $context.getOpt('inputName') : $context.dmsId;
                    var $largefileupload_input = $("<input>", {
                        name: fieldName,
                        id: fieldName,
                        type: "text",
                        class: "largefileupload-input",
                        style: "display:none"
                    }).appendTo($(obj).find(".largefileupload-selector"));
                    // 17.08.21 사용처불분명
                    // fileRow += '<input class="largefileupload-input" name = "'+fieldName+'" type="text" style="display:none" />';
                    if ($context.getOpt('controlType') == 'UPLOADBOX') {
                        var $spandel = $("<span class='btn_fileDel'>").appendTo($(obj).find(".largefileupload-selector"));
                        var $adel = $("<a>", {
                            class: "largefileupload-delete " + design.component.Toolbar.delbutton.class,
                            href: "javascript:;",
                            style: "width:" + design.component.Toolbar.delbutton.width + ";height:" + design.component.Toolbar.delbutton.height + ";" +
                            rejecttillOpacity(design.component.Toolbar.delbutton === undefined ? $context.defaults.design.component.Toolbar.delbutton.css :
                                design.component.Toolbar.delbutton.css)
                        }).appendTo($spandel);
                        if ((design.component.Toolbar.delbutton === undefined ?
                                $context.defaults.design.component.Toolbar.delbutton.top :
                                design.component.Toolbar.delbutton.top) ||
                            (design.component.Toolbar.delbutton === undefined ?
                                $context.defaults.design.component.Toolbar.delbutton.left :
                                design.component.Toolbar.delbutton.left)) {
                            $adel.css("position", "absolute");
                            if (design.component.Toolbar.delbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.delbutton.top :
                                    design.component.Toolbar.delbutton.top)
                                $adel.css("top", (design.component.Toolbar.delbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.delbutton.top :
                                    design.component.Toolbar.delbutton.top));
                            if (design.component.Toolbar.delbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.delbutton.left :
                                    design.component.Toolbar.delbutton.left)
                                $adel.css("left", (design.component.Toolbar.delbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.delbutton.left :
                                    design.component.Toolbar.delbutton.left));
                        }
                        else {
                            $adel.css("float", "right");
                        }
                        var imgdel = $("<img>", {
                            src: (design.component.Toolbar.delbutton === undefined ? $context.defaults.design.component.Toolbar.delbutton.img :
                                design.component.Toolbar.delbutton.img),
                            style: "padding-right:4px;",
                            alt: "선택된 파일 삭제"
                        }).appendTo($adel);
                        if ((design.component.Toolbar.delbutton === undefined ? $context.defaults.design.component.Toolbar.delbutton.text :
                                design.component.Toolbar.delbutton.text) != "")
                            $adel[0].innerHTML += (design.component.Toolbar.delbutton === undefined ? $context.defaults.design.component.Toolbar.delbutton.text :
                                design.component.Toolbar.delbutton.text);

                        var $spandown = $("<span>").appendTo($(obj).find(".largefileupload-selector"));
                        var $largefileupload_download = $("<a>", {
                            class: "largefileupload-download " + design.component.Toolbar.downbutton.class,
                            style: "width:" + design.component.Toolbar.downbutton.width + ";height:" + design.component.Toolbar.downbutton.height + ";" +
                            rejecttillOpacity(design.component.Toolbar.downbutton === undefined ? $context.defaults.design.component.Toolbar.downbutton.css :
                                design.component.Toolbar.downbutton.css) + "opacity:0.6;"
                        }).appendTo($spandown);
                        if ((design.component.Toolbar.downbutton === undefined ?
                                $context.defaults.design.component.Toolbar.downbutton.top :
                                design.component.Toolbar.downbutton.top) ||
                            (design.component.Toolbar.downbutton === undefined ?
                                $context.defaults.design.component.Toolbar.downbutton.left :
                                design.component.Toolbar.downbutton.left)) {
                            $largefileupload_download.css("position", "absolute");
                            if (design.component.Toolbar.downbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.downbutton.top :
                                    design.component.Toolbar.downbutton.top)
                                $largefileupload_download.css("top", (design.component.Toolbar.downbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.downbutton.top :
                                    design.component.Toolbar.downbutton.top));
                            if (design.component.Toolbar.downbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.downbutton.left :
                                    design.component.Toolbar.downbutton.left)
                                $largefileupload_download.css("left", (design.component.Toolbar.downbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.downbutton.left :
                                    design.component.Toolbar.downbutton.left));
                        }
                        else {
                            $largefileupload_download.css("float", "right");
                        }
                        var imgdown = $("<img>", {
                            src: (design.component.Toolbar.downbutton === undefined ? $context.defaults.design.component.Toolbar.downbutton.img :
                                design.component.Toolbar.downbutton.img),
                            style: "padding-right:4px;opacity:0.6;",
                            alt: "선택된 파일 다운로드"
                        }).appendTo($largefileupload_download);
                        if ((design.component.Toolbar.downbutton === undefined ? $context.defaults.design.component.Toolbar.downbutton.text :
                                design.component.Toolbar.downbutton.text) != "")
                            $largefileupload_download[0].innerHTML += (design.component.Toolbar.downbutton === undefined ?
                                $context.defaults.design.component.Toolbar.downbutton.text :
                                design.component.Toolbar.downbutton.text);
                        if($context.getData()[0].isUploaded) {
                        	$largefileupload_download.css('opacity', '1.0');
                        	imgdown.css('opacity', '1.0');
                        	$largefileupload_download.on('click', function () {
                                $context.downloadFileByUIdentifier(String($context.getData()[0].uniqueIdentifier), opts);
                            });
                        }

                    } else if ($context.getOpt('controlType') == 'DOWNLOADBOX') {
                        var $spandown = $("<span>").appendTo($(obj).find(".largefileupload-selector"));
                        var $largefileupload_download = $("<a>", {
                            class: "largefileupload-download " + design.component.Toolbar.downbutton.class,
                            style: "width:" + design.component.Toolbar.downbutton.width + ";height:" + design.component.Toolbar.downbutton.height + ";" +
                            rejecttillOpacity(design.component.Toolbar.downbutton === undefined ? $context.defaults.design.component.Toolbar.downbutton.css :
                                design.component.Toolbar.downbutton.css) + "opacity:0.6;"
                        }).appendTo($spandown);
                        if ((design.component.Toolbar.downbutton === undefined ?
                                $context.defaults.design.component.Toolbar.downbutton.top :
                                design.component.Toolbar.downbutton.top) ||
                            (design.component.Toolbar.downbutton === undefined ?
                                $context.defaults.design.component.Toolbar.downbutton.left :
                                design.component.Toolbar.downbutton.left)) {
                            $largefileupload_download.css("position", "absolute");
                            if (design.component.Toolbar.downbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.downbutton.top :
                                    design.component.Toolbar.downbutton.top)
                                $largefileupload_download.css("top", (design.component.Toolbar.downbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.downbutton.top :
                                    design.component.Toolbar.downbutton.top));
                            if (design.component.Toolbar.downbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.downbutton.left :
                                    design.component.Toolbar.downbutton.left)
                                $largefileupload_download.css("left", (design.component.Toolbar.downbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.downbutton.left :
                                    design.component.Toolbar.downbutton.left));
                        }
                        else {
                            $largefileupload_download.css("float", "right");
                        }
                        var imgdown = $("<img>", {
                            src: (design.component.Toolbar.downbutton === undefined ? $context.defaults.design.component.Toolbar.downbutton.img :
                                design.component.Toolbar.downbutton.img),
                            style: "padding-right:4px;opacity:0.6;",
                            alt: "선택된 파일 다운로드"
                        }).appendTo($largefileupload_download);
                        if ((design.component.Toolbar.downbutton === undefined ? $context.defaults.design.component.Toolbar.downbutton.text :
                                design.component.Toolbar.downbutton.text) != "")
                            $largefileupload_download[0].innerHTML += (design.component.Toolbar.downbutton === undefined ?
                                $context.defaults.design.component.Toolbar.downbutton.text :
                                design.component.Toolbar.downbutton.text)
                    }
                    var $largefileupload_item = $("<div>", {
                        class: 'largefileupload-file-row',
                        style: 'display:table; height:100%;'
                    }).appendTo($(obj).find(".largefileupload-selector"));
                    
                    var $largefileupload_itme_text = $("<p>", {
                        text: file.fileName + ' (' + formatSize(file.fileSize) + ')',
                        class: 'largefileupload-file-row-text',
                        style: 'display:table-cell; text-align:center; vertical-align:middle;'
                    }).appendTo($largefileupload_item);


                    $(obj).find('.largefileupload-delete').unbind('click');
                    $(obj).find('.largefileupload-delete').on('click', function () {
                        swal(comMessage.DeleteConfirm, function () {
                            if($context.getData()[0].isUploaded)
                            	$context.deleteFiles([$context.getData()[0].obj], $context.opts);
                            else
                            	$context.removeDataByIdx(0);
                            
                            $(obj).find(".largefileupload-selector").children().not($('.largefileupload-browse').parents()).remove();
                            swal.close();
                        });
                    });
                    $(obj).find('.largefileupload-delete').attr('href', "javascript:;");

                    $(obj).find('.largefileupload-download').unbind('click');

                    if ($context.getData()[0].isUploaded) {
                        $(obj).find('.largefileupload-download').on('click', function () {
                            $context.downloadFileByUIdentifier(String($context.getData()[0].uniqueIdentifier), opts);
                        });
                        $(obj).find('.largefileupload-download').attr('href', "javascript:;");
                    } else {
                        $(obj).find('.largefileupload-download').children('img').css('opacity', 0.6);
                        $(obj).find('.largefileupload-download').css('opacity', 0.6);
                    }

                }
            };
            var buildUploadBox = function () {
                var res = '';
                var defaultSrc = $context.getOpt('contextPath') + "/images/";
                var design = $context.getOpt('design');

                if ($context.getOpt('dropAreaView') === false) {
                    var $largefileupload_table2 = $("<div>", {
                        class: design.component.class,
                        style: "width:" + design.component.width + ";height:" + design.component.height + ";" + rejectCssOption(design.component.css)
                    });
                    var $largefileupload_selector = $("<div>", {
                        class: "largefileupload-selector",
                        style: "width: 100%; height: 100%;" + rejectCssOption(design.component.Toolbar.css)
                    }).appendTo($largefileupload_table2);
                    var span = $("<span>").appendTo($largefileupload_selector);
                    var a = $("<a>", {
                        class: "largefileupload-browse " + design.component.Toolbar.addbutton.class,
                        href: "javascript:;",
                        style: "width:" + design.component.Toolbar.addbutton.width + ";height:" + design.component.Toolbar.addbutton.height + ";" +
                        rejectCssOption(design.component.Toolbar.addbutton === undefined ? $context.defaults.design.component.Toolbar.addbutton.css :
                            design.component.Toolbar.addbutton.css),
                        html: '<img src="' + (design.component.Toolbar.addbutton === undefined ? $context.defaults.design.component.Toolbar.addbutton.img :
                            design.component.Toolbar.addbutton.img) + '" style=" padding-right:4px" alt="파일 추가">'
                        + (design.component.Toolbar.addbutton === undefined ? $context.defaults.design.component.Toolbar.addbutton.text :
                            design.component.Toolbar.addbutton.text)
                    }).appendTo(span);

                    if ((design.component.Toolbar.addbutton === undefined ?
                            $context.defaults.design.component.Toolbar.addbutton.top :
                            design.component.Toolbar.addbutton.top) ||
                        (design.component.Toolbar.addbutton === undefined ?
                            $context.defaults.design.component.Toolbar.addbutton.left :
                            design.component.Toolbar.addbutton.left)) {
                        a.css("position", "absolute");
                        if (design.component.Toolbar.addbutton === undefined ?
                                $context.defaults.design.component.Toolbar.addbutton.top :
                                design.component.Toolbar.addbutton.top)
                            a.css("top", (design.component.Toolbar.addbutton === undefined ?
                                $context.defaults.design.component.Toolbar.addbutton.top :
                                design.component.Toolbar.addbutton.top));
                        if (design.component.Toolbar.addbutton === undefined ?
                                $context.defaults.design.component.Toolbar.addbutton.left :
                                design.component.Toolbar.addbutton.left)
                            a.css("left", (design.component.Toolbar.addbutton === undefined ?
                                $context.defaults.design.component.Toolbar.addbutton.left :
                                design.component.Toolbar.addbutton.left));
                    }
                    else {
                        a.css("float", "right");
                    }
                    var $input = $("<input>", {
                        type: "text",
                        class: "largefileupload-input",
                        id: ($context.getOpt('inputName') ? $context.getOpt('inputName') : $context.dmsId),
                        name: ($context.getOpt('inputName') ? $context.getOpt('inputName') : $context.dmsId),
                        style: "display:none"
                    }).appendTo($largefileupload_selector);
                    var fileAddLabel = $("<label>", {
                        for: ($context.getOpt('inputName') ? $context.getOpt('inputName') : $context.dmsId),
                        text:"파일 업로드",
                        style: "display:none"
                    }).appendTo($largefileupload_selector);

                    var fileSelectLabel = $("<label>", {
                        for: "largefileupload-file-select" + $context.lfu.largeFileUploadId,
                        text:"파일 추가",
                        style: "display:none"
                    }).appendTo(a);
                }
                else {

                    var $largefileupload_table2 = $("<div>", {
                        class: "largefileupload-drop " + design.component.class,
                        id: "largefileupload-table2",
                        style: rejectCssOption(design.component.css) + 'width:' + design.component.width + ";height:" + design.component.height
                    });

                    var $largefileupload_background = $("<div>", {
                        class: "largefileupload-background " + design.component.dropbox.class,
                        ondragend: "jQuery(this).removeClass('largefileupload-dragover')",
                        ondragenter: "jQuery(this).addClass('largefileupload-dragover')",
                        ondrop: "jQuery(this).removeClass('largefileupload-dragover')"
                    }).appendTo($largefileupload_table2);
                    if ($context.getOpt('controlType') == "UPLOADBOX") {
                        var $dropdiv = $("<div>", {
                            style: rejectCssOption(design.component.dropbox.css)
                        }).appendTo($largefileupload_background);

                        $dropdiv.css("width", "100%");
                        $dropdiv.css("height", "100%");

                        var $coverTextImg = $("<div>");

                        if (design.component.dropbox.coverImgText.top || design.component.dropbox.coverImgText.left) {
                            $coverTextImg.css("position", "absolute");
                            if (design.component.dropbox.coverImgText.top)
                                $coverTextImg.css("top", design.component.dropbox.coverImgText.top);
                            if (design.component.dropbox.coverImgText.left)
                                $coverTextImg.css("left", design.component.dropbox.coverImgText.left);
                        }


                        var $coverImg = $("<img>", {
                            src: design.component.dropbox.coverImgText.img,
                            alt: "파일을 마우스로 끌어 넣어주세요"
                        });
                        var $coverText = design.component.dropbox.coverImgText.text;
                        $coverTextImg.append($coverImg);
                        $coverTextImg[0].innerHTML += "<br/>";
                        $coverTextImg.append($coverText);
                        $($coverTextImg[0].getElementsByTagName("b")).css("color", design.component.dropbox.coverImgText.accentTextcolor);
                        $dropdiv.append($coverTextImg);
                        $largefileupload_background.append($dropdiv);
                    }
                    var $largefileupload_foreground = $("<div>", {
                        class: "largefileupload-foreground"
                    }).appendTo($largefileupload_table2);

                    var $table = $("<table>", {
                        style: "width:100%;border-collapse:collapse;",
                    }).appendTo($largefileupload_foreground);

                    var $caption = $("<caption>", {
                        text : "파일의 선택정보, Name, Size, Progess을 확인 할 수 있습니다."
                    }).appendTo($table);

                    var $thead = $("<thead>", {
                        class: "rowgroup"
                    }).appendTo($table);

                    var $tr = $("<tr>", {
                        class: "row"
                    }).appendTo($thead);

                    var $thname = $("<th>", {
                        class: "grid-header " + design.component.fileList.header.class,
                        scope: "col",
                        style: rejectCssOption(design.component.fileList.header.css) + 'width:' + design.component.fileList.width[0]
                    }).appendTo($tr);

                    var $check = $("<input>", {
                        class: "largefileupload-checkbox-header",
                        type: "checkbox",
                        id: "largefileupload-checkbox-header",
                        style: "padding-right:12px"
                    }).appendTo($thname);

                    var $checkLabel = $("<label>", {
                        class: "largefileupload-checkbox-label",
                        for: "largefileupload-checkbox-header",
                        text: "전체선택"
                    }).appendTo($thname);

                    $thname.html($thname.html() + "<span style='padding-left:12px;'>파일명</span>");
                    var $thsize = $("<th>", {
                        class: "grid-header " + design.component.fileList.header.class,
                        style: rejectCssOption(design.component.fileList.header.css) + 'width:' + design.component.fileList.width[1],
                        scope: "col",
                        text: "파일용량"
                    }).appendTo($tr);
                    var $am2_dms_tbl = $("<div>", {
                        class: "am2_dms_tbl",
                        style: "top:0px;overflow-y:auto;border-collapse:collapse;width:100%;"
                    }).appendTo($largefileupload_foreground);
                    var $table_grid = $("<table>", {
                        class: "grid",
                        style: "width:100%;",
                    }).appendTo($am2_dms_tbl);

                    var $caption2 = $("<caption>", {
                        text : "파일의 선택정보, Name, Size, Progess을 확인 할 수 있습니다."
                    }).appendTo($table_grid);

                    var $thead2 = $("<thead>", {
                        class: "rowgroup",
                        css:{
                            display: "none"
                        }
                    }).appendTo($table_grid);

                    var $thname = $("<th>", {
                        class: "grid-header " + design.component.fileList.header.class,
                        scope: "col",
                        style: rejectCssOption(design.component.fileList.header.css) + 'width:' + design.component.fileList.width[0]
                    }).appendTo($thead2);

                    $thname.html($thname.html() + "<span style='padding-left:12px;'>파일명</span>");
                    var $thsize = $("<th>", {
                        class: "grid-header " + design.component.fileList.header.class,
                        style: rejectCssOption(design.component.fileList.header.css) + 'width:' + design.component.fileList.width[1],
                        scope: "col",
                        text: "파일용량"
                    }).appendTo($thead2);

                    var $tbody = $("<tbody>", {
                        class: "largefileupload-list"
                    }).appendTo($table_grid);
                    var $largefileupload_selector = $("<div>", {
                        class: "largefileupload-selector"
                    }).appendTo($largefileupload_table2);

                    if ($context.getOpt('controlType') == "UPLOADBOX") {
                        var span = $("<span>").appendTo($largefileupload_selector);
                        var a = $("<a>", {
                            class: "largefileupload-browse " + design.component.Toolbar.addbutton.class,
                            href: "javascript:;",
                            style: "width:" + design.component.Toolbar.addbutton.width + ";height:" + design.component.Toolbar.addbutton.height + ";" +
                            rejectCssOption(design.component.Toolbar.addbutton === undefined ? $context.defaults.design.component.Toolbar.addbutton.css :
                                design.component.Toolbar.addbutton.css),
                            html: '<img src="' + (design.component.Toolbar.addbutton === undefined ? $context.defaults.design.component.Toolbar.addbutton.img :
                                design.component.Toolbar.addbutton.img) + '" style=" padding-right:4px" alt="파일 추가">'
                            + (design.component.Toolbar.addbutton === undefined ? $context.defaults.design.component.Toolbar.addbutton.text :
                                design.component.Toolbar.addbutton.text)
                        }).appendTo(span);
                        if ((design.component.Toolbar.addbutton === undefined ?
                                $context.defaults.design.component.Toolbar.addbutton.top :
                                design.component.Toolbar.addbutton.top) ||
                            (design.component.Toolbar.addbutton === undefined ?
                                $context.defaults.design.component.Toolbar.addbutton.left :
                                design.component.Toolbar.addbutton.left)) {
                            a.css("position", "absolute");
                            if (design.component.Toolbar.addbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.addbutton.top :
                                    design.component.Toolbar.addbutton.top)
                                a.css("top", (design.component.Toolbar.addbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.addbutton.top :
                                    design.component.Toolbar.addbutton.top));
                            if (design.component.Toolbar.addbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.addbutton.left :
                                    design.component.Toolbar.addbutton.left)
                                a.css("left", (design.component.Toolbar.addbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.addbutton.left :
                                    design.component.Toolbar.addbutton.left));
                        }
                    }
                    var $span = $("<span>").appendTo($largefileupload_selector);
                    var $largefileupload_download = $("<a>", {
                        href: "javascript:;",
                        class: "largefileupload-download " + design.component.Toolbar.downbutton.class,
                        style: "width:" + design.component.Toolbar.downbutton.width + ";height:" + design.component.Toolbar.downbutton.height + ";" +
                        rejecttillOpacity(design.component.Toolbar.downbutton === undefined ? $context.defaults.design.component.Toolbar.downbutton.css :
                            design.component.Toolbar.downbutton.css) + "opacity:0.6;"
                    }).appendTo($span);
                    if ((design.component.Toolbar.downbutton === undefined ?
                            $context.defaults.design.component.Toolbar.downbutton.top :
                            design.component.Toolbar.downbutton.top) ||
                        (design.component.Toolbar.downbutton === undefined ?
                            $context.defaults.design.component.Toolbar.downbutton.left :
                            design.component.Toolbar.downbutton.left)) {
                        $largefileupload_download.css("position", "absolute");
                        if (design.component.Toolbar.downbutton === undefined ?
                                $context.defaults.design.component.Toolbar.downbutton.top :
                                design.component.Toolbar.downbutton.top)
                            $largefileupload_download.css("top", (design.component.Toolbar.downbutton === undefined ?
                                $context.defaults.design.component.Toolbar.downbutton.top :
                                design.component.Toolbar.downbutton.top));
                        if (design.component.Toolbar.downbutton === undefined ?
                                $context.defaults.design.component.Toolbar.downbutton.left :
                                design.component.Toolbar.downbutton.left)
                            $largefileupload_download.css("left", (design.component.Toolbar.downbutton === undefined ?
                                $context.defaults.design.component.Toolbar.downbutton.left :
                                design.component.Toolbar.downbutton.left));
                    }

                    if ($context.getOpt('controlType') == "UPLOADBOX") {
                        var img = $("<img>", {
                            src: (design.component.Toolbar.downbutton === undefined ? $context.defaults.design.component.Toolbar.downbutton.img :
                                design.component.Toolbar.downbutton.img),
                            style: "padding-right:4px;opacity:0.6;",
                            alt: "선택된 파일 다운로드"
                        }).appendTo($largefileupload_download);
                        if ((design.component.Toolbar.downbutton === undefined ? $context.defaults.design.component.Toolbar.downbutton.text :
                                design.component.Toolbar.downbutton.text) != "")
                            $largefileupload_download[0].innerHTML += (design.component.Toolbar.downbutton === undefined ?
                                $context.defaults.design.component.Toolbar.downbutton.text :
                                design.component.Toolbar.downbutton.text)
                    }
                    else if ($context.getOpt('controlType') == 'DOWNLOADBOX') {
                        var img = $("<img>", {
                            src: (design.component.Toolbar.downbutton === undefined ? $context.defaults.design.component.Toolbar.downbutton.img :
                                design.component.Toolbar.downbutton.img),
                            style: "padding-right:4px;opacity:0.6",
                            alt: "선택된 파일 다운로드"
                        }).appendTo($largefileupload_download);
                        if ((design.component.Toolbar.downbutton === undefined ? $context.defaults.design.component.Toolbar.downbutton.text :
                                design.component.Toolbar.downbutton.text) != "")
                            $largefileupload_download[0].innerHTML += (design.component.Toolbar.downbutton === undefined ?
                                $context.defaults.design.component.Toolbar.downbutton.text :
                                design.component.Toolbar.downbutton.text)
                    }
                    if ($context.getOpt('controlType') == "UPLOADBOX") {
                        var span = $("<span class='btn_fileDel'>").appendTo($largefileupload_selector);
                        var $a = $("<a>", {
                            class: "largefileupload-delete " + design.component.Toolbar.delbutton.class,
                            href: "javascript:;",
                            style: "width:" + design.component.Toolbar.delbutton.width + ";height:" + design.component.Toolbar.delbutton.height + ";" +
                            rejecttillOpacity(design.component.Toolbar.delbutton === undefined ? $context.defaults.design.component.Toolbar.delbutton.css :
                                design.component.Toolbar.delbutton.css) + "opacity:0.6;"
                        }).appendTo(span);
                        if ((design.component.Toolbar.delbutton === undefined ?
                                $context.defaults.design.component.Toolbar.delbutton.top :
                                design.component.Toolbar.delbutton.top) ||
                            (design.component.Toolbar.delbutton === undefined ?
                                $context.defaults.design.component.Toolbar.delbutton.left :
                                design.component.Toolbar.delbutton.left)) {
                            $a.css("position", "absolute");
                            if (design.component.Toolbar.delbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.delbutton.top :
                                    design.component.Toolbar.delbutton.top)
                                $a.css("top", (design.component.Toolbar.delbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.delbutton.top :
                                    design.component.Toolbar.delbutton.top));
                            if (design.component.Toolbar.delbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.delbutton.left :
                                    design.component.Toolbar.delbutton.left)
                                $a.css("left", (design.component.Toolbar.delbutton === undefined ?
                                    $context.defaults.design.component.Toolbar.delbutton.left :
                                    design.component.Toolbar.delbutton.left));
                        }
                        var img = $("<img>", {
                            src: (design.component.Toolbar.delbutton === undefined ? $context.defaults.design.component.Toolbar.delbutton.img :
                                design.component.Toolbar.delbutton.img),
                            style: "padding-right:4px;opacity:0.6;",
                            alt: "선택된 파일 삭제"
                        }).appendTo($a);
                        if ((design.component.Toolbar.delbutton === undefined ? $context.defaults.design.component.Toolbar.delbutton.text :
                                design.component.Toolbar.delbutton.text) != "")
                            $a[0].innerHTML += (design.component.Toolbar.delbutton === undefined ? $context.defaults.design.component.Toolbar.delbutton.text :
                                design.component.Toolbar.delbutton.text);
                        var $inputfile = $("<input>", {
                            class: "largefileupload-input",
                            id: ($context.getOpt('inputName') ? $context.getOpt('inputName') : $context.dmsId),
                            name: ($context.getOpt('inputName') ? $context.getOpt('inputName') : $context.dmsId),
                            type: "text",
                            style: "display:none"
                        }).appendTo($largefileupload_selector);
                        var fileAddLabel = $("<label>", {
                            for: ($context.getOpt('inputName') ? $context.getOpt('inputName') : $context.dmsId),
                            text:"파일 업로드",
                            style: "display:none"
                        }).appendTo($largefileupload_selector)

                        var fileSelectLabel = $("<label>", {
                            for: "largefileupload-file-select" + $context.lfu.largeFileUploadId,
                            text:"파일 추가",
                            style: "display:none"
                        }).appendTo(a);
                    }
                    var $largefileupload_total = $("<span>", {
                        class: "largefileupload-total"
                    }).appendTo($largefileupload_selector);

                    if ((design.component.Toolbar.info === undefined ?
                            $context.defaults.design.component.Toolbar.info.top :
                            design.component.Toolbar.info.top) ||
                        (design.component.Toolbar.info === undefined ?
                            $context.defaults.design.component.Toolbar.info.left :
                            design.component.Toolbar.info.left)) {
                        $largefileupload_total.css("position", "absolute");
                        if (design.component.Toolbar.info === undefined ?
                                $context.defaults.design.component.Toolbar.info.top :
                                design.component.Toolbar.info.top)
                            $largefileupload_total.css("top", (design.component.Toolbar.info === undefined ?
                                $context.defaults.design.component.Toolbar.info.top :
                                design.component.Toolbar.info.top));
                        if (design.component.Toolbar.info === undefined ?
                                $context.defaults.design.component.Toolbar.info.left :
                                design.component.Toolbar.info.left)
                            $largefileupload_total.css("left", (design.component.Toolbar.info === undefined ?
                                $context.defaults.design.component.Toolbar.info.left :
                                design.component.Toolbar.info.left));
                    }
                    else {
                        $largefileupload_total.css("float", "right");
                    }
                }

                $a2mUpload.html($largefileupload_table2[0].outerHTML);


                $($a2mUpload).find('.largefileupload-download').removeAttr("href");
                $($a2mUpload).find('.largefileupload-delete').removeAttr("href");


                if ($context.getOpt("data") && $context.getOpt("data").length != 0) {
                    $($a2mUpload).find(".largefileupload-foreground").show();
                    $($a2mUpload).find(".largefileupload-background").hide();
                } else {
                    $($a2mUpload).find(".largefileupload-foreground").hide();
                    $($a2mUpload).find(".largefileupload-background").show();
                }

                $($a2mUpload).find('input[class=largefileupload-checkbox-header]').on('change', function () {
                    $($a2mUpload).find('input[class=largefileupload-checkbox]').prop('checked', this.checked);

                    var arr = $($a2mUpload).find('input[class=largefileupload-checkbox]:checked');
                    var downloadable = true;
                    $.each(arr, function (index, value) {
                        if ($($a2mUpload).data('dms').getDataByUIdentifier(value.value).isUploaded && downloadable)
                            downloadable = true;
                        else downloadable = false;
                    })
                    if (arr.length > 0) {
                        if (downloadable) {
                            $($a2mUpload).find('.largefileupload-download').children('img').css('opacity', 1.0);
                            $($a2mUpload).find('.largefileupload-download').css('opacity', 1.0);
                            $($a2mUpload).find('.largefileupload-download').attr("href", "javascript:;");
                            $($a2mUpload).find('.largefileupload-download').off('click');
                            $($a2mUpload).find('.largefileupload-download').on('click', function () {
                                var arr = $.makeArray($($a2mUpload).find('input[class=largefileupload-checkbox]:checked').map(function () {
                                    return $(this).attr('value');
                                }));
                                if (arr.length == 1) {
                                    $context.downloadFileByUIdentifier(String(arr[0]), opts);
                                } else if (arr.length > 0) {
                                    var downloadArray = [];
                                    $.each(arr, function (i, value) {
                                        downloadArray.push($context.getDataByUIdentifier(value).obj);
                                    });
                                    $context.downloadFiles(downloadArray, opts);
                                }
                            });
                        } else {
                            $($a2mUpload).find('.largefileupload-download').children('img').css('opacity', 0.6);
                            $($a2mUpload).find('.largefileupload-download').css('opacity', 0.6);
                            $($a2mUpload).find('.largefileupload-download').off('click');

                            $($a2mUpload).find('.largefileupload-download').removeAttr("href");
                        }
                        $($a2mUpload).find('.largefileupload-delete').children('img').css('opacity', 1.0);
                        $($a2mUpload).find('.largefileupload-delete').css('opacity', 1.0);
                        $($a2mUpload).find('.largefileupload-delete').attr("href", "javascript:;");
                    } else {
                        $($a2mUpload).find('.largefileupload-download').children('img').css('opacity', 0.6);
                        $($a2mUpload).find('.largefileupload-download').css('opacity', 0.6);
                        $($a2mUpload).find('.largefileupload-delete').css('opacity', 0.6);
                        $($a2mUpload).find('.largefileupload-delete').children('img').css('opacity', 0.6);

                        $($a2mUpload).find('.largefileupload-download').removeAttr("href");
                        $($a2mUpload).find('.largefileupload-delete').removeAttr("href");
                    }
                });

                $($a2mUpload).find('.largefileupload-download').on('click', function () {
                    var arr = $.makeArray($($a2mUpload).find('input[class=largefileupload-checkbox]:checked').map(function () {
                        return $(this).attr('value');
                    }));
                    if (arr.length == 1) {
                        $context.downloadFileByUIdentifier(String(arr[0]), opts);
                    } else if (arr.length > 0) {
                        var downloadArray = [];
                        $.each(arr, function (i, value) {
                            downloadArray.push($context.getDataByUIdentifier(value).obj);
                        });
                        $context.downloadFiles(downloadArray, opts);
                    }
                });

                $($a2mUpload).find('.largefileupload-delete').on('click', function () {
                    var arr = $.makeArray($($a2mUpload).find('input[class=largefileupload-checkbox]:checked').map(function () {
                        return $(this).attr('value');
                    }));

                    if (arr.length > 0) {
                        swal(comMessage.DeleteConfirm,
                            function () {

                                var deleteData = [];
                                $.each(arr, function (i, s) {
                                    var file = $context.removeDataByUIdentifier(s);
                                    if (file.isUploaded) {
                                        deleteData.push(file.obj);
                                    }
                                });
                                $context.deleteFiles(deleteData, $context.opts);


                                if ($context.getTotalFileSize() == 0) {
                                    $($a2mUpload).find(".largefileupload-foreground").hide();
                                    $($a2mUpload).find(".largefileupload-background").show();
                                }
                                $($a2mUpload).find('input[class=largefileupload-checkbox-header]').prop("checked", false);
                                $($a2mUpload).find('.largefileupload-download').children('img').css('opacity', 0.6);
                                $($a2mUpload).find('.largefileupload-delete').children('img').css('opacity', 0.6);
                                $($a2mUpload).find('.largefileupload-download').removeAttr("href");
                                $($a2mUpload).find('.largefileupload-delete').removeAttr("href");

                                var size_text = formatSize($context.getTotalFileSize()).split(" ");
                                $($a2mUpload).find('.largefileupload-total').html("<b style='color:" + design.component.Toolbar.info.textcolor + "'>총 <p class='largefileupload-total-number' style='display:inline-block;color:" + design.component.Toolbar.info.accentTextcolor + "'>" + $context.getSize() + "</p> 개 / <p class='largefileupload-total-number' style='display:inline-block;color:" + design.component.Toolbar.info.accentTextcolor + "'> " + size_text[0] + "</p> " + size_text[1] + "</b>");
                            });

                    }


                });

                var size_text = formatSize($context.getTotalFileSize()).split(" ");
                $($a2mUpload).find('.largefileupload-total').html("<b style='color:" + design.component.Toolbar.info.textcolor + "'>총 <p class='largefileupload-total-number' style='display:inline-block;color:" + design.component.Toolbar.info.accentTextcolor + "'>" + $context.getSize() + "</p> 개 / <p class='largefileupload-total-number' style='display:inline-block;color:" + design.component.Toolbar.info.accentTextcolor + "'> " + size_text[0] + "</p> " + size_text[1] + "</b>");

                var headerHeight = $a2mUpload.height();
                if (design.component.Toolbar.layout == "left" || design.component.Toolbar.layout == "right") {
                    if (design.component.Toolbar.size.indexOf("%") != -1) {
                        $a2mUpload.find('.largefileupload-background').css('width', (100 - design.component.Toolbar.size.replace("%", "")) + "%");
                        $a2mUpload.find(".largefileupload-foreground").css('width', (100 - design.component.Toolbar.size.replace("%", "")) + "%");
                    }
                    else {
                        $a2mUpload.find('.largefileupload-background').css('width', $a2mUpload.width() - design.component.Toolbar.size);
                        $a2mUpload.find('.largefileupload-foreground').css('width', $a2mUpload.width() - design.component.Toolbar.size);
                    }
                    $a2mUpload.find('.largefileupload-selector').css('width', design.component.Toolbar.size);
                    $a2mUpload.find('.largefileupload-selector').css('heigth', "100%");
                }
                else {
                    $a2mUpload.find('.largefileupload-background').css('width', "100%");
                    $a2mUpload.find('.largefileupload-foreground').css('width', "100%");
                }

                if ($context.getOpt('dropAreaView') === true) {
                    if (design.component.Toolbar.layout == "top" || design.component.Toolbar.layout == "bottom") {
                        if (design.component.Toolbar.size.indexOf("%") != -1) {
                            $a2mUpload.find('.largefileupload-background').css('height', (100 - design.component.Toolbar.size.replace("%", "")) + "%");
                            $a2mUpload.find('.largefileupload-foreground').css('height', (100 - design.component.Toolbar.size.replace("%", "")) + "%");
                            headerHeight = headerHeight * ((100 - design.component.Toolbar.size.replace("%", ""))*0.01);
                        }
                        else {
                            $a2mUpload.find('.largefileupload-background').css('height', $a2mUpload.height() - design.component.Toolbar.size);
                            $a2mUpload.find('.largefileupload-foreground').css('height', $a2mUpload.height() - design.component.Toolbar.size);
                            headerHeight = headerHeight - design.component.Toolbar.size;
                        }
                        $a2mUpload.find('.largefileupload-selector').css('height', design.component.Toolbar.size);
                        $a2mUpload.find('.largefileupload-selector').css('width', "100%");
                    }
                    else {
                        $a2mUpload.find('.largefileupload-foreground').css('height', "100%");
                        $a2mUpload.find('.largefileupload-background').css('height', "100%");
                    }

                }
                switch (design.component.Toolbar.layout) {
                    case "top":
                        $a2mUpload.find('.largefileupload-foreground').css("position", "relative");
                        $a2mUpload.find('.largefileupload-foreground').css("top", design.component.Toolbar.size);
                        $a2mUpload.find('.largefileupload-background').css("position", "relative");
                        $a2mUpload.find(".largefileupload-background").css("top", design.component.Toolbar.size);
                        $a2mUpload.find('.largefileupload-selector').css("position", "absolute");
                        $a2mUpload.find(".largefileupload-selector").css("top", "0%");
                        break;
                    case "left":
                        $a2mUpload.find('.largefileupload-foreground').css("position", "relative");
                        $a2mUpload.find('.largefileupload-foreground').css("float", "right");
                        $a2mUpload.find('.largefileupload-background').css("position", "relative");
                        $a2mUpload.find(".largefileupload-background").css("float", "right");
                        $a2mUpload.find('.largefileupload-selector').css("position", "absolute");
                        $a2mUpload.find(".largefileupload-selector").css("left", "0%");
                        $a2mUpload.find(".largefileupload-selector").css("height", "100%");
                        break;
                    case "right":
                        $a2mUpload.find('.largefileupload-foreground').css("position", "relative");
                        $a2mUpload.find('.largefileupload-foreground').css("float", "left");
                        $a2mUpload.find('.largefileupload-background').css("position", "relative");
                        $a2mUpload.find('.largefileupload-background').css("float", "left");
                        $a2mUpload.find('.largefileupload-selector').css("position", "absolute");
                        $a2mUpload.find(".largefileupload-selector").css("right", "0%");
                        $a2mUpload.find(".largefileupload-selector").css("height", "100%");
                        break;
                }
                $a2mUpload.find('.largefileupload-selector').attr("style", $a2mUpload.find('.largefileupload-selector').attr("style") + design.component.Toolbar.css);
                switch (design.component.Toolbar.layout) {
                    case "top":
                        $a2mUpload.find(".largefileupload-selector").css("border-bottom", $a2mUpload.find(".largefileupload-selector").css("border-top"));
                        $a2mUpload.find(".largefileupload-selector").css("border-top", "");
                        break;
                    case "left":
                        $a2mUpload.find(".largefileupload-selector").css("border-right", $a2mUpload.find(".largefileupload-selector").css("border-top"));
                        $a2mUpload.find(".largefileupload-selector").css("border-top", "");
                        break;
                    case "right":
                        $a2mUpload.find(".largefileupload-selector").css("border-left", $a2mUpload.find(".largefileupload-selector").css("border-top"));
                        $a2mUpload.find(".largefileupload-selector").css("border-top", "");
                        break;
                }

                design.component.fileList.height[0].indexOf("%") == -1 ? $a2mUpload.find('.grid-header').css("height", design.component.fileList.height[0]) :
                    $a2mUpload.find(".grid-header").css("height", headerHeight * (design.component.fileList.height[0].replace("%", "") * 0.01));
                $a2mUpload.find('.am2_dms_tbl').css('height', headerHeight - $a2mUpload.find('.grid-header').outerHeight(false) - 3);
            };

            $context.downloadFileByUIdentifier = function (uid, events) {
            	debugger;
                $context.lfu.developLogger.logger('t', 'downloadFileByUIdentifier - uid', uid, 'string');
                $context.lfu.developLogger.logger('t', 'downloadFileByUIdentifier - event', events, 'object');
                var onDownComplete;
                var onBeforeDown;
                var onDownError;
                try {
                    if (events) {
                        onDownComplete = events["onDownComplete"];
                        onBeforeDown = events["onBeforeDown"];
                        onDownError = events["onDownError"];
                    }
                    var file = $context.getDataByUIdentifier(String(uid)).obj;
                    if (onBeforeDown)
                        onBeforeDown($context, file);

                    var param = {
                        fileName: file.fileName,
                        filePath: file.filePath,
                        uniqueIdentifier: String(file.uniqueIdentifier)
                    };
                    var url = $context.getOpt('transmitDirection').download === undefined ? $context.defaults.transmitDirection.download:$context.getPath($context.getOpt('transmitDirection').download);
                    url += '?' + $.param(param);
                    $.ajax({
                        url: url,
                        type: 'GET',
                        cache: false,
                        suppressErrors: false,
                        success: function (data, textStatus, jqXHR) {
                        	if (onDownComplete)
                                onDownComplete($context, file);
                            $context.lfu.developLogger.logger('i', 'File download a success!', file);
                        },
                        error: function () {
                        	if (onDownError)
                                onDownError($context, file);
                            $context.lfu.developLogger.logger('e', 'File download failed!', file);
                        }
                    });
//                    $.fileDownload(url)
//                        .done(function () {
//                            if (onDownComplete)
//                                onDownComplete($context, file);
//                            $context.lfu.developLogger.logger('i', 'File download a success!', file);
//                        })
//                        .fail(function () {
//                            if (onDownError)
//                                onDownError($context, file);
//                            $context.lfu.developLogger.logger('e', 'File download failed!', file);
//                        });
                }catch (e){
                    $context.lfu.developLogger.logger('e', 'downloadFileByUIdentifier', e);
                }
            };
            $context.deleteFileByUIdentifier = function (uid, events) {
                $context.lfu.developLogger.logger('t', 'deleteFileByUIdentifier - uid', uid, 'string');
                try {
                    var file = $context.getDataByUIdentifier(String(uid)).obj;
                    swal(comMessage.DeleteConfirm,
                        function () {
                            $context.deleteFiles([file], events);
                        });
                }catch (e){
                    $context.lfu.developLogger.logger('e', 'deleteFileByUIdentifier', e);
                }
            };
            $context.downloadFiles = function (files, events) {
                $context.lfu.developLogger.logger('t', 'downloadFiles - files', files, 'object');
                $context.lfu.developLogger.logger('t', 'downloadFiles - event', events, 'object');
                var onDownComplete;
                var onBeforeDown;
                var onDownError;
                try {
                    if (events) {
                        onDownComplete = events["onDownComplete"];
                        onBeforeDown = events["onBeforeDown"];
                        onDownError = events["onDownError"];
                        // var onDownSuccess = events["onDownSuccess"];
                    }
                    if (onBeforeDown) {
                        onBeforeDown($context, files);
                    }
                    var contextPath = files[0].contextPath;
                    var baseControllerPath = files[0].baseControllerPath;

                if (typeof files !== String)
                    fileJson = JSON.stringify(files);
                $.ajax({
                    url: $context.getOpt('transmitDirection').zip === undefined ? $context.defaults.transmitDirection.zip : $context.getPath($context.getOpt('transmitDirection').zip),
                    type: 'POST',
                    data: {files: fileJson},
                    cache: false,
                    suppressErrors: false,
                    success: function (data, textStatus, jqXHR) {
                        $context.lfu.developLogger.logger('i', "zip file success", files);
                        var jdata = JSON.parse(data);

                        var param = {
                            fileName: jdata.fileName,
                            filePath: jdata.filePath,
                            uniqueIdentifier: String(jdata.uniqueIdentifier)
                        };
                        var url = $context.getOpt('transmitDirection').downloadZip === undefined ? $context.defaults.transmitDirection.downloadZip: $context.getPath($context.getOpt('transmitDirection').downloadZip);
                        url += '?' + $.param(param);
                        $context.lfu.developLogger.logger('i', 'File download', url);
                        $.fileDownload(url)
                            .done(function (data) {
                                var arr = data.match(/&filePath=(.*).zip&/);
                                if (arr.length === 2)
                                    a2mdms.deleteFiles(arr[1] + ".zip", false);
                            })
                            .fail(function () {
                                if (onDownError)
                                    onDownError($context, file);
                                $context.lfu.developLogger.logger('e', 'File download failed!');

                            });
                        var refreshIntervalId = setInterval(function () {
                            $.ajax({
                                url: $context.getOpt('transmitDirection').progress === undefined ? $context.defaults.transmitDirection.progress : $context.getPath($context.getOpt('transmitDirection').progress),
                                type: 'post',
                                data: param,
                                cache: false,
                                suppressErrors: false,
                                success: function (data, textStatus, jqXHR) {
                                    if (data) {
                                        var jd = JSON.parse(data);
                                        $context.lfu.developLogger.logger('i','Downloading... ' + jd.downloadSize + ' / ' + jd.fileSize);
                                        if (jd.fileSize === jd.downloadSize) {
                                            $context.lfu.developLogger.logger('i', 'File download a success!');
                                            /* later */
                                            clearInterval(refreshIntervalId);
                                            if (onDownComplete) {
                                                onDownComplete($context, files);
                                            }
                                        }
                                    }
                                }
                            });
                        }, 1000);

                        }, complete: function () {
                            return true;
                        }, error: function (request, status, error, event) {
                            onDownError($context, files);
                            swal(comMessage.DownloadError);
                            return false;
                        }
                    });
                }catch (e){
                    $context.lfu.developLogger.logger('e', 'downloadFiles', e);
                }
            };
            $context.deleteFiles = function (files, events) {
                $context.lfu.developLogger.logger('t', 'deleteFiles - files', files, ['dmsfile', 'dmsfilelist']);
                $context.lfu.developLogger.logger('t', 'deleteFiles - events', events, 'object');

                var onDeleteComplete;
                var onBeforeDelete;
                var onDeleteError;
                try {
                    if (events) {
                        onDeleteComplete = events["onDeleteComplete"];
                        onBeforeDelete = events["onBeforeDelete"];
                        onDeleteError = events["onDeleteError"];
                    }
                    if (onBeforeDelete) {
                        onBeforeDelete($context, files);
                    }

                    var filePaths = '';
                    if (events == false)
                        filePaths = files;
                    else {
                        $.each(files, function (i, file) {
                            filePaths += file.filePath
                            if (files.length != (i + 1)) {
                                filePaths += ',';
                            }
                        });
                    }

                    $.ajax({
                        url: $context.getOpt('transmitDirection').delete === undefined ? $context.defaults.transmitDirection.delete : $context.getPath($context.getOpt('transmitDirection').delete),
                        type: 'post',
                        data: {filePaths: filePaths},
                        cache: false,
                        suppressErrors: false,
                        success: function (data, textStatus, jqXHR) {
                            $context.lfu.developLogger.logger('i', "delete success");
                        }, complete: function () {
                            $context.lfu.developLogger.logger('i', "delete complete");
                            swal.close()
                            if (onDeleteComplete) {
                                onDeleteComplete($context, files);
                            }
                            return true;
                        }, error: function (request, status, error, event) {
                            $context.lfu.developLogger.logger('e', "delete error!");
                            if (onDeleteError) {
                                onDeleteError($context, files);
                            }
                            return false;
                        }
                    });
                } catch (e){
                    $context.lfu.developLogger.logger('e', 'deleteFiles', e);
                }
            };

            // $context.getFile = function (fileIds, callback) {
            //     $.ajax({
            //         url: $context.getOpt('contextPath') + $context.getOpt('baseControllerPath') + '/getFile.jsp',
            //         type: 'post',
            //         data: {fileId: fileIds},
            //         cache: false,
            //         suppressErrors: false,
            //         success: function (data, textStatus, jqXHR) {
            //             $context.lfu.developLogger.log('i',"getFile success");
            //         }, complete: function () {
            //             $context.lfu.developLogger.log('i',"getFile complete");
            //             swal.close()
            //             eval(callback + '(' + data + ')');
            //             return true;
            //         }, error: function (request, status, error, event) {
            //             swal(comMessage.GetfileError);
            //             return false;
            //         }
            //     });
            //
            // };

            $context.destroy = function () {
                try {
                    var dms = $($a2mUpload).data('dms');
                    var arr = dms.getData();
                    $.each(arr, function (index, value) {
                        dms.removeDataByUIdentifier(String(value.uniqueIdentifier));
                    });
                    $($a2mUpload).children().remove();
                    $($a2mUpload).removeData('dms');
                    $($a2mUpload).removeClass('largefile-layout-form');
                } catch (e) {
                    $context.lfu.developLogger.logger('e', 'destroy', e);
                }
            };

            return (this);
        };

        if (opts) {
            debugger;
            a2mdms = new A2mDms(opts);
            var contextPath = a2mdms.getOpt('contextPath');
            var baseControllerPath = a2mdms.getOpt('baseControllerPath');
            $.ajax({
                url: a2mdms.getOpt('transmitDirection').foldercheck === undefined ? a2mdms.defaults.transmitDirection.foldercheck:a2mdms.getPath(a2mdms.getOpt('transmitDirection').foldercheck),
                data:{'licenseKey' : a2mdms.getOpt('licenseKey')},
                type: 'post',
                cache: false,
                async: false,
                success: function (data, textStatus, jqXHR) {
                    if (data.match(/true/)) {
                        a2mdms.init();
                        jQuery.data($a2mUpload, 'dms', a2mdms);
                        $a2mUpload.data('dms', a2mdms);
                        $a2mUpload.addClass('largefile-layout-form');
                    } else if(data.match(/false/)){
                        a2mdms.init();
                        a2mdms.lfu.developLogger.logger('e','업로드 할 폴더를 찾을 수 없습니다. 경로를 다시 확인해주세요.');
                        a2mdms.destroy();
                    }

                    a2mdms.lfu.sessionid = data.split(',')[1].trim();
                },
                error: function (request, status, error, event) {
                    try {
                        if (request.responseText.error.message.match(/license error/)) {
                            swal(comMessage.NotValidateLicense);
                        }
                    }catch (e) {
                        swal(comMessage.InitialError);
                    }
                    return false;
                }
            });
            return a2mdms;
        } else {
            return $a2mUpload.data('dms');
        }

    };

}(jQuery));


var A2mDmsUI = function (opts) {

//		 readConfigFiles()
    this.version = 1.0;
    this.mA2mDms = [];
    this.files = [];
    this.currentTotalFileSize = 0;
    this.isValidate = true;
    this.a2mDmsMotion = new A2mDmsMotion();
    this.design = new Design(opts);
    this.currentUploadingFile = '';

    this.addFile = function (f) {
        this.files.push(f);
    }
    this.getA2mDms = function () {
        return this.mA2mDms;
    };
    this.setA2mDms = function (myA2mDms) {
        this.mA2mDms = myA2mDms;
    };
    this.pushA2mDms = function (myA2mDms) {
        this.mA2mDms.push(myA2mDms);
    };
    // PROPERTIES
    var $context = this;
    $context.defaults = {
        contextPath: "/JspLfu/",
        dom: '#a2m-dms-ui',
        pauseImageUrl: "images/pause.png",
        resumeImageUrl: "images/resume.png",
        closeImageUrl: "images/close.png",
        width: '100%',
        height: '294px',
        dropAreaView: true
    };

    // grobal Default variable - user can config
    var $uploadOpts = {};
    if (uploadDefault) {
        // is not null
        $uploadOpts = $.extend($uploadOpts, $context.defaults, uploadDefault);
    } else {
        // is null
        $uploadOpts = $.extend($uploadOpts, $context.defaults)
    }

    // merge the object
    $context.opts = $.extend({}, $uploadOpts, opts);

    // save target
    // $context.opts
    $context.getOpt = function (o) {
        var $opt = this;
        // Get multiple option if passed an array
        if (o instanceof Array) {
            var options = {};
            $h.each(o, function (option) {
                options[option] = $opt.getOpt(option);
            });
            return options;
        } else {
            if ($opt instanceof A2mDmsUI) {
                if (typeof $opt.opts[o] !== 'undefined') {
                    return $opt.opts[o];
                }
                else {
                    return $opt.defaults[o];
                }
            }
        }
    };
    // EVENTS
    // catchAll(event, ...)
    $context.events = [];
    $context.on = function (event, callback) {
        $context.events.push(event.toLowerCase(), callback);
    };
    $context.fire = function () {
        // `arguments` is an object, not array, in FF, so:
        var args = [];
        for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
        // Find event listeners, and support pseudo-event `catchAll`
        var event = args[0].toLowerCase();
        for (var i = 0; i <= $context.events.length; i += 2) {
            if ($context.events[i] == event) $context.events[i + 1].apply($context, args.slice(1));
            if ($context.events[i] == 'catchall') $context.events[i + 1].apply(null, args);
        }
        if (event == 'fileerror') $context.fire('error', args[2], args[1]);
        if (event == 'fileprogress') $context.fire('progress');
    };
    // INTERNAL HELPER METHODS (handy, but ultimately not part of uploading)
    var $h = {
        stopEvent: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },
        each: function (o, callback) {
            if (typeof(o.length) !== 'undefined') {
                for (var i = 0; i < o.length; i++) {
                    // Array or FileList
                    if (callback(o[i]) === false) return;
                }
            } else {
                for (i in o) {
                    // Object
                    if (callback(i, o[i]) === false) return;
                }
            }
        },
        contains: function (array, test) {
            var result = false;

            $h.each(array, function (value) {
                if (value == test) {
                    result = true;
                    return false;
                }
                return true;
            });

            return result;
        },
        getTarget: function (params) {
            var target = $.getOpt('target');
            if (typeof target === 'function') {
                return target(params);
            }
            if (target.indexOf('?') < 0) {
                target += '?';
            } else {
                target += '&';
            }
            return target + params.join('&');
        }
    };

    $context.data = [];
    $context.getData = function () {
        return $context.data;
    };
    $context.setData = function (myData) {
        $context.data = myData;
    };
    $context.pushFile = function (myFile) {
        $context.data.push(myFile);
    };
    $context.updateFile = function (myFile) {
        $.each($context.data, function (index, value) {
            if (value.uniqueIdentifier == myFile.uniqueIdentifier) {
                $context.data.splice(index, 1);
                $context.data.push(myFile);
                return;
            }
        });
    };
    this.isPopup = function () {
        return $(this.opts.dom).parents().parents().find(".a2m-dms-dialog, .a2m-dms-dialog-background").css('display') != 'none';
    };
    this.showPopup = function () {
       // $(this.opts.dom).parents().parents().find(".a2m-dms-dialog, .a2m-dms-dialog-background").show();
//			this.opts.dom.show();
    };
    this.hiddePopup = function () {
        $(this.opts.dom).parents().parents().find(".a2m-dms-dialog, .a2m-dms-dialog-background").hide();
//			this.opts.dom.hide();
    };
    this.togglePopup = function () {
        $(this.opts.dom).parents().parents().find(".a2m-dms-dialog, .a2m-dms-dialog-background").toggle();
    };
    this.upload = function () {
        //ngocdbupload
        $('.a2m-dms-dialog').data('dmsUI', this);
        if(isNeroSupport()) {
	        var len = 0;
	        var testedLen = true;
	        $.each(this.mA2mDms, function (i, myA2mDms) {
	            len++;
	            if (myA2mDms.lfu.files.length > 0) {
	                $.each(myA2mDms.lfu.files, function (index, file) {
	                    $context.fileAdded(myA2mDms.lfu, file);
	                    file.pause(false);
	                });
	
	                testedLen = testedLen && myA2mDms.lfu.appendMinFilesCountFromFileList();
	
	            }
	        });
	        if (testedLen) {
	            $context.isValidate = true;
	            this.showPopup();
	            this.mA2mDms[0].lfu.upload();
	        } else {
	            $context.isValidate = true;
	            $.each(this.mA2mDms, function (i, myA2mDms) {
	                var json = [];
	                $.each(myA2mDms.data, function (j, data) {
	                    json.push(data);
	                });
	                myA2mDms.lfu.getOpt('dom').find('.largefileupload-input').val(JSON.stringify(json));
	            });
	        }
	        return true;
        } else {
        	if(this.mA2mDms.length > 0) {
        		var myA2mDms = this.mA2mDms[0];
        	
    			var onUploadStart = myA2mDms.getOpt('onUploadStart');

                if (onUploadStart) {
                    onUploadStart();
                }
                
        		var form = jQuery('<form id="largefileupload-file-select-ie-form-' + myA2mDms.dmsId + '" method="post" enctype="multipart/form-data" action="' + (myA2mDms.getOpt('transmitDirection').ieUpload === undefined ? myA2mDms.defaults.transmitDirection.ieUpload:myA2mDms.getPath(myA2mDms.getOpt('transmitDirection').ieUpload)) + '"></form>');
                myA2mDms.lfu.getOpt('dom').append(form);
                var ieInput = myA2mDms.lfu.getOpt('dom').find('.largefileupload-file-select-ie-input');
                $.each(ieInput, function(m, input) {
                	$.each(myA2mDms.getData(), function(n, data) {
                		if(data.fileName == $(input).data('fileName'))
                			input.setAttribute('name', data.uniqueIdentifier);
                	})
                });
                
                myA2mDms.lfu.getOpt('dom').find('#largefileupload-file-select-ie-form-' + myA2mDms.dmsId).prepend(myA2mDms.lfu.getOpt('dom').find('.largefileupload-file-select-ie-input'));

                var successFunction = function(data, statusText, xhr, form){
                    //성공후 서버에서 받은 데이터 처리
                	if(statusText == 'success') {
                		var currentDms = $(form).parent().data('dms');
                		var a2mDmsArray = currentDms.a2mDmsUI.getA2mDms();
                		var currentId = currentDms.dmsId;
                		
                		var idx = 0;
                		$.each(a2mDmsArray, function(k, myA2mDms) {
                			if(myA2mDms.dmsId == currentId) {
                				idx = k;
                				return false;
                			}
                		})
                		
                		idx = idx + 1;
                		

                		currentDms.lfu.getOpt('dom').find('.largefileupload-input').val(data);
                		form.remove();
                		
                		if(idx < a2mDmsArray.length) {
                			var myA2mDms = a2mDmsArray[idx];
                			
                			var nextForm = jQuery('<form id="largefileupload-file-select-ie-form-' + myA2mDms.dmsId + '" method="post" enctype="multipart/form-data" action="' + (myA2mDms.getOpt('transmitDirection').ieUpload === undefined ? myA2mDms.defaults.transmitDirection.ieUpload:myA2mDms.getPath(myA2mDms.getOpt('transmitDirection').ieUpload)) + '"></form>');
                            myA2mDms.lfu.getOpt('dom').append(nextForm);
                            var ieInput = myA2mDms.lfu.getOpt('dom').find('.largefileupload-file-select-ie-input');
                            $.each(ieInput, function(m, input) {
                            	$.each(myA2mDms.getData(), function(n, data) {
                            		if(data.fileName == $(input).data('fileName'))
                            			input.setAttribute('name', data.uniqueIdentifier);
                            	})
                            });
                            
                            myA2mDms.lfu.getOpt('dom').find('#largefileupload-file-select-ie-form-' + myA2mDms.dmsId).prepend(myA2mDms.lfu.getOpt('dom').find('.largefileupload-file-select-ie-input'));

                            $('#largefileupload-file-select-ie-form-' + myA2mDms.dmsId).ajaxForm({
                            	dataType: 'text',
                                success: successFunction,
                                error: function(){
                                    alert("업로드에 실패했습니다.");
                                }                              
                            });

                            $('#largefileupload-file-select-ie-form-' + myA2mDms.dmsId).submit();
                		} else if (idx == a2mDmsArray.length) {
                			var onUploadComplete = currentDms.getOpt('onUploadComplete');

                            if (onUploadComplete) {
                            	onUploadComplete();
                            }
                		}
                	} else {
                        alert("업로드에 실패했습니다.");
                	}
                };
                $('#largefileupload-file-select-ie-form-' + myA2mDms.dmsId).ajaxForm({
                	dataType: 'text',
                    success: successFunction,
                    error: function(){
                        alert("업로드에 실패했습니다.");
                    }                              
                });
                $('#largefileupload-file-select-ie-form-' + myA2mDms.dmsId).submit();
        	}
        }

    };
    this.fileAdded = function (pLfu, file) {

        if (this.files.indexOf(String(file.uniqueIdentifier)) === -1) {
            this.addFile(String(file.uniqueIdentifier));
            // Show progress pabr
            $(this.opts.dom).find('.largefileupload-progress, .largefileupload-list').show();
            // Show pause, hide resume
            $(this.opts.dom).find('.largefileupload-progress .progress-resume-link').hide();
            $(this.opts.dom).find('.largefileupload-progress .progress-pause-link').show();

            this.fileForm(pLfu, file, this.opts.dom);
            file.isUploaded = false;
        }

    };
    this.pause = function () {
        $.each(this.mA2mDms, function (i, myA2mDms) {
            if (myA2mDms.lfu.isUploading() === true) {
                myA2mDms.lfu.pause();
            }
        })

        // Show resume, hide pause
        $(this.opts.dom).find('.progress-resume').show();
        $(this.opts.dom).find('.progress-pause').hide();


        var onPause = $context.getOpt('onPause');
        if (onPause) {
            onPause();
        }

    };
    this.uploadStart = function (pLfu, e) {
        if (this.isValidate === true) {
            this.showPopup();
            // Show resume, hide pause
            $(this.opts.dom).find('.largefileupload-progress .progress-resume-link').hide();
            $(this.opts.dom).find('.largefileupload-progress .progress-pause-link').show();
        } else {
            pLfu.pause();
            this.hiddePopup();
        }

    };
    this.complete = function (pA2mDms, e) {
        //pA2mDms.lfu.pause();

        $.each(pA2mDms.data, function (i, d) {
            if(typeof (d) === "string"){
                pA2mDms.data[i] = JSON.parse(d);
            }
        });

        var myJsonString = JSON.stringify(pA2mDms.data);
        $(pA2mDms.lfu.opts.dom).find('.largefileupload-input').val(myJsonString);

        var idx = this.mA2mDms.indexOf(pA2mDms) + 1;
        var isAllFinished = idx == this.mA2mDms.length;

        var complt = function (obj) {
            $(obj.opts.dom).find('.largefileupload-close').on('click', function () {
                var a2mDmsUI = $('.a2m-dms-dialog').data('dmsUI');
                a2mDmsUI.hiddePopup();
                $('.a2m-dms-dialog').remove();
                $('.a2m-dms-dialog-background').remove();
                $('#various1').remove();
                a2mDmsUI.buildUploadBox();
//		        	  	     pA2mDms.lfu.getOpt('dom').parents('form').submit();
            });
            $(obj.opts.dom).find('.largefileupload-close').attr('class', 'largefileupload-close-on');
            $(obj.opts.dom).find('.largefileupload-close').css('color', '#000');
            $(obj.opts.dom).find('.progress-resume-link').attr('onclick', '').unbind('click');
            $(obj.opts.dom).find('.progress-pause-link').attr('onclick', '').unbind('click');
            $(obj.opts.dom).find('.progress-resume-link').css('color', '#747474');
            $(obj.opts.dom).find('.progress-pause-link').css('color', '#747474');
            $(obj.opts.dom).find('.progress-resume').attr('class', '.progress-resume-off');
            $(obj.opts.dom).find('.progress-pause').attr('class', 'progress-pause-off');

            var onUploadComplete;
            
            if(obj.mA2mDms.length > 0)
            	onUploadComplete = obj.mA2mDms[0].getOpt('onUploadComplete');
            $('.a2m-dms-dialog').data('dmsUI').mA2mDms = [];
            if (!obj.isComplete) {
                obj.isComplete = true;
                obj.files = [];
                $.each(obj.mA2mDms, function (i, dms) {
                    dms.lfu.files = [];
                    
                    if (!dms.opts.dropAreaView) {
                    	$('#largefileupload-file-select' + dms.lfu.largeFileUploadId).parents('.largefileupload-selector').find('.largefileupload-download').css('opacity', '1.0');
                		$('#largefileupload-file-select' + dms.lfu.largeFileUploadId).parents('.largefileupload-selector').find('.largefileupload-download').css('cursor', 'pointer');
                    	$('#largefileupload-file-select' + dms.lfu.largeFileUploadId).parents('.largefileupload-selector').find('.largefileupload-download img').css('opacity', '1.0');
                    }
 
                });
                if (onUploadComplete) {
                    onUploadComplete();
                }
            }
        };
        if (isAllFinished === true) {
            complt(pA2mDms.a2mDmsUI);
        } else {
            var checked = true;
            while (checked && idx < this.mA2mDms.length) {
                if (this.mA2mDms[idx].lfu.files.length > 0) {
                    checked = false;
                } else {
                    idx++;
                }
            }

            if (idx == this.mA2mDms.length) {
                complt(pA2mDms.a2mDmsUI);
            } else {
                this.mA2mDms[idx].lfu.upload();
            }
        }
    };
    this.fileSuccess = function (pLfu, file, message) {
        //alert(message);

        // Reflect that the file upload has completed
        //$('.largefileupload-file-'+file.uniqueIdentifier+' .largefileupload-file-remaining').html('(completed)');
        $(this.opts.dom).find('.largefileupload-status-upload-' + file.uniqueIdentifier).html('');
        $(this.opts.dom).find('.progress-remove-link-' + file.uniqueIdentifier).remove();

        $(this.opts.dom).find('.progress-download-link-' + file.uniqueIdentifier).show();
        $(this.opts.dom).find('.progress-delete-link-' + file.uniqueIdentifier).show();


        $context.pushFile(JSON.parse(message));

    };
    this.fileError = function (pLfu, file, message) {
        // Reflect that the file upload has resulted in error
        var error = JSON.parse(message.trim());
        if(error.message.indexOf('license') != -1)
            swal(comMessage.NotValidateLicense);
        else
            $(this.opts.dom).find('.largefileupload-file-remaining-' + file.uniqueIdentifier).html('(file could not be uploaded: ' + message + ')');

    };
    this.fileProgress = function (pLfu, file) {
        // Handle progress for both the file and the overall upload
        this.currentUploadingFile = String(file.uniqueIdentifier);
        $(this.opts.dom).find('.largefileupload-file-size-' + file.uniqueIdentifier).html(formatSize(file.size));
        $(this.opts.dom).find('.largefileupload-file-remaining-' + file.uniqueIdentifier).html('<div style="font-size: 12px;text-align: center;background: none; width: 203px;" class="largefileupload-status-upload-' + file.uniqueIdentifier + '">' + formatTimeSize(Math.floor(file.timeprogress())) + '</div>');
        $(this.opts.dom).find('.largefileupload-file-progress-' + file.uniqueIdentifier).css({width: Math.floor(file.progress() * 100) + '%'});
        // $(this.opts.dom).find('.largefileupload-temp').html(file.fileName + " | " + formatSize(file.uploadSpeed()) + "/s | " + (pLfu.files.indexOf(file) + 1) + " / " + this.files.length);

        var length = 0;
        var myProgress = 0;
        $.each(this.mA2mDms, function (i, myA2mDms) {
                myProgress += myA2mDms.lfu.progress() * myA2mDms.lfu.getSize();
                length += myA2mDms.lfu.getSize();
        })
        myProgress = myProgress / length;
        $(this.opts.dom).find('.progress-bar').css({width: Math.floor(myProgress * 100) + '%'});
        $(this.opts.dom).find('.progress-text').html('<span><b>' + Math.floor(myProgress * 100) + '%</b></span>');

//	              this.a2mDmsMotion.setProgress(pLfu, file, this.mA2mDms);
    };

    var fileListForm = function (pLfu, fileList) {
        $.each(fileList, function (i, file) {
            fileForm(pLfu, file, this.opts.dom);
        })
    };
    this.fileForm = function (pLfu, file, obj) {
        // will be change
        //var ext = fileExtension(file);
        //var ext = file.fileName.slice((file.fileName.lastIndexOf(".") - 1 >>> 0) + 2);
        var fileRow = '<tr class="largefileupload-file-' + file.uniqueIdentifier + '">'
            //'<td><span class="largefileupload-action-'+file.uniqueIdentifier+'"></span></td>'
            //				+'<td><span class="largefileupload-file-ico"></span></td>'
            + '<td style="width: 58%; text-overflow: ellipsis; overflow-x: hidden; white-space: nowrap; -o-text-overflow: ellipsis; max-width:'
            + ($(obj).find("largefileupload-list").width() * 0.9) + '"><span class="largefileupload-file-name"></span></td>'
            + '<td  style="width: 10%"><span class="largefileupload-file-size-' + file.uniqueIdentifier + '">' + formatSize(file.size) + '</span></td>'
            + '<td  style="width: 24%"><div class="progress-container"><div class="progress-bar-file largefileupload-file-progress-' + file.uniqueIdentifier + '" style="position: absolute;"><div class="largefileupload-file-remaining-' + file.uniqueIdentifier + '" ></div></div></div></td>'
            + '<td  style="width: 8%"><span class="largefileupload-action-' + file.uniqueIdentifier + '" style="width: 100%; height: 100%;"></span></td>'
            + '</tr>'

        $(obj).find('.largefileupload-list').append(fileRow);
        var fileAction = '<a href="#" onclick="var a2mDmsUI = $(\'.a2m-dms-dialog\').data(\'dmsUI\');a2mDmsUI.pause();swal(comMessage.DeleteConfirm, function(isConfirm){if(isConfirm){a2mDmsUI.removeFileByUIdentifier(\'' + file.uniqueIdentifier + '\',' + pLfu.largeFileUploadId + '); swal.close();}else{a2mDmsUI.upload(); $(\'.progress-pause\').show(); $(\'.progress-resume\').hide();}});" class="progress-remove-link-' + file.uniqueIdentifier + '"><img src="' + $context.getOpt('contextPath') + $context.getOpt('design').uploadPopup.deleteImg + '" title="Delete upload" height="20px" style="margin: auto; display: block;" alt="업로드 취소"/></a>';
//				fileAction = fileAction + '<a href="#" onclick="a2mDmsUI.downloadFileByUIdentifier(\''+file.uniqueIdentifier+'\','+pLfu.largeFileUploadId+')" class="btn btn-info btn-xs progress-download-link-'+file.uniqueIdentifier+'" style="display:none;">Download</a><br/>';
//				fileAction = fileAction + '<a href="#" onclick="a2mDmsUI.deleteFileByUIdentifier(\''+file.uniqueIdentifier+'\','+pLfu.largeFileUploadId+')" class="btn btn-warning btn-xs progress-delete-link-'+file.uniqueIdentifier+'" style="display:none;">Delete</a>';
        $(obj).find('.largefileupload-action-' + file.uniqueIdentifier).html(fileAction);
        $(obj).find('.largefileupload-file-' + file.uniqueIdentifier + ' .largefileupload-file-name').append(file.fileName);

        //파일명으로 교체
        $(obj).find('.largefileupload-file-ico').addClass('ico_xlsx');

        this.currentTotalFileSize += file.size;
        var size_text = formatSize($context.currentTotalFileSize).split(" ");
        $(obj).find('.largefileupload-total').html("<b>총 <p class='largefileupload-total-number'>" + this.files.length + "</p> 개 / <p class='largefileupload-total-number'> " + size_text[0] + "</p> " + size_text[1] + "</b>");

    };
    //private function
    this.buildUploadBox = function () {
        var design = $context.getOpt('design');
        if ($('#a2m-dms-ui').length == 0) {
            var content = '<div class="a2m-dms-dialog">'
                + '<div id="a2m-dms-ui"></div>'
                + '</div>';
            content = content + '<div class="a2m-dms-dialog-background"></div><a id="various1" href="#a2m-dms-ui" title="Upload file" style="display: none;">Inline</a>';
            $('body').append(content);

            var defaultSrc = $context.getOpt('contextPath');
            var res = '<div class="a2m-dms-upload-titlebar"><img src="' + defaultSrc + design.uploadPopup.uploadImg + '" style="padding-right: 4px;" alt="업로드 창 아이콘"/><b>파일 업로드</b></div>';

            res = res + '<div id="a2m-dms-uploadbox" > <div id="a2m-dms-frame"> '
                + '<div class="largefileupload-error">Your browser, unfortunately, is not supported by LargeFileUpload.js.The library requires support for <a href="http://www.w3.org/TR/FileAPI/">the HTML5 File API</a> along with <a href="http://www.w3.org/TR/FileAPI/#normalization-of-params">file slicing</a>.</div> '
                + '<div class="largefileupload-progress"> '
                + '<div class="progress-container"> '
                + '<div class="progress-bar"></div> '
                + '</div><div class="progress-text" ></div> '
                + '</div> '
                + '<div class="largefileupload-temp"></div>'
                + '</div> '

                + '<div id="largefileupload-table" class="largefileupload-foreground" style="margin-bottom: 10px; border: 1px solid #bac2cc">'
                + '<table><thead role="rowgroup"> '
                + '<caption>파일의 선택정보, Name, Size, Progess을 확인 할 수 있습니다.</caption>'
                + '<tr class="row"> '
                + '<th scope="col" class="grid-header" style="width: 58%; text-align: left;">파일명</th> '
                + '<th scope="col" class="grid-header" style="width: 10%; text-align: left;">파일용량</th> '
                //	    						+'<th class="grid-header" style="width: 5%">#</th> '
                + '<th scope="col" class="grid-header" style="width: 24%; text-align: center;">진행상태</th> '
                //	    						+'<th class="grid-header" style="width: 5%">#</th> '
                + '<th scope="col" class="grid-header" style="width: 8%; text-align: left;"> </th> '
                //	    						+'<th class="grid-header" style="width: 5%">#</th> '
                + '</tr></thead></table>'
                + '<div class="am2_dms_tbl" ><table role="grid"> '
                + '<caption>파일의 선택정보, Name, Size, Progess을 확인 할 수 있습니다.</caption>'
                // + '<thead role="rowgroup"> '
                // + '<caption>파일의 선택정보, Name, Size, Progess을 확인 할 수 있습니다.</caption>'
                // + '<tr class="row"> '
                // + '<th scope="col" class="grid-header" style="width: 58%; text-align: left;">Name</th> '
                // + '<th scope="col" class="grid-header" style="width: 10%; text-align: left;">Size</th> '
                // //	    						+'<th class="grid-header" style="width: 5%">#</th> '
                // + '<th scope="col" class="grid-header" style="width: 24%; text-align: center;">Progess</th> '
                // //	    						+'<th class="grid-header" style="width: 5%">#</th> '
                // + '<th scope="col" class="grid-header" style="width: 8%; text-align: left;"> </th> '
                // //	    						+'<th class="grid-header" style="width: 5%">#</th> '
                // + '</tr></thead>'
                + '<tbody class="largefileupload-list">'
                + '</tbody> '
                + '</table></div></div> '
                + '<div class = "largefileupload-bottom-area">'
                + '<span class="largefileupload-total"></span>'
                + '<div class="largefileupload-close">닫기</div>'
                + '<div>'
                + '<div class="progress-resume" style="display: none"><a href="#" ngocdb   onclick="var a2mDmsUI = $(\'.a2m-dms-dialog\').data(\'dmsUI\');a2mDmsUI.upload(); $(\'.progress-pause\').show(); $(\'.progress-resume\').hide(); return(false);" class="progress-resume-link">전송시작</a></div>'
                + '<div class="progress-pause"><a href="#" onclick="var a2mDmsUI = $(\'.a2m-dms-dialog\').data(\'dmsUI\');a2mDmsUI.pause(); return false;" class="progress-pause-link">전송 중단</a></div> '
                + '</div>'
                + '</div><div class="largefileupload-motion"></div></div>';
            $(this.opts.dom).html(res);

//		     	  	this.a2mDmsMotion.buildMotionBox(this.opts.dom);
        }
    };

    // this.downloadFileByUIdentifier = function (pLfu, uniqueIdentifier) {
    //
    //     var files_list = [];
    //
    //     pLfu.opts.dom.parents('form').find('.largefile-layout-form').each(function () {
    //         files_list.push(this.data('dms').data());
    //     });
    //
    //
    //     $.each($context.data, function (index, value) {
    //         if (value.uniqueIdentifier == uniqueIdentifier) {
    //
    //             var param = {
    //                 fileName: value.fileName,
    //                 filePath: value.filePath,
    //                 uniqueIdentifier: String(value.uniqueIdentifier)
    //             }
    //             var url = $context.getOpt('contextPath') + $context.getOpt('baseControllerPath') + '/downloadFile.jsp?' + $.param(param);
    //             $.fileDownload(url)
    //                 .done(function () {
    //                     pLfu.developLogger.log('File download a success!');
    //                 })
    //                 .fail(function () {
    //                     pLfu.developLogger.log('File download failed!');
    //                 });
    //             return;
    //         }
    //     });
    // }
    //
    // this.deleteFileByUIdentifier = function (pLfu, uniqueIdentifier) {
    //
    //     var events = $context.opts;
    //     swal(comMessage.DeleteConfirm,
    //         function () {
    //             jQuery('.largefileupload-file-' + uniqueIdentifier).remove();
    //
    //             jQuery.each($context.data, function (index, value) {
    //                 if (String(value.uniqueIdentifier) == String(uniqueIdentifier)) {
    //                     $context.data.splice(index, 1);
    //
    //                     $context.deleteFiles(value.filePath, events);
    //
    //                     return;
    //                 }
    //             });
    //         });
    // }
    this.removeFileByUIdentifier = function (uniqueIdentifier, pLfuId) {
        var filename = '';
        var fileSize = false;
        var lfu;
        $.each(this.mA2mDms, function (i, myA2mDms) {
            if (myA2mDms.lfu.largeFileUploadId === pLfuId) {
                var file = false;
                lfu = myA2mDms.lfu;
                $h.each(myA2mDms.lfu.files, function (f) {
                    if (f.uniqueIdentifier == uniqueIdentifier) {
                        fileSize = f.size;
                        filename = f.fileName;
                    }
                });
                myA2mDms.lfu.removeFileByUIdentifier(String(uniqueIdentifier));
                return;
            }
        });

        //delete temp file
        $.ajax({
            url: (this.getA2mDms(uniqueIdentifier)[0].getOpt('transmitDirection').deletetemp === undefined ? this.getA2mDms(uniqueIdentifier)[0].defaults.transmitDirection.deletetemp:this.getA2mDms(uniqueIdentifier)[0].getPath(this.getA2mDms(uniqueIdentifier)[0].getOpt('transmitDirection').deletetemp)),
            type: 'post',
            data: {pFilename: uniqueIdentifier},
            cache: false,
            suppressErrors: false,
            success: function (data, textStatus, jqXHR) {
                //neroDevelopLogger.log("delete temp file success");
            }, complete: function () {
                //neroDevelopLogger.log("delete temp file complete");
                return true;
            }, error: function (request, status, error, event) {
                swal(comMessage.DeleteError);
                return false;
            }
        });

        this.files.splice(this.files.indexOf(String(uniqueIdentifier)), 1);

        this.currentTotalFileSize -= fileSize;
        var size_text = formatSize(this.currentTotalFileSize).split(" ");

        $(this.opts.dom).find('.largefileupload-total').html("<b>총 <p class='largefileupload-total-number'>" + this.files.length + "</p> 개 / <p class='largefileupload-total-number'> " + size_text[0] + "</p> " + size_text[1] + "</b>");

        if (this.files.length == 0) {
            $(this.opts.dom).find('.largefileupload-close').on('click', function () {
                var a2mDmsUI = $('.a2m-dms-dialog').data('dmsUI');
                a2mDmsUI.hiddePopup();
                $('.a2m-dms-dialog').remove();
                $('.a2m-dms-dialog-background').remove();
                $('#various1').remove();
                a2mDmsUI.buildUploadBox();
                $.each(a2mDmsUI.mA2mDms, function (idx, dms) {
                    dms.refreshUI();
                })
//		        	  	     pA2mDms.lfu.getOpt('dom').parents('form').submit();
            });
            $(this.opts.dom).find('.largefileupload-close').attr('class', 'largefileupload-close-on');
            $(this.opts.dom).find('.largefileupload-close').css('color', '#000');
            $(this.opts.dom).find('.progress-resume-link').attr('onclick', '').unbind('click');
            $(this.opts.dom).find('.progress-pause-link').attr('onclick', '').unbind('click');
            $(this.opts.dom).find('.progress-resume-link').css('color', '#747474');
            $(this.opts.dom).find('.progress-pause-link').css('color', '#747474');
            $(this.opts.dom).find('.progress-resume').attr('class', 'progress-resume-off');
            $(this.opts.dom).find('.progress-pause').attr('class', 'progress-pause-off');
        } else if (this.currentUploadingFile == uniqueIdentifier) {
            if (!lfu.isPaused()) {
                if (lfu.files > 0)
                    lfu.uploadNextChunk();
                else
                    this.upload();
            }
        }
    }
    // this.downloadFiles = function (files, events) {
    //
    //     var onDownComplete = events["onDownComplete"];
    //     var onBeforeDown = events["onBeforeDown"];
    //     var onDownError = events["onDownError"];
    //     // var onDownSuccess = events["onDownSuccess"];
    //
    //     //neroDevelopLogger.log(files);
    //     if (onBeforeDown) {
    //         eval(onBeforeDown + '(a2mFiles)');
    //     }
    //     var contextPath = files[0].contextPath;
    //     var baseControllerPath = files[0].baseControllerPath;
    //
    //     $.ajax({
    //         url: contextPath + baseControllerPath + '/zipFiles.jsp',
    //         type: 'POST',
    //         data: {files: files},
    //         cache: false,
    //         suppressErrors: false,
    //         success: function (data, textStatus, jqXHR) {
    //             var jdata = JSON.parse(data);
    //
    //             var param = {
    //                 fileName: jdata.fileName,
    //                 filePath: jdata.filePath,
    //                 uniqueIdentifier: String(jdata.uniqueIdentifier)
    //             }
    //             var url = contextPath + baseControllerPath + '/downloadFile.jsp?' + $.param(param);
    //             //neroDevelopLogger.log(url);
    //             $.fileDownload(url)
    //                 .done(function () {
    //
    //                     //neroDevelopLogger.log('File download a success!');
    //
    //                 })
    //                 .fail(function () {
    //                     //neroDevelopLogger.log('File download failed!');
    //
    //                 });
    //
    //             var refreshIntervalId = setInterval(function () {
    //
    //                 $.ajax({
    //                     url: contextPath + baseControllerPath + '/progressDownloadFile.jsp',
    //                     type: 'post',
    //                     data: param,
    //                     cache: false,
    //                     suppressErrors: false,
    //                     success: function (data, textStatus, jqXHR) {
    //                         var jd = JSON.parse(data);
    //                         //neroDevelopLogger.log(jd.downloadSize);
    //                         //neroDevelopLogger.log(jd.fileSize);
    //                         if (jd.fileSize === jd.downloadSize) {
    //
    //                             /* later */
    //                             clearInterval(refreshIntervalId);
    //
    //                             if (onDownComplete) {
    //                                 eval(onDownComplete + '(data)');
    //                             }
    //                         }
    //                     }
    //                 });
    //
    //             }, 1000);
    //
    //         }, complete: function () {
    //             //neroDevelopLogger.log("zip file complete");
    //             return true;
    //         }, error: function (request, status, error, event) {
    //             //neroDevelopLogger.log("zip file error");
    //             swal(comMessage.DownloadError);
    //             return false;
    //         }
    //     });
    //
    // }
    // this.deleteFiles = function (pLfu, filePaths, callback) {
    //     $.ajax({
    //         url: $context.getOpt('contextPath') + $context.getOpt('baseControllerPath') + '/deleteFiles.jsp',
    //         type: 'post',
    //         data: {filePaths: filePaths},
    //         cache: false,
    //         suppressErrors: false,
    //         success: function (data, textStatus, jqXHR) {
    //             pLfu.developLogger.log('i',"delete success");
    //         }, complete: function () {
    //             pLfu.developLogger.log('i',"delete complete");
    //             swal.close()
    //             if (callback) {
    //                 eval(callback + '()');
    //             }
    //             return true;
    //         }, error: function (request, status, error, event) {
    //             pLfu.developLogger.log('e',"delete error");
    //             swal(comMessage.DeleteError);
    //             return false;
    //         }
    //     });
    //
    // };

    // this.getFile = function (pLfu, fileIds, callback) {
    //     $.ajax({
    //         url: $context.getOpt('contextPath') + $context.getOpt('baseControllerPath') + '/getFile.jsp',
    //         type: 'post',
    //         data: {fileId: fileId},
    //         cache: false,
    //         suppressErrors: false,
    //         success: function (data, textStatus, jqXHR) {
    //             //neroDevelopLogger.log("getFile success");
    //         }, complete: function () {
    //             //neroDevelopLogger.log("getFile complete");
    //             swal.close()
    //             eval(callback + '(' + data + ')');
    //             return true;
    //         }, error: function (request, status, error, event) {
    //             swal(comMessage.GetfileError);
    //             return false;
    //         }
    //     });
    // };

    return (this);
}

var A2mDmsMotion = function () {

    this.buildMotionBox = function (obj) {
        this.buildCircleProgress(obj);
        this.buildMultiCircleProgress(obj);
        this.buildLineChart(obj);
        this.buildFillChart(obj);
    };

    this.buildCircleProgress = function (obj) {
        var xScale = -1;
        var r = 60;
        var c = Math.PI * (r * 2);
        var cx = xScale * 100;
        var rotate = xScale * -90;
        var res = '<div id="largefileupload-motion-circle-zone" data-pct="0">' +
            '<svg class="largefileupload-motion-circle-svg" width="200" height="200" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
            '  <circle class="largefileupload-motion-circle-base-bar" r="' + r + '" cx="100" cy="100" fill="transparent" stroke-dasharray="' + c + '" stroke-dashoffset="0"></circle>' +
            '  <circle class="largefileupload-motion-circle-bar" r="' + r + '" cx="' + cx + '" cy="100" fill="transparent" stroke-dasharray="' + c + '" stroke-dashoffset="0" transform="rotate(' + rotate + ' 100 100) scale(' + xScale + ', 1)"></circle>' +
            '</svg></div>';
        $(obj).find('.largefileupload-motion').append(res);
        var $circle = $('.largefileupload-motion-circle-svg .largefileupload-motion-circle-bar');
        $circle.css({strokeDashoffset: c});
    };

    this.buildMultiCircleProgress = function (obj) {
        var xScale = -1;
        var r0 = 58;
        var r1 = 80;
        var r2 = 92;
        var c0 = Math.PI * (r0 * 2);
        var c1 = Math.PI * (r1 * 2);
        var c2 = Math.PI * (r2 * 2);
        var cx = xScale * 100;
        var rotate = xScale * -90;
        var res = '<div id="largefileupload-motion-multi-circle-zone" data-pct="0">' +
            '<svg class="largefileupload-motion-multi-circle-svg" width="300" height="300" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
            '  <circle class="largefileupload-motion-circle-base-bar" r="' + r0 + '" cx="100" cy="100" fill="transparent" stroke-dasharray="' + c0 + '" stroke-dashoffset="0"></circle>' +
            '  <circle class="largefileupload-motion-circle-file-bar" r="' + r0 + '" cx="' + cx + '" cy="100" fill="transparent" stroke-dasharray="' + c0 + '" stroke-dashoffset="0" transform="rotate(' + rotate + ' 100 100) scale(' + xScale + ', 1)"></circle>' +
            '  <circle class="largefileupload-motion-circle-base-bar" r="' + r1 + '" cx="100" cy="100" fill="transparent" stroke-dasharray="' + c1 + '" stroke-dashoffset="0"></circle>' +
            '  <circle class="largefileupload-motion-circle-bar" r="' + r1 + '" cx="' + cx + '" cy="100" fill="transparent" stroke-dasharray="' + c1 + '" stroke-dashoffset="0" transform="rotate(' + rotate + ' 100 100) scale(' + xScale + ', 1)"></circle>' +
            '  <circle class="largefileupload-motion-circle-speed-bar" r="' + r2 + '" cx="' + cx + '" cy="100" fill="transparent" stroke-dasharray="' + c2 + '" stroke-dashoffset="0" transform="rotate(' + rotate + ' 100 100) scale(' + xScale + ', 1)"></circle>' +
            '</svg></div>';
        $(obj).find('.largefileupload-motion').append(res);
        var $circle0 = $('.largefileupload-motion-multi-circle-svg .largefileupload-motion-circle-file-bar');
        var $circle1 = $('.largefileupload-motion-multi-circle-svg .largefileupload-motion-circle-bar');
        var $circle2 = $('.largefileupload-motion-multi-circle-svg .largefileupload-motion-circle-speed-bar');

        $circle0.css({strokeDashoffset: c0});
        $circle1.css({strokeDashoffset: c1});
        $circle2.css({strokeDashoffset: c2});
    };

    this.buildLineChart = function (obj) {
        var res = '<div id="largefileupload-motion-chart-absolute-line-zone" style="width: 100%; height:200px;">' +
            '<svg class="largefileupload-motion-relative-chart-svg" width="35%" height="200" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
            '<rect x="60" y="1" width="calc( 100% - 61px )" height="198" fill="transparent" stroke="#666" stroke-width="1" />' +
            '<polyline class="largefileupload-motion-chart-line-polyline" fill="transparent" stroke="#00affe" stroke-width="2" />' +
            '<text class="largefileupload-motion-chart-min-text" x="0" y="190" fill="black"/> ' +
            '<text class="largefileupload-motion-chart-max-text" x="0" y="10" fill="black"/> ' +
            '<text class="largefileupload-motion-chart-current-text" x="0" y="0" fill="black"/>' +
            '</svg>' +
            '<svg class="largefileupload-motion-absolute-chart-svg" width="35%" height="200" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
            '<rect x="60" y="1" width="calc( 100% - 61px )" height="198" fill="transparent" stroke="#666" stroke-width="1" />' +
            '<polyline class="largefileupload-motion-chart-line-polyline" fill="transparent" stroke="#00affe" stroke-width="2" />' +
            '<text class="largefileupload-motion-chart-min-text" x="0" y="190" fill="black"/> ' +
            '<text class="largefileupload-motion-chart-max-text" x="0" y="10" fill="black"/> ' +
            '<text class="largefileupload-motion-chart-current-text" x="0" y="0" fill="black"/> ' +
            '</svg></div>';
        $(obj).find('.largefileupload-motion').append(res);
    };

    this.buildRelativeLineChart = function (obj) {
        var res = '<div id="largefileupload-motion-chart-relative-line-zone" style="width: 35%; height:200px;">' +
            '<svg class="largefileupload-motion-chart-svg" width="100%" height="200" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
            '<rect x="60" y="1" width="calc( 100% - 61px )" height="198" fill="transparent" stroke="#666" stroke-width="1" />' +
            '<polyline class="largefileupload-motion-chart-line-polyline" fill="transparent" stroke="#00affe" stroke-width="2" />' +
            '<text class="largefileupload-motion-chart-min-text" x="0" y="190" fill="black"/> ' +
            '<text class="largefileupload-motion-chart-max-text" x="0" y="10" fill="black"/> ' +
            '<text class="largefileupload-motion-chart-current-text" x="0" y="0" fill="black"/> ' +
            '</svg></div>';
        $(obj).find('.largefileupload-motion').append(res);
    };

    this.buildFillChart = function (obj) {
        var res = '<div id="largefileupload-motion-chart-fill-zone" style="width: 100%; height:200px;">' +
            '<svg class="largefileupload-motion-chart-svg" width="35%" height="200" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
            '<rect x="60" y="1" width="calc( 100% - 61px )" height="198" fill="transparent" stroke="#666" stroke-width="1" />' +
            '<polyline class="largefileupload-motion-chart-fill-polyline" fill="#00affe" stroke="#00affe" stroke-width="2" />' +
            '</svg></div>';
        $(obj).find('.largefileupload-motion').append(res);
    };

    this.setCircleProgress = function (pLfu, file, mA2mDms) {
        var length = 0;
        var val = 0;
        $.each(mA2mDms, function (i, myA2mDms) {
            if (myA2mDms.lfu.progress() !== 0) {
                val += myA2mDms.lfu.progress() * myA2mDms.lfu.getSize();
                length += myA2mDms.lfu.getSize();
            }
        });
        val = ((val / length) * 100).toFixed(0);
        var $circle = $('#largefileupload-motion-circle-zone .largefileupload-motion-circle-bar');

        if (isNaN(val)) {
            val = 0;
        }
        else {
            var r = $circle.attr('r');
            var c = Math.PI * (r * 2);

            if (val < 0) {
                val = 0;
            }
            if (val > 100) {
                val = 100;
            }

            var pct = ((100 - val) / 100) * c;

            $circle.css({strokeDashoffset: pct});

            $('#largefileupload-motion-circle-zone').attr('data-before', val + '%');
        }
    };

    this.setMultiCircleProgress = function (pLfu, file, mA2mDms) {
        var length = 0;
        var val = 0;
        $.each(mA2mDms, function (i, myA2mDms) {
            if (myA2mDms.lfu.progress() !== 0) {
                val += myA2mDms.lfu.progress() * myA2mDms.lfu.getSize();
                length += myA2mDms.lfu.getSize();
            }
        });
        val = ((val / length) * 100).toFixed(0);
        var $circle0 = $('#largefileupload-motion-multi-circle-zone .largefileupload-motion-circle-file-bar');
        var $circle1 = $('#largefileupload-motion-multi-circle-zone .largefileupload-motion-circle-bar');
        var $circle2 = $('#largefileupload-motion-multi-circle-zone .largefileupload-motion-circle-speed-bar');

        if (isNaN(val)) {
            val = 0;
        }
        else {
            var r0 = $circle0.attr('r');
            var r1 = $circle1.attr('r');
            var r2 = $circle2.attr('r');
            var c0 = Math.PI * (r0 * 2);
            var c1 = Math.PI * (r1 * 2);
            var c2 = Math.PI * (r2 * 2);

            if (val < 0) {
                val = 0;
            }
            if (val > 100) {
                val = 100;
            }

            var val0 = (file.progress() * 100).toFixed(0);
            var speed = file.uploadSpeed();

            var y = formatSize(speed);
            var y_format = y.replaceAll(/[0-9]*[\.0-9][^.*]/g, '').trim();
            var y_size = Number(y.replaceAll(/[^0-9][^\.0-9].*/g, ''));
            var yTerm = 1;

            var pct0 = ((100 - val0) / 100) * c0;
            var pct1 = ((100 - val) / 100) * c1;
            var pct2 = c2;

            if (y_format === 'KB') {
                pct2 = ((100 - (Number(y_size) % 100)) / 100) * c2;
            } else if (y_format === 'MB') {
                pct2 = (((10 - (Number(y_size) % 10)) * 10) / 100) * c2;
            }

            $circle0.css({strokeDashoffset: pct0});
            $circle1.css({strokeDashoffset: pct1});
            $circle2.css({strokeDashoffset: pct2});
            $('#largefileupload-motion-multi-circle-zone').attr('data-before', (pLfu.files.indexOf(file) + 1) + '(' + val0 + '%) / ' + pLfu.files.length + '(' + val + '%)');
            $('#largefileupload-motion-multi-circle-zone').attr('data-after', y + '/s');

        }
    };

    var speedArray = [];
    var minY = -1;
    var maxY = -1;

    this.setChartProgressAtRelativeSpeed = function (pLfu, file) {
        var svg = $('.largefileupload-motion-relative-chart-svg');
        var y = file.uploadSpeed();
        var yString = formatSize(y);
        var y_format = yString.replaceAll(/[0-9]*[\.0-9][^.*]/g, '').trim();
        var y_size = yString.replaceAll(/[^0-9][^\.0-9].*/g, '');
        var size = speedArray.length;
        var points = '';
        var xTerm = (svg.width() - 60) / 100;
        var yTerm = 1;

        if (minY === -1) {
            minY = y;
            maxY = y;
        }

        if (y_format === 'KB') {
            yTerm = 1024;
        } else if (y_format === 'MB') {
            yTerm = 1024 * 1024;
        } else if (y_format === 'GB') {
            yTerm = 1024 * 1024 * 1024;
        }

        var gap = (maxY - minY) / yTerm;

        var scaleY = 200 / Math.round(gap * 2);

        var yOffset = minY - (gap * yTerm / 2) > 0 ? minY - (gap * yTerm / 2) : minY;
        //yOffset = Math.floor(y_size / scaleY) * scaleY;
        // yOffset = (y / yTerm)-(100 / ((200 / scaleY) - 1));

        if (size == 101) {
            speedArray.splice(0, 1);
        }

        if (isNaN(y)) {
            y = 0;
        }

        speedArray.push(y);

        minY = y;
        maxY = y;

        for (var i = 0; i < size; i++) {
            if (speedArray[i] < minY)
                minY = speedArray[i];
            else if (speedArray[i] > maxY)
                maxY = speedArray[i];

            // points += ((i * xTerm)+60) + ',' + (((speedArray[i] / yTerm) - yOffset) * ((200 / scaleY) - 1)) + ' ';
            points += ((i * xTerm) + 60) + ',' + (((speedArray[i] - yOffset) / yTerm) * scaleY) + ' ';

        }

        svg.find('.largefileupload-motion-chart-line-polyline').attr('points', points);
        svg.find('.largefileupload-motion-chart-line-polyline').attr('transform', 'scale(1 -1) translate(0 -200)');
        svg.find('.largefileupload-motion-chart-min-text').html(formatSize(yOffset) + '/s');
        svg.find('.largefileupload-motion-chart-max-text').html(((maxY / yTerm) + gap).toFixed(1) + ' ' + y_format + '/s');
        svg.find('.largefileupload-motion-chart-current-text').html(yString + '/s');
        svg.find('.largefileupload-motion-chart-current-text').attr('x', ((size - 1) * xTerm) - 10);
        svg.find('.largefileupload-motion-chart-current-text').attr('y', 200 - (((y - yOffset) / yTerm) * scaleY));
    };

    this.setChartProgressAtAbsoluteSpeed = function (pLfu, file) {
        var svg = $('.largefileupload-motion-absolute-chart-svg');
        var y = file.uploadSpeed();
        var yString = formatSize(y);
        var y_format = yString.replaceAll(/[0-9]*[\.0-9][^.*]/g, '').trim();
        var y_size = yString.replaceAll(/[^0-9][^\.0-9].*/g, '');
        var size = speedArray.length;
        var points = '';
        var xTerm = (svg.width() - 60) / 100;
        var yTerm = 1;

        if (minY === -1) {
            maxY = y;
        }

        if (y_format === 'KB') {
            yTerm = 1024;
        } else if (y_format === 'MB') {
            yTerm = 1024 * 1024;
        } else if (y_format === 'GB') {
            yTerm = 1024 * 1024 * 1024;
        }

        var gap = maxY / yTerm;

        var scaleY = 200 / Math.round(gap * 1.5);

        var yOffset = 0;
        //yOffset = Math.floor(y_size / scaleY) * scaleY;
        // yOffset = (y / yTerm)-(100 / ((200 / scaleY) - 1));

        if (size == 101) {
            speedArray.splice(0, 1);
        }

        if (isNaN(y)) {
            y = 0;
        }

        speedArray.push(y);

        maxY = y;

        for (var i = 0; i < size; i++) {
            if (speedArray[i] > maxY)
                maxY = speedArray[i];

            // points += ((i * xTerm)+60) + ',' + (((speedArray[i] / yTerm) - yOffset) * ((200 / scaleY) - 1)) + ' ';
            points += ((i * xTerm) + 60) + ',' + (((speedArray[i] - yOffset) / yTerm) * scaleY) + ' ';

        }

        svg.find('.largefileupload-motion-chart-line-polyline').attr('points', points);
        svg.find('.largefileupload-motion-chart-line-polyline').attr('transform', 'scale(1 -1) translate(0 -200)');
        svg.find('.largefileupload-motion-chart-min-text').html(formatSize(yOffset) + '/s');
        svg.find('.largefileupload-motion-chart-max-text').html(((maxY / yTerm) * 1.5).toFixed(1) + ' ' + y_format + '/s');
        svg.find('.largefileupload-motion-chart-current-text').html(yString + '/s');
        svg.find('.largefileupload-motion-chart-current-text').attr('x', ((size - 1) * xTerm) - 10);
        svg.find('.largefileupload-motion-chart-current-text').attr('y', 200 - (((y - yOffset) / yTerm) * scaleY));
    };

    var volumeArray = [];

    this.setChartProgressAtVolume = function (pLfu, mA2mDms) {
        var length = 0;
        var myProgress = 0;
        var size = volumeArray.length;
        var xTerm = ($('.largefileupload-motion-chart-svg').width() - 60) / 50;
        var points = '';

        $.each(mA2mDms, function (i, myA2mDms) {
            if (myA2mDms.lfu.progress() !== 0) {
                myProgress += myA2mDms.lfu.progress() * myA2mDms.lfu.getSize();
                length += myA2mDms.lfu.getSize();
            }
        });
        myProgress = myProgress / length;

        if (size == 51) {
            volumeArray.splice(0, 1);
        }

        if (isNaN(myProgress)) {
            myProgress = 0;
        }

        volumeArray.push(myProgress * 100 * 2);

        for (var i = 0; i < size; i++) {
            points += ((i * xTerm) + 60) + ',' + volumeArray[i] + ' ';
        }

        points = '60,0 ' + points;
        points += ((size - 1) * xTerm + 60) + ',0';

        $('.largefileupload-motion-chart-fill-polyline').attr('points', points);
        $('.largefileupload-motion-chart-fill-polyline').attr('transform', 'scale(1 -1) translate(0 -200)');
    };

    var prevTime = 0;
    this.setProgress = function (pLfu, file, mA2mDms) {
        var currentTime = new Date().getTime();
        if (prevTime == 0) {
            this.setCircleProgress(pLfu, file, mA2mDms);
            this.setMultiCircleProgress(pLfu, file, mA2mDms);
            this.setChartProgressAtAbsoluteSpeed(pLfu, file);
            this.setChartProgressAtRelativeSpeed(pLfu, file);
            this.setChartProgressAtVolume(pLfu, mA2mDms);
            prevTime = currentTime;
        } else if (currentTime - prevTime > 100 | file.progress() == 1) {
            this.setCircleProgress(pLfu, file, mA2mDms);
            this.setMultiCircleProgress(pLfu, file, mA2mDms);
            this.setChartProgressAtAbsoluteSpeed(pLfu, file);
            this.setChartProgressAtRelativeSpeed(pLfu, file);
            this.setChartProgressAtVolume(pLfu, mA2mDms);
            prevTime = currentTime;
        }
    };
    return (this);
};

var Design = function (opts) {

    this.version = '1.0';
    $context = this;
    $context.defaults = {
        themes: "basic",
        motion: {
            type: "basic",
            color: ""
        },
        component: {
            width: "100%",
            height: "294px",
            class: "",
            css: "position:relative; display:block;border:1px solid #bac2cc;",
            dropbox: {
                css: "text-align:center;background:#f2f4f7;display:block;",
                class: "",
                coverImgText: {
                    img: "/images/file.png/",
                    text: "파일을 <b>마우스로 끌어</b> 넣어주세요",
                    textcolor: "#000",
                    accentTextcolor: "#00affe",
                    left: "40%",
                    top: "30%"
                }
            },
            fileList: {
                width: ['60%', '40%'],
                height: ["17%", "17%"],
                header: {
                    class: "",
                    css: "background-color:#f2f4f7;border-bottom:1px solid #d1d8e4;text-align:left;padding-left:20px;"
                },
                columns: {
                    class: "",
                    css: "background-color:#fafafa;border-bottom:1px solid #d1d8e4;text-align:left;padding-left:20px;"
                }
            },
            Toolbar: {
                layout: "bottom",
                size: "18%",
                css: "padding:10px 20px;border-top:1px solid #bac2cc;",
                addbutton: {
                    text: "파일 추가",
                    width: "13%",
                    height: "100%",
                    img: "/images/plus.png",
                    top: "",
                    left: "",
                    class: "",
                    css: "background:#323a47;border:1px solid #131822;display:inline-block;text-align:center;" +
                    "vertical-align:middle;border-radius:3px;line-height:32px;text-decoration:none;color:white;"
                },
                delbutton: {
                    text: "",
                    width: "",
                    height: "",
                    img: "/images/delete.png",
                    top: "",
                    left: "",
                    class: "",
                    css: "display:inline-block;text-align:center;vertical-align:middle;text-decoration:none;"
                },
                downbutton: {
                    text: "",
                    width: "",
                    height: "",
                    img: "/images/download.png",
                    top: "",
                    left: "",
                    class: "",
                    css: "display:inline-block;text-align:center;vertical-align:middle;text-decoration:none;padding:0px 20px;"
                },
                info: {
                    textcolor: "#000",
                    accentTextcolor: "#00affe",
                    top: "",
                    left: "",
                    margin: ""
                },
                uploadPopup:{
                    img:"/images/upload.png"
                }
            }
        }
    };
    var $designOpts = {};
    if (designDefault) {
        // is not null
        $designOpts = $.extend(true, $designOpts, $context.defaults, designDefault);
    } else {
        // is null
        $designOpts = $.extend(true, $designOpts, $context.defaults)
    }

    // merge the object
    $context.opts = $.extend(true, {}, $designOpts, opts.design);

    // save target
    // $context.opts
    $context.getOpt = function (o) {
        var $opt = this;
        // Get multiple option if passed an array
        if (o instanceof Array) {
            var options = {};
            $h.each(o, function (option) {
                options[option] = $opt.getOpt(option);
            });
            return options;
        } else {
            /*if ($opt instanceof Design) {
                        if (typeof $opt.opts[o] !== 'undefined') { return $opt.opts[o]; }
                        else { return $opt.defaults[o]; }
                    }
                    else {*/
            $opts = o.split(".");
            //optObject = this.getOpt($opts[0]);
            var getopt = getDetailopt($opt.opts, 0, $opts);
            if (getopt === undefined)
                getopt = getDetailopt($opt.defaults, 0, $opts);
            return getopt;
            // }
        }
    };

    function getDetailopt(optObject, index, $opts) {
        return index == ($opts.length - 1) ? optObject[$opts[index]] : getDetailopt(optObject[$opts[index]], index + 1, $opts);
    }

    $context.setOpt = function (name, opt) {
        var $opts = name.split(".");
        setDetailOpt($opts, 0, opt);
    };

    function setDetailOpt($opts, index, opt) {
        //if($opts.length == index)

    }

}
var rejectCssOption = function (cssString) {
    var option = cssString.split(";");
    var retstring = "";
    for (var i = 0; i < option.length; i++) {
        var keyvalue = option[i].trim().toLowerCase().split(':');
        if (keyvalue[0] != "position" && keyvalue[0] != "width" && keyvalue[0] != "height" && keyvalue[0] != "left" && keyvalue[0] != "right" && keyvalue[0] != "bottom" && keyvalue[0] != "top" && keyvalue[0] != "float" && keyvalue[0] != "transform" && keyvalue[0] != "box-sizing") {
            retstring += option[i] + ";";
        }
    }
    return retstring;
};

var rejecttillOpacity = function (cssString) {
    var option = rejectCssOption(cssString).split(";");
    var retstring = "";
    for (var i = 0; i < option.length; i++) {
        var keyvalue = option[i].trim().toLowerCase().split(':');
        if (keyvalue[0] != "opacity") {
            retstring += option[i] + ";";
        }
    }
    return retstring;
}
var compareMessage = function (key, list) {
    var msg = comMessage[key];
    msg = msg.replace(/{(\d)}/, function (match, $1, $2, $3, $4) {
        return replaceMessage(list, $1)
    });

    swal(msg)
};
var replaceMessage = function (list, idx) {
    return list[idx]
};
var removeDuplicates = function(array){
    var retarray = [];
    $.each(array, function(index, element){
        if(!retarray.contains(element.toLowerCase()))
            retarray.push(element.toLowerCase());
    });
    return retarray;
}