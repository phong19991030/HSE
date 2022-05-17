//이벤트 모음 
$(document).ready(function(){
	// dialog 이벤트 
	$(document).on('click','.ac_click.popup',function(){ 
		if(!$(this).hasClass("bt_disabled")){ 
			var type = $(this).data('type');
			if(type == 'dialog' ){
				var url ;
				if($(this).data('url').indexOf('.'+type)<0){
					url =$(this).data('url').concat('.'+type);	
				}else{
					url =$(this).data('url');
				}
				
				var cls = $(this).data('cls');
				var classes = $(this).data('class');
				var target = $(this).attr('id');
				var callback = $(this).data('callback'); 
				var eventType= $(this).data('eventtype');
				var funcname= $(this).data('funcname'); 
				var defaultValue= $(this).data('defaultvalue'); 
				var width ; 
				width =  $(this).data('width') ? $(this).data('width') :'auto';
				var height; 
				height =  $(this).data('height') ? $(this).data('height') :'auto';
				var paramStr = getDialogPopupParam($(this).data('param'));
				var offset = {'x':($(this).data('x') ? $(this).data('x') :0), 'y':($(this).data('y') ? $(this).data('y') :0)};
				getDialogPopup(url, cls, type, defaultValue, target, callback, eventType, funcname, width, height,offset.x,offset.y, paramStr, classes);
			}else if(type == 'popup'){
				
				var url ;
				if($(this).data('url').indexOf('.'+type)<0){
					url =$(this).data('url').concat('.'+type);	
				}else{
					url =$(this).data('url')
				}
				 
				var cls = $(this).data('cls');
				var target = $(this).attr('id');
				var callback = $(this).data('callback'); 
				var eventType= $(this).data('eventtype');
				var funcname= $(this).data('funcname'); 
				var defaultValue= $(this).data('defaultvalue'); 
				var width= $(this).data('width');
				width =  width ? width :'auto';
				var height= $(this).data('height');
				height =  height ? height :'auto';
				var paramStr = getDialogPopupParam($(this).data('param'));
				
				getWindowPopup(url, cls, type, defaultValue, target, callback, eventType, funcname, width, height, paramStr);
			}  
			
		}
	});
	
	

	
	
	//검색 submit
	$(document).on('click','.ac_click.submit',function(){
		
		 $(this).parents('form').submit()
		
	});
	$(document).on('click','#search_arrow',function(){
		var $a = $(this).closest('.group').find('.group_content');
		if($a.hasClass('hide') == true){
			$a.removeClass('hide');
			$(this).find('img').attr('src','\\images\\fork_images\\search_arrow.png');

		}else{
			$a.addClass('hide');
			$(this).find('img').attr('src','\\images\\fork_images\\search_arrow_top.png')
		}
		
		 
		
	});
	//초기화
	$(document).on('click','.ac_click.reset',function(){
		var $form = $(this).parents('form.form_search_box');
		var callback = $(this).data('callback'); 
		$form.each(function() {  
	        this.reset();  
	    }); 
		if(callback) {
			/*
			 * @JK - 보안 취약점 수정 
			 */
			//eval(callback+'()');
			window[callback]();
		}
		$form.trigger('submit');
	});
	//팝업윈도우 창닫기
	$(document).on('click','.ac_click.winclose',function(){
		window.close();
	});
	//팝업윈도우 창닫기-부모창 reload
	$(document).on('click','.ac_click.winclose_reload',function(){
		var callback = $(this).data('callback');
		if(callback){ 
			/*
			 * @VIET - 보안 취약점 수정
			 */
//			opener.parent.eval(callback);
			window[callback];
		}else{
			opener.parent.$('.form_search_box').submit();
		}		
		window.close();
	});
	
	$(document).on('click','.ac_click.tab > li',function(){
		var $contentsTarget= $('.tab_content#'+($(this).parent().data('rid')));
		$contentsTarget.closest('div').addClass('tabWrapper') 
		$contentsTarget.find('>li').eq(0).show();
		$(this).addClass('act1').siblings().removeClass('act1');
		$(this).addClass('tab_current').siblings().removeClass('tab_current');
		$contentsTarget.find('>li').eq($(this).index()).show().siblings().hide();
		if($(this).parent().hasClass('ajaxTab')){
			if($(this).data('url')){
				$contentsTarget.find('>li').data('url', $(this).data('url'));
				$contentsTarget.find('>li').empty();
				//yjin1214 param 추가 20160722
				commonAjaxTab($(this).data('url'),$contentsTarget.find('>li'),getDialogPopupParam($(this).data('param')));
				//commonAjaxTab($(this).data('url'),$contentsTarget.find('>li'));
			}
		}else{
			var par_func = $(this).parent().data('func');
			if(par_func){
				/*
				 * @JK - 보안 취약점 수정 
				 */
				//eval(par_func+'($(this))');
				window[par_func]($(this));
			}
			var func = $(this).data('func');
			if(func){
				/*
				 * @JK - 보안 취약점 수정 
				 */
				//eval(func+'($(this))');
				window[func]($(this));
			}
			
			
			
		}
//		resizeGrid()
	});

	// btn
//	$(document).on('click', 'span.ac_click.btn', function() {
//		var $target = $(this);
//		var funcName = $target.data('func');
//		// 함수실행
//		eval(funcName + '($target)')
//	});
	$(document).on('click','.ac_click.link',function(){
		var url = $(this).data("url"); 
		var func = $(this).data("func"); 
		if(func){
			/*
			 * @JK - 보안 취약점 수정
			 */
			//eval(func+'($(this))');
			window[func]($(this));
		}else
		if(url){ 
			location.href = url; 
		}
	});
	
	//버튼제어 : 버튼일 경우에만 적용
	$(document).on('click','.ac_click.btn',function(){
		var url = $(this).data("url"); 
		var func = $(this).data("func"); 
		if(!$(this).hasClass("popup")){
			if(!$(this).hasClass("bt_disabled")){ 
				if(func){
					/*
					 * @JK - 보안 취약점 수정 
					 */
					//eval(func+'($(this))');
					window[func]($(this));
				} else
				if(url){ 
					location.href = url; 
				}
			}
		}
	});
	
	
	//년월을 버튼으로 제어할 경우 이전/다음년월 동작
	$(document).on('click','.ac_click.stepper_prev',function(){
		var cls = $(this).data('cls');
		var inputid = $(this).data('inputid');
		var callback = $(this).data('callback'); 
		var chgDate;
		var $target = $('#'+inputid.replace('[','\\[').replace(']','\\]').replace('.','\\.'));
		if(cls == "YY"){//년도
			chgDate = Number($target.val())-1;
		}else{//년월
//			var yyyymm = $target.val().substring(0,4) +"-"+ $target.val().substring(4,6); 
//			$target.expressionEngine('fieldDetValue');
			var yyyymm = $target.val(); 
			var dt = new Date(yyyymm+'-02');
			dt.setMonth(dt.getMonth()-1); 
			
			
			chgDate = dt.toJSON().substring(0,7).replace('-','');
//			chgDate = dt.getFullYear()+''+dt.getMonth()
		}
		//$target.prop('value',chgDate);
		$target.val(chgDate); 
		$target.expressionEngine('fieldAttValue')
//		if(callback) eval(callback.replace(/\(\)/g,'')+'()');	
		//		anhpv 08012021
		if(callback) window[callback.replace(/\(\)/g,'')]();		
	});
	$(document).on('click','.ac_click.stepper_next',function(){
		var cls = $(this).data('cls');
		var inputid = $(this).data('inputid');
		var callback = $(this).data('callback'); 
		var chgDate;
		var $target = $('#'+inputid.replace('[','\\[').replace(']','\\]').replace('.','\\.'));
		if(cls == "YY"){//년도
			chgDate = Number($target.val())+1;
		}else{//년월 
//			$target.expressionEngine('fieldDetValue')
			var yyyymm = $target.val(); 
			var dt = new Date(yyyymm+'-02');
			dt.setMonth(dt.getMonth()+1);
//			chgDate = dt.getFullYear()+''+dt.getMonth()
			chgDate = dt.toJSON().substring(0,7).replace('-','');
		}
		//$target.prop('value',chgDate);
		$target.attr('value',chgDate);
		$target.expressionEngine('fieldAttValue')
		
		/*
		 * @VIET - 보안 취약점 수정
		 */
		//if(callback) eval(callback.replace(/\(\)/g,'')+'()');	
		if(callback) window[callback.replace(/\(\)/g,'')]();		
	});
	// 오류동작 감지 확인 필요 
//	$(document).on('change','.ac_change.stepper_input',function(){
//		var callback = $(this).data('callback'); 
//		if(callback) eval(callback);
//	});
	
	
	///checkbox 기본 동작 
	///checkbox 둉작
	$(document).on('change','input[type="checkbox"].cloned',function(){
		var $target = $(this).siblings('input[type="checkbox"]');
		if(this.hasAttribute('readonly')){
			return false;
		}
		if($(this).prop('checked')){
			$target.prop('checked',false);
		}else{ 
			$target.prop('checked',true);
		}
	});
	
	$(document).on('change','input[type="radio"].cloned',function(){
		var $target = $(this).siblings('input[type="radio"]');
		if(this.hasAttribute('readonly')){
			return false;
		}
		if($(this).prop('checked')){
			$target.prop('checked',false);
		}else{ 
			$target.prop('checked',true);
		}
	});
	
	
	/** stepper */
	// 그리드 내 steppter 데이터 변경 시 상태값 변경
	$(document).on('click','div.grid_event_apply div:not(".frozen") td span.stepper_prev, td span.stepper_next',function(){
		updateRow($(this));
	});
	
	
	//tab 가장 앞의 값 기본 설정 
	$('.ac_click.tab > li:first-child').trigger('click');
	
	//DatePicker 설정 
//	$('.datepicker').datepicker({});
	
	(function( $ ){
		   $.fn.setDatePicker = function(format) {
			   if(!format){
				   format = 'yy-mm-dd';
//				   if(WT_LOCALE && WT_LOCALE == 'ko'){
//					   format = 'yy-mm-dd';
//				   }else{
//					   format = 'dd-mm-yy';
//				   }
			   }
			   var placeholder = format.replace('yy', 'yyyy');
			   
			   if($(this).is('input.datepicker')){
				   $(this).after('<span class="calendar-picker-btn" title="Date picker"><i class="xi-calendar"></i></span>' );
					$(this).datepicker({'onSelect':function(){
						$(this).focus();
						$(this).trigger('change');
					},// 'buttonImageOnly': true , showOn: "button", // @JK buttonImageOnly : false(default), showOn: "button" (버튼생성)
					dateFormat: format
					}).attr('placeholder', placeholder);
//				   $(this).datepicker("option", "dateFormat", format?format: 'yy/mm/dd');

				   $(this).parent().children('.calendar-picker-btn').click(function() {

					   $(this).datepicker('show');
				   })
					
			   }else{
				   return false;
			   }
		   }; 
		   
		   $.fn.setDateTimePicker = function(format, maxDate, maxTime) {
//			   if(!format){
//				   if(WT_LOCALE && WT_LOCALE == 'ko'){
//					   format = 'yy-mm-dd';
//				   }else{
//					   format = 'dd-mm-yy';
//				   }
//			   }
			   format = 'yy-mm-dd';

			   
			   if($(this).is('input.datetimepicker')){
				   	$(this).after('<span class="calendar-picker-btn" title="Datetime picker"><i class="xi-calendar"></i></span>');
					$(this).datetimepicker({
//						modifier: @Viet
//						change time slider to time select box 
						controlType: 'select',
						dateFormat: format,
						timeFormat: 'HH:mm:ss',
						separator: "T",
						showTimePicker: false,
						showMillisec:false,
						showMicrosec:false,
						showTimezone:false,
						//changeYear: true, //콤보박스에서 년 선택 가능
						//changeMonth: true,  //콤보박스에서 월 선택 가능
						//timepicker: true,
						onShow: function() {
							this.setOptions({
								maxDate: maxDate ? maxDate : false,
								maxTime: maxTime ? maxTime : false
							});
						}
					}); //.attr('readonly', 'readonly');

				   $(this).parent().children('.calendar-picker-btn').click(function() {
					   $(this).datetimepicker('show');
				   });
				
			   } else {
				   return false;
			   }
		   }; 
	})( jQuery );
	
	  
	
	// selectBox readonly || not readonly 처리
	// $(document).on('focus','select',function(){
	// 	if($(this).filter('[readonly]').size() > 0 ){
	// 		$(this).find('option:selected').removeClass('hide readonly').siblings(':not(.hide)').addClass('hide readonly')
	// 	}else{
	// 		$(this).find('option.readonly').removeClass('hide readonly')
	// 	}
	// })
	
	
	if(!browserChk){
		$(document).on('keypress','textarea',function(){
		
		 var maxLength = $(this).attr('maxlength');  
	        if ($(this).val().length > maxLength) {  
	            $(this).val($(this).val().substring(0, maxLength));  
	        }  
		})
		
	}
});



