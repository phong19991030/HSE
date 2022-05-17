<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<!DOCTYPE html> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">  
<title>MIS</title>
<script type="text/javascript"> var CTX = "<%=request.getContextPath()%>"; </script>

<script  type="text/javascript"> 

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
</script>


<!-- stylesheet -->  
<%-- <link href="${ctxPath}/stylesheet/layout_common.css" rel="stylesheet" type="text/css"> --%>
<%-- <link href="${ctxPath}/stylesheet/pro_custom.css" rel="stylesheet" type="text/css">  --%>
 
<%-- <link media="screen" href="${ctxPath}/stylesheet/${design}/default.css" rel="stylesheet" type="text/css" /> --%>
<link media="screen" href="${ctxPath}/stylesheet/${design}/common.css" rel="stylesheet" type="text/css" >
<link media="screen" href="${ctxPath}/stylesheet/${design}/button.style.css" rel="stylesheet" type="text/css" >
<link media="screen" href="${ctxPath}/stylesheet/${design}/layout.css" rel="stylesheet" type="text/css" >
<link media="screen" href="${ctxPath}/stylesheet/${design}/common.style.css" rel="stylesheet" type="text/css" >
<link media="screen" href="${ctxPath}/stylesheet/${design}/jquery-ui-1.9.2.custom.css" rel="stylesheet" type="text/css" > 
<link media="screen" href="${ctxPath}/stylesheet/${design}/ui.jqgrid.css" rel="stylesheet" type="text/css" > 
<link media="screen" href="${ctxPath}/stylesheet/${design}/sub.contents.css" rel="stylesheet" type="text/css" > 
<link media="screen" href="${ctxPath}/stylesheet/${design}/main.contents.css" rel="stylesheet" type="text/css" > 

 
<link rel="stylesheet" href="${ctxPath}/stylesheet/${design}/font-awesome/css/font-awesome.min.css">
<link media="screen" href="${ctxPath}/stylesheet/common/ico.style.css" rel="stylesheet" type="text/css" >  


<link href="${ctxPath}/script/jquery/jquery.timepicker.css" rel="stylesheet" >

<link href="${ctxPath}/script/jquery/fullcalendar/fullcalendar.css" rel="stylesheet" >
<link href="${ctxPath}/script/jquery/fullcalendar/fullcalendar.print.css" rel="stylesheet" media="print" >


<!-- test -->
<link media="screen" href="${ctxPath}/stylesheet/common/validateEngine/validationEngine.jquery.css" rel="stylesheet" type="text/css" > 


<script type="text/javascript">
 
var code =  ${not empty code.json ? code.json :'""'};
</script>

<!-- jquery -->
<script type="text/javascript" src="${ctxPath}/script/jquery/jquery-1.8.3.min.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/jquery/jquery-ui-1.9.2.custom.js" ></script>
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery/jquery.timepicker.js"></script> --%>
<script type="text/javascript" src="${ctxPath}/script/jquery/jquery.timepicker.min.js"></script>
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery-hive-master/jquery.hive.js" ></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery-hive-master/jquery.pollen.js" ></script> --%>
<!-- locale -->   
<script type="text/javascript" src="${ctxPath}/script/jquery/datepicker.locale-ko.js" charset="utf-8" ></script>
<script type="text/javascript" src="${ctxPath}/script/jqgrid/jquery.jqGrid.js" ></script>


<!-- chart --> 
<%-- <script type="text/javascript" src="${ctxPath}/script/chart/highcharts.js"></script>    --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/chart/highstock.js"></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/chart/exporting.js"></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/chart/chartDefault.js"></script> --%>
<!-- mask  -->
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery/jquery.mask.js" defer></script> --%>
<!-- form  -->
<script type="text/javascript" src="${ctxPath}/script/jquery/plugin/jquery.form.js" defer></script>
<!-- number -->
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery/jquery.number.js"></script> --%>
<!--datepicker  -->
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery/datepicker.locale-ko.js"></script> --%>
<!-- common  -->
<script type="text/javascript" src="${ctxPath}/script/js/style.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/common.js" ></script>

<!-- 신규  
creator가 control 보다 상위 개념   
 -->
<%-- <script type="text/javascript" src="${ctxPath}/script/js/control/form.extends.js" ></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/control/domCreator.js" ></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/control/gridControl.js" ></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/control/w.gridControl.js" ></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/control/domControl.js" ></script> --%>
<script type="text/javascript" src="${ctxPath}/script/js/control/a2m.com.js.form.extends.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/js/control/a2m.com.js.domCreator.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/js/control/a2m.com.js.gridControl.js" ></script>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/control/WwgridControl.js" ></script> --%>
<script type="text/javascript" src="${ctxPath}/script/js/control/a2m.com.js.domControl.js" ></script>

<!-- validation -->
<script type="text/javascript" src="${ctxPath}/script/jquery/validation/jquery.validationEngine.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/jquery/validation/languages/jquery.validationEngine-kr.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/jquery/validation/utils.js" ></script>

