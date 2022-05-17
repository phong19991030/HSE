/*-------------------------------------------------
Author      :parkgahye
Create date :2020-02-11
-------------------------------------------------*/
$(document).ready(function() {
  $(window).trigger("resize");

  //header gnb
  $('#header .t-side > ul > li.active-toggle-btn > a').click(function() {
    $(this).parent().toggleClass('active').siblings('.active-toggle-btn').removeClass('active');
    $('html').removeClass('all-menu-active');
  });
  $('#header .t-side > ul > li.t-side-notice > a').click(function() {
    $('#wrap').removeClass('select-machine-wrap-active');
  });
  $("#header .gnb li > a").click(function() {
    $(this).parents(".gnb").toggleClass("active");
    $(this).parent().addClass("active").siblings().removeClass("active");
    $("body").addClass("left-side-active1");
    $("body").removeClass("tree-active");
  });

  //tree-lst
  $('#nav .tree-lst li > a').on("click", function() {
    $(this).parent().addClass('active').siblings().removeClass('active');
    $(this).parent().siblings().children(".depth2").slideUp(300);
    $(this).siblings(".depth2").slideToggle(300);
  });
  $('#nav .tree-lst .depth2 > li > a').on("click", function() {
    $(this).parent().addClass("active");
    $(this).parent().siblings().removeClass("active");
    $(this).parent().siblings().children(".depth3").slideUp(300);
    $(this).siblings(".depth3").slideToggle(300);
    $(".other-lst").slideUp(300);
    $(".depth3").removeClass("active");
  });
  $('#nav .tree-lst .depth3 > li > a').on("click", function() {
    $("#nav .tree-lst .depth3 > li").removeClass('active');
    $(this).parent().addClass('active');
    $('body').addClass('tree-active');
  });
  $("#nav .tree-lst .depth2 > li.none-group .depth3 > li").addClass("other-lst");
  $("#nav .tree-lst .depth2 > li.none-group .depth3 > li:first-of-type").removeClass("other-lst");
  $("#nav .tree-lst .depth2 > li.none-group .depth3 > li:first-of-type > a").click(function() {
    $(this).parent().siblings(".other-lst").slideToggle(300);
    $(this).parent().parent(".depth3").toggleClass("active");
    $(this).parents(".depth3").parent().siblings().children(".depth3").slideUp(300);
  });

  var lastDepth = $("#nav .tree-lst > li:last-of-type .depth2 > li:last-of-type");
  lastDepth.append('<span class="hide-line"></span>');

  $(".left-side-close1").click(function() {
    $("body").toggleClass("left-side-active1");
  });
  $(".left-side-close2").click(function() {
    $("body").toggleClass("tree-active");
  });

  $("#nav .tree-lst-wrap").mCustomScrollbar({
    axis: "Y",
    mouseWheelPixels: 300
  });
  $(".channel-lst-wrap").mCustomScrollbar({
    axis: "Y",
    mouseWheelPixels: 300
  });


  //글줄임
  //  if ($('#header .notice-lst li > a.cont-wrap .cont').text().length > 130) {
  //    var textCut = $('#header .notice-lst li > a.cont-wrap .cont').text().substring(0, 130);
  //    $('#header .notice-lst li > a.cont-wrap .cont').html('<em class="substring">' + textCut + '</em>');
  //  }

  //글줄임 수정
  //  if ($('#header .notice-lst li > a.cont-wrap .cont')) {
  //	  var contents = $('#header .notice-lst li > a.cont-wrap .cont').toArray();
  //	  contents.forEach((e) => {
  //		  var text = e.textContent.length > 130 ? '<em class="substring">' + e.textContent.substring(0, 130) + '</em>' : e.textContent;
  //		  $('#' + e.id).html(text);
  //	  });
  //  }

  //notice-scroll
  $("#header .t-side-popup-scroll").mCustomScrollbar({
    axis: "Y",
    theme: "minimal-dark",
    mouseWheelPixels: 300
  });

  //lang select
  $('div.lang-select select#search_type').change(function() {
    var lang = $(this).val();
    window.location.href = '?lang=' + lang;
  });


  //all-menu
  $('.all-menu').click(function() {
    $('#header .t-side > ul > li.active-toggle-btn').removeClass('active');
    $('html').toggleClass('all-menu-active');
    $("body").removeClass("left-side-active1");
  });
  $('#nav .gnb-side a.login-toggle-btn').click(function() {
    $('.tree-lst-wrap').removeClass('active');
    $(this).addClass('active').siblings().removeClass('active');
  });

});

$(window).resize(function() {
  //header t-side
  if ($(window).width() > 1281 && !$('body').hasClass('gnb-none')) {
    $('#header .t-side > ul > li > a').click(function() {
      $('html').toggleClass('t-side-fixed');
    });
  }

  //all-menu
  if ($(window).width() < 768 || $(window).height() < 500) {
    $(".gnb-wrap").mCustomScrollbar({
      axis: "Y",
      theme: "minimal-dark",
      mouseWheelPixels: 300
    });
  } else {
    $(".gnb-wrap").mCustomScrollbar('destroy');
  }

  //header gnb fixed
  var headerOffset = $("#header").offset();
  if ($(document).scrollTop() > (headerOffset.top + 50)) {
    $('body').addClass("header-fixed");
    setTimeout(function() {
      $('body').addClass('header-fixed-ani');
    }, 200);
  } else {
    $('body').removeClass("header-fixed");
    setTimeout(function() {
      $('body').removeClass('header-fixed-ani');
    }, 200);
  }
  $(window).scroll(function() {
    if ($(document).scrollTop() > (headerOffset.top + 50)) {
      $('body').addClass("header-fixed");
      setTimeout(function() {
        $('body').addClass('header-fixed-ani');
      }, 200);
    } else {
      $('body').removeClass("header-fixed");
      setTimeout(function() {
        $('body').removeClass('header-fixed-ani');
      }, 200);
    }
  });

  if ($(window).width() <= 1280) {
    $('html').removeClass('all-menu-active');
  }

});
//responsive-alert
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
if (isMobile()) {
  //alert('모바일입니다.');
  $('.responsive-alert').css('display', 'block');
} else {
  //alert('pc입니다.');
  $('.responsive-alert').css('display', 'none');
}