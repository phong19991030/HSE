<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<!-- anhpv 2020/02/19 -->


<% request.setCharacterEncoding("UTF-8"); %>
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

  <link href="${ctxPath}/stylesheet/common/libraries-modify.css" rel="stylesheet" type="text/css" media="all">



<%-- Kendo UI combined JavaScript --%>
<script src="${ctxPath}/script/kendo/js/kendo.all.min.js"></script>
<script src="${ctxPath}/script/kendo/js/jszip.min.js"></script>
<script src="${ctxPath}/script/kendo/js/pako_deflate.min.js"></script>
<script src="${ctxPath}/script/kendo/js/cultures/kendo.culture.ko-KR.min.js"></script>

<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/util/utils.js" ></script>

<%-- config  --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/a2mFWJs/config/style.js"></script> --%>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/config/common.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/config/gridConfig.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/form.validate.js" ></script>



<%-- validation --%>
<script type="text/javascript" src="${ctxPath}/script/jquery/validation/jquery.validationEngine.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/jquery/validation/languages/jquery.validationEngine-kr.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/jquery/validation/utils.js" ></script>



<%-- 신규  creator가 control 보다 상위 개념 --%>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/form.extends.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/domCreator.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/gridControl.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/gridObjControl.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/domControl.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/util/jsonlite.js" ></script>




        
<style>


</style>

        
        
<script type="text/javascript">

</script>



<div class="container system-wrap system-wrap1">
    
 <!-- 발전기 등록 -->
    <div class="system-detail-wrap">
      <div class="system-left">
        <!--tit-wrap-->
        <div class="tit-wrap">
          <h2 class="heading3">
            <span class="txt">A2M Choice Input Form</span>
            <!-- <span class="version">V47</span> -->
          </h2>
          <ul class="location">
            <li>Component</li>
            <li class="bold">A2M Choice Input Form</li>
          </ul>
        </div>
        <!--//tit-wrap-->
        <!-- registration form -->
        	<pre>
&ltspan&gtInput choose from dialog&lt/span&gt
&ltul class="registration-form-lst"&gt
      			
	&ltdiv class="registration-write  btn-input-wrap"&gt
	
                &lt!--  put &lta2m:choiceInputForm/&gt inside &ltdiv class="registration-write" /&gt  with "btn-input-wrap" class
                 type="dialog" is for dialog, type="popup" is for popup
                 params = "{selectType: ALL}" is for select multi, other is for select one
                --&gt
         &lta2m:choiceInputForm type = "dialog" cls = "selectRole" id ='ROLE_ID' params = "{selectType: one}" 
				defaultValue="" callback="" eventType="dblclick"
				textTargetName="ROLE_NM" codeTargetName="ROLE_ID" textFieldName="ROLE_NM" codeFieldName="ROLE_ID"
				codeView = "true" funcname="onSelectRole" /&gt classes=""
    &lt/div&gt
&lt!--     classes is special class design for this dialog (include size, css...) --&gt
&lt/ul&gt



&lt!-- inside the JSP file of content dialog --&gt
&lt!-- how to find JSP file of content dialog for this a2m:choiceInputForm:
> cls = "selectRole" --> enum Group & CommonPopupUrl (/java/infrastructure/inheritance/model/enumeration/CommonPopupUrl.java)
 --> JSP file (/view/common/popup/) & controller (/java/module/common/popup/) 
--&gt
&ltdiv class="tit-wrap"&gt
		&ltstrong class="heading6"&gtSelect permission&lt/strong&gt
&lt/div&gt
&ltdiv id="select-human-dialog"&gt 
	&lta2m:searchbox script="drawgrid" formId="searchForm" initenable="true" pagingable="false"&gt 
		&lttable class="search_tbl"&gt
			&ltcaption&gt&ltspring:message code="sys.sys_0201.list.label.Search"/&gt&lt/caption&gt
			
			&lttbody&gt
				&lttr&gt
					&lttd colspan="2"&gt
						&ltdiv class="inp_inline"&gt
							&ltlabel for="SE_USER_NM"&gt&ltspring:message code="sys.sys_0201.list.label.rolename"/&gt&lt/label&gt 
							&ltinput type="text" id="ROLE_NM" name="ROLE_NM" class="w100px"&gt
							
						&lt/div&gt
					&lt/td&gt
					
				&lt/tr&gt
			&lt/tbody&gt
		&lt/table&gt 
	&lt/a2m:searchbox&gt
	
	&ltdiv id="select-human-grid" style="width:100%;"&gt&lt/div&gt
&lt/div&gt

</pre> 
        <div class="registration-form registration-form1">
          <div class="registration-form-lst-wrap">
            <ul class="registration-form-lst">
              <li>
              
              </li>
              <li>
      			<span>Input choose from dialog</span>
      			
                <div class="registration-write  btn-input-wrap">
                
		                 <a2m:choiceInputForm type = "dialog" cls = "selectRole" id ='ROLE_ID' params = "{selectType: one}" 
											defaultValue="" callback="" eventType="dblclick"
											textTargetName="ROLE_NM" codeTargetName="ROLE_ID" textFieldName="ROLE_NM" codeFieldName="ROLE_ID"
											codeView = "true" funcname="onSelectRole" classes="anhpv" />
     			
                  
              
                  </div>
<!--                 </div> -->
              </li>
              <li>
               
              </li>
              <li>
                
              </li>
              <li>
                
              </li>
              <li>
                
              </li>
            </ul>

            <ul class="registration-form-lst">
              <li>
               
              </li>
              
              <li>
                
              </li>
              <li>
                
              </li>
              <li>
                
              </li>
            </ul>

          </div>
        </div>
        <!-- //registration form -->
      </div>
<!--       <div class="system-right"> -->
<!--         <div class="btns"> -->
<%--   	        <a class="btn-style btn-style1" onclick="submitForm()"><spring:message --%>
<%-- 							code='button.save' /></a> <a class="btn-style btn-style2" --%>
<%-- 						onclick="backToList()"><spring:message code='button.cancel' /></a> --%>
<%-- 					<c:if test="${not(DATA.CRUD eq 'C')}"> --%>
<%-- 						<a class="btn-style btn-style3" onclick="doDelete()"><spring:message	code='button.delete' /></a> --%>
<%-- 					</c:if> --%>
<!--         </div> -->
<!--       </div> -->
    </div>
    <!-- //발전기 등록 -->
</div>
    
    
<!--

//-->
<jsp:include page="/public_html/html/include/footer.jsp"></jsp:include>