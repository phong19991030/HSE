<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>


<div class="box-cont box6">
	<strong class="heading6"> <span>Availability</span> <a href=""
		class="box-btn"> <i class="xi-angle-right-min"></i>
	</a>
	</strong>
	<div class="box-content">
		<div class="chart-info-wrap">
			<div class="chart-info-cont">
				<ul class="chart-info-lst">
					<li><span class="txt_crrYear">${currYear}</span></li>
					<li><span class="txt_prevYear">${prevYear}</span></li>
				</ul>

				<!--                       <div class="select-box"> -->
				<!--                         <label for="daySelect">Month</label> -->
				<!--                         <select name="daySelect1" id="daySelect" class="info-select"> -->
				<!--                           <option value="1">Month</option> -->
				<!--                           <option value="2">Day</option> -->
				<!--                         </select> -->
				<!--                       </div> -->
			</div>
		</div>
		<div class="graph-wrap">
			<div id="container1" 
				style="overflow: hidden;">
				
			</div>
		</div>
	</div>
</div>

<script>
var chart1;

 $(function(){
 	drawChart1();
 });

// 	drawChart1();

function drawChart1(){
	console.log('draw availability');

	chart1 = $('#container1').highcharts({
	    chart: {
	      type: 'areaspline',
	      reflow: true
	    },
	    title: {
	      text: 'availibility chart'
	    },
	     
// 	    legend: {
// 	      layout: 'vertical',
// 	      align: 'left',
// 	      verticalAlign: 'top',
// 	      x: 150,
// 	      y: 100,
// 	      floating: true,
// 	      borderWidth: 1,
// 	      backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#fff'
// 	    },
// 	    tooltip: {
// 		      shared: true,
// 		      valueSuffix: 'units'
// 		    },
// 		    credits: {
// 		      enabled: false
// 		    },
// 		    plotOptions: {
// 		      areaspline: {
// 		        fillOpacity: 0.5
// 		      }
// 		    },
	    xAxis: {
	      categories: ${categories},
	      plotBands: [{ // visualize the weekend
	        from: 4.5,
	        to: 6.5,
	        color: '#fff'
	      }]
	    },
	    yAxis: {
	      title: {
	        text: ''
	      }
	    },
	    series: [{
	        name: ${prevYear},
	        data: ${prevList}
	      }, {
	        name: ${currYear},
	        data: ${currList}
	      }]
	  });
	
}




</script>