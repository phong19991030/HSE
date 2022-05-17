<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	
	<div class="container sensor-data sensor-data-mobile">
	  <!--tit-wrap-->
	  <div class="tit-wrap">
	    <h2 class="heading3">
	      <span class="txt">Sensor Error</span>
	      <span class="version">V47</span>
	    </h2>
	    <ul class="location">
	      <li>CMS</li>
	      <li>Sensor Data</li>
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
	
	  <div class="chart-wrapper">
	  	<div class="chart-info-wrap">
		    <div class="chart-info-cont">
		    	
		     <strong class="heading5">Availability</strong>
		    
		      <ul class="chart-info-lst">
		        <li>
		          <span>2020</span>
		        </li>
		        <li>
		          <span>2019</span>
		        </li>
		      </ul>
		    </div>
		  </div>
		  <div class="graph-wrap">
		    <div id="container1"></div>
		  </div>
	  </div>
	  
	  <div class="sensor-data-table-wrap">
	    <div class="sensor-table-wrap sensor-table-wrap-blade">
	        <!-- Sensor Data table default -->
	        <div class="sensor-table sensor-table-default">
	          <a href="#none" class="sensor-data-btn sensor-data-btn-modify">
	            <i class="xi-pen"></i>
	            <span class="sr-only">modify</span>
	          </a>
	          <a href="#none" class="sensor-data-btn sensor-data-btn-complete">
	            <i class="xi-check"></i>
	            <span class="sr-only">complete</span>
	          </a>
	          <div class="base_grid_table">
	            <table>
	              <caption>Sensor Data - Blade1</caption>
	              <colgroup>
	                <col style="width:50%">
	                <col style="width:50%">
	              </colgroup>
	              <thead>
	                <tr>
	                  <th scope="col" colspan="2">Blade1</th>
	                </tr>
	              </thead>
	              <tbody>
	                <tr>
	                  <td>
	                  	<a href="#none">b1-r-flap</a>
	                  </td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="b1-r-flapMin" class="sr-only"></label>
		                        <input type="text" id="b1-r-flapMin" name="b1-r-flapMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="b1-r-flapMax" class="sr-only"></label>
		                        <input type="text" id="b1-r-flapMax" name="b1-r-flapMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td>
	                  	<a href="#none">b1-r-edge</a>
	                  </td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result2">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="b1-r-edgeMin" class="sr-only"></label>
		                        <input type="text" id="b1-r-edgeMin" name="b1-r-edgeMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="b1-r-edgeMax" class="sr-only"></label>
		                        <input type="text" id="b1-r-edgeMax" name="b1-r-edgeMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">b1-m-flap</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="b1-m-flapMin" class="sr-only"></label>
		                        <input type="text" id="b1-m-flapMin" name="b1-m-flapMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="b1-m-flapMax" class="sr-only"></label>
		                        <input type="text" id="b1-m-flapMax" name="b1-m-flapMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">b1-m-edge</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="b1-m-edgeMin" class="sr-only"></label>
		                        <input type="text" id="b1-m-edgeMin" name="b1-m-edgeMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="b1-m-edgeMax" class="sr-only"></label>
		                        <input type="text" id="b1-m-edgeMax" name="b1-m-edgeMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	              </tbody>
	            </table>
	          </div>
	          <em class="unit">Unit : kNm</em>
	        </div>
	        <!-- //Sensor Data table default -->
	      </div>
	  </div>
	</div>
	
	<!-- layerpopup -->
	<!--<div id="layerPopup" class="layer-popup-wtg-compare active">
	  <div class="layer-cont">
	    <div class="tit-wrap">
	      <strong class="heading6">WTG Compare</strong>
	    </div>
	
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
	    <div class="x-scroll">
	      <ul class="tab2 x-scroll-cont">
	        <li>
	          <a href="#">
	            <span>Overview</span>
	          </a>
	        </li>
	        <li class="active">
	          <a href="#">
	            <span>Blade1</span>
	          </a>
	        </li>
	        <li>
	          <a href="#">
	            <span>Blade2</span>
	          </a>
	        </li>
	        <li>
	          <a href="#">
	            <span>Blade3</span>
	          </a>
	        </li>
	        <li>
	          <a href="#">
	            <span>Tower</span>
	          </a>
	        </li>
	        <li>
	          <a href="#">
	            <span>Shaft</span>
	          </a>
	        </li>
	        <li>
	          <a href="#">
	            <span>Controller</span>
	          </a>
	        </li>
	        <li>
	          <a href="#">
	            <span>met_mast</span>
	          </a>
	        </li>
	        <li>
	          <a href="#">
	            <span>Gearbox</span>
	          </a>
	        </li>
	        <li>
	          <a href="#">
	            <span>Generator</span>
	          </a>
	        </li>
	      </ul>
	    </div>
	
	
	    <div class="x-scroll">
	      <ul class="wtg-company-lst x-scroll-cont">
	        <li>
	          <img src="/img/sub/ex_logo1.png" alt="" class="logo">
	          <span class="wtg-company-info">
	            <span>Manufacture / Model</span>
	            <em>Vestas / V47</em>
	          </span>
	          <div class="btns">
	            <a href="" class="btn-style btn-style4">
	              <i class="xi-exchange"></i>
	            </a>
	            <a href="" class="btn-style btn-style4">
	              <i class="xi-close"></i>
	            </a>
	          </div>
	        </li>
	        <li>
	          <img src="/img/sub/ex_logo2.png" alt="" class="logo">
	          <span class="wtg-company-info">
	            <span>Manufacture / Model</span>
	            <em>SIEMENS / A20</em>
	          </span>
	          <div class="btns">
	            <a href="" class="btn-style btn-style4">
	              <i class="xi-exchange"></i>
	            </a>
	            <a href="" class="btn-style btn-style4">
	              <i class="xi-close"></i>
	            </a>
	          </div>
	        </li>
	        <li>
	          <img src="/img/sub/ex_logo3.png" alt="" class="logo">
	          <span class="wtg-company-info">
	            <span>Manufacture / Model</span>
	            <em>MITSUBISHI / M41</em>
	          </span>
	          <div class="btns">
	            <a href="" class="btn-style btn-style4">
	              <i class="xi-exchange"></i>
	            </a>
	            <a href="" class="btn-style btn-style4">
	              <i class="xi-close"></i>
	            </a>
	          </div>
	        </li>
	        <li>
	          <a href="#none" class="blank-info">
	            <i class="xi-plus-circle"></i>
	          </a>
	        </li>
	      </ul>
	    </div>
	
	
	    <div class="info-graph-wrap">
	      <div class="tit-wrap tit-wrap2">
	        <div class="heading3">
	          <span class="txt">Blade1</span>
	          <span class="version">b1-m-edge
	            <a href="#none" class="layer-menu-btn">
	              <span class="sr-only">select graph</span>
	              <i class="xi-tune"></i>
	            </a>
	          </span>
	
	          <div class="layer-popup-menu">
	            <strong class="layer-popup-menu-name">Blade1</strong>
	            <div class="layer-popup-menu-lst-scroll">
	              <ul class="layer-popup-menu-lst checkbox-radio-custom">
	                <li>
	                  <input type="radio" class="radio" id="b1-r-flapMenu" name="bladeSelect">
	                  <label for="b1-r-flapMenu">b1-r-flap</label>
	                </li>
	                <li>
	                  <input type="radio" class="radio" id="b1-r-edgeMenu" name="bladeSelect">
	                  <label for="b1-r-edgeMenu">b1-r-edge</label>
	                </li>
	                <li>
	                  <input type="radio" class="radio" id="b1-m-flapMenu" name="bladeSelect">
	                  <label for="b1-m-flapMenu">b1-m-flap</label>
	                </li>
	                <li>
	                  <input type="radio" class="radio" id="b1-m-edgeMenu" name="bladeSelect">
	                  <label for="b1-m-edgeMenu">b1-m-edge</label>
	                </li>
	                <li>
	                  <input type="radio" class="radio" id="" name="bladeSelect">
	                  <label for="">5개 이상일 시</label>
	                </li>
	              </ul>
	            </div>
	          </div>
	        </div>
	
	        <div class="chart-info-wrap">
	          <ul class="chart-info-lst">
	            <li>
	              <span>MITSUBISHI</span>
	            </li>
	            <li>
	              <span>Vestas</span>
	            </li>
	            <li>
	              <span>SIEMENS</span>
	            </li>
	          </ul>
	        </div>
	      </div>
	
	      <div class="graph-wrap">
	        <div id="container2"></div>
	      </div>
	    </div>
	
	    <a href="#none" class="layer-close">
	      <span class="sr-only">close layer popup</span>
	      <i class="xi-close"></i>
	    </a>
	  </div>
	  <div class="select-turbine-pop active">
	      <strong class="heading7">Select a Turbine</strong>
	      <div class="select-box">
	        <label for="selectWinfarm"></label>
	        <select name="selectWinfarm" id="selectWinfarm" class="info-select">
	          <option value="1">Select a Winfarm</option>
	          <option value="2"></option>
	          <option value="3"></option>
	        </select>
	      </div>
	      <div class="select-box">
	        <label for="selectGroup"></label>
	        <select name="selectGroup" id="selectGroup" class="info-select">
	          <option value="1">Select a Winfarm</option>
	          <option value="2"></option>
	          <option value="3"></option>
	        </select>
	      </div>
	      <div class="select-box">
	        <label for="selectTurbine"></label>
	        <select name="selectTurbine" id="selectTurbine" class="info-select">
	          <option value="1">Select a Winfarm</option>
	          <option value="2"></option>
	          <option value="3"></option>
	        </select>
	      </div>
	
	      <div class="btns txt-right">
	        <a href="" class="btn-style btn-style4">Cancel</a>
	        <a href="" class="btn-style btn-style4">add</a>
	      </div>
	
	      <a href="#none" class="select-turbine-pop-close">
	        <span class="sr-only">close Select a Turbine popup</span>
	        <i class="xi-close"></i>
	      </a>
	    </div>
	</div>-->
	<!-- //layerpopup -->
	
	<!--js-->
	<script src="https://code.highcharts.com/stock/highstock.js"></script>
	<script src="https://code.highcharts.com/stock/modules/data.js"></script>
	<script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/stock/modules/export-data.js"></script>
	
	<script type="text/javascript">
	  Highcharts.setOptions({
	    colors: ['#486dfb', '#89898b', '#dd6945']
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
	  
	  $(".graph-wrap").mCustomScrollbar({
	    axis: "x",
	    advanced: {
	      autoExpandHorizontalScroll: true
	    },
	    theme: "minimal-dark",
	    mouseWheelPixels: 300
	  });
	</script>
	<!--//js-->
<jsp:include page="include/footer.jsp"></jsp:include>