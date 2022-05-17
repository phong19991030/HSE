<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/WEB-INF/_include/taglib.jsp"%>
    <!DOCTYPE html>
<html>

<!-- anhpv 2020/02/14 -->


<head>
<meta charset="UTF-8">
<title>Components</title>
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
				<td>Kendo table</td>
				<td><a target="_blank" href="table.jsp">/public_html/html/test/table.jsp</a></td>
				<td>2020/02/14</td>
				<td>anhpv</td>
				<td></td>
				
			</tr>
			<tr>
				<td>2</td>
				<td>Input select from dialog/popup</td>
				<td><a target="_blank" href="choiceInputForm.jsp">/public_html/html/test/choiceInputForm.jsp</a></td>
				<td>2020/02/19</td>
				<td>anhpv</td>
				<td></td>
				
			</tr>
			<tr>
				<td>3</td>
				<td>Custom header</td>
				<td><a target="_blank" href="customHeader.jsp">/public_html/html/test/customHeader.jsp</a></td>
				<td>2020/02/19</td>
				<td>anhpv</td>
				<td></td>
				
			</tr>
			<tr>
				<td>4</td>
				<td>Search box</td>
				<td><a target="_blank" href="searchBox.jsp">/public_html/html/test/searchBox.jsp</a></td>
				<td>2020/02/20</td>
				<td>anhpv</td>
				<td></td>
				
			</tr>
			<tr>
				<td>5</td>
				<td>Logging on server</td>
				<td><a target="_blank" href="logging.jsp">/public_html/html/test/logging.jsp</a></td>
				<td>2020/02/24</td>
				<td>anhpv</td>
				<td>Required!!!</td>
				
			</tr>
			<tr>
				<td>6</td>
				<td>Common dialog (without choiceInputForm)</td>
				<td><a target="_blank" href="dialog.jsp">/public_html/html/test/dialog.jsp</a></td>
				<td>2020/03/02</td>
				<td>anhpv</td>
				<td></td>
			</tr>
			<tr>
				<td>7</td>
				<td>Form validation</td>
				<td><a target="_blank" href="validation.jsp">/public_html/html/test/validation.jsp</a></td>
				<td>2020/03/03</td>
				<td>anhpv</td>
				<td></td>
			</tr>
			<tr>
				<td>8</td>
				<td>Custom validation</td>
				<td><a target="_blank" href="customValidation.jsp">/public_html/html/test/customValidation.jsp</a></td>
				<td>2020/03/16</td>
				<td>anhpv</td>
				<td></td>
			</tr>
<!-- 			<tr> -->
<!-- 				<td>9</td> -->
<!-- 				<td>Date time picker - Range selection</td> -->
<!-- 				<td><a target="_blank" href="datetimepicker.jsp">/public_html/html/test/datetimepicker.jsp</a></td> -->
<!-- 				<td></td> -->
<!-- 				<td>2020/03/13</td> -->
<!-- 			</tr> -->

			<tr>
				<td>9</td>
				<td>Date picker & DateTime picker</td>
				<td><a target="_blank" href="datepicker.jsp">/public_html/html/test/datepicker.jsp</a></td>
				<td>2020/03/13</td>
				<td>anhpv</td>
				<td></td>
			</tr>

		
		</tbody>
	</table>



</body>
</html>