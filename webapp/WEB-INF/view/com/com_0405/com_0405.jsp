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
              <h1 class="heading1"><spring:message code="com.com_0405.label.company" /></h1>
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
			                <div class="item search">
			                	<span class="item-tit"><spring:message code="com.com_0405.label.company" /></span>
			                  	<div class="register-write">
			                    	<div class="input-group">
			                    		<!-- <input type="text" title="통합검색" placeholder="검색어를 입력해주세요" value="에러발생"> -->
			                    		<input type="text" id='id_search_txt'>
			                   		</div>	
			                	</div>
			                </div>
			                <div class="btn-wrap">
				                  <button id="SEARCH_RESET_BTN" class="refresh-btn"><span class="sr-only"><spring:message code="refresh.keyword" /></span></button>
				                  <button id="SEARCH_BTN" class="search-btn"><spring:message code="search.keyword" /></button>
				        	</div>
              			</div>
              		</div>
              		
              		<article class="list-form">
              			<div class="base-table center-table">
              				<table>
                    			<caption></caption>
                    			<colgroup>
                    				<col style="width: 5%;">
			                      	<col style="width: 20%;">
			                      	<col style="width: 20%;">
			                    </colgroup>
			                    <thead>
									<tr>
										<th scope="col"><spring:message code="com.com_0405.label.no" /></th>
										<th scope="col"><spring:message code="com.com_0405.label.companyName" /></th>
										<th scope="col"><spring:message code="com.com_0405.label.companyAddress" /></th>
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
			                        <option selected>10 <spring:message code="pcs.keyword" /></option>
			                        <option>20 <spring:message code="pcs.keyword" /></option>
			                        <option>30 <spring:message code="pcs.keyword" /></option>
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
<script src="${ctxPath}/script/com/com_0405.js?cachebuster="+ new Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>		

<script>
	$(document).ready(function(){
		com_0405();		
	});
</script>

	
