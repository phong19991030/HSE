<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<script type="text/javascript">
	
	 function callbackDrawGrid() {

    }


    function saveCallbackFunc(form, data) {
	        // 그리드 reflesh
        drawgrid();
    }


	var drawgrid = function(formId, mydata) {

		var number = $('#page-size').val(); number = number? number: 10;
		$('#grid').setViewGrid({
			id : 'grid',
			type : 'crud',
			cid : '${cid}',
			// defaultAttrType: 'readonlytext',
			pinHeader : true, //헤더고정 설정  
			url : CTX + '/sys/sys_0301/getData01.ajax',
			param : formId,
			localData : mydata,
			modelName : 'RESULTLIST',
			gridOptions : {
				caption : '검색결과',
				loadonce : true,
				pageable : true,
				pageSize : number,
				rownumbersDESC : true
			},
			colModels : [ {
				name : 'FARM_ID',
				id : 'FARM_ID',
				hidden : 'true',
				width : 100
			}, {
				name : '<spring:message code='title.farm.FARM_NM' />',
				id : 'FARM_NM',
				width : 130
			}, {
				name : '<spring:message code='title.farm.operator' />',
				id : 'COMPANY_NM',
					width : 200

			}, {
				name : '<spring:message code='title.farm.LONGTUD' />',
				id : 'LONGTUD',
				hidden : 'true',

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
				name : '<spring:message code='title.farm.POWER' />(MW)',
				id : 'POWER',
				hidden : 'true',
				width : 80
			}, {
				name : '<spring:message code='title.farm.POWER' />(MW)',
				id : 'POWER_STR',
				width : 80
			}, {
				name : '<spring:message code='title.farm.WTG_COUNT' />',
				id : 'COUNT_GENERATOR',
				width : 50,
             template: '<button class="num_gen" onclick="viewTurbine(event)" >[#=COUNT_GENERATOR#]</button>',

				
// 			}, {
// 			}, {
// 				name : '<spring:message code='title.farm.REMARK' />',
// 				id : 'RMK',
// 				width : 100
			}, {

				name : '<spring:message code='title.farm.INS_DT' />',
				id : 'INS_DT',
				width : 100
			}, {

				name : '<spring:message code='title.farm.INS_USER' />',
				id : 'USER_NM',
				width : 100,
				hidden: true
			}, {
				name : 'COMPANY_ID',
				id : 'COMPANY_ID',
				hidden : 'true',
				width : 100
			//         }, {
			//             name : '#',
			//             id : 'ACTION',
			//             template: '<button type="button" onclick="removeFarm(event)" class="btn btn_remove">X</button>',
			//             width : 100 

			}, ],

			callback : 'callbackDrawGrid',
			//boundEvent : 'readOnlyStyle',
			defaultOptions : {
				align : 'left',
				width : 100,
				sortable : false
			},

			// 이벤트
			events : [ {
				event : 'click',
				funcName : 'onClick'
			} ],

			colspan : [],
			rowspan : [],
			colGroup : [],
			btn : [
			//         // 버튼
			'${navimenu.SUBMENU.SUBMENU.WRT_YN}' == 'Y'? {
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
				classes : 'btn-style btn-style1',
				button : 'addRow',
				func : 'addFarm',
				label:'<spring:message code="button.register"/>'
				}:''

			]
		});
		return false; // 화면 전환없음
	};

	function viewTurbine(obj){
		obj.preventDefault();
		var $trSelected = $(obj.target).closest('tr');
		var rowData = $trSelected.getGrid().dataItem($trSelected);
		
		var FARM_ID = rowData["FARM_ID"];
		var url = CTX + '/sys/sys_0302/list?FARM_ID='+ FARM_ID;
		window.location.href = url;
// 		openCommonDialog(url, {}, '', 'listTurbine');
		
		obj.stopPropagation();
	}
	
	function callbackDialog(){
		alert('callback!');
	}
	
	function onClick(obj, obj2, obj3, obj4, obj5, obj6) {
		//		alert('OK');    	
		var id = $(obj5.target).closest('tr').find('td[col="FARM_ID"]').html();
		var $tr = $(obj5.target).closest('tr');
   	 	var rowData = $('#grid').getGrid().dataItem($tr);
		var url = CTX + '/sys/sys_0301/form.tab?FARM_ID=' + rowData['FARM_ID'];
		//popupWindow = window.open(url, 'popup', 'width=' + (parseInt(window.innerWidth) * 0.9) + ',height=' + (parseInt(window.innerHeight) * 0.9));
		var param = {};
		var success = function(html) {
		};
		var ajax = new AjaxAccess();
		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
	}

	  function addFarm(){
		    
	    	var url = CTX+'/sys/sys_0301/form.tab';
		//popupWindow = window.open(url, 'popup', 'width=' + (parseInt(window.innerWidth) * 0.9) + ',height=' + (parseInt(window.innerHeight) * 0.9));
			var param = {};		
			var success = function(html){
					};
			var ajax = new AjaxAccess();
			ajax.loadingHTML(url, $('#detail-content'), param, success, "");
			
	    }
	    
	  
	$(function() {
// 		drawgrid();

	})
</script>


<div class="container system-wrap system-wrap1">
	  <!-- 발전단지 등록테이블 -->
	  <!--tit-wrap-->
	  <div class="tit-wrap">
	    <h2 class="heading3">
	    
	      <span class="txt">${navimenu.SUBMENU.SUBMENU.MENU_NM}</span>
	      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>${navimenu.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.MENU_NM}</li>
	    </ul>
	  </div>
	  <!--//tit-wrap-->
	  <!--search-form-->
		  	<a2m:searchbox formId="searchForm" script="drawgrid" initenable="true"> 

	          <li>
	            <span class="detail-search-keyword"><spring:message code='title.farm.FARM_NM' /></span>
	            <div class="input-group">
	              <label for="search_farm" class="sr-only"><spring:message code='title.farm.FARM_NM' /></label>
	              <input type="text" id="search_farm" name="search.FARM_NM" value="">
	            </div>
	          </li>
	          <li> 
	            <span class="detail-search-keyword"><spring:message code='title.farm.operator' /></span>
	            <div class="input-group">
	              <label for="search_company" class="sr-only"><spring:message code='title.farm.operator' /></label>
	              <input type="text" id="search_company" name="search.COMPANY_NM" value="">
	            </div>
	          </li>
	          
	       </a2m:searchbox>
	  <!--//search-form-->
	
	  <div id="grid"></div>
		

	  
	  <!--// 발전단지 등록테이블 -->
	
	 
	</div>
	
