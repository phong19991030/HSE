var chart;
var click_series;    


/*      
        #NOTE
        
        1)
        .translate(x, y) : x(x축 증감 값), y(y축 증감 값)
        
        2)
        e.pageX, e.pageY : 화면 기준 event 시작 점 (x, y)
        
        3) 
        .bind / .unbind : event binding on / off 함수 
        
        4) 
        axis.horiz : 수평 / 수직 여부 : 세로축 일 경우 true, 가로축 일 경우 undefiend
        
*/
var band = {
    side: function(axis) {
    	
//    	if ('ontouchstart' in document.documentElement === true) return 'touchstart';
//		else return 'click';
        
        // line = controller(주 축), lines = auxiliary line(보조 축)
        // clickX : x축 시작점, clickY : y축 시작점 
        var clickX, clickY, line, lines, target_line;
        
        var init = function() {
            line = (axis.plotLinesAndBands.filter((e) => e.id === 'Main'))[0];
            lines = axis.plotLinesAndBands.filter((e) => e.id !== 'Main');
            
            // main line 
            line.svgElem.attr({}).css({'cursor': 'pointer'}).translate(0, 0).on('mousedown', start); 
            //line.svgElem.attr({}).css({'cursor': 'pointer'}).translate(0, 0).on('touchstart', start); 
            // side line
            lines.forEach((e) => e.svgElem.attr({}).css({'cursor': 'pointer'}).translate(0, 0).on('mousedown', side_start));
            //lines.forEach((e) => e.svgElem.attr({}).css({'cursor': 'pointer'}).translate(0, 0).on('touchstart', side_start));
            
        }
        
        var test = function(e) {
        	console.log('tt');
        }
        
        var start = function(e) {
            $(document).bind({
                'mousemove.line': step,
                'mouseup.line': stop,
//                'touchmove.line': step,
//                'touchend.line': stop
            });
            
            clickX = e.pageX - line.svgElem.translateX;
            clickY = e.pageY - line.svgElem.translateY;
        }
        
        var side_start = function(e) {
            
            target_line = lines.filter((e) => {
               return e.svgElem.d === $(this).attr('d');
            });
            target_line = target_line[0];
            
            $(document).bind({
                'mousemove.line': side_step,
                'mouseup.line': stop,
//                'touchmove.line': side_step,
//                'touchend.line': stop,
            });
            
            clickX = e.pageX - target_line.svgElem.translateX;
            clickY = e.pageY - target_line.svgElem.translateY;
        }
        
        
        var step = function(e) {
            
            // axis.horiz 수평 / 수직 여부 : 세로축 일 경우 true, 가로축 일 경우 undefiend
            var moveX = axis.horiz;
            
            // clickX (처음 위치), e.pageX (이동 위치)
            // new_translation : 이동 값 
            var new_translation = moveX ? e.pageX - clickX : e.pageY - clickY;
            
            // axis.toValue(new_translation) : 위치 값 파라미터로 해당 축값 변환 
            var new_value = axis.toValue(new_translation) - axis.toValue(0) + line.options.value;
            new_value = Math.max(axis.min, Math.min(axis.max, new_value));
            new_translation = +(axis.toPixels(new_value + axis.toValue(0) - line.options.value)).toFixed(12);
            
            
            new_translation = Math.round(new_translation / 0.01) * 0.01;
            
            
            // 주축의 기존 위치 
            var sp = line.svgElem.translateX;
            
            // Controller line
            line.svgElem.translate(moveX ? new_translation : 0, moveX ? 0 : new_translation);
            
            
            // Side line
            lines.forEach((a) => {
                
                // 이동거리 = 이동위치 - 주축의 기존 위치 
                var d = +(new_translation - sp).toFixed(2);
                a.svgElem.translate(
                    moveX ? a.svgElem.translateX + d : 0, 
                    moveX ? 0 : a.svgElem.translateX + d
                );    
            });
            
            axis.plotLinesAndBands.forEach((b) => {
                //var val = getValue(b);
                var val = band.func.getValue(b, axis);
                $('#'+b.id + ' > #x').text(val.x);
                $('#'+b.id + ' > #y').text(val.y);
                $('#'+b.id + ' > #i').html(val.i + '<br> [' + val.y1 + ' ~ ' + val.y2 + ']');
                $('#'+b.id + ' > #m').text(val.m);
            });
            
        };
        
        var side_step = function(e) {
            
            var moveX = axis.horiz;
            
            var new_translation = moveX ? e.pageX - clickX : e.pageY - clickY;
            
            // axis.toValue(new_translation) : 위치 값 파라미터로 해당 축값 변환 
            var new_value = axis.toValue(new_translation) - axis.toValue(0) + target_line.options.value;
            new_value = Math.max(axis.min, Math.min(axis.max, new_value));
            new_translation = +(axis.toPixels(new_value + axis.toValue(0) - target_line.options.value)).toFixed(12);
            
            
            new_translation = Math.round(new_translation / 0.01) * 0.01;
            
            var d = new_translation - target_line.svgElem.translateX;
            var standard = Math.abs(target_line.options.multiple);
            var add = +(d / standard).toFixed(2);
            
            
            lines.forEach((a) => {
                
                //var div = +(a.svgElem.translateX + (d * (a.options.multiple/standard))).toFixed(2);
                
                var div = +(a.svgElem.translateX + (add * a.options.multiple)).toFixed(2);
                
                a.svgElem.translate(
                    moveX ? div : 0, 
                    moveX ? 0 : div
                );  
            });
            
            axis.plotLinesAndBands.forEach((b) => {
                //var val = getValue(b);
                var val = band.func.getValue(b, axis);
                $('#'+b.id + ' > #x').text(val.x);
                $('#'+b.id + ' > #y').text(val.y);
                $('#'+b.id + ' > #i').html(val.i + '<br> [' + val.y1 + ' ~ ' + val.y2 + ']');
                $('#'+b.id + ' > #m').text(val.m);
            });
            
        };
        
        var stop = function() {
            $(document).unbind('.line');
            band.log.AxisTranslate(axis);
        }
        
        init();
    },
    
    
    /***********************************************************************************************************/
    
    harmonic: function(axis) {
        
        
        var clickX, clickY, line, lines;
        
        var init = function() {
            line = (axis.plotLinesAndBands.filter((e) => e.id === 'Main'))[0];
            lines = axis.plotLinesAndBands.filter((e) => e.id !== 'Main');
            
            line.svgElem.attr({}).css({'cursor': 'pointer'}).translate(0, 0).on('mousedown', start); 
            lines.forEach((e) => e.svgElem.attr({}).translate(0,0));
        }
        
        
        var start = function(e) {

            $(document).bind({
                'mousemove.line': step,
                'mouseup.line': stop
            });
            
            clickX = e.pageX - line.svgElem.translateX;
            clickY = e.pageY - line.svgElem.translateY;
        }
        
        
        var step = function(e) {
            
            // axis.horiz 수평 / 수직 여부 : 세로축 일 경우 true, 가로축 일 경우 undefiend
            var moveX = axis.horiz;
            var new_translation = moveX ? e.pageX - clickX : e.pageY - clickY;
            
            // axis.toValue(new_translation) : 위치 값 파라미터로 해당 축값 변환 
            // 
            var new_value = axis.toValue(new_translation) - axis.toValue(0) + line.options.value;
            new_value = Math.max(axis.min, Math.min(axis.max, new_value));
            new_translation = axis.toPixels(new_value + axis.toValue(0) - line.options.value);
            
            
            // Controller line
            line.svgElem.translate(moveX ? new_translation : 0, moveX ? 0 : new_translation);
            
            // Side line
            lines.forEach((a) => 
                {
                    a.svgElem.translate(
                        moveX ? new_translation * a.options.multiple : 0, 
                        moveX ? 0 : new_translation * a.options.multiple
                    )    
                }
            );
            
            axis.plotLinesAndBands.forEach((b) => {
                //var val = getValue(b);
                var val = band.func.getValue(b, axis);
                $('#'+b.id + ' > #x').text(val.x);
                $('#'+b.id + ' > #y').text(val.y);
                $('#'+b.id + ' > #i').html(val.i + '<br> [' + val.y1 + ' ~ ' + val.y2 + ']');
                $('#'+b.id + ' > #m').text(val.m);
            });
        };
        
        
        var stop = function() {
            $(document).unbind('.line');
            band.log.AxisTranslate(axis);
        }
        
        init();
    },
    
    /***********************************************************************************************************/
    func: {
        getValue: function(line, axis) {
            
            var translation = axis.horiz ? line.svgElem.translateX : line.svgElem.translateY;
            
            var new_value = axis.toValue(translation) - axis.toValue(0) + line.options.value;
            new_value = Math.max(axis.min, Math.min(axis.max, new_value));
            
            // 정수 근사치 일 경우 
            new_value = ((parseInt(new_value) + 1) - 0.05) < new_value ? parseInt(new_value+1) : new_value;
            
            /* match 값 구하기 */
            var index = parseInt(new_value);
            
            var x1, x2, y1, y2;
            if(index < axis.chart.series[0].xData.length-1) {
                x1 = axis.chart.series[0].xData[index];
                y1 = axis.chart.series[0].yData[index];
                x2 = axis.chart.series[0].xData[index+1];
                y2 = axis.chart.series[0].yData[index+1];
            } else {        // 데이터의 마지막 index일 경우, 
                x1 = axis.chart.series[0].xData[index-1];
                y1 = axis.chart.series[0].yData[index-1];
                x2 = axis.chart.series[0].xData[index];
                y2 = axis.chart.series[0].yData[index];
            }
            
            var m = (y2-y1) / (x2-x1);              // 기울기
            
            var y = ((m * (new_value - x1)) + y1);
            /* match 값 구하기 */
            
            
            m = band.func.convertDecimal(m);
            y = band.func.convertDecimal(y);
            new_value = band.func.convertDecimal(new_value);
            
            line.options.x_value = new_value;
            line.options.y_value = y;
            
            return {x: new_value, y: y, m: m, i: index, y1:y1, y2:y2};  
        },
        getDecimal: function() {
            var v = parseInt($('#decimal').val());
            var o = 1 / (10 ** v);
            if(!v) o = false
            return o;
        },
        
        convertDecimal: function(decimal) {
            var d = band.func.getDecimal();
            var type = 'round' // ceil, floor
            
            if(!d) return decimal;
            
//            switch(type) {
//                case 'round':
//                    decimal = Math.round(decimal / d) * d;
//                    break;
//                case 'ceil':
//                    decimal = Math.ceil(decimal / d) * d;
//                    break;  
//                case 'floor':
//                    decimal = Math.floor(decimal / d) * d;
//                    break;
//            }
            
            
            decimal = + decimal.toFixed(parseInt($('#decimal').val()));
            
            return decimal;
        }
        
        
        
        
    },
    
    
    
    /***********************************************************************************************************/
    log: {
        
        AxisTranslate: function(axis) {
            axis.plotLinesAndBands.forEach((e, i, arr) => {
                console.log(arr[i].svgElem.translateX);    

                if(i < arr.length-1) {
                    var diff = +(arr[i+1].svgElem.translateX - arr[i].svgElem.translateX).toFixed(2);
                    console.log('      ↘ ');        
                    console.log('        ' + diff);
                    //console.log('           ↗ ');        
                    
                }
            });
        },
        
    }
    
    
};


