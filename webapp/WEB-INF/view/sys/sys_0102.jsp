<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<style>
#grid td span{
pointer-events: none !important;
}
</style>

<script type="text/javascript">
	function callBackAddTurbine(){
		drawgrid();
	}
	
	
	var form_id = '';
	var drawgrid = function(formId, data) {
		form_id = formId;
		var number = $('#page-size').val();
		number = number? number: 10;

        $('#grid').setViewGrid({
            id: 'grid',
            cid:'${cid}',
            displayState: false,
            pinHeader: false,
            url: CTX + '/sys/sys_0102/getData02.ajax',
            param: formId,
            localData: data,
            modelName: 'RESULTLIST',
            gridOptions: {
            	caption: '회사 목록',
//             	loadonce: true,
            	rownumbersDESC: true,
//             	gridPaginationLength:100,
                pageable:true,
//                 height: 370
				pageSize: number
            },
            colModels: [
//                 {name:'Log ID', id : 'LOG_ID'},
//                 {name:'Log ID', id : 'ID2'},
                {name:'User ID', id :'USER_ID'},
                {name:'Access Time', id :'TIMESTAMP'},
                {name:'IP', id :'IP'},
//                 {name:'Event', id :'EVENT'},
//                 {name:'Menu', id :'MENU'},
                {name:'Access Point', id : 'ACCESS_POINT'},
//     	   		{name:'', width: 30, id:'DELETE_ACTION', template:'<a onclick="deleteMenu(event)" class="delete-btn"><i class="xi-trash"></i></a>'},
            ],
            defaultOptions: {align: 'center', width: 100, sortable: false},
            colspan: [],
            rowspan: [],
//             events: [{
//                 event: 'click',
//                 funcName: 'onChangeEv'
//             }],
            btn: [
            	'${navimenu.SUBMENU.SUBMENU.EXC_DN_YN}' == 'Y'? {button:'', func:'exportExcel', 
    				classes : 'btn-style btn-style1', label:'<spring:message code="button.excel"/>'}: '',
            ]
        });
        
//         $('.search_tbl').closest('form').find('.btm_refresh').removeClass('ac_click submit');
        
        return false;
    }
    
	function exportExcel(){
		if('${navimenu.SUBMENU.SUBMENU.EXC_DN_YN}' == 'Y'){
			var str = '?';
			var x = [];
			if(form_id == 'searchForm'){
				   x = $("#searchForm").serializeArray();
				    $.each(x, function(i, field){
				      str+= field.name+'='+field.value+'&';
				    });
				    str.slice(0,-1)
			}else if(form_id == 'searchForm1'){
				   x = $("#searchForm1").serializeArray();
				    $.each(x, function(i, field){
				      str+= field.name+'='+field.value+'&';
				    });
				    str.slice(0,-1)
			}
			
			window.location.href = CTX + '/sys/sys_0102/excelFile.ajax'+str;
		}else{
			alert('User do not have export permission!');
		}
		

// 		var url = CTX + '/sys/sys_0102/excelFile.ajax';
// 		 $.ajax({
// 		        url:  url,
// //	 	        type: "post",
// 		 		xhrFields: {
// 		            responseType: 'blob'
// 		        },
// 		        data:  {"search.USER_ID": $('input[name="search.USER_ID"]').val(), "search.IP": $('input[name="search.IP"]').val(),"search.from":$('input[name="search.from"]').val() ,"search.to": $('input[name="search.to"]').val()} ,
// 		        success: function (data) {
// 		        	 var a = document.createElement('a');
// 		             var url = window.URL.createObjectURL(data);
// 		             a.href = url;
		             
// 		             a.download = 'myfile.xlsx';
// 		             document.body.append(a);
// 		             a.click();
// 		             a.remove();
// 		             window.URL.revokeObjectURL(url);
// 		        },
// 		        error: function(jqXHR, textStatus, errorThrown) {
// 		           console.log(textStatus, errorThrown);
// 		        }
// 		    }); 
	}
    
    function callbackDrawGrid() {
        drawgrid();

    }


    function saveCallbackFunc(form, data) {
        // 그리드 reflesh
        drawgrid();
    }


    $(document).ready(function () {
        drawgrid();

        $('#search_from').change(function(){
        	if($('#search_to').val()) {
    		var fromdate =  $('#search_from').datepicker('getDate');
    		var todate =  $('#search_to').datepicker('getDate');
			if(fromdate > todate){
				alert('<spring:message code="edu.edu_0201.list.alert.validate"/>');
				$('#search_to').datepicker('setDate', fromdate);

			}
        	}
        })
        
        $('#search_to').change(function(){
        	if($('#search_from').val()) {
    		var fromdate =  $('#search_from').datepicker('getDate');
    		var todate =  $('#search_to').datepicker('getDate');
			if(fromdate > todate){
				alert('<spring:message code="edu.edu_0201.list.alert.validate"/>');
				$('#search_from').datepicker('setDate', todate);

			}
        	}
        })
     
    });

    function deleteMenu(e){
    	var url =CTX+'/sys/sys_0102/delete01.ajax';
    	var data = {};
    	var $tr = $(e.target).closest('tr');
    	 var rowData = $('#grid').getGrid().dataItem($tr);
    	 
    	 data['LOG_ID'] = rowData['LOG_ID'];
    	 if(!data['LOG_ID']){
    		return false
    	}
    	 if(confirm('<spring:message code='message.confirmDelete' />')){	
    	$.ajax({
    		url :url,// CTX+ url, )
    		data : $.extend({
    			'type' : 'dialog'
    			,'cls' : ''
    		}, data),
    		cache : false,
    		success : function(data, textStatus, jqXHR) {
    			if(data == true || data == 'true'){
    				alert('<spring:message code='message.deletedSuccess' />')
    				$('#grid').getGrid().dataSource.data().remove(rowData);
    				$tr.remove();
    			}else{
    				alert('<spring:message code='message.deletedFailed' />');

    			}
    		}
    	});
    	 }

    }
  
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
      <!--//tit-wra
	  <!--//tit-wrap-->
	  <!--search-form-->
	  	  	<a2m:searchbox formId="searchForm" script="drawgrid" initenable="false"> 
		<script>
		$(function(){
			$('.datepicker').setDatePicker('yy/mm/dd');
		})
		</script>
	     <li>
	            <span class="detail-search-keyword">User ID</span>
	            <div class="input-group">
	              <label for="search_user" class="sr-only">USER_ID</label>
	              <input type="text" id="search_user" name="search.USER_ID" value="">
	            </div>
	          </li>
	           <li>
	            <span class="detail-search-keyword">IP</span>
	            <div class="input-group">
	              <label for="search_ip" class="sr-only">IP</label>
	              <input type="text" id="search_ip" name="search.IP" value="">
	            </div>
	          </li>
	          <li>
	            <span class="detail-search-keyword">Access Point</span>
	            <div class="input-group">
	              <label for="search_ip" class="sr-only">Access Point</label>
