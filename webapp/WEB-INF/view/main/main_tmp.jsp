<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript" src="${ctxPath}/script/chart/highcharts.js"></script>   
<%-- <script type="text/javascript" src="${ctxPath}/script/chart/highstock.js"></script> --%>
<script type="text/javascript" src="${ctxPath}/script/chart/exporting.js"></script>
<script type="text/javascript" src="${ctxPath}/script/chart/chartDefault.js"></script>

<script type="text/javascript">



$(document).ready(function(){ 
	
	
	function doLUMPDialog(){
		var obj ={};
		obj['YYMM'] =$('#YYMM').val() 
		$.ajax({ 
			url:CTX+'/pam/pam_0207/02/form.dialog' , 
			type: 'post',
// 			dataType  : 'text', 
			data: obj,
			cache:false, 
			success: function(data, textStatus, jqXHR) { 
				if(data != 'false'){
					try{
						
						$('#commonDialog').html(data);
						$('#commonDialog').dialog({'width':300, 'height':600})
					}catch(e){
						$('#loading').hide();
					}
					
				}
			},complete: function(){
				return true;
				
			},error : function(){
				return false;
			}
		});
	}
// 	doLUMPDialog()
	reloadImg()
});

//사원 이미지 로딩
var reloadImg =  function() {
	var imgUrl = CTX+'/files/photo/hrm/'+'${SESS_USER.SESS_EMP_NO}'+'?'+  (new Date()).getTime(); 
	//이미지 파일이 존재하지 않는 경우 noimage 표시 
	if(!imgExistsChk(imgUrl)){ 
		imgUrl = '/files/photo/hrm/noimage.jpg';
	}
	
	$('#EMP_IMG_VIEW').attr('src', imgUrl);
	
};


function imgExistsChk(imgUrl){
	
	var http = new XMLHttpRequest();
	http.open('HEAD', imgUrl, false);
	http.send();
	return http.status != 404 && http.status != 403 ;
}

</script>
<div class="main_wrap">
	<div class="main_leftWrap">
		<div class="leftTop">
			<div class="member-info">
				<div class="photo_wrap">
					<img id="EMP_IMG_VIEW" src="${imgPath}/main/noimage.jpg" alt="회원사진" /> 
				</div>
				<div style="    display: inline-block;">
					<div class="member-infotxt">
						<dl>
							<dt>${SESS_USER.SESS_USER_NM}</dt>
							<dd>${SESS_USER.SESS_DEPT_NM}</dd>
						</dl>
						 
					 </div>
					 <div class="holiyday">
							<ul>
<!-- 								<li> -->
<!-- 									<label>사용기간 : </label> -->
<%-- 									<span class="last">  <span pattern="date">${vnct.DEG_FRM_DT }</span></span>~ --%>
<%-- 									<span class="use1"> <span pattern="date">${vnct.DEG_TO_DT }</span></span> --%>
<!-- 		                         </li> -->
	<!-- 	                         <li> -->
	<%-- 	                             <div class="new"> 휴가일 : <span> ${vnct.TOT_VCTN_CNT }</span></div> --%>
	<%-- 	                             <div class="use2"> 사용일 : <span> ${vnct.TOT_USED }</span></div> --%>
	<!-- 	                         </li> -->
<!-- 									<li>  -->
<!-- 										연차정보 -->
<!-- 									</li> -->
		                         <li class="allholiyday">
<%-- 		                         <span class="last" style="font-size: 13px;" pattern="date"> ${vnct.DEG_FRM_DT }</span>~ --%>
<%-- 								 <span class="last" style="font-size: 13px;" pattern="date">${vnct.DEG_TO_DT }</span> --%>
								 <span class="custom" style="font-size: 15px;" >연차일수 : 
