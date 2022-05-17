<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
<input type="hidden" id="CRUD" name="CRUD" value="${DATA.CRUD}">
<input type="hidden" id="HAZARDOUS_ID" name="HAZARDOUS_ID" value="${DATA.HAZARDOUS_ID}"></input>


  <main id="content" class="environ-page">
    <div class="container">
      <section class="hdSection">
        <!-- tit-wrap -->
        <div class="tit-wrap">
          <div class="tit-left">
            <h1 class="heading1">
              <c:if test="${PROCESS == 'INSERT'}">
                <spring:message code="res.res_0003.label.title.reg" />
              </c:if>
              <c:if test="${PROCESS == 'UPDATE'}">
                <spring:message code="res.res_0003.label.title.fix" />
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
              <h2 class="heading4"><spring:message code="res.res_0003.label.titleinfo" /></h2>
              <div class="base-table">
                <table>
                  <caption></caption>
                  <colgroup>
                    <col style="width: 11%;">
                    <col style="width: auto;">
                    <col style="width: 11%;">
                    <col style="width: auto;">
                    <col style="width: 11%;">
                    <col style="width: auto;">
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row"><spring:message code="res.res_0003.label.Project_name" /></th>
                      <td colspan="5">
                        <div class="select-group">
                          <input type="text" id="PROJECT_ID"  value="${DATA.PROJECT_ID}" hidden="true"/>
                          <select validation-check="required" id="PROJECT" validation-check="required" title="프로젝트 명">
                            <option value="" selected>프로젝트 이름을 선택합니다</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><spring:message code="res.res_0003.label.Date_of_issue" /></th>
                      <td colspan="5">
                        <div class="calendar-picker">
                          <div class="input-group">
                            <label class="sr-only">날짜설정</label>
                            <input validation-check="required" id="DATE_OF_ISSUE" value="${DATA.DATE_OF_ISSUE}" type="text" title="날짜설정" placeholder="YYYY-MM-DD" class="datepicker" readonly>
                            <button class="calendar-picker-btn"></button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><spring:message code="res.res_0003.label.manager" /></th>
                      <td colspan="5">
                        <div class="register-write w30p">
                          <!-- <div class="input-group">
                            <input  validation-check="required" id="INVESTOR" type="text" title="발주처" placeholder="발주처를 입력해주세요">
                          </div> -->
                          <div class="">
                            <!-- <label for="MANAGER">${DATA.MANAGER }</label>
                            <input type="text" placeholder="관리 책임자를 입력해주세요" id="MANAGER" validation-check="required" name="MANAGER" value="${DATA.MANAGER }" readonly="true" hidden="true"/> -->
                            <input type="text" id="id_emp_str_uid_key_manager" validation-check="required" name="MANAGER" value="${DATA.MANAGER}" hidden="true"/>
                          </div>
                            <jsp:include page="../common/select_emp_btn.jsp">
                              <jsp:param name="key" value="key_manager" />
                              <jsp:param name="CRUD" value="${DATA.CRUD}" />
                              <jsp:param name="strEmpId" value="${DATA.MANAGER}" />
                              <jsp:param name="isOne" value="true" />
                              <jsp:param name="title" value="담당자 설정" />
                            </jsp:include>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><spring:message code="res.res_0003.label.Hazardous_substances_type" /></th>
                      <td>
                        <div class="select-group w20p">
                          <select validation-check="required" id="HAZARDOUS_TYPE" title="유해위험물질종류">
                            <option value="">선택</option>
                            <c:forEach items="${hazardousCds}" var="type" varStatus="loop">
                              <c:if test="${DATA.HAZARDOUS_TYPE != null && DATA.HAZARDOUS_TYPE eq type.COMM_NM}">
                              <option value="${type.COMM_NM}" selected="selected">${type.COMM_NM}</option>
                            </c:if>
                            <c:if test="${DATA.HAZARDOUS_TYPE ne type.COMM_NM}">
                              <option value="${type.COMM_NM}">${type.COMM_NM}</option>
                            </c:if>
                          </c:forEach>
                          </select>
                        </div>
                      </td>
                      <th scope="row"><spring:message code="res.res_0003.label.Amount_of_hazardous_substances" /></th>
                      <td>
                        <div class="register-write">
                          <div class="input-group">
                            <input validation-check="required" id="AMOUNT_HAZARDOUS" value="${DATA.AMOUNT_HAZARDOUS}" type="number" title="유해위험물질량" placeholder='<spring:message code="res.res_0003.label.Amount_of_hazardous_substances" />'>
                          </div>
                        </div>
                        <!-- <em class="unit">L</em> -->
                      </td>
                      <th scope="row"><spring:message code="res.res_0003.label.storage_plan" /></th>
                      <td>
                        <div class="select-group w20p">
                          <select validation-check="required" id="STORAGE_PLAN" title="보관방안">
                            <option value="">선택</option>
                            <c:forEach items="${storageCds}" var="type" varStatus="loop">
                              <c:if test="${DATA.STORAGE_PLAN != null && DATA.STORAGE_PLAN eq type.COMM_NM}">
                              <option value="${type.COMM_NM}" selected="selected">${type.COMM_NM}</option>
                            </c:if>
                            <c:if test="${DATA.STORAGE_PLAN ne type.COMM_NM}">
                              <option value="${type.COMM_NM}">${type.COMM_NM}</option>
                            </c:if>
                          </c:forEach>
                          </select>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><spring:message code="res.res_0003.label.caution" /></th>
                      <td colspan="5">
                        <div class="register-write w100p">
                          <div class="input-group">
                            <textarea validation-check="required" id="CAUTION" title="주의 사항" placeholder="주의사항을 입력해주세요">${DATA.CAUTION}</textarea>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><spring:message code="res.res_0003.label.image" /></th>
                      <td colspan="5">
                        <div class="download-box-area custom" style="display: flex;">
                          <input id="id_input_imagePath" type="file" onchange='getFilenameImagePath(this)' name="doc_file" style="display: none;" accept="image/*"/>
                          <ul id="id_lst_img" >
                            <c:forEach items="${DATA.HAZARDOUS_FILES}" var="fileImg" varStatus="loop">
                              <c:if test="${fileImg.FILE_TYPE eq 'IMG'}">
                                <li class="img-box" style="width: 236px;">
                                  <img class="cls_img_${fileImg.FILE_ID}"  src="${ctxPath}/util/upload/imageView/${fileImg.FILE_ID}" alt="예시 이미지">
                                    <button class="remove-btn" tmpToolFileId="${fileImg.HAZARDOUS_FILE_ID}" tmpFileId="${fileImg.FILE_ID}" 
                                        tmpFileNm="${fileImg.FLE_NM}" tmpFilePath="${fileImg.FLE_PATH}" onclick="removeImgFunc(this)"></button>
                                </li>
                              </c:if>
                          </c:forEach>
                          </ul>
                          <ul>
                            <li id="id_imagePath" class="add-box">
                              <button class="add-btn" onclick="addImgFunc()"></button>
                            </li>
                          </ul>
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
                <i class="las la-edit"></i><span class="name"><spring:message code="button.save" /></span>
              </button>
              <c:if test = "${PROCESS == 'UPDATE'}">
                  <button  id="DELETE_BTN" class="btn-style5">
                    <i class="las la-trash-alt"></i><span class="name"><spring:message code="button.delete" /></span>
                  </button>
                </c:if>       
              <button class="btn-style3" onclick="goList()">
                <i class="las la-reply"></i><span class="name"><spring:message code="button.cancel" /></span>
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
        <button class="btn-style3">
          <i class=" las la-reply"></i><span class="name">취소</span>
        </button>
        <button class="btn-style1">
          <i class="las la-save"></i><span class="name">저장</span>
        </button>
      </div>

      <button type="button" class="popup-close-btn">
        <i class="xi-close"></i>
      </button>
    </div>
  </div>
  <!-- //layer-popup -->

<script src="${ctxPath}/script/res/res_000301.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>	
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script type="text/javascript">
	var ctx = '${CTX}';
	$(document).ready(function() { 
		res_000301();
    getEmpInfos('key_manager', '${DATA.MANAGER}');
    var selector = 'id_lst_img';
    checkfilelist();
    var myElement = document.getElementById(selector);
    if(window.addEventListener) {
      // Normal browsers
      myElement.addEventListener('DOMSubtreeModified', checkfilelist, false);
    } else
      if(window.attachEvent) {
          // IE
          myElement.attachEvent('DOMSubtreeModified', checkfilelist);
      }

    function checkfilelist() {
      if ( $('#'+selector).children().length > 0 ) {
        $('#'+selector).css("padding-right","10px");
      }else{
        $('#'+selector).css("padding-right","");
      }
    }
	});
</script>



