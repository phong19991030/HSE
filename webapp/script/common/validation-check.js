/**
 * @parkjk
 * 
 * @vcWarning
 * - 경고 표시
 * - 직접적으로 marking 할 경우 사용 하면됨 (ex. start time, end time 의 time error 같은 경우)
 * @use : $('selector').vcWarning('message');
 * @param : string
 * @return : this 
 * 
 * @vcSuccess
 * - 가능 표시 
 * - 직접적으로 marking 할 경우 사용 하면됨 (ex. start time, end time 의 time error 같은 경우)
 * @use : $('selector').vcSuccess('message');
 * @param : string
 * @return : this
 * 
 * @vcCheck
 * - validation 체크
 * - 대상 element에 validation-check 속성이 있어야함
 * @use : $('selector').vcCheck();
 * @param : X
 * @return : boolean (selector로 잡은 모든 타겟중 1개라도 체크 실패시 false, 모든 타겟이 체크 성공시 true)
 *  
 * @변경_및_추가사항
 * - tag(HTML element)에 nova-validation(attribute) => validation-check(attribute)로 수정해야함 
 * 
 * - 속성 값 적용방법은 기존 속성 값 적용방법과 동일 (validation-check="required,url...", ','구분자로 사용)
 * 
 * - 기존 checkItem() 함수를 jQuery 프로토타입 함수로 추가 (selector로 잡은 모든 타겟이 체크 됨)
 *   @Ex validationArr.filter((e) => !checkItem(e)); (X, 기존사용법임)
 *   @Ex $('[validation-check]').vcCheck(); : 현재 화면내 validation-check 속성을 가진 모든 tag 검증
 *   @Ex $('#layerPopup [validation-check]').vcCheck(); : 팝업 화면내 validation-check 속성을 가진 모든 tag 검증
 *   @Ex $('#target1').veCheck() : id="target1"인 단일 태그 검증
 * 
 * - 기존의 마킹리셋의 방식 변경 => 해당 타겟에 input시 resetCallback	바인딩, .val() 사용시 event로 잡아낼 수 없어, 오리지널 .val() 함수 수정
 * 
 * - css 파일 사용 X => validation-check에 사용되는 css요소를 초기화시 자동으로 추가
 * 
 * - 각 마킹 메시지에 icon 추가 (font-family:'xeicon')
 * 
 * - 기존 라이브러리의 메시지 디스플레이 방식 변경 
 * 	@기존 : 메시지 디스플레이시 화면 틀어짐 
 * 		@issue 메시지 자체가 영역을 잡고 있음
 *  @1차 : position:absoltue, body의 하위 요소로 append(offset값으로 위치조정, 마킹 해제 시 다른 마킹 top 위치 재조정)으로 화면 틀어짐 완벽 수정  
 *  	@issue 팝업내 요소 일경우, z-index, position:fixed로 표시는 가능 하지만, 팝업내 스크롤시 문제, 팝업 종료 시 자체적으로 리셋 함수 실행 시켜야함
 *  @2차 : @1차 의 단점 보완 body에 append가 아닌 validation-check-wrap의 하위 요소로 append 로 @1차 의 이슈 잡아냄 
 *  	@issue 해당 타겟의 부모 중 overflow:hidden 속성을 사용 할 경우, 메시지를 감춰버림 
 *  @3차 : @2차 의 단점 중 상위 부모(overflow:hidden)만 마킹시 visible, 리셋시 다시 hidden 처리
 *  
 *  @2021.06.08 : 체크 항목에서 통과하지 못 할 경우, 다음 항목 체크 생략 코드 추가 (vcCheck 함수)
 *  	@issue 여러개(2개 이상)의 유효성항목(validation-check 속성)을 체크 할 경우, 체크 항목에서 통과하지 못 할 경우, 해당 경고 메시지가 표시 되야 하지만, 마지막 유효성체크 메시지가 표시 됨    
 *  @2021.06.22 : ID 체크 유효성검사 추가
 *   
 */
