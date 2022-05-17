<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage=""%>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style> </style>

<!-- insert, update -->
<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
<input type="hidden" id="SAFE_MGT_ORG_ID" name="SAFE_MGT_ORG_ID" value="${DATA.SAFE_MGT_ORG_ID}">
<main id="content" class="safety-page">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
          <h1 class="heading1">
            <c:if test="${PROCESS == 'INSERT'}">
              <spring:message code="sft.sft_0600.label.title.reg" />
            </c:if>
            <c:if test="${PROCESS == 'UPDATE'}">
              <spring:message code="sft.sft_0600.label.title.modify" />
            </c:if>
          </h1>
        </div>
      </div>
      <!-- //tit-wrap -->
    </section>
    <section class="contSection">
      <div class="content clearfix">

        <!-- left area -->
        <div class="left-area">
          <article class="registration-form">
            <h2 class="heading4">결재라인</h2>
            <div class="approval-select-area">
              <button modal-id="layer-popup1">결재라인을 지정해주세요</button>
            </div>
          </article>

          <article class="registration-form">
            <h2 class="heading4">
              <spring:message code="sft.sft_0600.label.info" />
            </h2>

            <div class="base-table custom-table3">
              <table>
                <caption></caption>
                <colgroup>
                  <col style="width: 11%;">
                  <col style="width: auto;">
                  <col style="width: 11%;">
                  <col style="width: auto;">
                </colgroup>
                <tbody>
                  <!-- 2022-04-25 add (@smlee) -->
                  <tr>
                    <th scope="row">문서번호</th>
                    <td colspan="3">
                      <div class="register-write">
                        <div class="input-group">
                          <input type="text" title="문서번호 입력" placeholder="문서 번호를 입력해주세요" id="DOC_NO" value="${DATA.DOC_NO}">
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0600.label.Project_name" />
                    </th>
                    <td class="blank"></td>
                    <td colspan="2">
                      <!-- 2022-04-25 add (@smlee) -->
                     <!--  <div class="register-write w70p">
                        <div class="input-group">
                          <input type="text" title="프로젝트 명" placeholder="프로젝트 명을 입력해주세요">
                        </div>
                      </div> -->
                      
                      <div class="select-group">
                        <input type="text" id="PROJECT_ID" value="${DATA.PROJECT_ID}" hidden="true" />
                        <select validation-check="required" id="PROJECT" validation-check="required" title="프로젝트 명">
                          <option value="" selected>프로젝트 이름을 선택합니다</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0600.label.Invester" />
                    </th>
                    <td class="blank"></td>
                    <td colspan="2">
                      <div class="register-write w30p">
                        <div class="input-group">
                          <input  validation-check="required" id="INVESTOR" type="text" title="발주처" placeholder="발주처를 입력해주세요" value="${DATA.INVESTOR}">
                        </div>
                        <%-- <div class="">
                          <input type="text" id="id_emp_str_uid_key_investor" name="INVESTOR" value="${DATA.INVESTOR}" hidden="true" />
                        </div>
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_investor" />
                          <jsp:param name="CRUD" value="${DATA.CRUD}" />
                          <jsp:param name="strEmpId" value="${DATA.INVESTOR}" />
                          <jsp:param name="isOne" value="true" />
                        </jsp:include> --%>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" rowspan="5">
                      <spring:message code="sft.sft_0600.label.Organization_chart_1" />
                    </th>
                    <td class="blank bm-none"></td>
                    <th scope="row">
                      <spring:message code="sft.sft_0600.label.Chief_Safety_Officer" />
                    </th>
                    <td colspan="3">
                      <div class="flexWrap">
                        <!-- 2022-04-25 add (@smlee) -->
                        <!-- <button class="btn1" style="margin: 0 7px 0 0;">설정</button> -->
                        <%-- <div class="register-write">
                          <div class="input-group">
                            <input value="${DATA.CSO}" id="id_emp_str_uid_key_CSO" type="text" title="성명" placeholder="성명을 입력하세요" hidden="true"/>
                          </div>
                        </div> --%>
                        
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_CSO" />
                          <jsp:param name="isOne" value="true" />
                          <jsp:param name="title" value="안전 총괄 책임자 설정" />
                        </jsp:include>
                        <div class="register-write w100p" style="margin-left: 7px">
                          <div class="input-group">
                            <input value="${DATA.CSO_JOB}" id="CSO_JOB" type="text" title="업무분장내용" placeholder="업무분장 내용을 입력해주세요">
                            <input value="${DATA.CSO}" id="id_emp_str_uid_key_CSO" type="text" title="성명" placeholder="성명을 입력하세요" hidden="true"/>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="blank bm-none"></td>
                    <th scope="row">
                      <spring:message code="sft.sft_0600.label.field_agent" />
                    </th>
                    <td colspan="3">
                      <div class="flexWrap">
                        <!-- 2022-04-25 add (@smlee) -->
                        <!-- <button class="btn1" style="margin: 0 7px 0 0;">설정</button> -->
                        <!-- <div class="register-write">
                          <div class="input-group">
                            <input value="${DATA.FIELD_AGENT}" validation-check="required" id="FIELD_AGENT" type="text"
                              title="성명" placeholder="성명을 입력하세요">
                          </div>
                        </div> -->
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_FIELD_AGENT" />
                          <jsp:param name="isOne" value="true" />
                          <jsp:param name="title" value="현장 대리인 설정" />
                        </jsp:include>
                        <div class="register-write w100p" style="margin-left: 7px">
                          <div class="input-group">
                            <input value="${DATA.FIELD_AGENT_JOB}" id="FIELD_AGENT_JOB"
                              type="text" title="업무분장내용" placeholder="업무분장 내용을 입력해주세요">
                            <input value="${DATA.FIELD_AGENT}" id="id_emp_str_uid_key_FIELD_AGENT" type="text" hidden="true"/>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="blank bm-none"></td>
                    <th scope="row">
                      <spring:message code="sft.sft_0600.label.safety_manager" />
                    </th>
                    <td colspan="3">
                      <div class="flexWrap">
                        <!-- 2022-04-25 add (@smlee) -->
                        <!-- <button class="btn1" style="margin: 0 7px 0 0;">설정</button> -->
                        <!-- <div class="register-write">
                          <div class="input-group">
                            <input value="${DATA.SAFETY_MANAGER}" validation-check="required" id="SAFETY_MANAGER"
                              type="text" title="성명" placeholder="성명을 입력하세요">
                          </div>
                        </div> -->
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_SAFETY_MANAGER" />
                          <jsp:param name="isOne" value="true" />
                          <jsp:param name="title" value="안전 관리자 설정" />
                        </jsp:include>
                        <div class="register-write w100p" style="margin-left: 7px">
                          <div class="input-group">
                            <input value="${DATA.SAFETY_MANAGER_JOB}" 
                              id="SAFETY_MANAGER_JOB" type="text" title="업무분장내용" placeholder="업무분장 내용을 입력해주세요">
                              <input value="${DATA.SAFETY_MANAGER}" id="id_emp_str_uid_key_SAFETY_MANAGER" type="text" hidden="true"/>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="blank bm-none"></td>
                    <th scope="row">
                      <spring:message code="sft.sft_0600.label.material_manager" />
                    </th>
                    <td colspan="3">
                      <div class="flexWrap">
                        <!-- 2022-04-25 add (@smlee) -->
                        <!-- <button class="btn1" style="margin: 0 7px 0 0;">설정</button> -->
                        <!-- <div class="register-write">
                          <div class="input-group">
                            <input value="${DATA.MATERIAL_MANAGER}" validation-check="required" id="MATERIAL_MANAGER"
                              type="text" title="성명" placeholder="성명을 입력하세요">
                          </div>
                        </div> -->
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_MATERIAL_MANAGER" />
                          <jsp:param name="isOne" value="true" />
                          <jsp:param name="title" value="자재 관리 책임자 설정" />
                        </jsp:include>
                        <div class="register-write w100p" style="margin-left: 7px">
                          <div class="input-group">
                            <input value="${DATA.MATERIAL_MANAGER_JOB}" 
                              id="MATERIAL_MANAGER_JOB" type="text" title="업무분장내용" placeholder="업무분장 내용을 입력해주세요">
                              <input value="${DATA.MATERIAL_MANAGER}" id="id_emp_str_uid_key_MATERIAL_MANAGER" type="text" hidden="true"/>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="blank"></td>
                    <th scope="row">
                      <spring:message code="sft.sft_0600.label.Field_Management_Officer" />
                    </th>
                    <td colspan="3">
                      <div class="flexWrap">
                        <!-- 2022-04-25 add (@smlee) -->
                        <!-- <button class="btn1" style="margin: 0 7px 0 0;">설정</button> -->
                        <!-- <div class="register-write">
                          <div class="input-group">
                            <input value="${DATA.SITE_MANAGER}" validation-check="required" id="SITE_MANAGER"
                              type="text" title="성명" placeholder="성명을 입력하세요">
                          </div>
                        </div> -->
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_SITE_MANAGER" />
                          <jsp:param name="isOne" value="true" />
                          <jsp:param name="title" value="현장 관리 책임자 설정" />
                        </jsp:include>
                        <div class="register-write w100p" style="margin-left: 7px">
                          <div class="input-group">
                            <input value="${DATA.SITE_MANAGER_JOB}" id="SITE_MANAGER_JOB"
                              type="text" title="업무분장내용" placeholder="업무분장 내용을 입력해주세요">
                              <input value="${DATA.SITE_MANAGER}" id="id_emp_str_uid_key_SITE_MANAGER" type="text" hidden="true"/>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>

              </table>
            </div>
          </article>
        </div>
        <!-- // left area -->
        <!-- right area -->
        <div class="right-area">
          <div class="right-btn-type">
            <button id="SAVE_BTN" class="btn-style1">
              <i class="las la-edit"></i><span class="name">
                <spring:message code="button.save" /></span>
            </button>
            <button class="btn-style3" onclick="goList()">
              <i class="las la-reply"></i><span class="name">
                <spring:message code="button.cancel" /></span>
            </button>
          </div>
        </div>
        <!-- // right area -->
      </div>
    </section>
  </div>
