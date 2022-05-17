<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<main id="content" class="health-page">
	<div class="container">
		<section class="hdSection">
			<!-- tit-wrap -->
			<div class="tit-wrap">
				<div class="tit-left">
					<h1 class="heading1"><spring:message code="hea.hea_0001.title.health" /></h1>
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
								
            <%--<!-- item -->
							<div class="item">
								<span class="item-tit"><spring:message code="hea.label.area" /></span>
								<div class="select-group">
									<select title="분류">
										<option value="">내용</option>
									</select>
								</div>
							</div>
							<!-- item -->
							<div class="item">
								<span class="item-tit"><spring:message code="hea.label.safeCourseCert"/></span>
								<div class="select-group">
									<select title="분류">
										<option value="">내용</option>
										<c:forEach items="${safeCourseCertState}" var="state" varStatus="loop">
			                      			<option value="${state.COMM_CD}">${state.COMM_NM}</option>
			                      		</c:forEach>
									</select>
								</div>
							</div>--%>
              <!-- item -->
              <%--<div class="item">
                <span class="item-tit"><spring:message code="hea.label.area" /></span>
                <div class="register-write">
                  <div class="input-group">
                    <input id="id_search_area" type="text" title="분류" placeholder="분류">
                  </div>
                </div>
              </div>
              <!-- item -->
              <div class="item">
                <span class="item-tit"><spring:message code="hea.label.safeCourseCert"/></span>
                <div class="register-write">
                  <div class="input-group">
                    <input id="id_search_safeCourseCert" type="text" title="분류" placeholder="분류">
                  </div>
                </div>
              </div>
							<div class="item">
								<span class="item-tit"><spring:message code="hea.label.pprStatus"/></span>
								<div class="select-group">
									<select title="분류" id="id_search_paid">
										<option value="">내용</option>
										<c:forEach items="${paidState}" var="state" varStatus="loop">
			                      			<option value="${state.COMM_CD}">${state.COMM_NM}</option>
			                      		</c:forEach>
									</select>
								</div>
							</div>
							<div class="item">
								<span class="item-tit"><spring:message code="com.com0201.label.payment.status"/></span>
								<div class="select-group">
									<select title="분류" id="id_search_payment">
										<option value="">내용</option>
									</select>
								</div>
							</div>--%>
							<div class="item search">
								<span class="item-tit"><spring:message code="txt.search"/></span>
								<div class="register-write">
									<div class="input-group">
										<input type="text" title="통합검색" placeholder='<spring:message code="hea.hea_0001.form.search.placeholder.searchAll"/>' id="SEARCH_EMP_ALL">
									</div>
								</div>
							</div>
						</div>
						<div class="btn-wrap">
							<button id="SEARCH_RESET_BTN" class="refresh-btn">
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
									<col style="width: 5%;">
									<col style="width: 5%;">
									<col style="width: 5%;">
									<col style="width: 5%;">
									<col style="width: 10%;">
									<col style="width: 5%;">
									<!-- <col style="width: 30%;">
									<col style="width: 20%;"> -->
									<col style="width: 5%;">
									<col style="width: 5%;">
									<col style="width: 5%;">
									<col style="width: 5%;">
								</colgroup>
								<thead>
									<tr>
										<th scope="col"><spring:message code="hea.label.no"/></th>
										<th scope="col"><spring:message code="hea.label.empName"/></th>
										<th scope="col"><spring:message code="hea.label.duty"/></th>
										<th scope="col"><spring:message code="hea.label.position"/></th>
										<th scope="col"><spring:message code="hea.label.area"/></th>
										<th scope="col"><spring:message code="hea.label.expr"/></th>
										<!-- <th scope="col"><spring:message code="hea.label.mainExpr"/></th>
										<th scope="col"><spring:message code="hea.label.mainDegree"/></th> -->
										<th scope="col"><spring:message code="hea.label.safeCourseCert"/></th>
										<th scope="col"><spring:message code="hea.label.certDate"/></th>
										<th scope="col"><spring:message code="hea.label.renewalCertDate"/></th>
										<th scope="col"><spring:message code="hea.label.pprStatus"/></th>
									</tr>
								</thead>
								<tbody id="ROW_LIST">
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
									<i class="las la-edit"></i><span class="name"><spring:message code="button.register"/></span>
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

<%-- <script src="${ctxPath}/script/hea/hea_0001.js?cachebuster=" + new Date().getTime()></script> --%>
<script src="${ctxPath}/script/hea/hea_0001.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>

<script>
	var page = 1;
	$(document).ready(function(){
    var localParam = retrieveLocalObject('paramSearch');
    if(localParam != null){
        page = localParam['PAGE'] != null ? localParam['PAGE'] : 1;
        const SEARCH_ALL = localParam['SEARCH_ALL'];
        const search_area = localParam['search_area'];
        const search_safeCourseCert = localParam['search_safeCourseCert'];
        const search_paid = localParam['search_paid'];
        const search_payment = localParam['search_payment'];        
        var pageSize = localParam['PAGE_SIZE'] != null ? localParam['PAGE_SIZE'] : "10";

        $('select#PAGE_SIZE').val(pageSize);
        $('input#SEARCH_EMP_ALL').val(SEARCH_ALL);
        $('input#id_search_area').val(search_area);
        $('input#id_search_safeCourseCert').val(search_safeCourseCert);
        $('select#id_search_paid').val(search_paid);
        $('select#id_search_payment').val(search_payment);
        _search.ALL = SEARCH_ALL;
        _search.A= search_area;
        _search.B=search_safeCourseCert;  
        _search.C=search_paid;  
        _search.D=search_payment;  
    }
		sys0001();
	});
</script>

