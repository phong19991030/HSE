<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
table tbody tr:hover td{color:#333;}
table tbody > tr:hover > td{color:#455eee;}

table tbody tr:hover {-webkit-box-shadow: none;box-shadow: none;}

/* hover시 그림자 효과 버블링 현상 처리 */
/* table tbody tr.sub-table:hover {-webkit-box-shadow: none;box-shadow: none;} */
/* table tbody > tr:hover {-webkit-box-shadow: 0px 8px 11px -6px rgba(0,0,0, .1);box-shadow: 0px 8px 11px -6px rgba(0,0,0, .1);} */
/* table tbody > tr:last-of-type:hover {-webkit-box-shadow: 0px 8px 11px -6px rgba(0,0,0, .1) !important;box-shadow: 0px 8px 11px -6px rgba(0,0,0, .1) !important;} */

/*layerPopup - sys0800*/
#layerPopup{position:fixed;top:0;left:0;background:rgba(0,0,0,.28);width:100%;height:100%;z-index:999;opacity:0;visibility:hidden;-webkit-transition:all .5s;transition:all .5s;}
#layerPopup.active{opacity:1;visibility:visible;}
#layerPopup .layer-cont{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);width:525px;max-height:90%;padding:1.5rem 1rem 1.75rem;background:#fff;border-radius:10px;-webkit-box-shadow:0 0 5px 0 rgba(0,0,0,0.2);box-shadow:0 0 5px 0 rgba(0,0,0,0.2);}
#layerPopup .layer-cont .layer-scroll{height:100%;}
#layerPopup .layer-cont .tit-wrap{margin-bottom:1.25rem;}
#layerPopup .layer-cont .search-form-wrap .search-wrapper{width:100%;}
#layerPopup .search-form-wrap .search-wrapper form .input-group:after{display:none;}
#layerPopup .search-form-wrap .search-wrapper form input{padding-left:.5rem;}
#layerPopup .footer_table_btn{margin-top:1.25rem;text-align:right;}
#layerPopup .footer_table_btn .btn{background:#f4f5f7;border-color:#f4f5f7;color:#666;}
#layerPopup .footer_table_btn .btn:hover{background:#455eee;borer-color:#455eee;color:#fff;}
#layerPopup .layer-close{position:absolute;top:1rem;right:1rem;color:#878793;font-size:.9rem;}
#layerPopup .layer-close i{-webkit-transition:transform .3s;transition:transform .3s;}
#layerPopup .layer-close:hover i{-webkit-transform:rotate(180deg);transform:rotate(180deg);}
#layerPopup .mCustomScrollbar .layer-close{top:0;right:0;}

/*system - sys0800 */
.system-wrap .search-form-wrap .search-wrapper{width:647px;}
.system-wrap .search-form-wrap .search-wrapper .search-detail .detail-search-keyword + .calendar-wrap{padding-right:3.5rem;}
.search-form-wrap .search-wrapper .search-detail .detail-search-keyword + .select-box.bul-none label{padding-left:.5rem;}
.search-form-wrap .search-wrapper .search-detail .detail-search-keyword + .select-box.bul-none label:before{display:none;}
.system-wrap #map{width:100%;height:22.5rem;}
.system-wrap .gm-style .gm-style-iw-c{overflow:visible;-webkit-box-shadow:none;box-shadow:none;background-color:#444 !important;color:#fff !important;text-align:center;border-radius:20px;-webkit-transform:translate(-50%,-150%);transform:translate(-50%,-150%);padding:.5rem !important;}
.system-wrap .gm-style{font-family:inerit !important;}
.system-wrap .gm-ui-hover-effect{display:none !important;}
.system-wrap .gm-style .gm-style-iw-d::-webkit-scrollbar-track, .gm-style .gm-style-iw-d::-webkit-scrollbar-track-piece{background:transparent !important;}
.system-wrap .gm-style .gm-style-iw-t::after{display:none !important;}
.system-wrap .gm-style .gm-style-iw-c:before{position:absolute;bottom:-6px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);width:10px;height:7px;background:url(../../img/sub/wt_bubble_bul.png)no-repeat center/cover;content:'';}
.system-detail-wrap{overflow:hidden;}
.system-detail-wrap .system-left{width:80%;float:left;padding-right:3.25rem;border-right:1px solid #ebebed;}
.system-detail-wrap .system-left .tit-wrap + .registration-form{border-top:1px solid #ebebed;}
.registration-form > .heading4{margin-top:0;}
.registration-form .base_grid_table + .heading4{margin-top:2rem;}
.registration-form div + .heading4{margin-top:2rem;}
.system-detail-wrap .registration-form{padding:1.5rem 0 2.25rem;}
.system-detail-wrap .registration-form-lst-wrap{margin:-1.5rem 0 0 -2.5rem;overflow:hidden;}
.system-detail-wrap .registration-form-lst{position:relative;float:left;width:50%;height:auto;padding-left:2.5rem;}
.system-detail-wrap .registration-form-lst > li{position:relative;width:100%;padding-top:1.5rem;overflow:hidden;}
.system-detail-wrap .registration-form-lst > li > span{display:inline-block;width:102px;;color:#363636;font-size:.6rem;vertical-align:middle;}
.system-detail-wrap .registration-write{position:relative;display:inline-block;vertical-align:middle;}

/* 팝업 관련 */
#layerPopup .layer-cont.MODIFY {width:1400px;}
#layerPopup .layer-cont.ADD {width:1400px;}
.layer-cont .system-left {padding-right:1.25rem;}
.layer-cont .system-right {padding-left:1.25rem;}
.layer-cont .registration-form-lst > li > .registration-write span {display:inline-block; height:34px; line-height:34px;}
</style>

<!-- 공지사항 관리 리스트 -->
<main id="content" class="general-page">
  <div class="container">
    <section class="hdSection">
       <!-- tit-wrap -->
       <div class="tit-wrap">
        <div class="tit-left">
          <h1 class="heading1">Menu Management</h1>
        </div>
      </div>
      <!-- //tit-wrap -->
    </section>
    
      
      <article class="list-form">
        <div class="base-table center-table">
          <table>
            <caption>Menu Management - No, Condition, Menu, Menu ID, URL, Use or not, Upper menu, Order, Menu level</caption>
            <colgroup>
              <col style="width:25%">
              <col style="width:15%">
              <col style="width:15%">
              <col style="width:15%">
              <col style="width:10%">
              <col style="width:5%">
              <col style="width:3%">
              <col style="width:3%">
              <col style="width:3%">
              <col style="width:3%">
              <col style="width:3%">
            </colgroup>
            <thead>
              <tr>
                <th scope="col">Menu</th>
                <th scope="col">Menu(Eng)</th>
                <th scope="col">Menu ID</th>
                <th scope="col">URL</th>
                <th scope="col">Upper Menu</th>
                <th scope="col">Active</th>
                <th scope="col">Order</th>
                <th scope="col">Level</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody id="MENU-LIST">
              <!-- sample1 -->
              <!-- <tr class="menu-row lev0">
                <td class="txt-left">
                  <a href="javascript:void(0);" class="fold-btn">
                    <i class="xi-plus-circle" title="Delete"></i>
                  </a>
                  <span>admin</span>
                </td>
                
                <td>
                  <div class="input-group">
                    <label for="menuId1" class="sr-only">Menu ID</label>
                    <input type="text" name="menuId1" id="menuId1">
                  </div>
                </td>
                <td>
                  <div class="input-group">
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
                      <option value="1">On</option>
                      <option value="2">Off</option>
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
                  <a href="javascript:void(0);" class="delete-btn">
                    <i class="xi-plus" title="Add"></i>
                  </a>
                </td>
                <td>
                  <a href="javascript:void(0);" class="delete-btn">
                    <i class="xi-trash" title="Delete"></i>
                  </a>
                </td>
              </tr> -->
              
              <!-- sample1 -->
              
              <!-- sample2 -->
              <!-- Lev0 -->
              
              <!-- <tr class="menu-row lev0">
                <td class="txt-left">
                  fold / unfold
                  <a href="javascript:void(0);" class="fold-btn unfold">
                    <i class="xi-plus-circle" title="Fold"></i>
                    <i class="xi-minus-circle-o" title="Unfold"></i>
                  </a>
                  <span>Menu</span>
                </td>
                <td>Menu(Eng)</td>
                <td>MENU_ID</td>
                <td>/cms/cms_0100/list</td>
                <td>
                  <span class="active-toggle-wrap">
                    <input type="checkbox" id="CHECK_PART_20210223001237606" class="sr-only">
                    <label for="CHECK_PART_20210223001237606"> 
                      <span class="sr-only"></span> 			
                    </label>
                  </span>
                </td>
                <td>Upper Menu</td>
                <td>1</td>
                <td>1</td>
                <td>
                  <a href="javascript:void(0);" class="delete-btn">
                    <i class="xi-plus" title="Add"></i>
                  </a>
                </td>
                <td>
                  <a href="javascript:void(0);" class="delete-btn">
                    <i class="xi-trash" title="Delete"></i>
                  </a>
                </td>
              </tr> -->
              
              <!-- //Lev0 -->
              
              <!-- Lev0 - 서브 테이블 -->
  <!-- 						<tr class="sub-table"> -->
  <!-- 							<td colspan="10"> -->
  <!-- 								<div class="base_grid_table"> -->
  <!-- 									<div class="table-wrap"> -->
  <!-- 										<table> -->
  <!-- 											<caption>Menu Management - No, Condition, Menu, Menu ID, URL, Use or not, Upper menu, Order, Menu level</caption> -->
  <!-- 											<colgroup> -->
  <!-- 												<col style="width:25%"> -->
  <!-- 												<col style="width:7.5%"> -->
  <!-- 												<col style="width:7.5%"> -->
  <!-- 												<col style="width:15%"> -->
  <!-- 												<col style="width:7.5%"> -->
  <!-- 												<col style="width:7.5%"> -->
  <!-- 												<col style="width:7.5%"> -->
  <!-- 												<col style="width:7.5%"> -->
  <!-- 												<col style="width:3%"> -->
  <!-- 												<col style="width:3%"> -->
  <!-- 											</colgroup> -->
  <!-- 											<tbody> -->
  <!-- 												Lev1 -->
  <!-- 												<tr class="menu-row lev1"> -->
  <!-- 													<td class="txt-left"> -->
  <!-- 														fold / unfold -->
  <!-- 														<a href="javascript:void(0);" class="fold-btn unfold"> -->
  <!-- 															<i class="xi-plus-circle" title="Fold"></i> -->
  <!-- 															<i class="xi-minus-circle-o" title="Unfold"></i> -->
  <!-- 														</a> -->
  <!-- 														<span>Menu</span> -->
  <!-- 													</td> -->
  <!-- 													<td>Menu(Eng)</td> -->
  <!-- 													<td>MENU_ID</td> -->
  <!-- 													<td>/cms/cms_0100/list</td> -->
  <!-- 													<td> -->
  <!-- 														<span class="active-toggle-wrap"> -->
  <!-- 															<input type="checkbox" id="CHECK_PART_20210223001237606" class="sr-only"> -->
  <!-- 															<label for="CHECK_PART_20210223001237606">  -->
  <!-- 																<span class="sr-only"></span> 			 -->
  <!-- 															</label> -->
  <!-- 														</span> -->
  <!-- 													</td> -->
  <!-- 													<td>Upper Menu</td> -->
  <!-- 													<td>1</td> -->
  <!-- 													<td>1</td> -->
  <!-- 													<td> -->
  <!-- 														<a href="javascript:void(0);" class="delete-btn"> -->
  <!-- 															<i class="xi-plus" title="Add"></i> -->
  <!-- 														</a> -->
  <!-- 													</td> -->
  <!-- 													<td> -->
  <!-- 														<a href="javascript:void(0);" class="delete-btn"> -->
  <!-- 															<i class="xi-trash" title="Delete"></i> -->
  <!-- 														</a> -->
  <!-- 													</td> -->
  <!-- 												</tr> -->
  <!-- 												//Lev1 -->
                          
  <!-- 												Lev1 - 서브 테이블 -->
  <!-- 												<tr class="menu-row lev1 sub-table"> -->
  <!-- 													<td colspan="10"> -->
  <!-- 														<div class="base_grid_table"> -->
  <!-- 															<div class="table-wrap"> -->
  <!-- 																<table> -->
  <!-- 																	<caption>Menu Management - No, Condition, Menu, Menu ID, URL, Use or not, Upper menu, Order, Menu level</caption> -->
  <!-- 																	<colgroup> -->
  <!-- 																		<col style="width:25%"> -->
  <!-- 																		<col style="width:7.5%"> -->
  <!-- 																		<col style="width:7.5%"> -->
  <!-- 																		<col style="width:15%"> -->
  <!-- 																		<col style="width:7.5%"> -->
  <!-- 																		<col style="width:7.5%"> -->
  <!-- 																		<col style="width:7.5%"> -->
  <!-- 																		<col style="width:7.5%"> -->
  <!-- 																		<col style="width:3%"> -->
  <!-- 																		<col style="width:3%"> -->
  <!-- 																	</colgroup> -->
  <!-- 																	<tbody> -->
  <!-- 																		<tr class="menu-row lev2"> -->
  <!-- 																			<td class="txt-left"> -->
  <!-- 																				fold / unfold -->
  <!-- 																				<a href="javascript:void(0);" class="fold-btn unfold"> -->
  <!-- 																					<i class="xi-plus-circle" title="Fold"></i> -->
  <!-- 																					<i class="xi-minus-circle-o" title="Unfold"></i> -->
  <!-- 																				</a> -->
  <!-- 																				<span>Menu</span> -->
  <!-- 																			</td> -->
  <!-- 																			<td>Menu(Eng)</td> -->
  <!-- 																			<td>MENU_ID</td> -->
  <!-- 																			<td>/cms/cms_0100/list</td> -->
  <!-- 																			<td> -->
  <!-- 																				<span class="active-toggle-wrap"> -->
  <!-- 																					<input type="checkbox" id="CHECK_PART_20210223001237606" class="sr-only"> -->
  <!-- 																					<label for="CHECK_PART_20210223001237606">  -->
  <!-- 																						<span class="sr-only"></span> 			 -->
  <!-- 																					</label> -->
  <!-- 																				</span> -->
  <!-- 																			</td> -->
  <!-- 																			<td>Upper Menu</td> -->
  <!-- 																			<td>1</td> -->
  <!-- 																			<td>1</td> -->
  <!-- 																			<td> -->
  <!-- 																				<a href="javascript:void(0);" class="delete-btn"> -->
  <!-- 																					<i class="xi-plus" title="Add"></i> -->
  <!-- 																				</a> -->
  <!-- 																			</td> -->
  <!-- 																			<td> -->
  <!-- 																				<a href="javascript:void(0);" class="delete-btn"> -->
  <!-- 																					<i class="xi-trash" title="Delete"></i> -->
  <!-- 																				</a> -->
  <!-- 																			</td> -->
  <!-- 																		</tr> -->
  <!-- 																		<tr class="menu-row lev2 sub-table"> -->
  <!-- 																		</tr> -->
                                      
  <!-- 																		<tr class="menu-row lev2"> -->
  <!-- 																			<td class="txt-left"> -->
  <!-- 																				fold / unfold -->
  <!-- 																				<a href="javascript:void(0);" class="fold-btn unfold"> -->
  <!-- 																					<i class="xi-plus-circle" title="Fold"></i> -->
  <!-- 																					<i class="xi-minus-circle-o" title="Unfold"></i> -->
  <!-- 																				</a> -->
  <!-- 																				<span>Menu</span> -->
  <!-- 																			</td> -->
  <!-- 																			<td>Menu(Eng)</td> -->
  <!-- 																			<td>MENU_ID</td> -->
  <!-- 																			<td>/cms/cms_0100/list</td> -->
  <!-- 																			<td> -->
  <!-- 																				<span class="active-toggle-wrap"> -->
  <!-- 																					<input type="checkbox" id="CHECK_PART_20210223001237606" class="sr-only"> -->
  <!-- 																					<label for="CHECK_PART_20210223001237606">  -->
  <!-- 																						<span class="sr-only"></span> 			 -->
  <!-- 																					</label> -->
  <!-- 																				</span> -->
  <!-- 																			</td> -->
  <!-- 																			<td>Upper Menu</td> -->
  <!-- 																			<td>1</td> -->
  <!-- 																			<td>1</td> -->
  <!-- 																			<td> -->
  <!-- 																				<a href="javascript:void(0);" class="delete-btn"> -->
  <!-- 																					<i class="xi-plus" title="Add"></i> -->
  <!-- 																				</a> -->
  <!-- 																			</td> -->
  <!-- 																			<td> -->
  <!-- 																				<a href="javascript:void(0);" class="delete-btn"> -->
  <!-- 																					<i class="xi-trash" title="Delete"></i> -->
  <!-- 																				</a> -->
  <!-- 																			</td> -->
  <!-- 																		</tr> -->
  <!-- 																		<tr class="menu-row lev2 sub-table"> -->
  <!-- 																		</tr> -->
  <!-- 																	</tbody> -->
  <!-- 																</table> -->
  <!-- 															</div> -->
  <!-- 														</div> -->
  <!-- 													</td> -->
  <!-- 												</tr> -->
  <!-- 												//Lev1 - 서브 테이블 -->
  <!-- 											</tbody> -->
  <!-- 										</table> -->
  <!-- 									</div> -->
  <!-- 								</div> -->
  <!-- 							</td> -->
  <!-- 						</tr> -->
              <!-- //Lev0 - 서브 테이블 -->
              <!-- //sample2 -->
              
              
            </tbody>
          </table>
        </div>
      </article>
  </div>
</main>

<div id="layerPopup"></div>


<!-- 스크립트 -->
<script src="${ctxPath}/script/sys/sys_0800.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>
<!-- //스크립트 -->

<script>
	$(document).ready(function(){
		sys0800();
	});
</script>
