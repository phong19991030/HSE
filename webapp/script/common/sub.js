/*-------------------------------------------------
Author      :parkgahye
Create date :2020-02-11
-------------------------------------------------*/
$(document).ready(function() {
	$(window).trigger("resize");

	noConflict();
	graphXscroll();
	runAllGauges();


	//select-box Process
	$('.search-wrapper .search-detail .select-box').on('change', 'select', function(e) {
		var val = $(e.target).val();
		$(this).siblings('label').attr('class', '');
		$(this).siblings('label').addClass('mark' + val);
	});
	//  $('.search-form-wrap .search-wrapper').mouseleave(function() {
	//	  $('.search-wrapper').removeClass('active');
	//  });

	//비활성화 요소 페이지 이동 방지
	$(document).on('click', '.disable-tab', function() {
		return false;
	});
	$(document).on('click', '.disable-btn', function() {
		return false;
	});

	//tab
	$('.tab2 > li > a').click(function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
	});

	//Sensor Data
	$('.sensor-data-btn-modify').click(function() {
		$(this).parents('.sensor-table-default').addClass('sensor-table-default-active');
	});
	$('.sensor-data-btn-complete').click(function() {
		$(this).parents('.sensor-table-default').removeClass('sensor-table-default-active');
	});
	$(".sensor-data-table-wrap").mCustomScrollbar({
		axis: "x",
		advanced: {
			autoExpandHorizontalScroll: true
		},
		theme: "minimal-dark",
		mouseWheelPixels: 300
	});
	$(".sensor-data-table-wrap .sensor-table-wrap.sensor-table-wrap-m").mCustomScrollbar({
		axis: "Y",
		theme: "minimal-dark",
		mouseWheelPixels: 300
	});
	$('.sensor-table-wrap .base_grid_table tr td > a').click(function() {
		$(this).parents('tr').addClass('focus').siblings().removeClass('focus');
	});

	//layer popup
	$("#layerPopup.layer-popup-wtg-compare .layer-popup-menu-lst-scroll").mCustomScrollbar({
		axis: "Y",
		theme: "minimal-dark",
		mouseWheelPixels: 300
	});
	$("#layerPopup .layer-cont").mCustomScrollbar({
		axis: "Y",
		theme: "minimal-dark",
		mouseWheelPixels: 300
	});
	$('.layer-menu-btn').click(function() {
		$('.layer-popup-menu').toggleClass('active');
	});
	$('#layerPopup.layer-popup-wtg-compare .wtg-company-lst > li .blank-info').click(function() {
		$('.select-turbine-pop').addClass('active');
	});
	$('.select-turbine-pop-close').click(function() {
		$('.select-turbine-pop').removeClass('active');
	});
	$("#layerPopup.layer-popup-permission .layer-cont .base_grid_table").mCustomScrollbar({
		axis: "Y",
		theme: "minimal-dark",
		mouseWheelPixels: 300
	});
	
	
	//scroll custom
	//@JK - Maintenance Code, Part Code 스크롤
//	  $(".registration-scoll").mCustomScrollbar({
//		    axis: "y",
//		    advanced: {
//		      autoExpandHorizontalScroll: true
//		    },
//		    theme: "minimal-dark",
//		    mouseWheelPixels: 300
//		  });
	  
	//plan-lst 
	$('.plan-lst > li .plan-lst-info-wrap .checkbox-radio-custom input[type="radio"] + label').click(function() {
		$(this).parents('.plan-lst > li').addClass('active').siblings().removeClass('active');
	});
	
	$('.plan-lst > li .plan-lst-info-wrap .new-checkbox-custom input[type="radio"] + label').click(function() {
		$(this).parents('.plan-lst > li').addClass('active').siblings().removeClass('active');
	});
	
	//img-viewer-lst
	$('.img-viewer-lst').bxSlider({
		auto: true,
		pager: true,
		controls: false,
		pause: 5000
	});

	//  $('.cms-dash-board .cms-dashboard-btn').click(function() {
	//    $('.cms-dash-board').toggleClass('cms-dash-board-active');
	//  });

	//table 말풍선
	if ($('.base_grid_table td > div.subject').text().length > 150) {
		var txt = $('.base_grid_table td > div.subject').text();
		$('.base_grid_table td > div.subject').html('<span class="txt-wrapper"><span class="txt-wrap">' + txt + '</span></span>');
	}
	if ($('.base_grid_table td > div').hasClass('subject')) {
		var txt = $('.base_grid_table td  > div.subject .txt-wrap').text();
		$('.base_grid_table td > div.subject .txt-wrap').after('<span class="bubble-txt">' + txt + '</span>');
	}

	//view-all-info
	$('.view-all-info').click(function() {
		$(this).parent('.cms-map-info-wrap').toggleClass('active');
	});
	$('.graph-bar').each(function() {
		var dataWidth = $(this).data('value');
		$(this).css("width", dataWidth + "%");
	});
	var dataNum = $('.line-chart1 .graph-bar').data('value');
	$('.line-chart1 .percent').html(dataNum);

	var dataNum = $('.line-chart2 .graph-bar').data('value');
	$('.line-chart2 .percent').html(dataNum);

	var dataNum = $('.line-chart3 .graph-bar').data('value');
	$('.line-chart3 .percent').html(dataNum);

	//글줄임
	if ($('.mobile-info-lst > li > a .cont').text().length > 130) {
		var textCut = $('.mobile-info-lst > li > a .cont').text().substring(0, 130);
		$('.mobile-info-lst > li > a .cont').html('<em class="substring">' + textCut + '</em>');
	}

	$('.scada-alarm-mobile .mobile-info-btn-lst li').each(function() {
		if ($(this).children().find('.tit span').text().length > 10) {
			var textCut = $(this).children().find('.tit span').text().substring(0, 10);
			$(this).children().find('.tit span').html('<em class="substring">' + textCut + '</em>');
		}
	});
	
	//total view monitor-lst btn 
	$('.monitor-lst > li').bind('click', function(){
		$(this).toggleClass('active');
	});
	
	//total view monitor-lst
	$(".monitor-lst").mCustomScrollbar({
		axis: "x",
		advanced: {
			autoExpandHorizontalScroll: true
		},
		theme: "minimal-dark",
		mouseWheelPixels: 300
	});
	
	//scroll-top
	$(window).scroll(function(){
		
		var scrollTop = $(document).scrollTop();//스크롤위치가져오기
		var pos = $(".progress-wrap").offset();//위치를 변수에 넣어줌
		
		if(!pos) return;
		
		if(scrollTop >= pos.top) {
			$(".progress-wrap > ul.progress-box").addClass('active');
		}
		else if(scrollTop < pos.top) {
			$(".progress-wrap > ul.progress-box").removeClass('active');
		}
	});

});