function commonAjaxTab(url,$target,param){
	$.ajax({
		url:CTX+ url , 
		data: param,
		cache:false, 
		success: function(data, textStatus, jqXHR) { 
			var dom = $(data);
//			dom.filter('script').each(function(){
//	            if(this.src) {
//	                var script = document.createElement('script'), i, attrName, attrValue, attrs = this.attributes;
//	                for(i = 0; i < attrs.length; i++) {
//	                    attrName = attrs[i].name;
//	                    attrValue = attrs[i].value;
//	                    script[attrName] = attrValue;
//	                }
//	                document.body.appendChild(script);
//	            } else {
//	                $.globalEval(this.text || this.textContent || this.innerHTML || '');
//	            }
//	        });
			$target.html(data);
		},complete: function(){
			
		}
	});
}

var extendForm = function (dataObj, $form) {
	var formObj = $form.serializeObject;
	if(typeof(formObj) == 'object') {
		$.extend( dataObj, formObj);	
	}	
	return dataObj;
}


var messages = {
		'en': {
			'QUESTION' : 'Would you like to save it?',
			'FAIL' : 'Save Failed.',
			'SUCCESS' : 'Save succeeded.',
			'FAIL2' : 'Save Failed.',
			'SUCCESS2' : 'Save succeeded.'
		},
		'ko':{
			'QUESTION' : '저장하시겠습니까?',
				'FAIL' :  '저장실패하였습니다.',
				'SUCCESS' :  '저장성공했습니다.',
					'FAIL2' : 'Update unsuccessful.',
					'SUCCESS2' : 'Update successful.'
		}
		
}

