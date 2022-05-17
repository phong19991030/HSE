<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<script type="text/javascript">
    /*
     * <사용자관리>
     *  그리드
     * - attrType은 gridContor에서 참고 (세부내용은 domCreator)
     */
    var drawgrid = function(formId, data) {
 		var number = $('#page-size').val(); number = number? number: 10;

        $('#grid').setViewGrid({
            id: 'grid',
            cid:'${cid}',
//             displayState: false,
            pinHeader: false,
            url: CTX + '/sys/sys_0201/getData01.ajax',
            param: formId,
            localData: data,
            modelName: 'RESULTLIST',
            gridOptions: {
            	caption: '사용자 내역',
            	loadonce: true,
//             	rownumbersDESC: true,
            	gridPaginationLength:100,
                pageable:true,
//                 height: 370
				pageSize: number
            },
            colModels: [
    			{name: '', id: 'SELECTED', attrType: 'checkbox', typeValue: [ { LABEL: '사용', DATA: 'Y' }, { LABEL: '미사용', DATA: 'N' } ], width: 30},
                {name:'USER_UID', id : 'USER_UID', align:'left', hidden:true},
                {name:'User ID', id :'USER_ID'},
                {name:'PWD', id : 'PWD', align:'left', hidden:true},
                {name:'<spring:message code="sys.sys_0201.list.label.username"/>', id :'USER_NM'},
                {name:'<spring:message code="sys.sys_0201.list.label.companyname"/>' ,id :'COMPANY_NM'},
                {name:'USER_NM', id : 'USER_NM', align:'left', hidden:true},
                {name:'API', hidden: true ,id :''},
                {name:'APP' , hidden: true, id :''},
                {name:'<spring:message code="sys.sys_0201.list.label.insDate"/>' , id :'INS_DT'},
                {name:'<spring:message code="sys.sys_0201.list.label.recentlogin"/>', id :'LOGIN_DT'},
    			{ name: '<spring:message code="sys.sys_0101.list.title.detail"/>',  width : 60 ,	hidden: true,	attrType:{'func':'detailIcon'}, id : 'DETAIL'},
                {name:'LOGO', id :'LOGO', hidden: true}

            ],
            defaultOptions: {align: 'center', width: 100, sortable: true},
            colspan: [],
            rowspan: [],
            events: [
            	{
                event: 'click',
                funcName: 'onChangeEv'
                //funcName: 'detailForm'
            }
            	],
            btn: [
            	'${navimenu.SUBMENU.SUBMENU.WRT_YN}' == 'Y'?{button:'', classes : 'btn-style btn-style1 float-right', func:'addDocument', label:'<spring:message code="button.register"/>'}:"",
            	'${navimenu.SUBMENU.SUBMENU.WRT_YN}' == 'Y'?{button:'', classes : 'btn-style btn-style3 float-right', func:'deleteUsers', label:'<spring:message code="button.delete"/>'}:"",
            	//             	{button:'',	classes : 'btn-style btn-style1', func:'excel', label:'<spring:message code="sys.sys_0501.list.label.excel"/>'} 
                
            ]
        });
        
        $('.search_tbl').closest('form').find('.btm_refresh').removeClass('ac_click submit');
        
        return false;
    }
     
     /*@ hy 사용자 관리 상세정보 조회*/
//      function detailForm(obj,obj2, obj3, obj4, obj5, obj6){
//     	 var $td = $(obj5.target).closest('td');
//  		var $tr = $td.closest('tr');
//  		if($td.attr('data-col') == 'SELECTED'){
//  			return false;
//  		}
 		
//    	 	var rowData = $('#grid').getGrid().dataItem($tr);
   	 	
//    	 	var crud="edit";
   	 
//    	 	var url = CTX + '/sys/sys_0201/detailForm/getUserInfo.ajax';
//    		var param = {};
//    		param["USER_ID"] = rowData.USER_ID;
//    		param["COMP"] = rowData.COMP;
//    		param["USER_NM"] = rowData.USER_NM;
//    		param["USER_UID"] = rowData.USER_UID;
//    		param["EMAIL"] = rowData.EMAIL;
//    		param["LOGO"] = rowData.LOGO;
//    		param["DUPL_ID"] = crud;
   		
