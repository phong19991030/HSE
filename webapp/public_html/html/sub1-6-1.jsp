<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	
	<div class="container sensor-data">
	  <!--tit-wrap-->
	  <div class="tit-wrap">
	    <h2 class="heading3">
	      <span class="txt">Error Events</span>
	      <span class="version">V47</span>
	    </h2>
	    <ul class="location">
	      <li>CMS</li>
	      <li>Error Events</li>
	      <li>HANGWON</li>
	      <li>Group01</li>
	      <li class="bold">V47</li>
	    </ul>
		</div>
		
		    
	  <!--//tit-wrap-->
	  <div class="search-form-wrap search-form-wrap2">
	    <div class="calendar-picker">
	      <div class="calendar-wrap">
	        <div class="input-group">
	          <label for="searchText" class="sr-only"></label>
	          <input type="text" id="searchText" name="searchText" value="">
	          <button class="calendar-picker-btn">
	            <i class="xi-calendar"></i>
	          </button>
	        </div>
	        <em class="hyphen">
	          <span class="sr-only">-</span>
	        </em>
	        <div class="input-group">
	          <label for="searchText" class="sr-only"></label>
	          <input type="text" id="searchText" name="searchText" value="">
	          <button class="calendar-picker-btn">
	            <i class="xi-calendar"></i>
	          </button>
	        </div>
	      </div>
	      <button class="search-btn">search</button>
	    </div>
	  </div>
	  
	  <div class="chart-info-wrap">
	    <div class="chart-info-cont">
	      <ul class="chart-info-lst">
	        <li>
	          <span>2020</span>
	        </li>
	        <li>
	          <span>2019</span>
	        </li>
	      </ul>
	
	      <div class="select-box">
	        <label for="daySelect"></label>
	        <select name="daySelect1" id="daySelect" class="info-select">
	          <option value="1">Day</option>
	          <option value="2">Month</option>
	          <option value="3">Year</option>
	        </select>
	      </div>
	    </div>
	  </div>
	  <div class="graph-wrap">
	    <div id="container1"></div>
	  </div>
	  
	  <div class="btns txt-right">
         <a href="" class="btn-style btn-style4">PNG Download</a>
         <a href="" class="btn-style btn-style4">PDF Download</a>
       </div>
       
		<div class="fixed-table">
			<div class="base_grid_table">
	        <table>
	          <caption>Alarm code - Alarm code, 2018, 2019, Remarks</caption>
	          <colgroup>
	            <col style="width:25%">
	            <col style="width:25%">
	            <col style="width:25%">
	            <col style="width:25%">
	          </colgroup>
	          <thead>
	            <tr>
	              <th scope="col">Alarm code</th>
	              <th scope="col">2018</th>
	              <th scope="col">2019</th>
	              <th scope="col">Remarks</th>
	            </tr>
	          </thead>
	          <tbody>
	            <tr>
	              <td>001</td>
	              <td>2 (0.1%)</td>
	              <td>1 (0.05%)</td>
	              <td>-1</td>
	            </tr>
	            <tr>
	              <td>001</td>
	              <td>2 (0.1%)</td>
	              <td>1 (0.05%)</td>
	              <td>-1</td>
	            </tr>
	            <tr>
	              <td>001</td>
	              <td>2 (0.1%)</td>
	              <td>1 (0.05%)</td>
	              <td>-1</td>
	            </tr>
	            <tr>
	              <td>001</td>
	              <td>2 (0.1%)</td>
	              <td>1 (0.05%)</td>
	              <td>-1</td>
	            </tr>
	            <tr>
	              <td>001</td>
	              <td>2 (0.1%)</td>
	              <td>1 (0.05%)</td>
	              <td>-1</td>
	            </tr>
	          </tbody>
	          <tfoot>
		        <tr>
		            <td>Total</td>
		            <td>2011 (100%)</td>
		            <td>1989 (100%)</td>
		            <td></td>
		        </tr>
		    </tfoot>
	        </table>
	    </div>
		</div>
	  
	  <div class="btns txt-right">
         <a href="" class="btn-style btn-style4">PNG Download</a>
         <a href="" class="btn-style btn-style4">PDF Download</a>
       </div>
	</div>
	
	
	<!--js-->
	<script src="https://code.highcharts.com/stock/highstock.js"></script>
	<script src="https://code.highcharts.com/stock/modules/data.js"></script>
	<script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/stock/modules/export-data.js"></script>
	
	<script type="text/javascript">
	  Highcharts.setOptions({
	    colors: ['#486dfb', '#89898b']
	  });
      var chart = Highcharts.chart('container1', {

          chart: {
              type: 'column'
          },

          title: {
              text: null
          },

          subtitle: {
              text: null
          },

         /*  legend: {
              align: 'right',
              verticalAlign: 'middle',
              layout: 'vertical'
          }, */

          xAxis: {
              categories: ['Tower', 'Hub &Rotor', 'Gear Train', 'Generator', 'Hydraulic system', 'Yaw system', 'Pitch system', 'Blade'],
              labels: {
                  x: -10
              }
          },

         yAxis: {
              allowDecimals: false,
              title: {
                  text: null
              }
          },

          series: [{
              name: '2020',
              data: [1, 4, 3, 5, 2, 4, 6, 7]
          }, {
              name: '2019',
              data: [6, 4, 2, 1, 4, 3, 5, 2]
          }],

         /*  responsive: {
              rules: [{
                  condition: {
                      maxWidth: 500
                  },
                  chartOptions: {
                      legend: {
                          align: 'center',
                          verticalAlign: 'bottom',
                          layout: 'horizontal'
                      },
                      yAxis: {
                          labels: {
                              align: 'left',
                              x: 0,
                              y: -5
                          },
                          title: {
                              text: null
                          }
                      },
                      subtitle: {
                          text: null
                      },
                      credits: {
                          enabled: false
                      }
                  }
              }]
          } */
      });
	  setInterval(function() {
	    $("#container1").highcharts().reflow();
	  }, 1);
	 </script>
	<!--//js-->
<jsp:include page="include/footer.jsp"></jsp:include>