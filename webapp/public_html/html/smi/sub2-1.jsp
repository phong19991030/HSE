<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

<div class="container">
	<!--tit-wrap-->
	<div class="tit-wrap">
		<h2 class="heading3">
			<span class="txt">Alarm List</span>
			<span class="version">V47</span>
		</h2>
		<ul class="location">
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

		<div class="select-wrapper">
			<div class="select-box">
				<label for="daySelect"></label>
				<select name="daySelect1" id="daySelect" class="info-select">
					<option value="1">All</option>
					<option value="2"></option>
					<option value="3"></option>
				</select>
			</div>
			<div class="select-box">
				<label for="daySelect"></label>
				<select name="daySelect1" id="daySelect" class="info-select">
					<option value="1">All</option>
					<option value="2"></option>
					<option value="3"></option>
				</select>
			</div>
			<div class="select-box">
				<label for="daySelect"></label>
				<select name="daySelect1" id="daySelect" class="info-select">
					<option value="1">All</option>
					<option value="2"></option>
					<option value="3"></option>
				</select>
			</div>
			<div class="select-box">
				<label for="daySelect"></label>
				<select name="daySelect1" id="daySelect" class="info-select">
					<option value="1">All</option>
					<option value="2"></option>
					<option value="3"></option>
				</select>
			</div>
			<div class="select-box">
				<label for="daySelect"></label>
				<select name="daySelect1" id="daySelect" class="info-select">
					<option value="1">All</option>
					<option value="2"></option>
					<option value="3"></option>
				</select>
			</div>
			<div class="select-box">
				<label for="daySelect"></label>
				<select name="daySelect1" id="daySelect" class="info-select">
					<option value="1">All</option>
					<option value="2"></option>
					<option value="3"></option>
				</select>
			</div>
			<div class="select-box">
				<label for="daySelect"></label>
				<select name="daySelect1" id="daySelect" class="info-select">
					<option value="1">All</option>
					<option value="2"></option>
					<option value="3"></option>
				</select>
			</div>
			<div class="select-box">
				<label for="daySelect"></label>
				<select name="daySelect1" id="daySelect" class="info-select">
					<option value="1">All</option>
					<option value="2"></option>
					<option value="3"></option>
				</select>
			</div>
		</div>
	</div>
	<div class="base_grid_table btn-table">
		<table>
			<caption>Alarm List - No., Date Time, Ack Time, Turbine, CH, Analysis Type, Index No, Alarm Type, Value, ck Status, Ack ID, Gen Speed, Wind Speed, Active Power, Description</caption>
			<colgroup>
				<col style="width:">
			</colgroup>
			<thead>
				<tr>
					<th scope="col">No.</th>
					<th scope="col">Date Time</th>
					<th scope="col">Ack Time</th>
					<th scope="col">Turbine</th>
					<th scope="col">CH</th>
					<th scope="col">Analysis Type</th>
					<th scope="col">Index No</th>
					<th scope="col">Alarm Type</th>
					<th scope="col">Value</th>
					<th scope="col">Ack Status</th>
					<th scope="col">Ack ID</th>
					<th scope="col">Gen Speed</th>
					<th scope="col">Wind Speed</th>
					<th scope="col">Active Power</th>
					<th scope="col">Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>10</td>
					<td>2020.01.23 14:35:14</td>
					<td>2020.01.23 14:35:14</td>
					<td>01</td>
					<td>12</td>
					<td>01</td>
					<td>FFT</td>
					<td>01</td>
					<td>Alert</td>
					<td>0.99</td>
					<td>N/A</td>
					<td></td>
					<td>0.96</td>
					<td>0.96</td>
					<td>0.96</td>
					<td></td>
				</tr>
				<tr>
					<td>9</td>
					<td>2020.01.23 14:35:14</td>
					<td>2020.01.23 14:35:14</td>
					<td>01</td>
					<td>12</td>
					<td>01</td>
					<td>FFT</td>
					<td>01</td>
					<td>Alert</td>
					<td>0.99</td>
					<td>N/A</td>
					<td></td>
					<td>0.96</td>
					<td>0.96</td>
					<td>0.96</td>
					<td></td>
				</tr>
				<tr>
					<td>8</td>
					<td>2020.01.23 14:35:14</td>
					<td>2020.01.23 14:35:14</td>
					<td>01</td>
					<td>12</td>
					<td>01</td>
					<td>FFT</td>
					<td>01</td>
					<td>Alert</td>
					<td>0.99</td>
					<td>N/A</td>
					<td></td>
					<td>0.96</td>
					<td>0.96</td>
					<td>0.96</td>
					<td></td>
				</tr>
				<tr>
					<td>7</td>
					<td>2020.01.23 14:35:14</td>
					<td>2020.01.23 14:35:14</td>
					<td>01</td>
					<td>12</td>
					<td>01</td>
					<td>FFT</td>
					<td>01</td>
					<td>Alert</td>
					<td>0.99</td>
					<td>N/A</td>
					<td></td>
					<td>0.96</td>
					<td>0.96</td>
					<td>0.96</td>
					<td></td>
				</tr>
				<tr>
					<td>6</td>
					<td>2020.01.23 14:35:14</td>
					<td>2020.01.23 14:35:14</td>
					<td>01</td>
					<td>12</td>
					<td>01</td>
					<td>FFT</td>
					<td>01</td>
					<td>Alert</td>
					<td>0.99</td>
					<td>N/A</td>
					<td></td>
					<td>0.96</td>
					<td>0.96</td>
					<td>0.96</td>
					<td></td>
				</tr>
				<tr>
					<td>5</td>
					<td>2020.01.23 14:35:14</td>
					<td>2020.01.23 14:35:14</td>
					<td>01</td>
					<td>12</td>
					<td>01</td>
					<td>FFT</td>
					<td>01</td>
					<td>Alert</td>
					<td>0.99</td>
					<td>N/A</td>
					<td></td>
					<td>0.96</td>
					<td>0.96</td>
					<td>0.96</td>
					<td></td>
				</tr>
				<tr>
					<td>4</td>
					<td>2020.01.23 14:35:14</td>
					<td>2020.01.23 14:35:14</td>
					<td>01</td>
					<td>12</td>
					<td>01</td>
					<td>FFT</td>
					<td>01</td>
					<td>Alert</td>
					<td>0.99</td>
					<td>N/A</td>
					<td></td>
					<td>0.96</td>
					<td>0.96</td>
					<td>0.96</td>
					<td></td>
				</tr>
				<tr>
					<td>3</td>
					<td>2020.01.23 14:35:14</td>
					<td>2020.01.23 14:35:14</td>
					<td>01</td>
					<td>12</td>
					<td>01</td>
					<td>FFT</td>
					<td>01</td>
					<td>Alert</td>
					<td>0.99</td>
					<td>N/A</td>
					<td></td>
					<td>0.96</td>
					<td>0.96</td>
					<td>0.96</td>
					<td></td>
				</tr>
				<tr>
					<td>2</td>
					<td>2020.01.23 14:35:14</td>
					<td>2020.01.23 14:35:14</td>
					<td>01</td>
					<td>12</td>
					<td>01</td>
					<td>FFT</td>
					<td>01</td>
					<td>Alert</td>
					<td>0.99</td>
					<td>N/A</td>
					<td></td>
					<td>0.96</td>
					<td>0.96</td>
					<td>0.96</td>
					<td></td>
				</tr>
				<tr>
					<td>1</td>
					<td>2020.01.23 14:35:14</td>
					<td>2020.01.23 14:35:14</td>
					<td>01</td>
					<td>12</td>
					<td>01</td>
					<td>FFT</td>
					<td>01</td>
					<td>Alert</td>
					<td>0.99</td>
					<td>N/A</td>
					<td></td>
					<td>0.96</td>
					<td>0.96</td>
					<td>0.96</td>
					<td></td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="pager">
		<a href="" class="arr prev">prev</a>
		<a href="" title="1페이지" class="active">1</a>
		<a href="" title="2페이지">2</a>
		<a href="" title="3페이지">3</a>
		<a href="" title="4페이지">4</a>
		<a href="" class="arr next">Next</a>
	</div>
</div>
<!--js-->
<!--//js-->
<jsp:include page="include/footer.jsp"></jsp:include>