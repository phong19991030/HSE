<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<!-- anhpv 2020/02/19 -->

<script>
var WT_LOCALE = 'en'</script>
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

<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/util/nova-validation.js" ></script>

        
<script type="text/javascript">

</script>



<div class="container system-wrap system-wrap1">
    
 <!-- 발전기 등록 -->
    <div class="system-detail-wrap">
      <div class="system-left">
        <!--tit-wrap-->
        <div class="tit-wrap">
          <h2 class="heading3">
            <span class="txt">Validation</span>
            <!-- <span class="version">V47</span> -->
          </h2>
          <ul class="location">
            <li>Components</li>
            <li class="bold">Validation</li>
          </ul>
        </div>
        <!--//tit-wrap-->
        <!-- registration form -->
        <pre>
&lt!-- All you need is add atribute nova-validation="..." inside the input you want to validate. 
	parameters is rules: required, number, email, url... separated by a comma (,)
	You can find the list rules inside /script/a2mFWJs/util/nova-validation.js file. 
	Or tell me if you need a new rules.--&gt
		
			var rules = {
				'required': {
					func: function(value){
						if(value && value.trim()){
							return true;
						}
						return false;
					},
					msg: {
						'vi': 'Thông tin này bắt buộc',
						'en': 'This field is required! Stupid!',
						'kr': '이 필드는 필수항목입니다.'
					}
				},
				"email":{
					func: function(value){
						if(value && value.trim() && regex.email.regex.test(value)){
							return true;
						}
						return false;
					},
					msg: {
						'vi': 'Email không hợp lệ!',
						'en': 'This email is incorrect!',
						'kr': '이메일 정보가 올바르지 않습니다.'
					}
				},
				"url":{
					func: function(value){
						if(value && value.trim() && regex.url.regex.test(value)){
							return true;
						}
						return false;
					},
					msg: {
						'vi': 'URL không hợp lệ!',
						'en': 'This url is incorrect!',
						'kr': 'URL 정보가 올바르지 않습니다.'
					}
				},
				...
			}
			

	
&lt!-- The example below: --&gt
	&ltli&gt
              &ltspan  class="essential"&gtTest input&lt/span&gt
              &ltdiv class="registration-write"&gt
                &ltdiv class="input-group"&gt
                  &ltlabel for="wtgId" class="sr-only"&gtWTG ID&lt/label&gt
			&lt!-- 	   This field is number and required --&gt
                  &ltinput type="text" nova-validation="required, number" name="test" id="test" placeholder=""&gt
                &lt/div&gt
              &lt/div&gt
            &lt/li&gt
		</pre>




        <form action="">
          <div class="registration-form registration-form1">
	        <div class="registration-form-lst-wrap">
	          <ul class="registration-form-lst">
	            
	            
	              <li>
	              <span  class="essential">Test input</span>
	              <div class="registration-write">
	                <div class="input-group">
	                  <label for="wtgId" class="sr-only">WTG ID</label>
	                  <input type="text" nova-validation="required, number" name="test" id="test" placeholder="">
	                </div>
	              </div>
	            </li>
	          </ul>
	
	        </div>
	      </div>
	      <button type="submit" class="btn-style btn-style1">Submit</button>
	      </form>
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