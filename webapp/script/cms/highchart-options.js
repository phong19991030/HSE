
/*
 		    # NOTE
 		    
 		    * High Chart Date format 
 		    - %a: Short weekday, like 'Mon'.
		    - %A: Long weekday, like 'Monday'.
		    - %d: Two digit day of the month, 01 to 31.
		    - %e: Day of the month, 1 through 31.
		    - %b: Short month, like 'Jan'.
		    - %B: Long month, like 'January'.
		    - %m: Two digit month number, 01 through 12.
		    - %y: Two digits year, like 09 for 2009.
		    - %Y: Four digits year, like 2009.
		    - %H: Two digits hours in 24h format, 00 through 23.
		    - %I: Two digits hours in 12h format, 00 through 11.
		    - %l (Lower case L): Hours in 12h format, 1 through 11.
		    - %M: Two digits minutes, 00 through 59.
		    - %p: Upper case AM or PM.
		    - %P: Lower case AM or PM.
		    - %S: Two digits seconds, 00 through 59
 */
var _highchartOptions = {
	common : function(timezone) {
		var options = {
			colors: ['#89898b', '#486dfb'],
			time: {
		        timezone: timezone,
		        //useUTC: false
		    },
		    chart: {
	            //type: 'areaspline',
				type: 'spline',
	            zoomType: 'x',			// x, y, xy
	            panning: true,			// 차트 이동
	            panKey: 'shift',		// 이동 키
	            //width: param.chart_width
			},
			title: {
				text: null
			},
			yAxis: {
		        //max: 100,
		        //min: 0,
				title: {
					text: null
				}
			},
			xAxis: {
				type: 'datetime',
				dateTimeLabelFormats: {
			        //second: '%Y-%m-%d<br/>%H:%M:%S',
					second: '%H:%M:%S',
			        //minute: '%Y-%m-%d<br/>%H:%M',
			        minute: '%H:%M',
			        //hour: '%Y-%m-%d<br/>%H:%M',
			        hour: '%H:%M',
			        day: '%Y<br/>%m-%d',
			        week: '%Y<br/>%m-%d',
			        month: '%Y-%m',
			        year: '%Y'
			    }
			},
			plotOptions: {
		        series: {
		            cursor: 'pointer',
		        }
		    },
			// 오른쪽 상단 navigation 버튼 사용 여부
			navigation: {
		        buttonOptions: {
		            enabled: true
		        }
		    },
		    // 아래 네비게이터 사용 옵션
	        navigator: {
	            enabled: false
	        },
//	        legend: {
//		        enabled: false
//		    },
		    series: null,
			exporting: {
				//showTable: true				// chart data table로 표시
	            //filename: 'custom-file-name',	// filename
	            width: 1000,
	            height: 500,
//	            sourceWidth: 1000,				// download 크기 설정 
//	            sourceHeight: 500,
	            chartOptions: {		
	                plotOptions: {
	                    series: {
	                        dataLabels: {
	                            enabled: true	// download시 value label 표시
	                        }
	                    }
	                }
	            },
	            // getCSV() 시 datatime format
	            csv: {	
	                dateFormat: '%Y-%m-%d'
	            }
	        	
	        },
		}
		return options;
	},
	cms_0100 : {
		container1: function(param) {
			
			var timezone = param.timezone;
			var common = _highchartOptions.common(timezone);
			
			var addOptions = {
//				xAxis: {
//					//tickPositions: tickPositions,
//					labels: {
//						fomatter: function() {
//							var mm = moment(this.value).tz(timezone);
//							var m = mm.get('month') + 1;
//							return m;
//						}
//					}
//				},
				tooltip: {
					formatter: function() {
						var mm = moment(this.x).tz(timezone);
						var y = this.series.name;
						var m = mm.get('month') + 1;
					    var d = mm.get('date');
					    var value = this.y;
					    return y + '-' + m + '-' + d + ' : ' + value + ' %';
					}
				}
			};
			
			return _highchart.mergeOptions(common, addOptions); 
		},
		container2: function(param) {
			var timezone = param.timezone;
			var common = _highchartOptions.common(timezone);
			
			var addOptions = {
//				xAxis: {
//					//tickPositions: tickPositions,
//					labels: {
//						fomatter: function() {
//							var mm = moment(this.value).tz(timezone);
//							var m = mm.get('month') + 1;
//							return m;
//						}
//					},
//					//dateTimeLabelFormats: null,
//				},
				tooltip: {
					formatter: function() {
						var mm = moment(this.x).tz(timezone);
						var y = this.series.name;
						var m = mm.get('month') + 1;
					    var d = mm.get('date');
					    var value = this.y;
					    return y + '-' + m + '-' + d + ' : ' + value + ' MW';
					}
				}
			};
			return _highchart.mergeOptions(common, addOptions); 
		},
	},
	cms_0300 : {
		/* main chart */
		container1: function(param, callback) {
			
			//max, min, timezone, callback
			var timezone = param.timezone;
			var max = param.sensor_max;
			var min = param.sensor_min;
			var format;
			
			switch(param.format) {
				case 'year':
					//format = '%Y';
					format = ' ';
					break;
				case 'month':
					//format = '%m';
					format = '%B';
					break;
				case 'day':
//					format = '%m-%d %H:%M:%S';
					format = '%m-%d';
					break;
				case 'hour':
					format = '%m-%dT%H:%M:%S';
					break;
				case 'min':
					format = '%m-%dT%H:%M:%S';
					break;
				case 'sec':
					format = '%m-%dT%H:%M:%S';
					break;
			}
			
			
			var common = _highchartOptions.common(timezone);
			var options = {
				
				yAxis: {
					//max: max, 
					//min: min,
					//tickInterval: 1,
					startOnTick: true,
					labels: {
			            format: '{value} ' + param.sensor_unit
			        },
					plotLines: [
						{
							label: {
								text: 'max : ' + max
							},
							id: 'max',
							color: '#FF0000',
					        width: 2,
					        value: max,
					        zIndex: 5
					        
						},
						{
							label: {
								text: 'min : ' + min
							},
							id: 'min',
							color: '#FF0000',
					        width: 2,
					        value: min,
					        zIndex: 5
						}
					]
				},
				plotOptions: {
			        series: {
			            cursor: 'pointer',
			            events: {
			                click: function (event) {
			                	//console.log(event.point.x);
			                	//console.log(event.point.y);
			                	
			                	var type;
			                	var next_type;
			                	switch(param.format) {
				                	case 'year':
				                		type = 'year';
				                		next_type = 'month';
				    					break;
				    				case 'month':
				    					type = 'month';
				    					next_type = 'day';
				    					break;
				    				case 'day':
				    					type = 'date';
				    					next_type = 'sec';
				    					break;
				    				case 'hour':
				    					type = 'hour';
				    					break;
				    				case 'min':
				    					type = 'minute';
				    					break;
				    				case 'sec':
				    					type = 'second';
				    					break;
			                	}
			                	
			                	// next type으로 selector value 변경  
			                	$('#chartFormatSelector option[value=' + next_type + ']').prop('selected', true);
			                	$('#chartFormatSelector').siblings('label').text($('#chartFormatSelector option[value=' + next_type + ']').text());
			                	
			                	
			                	var m = moment.tz(event.point.x, 'UTC');
			                	var from = m.format('YYYY-MM-DD HH:mm:ss');
			                	var to = m.set(type, m.get(type) + 1).format('YYYY-MM-DD HH:mm:ss');
			                	$('#from_dt').val(moment.tz(from, 'UTC').tz(timezone).format('YYYY-MM-DD HH:mm:ss'));
			                	$('#to_dt').val(moment.tz(to, 'UTC').tz(timezone).format('YYYY-MM-DD HH:mm:ss'));
			                	
//			                	var from = m.clone();
//			                	var to = m.set('date', m.get('date') + 1);
			                	
			                	//console.log(sdate);
			                	//console.log(edate);
			                	
			                	callback();
			                	//callback(from, to);
			                }
			            }
			        }
			    },
			    tooltip: {
//						formatter: function() {
//							var mm = moment(this.x).tz(client_access_timezone);
//							var y = this.series.name;
//							var m = (mm.get('month')+1).toString().length == 1 ? '0' + (mm.get('month') + 1) : (mm.get('month') + 1);
//						    var d = mm.get('date').toString().length == 1 ? '0' + mm.get('date') : mm.get('date');
//						    
//						    var hour = mm.get('hour').toString().length == 1 ? '0' + mm.get('hour') : mm.get('hour');
//						    var min = mm.get('minute').toString().length == 1 ? '0' + mm.get('minute') : mm.get('minute');
//						    var sec = mm.get('second').toString().length == 1 ? '0' + mm.get('second') : mm.get('second');
//						    
//						    var value = this.y;
//						    
//							return y + '-' + m + '-' + d + ' ' + hour + ':' + min + ':' + sec + ' : ' + value;
//						}
					xDateFormat: format, 		//'%Y-%m-%d %H:%M:%S'
					formatter: function (tooltip) {
						if (this.point.isNull) {
	                        return 'Null';
	                    }
	                    var year = moment.tz(this.x, timezone).get('year');
	                    year = this.series.index == 0 ? year-1 : year;
	                    
	                    var default_msg = tooltip.defaultFormatter.call(this, tooltip);
	                    // 이름 수정
	                    default_msg[1] = default_msg[1].replace(this.series.name+':', year+':');
	                    // 단위 수정 
//	                    default_msg[1] = default_msg[1].replace('</b>', ' ' + param.sensor_unit +'</b>');
//	                    console.log(default_msg);
	                    return default_msg;
	                },
	                valueSuffix: ' ' + param.sensor_unit
			    },
			}
			
			options = _highchart.mergeOptions(common, options);
			if(!callback) options = _highchart.mergeOptions(options, {plotOptions: {series: null}});
			
			return options;
		},
		
		/* compare chart */
		container2: function(param, callback) {
			var common = _highchartOptions.common(param.timezone);
			var addOptions = { 
				colors: ['#486dfb', '#CC594B', '#4DA067', '#F7CF5F', '#EA5173', '#89898b'],
				tooltip: {
					xDateFormat: '%Y-%m-%d %H:%M:%S',
			        valueSuffix: ' ' + param.sensor_unit
				},
				yAxis: {
					labels: {
			            format: '{value} ' + param.sensor_unit
			        },
				}
			};
			return _highchart.mergeOptions(common, addOptions); 
		},
	},
	cms_0400: {
		container1: function(param) {
			var timezone = param.timezone;
			var common = _highchartOptions.common(timezone);
			
			switch(param.format) {
				case 'year':
					//format = '%Y';
					format = ' ';
					break;
				case 'month':
					//format = '%m';
					format = '%B';
					break;
				case 'day':
//					format = '%m-%d %H:%M:%S';
					format = '%m-%d';
					break;
				case 'hour':
					format = '%m-%d %H:%M:%S';
					break;
				case 'min':
					format = '%m-%d %H:%M:%S';
					break;
				case 'sec':
					format = '%m-%d %H:%M:%S';
					break;
			}
			
			var addOptions = {
				chart: {
					//type: 'column'
				},
				tooltip: {
					xDateFormat: format, 		//'%Y-%m-%d %H:%M:%S'
					formatter: function (tooltip) {
					    if (this.point.isNull) {
	                        return 'Null';
	                    }
	                    var year = moment.tz(this.x, timezone).get('year');
	                    year = this.series.index == 0 ? year-1 : year;
	                    
	                    var default_msg = tooltip.defaultFormatter.call(this, tooltip);
	                    default_msg[1] = default_msg[1].replace(this.series.name+':', year+':');
	                    return default_msg;
		            },
				    valueSuffix: ' %'
				},
				yAxis: {
					labels: {
			            format: '{value} %'
			        },
				},
//				xAxis: {
//					dateTimeLabelFormats: {
//				        //second: '%Y-%m-%d<br/>%H:%M:%S',
//						second: '%H:%M:%S',
//				        //minute: '%Y-%m-%d<br/>%H:%M',
//				        minute: '%H:%M',
//				        //hour: '%Y-%m-%d<br/>%H:%M',
//				        hour: '%H:%M',
//				        day: '%m.%d',
//				        week: '%m.%d',
//				        month: '%m',
//				        year: '%Y'
//				    }
//				}
			}
			return _highchart.mergeOptions(common, addOptions); 
		}
	},
	cms_0500: {
		container1: function(param) {
			return _highchartOptions.cms_0400.container1(param);
		}
	},
	cms_0600: {
		container1: function(param) {
			var timezone = param.timezone;
			var common = _highchartOptions.common(timezone);
			
			var format;
			var moment_format;
			switch(param.format) {
				case 'year':
					//format = '%Y';
					format = ' ';
					moment_format = 'YYYY';
					break;
				case 'month':
					//format = '%m';
					format = '%B';
					moment_format = 'YYYY-MM';
					break;
				case 'day':
//					format = '%m-%d %H:%M:%S';
					format = '%m-%d';
					moment_format = 'YYYY-MM-DD';
					break;
				case 'hour':
					format = '%m-%d %H:%M:%S';
					break;
				case 'min':
					format = '%m-%d %H:%M:%S';
					break;
				case 'sec':
					format = '%m-%d %H:%M:%S';
					break;
			}
			
			var addOptions = {
				chart: {
					type: 'column'
				},
				tooltip: {
					xDateFormat: format, 		//'%Y-%m-%d %H:%M:%S'
					formatter: function (tooltip) {
					    if (this.point.isNull) {
	                        return 'Null';
	                    }
	                    
					    var m = moment.tz(this.x, timezone);
					    
					    // tooltip year 변경
					    var year = m.get('year');
	                    year = this.series.index === 0 ? year-1 : year;
	                    var default_msg = tooltip.defaultFormatter.call(this, tooltip);
	                    default_msg[1] = default_msg[1].replace(this.series.name+':', year+':');
	                    
	                    var diff = 0;
	                    if(this.series.index === 0) {
	                    	if(_moment.isLeafYear(m.get('year'))) {
	                    		diff = (m.get('month') + 1 >= 3) ? 31536000000 + 86400000 : 31536000000;
		                    } 
		                    else if(_moment.isLeafYear(m.get('year')-1)) {
		                    	diff = (m.get('month') + 1 < 3) ? 31536000000 + 86400000: 31536000000;
		                    }
	                    }
	                    
	                    
 	                    
	                    /* 추가 */
	                    var arr = this.series.options.occur_point[this.x - diff];
	                    
	                    var msg = '';
			            msg += default_msg[0];		// category name
			            msg += default_msg[1];		// series name, value
			            msg += '<br/><p>       </p><br/>';
			            
			            for(var i=0; i<arr.length; i++) {
			            	var date = moment.tz(arr[i].timestamp, timezone).format(moment_format);
			            	var code = arr[i].gr_code + '-' + arr[i].code + ' (' + arr[i].cnt + ' Case)';
			            	msg += '<b style="color:#000000">' + (i+1) + '.</b>  <span>' + date + '</span> : <b>' + code + '</b> <br/>';
			            }
			            /* 추가 */
	                    
	                    return msg;
		            },
				    valueSuffix: ' Case'
				},
//					xAxis: {
//						dateTimeLabelFormats: {
//					        //second: '%Y-%m-%d<br/>%H:%M:%S',
//							second: '%H:%M:%S',
//					        //minute: '%Y-%m-%d<br/>%H:%M',
//					        minute: '%H:%M',
//					        //hour: '%Y-%m-%d<br/>%H:%M',
//					        hour: '%H:%M',
//					        day: '%m.%d',
//					        week: '%m.%d',
//					        month: '%m',
//					        year: '%Y'
//					    }
//					}
				yAxis: {
					allowDecimals: false, // y축 소수점 비허용
					labels: {
						format: '{value} Case'
					}
				}
			}
			return _highchart.mergeOptions(common, addOptions); 
		}
	},
	cms_0700: {
		container1: function(param) {
			var timezone = param.timezone;
			var common = _highchartOptions.common(timezone);
			
			var format;
			switch(param.format) {
				case 'year':
					format = 'YYYY';
					break;
				case 'month':
					format = 'YYYY-MM';
					break;
				case 'day':
					format = 'YYYY-MM-DD';
					break;
			}
			
			var addOptions = {
				chart: {
					type: 'column'
				},
				tooltip: {
					valueSuffix: ' Case',
					formatter: function (tooltip) {
						
			            if (this.point.isNull) {
			                return 'Null';
			            }
			            
			            var default_msg = tooltip.defaultFormatter.call(this, tooltip);
			            
			            var index = this.point.index;						// series point index
			            var arr = this.series.options.occur_point[index];	// 
			            
			            var msg = '';
			            msg += default_msg[0];		// category name
			            msg += default_msg[1];		// series name, value
			            msg += '<br/><p>       </p><br/>';
			            
			            
			            for(var i=0; i<arr.length; i++) {
			            	var date = moment.tz(arr[i].timestamp, timezone).format(format);
			            	var code = arr[i].lev2_name + ' (' + arr[i].cnt + ' Case)';
			            	msg += '<b style="color:#000000">' + (i+1) + '.</b>  <span>' + date + '</span> : <b>' + code + '</b> <br/>';
			            }
			            
			            return msg;
			        }
				},
				xAxis: {
					type: 'linear',
					categories: null,
					labels: {
		                x: -10
		            }
				},
				yAxis: {
					allowDecimals: false, // y축 소수점 비허용
					labels: {
						format: '{value} Case'
					}
				},
				plotOptions: {
					series: {
						borderWidth: 0,
			            dataLabels: {
			                enabled: true,
			                //	dataLabels의 색상을 series의 색상과 일치 
			                format: '<span style="color:{point.color};">{point.y}</span>',
		                    //color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
		                    //softConnector: true
			                
			                //color: '#506CF3',
			                //color: '{point.color}',
			                //format: '{point.y}'
			            },
					}
				},
				
			}
			
			return _highchart.mergeOptions(common, addOptions); 
		}
	},
	cms_0900: {
		a: function(param) {
			var timezone = param.timezone;
			var common = _highchartOptions.common(timezone);
			
			var format = 'YYYY-MM-DD HH:mm:ss';
			
//			switch(param.format) {
//				case 'year':
//					format = 'YYYY';
//					break;
//				case 'month':
//					format = 'YYYY-MM';
//					break;
//				case 'day':
//					format = 'YYYY-MM-DD';
//					break;
//			}
			
			var addOptions = {
				chart: {
					type: 'column'
				},
				tooltip: {
					valueSuffix: ' Failure',
					formatter: function (tooltip) {
						
			            if (this.point.isNull) {
			                return 'Null';
			            }
			            
			            var default_msg = tooltip.defaultFormatter.call(this, tooltip);
			            
			            var index = this.point.index;						// series point index
			            var arr = this.series.options.occur_point[index];	// 
			            
			            var msg = '';
			            msg += default_msg[0];		// category name
			            msg += default_msg[1];		// series name, value
			            msg += '<br/><p>       </p><br/>';
			            
			            
			            for(var i=0; i<arr.length; i++) {
			            	var date = moment.tz(arr[i].timestamp_set, timezone).format(format);
			            	//var code = arr[i].name + ' (' + arr[i].cnt + ' Failure)';
			            	var code = arr[i].name;
			            	msg += '<b style="color:#000000">' + (i+1) + '.</b>  <span>' + date + '</span> : <b>' + code + '</b> <br/>';
			            }
			            
			            return msg;
			        }
				},
				xAxis: {
					type: 'linear',
					categories: null,
					labels: {
		                x: -10
		            }
				},
				yAxis: {
					allowDecimals: false, // y축 소수점 비허용
				},
				plotOptions: {
					series: {
						borderWidth: 0,
			            dataLabels: {
			                enabled: true,
			                //	dataLabels의 색상을 series의 색상과 일치 
			                format: '<span style="color:{point.color};">{point.y}</span>',
		                    //color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
		                    //softConnector: true
			                
			                //color: '#506CF3',
			                //color: '{point.color}',
			                //format: '{point.y}'
			            },
					}
				},
				
			}
			return _highchart.mergeOptions(common, addOptions); 
		},
		b: function(param) {
			var options = {
				chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: 0, // null
		            plotShadow: false,
		            type: 'pie'
		        },
		        title:{},
		        tooltip: {
		            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        accessibility: {
		            point: {
		                valueSuffix: '%'
		            }
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
//		                    enabled: false,
		                    distance: -50,
		                    style: {
		                        fontWeight: 'bold',
		                        color: 'white'
		                    },
		                    format: '{y} %'
		                },
		                showInLegend: true,
//		                startAngle: -90,
//		                endAngle: 90,
//		                center: ['50%', '75%'],
		                size: '110%'
		            }
		        },
		        series: null
			}
			
			return options;
		},
		c: function(param) {
			var options = {
				chart: {
		            type: 'column'
		        },
		        xAxis: {
		            categories: null
		        },
		        yAxis: {
		            min: 0,
//		            title: {
//		                text: 'Total fruit consumption'
//		            },
		            stackLabels: {
		                enabled: true,
		                style: {
		                    fontWeight: 'bold',
		                    color: ( // theme
		                        Highcharts.defaultOptions.title.style &&
		                        Highcharts.defaultOptions.title.style.color
		                    ) || 'gray'
		                }
		            }
		        },
		        tooltip: {
		            headerFormat: '<b>{point.x}</b><br/>',
		            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
		        },
		        plotOptions: {
		            column: {
		                stacking: 'normal',
		                dataLabels: {
		                    enabled: true
		                }
		            }
		        },
		        series: null
			}
			
			return options;
		}
	},
	/* 보고서 계획 스케줄 - Gantt Chart */
	oam_010203: function(param) {
		var options = {
			time: {
				timezone: param.timezone,
				//useUTC: false
			},
			title: {
				text: null
			},
			xAxix: {
				type: 'datetime',
	            //uniqueNames: true
	            // 현재 일자 표시
	            //currentDateIndicator: true,
				currentDateIndicator: {
	                color: 'red',
	                dashStyle: 'dash', // solid
	                width: 2,
	                label: {
	                    format: 'Now (%Y-%m-%d %H:%M)',
	                    //text: 'tt',
	                    //useHTML: true,
	                    //x: 1,
	                    //y: 150
	                },
	            },
	            max: param.end,
	            min: param.start,
	            dateTimeLabelFormats: {
	                //month: {list:['%B', '%b', '%o']},
	                //week: { list: ['Week %W', 'W%W'] },
	                //day: { list: ['%A, %e. %B', '%a, %e. %b', '%E'] },
	                //hour: { list: ['%H:%M', '%H'] },
	                year: {list:['%Y']},
	                month: {list:['%o']},
	                week: {list:['Week %W', 'W%W']},
	                day: {list:['%d']},
	                hour: {list:['%H:%M']},
	            }
			},
//			yAxis: {
//				categories: ['A', 'B', 'C']
//			},
			tooltip: {
//				formatter: function() {
//					return '<b>'+ this.point.options.state + '</b><br/>' +
//					moment.tz(this.point.options.start, 'Asia/Seoul').format('HH:mm')
//					+ ' ~ ' + 
//					moment.tz(this.point.options.end, 'Asia/Seoul').format('HH:mm');
//				},
//				xDateFormat: '%a %b %d, %H:%M',
//				xDateFormat: '%Y-%m-%d %H:%M',
				// 툴팁 커스텀
				pointFormatter: function() {
					var point = this,
						isChild = this.options.parent ? true : false,
						type = isChild ? this.options.parent : this.options.id,
						data = isChild ? this.options.data : this.options.children,
						format = 'YYYY-MM-DD HH:mm:ss',
						str = '';
					//console.log(isChild, type, data);
					
					if(isChild) {
						if(type === 'WORK') {
							str = ''
							+ '<span><strong>Name : </strong>' + data.WORK_TITLE + '</span><br/>'
							+ '<span><strong>Workers : </strong>' + data.WORKER.map((e) => e.USER_NM).join(', ') + '</span><br/>'
//							+ '<span><strong>Start : </strong>' + moment.tz(data.START_TIME, _CLIENT.CLIENT_ACCESS_TIMEZONE).format(format) + '</span><br/>'
//							+ '<span><strong>End : </strong>' + moment.tz(data.END_TIME, _CLIENT.CLIENT_ACCESS_TIMEZONE).format(format) + '</span><br/>'
							+ '<span><strong>Start : </strong>' + moment.tz(data.START_TIME, param.timezone).format(format) + '</span><br/>'
							+ '<span><strong>End : </strong>' + moment.tz(data.END_TIME, param.timezone).format(format) + '</span><br/>'
							+ '<span><strong>Cost : </strong> ₩' + data.WORK_COST + '/KRW </span><br>'
							+ '<span><strong>Work Detail</strong></span><br>'
							+ '<span>' + data.WORK_DETAIL.split('\n').join('</span><br/>');
						} else {
							str = ''
							+ '<span><strong>Name : </strong>' + data.ITEM_NM + '</span><br/>'
							+ '<span><strong>Category : </strong>' + data.CATEGORY + '</span><br/>'
//							+ '<span><strong>Start : </strong>' + moment.tz(data.START_TIME, _CLIENT.CLIENT_ACCESS_TIMEZONE).format(format) + '</span><br/>'
//							+ '<span><strong>End : </strong>' + moment.tz(data.END_TIME, _CLIENT.CLIENT_ACCESS_TIMEZONE).format(format) + '</span><br/>'
							+ '<span><strong>Start : </strong>' + moment.tz(data.START_TIME, param.timezone).format(format) + '</span><br/>'
							+ '<span><strong>End : </strong>' + moment.tz(data.END_TIME, param.timezone).format(format) + '</span><br/>'
							+ '<span><strong>Cost : </strong> $' + data.COST + '/USD </span><br>';
						}
					} else {
						str = str + '<br/>';
						str = str + data.reduce((acc, e, i, arr) => {
							acc = acc + '<span><strong>' + (i+1) + '. ' + (type === 'WORK' ? e.WORK_TITLE : e.ITEM_NM) + ' : </strong>' 
							+ moment.tz(data.START_TIME, param.timezone).format(format)
							+ ' ~ ' 
							+ moment.tz(data.END_TIME, param.timezone).format(format)
							+ '</span><br/>';
							return acc;
						}, '');
						str = str + '<br/>';
						if(type === 'WORK') str = str + '<span><strong>Total Cost : </strong> ₩' + data.reduce((acc, e) => {return acc + parseFloat(e.WORK_COST)}, 0) + '/KRW </span><br/>';
						else str = str + '<span><strong>Total Cost : </strong> $' + data.reduce((acc, e) => {return acc + parseFloat(e.COST)}, 0) + '/USD </span><br/>';
					}
					return str;
				},
			},
			// 차트 네이밍 
			plotOptions: {
	            series: {
	                animation:false,
	                dataLabels : {
	                    enabled: true,
	                    format: '{point.name}',
	                    style: {
	                        curosr: 'default',
	                        pointerEvents: 'none',
	                    }
	                },
	            }
	        },
	        // 오른쪽 하단 credits 옵션 
	        credits: {
	            enabled: false,
	            //href: 'www.naver.com',
	            //text: 'byWind.co.kr',
//	            position: {
//	            	align: 'right',
//	            	verticalAlign: 'bottom',
//	            	x: -10,
//	            	y: -5
//	            },
//	            style: {
//	            	color: '#999999',
//	            	cursor: 'pointer',
//	            	fontSize: '9px'
//	            }, 
	        },
	        // 네비게이션 옵션
//			navigator: {
//	            enabled: true,
//	            liveRedraw: true,
//	            series: {
//	                type: 'gantt',
//	                pointPlacement: 0.5,
//	                pointPadding: 0.25
//	            },
//	            yAxis: {
//	                min: 0,
//	                max: 3,
//	                reversed: true,
//	                categories: []
//	            }
//	        },
//	        scrollbar: {
//	            enabled: true
//	        },
//	        rangeSelector: {
//	            enabled: true,
//	            selected: 0
//	        },
			series: param.series ? param.series : [],
		};
		return options;
	},
	oam_0501: function(param) {
		
		var options = {
			
			time: {
				timezone: param.timezone,
				//useUTC:false,
			},
			chart: {
				type: 'spline',		// 차트 형태 (areaspline)		
				zoomType: 'x',		// 차트 이동 방향, x, y, xy
				panning: true,		// 차트 이동 여부
				panKey: 'shift', 	// 이동키 
				//width: 
				//height:
				resetZoomButton: {
					position:{
						align: 'left',
						verticalAlign: 'top',
						x:-10,
						y:10,
					},
					//relativeTo: 'chart',
				},
				// 차트 마진 - plotline text 때매 
				marginTop: 20,
			},
			// 타이틀 표시 X
			title: {
				text: null
			},
			xAxis: {
				type: 'datetime',
				/* datetime 일 경우, x축 라벨 포맷 */
				dateTimeLabelFormats: {
			        //second: '%Y-%m-%d<br/>%H:%M:%S',
					second: '%H:%M:%S',
			        //minute: '%Y-%m-%d<br/>%H:%M',
			        minute: '%H:%M',
			        //hour: '%Y-%m-%d<br/>%H:%M',
			        hour: '%H:%M',
			        day: '%Y<br/>%m-%d',
			        week: '%Y<br/>%m-%d',
			        month: '%Y-%m',
			        year: '%Y'
			    },
			    plotLines: [
//			    	{
//			    		label: {
//			    			text: 'Ocuurence',
//			    			align: 'vertical',
//			                verticalAlign: 'top',
//			                textAlign: 'center',
//			                rotation: 0,
//			                y: -10,
//			                style: {
//			                    color: '#E66156',
//			                    fontWeight: 'bold'
//			                }
//			    		},
//			    		dashStyle: 'line',
//						//id: 'max',
//			    		color: '#E66156',
//				        width: 2,
//				        value: 1606353330000,
//				        zIndex: 3
//				    },
			    ],
			},
			yAxis: {
				title: {
					text: null
				},
				//max: max, 
				//min: min,
//				tickInterval: 1,
//				startOnTick: true,
				
//				labels: {
//		            format: '{value} ' + param.sensor_unit
//		        },
//				plotLines: [
//					{
//						label: {
//							text: 'max : ' + max
//						},
//						id: 'max',
//						color: '#FF0000',
//				        width: 2,
//				        value: max,
//				        zIndex: 5
//				        
//					},
//					{
//						label: {
//							text: 'min : ' + min
//						},
//						id: 'min',
//						color: '#FF0000',
//				        width: 2,
//				        value: min,
//				        zIndex: 5
//					}
//				]
			},
			plotOptions: {
		        series: {
		            cursor: 'pointer',
		        },
		        // spline 차트 point marker 숨기기
		        spline: {
		        	marker: {
		        		enabled:false,
		        	}
		        }
		    },
		    tooltip: {
				//xDateFormat: format, 		//'%Y-%m-%d %H:%M:%S'
		    	xDateFormat: '%Y-%m-%d %H:%M:%S', 		//'%Y-%m-%d %H:%M:%S'
				formatter: function (tooltip) {
					if (this.point.isNull) {
                        return 'Null';
                    }
                    var default_msg = tooltip.defaultFormatter.call(this, tooltip);
                    // 이름 수정
                    default_msg[0] = '<b>' + moment.tz(this.x, param.timezone).format('YYYY-MM-DD HH:mm:ss') + '</b><br/>';
                    // 이름 수정
                    //default_msg[1] = default_msg[1].replace(this.series.name+':', year+':');
                    // 단위 수정 
                    default_msg[1] = default_msg[1].replace('</b>', ' ' + this.series.userOptions.unit +'</b>');
                    return default_msg;
                },
                //valueSuffix: ' ' + param.sensor_unit
		    },
//	        legend: {
//		        enabled: false
//		    },
		    // 오른쪽 상단 navigation 버튼 사용 여부
			navigation: {
		        buttonOptions: {
		            enabled: true
		        }
		    },
		    // 아래 네비게이터 사용 옵션
	        navigator: {
	            enabled: false
	        },
	        // 차트 추출시 옵션  
	        exporting: {
				//showTable: true				// chart data table로 표시
	            //filename: 'custom-file-name',	// filename
	            width: 2000,
	            height: 500,
//	            sourceWidth: 1000,				// download 크기 설정 
//	            sourceHeight: 500,
	            chartOptions: {		
	                plotOptions: {
	                    series: {
	                        dataLabels: {
	                            enabled: false	// download시 value label 표시 (true, false)
	                        }
	                    }
	                }
	            },
	            // getCSV() 시 datatime format
	            csv: {	
	                dateFormat: '%Y-%m-%d'
	            }
	        	
	        },
		}
		return options;
	},
	/* series 생성 */
	series: {
		basicDatetime: function(date_arr, id, name, param, allow_random_data) {
			var series = {
				id: id + '',
				name: name,
				data: []
			};
			
		    for(var i=0; i<date_arr.length; i++) {
		    	if(allow_random_data) {
		    		//series.data.push([date_arr[i], parseInt((Math.random() * (param.sensor_max - param.sensor_min)) + param.sensor_min)]);
		    		series.data.push([date_arr[i], (Math.random() * (param.sensor_max - param.sensor_min)) + param.sensor_min]);
		    	} else {
		    		series.data.push([date_arr[i], null]);
		    	}
		    }
		    
			return series;
		},
		twoDiffYear: function(date_arr, last_year, this_year) {
            var series = [
				{
					id: last_year+'',
					name: last_year,
					data: []
				},
				{
					id: this_year+'',
					name: this_year,
					data: []
				}
			];
		    
		    for(var i=0; i<date_arr.length; i++) {
		    	series[0].data.push([date_arr[i], null]);
		    	series[1].data.push([date_arr[i], null]);
		    }  
            
            return series;
        },
        /* oam010203 - 계획 스케줄 차트 시리즈 생성 */ 
        oam_010203: function(data) {
        	
        	var series = [];
        	
        	// PART
        	var part_schedule = data.PART_LIST.reduce((acc, e) => {
        		
        		acc.data.push({
        			name: e.ITEM_NM,
        			id: e.SCHED_ID,
        			parent: 'PART',
        			//dependency: 'PART',
        			start: moment.tz(e.START_TIME_UTC, 'UTC').valueOf(),
        			end: moment.tz(e.END_TIME_UTC, 'UTC').valueOf(),
        			data: Object.assign({}, e),
        		});
        		
        		acc.data[0].children.push(Object.assign({}, e));
        		
        		return acc;
        	}, { name:'Part', data:[{name:'Part', id:'PART', children:[]}]});
        	
        	// TOOL
        	var tool_schedule = data.TOOL_LIST.reduce((acc, e) => {
        		
        		acc.data.push({
        			name: e.ITEM_NM,
        			id: e.SCHED_ID,
        			parent: 'TOOL',
        			//dependency: 'TOOL',
        			start: moment.tz(e.START_TIME_UTC, 'UTC').valueOf(),
        			end: moment.tz(e.END_TIME_UTC, 'UTC').valueOf(),
        			data: Object.assign({}, e),
        		});
        		acc.data[0].children.push(Object.assign({}, e));
        		
        		return acc;
        	}, { name:'Tool', data:[{name:'Tool', id:'TOOL', children:[]}]});
        	
        	// PPE
        	var ppe_schedule = data.PPE_LIST.reduce((acc, e) => {
        		
        		acc.data.push({
        			name: e.ITEM_NM,
        			id: e.SCHED_ID,
        			parent: 'PPE',
        			//dependency: 'PPE',
        			start: moment.tz(e.START_TIME_UTC, 'UTC').valueOf(),
        			end: moment.tz(e.END_TIME_UTC, 'UTC').valueOf(),
        			data: Object.assign({}, e),
        		});
        		acc.data[0].children.push(Object.assign({}, e));
        		
        		return acc;
        	}, { name:'PPE', data:[{name:'PPE', id:'PPE', children:[]}]});
        	
        	// WORK 
        	var work_schedule = data.WORK_LIST.reduce((acc, e) => {
        		
        		acc.data.push({
        			name: e.WORK_TITLE,
        			id: e.SCHED_ID,
        			parent: 'WORK',
        			//dependency: 'WORK',
        			start: moment.tz(e.START_TIME_UTC, 'UTC').valueOf(),
        			end: moment.tz(e.END_TIME_UTC, 'UTC').valueOf(),
        			data: Object.assign({}, e),
        		});
        		acc.data[0].children.push(Object.assign({}, e));
        		return acc;
        	}, { name:'Work', data:[{name:'Work', id:'WORK', children:[]}]});
        	
        	series.push(part_schedule);
        	series.push(tool_schedule);
        	series.push(ppe_schedule);
        	series.push(work_schedule);
        	
        	return series;
        },
        oam_0501: function(date_arr, id, name, param, allow_random_data, occur_time) {
			var series = {
				id: id + '',
				name: name,
				data: [],
				color: param.color,
				unit: param.unit,
			};
			
		    for(var i=0; i<date_arr.length; i++) {
		    	// 랜덤 데이터 생성 
		    	if(allow_random_data) {
		    		// 발생 시간 이 있을 경우 시간대 근처에 가중치 주기 
		    		if(occur_time) {
		    			var index = date_arr.findIndex((e) => e === occur_time);
		    			var value = parseInt((Math.random() * (param.max - param.min)) + param.min);
		    			
		    			if(index-4 === i) value = value + (param.max * 4) * 0.4
		    			if(index-3 === i) value = value + (param.max * 4) * 0.2
		    			if(index-2 === i) value = value + (param.max * 4) * 0.5
		    			if(index === i) value = value + (param.max * 4)
		    			if(index+4 === i) value = value + (param.max * 4) * 0.6
		    			if(index+6 === i) value = value + (param.max * 4) * 0.4
		    			if(index+7 === i) value = value + (param.max * 4) * 0.7
		    			
		    			//series.data.push([date_arr[i], value]);
		    			series.data.push([date_arr[i], null]);
		    		} 
		    		// 랜덤 데이터 생성 
		    		else {
		    			series.data.push([date_arr[i], parseInt((Math.random() * (param.max - param.min)) + param.min)]);
		    		}
		    	} 
		    	else {
		    		series.data.push([date_arr[i], null]);
		    	}
		    }
		    
			return series;
		},
    },
    
    /* plotLine 생성 */
    plotLine: {
    	oam_0501: function(param) {
    		
    		/*
    		 *	알람 발생 	 : Occurrence  		/ #f8554e	/	\ea1e	/	.plotLine-icon.alarm
    		 *  계획 작성 	 : Counterplan 		/ #8597ff 	/	\e99b	/	.plotLine-icon.plan
    		 *  보고서 작성 : Result Report 	/ #5ab97e 	/	\ea97	/	.plotLine-icon.report
    		 */
    		var color = {alarm: '#f8554e', plan: '#8597ff', report: '#5ab97e'}; 
    		var title = {alarm: 'Occurrence', plan: 'Counterplan', report: 'Result Report'};
    		
    		param.INFO.TITLE = title[param.TYPE];
    		
    		var line = {
    			id: param.ID,
    			label: {
	    			text: '<a class="plotLine-icon ' + param.TYPE + '">'
	    				+ '<span id="chart-id" class="attr">' + param.CHART_ID + '</span>'
	    	            + '<span id="plotline-id" class="attr">' + param.ID + '</span>'
	    	            + '<span id="axis-type" class="attr">' + param.AXIS_TYPE + '</span>'
	    	            + '</a>', 
	    			useHTML: true,
	    			align: 'center',
	                verticalAlign: 'top',
	                textAlign: 'center',
	                rotation: 0,
	                y: -10,
	                x: -0.4,
	                style: {
	                    color: color[param.TYPE],
	                    fontWeight: 'bold'
	                }
	    		},
	    		dashStyle: 'line',
				color: color[param.TYPE],
		        width: 2,
		        value: param.VALUE,
		        zIndex: 3,
		        info: param.INFO
		    };
    		return line;
    	}
    }
	
};