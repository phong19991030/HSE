<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>

             
              <div class="box-cont box4">
               <strong class="heading6">
                <span>Production</span>
                <a href="" class="box-btn">
                  <i class="xi-angle-right-min"></i>
                </a>
              </strong>
                <div class="box-content">
                  <div class="chart-info-wrap">
                    <div class="chart-info-cont">
                      <ul class="chart-info-lst">
                        <li>
                          <span class="txt_crrYear">2020</span>
                        </li>
                        <li>
                          <span class="txt_prevYear">2019</span>
                        </li>
                      </ul>

<!--                       <div class="select-box"> -->
<!--                         <label for="daySelect">Day</label> -->
<!--                         <select name="daySelect1" id="daySelect" class="info-select"> -->
<!--                           <option value="1">Day</option> -->
<!--                           <option value="2">Month</option> -->
<!--                           <option value="3">Year</option> -->
<!--                         </select> -->
<!--                       </div> -->
                    </div>
                  </div>
                  <div class="graph-wrap">
                    <div id="container2" style="overflow: hidden;">
                    </div>
                  </div>
                </div>
              </div>
<script>
var char2;
$(function(){
	drawChart2();
});



function drawChart2(){
	console.log('draw production');
	chart2 = $('#container2').highcharts({
		chart: {
		      type: 'areaspline',
		      reflow: true
		    },
		    title: {
		      text: "production"
		    },
		    legend: {
		      layout: 'vertical',
		      align: 'left',
		      verticalAlign: 'top',
		      x: 150,
		      y: 100,
		      floating: true,
		      borderWidth: 1,
		      backgroundColor:  '#fff'
		    },
		  xAxis: {
			  categories:  ${categories},
		      plotBands: [{ // visualize the weekend
		        from: 4.5,
		        to: 6.5,
		        color: '#fff'
		      }]
		  },
		  yAxis: {
		    title: {
		      text: null
		    },
		    labels: {
		      formatter: function() {
		        return this.value / 1000 + 'k';
		      }
		    }
		  },
		  tooltip: {
		    pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
		  },
		  plotOptions: {
		    area: {
		      pointStart: 1940,
		      marker: {
		        enabled: false,
		        symbol: 'circle',
		        radius: 0,
		        states: {
		          hover: {
		            enabled: true
		          }
		        }
		      }
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
            