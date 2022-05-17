/*-------------------------------------------------
Author      :parkgahye
Create date :2020-02-11
-------------------------------------------------*/
$(document).ready(function() {
  thumbResize(); //이미지비율조정
  layerPopup(); //레이어팝업
  initialControl(); //select-box custom
});


function initialControl() {
  //select-box custom
  $(".info-select").on('change', function() {
    var select_name = $(this).children('option:selected').text();
    $(this).siblings('label').text(select_name);
  });
  if ($(".info-select").length > 0) {
    $(".info-select").each(function() {
      if ($(this).find("option").length > 0) {
        var select_name = $(this).children('option:selected').text();
        $(this).siblings('label').text(select_name);
      }
    });
  }

  //focus style
  $('.input-group *').focus(function() {
    $(this).parent().addClass('focus');
  });
  $('.input-group *').focusout(function() {
    $(this).parent().removeClass('focus');
  });
  

}



//img resize
var thumbResize = function() {
  var divs = document.querySelectorAll('.imgcut .img');
  for (var i = 0; i < divs.length; ++i) {
    var div = divs[i];
    var divAspect = div.offsetHeight / div.offsetWidth;
    div.style.overflow = 'hidden';

    var img = div.querySelector('.imgcut .img > img');
    var imgAspect = img.height / img.width;

    if (imgAspect <= divAspect) {
      // 이미지가 div보다 납작한 경우 세로를 div에 맞추고 가로는 잘라낸다
      var imgWidthActual = div.offsetHeight / imgAspect;
      var imgWidthToBe = div.offsetHeight / divAspect;
      var marginLeft = -Math.round((imgWidthActual - imgWidthToBe) / 2)
      img.style.cssText = 'width: auto; height: 100%;'
    } else {
      // 이미지가 div보다 길쭉한 경우 가로를 div에 맞추고 세로를 잘라낸다
      img.style.cssText = 'width: 100%; height: auto;';
    }
  }
}

//layerPopup
function layerPopup() {
  var layer_btn = $(".popup-btn");
  var t;
  layer_btn.on("click", function(event) {
    event.preventDefault();
    t = $(this);
    $("#layerPopup").addClass('active');
    var href = t.attr("href");
    $(href).show();
  });
  $(".layer-close").on("click", function(event) {
    event.preventDefault();
    $(this).parents("#layerPopup").removeClass('active');
    //t.focus();
  });
}