var _bandOption = {
    side: function(max) {
        
        var tenPro = (max / 100) * 0.5;
        
        return [       
            {
                color: '#3873BF',
                width: 2,
                value: +(tenPro).toFixed(12),
                id: 'L-3',
                multiple: -3,
                zIndex: 5
            },
            {
                color: '#3873BF',
                width: 2,
                //value: 2 * tenPro,
                value: +(2 * tenPro).toFixed(12),
                id: 'L-2',
                multiple: -2,
                zIndex: 5
            },
            {
                color: '#3873BF',
                width: 2,
                //value: 3 * tenPro,
                value: +(3 * tenPro).toFixed(12),
                id: 'L-1',
                multiple: -1,
                zIndex: 5
            },
            {
                color: '#FF0000',
                width: 2,
                value: +(4 * tenPro).toFixed(12),
                id: 'Main',
                zIndex: 5
            },
            {
                color: '#3873BF',
                width: 2,
                //value: 4 * tenPro,
                value: +(5 * tenPro).toFixed(12),
                id: 'R-1',
                multiple: 1,
                zIndex: 5
            },
            {
                color: '#3873BF',
                width: 2,
                //value: 5 * tenPro,
                value: +(6 * tenPro).toFixed(12),
                id: 'R-2',
                multiple: 2,
                zIndex: 5
            },
            {
                color: '#3873BF',
                width: 2,
                //value: 6 * tenPro,
                value: +(7 * tenPro).toFixed(12),
                id: 'R-3',
                multiple: 3,
                zIndex: 5
            },
        ];
    },
    harmonic: function(max) {
        
        var tenPro = (max / 100) * 0.5;
        
        return [
            {
                color: '#FF0000',
                width: 2,
                value: +(tenPro).toFixed(12),
                id: 'Main',
                zIndex: 5
            },
            {
                color: '#3873BF',
                width: 2,
                //value: 2 * tenPro,
                value: +(2 * tenPro).toFixed(12),
                id: 'R-1',
                multiple: 2,
                zIndex: 5
            },
            {
                color: '#3873BF',
                width: 2,
                //value: 3 * tenPro,
                value: +(3 * tenPro).toFixed(12),
                id: 'R-2',
                multiple: 3,
                zIndex: 5
            },
            
            {
                color: '#3873BF',
                width: 2,
                //value: 4 * tenPro,
                value: +(4 * tenPro).toFixed(12),
                id: 'R-3',
                multiple: 4,
                zIndex: 5
            },
            {
                color: '#3873BF',
                width: 2,
                //value: 5 * tenPro,
                value: +(5 * tenPro).toFixed(12),
                id: 'R-4',
                multiple: 5,
                zIndex: 5
            },
            {
                color: '#3873BF',
                width: 2,
                //value: 6 * tenPro,
                value: +(6 * tenPro).toFixed(12),
                id: 'R-5',
                multiple: 6,
                zIndex: 5
            },
        ]
    },
    color: function () {
        
    }
    
}