<%-- <script type="text/javascript" src="${ctxPath}/script/js/control/form.validate.js" ></script> --%>
<script type="text/javascript" src="${ctxPath}/script/js/control/a2m.com.js.form.validate.js" ></script>

<!-- mask -->
<script type="text/javascript" src="${ctxPath}/script/jquery/plugin/jquery.mask.js" ></script>
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery/plugin/jquery.money.js" ></script> --%>
<script type="text/javascript" src="${ctxPath}/script/jquery/plugin/jquery.number.js" ></script>



<script type="text/javascript" src="${ctxPath}/script/js/background.size.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/js/fs_common.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/js/background.size.js" ></script>

<!-- style- jquery 보다 밑으로 -->

<script type="text/javascript" src="${ctxPath}/script/jquery/fullcalendar/fullcalendar.moment.min-2.3.1.js"></script>
<script type="text/javascript" src="${ctxPath}/script/jquery/fullcalendar/fullcalendar.min-2.3.1.js"></script>
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery/fullcalendar/ko-2.3.1.js"></script> --%>
<script type="text/javascript" src="${ctxPath}/script/jquery/fullcalendar/lang-all.js"></script>


<!-- 업무별 js파일 -->
<!-- 회계 -->
<script type="text/javascript" src="${ctxPath}/script/js/acm.js"></script>
<!-- 구매 -->
<script type="text/javascript" src="${ctxPath}/script/js/bym.js"></script>
<!-- 인사/출장 -->
<script type="text/javascript" src="${ctxPath}/script/js/hrm.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/btm.js"></script>
<!-- 기관평가 -->
<script type="text/javascript" src="${ctxPath}/script/js/evm.js"></script>
<!-- 핸디 그룹웨어 -->
<script type="text/javascript" src="${ctxPath}/script/js/handy.js"></script>
<!-- 전자세금계산서 -->
<script type="text/javascript" src="${ctxPath}/script/js/ebill.js"></script>
<!-- 시설-->
<script type="text/javascript" src="${ctxPath}/script/js/fcm.js"></script>

<script type="text/javascript">
// importScripts('${ctxPath}/script/js/control/gridControl.js'); 
// var worker = new Worker('${ctxPath}/script/js/control/gridControl.js');
//팝업에서는 subHeader에서 TOP_LAYOUT_WIDTH 변수가 없어 JqGridTag 태그클래스 에러가 나는 것을 방지하기위한 변수 선언
var TOP_LAYOUT_WIDTH = 0;