//graphXscroll
var graphXscroll = function() {
	var popupWidth = $('#layerPopup.layer-popup-wtg-compare .layer-cont').width();
	var xscrollWidth = $('#layerPopup.layer-popup-wtg-compare .x-scroll .x-scroll-cont').width();
	var xscroll = $('#layerPopup.layer-popup-wtg-compare .x-scroll');
	if (xscrollWidth > popupWidth) {
		$(xscroll).mCustomScrollbar({
			axis: "x",
			advanced: {
				autoExpandHorizontalScroll: true
			},
			theme: "minimal-dark",
			mouseWheelPixels: 300
		});
	}
}

$(window).on('load', function() {
	//system-right fixed
	var headerOffset = $("#header").offset();
	if ($(document).scrollTop() > (headerOffset.top + 150)) {
		$("body").addClass("system-right fixed");
	}
	$(window).scroll(function() {
		if ($(document).scrollTop() > (headerOffset.top + 150)) {
			$("body").addClass("system-right fixed");

		} else {
			$("body").removeClass("system-right fixed");
		}
	});
});
$(window).resize(function() {

	console.log('resizing', $(window).width());
	
	if ($(window).width() <= 1500) {
		// 대쉬보드 사이드 창 오픈
		$('#map_side').addClass('cms-dash-board-active');
	}

	//  if ($(window).width() <= 1280) {
	//    $('.cms-map-wrap5 + .cms-map-info-wrap.cms-dash-board .base_grid_table').mCustomScrollbar({
	//      axis: "x",
	//      advanced: {
	//        autoExpandHorizontalScroll: true
	//      },
	//      theme: "minimal-dark",
	//      mouseWheelPixels: 300
	//    });
	//  }
	//  else{
	//	  $(".cms-map-wrap5 + .cms-map-info-wrap.cms-dash-board .base_grid_table").mCustomScrollbar('destroy');
	//  }
	//
	//  $(".cms-dash-board .gauge-wrapper-scroll").mCustomScrollbar({
	//    axis: "x",
	//    advanced: {
	//      autoExpandHorizontalScroll: true
	//    },
	//    theme: "minimal-dark",
	//    mouseWheelPixels: 300
	//  });
	//  $(".cms-dash-board .schedules-wrapper").mCustomScrollbar({
	//    axis: "x",
	//    advanced: {
	//      autoExpandHorizontalScroll: true
	//    },
	//    theme: "minimal-dark",
	//    mouseWheelPixels: 300
	//  });
	//  
	//  // alarm-list-wrapper
	//  $(".alarm-list-wrapper .base_grid_table").mCustomScrollbar({
	//    axis: "y",
	//    advanced: {
	//      autoExpandHorizontalScroll: true
	//    },
	//    theme: "minimal-dark",
	//    mouseWheelPixels: 300
	//  });
	//
	//  //cms-map-info-wrap
	//  $(".cms-map-info-wrap-scroll").mCustomScrollbar({
	//    axis: "y",
	//    theme: "minimal-dark",
	//    mouseWheelPixels: 300
	//  });


});

