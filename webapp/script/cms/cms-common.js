var _cms = {
	////////////// [ Server ] ///////////////////////////////////////////////////////////////////////////
	mariaDB : {
		url: function() {
			var num = location.pathname.split('/')[2];
			num = num === 'main' ? 'cms_0100' : num;
			return ctx + '/cms/' + num + '/getData.ajax';	
		},
		ajax: function(url, param) {
			var result;
			$.ajaxSettings.traditional = true;	
			$.ajax({
				url : url,
				type: 'GET',
				async: false,
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
		getData: function(param) {
			return _cms.mariaDB.ajax(_cms.mariaDB.url(), param);
		},
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
			return _cms.mongoDB.ajax(_cms.mongoDB.url + 'getSensor/' + param);
		},
		getSectionalSensorData: function(param) {
			return _cms.mongoDB.ajax(_cms.mongoDB.url + 'getSectionalSensorData/' + param.sdate + '/' + param.edate + '/' + param.power_system_id + '/' + param.list);
		},
		getLatestSensorData: function(param) {
			return _cms.mongoDB.ajax(_cms.mongoDB.url + 'getLatestSensorData/' + param.power_system_id + '/' + param.list);
		},
		getSensorData:function(param) {
			return _cms.mongoDB.ajax(_cms.mongoDB.url + 'getSensorData/' + param.sdate + '/' + param.edate + '/' + param.power_system_id + '/' + param.sensor_id + '/' + param.allow_last_year);
		},
		getSensorDataByFormat:function(param) {
			return _cms.mongoDB.ajax(_cms.mongoDB.url + 'getSensorDataByFormat/' + param.sdate + '/' + param.edate + '/' + param.power_system_id + '/' + param.sensor_id + '/' + param.timezone_offset + '/' + param.format + '/' + param.allow_last_year);
		},
		updateSensor:function(param) {
			return _cms.mongoDB.ajax(_cms.mongoDB.url + 'updateSensor/' + param.sensor_id + '/' + param.field + '/' + param.value);
		}
	},
	
	////////////// [ Function ] ///////////////////////////////////////////////////////////////////////////	
	/*
	 * 		CMS Chart의 Legend(범례) 클릭 시 해당하는 series on/off 
	 * 
	 * 		# NOTICE 
	 * 		1. 사용 시 대상 Element에 chart-id (chart container id), series-id (series id) 속성 추가   
	 */
	clickLegend: function() {
		var chart_id = $(this).attr('chart_id');
		var series_id = $(this).attr('series_id');
		
		var on = $(this).attr('state');
		if(!on || on == 'on') {
			$(this).children('em').css('background', 'none');
			$(this).attr('state', 'off');
			_highchart.hideSeries(chart_id, series_id);
		} else {
			$(this).children('em').css('background', $(this).children('em').css('border-color'));
			$(this).attr('state', 'on');
			_highchart.showSeries(chart_id, series_id);
		}
		
		
		if($(this).attr('minmaxViewSetting') === 'on') {
			var max = _highchart.getPlotLine(chart_id, 'max', 'y').options.value > _highchart.getAxis(chart_id, 'y').dataMax ? _highchart.getPlotLine(chart_id, 'max', 'y').options.value : _highchart.getAxis(chart_id, 'y').dataMax;
			var min = _highchart.getPlotLine(chart_id, 'min', 'y').options.value < _highchart.getAxis(chart_id, 'y').dataMin ? _highchart.getPlotLine(chart_id, 'min', 'y').options.value : _highchart.getAxis(chart_id, 'y').dataMin;
			_highchart.setAxisView(chart_id, min, max, 'y');
		}
	},
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
	convertLastYear: function(last_year, this_year, timezone) {
		
		/*
		 * 		# index_arr
		 * 		현재 년도 == leaf year 일 경우,
		 * 		02/29 00:00:00 ~ 02/29 23:59:59 사이의 Data의 index를 저장 할 배열
		 * 		
		 * 		convert 후, last_year series의 해당 index의 Data를 모두 삭제
		 * 
		 * 		# copy_arr
		 * 		현재 년도 + 1 == leafyear 일 경우,
		 * 		this_year series의 
		 * 		02/29 00:00:00 ~ 02/29 23:59:59 사이의 Data를 null 처리 하여 저장 
		 * 		
		 * 		convert 후, last_year series에 02/29 00:00:00 ~ 02/29 23:59:59 사이의 null 처리 된 Data를 
		 * 		push 한 후, sort   
		 */
		var index_arr = [];	 
		var copy_arr = [];
		
		/* convert */
	    for(var i=0; i<last_year.data.length; i++) {
	        
	        var arr = last_year.data; 
	        var e = last_year.data[i];
	        var m = moment.tz(e[0], timezone);
	        
//	        console.log('-------------------------------------');
//	        console.log(m.format('YYYY-MM-DD HH:mm:ss'), m.valueOf(), e[1]);
//	        
//	        var flag = '';
	        
	        // 현재 년도 + 1 == leafyear 일 경우,
	        if(_moment.isLeafYear(m.get('year')+1)) {
	            var a = moment.tz(m.get('year') + '-03-01 00:00:00', timezone);
	            
//	            if(a.valueOf() === e[0]) {
//	                flag = 'plus';
//	            }
	            
	            var diff = (m.get('month') + 1 >= 3) ? 31536000000 + 86400000 : 31536000000;
	            e[0] = e[0] + diff;
	        } 
	        // 현재 년도 == leaf year 일 경우,
	        else if(_moment.isLeafYear(m.get('year'))) {
	            
	            var a = moment.tz(m.get('year') + '-02-29 00:00:00', timezone);
	            var b = moment.tz(m.get('year') + '-03-01 00:00:00', timezone);
	            if(a.valueOf() <= e[0] && b.valueOf() > e[0]) {
	                index_arr.push(i);
//	                flag = 'minus';
	            }
	            
	            var diff = (m.get('month') + 1 < 3) ? 31536000000 + 86400000: 31536000000;
	            e[0] = e[0] + diff;
	        } else {
	            e[0] = e[0] + 31536000000;
	        }
	        //console.log(moment.tz(e[0], timezone).format('YYYY-MM-DD HH:mm:ss'), moment.tz(e[0], timezone).valueOf(), e[1], flag);
	    }
	    
	    
	    // last_year에서 index_arr에 저장 된 index에 해당하는 02/29 00:00:00 ~ 02/29 23:59:59 사이의 Data를 모두 삭제 
	    last_year.data.splice(index_arr[0], index_arr.length);
	    
	    // this_year series의 02/29 00:00:00 ~ 02/29 23:59:59 사이의 Data를 null 처리 하여 저장 
	    for(var i=0; i<this_year.data.length; i++) {
	        var arr = this_year.data; 
	        var e = this_year.data[i];
	        var m = moment.tz(e[0], timezone);
	        
	        if(_moment.isLeafYear(m.get('year'))) {
	            var a = moment.tz(m.get('year') + '-02-29 00:00:00', timezone);
	            var b = moment.tz(m.get('year') + '-03-01 00:00:00', timezone);
	            if(a.valueOf() <= e[0] && b.valueOf() > e[0]) {
	                copy_arr.push([e[0], null]);
	            }
	        }
	    }
	    
	    // last_year series에 02/29 00:00:00 ~ 02/29 23:59:59 사이의 null 처리 된 Data를 push 한 후, sort
	    last_year.data = last_year.data.concat(copy_arr);
	    last_year.data.sort();
		
		return [last_year, this_year];
	},
	matchDataToSeriesOfTwoDiffYear: function(data, sample, data_timezone, convert_timezone, aliasTimestamp, aliasValue) {
		var lastYear = sample[0].name;
        var thisYear = sample[1].name;
        
        // data parsing
        for(var i=0; i<data.length; i++) {

            var timestamp = data[i][aliasTimestamp];
            var value = data[i][aliasValue];
            
            /*
                UTC 와 Local의 offset이 차이가 날 경우, 
                1월 1일 Error 발생
                
                예를 들어, Asia/Seoul 의 경우 
                Asia/Seoul : 2020-01-01 00:00:00 ~ 2020-01-01 09:00:00 
                UTC : 2019-12-31 15:00:00 ~ 2020-01-01 00:00:00 
                Local의 01-01 9시 전까지는 UTC time의 year가 2019년도로 출력 됨
            */
            var date = moment.tz(timestamp, data_timezone).tz(convert_timezone);      
            var year = date.get('year');
            var month = date.get('month') + 1;

            var index;      // series 배열 index
            var diff;       // 비교 값 millisec
            
            
            // 윤년 계산 
            // 작년 
            if(lastYear === year) {

                index = 0;
                
                var day = _moment.isLeafYear(lastYear) ? 1 : _moment.isLeafYear(thisYear) ? -1 : 365;
                
                switch(day) {
                    case -1:
                        diff = (month < 3) ? 31622400000 : 31536000000;         
                        break;
                    case 365:
                        diff = 31536000000;	                                    
                        break;
                    case 1:
                        diff = (month >= 3) ? 31622400000 : 31536000000;	    
                        break;
                }
            } 
            // 올해 
            else if(thisYear === year) {	
                index = 1; 
                diff = 0;
            }

            // sampleSeries 검색 
            var data_index = sample[index].data.findIndex(x => x[0] === timestamp + diff);

            // input sampleSeries Y Data 
            if(data_index > -1) {
                sample[index].data[data_index][1] = value;
            }
        }
        return sample;
	},
	changeChartFomatSelector: function() {
		onSearch();
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
	downloadChartFile: function() {
		var chart_id = $(this).attr('chart_id');
		var type = $(this).attr('type');
		var filename = $(this).attr('filename');
		
		var from = $('#from_dt').val();
		var to = $('#to_dt').val();
		
		if(from && to) {
			filename = filename + '_' + from + '~' + to;
		}
		_highchart.exportFile(chart_id, type, filename);
	},
	/*
	 * 	
	 */
	excuteFunc: function(callback, ...args){
        var namespace = typeof callback === 'string' ? callback.split('.') : [];
        callback = typeof callback === 'function' ? callback : window;
        //for(var i=0; i<namespace.length; i++) callback = callback[namespace[i]];
        namespace.forEach((e) => callback = callback[e]);
        return typeof callback === 'function' ? callback(...args) : undefined;
    },
	/*
	 * 	type check
	 * 	
	 */
	getType: function(t) {
        return Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
    },
    /*
     * 	combobox change 후 실행되는 callback 함수
     */
	selectCombo: function(callback) {
		
		function executor(arg) {
			switch(_cms.getType(arg)) {
	            case 'function':
	                arg();
	                break;
	            case 'string':
	                _cms.excuteFunc(arg);
	                break;
	            case 'array':
	                arg.forEach((e) => {
	                    var type = _cms.getType(e);
	                    type === 'function' ? e() : (type === 'string' ? _cms.excuteFunc(e) : undefined);
	                });
	                break;
	        }
		}
		
		function log() {
			var functions = arguments[0];
			var msg = '[' + arguments[1] + '] : ';
			if(functions) {
				switch(_cms.getType(functions)) {
					case 'function':
						msg = msg + functions.name;
		                break;
		            case 'string':
		            	msg = msg + functions;
		                break;
		            case 'array':
		            	var list = functions.map((e) => {
		                    var type = _cms.getType(e);
		                    return type === 'function' ? e.name : (type === 'string' ? e : undefined);
		                });
		            	msg = msg + list.join(', ');
		                break;
				}
			}
			console.log(msg);
		}
		
//		var farm_id = $('ul.select-machine.farm').attr('FARM_ID');
//		var farm_nm = $('ul.select-machine.farm li.active').text();
//		var group_id = $('ul.select-machine.group').attr('GROUP_ID');
//		var group_nm = $('ul.select-machine.group li.active').text();
//		var turbine_id = $('ul.select-machine.turbine').attr('GERATOR_ID');
//		var turbine_nm = $('ul.select-machine.turbine li.active').text();
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
}