<!-- 								 <span>연차일수 : </span> -->
			                         <span class="ttx" ><strong title="사용가능일수">
			                         ${vnct.REMAIN_VCTN_CNT }
			                         </strong> 
			                         /${vnct.TOT_VCTN_CNT }
			                         </span>
		                         </span>
		                         </li>
		                     </ul>
			          </div>
		          </div>
			</div>
			<div class="info-btn">
				<ul>
					<li class="trip"><a href="${ctxPath}/btm/btm_0301/list" title="출장미복명">출장미복명<span class="">${trav}</span></a></li>
	             	<li class="education"><a href="${ctxPath}/hrm/hrm_0405/list" title="교육결과보고">교육결과보고<span class="">${edu}</span></a></li>
	             	<li class="card"><a href="${ctxPath}/acm/acm_0101/list" title="법인카드미발의">법인카드미발의<span class="">${acm_cnt01.CNT}</span></a></li>
	             	<li class="stipend "><a href="${ctxPath}/pam/pam_0402/list?" title="급여명세" >급여명세</a></li> 
				</ul> 
			</div>
		</div>
		<div class="leftBody">
			<div class="education_wrap">
				<h4>교육이수현황 -  <span class="custom" style="font-size: 15px;" >이수시간 : 
			                         	<a href = "${ctxPath}/hrm/hrm_0407/list">
					                         <span class="ttx" >
						                         <strong title="이수시간">
						                         ${edu_cnt.TM } 
						                         </strong> 
						                         /${edu_cnt.TTM }
					                         </span> 
			                         	</a>
		                         </span></h4>
				<div id="chart1">
				</div>
			</div>
			<div class="time_other_wrap">
                       
		        <c:choose>
			        <c:when test= "${SESS_USER.SESS_USER_ID eq SESS_USER.SESS_HEAD_EMP_NO}" >
			        	<h4>시간외근무대상자
                		 </h4>
				          <div class="TabbedPanelsContent TabbedPanelsContentVisible vacation_list_wrap" >
				        	  <ul class="vacation_list">
							  	<c:forEach items="${main_list_ovte}" var="item" varStatus="loop">
									<li>
										<span class="badge team ">
										${item.RQST_DEPT_NM}</span> <strong>${item.RQST_EMP_NM}</strong> <span class="date">${item.SMRY}</span>
									</li>
							  	</c:forEach>
							  </ul> 
				        	
				        </div>
			        </c:when>
			        <c:otherwise>
			        	<h4>시간외근무현황 - <span class="custom" style="font-size: 15px;" >근무시간 : 
									 <a href = "${ctxPath}/hrm/hrm_0701/list">
				                         <span class="ttx" ><strong title="근무시간">
				                         ${fn:substring(ovtm_cnt.TM,0,2)} 시간 
				                         ${fn:substring(ovtm_cnt.TM,2,4)} 분
				                         </strong> 
				                         
				                         </span> 
			                         </a>
		                         </span>
		                         
		                         
                		</h4>
						<div id="chart2"> 
						
						</div>
			        </c:otherwise>
		        </c:choose>
		                         
			</div>
		
		
		</div>
	</div>
	<div class="main_rightWrap">
		<div class="rightTop">
			 <div class="topleft" style="    position: relative;">
				 <h4 class="tit01">${SESS_USER.SESS_DEPT_NM } 예산현황</h4>
			 	<div id="chart3" class="chart_wrap" >
				 	
				  
				 </div> 
                
                <div class="box_wrap">   
	                <ul class="box_num" style="position:relative">
	                    <li style="margin: 0 0 3px 7px;    line-height: 17px;white-space: nowrap;" > 
							<strong class="tt"><label>총 예 산 : </label></strong><span fpattern="currency" class="num4" style="overflow: none;">
							${bgm_cnt.BDG_AMT }</span>                    
	                    </li>
	                    <li style="margin: 0 0 1px 7px; line-height: 17px;">
							<strong><label>원인행위 : </label></strong><span fpattern="currency" class="num4">${bgm_cnt.EXP_AMT }</span>                    
	                    </li> 
	                    <li style="margin: 0 0 1px 7px;    line-height: 17px;">
							<strong><label>집행금액 : </label></strong><span fpattern="currency" class="num3">${bgm_cnt.SLP_AMT }</span>        
	                    </li> 
	                         
	                    <li style="margin: 0 0 1px 7px;    line-height: 17px;">
							<strong><label>원인잔액 : </label></strong><span fpattern="currency" class="num2">${bgm_cnt.EXP_AMT - bgm_cnt.SLP_AMT }</span>        
	                    </li> 
	                         
	                    <li style="margin: 0 0 1px 7px;    line-height: 17px;">
							<strong><label>예산잔액 : </label></strong><span fpattern="currency" class="num1">${bgm_cnt.BDG_AMT-bgm_cnt.EXP_AMT }</span>        
	                    </li> 
	                         
	 
	    	             
	                </ul>
					<ul >
						 <li class="boxbtn boxbtn1"><a href="${ctxPath}/bgm/bgm_0302/list?" title="예산사용현황" >예산사용현황</a></li>
	    	             <li class="boxbtn boxbtn2"><a href="${ctxPath}/bgm/bgm_0301/list" title="예실대비표" >예실대비표</a></li>
					</ul> 
					
	            </div>
            </div>
            <div class="topright">
				 <h4 class="tit02">${SESS_USER.SESS_DEPT_NM } 근무현황</h4>
				 <div class="TabbedPanelsContent TabbedPanelsContentVisible vacation_list_wrap" >
							  <ul class="vacation_list">
							  	<c:forEach items="${main_list_absn}" var="item" varStatus="loop">
									<li title = "${item.SMRY }" >
										<span class="badge team ${item.ATND_CD eq '170-137-020' ? 'yellow':(item.ATND_CD eq '170-137-010' ? 'green':(item.ATND_CD eq '170-152-010' ? 'blue':(fn:substring(item.ATND_CD,0,7) eq '170-805'? 'orange':'orange') ) ) }">
										${item.ATND_NM}</span> <strong>${item.EMP_NM}</strong> <span class="date">${fn:length(item.SMRY) > 22 ? fn:substring(item.SMRY,0,22): item.SMRY} ${fn:length(item.SMRY) > 22 ? '...':''}</span>
									</li>  
							  	</c:forEach> 
							  </ul> 