//    		var success = function(html){
//    			$("#div_id_search_area").hide();
//    			$("#pagination-area").hide();
//    		};
//    		var ajax = new AjaxAccess();
//    		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
//      }
     
     function onChangeEv(obj, obj2, obj3, obj4, obj5, obj6){
//  		var id = $(obj5.target).closest('tr').find('td[col="FARM_ID"]').html();
		var $td = $(obj5.target).closest('td');
		var $tr = $td.closest('tr');
		if($td.attr('data-col') == 'SELECTED'){
			return false;
		}
   	 	var rowData = $('#grid').getGrid().dataItem($tr);

   	 	var crud="edit";
     
     	var url = CTX + '/sys/sys_0201/poupNewDocument/form.tab';
		var param = {};
		param["USER_ID"] = rowData.USER_ID;
		param["COMP"] = rowData.COMP;
		param["USER_NM"] = rowData.USER_NM;
		param["USER_UID"] = rowData.USER_UID;
		param["EMAIL"] = rowData.EMAIL;
		param["LOGO"] = rowData.LOGO;
		param["DUPL_ID"] = crud;
		
		var success = function(html){
			$("#div_id_search_area").hide();
			$("#pagination-area").hide();
		};
		var ajax = new AjaxAccess();
		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
   	 	
     }
     
     function deleteUsers(){
    	 var data = $("#table_grid").getDataSource().data();
    	 var list = [];
    	 var param = {}
    	 var listID = '';
    	 var checkHasAdmin = false;
    	 data.forEach(function(obj, i){
    		 if(obj['SELECTED'] == 'Y'){
    			 list.push(obj);
    			 listID += (obj['USER_UID']+ '-');
    			 if(obj['USER_ID'] == 'admin'){
        			 checkHasAdmin = true;
        		 }
    		 }
    		
    	 })
    	 if(checkHasAdmin){
    		 alert('Can not delete Administrator user.');
    		 return false;
    	 }
    	 if(list.length <= 0){
    		 alert('Please select one or more Users.');
    		 return false;
    	 }
    	 listID  = listID.slice(0, -1); 
    	 param = {'ID': listID};

    	    if(confirm('<spring:message code='message.confirmDelete' />')) {
    	        $.ajax({
    	            url: CTX + "/sys/sys_0201/01/delete02.ajax",
    	            type: 'post',
    	        	data : param,
    	        	cache : false,
    	            success: function(data, textStatus, jqXHR) {
    	                if(data == "true"){
    	                    alert('<spring:message code='message.deletedSuccess' />');
    	             		drawgrid();
    	                }else{
    	                    alert('<spring:message code='message.deletedFailed' />');

    	                }
    	            },complete: function(){
    	                return true;
    	            },error : function(){
    	                alert('<spring:message code='message.deletedFailed' />');
    	                return false;
    	            }
    	        });
    
    	    }
    	 
     }
     

     function detailIcon(cellValue, options, rowObject) {
     	var type = options['field'];
     	var row = options['model'];
     	var rowid = row['uid'];
     	var id = row['USER_UID'];
     		if (!id){
     			return false;		
     		}else{
     			return '<strong class="th-tit display-title"></strong><span class= "detail-btn ac_click link" onclick="detailUser(event)" data-rowid="'+
     			rowid+'" ><i class="xi-document"></i>' +'</span>';
     		}
     }
     
     function detailUser(e) {
    		e.preventDefault();
    		
    		var rowId = $(e.target).closest('span').attr('data-rowid');
    		var rowData = $('#grid').getRowData(rowId);


    		var crud="edit";
            
            var url = CTX + '/sys/sys_0201/poupNewDocument/form.tab';
  			var param = {};
  			param["USER_ID"] = rowData.USER_ID;
  			param["COMP"] = rowData.COMP;
  			param["USER_NM"] = rowData.USER_NM;
  			param["USER_UID"] = rowData.USER_UID;
  			param["EMAIL"] = rowData.EMAIL;
  			param["LOGO"] = rowData.LOGO;
  			param["DUPL_ID"] = crud;
  			
  			var success = function(html){
  				$("#div_id_search_area").hide();
  				$("#pagination-area").hide();
  			};
  			var ajax = new AjaxAccess();
  			ajax.loadingHTML(url, $('#detail-content'), param, success, "");

    	}
     
