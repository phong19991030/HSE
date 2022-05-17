
function addModule(body){
    var offset = 10;
    var $subService = $('<div id="subServiceArea"></div>');
    $subService.css({
        width: '60px',
        height: '200px',
        margin: '0',
        color: '#FFF',
//      cursor: 'pointer',
//      background: 'orange',
        position: 'absolute',
        'z-index': 999999
    });
    
    $subService.css({
        top: ($(window).height() - $subService.outerHeight()) + 'px',
        left: ($(window).width() - $subService.outerWidth()) + 'px'
    });
    
    $('body').append($subService);
    
    if(true){
        var $chat = $('<div id="a2m-chatbox" class=" btn ac_click tab_service wschat_icon"><span class="notification">#noti</span></div>');
//      $chat.html('<label>WSC</label>');
        $chat.css({
            width: '50px',
            height: '50px',
//          'padding-left': '30px',
            margin: '0',
            padding: '0',
            color: '#FFF',
            cursor: 'pointer',
//          background: '#2a2d33',
            position: 'relative',
//          'z-index': 999999,
            'border-radius': '50%',
            border: 'none'

//          'border-top-right-radius': '5px'
        });
       $chat.css({
            top:  ($subService.height() - $chat.outerHeight()- offset) + 'px',
            left: ($subService.width() - $chat.outerWidth()- offset) + 'px'
        });
//       $chat.attr('data-func','toggleDialog');
       
        $('#subServiceArea').append($chat);
        $('#a2m-chatbox').click(function(){
     	   toggleDialog();
        })
    }
    
    if(true){
        var $mail = $('<div id="a2m-mail" class="ac_click btn tab_service mail a2mSendMailBtn"><span style="position: absolute; width: 25px; height: 25px; background: red; color: #FFF; border-radius: 50%; text-align: center;" top: -4px; left: -2px;><b id="a2mMailCount"></b></span></div>');
        $mail.css({
            width: '50px',
            height: '50px',
//          'padding-left': '30px',
            margin: '0',
            padding: '0',
            color: '#FFF',
            cursor: 'pointer',
//          background: '#2a2d33',
            position: 'relative',
//          'z-index': 999999,
            'border-radius': '50%',
                border: 'none'

//          'border-top-right-radius': '5px'
        });
       $mail.css({
            top:  ($subService.height() - $chat.outerHeight()*3 - offset*2) + 'px',
            left: ($subService.width() - $chat.outerWidth()- offset) + 'px'
        });
       $mail.click(function(){
//          openDialog(); 
        });
        $('#subServiceArea').append($mail);
    }
}

function toggleDialog(){
    console.log('toggle');
    if($('#dialog_wschat').css('display') == 'none'){
    	$('#dialog_wschat').css('display','block');
        if(connected){
            if($('#roomslist ul').length <= 0){
                wschat.send.ROOM_LIST();
            }
        }else{
            wschat.send.LOGIN_IN();
        }
    }else{
        $('#dialog_wschat').hide();
    }
}


function openWSchatDialog(){
   
    var url = CTX+'/wsc/form.dialog';

    var $target = generateDialogDom();

    $.ajax({
        url :url,// CTX+ url, )
        data : $.extend({
            'type' : 'dialog'
            ,'cls' : ''
        }, {}),
        cache : false,
        success : function(data, textStatus, jqXHR) {
            $target.html(data);
        }
    });

    $target.dialog({
        resizable : false,
        width : parseInt(window.innerWidth) * 0.2,
        height : parseInt(window.innerHeight),
        modal: false,
        open : function(){
//            console.log('created wschat dialog');
            var dialog = $target.closest('div.ui-dialog'); 
            $(dialog).attr('id','dialog_wschat');
            $(dialog).css({
            "box-shadow":"#999 5px 5px 5px",
            "display": "none",
//            "top": parseInt(window.innerHeight) * 0.5,
            "top": 0,
            "left": parseInt(window.innerWidth) * 0.8 - 80
            });
//            console.log( $('div.ui-dialog-titlebar'));
//            $('div.ui-dialog-titlebar').attr('style', 'background: #202845!IMPORTANT');
            $(dialog).find('div.ui-dialog-titlebar').attr('style', 'background: #353a56!IMPORTANT');
            $(dialog).find('div.ui-dialog-titlebar .ui-dialog-titlebar-close').remove(); 
            wschat.send.ROOM_LIST();
//            $("#a2m-chatbox").removeClass('ac_click');
            
        },
        close : function() {
            destroyDialogPopup($target);
//          $("#a2m-chatbox").show();
//            $("#a2m-chatbox").addClass('ac_click');
        }
    });
}


function initMenu(){
    
    $('div#sidemenu').find('.snb_current.foldingMenu').siblings().addClass('fold')
    //if('${navimenu.menuType}' == 'menu') {
        $('#sidemenu li:not(.grant_read)').addClass('hide');
        $('.grant_read').parents('li').removeClass('hide');
        $('.grant_read').removeClass('hide');
    //}
}


var initResultForm = function(){
    /* layout 높이 정의수정 - 김예미 */
    var height = $(window).height() - $("#header").outerHeight();
    var snbHeight = height;
    var contHeight = height;
    /* 반응형일경우 쉬운 제어를 위해 추가 */
    $(window).on("resize", function(){
        height = $(window).height() - $("#header").outerHeight();
        snbHeight = height;
        contHeight = height;
        layout();
    });
    
}

function getCredential() {
    wschat.flag = 0;
    $.ajax({
        url:  CTX + '/common/auth/getCredential.ajax',
        cache: false,
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
            if (data != undefined) {
//                debugger;
                wschat.USERNAME = data.USERNAME;
                wschat.CREDENTIAL = data.CREDENTIAL;
//                var jsUrlWs = 'ws://localhost:8080/wschat/echo-ws';  
                wschat.init(jsUrlWs);
               addModule($('body'));
            } else {
                
            }
        }, complete: function () {
            return false;
        }, error: function () {
            return false;
        }
    });
}