<!-- 
							  <div class="detail_view"><a href="#" title="휴가자 더보기">더보기 <i class="icon-angle-right"></i></a><span class="btn_more"><a href="#" title="vacation more"><i class="icon-plus-sign-alt"></i></a></span></div> 
-->
				 </div>
            </div>
		</div>
		<div class="rightMid">
			  <div class="midleft ft_left">
                <h4 class="tit04">회계</h4>
                <div class="account_wrap">
	                <ul class="account">
	                    <li><a href="${ctxPath}/acm/acm_0101/list" title="법인카드지급신청" >법인카드지급신청</a></li>
	                    <li><a href="${ctxPath}/acm/acm_0102/list" title="일반지급신청" >일반지급신청</a></li>
	                    <li><a href="${ctxPath}/acm/acm_0103/list" title="일반지급신청(복수)" >일반지급신청(복수)</a></li>
	                    <li><a href="${ctxPath}/acm/acm_0104/list" title="기타/사업소득지급신청 " >기타/사업소득지급신청 </a></li>
	                	<li><a href="${ctxPath}/acm/acm_0105/list" title="수입신청서" >수입신청서</a></li>
	                  
	                </ul>
	                <ul class="account">
	                    <li><a href="${ctxPath}/acm/acm_0107/list" title="가지급금요구" >가지급금요구</a></li>
	                	<li><a href="${ctxPath}/acm/acm_0108/list" title="가지급금정산" >가지급금정산</a></li>
	                    <li><a href="${ctxPath}/acm/acm_0109/list" title="대체신청서" >대체신청서</a></li>
	                    <li><a href="${ctxPath}/bgm/bgm_0201/list" title="예산변경신청" >예산변경신청</a></li>
	                </ul>
                </div>
            </div>
            <div class="midright">
            	<h4 class="tit05">인사</h4>
            	<div class="people_wrap">
	                <ul class="people">
	                    <li><a href="${ctxPath}/hrm/hrm_0402/list" title="교육신청" >교육신청</a></li>
	                    <li><a href="${ctxPath}/hrm/hrm_0502/list" title="휴가신청" >휴가신청</a></li>
	                    <li><a href="${ctxPath}/btm/btm_0201/list?page=01" title="국내출장신청" >국내출장신청</a></li>
	                    <li><a href="${ctxPath}/btm/btm_0201/list?page=02" title="시내출장신청" >시내출장신청</a></li>
	                    
	                </ul>
	                <ul class="people">
	                	<li><a href="${ctxPath}/hrm/hrm_0704/list" title="외출/조퇴신청" >외출/조퇴신청</a></li>
	                    <li><a href="${ctxPath}/hrm/hrm_0701/list" title="시간외근무신청" >시간외근무신청</a></li>
	                    <li><a href="${ctxPath}/btm/btm_0201/list?page=03" title="국외출장신청" >국외출장신청</a></li>
	                    <li><a href="${ctxPath}/btm/btm_0301/list?page=03" title="출장정산신청" >출장정산신청</a></li> 
	                </ul>
                </div>
            </div>
		</div>
		<div class="rightBot">