var chart_tool = {
    getChart: function() {
        return Highcharts.charts[0];
    },
    removeBand: function() {
        var chart = this.getChart();
        
        var plots = chart.xAxis[0].plotLinesAndBands.map((e) => {
//            $('#'+e.id).remove();
//            
//            // line 삭제   
//            chart.xAxis[0].removePlotLine(e.id);
            
            return e.id;
        });
        
        plots.forEach((e) => {
            
            $('#'+e).remove();
            
            // line 삭제   
            chart.xAxis[0].removePlotLine(e);
        });
    },
    addSeries: function(data, id) {
        var chart = this.getChart();
        if(chart) {
            
            var series = {};
            
            if(id) series['id'] = id;
            if(data) series['data'] = data;
            
            chart.addSeries(series);        
        }
    },
    updateSeries: function(data) {
        var chart = this.getChart();
        if(chart) {
            chart.series[0].setData(data);
        }
    },
    removeSeriesByNum: function(num) {
        var chart = this.getChart();
        if(chart) {
            chart.series[num].remove();
        }
    },
    removeSeriesByID: function(alias) {
        var chart = this.getChart();
        if(chart) {
            chart.get(id).remove();
        }
    },
    getSeriesByNum: function(num) {
        var chart = this.getChart();
        if(chart) {
            return chart.series[num];
        }
        return null;
    },
    getSeriesByID: function(id) {
        var chart = this.getChart();
        if(chart) {
            return chart.get(id);
        }
        return null;
    }
    
}



