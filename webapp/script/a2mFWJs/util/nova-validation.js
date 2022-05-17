/**
 * anhpv 2020/03/04
 */
/*
 * 
 */
var lang = WT_LOCALE;

(function( $ ){
   $.fn.inputWarning = function(msg) {
      if($(this).is('input') || $(this).is('select') || $(this).is('textarea')){
    	  
    	  $(this).closest('div.input-group').removeClass('available');
    	  $(this).closest('div.input-group').addClass('overlap');
    	  if(msg){
    		  $parent =  $(this).closest('div.input-group').parent();
    		  if($parent.find('span.input-info-txt').length == 0){
    			  $parent.append('<span class="input-info-txt"></span>');
    		  }
//    		  if($parent.children('span.ac_click').length>0){
//    			  $parent.children('.input-group.overlap').css('margin-top', 0);
//    		  }
//    		  $parent.find('span.input-info-txt').html(msg);
    		  $parent.find('span.input-info-txt').html('<span class="input-info-txt">'+msg+'</span>');
    	 }
      }else{
    	  return false;
      }
	}; 
   $.fn.available = function(msg) {
	   msg = msg? msg: 'Available';
	      if($(this).is('input') || $(this).is('select') || $(this).is('textarea')){
	    	  $(this).closest('div.input-group').removeClass('overlap');
	    	  $(this).closest('div.input-group').addClass('available');
	    	  $parent =  $(this).closest('div.input-group').parent();

	    	  if( $parent.find('span.input-info-txt').length == 0){
	    		  $parent.append('<span class="input-info-txt"></span>');
	     	 }
	    	  $parent.find('span.input-info-txt').empty();
	    	  $parent.find('span.input-info-txt').html('<span class="input-info-txt">'+msg+'</span>');
	      }else{
	    	  return false;
	      }
	   };
	   $.fn.resetWarning = function(msg) {
		      if($(this).is('input') || $(this).is('select') || $(this).is('textarea')){
		    	  $(this).closest('div.input-group').removeClass('overlap').removeClass('available');

		    	  $parent =  $(this).closest('div.input-group').parent();

		    	  if( $parent.find('span.input-info-txt').length == 0){
		    		  $parent.append('<span class="input-info-txt"></span>');
		     	 }
		    	  $parent.find('span.input-info-txt').remove();
		      }else{
		    	  return false;
		      }
			}; 
})( jQuery );


$(document).on('submit','form',function(){
	
	var $form = $(this);

	if($form.data('submit')){
		return true;
	}

	doSubmitFormValidation($form);

	return false;

})



function doSubmitFormValidation($form){
	
	
	var $form = $($form);
	var func = $form.data('func');
	var callback = $form.data('callback');
	
	 if ($form.data('msg') == "DELETE") {
		 if(func){ 
			 	/*
			 	 * @JK - 보안 취약점 수정
			 	 */
				//eval(func+'($form,callback)');
			 	window[func]($form, callback);
			}
			return true
	 } else {
		 if(validateFormNew($form)){
				if(func){
					/*
				 	 * @JK - 보안 취약점 수정
				 	 */
					//eval(func+'($form,callback)');
					window[func]($form, callback);
					return true;
				}
			}
	 }
		
	return false;

}

function validateFormNew($form){
	var check = true;
	$form.find('input, select, textarea').each(function(i, obj){
		if($(obj).attr('nova-validation')){
			if(!checkItem(obj)){
				check = false;
			}
		}
	});
	return check;
}

function checkItem(obj){
	var check = true;
	var strRequests = $(obj).attr('nova-validation');
	//console.log('strRequests = ' + strRequests + 'obj =' + obj);
	var requests = strRequests.split(',');
	if(requests.length > 0){
		requests.forEach(function(obj2, i){
				var ruleName = obj2.trim();
				if(rules[ruleName]){
					rule = rules[ruleName];
					if(!checkRule($(obj), rule)){
						check = false;
						
						if(ruleName == 'required'){
							// only required field case
							var msg = rule.msg[lang];
							var name = '';
							if($(obj).closest('.registration-write').hasClass('twice-input')){
								//have double input
								var id = $(obj).attr('id');
								name = $(obj).closest('.registration-write').find('label[for="'+id+'"]').text();
							} else {
								if($(obj).closest('.registration-write').parent().find('span[class="red"]').parent()[0]){
									// found span label
									name = $(obj).closest('.registration-write').parent().find('span[class="red"]').parent()[0].firstChild.data;									
								}else{
									var id = $(obj).attr('id');
									if( $(obj).closest('.registration-write').find('label[for="'+id+'"]') && $(obj).closest('.registration-write').find('label[for="'+id+'"]').length > 0 ){
										//found hidden placeholder
										name = $(obj).closest('.registration-write').find('label[for="'+id+'"]').html();
									}
								}
							}
							msg = msg.replace('###', name?'"'+name+'"': 'This')
							$(obj).inputWarning(msg);							
						}else{
							$(obj).inputWarning(rule.msg[lang]);							
						}

					};
				}
		})
	}
	if(check){
		$(obj).resetWarning();
	}
	return check;
}