<!-- 			  <div class="botleft"> -->
<!--             	<h4>정보조회</h4> -->
<!--                 <ul> -->
<%--                     <li><a href="${ctxPath}/bgm/bgm_0301/list" title="예실대비표" >예실대비표</a></li> --%>
<%--                     <li><a href="${ctxPath}/hrm/hrm_0407/list" title="교육이수현황" >교육이수현황</a></li> --%>
<%--                     <li><a href="${ctxPath}/pam/pam_0402/list?" title="급여명세" >급여명세</a></li> --%>
<%--                     <li><a href="${ctxPath}" title="원천징수영수증" >원천징수영수증</a></li>  --%>
                    
<!--                 </ul>  -->
<!--             </div> -->
            <!-- 구매 -->
            <div class="botleft">
            	<h4 class="tit07">구매/계약/자산</h4>
            	<div class="buying_wrap"> 
	                <ul class="buying"> 
	                    <li><a href="${ctxPath}/bym/bym_0101/list" title="계약의뢰" >계약의뢰</a></li>
	                    <li><a href="${ctxPath}/bym/bym_0110/list" title="계약검수" >계약검수</a></li>
	                    <li><a href="${ctxPath}/bym/bym_0111/list" title="구매검수" >계약지급신청</a></li> 
	                    <li><a href="${ctxPath}/bym/bym_0112/list" title="구매검수" >계약미지급신청</a></li> 
	                 </ul>
	                 <ul class="buying"> 
	                    <li><a href="${ctxPath}/bym/bym_0201/list" title="구매요청" >구매요청</a></li>
	                    <li><a href="${ctxPath}/bym/bym_0203/list" title="구매검수" >구매검수</a></li> 
	                    <li><a href="${ctxPath}/bym/bym_0204/list" title="구매검수" >구매지급신청</a></li> 
	                </ul>
                </div>
            </div>
            
            <!-- 예약/등록 -->
            <div class="botright" style="vertical-align: top"> 
            	<h4 class="tit08">예약/등록/조회</h4>
            	<div class="booking_wrap">
                <ul class="booking"> 
                    <li><a href="${ctxPath}/fcm/fcm_0102/list" title="차량사용예약" >차량사용예약</a></li>
                    <li><a href="${ctxPath}/fcm/fcm_0103/list" title="차량사용결과" >차량사용결과</a></li> 
                    <li> <a href="${ctxPath}/pam/pam_0303/list" title="연봉계약승인">연봉계약승인</a> </li>
                </ul>
                <ul class="booking">
                    <li><a href="${ctxPath}/btm/btm_0401/list" title="항공마일리지신고" >항공마일리지신고</a></li>
                    <li><a href="${ctxPath}/hrm/hrm_0206/list" title="증명서발급" >증명서발급</a></li>
                    <li><a href="${ctxPath}/pay/pay_0504/list" title="원천징수영수증" >원천징수영수증</a></li> 
                </ul>
                </div>
            </div>
            
		</div>
		
            
	</div>
      
