<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ include file="/WEB-INF/_include/taglib.jsp" %>


    <div class="fixed-search-form">
      <div class="flex-wrap">
        <%--<!-- item -->
        <div class="item">
          <span class="item-tit">
            <spring:message code="sft.sft_0002.label.projectName" />
          </span>
          <div class="select-group" style="width: 345px;">
            <select title="프로젝트명" id="id_search_project_name">
              <option value="">전체</option>
              <c:forEach items="${projects}" var="project" varStatus="loop">
                <option value="${project.PROJECT_ID}">${project.PROJECT_NAME}</option>
              </c:forEach>
            </select>
          </div>
        </div>
        <!-- item -->
        <div class="item">
          <span class="item-tit">
            <spring:message code="sft.sft_0002.label.registerUser" />
          </span>
          <!-- <div class="select-group">
            <select title="신청자">
              <option value="">내용</option>
              <option value="">내용</option>
              <option value="">내용</option>
            </select>
          </div> -->
          <div class="register-write w50p" style="display: flex;">
            <input type="text" id="id_emp_str_uid_key_search_0002" name="EMP_SEARCH_0002" value="" hidden="true" />
            <jsp:include page="../common/select_emp_btn.jsp">
              <jsp:param name="key" value="key_search_0002" />
              <jsp:param name="isOne" value="true" />
            </jsp:include>
          </div>
        </div>
        <div class="item">
          <span class="item-tit">
            <spring:message code="sft.sft_0002.label.grantDate" />
          </span>
          <div class="calendar-picker">
            <div class="input-group">
              <label class="sr-only">날짜설정</label>
              <input type="text" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly
                id='id_search_grantDate'>
              <button class="calendar-picker-btn"></button>
            </div>
          </div>
        </div>--%>
        <div class="item search">
          <span class="item-tit">
            <spring:message code="txt.search" />
          </span>
          <div class="register-write">
            <div class="input-group">
              <input type="text" title="통합검색" placeholder="검색어를 입력해주세요" id='id_search_txt'>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <button id="SEARCH_RESET_BTN0002" class="refresh-btn"><span class="sr-only">
            <spring:message code="refresh.keyword" />
          </span></button>
        <button id="SEARCH_BTN0002" class="search-btn">
          <spring:message code="search.keyword" />
        </button>
      </div>
    </div>

    <article class="list-form">
      <div class="base-table center-table">
        <table>
          <caption></caption>
          <colgroup>
            <col style="width: 5%;">
            <col style="width: 28%;">
            <col style="width: 11%;">
            <col style="width: 11%;">
            <col style="width: 11%;">
            <col style="width: 16%;">
            <col style="width: 9%;">
            <col style="width: 9%;">
          </colgroup>
          <thead>
            <tr>
              <th scope="col">
                <spring:message code="hea.label.no" />
              </th>
              <th scope="col" class="txt-left">
                <spring:message code="sft.sft_0002.label.projectName" />
              </th>
              <th scope="col" class="txt-left">
                <spring:message code="sft.sft_0002.label.toolName" />
              </th>
              <th scope="col">
                <spring:message code="sft.sft_0002.label.grantDate" />
              </th>
              <th scope="col">
                <spring:message code="sft.sft_0002.label.expectRevokeDate" />
              </th>
              <th scope="col">
                <spring:message code="sft.sft_0002.label.revokeDate" />
              </th>
              <th scope="col">
                <spring:message code="sft.sft_0002.label.registerUser" />
              </th>
              <th scope="col">
                <spring:message code="sft.sft_0002.label.approveUser" />
              </th>
            </tr>
          </thead>
          <tbody id="ROW_LIST_0002">

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
            <select id="PAGE_SIZE0002" class="select" title="한 페이지에 표시할 행 설정">
              <option selected>10
                <spring:message code="pcs.keyword" />
              </option>
              <option>20
                <spring:message code="pcs.keyword" />
              </option>
              <option>30
                <spring:message code="pcs.keyword" />
              </option>
            </select>
          </div>
        </div>
        <!-- pager -->
        <div id="PAGENATION0002" class="pager">
          <a id="FST_PAGE0002" href="javascript:void(0);" class="arr prev">&lt;&lt;</a>
          <a id="PRE_PAGE0002" href="javascript:void(0);" class="arr prev">&lt;</a>

          <a id="NXT_PAGE0002" href="javascript:void(0);" class="arr next">&gt;</a>
          <a id="LST_PAGE0002" href="javascript:void(0);" class="arr next">&gt;&gt;</a>
        </div>

        <!-- foot btn -->
        <div class="foot-btn">
          <button id="REGISTER_BTN_0002" class="btn-style1">
            <i class="las la-edit"></i><span class="name">
              <spring:message code="button.register" />
            </span>
          </button>
        </div>
      </div>
    </article>

    <script>
      $(document).ready(function () {
        //sft0002();		
      });
    </script>