/*
 * ##### sys에서 사용하는 함수 모듈화 js파일
 *
 */
/*var CTX = '/WindTurbine';*/

var _sys = {
	//############ Server #####################################
	mariaDB : {
		url: function(){
			var num = location.pathname.split('/')[2];
			return CTX + '/sys_new/' + num + '/getData.ajax'; 
		},
		ajax: function(url, param, type="get"){
			var result;
			
			$.ajaxSettings.traditional = true;
			$.ajax({
				url : url,
				type : type,
				async : false,	//동기화
				data : param,
				dataType: 'json',
				error : function (req, status, err){
					/*alert("ajax ERROR!!"); */
				},
				success : function(data){
					result = data;
				}
			});
			return result;
		},
		getData: function(path, param){
			return _sys.mariaDB.ajax(path, param);
		},
		ajaxFile: function(url, param){
			var result;
			
			$.ajaxSettings.traditional = true;
			$.ajax({
				url : url,
				async : false,	//동기화
				data : param,
				dataType: 'json',
				//파일 전송시
				type: 'POST',
				processData: false,	//data를 String으로 변환하지 않음
				contentType: false, //content-type 헤더가 multipart/form-data로 전송되게 함
				cache: false,	//갱신된 데이터 받으려면
				error: function(req, status, err){
					// alert("ajax ERROR!!");
				},
				success : function(data){
					result = data;
				}
			});
			return result;
		},
		saveFile: function(path, param){
			return _sys.mariaDB.ajaxFile(path,param);
		}
		
	},
	/* 대상 타입 반환 */
	getType: function(t) {
        return Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
    },
	/* 유효성검사 체크 */
	validationCheck: function(root='') {
		return $(root + ' [validation-check]').vcCheck();
	},
	/* 파라미터 변환 */
	convertParam: function(param) {
		// formData에 param 옮겨 닮기 
		for(let [key, value] of Object.entries(param)) {
			console.log(key, value, _sys.getType(value));
		    // 배열(array), 객체(object)인 항목은 JSON String으로 변환(JSON.stringify(JSONObejct) ) <=> JSON.parse(JSONString)
			param[key] = ['object', 'array'].includes(_sys.getType(value)) ? JSON.stringify(value) : value;
		}
		return param;
	},
	/* input(type=text) - 한글 지우기 : keyup 이벤트에 사용해야함 */
	//deleteHangul: function(e) {
//		var objTarget = e.srcElement || e.target;
//        var _value = e.srcElement.value;
//        if(/[ㄱ-ㅎㅏ-ㅡ가-핳]/g.test(_value)) {
//            objTarget.value = objTarget.value.replace(/[ㄱ-ㅎㅏ-ㅡ가-핳]/g,'');
//            //objTarget.value = null;
//            //return false;
//        }
	//	this.value = this.value.replace(/[ㄱ-ㅎㅏ-ㅡ가-핳]/g,'');
	//},
	/* input(type=text) - 영어 지우기 : keyup 이벤트에 사용해야함 */
	deleteEnglish: function(e) {
//		var objTarget = e.srcElement || e.target;
//        var _value = e.srcElement.value;
//        if(/[a-zA-Z]/g.test(_value)) {
//            objTarget.value = objTarget.value.replace(/[a-zA-Z]/g,'');
//            //objTarget.value = null;
//            //return false;
//        }
		this.value = this.value.replace(/[a-zA-Z]/g,'');
	}, 
	/* input(type=text) - 정수, 소수만 입력 가능 : keypress 이벤트에 사용해야함 */
	isNumberKey: function(e) {
		// 타겟 
		var obj = e.srcElement || e.target;
        
        // 정수 자릿수 (maxNumberLength : tag의 속성 값)
        var numLength = parseInt(obj.getAttribute('maxNumberLength')) || 0;
        // 소수 자릿수 (maxDecimalLength : tag의 속성 값)
        var decLength = parseInt(obj.getAttribute('maxDecimalLength')) || 0;
        
        var charCode = (e.which) ? e.which : e.keyCode;
        
        // textbox value 
        var _value = e.srcElement.value;
        
        // 숫자와 .만 입력 가능 하도록 함 (maxDecimalLength 값이 설정 되어 있을 경우에만)
        //if(e.keyCode < 48 || e.keyCode > 57) if(e.keyCode != 46 && decLength > 0) return false;
        if(e.keyCode < 48 || e.keyCode > 57) return false;
        if(e.keyCode == 46 && decLength === 0) return false;
              
        // 소수점(.)이 두번 이상 나오지 않게
        var _pattern0 = /^\d*[.]\d*$/;  // 현재 value값에 소수점(.)이 있으면 .입력불가
        if(_pattern0.test(_value))  if(charCode == 46) return false;
        
        
        // 소수점 둘째자리까지만 입력 가능
        //var _pattern2 = /^\d*[.]\d{2}$/;// 현재 valur값이 소수점 둘째자리 이상이면 입력 불가 
        var _pattern2 = new RegExp('^\\d*[.]\\d{' + decLength + '}$');    // 위 정규표현식 자리수 동적으로 변경 
        if(_pattern2.test(_value)) return false;
        
        
        // 두자리 이하의 숫자만 가능 
        //var _pattern1 = /^\d{2}$/;      // 현재 valur값이 2자리 숫자이면 .만 입력 가능 
        var _pattern1 = new RegExp('^\\d{' + numLength + '}$');      // 위 정규표현식 자리수 동적으로 변경 
        if(_pattern1.test(_value))  if(charCode != 46) return false;
        
        return true;
	},
	/* keyup 에 사용 */
	isDecimalKey: function(e) {
		// 타겟 
		var obj = e.srcElement || e.target;
		// 입력 전 값 
		var _value = e.srcElement.value;
		
		var devide = _value.toString().split('.');
		
		// 부호
		var sign = devide[0] >= 0 ? '' : '-';
		// 정수
		var num = Math.abs(devide[0]);
		// 소수 
		var dec = parseInt(devide[1] || 0);
		// 정수 자릿수 (maxNumberLength : tag의 속성 값)
        var numLength = parseInt(obj.getAttribute('maxNumberLength')) || 0;
        // 소수 자릿수 (maxDecimalLength : tag의 속성 값)
        var decLength = parseInt(obj.getAttribute('maxDecimalLength')) || 0;
        // 전체 길이
        var totalLength = numLength + decLength;
        
        console.log(num, dec, numLength, decLength);
        
        if(num.toString().length >= numLength) {
        	e.srcElement.value = sign + num.toString().slice(0, numLength) + (dec > 0 ? '.' + dec.toString().slice(0, decLength) : '.1');
        }
        if(dec > 0 && dec.toString().length >= decLength) {
        	e.srcElement.value = sign + num.toString().slice(0, numLength) + (dec > 0 ? '.' + dec.toString().slice(0, decLength) : '');
        }
	},
	/* keypress 에 사용 */
	isDecimalKey2: function(e) {
		// 타겟 
		var obj = e.srcElement || e.target;
		// 입력 전 값 
		var _value = e.srcElement.value;
		
		var devide = _value.toString().split('.');
		
		var num = Math.abs(devide[0]);
		var dec = parseInt(devide[1] || 0);
		
		// 정수 자릿수 (maxNumberLength : tag의 속성 값)
        var numLength = parseInt(obj.getAttribute('maxNumberLength')) || 0;
        // 소수 자릿수 (maxDecimalLength : tag의 속성 값)
        var decLength = parseInt(obj.getAttribute('maxDecimalLength')) || 0;
        // 전체 길이
        var totalLength = numLength + decLength;
        
        console.log(num, dec, e, e.ctrlKey, e.metaKey, e.which);
        
        if((e.ctrlKey || e.metaKey ) && (e.which == '118' || e.which == '86')) {
			alert('Ctrl + V is impossible');
            return false;
		}
        
        if(num.toString().length >= numLength) return false;
        if(dec > 0 && dec.toString().length >= decLength) return false;
        return true;
	},
	/* tr 클릭시, checkbox, radio 버튼 onoff */
	//clickCheckAndRadioOnOff: function(e) {
	clickRowCheckOnOff: function(e) {
//		if($(this).find('input[type=radio], input[type=checkbox]').is('input:checked'))
//			$(this).find('input[type=radio], input[type=checkbox]').prop('checked', false);
//		else 
//			$(this).find('input[type=radio], input[type=checkbox]').prop('checked', true);
		// => 리팩토링
		e.preventDefault();
		var target = $(this).find('input[type=radio], input[type=checkbox]');
//			flag = target.is(':checked') ? false : true;
		target.prop('checked', !target.is(':checked'));
	},
	/* 여러 tr 클릭시, checkbox, radio 버튼 onoff */
	clickRowsCheckOnOff: function(e) {
//		var id = $(this).attr('id').split('_'), target;
//		if(id[2] === 'A') 
//			$(this).find('input[type=radio], input[type=checkbox]').prop('checked', true);
//		if(id[2] !== 'A')
//			$(this).siblings('tr[id*=tr_' + id[1] + '_A]').find('input[type=radio], input[type=checkbox]').prop('checked', true);
		// => 리팩토링
		e.preventDefault();
		var id = $(this).attr('id').split('_'), target;
		if(id[2] === 'A') target = $(this).find('input[type=radio], input[type=checkbox]');
		else target = $(this).siblings('tr[id*=tr_' + id[1] + '_A]').find('input[type=radio], input[type=checkbox]');
		target.prop('checked', !target.is(':checked'));
	},
	
	/************ 데이터 변환 *************************************************************************************/
	convertData: {
		FARM_INFO: function(param) {
			
			// COMPANY 자르기 
			param.COMPANY_ID_LIST = param.COMPANY_ID_LIST ? param.COMPANY_ID_LIST.split(' | ') : [];
			param.COMPANY_NM_LIST = param.COMPANY_NM_LIST ? param.COMPANY_NM_LIST.split(' | ') : [];
			
			// COMPANY LIST 생성 
			param.COMPANY_LIST = param.COMPANY_ID_LIST.map((e, i) => {
				return {
					COMPANY_ID: param.COMPANY_ID_LIST[i],
					COMPANY_NM: param.COMPANY_NM_LIST[i],
				}
			});
			
			// COMPANY 삭제 
			delete param.COMPANY_ID_LIST;
			delete param.COMPANY_NM_LIST;
			
			// GROUP 자르기 
			param.GROUP_ID_LIST = param.GROUP_ID_LIST ? param.GROUP_ID_LIST.split(' | ') : []; 
			param.GROUP_NM_LIST = param.GROUP_NM_LIST ? param.GROUP_NM_LIST.split(' | ') : [];
			param.GROUP_TURBINE_ID_LIST = param.GROUP_TURBINE_ID_LIST ? param.GROUP_TURBINE_ID_LIST.split(' | ') : []; 
			param.GROUP_TURBINE_NM_LIST = param.GROUP_TURBINE_NM_LIST ? param.GROUP_TURBINE_NM_LIST.split(' | ') : [];
			param.GROUP_TURBINE_LAT_LIST = param.GROUP_TURBINE_LAT_LIST ? param.GROUP_TURBINE_LAT_LIST.split(' | ') : []; 
			param.GROUP_TURBINE_LNG_LIST = param.GROUP_TURBINE_LNG_LIST ? param.GROUP_TURBINE_LNG_LIST.split(' | ') : []; 
			
			// GROUP LIST 생성 
			param.GROUP_LIST = param.GROUP_ID_LIST.map((e, i) => {
				
				// TURBINE 자르기 
				turbine_id_list = param.GROUP_TURBINE_ID_LIST[i] ? param.GROUP_TURBINE_ID_LIST[i].split(' || ') : [];
				turbine_nm_list = param.GROUP_TURBINE_NM_LIST[i] ? param.GROUP_TURBINE_NM_LIST[i].split(' || ') : [];
				turbine_lat_list = param.GROUP_TURBINE_LAT_LIST[i] ? param.GROUP_TURBINE_LAT_LIST[i].split(' || ') : [];
				turbine_lng_list = param.GROUP_TURBINE_LNG_LIST[i] ? param.GROUP_TURBINE_LNG_LIST[i].split(' || ') : [];
				// TURBINE LIST 생성 
				turbine_list = turbine_id_list.map((e2, i2) => {
					return {GERATOR_ID: turbine_id_list[i2], GERATOR_NM: turbine_nm_list[i2], LAT:turbine_lat_list[i2], LNG: turbine_lng_list[i2]}
				});
				
				return {
					GROUP_ID: param.GROUP_ID_LIST[i],
					GROUP_NM: param.GROUP_NM_LIST[i],
					TURBINE_LIST: turbine_list,
				}; 
			});
			
			// TURBINE LIST 생성
			param.TURBINE_LIST = param.GROUP_LIST.reduce((acc, e) => {
				acc = acc.concat(e.TURBINE_LIST);
				return acc;
			}, []);
			
			// GROUP 삭제 
			delete param.GROUP_ID_LIST;
			delete param.GROUP_NM_LIST;
			delete param.GROUP_TURBINE_ID_LIST;
			delete param.GROUP_TURBINE_NM_LIST;
			delete param.GROUP_TURBINE_LAT_LIST;
			delete param.GROUP_TURBINE_LNG_LIST;
			
			return param;
		},
		
		ALARM_LIST: function(param) {
			
			// ACTION 자르기 
			param.ACTION_NUM_LIST = param.ACTION_NUM_LIST ? param.ACTION_NUM_LIST.split(' | ') : [];
			param.ACTION_NM_LIST = param.ACTION_NM_LIST ? param.ACTION_NM_LIST.split(' | ') : [];
			// ACTION LIST 생성 
			param.ALARM_ACTION_LIST = param.ACTION_NUM_LIST.map((e, i) => {
				return {
					ACTION_NUM: param.ACTION_NUM_LIST[i],
					ACTION_NM: param.ACTION_NM_LIST[i],
				}
			});
			param.ALARM_ACTION_CNT = param.ALARM_ACTION_LIST.length; 
			// ACTION 삭제
			delete param.ACTION_NUM_LIST;
			delete param.ACTION_NM_LIST;
			
			
			// PART 자르기 
			param.PART_NUM_LIST = param.PART_NUM_LIST ? param.PART_NUM_LIST.split(' | ') : [];
			param.PART_NM_LIST = param.PART_NM_LIST ? param.PART_NM_LIST.split(' | ') : [];
			// PART LIST 생성 
			param.ALARM_PART_LIST = param.PART_NUM_LIST.map((e, i) => {
				return {
					PART_NUM: param.PART_NUM_LIST[i],
					PART_NM: param.PART_NM_LIST[i],
				}
			});
			param.ALARM_PART_CNT = param.ALARM_PART_LIST.length;
			// PART 삭제
			delete param.PART_NUM_LIST;
			delete param.PART_NM_LIST;
			
			
			// TOOL 자르기 
			param.TOOL_NUM_LIST = param.TOOL_NUM_LIST ? param.TOOL_NUM_LIST.split(' | ') : [];
			param.TOOL_NM_LIST = param.TOOL_NM_LIST ? param.TOOL_NM_LIST.split(' | ') : [];
			// TOOL LIST 생성 
			param.ALARM_TOOL_LIST = param.TOOL_NUM_LIST.map((e, i) => {
				return {
					TOOL_NUM: param.TOOL_NUM_LIST[i],
					TOOL_NM: param.TOOL_NM_LIST[i],
				}
			});
			param.ALARM_TOOL_CNT = param.ALARM_TOOL_LIST.length;
			// TOOL 삭제
			delete param.TOOL_NUM_LIST;
			delete param.TOOL_NM_LIST;
			
			
			// PPE 자르기 
			param.PPE_NUM_LIST = param.PPE_NUM_LIST ? param.PPE_NUM_LIST.split(' | ') : [];
			param.PPE_NM_LIST = param.PPE_NM_LIST ? param.PPE_NM_LIST.split(' | ') : [];
			// PPE LIST 생성 
			param.ALARM_PPE_LIST = param.PPE_NUM_LIST.map((e, i) => {
				return {
					PPE_NUM: param.PPE_NUM_LIST[i],
					PPE_NM: param.PPE_NM_LIST[i],
				}
			});
			param.ALARM_PPE_CNT = param.ALARM_PPE_LIST.length;
			// PPE 삭제
			delete param.PPE_NUM_LIST;
			delete param.PPE_NM_LIST;
			
			return param;
		},
		
	},



}