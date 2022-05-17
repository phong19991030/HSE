<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<main id="content" class="health-page">
	<div class="container">
		<section class="hdSection">
			<!-- tit-wrap -->
			<div class="tit-wrap">
				<div class="tit-left">
					<h1 class="heading1"><spring:message code="hea.hea_0002.title.health" /></h1>
				</div>
			</div>
			<!-- //tit-wrap -->
		</section>

		<!-- D : contSection border /
          1. tab : border (If you have a tap, please add this.)
          2. no tab : unborder  add (border-top disappears.)
           -->
		<section class="contSection unborder">
			<div class="content">
				<div class="content-body">

					<!-- fixed-search-form -->
					<div class="fixed-search-form">
						<div class="flex-wrap">
							<!-- item -->
							<%--<div class="item">
								<span class="item-tit"><spring:message code="hea.form.search.label.empName"/></span>
								<div class="register-write">
									<div class="input-group">
										<input type="text" placeholder="<spring:message code="hea.form.search.placeholder.empName"/>" id="SEARCH_EMP_NAME">
									</div>
								</div>
                <div class="register-write w50p" style="display: flex;">
                  <div class="">
                    <input type="text" id="id_emp_str_uid_key_search_emp" name="EMP_SEARCH_0002" value="" hidden="true"/>
                  </div>
                  <jsp:include page="../common/select_emp_btn.jsp">
                    <jsp:param name="key" value="key_search_emp" />
                    <jsp:param name="isOne" value="true" />
                  </jsp:include>
                </div>
							  </div>--%>
              <%--<div class="item">
                <span class="checkbox-radio-group">
                  <label><input type="checkbox" name="checkbox"></label>
                </span>
                <span class="item-tit">신필요자 보기</span>
              </div>
              <div class="item">
								<span class="item-tit"><spring:message code="com.com0201.label.payment.status"/></span>
								<div class="select-group">
									<select title="분류" id="id_search_payment">
										<option value="">내용</option>
									</select>
								</div>
							</div>
							<!-- item -->
							<!-- <div class="item">
								<span class="item-tit"><spring:message code="hea.hea_0002.label.healthCheckCertDate"/></span>
								<div class="calendar-picker">
									<div class="input-group">
										<label class="sr-only"><spring:message code="hea.hea_0002.label.healthCheckCertDate"/></label> 
										<input type="text" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker"
											readonly id="SEARCH_CERT_DATE">
										<button class="calendar-picker-btn"></button>
									</div>
								</div>
							</div> -->
							<!-- item -->--%>
							<div class="item search">
								<span class="item-tit"><spring:message code="txt.search"/></span>
								<div class="register-write">
									<div class="input-group">
										<input type="text" id="SEARCH_ALL" placeholder="<spring:message code="hea.form.search.placeholder.searchAll"/>">
									</div>
								</div>
							</div>
						</div>
						<div class="btn-wrap">
							<button class="refresh-btn" id="SEARCH_RESET_BTN">
								<span class="sr-only">새로고침</span>
							</button>
							<button class="search-btn" id="SEARCH_BTN"><spring:message code="common.button.label.search"/></button>
						</div>

					</div>
					<!-- // fixed-search-form -->

					<!-- D : list-form (목록폼)
                	1. After setting the width value on the colgroup,
                	2. Please cover all the text in td with a <p> tag (ellipsis) -->
					<article class="list-form">
						<!-- table -->
						<div class="base-table center-table">
							<table>
								<caption></caption>
								<colgroup>
									<col style="width: 7%;">
									<col style="width: 17%;">
									<col style="width: 17%;">
                  <col style="width: 17%;">
									<col style="width: 7%;">
									<col style="width: 7%;">
									<col style="width: 10%;">
									<col style="width: 10%;">
									<!-- <col style="width: 25%;"> -->
									<!-- <col style="width: 15%;">
									<col style="width: 10%;"> -->
								</colgroup>
								<thead>
									<tr>
										<th scope="col"><spring:message code="hea.hea_0002.label.no"/></th>
										<th scope="col"><spring:message code="hea.hea_0002.label.empName"/></th>
										<th scope="col"><spring:message code="hea.hea_0002.label.duty"/></th>
                    <th scope="col">직책</th>
										<th scope="col"><spring:message code="hea.hea_0002.label.height"/></th>
										<th scope="col"><spring:message code="hea.hea_0002.label.weight"/></th>
										<th scope="col"><spring:message code="hea.hea_0002.label.eye"/></th>
										<th scope="col"><spring:message code="hea.hea_0002.label.bp"/></th>
										<!-- <th scope="col"><spring:message code="hea.hea_0002.label.diseases"/></th> -->
										<!-- <th scope="col"><spring:message code="hea.hea_0002.label.healthCheckCertDate"/></th>
										<th scope="col"><spring:message code="hea.hea_0002.label.healthCheckFile"/></th> -->
									</tr>
								</thead>
								<tbody id="ROW_LIST">
									<!-- <tr>
										<td>
											<p>10</p>
										</td>
										<td>
											<p>홍길동</p>
										</td>
										<td>
											<p>과장</p>
										</td>
										<td>
											<p>180cm</p>
										</td>
										<td>
											<p>80kg</p>
										</td>
										<td>
											<p>02 / 0.8</p>
										</td>
										<td>
											<p>135 / 95</p>
										</td>
										<td>
											<p>허리 디스크(현재 치료중)</p>
										</td>
										<td>
											<p>2020.08.10</p>
										</td>
										<td>
											<button class="btns">
												<i class="las la-download"></i> <span class="sr-only">다운로드</span>
											</button>
										</td>
									</tr> -->
								</tbody>
								<!-- last tr bottom shadow -->
								<tfoot>
									<tr class="hidden-table-bottom">
										<td></td>
									</tr>
								</tfoot>
								<!-- last tr bottom shadow -->
							</table>
						</div>
						<!-- //table -->

						<!-- table-foot-area -->
						<div class="table-foot-area">
							<!-- 정렬 -->
							<div class="sort-length">
								<div class="select-group">
									<select class="select" title="한 페이지에 표시할 행 설정" id="PAGE_SIZE">
										<option value="10" selected>10
											<spring:message code="pcs.keyword" /></option>
										<option value="20">20
											<spring:message code="pcs.keyword" /></option>
										<option value="30">30
											<spring:message code="pcs.keyword" /></option>
									</select>
								</div>
							</div>
							<!-- pager -->
							<div id="PAGENATION" class="pager">
								<a href="javascript:void(0);" id="PRE_PAGE" class="arr prev">
									<span class="sr-only">이전</span>
								</a> <a href="javascript:void(0);" id="NXT_PAGE" class="arr next">
									<span class="sr-only">다음</span>
								</a>
							</div>
							<!-- foot btn -->
							<div class="foot-btn">
								<button class="btn-style1" id="REGISTER_BTN">
									<i class="las la-edit"></i><span class="name"><spring:message
											code="button.register" /></span>
								</button>
							</div>
						</div>
						<!-- //table-foot-area -->
					</article>

				</div>

			</div>
		</section>
	</div>
</main>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/hea/hea_0002.js"></script>

<script>
	var page = 1;
	$(document).ready(function(){
    var localParam = retrieveLocalObject('paramSearch');
    if(localParam != null){
        page = localParam['PAGE'] != null ? localParam['PAGE'] : 1;
        const SEARCH_ALL = localParam['SEARCH_ALL'];
        const SEARCH_EMP_NO = localParam['SEARCH_EMP_NO'];
        const SEARCH_CERT_DATE = localParam['SEARCH_CERT_DATE'];      
        var pageSize = localParam['PAGE_SIZE'] != null ? localParam['PAGE_SIZE'] : "10";

        $('select#PAGE_SIZE').val(pageSize);
        $('input#SEARCH_ALL').val(SEARCH_ALL);
        $('input#id_emp_str_uid_key_search_emp').val(SEARCH_EMP_NO);
        $('input#SEARCH_CERT_DATE').val(SEARCH_CERT_DATE);
        _search.ALL = SEARCH_ALL;
        _search.A= SEARCH_EMP_NO;
        _search.B=SEARCH_CERT_DATE;  
    }
		hea_0002();
    getEmpInfos('key_search_emp', (_search.A)?_search.A:'');
	});
</script>