</script>
<script type="text/javascript">
$(document).ready(function(){		
	$(window).on('resize', function() {
		if($('#txt').hasClass('ptx')){
			// footer시 확장
// 			$('#txt.ptx').css('height',$(window).height()-20); 
		}else if($('#main_txt').length > 0) {
			resizeMain();
		}else{
			initResultForm() 
		}
		
		
		resizeGrid();
		
 	});
})
	var resizeGrid = function(){
// 		txt
		//그리드를 수평, 수직 2가지 형태로 구분하고 
		//마지막그리드가 수평일 경우 최대 사이즈~ 
		//수직그리드 뒤에 수평그리드가 없을 경우 최대 사이즈`
		
		var hori= new Array(); 
		var verti=new Array();
		var widthChange=new Array(); 
		var gridList = [];
		
		if($('#txt .tabContents li').length > 0){
// 			gridList = $("#txt .base_grid_table")
			
			$("#txt .base_grid_table").each(function(){
				
				var display = $(this).parents('li').css('display');
				if( display!='none'){
					gridList.push($(this))
				}
				
			})
		}else{
			gridList = $("#txt .base_grid_table")
		}
		
		
		
		
		$.each(gridList,function(i){
			
			var $parent = $(this).parents('div#'+$(this).prop('id').replace('table_',''));
			
			
			// x탭
			var $li = $parent.parents('li');
			var $opend_li; 
			$li.siblings().each(function(i,obj){
				var dis = $(obj).css('display');
				var hi = $(obj).hasClass('hide') ;
				if(dis != 'none' && !hi){
					$opend_li = $(obj)
				}
			})
			var display = $li.css('display');
			var hide = $li.hasClass('hide') ;

			var hidden = false
			if(hide || display=='none' || $parent.css('display') == 'none' ){
				hidden = true;
			}
//					$parents.show();
// 			var height =  $parents.offset().top+ $parents.height()-$parent.offset().top
				
				if(hide || display=='none' ){
					
					$li.show().siblings().hide();
// 					height =  $parents.offset().top+ $parents.height()-$parent.offset().top
					$opend_li.show().siblings().hide()
				}
				if($parent.data('height')){
// 					$height =$parent.data('height')	
					widthChange.push(
						{'top':$parent.offset().top , 'left':$parent.offset().left , 'width':$parent.width() , 'height':$parent.height(),'obj':$(this),'hidden':hidden}
						)
				}else{
					if($parent.width()+100> $('#txt').width()){
						hori.push(
						{'top':$parent.offset().top , 'left':$parent.offset().left , 'width':$parent.width() , 'height':$parent.height(),'obj':$(this),'hidden':hidden}
						)
		// 				if($("#txt .base_grid_table").lenght() == i){
							
		// 				}
					}else{
						verti.push(
						{'top':$parent.offset().top , 'left':$parent.offset().left , 'width':$parent.width() , 'height':$parent.height(),'obj':$(this),'hidden':hidden}
						)
		// 				verti.append($parent)
					} 
				}
		})
		
		
		//수평없이 수직만 여러개일 경우 마지막 그리드만 width 조정,전체 height 조정
		if(hori.length==0 && verti.length>0){
			$.each(verti,function(i,obj){
				var $parent =obj.obj;
				var $li = $parent.parents('li');
				// 마지막 그리드만 width 조정
				if(i == verti.length-1){
					
					hiddenResizeWidth(verti,obj,i);
				}
				resizeWidth(obj)
				resizeHeight(obj)
				
			})
		}
		//수직없이 수평만 여러개일 경우 마지막 그리드만 width 조정,전체 height 조정
		else if(hori.length > 0 && verti.length==0){
			$.each(hori,function(i,obj){
				if(hori.length-1 == i){
					hiddenResizeHeight(hori,obj,i);
// 					resizeHeight(obj)
				}
				resizeWidth(obj)
// 				resizeHeight(obj)
			})
		}else{
			
			$.each(hori,function(i,obj){
				if(hori.length-1 == i){
					hiddenResizeHeight(hori,obj,i);
// 					resizeHeight(obj)
				}
				resizeWidth(obj)
			})
			$.each(verti,function(i,obj){
				var $parent =obj.obj;
				var $li = $parent.parents('li');
				// 마지막 그리드만 width 조정
				if(i == verti.length-1){
					
					hiddenResizeWidth(verti,obj,i);
				}
				resizeHeight(obj)
				resizeWidth(obj)
				
			})
		}
		
		
		$.each(widthChange,function(k,obj){
			resizeWidth(obj)
		})
		
		
	};
	var hiddenResizeWidth=function(list, obj,i){
			
			if(list[i] = obj){
				if(!obj.hidden){
					resizeWidth(obj)		
				}else{
					resizeWidth(obj)
					hiddenResizeWidth(list, list[i-1],i-1)
				}
			}
	};
	var hiddenResizeHeight=function(list, obj,i){
		
		if(list[i] = obj){
			if(!obj.hidden){
				resizeHeight(obj)		
			}else{
				resizeWidth(obj)
				hiddenResizeHeight(list, list[i-1],i-1)
			}
		}
};
	var resizeHeight = function(obj){
		var $parent =  $(obj.obj).parents('div#'+$(obj.obj).prop('id').replace('table_',''));
		var $parents = $parent.parents('div#txt');
		 
		
		// x탭
		var $li = $parent.parents('li');
		var $opend_li; 
		$li.siblings().each(function(i,obj){
			var dis = $(obj).css('display');
			var hi = $(obj).hasClass('hide') ;
			if(dis != 'none' && !hi){
				$opend_li = $(obj)
			}
		})
		var display = $li.css('display');
		var hide = $li.hasClass('hide') ;
//				$parents.show();
		var height =  $parents.offset().top+ $parents.height()-$parent.offset().top
			
			if(hide || display=='none' ){
				
				$li.show().siblings().hide();
				height =  $parents.offset().top+ $parents.height()-$parent.offset().top
				$opend_li.show().siblings().hide()
			}
		
		
		
			var headHeight = $parent.find('.ui-jqgrid-hdiv').height()
			var pad= 30;
		
			
			if($parent.data('height')){
				height =$parent.data('height')	
				pad= 16
			}else{
				if(height < 180){ 
					height = 180;
				}else{
					if($parents.hasClass('ptx')){
						pad=56
					}	
				} 
			}
			
		
			$(obj.obj).setGridHeight(height-headHeight-pad);
	
			
//			
	};
	
	var resizeWidth =  function(obj){   
			var $parent = $(obj.obj).parents('div#'+$(obj.obj).prop('id').replace('table_',''));
			var $parents = $(obj.obj).parents('div.grid_event_apply');
			var width =  $parent.width();
// 			var $parents = $parent.parents('div#txt');
// 			var width =  $parents.offset().left+ $parents.width()-$parent.offset().left;
// 			var width =  $parent.width();
			
			 
			
			$(obj.obj).setGridWidth(width-2);
	};
	

</script>
</head>  
<body  id="wrap" >

	<tiles:insertAttribute name="HTML.BODY" />
 
<script type="text/javascript">
	$(document).ready(function(){resizeGrid()
		
	})
	
</script>
<div>
	<div id="loading" style="display: none;" class="loadingBar">
		<div  class="loadingwrap">
		</div>
		<div class="loadingbar "> 
			<img src="${imgPath}/common/loading.gif" alt="로딩중" />
		</div> 
	</div>
	<div id="loading1" style="display: none;" class="loadingBar"> 
		<div  class="loadingwrap">
		</div>
		<div class="loadingbar "> 
			<img src="${imgPath}/common/loading.gif" alt="로딩중"/>
		</div>
	</div>	
</div>
</body>
</html>