(function($) {
    /* 언어 */
    var lang = WT_LOCALE || 'en';
    
    /* Regular Expressions (정규표현식) */
    var regex = {
        email: /^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]+$/, 
        url: /^[a-zA-Z0-9\&\=\?\/\.\:\-\_\ \']+$/, // check
        telephone: /^0[0-9]{2}-([0-9]{3,4})-([0-9]{4})$/, 
        cellphone: /^0[0-9]{2}-([0-9]{4})-([0-9]{4})$/, 
       // onlyKor: /^[ 가-힣ㄱ-ㅎ]+$/,
        onlyEng: /^[ _a-zA-Z\-()]+$/,
//        onlyKorEng: /^[ 가-힣a-zA-Zㄱ-ㅎ]+$/,
//        onlyKorEngNumber: /^[ 가-힣a-zA-Z0-9ㄱ-ㅎ]+$/,
        onlyNumber: /^[0-9]+$/,
        
        date: /^[0-9]{4}\-\[0-9]{1,2}\-\[0-9]{1,2}$/,
        year: /^[0-9]{4}$/,
        noSpecialCaracters: /^[0-9a-zA-Z]+$/,
        onlyLetter: /^[a-zA-Z\ \']+$/,
        onlyLetterUnd: /^[_A-Z']+$/,
        onlyEngNumber: /^[a-zA-Z0-9\ \']+$/,
        UpperEngNumber: /^[_A-Z0-9]+$/, 
        LowerEngNumber: /^[_a-z0-9]+$/,
        noKor: /^[ _a-zA-Z0-9]+$/,
        
        reqSubject: /^[ ^']+$/,
        reqContents: /^[ ^']+$/,
        // 8~16 대소문자 + 숫자 
        //password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
        // 8~15 대소문자 + 숫자 + 특수문자($@$!%*#?&)
        //password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/,
        // 8~20 대소문자 + 숫자 + 특수문자(:;<>/\,.'" 제외)
        password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&()\{\}\[\]^\-_=+|~])[A-Za-z\d$@$!%*#?&()\{\}\[\]^\-_=+|~]{8,20}$/,
    };
    
    /* 규칙 */
    var rules = {
        required: {
            func: function(value){
                if(value && value.trim()) return true;
                return false;    
            },
            msg: {
                vi: 'Thông tin này bắt buộc',
                en: 'This is required item.',
                kr: '이 필드는 필수항목입니다.'
            }
        },
        email: {
            func: function(value){
                return regex.email.test(value);
            },
            msg: {
                vi: 'Email không hợp lệ!',
                en: 'This email is incorrect!',
                kr: '이메일 정보가 올바르지 않습니다.'
            }
        },
        url: {
            func: function(value){
                return regex.url.test(value);
            },
            msg: {
                'vi': 'URL không hợp lệ!',
                'en': 'This url is incorrect!',
                'kr': 'URL 정보가 올바르지 않습니다.'
            }
        },
        telephone:{
            func: function(value){
                return regex.telephone.test(value);
            },
            msg: {
                vi: 'Số điện thoại không hợp lệ!',
                en: 'This phone number is incorrect!',
                kr: '전화번호 정보가 올바르지 않습니다.'
            }
        },
        cellphone:{
            func: function(value){
                return regex.cellphone.test(value);
            },
            msg: {
                vi: 'Số điện thoại không hợp lệ!',
                en: 'This cellphone number is incorrect!',
                kr: '휴대폰 정보가 올바르지 않습니다.'
            }
        },
        onlyKor: {
            func: function(value){
                return regex.onlyKor.test(value);
            },
            msg: {
                vi: 'Chỉ kí tự tiếng Hàn!',
                en: 'This field is Korean characters only!',
                kr: '이 필드는 한글만 입력 가능합니다.'
            }
        },
        onlyEng: {
        	func: function(value){
                return regex.onlyEng.test(value);
            },
            msg: {
                vi: 'Chỉ kí tự tiếng Hàn!',
                en: 'This field is English characters only!',
                kr: '이 필드는 영어만 입력 가능합니다.'
            }
        },
        onlyKorEng: {
            func: function(value){
                return regex.onlyKorEng.test(value);
            },
            msg: {
                vi: 'Chỉ kí tự tiếng Hàn và tiếng Anh!',
                en: 'This field is Korean and English characters only!',
                kr: '이 필드는 한글과 영어만 입력 가능합니다.',
            }
        },
        number: {
            func: function(value){
                return $.isNumeric(value);
            },
            msg: {
                vi: 'Thông tin này là con số!',
                en: 'Only numbers are entered.',
                kr: '이 필드는 숫자만 입력 가능합니다.',
            }
        },
        password: {
            func: function(value){
//                return regex.password.test(value);
            	// 비밀번호 허용 문자 제거 => 비허용 문자만 남음 
            	var exSymbol = value.replace(/[A-Za-z0-9$@$!%*#?&()\{\}\[\]^\-_=+|~]/g, '');
            	if(exSymbol.length > 0) {
            		exSymbol = exSymbol.split('').reduce((acc, e) => {
            		    if(!acc.includes(e)) acc = acc + e;
            		    return acc;
            		}, '').split('').join(' ').replace('   ', ' white-space ').replace('  ', ' white-space');
            		if(exSymbol === ' ') exSymbol = 'white-space';
            		alert('This special symbol is not available.\n [ ' + exSymbol + ' ]');
            	}
            	return regex.password.test(value); 
            },
            msg: {
                vi: '8 đến 16 kí tự, ít nhất 1 kí tự số, 1 kí tự chữ!',
//                en: '8~16 characters, at least 1 letter and 1 number!',
                en: '8~20 characters, at least 1 letter and 1 number and 1 special symbol.',
                kr: '8~16자, 1자, 숫자 1자.',
            }
        },
        ID: {
        	func: function(value) {
        		//return (/^[A-Za-z0-9_\-]{5,14}$/.test(value) && /[a-z]/g.test(value) && /[0-9]/g.test(value));
        		return (/^[A-Za-z0-9_\-]{5,15}$/.test(value) && /[A-Za-z]/g.test(value));
        	},
        	msg: {
        		vi: '',
        		// lowercase : 소문자, case: : 대소문자, a capital letter : 대문자
        		en: 'Use only 5~15 English case letters, numbers and \'_\', \'-\', at least 1 letter.',
                kr: '5~15자의 영문 대소문자, 숫자와 특수기호 \'_\',\'-\'만 사용 가눙 합니다, 최소 문자 1개 이상 포함',
            }
        }
    };
    
    /* wrap, msg color */
    const _color = {
        warning: '#fa6863',
        success: '#07bf6f',
    };
    
    /* msg:before icon content */
    const _content = {
        warning: '\\e921',
        success: '\\e928',
    };
    
    /* validation-check 관련 css (wrap, msg) */
    var _style = [
        {target: 'div.validation-check-wrap', style: 'min-height: 45px;width:100%;height:-webkit-fill-available;position:relative;display:inline-block;margin:auto;border:1px solid;vertical-align:middle;border-radius:2px;'},
        {target: 'div.validation-check-wrap.warning', style: 'border-color:' + _color.warning + ';'},
        {target: 'div.validation-check-wrap.success', style: 'border-color:' + _color.success + ';'},
        {target: 'span.validation-check-msg', style: 'position:absolute;text-align:right;font-weight:700;font-family:\'xeicon\';font-size:.7rem;letter-spacing:-1px;'},
        {target: 'span.validation-check-msg.warning', style: 'color:' + _color.warning + ';'},
        {target: 'span.validation-check-msg.success', style: 'color:' + _color.success + ';'},
        {target: 'span.validation-check-msg.warning:before', style: 'content:\'' + _content.warning + '\';margin-right:3px;'},
        {target: 'span.validation-check-msg.success:before', style: 'content:\'' + _content.success + '\';margin-right:3px'},
        
        // datepicker 버튼 관련 
        {target: 'div.validation-check-wrap + .calendar-picker-btn', style: 'right:1px;'},
    ];
    
    /* style 생성, 추가 - 별도의 css 파일 사용하지 않음 */
    var style = _style.reduce((acc, e) => {
        acc = acc + e.target + ' {' + e.style + '}\n';
        return acc;
    }, '');
    $('head').append(`<style>${style}</style>`);
    
    /* window 크기 리사이징 시 validation-check 리셋 - msg(position:absolute) 틀어짐 방지 */
    $(window).resize(function() { $('[validation-check]').vcReset(); });
    
    /* 정규표현식 체크 함수 */
    var checkRule = function(obj, rule) {
        var value = obj.val();
        if(!rule.func(value)) return false
        else return true;
    }
    
    /* 리셋 콜백 함수 (warning, available) */
    var resetCallback = function(e) {
        // 기존 메세지가 있을 경우, 삭제 
        if($(this).prop('validation-check-msg')) $(this).prop('validation-check-msg').remove();
        // 마킹시 overflow가 수정된 부모(overflow:hidden => visible)를 다시 리셋(overflow:visible => hidden)
//      if($(this).prop('validation-check-overflow-hidden')) $($(this).prop('validation-check-overflow-hidden')).css('overflow', '');
        if($(this).prop('validation-check-overflow-hidden')) $(this).prop('validation-check-overflow-hidden').forEach((t) => $(t).css('overflow', ''));
        // wrap 삭제, 포커스
        $(this).unwrap().focus();
        // 리셋 이벤트(input, 마킹시 추가된 리셋 콜백 함수만) 삭제 - input에 대한 다른 이벤트는 삭제되지 않음
        $(this).unbind(e.type, resetCallback);
    }
    
    /* 마킹 함수 (msg, warp) */
    var marking = function(target, msg, cls) {
        // target이 input, select, textarea 아닐 경우 리턴
        if(!($(target).is('input') || $(target).is('select') || $(target).is('textarea'))) return target;
        
        // 이전 마킹이 되어 있을 경우, 초기화 (input 이벤트 트리거 시 resetCallback 실행)
        // 주의!!) overflow:hidden => visible 처리 보다 늦게 먼저 되야함 
        // check 항목이 1개 이상 인경우, 짝수번째에 다시 hidden 처리되서 메시지 안보임
        if($(target).parent().hasClass('validation-check-wrap')) $(target).trigger('input');
        
        // 부모에게 overflow:hidden이 있을 경우(closest=가장 가까운 부모 중),
        // 해당 부모를 overflow:visible 처리, target에 프로퍼티로 저장(리셋 함수에서 다시 overflow: visible 처리)
//        var overflowHidden = $(target).parents().toArray().reduce((acc, e) => { 
//            if($(e).css('overflow') === 'hidden' && !acc) acc = e;
//            return acc;
//        }, undefined);
//        if(overflowHidden) $(overflowHidden).css('overflow', 'visible');
//        if(overflowHidden) $(target).prop('validation-check-overflow-hidden', overflowHidden);

        var overflowHidden = $(target).parents().toArray().reduce((acc, e) => { 
            if($(e).css('overflow') === 'hidden') acc.push(e);
            return acc;
        }, []);
        if(overflowHidden.length > 0) {
            overflowHidden.forEach((e) => $(e).css('overflow', 'visible'));
            $(target).prop('validation-check-overflow-hidden', overflowHidden);
        }
        
        // 타겟을 wrap으로 감싸기
        //$(target).wrap('<div class="validation-check-wrap ' + cls + '"></div>').closest('.validation-check-wrap');
        $(target).wrap('<div class="validation-check-wrap ' + cls + '"></div>');
        // 메시지 처리
        if(msg) {
            // wrap의 좌표(top, left)
            var offset = $(target).closest('.validation-check-wrap').offset();
            // wrap의 width(outerWidth() => padding 포함, outerWidth(true) => padding, margin 포함)
            var width = $(target).closest('.validation-check-wrap').outerWidth(true);
            // 메시지 생성 
            msg = '<span class="validation-check-msg ' + cls + '">' + msg + '</span>';
            msg = $(msg).css('width', width);
            // 메시지 추가
            $(target).closest('.validation-check-wrap').append(msg);
            // 메시지 위치 조정
            $(msg).css('top', -$(msg).outerHeight()-0);
            $(msg).css('left', 0);
            // 메시지에 타겟 프로퍼티 추가(메시지 위치 재조정시 필요)
            msg = $(msg).prop('target', target);
            // 타겟에 메시지 프로퍼티 추가(삭제 시 필요)
            $(target).prop('validation-check-msg', msg);
        }
        // 리셋 콜백 함수 추가 
        $(target).on('input', resetCallback);
        return target;
    };
    
    /*
     * # 기존 .val() 함수 수정 
     * - validation check 결과를 리셋 할 경우, 해당 event(input..)에 리셋콜백 함수를 바인딩함
     * - 그러나 .val()로 값을 input 할 경우에 event를 감지 할 수 없으므로 
     * - 기존 jQuery의 .val() 함수를 커스터마이징 함, 기존 기능 + resetCallback이 추가된 event를 트리거함
     */
    var originVal = $.prototype.val;
    $.prototype.val = function(v) {
        var res = originVal.apply(this, arguments);
        //if(this.is('input:text') && arguments.length > 0) this.trigger('input');
        if(arguments.length > 0) this.trigger('input');
        return res;
    };
    /* 경고 */
    $.prototype.vcWarning = function(msg) {
        this.each((i, e) => marking(e, msg, 'warning'));
        return this;
    }
    /* 성공 */
    $.prototype.vcSuccess = function(msg) {
        this.each((i, e) => marking(e, msg, 'success'));
        return this;
    }
    /* 리셋 */
    $.prototype.vcReset = function() {
        $(this).trigger('input');
        return this;
    }
    /* 유효성 검사 */
    $.prototype.vcCheck = function() {
        return $(this).toArray().reduce((allCheck, e, i) => {
            var checkRules = $(e).attr('validation-check') ? $(e).attr('validation-check').split(',') : [],
            	singleCheck = true;
            
            checkRules.forEach((r) => {
            	/* 이전 규칙이 맞지 않을 경우 다음 규칙 검사 스킵 */
                if(!singleCheck) return false;
            	
                var ruleName =  r.trim();
                if(rules[ruleName]) {
                    if(!checkRule($(e), rules[ruleName])) {
                    	singleCheck = false, allCheck = false;
                        $(e).vcWarning(rules[ruleName].msg[lang]);
                        /* 해당 요소 위치로 scroll 이동 */
//                        if(i===0) $('html, body').animate({scrollTop:$(e).offset().top - 40}, 400);
                    } 
                    /* succcess 표시 */
//                    else {
//                        $(e).vcSuccess('success');
//                    }
                }
            });
            return allCheck;
        }, true);
    }
    
    /*
     * # key 입력 마다 체크 할 경우
     * - $(this).vcCheck() 후 $(this).focus() 해야함
     */
    
})(jQuery);