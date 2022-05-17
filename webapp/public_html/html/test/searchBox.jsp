<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<% request.setCharacterEncoding("UTF-8"); %>

<!-- anhpv 2020/02/20 -->

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




        


        
        
<script type="text/javascript">
function callbackDrawGrid(obj1, obj2, obj3){
// 	drawgrid();

}

var drawgrid = function (formId, mydata) {
 
    var number = $('#page-size').val();
    number = number? number: 10;
    $('#grid').setViewGrid({
        id : 'grid',
        type : 'crud',
        cid: '${cid}',
        // defaultAttrType: 'readonlytext',
        pinHeader : true, //헤더고정 설정  
        url : CTX + '/common/getListFarm.ajax',
        param : formId,
        localData : mydata,
        modelName : 'RESULTLIST',
        gridOptions : {
            caption : '검색결과',
            loadonce : true,
            pageable: true,
            pageSize: number,
            rownumbersDESC : true,


        },
        colModels : [
        	{
            name : 'FARM_ID',
            id : 'FARM_ID',
            hidden : 'true',
            width : 100
        }, {
            name : '<spring:message code='title.farm.FARM_NM' />',
            id : 'FARM_NM',
            width : 150
        }, {
            name : '<spring:message code='title.farm.COMPANY_NM' />',
            id : 'COMPANY_NM',
            width : 100 
        }, {
        	
            name : '<spring:message code='title.farm.LONGTUD' />',
            id : 'LONGTUD',
            hidden : 'true',

            width : 150
        }, {
            name : '<spring:message code='title.farm.LATITUD' />',
            id : 'LATITUD',
            hidden : 'true',

            width : 150
        }, {
            name : '<spring:message code='title.farm.DESCRPT' />',
            id : 'DESCRPT',
            hidden : 'true',

            width : 80
        }, {
            name : '<spring:message code='title.farm.POWER' />',
            id : 'POWER',
            width : 150
        }, {
            name : '<spring:message code='title.farm.REMARK' />',
            id : 'RMK',
            width : 100 
        }, {
        	
            name : '<spring:message code='title.farm.INS_DT' />',
            id : 'INS_DT',
            width : 150
        }, {
            name : 'COMPANY_ID',
            id : 'COMPANY_ID',
            hidden : 'true',
            width : 100 
        }, {
            name : '#',
            id : 'ACTION',
            template: '<button type="button" onclick="removeFarm(event)" class="btn btn_remove">X</button>',
            width : 100 
     
        }, ],

        callback : 'callbackDrawGrid',
        //boundEvent : 'readOnlyStyle',
        defaultOptions: {align: 'left', width: 100, sortable: false},

        // 이벤트
               	events : [{ event: 'click', funcName: 'onClick' }],

        colspan : [],
        rowspan : [],
        colGroup : [],
        btn : [
//         // 버튼
        {
//             button : 'accept',
//             func : 'acceptRequest',
//             classes: 'btm_confirm',
//             label : ""
//         },
//			{
//             button : 'deleteRow',
//             func : 'removeFarm',    
//             label : "Remove"
//         },{
			classes:'btn-style btn-style1',
            button :'addRow',
            func : 'addFarm',    
            label : "Register"
        }

        ]
    });
    return false; // 화면 전환없음
};
        
        $(function(){
//             drawgrid();
// 			$('#page-size').change(function(){
// 				drawgrid()
				
// 			})
        })
</script>



<div class="container system-wrap system-wrap1">
	  <!-- 발전단지 등록테이블 -->
	  <!--tit-wrap-->
	  <div class="tit-wrap">
	    <h2 class="heading3">
	      <span class="txt">A2M Search box</span>
	      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>SYSTEM</li>
	      <li class="bold">A2M Search box</li>
	    </ul>
	  </div>
	  <!--//tit-wrap-->
	
	<pre>
&lt!--search-form--&gt
&lt!-- "formId"" and "script" is required............... --&gt
	  &lta2m:searchbox formId="detailKeywordForm" script="drawgrid" initenable="false"&gt 
	  
&lt!-- Write you content in here. Please follow the structure for the best design... --&gt
	          &ltli&gt
	            &ltspan class="detail-search-keyword"&gtFarm name&lt/span&gt
	            &ltdiv class="input-group"&gt
	              &ltlabel for="searchText" class="sr-only"&gtSearch&lt/label&gt
	              &ltinput type="text" id="searchText" name="search.FARM_NM" value=""&gt
	            &lt/div&gt
	          &lt/li&gt
	          &ltli class="calendar-picker"&gt
	            &ltspan class="detail-search-keyword"&gtDate&lt/span&gt
	            &ltdiv class="calendar-wrap"&gt
	              &ltdiv class="input-group"&gt
	                &ltlabel for="searchText" class="sr-only"&gt&lt/label&gt
	                &ltinput type="text" id="searchText" name="searchText" value=""&gt
	                &ltbutton class="calendar-picker-btn"&gt
	                  &lti class="xi-calendar"&gt&lt/i&gt
	                &lt/button&gt
	              &lt/div&gt
	              &ltem class="hyphen"&gt
	                &ltspan class="sr-only"&gt-&lt/span&gt
	              &lt/em&gt
	              &ltdiv class="input-group"&gt
	                &ltlabel for="searchText" class="sr-only"&gt&lt/label&gt
	                &ltinput type="text" id="searchText" name="searchText" value=""&gt
	                &ltbutton class="calendar-picker-btn"&gt
	                  &lti class="xi-calendar"&gt&lt/i&gt
	                &lt/button&gt
	              &lt/div&gt
	            &lt/div&gt
	          &lt/li&gt
&lt!--	End custom content--&gt

        &lt/a2m:searchbox&gt
	  &lt!--//search-form--&gt 
&lt!--	There are 2 &ltform&gt in search box. 
 		- First is long input. Submit by "Enter" keyup. Param to server is "search.all".
       		Please make sure you check "search.all" param on query in server
 		- Second is content you write inside  &lta2m:searchbox&gt, submit by "Search" button.
--&gt
	  </pre>
	 <!--search-form-->
	  <a2m:searchbox formId="detailKeywordForm" script="drawgrid" initenable="true"> 
	          <li>
	            <span class="detail-search-keyword">Farm name</span>
	            <div class="input-group">
	              <label for="searchText" class="sr-only">Search</label>
	              <input type="text" id="searchText" name="search.FARM_NM" value="">
	            </div>
	          </li>
	          <li class="calendar-picker">
	            <span class="detail-search-keyword">Date</span>
	            <div class="calendar-wrap">
	              <div class="input-group">
	                <label for="searchText" class="sr-only"></label>
	                <input type="text" id="searchText" name="searchText" value="">
	                <button class="calendar-picker-btn">
	                  <i class="xi-calendar"></i>
	                </button>
	              </div>
	              <em class="hyphen">
	                <span class="sr-only">-</span>
	              </em>
	              <div class="input-group">
	                <label for="searchText" class="sr-only"></label>
	                <input type="text" id="searchText" name="searchText" value="">
	                <button class="calendar-picker-btn">
	                  <i class="xi-calendar"></i>
	                </button>
	              </div>
	            </div>
	          </li>
        </a2m:searchbox>
	  <!--//search-form-->    
	  <div >
		<div id="grid"></div>
	  </div>
        
	  <!-- //발전단지 등록 -->
	</div>
    
    
<!--

//-->
<jsp:include page="/public_html/html/include/footer.jsp"></jsp:include>