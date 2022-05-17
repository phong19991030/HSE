<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<input type="hidden" id="EMP_NO" name="EMP_NO" value="${DATA.EMP_NO}">
<main id="content" class="health-page">
	<div class="container">
		<section class="hdSection">
			<!-- tit-wrap -->
			<div class="tit-wrap">
				<div class="tit-left">
					<h1 class="heading1"><spring:message code="hea.hea_000101.label.health_1" /></h1>
				</div>
			</div>
			<!-- //tit-wrap -->
		</section>
		<section class="contSection">
			<div class="content clearfix">

				<!-- left area -->
				<div class="left-area">

					<!-- approval-view -->
					<article class="approval-view">
						<div class="flexWrap">
							<h2 class="heading4"><spring:message code="hea.hea_000101.label.health_2" /></h2>
							<!-- <button class="btn2 refresh-btn">
                    <span class="name">결재라인 재지정</span>
                  </button> -->
						</div>

						<ul class="approval-view--line">
							<!-- D : li class="approval" -> "결재 승인" style is applied. -->
							<li class="approval">
								<p class="state">결재승인</p>
								<div class="box">
									<div class="info-wrap">
										<span class="info"> <em class="team">윈디텍(주)</em> <em
											class="name">장길동</em> <em class="position">과장</em>
										</span>
										<!-- D : Badge style by approval status.
                          					1. approval-badge1 기안
                          					2. approval-badge2 검토
                          					3. approval-badge3 결재
                        				-->
										<small class="approval-badge1">기안</small>
									</div>
									<!-- D : li class="approval" -> "approval-date" The markup should be added. -->
									<p class="approval-date">
										<em>2021.06.01</em> <em>09:16</em>
									</p>
								</div>
							</li>
							<li>
								<p class="state">결재대기</p>
								<div class="box">
									<div class="info-wrap">
										<span class="info"> <em class="team">윈디텍(주)</em> <em
											class="name">곽길동</em> <em class="position">팀장</em>
										</span>
										<!-- D : Badge style by approval status.
                          					1. approval-badge1 기안
                          					2. approval-badge2 검토
                          					3. approval-badge3 결재
                       	 				-->
										<small class="approval-badge2">검토</small>
									</div>
									<!-- D : li class="approval" -> "approval-date" The markup should be added. -->
									<!-- <p class="approval-date">
                        				<em>2021.06.01</em>
                        				<em>09:16</em>
                      				</p> -->
								</div>
							</li>
							<li>
								<p class="state">결재대기</p>
								<div class="box">
									<div class="info-wrap">
										<span class="info"> <em class="team">운영사 A</em> <em
											class="name">채길동</em> <em class="position">부장</em>
										</span>
										<!-- D : Badge style by approval status.
                          					1. approval-badge1 기안
                          					2. approval-badge2 검토
                          					3. approval-badge3 결재
                        				-->
										<small class="approval-badge3">결재</small>
									</div>
									<!-- D : li class="approval" -> "approval-date" The markup should be added. -->
									<!-- <p class="approval-date">
                        				<em>2021.06.01</em>
                        				<em>09:16</em>
                      				</p> -->
								</div>
							</li>
						</ul>
					</article>

					<article class="view-form">
						<h2 class="heading4"><spring:message code="hea.hea_0001.title.health_2" /></h2>

						<div class="base-table">
							<table>
								<caption></caption>
								<colgroup>
									<col style="width: 11%;">
									<col style="width: 39%;">
									<col style="width: 11%;">
									<col style="width: 39%;">
								</colgroup>
								<tbody>
									<tr>
										<th scope="row"><spring:message code="hea.label.empName"/></th>
										<td>${DATA.EMP_NAME }</td>
										<th scope="row"><spring:message code="hea.label.duty"/></th>
										<td>${DATA.COMM_NM}</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="hea.label.area"/></th>
										<td>${DATA.AREA_CD }</td>
										<th scope="row"><spring:message code="hea.label.expr"/> </th>
										<td>${DATA.EXPR } </td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="hea.label.mainExpr"/></th>
										<!-- <td colspan="3"><p>${DATA.MAIN_EXPR}</p></td> -->
                    <td colspan="3">
                      <!-- <div class="register-write w100p">
                      <div class="input-group">
                        <textarea title="주요 자격" placeholder="주요 자격을 입력해주세요" id="MAIN_EXPR"
                        validation-check="required"></textarea>
                      </div>
                      </div> -->
                      <!-- 2022-04-21 add (@smlee) -->
                      <div class="staff-info-area">
                        <div class="base-table">
                          <table>
                            <colgroup>
                              <col style="width: 4%" />
                              <col style="width: 29%" />
                              <col style="width: 34%" />
                              <col style="width: 33%" />
                            </colgroup>
                            <thead>
                              <tr>
                                <th scope="col">No</th>
                                <th scope="col">프로젝트명</th>
                                <th scope="col">수행기간</th>
                                <th scope="col">주요 수행 사항</th>
                              </tr>
                            </thead>
                            <tbody id="EXP_ROWS">
                              <!-- <tr>
                                <td>1</td>
                                <td>content</td>
                                <td>startDate<span class="hyphen">~</span>Enđate</td>
                                <td>detail</td>
                              </tr> -->
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="hea.label.mainDegree"/></th>
										<!-- <td colspan="3"><p>${DATA.MAIN_DEGREE}</p></td> -->
                    <td colspan="3">
                      <!-- <div class="register-write w100p">
                      <div class="input-group">
                        <textarea title="주요 자격" placeholder="주요 자격을 입력해주세요" id="MAIN_DEGREE"
                        validation-check="required"></textarea>
                      </div>
                      </div> -->
                      <!-- 2022-04-21 add (@smlee) -->
                      <div class="staff-info-area">
                        <div class="base-table">
                          <table>
                            <colgroup>
                              <col style="width: 4%" />
                              <col style="width: 29%" />
                              <col style="width: 34%" />
                              <col style="width: 33%" />
                            </colgroup>
                            <thead>
                              <tr>
                                <th scope="col">No</th>
                                <th scope="col">자격명</th>
                                <th scope="col">취득 일자</th>
                                <th scope="col">갱신 일자</th>
                              </tr>
                            </thead>
                            <tbody id="DEGREE_ROWS">
                              <!-- <tr>
                                <td>1</td>
                                <td>content</td>
                                <td>startDate<span class="hyphen">~</span>Enđate</td>
                                <td>detail</td>
                              </tr> -->
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                    
									</tr>
									<tr>
										<th scope="row"><spring:message code="hea.label.safeCourseCert"/></th>
										<td>${DATA.SAFE_COURSE_CERT }</td>
										<th scope="row"><spring:message code="com.com_0101.label.company"/></th>
										<td>${DATA.COMPANY_NAME }</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="hea.label.certDate"/></th>
										<td>${DATA.CERT_DATE }</td>
										<th scope="row"><spring:message code="hea.label.renewalCertDate"/></th>
										<td>${DATA.RENEWAL_CERT_DATE }</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="hea.label.pprStatus"/>
										</th>
										<td colspan="3">
                      						${DATA.PPE_STATUS_NAME}
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
						<button class="btn-style2" id="MODIFY_BTN">
							<i class="las la-eraser"></i><span class="name"><spring:message code="button.modify" /></span>
						</button>
						<button class="btn-style5" id="DELETE_BTN">
							<i class="las la-trash-alt"></i><span class="name"><spring:message code="button.delete" /></span>
						</button>
						<button class="btn-style4" id="PRINT_BTN">
							<i class="las la-print"></i><span class="name"><spring:message code="button.print" /></span>
						</button>
					</div>
				</div>
				<!-- // right area -->
			</div>
		</section>
	</div>
