<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<!-- <input type="hidden" id="COMPANY_ID" name="COMPANY_ID" value="${DATA.COMPANY_ID}"></input> -->
<style>
	
</style>

<main id="content" class="general-page">
	<div class="container">
		<section class="hdSection">
			<!-- tit-wrap -->
			<div class="tit-wrap">
				<div class="tit-left">
					<h1 class="heading1">보건안전환경 경영방침</h1>
				</div>
			</div>
			<!-- //tit-wrap -->
		</section>

		<section class="contSection border">
			<div class="content">

				<!-- tab menu -->
				<!-- D : When "current" is attached to li, the currently activated style is displayed. -->
				<ul class="tab clearfix">
					<li id="LI_COM0301"><a href="javascript:void(0);" id="COM0301">자료실</a></li>
					<li id="LI_COM0303"><a href="javascript:void(0);" id="COM0303">안전 관리 체계</a></li>
					<li id="LI_COM0304"><a href="javascript:void(0);" id="COM0304">안전 교육 계획</a></li> 
				</ul>
				<!-- //tab menu -->
				
				<!-- display com0301 -->
				<div class="content-body" id="DIV_COM0301">
					<div class="content-body--inner">
						<div class="download-box-area">
							<!-- 산업안전보건법 -->
							<!-- show file com0301 -->
							<h2 class="heading4"><spring:message code="com.com_0301_lable.title" /></h2>
							<div>
							<ul id="ROW_LIST_COM0301">	
                    			
							</ul>	
							
							</div>	
						</div>
						
						<!-- show file com0302 -->
						<div class="download-box-area">
							<!-- 품질경영인증 -->
							<h2 class="heading4"><spring:message code="com.com_0302_lable.title" /></h2>
							<ul id="ROW_LIST_COM0302">
								
							</ul>
						</div>
					</div>

					<!-- foot-btn -->
					<c:if test="${grantjson != null && grantjson.WRT_YN}">
						<div class="foot-btn">
							<button class="btn-style2" id ="MODIFY_BTN_COM0301">
								<i class="las la-eraser"></i><span>수정</span>
							</button>
							
							<button class="btn-style1" id ="MODIFY_BTN_COM0301_1" style="display: none">
								<i class="las la-edit"></i><span>저장</span>
							</button>
						</div>
					</c:if>
				</div>

				<!-- display com0303 -->
				<div class="content-body" id="DIV_COM0303" >
					<div class="img-box">
                		<img src="../../script/com/safety-manage-system.jpg" alt="안전관리체계 이미지">
              		</div>
              	</div>
              
              
              
              	<!-- display com0304 -->
				<div class="content-body" id="DIV_COM0304" >
				<article class="view-form">
                <div class="base-table center-table custom-table1">
                  <table>
                    <caption></caption>
                    <colgroup>
                      <col style="width: 10%;">
                      <col style="width: 10%;">
                      <col style="width: 15%;">
                      <col style="width: 15%;">
                      <col style="width: 15%;">
                      <col style="width: 20%;">
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope="col" colspan="2">교육 종류</th>
                        <th scope="col">교육 시기</th>
                        <th scope="col">교육 대상</th>
                        <th scope="col">교육 시간</th>
                        <th scope="col" class="txt-left">교육 내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row" rowspan="2">정기 교육</th>
                        <th scope="row" class="border-left">관리자</th>
                        <td>매월 첫째주 월요일</td>
                        <td>관리감독자 지위에 있는 자</td>
                        <td>
                          <p>반기 8시간 이상</p>
                          <p>년간 16시간 이상</p>
                        </td>
                        <td class="txt-left">
                          <ul class="txt-lst">
                            <li>
                              <p>작업 안전 지도 요령</p>
                            </li>
                            <li>
                              <p>근로자 안전교육 및 실시 요령</p>
                            </li>
                            <li>
                              <p>기계 기구 설비의 안전 점검</p>
                            </li>
                            <li>
                              <p>보호구 착용 및 관리 요령</p>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="border-left">근로자</th>
                        <td>매월 셋째주 월요일</td>
                        <td>일반 근로자</td>
                        <td>매월 2시간 이상</td>
                        <td class="txt-left">
                          <ul class="txt-lst">
                            <li>
                              <p>안전보호구 취급과 사용법</p>
                            </li>
                            <li>
                              <p>안전사고 사례 및 재해 예방책</p>
                            </li>
                            <li>
                              <p>안전장치 및 방호설비의 사용</p>
                            </li>
                            <li>
                              <p>기타 안전보건에 관한 사항</p>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" rowspan="3">수시 교육</th>
                        <th scope="row" class="border-left">채용 시 교육</th>
                        <td>매월 첫째주 월요일</td>
                        <td>신규 채용 근로자</td>
                        <td>1시간 이상</td>
                        <td class="txt-left">
                          <ul class="txt-lst">
                            <li>
                              <p>무재해 추진기법</p>
                            </li>
                            <li>
                              <p>정리정돈 및 정결 유지에 관한사항</p>
                            </li>
                            <li>
                              <p>안전장치 및 보호구 사용 요령</p>
                            </li>
                            <li>
                              <p>기타 안전에 관한 사항</p>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" class="border-left">작업 내용 변경 시 교육</th>
                        <td>작업 변경</td>
                        <td>작업변경 근로자</td>
                        <td>1시간 이상</td>
                        <td class="txt-left">신규 채용시와 동일</td>
                      </tr>
                      <tr>
                        <th scope="row" class="border-left">특별 교육</th>
                        <td>안전담당자 지정 작업 시</td>
                        <td>당해 근로자</td>
                        <td>2시간 이상</td>
                        <td class="txt-left">당해작업과 관련된 안전보건사항</td>
                      </tr>
                      <tr>
                        <th scope="row" colspan="2">위탁 교육</th>
                        <td>분기별<br>취득 및 갱신 필요시</td>
                        <td>
                          <ul class="txt-lst">
                            <li>
                              <p>관리감독자</p>
                            </li>
                            <li>
                              <p>일반 근로자</p>
                            </li>
                            <li>
                              <p>신규 채용 근로자</p>
                            </li>
                          </ul>
                        </td>
                        <td>교육기관 일정 의거</td>
                        <td class="txt-left">
                          <ul class="txt-lst">
                            <li>
                              <p>GWO</p>
                            </li>
                            <li>
                              <p>법정의무교육</p>
                            </li>
                            <li>
                              <p>위탁교육 필요 시 요청</p>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>
				</div>
				
			</div>
		</section>
	</div>
</main>
<input id="file-input0301" type="file" onchange='getFilenameCom0301(this)' name="doc_file" style="display: none;" />
<input id="file-input0302" type="file" onchange='getFilenameCom0302(this)' name="doc_file" style="display: none;" />

<!-- 스크립트 -->
<script src="${ctxPath}/script/com/com_0301.js?cachebuster=" + newDate().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
	$(document).ready(function() {
		
		com0301();
	});
</script>


