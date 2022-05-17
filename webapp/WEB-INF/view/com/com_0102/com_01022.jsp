<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%request.setCharacterEncoding("UTF-8");%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<input type="hidden" id="PROJECT_ID" name="PROJECT_ID"
	value="${DATA.PROJECT_ID}"></input>

<main id="content" class="general-page">
	<div class="container">
		<section class="hdSection">
			<!-- tit-wrap -->
			<div class="tit-wrap">
				<div class="tit-left">
					<h1 class="heading1"><spring:message code="com.com_01021.label.project.detail" /></h1>
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
							<h2 class="heading4">결재라인</h2>
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
											class="name">장길동</em> <em class="position">엔지니어</em>
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
											class="name">곽길동</em> <em class="position">선임연구원</em>
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
											class="name">김길동</em> <em class="position">팀장</em>
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
											class="name">이길동</em> <em class="position">대표</em>
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
						<h2 class="heading4">사업장 정보</h2>

						<div class="base-table">
							<table>
								<caption></caption>
								<colgroup>
									<col style="width: 11%;">
									<col style="width: 89%;">
								</colgroup>
								<tbody>
									<tr>
										<th scope="row"><spring:message code="com.com_0102.label.companyName" /></th>
										<td id="COMPANY_NAME"></td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="com.com_0102.label.projectName" /></th>
										<td id="PROJECT_NAME"></td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="com.com_0102.label.period" /></th>
										<td id="PROJECT_PERIOD"></td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="com.com_0102.label.manager" /></th>
										<td id="MANAGER"></td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="com.com_0102.label.totalManpower" /></th>
										<td id="TOTAL_MANPOWER"></td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="com.com_0102.label.status" /></th>
										<td id="STATUS"></td>
									</tr>
									<tr>
										<th scope="row">HSE 관리</th>
										<td id="id_SPS_PLAN">
<!-- 											<span class="badge-custom4">작업공구 및 장비 관리</span> 
											<span class="badge-custom4">개인보호 장비</span> 
											<span class="badge-custom4">법정의무교육</span> 
											<span class="badge-custom4">안전관리조직도</span> 
											<span class="badge-custom4">위험성평가관리</span>
 -->										</td>
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
	var param = '${DATA}';

	$(document).ready(function() {
		com_01022();
	});

	function com_01022() {
		// 데이터 조회
		var data = _sys.mariaDB.getData(CTX
				+ '/com/com_0102/detailForm/getDetailInfo.ajax', {
			PROJECT_ID : $('input#PROJECT_ID').val(),
		});
		
		// 데이터 없을 경우 return 
		if (!data)
			return;
		// 작성자와 사용자의 UID가 다를 경우 삭제, 수정 불가
		// 수정 버튼 클릭 이벤트
		$('button#MODIFY_BTN').click(modifyProject);

		// 삭제 버튼 클릭 이벤트 
		$('button#DELETE_BTN').click(deleteProject);
		
		$('input#PROJECT_ID').val(data.PROJECT_ID);
		$('#PROJECT_NAME').text(data.PROJECT_NAME);
		$('#COMPANY_NAME').text(data.COMPANY_NAME);
		$('#START_TIME_PROJECT').text(data.START_TIME_PROJECT);
		$('#END_TIME_PROJECT').text(data.END_TIME_PROJECT);
		$('#PROJECT_PERIOD').text(data.START_TIME_PROJECT + ' ~ ' + data.END_TIME_PROJECT);
		$('#MANAGER').text(data.MANAGER_NAME);
		$('#TOTAL_MANPOWER').text(data.TOTAL_MANPOWER);
		$('#STATUS').text(data.STATUS_MN);
		
		var SFT_PLAN_NAME = data.SFT_PLAN_NAME;
		if(SFT_PLAN_NAME && SFT_PLAN_NAME != ""){
			var arr = SFT_PLAN_NAME.split("!@#");
			for (var i = 0; i < arr.length; i++) {
				var strNm = arr[i];
				var tmpSpan = '<span class="badge-custom4">'+strNm+'</span> '
				$("#id_SPS_PLAN").append(tmpSpan);
			}
		}
	}
	
	function deleteProject(){
		// 삭제 여부 컨펌 
		if (!confirm(_MESSAGE.common.deleteConfirm))
			return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX + '/com/com_0102/detailForm/delete.ajax', {PROJECT_ID : $('input#PROJECT_ID').val()});
		console.log(result);
		// 삭제 성공
		if (result.IS_DELETE) {
			alert('<spring:message code="message.deletedSuccess"/>');
			window.location = CTX + '/com/com_0102/list';
		}
		// Exception 발생
		else if (result.EXCEPTION) {
			if (result.EXCEPTION === 'SQLIntegrityConstraintViolationException')
				alert(_MESSAGE.common.SQLIntegrityConstraintViolationException);
		}
		// 삭제 실패
		else {
			alert('<spring:message code="message.deletedFailed"/>');
		}
	};
	
	function modifyProject(){
		window.location = CTX + '/com/com_0102/modifyForm?PROJECT_ID=' + $('input#PROJECT_ID').val();
	}
	
  function goList() { 
  window.location = CTX + '/com/com_0102/list';
}

</script>

<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>
