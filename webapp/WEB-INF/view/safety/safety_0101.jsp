<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ include file="/WEB-INF/_include/taglib.jsp" %>

    <style>
      .notDownload {
        cursor: not-allowed;
      }

      td {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      span.detail-search-keyword {
        line-height: 3;
      }
    </style>

    <main id="content" class="safety-page">
      <div class="container">
        <section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1">개인 보호 장비 목록</h1>
            </div>
          </div>
          <!-- //tit-wrap -->
        </section>
        <section class="contSection unborder">
          <div class="content">

            <!-- 검사 필요 목록 -->
            <article class="view-form">
              <h2 class="heading4">검사 필요 목록</h2>
              <div class="base-table custom-table2 center-table">
                <table>
                  <colgroup>
                    <col style="width: 11.1%;">
                    <col style="width: 11.1%;">
                    <col style="width: 11.1%;">
                    <col style="width: 11.1%;">
                    <col style="width: 11.1%;">
                    <col style="width: 11.1%;">
                    <col style="width: 11.1%;">
                    <col style="width: 11.1%;">
                    <col style="width: 11.1%;">
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">
                        <spring:message code="hea.label.no" />
                      </th>
                      <th scope="col">성명</th>
                      <th scope="col">직급</th>
                      <th scope="col">품목</th>
                      <th scope="col">브랜드</th>
                      <th scope="col">모델명</th>
                      <th scope="col">지급일자</th>
                      <th scope="col">검사 및 교체 일자</th>
                      <th scope="col">상태</th>
                    </tr>
                  </thead>
                  <tbody id="INSPECTION_LIST">

                  </tbody>
                </table>
              </div>
            </article>
            <!-- ================================= -->

            <hr class="hr-line2">

            <!-- fixed-search-form -->
            <div class="fixed-search-form">
              <div class="flex-wrap">
                <!-- item -->
                <%--<div class="item">
                  <span class="item-tit">품목</span>
                  <div class="select-group">
                    <select title="품목" id='id_search_tool_type'>
                      <option value="">전체</option>
                      <c:forEach items="${toolType}" var="type" varStatus="loop">
                        <option value="${type.SUBJECT}">${type.SUBJECT}</option>
                      </c:forEach>
                    </select>
                  </div>
                </div>
                <!-- item -->
                <!-- <div class="item">
                  <span class="item-tit">브랜드</span>
                  <div class="select-group">
                    <select title="브랜드" id='id_search_tool_brand'>
                      <option value="">전체</option>
                    </select>
                  </div>
                </div> -->
                <!-- item -->
                <div class="item">
                  <span class="item-tit">상태</span>
                  <div class="select-group">
                    <select title="상태" id='id_search_tool_status'>
                      <option value="">전체</option>
                      <c:forEach items="${statusType}" var="type" varStatus="loop">
                        <option value="${type.COMM_CD}">${type.COMM_NM}</option>
                      </c:forEach>
                    </select>
                  </div>
                </div>
                <!-- item -->
                <div class="item">
                  <span class="item-tit">지급 일자</span>
                  <div class="calendar-picker">
                    <div class="input-group">
                      <label class="sr-only">날짜설정</label>
                      <input type="text" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly
                        id="id_search_grant_date">
                      <button class="calendar-picker-btn"></button>
                    </div>
                  </div>
                </div>
                <!-- item -->
                <div class="item">
                  <span class="item-tit">교체 일자</span>
                  <div class="calendar-picker">
                    <div class="input-group">
                      <label class="sr-only">날짜설정</label>
                      <input type="text" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly
                        id="id_search_renew_date">
                      <button class="calendar-picker-btn"></button>
                    </div>
                  </div>
                </div>
                <!-- item -->--%>
                <div class="item search">
                  <span class="item-tit">통합검색</span>
                  <div class="register-write">
                    <div class="input-group">
                      <input type="text" title="통합검색" placeholder="검색어를 입력해주세요" id="id_search_all">
                    </div>

                  </div>
                </div>
              </div>
              <div class="btn-wrap">
                <button id="SEARCH_RESET_BTN" class="refresh-btn"><span class="sr-only">새로고침</span></button>
                <button id="SEARCH_BTN" class="search-btn">검색</button>
              </div>

            </div>
            <!-- //fixed-search-form -->
            <!-- ================================= -->

            <div class="flexWrap both-end">
              <p class="heading3">
                <!-- <strong class="primary-color">'길동'</strong>에 대한 검색 결과는 총&nbsp; -->
                <strong class="primary-color" id="display-cnt"></strong>&nbsp;건 입니다.
              </p>
              <button class="btn3" modal-id="layer-popup1" id="REGISTER_BTN">
                <div>
                  <i class="las la-edit"></i><span class="name">등록</span>
                </div>

              </button>
            </div>

            <!-- equipment list -->
            <div class="equipment-list">
              <ul id="PPE_LIST">
              </ul>
            </div>
            <!-- //equipment list -->
          </div>
        </section>
      </div>
    </main>

    <div class="layer-popup" id="layer-popup1">
      <jsp:include page="../safety/safety_010101.jsp"></jsp:include>
    </div>


    <script src="${ctxPath}/script/safety/safety_0101.js?cachebuster=" + new Date().getTime()></script>
    <script src="${ctxPath}/script/sys/sys-common.js"></script>

    <script>
      $(document).ready(function () {
        safety_0101();
      });

  // function openPopup1(){
  //   document.getElementById("layer-popup1").style.display = 'flex';
  // }
    </script>