/* 
 * modified 2018/12/12 - add argument url 
 * save by url if be passed
 */
var saveAjax = function (form,callback,url){
	var $form;
	if (form.nodeType) {
		$form = $(form);
	} else if (form.jquery) {
		$form = form;
	}
//	var $gridDom = $(form).find('.grid_target').getViewGrid();
	var $gridDom = $form.getFormViewGrid();
//	var $kendo = $form.data('kendoGrid')
//	var $kendoData = $form.data('kendoGrid').dataSource
	
//	var items = $form.find('.base_grid_table').getGrid().dataItems()
//	JSON.stringify($('.base_grid_table').data('kendoGrid').dataItems())
	
	var dataObj={};
	if($gridDom){
		$.each($gridDom, function(){
			dataObj[$(this).data('resultKey')] = JSON.stringify($(this).getDataSource().data().toJSON());
		})
	}
	
	/*var formObj = $form.serializeObject;
	if(typeof(formObj) == 'object') {
		$.extend( dataObj, formObj);	
	}*/
	extendForm(dataObj,$form);
	
	
	
	var arr = {};
	
	$.each($(form).serializeArray2('.base_grid_table'), function(i,val){
		//유진요청 - exposeField 에 따라 그리드안에 인풋박스도 캐치됨
		// 수정 필요 TODO
		if(arr[val.name]){
			if(Array.isArray(arr[val.name])){
				arr[val.name].push(val.value)
			}else{
				var tmp = arr[val.name] 
				arr[val.name] = new Array();
				arr[val.name].push(tmp)
				arr[val.name].push(val.value)
			}
		}else{
			arr[val.name] = val.value;
			
		}
	}) ;
	
	$.extend( dataObj,arr);
	
	
	var selectedLang = lang? lang: 'en';

	var message = {
		'QUESTION' : {
			'MESSAGE' : messages[selectedLang]['QUESTION']
		},
		'FAIL' : {
			'MESSAGE' : arr['CRUD'] == 'U'? messages[selectedLang]['FAIL2']: messages[selectedLang]['FAIL']
		},
		'SUCCESS' : {
			'MESSAGE' : arr['CRUD'] == 'U'? messages[selectedLang]['SUCCESS2']: messages[selectedLang]['SUCCESS']
		}
	}
	if($(form).data('msg')){
		message = getMessage($(form).data('msg'));
	}
	
	
	
	// mesaage (data-msg) 가 null 일경우 메시지 없음 
	// 로직 중복으로 수정필요
//	if($(form).data('msg') !=null){
//		if(confirm(message.QUESTION.MESSAGE)){ 
		    var action_url;
		    if(url){
		        action_url = url;
		    }else{
                action_url  = $form.attr('action');    		        
		    }
			
			$.ajax({
				url : action_url,
//				dataType:"json",
				cache:false,
				//async:false,
				data: dataObj,
				type:'POST',
				success:function(data, textStatus, jqXHR){
//					data = data.replace(/\"/g,''); 
					if(data == "true" || data.result == "true" || data.result == true){
						if(data.msg2){
							alert(data.msg2);			 			
						}else{
							alert(message.SUCCESS.MESSAGE);
						}
					}else{
						//alert(data.message);
						// Server validation - 추후변경 
						if (data.UNVALIDATED) {
							serverInvalidated(data.UNVALIDATED, $(form));
						}
						// Server validation end
						if(data.msg2){
							alert(data.msg2);			 			
						}else if(data.message){
							alert(data.message)
						}else{
							alert(message.FAIL.MESSAGE);
						}
					}		
					
					
					if(callback){
						/*
						 * @JK - 보안 취약점 수정
						 */
						//eval(callback+'(form, data)');
						window[callback](form, data);
					}
				},complete: function(){
				
					return true;
				},error : function(){
					alert(message.FAIL);
					return false;
				}
			});
//		}
//	}else{
//		$(form).ajaxSubmit({
//			success: function(data, textStatus, jqXHR) { 
//				if(data == "true" || data.result == "true"){
//					alert(message.SUCCESS.MESSAGE);
//					if(callback){
//						eval(callback+'(form, data)');
//					}
//				}else{
//				}				
//			},complete: function(){
//				return true;
//			},error : function(){
//				return false;
//			}
//		});		
//	}
	//}	
}