<!-- <!-- 	              <input type="text" id="search_access_point" name="search.ACCESS_POINT" value=""> -->
<!--  	              <select id="search_access_point" name="search.ACCESS_POINT"> -->
<!-- 	              	<option value="browser">browser</option> -->
<!-- 	              	<option value="mobile">"mobile"</option> -->
<!-- 	              </select> -->
	              
<!-- 	              <div class="registration-write  registration-write-select"> -->
<!-- 	                <div class="input-group-wrapper"> -->
	                  <div class="select-box">
<!-- 	             		 <label for="search_class" class="sr-only">:: Select ::</label> -->
	 		              <label for="search_class" class="mark">:: Select ::</label>
	 		              <select id="search_access_point" class="info-select">
	<!-- 	                       	<option value="">:: Select ::</option> -->
		                       	<option value="" selected>:: Select ::</option>
		                       	<option value="browser">browser</option>
		              			<option value="mobile">mobile</option>
		                  </select>
	            		</div>
<!-- 	            	</div> -->
<!-- 	            </div> -->
	            </div>
	          </li>
	          <li  class="calendar-picker">
	             <span class="detail-search-keyword"><spring:message code="title.sys_0102.from"/></span>
	            <div class="calendar-wrap full">
		            <div class="input-group">
		              <label for="search_from" class="sr-only">Access Time</label>
		              <input class="datepicker" id="search_from" name="search.from" value="" type="text">
		            </div>
	            </div>
	            
	     
	          </li>
	           <li  class="calendar-picker">
	             <span class="detail-search-keyword"><spring:message code="title.sys_0102.to"/></span>
	            <div class="calendar-wrap full">
		            <div class="input-group">
		              <label for="search_to" class="sr-only">Access Time</label>
		              <input class="datepicker" id="search_to" name="search.to" value="" type="text">
		            </div>
	            </div>
	            
	     
	          </li>
	       </a2m:searchbox>
	  <!--//search-form-->
			<div id="grid" style="width: 100%;"></div>

	  </div>
	  <!--// 발전기 등록테이블 -->
	