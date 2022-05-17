<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/sonification.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
<style>
.tooltip {
  padding: 5px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px; 
} 
.prediction-graph .graph-wrap{
	margin-bottom: 10px;
}
.base_grid_table {
	margin-bottom: 100px
}
</style>

<div class="container prediction-form">
		<div class="tit-wrap">
			<h2 class="heading3">
			<span class="txt">Prediction</span>
			<span class="version">Wind speed</span>
			</h2>
			<ul class="location">
				<li>Prediction</li>
				<li>HANGWON</li>
				<li>Group01</li>
				<li class="bold">HanKyoung 8</li>
			</ul>
		</div>
		<div class="search-form-wrap search-form-wrap2">
			<div class="calendar-picker">
				<div class="calendar-wrap">
					<!-- Data Picker --> 
					<div class="input-group">
						<label for="searchText" class="sr-only"></label>
					<input type="text" id="from_dt" class="datepicker" placeholder="Begin date" name="searchText" value="" style="width:200px !important;">
						<span class="calendar-picker-btn">
							<i class="xi-calendar"></i>
						</span>
					</div>
					<!-- /Data Picker --> 
					<em class="hyphen">
						<span class="sr-only">-</span>
					</em>
					<!-- Data Picker --> 
					<div class="input-group">
						<label for="searchText" class="sr-only"></label>
					<input type="text" id="to_dt" class="datepicker" placeholder="End date" name="searchText" value="" style="width:200px !important;">
						<span class="calendar-picker-btn">
							<i class="xi-calendar"></i>
						</span>
					</div>
					<!-- /Data Picker --> 
				</div>
				<span class="cal-btn-right">
					<a  class="refresh-btn2">
						<i class="xi-refresh">
							<span class="sr-only">refresh 버튼</span>
						</i>
					</a>
				  	<button id="search-btn" class="search-btn">search</button>
				</span>
			</div>
		</div>
		
		<div class="predict-tab">
		    <input id="tab-forecast" type="radio" name="tab_item" checked>
		    <label class="tab_item" for="tab-forecast">Forecast</label>
		    <input id="tab-analyze" type="radio" name="tab_item">
		    <label class="tab_item" for="tab-analyze">Analyze</label>
   			
   			<!-- tab-content1 -->
   			<div class="tab-content" id="forecast-content">
				<!-- graph -->	
				<div class="prediction-graph">
					<div class="tit-wrap">
						<strong class="heading6">Wind speed forecast for the next 30 days</strong>
					</div>
					<div class="graph-wrap" style="width: 100%; height: 380px; background: #f4f4f4;">
						<div id="container1" style="width: 100%"></div>

						<div class="prediction-legend-wrap">
							<span class="legend-item1">Real data</span>
							<span class="legend-item2">Predictive data</span>
						</div>
					</div>
				</div>	
				<!-- //graph -->
			
				<div class="base_grid_table table-wrap">

					<table>
						<caption>Wind speed forecast for the next 30 days</caption>
						<colgroup>
							<col style="width:20%">
							<col style="width:40%">
							<col style="width:40%">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">Date</th>
								<th scope="col">Real - Wind speed (m/s)</th>
								<th scope="col">Predicted - Wind speed (m/s)</th>
							</tr>
						</thead>
					</table>
					
					<div class="scroll-tbody">
						<table class="prediction-table">
						<colgroup>
							<col style="width:20%">
							<col style="width:40%">
							<col style="width:40%">
						</colgroup>
						<tbody>
							
						</tbody>
						</table>
					</div>
				</div>
			</div>
  			<!-- //tab-content1 -->
  			
   			<!-- tab-content2 -->
			<div class="tab-content" id="analyze-content">
				<!-- deviation -->
		
				<!-- graph -->
				<div class="prediction-graph">
					<div class="tit-wrap">
						<strong class="heading6">Wind speed forecast deviation from actual</strong>
					</div>
					<div class="graph-wrap" style="width: 100%; height: 380px; background: #f4f4f4;">
						<div id="container2" style="width: 100%"></div>
						<div class="prediction-legend-wrap">
							<span class="legend-item3">Deviation (greater than actual)</span>
							<span class="legend-item4">Deviation (less than actual)</span>
						</div>
					</div>
				</div>	
				<div class="base_grid_table table-wrap">
					<div>
						<table class="deviation-table">
						<colgroup>
							<col style="width:50%">
							<col style="width:50%">
						</colgroup>
						<tbody>
							
						</tbody>
						</table>
					</div>
				</div>
				<!-- //deviation -->
				<!-- error&accuracy -->
				
				<div class="prediction-graph">
					<div class="tit-wrap">
						<strong class="heading6">Wind speed forecast accuracy</strong>
					</div>
					<div class="graph-wrap" style="width: 100%; height: 380px; background: #f4f4f4;">
						<div id="container3" style="width: 100%"></div>
						<div class="prediction-legend-wrap">
							<span class="legend-item3">Accuracy (%)</span>
							<span class="legend-item4">Error rate (%)</span>
						</div>
					</div>
				</div>	
				<div class="base_grid_table table-wrap">
					<div>
						<table class="accuracy-table">
						<colgroup>
							<col style="width:50%">
							<col style="width:50%">
						</colgroup>
						<tbody>
							
						</tbody>
						</table>
					</div>
				</div>	
			<!-- //error&accuracy -->
			</div>
  			<!-- //tab-content2 -->
		</div>
	</div>

 

    <div id="loader" style="display: none" class="lds-dual-ring  overlay"></div>


