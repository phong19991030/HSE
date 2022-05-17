<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

	<div class="container">
		<!--tit-wrap-->
		<div class="tit-wrap">
			<h2 class="heading3">
				<span class="txt">Menu Management</span>
			</h2>
			<ul class="location">
				<li>SYSTEM</li>
				<li class="bold">Menu Management</li>
			</ul>
		</div>
		<!--//tit-wrap-->

		<div class="base_grid_table">
			<div class="table-wrap">
				<table>
					<caption>Menu Management - No, Condition, Menu, Menu ID, URL, Use or not, Upper menu, Order, Menu level</caption>
					<colgroup>
						<col style="width:5%">
						<col style="width:5%">
						<col style="width:25%">
						<col style="width:7.5%">
						<col style="width:7.5%">
						<col style="width:15%">
						<col style="width:7.5%">
						<col style="width:7.5%">
						<col style="width:7.5%">
						<col style="width:7.5%">
						<col style="width:5%">
					</colgroup>
					<thead>
						<tr>
							<th scope="col">No.</th>
							<th scope="col">Condition</th>
							<th scope="col">Menu</th>
							<th scope="col">Menu ID</th>
							<th scope="col">Menu ID</th>
							<th scope="col">URL</th>
							<th scope="col">Use or not</th>
							<th scope="col">Upper menu</th>
							<th scope="col">Order</th>
							<th scope="col">Menu level</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>10</td>
							<td></td>
							<td class="txt-left">
								<span class="menu-manage menu-manage1">admin</span>
							</td>
							<td>
								<div class="input-group">
									<label for="menuId1" class="sr-only">Menu ID</label>
									<input type="text" name="menuId1" id="menuId1">
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="menuId2" class="sr-only">Menu ID</label>
									<input type="text" name="menuId2" id="menuId2" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="url" class="sr-only">URL</label>
									<input type="text" name="url" id="url">
								</div>
							</td>
							<td>
								<div class="select-box">
									<label for="useOrNot">-</label>
									<select name="useOrNot" id="useOrNot" class="info-select">
										<option value="1">-</option>
										<option value="2"></option>
										<option value="3"></option>
									</select>
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="upperMenu" class="sr-only">Upper menu</label>
									<input type="text" name="upperMenu" id="upperMenu" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="order" class="sr-only">Order</label>
									<input type="text" name="order" id="order">
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="menuLevel" class="sr-only">Order</label>
									<input type="text" name="menuLevel" id="menuLevel">
								</div>
							</td>
							<td>
								<a href="#" class="delete-btn">
									<i class="xi-trash"></i>
								</a>
							</td>
						</tr>
						<tr>
							<td>9</td>
							<td></td>
							<td class="txt-left">
								<span class="menu-manage menu-manage2">admin</span>
							</td>
							<td>
								<div class="input-group">
									<label for="menuId1" class="sr-only">Menu ID</label>
									<input type="text" name="menuId1" id="menuId1">
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="menuId2" class="sr-only">Menu ID</label>
									<input type="text" name="menuId2" id="menuId2" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="url" class="sr-only">URL</label>
									<input type="text" name="url" id="url">
								</div>
							</td>
							<td>
								<div class="select-box">
									<label for="useOrNot">-</label>
									<select name="useOrNot" id="useOrNot" class="info-select">
										<option value="1">-</option>
										<option value="2"></option>
										<option value="3"></option>
									</select>
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="upperMenu" class="sr-only">Upper menu</label>
									<input type="text" name="upperMenu" id="upperMenu" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="order" class="sr-only">Order</label>
									<input type="text" name="order" id="order">
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="menuLevel" class="sr-only">Order</label>
									<input type="text" name="menuLevel" id="menuLevel">
								</div>
							</td>
							<td>
								<a href="#" class="delete-btn">
									<i class="xi-trash"></i>
								</a>
							</td>
						</tr>

						<tr>
							<td>8</td>
							<td></td>
							<td class="txt-left">
								<span class="menu-manage menu-manage2">admin</span>
							</td>
							<td>
								<div class="input-group">
									<label for="menuId1" class="sr-only">Menu ID</label>
									<input type="text" name="menuId1" id="menuId1">
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="menuId2" class="sr-only">Menu ID</label>
									<input type="text" name="menuId2" id="menuId2" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="url" class="sr-only">URL</label>
									<input type="text" name="url" id="url">
								</div>
							</td>
							<td>
								<div class="select-box">
									<label for="useOrNot">-</label>
									<select name="useOrNot" id="useOrNot" class="info-select">
										<option value="1">-</option>
										<option value="2"></option>
										<option value="3"></option>
									</select>
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="upperMenu" class="sr-only">Upper menu</label>
									<input type="text" name="upperMenu" id="upperMenu" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="order" class="sr-only">Order</label>
									<input type="text" name="order" id="order">
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="menuLevel" class="sr-only">Order</label>
									<input type="text" name="menuLevel" id="menuLevel">
								</div>
							</td>
							<td>
								<a href="#" class="delete-btn">
									<i class="xi-trash"></i>
								</a>
							</td>
						</tr>

						<tr>
							<td>7</td>
							<td></td>
							<td class="txt-left">
								<span class="menu-manage menu-manage2">admin</span>
							</td>
							<td>
								<div class="input-group">
									<label for="menuId1" class="sr-only">Menu ID</label>
									<input type="text" name="menuId1" id="menuId1">
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="menuId2" class="sr-only">Menu ID</label>
									<input type="text" name="menuId2" id="menuId2" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="url" class="sr-only">URL</label>
									<input type="text" name="url" id="url">
								</div>
							</td>
							<td>
								<div class="select-box">
									<label for="useOrNot">-</label>
									<select name="useOrNot" id="useOrNot" class="info-select">
										<option value="1">-</option>
										<option value="2"></option>
										<option value="3"></option>
									</select>
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="upperMenu" class="sr-only">Upper menu</label>
									<input type="text" name="upperMenu" id="upperMenu" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="order" class="sr-only">Order</label>
									<input type="text" name="order" id="order">
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="menuLevel" class="sr-only">Order</label>
									<input type="text" name="menuLevel" id="menuLevel">
								</div>
							</td>
							<td>
								<a href="#" class="delete-btn">
									<i class="xi-trash"></i>
								</a>
							</td>
						</tr>

						<tr>
							<td>6</td>
							<td></td>
							<td class="txt-left">
								<span class="menu-manage menu-manage2">admin</span>
							</td>
							<td>
								<div class="input-group">
									<label for="menuId1" class="sr-only">Menu ID</label>
									<input type="text" name="menuId1" id="menuId1">
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="menuId2" class="sr-only">Menu ID</label>
									<input type="text" name="menuId2" id="menuId2" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="url" class="sr-only">URL</label>
									<input type="text" name="url" id="url">
								</div>
							</td>
							<td>
								<div class="select-box">
									<label for="useOrNot">-</label>
									<select name="useOrNot" id="useOrNot" class="info-select">
										<option value="1">-</option>
										<option value="2"></option>
										<option value="3"></option>
									</select>
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="upperMenu" class="sr-only">Upper menu</label>
									<input type="text" name="upperMenu" id="upperMenu" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="order" class="sr-only">Order</label>
									<input type="text" name="order" id="order">
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="menuLevel" class="sr-only">Order</label>
									<input type="text" name="menuLevel" id="menuLevel">
								</div>
							</td>
							<td>
								<a href="#" class="delete-btn">
									<i class="xi-trash"></i>
								</a>
							</td>
						</tr>

						<tr>
							<td>5</td>
							<td></td>
							<td class="txt-left">
								<span class="menu-manage menu-manage2">admin</span>
							</td>
							<td>
								<div class="input-group">
									<label for="menuId1" class="sr-only">Menu ID</label>
									<input type="text" name="menuId1" id="menuId1">
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="menuId2" class="sr-only">Menu ID</label>
									<input type="text" name="menuId2" id="menuId2" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="url" class="sr-only">URL</label>
									<input type="text" name="url" id="url">
								</div>
							</td>
							<td>
								<div class="select-box">
									<label for="useOrNot">-</label>
									<select name="useOrNot" id="useOrNot" class="info-select">
										<option value="1">-</option>
										<option value="2"></option>
										<option value="3"></option>
									</select>
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="upperMenu" class="sr-only">Upper menu</label>
									<input type="text" name="upperMenu" id="upperMenu" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="order" class="sr-only">Order</label>
									<input type="text" name="order" id="order">
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="menuLevel" class="sr-only">Order</label>
									<input type="text" name="menuLevel" id="menuLevel">
								</div>
							</td>
							<td>
								<a href="#" class="delete-btn">
									<i class="xi-trash"></i>
								</a>
							</td>
						</tr>

						<tr>
							<td>4</td>
							<td></td>
							<td class="txt-left">
								<span class="menu-manage menu-manage2">admin</span>
							</td>
							<td>
								<div class="input-group">
									<label for="menuId1" class="sr-only">Menu ID</label>
									<input type="text" name="menuId1" id="menuId1">
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="menuId2" class="sr-only">Menu ID</label>
									<input type="text" name="menuId2" id="menuId2" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="url" class="sr-only">URL</label>
									<input type="text" name="url" id="url">
								</div>
							</td>
							<td>
								<div class="select-box">
									<label for="useOrNot">-</label>
									<select name="useOrNot" id="useOrNot" class="info-select">
										<option value="1">-</option>
										<option value="2"></option>
										<option value="3"></option>
									</select>
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="upperMenu" class="sr-only">Upper menu</label>
									<input type="text" name="upperMenu" id="upperMenu" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="order" class="sr-only">Order</label>
									<input type="text" name="order" id="order">
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="menuLevel" class="sr-only">Order</label>
									<input type="text" name="menuLevel" id="menuLevel">
								</div>
							</td>
							<td>
								<a href="#" class="delete-btn">
									<i class="xi-trash"></i>
								</a>
							</td>
						</tr>

						<tr>
							<td>3</td>
							<td></td>
							<td class="txt-left">
								<span class="menu-manage menu-manage2">admin</span>
							</td>
							<td>
								<div class="input-group">
									<label for="menuId1" class="sr-only">Menu ID</label>
									<input type="text" name="menuId1" id="menuId1">
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="menuId2" class="sr-only">Menu ID</label>
									<input type="text" name="menuId2" id="menuId2" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="url" class="sr-only">URL</label>
									<input type="text" name="url" id="url">
								</div>
							</td>
							<td>
								<div class="select-box">
									<label for="useOrNot">-</label>
									<select name="useOrNot" id="useOrNot" class="info-select">
										<option value="1">-</option>
										<option value="2"></option>
										<option value="3"></option>
									</select>
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="upperMenu" class="sr-only">Upper menu</label>
									<input type="text" name="upperMenu" id="upperMenu" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="order" class="sr-only">Order</label>
									<input type="text" name="order" id="order">
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="menuLevel" class="sr-only">Order</label>
									<input type="text" name="menuLevel" id="menuLevel">
								</div>
							</td>
							<td>
								<a href="#" class="delete-btn">
									<i class="xi-trash"></i>
								</a>
							</td>
						</tr>

						<tr>
							<td>2</td>
							<td></td>
							<td class="txt-left">
								<span class="menu-manage menu-manage2">admin</span>
							</td>
							<td>
								<div class="input-group">
									<label for="menuId1" class="sr-only">Menu ID</label>
									<input type="text" name="menuId1" id="menuId1">
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="menuId2" class="sr-only">Menu ID</label>
									<input type="text" name="menuId2" id="menuId2" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="url" class="sr-only">URL</label>
									<input type="text" name="url" id="url">
								</div>
							</td>
							<td>
								<div class="select-box">
									<label for="useOrNot">-</label>
									<select name="useOrNot" id="useOrNot" class="info-select">
										<option value="1">-</option>
										<option value="2"></option>
										<option value="3"></option>
									</select>
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="upperMenu" class="sr-only">Upper menu</label>
									<input type="text" name="upperMenu" id="upperMenu" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="order" class="sr-only">Order</label>
									<input type="text" name="order" id="order">
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="menuLevel" class="sr-only">Order</label>
									<input type="text" name="menuLevel" id="menuLevel">
								</div>
							</td>
							<td>
								<a href="#" class="delete-btn">
									<i class="xi-trash"></i>
								</a>
							</td>
						</tr>
						<tr>
							<td>1</td>
							<td></td>
							<td class="txt-left">
								<span class="menu-manage menu-manage3">admin</span>
							</td>
							<td>
								<div class="input-group">
									<label for="menuId1" class="sr-only">Menu ID</label>
									<input type="text" name="menuId1" id="menuId1">
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="menuId2" class="sr-only">Menu ID</label>
									<input type="text" name="menuId2" id="menuId2" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="url" class="sr-only">URL</label>
									<input type="text" name="url" id="url">
								</div>
							</td>
							<td>
								<div class="select-box">
									<label for="useOrNot">-</label>
									<select name="useOrNot" id="useOrNot" class="info-select">
										<option value="1">-</option>
										<option value="2"></option>
										<option value="3"></option>
									</select>
								</div>
							</td>
							<td>
								<div class="input-group disable">
									<label for="upperMenu" class="sr-only">Upper menu</label>
									<input type="text" name="upperMenu" id="upperMenu" disabled>
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="order" class="sr-only">Order</label>
									<input type="text" name="order" id="order">
								</div>
							</td>
							<td>
								<div class="input-group">
									<label for="menuLevel" class="sr-only">Order</label>
									<input type="text" name="menuLevel" id="menuLevel">
								</div>
							</td>
							<td>
								<a href="#" class="delete-btn">
									<i class="xi-trash"></i>
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="pager">
			<a href="" class="arr prev">prev</a>
			<a href="" title="1페이지" class="active">1</a>
			<a href="" title="2페이지">2</a>
			<a href="" title="3페이지">3</a>
			<a href="" title="4페이지">4</a>
			<a href="" class="arr next">Next</a>
		</div>
		<!--mobile pager-->
		<p class="pager pageNum">
			<a href="" class="arr prev">prev</a>
			<span class="currentPage">
				<em>1</em>/42
			</span>
			<a href="" class="arr next">Next</a>
		</p>
		<!--//mobile pager-->
	</div>
<jsp:include page="include/footer.jsp"></jsp:include>