function checkRule($obj, rule){
	var value = $obj.val();
	if(!rule.func(value)){
		return false;
	}else{
		return true;
	}
}


var rules = {
		'required': {
			func: function(value){
				if(value && value.trim()){
					return true;
				}
				return false;
			},
			msg: {
				'vi': 'Thông tin này bắt buộc',
				'en': '### is required item.',
				'kr': '이 필드는 필수항목입니다.'
			}
		},
		"email":{
			func: function(value){
				if(!value || !value.trim()){
					return true;
				}
				if(regex.email.regex.test(value)){
					return true;
				}
				return false;
			},
			msg: {
				'vi': 'Email không hợp lệ!',
				'en': 'This email is incorrect!',
				'kr': '이메일 정보가 올바르지 않습니다.'
			}
		},
		"url":{
			func: function(value){
				if(!value || !value.trim()){
					return true;
				}
				if(regex.url.regex.test(value)){
					return true;
				}
				return false;
			},
			msg: {
				'vi': 'URL không hợp lệ!',
				'en': 'This url is incorrect!',
				'kr': 'URL 정보가 올바르지 않습니다.'
			}
		},
		"telephone":{
			func: function(value){
				if(!value || !value.trim()){
					return true;
				}
				if(regex.telephone.regex.test(value)){
					return true
				}
				return false;
			},
			msg: {
				'vi': 'Số điện thoại không hợp lệ!',
				'en': 'This phone number is incorrect!',
				'kr': '전화번호 정보가 올바르지 않습니다.'
			}
		},
		"cellphone" : {
			func: function(value) {
				if(!value || !value.trim()) {
					return true;
				}
				if(regex.cellphone.regex.test(value)) {
					return true;
				}
				return false;
			},
			msg: {
				'en' : 'This cellphone number is incorrect!',
				'kr' : '휴대전화 정보가 올바르지 않습니다.'
			}
		},
		"onlyEng":{
			func: function(value){
				if(!value || !value.trim()){
					return true;
				}
	
				if(regex.onlyEng.regex.test(value)){
					return true;
				}
				return false;
			},
			msg: {
				'vi': 'Chỉ kí tự tiếng Hàn!',
				'en': 'This field is English characters only!',
				'kr': '이 필드는 영어만 입력 가능합니다.'
			}
		},
		"onlyKor":{
			func: function(value){
				if(!value || !value.trim()){
					return true;
				}
	
				if(regex.onlyKor.regex.test(value)){
					return true;
				}
				return false;
			},
			msg: {
				'vi': 'Chỉ kí tự tiếng Hàn!',
				'en': 'This field is Korean characters only!',
				'kr': '이 필드는 한글만 입력 가능합니다.'
			}
		},
		"onlyKorEng":{
			func: function(value){
				if(!value || !value.trim()){
					return true;
				}
				if(regex.onlyKorEng.regex.test(value)){
					return true;
				}
				return false;
			},
			msg: {
				'vi': 'Chỉ kí tự tiếng Hàn và tiếng Anh!',
				'en': 'This field is Korean and English characters only!',
				'kr': '이 필드는 한글과 영어만 입력 가능합니다.',
			}
		},
		"number":{
			func: function(value){
				if(!value || !value.trim()){
					return true;
				}
				if($.isNumeric(value)){
					return true;
				}
				return false;
			},
			msg: {
				'vi': 'Thông tin này là con số!',
				'en': 'Only numbers are entered.',
				'kr': '이 필드는 숫자만 입력 가능합니다.',
			}
		},
		"password":{
			func: function(value){
				if(!value || !value.trim()){
					return true;
				}
				if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value)){
					return true;
				}
				return false;
			},
			msg: {
				'vi': '8 đến 16 kí tự, ít nhất 1 kí tự số, 1 kí tự chữ!',
				'en': '8~16 characters, at least 1 letter and 1 number!',
				'kr': '8~16자, 1자, 숫자 1자.',
			}
		},
};

