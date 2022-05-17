/*-------------------------------------------------
Author      :parkgahye
Create date :2020-03-23
-------------------------------------------------*/
$(document).ready(function() {
  $(window).trigger("resize");
  //scroll custom
  $(".set-menu-lst-scroll").mCustomScrollbar({
    axis: "Y",
    theme: "minimal-dark",
    mouseWheelPixels: 300
  });

  //mouseon action
  $('.set-dashboard-layout.set-empty').mouseover(function() {
    $(this).addClass('active');
  });
  $('.set-dashboard-layout.set-empty').mouseleave(function() {
    $(this).removeClass('active');
  });

  //layerpopup - add list

  $('#layerPopupAddLst .layer-add-list-close').click(function() {
    $('#layerPopupAddLst').removeClass('active');
  });

  //icon-lst
  $('.icon-lst > li > a').click(function() {
    $(this).parent().addClass('active').siblings().removeClass('active');
  });
});


$(window).resize(function() {
  if ($('.box-layout-result .box-cont').width > 620) {
    //scroll custom
    $(".box-layout-result .box-content").mCustomScrollbar({
      axis: "x",
      advanced: {
        autoExpandHorizontalScroll: true
      },
      theme: "minimal-dark",
      mouseWheelPixels: 300
    });
  }
});