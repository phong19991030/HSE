<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<div> 
	안녕하십니까. 인재개발팀 이예종입니다.
	
	10월 30일(금) 협조문으로 시행예정인 미사용 연차 사용계획 제출 요청 관련, 협조문 붙임파일을 부서별로 메일 송부드립니다.
	
	첨부파일에 11월~12월까지 주차별로 연차사용 계획 일수를 기재하시면 되겠습니다.
	
	부서별로 선임팀이 취합하시어 11월 3일(화) 18시까지 협조문으로 회신하여 주시기 바랍니다.(수신자 : 인재개발팀장)
	
	감사합니다.
	
	
	<h4>연차알림</h4>   
		<ul class="box">
			<li class="box_line">
				<div class="box_group"> 	
					<span class="box_tit" style="width: 60px">상위코드</span>
					<span class="box_txt" > 
						<a2m:combo id="search.UP_COMM_CD" type="load" daoName="common.code.Code.getUpCdList" 
										   defaultText=""  params=""  dataCodeField="DATA" dataLabelField="LABEL" script="popupDrawgrid1()"/>
					</span>
				</div>			
				<div class="box_group" style="width: 500px;"> 
					<span class="box_tit" style="width: 60px">코드명</span>
					<span class="box_txt" > 
						<input type="text" id="search.COMM_NM" name="search.COMM_NM" style="width: 150px;" value="" > 
					</span>
				</div>																
			</li> 
		</ul>
	
	
<!-- 	<div id="popupGrid1" style="width:100%;"></div> -->
</div>