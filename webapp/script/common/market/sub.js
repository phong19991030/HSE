/*-------------------------------------------------
Author      :parkgahye
Create date :2020-02-11
-------------------------------------------------*/
$(document).ready(function() {
  initScrollMagic(); // 스크롤매직	 

  //글줄임
  $('.board-lst > li').each(function() {
    if ($(this).children().find('.ellipsis-ext').text().length > 30) {
      var textCut = $(this).children().find('.ellipsis-ext').text().substring(0, 30);
      $(this).children().find('.ellipsis-ext').html('<em class="substring">' + textCut + '</em>');
    }

    if ($(this).children().find('.ellipsis-ext-sub').text().length > 70) {
      var textCut = $(this).children().find('.ellipsis-ext-sub').text().substring(0, 70);
      $(this).children().find('.ellipsis-ext-sub').html('<em class="substring">' + textCut + '</em>');
    }
  });

  //layerpop scroll
  $("#layerPopup .layer-cont .cont-wrap .conts").mCustomScrollbar({
    axis: "Y",
    theme: "minimal-dark",
    mouseWheelPixels: 300
  });
  $("#layerPopup .related-add .related-add-lst-wrap").mCustomScrollbar({
    axis: "Y",
    theme: "minimal-dark",
    mouseWheelPixels: 300
  });

  //.with-us
  $('.with-us .txt').mouseover(function() {
    gsap.to(".with-us .txt > i", {
      duration: 3,
      rotationY: 360
    });
  });
  $('.with-us .txt').mouseleave(function() {
    gsap.to(".with-us .txt > i", {
      duration: 3,
      rotationY: 0
    });
  });



  var cards = $('.board-lst > li .img > img');
  cards.each((index, card) => {
    $(card).parent('.img').prepend("<div class='shineLayer'></div>")
  });

  $(".board-lst > li .img").mousemove(function(e) {
    var card = $(this).children('img');
    var mouseCoord = {
      x: event.offsetX,
      y: event.offsetY
    };
    //cleanup
    mouseCoord.x = mouseCoord.x < 0 ? 0 : mouseCoord.x;
    mouseCoord.x = mouseCoord.x > $(card).width() ? $(card).width() : mouseCoord.x;
    mouseCoord.y = mouseCoord.y < 0 ? 0 : mouseCoord.y;
    mouseCoord.y = mouseCoord.y > $(card).height() ? $(card).height() : mouseCoord.y;

    var transformCard = "translate(-50%, -50%)";
    transformCard += " ";
    //rotateX between -9 and +9
    transformCard += "rotateX(" + ((((mouseCoord.y / $(card).height()) * 18) - 9)) + "deg)";
    transformCard += " ";
    //rotateY between -13 and +13
    transformCard += "rotateY(" + ((((mouseCoord.x / $(card).width()) * 20) - 13) * -1) + "deg)";

    transformCard += " ";
    //translateX between -3 and +3
    transformCard += "translateX(" + (((mouseCoord.x / $(card).width()) * 6) - 3) + "px)";
    transformCard += " ";
    //translateY between -5 and +5
    transformCard += "translateY(" + (((mouseCoord.y / $(card).height()) * 20) - 5) + "px)";

    $(card).css("transform", transformCard);

    //opacity of ShineLayer between 0.1 and 0.4
    var backgroundShineLayerOpacity = ((mouseCoord.y / $(card).height()) * 0.4) + 0.1;
    //bottom=0deg; left=90deg; top=180deg; right=270deg;
    var backgroundShineLayerDegree = (Math.atan2(mouseCoord.y - ($(card).height() / 2), mouseCoord.x - ($(card).width() / 2)) * 180 / Math.PI) - 90;
    backgroundShineLayerDegree = backgroundShineLayerDegree < 0 ? backgroundShineLayerDegree += 360 : backgroundShineLayerDegree
    var backgroundShineLayer = "linear-gradient(" + backgroundShineLayerDegree + "deg, rgba(255,255,255," + backgroundShineLayerOpacity + ") 0%, rgba(255,255,255,0) 80%)";
    $(card).parent().find(".shineLayer").css("background", backgroundShineLayer);
  });

  $(".board-lst > li > a").mouseleave(function(e) {
    var card = $(this).children().find('img');
    $(card).css("transform", "");
    $(card).parent().find(".shineLayer").css("background", "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 80%)");
  });
});


//스크롤매직
var controller = new ScrollMagic.Controller();

function initScrollMagic() {
  new ScrollMagic.Scene({
      triggerElement: '#section1',
      offset: -250
    })
    //.addIndicators()
    //.reverse(false)
    .setClassToggle('#section1', 'fade-in')
    .addTo(controller);

  new ScrollMagic.Scene({
      triggerElement: '#section2',
      offset: -200
    })

    //.addIndicators()
    .setClassToggle('#section2', 'fade-in')
    .addTo(controller);

  new ScrollMagic.Scene({
      triggerElement: '#section3',
      offset: -200
    })

    //.addIndicators()
    .setClassToggle('#section3', 'fade-in')
    .addTo(controller);


  new ScrollMagic.Scene({
      triggerElement: '#section4',
      offset: -100
    })

    //.addIndicators()
    .setClassToggle('#section4', 'fade-in')
    .addTo(controller);

  new ScrollMagic.Scene({
      triggerElement: '#section5',
      offset: -200
    })

    //.addIndicators()
    .setClassToggle('#section5', 'fade-in')
    .addTo(controller);
}