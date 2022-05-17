<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	
	<div class="container sensor-data">
	  <!--tit-wrap-->
	  <div class="tit-wrap">
	    <h2 class="heading3">
	      <span class="txt">Sensor Data</span>
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
	
	
	  <div class="sensor-data-table-wrap">
	    <div class="sensor-table-scroll">
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
	              <caption>Sensor Data - Blade2</caption>
	              <colgroup>
	                <col style="width:50%">
	                <col style="width:50%">
	              </colgroup>
	              <thead>
	                <tr>
	                  <th scope="col" colspan="2">Blade2</th>
	                </tr>
	              </thead>
	              <tbody>
	                <tr>
	                  <td><a href="#none">b2-r-flap</a></td>
	                  <td>
	                    <a href="#none">
	                    	<span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="b2-r-flapMin" class="sr-only"></label>
		                        <input type="text" id="b2-r-flapMin" name="b2-r-flapMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="b2-r-flapMax" class="sr-only"></label>
		                        <input type="text" id="b2-r-flapMax" name="b2-r-flapMax" value="" placeholder="max">
		                      </span>
		                    </span>
	                    </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">b2-r-edge</a></td>
	                  <td>
	                    <a href="#none">
	                    	<span class="sensor-data-result sensor-data-result2">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="b2-r-edgeMin" class="sr-only"></label>
		                        <input type="text" id="b2-r-edgeMin" name="b2-r-edgeMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="b2-r-edgeMax" class="sr-only"></label>
		                        <input type="text" id="b2-r-edgeMax" name="b2-r-edgeMax" value="" placeholder="max">
		                      </span>
		                    </span>
	                    </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">b2-m-flap</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="b2-m-flapMin" class="sr-only"></label>
		                        <input type="text" id="b2-m-flapMin" name="b2-m-flapMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="b2-m-flapMax" class="sr-only"></label>
		                        <input type="text" id="b2-m-flapMax" name="b2-m-flapMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                   </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">b2-m-edge</a></td>
	                  <td>
		                  <a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="b2-m-edgeMin" class="sr-only"></label>
		                        <input type="text" id="b2-m-edgeMin" name="b2-m-edgeMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="b2-m-edgeMax" class="sr-only"></label>
		                        <input type="text" id="b2-m-edgeMax" name="b2-m-edgeMax" value="" placeholder="max">
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
	              <caption>Sensor Data - Blade3</caption>
	              <colgroup>
	                <col style="width:50%">
	                <col style="width:50%">
	              </colgroup>
	              <thead>
	                <tr>
	                  <th scope="col" colspan="2">Blade3</th>
	                </tr>
	              </thead>
	              <tbody>
	                <tr>
	                  <td><a href="#none">b3-r-flap</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="b3-r-flapMin" class="sr-only"></label>
		                        <input type="text" id="b3-r-flapMin" name="b3-r-flapMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="b3-r-flapMax" class="sr-only"></label>
		                        <input type="text" id="b3-r-flapMax" name="b3-r-flapMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">b3-r-edge</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result2">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="b3-r-edgeMin" class="sr-only"></label>
		                        <input type="text" id="b3-r-edgeMin" name="b3-r-edgeMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="b3-r-edgeMax" class="sr-only"></label>
		                        <input type="text" id="b3-r-edgeMax" name="b3-r-edgeMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">b3-m-flap</a></td>
	                  <td>
	                    <a href="#none">
	                    	<span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="b3-m-flapMin" class="sr-only"></label>
		                        <input type="text" id="b3-m-flapMin" name="b3-m-flapMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="b3-m-flapMax" class="sr-only"></label>
		                        <input type="text" id="b3-m-flapMax" name="b3-m-flapMax" value="" placeholder="max">
		                      </span>
		                    </span>
	                    </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">b3-m-edge</a></td>
	                  <td>
	                  	<a href="#none">
	                  		<span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="b3-m-edgeMin" class="sr-only"></label>
		                        <input type="text" id="b3-m-edgeMin" name="b3-m-edgeMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="b3-m-edgeMax" class="sr-only"></label>
		                        <input type="text" id="b3-m-edgeMax" name="b3-m-edgeMax" value="" placeholder="max">
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
	
	      <div class="sensor-table-wrap sensor-table-wrap-m">
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
	              <caption>Sensor Data - Tower</caption>
	              <colgroup>
	                <col style="width:60%">
	                <col style="width:40%">
	              </colgroup>
	              <thead>
	                <tr>
	                  <th scope="col" colspan="2">Tower</th>
	                </tr>
	              </thead>
	              <tbody>
	                <tr>
	                  <td><a href="#none">Tower_Base_B_38_218</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="Tower_Base_B_38_218Min" class="sr-only"></label>
		                        <input type="text" id="Tower_Base_B_38_218Min" name="Tower_Base_B_38_218Min" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="Tower_Base_B_38_218Max" class="sr-only"></label>
		                        <input type="text" id="Tower_Base_B_38_218Max" name="Tower_Base_B_38_218Max" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">Tower_Base_B_128_308</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result2">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="Tower_Base_B_128_308Min" class="sr-only"></label>
		                        <input type="text" id="Tower_Base_B_128_308Min" name="Tower_Base_B_128_308Min" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="Tower_Base_B_128_308Max" class="sr-only"></label>
		                        <input type="text" id="Tower_Base_B_128_308Max" name="Tower_Base_B_128_308Max" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none"></a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="blankMin1" class="sr-only"></label>
		                        <input type="text" id="blankMin1" name="blankMin1" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="blankMax1" class="sr-only"></label>
		                        <input type="text" id="blankMax1" name="blankMax1" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none"></a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="blankMin2" class="sr-only"></label>
		                        <input type="text" id="blankMin2" name="blankMin2" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="blankMax2" class="sr-only"></label>
		                        <input type="text" id="blankMax2" name="blankMax2" value="" placeholder="max">
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
	
	      <div class="sensor-table-wrap sensor-table-wrap-m">
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
	              <caption>Sensor Data - shaft</caption>
	              <colgroup>
	                <col style="width:60%">
	                <col style="width:40%">
	              </colgroup>
	              <thead>
	                <tr>
	                  <th scope="col" colspan="2">shaft</th>
	                </tr>
	              </thead>
	              <tbody>
	                <tr>
	                  <td><a href="#none">Shaft_B_0_180</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="Shaft_B_0_180Min" class="sr-only"></label>
		                        <input type="text" id="Shaft_B_0_180Min" name="Shaft_B_0_180Min" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="Shaft_B_0_180Max" class="sr-only"></label>
		                        <input type="text" id="Shaft_B_0_180Max" name="Shaft_B_0_180Max" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">Shaft_B_90_270</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result2">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="Tower_Base_B_128_308Min" class="sr-only"></label>
		                        <input type="text" id="Shaft_B_90_270Min" name="Shaft_B_90_270Min" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="Tower_Base_B_128_308Max" class="sr-only"></label>
		                        <input type="text" id="Shaft_B_90_270Max" name="Shaft_B_90_270Max" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">Shaft_T_0_180</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="Shaft_T_0_180Min" class="sr-only"></label>
		                        <input type="text" id="Shaft_T_0_180Min" name="Shaft_T_0_180Min" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="Shaft_T_0_180Max" class="sr-only"></label>
		                        <input type="text" id="Shaft_T_0_180Max" name="Shaft_T_0_180Max" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none"></a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="blankMin3" class="sr-only"></label>
		                        <input type="text" id="blankMin3" name="blankMin3" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="blankMax3" class="sr-only"></label>
		                        <input type="text" id="blankMax3" name="blankMax3" value="" placeholder="max">
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
	
	      <div class="sensor-table-wrap sensor-table-wrap-m">
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
	              <caption>Sensor Data - Controller</caption>
	              <colgroup>
	                <col style="width:60%">
	                <col style="width:40%">
	              </colgroup>
	              <thead>
	                <tr>
	                  <th scope="col" colspan="2">Controller</th>
	                </tr>
	              </thead>
	              <tbody>
	                <tr>
	                  <td><a href="#none">r_azimuth_angle</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="r_azimuth_angleMin" class="sr-only"></label>
		                        <input type="text" id="r_azimuth_angleMin" name="r_azimuth_angleMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="r_azimuth_angleMax" class="sr-only"></label>
		                        <input type="text" id="r_azimuth_angleMax" name="r_azimuth_angleMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">n_direction</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result2">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="n_directionMin" class="sr-only"></label>
		                        <input type="text" id="n_directionMin" name="n_directionMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="n_directionMax" class="sr-only"></label>
		                        <input type="text" id="n_directionMax" name="n_directionMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">pitchangle 1</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="pitchangleMin" class="sr-only"></label>
		                        <input type="text" id="pitchangleMin" name="pitchangleMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="pitchangleMax" class="sr-only"></label>
		                        <input type="text" id="pitchangleMax" name="pitchangleMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">gene_rpm</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="gene_rpmMin" class="sr-only"></label>
		                        <input type="text" id="gene_rpmMin" name="gene_rpmMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="gene_rpmMax" class="sr-only"></label>
		                        <input type="text" id="gene_rpmMax" name="gene_rpmMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">rotor_rpm</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="rotor_rpmMin" class="sr-only"></label>
		                        <input type="text" id="rotor_rpmMin" name="rotor_rpmMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="rotor_rpmMax" class="sr-only"></label>
		                        <input type="text" id="rotor_rpmMax" name="rotor_rpmMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">power</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="powerMin" class="sr-only"></label>
		                        <input type="text" id="powerMin" name="powerMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="powerMax" class="sr-only"></label>
		                        <input type="text" id="powerMax" name="powerMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">w_direction</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="w_directionMin" class="sr-only"></label>
		                        <input type="text" id="w_directionMin" name="w_directionMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="w_directionMax" class="sr-only"></label>
		                        <input type="text" id="w_directionMax" name="w_directionMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">w_speed</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="w_speedMin" class="sr-only"></label>
		                        <input type="text" id="w_speedMin" name="w_speedMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="w_speedMax" class="sr-only"></label>
		                        <input type="text" id="w_speedMax" name="w_speedMax" value="" placeholder="max">
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
	
	      <div class="sensor-table-wrap sensor-table-wrap-m">
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
	              <caption>Sensor Data - met_mast</caption>
	              <colgroup>
	                <col style="width:60%">
	                <col style="width:40%">
	              </colgroup>
	              <thead>
	                <tr>
	                  <th scope="col" colspan="2">met_mast</th>
	                </tr>
	              </thead>
	              <tbody>
	                <tr>
	                  <td><a href="#none">t_98_in</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="t_98_inMin" class="sr-only"></label>
		                        <input type="text" id="t_98_inMin" name="t_98_inMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="t_98_inMax" class="sr-only"></label>
		                        <input type="text" id="t_98_inMax" name="t_98_inMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                 </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">w_direction_96_31</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result2">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="w_direction_96_31Min" class="sr-only"></label>
		                        <input type="text" id="w_direction_96_31Min" name="w_direction_96_31Min" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="w_direction_96_31Max" class="sr-only"></label>
		                        <input type="text" id="w_direction_96_31Max" name="w_direction_96_31Max" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">w_speed_100_32</a></td>
	                  <td>
	                    <a href="#none">
	                    	<span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="w_speed_100_32Min" class="sr-only"></label>
		                        <input type="text" id="w_speed_100_32Min" name="w_speed_100_32Min" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="w_speed_100_32Max" class="sr-only"></label>
		                        <input type="text" id="w_speed_100_32Max" name="w_speed_100_32Max" value="" placeholder="max">
		                      </span>
		                    </span>
	                    </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none"></a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="blankMin4" class="sr-only"></label>
		                        <input type="text" id="blankMin4" name="blankMin4" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="blankMax4" class="sr-only"></label>
		                        <input type="text" id="blankMax4" name="blankMax4" value="" placeholder="max">
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
	
	      <div class="sensor-table-wrap sensor-table-wrap-m">
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
	              <caption>Sensor Data - gearbox</caption>
	              <colgroup>
	                <col style="width:60%">
	                <col style="width:40%">
	              </colgroup>
	              <thead>
	                <tr>
	                  <th scope="col" colspan="2">gearbox</th>
	                </tr>
	              </thead>
	              <tbody>
	                <tr>
	                  <td><a href="#none">1axis2-x</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="1axis2-xMin" class="sr-only"></label>
		                        <input type="text" id="1axis2-xMin" name="1axis2-xMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="1axis2-xMax" class="sr-only"></label>
		                        <input type="text" id="1axis2-xMax" name="1axis2-xMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">1axis0-z</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result2">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="1axis0-zMin" class="sr-only"></label>
		                        <input type="text" id="1axis0-zMin" name="1axis0-zMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="1axis0-zMax" class="sr-only"></label>
		                        <input type="text" id="1axis0-zMax" name="1axis0-zMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">3axis3-z</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="3axis3-zMin" class="sr-only"></label>
		                        <input type="text" id="3axis3-zMin" name="3axis3-zMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="3axis3-zMax" class="sr-only"></label>
		                        <input type="text" id="3axis3-zMax" name="3axis3-zMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">3axis3-y</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="3axis3-yMin" class="sr-only"></label>
		                        <input type="text" id="3axis3-ynMin" name="3axis3-yMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="3axis3-yMax" class="sr-only"></label>
		                        <input type="text" id="3axis3-yMax" name="3axis3-yMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">3axis3-x</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="3axis3-xMin" class="sr-only"></label>
		                        <input type="text" id="3axis3-xMin" name="3axis3-xMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="3axis3-xMax" class="sr-only"></label>
		                        <input type="text" id="3axis3-xMax" name="3axis3-xMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">3axis1-y</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="3axis1-yMin" class="sr-only"></label>
		                        <input type="text" id="3axis1-yMin" name="3axis1-yMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="3axis1-yMax" class="sr-only"></label>
		                        <input type="text" id="3axis1-yMax" name="3axis1-yMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">3axis1-x</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="3axis1-xMin" class="sr-only"></label>
		                        <input type="text" id="3axis1-xMin" name="3axis1-xMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="3axis1-xMax" class="sr-only"></label>
		                        <input type="text" id="3axis1-xMax" name="3axis1-xMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">3axis2-y</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="3axis2-yMin" class="sr-only"></label>
		                        <input type="text" id="3axis2-yMin" name="3axis2-yMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="3axis2-yMax" class="sr-only"></label>
		                        <input type="text" id="3axis2-yMax" name="3axis2-yMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">3axis2-x</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="3axis2-xMin" class="sr-only"></label>
		                        <input type="text" id="3axis2-xMin" name="3axis2-xMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="3axis2-xMax" class="sr-only"></label>
		                        <input type="text" id="3axis2-xMax" name="3axis2-xMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">1axis1-z</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="1axis1-zMin" class="sr-only"></label>
		                        <input type="text" id="1axis1-zMin" name="1axis1-zMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="1axis1-zMax" class="sr-only"></label>
		                        <input type="text" id="1axis1-zMax" name="1axis1-zMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">3axis1-z</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="3axis1-zMin" class="sr-only"></label>
		                        <input type="text" id="3axis1-zMin" name="3axis1-zMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="3axis1-zMax" class="sr-only"></label>
		                        <input type="text" id="3axis1-zMax" name="3axis1-zMax" value="" placeholder="max">
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
	
	      <div class="sensor-table-wrap sensor-table-wrap-m">
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
	              <caption>Sensor Data - generator</caption>
	              <colgroup>
	                <col style="width:60%">
	                <col style="width:40%">
	              </colgroup>
	              <thead>
	                <tr>
	                  <th scope="col" colspan="2">generator</th>
	                </tr>
	              </thead>
	              <tbody>
	                <tr>
	                  <td><a href="#none">generator-housing-GE-DE_in</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="generator-housing-GE-DE_inMin" class="sr-only"></label>
		                        <input type="text" id="generator-housing-GE-DE_inMin" name="generator-housing-GE-DE_inMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="generator-housing-GE-DE_inMax" class="sr-only"></label>
		                        <input type="text" id="generator-housing-GE-DE_inMax" name="generator-housing-GE-DE_inMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">generator-housing-GE-NDE_in</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result2">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="generator-housing-GE-NDE_inMin" class="sr-only"></label>
		                        <input type="text" id="generator-housing-GE-NDE_inMin" name="generator-housing-GE-NDE_inMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="generator-housing-GE-NDE_inMax" class="sr-only"></label>
		                        <input type="text" id="generator-housing-GE-NDE_inMax" name="generator-housing-GE-NDE_inMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">generator-housing-GE-NDE_inMax</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="generator-housing-GE-NDE_inMin" class="sr-only"></label>
		                        <input type="text" id="generator-housing-GE-NDE_inMin" name="generator-housing-GE-NDE_inMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="generator-housing-GE-NDE_inMax" class="sr-only"></label>
		                        <input type="text" id="generator-housing-GE-NDE_inMax" name="generator-housing-GE-NDE_inMax" value="" placeholder="max">
		                      </span>
		                    </span>
		                  </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td><a href="#none">generator-housing-GE-NDE_out</a></td>
	                  <td>
	                  	<a href="#none">
		                    <span class="sensor-data-result sensor-data-result1">11.3</span>
		                    <span class="input-wrapper">
		                      <span class="input-group">
		                        <label for="generator-housing-GE-NDE_outMin" class="sr-only"></label>
		                        <input type="text" id="generator-housing-GE-NDE_outMin" name="generator-housing-GE-NDE_outMin" value="" placeholder="min">
		                      </span>
		                      <span class="input-group">
		                        <label for="generator-housing-GE-NDE_outMax" class="sr-only"></label>
		                        <input type="text" id="generator-housing-GE-NDE_outMax" name="generator-housing-GE-NDE_outMax" value="" placeholder="max">
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
	
	  <!--tit-wrap-->
	  <div class="tit-wrap tit-wrap2">
	    <h2 class="heading3">
	      <span class="txt">Blade1</span>
	      <span class="version">b1-m-edge</span>
	    </h2>
	  </div>
	  <!--//tit-wrap-->
	  <div class="chart-info-wrap">
	    <div class="chart-info-cont">
	      <ul class="chart-info-lst">
	        <li>
	          <em style="background:#4b70fc;"></em>
	          <span>2020</span>
	        </li>
	        <li>
	          <em style="background:#a0a0a2;"></em>
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
	</div>
	
	<!-- layerpopup -->
	<div id="layerPopup" class="layer-popup-wtg-compare active">
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
	            	<em style="background:#4b70fc;"></em>
	              	<span>MITSUBISHI</span>
	            </li>
	            <li>
	            	<em style="background:#a0a0a2;"></em>
	              	<span>Vestas</span>
	            </li>
	            <li>
	            	<em style="background:#dd6945;"></em>
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
	</div>
	<!-- //layerpopup -->
	
	<!--js-->
	<script src="https://code.highcharts.com/stock/highstock.js"></script>
	<script src="https://code.highcharts.com/stock/modules/data.js"></script>
	<script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/stock/modules/export-data.js"></script>
	
	<script type="text/javascript"></script>
	<!--//js-->
<jsp:include page="include/footer.jsp"></jsp:include>