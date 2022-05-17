/*-------------------------------------------------
Author      :parkgahye
Create date :2020-02-11
-------------------------------------------------*/
$(document).ready(function() {
  $(window).trigger("resize");
  
  $.ajax({
        url:'https://api.ipify.org?format=json',
        type: 'get',
        dataType:'json',
        async:true,
        success:function(data){
            console.log(data);
    		_CLIENT.CLIENT_IP = data.ip;
        }
    });

  //header category select
  $(document).on('click mouseenter', '.select-machine > li > a', function() {
    $(this).parents('.select-machine').addClass('fold').siblings().removeClass('fold');
  });
  $(document).on('click', '.select-machine > li > a', function() {
    $(this).parent().addClass('active').siblings().removeClass('active');
    $(this).parents('.select-machine').addClass('fold').siblings().removeClass('fold');
    $('#header .t-side > ul > li.active-toggle-btn').removeClass('active');
  });
  $(document).on('mouseleave', '.select-machine', function() {
    $(this).removeClass('fold');
  });
  $('#header .t-side > ul > li.active-toggle-btn > a').click(function() {
    $(this).parent().toggleClass('active').siblings('.active-toggle-btn').removeClass('active');
    $('html').removeClass('all-menu-active');
    
    // @JK - User info 창 닫기
    $('.t-side-userinfo .userinfo-cont').removeClass('active');
  });
  $('#header .t-side > ul > li.t-side-notice > a').click(function() {
    $('#wrap').removeClass('select-machine-wrap-active');
  });
  
  /* JK - 접속 클라이언트 정보 창 오픈 */
  // userinfo active
  $('.t-side-userinfo a').click(function () {
	$(this).parents('li').siblings('li').removeClass('active');
    $(this).siblings('.userinfo-cont').toggleClass('active');
    var info = $(this).siblings('.userinfo-cont');
    
    
    info.find('#CLIENT_IP').text(_CLIENT.CLIENT_IP); 
    info.find('#CLIENT_ID').text(_CLIENT.USER_ID + ' (' + _CLIENT.USER_NM + ')');
    info.find('#CLIENT_COMPANY').text(_CLIENT.COMPANY_NAME + ' (' + ['Operator', 'Manufacture', 'ISP', 'Consulting firm'][parseInt(_CLIENT.COMPANY_CLS)-1] + ')');
    info.find('#CLIENT_EMAIL').text(_CLIENT.EMAIL);
    info.find('#CLIENT_ADDRESS').text(_CLIENT.CLIENT_REGION + ' ' + _CLIENT.CLIENT_CITY);
    info.find('#CLIENT_TIMEZONE').text(_CLIENT.CLIENT_ACCESS_TIMEZONE + ' (' + _CLIENT.CLIENT_TIMEZONE_OFFSET + ')');
    info.find('#CLIENT_ACCESS_TIME').text(moment.tz(_CLIENT.LATE_ACCESS_TIME, 'UTC').tz(_CLIENT.CLIENT_ACCESS_TIMEZONE).format('YYYY-MM-DDTHH:mm:ss'));
    info.find('#CLIENT_PERMISSION').text(_CLIENT.ROLE_NM_LIST.replace(' | ', ', '));
    info.find('#CLIENT_LAST_PW_CHANGE_TIME').text(moment.tz(_CLIENT.LAST_UPDATE_DATETIME, 'UTC').tz(_CLIENT.CLIENT_ACCESS_TIMEZONE).format('YYYY-MM-DDTHH:mm:ss'));
  });
  

  //gnb
  $('#gnb .gnb-lst > li.gnb-menu > a').on("click", function() {
    $(this).parent().addClass('active').siblings().removeClass('active');
    $('body').addClass('gnb-active');
    $('body').removeClass('gnb-none');
  });
  $('#gnb .gnb-lst .depth2 > li > a').on("click", function() {
    $(this).parent().addClass('active').siblings().removeClass('active');
  });
  $('#gnb .gnb-lst  .depth3 > li > a').on("click", function() {
    $(this).parent().toggleClass('active').siblings().removeClass('active');
  });
  $('#gnb .gnb-lst > li.gnb-active-none > a').on("click", function() {
    $('body').removeClass('gnb-active');
    $('body').addClass('gnb-none');
  });
  $('.gnb-wrap').mouseleave(function() {
    $('.gnb-menu').removeClass('active');
  });
  if ($(window).width() < 1281) {
    $('body').removeClass('gnb-active');
  }
  if ($(window).width() >= 1281 && !$('body').hasClass('gnb-none')) {
    $('body').addClass('gnb-active');
  }
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
    $('#wrap').removeClass('select-machine-wrap-active');
    $('html').toggleClass('all-menu-active');
  });
  $('#gnb .gnb-side a.setting-btn').click(function() {
    $('.gnb-lst-wrap').toggleClass('active');
    $('#gnb .gnb-side a.setting-btn').toggleClass('active').siblings().removeClass('active');
  });
  $('.lang-select-lst > li > a').click(function() {
    $(this).parent().addClass('active').siblings().removeClass('active');
  });
  $('#gnb .gnb-side a.lang-btn').click(function() {
    $('.gnb-lst-wrap').removeClass('active');
    $(this).addClass('active').siblings().removeClass('active');
    $('#layerPopupLang').addClass('active');
  });
  $('.lang-btn-wrap > a').click(function() {
    $('#layerPopupLang').removeClass('active');
  });
  $('#gnb .gnb-side a.login-toggle-btn').click(function() {
    $('.gnb-lst-wrap').removeClass('active');
    $(this).addClass('active').siblings().removeClass('active');
  });
  $('#header .t-side > ul > li.t-side-pin > a').click(function() {
    $('#wrap').removeClass('select-machine-wrap-active');
    $(this).parent().addClass('active').siblings('.active-toggle-btn').removeClass('active');
  });

  //select-machine-btn
  $('.select-machine-btn').on('click', function() {
    $('#header .t-side > ul > li').removeClass('active');
    $('#wrap').toggleClass('select-machine-wrap-active');
  });
});

function changeLanguage() {
  var lang = $('#layerPopupLang ul.lang-select-lst > li.active').attr('lang');
  window.location.href = '?lang=' + lang;
}

$(window).resize(function() {
  //header t-side
  if ($(window).width() > 1281 && !$('body').hasClass('gnb-none')) {
    $('#header .t-side > ul > li > a').click(function() {
      $('html').toggleClass('t-side-fixed');
    });
    $('body').addClass('gnb-active');

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

  if ($(window).width() < 768) {
    $('#gnb .gnb-lst > li > a').on("click", function() {
      $(this).parent().addClass('on').siblings().removeClass('on');
    });
  } else {
    $('#gnb .gnb-lst > li > a').on("click", function() {
      $(this).parent().addClass('on').siblings().removeClass('on');
    });
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