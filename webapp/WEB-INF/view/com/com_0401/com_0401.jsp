<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
	
</style>
<input id="file-input0401" type="file" onchange='getFilenameCom0401(this)' name="doc_file" style="display: none;"/>
<input id="file-input040102" type="file" onchange='getFilenameCom040102(this)' name="doc_file" style="display: none;"/>
<input id="file-input040103" type="file" onchange='getFilenameCom040103(this)' name="doc_file" style="display: none;"/>
<input id="file-input040104" type="file" onchange='getFilenameCom040104(this)' name="doc_file" style="display: none;"/>
<input id="file-input040105" type="file" onchange='getFilenameCom040105(this)' name="doc_file" style="display: none;"/>
<input id="file-input040106" type="file" onchange='getFilenameCom040106(this)' name="doc_file" style="display: none;"/>
<input id="file-input040107" type="file" onchange='getFilenameCom040107(this)' name="doc_file" style="display: none;"/>
<main id="content" class="general-page">
	<div class="container">
		<section class="hdSection">
			<!-- tit-wrap -->
			<div class="tit-wrap">
				<div class="tit-left">
					<h1 class="heading1">보건안전환경 법규관리</h1>
				</div>
			</div>
			<!-- //tit-wrap -->
		</section>

		<section class="contSection border">
			<div class="content">

				<!-- tab menu -->
				<!-- D : When "current" is attached to li, the currently activated style is displayed. -->
				<ul class="tab clearfix">
					<li><a href="javascript:void(0);">전체</a></li>
					<li id="LI_COM0401"><a href="javascript:void(0);" id="COM0401">국내 법규</a></li>
					<li id="LI_COM0402"><a href="javascript:void(0);" id="COM0402">국내 인증</a></li>
					<li id="LI_COM0403"><a href="javascript:void(0);" id="COM0403">가이드라인</a></li>

				</ul>
				<!-- //tab menu -->

				<div class="content-body" id="DIV_COM0401">
					<div class="content-body--inner">
						<div class="download-box-area">
							<h1 class="tit">국내 법규</h1>
							<h2 class="heading4">산업안전보건법</h2>
							<div>
							<ul id="ROW_LIST_COM0401">
								
							</ul>
							
							</div>
						</div>
						<!-- ====================== -->
						<div class="download-box-area">
							<h2 class="heading4">화재예방, 소방시설 설치 유지 및 안전관리에 관한 법</h2>
							<ul id="ROW_LIST_COM040102">
								
							</ul>
							
						</div>
						<!-- ====================== -->
						<div class="download-box-area">
							<h2 class="heading4">위험물안전관리법</h2>
							<ul id="ROW_LIST_COM040103">
								
							</ul>
							
						</div>
					</div>

					<!-- foot-btn -->
					<c:if test="${grantjson != null && grantjson.WRT_YN}">
						<div class="foot-btn">
							<button class="btn-style2" id="MODIFY_BTN_COM0401">
								<i class="las la-eraser"></i><span class="name">수정</span>
							</button>
							<button class="btn-style1" id ="MODIFY_BTN_COM0401_1" style="display: none">
								<i class="las la-edit"></i><span>저장</span>
							</button>
						</div>
					</c:if>
				</div>

				<div class="content-body" id="DIV_COM0402">
					<div class="content-body--inner">
						<div class="download-box-area">
							<h1 class="tit">국내 인증</h1>
							<h2 class="heading4">ISO 인증</h2>
							<ul id="ROW_LIST_COM040104">
								
							</ul>
							
						</div>
					</div>
					<c:if test="${grantjson != null && grantjson.WRT_YN}">
						<div class="foot-btn">
							<button class="btn-style2" id="MODIFY_BTN_COM0402">
								<i class="las la-eraser"></i><span class="name">수정</span>
							</button>
							<button class="btn-style1" id ="MODIFY_BTN_COM0402_1" style="display: none">
								<i class="las la-edit"></i><span>저장</span>
							</button>
						</div>
					</c:if>
				</div>

				<div class="content-body" id="DIV_COM0403">
					<div class="content-body--inner">
						<div class="download-box-area">
							<h1 class="tit">국내 가이드라인</h1>
							<h2 class="heading4">안전보건공단</h2>
							<p class="mgb20">
								<a href="https://www.kosha.or.kr/kosha/index.do" target="_blank" class="btn3">
									<i class="las la-external-link-alt"></i> <span class="name">안전보건공단
										홈페이지</span>
								</a>
							</p>
							<ul id="ROW_LIST_COM040105">
								
							</ul>
							
						</div>
						<!-- ====================== -->
						<div class="download-box-area">
							<h1 class="tit">해외 가이드라인</h1>
							<h2 class="heading4">G+ Global Offshore Wind Health & Safety
								Organization</h2>
							<ul id="ROW_LIST_COM040106">
								
							</ul>
							
						</div>
						<!-- ====================== -->
						<div class="download-box-area">
							<h2 class="heading4">Renewable UK Guideline</h2>
							<ul id="ROW_LIST_COM040107">
								
							</ul>
							
						</div>
					</div>

					<!-- foot-btn -->
					<c:if test="${grantjson != null && grantjson.WRT_YN}">
						<div class="foot-btn">
							<button class="btn-style2" id="MODIFY_BTN_COM0403">
								<i class="las la-eraser"></i><span class="name">수정</span>
							</button>
							<button class="btn-style1" id ="MODIFY_BTN_COM0403_1" style="display: none">
								<i class="las la-edit"></i><span>저장</span>
							</button>
						</div>
					</c:if>
				</div>
		</section>
	</div>
</main>

<!-- 스크립트 -->
<script src="${ctxPath}/script/com/com_0401.js?cachebuster=" + new Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
	$(document).ready(function() {
		com0401();
	});
</script>