//첨부파일 custom

var noConflict = function() {
	
	var fakeField = $('.fake-field-file');
	var inputFile = $('.field-file');

	var multi = $('.field-file').attr('multiple') == 'multiple' || $('.field-file').attr('multiple') == true ? true : false;
	inputFile.change(function() {
		
		// @JK 딴데 피해 안가게 하자 ㅡ
		if(this.baseURI.indexOf("oam2") > -1) return;
		if(this.baseURI.indexOf("sys_new") > -1) return;
		
		if (multi) {
			var baseURI = this.baseURI;
			if (baseURI.indexOf("oam_0201") != -1) {
				var content = this.id.split('_')[2];
				// 파일이 여러개일 경우
				var fileInput = document.getElementById("file_list_" + content);
				if (fileInput.files.length >= 2) {
					var files = fileInput.files;
					var file = [];
					for (var i = 0; i < files.length; i++) {
						file.push(files[i].name);
						var html = '<li><span class="path-fiie-detail"><strong class="file-name">' + files[i].name + '</strong>';
						html += '<strong class="file-info"><span class="input-group"><label for="FILE_INFO" class="sr-only"></label><input type="text" name="FILE_INFO_add' + content + i + '" id="FILE_INFO" placeholder=""></span></strong>';

						$("ul.path-file-" + content).html($("ul.path-file-" + content).html() + html);
					}

					var fileNameList = file.join(", ");
					$('.fake-field-file-' + content).empty().text(fileNameList);
				} else {
					// 파일이 하나인경우
					var filename = fileInput.files;

					var html = '<li><span class="path-fiie-detail"><strong class="file-name">' + filename[0].name + '</strong>';
					html += '<strong class="file-info"><span class="input-group"><label for="FILE_INFO" class="sr-only"></label><input type="text" name="FILE_INFO_add' + content + '" id="FILE_INFO" placeholder=""></span></strong>'

					$("ul.path-file-" + content).html($("ul.path-file-" + content).html() + html);

					$('.fake-field-file-' + content).empty().text(filename[0].name);

				}
			} else if (baseURI.indexOf("oam_0203") != -1) {
				// 파일이 여러개일 경우
				var content = this.id.split('-')[2];
				var fileInput = document.getElementById("file-list-" + content);
				if (fileInput.files.length >= 2) {
					var files = fileInput.files;
					var file = [];
					for (var i = 0; i < files.length; i++) {
						file.push(files[i].name);
						var html = '<li><span class="path-fiie-detail"><strong class="file-name">' + files[i].name + '</strong>';
						html += '<strong class="file-info"><span class="input-group"><label for="FILE_INFO" class="sr-only"></label><input type="text" name="DESCRPT" id="FILE_INFO" placeholder=""></span></strong>';

						$("ul.path-file").html($("ul.path-file").html() + html);
					}

					var fileNameList = file.join(", ");
					fakeField.empty().text(fileNameList);
				} else {
					// 파일이 하나인경우
					var filename = $(".field-file").val();

					var html = '<li><span class="path-fiie-detail"><strong class="file-name">' + filename + '</strong>';
					html += '<strong class="file-info"><span class="input-group"><label for="FILE_INFO" class="sr-only"></label><input type="text" name="DESCRPT" id="FILE_INFO" placeholder=""></span></strong>'

					$("ul.path-file").html($("ul.path-file").html() + html);

					fakeField.empty().text(filename);
				}
			} else {
				// 파일이 여러개일 경우
				var fileInput = document.getElementById("file-list");
				if (fileInput.files.length >= 2) {
					var files = fileInput.files;
					var file = [];
					for (var i = 0; i < files.length; i++) {
						file.push(files[i].name);
						var html = '<li><span class="path-fiie-detail"><strong class="file-name">' + files[i].name + '</strong>';
						html += '<strong class="file-info"><span class="input-group"><label for="FILE_INFO" class="sr-only"></label><input type="text" name="FILE_INFO" id="FILE_INFO" placeholder=""></span></strong>';

						$("ul.path-file").html($("ul.path-file").html() + html);
					}

					var fileNameList = file.join(", ");
					fakeField.empty().text(fileNameList);
				} else {
					// 파일이 하나인경우
					var filename = $(".field-file").val();

					var html = '<li><span class="path-fiie-detail"><strong class="file-name">' + filename + '</strong>';
					html += '<strong class="file-info"><span class="input-group"><label for="FILE_INFO" class="sr-only"></label><input type="text" name="FILE_INFO" id="FILE_INFO" placeholder=""></span></strong>'

					$("ul.path-file").html($("ul.path-file").html() + html);

					fakeField.empty().text(filename);
				}
			}
		} else {
			var filename = $(".field-file").val();
			fakeField.empty().text(filename);
		}
	});
}
/*
var noConflict1 = function() {
  var fakeField = $('.fake-field-file');
  var inputFile = $('.field-file');
  inputFile.change(function() {
	  
	  var baseURI = this.baseURI;
	  
	  var multi = $('.field-file').attr('multi-input-file') == true? true: false;
	  
	  console.log(this.baseURI.indexOf("sys_0501"));
	  // WTG INSPECTION (oam0201) 에서 사용하는 첨부 파일 처리
	  if(baseURI.indexOf("oam_0201") != -1){
		  var content = this.id.split('_')[2];
	
			// 파일이 여러개일 경우
			var fileInput = document.getElementById("file_list_" + content);
			if(fileInput.files.length >= 2){
				var files = fileInput.files;
				var file = [];
				for(var i = 0; i < files.length; i++){
					file.push(files[i].name);
					var html  = '<li><span class="path-fiie-detail"><strong class="file-name">' + files[i].name + '</strong>';
					html += '<strong class="file-info"><span class="input-group"><label for="FILE_INFO" class="sr-only"></label><input type="text" name="FILE_INFO_' + content + i + '" id="FILE_INFO" placeholder=""></span></strong>';
					
					$("ul.path-file-" + content).html($("ul.path-file-" + content).html() + html);
				}
			    
				var fileNameList = file.join(", ");
				$('.fake-field-file-' + content).empty().text(fileNameList);
			}
			else{
				// 파일이 하나인경우
				var filename = fileInput.files;
			
				var html  = '<li><span class="path-fiie-detail"><strong class="file-name">' + filename[0].name + '</strong>';
				html += '<strong class="file-info"><span class="input-group"><label for="FILE_INFO" class="sr-only"></label><input type="text" name="FILE_INFO" id="FILE_INFO" placeholder=""></span></strong>'
				
				$("ul.path-file-" + content).html($("ul.path-file-" + content).html() + html);
				
				$('.fake-field-file-' + content).empty().text(filename[0].name);
			}
	  }else if(baseURI.indexOf("sys_0501") != -1 || baseURI.indexOf("sys_0303") != -1){ // sys_0501
			// 파일이 하나인경우
			var filename = $(".field-file").val();
			
			var html  = '<li><span class="path-fiie-detail"><strong class="file-name">' + filename + '</strong>';
			html += '<strong class="file-info"><span class="input-group"><label for="FILE_INFO" class="sr-only"></label><input type="text" name="FILE_INFO" id="FILE_INFO" placeholder=""></span></strong>'
			
			$("ul.path-file").html($("ul.path-file").html() + html);
			
			fakeField.empty().text(filename);
	  }else{
	  
		// 파일이 여러개일 경우
		var fileInput = document.getElementById("file-list");
		if(fileInput.files.length >= 2){
			var files = fileInput.files;
			var file = [];
			for(var i = 0; i < files.length; i++){
				file.push(files[i].name);
				var html  = '<li><span class="path-fiie-detail"><strong class="file-name">' + files[i].name + '</strong>';
				html += '<strong class="file-info"><span class="input-group"><label for="FILE_INFO" class="sr-only"></label><input type="text" name="FILE_INFO_' + i + '" id="FILE_INFO" placeholder=""></span></strong>';
				
				$("ul.path-file").html($("ul.path-file").html() + html);
			}
		    
			var fileNameList = file.join(", ");
			fakeField.empty().text(fileNameList);
		}else{
			// 파일이 하나인경우
			var filename = $(".field-file").val();
			
			var html  = '<li><span class="path-fiie-detail"><strong class="file-name">' + filename + '</strong>';
			html += '<strong class="file-info"><span class="input-group"><label for="FILE_INFO" class="sr-only"></label><input type="text" name="FILE_INFO" id="FILE_INFO" placeholder=""></span></strong>'
			
			$("ul.path-file").html($("ul.path-file").html() + html);
			
			fakeField.empty().text(filename);
		}
	  }
  });
}*/