</div>

 
<%--
<div class="main_wrap">
	<!-- 회원정보 -->
	<div class="topwrap">
		<div class="topleft">
			<div class="member-info">
				<div class="photo_wrap">
					<img id="EMP_IMG_VIEW" src="${imgPath}/main/photo.jpg" alt="회원사진" />
				</div>
				<div class="member-infotxt">
					<dl>
						<dt>${SESS_USER.SESS_USER_NM}</dt>
						<dd>${SESS_USER.SESS_DEPT_NM}</dd>
					</dl>
				</div>
			</div>
			<div class="info-btn">
				<ul>
					  <li class="trip"><a href="${ctxPath}/btm/btm_0301/list" title="출장미복명">출장미복명</a><span class="">${trav}</span></li>
               <li class="education"><a href="${ctxPath}/hrm/hrm_0405/list" title="교육결과보고">교육결과보고</a><span class="">${edu}</span></li>
               <li class="card"><a href="${ctxPath}/acm/acm_0101/list" title="법인카드미발의">법인카드미발의</a><span class="">${card}</span></li>
               <li class="stipend"><a href="${ctxPath}/pam/pam_0303/list" title="연봉계약승인">연봉계약승인</a></li>
				</ul>
			</div>
		</div>
		<!-- 올해의 휴가 -->
		<div class="topright">
			<h4>올해의 휴가</h4>
			<div class="holiyday">
				<ul>
					<li>
						<span class="last"> 휴가시작일 : <span fpattern="date">${vnct.DEG_FRM_DT }</span></span>
						<span class="use1"> 휴가종료일 : <span fpattern="date">${vnct.DEG_TO_DT }</span></span>
                         </li>
                         <li>
                             <div class="new"> 휴가일 : <span> ${vnct.TOT_VCTN_CNT }</span></div>
                             <div class="use2"> 사용일 : <span> ${vnct.TOT_USED }</span></div>
                         </li>
                         <li class="allholiyday">
                            <p> <strong>${SESS_USER.SESS_USER_NM}</strong>님의 총 사용가능한 휴가일수 : <span><strong>${vnct.REMAIN_VCTN_CNT }</strong>/${vnct.TOT_VCTN_CNT }</span></p>
                         </li>
                    </ul>
                    
                </div>
            </div>
        </div>
        <div class="midwrap">
            <!-- 인사 -->
            <div class="midleft">
                <h4>인사</h4>
                <ul>
                    <li><a href="${ctxPath}/hrm/hrm_0402/list" title="교육신청" >교육신청</a></li>
                    <li><a href="${ctxPath}/hrm/hrm_0502/list" title="휴가신청" >휴가신청</a></li>
                    <li><a href="${ctxPath}/btm/btm_0201/list?page=01" title="국내출장신청" >국내출장신청</a></li>
                    <li><a href="${ctxPath}/btm/btm_0201/list?page=02" title="시내출장신청" >시내출장신청</a></li>
                    <li><a href="${ctxPath}/btm/btm_0201/list?page=03" title="국외출장신청" >국외출장신청</a></li>
                    <li><a href="${ctxPath}/btm/btm_0301/list?page=03" title="출장정산신청" >출장정산신청</a></li> 
                    
                </ul>
                
                <ul>
                	<li><a href="${ctxPath}/hrm/hrm_0704/list" title="외출/조퇴신청" >외출/조퇴신청</a></li>
                    <li><a href="${ctxPath}/hrm/hrm_0701/list" title="시간외근무신청" >시간외근무신청</a></li>
                </ul>
                
                
            </div>
            <!-- 회계/예산 -->
            <div class="midright">
            	<h4>회계/예산</h4>
                <ul>
                    <li><a href="${ctxPath}/acm/acm_0101/list" title="법인카드지급신청" >법인카드지급신청</a></li>
                    <li><a href="${ctxPath}/acm/acm_0102/list" title="일반지급신청" >일반지급신청</a></li>
                    <li><a href="${ctxPath}/acm/acm_0103/list" title="일반지급신청(복수)" >일반지급신청(복수)</a></li>
                    <li><a href="${ctxPath}/acm/acm_0104/list" title="기타/사업소득지급신청 " >기타/사업소득지급신청 </a></li>
                	<li><a href="${ctxPath}/acm/acm_0105/list" title="수입신청서" >수입신청서</a></li>
                    <li><a href="${ctxPath}/acm/acm_0107/list" title="가지급금요구" >가지급금요구</a></li>
                  
                </ul>
                <ul>
                	<li><a href="${ctxPath}/acm/acm_0108/list" title="가지급금정산" >가지급금정산</a></li>
                    <li><a href="${ctxPath}/acm/acm_0109/list" title="대체신청서" >대체신청서</a></li>
                    <li><a href="${ctxPath}/bgm/bgm_0201/list" title="예산변경신청" >예산변경신청</a></li>
                </ul>
            </div>
        </div>
        <div class="bottomwrap">
            <!-- 정보조회 -->
            <div class="botleft">
            	<h4>정보조회</h4>
                <ul>
                    <li><a href="${ctxPath}/bgm/bgm_0301/list" title="예실대비표" >예실대비표</a></li>
                    <li><a href="${ctxPath}/hrm/hrm_0407/list" title="교육이수현황" >교육이수현황</a></li>
                    <li><a href="${ctxPath}/pam/pam_0402/list?" title="급여명세" >급여명세</a></li>
                    <li><a href="${ctxPath}" title="원천징수영수증" >원천징수영수증</a></li> 
                    
                </ul> 
            </div>
            <!-- 구매 -->
            <div class="botcenter">
            	<h4>구매</h4>
                <ul>
                    <li><a href="${ctxPath}/bym/bym_0101/list" title="계약의뢰" >계약의뢰</a></li>
                    <li><a href="${ctxPath}/bym/bym_0201/list" title="구매요청" >구매요청</a></li>
                    <li><a href="${ctxPath}/bym/bym_0110/list" title="계약검수" >계약검수</a></li>
                    <li><a href="${ctxPath}/bym/bym_0203/list" title="구매검수" >구매검수</a></li> 
                    <li><a href="${ctxPath}/bym/bym_0111/list" title="구매검수" >계약지급신청</a></li> 
                 </ul>
                 <ul>
                    <li><a href="${ctxPath}/bym/bym_0112/list" title="구매검수" >계약미지급신청</a></li> 
                    <li><a href="${ctxPath}/bym/bym_0204/list" title="구매검수" >구매지급신청</a></li> 
                </ul>
            </div>
            <!-- 예약/등록 -->
            <div class="botright">
            	<h4>예약/등록</h4>
                <ul>
                    <li><a href="${ctxPath}/hrm/hrm_0206/list" title="증명서발급" >증명서발급</a></li>
                    <li><a href="${ctxPath}/btm/btm_0401/list" title="항공마일리지신고" >항공마일리지신고</a></li>
                    <li><a href="${ctxPath}/fcm/fcm_0102/list" title="차량사용예약" >차량사용예약</a></li>
                    <li><a href="${ctxPath}/fcm/fcm_0103/list" title="차량사용결과" >차량사용결과</a></li> 
                    
                </ul>
            </div>
        </div>
              
