
/**
*
* SG UI 
*
*/

(function($) {
	/**
	 * 
	 * Simple ProgressBar
	 */ 
	$.fn.sgProgressBar = function(options) {
		//1) 변수선언
		var _color_status_class = "progressbar-color-green";
		var _bar_width = 0;
		var _label_width = 50;

		//2) 옵션 - 사용자가 지정한 options적용
		var opts = $.extend({}, $.fn.sgProgressBar.defaults , options);
		
		//var _label_len = (opts.value + opts.unit).length;
		//_label_width = _label_len * 9;
		
		_bar_width = opts.width;
		
		
		//3) 기능
		return this.each(function() {//selector가 복수의 대상을 찾은 경우를 대비해서 each처리
			var $target = $(this);

			//3-1) css적용
			$target.addClass("progressbar-wrapper");
			$target.css("width", (_bar_width + _label_width + 2));
			
			//3-2) label 추가
			var $progressbar_label = $("<span class='progressbar-label'>" + opts.value + opts.unit + "</span>");
			$progressbar_label.css("width", _label_width);
			$progressbar_label.addClass("color_status_"+opts.warn);//상태적용(라벨-글자색)
			$progressbar_label.appendTo($target);
			
			//3-3) progressbar track
			var $progressbar_track = $("<div class='progressbar-track'></div>");
			$progressbar_track.css("width", _bar_width);

			_color_status_class = "progressbar-color_"+opts.warn;//상태적용(바-배경색)
			var $progressbar_value = $("<div class='"+_color_status_class+"'></div>");
			var percent_width = (Number(opts.value) - opts.percentWidth) + '%';//표시가 잘나도록 -2 해줌
			$progressbar_value.css("width", percent_width);
			$progressbar_value.animate({"width" : percent_width}, {queue : false, duration : 3000});
			
			//var $progressbar_mask = $("<div class='progressbar-mask-right'></div><div class='progressbar-mask-left'></div>");
			
			var $progressbar_mask = $("<div class='progressbar-mask'></div>");
			//}
			$progressbar_value.appendTo($progressbar_track);
			$progressbar_mask.appendTo($progressbar_track);
			
			$progressbar_track.appendTo($target);
		});
		
	};
	
	//progressbar default options
	//$.fn.sgProgressBar.defaults = {width:60, value:0, unit:'%', warn:{start:50,end:50}, reverse:false, percentWidth:2};
	$.fn.sgProgressBar.defaults = {width:60, value:0, unit:'%', warn:'1', reverse:false, percentWidth:2};
	

	/**
	 * 
	 * Round Box
	 */ 
	$.fn.sgRoundBox = function(options) {
		//1) 변수선언

		//2) 옵션 - 사용자가 지정한 options적용
		var opts = $.extend({}, $.fn.sgRoundBox.defaults , options);
		
		//3) 기능
		return this.each(function() {//selector가 복수의 대상을 찾은 경우를 대비해서 each처리
			
			var $target = $(this);

			//3-1) css적용
			if(opts.isSelected) {
				$target.addClass("roundbox_ov");
			}else{
				$target.addClass("roundbox");
			}
			$target.css("width", opts.width);
			
			//3-2) header 추가
			var $header = $("<tr><td class='tl'></td><td class='tbg'></td><td class='tr'></td></tr>");
			$header.appendTo($target);
			
			//3-3) body 추가
			var html = "<tr><td class='lbg'></td><td class='cont'><table style='width:100%'>";
				//title
				html += "<tr><td colspan='3' class='roundbox_title'>"+opts.title+"</td></tr>";
				
				//contents
				if(opts.data != null){
					//data = {label:'', value:number, status:'pass|warn|error'}
					
					for(var i = 0;i < opts.data.length;i++){
						html += "<tr>";
						html += "<td class='roundbox_label'>"+opts.data[i].label+"</td>";
						html += "<td>"+opts.data[i].value + opts.unit[i] + "</td>";
						html += "<td class='center'><p class='ico_status_"+opts.data[i].status+"'/></td>";
						html += "</tr>";
					}
					
				}
				html += "</table></td><td class='rbg'></td></tr>"; 
				
			var $body = $(html);
			$body.appendTo($target);
			
			//3-4) footer 추가
			var $footer = $("<tr><td class='bl'></td><td class='bbg'></td><td class='br'></td></tr>");
			$footer.appendTo($target);
		});
		
	};
	
	//roundbox default options
	$.fn.sgRoundBox.defaults = {title:'Title',data:[], unit:[], warn:[{start:50,end:50}], width:160, isSelected:false};
	
	
	/**
	 * 
	 * Log Pannel
	 */ 
	$.fn.sgLogPannel = function(options) {
		//1) 변수선언

		//2) 옵션 - 사용자가 지정한 options적용
		var opts = $.extend({}, $.fn.sgLogPannel.defaults , options);
		
		
		
		//3) 기능
		return this.each(function() {//selector가 복수의 대상을 찾은 경우를 대비해서 each처리
			
			var idx = 0;
			var $target = $(this);
			/*var html = "<table class='logbox'>";
				html += "<tr><td class='tl'></td><td class='tbg'></td><td class='tr'></td></tr>";
				html += "<tr><td class='lbg'></td>";
				html += "<td class='cont'><div class='logPannel' style='width:"+opts.width+";height:"+opts.height+";'>";
				html += "<table><tr id='top_tr'></tr></table>";
				html += "</div></td>";
				html += "<td class='rbg'></td></tr>";
				html += "<tr><td class='bl'></td><td class='bbg'></td><td class='br'></td></tr>";
				html += "</table>";*/
			var $table = $("<table><tr id='top_tr'></tr></table>");
			
			//3-1) css적용
			$target.addClass("logPannel");
			
			$target.css("width", opts.width);
			$target.css("height", opts.height);
			//3-2) 로그 테이블 추가
			$table.appendTo($target);
			//3-2) 로그 추가 및 limit이상의 로그 제거
		
			$target.bind("addLog", function(event, time, label, value) {
				//time의 표현 길이를 줄임
				var times = time.split(' ');
				//추가
				$table.find("#top_tr").after("<tr><td nowrap>["+times[1]+"]</td><td style='padding:0 5px;' nowrap>"+label+"</td><td align='right' nowrap> "+value+"</td></tr>");
				idx++;
				//제거
				if($table.find("tr").length > opts.limit){
					$table.find("tr:last").remove();
				}
				
			});
		});
	};
	
	//log pannel default options
	$.fn.sgLogPannel.defaults = {width:'280px',height:'100px',limit:100};
	
	/**
	 * 
	 * Widget - Tooltip
	 */
	$.widget('sg.tooltip', {
		_create: function() {
			this._tooltipDiv = $('<div></div>')
				.addClass('sg-tooltip-text ' +
						'ui-widget ui-state-highlight ui-corner-all')
				.hide().appendTo('body');
			this.element
				.addClass('sg-tooltip-trigger')
				.bind('mouseenter.sg-tooltip',
						$.proxy(this._open, this))
				.bind('mouseleave.sg-tooltip',
						$.proxy(this._close, this));
		},
		
		_open: function() {
			
			var elementOffset = this.element.offset();//element는 tooltip trigger(툴팁의 시작 Object)
			this._tooltipDiv.css({
				left: elementOffset.left,
				top: elementOffset.top + this.element.height()
			}).html(this.element.data('tooltip-text'));//tooltip trigger의 'data-tooltip-text'속성을 읽어서 tooltip으로 사용
			this._tooltipDiv.show();
		},
		
		_close: function() {
			this._tooltipDiv.hide();
		}
	});
	
	/**
	 * 
	 * 공통 기능 메서드
	 */
	//1) CSS 클래스 변경 : $('selector').swapClass(클래스1,클래스2)
	$.fn.swapClass = function(class1, class2) {
		if(this.hasClass(class1)) {
			this.removeClass(class1).addClass(class2);
		}else if(this.hasClass(class2)) {
			this.removeClass(class2).addClass(class1);
		}
	};
	
	
})(jQuery);

