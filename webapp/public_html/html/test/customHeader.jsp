<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<% request.setCharacterEncoding("UTF-8"); %>


<!-- anhpv 2020/02/19 -->

<script>
var CTX = "<%=request.getContextPath()%>"; 
var agt = navigator.userAgent.toLowerCase();
var browserChk = true;
if(agt.indexOf("chrome") != -1){
}else if(agt.indexOf("msie") != -1){
	 if(agt.indexOf("msie 9.0") != -1){
		 browserChk = false
//		 alert('ie 9으로 접속하셨습니다. HTML5 지원이 되지 않는 브라우저 입니다. ');
//		 console.log('ie 9.0')
	 }else if(agt.indexOf("msie 8.0") != -1){
		 browserChk = false
//		 console.log('ie 8.0')
		 alert('ie 8으로 접속하셨습니다. 정상적으로 동작하지 않을 수 있습니다. ');
	 }else if(agt.indexOf("msie 7.0") != -1){
		 browserChk = false
		 alert('ie 7으로 접속하셨습니다. 이 브라우저는 지원하지 않습니다. ');
//		 console.log('ie 7.0')
	 }
}
var grant =${not empty grantjson ? grantjson:'""'};
var CID = "${cid}"; 

</script>

<jsp:include page="/public_html/html/include/sub_header.jsp"></jsp:include>

<script type="text/javascript" src="${ctxPath}/script/common/comboboxInHeader.js"></script>



<script>
	$(document).ready(function(){
		
		headerWithSelectBox('onSelect');
		
		;
	})
	
	function onSelect(){
		var farmId = $('ul.select-machine.farm').attr('FARM_ID');
		var groupId = $('ul.select-machine.group').attr('GROUP_ID');
		var turbineId = $('ul.select-machine.turbine').attr('GERATOR_ID');
		$('#FARM_ID').val(farmId);
		$('#FARM_ID').val(groupId);
		$('#GERATOR_ID').val(turbineId);
// 		drawgrid();
		alert(farmId + ' - ' + groupId + ' - '+ turbineId);
	}

</script>



<div class="container system-wrap system-wrap1">
    
 <!-- 발전기 등록 -->
    <div class="system-detail-wrap">
      <div class="system-left">
        <!--tit-wrap-->
        <div class="tit-wrap">
          <h2 class="heading3">
            <span class="txt">Custom header</span>
            <!-- <span class="version">V47</span> -->
          </h2>
          <ul class="location">
            <li>Component</li>
            <li class="bold">Custom header</li>
          </ul>
        </div>
        <!--//tit-wrap-->
        <!-- registration form -->
        	<div>
        	Systax
        	<pre>
        	var str = '&ltdiv&gtWrite custom header inside here...&lt/div&gt'
        	$(document).ready(function(){
        		$('#header div.select-machine-wrap').append(str);	
        		//add action
			});       	</pre>
			
			
			
			Example: Using select Farm > Group > Turbine
			
			<pre>
			
&lt!-- required comboboxInHeader.js file 
 $('#header div.select-machine-wrap').append(str) inside this file
--&gt
&ltscript type="text/javascript" src="${ctxPath}/script/common/comboboxInHeader.js"&gt&lt/script&gt

&ltscript&gt
	$(document).ready(function(){
		&lt!--
		  required call 'headerWithSelectBox' function on comboboxInHeader.js file
		  param is function name which we want to execute whenever select an item.
		--&gt
		headerWithSelectBox('onSelect');
	})
	
	function onSelect(){
	
		&lt!--
		  get data from 3 combobox
		--&gt
		var farmId = $('ul.select-machine.farm').attr('FARM_ID');
		var groupId = $('ul.select-machine.group').attr('GROUP_ID');
		var turbineId = $('ul.select-machine.turbine').attr('GERATOR_ID');
		
		$('#FARM_ID').val(farmId);
		$('#FARM_ID').val(groupId);
		$('#GERATOR_ID').val(turbineId);
		// 		drawgrid();
		alert(farmId + ' - ' + groupId + ' - '+ turbineId);
	}

&lt/script&gt
			
			</pre>
        	
        	</div>
        <!-- //registration form -->
      </div>
      <div class="system-right">
        <div class="btns">
  	        <a class="btn-style btn-style1" onclick="selectFarmOnClick('20190916111146029')"><spring:message
							code='button.save' /></a> <a class="btn-style btn-style2"
						onclick="backToList()"><spring:message code='button.cancel' /></a>
					<c:if test="${not(DATA.CRUD eq 'C')}">
						<a class="btn-style btn-style3" onclick="doDelete()"><spring:message	code='button.delete' /></a>
					</c:if>
        </div>
      </div>
    </div>
    <!-- //발전기 등록 -->
</div>
    
    
<!--

//-->
<jsp:include page="/public_html/html/include/footer.jsp"></jsp:include>



		