var saveAjax2 = function (url, param, callback){
  // anhpv 2018/12/12
    //simple ajax with param
    
	var selectedLang = lang? lang: 'en';

	var message = {
		'QUESTION' : {
			'MESSAGE' : messages[selectedLang]['QUESTION']
		},
		'FAIL' : {
			'MESSAGE' : messages[selectedLang]['FAIL']
		},
		'SUCCESS' : {
			'MESSAGE' : messages[selectedLang]['SUCCESS']
		}
	}

    if(confirm(message.QUESTION.MESSAGE)){ 
            $.ajax({
                url : url,
                //dataType:"json",
                cache:false,
                //async:false,
                data: param,
                type:'POST',
                success:function(data, textStatus, jqXHR){
                    
                    // 180423 이유진대리님 - 예외처리 commit ( 임시 )
                    if ( typeof(data) != "object" ) {
                        data = data.replace(/\"/g,''); 
                    }
                            
                    if(data == "true" || data.result == "true" || data.result == true){
                        if(data.msg2){
                            alert(data.msg2);                       
                        }else{
                            alert(message.SUCCESS.MESSAGE);
                        }
                    }else{
                        //alert(data.message);
                        // Server validation - 추후변경 
                        if (data.UNVALIDATED) {
                            serverInvalidated(data.UNVALIDATED, $(form));
                        }
                        // Server validation end
                        if(data.msg2){
                            alert(data.msg2);                       
                        }else if(data.message){
                            alert(data.message)
                        }else{
                            alert(message.FAIL);
                        }
                    }       
                    
                    
                    if(callback){
                    	/*
                    	 * @JK - 보안 취약점 수정 
                    	 */
                        //eval(callback+'(param, data)');
                    	window[callback](param, data);
                    }
                },complete: function(){
                
                    return true;
                },error : function(){
                    alert(message.FAIL);
                    return false;
                }
            });
        }

}

var saveAjaxGrid = function (form, callback){
	var $form;
	if (form.nodeType) {
		$form = $(form);
	} else if (form.jquery) {
		$form = form;
	}
	
	$gridDom = $("#" + $form.data('gridid')).find('.base_grid_table'); 
	
	var dataObj={};
	if($gridDom){
		$.each($gridDom, function(){
			dataObj[$(this).data('resultKey')] = $(this).getDataSource().data().toJSON();
		})
	}
	extendForm(dataObj,$form);
	
	var selectedLang = lang? lang: 'en';

	var message = {
		'QUESTION' : {
			'MESSAGE' : messages[selectedLang]['QUESTION']
		},
		'FAIL' : {
			'MESSAGE' : messages[selectedLang]['FAIL']
		},
		'SUCCESS' : {
			'MESSAGE' : messages[selectedLang]['SUCCESS']
		}
	}
	if($(form).data('msg')){
		message = getMessage($(form).data('msg'));
	}
	
	
	var arr = {};
	
	$.each($(form).serializeArray2('.base_grid_table'), function(i,val){
		//유진요청 - exposeField 에 따라 그리드안에 인풋박스도 캐치됨
		// 수정 필요 TODO
		if(arr[val.name]){
			if(Array.isArray(arr[val.name])){
				arr[val.name].push(val.value)
			}else{
				var tmp = arr[val.name] 
				arr[val.name] = new Array();
				arr[val.name].push(tmp)
				arr[val.name].push(val.value)
			}
		}else{
			arr[val.name] = val.value;
			
		}
	}) ;
	
	$.extend( dataObj,arr);
	
	
	// mesaage (data-msg) 가 null 일경우 메시지 없음 
	// 로직 중복으로 수정필요
//	if($(form).data('msg') !=null){
		if(confirm(message.QUESTION.MESSAGE)){ 
			$.ajax({
				url : $form.attr('action'),
				//dataType:"json",
				cache:false,
				//async:false,
				data: dataObj,
				type:'POST',
				success:function(data, textStatus, jqXHR){
//					data = data.replace(/\"/g,''); 
					if(data == "true" || data.result == "true" || data.result == true){
						if(data.msg2){
							alert(data.msg2);			 			
						}else{
							alert(message.SUCCESS.MESSAGE);
						}
					}else{
						//alert(data.message);
						// Server validation - 추후변경 
						if (data.UNVALIDATED) {
							serverInvalidated(data.UNVALIDATED, $(form));
						}
						// Server validation end
						if(data.msg2){
							alert(data.msg2);			 			
						}else if(data.message){
							alert(data.message)
						}else{
							alert(message.FAIL);
						}
					}		
					
					
					if(callback){
						/*
						 * @JK - 보안 취약점 수정
						 */
						//eval(callback + '(form, data)');
						window[callback](form, data);
					}
				},complete: function(){
					return true;
				},error : function(){
					alert(message.FAIL);
					return false;
				}
			});
		}
}

function getMessage(msg){
	var message ;
	if(msg !=null){ 
		$.ajax({  
			url:CTX+'/common/message' , 
			type: 'post',
			data: {'msg':msg},
			cache:false, 
			async: false,
			success: function(data, textStatus, jqXHR) {
				if(data){
					if(data.indexOf('{') == -1){
						message = data
					}else{
						message = JSON.parse(data)
					}
					
				}
			},complete: function(){
				
				return true;
			},error : function(){
				return false;
			}
		});	
	}else{
		message	
	}
	return message;
}

//function generateDialogDom(){
//	var cid = $(document).find('body').find('.a2m_dialog').length
//	
//	$(document).find('body').append('<div id="a2m_dialog'+cid+'" class="a2m_dialog"></div>');
//	var $target= $('#a2m_dialog'+cid);
//	
//	return $target;
//}

function generateDialogDom(){
	if($(document).find('body').find('#layerPopup').length <1 ){
		$(document).find('body').append(' <div id="layerPopup" ></div>');
	}
	var cid = $(document).find('body').find('.a2m_dialog').length;
	if($("#wt_dialog"+cid).length <= 0){
		$('#layerPopup').append('<div id="wt_dialog'+cid+'" class="layer-cont"></div>');
	}
	var $target= $('#wt_dialog'+cid);
	
	return $target;
}

//anhpv 2020/03/02 - open normal dialog
var loadingDialog = false;
function openCommonDialog(url, param, callback, classes){
	console.log(loadingDialog);
	if(!loadingDialog){
		loadingDialog = true;
		var $target= generateDialogDom();
		$target.html('');
		$.ajax({
			url:CTX + url,
			data:param,
			async:false,
			cache:false, 
			success: function(data, textStatus, jqXHR) { 
				
				$target.html(data);
				initialControl();
				$target.parent('#layerPopup').addClass(classes);
				$(".layer-close").on("click", function(event) {
					$('body').css('position', '');
				    event.preventDefault();
				    $("#layerPopup").remove();
				    //t.focus();
				    if(callback){
				    	window[callback]();
				    }
				  });
			},complete: function(){
				loadingDialog = false;
			}
		});
		
		$target.closest('#layerPopup').addClass('active');
	}
}


// 공통다이얼로그 세팅 
function getDialogPopup(url, cls, type, defaultValue, target, callback, eventType, funcname, width, height,x,y, paramStr, classes){
	var $target= generateDialogDom();
	var param = {'url':url,'type':type,'cls':cls, 'type':type,'target':target,'defaultValue':defaultValue,'callback':callback,'eventType':eventType,'funcname':funcname, 'classes': classes};
	commonDialog($target,url,param,width,height,x,y,paramStr)
	
	
//	reposition($target);
}
//dialog position 맞추기 
function reposition($target,width,height,x,y){
//	$target.parent().css('left',$target.parent().position().left-(width =='auto'? $target.width(): eval(width))/2)
//	$target.parent().css('top',$target.parent().position().top-(height =='auto'? $target.height(): eval(height))/2)
	if(x !=null && y !=null){
		$target.parent().css('left',x);
		$target.parent().css('top',y);
	}else{
		$target.parent().css('left',$target.parent().position().left-(width =='auto'?   $target.width(): 0)/2)
		$target.parent().css('top',$target.parent().position().top-(height =='auto'? $target.height(): 0)/2)
	}
}

// 공통다이얼로그와 분리하기 위해 getDialogPopup를 분리하고
// commonDialog에서 어떤 기준으로 다이얼로그 생성할지... 
function commonDialog(target, url, param, width, height,x,y, paramStr, keep){
	// ** 파라미터 형식
	// paramStr = param1=value1&param2=value2&... (공통팝업에서 데이터 가공해서 사용시 주로 사용)
	// param = {'param1':'value1', 'param2':'value2', ...};
	var $target =target;
	$target.html('');
//	console.log(param['classes']);
	var params = '';
	if(paramStr) params = '?'+paramStr; // 파라미터값이 존재하는 경우만
	$.ajax({
		url:CTX+ url + params,
		data:param,
		async:false,
		cache:false, 
		success: function(data, textStatus, jqXHR) { 
			$target.html(data);
			$target.parent('#layerPopup').addClass(param['classes']);
				if($('.layer-cont .grid_target.scrollTable').length > 0){
				    $('.layer-cont .grid_target').mCustomScrollbar({
				        axis: "Y",
				        theme: "minimal-dark",
				        mouseWheelPixels: 300
				      });
				} else {
				    $('.layer-cont').mCustomScrollbar({
				        axis: "Y",
				        theme: "minimal-dark",
				        mouseWheelPixels: 300
				      });
				}

			$(".layer-close").on("click", function(event) {
				$('body').css('position', '');
			    event.preventDefault();
			    $("#layerPopup").remove();
			    //t.focus();
			    if(param['callback']){
			    	window[param['callback']]();
			    }
			   
			  });
		},complete: function(){
			if(width =='auto' || height =='auto'){
//				reposition($target,width,height,x,y)
			}
		}
	});
	
	$target.closest('#layerPopup').addClass('active');
	
//	$target.dialog({
//	    id: 'abcd',
//		resizable: false,
//		modal: true,
////		width: 600,
////	    height: 300, 
//	    width:(width =='auto'? 'auto' : eval(width)+10),
//	    height: (height =='auto'? 'auto' : eval(height)+10), 
//	    position: { my: "center", at: "center", of: $('body') },
//	    close: function(){
////	    	destroyDialogPopup($target);
//	    	//if(!keep) {
//	    		$target.dialog('destroy').remove();	
//	    	//}
//	    },
//	    open: function( event, ui ) {
//		     $(this).parent().promise().done(function () {
//	        });
//		     
//		     $(".ui-dialog").css("box-shadow","#999 5px 5px 5px"); 
//	    }
//	});
	
	
	

}

//window.open 팝업
function getWindowOpen(url,winNm,option){
	var open = window.open(url, winNm, option);
	open.focus();
}

function getHelpPopup(key){ 
	var url = "/common/popup/help" ;
	var data = /*'?url='+url+*/'key='+key;
	var open = window.open(CTX+url+'?'+data,'_help', 'width=1000, height=900, resizable=yes,scrollbars=yes,location=no');
	open.focus();
}


function getWindowPopup(url,cls,type,defaultValue,target,callback,eventType,funcname,width,height,paramStr){ 
	var data = /*'?url='+url+*/'cls='+cls+'&type='+type+'&defaultValue='+defaultValue+'&target='+target+'&callback='+callback+'&eventType='+eventType+'&funcname='+funcname;
	var params = '';
	if(paramStr) params = '&'+paramStr; // 파라미터값이 존재하는 경우만
	var open = window.open(CTX+url+'?'+data+params,cls, 'width='+width+', height='+height+', resizable=yes,scrollbars=yes,location=no');
	open.focus();
}
//function closeDialogPopup($form){	
//	var $target;
//	//this 등의 js object로 입력될 경우 Jquery object로 변경
//	$form = createJqueyObject($form);
//	if($form.hasClass('a2m_dialog')){
//		$target= $form;
//	}else{
//		$target= $form.parents('div.a2m_dialog');
//	}
//	$target.empty();
//	$target.dialog('close');
//}
function closeDialogPopup($form){	
	var $target;
	//this 등의 js object로 입력될 경우 Jquery object로 변경
	$form = createJqueyObject($form);
	if($form.attr('id') == 'layerPopup'){
		$target= $form;
	}else{
		$target= $form.parents('#layerPopup');
	}
//	$target.empty();
	$target.removeClass('active');
}
//function destroyDialogPopup($form){
//	var $target;
//	//this 등의 js object로 입력될 경우 Jquery object로 변경
//	$form = createJqueyObject($form);
//	if($form.hasClass('a2m_dialog')){
//		$target= $form;
//	}else{
//		$target= $form.parents('div.a2m_dialog');
//	}
//	$target.dialog('destroy');
//	$target.remove();
//}
function destroyDialogPopup($form){
	var $target;
	//this 등의 js object로 입력될 경우 Jquery object로 변경
	$form = createJqueyObject($form);
	if($form.attr('id') == 'layerPopup'){
		$target= $form;
	}else{
		$target= $form.parents('#layerPopup');
	}
//	$target.dialog('destroy');
	$target.remove();
}

/** Jquery Object로 변환 해줌 */
function createJqueyObject(obj ){
	var $obj ;
	if(obj instanceof jQuery){
		$obj = obj;
	}else{
		$obj = $(obj);
		obj = $(obj);
	}
	return $obj;
}





//결재라인 팝업창 생성
function doGwLineView($obj){
	var docno = $obj.data('docno')
	var rowid = $obj.data('rowid')
	var $parent = $obj.parents('table')
	if(!docno){
		var rowData = $parent.getLocalRow(rowid);
		if(rowData.GW_DOC_NO){
			docno =rowData.GW_DOC_NO; 
		}else{
			alert('문서번호가 없습니다.')
			return;
		}
	}
	handyGwLineView(docno);
}

//결재문서 조회 팝업창 생성
function doGwDocView($obj){
	var docno = $.trim($obj.data('docno'));
	var rowid = $obj.data('rowid');
	var $parent = $obj.parents('table');
	if(!docno){
		var rowData = $parent.getLocalRow(rowid);
		if(rowData.GW_DOC_NO){
			docno = $.trim(rowData.GW_DOC_NO); 
		}else{
			alert('문서번호가 없습니다.')
			return;
		}
	}
	
	handyGwDocView(docno);
}


 

function commonFilePopup($obj){
	var fileKey = $obj.data('param');
	var field = $obj.data('field');  
	var hold = $obj.data('hold');
	var open = window.open(CTX+'/common/file/uploadForm?fileKey='+fileKey+'&target='+field+'&hold='+hold,'_file','width=650, height=580, resizable=no,location=no')
	open.focus();
//	window.open(CTX+url+'?'+data+params,'_blank', 'width='+width+', height='+height+', resizable=yes');
}
function setFileFieldBind(name,value){
	var $target = $('[name="'+name+'"]');
	var $td = $('[name="'+name+'"]').parents('td');
	
	if($td.parents('.base_grid_table').length > 0  ){
		$td.setData($td.data('col'),value) 
//		$target.val(value)
//		$target.prev('span').data('param',value) 
		updateRow($td.parent('tr')); 
	}else{
		$target.val(value)
		$target.prev('span').data('param',value) 
	}
}



function setTargetUpdate($obj , fieldnm,data){
	if($obj ){
		if(fieldnm){
//			if(data){
				
				var $target = $obj.parents('tr').find('[col="'+fieldnm+'"]');
				
				if($target.find('input').length > 0){
					$target.find('input').datas(data)
				}else{
					$target.datas(data)
				}
				
//			}
		}
	}
}

/** Grid select ******/

 /*****popup ***/

//그리드 다이얼로그 - 다이얼로그 내 그리드 row 선택시 동작
function onSelectGriddialog(rowid, target, callback, obj) {
	var $target = $('#' + target.replace('.', '\\.'))
	var idx = $target.data('idx') ;
	var prevField = $target.data('targettext');
	var nextField = $target.data('targetcode');
	var data = $(obj).getRowData(rowid);
	
	var $tr = $target.closest('tr'); 
	var targetData = $tr.getRowData($tr)
	targetData[$target.data('prev')] = data[prevField];
	targetData[$target.data('next')] = data[nextField];
	$tr.find('[rd="'+$target.data('prev')+'"]').datas((data[prevField] ? data[prevField] : '' ))
	$tr.find('[rd="'+$target.data('next')+'"]').datas((data[nextField] ? data[nextField] : '' ))
	 
	
	
	// 여러건의 데이터 처리
	var fields = $target.data('fields')
	fields = fields && typeof fields == 'string' ? fields.replace(/[\[\]]/gi, '').split(','):fields;
	var targets = $target.data('targets');
	targets = targets && typeof targets == 'string' ? targets.replace(/[\[\]]/gi, '').split(','):targets;
	if(fields && targets){
		$.each(targets,function(i,tar){ 
			targetData[targets[i]]=(data[fields[i]])
			//*2016-08-05 수정
			$tr.find('[rd="'+targets[i]+'"]').datas((data[fields[i]] ? data[fields[i]] : '' ))
		}) 
	}
	
	
	//20160615 yjin1214 callback 실행
	if(callback) {
		/*
		 * @JK - 보안 취약점 업데이트 
		 */
		//eval(callback + '(rowid, target, obj);');
		window[callback](rowid, target, obj);
	}
	
	// 팝업이지 않을 경우를 구분
	closeDialogPopup($(obj));
	updateRow($target.parents('tr'))
}

//그리드 팝업 - 팝업 내 그리드 row 선택시 동작
function onSelectGridpopup(rowid, target, callback, obj) {
	var $target =  window.opener.getDomById(target.replace('.', '\\.'))   
		
//	var idx = $target.data('idx') ;
	var prevField = $target.data('targettext');
	var nextField = $target.data('targetcode');
	var data = $(obj).getRowData(rowid);
	

	var $tr = $target.closest('tr');
	var targetData = $target.closest('tr').getRowData($target.closest('tr'))
	targetData[$target.data('prev')] = data[prevField];
	targetData[$target.data('next')] = data[nextField];
	
	$tr.find('[rd="'+$target.data('prev')+'"]').datas((data[prevField] ? data[prevField] : '' ))
	$tr.find('[rd="'+$target.data('next')+'"]').datas((data[nextField] ? data[nextField] : '' ))
	
	
	// 여러건의 데이터 처리
	var fields = $target.data('fields') 
	fields = fields&&typeof fields == 'string' ? fields.replace(/[\[\]]/gi, '').split(','):fields;
	var targets = $target.data('targets');
	targets = targets&& typeof targets == 'string' ? targets.replace(/[\[\]]/gi, '').split(','):targets;
	if(fields && targets){
		$.each(targets,function(i,tar){
			targetData[targets[i]]=(data[fields[i]])
			//*2016-08-05 수정
			$tr.find('[rd="'+targets[i]+'"]').datas((data[fields[i]] ? data[fields[i]] : '' ))
		})
	}
	
	//20160615 yjin1214 callback 실행
	if(callback){ 
//		opener.parent.eval(callback + '(rowid, target, obj);');
		/*
		 * @VIET - 보안 취약점 수정
		 */
		window[callback](rowid, target, obj);
	}
	
	// popup close
	updateRow($target.parents('tr'))
	window.close();
}




/********************************* FORM select START**********************/

/** 
* onSelectdialog()
* ex) 메뉴관리(stm_0205/list) > 메뉴 추가 > 프로그램ID 검색 dialog)
*/
//폼 다이얼로그 - 다이얼로그 내 그리드 row 선택시 동작
function onSelectdialog(rowid, target, callback, obj) {
	var $target = $('#' + target.replace(/\./g, '\\.'));	// dialog 선택 결과가 적용될 부분
	var $prevTarget = $target.parents('.bodyContents').find('[name="' + $target.data('prev') + '"]#'+ $target.data('prev').replace('.', '\\.')).eq(0);		// $target.prev('[name="' + $target.data('prev') + '"]').eq(0);
	var $nextTarget = $target.parents('.bodyContents').find('[name="' + $target.data('next') + '"]#'+ $target.data('next').replace('.', '\\.')).eq(0); 	// $target.next('[name="' + $target.data('next') + '"]').eq(0)
	var data = $(obj).getRowData(rowid);	// 선택 셀에 대한 데이터
	
	var prevField = $target.data('targettext');
	var nextField = $target.data('targetcode');
	// 선택 결과 적용
//	var $td = $target.closest('td');
	$prevTarget.val(data[prevField]).trigger('change');
	$nextTarget.val(data[nextField]).trigger('change');
	
	
	// 여러건의 데이터 처리
	var fields = $target.data('fields')
	fields =fields&& typeof fields == 'string' ? fields.replace(/[\[\]]/gi, '').split(','):fields;
	var targets = $target.data('targets');
	targets = targets&&typeof targets == 'string' ? targets.replace(/[\[\]]/gi, '').split(','):targets;
	if(fields && targets){
		var $parents =  $target.closest('table');
		if($parents.length == 0 ){
			$parents =$target.closest('form');
		}
		$.each(targets,function(i,tar){
//			 $target.siblings('#' + tar.replace('.', '\\.')).val(data[fields[i]])
			
			  $parents.find('#' + tar.replace('.', '\\.')).val(data[fields[i]])
		})
	}
	
	//20160615 yjin1214 callback 실행
	if(callback) {
		/*
		 * @JK - 보안 취약점 수정
		 * ?? callback 실행이 아님? 
		 */
		//eval(callback);	
		window[callback]();
	}
	// 팝업 상자 제거
//	updateRow($target.parents('tr'))
	destroyDialogPopup($(obj));
}

//폼 팝업 - 팝업 내 그리드 row 선택시 동작
function onSelectpopup(rowid, target, callback, obj) {
	var $target =  window.opener.getDomById(target.replace('.', '\\.'))
	var $prevTarget = $target.parents('.bodyContents').find('[name="' + $target.data('prev') + '"]#'+ $target.data('prev').replace('.', '\\.')).eq(0);		// $target.prev('[name="' + $target.data('prev') + '"]').eq(0);
	var $nextTarget = $target.parents('.bodyContents').find('[name="' + $target.data('next') + '"]#'+ $target.data('next').replace('.', '\\.')).eq(0); 	// $target.next('[name="' + $target.data('next') + '"]').eq(0)

	
	var prevField = $target.data('targettext');
	var nextField = $target.data('targetcode');
	var $cls = $target.data('cls');
//	var data = $target.getRowData($target.parents('tr'));
	var data = $(obj).getRowData(rowid);

	// 동일한 화면에 여러개의 팝업창을 사용할 경우 id,name 사용에 제한적이어서 인사,부서 팝업의 경우 분리시킴..
	// if ($cls == "member") { // 인사
	// $prevTarget.val(data["EMP_NM"]);
	// $nextTarget.val(data["EMP_NO"]);
	// } else if ($cls == "depart") { // 부서
	// $prevTarget.val(data["DEPT_NM"]);
	// $nextTarget.val(data["DEPT_CD"]);
	// } else {
	// $prevTarget.val(data[$target.data('prev')]);
	// $nextTarget.val(data[$target.data('next')]);
	// }
	var $td = $target.closest('td');
	$prevTarget.val(data[prevField]);
	$nextTarget.val(data[nextField]);
	
	
	//여러건의 데이터 처리
	var fields = $target.data('fields')
	fields =fields&& typeof fields == 'string' ? fields.replace(/[\[\]]/gi, '').split(','):fields;
	var targets = $target.data('targets');
	targets = targets&&typeof targets == 'string' ? targets.replace(/[\[\]]/gi, '').split(','):targets;
	if(fields && targets){
		var $parents =  $target.closest('table');
		if($parents.length == 0 ){
			$parents =$target.closest('form');
		}
		$.each(targets,function(i,tar){
//			 $target.siblings('#' + tar.replace('.', '\\.')).val(data[fields[i]])
//			  $target.closest('form').find('#' + tar.replace('.', '\\.')).val(data[fields[i]])
			  $parents.find('#' + tar.replace('.', '\\.')).val(data[fields[i]])
		})
	}
	
	//20160615 yjin1214 callback 실행
	if(callback){ 
		/*
		 * @VIET - 보안 취약점 수정
		 */
//		opener.parent.eval(callback);
		window[callback]();
	}
	
	// 팝업이지 않을 경우를 구분
//	updateRow($target.parents('tr'))
//	window.close();
}






/*****************************************END FORM SELECT***********************************************************/



//팝업을 열기전에 데이터를 검색해 한개의 데이터만 존재할 경우 자동세팅
var ChoiceInputFormOnkeydown = function(e, target, type) {
	if (e.keyCode == 13) {
		var $target = $('#' + target.replace('.','\\.'));
		var name = $target.data('prev');
		var code = $target.data('next'); 
		var cls = $target.data('cls');
		var id = $target.data('id');
		var funcname = $target.data('funcname');
		var targetcode = $target.data('targetcode');
		var targettext = $target.data('targettext');
		var callback = $target.data('callback');
		var param='';
		var paramStr = getDialogPopupParam($target.data('param'));
		if(paramStr) param = '?'+paramStr
		
		var fields = $target.data('fields')
		fields = fields&&typeof fields == 'string' ? fields.replace(/[\[\]]/gi, '').split(','):fields;
		var targets = $target.data('targets');
		targets =targets&& typeof targets == 'string' ? targets.replace(/[\[\]]/gi, '').split(','):targets;
		var $tr;
		
		var _url = "";
		var postData = {};
		
		var $prevTarget ;
		var $nextTarget ;
//		
		var $tr = $target.closest('tr');	
		
				
		var rowdata;
		// 수정 필요 
		if(type == "grid") {
			
			var $tr = $target.closest('tr');	
			
			$prevTarget = 	$tr.find('[rd="'+$target.data('prev')+'"]').find('input');
			$nextTarget = 	$tr.find('[rd="'+$target.data('next')+'"]').find('input');
			$prevTarget = $target.prevAll('[name="'+name+'"]');
			
			rowdata = $target.getRowData($target.parents('tr'))	;
			postData[targettext] = $prevTarget.val();
		} else {			
			$prevTarget = $target.prevAll('[name="'+name+'"]');
			$nextTarget = $target.prevAll('[name="'+code+'"]');
//			$nextTarget = $('#'+code.replace('[','\\[').replace(']','\\]').replace('.','\\.'));
//			
			
			postData[targettext] = $prevTarget.val();
		}
		
		
//		if(cls == "member" || cls =="eamEmpMulti"){
//			postData['HOLD_CLS'] = '101-010';
//			_url = CTX+'/common/popup/getDataEmpDeptPopup.ajax';
//		}else if(cls=="depart"){
//			_url = CTX+'/common/popup/getDataDepartOnce.ajax';
//		}else if(cls=="ntn"){
//			_url = CTX+'/common/popup/getDataNtnPopup.ajax';
//		}else if(cls=="pgm"){
//			_url = CTX+'/common/popup/getDataPgmPopup.ajax';
//		}
//		getDataUrl
		
		$.ajax({ 
			url: CTX+'/common/popup/getDataUrl', 
			data:{'cls':cls},
			cache:false,  
			async: false,
			success: function(data, textStatus, jqXHR) { 
				_url = CTX+data+'.ajax';
			},complete:function(){
				
			} 
		});
		
		
		if(_url){
			$.ajax({ 
				url: _url+param, 
				data:postData,
				cache:false, 
				sync:false,
				success: function(data, textStatus, jqXHR) {
					var isPopupOpen = $('.ui-dialog').size(); // 팝업 열림 여부
					if(data.length == 1 ){
						if( funcname!="onSelectGrid" && funcname!="customGridSelect" 
						 && funcname!="onSelect" && funcname!="customSelect") {
							if(isPopupOpen == 0) {
								/*
								 * @JK - 보안 취약점 수정 
								 */
								//eval(funcname+"EnterOne(data,id,target)");
								window[funcname+'EnterOne'](data,id,target);
							}
						} else {
							$prevTarget.val(data[0][targettext]);
							$nextTarget.val(data[0][targetcode]);
							
							if(type == "grid"){
								// 그리드일 경우 update 상태 반영
								if(fields && targets){
									$.each(targets,function(i,tar){
										rowdata[targets[i]] = data[0][fields[i]];
										$tr.find('[rd="'+targets[i]+'"]').datas(data[0][fields[i]])
									})
								}
								updateRow($prevTarget);
							}else{
								if(fields && targets){
									$.each(targets,function(i,tar){
										 $('#' + tar.replace('.', '\\.')).val(data[0][fields[i]])
									})
								}
							}
							if(callback) {
								/*
								 * @JK - 보안 취약점 수정
								 *  ?? callback 실행 아님? 
								 */
								//eval(callback);
								window[callback]();
							}
							
						}
					} else {
						// 분석 안됨 
//						if(isPopupOpen == 0) $('#' + id).trigger('click');
						
						$target.trigger('click');
					}
				}
			});
		} else {
			// 분석 안됨 
//			if(isPopupOpen == 0) $target.trigger('click');
			
			$target.trigger('click');
		}
	}
};

//ChoiceInputForm 의 text를 지우면 code도 함께 지워준다.
var ChoiceInputFormOnkeyup = function(target,type){
	var $target = $('#' + target.replace('.','\\.'));
	var name = $target.data('prev');
	var code = $target.data('next');
//	var $prevTarget = $('#'+name.replace('[','\\[').replace(']','\\]').replace('.','\\.'));
	var $tr = $target.closest('tr');
	
	var $prevTarget ;
	var $nextTarget ; 
	
	
	
	
	var fields = $target.data('fields')
	fields =fields&& typeof fields == 'string' ? fields.replace(/[\[\]]/gi, '').split(','):fields;
	var targets = $target.data('targets');
	targets = targets&&typeof targets == 'string' ? targets.replace(/[\[\]]/gi, '').split(','):targets;
	
	

	
	
	var rowdata = $target.getRowData($target.parents('tr'))	;
	
	
	if(type == "grid"){
		var $tr = $target.closest('tr');	
		
		$prevTarget = 	$tr.find('[rd="'+$target.data('prev')+'"]').find('input');
		$nextTarget = 	$tr.find('[rd="'+$target.data('next')+'"]').find('input');
		
		
		$nextTarget = $target.parents('tr').find('input[name="'+$target.data('next')+'"]');	
	}else{
//		$prevTarget = $('#'+name.replace('[','\\[').replace(']','\\]').replace('.','\\.'));
//		$nextTarget = $('#'+code.replace('[','\\[').replace(']','\\]').replace('.','\\.'));
		$prevTarget = $target.prevAll('[name="'+name+'"]');
		$nextTarget = $target.prevAll('[name="'+code+'"]');
//		
	}
	if($prevTarget.val() == ""){ 
		$nextTarget.val('');
	
		if(type == "grid"){
			// 그리드일 경우 update 상태 반영
			if(fields && targets){
				$.each(targets,function(i,tar){
//					delete rowdata[targets[i]];
					rowdata[targets[i]]=""
					$tr.find('[rd="'+targets[i]+'"]').datas("");
				})
			}
			updateRow($target);
		}else{
			if(fields && targets){
				$.each(targets,function(i,tar){
					 $('#' + tar.replace('.', '\\.')).val('')
				})
			}
		}
	
	}
	
};

//다이얼로그 & 팝업 파라미터 세팅
//parameter 에 , : 사용금지 
function getDialogPopupParam(param) {
	//var param = params.replace('{', '').replace('}', '');
	var paramData ;
	if(param){
		paramData = param.replace(/^\{|\}$|[\s*]+/g, '');	// 파라미터 String
	}
	var ParamObj = {};										// 파라미터 Object
	var paramStr = '';										// 파라미터 값
	
	if(paramData) {
		paramData = paramData.split(',');
		// 파라미터 데이터 Object로 변환
		$.each(paramData, function(i, val){
			var tmp = paramData[i].split(":");
			ParamObj[tmp[0]] = tmp[1] ;						// Object type : ParamObj[key] = value
		});
		
		// Object 파라미터 -> 파리미터 값으로 변환(ex: EMP_NO=1234&EMP_NM=관리자)
		var sep = '';		// & 구분자
		$.each(ParamObj,function(key, vals){
			paramStr += sep + key +'='+vals
			sep = "&";
		});
	}
	return paramStr;
}
//다이얼로그 & 팝업 파라미터 생성
// {} -> "{str:sss}"
function getParamStr(param) {
	//var param = params.replace('{', '').replace('}', '');
	var str="" 
	var list =[];
	if(typeof param === "object"){
		$.map(param,function(val, key){
			list.push(key+':'+val);
						
		})
		str= '{'+list.join()+'}'
	}else if(jQuery.isArray( param )){
		str= '{'+param.join()+'}'
	}
	return str;
}
//다이얼로그 & 팝업 파라미터 생성
//{} -> "{str:sss}"
function getParamObj(str) {
	//var param = params.replace('{', '').replace('}', '');
//	var obj = JSON.parse(str);
	var obj = {}
	str = str.replace('{','').replace('}','')
	
	var list = str.split(',');
	$.each(list,function(i,val){
		var values = val.split(':')
		obj[values[0]] = values[1];
		
	})
	
	
	return obj;
}

/**
 * Init search form for search box
 * Author: ndq
 * Created date: 2018-08-24
 */
function drawSearchTable(formId, tableObj) {
	$pre = $("#" + formId).find("div.group_content");
    var table = $('<table id="search_table" class="search_tbl"></table>').appendTo($pre);
    
	table.append('<caption>검색할 조건을 입력하는 영역입니다.</caption>');
    $colgrp = $('<colgroup></colgroup>').appendTo(table);
    
    var colprf = tableObj.tblOpts.colprf ? tableObj.tblOpts.colprf + '.' : '';
    var colnum = tableObj.tblOpts.colnum ? tableObj.tblOpts.colnum : 6;
    var lblwidth = tableObj.tblOpts.lblwidth ? tableObj.tblOpts.lblwidth : '100px';
    var ctrlwidth = tableObj.tblOpts.ctrlwidth ? tableObj.tblOpts.ctrlwidth : 'auto';
    for (var i = 0 ; i < colnum; i ++) {
    	if (i%2 == 0) {
    		$colgrp.append('<col style="width:' + lblwidth + ';">');
    	} else {
    		$colgrp.append('<col style="width:' + ctrlwidth + ';">');
    	}
    }
    
    $tbbody = $('<tbody></tbody>').appendTo(table);
    var cnttd = 0;
    for (var i = 0 ; i < tableObj.colModels.length; i ++) {
    	if (cnttd == 0) {
    		$tr = $('<tr></tr>').appendTo($tbbody);
    		cnttd = colnum;
    	}
    	
    	var colmodel = tableObj.colModels[i];
    	var colid = colprf + colmodel.id;
    
    	$tr.append('<th><div class="inp_inline"><label for="' + colid + '">' + colmodel.name + '</label></div></th>');
    		    	
    	var colspan = colmodel.colspan ? colmodel.colspan : 1;	    	
    	$td = $('<td><div class="inp_inline"></div></td>').appendTo($tr);
    	$td = $td.find('div');
    	$td.attr('colspan', colspan);
    	var modelCls = colmodel.css ? colmodel.css : '';
    	
    	if (colmodel.type == 'text') {
    		$td.append('<input type="text" id="'+ colid + '" name="' + colid + '" class="' + modelCls + '">');
    	} 
    	else if (colmodel.type == 'datepicker') {
    		$td.append('<span class="inp_cal"><input type="text" id="' + colid + '" name="' + colid + '" class="datepicker '+ modelCls +'" pattern="date" value="" /></span>');
    	} 
    	else if (colmodel.type == 'datefromto') {	    		
    		$td.append('<span class="inp_cal"><input type="text" id="' + colid + '_FROM" name="' + colid + '_FROM" class="datepicker setFromTo ' + modelCls + '"' 
    				+ ' data-fromnm="' + colid + '_FROM" data-tonm="' + colid + '_TO" '
    				+ ' pattern="date" value="" /></span>');
    		$td.html($td.html() + ' ~ ');
    		$td.append('<span class="inp_cal"><input type="text" id="' + colid + '_TO" name="' + colid + '_TO" class="datepicker ' + modelCls + '"' 
    				+ ' pattern="date" value="" /></span>');
    	} 
    	else if (colmodel.type == 'select'
    			|| colmodel.type == 'choiceform'
    			|| colmodel.type == 'radio'
    			|| colmodel.type == 'checkbox') { 
    		
    		var url = CTX + '/common/common/' + colmodel.type;
    		
    		var selection = '';
    		if (colmodel.type == 'select') {
    			//url = CTX + '/common/common/combo';
    			selection = 'select';
    		} 
    		else if (colmodel.type == 'choiceform') {
    			selection = 'div.choiceInputContent';
    		}
    		else if (colmodel.type == 'radio') {
    			selection = 'div';
    		}
    		else if (colmodel.type == 'checkbox') {
    			selection = 'div';
    		}
    		
    		if (colmodel.type != 'choiceform') {
    			colmodel.typeOpts['id'] = colid;	
    		}
    		
    		$.ajax({
		       url: url,
		       async: false,
		       type: 'GET',
		       data: colmodel.typeOpts,
		       success: function(res, data) {			    	    
		    	   $td.append($(res).find(selection));
		       }
		     });
    	}
    	
    	cnttd = cnttd - colspan - 1;
    }
}


(function() {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    Date.prototype.getMonthName = function() {
        return months[ this.getMonth() ];
    };
    Date.prototype.getDayName = function() {
        return days[ this.getDay() ];
    };
})();





