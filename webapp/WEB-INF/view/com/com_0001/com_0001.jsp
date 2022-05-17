<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<main id="content" class="general-page real-time-history">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
          <h1 class="heading1">
            <spring:message code="com.com_0001.label.title" />
          </h1>
        </div>
      </div>
      <!-- //tit-wrap -->
    </section>
    <section class="contSection unborder">
      <div class="content clearfix">

        <div class="update-lst-area">
          <div>
            <div class="tit-area" id="id_div_cnt_payment_new">
              <p class="heading4">
                <spring:message code="com.com_0001.label.title.new" />
              </p>
              <!-- <span class="badge-custom7">+<em id="id_cnt_payment_new">3</em></span> -->
            </div>
            <div class="update-lst-wrap">
              <ul class="update-lst" id="id_report_payment_new">

                <!-- D : Please indicate when there is no update (0425 @smlee)-->
                <!-- <li class="blank-li">
                  <div class="blank">
                    <div class="txt-area">
                      <span class="icon"></span>
                      <span class="txt">업데이트된 내용이 없습니다.</span>
                    </div>
                  </div>
                </li> -->
                <!-- //D : Please indicate when there is no update -->
              </ul>
            </div>
          </div>
          <!-- ------------------------------------------------------------------- -->
          <div>
            <div class="tit-area" id="id_div_cnt_payment_review">
              <p class="heading4">
                <spring:message code="com.com_0001.label.title.review" />
              </p>
              <!-- <span class="badge-custom7">+<em id="id_cnt_payment_review">5</em></span> -->
            </div>
            <div class="update-lst-wrap">
              <ul class="update-lst" id="id_report_payment_review">
                <!-- D : Please indicate when there is no update (0425 @smlee)-->
                <!-- <li class="blank-li">
                  <div class="blank">
                    <div class="txt-area">
                      <span class="icon"></span>
                      <span class="txt">업데이트된 내용이 없습니다.</span>
                    </div>
                  </div>
                </li> -->
                <!-- //D : Please indicate when there is no update -->
              </ul>
            </div>
          </div>
          <!-- ------------------------------------------------------------------- -->
          <div>
            <div class="tit-area" id="id_div_cnt_payment_approved">
              <p class="heading4">
                <spring:message code="com.com_0001.label.title.approved" />
              </p>
              <!-- <span class="badge-custom7">+<em id="id_cnt_payment_approved">4</em></span> -->
            </div>
            <div class="update-lst-wrap">
              <ul class="update-lst" id="id_report_payment_approved">
                <!-- D : Please indicate when there is no update (0425 @smlee)-->
                <!-- <li class="blank-li">
                  <div class="blank">
                    <div class="txt-area">
                      <span class="icon"></span>
                      <span class="txt">업데이트된 내용이 없습니다.</span>
                    </div>
                  </div>
                </li> -->
                <!-- //D : Please indicate when there is no update -->
              </ul>
            </div>

          </div>
        </div>

        <div id="id_div_cnt_new_stt_payment">
          <p class="heading4">
            <spring:message code="com.com_0001.label.sub.title" />
          </p>
          <span class="badge-custom6"><i class="las la-pen-nib"></i><em class="num"
              id="id_cnt_all_payment">331</em></span>
          <!-- <span class="badge-custom7">+<em class="num" id="id_cnt_new_stt_payment">12</em></span> -->
        </div>

        <strong class="update-txt">
          대기 중인 결재 건
          <span class="sub-txt1">총 <em id="id_cnt_all_payment">331</em>건</span>
          중 오늘 새로운 결재 건이
          <span class="sub-txt2"><em id="id_cnt_new_stt_payment">12</em>건</span>
          이 있습니다.
        </strong>

        <article class="view-form">
          <div class="base-table center-table custom-table1">
            <table>
              <caption></caption>
              <colgroup>
                <col style="width: auto;">
                <col style="width: auto;">
                <col style="width: auto;">
                <col style="width: auto;">
                <col style="width: auto;">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">1차 메뉴</th>
                  <th scope="col" class="txt-left">2차 메뉴</th>
                  <th scope="col">작성</th>
                  <th scope="col">검토</th>
                  <th scope="col">최종 승인</th>
                </tr>
              </thead>
              <tbody id="id_tb_menu_payment_stt">
                <tr>
                  <th scope="row" rowspan="4">일반 관리</th>
                  <td class="txt-left">사업장 정보 관리</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td class="txt-left">터빈정보관리</td>
                  <td>-</td>
                  <td>
                    <!-- D : new-mark -->
                    <span class="new-mark">
                      <span class="f-bolder black">1건</span>
                      <span class="new-tag">
                        <em class="circle">N</em>
                        <em class="num-wrap">
                          <i>+</i>
                          <em class="num">1</em>
                        </em>
                      </span>
                    </span>
                  </td>
                  <td>1건</td>
                </tr>
                <tr>
                  <td class="txt-left">보건안전환경 경영방침</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td class="txt-left">보건안전환경 법규관리</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th scope="row" rowspan="2">보건 관리</th>
                  <td class="txt-left">직원 정보 관리</td>
                  <td>
                    <!-- D : new-mark -->
                    <span class="new-mark">
                      <span class="f-bolder black">2건</span>
                      <span class="new-tag">
                        <em class="circle">N</em>
                        <em class="num-wrap">
                          <i>+</i>
                          <em class="num">2</em>
                        </em>
                      </span>
                    </span>
                  </td>
                  <td>10건</td>
                  <td>20건</td>
                </tr>
                <tr>
                  <td class="txt-left">직원 건강 관리</td>
                  <td>5건</td>
                  <td>20건</td>
                  <td>20건</td>
                </tr>
                <tr>
                  <th scope="row" rowspan="8">안전 관리</th>
                  <td class="txt-left">작업 공구 및 장비 관리</td>
                  <td>-</td>
                  <td>15건</td>
                  <td>15건</td>
                </tr>
                <tr>
                  <td class="txt-left">개인 보호 장비</td>
                  <td>2건</td>
                  <td>10건</td>
                  <td>
                    <!-- D : new-mark -->
                    <span class="new-mark">
                      <span class="f-bolder black">20건</span>
                      <span class="new-tag">
                        <em class="circle">N</em>
                        <em class="num-wrap">
                          <i>+</i>
                          <em class="num">2</em>
                        </em>
                      </span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="txt-left">작업 전 안전 교육</td>
                  <td>-</td>
                  <td>15건</td>
                  <td>15건</td>
                </tr>
                <tr>
                  <td class="txt-left">사고 조사 관리</td>
                  <td>-</td>
                  <td>15건</td>
                  <td>15건</td>
                </tr>
                <tr>
                  <td class="txt-left">비상 대응 계획 관리</td>
                  <td>-</td>
                  <td>15건</td>
                  <td>
                    <!-- D : new-mark -->
                    <span class="new-mark">
                      <span class="f-bolder black">20건</span>
                      <span class="new-tag">
                        <em class="circle">N</em>
                        <em class="num-wrap">
                          <i>+</i>
                          <em class="num">2</em>
                        </em>
                      </span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="txt-left">법정의무교육 관리</td>
                  <td>
                    <!-- D : new-mark -->
                    <span class="new-mark">
                      <span class="f-bolder black">1건</span>
                      <span class="new-tag">
                        <em class="circle">N</em>
                        <em class="num-wrap">
                          <i>+</i>
                          <em class="num">2</em>
                        </em>
                      </span>
                    </span>
                  </td>
                  <td>15건</td>
                  <td>15건</td>
                </tr>
                <tr>
                  <td class="txt-left">안전관리 조직도</td>
                  <td>-</td>
                  <td>15건</td>
                  <td>15건</td>
                </tr>
                <tr>
                  <td class="txt-left">안전점검 및 순찰 관리</td>
                  <td>-</td>
                  <td>
                    <!-- D : new-mark -->
                    <span class="new-mark">
                      <span class="f-bolder black">15건</span>
                      <span class="new-tag">
                        <em class="circle">N</em>
                        <em class="num-wrap">
                          <i>+</i>
                          <em class="num">3</em>
                        </em>
                      </span>
                    </span>
                  </td>
                  <td>15건</td>
                </tr>
                <tr>
                  <th scope="row" rowspan="3">작업 관리</th>
                  <td class="txt-left">위험성평가 관리</td>
                  <td>-</td>
                  <td>15건</td>
                  <td>15건</td>
                </tr>
                <tr>
                  <td class="txt-left">위험성평가 DB 관리</td>
                  <td>-</td>
                  <td>15건</td>
                  <td>15건</td>
                </tr>
                <tr>
                  <td class="txt-left">작업허가 관리</td>
                  <td>-</td>
                  <td>15건</td>
                  <td>15건</td>
                </tr>
                <tr>
                  <th scope="row" rowspan="5">환경 관리</th>
                  <td class="txt-left">소방 화재관리</td>
                  <td>-</td>
                  <td>15건</td>
                  <td>15건</td>
                </tr>
                <tr>
                  <td class="txt-left">폐기물 관리</td>
                  <td>-</td>
                  <td>
                    <!-- D : new-mark -->
                    <span class="new-mark">
                      <span class="f-bolder black">4건</span>
                      <span class="new-tag">
                        <em class="circle">N</em>
                        <em class="num-wrap">
                          <i>+</i>
                          <em class="num">1</em>
                        </em>
                      </span>
                    </span>
                  </td>
                  <td>15건</td>
                </tr>
                <tr>
                  <td class="txt-left">유해위험물질운영 관리</td>
                  <td>-</td>
                  <td>15건</td>
                  <td>15건</td>
                </tr>
                <tr>
                  <td class="txt-left">해상 환경 관리</td>
                  <td>-</td>
                  <td>15건</td>
                  <td>15건</td>
                </tr>
                <tr>
                  <td class="txt-left">기타 환경 관리</td>
                  <td>-</td>
                  <td>15건</td>
                  <td>15건</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

      </div>
    </section>
  </div>
</main>

<!-- 스크립트 -->
<!-- reload file js -->


<script src="${ctxPath}/script/com/com_0001.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>

<script>
  $(document).ready(function () {
    com0001();
  });
</script>