<script>



var sessionId = '<%= request.getSession().getId() %>';

$(function(){
	
	$('.datepicker').setDatePicker('yy-mm-dd');

	loadingData({});
	
	$('.refresh-btn2').click(function(){
		$('.datepicker').val('');
		loadingData({});
	})
	
	
	$('#search-btn').click(function(){
		var from_dt =  $('#from_dt').val();
		var to_dt =  $('#to_dt').val();
		
		/* Date Check 제어 */
		if(!from_dt || !to_dt) {
	// alert('날짜를 선택해 주세요');
			alert('Please check seach date.');
			return false;
		} else {
			if(moment(to_dt).diff(moment(from_dt)) < 0) {
				alert('Begin date is after End date');
				return false;
			} 
		}
		loadingData({FROM_DATE: from_dt, TO_DATE: to_dt});
		
		
	})
});


function loadingData(param){

	var from_dt =  $('#from_dt').val();
	var to_dt =  $('#to_dt').val();
	
	if(!from_dt || !to_dt){
// 		 return false
/////// 		example
		from_dt = '2020-08-01';
		to_dt = '2021-02-12';
	}
	var constMap = {'SESS_ID': sessionId};
	var param = 	$.extend(param,constMap);

	
	$('#loader').css("display",'block');
// 	$('.table-wrap').hide()
	$.ajax({
		  url: 'http://34.64.213.63:3105/public/pdt_0201/getData.ajax',
// 		  url: 'http://211.240.98.189:3105/public/pdt_0201/getData.ajax',
		  type: 'GET',
		  data: param,
		  success: function(res) {
// 			alert('ok');	
			data = res.data;
			if(res.result === 'true'){
				
				if(!data.PREDICT && !data.HISTORY){
					alert('no data found.');

				}
 				var PRE = [], HIS = [];
 				var range = [];
				var DIFF = [];
				var ERROR = [];
				var ACCURACY = [];

				var merge = [];
				
				
				/////// 		example
				var today = formatDate(new Date());
// 				var today = '2021-01-28';

				var dates = dateRange(from_dt, to_dt);
				var index = -1;
				var todayPoint = -1;
				for(var i = 0; i < dates.length; i++){
					if(dates[i] == today){
						todayPoint = i;
					}
					var historyValue  = data.HISTORY.filter(function(o){return o.DT == dates[i];});
					HIS[i] = historyValue && historyValue.length != 0? Number(historyValue[0].SPEED.toFixed(2)): null;
						
					var predictValue  = data.PREDICT.filter(function(o){return o.DT == dates[i];});
					if(predictValue && predictValue.length != 0){
					  	PRE[i] = Number(predictValue[0].SPEED.toFixed(2));
					  	if(index < 0){
					  		index = i;
					  	}
					  	if(PRE[i] != null && HIS[i] != null){

							DIFF[i-index] = Number((PRE[i] -  HIS[i]).toFixed(2));
							ERROR[i-index] = (PRE[i] == 0 && HIS[i] == 0) ? 0: (Math.abs(PRE[i] -  HIS[i])*100/HIS[i] > 100)? Infinity: Number((Math.abs(PRE[i] -  HIS[i])*100/HIS[i]).toFixed(2));
							ACCURACY[i-index] = Number((100 - ERROR[i-index]).toFixed(2));

					  	}
	 					var low = (Number(PRE[i])*10/13).toFixed(2);
	 					var high = (Number(PRE[i])*10/7).toFixed(2);
	 					range[i] = [i, Number(low), Number(high)];
					}else{
						PRE[i] = null;
						range[i] = null;
					}
					merge[i] = { DT: dates[i], PRE: PRE[i], HIS: HIS[i]};
				}

				drawHighChart(PRE, HIS, dates, range, index, index + data.PREDICT.length - 1, todayPoint);	
				drawHighChart2(DIFF, dates.slice(index, index+DIFF.length), index, index + data.PREDICT.length - 1, todayPoint);	
				drawHighChart3(ERROR, ACCURACY, dates.slice(index, index+DIFF.length), index, index + data.PREDICT.length - 1, todayPoint);	
				drawTable(merge);
				drawTable2(DIFF);
				drawTable3(ACCURACY);
			}else{
				if(res.msg == 'sess_invalid'){
					alert('session key is invalid.')
				}else
				alert('data error');
			}
        	$('#loader').css("display",'none');

		  },
		  error: function( req, status, err ) {
		    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
        	$('#loader').css("display",'none');
		  }
		});	
}

