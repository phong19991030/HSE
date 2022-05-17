<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
.notDownload { cursor: not-allowed; }
td { text-overflow:ellipsis; overflow:hidden; white-space:nowrap; }
span.detail-search-keyword{line-height:3;}
</style>
<main id="content" class="general-page">
      <div class="container">
        <section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1"><spring:message code="com.com0201.label.title"/></h1>
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
                    <span class="item-tit"><spring:message code="com.com0201.label.turbine.status"/></span>
                    <div class="select-group">
                      <select title="분류" id="SEARCH_MENU_A">
                      	<option value="">내용</option>
                   		<c:forEach items="${turbineStatus}" var="type" varStatus="loop">
                   			<option value="${type.COMM_CD}">${type.COMM_NM}</option>
                   		</c:forEach>
                      </select>
                    </div>
                  </div> -->
                  
                  <!-- item -->
                  <!-- <div class="item">
                    <span class="item-tit"><spring:message code="com.com0201.label.payment.status"/></span>
                    <div class="select-group">
                      <select title="분류" id="SEARCH_MENU_B">
                      	<option value="">내용</option>
                   		<%-- <c:forEach items="${turbineStatus}" var="type" varStatus="loop">
                   			<option value="${type.COMM_CD}">${type.COMM_NM}</option>
                   		</c:forEach> --%>
                      </select>
                    </div>
                  </div> -->
                  <!-- item -->
                  <div class="item search">
                    <span class="item-tit"><spring:message code="txt.search"/></span>
                    <div class="register-write">
                      <div class="input-group">
                        <input type="text" id="SEARCH_MENU_ALL" title="통합검색" placeholder="검색어를 입력해주세요" value="">
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
                      <col style="width: 15%;">
                      <col style="width: 7%;">
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope="col"><spring:message code="hea.label.no"/></th>
                        <th scope="col"><spring:message code="com.com0201.label.turbine.no"/></th>
                        <th scope="col"><spring:message code="com.com0201.label.turbine.model"/></th>
                        <th scope="col"><spring:message code="com.com0201.label.turbine.name"/></th>
                        <th scope="col"><spring:message code="com.com0201.label.turbine.year"/></th>
                        <th scope="col"><spring:message code="com.com0201.label.turbine.rate"/></th>
                        <th scope="col"><spring:message code="com.com0201.label.turbine.status"/></th>
                      </tr>
                    </thead>
                    <tbody id='ROW_LIST'>
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
                    <button id="REGISTER_BTN" class="btn-style1">
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
<!-- 스크립트 -->	
<script src="${ctxPath}/script/com/com_020100.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<c:set var="Complete18n"><spring:message code="com.com0201.option.status.complete" /></c:set>
<input id="Complete18n" type="hidden" value="${Complete18n}"/>

<c:set var="Stop18n"><spring:message code="com.com0201.option.status.stop" /></c:set>
<input id="Stop18n" type="hidden" value="${Stop18n}"/>


<c:set var="Progress18n"><spring:message code="com.com0201.option.status.progress" /></c:set>
<input id="Progress18n" type="hidden" value="${Progress18n}"/>

<c:set var="inOperation18n"><spring:message code="com.com0201.option.status.inOperation" /></c:set>
<input id="inOperation18n" type="hidden" value="${inOperation18n}"/>

<c:set var="Under18n"><spring:message code="com.com0201.option.status.Under" /></c:set>
<input id="Under18n" type="hidden" value="${Under18n}"/>
<script>
	var page = 1;
	$(document).ready(function(){
    var localParam = retrieveLocalObject('paramSearch');
    if(localParam != null){
        page = localParam['PAGE'] != null ? localParam['PAGE'] : 1;
        const SEARCH_ALL = localParam['SEARCH_ALL'];
        const SEARCH_STATUS = localParam['SEARCH_STATUS'];
        const SEARCH_PAYMENT_STATUS = localParam['SEARCH_PAYMENT_STATUS'];      
        var pageSize = localParam['PAGE_SIZE'] != null ? localParam['PAGE_SIZE'] : "10";

        $('select#PAGE_SIZE').val(pageSize);
        $('input#SEARCH_MENU_ALL').val(SEARCH_ALL);
        $('select#SEARCH_MENU_A').val(SEARCH_STATUS);
        $('input#SEARCH_MENU_B').val(SEARCH_PAYMENT_STATUS);
        _search.ALL = SEARCH_ALL;
        _search.A= SEARCH_STATUS;
        _search.B=SEARCH_PAYMENT_STATUS;  
    }
    com020100();
	});
</script>

	