</div>
     --%>
<div id="commonDialog" class="mis_dialog">
</div>


<script type="text/javascript">
var series = [];
var chart1;

var chart_options1 = {
		chart: {renderTo: 'chart1',height:230
		},
		 exporting: { enabled: false },
        xAxis: {
            categories: [],
            labels: {
                rotation: -80,  
                align: 'right',
                style: {
                    fontSize: '12px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },            
            crosshair: false
        },
        yAxis: [{ 	// Primary yAxis
            title: {
                text: ''
            },
            labels:{format: '{value}'}
        }],
        legend: {
            align: 'center',
            //x: -100,
            verticalAlign: 'top',
            //y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },    
        plotOptions: {
        	column: {
        		pointPadding: 0,		// 막대간의 간격(0.1, 0.2,..)
                borderWidth: 1,
                groupPadding:0.2
        	}
        },
	    tooltip: { 
            crosshairs: true,
            shared: true,
            valueSuffix: '',
            formatter: null,
            headerFormat: '<span align="center" style="font-size:12px;color:#AA2299"><b>{point.key}</b></span><table>',
            pointFormat: '<tr><td align="right" style="color:{series.color};padding:0"><b>{series.name} : </b></td>' +
                '<td align="right" style="padding:0">{point.y:,.0f}</td></tr>',
            footerFormat: '</table>',
            useHTML: true
        }, 
        series: series
};

function getDataChart() {
	var stdYY = $('#search\\.STD_YY').val();
	var yyCnt = $('#search\\.YY_CNT').val();
	var deptCd = $('#search\\.RQST_DEPT_CD').val();
	//교육이수
	$.ajax({
		url: CTX + "/main/01/getDataChart.ajax", 
		type:"POST",
// 		data:"search.STD_YY="+stdYY+"&search.YY_CNT="+yyCnt+"&search.RQST_DEPT_CD="+deptCd,
		success:function(data){
			doDrawChart( data);
		},complete: function(){

		},error : function(){
			alert(getMessage('SELECT.FAIL').MESSAGE);
			return false;
		}
	});
	//시간외 근무 
// 	$.ajax({
// 		url: CTX + "/main/02/getDataChart.ajax", 
// 		type:"POST",
// 		success:function(data){
// // 			doDrawChart(Number(stdYY), Number(yyCnt), data);
// 		},complete: function(){

// 		},error : function(){
// 			alert(getMessage('SELECT.FAIL').MESSAGE);
// 			return false;
// 		}
// 	});
	 
}

//차트 그리기
function doDrawChart(data) {
	var category = [];	
	var datas0_1 = []; // 1목표
	var datas0_2 = []; // 1실적
	var datas1_1 = []; // 2목표
	var datas1_2 = []; // 2실적
	var datas2_1 = []; // 3목표
	var datas2_2 = []; // 3실적 

	
	// 년별 목표&실적 항목 생성
	/* for(var i = 0; i < yyCnt; i++){
		series.push({name: (stdYY+Number(i))+"년(목표)", type: 'column'});
		series.push({name: (stdYY+Number(i))+"년(실적)", type: 'column'});
	} */
	
		series.push({name: "교육이수실적", type: 'column'});
	
	chart1 = new Highcharts.Chart(chart_options1);
	$.each(data, function(index, value) {
		
		category.push(value.TP_NM);
		datas0_1.push(value.SCORE)
	});
		
	/* for(var i = 0; i < (yyCnt*2); i++){ 
		chart1.series[i].setData(datas1, false);
	} */
	
	chart1.series[0].setData(datas0_1, false);
	chart1.xAxis[0].setCategories(category, false);
	chart1.redraw();
	chart1.hideLoading();
}


$(document).ready(function(){
	getDataChart();
	chart2()
	chart3() 
	
	resizeMain()
	
// 	$('.search_btn .minus').trigger('click')

// 	doDrawChart();   
});
function resizeMain(){
	initResultForm();
	var width = $('.rightTop').width();
	var $div1 = $('.topleft')
	var $div2 = $('.topright') 
	var $div3 = $('.midleft')
	var $div4 = $('.midright')
	var $div5 = $('.botleft')
	var $div6 = $('.botright')  
	$div1.width(width/2)
	$div2.width(width/2-2)
	$div3.width(width/2)
	$div4.width(width/2-2)
	$div5.width(width/2) 
	$div6.width(width/2-2)
	chart3()
}
 
var chart3 = function(){
	
  
	var bgm = {'BDG_AMT':'${bgm_cnt.BDG_AMT }' , 'EXP_AMT' : '${bgm_cnt.EXP_AMT }',
			'SLP_AMT' : '${bgm_cnt.SLP_AMT }' , 'RMN_AMT' : '${bgm_cnt.EXP_AMT - bgm_cnt.SLP_AMT }'  
				}
	 $('#chart3').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false, 
	            type: 'pie',
	             height: 180,
	             width:200,
	            spacing:[0,0,0,0],
	            margin: [0, 0, 70, 0] 
	            	 
	        },
	        exporting: { enabled: false },
// 	        title: {
// 	            text: 'Browser market shares January, 2015 to May, 2015' 
// 	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        legend:{y:-20} ,
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: ' {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    },
	                	distance:-30
	                }
	            }
	        }, 