function dateRange(startDate, endDate, steps) {
	if(!steps) steps = 1;
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push((new Date(currentDate)).yyyy_mm_dd());
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }

  return dateArray;
}


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


function drawHighChart(pre, his, timeSeriesLabel, ranges, startPredict, endPredict, todayPoint) {
	
	if( $('#container1').highcharts()){
	    $('#container1').highcharts().destroy();		
	}

	Highcharts.chart('container1', {

	    title: {
	        text: ''
	    },
	    subtitle: {
	        text: ''
	    },
	    xAxis: {
	        gridLineWidth: 1,
	        categories: timeSeriesLabel,
	        plotLines: [{
	            color: '#FF0000',
	            width: 2,
	            label: {
	            	align: "center",
	            	y: -10,
	            	rotation: 0,
	            	useHTML: true,
	            	zIndex: 0,
	            	style: {
	            		background: '#FF0000',
	        			color: '#fff',
	        		    padding: '2px 6px',
	                	'border-radius': '4px'
	            	},
	            	text: 'Forecast >'
	            },
	            value: startPredict// Need to set this probably as a var.
	        },
	        {
	            color: '#FF0000',
	            width: 2,
	            label: {
	            	align: "center",
	            	y: -10,
	            	rotation: 0,
	            	useHTML: true,
	            	zIndex: 0,
	            	style: {
	            		background: '#FF0000',
	        			color: '#fff',
	        		    padding: '2px 6px',
	                	'border-radius': '4px'
	            	},
	            	text: '< Forecast'
	            },
	            value: endPredict// Need to set this probably as a var.
	        },
	        {
	            color: '#0000FF',
	            width: 2,
	            label: {
	            	align: "center",
	            	y: -10,
	            	rotation: 0,
	            	useHTML: true,
	            	zIndex: 0,
	            	style: {
	            		background: '#0000FF',
	        			color: '#fff',
	        		    padding: '2px 6px',
                		'border-radius': '4px'
	            	},
	            	text: 'Today'
	            },
	            value: todayPoint// Need to set this probably as a var.
	        }]
	    },
	    yAxis: {
	        title: {
	            text: 'm/s'
	        }
	    },
	    credits: {
	        enabled: false
	    },
	    scrollbar: {
	        enabled: false
	    },
	    tooltip: {
	        crosshairs: true,
	        shared: true,
			followPointer: true,
	        valueSuffix: ' m/s'
	    },
	    series: [{
	        name: 'Predicted',
	        data: pre,
            dashStyle: 'dash',
	        zIndex: 1,
            color: '#f8554e',
	        marker: {
// 	            fillColor: 'white',
	            lineWidth: 1,
	            lineColor: '#f8554e'
	        }
	    },
	    {
	        name: 'History',
	        data: his,
	        zIndex: 2,
	        color: '#6b6b7d',
	        marker: {
	            lineWidth: 1,
	            radius:4
	        }
	    }
	    ]

	});
}



