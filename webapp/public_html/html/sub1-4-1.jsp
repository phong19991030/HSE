<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	
	<div class="container sensor-data">
	  <!--tit-wrap-->
	  <div class="tit-wrap">
	    <h2 class="heading3">
	      <span class="txt">Availability</span>
	      <span class="version">V47</span>
	    </h2>
	    <ul class="location">
	      <li>CMS</li>
	      <li>Availability</li>
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
	    <ul class="tab2">
	      <li>
	        <a href="#" class="popup-btn">
	          <span>WTG Compare</span>
	        </a>
	      </li>
	      <li>
	        <a href="#">
	          <span>3D Viewer</span>
	        </a>
	      </li>
	    </ul>
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
       
		<div class="base_grid_table">
	      <div class="table-wrap">
	        <table>
	          <caption>Availability - Section, 2018, 2019, Remarks</caption>
	          <colgroup>
	            <col style="width:25%">
	            <col style="width:25%">
	            <col style="width:25%">
	            <col style="width:25%">
	          </colgroup>
	          <thead>
	            <tr>
	              <th scope="col">Section</th>
	              <th scope="col">2018</th>
	              <th scope="col">2019</th>
	              <th scope="col">Remarks</th>
	            </tr>
	          </thead>
	          <tbody>
	            <tr>
	              <td>Capacity Factor</td>
	              <td>35.4%</td>
	              <td>35.0%</td>
	              <td>+0.6%</td>
	            </tr>
	          </tbody>
	        </table>
	      </div>
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
	
	  Highcharts.chart('container1', {
	    chart: {
	      type: 'areaspline',
	      reflow: true,
	      plotBackgroundColor: null
	    },
	    title: {
	      text: null
	    },
	    legend: {
	      layout: 'vertical',
	      align: 'left',
	      verticalAlign: 'top',
	      x: 150,
	      y: 100,
	      floating: true,
	      borderWidth: 1,
	      backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#fff'
	    },
	    xAxis: {
	      categories: [
	        '03.28',
	        '03.29',
	        '03.30',
	        '03.31',
	        '04.01',
	        '04.02',
	        '04.03',
	        '04.04'
	      ],
	      plotBands: [{ // visualize the weekend
	        from: 4.5,
	        to: 6.5,
	        color: '#fff'
	      }]
	    },
	    yAxis: {
	      title: {
	        text: null
	      }
	    },
	    tooltip: {
	      shared: true,
	      valueSuffix: 'units'
	    },
	    credits: {
	      enabled: false
	    },
	    plotOptions: {
	      areaspline: {
	        fillOpacity: 0.5
	      }
	    },
	    series: [{
	      name: '2020',
	      data: [3, 4, 3, 5, 4, 10, 12, 9]
	    }, {
	      name: '2019',
	      data: [1, 3, 4, 3, 3, 5, 4, 5]
	    }]
	  });
	  setInterval(function() {
	    $("#container1").highcharts().reflow();
	  }, 1);
	</script>
	<!--//js-->
<jsp:include page="include/footer.jsp"></jsp:include>