var regex = {
	"maxSize" : {
		"regex" : "none",
		"alertText" : "* 최대 ",
		"alertText2" : " 자의 입력이 가능합니다."
	},
	"length2" : {
		"regex" : "none",
		"alertText" : "* ",
		"alertText2" : "자 이상 입력이 가능합니다."
	},
	"maxCheckbox" : {
		"regex" : "none",
		"alertText" : "* Checks allowed Exceeded"
	},
	"minCheckbox" : {
		"regex" : "none",
		"alertText" : "* 선택하세요 ",
		"alertText2" : " 옵션"
	},
	"confirm" : {
		"regex" : "none",
		"alertText" : "* 값이 일치하지 않습니다."
	},
	"telephone" : {
		"regex" : /^0[0-9]{1,2}\-\[0-9]{3,4}\-\[0-9]{3,4}$/,
		"alertText" : "* 전화번호 형식이 아닙니다.( - 포함)"
	},
	"cellphone" : {
		"regex" : /^0\d{1,2}\-\d{3,4}\-\d{3,4}$/,
		"alertText" : "* 휴대전화 형식이 아닙니다."
	},
	"url" : {
		"regex" : /^[a-zA-Z0-9\&\=\?\/\.\:\-\_\ \']+$/,
		"alertText" : "* URL형식이 아닙니다."
	},
	"email" : {
		"regex" : /^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]+$/,
		"alertText" : "* 이메일 형식이 아닙니다"
	},
	"date" : {
		"regex" : /^[0-9]{4}\-\[0-9]{1,2}\-\[0-9]{1,2}$/,
		"alertText" : "* 날짜형식이 아닙니다. 'YYYY-MM-DD'"
	},
	"year" : {
		"regex" : /^[0-9]{4}$/,
		"alertText" : "* 날짜형식이 아닙니다. 'YYYY'"
	},
	"onlyNumber" : {
		"regex" : /^[0-9]+$/,
		"alertText" : "* 숫자만 가능합니다."
	},
	"noSpecialCaracters" : {
		"regex" : /^[0-9a-zA-Z]+$/,
		"alertText" : "* 특수문자는 허용되지 않습니다"
	},
	"onlyLetter" : {
		"regex" : /^[a-zA-Z\ \']+$/,
		"alertText" : "* 영문자만 가능합니다"
	},
	"onlyLetterUnd" : {
		"regex" : /^[_A-Z']+$/,
		"alertText" : "* 영어 대문자와 '_'만 가능합니다"
	},
	"onlyEngNumber" : {
		"regex" : /^[a-zA-Z0-9\ \']+$/,
		"alertText" : "* 영어와 숫자만 가능합니다"
	},
	"UpperEngNumber" : {
		"regex" : /^[_A-Z0-9]+$/,
		"alertText" : "* 영어 대문자와 숫자와 '_'만  가능합니다"
	},
	"LowerEngNumber" : {
		"regex" : /^[_a-z0-9]+$/,
		"alertText" : "* 영어 소문자와 숫자와 '_'만  가능합니다"
	},
//	"onlyKor" : {
//		"regex" : /^[ 가-힣ㄱ-ㅎ]+$/,
//		"alertText" : "* 한글만 입력가능합니다"
//	},
	"noKor" : {
		"regex" : /^[ _a-zA-Z0-9]+$/,
		"alertText" : "* 영어와 숫자와 '-'만 가능합니다."
	},
//	"onlyKorEng" : {
//		"regex" : /^[ 가-힣a-zA-Zㄱ-ㅎ]+$/,
//		"alertText" : "* 한글과 영문만 입력가능합니다"
//	},
	"onlyEng" : {
		"regex" : /^[ _a-zA-Z\-()]+$/,
		"alertText" : "* 한글과 영문만 입력가능합니다"
	},
//	"onlyKorEngNumber" : {
//		"regex" : /^[ 가-힣a-zA-Z0-9ㄱ-ㅎ]+$/,
//		"alertText" : "* 한글,영문,숫자만 입력가능합니다"
//	},
	"reqSubject" : {
		"regex" : /^[ ^']+$/,
		"alertText" : "* 제목을 입력하세요"
	},
	"reqContents" : {
		"regex" : /^[ ^']+$/,
		"alertText" : "* 내용을 입력하세요"
	},
	"validate2fields" : {
		"nname" : "validate2fields",
		"alertText" : "* 필수입력란 입니다"
	}
}