function drawHighChart2(diff, timeSeriesLabel, startPredict, endPredict, todayPoint) {

	if( $('#container2').highcharts()){
	    $('#container2').highcharts().destroy();		
	}

	Highcharts.chart('container2', {
		   chart: {
		        type: 'column'
		    },
	    title: {
	        text: ''
	    },
	    subtitle: {
	        text: ''
	    },
	    xAxis: {
	        gridLineWidth: 1,
	        categories: timeSeriesLabel,
	        
	    },
	    yAxis: {
	        title: {
	            text: 'm/s'
	        }
	    },
	    credits: {
	        enabled: false
	    },
	    scrollbar: {
	        enabled: false
	    },
	    tooltip: {
		   	 useHTML: true,
	         backgroundColor: null,
	         borderWidth: 0,
             followPointer: true,
	         shadow: false,
	         formatter: function(){
	             return '<div style="color: #fff; padding: 10px; opacity: 0.9; border-radius: 2px !important; min-width: 200px !important; background-color:' + (this.y >= 0? '#008c06' :'#ff0000') + '" class="tooltip"> ' +
	             '<p style="font-weight: 600;">' +toDateLabel(this.key) + '</p>' +
	            '<span  style="font-weight: 300;">'+ this.series.name +  '</span>:<span style="margin-left: 5px; font-weight: 600;"> ' + this.y + ' m/s</span>' +
	                 '</div>';
	         }
	    },
	    series: [{
	        name: 'Deviation',
	        data: diff,
	    }

	    ]

	},function(chart){
        $.each(chart.series[0].data,function(i,data){
            if(data.y >= 0){
               chart.series[0].data[i].update({color:'#49c279'});
            }else{
                chart.series[0].data[i].update({color:'#f7614e'});
            }           
        });
    
    });
}