</main>

<!-- layer-popup -->
<div class="layer-popup" id="layer-popup1">
  <div class="popup-cont approval-cont">

    <h2 class="heading4">결재라인 지정</h2>

    <section class="approval-section">
      <!-- left-area -->
      <div class="left-area">
        <!-- fixed-search-form2 -->
        <div class="fixed-search-form2">
          <div class="search-bar">
            <input type="text" placeholder="이름">
            <button class="search-btn">검색</button>
          </div>

          <!-- D : "search-panel", Please refer to it if necessary. -->
          <!-- <div class="search-panel">
                      <p>홍길동</p>
                      <p>홍길동</p>
                      <p>홍길동</p>
                   </div> 
            -->
        </div>
        <!-- //fixed-search-form2 -->

        <h3 class="heading5">직원 목록</h3>
        <div class="base-table">
          <table>
            <caption></caption>
            <colgroup>
              <col style="width: auto;">
              <col style="width: auto;">
              <col style="width: auto;">
              <col style="width: auto;">
            </colgroup>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">회사명</th>
                <th scope="col">성명</th>
                <th scope="col">직급</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>(주)에이투엠</td>
                <td>홍길동</td>
                <td>대표</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>(주)에이투엠</td>
                <td>홍길동</td>
                <td>선임연구원</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>(주)에이투엠</td>
                <td>홍길동</td>
                <td>엔지니어</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>운영사 A</td>
                <td>이길동</td>
                <td>연구원</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>운영사 A</td>
                <td>이길동</td>
                <td>연구원</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>운영사 A</td>
                <td>이길동</td>
                <td>연구원</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>윈디텍(주)</td>
                <td>성길동</td>
                <td>선임연구원</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>윈디텍(주)</td>
                <td>장길동</td>
                <td>엔지니어</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>윈디텍(주)</td>
                <td>장길동</td>
                <td>엔지니어</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>윈디텍(주)</td>
                <td>장길동</td>
                <td>엔지니어</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>윈디텍(주)</td>
                <td>장길동</td>
                <td>엔지니어</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>윈디텍(주)</td>
                <td>장길동</td>
                <td>엔지니어</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- right-area -->
      <div class="right-area">

        <!-- D : The selected person from the left list will be added. -->
        <ul class="selected-approval-custom">
          <li>
            <div class="custom info">
              <span class="team">운영사 A</span>
              <span class="name">박정권<em class="position">대표</em></span>
              <button class="remove-btn"></button>
            </div>
            <div class="custom select-group">
              <select title="결재">
                <option>전체</option>
                <option>기안</option>
                <option>검토</option>
                <option>결재</option>
                <option>전결</option>
              </select>
            </div>
            <div class="custom">
              <button class="drag-btn">
                <i class="las la-expand-arrows-alt"></i>
              </button>
            </div>
          </li>
          <li>
            <div class="custom info">
              <span class="team">운영사 A</span>
              <span class="name">박정권<em class="position">이사</em></span>
              <button class="remove-btn"></button>
            </div>
            <div class="custom select-group">
              <select title="결재">
                <option>전체</option>
                <option>기안</option>
                <option>검토</option>
                <option>결재</option>
                <option>전결</option>
              </select>
            </div>
            <div class="custom">
              <button class="drag-btn">
                <i class="las la-expand-arrows-alt"></i>
              </button>
            </div>
          </li>
          <li>
            <div class="custom info">
              <span class="team">운영사 A</span>
              <span class="name">박정권<em class="position">팀장</em></span>
              <button class="remove-btn"></button>
            </div>
            <div class="custom select-group">
              <select title="결재">
                <option>전체</option>
                <option>기안</option>
                <option>검토</option>
                <option>결재</option>
                <option>전결</option>
              </select>
            </div>
            <div class="custom">
              <button class="drag-btn">
                <i class="las la-expand-arrows-alt"></i>
              </button>
            </div>
          </li>
          <li>
            <div class="custom info">
              <span class="team">운영사 A</span>
              <span class="name">박정권<em class="position">선임연구원</em></span>
              <button class="remove-btn"></button>
            </div>
            <div class="custom select-group">
              <select title="결재">
                <option>전체</option>
                <option>기안</option>
                <option>검토</option>
                <option>결재</option>
                <option>전결</option>
              </select>
            </div>
            <div class="custom">
              <button class="drag-btn">
                <i class="las la-expand-arrows-alt"></i>
              </button>
            </div>
          </li>
          <li>
            <div class="custom info">
              <span class="team">윈디텍(주)</span>
              <span class="name">박정권<em class="position">선임연구원</em></span>
              <button class="remove-btn"></button>
            </div>
            <div class="custom select-group">
              <select title="결재">
                <option>전체</option>
                <option>기안</option>
                <option>검토</option>
                <option>결재</option>
                <option>전결</option>
              </select>
            </div>
            <div class="custom">
              <button class="drag-btn">
                <i class="las la-expand-arrows-alt"></i>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <div class="foot-btn-area">
      <button class="btn-style3">취소</button>
      <button class="btn-style1">저장</button>
    </div>

    <button type="button" class="popup-close-btn">
      <i class="xi-close"></i>
    </button>
  </div>
</div>
<!-- //layer-popup -->

<!-- 스크립트 -->
<script src="${ctxPath}/script/safety/safety_0601.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
  var param = '${DATA}';

  $(document).ready(function () {
    safety_0601();
    getEmpInfos('key_investor', '${DATA.INVESTOR}');
    getEmpInfos('key_CSO', '${DATA.CSO}');
    getEmpInfos('key_FIELD_AGENT', '${DATA.FIELD_AGENT}');
    getEmpInfos('key_SAFETY_MANAGER', '${DATA.SAFETY_MANAGER}');
    getEmpInfos('key_MATERIAL_MANAGER', '${DATA.MATERIAL_MANAGER}');
    getEmpInfos('key_SITE_MANAGER', '${DATA.SITE_MANAGER}');
  });
</script>