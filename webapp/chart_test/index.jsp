<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<!DOCTYPE html>
<html>

<!-- parkjk 2020/05/26 -->


<head>
<meta charset="UTF-8">
<title>INDEX</title>
<style type="text/css">
body {margin: 0; padding: 30px; font-family: '맑은 고딕'; font-size: 15px; color: #333; line-height: 30px;}
h1 {margin: 0 0 30px; padding: 0; font-size: 30px; color: #000; text-align: center; letter-spacing: -1px; line-height: 50px; letter-spacing: -1px;}
.fixed-F {position: fixed; right: 0; top: 0; z-index: 1; width: 122px; background-color: #000;}
.fixed-F h2 {overflow: hidden; width: 0; height: 0; font-size: 0; line-height: 0;}
.fixed-F h2+a {height: 50px; padding-top: 10px; border-left: 0 none; background-color: #fc0; font-weight: bold; color: #333; line-height: 18px;}
.fixed-F a {float: left; width: 60px; height: 53px; padding-top: 7px; border-left: 1px solid #fff; font-size: 14px; color: #fff; text-align: center; text-decoration: none; line-height: 20px;}
table {overflow: hidden; width: 100%; border-collapse: collapse;}
table caption {overflow: hidden; width: 0; height: 0; margin: 0; padding: 0; font-size: 0; line-height: 0;}
table tr:nth-child(even) {background-color: #f8f8f8;}
table th {position: relative; padding: 5px; border-top: 3px solid #333; font-size: 12px;}
table th:before {position: absolute;left: -1px;top: 50%;width: 1px;height: 10px;margin-top: -5px;background-color: #ccc;content: '';}
table td {padding: 5px 15px;border: 1px solid #efefef;vertical-align: top;}
table td:first-child {border-left: 0 none;}
table td:last-child, table td:last-child a {font-size: 14px;color: #555;line-height: 25px;}
table td:last-child {border-right: 0 none;}
table a {color: #f3a600;}
table .blank {height: 20px;padding: 0;border: 0 none;background-color: #ccc;font-size: 0;line-height: 0;}
table .del {text-decoration: line-through;}
.project {overflow: hidden;position: relative;height: 150px;margin-bottom: 30px;padding: 20px 20px 20px 600px;border: 1px solid #efefef;}
.project li {margin-left: 20px;}
.info {position: absolute;left: 20px;top: 20px;margin: 0;padding: 0;}
.info .option {color: #ccc;}
.info .option span {text-decoration: line-through;}
.info .option strong {font-weight: normal;color: #333;}
.history {padding: 15px 0;background-color: #fcfcfc;}
.history ul {overflow: hidden;overflow-y: auto;height: 120px;margin: 0 15px;padding: 0;list-style: none;}
.history li {position: relative;margin-left: 10px;padding-left: 110px;font-size: 14px;color: #666;}
.history strong {position: absolute;left: 0;top: 0;}
.history strong:before {position: absolute;left: 90px;top: 50%;width: 1px;height: 10px;margin-top: -4px;background-color: #999;content: '';}


</style>
</head>
<body>




<table>
		<caption>메뉴구조도에 따른 작업현황</caption>
		<thead>
			<tr>
				<th scope="col">No</th>
				<th scope="col">Name</th>
				<th scope="col">Page</th>
				<th scope="col">Create date</th>
				<th scope="col">Author</th>
				<th scope="col">Note</th>
				
			</tr>
		</thead>
		<tbody>
			
			<tr>
				<td>1</td>
				<td>Trend Chart</td>
				<td><a target="_blank" href="./sample/trend_chart.html">/chart_test/sample/trend_chart.html</a></td>
				<td>2020/05/25</td>
				<td>parkjk</td>
				<td>				</td>
			</tr>
			
			<tr>
				<td>2</td>
				<td>Multi Trend Chart</td>
				<td><a target="_blank" href="./sample/multi_trend_chart.html">/chart_test/sample/multi_trend_chart.html</a></td>
				<td>2020/06/10</td>
				<td>parkjk</td>
				<td>
						<b># 추가 작업</b><br>
						* Series 추가 기능 구현<br> 
						* Drag & Drop<br>
				</td>
			</tr>
			
			<tr>
				<td>3</td>
				<td>XY Scatter Chart</td>
				<td><a target="_blank" href="./sample/xy_scatter_chart.html">/chart_test/sample/xy_scatter_chart.html</a></td>
				<td>2020/05/25</td>
				<td>parkjk</td>
				<td></td>
			</tr>
			
			<tr>
				<td>4</td>
				<td>FFT Data Chart</td>
				<td><a target="_blank" href="./sample/fft_data_chart.html">/chart_test/sample/fft_data_chart.html</a></td>
				<td>2020/06/11</td>
				<td>parkjk</td>
				<td>
						<b># Decimal Issue</b><br>
						* JavaScript의 Decimal 연산 시, 부동소수점 오류 발생<br> 
						* 추후 Decimal 관련 라이브러리 적용 예정 <br>
						* <a href="https://mikemcl.github.io/decimal.js/">decimal.js</a> <br>
						* <a href="https://mathjs.org/examples/index.html">math.js</a> <br>
						* <a href="https://github.com/MikeMcl/big.js">big.js</a>	<br>
							
				
				</td>
			</tr>
			
			<tr>
				<td>5</td>
				<td>Color Map Chart</td>
				<td><a target="_blank" href="./sample/color_map_chart.html">/chart_test/sample/color_map_chart.html</a></td>
				<td>2020/05/25</td>
				<td>parkjk</td>
				<td></td>
			</tr>
			
			<tr>
				<td>6</td>
				<td>Wind Rose Chart</td>
				<td><a target="_blank" href="./sample/wind_rose_chart.html">/sample/wind_rose_chart.html</a></td>
				<td>2020/05/25</td>
				<td>parkjk</td>
				<td></td>
			</tr>
			
			<tr>
				<td>7</td>
				<td>Gantt Chart</td>
				<td><a target="_blank" href="./sample/gantt_chart.html">/chart_test/sample/gantt_chart.html</a></td>
				<td>2020/05/25</td>
				<td>parkjk</td>
				<td></td>
			</tr>

		
		</tbody>
	</table>



</body>
</html>