function drawHighChart3(error, accuracy, timeSeriesLabel, startPredict, endPredict, todayPoint) {
	
	if( $('#container3').highcharts()){
	    $('#container3').highcharts().destroy();		
	}

	Highcharts.chart('container3', {
		   chart: {
		        type: 'column'
		    },
	    title: {
	        text: ''
	    },
	    subtitle: {
	        text: ''
	    },
	    xAxis: {
	        gridLineWidth: 1,
	        categories: timeSeriesLabel,
	        
	    },
	    yAxis: {
	    	min: 0,
	        title: {
	            text: '%'
	        }
	    },
	    credits: {
	        enabled: false
	    },
	    scrollbar: {
	        enabled: false
	    },
	    plotOptions: {
	        column: {
	            stacking: 'percent'
	        }
	    },
	    tooltip: {

		   	 useHTML: true,
	         backgroundColor: null,
	         borderWidth: 0,
	         followPointer: true,
     	     shared: true,
	         shadow: false,
	         formatter: function(){
	             return '<div style="color: #444; padding: 10px; opacity: 0.9; border-radius: 2px !important; min-width: 200px !important; background-color: #fff" class="tooltip"> ' +
	             '<p style="font-weight: 600;">' +toDateLabel(this.x) + '</p>' +
		            '<span  style="font-weight: 300; color: '+this.points[0].color+';">Error rate</span>:<span style="margin-left: 5px; font-weight: 600; color: '+this.points[0].color+';"> ' + this.points[0].y + ' %</span><br/>' +
		            '<span  style="font-weight: 300; color: '+this.points[1].color+';">Accuracy</span>:<span style="margin-left: 5px; font-weight: 600; color: '+this.points[1].color+';"> ' + this.points[1].y + ' %</span>' +
	                 '</div>';
	         }
	    },
	    series: [{
	        name: 'Error rate',
	        data: error,
            color: '#f7614e'

	    },{
	        name: 'Accuracy',
	        data: accuracy,
            color: '#49c279'
	    }

	    ]

	});
}

function toDateLabel(string) {
	var date = new Date(string);
	
	return date.getDayName() + ', ' + date.getMonthName() + ' ' + date.getDate() + ', ' + date.getFullYear();
	
}


function drawTable(data) {

	if(!data){
		return false;
	}
	var str = '';
	for(var i = 0; i < data.length; i++){
		str+= '<tr><td>'+data[i].DT+'</td><td>'+(data[i].HIS || data[i].HIS == 0? data[i].HIS: '--')+'</td><td>'+(data[i].PRE || data[i].PRE == 0? data[i].PRE: '--')+'</td></tr>'
	}
	
	$('.table-wrap table.prediction-table > tbody').empty().append(str);
	
// 	$('.table-wrap').show();

}


function drawTable3(data) {

	if(!data){
		return false;
	}
	var str = '';
	
	var max = Math.max.apply(Math, data.map(function(o) { return o == Infinity || o == -Infinity? -999999999: o; }))
	var min = Math.min.apply(Math, data.map(function(o) { return o == Infinity || o == -Infinity? 999999999: o; }))
	var powers = data.map(each =>  each == Infinity || each == -Infinity? null: each);

	var avg = powers.length > 0?  Number(getAverage(powers).toFixed(2)) : 0;
	var str = '';
	str+= '<tr><th>Min</th><td>'+min+'%</td></tr>'
	+ '<tr><th>Max</th><td>'+max+'%</td></tr>'
	+ '<tr><th>Average</th><td>'+avg+'%</td></tr>';
	$('.table-wrap table.accuracy-table > tbody').empty().append(str);
	
// 	$('.table-wrap').show();

}


function drawTable2(data) {
	if(!data){
		return false;
	}
	var max = Math.max.apply(Math, data.map(function(o) { return Math.abs(o.y); }))
	var min = Math.min.apply(Math, data.map(function(o) { return Math.abs(o.y); }))
	var powers = data.map(each => Math.abs(each.y));

	var avg =  powers.length > 0?  Number(getAverage(powers).toFixed(2)): 0;
	var str = '';
	str+= '<tr><th>Min</th><td>'+min+' m/s</td></tr>'
	+ '<tr><th>Max</th><td>'+max+' m/s</td></tr>'
	+ '<tr><th>Average</th><td>'+avg+' m/s</td></tr>';
	$('.table-wrap table.deviation-table > tbody').empty().append(str);

}

var getAverage = arr => {
	  var reducer = (total, currentValue) => total + currentValue;
	  var sum = arr.reduce(reducer)
	  return sum / arr.length;
}



</script>