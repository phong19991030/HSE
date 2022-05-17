var _oam = {
	//////////////[ Server ] ///////////////////////////////////////////////////////////////////////////
	mariaDB : {
		url: function() {
			var num = location.pathname.split('/')[2];
			return ctx + '/oam2/' + num + '/getData.ajax';	
		},
		ajax: function(url, param, type='get') {
			var result;
			// 배열 데이터 전송시 직렬화
			$.ajaxSettings.traditional = true;	
			$.ajax({
				url : url,
				type: type,
				async: false,	// 동기화
				data : param,
				//dataType: 'json',
				error : function (req, status, err) {
					// alert("ajax ERROR!!");
				},
				success : function(data) {
					result = data;
				}
			});
			return result;
		},
		getData: function(path, param) {
			//_oam.mariaDB.url();
			return _oam.mariaDB.ajax(path, param);
		},
		ajaxFile: function(url, param) {
			var result;
			// 배열 데이터 전송시 직렬화
			$.ajaxSettings.traditional = true;	
			$.ajax({
				url : url,
				async: false,	// 동기화
				data : param,
				dataType: 'json',
				// 파일 전송시
				type: 'POST',
				enctype: 'multipart/form-data',	// 굳이 없어도 대나?
				contentType: false,  
				processData: false,
				cache: false,
				// 파일 전송시
				error : function (req, status, err) {
					// alert("ajax ERROR!!");
				},
				success : function(data) {
					console.log(data);
					result = data;
				}
			});
			return result;
		},
		saveFile: function(path, param) {
			return _oam.mariaDB.ajaxFile(path, param);
		}
	},
	/*
	 *		 MongoDB node.js REST-API-Server
	 */
	mongoDB : {
//		url: 'http://localhost:3000/SD/',							// Local 
		url: 'http://restapi-sensor-data.appspot.com/SD/',			// GCP
		ajax: function(url) {
			var result;
			$.ajax({
				url : url,
				type: 'GET',
				async: false,
				dataType: 'json',
				error : function (req, status, err) {
					// alert("ajax ERROR!!");
				},
				success : function(data) {
					result = data;
				}
			});
			return result;
		},
		/*
		 * 	 Data 조회 
		 */
		getSensor: function(param) {
			return _oam.mongoDB.ajax(_oam.mongoDB.url + 'getSensor/' + param);
		},
		getSectionalSensorData: function(param) {
			return _oam.mongoDB.ajax(_oam.mongoDB.url + 'getSectionalSensorData/' + param.sdate + '/' + param.edate + '/' + param.power_system_id + '/' + param.list);
		},
		getLatestSensorData: function(param) {
			return _oam.mongoDB.ajax(_oam.mongoDB.url + 'getLatestSensorData/' + param.power_system_id + '/' + param.list);
		},
		getSensorData:function(param) {
			return _oam.mongoDB.ajax(_oam.mongoDB.url + 'getSensorData/' + param.sdate + '/' + param.edate + '/' + param.power_system_id + '/' + param.sensor_id + '/' + param.allow_last_year);
		},
		getSensorDataByFormat:function(param) {
			return _oam.mongoDB.ajax(_oam.mongoDB.url + 'getSensorDataByFormat/' + param.sdate + '/' + param.edate + '/' + param.power_system_id + '/' + param.sensor_id + '/' + param.timezone_offset + '/' + param.format + '/' + param.allow_last_year);
		},
		updateSensor:function(param) {
			return _oam.mongoDB.ajax(_oam.mongoDB.url + 'updateSensor/' + param.sensor_id + '/' + param.field + '/' + param.value);
		}
	},
	cookieSetting: function() {
		
		var caller = arguments.callee.caller.name;
		var format = caller === 'cms0300' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
		
		// 날짜 셋팅 
		var from_dt = getCookie('from_dt');
		var to_dt = getCookie('to_dt');
		if(from_dt && to_dt) {
			$('#from_dt').val(moment.tz(from_dt, client_access_timezone).format(format));
			$('#to_dt').val(moment.tz(to_dt, client_access_timezone).format(format));
		} else {
			// 없을 경우 
			to_dt = moment.tz(client_access_timezone);
			to_dt.set('hour', 0);
			to_dt.set('minute', 0);
			to_dt.set('second', 0);
			from_dt = to_dt.clone().set('day', to_dt.get('day')-7);
			$('#from_dt').val(from_dt.format(format));
			$('#to_dt').val(to_dt.format(format));
		}
		// combobox cookie 존재 할 경우, 
		var t = hasCookie();
		if(t) {
//			$('.location').append('<li>'+t.farm_nm+'</li>');
//			$('.location').append('<li>'+t.group_nm+'</li>');
//			$('.location').append('<li class="bold">'+t.turbine_nm+'</li>');
			$('#tit_turbine_nm').text(t.turbine_nm);
			
			if(caller == 'cms0300') createSensorTable(t.turbine_id);
			onSearch();
		}
	},
	excuteFunc: function(callback, ...args){
        var namespace = typeof callback === 'string' ? callback.split('.') : [];
        callback = typeof callback === 'function' ? callback : window;
        //for(var i=0; i<namespace.length; i++) callback = callback[namespace[i]];
        namespace.forEach((e) => callback = callback[e]);
        return typeof callback === 'function' ? callback(...args) : undefined;
    },
    getType: function(t) {
        return Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
    },
    /*
     * 	combobox change 후 실행되는 callback 함수
     */
	selectCombo: function(callback) {
		
		function executor(arg) {
			switch(_oam.getType(arg)) {
	            case 'function':
	                arg();
	                break;
	            case 'string':
	                _oam.excuteFunc(arg);
	                break;
	            case 'array':
	                arg.forEach((e) => {
	                    var type = _oam.getType(e);
	                    type === 'function' ? e() : (type === 'string' ? _oam.excuteFunc(e) : undefined);
	                });
	                break;
	        }
		}
		
		function log() {
			var functions = arguments[0];
			var msg = '[' + arguments[1] + '] : ';
			if(functions) {
				switch(_oam.getType(functions)) {
					case 'function':
						msg = msg + functions.name;
		                break;
		            case 'string':
		            	msg = msg + functions;
		                break;
		            case 'array':
		            	var list = functions.map((e) => {
		                    var type = _oam.getType(e);
		                    return type === 'function' ? e.name : (type === 'string' ? e : undefined);
		                });
		            	msg = msg + list.join(', ');
		                break;
				}
			}
			console.log(msg);
		}
		var farm_id = $('ul.select-machine.farm li.active a').attr('id');
		var farm_nm = $('ul.select-machine.farm li.active a').text();
		var group_id = $('ul.select-machine.group li.active a').attr('id');
		var group_nm = $('ul.select-machine.group li.active a').text();
		var turbine_id = $('ul.select-machine.turbine li.active a').attr('id');
		var turbine_nm = $('ul.select-machine.turbine li.active a').text();
		
		callback = callback || {};
		if(farm_id && !group_id && !turbine_id) {
			console.log('[FARM] : ' + farm_id + ' : ' + farm_nm);
			// farm 실행
			if(callback.farm) {
				log(callback.farm, 'FARM');
				executor(callback.farm);
			}
		} else if(farm_id && group_id && !turbine_id) {
			console.log('[GROUP] : ' + group_id + ' : ' + group_nm);
			// group 실행
			if(callback.group) {
				log(callback.group, 'GROUP');
				executor(callback.group);
			}
		} else if(farm_id && group_id && turbine_id) {
			console.log('[TURBINE] : ' + turbine_id + ' : ' + turbine_nm);
			// turbine 실행
			if(callback.turbine) {
				log(callback.turbine, 'TURBINE');
				executor(callback.turbine);
			}
		}
		// all 실행
		if(callback.all) {
			log(callback.all, 'ALL');
			executor(callback.all);
		}
	},
	/* 
	 * 	두개의 시간의 차이를 String으로 
	 * 	ex) 3d 12h 30m 50s
	 * 	obj : {START: '2020-10-25 00:00:00', END: '2020-10-28 04:40:00'}  
	 */
	toStringTimeDiff: function(obj) {
		// START, END 구분 
		var a = moment(obj.START); 
		var b = moment(obj.END);
		// day, hour, minutes, seconds 각 차이 계산 
		var days = b.diff(a, 'days', false);
		var hours = b.diff(a, 'hours', false) % 24;
		var minutes = b.diff(a, 'minutes', false)  % 60;
		var seconds = b.diff(a, 'seconds', false) % 60;
		// total 시간차 문자열 생성 
		var total; 
		total = days ? days + 'd ' : ''; 
		total += hours ? hours + 'h ' : '';
		total += minutes ? minutes + 'm ' : '';
		total += seconds ? seconds + 's' : '';
		return total;
	},
	/* file size 계산 */
	returnFileSize: function(size) {
		if(size < 1024) {
			return size + 'bytes';
		} else if(size >= 1024 && size < 1048576) {
			return (size/1024).toFixed(1) + 'KB';
		} else if(size >= 1048576) {
			return (size/1048576).toFixed(1) + 'MB';
		}
	},
	/* HTML tag 복사 */
	copyTag: function(e, attr) {
		var copy = $(e).clone();
		// 속성 추가 1
//		for(const [k, v] of Object.entries(attr)) {
//			copy.attr(k, v);
//		}
        // 속성 추가 2
        Object.entries(attr).forEach(([k,v]) => copy.attr(k, v));
		return copy;
	},
	/* 
	 * 	file 데이터 읽기 => text
	 * 	: 사용시 동기화 처리 해줘야함 
	 * 	사용 function에 async, 
	 *  readFile 사용 구문에 await
	 */
	readFile: function(file) {
		return new Promise((resolve, reject) => {
			var reader = new FileReader();
			// readAsText에 load될 때 event??
			reader.onload = (file) => {
				console.log(file);
				var data = file.target.result;
				resolve(data);
			};
			reader.onerror = reject;
			// 파일 데이터 텍스트로 읽기
			reader.readAsText(file);
			// 현재 지원 안하는 듯?
			//reader.readAsArrayBuffer(sender);
		});
	},
	/* textarea 최대 line 수 제한, 복사, 붙여넣기 금지  */
	textareaMaxLine: function(e) {
//		console.log(e);
//		console.log($(this));
		
		var max = parseInt($(this).attr('max-line')) || 0;
		var currentLines = ($(this).val().match(/\n/g) || []).length + 1;
		
		console.log(max, currentLines);
		if(max > 0 && currentLines > max) {
			alert('You can only enter up to ' + max + ' lines.');
			var arr = $(this).val().split('\n');
			$(this).val(arr.slice(0, max).join('\n'));
		}
//		console.log(e);
//		console.log(e.which, e.keyCode);
//		console.log(e.ctrlKey);
//		console.log(e.metaKey);
		/*
		 * # 붙여 넣기 제한 
		 * - e.ctrlKey : ctrl (window)
		 * - e.metaKey : command (mac)
		 */
		if((e.ctrlKey || e.metaKey ) && (e.which == '118' || e.which == '86')) {
			alert('Ctrl + V is impossible');
			return false;
		};
	},
	/* input(type=text) - 한굴 지우기 : keyup 이벤트에 사용해야함 */
	deleteHangul: function(e) {
		this.value = this.value.replace(/[ㄱ-ㅎㅏ-ㅡ가-핳]/g,'');
	}, 
	/* input(type=text) - 영어 지우기 : keyup 이벤트에 사용해야함 */
	deleteEnglish: function(e) {
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
        if(e.keyCode < 48 || e.keyCode > 57) if(e.keyCode != 46 && decLength > 0) return false;
              
        // 소수점(.)이 두번 이상 나오지 않게
        var _pattern0 = /^\d*[.]\d*$/;  // 현재 value값에 소수점(.)이 있으면 .입력불가
        if(_pattern0.test(_value))  if(charCode == 46) return false;
        
        // 두자리 이하의 숫자만 가능 
        //var _pattern1 = /^\d{2}$/;      // 현재 valur값이 2자리 숫자이면 .만 입력 가능 
        var _pattern1 = new RegExp('^\\d{' + numLength + '}$');      // 위 정규표현식 자리수 동적으로 변경 
        if(_pattern1.test(_value))  if(charCode != 46) return false;
        
        // 소수점 둘째자리까지만 입력 가능
        //var _pattern2 = /^\d*[.]\d{2}$/;// 현재 valur값이 소수점 둘째자리 이상이면 입력 불가 
        var _pattern2 = new RegExp('^\\d*[.]\\d{' + decLength + '}$');    // 위 정규표현식 자리수 동적으로 변경 
        if(_pattern2.test(_value)) return false;
        
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
        	e.srcElement.value = sign + num.toString().slice(0, numLength) + (dec > 0 ? '.' + dec.toString().slice(0, decLength) : '');
        }
        if(dec > 0 && dec.toString().length >= decLength) {
        	e.srcElement.value = sign + num.toString().slice(0, numLength) + (dec > 0 ? '.' + dec.toString().slice(0, decLength) : '');
        }
	},
	/* input - 붙여넣기 기능 사용 해제 : keydown 이벤트에 사용해야함 */
	isPasteUnable: function(e) {
		if((e.ctrlKey || e.metaKey ) && (e.which == '118' || e.which == '86')) {
			alert('Ctrl + V is impossible');
            return false;
		}
	},
	/* 화면 스크롤 이동 */
	moveScroll: function(value) {
		$('html, body').animate({scrollTop : value}, 400);
	},
	/* 태그 위치로 스크롤 이동 */
	moveScrollToTargetPosition: function(target, addValue=-200) {
		var offset = $(target).offset();
		if(offset) _oam.moveScroll(offset.top + addValue);
	},
	/* base64 데이터를 File 객체로 변환 */
	convertBase64ToFile: function(base64, fileName) {
		
		var arr = base64.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
	    while(n--){
	        u8arr[n] = bstr.charCodeAt(n);
	    }
    
	    return new File([u8arr], fileName, {type:mime});
	},
	/* 금액 3자리 수 마다 , 찍기 */
	addCharactersPerDigit: function(str, digit, char) {
		
		// /\B(?=(\d{3})+(?!\d))/g => new RegExp('\\B(?=(\\d{3})+(?!\\d))', 'g');
		//if(digit && char) str = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, char);
		if(digit && char) {
			var regex = new RegExp('\\B(?=(\\d{' + digit + '})+(?!\\d))', 'g');
			str = str.toString().replace(regex, char);
		}
		
		return str;
	},
	
	/**
	 * 서버에 요청하여 파일을 다운로드 한다. (Chrome, Firefox, IE11 테스트 완료)
	 * @param reqObj 요청정보 -  {
	 *     url: 'url',          (required)
	 *     method: 'GET|POST',  (optional - default:post)
	 *     data: {              (optional)
	 *         key1: value,
	 *         key2: value
	 *     }
	 * }
	 */
	requestDownloadFile: function(reqObj) {
	    if (!reqObj || !reqObj.url) return;
	    
	    var isGetMethod = reqObj.method && reqObj.method.toUpperCase() === 'GET';
	    $.ajax({
	        url: reqObj.url,
	        //method: isGetMethod ? 'GET' : 'POST',
	        dataType: 'native',
	        type: isGetMethod ? 'GET' : 'POST',
//	        xhrFields: {responseType:'blob'},
	        xhrFields: {responseType:'arraybuffer'},
	        // data: $.param(reqObj.data) // a=1&b=2&c=3 방식
	        // data: JSON.stringify(reqObj.data) // {a:1, b:2, c:3} JSON 방식
	        async: true,
	        data: reqObj.data
	    }).done(function(data, textStatus, jqXhr) {
	        if (!data) {
	            return;
	        }
	        try {
	            var blob = new Blob([data], { type: jqXhr.getResponseHeader('content-type') });
	            var fileName = _oam.getFileName(jqXhr.getResponseHeader('content-disposition'));
	            fileName = decodeURI(fileName);
	 
	            if (window.navigator.msSaveOrOpenBlob) { // IE 10+
	                window.navigator.msSaveOrOpenBlob(blob, fileName);
	            } else { // not IE
	                var link = document.createElement('a');
	                var url = window.URL.createObjectURL(blob);
	                link.href = url;
	                link.target = '_self';
	                if (fileName) link.download = fileName;
	                document.body.append(link);
	                link.click();
	                link.remove();
	                window.URL.revokeObjectURL(url);
	            }
	        } catch (e) {
	            console.error(e)
	        }
	    });
	},
	getFileName: function(contentDisposition) {
		var fileName = contentDisposition
	        .split(';')
	        .filter(function(ele) {
	            return ele.indexOf('filename') > -1
	        })
	        .map(function(ele) {
	            return ele
	                .replace(/"/g, '')
	                .split('=')[1]
	        });
	    return fileName[0] ? fileName[0] : null;
	},
	
	
	/****** 차트 관련 ********************************************************************/
	matchDataToSeriesOfBasicDateTime: function(data, sample, timestampKey, valueKey, addValues) {
		
		for(var i=0; i<data.length; i++) {
			
			var timestamp = data[i][timestampKey];
            var value = data[i][valueKey];
			
            var data_index = sample.data.findIndex(x => x[0] === timestamp);

            // input sampleSeries Y Data
            
            // 기존 
            //if(data_index > -1) {
            //    sample.data[data_index][1] = value;
            //}
            
            // 변경 : cms_0600의 경우 단순 매칭이 아닌 이전 값과 더하여야 함
            if(data_index > -1) {
                if(sample.data[data_index][1]) {
                	sample.data[data_index][1] = sample.data[data_index][1] + value;
    			} else {
    				sample.data[data_index][1] = value;
    			}
            }
            
            // 번외임 
            // 추가 적으로 input 할 values 
            if(addValues) {
            	for(var j=0; j<addValues.length; j++) {
            		var arr = addValues;
            		var e = addValues[j];
            		
            		// 추가 할 data의 value값 key
            		var key = e.key;
            		
            		// series에 추가 할 alias name
            		var alias = e.alias;
            		
            		// 추가 할 type 
            		var type = e.type;
            		
            		if(type === 'array') {
            			if(!sample[alias]) {
                			sample[alias] = [];
                		}
            			sample[alias].push(data[i][key]);
            		}
            		
            		if(type === 'object') {
            			if(!sample[alias]) {
                			sample[alias] = {};
                		}
            			
            			if(!sample[alias][data[i][key]]) {
            				sample[alias][ data[i][key] ] = [];
            			}
            			
            			sample[alias][data[i][key]].push({
            				code: data[i].CODE,
            				gr_code: data[i].GR_CD,
            				cnt: data[i].OCCUR_CNT,
            				timestamp: data[i].TIMESTAMP_UTC,
            			});
            		}
            		
            	}
            }
            
        }
		return sample;
	},
	
	
	/****** 데이터 변환 ******************************************************************/
	convertData: {
		/* PLAN DETAIL, MODIFY - DB 조회 데이터 변환 */
		PLAN: function(obj) {
			
			var data = Object.assign({}, obj);
			
			// ITEM
//			data.ITEM_SCHED_ID_LIST = data.ITEM_SCHED_ID_LIST.split(' | '); 
//			data.ITEM_SCHED_TP_LIST = data.ITEM_SCHED_TP_LIST.split(' | ');
//			
//			data.ITEM_ID_LIST = data.ITEM_ID_LIST.split(' | ');
//			data.ITEM_NM_LIST = data.ITEM_NM_LIST.split(' | ');
//			data.ITEM_STATUS_LIST = data.ITEM_STATUS_LIST.split(' | '); 
//			
//			data.ITEM_CATEGORY_LIST = data.ITEM_CATEGORY_LIST.split(' | ');
//			data.ITEM_COST_LIST = data.ITEM_COST_LIST.split(' | ');
//			
//			data.ITEM_START_TIME_LIST = data.ITEM_START_TIME_LIST.split(' | ');
//			data.ITEM_END_TIME_LIST = data.ITEM_END_TIME_LIST.split(' | ');
			
			data.ITEM_SCHED_ID_LIST = data.ITEM_SCHED_ID_LIST ? data.ITEM_SCHED_ID_LIST.split(' | ') : []; 
			data.ITEM_SCHED_TP_LIST = data.ITEM_SCHED_TP_LIST ? data.ITEM_SCHED_TP_LIST.split(' | ') : [];
			
			data.ITEM_ID_LIST = data.ITEM_ID_LIST ? data.ITEM_ID_LIST.split(' | ') : [];
			data.ITEM_NM_LIST = data.ITEM_NM_LIST ? data.ITEM_NM_LIST.split(' | ') : [];
			data.ITEM_STATUS_LIST = data.ITEM_STATUS_LIST ? data.ITEM_STATUS_LIST.split(' | ') : []; 
			
			data.ITEM_CATEGORY_LIST = data.ITEM_CATEGORY_LIST ? data.ITEM_CATEGORY_LIST.split(' | ') : [];
			data.ITEM_COST_LIST = data.ITEM_COST_LIST ? data.ITEM_COST_LIST.split(' | ') : [];
			data.ITEM_CODE_LIST = data.ITEM_CODE_LIST ? data.ITEM_CODE_LIST.split(' | ') : [];
			
			data.ITEM_START_TIME_LIST = data.ITEM_START_TIME_LIST ? data.ITEM_START_TIME_LIST.split(' | ') : [];
			data.ITEM_END_TIME_LIST = data.ITEM_END_TIME_LIST ? data.ITEM_END_TIME_LIST.split(' | ') : [];
			
			
			// data 변경
			var ITEM_LIST = data.ITEM_SCHED_TP_LIST.reduce((acc, e, i) => {
				// 배열 
//				if(!acc['PART_LIST']) acc['PART_LIST'] = [];
//				if(!acc['TOOL_LIST']) acc['TOOL_LIST'] = [];
//				if(!acc['PPE_LIST']) acc['PPE_LIST'] = [];
				// DATA 생성 
				if(acc[e+'_LIST']) acc[e+'_LIST'].push({
					SCHED_ID: data.ITEM_SCHED_ID_LIST[i],
					TYPE: data.ITEM_SCHED_TP_LIST[i],
					ITEM_ID: data.ITEM_ID_LIST[i],
					ITEM_NM: data.ITEM_NM_LIST[i],
					STATUS: data.ITEM_STATUS_LIST[i],
					CATEGORY: data.ITEM_CATEGORY_LIST[i],
					COST: data.ITEM_COST_LIST[i],
					CODE: data.ITEM_CODE_LIST[i],
					START_TIME: data.ITEM_START_TIME_LIST[i],
					END_TIME: data.ITEM_END_TIME_LIST[i],
					START_TIME_UTC: moment.tz(data.ITEM_START_TIME_LIST[i], _CLIENT.CLIENT_ACCESS_TIMEZONE).tz('UTC').format('YYYY-MM-DD HH:mm:ss'),
					END_TIME_UTC: moment.tz(data.ITEM_END_TIME_LIST[i], _CLIENT.CLIENT_ACCESS_TIMEZONE).tz('UTC').format('YYYY-MM-DD HH:mm:ss'),
				});
				return acc;
			}, {PART_LIST: [], TOOL_LIST: [], PPE_LIST: []});
			data = Object.assign(data, ITEM_LIST);
			
			delete data.ITEM_SCHED_ID_LIST;
			delete data.ITEM_SCHED_TP_LIST;
			delete data.ITEM_ID_LIST;
			delete data.ITEM_NM_LIST;
			delete data.ITEM_STATUS_LIST;
			delete data.ITEM_CATEGORY_LIST;
			delete data.ITEM_COST_LIST;
			delete data.ITEM_CODE_LIST;
			delete data.ITEM_START_TIME_LIST;
			delete data.ITEM_END_TIME_LIST;
			
			
			// WORK
			data.WORK_SCHED_ID_LIST = data.WORK_SCHED_ID_LIST.split(' | ');
			data.WORK_SCHED_TP_LIST = data.WORK_SCHED_TP_LIST.split(' | ');
			
			data.WORK_TITLE_LIST = data.WORK_TITLE_LIST.split(' | ');
			data.WORK_DETAIL_LIST = data.WORK_DETAIL_LIST.split(' | ');
			data.WORK_COST_LIST = data.WORK_COST_LIST.split(' | ');
			
			data.WORK_START_TIME_LIST = data.WORK_START_TIME_LIST.split(' | ');
			data.WORK_END_TIME_LIST = data.WORK_END_TIME_LIST.split(' | ');
			
			// WORKER
			data.WORKER_UID_LIST_LIST = data.WORKER_UID_LIST_LIST.split(' | ').map((e) => e.split(' || '));
			data.WORKER_ID_LIST_LIST = data.WORKER_ID_LIST_LIST.split(' | ').map((e) => e.split(' || '));
			data.WORKER_NM_LIST_LIST = data.WORKER_NM_LIST_LIST.split(' | ').map((e) => e.split(' || '));
			data.WORKER_COMPANY_ID_LIST_LIST = data.WORKER_COMPANY_ID_LIST_LIST.split(' | ').map((e) => e.split(' || '));
			data.WORKER_COMPANY_NM_LIST_LIST = data.WORKER_COMPANY_NM_LIST_LIST.split(' | ').map((e) => e.split(' || '));
			
			// data 변경
			data.WORK_LIST = data.WORK_SCHED_ID_LIST.reduce((acc, e, i) => {
				acc.push({
					SCHED_ID: data.WORK_SCHED_ID_LIST[i],
					TYPE: data.WORK_SCHED_TP_LIST[i],
					WORK_TITLE: data.WORK_TITLE_LIST[i],
					WORK_DETAIL: data.WORK_DETAIL_LIST[i],
					WORK_COST: data.WORK_COST_LIST[i],
					START_TIME: data.WORK_START_TIME_LIST[i],
					END_TIME: data.WORK_END_TIME_LIST[i],
					START_TIME_UTC: moment.tz(data.WORK_START_TIME_LIST[i], _CLIENT.CLIENT_ACCESS_TIMEZONE).tz('UTC').format('YYYY-MM-DD HH:mm:ss'),
					END_TIME_UTC: moment.tz(data.WORK_END_TIME_LIST[i], _CLIENT.CLIENT_ACCESS_TIMEZONE).tz('UTC').format('YYYY-MM-DD HH:mm:ss'),
					
					// 작업자
					WORKER: data.WORKER_UID_LIST_LIST[i].reduce((acc2, e2, i2) => {
						acc2.push({
							USER_UID: data.WORKER_UID_LIST_LIST[i][i2],
							USER_ID: data.WORKER_ID_LIST_LIST[i][i2],
							USER_NM: data.WORKER_NM_LIST_LIST[i][i2],
							COMPANY_ID: data.WORKER_COMPANY_ID_LIST_LIST[i][i2],
							COMPANY_NM: data.WORKER_COMPANY_NM_LIST_LIST[i][i2],
						});
						return acc2;
					}, []), 
				});
				return acc;
			}, []);
			
			delete data.WORK_SCHED_ID_LIST;
			delete data.WORK_SCHED_TP_LIST;
			delete data.WORK_TITLE_LIST;
			delete data.WORK_DETAIL_LIST;
			delete data.WORK_COST_LIST;
			delete data.WORK_START_TIME_LIST;
			delete data.WORK_END_TIME_LIST;
			delete data.WORKER_UID_LIST_LIST;
			delete data.WORKER_ID_LIST_LIST;
			delete data.WORKER_NM_LIST_LIST;
			delete data.WORKER_COMPANY_ID_LIST_LIST;
			delete data.WORKER_COMPANY_NM_LIST_LIST;
			
			return data;
		},
		/* RPT PROC DETAIL, MODIFY - DB 조회 데이터 변환 */
		RPT_PROC: function(obj) {
			
			var data = Object.assign({}, obj);
			
			/* WORKER */
			// WORKER 구분자로 나누기
			data.WORKER_ID_LIST = data.WORKER_ID_LIST.split(' | ');
			data.WORKER_NM_LIST = data.WORKER_NM_LIST.split(' | ');
			// Data 변겅 :
			data.WORKER_LIST = data.WORKER_ID_LIST.map((e, i) => {
				return {WORKER_ID: e, WORKER_NM: data.WORKER_NM_LIST[i]};
			});
			// delete WORKER
			delete data.WORKER_ID_LIST;
			delete data.WORKER_NM_LIST;
			/* WORKER */
			
			
			/* PROC FILE */
			// PROC_FILE 구분자로 나누기 + 첨부파일 없을 경우 null 처리 
			data.PROC_FILE_SEQ_LIST = data.PROC_FILE_SEQ_LIST ? data.PROC_FILE_SEQ_LIST.split(' | ') : [];
			// 모든 파일의 정보가 저장되어 있으나 FILE_INFO의 값이 '' 저장 되어 있을 경우 FILE_INFO만 빈 배열이 됨([]) => FILE_INFO 생성 시 undefined.split('\n') 에러 남  
			// 따라서 아예 파일이 저장되있지 않을 경우엔 빈배열([])로 파일은 저장되어있으나 FILE_INFO의 값만 '' 일 경우 공백만 저장된 배열([''])로 리턴 해야한다.
			data.PROC_FILE_INFO_LIST = data.PROC_FILE_INFO_LIST ? data.PROC_FILE_INFO_LIST.split(' | ') : (data.PROC_FILE_SEQ_LIST.length > 0 ? [''] : []);
			data.PROC_FILE_TYPE_LIST = data.PROC_FILE_TYPE_LIST ? data.PROC_FILE_TYPE_LIST.split(' | ') : [];
			data.PROC_FILE_PATH_LIST = data.PROC_FILE_PATH_LIST ? data.PROC_FILE_PATH_LIST.split(' | ') : [];
			data.PROC_FILE_ORIGINAL_NM_LIST = data.PROC_FILE_ORIGINAL_NM_LIST ? data.PROC_FILE_ORIGINAL_NM_LIST.split(' | ') : [];
			data.PROC_FILE_UNIQUE_NM_LIST = data.PROC_FILE_UNIQUE_NM_LIST ? data.PROC_FILE_UNIQUE_NM_LIST.split(' | ') : [];
			data.PROC_FILE_EXTENSION_LIST = data.PROC_FILE_EXTENSION_LIST ? data.PROC_FILE_EXTENSION_LIST.split(' | ') : [];
			data.PROC_FILE_SIZE_LIST = data.PROC_FILE_SIZE_LIST ? data.PROC_FILE_SIZE_LIST.split(' | ') : [];
			
			// Data 변겅 : PROC_FILE을 ISSUE, PURPOSE로 나눔 
			var proc_file_data = data.PROC_FILE_TYPE_LIST.reduce((acc, e, i) => {
				// 파일 정보 추가 
				acc[e + '_FILE_LIST'].push({
					TYPE: e,
					ATCH_FLE_SEQ: data.PROC_FILE_SEQ_LIST[i],
					FILE_INFO: data.PROC_FILE_INFO_LIST[i],
					FILE_TYPE: data.PROC_FILE_TYPE_LIST[i],
					FLE_PATH: data.PROC_FILE_PATH_LIST[i],
					FLE_NM: data.PROC_FILE_ORIGINAL_NM_LIST[i],
					NEW_FLE_NM: data.PROC_FILE_UNIQUE_NM_LIST[i],
					FLE_TP: data.PROC_FILE_EXTENSION_LIST[i],
					FLE_SZ: data.PROC_FILE_SIZE_LIST[i],
				});
				return acc;
			}, {ISSUE_FILE_LIST:[], PURPOSE_FILE_LIST:[]});
			// Data merge
			data = Object.assign(data, proc_file_data);
			
			// delete PROC_FILE
			delete data.PROC_FILE_SEQ_LIST;
			delete data.PROC_FILE_INFO_LIST;
			delete data.PROC_FILE_TYPE_LIST;
			delete data.PROC_FILE_PATH_LIST;
			delete data.PROC_FILE_ORIGINAL_NM_LIST;
			delete data.PROC_FILE_UNIQUE_NM_LIST;
			delete data.PROC_FILE_EXTENSION_LIST;
			delete data.PROC_FILE_SIZE_LIST;
			/* PROC FILE */
			
			
			/* ITEM */
			// ITEM 구분자로 나누기
			data.PART_ID_LIST = data.PART_ID_LIST ? data.PART_ID_LIST.split(' | ') : [];
			data.ITEM_ID_LIST = data.ITEM_ID_LIST ? data.ITEM_ID_LIST.split(' | ') : [];
			data.ITEM_CODE_LIST = data.ITEM_CODE_LIST ? data.ITEM_CODE_LIST.split(' | ') : [];
			data.ITEM_CATEGORY_LIST = data.ITEM_CATEGORY_LIST ? data.ITEM_CATEGORY_LIST.split(' | ') : [];
			data.ITEM_NM_LIST = data.ITEM_NM_LIST ? data.ITEM_NM_LIST.split(' | ') : [];
			data.ITEM_STATE_LIST = data.ITEM_STATE_LIST ? data.ITEM_STATE_LIST.split(' | ') : [];
			data.ITEM_TYPE_LIST = data.ITEM_TYPE_LIST ? data.ITEM_TYPE_LIST.split(' | ') : [];
			
			// Data 변겅 : ITEM을 PART, TOOL, PPE 로 나눔 
			var item_data = data.ITEM_TYPE_LIST.reduce((acc, e, i) => {
				// 파일 정보 추가 
				acc[e + '_LIST'].push({
					TYPE: e,
					PART_ID: data.PART_ID_LIST[i],
					ITEM_ID: data.ITEM_ID_LIST[i],
					CODE: data.ITEM_CODE_LIST[i],
					CATEGORY: data.ITEM_CATEGORY_LIST[i],
					ITEM_NM: data.ITEM_NM_LIST[i],
					STATE: data.ITEM_STATE_LIST[i],
				});
				return acc;
			}, {PART_LIST: [], TOOL_LIST:[], PPE_LIST:[]});
			// Data merge
			data = Object.assign(data, item_data);
			
			// delete ITEM
			delete data.ITEM_ID_LIST;
			delete data.ITEM_CODE_LIST;
			delete data.ITEM_CATEGORY_LIST;
			delete data.ITEM_NM_LIST;
			delete data.ITEM_STATE_LIST;
			delete data.ITEM_TYPE_LIST;
			/* ITEM */
			
			
			/* WORK */
			// WORK 구분자로 나누기 
			data.WORK_PROC_WORK_ID_LIST = data.WORK_PROC_WORK_ID_LIST.split(' | ');
			data.WORK_MAINTEN_CD_LIST = data.WORK_MAINTEN_CD_LIST.split(' | ');
			data.WORK_MAINTEN_CODE_LIST = data.WORK_MAINTEN_CODE_LIST.split(' | ');
			data.WORK_MAINTEN_LEV1_NM_LIST = data.WORK_MAINTEN_LEV1_NM_LIST.split(' | ');
			data.WORK_MAINTEN_LEV2_NM_LIST = data.WORK_MAINTEN_LEV2_NM_LIST.split(' | ');
			data.WORK_DIFFICULTY_LIST = data.WORK_DIFFICULTY_LIST.split(' | ');
			data.WORK_NM_LIST = data.WORK_NM_LIST.split(' | ');
			data.WORK_DETAIL_LIST = data.WORK_DETAIL_LIST.split(' | ');
			data.WORK_START_TIME_LIST = data.WORK_START_TIME_LIST.split(' | ');
			data.WORK_END_TIME_LIST = data.WORK_END_TIME_LIST.split(' | ');
			data.WORK_DOWNTIME_YN_LIST = data.WORK_DOWNTIME_YN_LIST.split(' | ');
			
			/* WORK FILE */
			// WORK_FILE 1depth 구분자로 나누기 
			data.WORK_FILE_SEQ_LIST_LIST = data.WORK_FILE_SEQ_LIST_LIST.split(' | ');
			data.WORK_FILE_INFO_LIST_LIST = data.WORK_FILE_INFO_LIST_LIST.split(' | ');
			data.WORK_FILE_PATH_LIST_LIST = data.WORK_FILE_PATH_LIST_LIST.split(' | ');
			data.WORK_FILE_ORIGINAL_NM_LIST_LIST = data.WORK_FILE_ORIGINAL_NM_LIST_LIST.split(' | ');
			data.WORK_FILE_UNIQUE_NM_LIST_LIST = data.WORK_FILE_UNIQUE_NM_LIST_LIST.split(' | ');
			data.WORK_FILE_EXTENSION_LIST_LIST = data.WORK_FILE_EXTENSION_LIST_LIST.split(' | ');
			data.WORK_FILE_SIZE_LIST_LIST = data.WORK_FILE_SIZE_LIST_LIST.split(' | ');
			
			// Data 변겅 : WORK 
			data.WORK_LIST = data.WORK_PROC_WORK_ID_LIST.map((e, i) => {
				
				// WORK_FILE 2depth 구분자로 나누기 
				var FILE_SEQ_LIST = data.WORK_FILE_SEQ_LIST_LIST[i] ? data.WORK_FILE_SEQ_LIST_LIST[i].split(' || ') : [];
				// 모든 파일의 정보가 저장되어 있으나 FILE_INFO의 값이 '' 저장 되어 있을 경우 FILE_INFO만 빈 배열이 됨([]) => FILE_INFO 생성 시 undefined.split('\n') 에러 남  
				// 따라서 아예 파일이 저장되있지 않을 경우엔 빈배열([])로 파일은 저장되어있으나 FILE_INFO의 값만 '' 일 경우 공백만 저장된 배열([''])로 리턴 해야한다.
				//var FILE_INFO_LIST = data.WORK_FILE_INFO_LIST_LIST[i] ? data.WORK_FILE_INFO_LIST_LIST[i].split(' || ') : [];
				var FILE_INFO_LIST = data.WORK_FILE_INFO_LIST_LIST[i] ? data.WORK_FILE_INFO_LIST_LIST[i].split(' || ') : (FILE_SEQ_LIST.length > 0 ? [''] : []);
				var FILE_PATH_LIST = data.WORK_FILE_PATH_LIST_LIST[i] ? data.WORK_FILE_PATH_LIST_LIST[i].split(' || ') : [];
				var FILE_ORIGINAL_NM_LIST = data.WORK_FILE_ORIGINAL_NM_LIST_LIST[i] ? data.WORK_FILE_ORIGINAL_NM_LIST_LIST[i].split(' || ') : [];
				var FILE_UNIQUE_NM_LIST = data.WORK_FILE_UNIQUE_NM_LIST_LIST[i] ? data.WORK_FILE_UNIQUE_NM_LIST_LIST[i].split(' || ') : [];
				var FILE_EXTENSION_LIST = data.WORK_FILE_EXTENSION_LIST_LIST[i] ? data.WORK_FILE_EXTENSION_LIST_LIST[i].split(' || ') : [];
				var FILE_SIZE_LIST = data.WORK_FILE_SIZE_LIST_LIST[i] ? data.WORK_FILE_SIZE_LIST_LIST[i].split(' || ') : [];
				
				// DATA 변경 : WORK_FILE
				var file_list = FILE_SEQ_LIST.map((e2, i2) => {
					return {
						TYPE: 'WORK',
						ATCH_FLE_SEQ: e2,
						FILE_INFO: FILE_INFO_LIST[i2],
						FLE_PATH: FILE_PATH_LIST[i2],
						FLE_NM: FILE_ORIGINAL_NM_LIST[i2],
						NEW_FLE_NM: FILE_UNIQUE_NM_LIST[i2],
						FLE_TP: FILE_EXTENSION_LIST[i2],
						FLE_SZ: FILE_SIZE_LIST[i2],
					};
				});
				
				return {
					PROC_WORK_ID: e,
					MAINTEN_CD: data.WORK_MAINTEN_CD_LIST[i],
					CODE: data.WORK_MAINTEN_CODE_LIST[i],
					MAINTEN_LEV1_NM: data.WORK_MAINTEN_LEV1_NM_LIST[i],
					MAINTEN_LEV2_NM: data.WORK_MAINTEN_LEV2_NM_LIST[i],
					DIFFICULTY: data.WORK_DIFFICULTY_LIST[i],
					WORK_NM: data.WORK_NM_LIST[i],
					WORK_DETAIL: data.WORK_DETAIL_LIST[i],
					START_TIME: data.WORK_START_TIME_LIST[i],
					END_TIME: data.WORK_END_TIME_LIST[i],
					DOWNTIME_YN: data.WORK_DOWNTIME_YN_LIST[i],
					
					FILE_LIST: file_list,
				};
			});
			
			// delete WORK, WORK_FILE
			delete data.WORK_PROC_WORK_ID_LIST; 
			delete data.WORK_MAINTEN_CD_LIST;
			delete data.WORK_MAINTEN_CODE_LIST; 
			delete data.WORK_MAINTEN_LEV1_NM_LIST;
			delete data.WORK_MAINTEN_LEV2_NM_LIST;
			delete data.WORK_DIFFICULTY_LIST;
			delete data.WORK_NM_LIST;
			delete data.WORK_DETAIL_LIST;
			delete data.WORK_START_TIME_LIST;
			delete data.WORK_END_TIME_LIST;
			delete data.WORK_DOWNTIME_YN_LIST;
			
			delete data.WORK_FILE_SEQ_LIST_LIST;
			delete data.WORK_FILE_INFO_LIST_LIST;
			delete data.WORK_FILE_PATH_LIST_LIST;
			delete data.WORK_FILE_ORIGINAL_NM_LIST_LIST;
			delete data.WORK_FILE_UNIQUE_NM_LIST_LIST;
			delete data.WORK_FILE_EXTENSION_LIST_LIST;
			delete data.WORK_FILE_SIZE_LIST_LIST;
			/* WORK */
			
			return data;
		},
		
		/* RPT_BLD_INSP DETAIL, MODIFY - DB 조회 데이터 변환 */
		RPT_BLD_INSP: function(obj) {
			var data = Object.assign({}, obj);
			
			/* WORKER */
			// WORKER 구분자로 나누기
			data.WORKER_ID_LIST = data.WORKER_ID_LIST.split(' | ');
			data.WORKER_NM_LIST = data.WORKER_NM_LIST.split(' | ');
			// Data 변겅 :
			data.WORKER_LIST = data.WORKER_ID_LIST.map((e, i) => {
				return {WORKER_ID: e, WORKER_NM: data.WORKER_NM_LIST[i]};
			});
			// delete WORKER
			delete data.WORKER_ID_LIST;
			delete data.WORKER_NM_LIST;
			/* WORKER */
			
			/* BLADE */
			data.BLADE_ID_LIST = data.BLADE_ID_LIST.split(' | ');
			data.BLADE_NUM_LIST = data.BLADE_NUM_LIST.split(' | ');
			data.BLADE_SERIAL_NUM_LIST = data.BLADE_SERIAL_NUM_LIST.split(' | ');
			data.BLADE_LENGTH_LIST = data.BLADE_LENGTH_LIST.split(' | ');
			data.BLADE_TYPE_ID_LIST = data.BLADE_TYPE_ID_LIST.split(' | ');
			data.BLADE_TYPE_CD_LIST = data.BLADE_TYPE_CD_LIST.split(' | ');
			data.BLADE_TYPE_DETAIL_LIST = data.BLADE_TYPE_DETAIL_LIST.split(' | ');
			data.BLADE_COLOR_ID_LIST = data.BLADE_COLOR_ID_LIST.split(' | ');
			data.BLADE_COLOR_NM_LIST = data.BLADE_COLOR_NM_LIST.split(' | ');
			data.BLADE_COLOR_HEX_CODE_LIST = data.BLADE_COLOR_HEX_CODE_LIST.split(' | ');
			
			data.BLADE_LIST = data.BLADE_ID_LIST.map((e, i) => {
				return {
					BLADE_ID: e,
					BLADE_NUM: data.BLADE_NUM_LIST[i],
					BLADE_SERIAL_NUM: data.BLADE_SERIAL_NUM_LIST[i],
					BLADE_LENGTH: parseInt(data.BLADE_LENGTH_LIST[i]),
					BLADE_TYPE_ID: data.BLADE_TYPE_ID_LIST[i],
					BLADE_TYPE_CD: data.BLADE_TYPE_CD_LIST[i],
					BLADE_TYPE_DETAIL: data.BLADE_TYPE_DETAIL_LIST[i],
					BLADE_COLOR_ID: data.BLADE_COLOR_ID_LIST[i],
					BLADE_COLOR_NM: data.BLADE_COLOR_NM_LIST[i],
					BLADE_COLOR_HEX_CODE: data.BLADE_COLOR_HEX_CODE_LIST[i],
				}
			});
			
			delete data.BLADE_ID_LIST;
			delete data.BLADE_NUM_LIST;
			delete data.BLADE_SERIAL_NUM_LIST;
			delete data.BLADE_LENGTH_LIST;
			delete data.BLADE_TYPE_ID_LIST;
			delete data.BLADE_TYPE_CD_LIST;
			delete data.BLADE_TYPE_DETAIL_LIST;
			delete data.BLADE_COLOR_ID_LIST;
			delete data.BLADE_COLOR_NM_LIST;
			delete data.BLADE_COLOR_HEX_CODE_LIST;
			/* BLADE */
			
			/* FLIGHT */
			data.FLIGHT_ID_LIST = data.FLIGHT_ID_LIST.split(' | '); 
			data.FLIGHT_START_TIME_LIST = data.FLIGHT_START_TIME_LIST.split(' | ');
			data.FLIGHT_END_TIME_LIST = data.FLIGHT_END_TIME_LIST.split(' | ');
			data.FLIGHT_DOWNTIME_YN_LIST = data.FLIGHT_DOWNTIME_YN_LIST.split(' | ');
			data.FLIGHT_WEATHER_LIST = data.FLIGHT_WEATHER_LIST.split(' | ');
			data.FLIGHT_TEMPERATURE_LIST = data.FLIGHT_TEMPERATURE_LIST.split(' | ');
			data.FLIGHT_HUMIDITY_LIST = data.FLIGHT_HUMIDITY_LIST.split(' | ');
			data.FLIGHT_WIND_SPEED_LIST = data.FLIGHT_WIND_SPEED_LIST.split(' | ');
			data.FLIGHT_RMK_LIST = data.FLIGHT_RMK_LIST.split(' | ');
			
			data.FLIGHT_LIST = data.FLIGHT_ID_LIST.map((e, i) => {
				return {
					FLIGHT_ID: e,
					START_TIME: data.FLIGHT_START_TIME_LIST[i],
					END_TIME: data.FLIGHT_END_TIME_LIST[i],
					DOWNTIME_YN: data.FLIGHT_DOWNTIME_YN_LIST[i],
					WEATHER: data.FLIGHT_WEATHER_LIST[i],
					TEMPERATURE: data.FLIGHT_TEMPERATURE_LIST[i],
					HUMIDITY: data.FLIGHT_TEMPERATURE_LIST[i],
					WIND_SPEED: data.FLIGHT_WIND_SPEED_LIST[i],
					RMK: data.FLIGHT_RMK_LIST[i],
				}
			});
			
			delete data.FLIGHT_ID_LIST;
			delete data.FLIGHT_START_TIME_LIST; 
			delete data.FLIGHT_END_TIME_LIST;
			delete data.FLIGHT_DOWNTIME_YN_LIST;
			delete data.FLIGHT_WEATHER_LIST;
			delete data.FLIGHT_TEMPERATURE_LIST;
			delete data.FLIGHT_HUMIDITY_LIST;
			delete data.FLIGHT_WIND_SPEED_LIST; 
			delete data.FLIGHT_RMK_LIST;
			/* FLIGHT */
			
			/* DAMAGE */
			data.DAMAGE_ID_LIST = data.DAMAGE_ID_LIST.split(' | '); 
			data.DAMAGE_BLD_ID_LIST = data.DAMAGE_BLD_ID_LIST.split(' | ');  
			data.DAMAGE_MAINTEN_CD_LIST = data.DAMAGE_MAINTEN_CD_LIST.split(' | ');
			data.DAMAGE_MAINTEN_CODE_LIST = data.DAMAGE_MAINTEN_CODE_LIST.split(' | ');
			data.DAMAGE_MAINTEN_LEV1_NAME_LIST = data.DAMAGE_MAINTEN_LEV1_NAME_LIST.split(' | ');
			data.DAMAGE_MAINTEN_LEV2_NAME_LIST = data.DAMAGE_MAINTEN_LEV2_NAME_LIST.split(' | ');
			data.DAMAGE_AREA_LIST = data.DAMAGE_AREA_LIST.split(' | ');
			data.DAMAGE_SEVERITY_LIST = data.DAMAGE_SEVERITY_LIST.split(' | ');
			data.DAMAGE_INFO_LIST = data.DAMAGE_INFO_LIST.split(' | ');
			data.DAMAGE_MAINTEN_PLAN_LIST = data.DAMAGE_MAINTEN_PLAN_LIST.split(' | ');
			data.DAMAGE_FROM_R_LIST = data.DAMAGE_FROM_R_LIST.split(' | ');
			data.DAMAGE_FROM_LE_LIST = data.DAMAGE_FROM_LE_LIST.split(' | ');
			data.DAMAGE_HORIZ_LIST = data.DAMAGE_HORIZ_LIST.split(' | ');
			data.DAMAGE_VERTI_LIST = data.DAMAGE_VERTI_LIST.split(' | ');
			
			data.DAMAGE_FILE_SEQ_LIST_LIST = data.DAMAGE_FILE_SEQ_LIST_LIST.split(' | ');
			data.DAMAGE_FILE_INFO_LIST_LIST = data.DAMAGE_FILE_INFO_LIST_LIST.split(' | ');
			data.DAMAGE_FILE_PATH_LIST_LIST = data.DAMAGE_FILE_PATH_LIST_LIST.split(' | ');
			data.DAMAGE_FILE_ORIGINAL_NM_LIST_LIST = data.DAMAGE_FILE_ORIGINAL_NM_LIST_LIST.split(' | ');
			data.DAMAGE_FILE_UNIQUE_NM_LIST_LIST = data.DAMAGE_FILE_UNIQUE_NM_LIST_LIST.split(' | ');
			data.DAMAGE_FILE_EXTENSION_LIST_LIST = data.DAMAGE_FILE_EXTENSION_LIST_LIST.split(' | ');
			data.DAMAGE_FILE_SIZE_LIST_LIST = data.DAMAGE_FILE_SIZE_LIST_LIST.split(' | ');
			
			data.DAMAGE_LIST = data.DAMAGE_ID_LIST.map((e, i) => {
				var FILE_SEQ_LIST = data.DAMAGE_FILE_SEQ_LIST_LIST[i] ? data.DAMAGE_FILE_SEQ_LIST_LIST[i].split(' || ') : []; 
				// || data.DAMAGE_FILE_SEQ_LIST_LIST[i] 안 할 경우, FILE_INFO == '' 일때 []로 들어감 
				var FILE_INFO_LIST = data.DAMAGE_FILE_INFO_LIST_LIST[i] || data.DAMAGE_FILE_SEQ_LIST_LIST[i] ? data.DAMAGE_FILE_INFO_LIST_LIST[i].split(' || ') : [];
				var FILE_PATH_LIST = data.DAMAGE_FILE_PATH_LIST_LIST[i] ? data.DAMAGE_FILE_PATH_LIST_LIST[i].split(' || ') : [];
				var FILE_ORIGINAL_NM_LIST = data.DAMAGE_FILE_ORIGINAL_NM_LIST_LIST[i] ? data.DAMAGE_FILE_ORIGINAL_NM_LIST_LIST[i].split(' || ') : [];
				var FILE_UNIQUE_NM_LIST = data.DAMAGE_FILE_UNIQUE_NM_LIST_LIST[i] ? data.DAMAGE_FILE_UNIQUE_NM_LIST_LIST[i].split(' || ') : [];
				var FILE_EXTENSION_LIST = data.DAMAGE_FILE_EXTENSION_LIST_LIST[i] ? data.DAMAGE_FILE_EXTENSION_LIST_LIST[i].split(' || ') : [];
				var FILE_SIZE_LIST = data.DAMAGE_FILE_SIZE_LIST_LIST[i] ? data.DAMAGE_FILE_SIZE_LIST_LIST[i].split(' || ') : [];
				
				var file_list = FILE_SEQ_LIST.map((e2, i2) => {
					return {
						PROCESS: 'UPDATE',
						TYPE: 'DAMAGE',
						ATCH_FLE_SEQ: e2,
						FILE_INFO: FILE_INFO_LIST[i2],
						FLE_PATH: FILE_PATH_LIST[i2],
						FLE_NM: FILE_ORIGINAL_NM_LIST[i2],
						NEW_FLE_NM: FILE_UNIQUE_NM_LIST[i2],
						FLE_TP: FILE_EXTENSION_LIST[i2],
						FLE_SZ: FILE_SIZE_LIST[i2],
					}
				});
				
				var blade_info = data.BLADE_LIST.filter((e) => e.BLADE_ID === data.DAMAGE_BLD_ID_LIST[i])[0];
				
				return {
					PROCESS: 'UPDATE',
					TYPE: 'DAMAGE',
					DMG_ID: e,
					BLD_ID: data.DAMAGE_BLD_ID_LIST[i],
					BLD_NUM: blade_info.BLADE_NUM,
					MAINTEN_CD: data.DAMAGE_MAINTEN_CD_LIST[i],
					MAINTEN_CODE: data.DAMAGE_MAINTEN_CODE_LIST[i],
					MAINTEN_LEV1_NM: data.DAMAGE_MAINTEN_LEV1_NAME_LIST[i],
					MAINTEN_LEV2_NM: data.DAMAGE_MAINTEN_LEV2_NAME_LIST[i],
					DMG_AREA: data.DAMAGE_AREA_LIST[i],
					DMG_SEVERITY: data.DAMAGE_SEVERITY_LIST[i],
					DMG_INFO: data.DAMAGE_INFO_LIST[i],
					MAINTEN_PLAN: data.DAMAGE_MAINTEN_PLAN_LIST[i],
					FROM_R: parseFloat(data.DAMAGE_FROM_R_LIST[i]),
					FROM_LE: parseFloat(data.DAMAGE_FROM_LE_LIST[i]),
					HORIZ: parseFloat(data.DAMAGE_HORIZ_LIST[i]),
					VERTI: parseFloat(data.DAMAGE_VERTI_LIST[i]),
					DMG_FILE_LIST: file_list,
					BLADE_INFO: blade_info,
				}
			});
			
			// 삭제 
			delete data.DAMAGE_ID_LIST;
			delete data.DAMAGE_BLD_ID_LIST;
			delete data.DAMAGE_MAINTEN_CD_LIST;
			delete data.DAMAGE_MAINTEN_CODE_LIST;
			delete data.DAMAGE_MAINTEN_LEV1_NAME_LIST;
			delete data.DAMAGE_MAINTEN_LEV2_NAME_LIST;
			delete data.DAMAGE_AREA_LIST;
			delete data.DAMAGE_SEVERITY_LIST;
			delete data.DAMAGE_INFO_LIST;
			delete data.DAMAGE_MAINTEN_PLAN_LIST;
			delete data.DAMAGE_FROM_R_LIST;
			delete data.DAMAGE_FROM_LE_LIST;
			delete data.DAMAGE_HORIZ_LIST;
			delete data.DAMAGE_VERTI_LIST;
			                                      
			delete data.DAMAGE_FILE_SEQ_LIST_LIST;
			delete data.DAMAGE_FILE_INFO_LIST_LIST;
			delete data.DAMAGE_FILE_PATH_LIST_LIST;
			delete data.DAMAGE_FILE_ORIGINAL_NM_LIST_LIST;
			delete data.DAMAGE_FILE_UNIQUE_NM_LIST_LIST;
			delete data.DAMAGE_FILE_EXTENSION_LIST_LIST;
			delete data.DAMAGE_FILE_SIZE_LIST_LIST;
			/* DAMAGE */
			
			return data;
		},
		
		/* RPT CHKLST DETAIL, MODIFY - DB 조회 데이터 변환 */
		RPT_CHKLST: function(obj) {
			var data = Object.assign({}, obj);
			
			/* WORKER */
			// WORKER 구분자로 나누기
			data.WORKER_ID_LIST = data.WORKER_ID_LIST.split(' | ');
			data.WORKER_NM_LIST = data.WORKER_NM_LIST.split(' | ');
			// Data 변겅 :
			data.WORKER_LIST = data.WORKER_ID_LIST.map((e, i) => {
				return {WORKER_ID: e, WORKER_NM: data.WORKER_NM_LIST[i]};
			});
			// delete WORKER
			delete data.WORKER_ID_LIST;
			delete data.WORKER_NM_LIST;
			/* WORKER */
			
			/* CHECK LIST */
			// 구분자로 나누기
			data.CHK_TEMP_ID_LIST = data.CHK_TEMP_ID_LIST.split(' | ');
			data.CHK_NO_LIST = data.CHK_NO_LIST.split(' | ');
			data.CHK_ITEM_LIST = data.CHK_ITEM_LIST.split(' | ');
			data.CHK_DETAIL_LIST = data.CHK_DETAIL_LIST.split(' | ');
			data.IS_REMARK_LIST = data.IS_REMARK_LIST.split(' | ');
			data.GROUP_NUM_LIST = data.GROUP_NUM_LIST.split(' | ');
			data.GROUP_CNT_LIST = data.GROUP_CNT_LIST.split(' | ');
			
			data.CHK_LIST = data.CHK_LIST.split(' | ');
			data.RMK_LIST = data.RMK_LIST.split(' | ');
			
			// 데이터 변환
			data.CHECK_LIST = data.CHK_TEMP_ID_LIST.map((e, i) => {
				return {
					CHK_TEMP_ID: e,
					CHK_NO: data.CHK_NO_LIST[i],
					CHK_ITEM: data.CHK_ITEM_LIST[i],
					CHK_DETAIL: data.CHK_DETAIL_LIST[i],
					IS_REMARK: data.IS_REMARK_LIST[i],
					GROUP_NUM: parseInt(data.GROUP_NUM_LIST[i]),
					GROUP_CNT: parseInt(data.GROUP_CNT_LIST[i]),
					CHK: data.CHK_LIST[i],
					RMK: data.RMK_LIST[i],
				};
			});
			
			// 삭제 
			delete data.CHK_TEMP_ID_LIST;
			delete data.CHK_NO_LIST;
			delete data.CHK_ITEM_LIST;
			delete data.CHK_DETAIL_LIST;
			delete data.IS_REMARK_LIST;
			delete data.GROUP_NUM_LIST;
			delete data.GROUP_CNT_LIST;
			
			delete data.CHK_LIST;
			delete data.RMK_LIST;
			/* CHECK LIST */
			
			
			
			
			return data;
		},
	},
}