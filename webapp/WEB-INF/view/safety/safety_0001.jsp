<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ include file="/WEB-INF/_include/taglib.jsp" %>

    <main id="content" class="safety-page">
      <div class="container">
        <section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1">
                <spring:message code="sft.sft_0001.label.header.total" />
              </h1>
            </div>
          </div>
          <!-- //tit-wrap -->
        </section>

        <section class="contSection border">
          <div class="content">
            <ul class="tab clearfix">
              <li class="current" id="id_tab_0001"><a href="javascript:void(0);" id="id_sft0001">
                  <spring:message code="sft.sft_0001.label.tab1" />
                </a></li>
              <li id="id_tab_0002"><a href="javascript:void(0);" id="id_sft0002">
                  <spring:message code="sft.sft_0001.label.tab2" />
                </a></li>
            </ul>
            <div class="content-body" id="id_content_0002" style="display: none;">
              <jsp:include page="safety_0002.jsp"></jsp:include>
            </div>

            <div class="content-body" id="id_content_0001">
              <div class="fixed-search-form">
                <div class="flex-wrap">
                  <%--<!-- item -->
                  <div class="item">
                    <span class="checkbox-radio-group">
                      <label><input type="checkbox" name="checkbox"></label>
                    </span>
                    <span class="item-tit">
                      <spring:message code="sft.sft_0001.search.renewal.cb" />
                    </span>
                  </div>
                  <!-- item -->
                  <div class="item">
                    <span class="item-tit">
                      <spring:message code="sft.sft_0001.label.toolType" />
                    </span>
                    <div class="select-group">
                      <select title="구분" id='id_search_tool_type'>
                        <option value="">내용</option>
                        <c:forEach items="${toolTypes}" var="type" varStatus="loop">
                          <option value="${type.COMM_CD}">${type.COMM_NM}</option>
                        </c:forEach>
                      </select>
                    </div>
                  </div>
                  <!-- item -->
                  <div class="item">
                    <span class="item-tit">
                      <spring:message code="sft.sft_0001.label.correctionDate" />
                    </span>
                    <div class="calendar-picker">
                      <div class="first-date">
                        <div class="input-group">
                          <label class="sr-only">처음날짜</label>
                          <input id='id_search_first_date' type="text" title="처음날짜설정" class="datepicker"
                            placeholder="YYYY-MM-DD" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                      <div class="last-date">
                        <div class="input-group">
                          <label class="sr-only">처음날짜</label>
                          <input id='id_search_last_date' type="text" title="마지막날짜설정" class="datepicker"
                            placeholder="YYYY-MM-DD" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item">
                    <span class="item-tit">
                      <spring:message code="com.com0201.label.payment.status" />
                    </span>
                    <div class="select-group">
                      <select title="분류" id="id_search_payment_status">
                        <option value="">내용</option>
                      </select>
                    </div>
                  </div>--%>
                  <!-- item -->
                  <div class="item search">
                    <span class="item-tit">
                      <spring:message code="txt.search" />
                    </span>
                    <div class="register-write">
                      <div class="input-group">
                        <input type="text" title="통합검색" placeholder="내용을 입력하세요" id='id_search_txt_0001'>
                      </div>
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
            <article class="list-form">
              <div class="base-table center-table">
                <table>
                  <caption></caption>
                  <colgroup>
                    <col style="width: 5%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 5%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 5%;">
                    <col style="width: 10%;">
                    <col style="width: 15%;">
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">
                        <spring:message code="com.com_0101.label.no" />
                      </th>
                      <th scope="col">
                        <spring:message code="sft.sft_0001.label.toolType" />
                      </th>
                      <th scope="col">
                        <spring:message code="sft.sft_0001.label.manageNo" />
                      </th>
                      <th scope="col">
                        <spring:message code="sft.sft_0001.label.toolName" />
                      </th>
                      <th scope="col">
                        <spring:message code="sft.sft_0001.label.standard" />
                      </th>
                      <th scope="col">
                        <spring:message code="sft.sft_0001.label.brandName" />
                      </th>
                      <th scope="col">
                        <spring:message code="sft.sft_0001.label.modelName" />
                      </th>
                      <th scope="col">
                        <spring:message code="sft.sft_0001.label.amount" />
                      </th>
                      <th scope="col">
                        <spring:message code="sft.sft_0001.label.lossOrDamageAmount" />
                      </th>
                      <th scope="col">
                        <spring:message code="sft.sft_0001.label.correctionDate" />
                      </th>
                      <th scope="col">
                        <spring:message code="sft.sft_0001.label.renewDate" />
                      </th>
                    </tr>
                  </thead>
                  <tbody id="ROW_LIST_0001">

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
                        <spring:message code="pcs.keyword" />
                      </option>
                      <option value="20">20
                        <spring:message code="pcs.keyword" />
                      </option>
                      <option value="30">30
                        <spring:message code="pcs.keyword" />
                      </option>
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
                  <button id="REGISTER_BTN_001" class="btn-style1">
                    <i class="las la-edit"></i><span class="name">
                      <spring:message code="button.register" />
                    </span>
                  </button>
                </div>
              </div>
            </article>
          </div>
      </div>
      </section>
      </div>
    </main>

    <script src="${ctxPath}/script/safety/safety_0001.js?cachebuster=" + new Date().getTime()></script>
    <script src="${ctxPath}/script/safety/safety_0002.js?cachebuster=" + new Date().getTime()></script>
    <script src="${ctxPath}/script/sys/sys-common.js"></script>

    <script>
      var page = 1;
      $(document).ready(function () {
        //		tab control

        $('a#id_sft0001').click(function () {

          document.getElementById("id_tab_0002").classList.remove("current");

          document.getElementById("id_content_0001").style.display = 'block';
          document.getElementById("id_content_0002").style.display = 'none';

          document.getElementById("id_tab_0001").classList.add("current");
        });
        $('a#id_sft0002').click(function () {

          document.getElementById("id_tab_0001").classList.remove("current");

          document.getElementById("id_content_0002").style.display = 'block';
          document.getElementById("id_content_0001").style.display = 'none';

          document.getElementById("id_tab_0002").classList.add("current");
        });

        var localParam = retrieveLocalObject('paramSearchSft0001');
        if (localParam != null) {
          $('a#id_sft0001').click();
          page = localParam['PAGE'] != null ? localParam['PAGE'] : 1;
          const TOOL_TYPE = localParam['TOOL_TYPE'];
          const TOOL_NAME = localParam['TOOL_NAME'];
          const PAYMENT_STATUS = localParam['PAYMENT_STATUS'];
          const SEARCH_FIRST_DT = localParam['SEARCH_FIRST_DT'];
          const SEARCH_LAST_DT = localParam['SEARCH_LAST_DT'];
          const all = localParam['all'];
          var pageSize = localParam['PAGE_SIZE'] != null ? localParam['PAGE_SIZE'] : "10";

          $('#id_search_tool_type').val(TOOL_TYPE);
          $('#id_search_tool_name').val(TOOL_NAME);
          $('#id_search_payment_status').val(PAYMENT_STATUS);
          $('#id_search_first_date').val(SEARCH_FIRST_DT);
          $('#id_search_last_date').val(SEARCH_LAST_DT);
          $('#id_search_txt_0001').val(all);
          $('select#PAGE_SIZE').val(pageSize);
        }
        sft0001();
        var localParam2 = retrieveLocalObject('paramSearchSft0002');
        if (localParam2 != null) {
          $('a#id_sft0002').click();
          page = localParam2['PAGE'] != null ? localParam2['PAGE'] : 1;
          const PROJECT_ID = localParam2['PROJECT_ID'];
          const REGISTER_USER = localParam2['REGISTER_USER'];
          const GRANT_DATE = localParam2['GRANT_DATE'];
          const all = localParam2['all'];
          var pageSize = localParam2['PAGE_SIZE'] != null ? localParam2['PAGE_SIZE'] : "10";

          $('#id_search_project_name').val(PROJECT_ID);
          $('#id_emp_str_uid_key_search_0002').val(REGISTER_USER);
          $('#id_search_grantDate').val(GRANT_DATE);
          $('#id_search_txt').val(all);
          $('select#PAGE_SIZE').val(pageSize);
          getEmpInfos('key_search_0002', (REGISTER_USER) ? REGISTER_USER : '');
        }
        sft0002();

      });
    </script>