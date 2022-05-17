<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>



<script type="text/javascript">
	function callBackAddTurbine(){
		drawgrid();
	}
	
    var drawgrid = function (formId, data) {
        var mydata = data;
		var number = $('#page-size').val(); number = number? number: 10;

		$('#grid').setViewGrid({
            id : 'grid',
            type : 'crud',
            cid: '${cid}',
            // defaultAttrType: 'readonlytext',
            pinHeader : true, //헤더고정 설정  
            url : CTX + '/sys/sys_0302/getData01.ajax',
            param : formId,
            localData : mydata,
            data : mydata,
            modelName : 'RESULTLIST',
            gridOptions : {
                caption : 'Turbine list',
                loadonce : true,
                pageable: true,
                pageSize: number,
                rownumbersDESC : true,

            // 				rownumbers : true
            },
            colModels : [ {
//                 name : '',
//                 id : 'SELECTED',
//                 attrType : 'checkbox',
                
//                 typeValue : [ {
//                     LABEL : '사용',
//                     DATA : 'Y'
//                 }, {
//                     LABEL : '미사용',
//                     DATA : 'N'
//                 } ],
//                 width : 30,
//                 typeOption:{typeHeader:true},
//             	align: 'center'
//             }, {
                name : 'GERATOR_ID',
                id : 'GERATOR_ID',
                hidden : 'true',
                width : 100
            }, {
                    name : '<spring:message code='title.farm.FARM_NM' />',
                    id : 'FARM_NM',
                    width : 100 
            }, {
                        name : '<spring:message code='title.tb.GROUP_NM' />',
                        id : 'GROUP_NM',
                        width : 100
            }, {
                name : '<spring:message code='title.tb.GERATOR_NM' />',
                id : 'GERATOR_NM',
                width : 150
 			}, {
                name : '<spring:message code='title.tb.brand' />',
                id : 'MANFCTURE_NM',
                width : 100
 		   }, {
               name : '<spring:message code='title.tb.POWER' />',
               id : 'POWER',
               width : 60 
 		   }, {
           	
               name : '<spring:message code='title.tb.INS_DT' />',
               id : 'INS_DT',
               width : 120
        
//  			},
 /* 			{
            	
                name : '<spring:message code='title.tb.GERATOR_EN_NM' />',
                id : 'GERATOR_EN_NM',
                width : 150
            },  */
            
//             {
//                 name : '<spring:message code='title.tb.LONGTUD' />',
//                 id : 'LONGTUD',

//                 width : 70
//             }, {
//                 name : '<spring:message code='title.tb.LATTUD' />',
//                 id : 'LATITUDE',
//                 width : 70
//             }, {
//                 name : '<spring:message code='title.tb.DESCRPT' />',
//                 id : 'DESCRPT',
//                 width : 100 
//             }, {
//                 name : '#',
//                 id : 'ACTION',
//                 template: '<button type="button" onclick="removeTurbine(event)" class="btn btn_remove">X</button>',
//                 width : 100 
            }],

            callback : 'callbackDrawGrid',
            //boundEvent : 'readOnlyStyle',
            defaultOptions: {align: 'left', width: 100, sortable: false},

            // 이벤트
          	events : [{ event: 'click', funcName: 'onClick' }],
            colspan : [],
            rowspan : [],
            colGroup : [],
            btn : [
            	'${navimenu.SUBMENU.SUBMENU.WRT_YN}' == 'Y'?{
				classes : 'btn-style btn-style1',
                button : 'addRow',
                func : 'addTurbine',    
                label:'<spring:message code="button.register"/>'            }: "",
                     ]
        });
        return false; // 화면 전환없음
    };
    
    function onClick(obj, obj2, obj3, obj4, obj5, obj6){  	
		var id = $(obj5.target).closest('tr').find('td[col="GERATOR_ID"]').html();	
		
		var $tr = $(obj5.target).closest('tr');
   	 	var rowData = $('#grid').getGrid().dataItem($tr);
		var url = CTX+'/sys/sys_0302/form.tab?GERATOR_ID='+rowData["GERATOR_ID"];
		var param = {};		
		var success = function(html){
				};
		var ajax = new AjaxAccess();
		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
	
    }
	var msgConfirmDelete = '<spring:message code='message.confirmDelete' />';
	var deleteSuccess = '<spring:message code='message.deletedSuccess' />';
	var deleteFailed = '<spring:message code='message.deletedFailed' />';
    function removeTurbine(obj){
    	obj.preventDefault();
    	obj.stopPropagation();
    	var message={
    		    'QUESTION' : {'MESSAGE': msgConfirmDelete},
        	    'FAIL':{'MESSAGE':deleteFailed},
        	    'SUCCESS':{'MESSAGE': deleteSuccess}
        	    }
      	var param = {};
		var id  = $(obj.target).closest('tr').find('td[data-col="GERATOR_ID"]').html();	
	
		if(confirm(message.QUESTION.MESSAGE)){

      	   $.ajax({
    	        url:  CTX + "/sys/sys_0302/delete01.ajax",
    	        type: "post",
    	        data:  {"GERATOR_ID" : id} ,
    	        success: function (response) {
     	        	if(response == 'true'){
						alert(message.SUCCESS.MESSAGE);

     	        		 drawgrid();
					}else{
						alert(message.FAIL.MESSAGE);
					}
    	        },
    	        error: function(jqXHR, textStatus, errorThrown) {
    	           console.log(textStatus, errorThrown);
    	        }
    	    }); 
    	}
    	
    }
    
    function addTurbine(){

    	var $target = generateDialogDom();
		
    	var url = CTX+'/sys/sys_0302/form.tab';
		//popupWindow = window.open(url, 'popup', 'width=' + (parseInt(window.innerWidth) * 0.9) + ',height=' + (parseInt(window.innerHeight) * 0.9));
		var param = {};		
		var success = function(html){
				};
		var ajax = new AjaxAccess();
		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
			
		
    	
    }
    
    function callbackDrawGrid() {

    }


    function saveCallbackFunc(form, data) {
        // 그리드 reflesh
        drawgrid();
    }

	var FARM_ID = '${FARM_ID}';
	
	function renderManufacturer(){
		$.ajax({
	        url:  CTX + "/sys/sys_0302/getManufacturer.ajax",
	        type: "post",
	        data:  {"CLS" : "2"} ,
	        success: function (response) {
 	        	if(response){
var str = '';					
					response.forEach(function(obj, i){
						str+= ('<option value="'+obj["COMPANY_ID"]+'">'+obj["COMPANY_NM"]+'</option>');
					})
				}
 	        	
 	        	$('#search_company').append(str);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	           console.log(textStatus, errorThrown);
	        }
	    }); 
	}

    $(document).ready(function () {
		if(FARM_ID){
			$('#searchForm').append('<input type="text" id="search_farm_id" hidden name="search.FARM_ID" value="'+FARM_ID+'">')
		}
		
		renderManufacturer();
		drawgrid();
		$('#search_farm_id').remove();
		$('#search_company').val("").trigger('change');

    });

  
