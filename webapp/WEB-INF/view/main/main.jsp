<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
  <link href="${ctxPath}/stylesheet/common/main.css" rel="stylesheet" type="text/css" media="all">

  <script type="text/javascript" src="${ctxPath}/script/common/main.js"></script>
       <!--main에만 들어가는 js-->
<!--       <script src="https://code.highcharts.com/stock/highstock.js"></script> -->
<!--       <script src="https://code.highcharts.com/stock/modules/data.js"></script> -->
<!--       <script src="https://code.highcharts.com/stock/modules/exporting.js"></script> -->
<!--       <script src="https://code.highcharts.com/stock/modules/export-data.js"></script> -->
      <script src="${ctxPath}/script/chart/highcharts.src.js"></script>
      

<style>

.box_res {
    position: initial;
    width: calc(100% - 20px) !important;
    height: auto !important; 
}

.outer_div_res{
	height: auto !important;
}
</style>
 <main id="main">
	<div class="box-layout-result" style="height:1500px;"></div>
	
 </main>
      


      <script type="text/javascript">
      var isMobile = false;
      var cellHeight = 250;
      $( window ).resize(function() {
    	  var width = $( window ).width();
    	  var height = $( window ).height();
    	  if(width/height <= 3/4){
    		  $('#main > .box-layout-result> div.box').addClass('box_res');
    		  $('#main > .box-layout-result').addClass('outer_div_res');

    		  isMobile = true;
    	  }else{
    		  $('#main > .box-layout-result> div.box').removeClass('box_res');
    		  $('#main > .box-layout-result').removeClass('outer_div_res');

    		  isMobile = false;
    	  }
		});
      

      var listWidgets = ${WIDGETS};
      $(document).ready(function() {
    	
    	  var width = $( window ).width();
    	  var height = $( window ).height();
    	  if(width/height <= 3/4){
    		  isMobile = true;
    	  }else{
    		  isMobile = false;
    	  }
    	  
          Highcharts.Renderer.prototype.symbols.line = function(x, y, width, height) {
      	    return ['M',x,y,'L',x+height,y];
      	};
        Highcharts.setOptions({
      	    colors: ['#486dfb', '#89898b'],
      	    legend: {
                  enabled: false
              },
              credits: {
                  enabled: false
              },
              tooltip: {
                  shared: true
              },
      	  });
    	  
          $('body').removeClass('gnb-active');
          $('body').addClass('gnb-none main-wrap');
          
          if(listWidgets && listWidgets.length > 0){
      		var rowNum =  listWidgets.length;
      		var colNum = 6;
      	   $('.box-layout-result').css('height', rowNum*cellHeight);
      		 var height = rowNum*cellHeight;
      		if(isMobile){
      			$('.box-layout-result').addClass('outer_div_res');
      		}
        	  listWidgets.forEach(function(obj, index){
                	  
                	  if(obj.USE_YN == 'Y'){
                		  var str = '<div class="box box_'+index+' '+(isMobile? 'box_res': '')+'" style="width: calc('+(obj.W*100/colNum)+'% - 20px); margin: 10px;top:'+(obj.Y*100/rowNum)+'%;left:'+(obj.X*100/colNum)+'%;height:'+(obj.H*height/rowNum - 20)+'px;"></div>';
                    	  $('.box-layout-result').append(str);
                     		 jQuery.ajax({
                  				url: CTX+ obj.URL,
                  				type: "GET",
                  				data: {'index': index},
                  				dataType: "html",
                  				async : true
                  			})
                  			.done(function(html){
                  				 $('.box-layout-result > div.box_'+index).empty().html(html);
// 								if(index == 6){
// 									if (typeof drawChart1 !== "function") { 
// 										console.log('error');
// 									}else{
// 										drawChart1();
// 									}
								
// 								}
								
                  				
                  				 if($('.box-layout-result > div.box_'+index+' table').length >0){
                   					$('.box-layout-result div.box_'+index+' .box-content').mCustomScrollbar({
                  						 axis:"yx",
                      					advanced: {
                      					autoExpandHorizontalScroll: true
                      					},
                      					theme: "minimal-dark",
                      					mouseWheelPixels: 300
                      				});
                  					 
                  				 }
                  				
                  			})
                  			.fail(function(data){
                  				ajaxerror(msg);
                  			});
                	  }
                	
        	  });
          if($('.box-layout-result .box').length <= 0){
        	  $('.box-layout-result').empty().append('<div style="text-align: center;">Please setting up your dashboard by click the button on header bar! <div>');
          }
          }
        });

      

      </script>
      <!--//main에만 들어가는 js-->