//      function onChangeEv(rowid, target, callback, obj) {
     	
//          if ($(obj)) {
         	
//          	var $trSelected = $(obj);
            
//              var rowData = $trSelected.getGrid().dataItem($trSelected);

//              var crud="edit";
             
//            var url = CTX + '/sys/sys_0201/poupNewDocument/form.tab';
//  			var param = {};
//  			param["USER_ID"] = rowData.USER_ID;
//  			param["COMP"] = rowData.COMP;
//  			param["USER_NM"] = rowData.USER_NM;
//  			param["USER_UID"] = rowData.USER_UID;
//  			param["EMAIL"] = rowData.EMAIL;
//  			param["LOGO"] = rowData.LOGO;
//  			param["DUPL_ID"] = crud;
 			
//  			var success = function(html){
//  				$("#div_id_search_area").hide();
//  				$("#pagination-area").hide();
//  			};
//  			var ajax = new AjaxAccess();
//  			ajax.loadingHTML(url, $('#detail-content'), param, success, "");
//          }
//      }
     
     function callBackAddRole(){
 		drawgrid();
 	}
     
	function addDocument(rowid, target, callback, obj) {
		//var url = CTX+'/sys/sys_0201/poupNewDocument/form.popup?';
		//openEditorWindow(url);
		
		/* var url = CTX+'/sys/sys_0201/poupNewDocument/form';
		$(location).attr('href', url); */
		var url = CTX + '/sys/sys_0201/poupNewDocument/form.tab';
		
		var success = function(html){
			$("#div_id_search_area").hide();
			$("#pagination-area").hide();
		};
		var ajax = new AjaxAccess();
		ajax.loadingHTML(url, $('#detail-content'), "", success, "");
	 } 
     
     function openEditorWindow (url) {
    	 popupWindow = window.open(url, 'popup', 'width=' + getPopupSize().WIDTH + ',height=' + getPopupSize().HEIGHT);

    		// Puts focus on the newWindow
    		if (window.focus) {
    		newWindow.focus();
    		}
    	 }



    

    var COMPANY_ID = '${COMPANY_ID}';
$(document).ready(function(){
	getCompany();
	
	$(document).on('click', '.btm_refresh', function() {
		$(this).closest('form').trigger('reset');
		$(this).closest('form').trigger('submit');
		return false;
	});
	
	if(COMPANY_ID){
		$('#searchForm').append('<input type="text" id="search_COMPANY_ID" hidden name="search.COMPANY_ID" value="'+COMPANY_ID+'">')
	}
    drawgrid();

    $('#search_COMPANY_ID').remove();

	
}); 
function getCompany(){
	
	$.ajax({
		url: CTX+'/sys/sys_0301/getCompany.ajax',
		data: {} ,
		success: function (response) {
			console.log(response);
			var str = '';
			$.each( response, function( index, obj ) {
				str += '<option value="'+obj.COMPANY_ID+'">'+obj.COMPANY_NM+'</option>'
				});
			
			 /* $("#COMPANY_NM").append(str); */
			 $('#SE_COMP').append(str);

		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

</script>


  <div class="container system-wrap system-wrap1">
    <!-- 시용자 등록테이블 -->
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
	            <span class="detail-search-keyword">User ID</span>
	            <div class="input-group">
	              <label for="search_user" class="sr-only">User ID</label>
	              <input type="text" id="search_user" name="search.USER_ID" value="">
	            </div>
	          </li>
	           <li>
	            <span class="detail-search-keyword"><spring:message code='sys.sys_0201.list.label.username' /></span>
	            <div class="input-group">
	              <label for="search_USERNAME" class="sr-only"><spring:message code='sys.sys_0201.list.label.username' /></label>
	              <input type="text" id="search_USERNAME" name="search.USERNAME" value="">
	            </div>
	          </li>
	          <li> 
	            <span class="detail-search-keyword"><spring:message code='title.user.org' /></span>
	            <div class="input-group">
	              <label for="search_company" class="sr-only"><spring:message code='title.user.org' /></label>
	              <input type="text" id="search_company" name="search.COMPANY_NM" value="">
	            </div>
	          </li>
         </a2m:searchbox>
    <!--//search-form-->
    
	<div id="grid"> </div>



    <!--// 시용자 등록테이블 -->

   
  </div>