/**
 *
 * 일반 자바스크립트 함수
 *
 */

//1) 범위확인 - 주파수 : 59.8 ~ 60.2
function rangeHz(value){
	value = eval(value);
	var limit_min = 59.8;
	var limit_max = 60.2;
	var result = "pass";
	if(value < limit_min || value > limit_max) {
		result = "error";
	}
	// 주파수는 경고 없음
	//else if(value == limit_min || value == limit_max) {
	//	result = "warn";	
	//}
	return result;
}
//2) 범위확인 - 전압(154kV) : 154kV +- 10% (15.4) --> 156~164
// :경고  150~156  / 164~170
function rangeKV1(value) {
	value = eval(value);
	
	var limit_min = 150;
	var limit_max = 170;
	var warn_min = 156;
	var warn_max = 164;
	
	var result = "pass";
	if(value <= limit_min || value >= limit_max) {
		result = "error";
	}else if((value > limit_min && value <= warn_min) || (value < limit_max && value >= warn_max)) {
		result = "warn";	
	}
	return result;
}
/*
//3) 범위확인 - 전압(22.9kV) : 에러 > 18.3 ~경고~22.3 (22.9) 23.5 ~경고 ~ 26.9 < 에러
function rangeKV2(value) {
	value = eval(value);
	var limit_min = 18.3;
	var limit_max = 26.9;
	var warn_min = 22.3;
	var warn_max = 23.5;
	
	var result = "pass";
	if(value <= limit_min || value >= limit_max) {
		result = "error";
	}else if((value > limit_min && value <= warn_min) || (value < limit_max && value >= warn_max)) {
		result = "warn";	
	}
	return result;
}
*/
//3) 범위확인 - 전압(22.9kV) : 에러 > 18.3 ~경고~22.3 (22.9) 23.5 ~경고 ~ 26.9 < 에러
function rangeKV2(value) {
	value = Number(value);
	var limitR1 = 21.85;
	var limitR2 = 21.59;
	var limitR3 = 21.33;
	var limitR4 = 21.07;
	var limitR5 = 20.8;
	
	var limitH1 = 23.8;
	var limitH2 = 23.69;
	var limitH3 = 23.58;
	var limitH4 = 23.46;
	var limitH5 = 23.35;
	
	var result = "";
	if(value <= limitH5 || value >= limitR1) {
		result = "1";
	}else if((value > limitH5 && value <= limitH4) || (value < limitR1 && value >= limitR2)) {
		result = "2";	
	}else if((value > limitH4 && value <= limitH3) || (value < limitR2 && value >= limitR3)) {
		result = "3";	
	}else if((value > limitH3 && value <= limitH2) || (value < limitR3 && value >= limitR4)) {
		result = "4";	
	}else if((value > limitH2 && value <= limitH1) || (value < limitR4 && value >= limitR5)) {
		result = "5";	
	}else{
		result = "6";
	}
	return result;
}
//4) 범위확인 - 역류  : 90% ~
function rangePF(value) {
	value = Number(value);
	var limitR1 = 92
	var limitR2 = 91.5
	var limitR3 = 91
	var limitR4 = 91.5
	var limitR5 = 90
	
	var result = "";
	if(value >= limitR1) {
		result = "1";
	}else if(value < limitR1 && value >= limitR2) {
		result = "2";	
	}else if(value < limitR2 && value >= limitR3) {
		result = "3";	
	}else if(value < limitR3 && value >= limitR4) {
		result = "4";	
	}else if(value < limitR4 && value >= limitR5) {
		result = "5";	
	}else{
		result = "6";
	}
	return result;
}
//5) 범위확인 - 전압강하률  : ~ 10%
function rangeKV(value) {
	value = eval(value);
	var basis = 10;
	var warn = 7;//임의로 정한 범위임
	
	var result = "pass";
	if(value > basis) {
		result = "error";
	}else if(value <= basis && value > warn) {
		result = "warn";	
	}
	return result;
}

//6) 범위확인 - 부하  : ~ 30
function rangeMW(value) {
	value = eval(value);
	var basis = 48;
	var warn = 40;//임의로 정한 범위임
	
	var result = "pass";
	if(value > basis) {
		result = "error";
	}else if(value <= basis && value > warn) {
		result = "warn";	
	}
	return result;
}

//6) 범위확인 - 부하율  : 95% ~
function rangeMW1(value) {
	value = eval(value);
	var basis = 95;
	var warn = 91;//임의로 정한 범위임
	
	var result = "pass";
	if(value > basis) {
		result = "error";
	}else if(value <= basis && value > warn) {
		result = "warn";	
	}
	return result;
}

//6) 범위확인 - 이용율  : 80% ~
function rangeMW2(value) {
	value = eval(value);
	var basis = 80;
	var warn = 70;//임의로 정한 범위임
	
	var result = "pass";
	if(value > basis) {
		result = "error";
	}else if(value <= basis && value > warn) {
		result = "warn";	
	}
	return result;
}

//6) 범위확인 - 고장 : == 4
function rangeER(value) {
	value = eval(value);
	var warn = 4;//임의로 정한 범위임
	
	var result = "pass";
	if(value == warn) {
		result = "error";
	}
	return result;
}