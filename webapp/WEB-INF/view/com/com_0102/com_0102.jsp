<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<main id="content" class="general-page">
	<div class="container">
		<section class="hdSection">
			<!-- tit-wrap -->
			<div class="tit-wrap">
				<div class="tit-left">
					<h1 class="heading1"><spring:message code="com.com_0102.label.project"/></h1>
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
							<!-- <div class="item">
								<span class="item-tit"><spring:message code="com.com_0102.label.period"/></span>
								<div class="calendar-picker">
									<div class="first-date">
										<div class="input-group">
											<label class="sr-only">처음날짜</label> <input type="text"
												title="처음날짜설정" class="datepicker" placeholder="YYYY-MM-DD" id="SEARCH_PROJECT_A"
												readonly>
											<button class="calendar-picker-btn"></button>
										</div>
									</div>
									<div class="last-date">
										<div class="input-group">
											<label class="sr-only">마지막날짜</label> <input type="text"
												title="마지막날짜설정" class="datepicker" placeholder="YYYY-MM-DD" id="SEARCH_PROJECT_B"
												readonly>
											<button class="calendar-picker-btn"></button>
										</div>
									</div>
								</div>
							</div> -->
							<!-- <div class="item">
								<span class="item-tit"><spring:message code="com.com0201.label.payment.status"/></span>
								<div class="select-group">
									<select title="분류" id="SEARCH_PROJECT_C">
										<option value="">내용</option>
									</select>
								</div>
							</div> -->
							<!-- item -->
							<!-- item -->
							<div class="item search">
								<span class="item-tit"><spring:message code="txt.search"/></span>
								<div class="register-write">
									<div class="input-group">
										<input type="text" title="통합검색" placeholder="검색어를 입력해주세요" id="SEARCH_PROJECT_ALL">
									</div>
								</div>
							</div>
						</div>
						<div class="btn-wrap">
							<button class="refresh-btn" id="SEARCH_RESET_BTN"><span class="sr-only"><spring:message code="refresh.keyword"/></span></button>
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
									<col style="width: 15%;">
									<col style="width: 25%;">
									<col style="width: 10%;">
									<col style="width: 10%;">
									<col style="width: 7%;">
								</colgroup>
								<thead>
									<tr>
										<th scope="col"><spring:message code="com.com_0102.label.no"/></th>
										<th scope="col"><spring:message code="com.com_0102.label.companyName"/></th>
										<th scope="col"><spring:message code="com.com_0102.label.projectName"/></th>
										<th scope="col"><spring:message code="com.com_0102.label.period"/></th>
										<th scope="col"><spring:message code="com.com_0102.label.manager"/></th>
										<th scope="col"><spring:message code="com.com_0102.label.totalManpower"/></th>
										<th scope="col"><spring:message code="com.com_0102.label.status"/></th>
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

<script src="${ctxPath}/script/com/com_0102.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>

<script>
	var page = 1;
	$(document).ready(function(){
    var localParam = retrieveLocalObject('paramSearch');
    if(localParam != null){
        page = localParam['PAGE'] != null ? localParam['PAGE'] : 1;
        const SEARCH_ALL = localParam['SEARCH_ALL'];
        const SEARCH_START_TIME = localParam['SEARCH_START_TIME'];
        const SEARCH_END_TIME = localParam['SEARCH_END_TIME'];
        const SEARCH_PAYMENT_STATUS = localParam['SEARCH_PAYMENT_STATUS'];        
        var pageSize = localParam['PAGE_SIZE'] != null ? localParam['PAGE_SIZE'] : "10";

        $('select#PAGE_SIZE').val(pageSize);
        $('input#SEARCH_PROJECT_ALL').val(SEARCH_ALL);
        $('input#SEARCH_PROJECT_A').val(SEARCH_START_TIME);
        $('input#SEARCH_PROJECT_B').val(SEARCH_END_TIME);
        $('input#SEARCH_PROJECT_C').val(SEARCH_PAYMENT_STATUS);

        _search.ALL = SEARCH_ALL;
        _search.A= SEARCH_START_TIME;
        _search.B=SEARCH_END_TIME;  
        _search.C=SEARCH_PAYMENT_STATUS;  

    }
		sys0102();
    
	});
</script>