</script>

	<div class="container system-wrap system-wrap1">
	  <!-- 발전기 등록테이블 -->
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
	  	<a2m:searchbox formId="searchForm" script="drawgrid" initenable="false"> 
	          <li>
	            <span class="detail-search-keyword"><spring:message code='title.farm.FARM_NM' /></span>
	            <div class="input-group">
	              <label for="search_farm" class="sr-only"><spring:message code='title.farm.FARM_NM' /></label>
	              <input type="text" id="search_farm" name="search.FARM_NM" value="">
	              
	            </div>
	          </li>
	           <li>
	            <span class="detail-search-keyword"><spring:message code='title.tb.GERATOR_NM' /></span>
	            <div class="input-group">
	              <label for="search_gerator" class="sr-only"><spring:message code='title.tb.GERATOR_NM' /></label>
	              <input type="text" id="search_gerator" name="search.GERATOR_NM" value="">
	            </div>
	          </li>
	          <li> 
	            <span class="detail-search-keyword"><spring:message code='title.tb.brand' /></span>
	            <div class="input-group">
	            	<div class="select-box">
	            	<label for="search_company" class="sr-only"><spring:message code='title.tb.brand' /></label>
<!-- 	              <input type="text" id="search_company" name="search.COMPANY_NM" value=""> -->
	              <select id="search_company" name="search.COMPANY_ID" class="info-select" value="">
	              <option value="">-- Select Manufacturer --</option>
	              </select>
	            	</div>
	              
	            </div>
	          </li>
	        </a2m:searchbox>
	  <!--//search-form-->
			<div id="grid" style="width: 100%;"></div>

	  </div>
	  <!--// 발전기 등록테이블 -->
	
	 