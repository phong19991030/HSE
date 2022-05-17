/*-------------------------------------------------
Author      :parkgahye
Create date :2020-02-11
-------------------------------------------------*/
$(document).ready(function() {
  $(window).trigger("resize");


  //select-box Process
  $('.search-wrapper .search-detail .select-box').on('change', 'select', function(e) {
    var val = $(e.target).val();
    $(this).siblings('label').attr('class', '');
    $(this).siblings('label').addClass('mark' + val);
  });

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

  $(".sensor-data-table-wrap").mCustomScrollbar({
    axis: "x",
    advanced: {
      autoExpandHorizontalScroll: true
    },
    theme: "minimal-dark",
    mouseWheelPixels: 300
  });
  $(".monitoring-turbine-scroll").mCustomScrollbar({
    axis: "x",
    advanced: {
      autoExpandHorizontalScroll: true
    },
    theme: "minimal-dark",
    mouseWheelPixels: 300
  });
  $(".graph-wrap-scroll").mCustomScrollbar({
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
  
  //setting
  $('.set-box .tree-lst li > a').on("click", function() {
    $(this).parent().addClass('active').siblings().removeClass('active');
  });
  $('.set-box .tree-lst .depth2 > li > a').on("click", function() {
    $(this).parent().addClass('active').siblings().removeClass('active');
  });
  $('.set-box .tree-lst .depth3 > li > a').on("click", function() {
    $(this).parent().addClass('active').siblings().removeClass('active');
  });
  $(".set-box .tree-lst-wrap").mCustomScrollbar({
    axis: "Y",
    mouseWheelPixels: 300
  });
  $(".setting-wrapper .base_grid_table").mCustomScrollbar({
    axis: "Y",
    mouseWheelPixels: 300
  });
  $(".setting-wrapper .set-box-wrap5 .set-box5 .analysis-write-wrap").mCustomScrollbar({
    axis: "Y",
    mouseWheelPixels: 300
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

$(window).resize(function() {
	
	console.log('resizing');
	

 //cms-map-info-wrap
  $(".cms-map-info-wrap-scroll").mCustomScrollbar({
    axis: "y",
    theme: "minimal-dark",
    mouseWheelPixels: 300
  });
  
});