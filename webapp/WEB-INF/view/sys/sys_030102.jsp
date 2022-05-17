<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
.listTurbine .layer-cont{
	    width: 800px !important;
}

.listTurbine .layer-cont .layer-close{
    top: 0.5rem !important;
    right: 0.5rem !important;
}

.listTurbine .layer-cont .grid_target{
	height: 600px;
}

</style>

<script type="text/javascript">
	function callBackAddTurbine(){
		drawgrid3();
	}
	
    var drawgrid3 = function (formId, data) {

		var number = $('#page-size').val(); number = number? number: 10;

		$('#grid3').setViewGrid({
            id : 'grid',
            type : 'crud',
            cid: '${cid}',
            // defaultAttrType: 'readonlytext',
            pinHeader : true, //헤더고정 설정  
            url : CTX + '/sys/sys_0302/getData01.ajax?FARM_ID='+id,
            param : formId,

            modelName : 'RESULTLIST',
            gridOptions : {
                caption : 'Turbine list',
                loadonce : true,
                pageable: false,
               // pageSize: number,
                rownumbersDESC : true

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
/*             }, {
                    name : '<spring:message code='title.farm.FARM_NM' />',
                    id : 'FARM_NM',
                    width : 100  */
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

            //callback : 'callbackDrawGrid',
            //boundEvent : 'readOnlyStyle',
            defaultOptions: {align: 'left', width: 100, sortable: false},

            // 이벤트
          	events : [],
            colspan : [],
            rowspan : [],
            colGroup : [],
            btn :[]
        });
        return false; // 화면 전환없음
    };
    
    

	var id = '${FARM_ID}';
    $(document).ready(function () {
   drawgrid3();
   $('#grid3').mCustomScrollbar({
	    axis: "Y",
	    theme: "minimal-dark",
	    mouseWheelPixels: 500
	  });
    });

  
</script>

<div style="padding: 20px;">
<div id="grid3" style="width: 100%;"></div>

</div>
			
	
	 