var createDateArray = function (from, to, timezone, type, pattern) {
	
    // date 변환, Client Access Timezone
	var mFrom = moment.tz(from, timezone).tz('UTC');
    var mTo = moment.tz(to, timezone).tz('UTC');
    
    var arr = [];
    
    arr.push(mFrom.valueOf());
    arr.push(mTo.valueOf());
    
    // begin ~ today 사이 날짜 생성 
    for(var i=0; i<arr.length; i++) {

        if(arr[i] < arr[i+1]) {

            var date = moment(arr[i]);
            var time;
            
            var string;
            
            switch(type) {
                case 'day':
                    string = 'date';
                    break;
                case 'hour':
                    string = 'hour';
                    break;
                case 'min':
                    string = 'minute';
                    break;
                case 'sec':
                    string = 'second';
                    break;
            }
            
            
            /* from ~ to 사이의 pattern 간격 arr 생성 */
            time = date.get(string) + pattern;
            date.set(string, time);
            
            if(date < arr[i+1]) {
                arr.splice(i+1, 0, date.valueOf());
            }	         
            
        }
    }
    return arr;
}


var createInitData = {
    trend_chart: function (date_arr, series_config) {
	    var series = [];
        for(var j=0; j<series_config.length; j++) {
            var name = series_config[j].name;
            var max = series_config[j].max;
            var min = series_config[j].min;
            var decimal = series_config[j].decimal;

            if(!series[j]) {
                series.push({id: name, name: name, data: []})
            }

            for(var i=0; i<date_arr.length; i++) {
               series[j].data.push([date_arr[i], parseFloat(((Math.random() * (max - min)) + min).toFixed(2))]);
            }
        }
        return series;
    },
    multiple_trend_chart: function (date_arr, series_config) {
        var series = [];
        for(var j=0; j<series_config.length; j++) {
            var yAxis = series_config[j].yAxis;
            var type = series_config[j].type;
            var name = series_config[j].name;
            var max = series_config[j].max;
            var min = series_config[j].min;
            var decimal = series_config[j].decimal;

            if(!series[j]) {
                series.push({type: type, id: name, name: name, data: [], yAxis: yAxis})
            }

            for(var i=0; i<date_arr.length; i++) {
               series[j].data.push([date_arr[i], parseFloat(((Math.random() * (max - min)) + min).toFixed(2))]);
            }
        }
        return series;
    },
    gantt_chart: function (date_arr, series_config) {
        var color = ['#7DB150', '#F6E24B', '#CD594B'];
        var state = ['RUN', 'STOP', 'ERROR'];
        
        var series = [];
        for(var j=0; j<series_config.length; j++) {
            
            var name = series_config[j].name;
            
            if(!series[j]) {
                series.push({name: name, data: []})
            }

            for(var i=0; i<date_arr.length-1; i++) {
                
                var random = parseInt((Math.random() * 3 ));
                
                var data = {
//                    type: "xrange",
                    start: date_arr[i],
                    end: date_arr[i+1],
                    //name: state[random],
                    //name: name,
                    y: j,
                    color: color[random],
                    state: state[random]
//                    grouping: false
//                    completed: {
//                        amount: 1,
//                        fill: fill[parseInt((Math.random() * (2 - 0)) + 0)]
//                    }
                }
                
                series[j].data.push(data);
            }
        }
        return series;
    }
}
    


