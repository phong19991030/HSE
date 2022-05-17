/*-------------------------------------------------
Author      :parkgahye
Create date :2020-02-11
-------------------------------------------------*/
$(document).ready(function() {
  $(window).trigger("resize");
  selectLst();

  //gnb
  $('#gnb .gnb-lst > li > a').on("click", function() {
    $(this).parent().addClass('active').siblings().removeClass('active');
  });

  $('#newsletterInput').on('input', function() {
    if ($('#newsletterInput').val() == '') {
      $('#send-btn').attr('disabled', true);
    } else {
      $('#send-btn').attr('disabled', false);
      $('#send-btn').css('color', '#29b7c6');
    }
  });
  $(".gnb-wrap .gnb-lst2").mCustomScrollbar({
    axis: "Y",
    theme: "minimal-dark",
    mouseWheelPixels: 300
  });


  //all-menu
  $('.all-menu').click(function() {
    $('body').toggleClass('all-menu-active');
  });

  $('.gnb-wrap').mCustomScrollbar({
    axis: "Y",
    theme: "minimal-dark",
    mouseWheelPixels: 300
  });


});
$(window).on('load', function() {
  runLogo = new logoWebbab();
  runLogo.init();

  //header gnb fixed
  var headerOffset = $("#header").offset();
  if ($(document).scrollTop() > (headerOffset.top + 100)) {
    $('body').addClass("header-fixed");
  } else {
    $('body').removeClass("header-fixed");
  }
  $(window).scroll(function() {
    if ($(document).scrollTop() > (headerOffset.top + 100)) {
      $('body').addClass("header-fixed");
    } else {
      $('body').removeClass("header-fixed");
    }
  });
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


function logoWebbab() {
  var self = this;
  self.wrapperLogo = $('.logo-wrapper');
  self.svgLogo = $('#logo-webbab');
  self.isoLogo = $('#logo-webbab #sysmbol');
  self.rhombusLogo = $('.rhombus');
  self.wordLogo = $('.word');

  self.timer = 0.9;


  self.init = function() {

    if (!self.isDevice) {
      self.setObj();
      self.animation();
    } else {
      self.wrapperLogo.empty().append(self.mobileLogo);
    }

  };

  self.setObj = function() {

    TweenMax.set(self.isoLogo, {
      attr: {
        rx: 50,
        ry: 50
      },
      transformOrigin: "50% 50%",
      rotation: 120,
      scale: 0,
      autoAlpha: 1
    });
  };

  self.animation = function() {

    //TweenMax.ticker.fps(60);

    // SCENES

    function rhombusRotation() {
      var tl = new TimelineMax();
      tl.to(self.isoLogo, 0.6, {
          autoAlpha: 1,
          scale: 1,
          ease: Power1.easeIn
        })
        .to(self.isoLogo, 0.6, {
          attr: {
            rx: 15,
            ry: 15
          },
          rotation: 360,
          ease: Power1.easeOut
        });
      return tl;
    }

    function textAnimation() {
      var tl = new TimelineMax();
      tl.staggerFromTo(self.wordLogo, 1.5, {
        autoAlpha: 0,
        scale: 0.8,
        x: -20,
        transformOrigin: "left center",
        ease: Elastic.easeOut.config(1, 0.3)
      }, {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        ease: Elastic.easeOut.config(1, 0.5)
      }, 0.05);
      return tl;
    }

    // MASTER SCENES
    var master = new TimelineMax({
      // LOOP
      /*repeat: -1,
      repeatDelay: 0.5,
      yoyo: true*/

    });
    master //.add(pulseCircle(), "scene1")
      .add(rhombusRotation(), "scene2")
      .add(textAnimation(), "-=0.5", "scene5");
    master.timeScale(self.timer);

  };
}

var runLogo;


//하단관련사이트
function selectLst() {
$(".select-lst-wrap").mCustomScrollbar({
	theme: "minimal-dark"
});
var relate_param = $(".category-select-lst");
var relate_obj = relate_param.find(".select-lst-wrap");
var relate_btn = relate_param.find("dt > a");
var textCut = $('.select-lst-option > ul > li:first-of-type >  a').text();
$(relate_btn).children('span').html(textCut);

setTimeout(function() {
  //relate_obj.slideUp();
}, 100);
relate_obj.hide();
relate_btn.on("click", function(event) {
  event.preventDefault();
  var t = $(this);
  t.parent().toggleClass("fold");
  if (t.parent().next('.select-lst-wrap').css("display") == "none") {
    relate_btn.parent().removeClass("fold");
    t.parent().addClass("fold");
    relate_obj.stop(true, true).slideUp(300);
    t.parent().next('.select-lst-wrap').stop(true, true).slideDown(300);
  } else {
    t.parent().next('.select-lst-wrap').stop(true, true).slideUp(300);
  }
  return false;
});
relate_param.parent().on("mouseleave", function(event) {
  event.preventDefault();
  relate_btn.parent().removeClass("fold");
  relate_obj.stop(true, true).slideUp(300);
});
}