function runAllGauges() {
	var gauges = $('.gauge-cont');
	$.each(gauges, function(i, v) {
		var self = this;
		setTimeout(function() {
			setGauge(self);
		}, i * 700);
	});
}

function resetGauge(gauge) {
	var spinner = $(gauge).find('.spinner');
	var pointer = $(gauge).find('.pointer');
	$(spinner).attr({
		style: 'transform: rotate(0deg)'
	});
	$(pointer).attr({
		style: 'transform: rotate(-90deg)'
	});
}

function setGauge(gauge) {
	var percentage = $(gauge).data('percentage') / 100;
	var degrees = 180 * percentage;
	var pointerDegrees = degrees - 90;
	var spinner = $(gauge).find('.spinner');
	var pointer = $(gauge).find('.pointer');
	var pointerNum = $(gauge).find('.gauge-num');

	//cms dashboard number
	var gaugeNum = $(gauge).find('.gauge-num');
	var percentageNum = $(gauge).data('percentage');

	var value = $(gauge).data('value');


	$(gaugeNum).prop('Counter', 0).animate({
		Counter: percentageNum
	}, {
		duration: 500,
		easing: 'swing',
		step: function(now) {
			//$(this).text(Math.ceil(now));
			$(this).text(value);
		},
		complete: percentageNum
	});


	$(spinner).attr({
		style: 'transform: rotate(' + degrees + 'deg)'
	});
	$(pointer).attr({
		style: 'transform: rotate(' + pointerDegrees + 'deg)'
	});
	$(pointerNum).attr({
		style: 'transform: rotate(' + - +pointerDegrees + 'deg)'
	});
}