var createChartOption = function(name) {
    return chart_option[name];
}

var drawChartAfter = function() {
    //$('.highcharts-exporting-group').css('display', 'none');
    $('.highcharts-legend').css('display', 'none');
    //$('.highcharts-title').css('display', 'none');
    $('.highcharts-credits').css('display', 'none');
}





var chart_option = {
    
    trend_chart : {
		colors: ['#89898b', '#486dfb'],
		time: {
	        timezone: 'Asia/Seoul',
	        //useUTC: false
	    },
		chart: {
            type: 'spline',
            zoomType: 'x',
            panning: true,			// 차트 이동
            panKey: 'shift',		// 이동 키
        },
		title: {
			text: 'Trend Chart'
		},
		legend: {
	        enabled: false
	    },
		xAxis: {
			type: 'datetime',
//			tickPositions: chart.tickPositions,
//			labels: {
//				formatter: function() {
//					var mm = moment(this.value).tz(client_access_timezone);
//					var m = mm.get('month') + 1;
//					return m;
//				}
//			}
			dateTimeLabelFormats: {
		        //second: '%Y-%m-%d<br/>%H:%M:%S',
				second: '%H:%M:%S',
		        //minute: '%Y-%m-%d<br/>%H:%M',
		        minute: '%H:%M',
		        //hour: '%Y-%m-%d<br/>%H:%M',
		        hour: '%H:%M:%S',
		        day: '%m.%d',
		        week: '%m.%d',
		        month: '%m',
		        year: '%Y'
		    }
		},
		yAxis: {
	        //max: 100,
	        //min: 0,
			title: {
				text: null
			},
			
		},	
		plotOptions: {
	        series: {
	            cursor: 'pointer',             // series hover시 커서 모양
                marker: {
                    enabled: true,
                    radius: 3
                },
                events: {
                    click: function (event) {
//                        console.log(event.point.x);
//                        console.log(event.point.y);
//                        console.log(this.name);
//                        var color = chart.get(this.name).color;
//                        console.log(color);

                        //                        console.log(chart.series[0]);
//                        console.log(chart.get(this.name));
//                        console.log(this);

//                        this.update({color: '#FF0000'});
//                        this.update({lineColor: '#FF0000'});
//                        this.update({lineWidth: 6});
                        
                        
                        if(this.name != click_series && click_series != null) {
                            chart.get(click_series).update({marker:{lineWidth: 0,lineColor: '#ffffff'}});    
                        }

                        if(this.isClick) {
                            this.update({marker: {lineWidth: 0,lineColor: '#ffffff'}});  
                            this.isClick = false;
                            click_series = null;
                        } else {
                            this.update({marker: {lineWidth: 2,lineColor: 'red'}});
                            this.isClick = true;
                            click_series = this.name;
                        }

                    }
                },
                point: {
                    events: {
                        click: function (event) {
                            console.log(this);
                            console.log(event.point.y);
                            
                            
                            
                            
                        }
                    }
                }
            },
           
            
        },
        // 아래 네비게이터 사용 옵션
        navigator: {
            enabled: true,
            height: 100,
        },
		tooltip: {
            split: true,    // 같이 표시 
			//xDateFormat: '%m-%d %H:%M:%S',
			xDateFormat: '%Y-%m-%d %H:%M',
			//valuePrefix: '$',
	        //valueSuffix: '%'
		},
		// 오른쪽 상단 navigation 버튼 사용 여부
		navigation: {
	        buttonOptions: {
	            enabled: true
	        }
	    },
        legend: {
            enabled: false,                     //범례 사용 X
        },
        series: null,
        
        
        annotations: [
            {
                title: {
                    text: 'please',
                    style: {
                        color: 'red'
                    }
                },
                anchorX: "left",
                anchorY: "top",
                allowDragX: true,
                allowDragY: true,
                x: 738,
                y: 284.4233333333333
            }
        ]
    },
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    multiple_trend_chart: function(series) {
        
        
//        var yAxis = series.map(x => 
//            
//            var height = parseInt(100 / series.length);              
//            
//            {
//                opposite: false,            // 축 위치, true일 경우 오른쪽 
//                labels: {
//                    align: 'right',
//                    //x: -3
//                },
//                title: {
//                    text: x.name
//                },
//                offset: 0,
//                resize: {
//                    enabled: true
//                },
//                top: '66%',                 //top에서 떨어트리는 간격 
//                height: height + '%',
//                
//            }
//                               
//        )
        
        var yAxis = series.map(function(x, i) {
           
            var height = parseInt(100 / series.length);
            var top = i * height;
            
            
            var yAxis = {
                opposite: false,            // 축 위치, true일 경우 오른쪽 
                labels: {
                    align: 'right',
                    //x: -3
                },
                title: {
                    text: x.name
                },
                offset: 0,
                resize: {
                    enabled: true
                },
                top: top + '%',                 //top에서 떨어트리는 간격 
                height: height + '%',
                
            }
            return yAxis;
        });
        
        
        var options = {
                time: {
                timezone: 'Asia/Seoul',
                //useUTC: false
            },
            rangeSelector: {            // selector 범위 
                selected: 1
            },
            title: {
                text: 'Multi Trend Chart'
            },
            xAxis: {
                type: 'datetime',
    //			tickPositions: chart.tickPositions,
    //			labels: {
    //				formatter: function() {
    //					var mm = moment(this.value).tz(client_access_timezone);
    //					var m = mm.get('month') + 1;
    //					return m;
    //				}
    //			}
                dateTimeLabelFormats: {
                    //second: '%Y-%m-%d<br/>%H:%M:%S',
                    second: '%H:%M:%S',
                    //minute: '%Y-%m-%d<br/>%H:%M',
                    minute: '%H:%M',
                    //hour: '%Y-%m-%d<br/>%H:%M',
                    hour: '%H:%M:%S',
                    day: '%m.%d',
                    week: '%m.%d',
                    month: '%m',
                    year: '%Y'
                }
            },
            yAxis: yAxis,
//            [
//                {
//                    opposite: false,            // 축 위치, true일 경우 오른쪽 
//                    labels: {
//                        align: 'right',
//                        //x: -3
//                    },
//                    title: {
//                        text: 'test1'
//                    },
//                    height: '33%',
//                    //lineWidth: 2,
//                    resize: {                   // 사이즈 조절 바
//                        enabled: true
//                    }
//                }, 
//                {
//                    opposite: false,
//                    labels: {
//                        align: 'right',
//                        //x: -3
//                    },
//                    title: {
//                        text: 'test2'
//                    },
//                    top: '33%',                 //top에서 떨어트리는 간격 
//                    height: '33%',
//                    offset: 0,
//                    resize: {
//                        enabled: true
//                    }
//                    //lineWidth: 2
//                },
//                {
//                    opposite: false,
//                    labels: {
//                        align: 'right',
//                        //x: -3
//                    },
//                    title: {
//                        text: 'test3'
//                    },
//                    top: '66%',                 //top에서 떨어트리는 간격 
//                    height: '33%',
//                    offset: 0,
//                    resize: {
//                        enabled: true
//                    }
//                    //lineWidth: 2
//                }
//            ],
            tooltip: {
                split: true,    // 같이 표시 
                xDateFormat: '%Y-%m-%d %H:%M',
            },
            navigator: {
                enabled: true,
                height: 100,
            },
            series: series,
        }
        
        // series 형태 
//        [
//            {
//                type: 'spline',
//                name: '',
//                data: null,
//                dataGrouping: {
//                    units: null
//                }
//            }, 
//            {
//                type: 'spline',
//                name: 'Volume',
//                data: null,
//                yAxis: 1,                 -- 분할 된 yAxis 1번째 칸 사용 
//                dataGrouping: {
//                    units: null
//                }
//            }
//        ]
        
        return options;
    },
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
    gantt_chart: function(series) {
        
        var categories = series.map(a => a.name);
        
        var options = {
                time: {
                timezone: 'Asia/Seoul',
                //useUTC: false
            },
            title: {
                text: 'Gantt Chart'
            },
            xAxis: {
                type: 'datetime',

                //uniqueNames: true
            },
    //        plotOptions: {
    //            series: {
    //                //type: 'xrange',
    //                //grouping: false
    //            },
    //            xrange: {
    //                // shared options for all xrange series
    //            }
    //        },
            yAxis: {
                categories: categories
                
                //uniqueNames: true,        
                //categories: ['turbine1', 'turbine2', 'turbine3']
    //            labels: {
    //              formatter() {
    //                  
    //                console.log(this.chart.options.series[0]);
    //                const data = this.chart.options.series[0].data[this.pos]
    //                console.log(data);
    //                return data.x
    //              }
    //            }
    //           showEmpty: false,
                //type: 'treegrid',     //linear, logarithmic, datetime, category
                //type: 'category',
    //            grid: {
    //                enabled: true,
    //                borderColor: 'rgba(0,0,0,0.3)',
    //                borderWidth: 1,
    //                columns: [
    //                    {
    //                        title: {
    //                            text: 'turbine1'
    //                        },
    //                        labels: {
    //                            format: '{point.name}'
    //                        }
    //                    },
    //                    {
    //                        title: {
    //                            text: 'turbine2'
    //                        },
    //                        labels: {
    //                            format: '{point.name}'
    //                        }
    //                    },
    //                    {
    //                        title: {
    //                            text: 'turbine3'
    //                        },
    //                        labels: {
    //                            format: '{point.name}'
    //                        }
    //                    },
    //                ]
    //            }
            },
            tooltip: {
                formatter: function() {
                    console.log(this.point);
                    return '<b>'+ this.point.options.state + '</b><br/>' +
                        moment.tz(this.point.options.start, 'Asia/Seoul').format('HH:mm')
                        + ' ~ ' + 
                        moment.tz(this.point.options.end, 'Asia/Seoul').format('HH:mm');
                }
            },
            series: series
        }
        
        return options;
    },
    
    fft_chart: function (data) {
        
        var options = {
            chart: {
                type: 'line',
                //zoomType: 'x',
                panning: true,			// 차트 이동
                panKey: 'shift',		// 이동 키
            },
            legend: {
                enabled: false
            },
            title: {
                text: 'FFT Data Chart'
            },

            xAxis: {
//                labels: {
//                    x: -10
//                }
            },
            yAxis: {
                //allowDecimals: false,
                title: {
                    text: null
                }
            },
            plotOptions: {
                series: {
                    enableMouseTracking: false
                },
                line: {
//                    dataLabels: {
//                        enabled: true
//                    },
                    enableMouseTracking: false
                },
                point: {
                    enableMouseTracking: true
                },
            },
//            navigator: {
//                enabled: true,
//                height: 100
//            },
            series: [{
                data: data
            }],
        }
        
        return options;
    }
    
    
	
}


