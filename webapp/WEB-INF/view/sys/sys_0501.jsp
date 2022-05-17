<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/WEB-INF/_include/taglib.jsp"%>



<script type="text/javascript">
	function callBackAddTurbine(){
		drawgrid();
	}
	
	var drawgrid = function(formId, data) {

		var number = $('#page-size').val();
		number = number? number: 10;

        $('#grid').setViewGrid({
            id: 'grid',
            cid:'${cid}',
            displayState: false,
            pinHeader: false,
            url: CTX + '/sys/sys_0501/getData01.ajax',
            param: formId,
            localData: data,
            modelName: 'RESULTLIST',
            gridOptions: {
            	caption: '회사 목록',
            	loadonce: true,
            	rownumbersDESC: true,
            	gridPaginationLength:100,
                pageable:true,
//                 height: 370
				pageSize: number
            },
            colModels: [
//     			{name: '', id: 'SELECTED', attrType: 'checkbox', typeValue: [ { LABEL: '사용', DATA: 'Y' }, { LABEL: '미사용', DATA: 'N' } ], width: 30},
                {name:'COMPANY UID', id : 'COMPANY_ID', hidden: true},
                {name:'<spring:message code="sys.sys_0203.list.label.classification"/>', width: 100, id :'CLS',attrType:{'func':'link_comm'}},
                {name:'<spring:message code="sys.sys_0501.list.label.name"/>', width: 200, id :'COMPANY_NM'},
                {name:'', id :'NEW_FLE_NM', hidden: true},       
                {name:'', id :'FLE_NM', hidden: true},       
                {name:'<spring:message code="sys.sys_0501.list.label.address"/>', id :'COMPANY_ADR', hidden: true},       
                {name:'<spring:message code="sys.sys_0501.list.label.description"/>', id : 'DESCRPT', hidden: true},       
		        {
					name : '<spring:message code="sys.sys_0501.numOfUser"/>',
					id : 'MEMBERS',
					width : 100,
		         template: '<button class="num_gen" onclick="viewUser(event)" >[#=MEMBERS#]</button>',
		        },
//                 {name:'<spring:message code="sys.sys_0501.numOfUser"/>', id : 'MEMBERS'},       
                {name:'<spring:message code="sys.sys_0501.insertUser"/>',hidden:true,  id : 'USER_NM' },       
//                 {name:'', hidden:true, id : 'FLE_PATH'},
    			{ name: '<spring:message code="sys.sys_0101.list.title.detail"/>',  width : 60 , hidden: true,	attrType:{'func':'detailIcon'}, id : 'DETAIL'},
                {name:'Logo',  id : '', template: '<img src="${ctxPath}/util/upload/imageView/#=NEW_FLE_NM#" alt="" class="mCS_img_loaded">', hidden: true},       
                
            ],
            defaultOptions: {align: 'center', width: 100, sortable: false},
            colspan: [],
            rowspan: [],
            events: [
            	{
                event: 'click',
                funcName: 'onChangeEv'
            }
            	],
            btn: [
            	'${navimenu.SUBMENU.SUBMENU.WRT_YN}' == 'Y'? {button:'', func:'addDocument', 
    				classes : 'btn-style btn-style1', label:'<spring:message code="button.register"/>'}:"",
//     				{button:'', func:'deleteCompanies', 
//         				classes : 'btn-style btn-style3', label:'<spring:message code="button.delete"/>'},
          
                
            ]
        });
        
        $('.search_tbl').closest('form').find('.btm_refresh').removeClass('ac_click submit');
        
        return false;
    }
	
	
	function onChangeEv(obj, obj2, obj3, obj4, obj5, obj6){
//		var id = $(obj5.target).closest('tr').find('td[col="FARM_ID"]').html();
	var $td = $(obj5.target).closest('td');
	if($td.attr('data-col') == 'SELECTED'){
		return false;
	}
	 	var rowData = $('#grid').getGrid().dataItem($tr);

 
		var url = CTX + '/sys/sys_0501/poupNewDocument/form.tab';
		var param = {};
		param["COMPANY_NM"] = rowData.COMPANY_NM;
		param["CLS"] = rowData.CLS;
		param["NEW_FLE_NM"] = rowData.NEW_FLE_NM;
		param["FLE_NM"] = rowData.FLE_NM;
		param["COMPANY_ID"] = rowData.COMPANY_ID;
		param["COMPANY_ADR"] = rowData.COMPANY_ADR;
		param["DESCRPT"] = rowData.DESCRPT;
		param["LOGO"] = rowData.LOGO;
		
		var success = function(html){
			$("#div_id_search_area").hide();
			$("#pagination-area").hide();
			  noConflict();
		};
		var ajax = new AjaxAccess();
		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
	 	
 }
	
	
	function deleteCompanies() {
	    
		var data = $("#table_grid").getDataSource().data();
   	 var list = [];
   	 var param = {}
   	 var listID = '';
   	 data.forEach(function(obj, i){
   		 if(obj['SELECTED'] == 'Y'){
   			 list.push(obj);
   			 listID += (obj['COMPANY_ID']+ '-');
   		 }
   	 })
   	 if(list.length <= 0){
   		 alert('Please select one or more companies.');
   		 return false;
   	 }
   	 
   	 if(confirm('<spring:message code='message.confirmDelete' />')) {
	        $.ajax({
	            url: CTX + "/sys/sys_0501/delete02.ajax",
	            type: 'post',
	            data: data,
	            cache: false,
	            success: function(data, textStatus, jqXHR) {
// 	            	console.log(data);
	                if(data && data.result == "true"){
	                	alert(deleteSuccess);
	                }else if(data && data.result == "false" && data.msg){
	                	alert(data.msg);
	                }else{
	                	alert(deleteFailed);
	                }
	                backToList();
//	                 saveCallbackFunc(); 
	            },complete: function(){
	                return true;
	            },error : function(){
	                alert('<spring:message code='msg.somethingWrong' />');
	                return false;
	            }
	        });
	    }
	    
	}
	
	 function detailIcon(cellValue, options, rowObject) {
	     	var type = options['field'];
	     	var row = options['model'];
	     	var rowid = row['uid'];
	     	var id = row['COMPANY_ID'];
	     		if (!id){
	     			return false;		
	     		}else{
	     			return '<strong class="th-tit display-title"></strong><span class= "detail-btn ac_click link" onclick="detailCompany(event)" data-rowid="'+
	     			rowid+'" ><i class="xi-document"></i>' +'</span>';
	     		}
	     }
	 
	 function detailCompany(e){
		 e.preventDefault();
 		
 		var rowId = $(e.target).closest('span').attr('data-rowid');
 		var rowData = $('#grid').getRowData(rowId);

		 
        	var url = CTX + '/sys/sys_0501/poupNewDocument/form.tab';
    		var param = {};
    		param["COMPANY_NM"] = rowData.COMPANY_NM;
    		param["CLS"] = rowData.CLS;
    		param["NEW_FLE_NM"] = rowData.NEW_FLE_NM;
    		param["FLE_NM"] = rowData.FLE_NM;
    		param["COMPANY_ID"] = rowData.COMPANY_ID;
    		param["COMPANY_ADR"] = rowData.COMPANY_ADR;
    		param["DESCRPT"] = rowData.DESCRPT;
    		param["LOGO"] = rowData.LOGO;
    		
    		var success = function(html){
    			$("#div_id_search_area").hide();
    			$("#pagination-area").hide();
				  noConflict();
    		};
    		var ajax = new AjaxAccess();
    		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
	 }

	function viewUser(obj){
		obj.preventDefault();
		var $trSelected = $(obj.target).closest('tr');
		var rowData = $trSelected.getGrid().dataItem($trSelected);
		
		var COMPANY_ID = rowData["COMPANY_ID"];
		var url = CTX + '/sys/sys_0201/list?COMPANY_ID='+ COMPANY_ID;
		window.location.href = url;
// 		openCommonDialog(url, {}, '', 'listTurbine');
		
		obj.stopPropagation();
	}
    
        function link_comm(cellValue, options, rowObject) {
         	var type = options['field'];
        	var row = options['model'];
        	var rowid = row['uid'];

        	
        	if(row['CLS']==1){
        		return '<span class="event_enable"><spring:message code="sys.sys_0501.class.operator"/></span>';
        	}else if(row['CLS']==2){
            	return '<span class="event_enable"><spring:message code="sys.sys_0501.class.manufacture"/></span>';

        	}else if(row['CLS']==3){
            	return '<span class="event_enable"><spring:message code="sys.sys_0501.class.isp"/></span>';

        	}else if(row['CLS']==4){
            	return '<span class="event_enable"><spring:message code="sys.sys_0501.class.wfConsulting"/></span>';

        	}else{
        		return '<span class="event_enable"></span>';
        	}
            
        }
        
	function onChangeEv(rowid, target, callback, obj) {
	    	
	        if ($(obj)) {
	        	
	        	var $trSelected = $(obj);
	           
	            var rowData = $trSelected.getGrid().dataItem($trSelected);
	          
	            //var url = CTX+'/sys/sys_0501/poupNewDocument/form.popup?COMPANY_NM=' + rowData.COMPANY_NM +  '&COMPANY_ID=' 
	            //openEditorWindow(url);
	            
	            /* var url = CTX + '/sys/sys_0501/poupNewDocument/form?COMPANY_NM=' + rowData.COMPANY_NM +  '&COMPANY_ID=' 
	            		+ rowData.COMPANY_ID +  '&COMPANY_ADR=' 
	            		+ rowData.COMPANY_ADR; 
	            $(location).attr('href', url); */
	           	var url = CTX + '/sys/sys_0501/poupNewDocument/form.tab';
	    		var param = {};
	    		param["COMPANY_NM"] = rowData.COMPANY_NM;
	    		param["CLS"] = rowData.CLS;
	    		param["NEW_FLE_NM"] = rowData.NEW_FLE_NM;
	    		param["FLE_NM"] = rowData.FLE_NM;
	    		param["COMPANY_ID"] = rowData.COMPANY_ID;
	    		param["COMPANY_ADR"] = rowData.COMPANY_ADR;
	    		param["DESCRPT"] = rowData.DESCRPT;
	    		param["LOGO"] = rowData.LOGO;
	    		
	    		var success = function(html){
	    			$("#div_id_search_area").hide();
	    			$("#pagination-area").hide();
					  noConflict();
	    		};
	    		var ajax = new AjaxAccess();
	    		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
	        }
	    }
	    
		function addDocument(rowid, target, callback, obj) {
		   	//var url = CTX+'/sys/sys_0501/poupNewDocument/form.popup?';
		   	//openEditorWindow(url);
		   	
		   	/* var url = CTX + '/sys/sys_0501/poupNewDocument/form';
		   	$(location).attr('href', url); */
			var url = CTX + '/sys/sys_0501/poupNewDocument/form.tab';
			var param = {};
			
			var success = function(html){
				$("#div_id_search_area").hide();
				$("#pagination-area").hide();
				  noConflict();
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


    $(document).ready(function () {
//         	    drawgrid();
$('#search_class').val("").trigger('change');
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
	  	  	<a2m:searchbox formId="searchForm" script="drawgrid" initenable="true"> 

	          <li>
	            <span class="detail-search-keyword"><spring:message code='sys.sys_0201.list.label.companyname' /></span>
	            <div class="input-group">
	              <label for="search_company" class="sr-only"><spring:message code='sys.sys_0201.list.label.companyname' /></label>
	              <input type="text" id="search_company" name="search.COMPANY_NM" value="">
	            </div>
	          </li>
	           <li>
	            <span class="detail-search-keyword"><spring:message code='sys.sys_0203.list.label.classification' /></span>
	            <div class="registration-write  registration-write-select">
	                <div class="input-group-wrapper">
	                  <div class="select-box">
	              <label for="search_class" class="sr-only"><spring:message code='sys.sys_0203.list.label.classification' /></label>
<!-- 	              <input type="text" id="search_class" name="search.CLS" value="">
 -->	              <select   id="search_class" value="" name="search.CLS" class="info-select">
	                      <option value="">-- Select <spring:message code='sys.sys_0501.class' /> --</option>
 						<option value="1"><spring:message code="sys.sys_0501.class.operator"/></option>
		                  <option value="2"><spring:message code="sys.sys_0501.class.manufacture"/></option>
		                  <option value="3"><spring:message code="sys.sys_0501.class.isp"/></option>
		                  <option value="4"><spring:message code="sys.sys_0501.class.wfConsulting"/></option>
	                    </select>
	            </div>
	            </div>
	            </div>
	          </li>
	         
	       </a2m:searchbox>
	  <!--//search-form-->
			<div id="grid" style="width: 100%;"></div>

	  </div>
	  <!--// 발전기 등록테이블 -->