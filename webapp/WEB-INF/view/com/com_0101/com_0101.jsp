<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<style>
td a {color:green;}
td.NO_DATA {padding: 10rem .45rem 10rem .45rem !important;font-size: 1rem !important;}
</style>

<input type="hidden" id="COMPANY_ID" name="COMPANY_ID" value="${DATA.COMPANY_ID}"></input>

<main id="content" class="general-page">
	<div class="container">
		<section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1"><spring:message code="com.com_0101.label.user" /></h1>
            </div>
          </div>
          <!-- //tit-wrap -->
        </section>
        
        <section class="contSection unborder">
        	<div class="content">
        		<div class="content-body">
        			<!-- fixed-search-form -->
                  <div class="fixed-search-form">
                    <div class="flex-wrap">
                      <%--<div class="item search">
                        <span class="item-tit">
                          <spring:message code="com.com_0101.label.userId" />
                        </span>
                        <div class="register-write">
                          <div class="input-group">
                            <!-- <input type="text" title="통합검색" placeholder="검색어를 입력해주세요" value="에러발생"> -->
                            <input type="text" id="SEARCH_CRITERIA_A" name="criteriaA" value="" maxlength="50">
                          </div>
                        </div>
                      </div>
                      <div class="item search">
                        <span class="item-tit">
                          <spring:message code="com.com_0101.label.userName" />
                        </span>
                        <div class="register-write">
                          <div class="input-group">
                            <input type="text" id="SEARCH_CRITERIA_B" name="criteriaB" value="">
                          </div>
                        </div>
                      </div>
                      <div class="item search">
                        <span class="item-tit">
                          <spring:message code="com.com_0101.label.company" />
                        </span>
                        <div class="register-write">
                          <div class="input-group">
                            <!-- <input type="text" title="통합검색" placeholder="검색어를 입력해주세요" value="에러발생"> -->
                            <input type="text" id="SEARCH_CRITERIA_C" name="criteriaC" value="">
                          </div>
                        </div>
                      </div>--%>
                      <div class="item search">
                        <span class="item-tit"><spring:message code="txt.search"/></span>
                        <div class="register-write">
                          <div class="input-group">
                            <input type="text" title="통합검색" placeholder="검색어를 입력해주세요" id="SEARCH_CRITERIA_ALL">
                          </div>
                        </div>
                      </div>
                      <div class="btn-wrap">
                        <button id="SEARCH_RESET_BTN" class="refresh-btn"><span class="sr-only">
                            <spring:message code="refresh.keyword" />
                          </span></button>
                        <button id="SEARCH_BTN" class="search-btn">
                          <spring:message code="search.keyword" />
                        </button>
                      </div>
                    </div>
                  </div>
              		
              		<article class="list-form">
              			<div class="base-table center-table">
              				<table>
                    			<caption></caption>
                    			<colgroup>
			                    	<col style="width: 5%;">
			                      	<col style="width: 15%;">
			                      	<col style="width: 20%;">
			                      	<col style="width: 20%;">
			                      	<col style="width: 20%;">
			                    </colgroup>
			                    <thead>
									<tr>
										<th scope="col"><spring:message code="com.com_0101.label.no" /></th>
										<th scope="col"><spring:message code="com.com_0101.label.userId" /></th>
										<th scope="col"><spring:message code="com.com_0101.label.userName" /></th>
										<th scope="col"><spring:message code="com.com_0101.label.date" /></th>
										<th scope="col"><spring:message code="com.com_0101.label.recentLogin" /></th>
									</tr>
								</thead>
								<tbody id="ROW_LIST">
								
								</tbody>
								<tfoot>
			                      	<tr class="hidden-table-bottom">
			                        <td></td>
			                     	</tr>
			                    </tfoot>
                    		</table>
              			</div>
              			
              			<div class="table-foot-area">
	              			<div class="sort-length">
			                    <div class="select-group">
			                      <select id="PAGE_SIZE" class="select" title="한 페이지에 표시할 행 설정">
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
								<a id="FST_PAGE" href="javascript:void(0);" class="arr prev">&lt;&lt;</a>
								<a id="PRE_PAGE" href="javascript:void(0);" class="arr prev">&lt;</a>
								                
								<a id="NXT_PAGE" href="javascript:void(0);" class="arr next">&gt;</a>
								<a id="LST_PAGE" href="javascript:void(0);" class="arr next">&gt;&gt;</a>
							</div>
		                  	
		                  	<!-- foot btn -->
		                  	<div class="foot-btn">
		                    	<button id="REGISTER_BTN" class="btn-style1">
		                      		<i class="las la-edit"></i><span class="name"><spring:message code="button.register" /></span>
		                    	</button>
		                  	</div>
              			</div>
              		</article>
        		</div>
        	</div>
        </section>
	</div>
</main>



	
<!-- 스크립트 -->
<!-- reload file js -->	
<script src="${ctxPath}/script/sys/sys_0300.js?cachebuster="+ new Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>		

<script>
	var page = 1;
	$(document).ready(function(){
    var localParam = retrieveLocalObject('paramSearch');
    if(localParam != null){
        page = localParam['PAGE'] != null ? localParam['PAGE'] : 1;
        const SEARCH_ALL = localParam['SEARCH_ALL'];
        const SEARCH_USER_ID = localParam['SEARCH_USER_ID'];
        const SEARCH_USER_NM = localParam['SEARCH_USER_NM'];
        const SEARCH_COMP_NM = localParam['SEARCH_COMP_NM'];       
        var pageSize = localParam['PAGE_SIZE'] != null ? localParam['PAGE_SIZE'] : "10";

        $('select#PAGE_SIZE').val(pageSize);
        $('input#SEARCH_CRITERIA_ALL').val(SEARCH_ALL);
        $('input#SEARCH_CRITERIA_A').val(SEARCH_USER_ID);
        $('input#SEARCH_CRITERIA_B').val(SEARCH_USER_NM);
        $('input#SEARCH_CRITERIA_C').val(SEARCH_COMP_NM);
        _search.ALL = SEARCH_ALL;
        _search.A= SEARCH_USER_ID;
        _search.B=SEARCH_USER_NM;  
        _search.C=SEARCH_COMP_NM;  
    }
		sys0300();		
	});
</script>

	
