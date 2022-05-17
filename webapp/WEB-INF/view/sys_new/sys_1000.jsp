<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
/* 팝업 관련 */
#layerPopup .layer-cont.MODIFY {width:1400px;}
#layerPopup .layer-cont.ADD {width:1400px;}
/* .layer-cont .system-left {padding-right:1.25rem;}
.layer-cont .system-right {padding-left:1.25rem;}
.layer-cont .registration-form-lst > li > .registration-write span {display:inline-block; height:34px; line-height:34px;} */

/* 각 버튼 별 hover 효과 */
.add-btn {border: 1px solid #455eee;}
.add-btn:hover {background: #fff !important;color: #455eee !important;}
.modify-btn {border: 1px solid #636363;}
.modify-btn:hover {background: #fff !important;color: #636363 !important;}
.del-btn {border: 1px solid #999;}
.del-btn:hover {background: #fff !important;color: #999 !important;}
.close-btn {border: 1px solid #999;}
.close-btn:hover {background: #fff !important;color: #999 !important;}

/* row active 효과 */
div.registration.active {
	background: #455eee !important;
    color: #fff !important;
    box-shadow: 0px 0px 10px 0 rgb(0 0 0 / 30%);
    border: 1px solid #455eee !important;
}
div.registration.active span {
	color: #fff !important;
    font-weight: 600 !important;
}

div.registration.active span.num:after {
	background: #fff !important;
}
div.registration.active .hide-arrow {
	visibility: visible !important;
    color: #fff !important;
}
div.registration.active .fold-btn {
	color: #fff !important;
}
div.registration:hover .fold-btn {
	color: #fff !important;
}

/* li tree line 효과 */
.registration-form-lst.registration-form-lst-bg li .registration {padding: 0 !important;}
.hide-arrow {margin-right: 10px;}
.fold-btn {margin-left: 5px;margin-right: 5px;}

.registration-form-lst-bg ul > li {margin-top: 0.3rem !important;}
.registration-form-lst-bg .depth2 > li, .depth3 > li {margin-top: 0.3rem !important;}
ul.depth2 > li:first-child:before {top: -6px;left: -25px;width: 25px;height: 24px;}
ul.depth2 > li:before {top: -22px;left: -25px;width: 25px;height: 40px;} 
/* ul.depth2:before {height: 100%;top: -7px;left: -25px;}  */
ul.depth2:before {height:0%;} 



</style>

<!-- 공지사항 관리 리스트 -->
<!-- <div class="container system-wrap system-wrap1"> -->
<div class="container">

	<div class="system-detail-wrap">
		<div class="system-left" style="width: 100%; border-right: none; padding-right: 0;">

			<!-- 타이틀 -->
			<div class="tit-wrap">
				<h2 class="heading3">
					<span class="txt">Maintenance Code</span>
				</h2>
				<ul class="location">
					<li>SYSTEM</li>
					<li>Code management</li>
					<li class="bold">Maintenance Code</li>
				</ul>
			</div>
			<!-- //타이틀 -->

			<div class="maintenance-form registration-form registration-form1">
				<div class="registration-form-lst-wrap maintenance-write-form">
					<!-- 왼쪽 -->
					<div class="registration-form-lst registration-form-lst-bg">
						<h3>Code list</h3>
						<!-- 셀렉트 박스 -->
						<div class="select-box" style="display: inline-grid; width: 30%; margin-left: 40px; background: #fff">
							<label for="ORDER_BY"></label>
							<select id="ORDER_BY" class="info-select">
								<option value="A" selected># Sort</option>
								<option value="B">Registration Date</option>
							</select>	
						</div>
						<!-- //셀렉트 박스 -->
						<button id="ROOTADD-BTN" type="button" class="registration-search-btn btn-style btn-style1 popup-btn">Register</button>
						
						<!-- 리스트 -->
						<div class="wrap-scroll-area">
							<ul id="CODE-LIST" class="registration-scoll">
								<!-- 1depth -->
<!-- 								<li class="line"> -->
<!-- 									<div class="registration"> -->
<!-- 										<a href="javascript:void(0);" class="fold-btn unfold"> -->
<!-- 											<i class="xi-plus-circle" title="Fold"></i> -->
<!-- 											<i class="xi-minus-circle-o" title="Unfold"></i> -->
<!-- 										</a> -->
<!-- 										<span class="num">A</span> -->
<!-- 										<span>Tower</span> -->
<!-- 										<em class="hide-arrow"> -->
<!-- 											<i class="xi-long-arrow-right"></i> -->
<!-- 										</em> -->
<!-- 									</div> -->
<!-- 									<ul class="depth2"> -->
<!-- 										<li> -->
<!-- 											<div class="registration"> -->
<!-- 												<a href="javascript:void(0);" class="fold-btn unfold"> -->
<!-- 													<i class="xi-plus-circle" title="Fold"></i> -->
<!-- 													<i class="xi-minus-circle-o" title="Unfold"></i> -->
<!-- 												</a> -->
<!-- 												<span class="num">A</span> -->
<!-- 												<span>Tower</span> -->
<!-- 												<em class="hide-arrow"> -->
<!-- 													<i class="xi-long-arrow-right"></i> -->
<!-- 												</em> -->
<!-- 											</div> -->
<!-- 											<ul class="depth2"> -->
<!-- 												<li> -->
<!-- 													<div class="registration"> -->
<!-- 														<a href="javascript:void(0);" class="fold-btn unfold"> -->
<!-- 															<i class="xi-plus-circle" title="Fold"></i> -->
<!-- 															<i class="xi-minus-circle-o" title="Unfold"></i> -->
<!-- 														</a> -->
<!-- 														<span class="num">A</span> -->
<!-- 														<span>Tower</span> -->
<!-- 														<em class="hide-arrow"> -->
<!-- 															<i class="xi-long-arrow-right"></i> -->
<!-- 														</em> -->
<!-- 													</div> -->
<!-- 												</li> -->
<!-- 											</ul>		 -->
<!-- 										</li> -->
<!-- 									</ul> -->
<!-- 								</li> -->
								<!-- //1depth -->
						
							</ul>
						</div>
						<!-- //리스트 -->
					</div>
					<!-- //왼쪽 -->
					
					<!-- 오른쪽 -->
					<!-- 상세 폼 -->
					<ul id="DETAIL-FORM" class="registration-form-lst right" style="display:none;">
						<li class="head-area">
							<h3 id="UP_CODE"></h3>
							<span class="btn-wrap">
								<a id="ADD-BTN" href="javascript:void(0);" class="add-btn" title="Add">
									<i class="xi-plus"></i>
								</a>
								<a id="MODIFY-BTN" href="javascript:void(0);" class="modify-btn" title="Modify">
									<i class="xi-eraser"></i>
								</a>
								<a id="DELETE-BTN" href="javascript:void(0);" class="del-btn" title="Delete">
									<i class="xi-trash"></i>
								</a>
							</span>
						</li>
						<li class="tit-area">
							<span class="tit">Code</span>
							<strong class="tit-sub">
								<em id="PREFIX_NM" class="num prefix"></em>
								<span id="SUFFIX_NM" class="code-name suffix"></span>
							</strong>
						</li>
						<li class="sub-area">
							<span class="tit">Description</span>
							<div class="registration-write change-line">
								<span id="DESCRPT" class="cont description">
								</span>
							</div>
						</li>
					</ul>
					<!-- //상세 폼 -->
					
					<!-- 수정 폼 -->
					<ul id="MODIFY-FORM" class="registration-form-lst right" style="display:none;">
						<li class="head-area">
							<h3><span id="TITLE"></span></h3>
							<span class="btn-wrap">
								<a id="SAVE-BTN" class="save-btn btn-style btn-style1">Save</a>
								<a id="CLOSE-BTN" ref="javascript:void(0);" class="close-btn" title="Close">
									<i class="xi-close"></i>
								</a>
							</span>
						</li>
						<li class="sub0 tit-area">
							<span>Parent Code</span>
							<strong class="tit-sub">
								<em id="UP_PREFIX_NM" class="num prefix"></em>
								<span id="UP_SUFFIX_NM" class="code-name suffix"></span>
							</strong>
						</li>
						<li class="sub1">
							<span>Code<span class="red"> *</span></span>
							<div class="registration-write">
								<div class="input-group">
									<label for="PREFIX_NM" class="sr-only"></label>
									<input type="text" id="PREFIX_NM" validation-check="required" maxlength="5" autocomplete="off">
								</div>
								<div class="input-group">
									<label for="SUFFIX_NM" class="sr-only"></label>
									<input type="text" id="SUFFIX_NM" validation-check="required" maxlength="50" autocomplete="off">
								</div>
							</div>
						</li>
						<li class="sub2">
							<span>Description</span>
							<div class="registration-write">
								<div class="input-group" style="height:18rem;">
									<label for="DESCRPT" class="sr-only"></label>
									<textarea id="DESCRPT" maxlength="500"></textarea>
								</div>
							</div>
						</li>
					</ul>
					<!-- //수정 폼 -->
					
					<!-- //오른쪽 -->
				</div>
			</div>
			
			
		</div>
	</div>
	
</div>

<!-- 스크립트 -->
<script src="${ctxPath}/script/sys/sys_1000.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>
<!-- //스크립트 -->

<script>
	$(document).ready(function(){
		sys1000();
	});
</script>
