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
#layerPopup.dialogCustom > .layer-cont{
	width: 1200px;

}

button{
    position: absolute;
    top: 50%;
    right: 0;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    background: #f4f5f7;
    border: 1px solid #f4f5f7;
    color: #666;
    font-size: .6rem;
    text-align: center;
    width: 4rem;
    height: 29px;
    line-height: 27px;
    border-radius: 15px;
    -webkit-transition: background .3s, color .3s;
    transition: background .3s, color .3s;
}

button:hover {
    background: #1d41cc;
    border-color: #1d41cc;
    color: #fff;
}
</style>

        
        
<script type="text/javascript">
function openDialog(){
	var url = CTX + '/sys/sys_0501/poupNewDocument/form.dialog';

	openCommonDialog(url, {}, 'callbackDialog', 'dialogCustom');
}

function callbackDialog(){
	alert('callback!');
}
</script>



<div class="container system-wrap system-wrap1">
    
 <!-- 발전기 등록 -->
    <div class="system-detail-wrap">
      <div class="system-left">
        <!--tit-wrap-->
        <div class="tit-wrap">
          <h2 class="heading3">
            <span class="txt">Common dialog</span>
            <!-- <span class="version">V47</span> -->
          </h2>
          <ul class="location">
            <li>Components</li>
            <li class="bold">Common dialog</li>
          </ul>
        </div>
        <!--//tit-wrap-->
        <!-- registration form -->
        	<pre>
//        	Example:
        	&ltscript&gt
        	function openDialog(){
//         		if you want to open a dialog type, you have to push dialog type into response View in controller
        		var url = CTX + '/sys/sys_0501/poupNewDocument/form.dialog';
				/* there are 4 parameters in 'openCommonDialog' function.
				1: string - url string
				2: map - parameters of request
				3: string - name of callback funtion
				4: string - name of styling class for parent dialog */
        		openCommonDialog(url, {}, 'callbackDialog', 'dialogCustom');
        	}
        	
        	function callbackDialog(){
        		alert('callback!');
        	}
        	&lt/script&gt
        	
        	&ltbutton type="button" onclick="openDialog()"&gtClick&lt/button&gt
        	</pre> 
        <div class="registration-form registration-form1">
          <div class="registration-form-lst-wrap">
            <ul class="registration-form-lst">
              <li>
              
              </li>
              <li>
      			<span>Click to open a dialog</span>
      			
                <div class="registration-write  btn-input-wrap">
                
		              <button type="button" onclick="openDialog()">Click</button>
     			
                  
              
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