// 	        plotOptions: {
//                 pie: {
//                     allowPointSelect: true,
//                     cursor: 'pointer',
//                     dataLabels: {
//                         enabled: false
//                     },
//                     showInLegend: true
//                 }
//             },
	        series: 
// 	        	[{
// 	            name: "Brands",
// 	            colorByPoint: true,
// 	            data: [{
// 	                name: "집행금액",
// 	                y: 60
	                
// 	            }, { 
// 	                name: "원인잔액",
// 	                y: 10  
	                
// 	            }, {
// 	                name: "예산잔액",
// 	                y:  30
// 	                ,sliced: true,
// 	                selected: true
// 	            }]
// 	        }]
[{
    name: "Brands",
    colorByPoint: true,
    data: [{
        name: "집행금액",
        y: bgm.SLP_AMT /bgm.BDG_AMT * 100
        
    }, {
        name: "원인잔액",
        y: (bgm.EXP_AMT - bgm.SLP_AMT)   /bgm.BDG_AMT* 100
        
    }, {
        name: "예산잔액",
        y:  (bgm.BDG_AMT -bgm.EXP_AMT) /bgm.BDG_AMT* 100
        ,sliced: true,
        selected: true
    }]
}]
	    });
	
}
var chart2 = function(){
	
	var data = JSON.parse('${main_chart_ovte}');
	
	var list = [];
	
	$.each(data,function(i,val){
		var timeList = [] ;
		$.each(data,function(j,obj){
			if(i >j){
				timeList.push(0);
			}else{
				var hh = val.TM.substring(0,2)
				var mm =val.TM.substring(2,4); 
				
				
				mm = Math.ceil(mm *100/60*1000000);
				
            	
				timeList.push(eval(new Number(hh+ '.'+mm).toString()));
			}
		})
		
// 		timeList[i] = (eval(val.TIME)); 
		list.push({
            name:val.WEEK_OF_MONTH+'주차',
            data: timeList,
            stack: 'male'
        })
		
	}) ;

	$('#chart2').highcharts({

        chart: {
            type: 'column',
            height: 250
        },
        exporting: { enabled: false },
//         title: {
//             text: '시간외근무 '
//         },

        xAxis: {
            categories: ['1주차 ', '2주차', '3주차', '4주차', '5주차']
        }, 

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: '시간'
            }
        },

        tooltip: {
            formatter: function () {
            	var tm = this.y.toString();
            	var hh = tm.split('.')[0];
				var mm = eval (0+'.'+tm.split('.')[1])*100;
				mm = Math.ceil( mm*60/100);
				tm = hh + '시간'+ mm + '분'
            	
				
				var ttm =  (Math.floor(this.point.stackTotal*100)/100).toString();
            	var thh = ttm.split('.')[0];
				var tmm = eval (0+'.'+ttm.split('.')[1])*100;
				
				tmm = Math.ceil( tmm*60/100);
				ttm = thh + '시간'+ tmm + '분' 
            	 
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + tm + '<br/>' +
                    'Total: ' + ttm;
            }
        },

        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },

        series:list
    });
}


</script>