</main>


<script type="text/javascript">
	
	$(document).ready(function() {
		$('button#MODIFY_BTN').css('cursor', 'pointer').click(modifyEmp);
		$('button#DELETE_BTN').css('cursor', 'pointer').click(doDelete);
		$('button#PRINT_BTN').css('cursor', 'pointer').click(doPrint);
    careerFunction('${DATA.MAIN_DEGREE}', 'degree');
    careerFunction('${DATA.MAIN_EXPR}', 'exp');
	});
	// back button click
	function goBack() {
		$(location).attr('href', CTX + '/hea/hea_0001/list');
	}

	function modifyEmp() {
		var url = CTX + '/hea/hea_0001/modifyForm?EMP_NO=' + $('#EMP_NO').val();
		window.location.href = url;
	}

	function doDelete() {
		var EMP_NO = $('#EMP_NO').val();
		if (confirm("<spring:message code='message.confirmDelete'/>\n<spring:message code='message.confirmDeleteBack'/>")) {
			$.ajax({
				url : CTX + "/hea/hea_0001/detailForm/delete.ajax",
				type : 'post',
				data : {
					'EMP_NO' : EMP_NO
				},
				cache : false,
				success : function(data, textStatus, jqXHR) {
					alert('<spring:message code="message.deletedSuccess"/>');
					goBack();
				},
				error : function() {
					alert('<spring:message code="message.deletedFailed"/>. \nThis account already use at Request Quote menu.');
					return false;
				}
			});
		}
	}

  function careerFunction(stringArray, type) {
    var selector = "";
    if(type=='exp') selector = "tbody#EXP_ROWS";
    if(type=='degree') selector = "tbody#DEGREE_ROWS";
    var array = JSON.parse(stringArray);
    array.forEach((element,index) => {
      var eleTmp = "";
      if(type=='exp'){
    	  eleTmp = ""
    		  +'	<td>'+element.startDate+'<span class="hyphen">~</span>'+element.endDate+'</td>'
    	      +'	<td>'+element.detail+'</td>';
      }
      if(type=='degree'){
    	  eleTmp = ""
    		  +'	<td>'+element.startDate+'</td>'
    	      +'	<td>'+element.endDate+'</td>';
      }
      
      var RN = index+1;
      var content = '<tr>'
      +'	<td>'+RN+'</td>'
      +'	<td>'+element.content+'</td>'
      + eleTmp
      +'</tr>';
      $(selector).append(content);
    });
  }
	
	function doPrint(){
		
	}
</script>
