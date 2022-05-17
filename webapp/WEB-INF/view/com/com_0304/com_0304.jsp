<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script type="text/javascript"
	src="${ctxPath}/script/a2mFWJs/security/rsa.js"></script>
<script type="text/javascript"
	src="${ctxPath}/script/a2mFWJs/security/jsbn.js"></script>
<script type="text/javascript"
	src="${ctxPath}/script/a2mFWJs/security/prng4.js"></script>
<script type="text/javascript"
	src="${ctxPath}/script/a2mFWJs/security/rng.js"></script>
<script type="text/javascript"
	src="${ctxPath}/script/a2mFWJs/config/common.js"></script>
<script type="text/javascript">
	var drawgrid = function(formId, data) {
		var number = $('#page-size').val();
		number = number ? number : 10;

		$('#grid').setViewGrid({
			id : 'grid',
			cid : '${cid}',
			type : 'crud',
			displayState : false,
			pinHeader : true,
			url : CTX + '/com/com_0304/getData.ajax',
			param : formId,
			localData : data,
			modelName : 'LIST',
			gridOptions : {
				caption : '',
				loadonce : true,
				pageable : true,
				pageSize : number,
			//                 rownumbersDESC : true,
			},
			colModels : [ {
				name : 'SAFE_COURSE_PLAN_ID',
				id : 'SAFE_COURSE_PLAN_ID',
				hidden : true
			},
			{
				name : 'No.',
				id : 'RN',
				width : '30px'
			},
			{
				name : '<spring:message code="com.com_0304.label.courseType" />',
				id : 'COURSE_TYPE',
				width : '30px'
			}, {
				name : '<spring:message code="com.com_0304.label.TrainTerm" />',
				id : 'TRAIN_TERM'
			}, {
				name : '<spring:message code="com.com_0304.label.TraineeType" />',
				id : 'TRAINEE_TYPE'
			}, {
				name : '<spring:message code="com.com_0304.label.TrainHours" />',
				id : 'TRAIN_HOURS'
			},
			// 현재 성, 이름 나눠져있는데 컬럼명변경없이 일단 FIRST 에 풀네임 기재함
			{
				name : '<spring:message code="com.com_0304.label.Content" />',
				id : 'CONTENT'
			} ],
			defaultOptions : {
				align : 'center',
				width : 100,
				sortable : false
			},

			colspan : [],
			rowspan : [],
			events : [ {
				event : "click",
				funcName : "detailSafeCourse"
			} ],
			btn : [ {
				button : '',
				func : 'addEmp',
				type : 'inline',
				classes : 'btn-style btn-style1 float-right',
				label : '<spring:message code="button.register"/>'
			} ]
		});

		$('.search_tbl').closest('form').find('.btm_refresh').removeClass(
				'ac_click submit');

		return false;
	}

	$(document).ready(
			function() {
				$(document).on('click', '.btm_refresh', function() {
					$(this).closest('form').trigger('reset');
					$(this).closest('form').trigger('submit');
					return false;
				});
				$('#searchAll').attr('placeholder',
						'Enter your search term and then press Enter.');
			});

	// Row click - Detail page 이동
	function detailSafeCourse(rowid, status, e) {
		var rowData = $('#table_grid').getRowData(rowid);

		var url = CTX + '/com/com_0304/detailForm?SAFE_COURSE_PLAN_ID='
				+ rowData.SAFE_COURSE_PLAN_ID;

		window.location.href = url;
	}

	function addEmp() {
		var url = CTX + '/com/com_0304/registerForm';

		window.location.href = url;
	}
</script>
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
              <li><a href="javascript:void(0);">자료실</a></li>
              <li><a href="javascript:void(0);">안전 관리 체계</a></li>
              <li class="current"><a href="javascript:void(0);">안전 교육 계획</a></li>
            </ul>
            <!-- //tab menu -->

            <div class="content-body">
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
<%-- <div class="container">
	<!--tit-wrap-->
	<div class="tit-wrap">
		<h2 class="heading3">
			<span class="txt"><spring:message code="com.com_0304.label.tittle" /></span>
		</h2>
		<ul class="location">
			<li><spring:message code="com.com_0304.label.subTittle1" /></li>
			<li><spring:message code="com.com_0304.label.subTittle2" /> Course</li>
		</ul>
	</div>
	<!--//tit-wrap-->

	<!--search-form-->
	<a2m:searchbox formId="detailKeywordForm" script="drawgrid"
		initenable="true">
		<li><span class="detail-search-keyword"><spring:message code="com.com_0304.label.courseType" /></span>
			<div class="input-group">
				<label for="searchText" class="sr-only">Search</label> <input
					type="text" id="SEARCH_COURSE_TYPE" name="SEARCH_COURSE_TYPE" value="">
			</div></li>

		<li><span class="detail-search-keyword"><spring:message code="com.com_0304.label.TrainTerm" /></span>
			<div class="input-group">
				<label for="searchText" class="sr-only">Search</label> <input
					type="text" id="SEARCH_TRAIN_TERM" name="SEARCH_TRAIN_TERM" value="">
			</div></li>
			
		<li><span class="detail-search-keyword"><spring:message code="com.com_0304.label.TraineeType" /></span>
			<div class="input-group">
				<label for="searchText" class="sr-only">Search</label> <input
					type="text" id="SEARCH_TRAINEE_TYPE" name="SEARCH_TRAINEE_TYPE"
					value="">
			</div></li>
		<li><span class="detail-search-keyword"><spring:message code="com.com_0304.label.TrainHours" /></span>
			<div class="input-group">
				<label for="searchText" class="sr-only">Search</label> <input
					type="text" id="SEARCH_TRAIN_HOURS" name="SEARCH_TRAIN_HOURS" value="">
			</div></li>
		<!--End custom content-->
	</a2m:searchbox>
	<!--//search-form-->


	<!-- Kendo grid -->
	<div id="tb_area" class="result_area">
		<div id="grid"></div>
		<div class="footer_table_btn">
			<a id="DELETE_BTN" href="javascript:void(0);"
				class="btn-style btn-style1" style="width: 100px; margin-left: 5px;"
				onClick="addEmp()"><spring:message code="button.register" /></a>

		</div>
	</div>
</div> --%>