<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<% request.setCharacterEncoding("UTF-8"); %>

<!-- anhpv 2020/02/14 -->

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




        


        
 


<div class="container system-wrap system-wrap1">
	  <!-- 발전단지 등록테이블 -->
	  <!--tit-wrap-->
	  <div class="tit-wrap">
	    <h2 class="heading3">
	      <span class="txt">Logging on server</span>
	      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>SYSTEM</li>
	      <li class="bold">Logging on server</li>
	    </ul>
	  </div>
	  <!--//tit-wrap-->
	
	<pre>
	/* In order to logging
	* add line 		request.setAttribute("EVENT", ### )  into every request CRUD. 
	* C - "INSERT"
	* R - "VIEW"
	* U - "UPDATE"
	* D - "DELETE"
	* For example:
	*/
	@RequestMapping("/getData01.ajax")
	public ModelAndView getData01(ModelAndView mav, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		/**
		 * Parameter
		 */
		// getParameterMap (Session 포함)
		// getParameterMapWithOutSession (Session 포함 X)
		Map parameter = ParameterUtil.getParameterMapWithOutSession(request);
		Map param = (Map) parameter.get("search");
		if (null != param) {
			parameter.putAll(param);
		}

		/**
		 * Logic
		 */
		// 프로그램내역(List)
		List list = sys0301dao.list("getListFarm", parameter);
		/**
		 * ModelAndView
		 */
		mav.setViewName("jsonView");
		/////// with request for view data list, event is "VIEW"
		request.setAttribute("EVENT", "VIEW");
		mav.addObject("DATA", list);
		return mav;
	}
	</pre>
	
        
	  <!-- //발전단지 등록 -->
	</div>
    
    
<!--

//-->
<jsp:include page="/public_html/html/include/footer.jsp"></jsp:include>