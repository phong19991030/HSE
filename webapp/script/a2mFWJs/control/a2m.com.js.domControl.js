$(document)
		.ready(
				function() {
					$(document)
							.on(
									'click',
									'.ac_click.popup',
									function() {
										if (!$(this).hasClass("btn_disable")) {
											var type = $(this).data('type');
											if (type == 'dialog') {
												var url = $(this).data('url')
														.concat('.' + type);
												var cls = $(this).data('cls');
												var target = $(this).attr('id');
												var callback = $(this).data(
														'callback');
												var eventType = $(this).data(
														'eventtype');
												var funcname = $(this).data(
														'funcname');
												var defaultValue = $(this)
														.data('defaultvalue');
												var width;
												width = $(this).data('width') ? $(
														this).data('width')
														: 'auto';
												var height;
												height = $(this).data('height') ? $(
														this).data('height')
														: 'auto';
												var paramStr = getDialogPopupParam($(
														this).data('param'));
												var offset = {
													'x' : ($(this).data('x') ? $(
															this).data('x')
															: 0),
													'y' : ($(this).data('y') ? $(
															this).data('y')
															: 0)
												};
												getDialogPopup(url, cls, type,
														defaultValue, target,
														callback, eventType,
														funcname, width,
														height, offset.x,
														offset.y, paramStr);
											} else if (type == 'popup') {
												var url = $(this).data('url')
														.concat('.' + type);
												var cls = $(this).data('cls');
												var target = $(this).attr('id');
												var callback = $(this).data(
														'callback');
												var eventType = $(this).data(
														'eventtype');
												var funcname = $(this).data(
														'funcname');
												var defaultValue = $(this)
														.data('defaultvalue');
												var width = $(this).data(
														'width');
												width = width ? width : 'auto';
												var height = $(this).data(
														'height');
												height = height ? height
														: 'auto';
												var paramStr = getDialogPopupParam($(
														this).data('param'));
												getWindowPopup(url, cls, type,
														defaultValue, target,
														callback, eventType,
														funcname, width,
														height, paramStr);
											}
										}
									});
					$(document).on('click', '.ac_click.submit', function() {
						$(this).parents('form').submit();
					});
					$(document).on('click', '.ac_click.reset', function() {
						var $form = $(this).parents('form.form_search_box');
						var callback = $(this).data('callback');
						$form.each(function() {
							this.reset();
						});
						$form.trigger('submit');
						if (callback)
							eval(callback + '()');
					});
					$(document).on('click', '.ac_click.winclose', function() {
						window.close();
					});
					$(document).on(
							'click',
							'.ac_click.winclose_reload',
							function() {
								var callback = $(this).data('callback');
								if (callback) {
									opener.parent.eval(callback);
								} else {
									opener.parent.$('.form_search_box')
											.submit();
								}
								window.close();
							});
					$(document).on(
							'click',
							'.ac_click.tab > li',
							function() {
								var $contentsTarget = $('.tabContents#'
										+ ($(this).parent().data('rid')));
								$(this).addClass('ov').siblings().removeClass(
										'ov');
								$contentsTarget.find('>li').eq($(this).index())
										.show().siblings().hide();
								if ($(this).parent().hasClass('ajaxTab')) {
									if ($(this).data('url')) {
										$contentsTarget.find('>li').empty();
										commonAjaxTab($(this).data('url'),
												$contentsTarget.find('>li'));
									}
								}
								resizeGrid()
							});
					$(document).on('click', '.ac_click.link', function() {
						var url = $(this).data("url");
						var func = $(this).data("func");
						if (func) {
							eval(func + '($(this))');
						}
						if (url) {
							location.href = url;
						}
					});
					$(document).on('click', '.ac_click.sbtn', function() {
						var func = $(this).data("func");
						if (func) {
							if (!$(this).hasClass("btn_disable")) {
								eval(func + '($(this))');
							}
						}
					});
					$(document)
							.on(
									'click',
									'.ac_click.stepper_prev',
									function() {
										var cls = $(this).data('cls');
										var inputid = $(this).data('inputid');
										var callback = $(this).data('callback');
										var chgDate;
										var $target = $('#'
												+ inputid.replace('[', '\\[')
														.replace(']', '\\]')
														.replace('.', '\\.'));
										if (cls == "YY") {
											chgDate = Number($target.val()) - 1;
										} else {
											var yyyymm = $target.val();
											var dt = new Date(yyyymm + '-02');
											dt.setMonth(dt.getMonth() - 1);
											chgDate = dt.toJSON().substring(0,
													7).replace('-', '');
										}
										$target.val(chgDate);
										$target
												.expressionEngine('fieldAttValue')
										if (callback)
											eval(callback);
									});
					$(document)
							.on(
									'click',
									'.ac_click.stepper_next',
									function() {
										var cls = $(this).data('cls');
										var inputid = $(this).data('inputid');
										var callback = $(this).data('callback');
										var chgDate;
										var $target = $('#'
												+ inputid.replace('[', '\\[')
														.replace(']', '\\]')
														.replace('.', '\\.'));
										if (cls == "YY") {
											chgDate = Number($target.val()) + 1;
										} else {
											var yyyymm = $target.val();
											var dt = new Date(yyyymm + '-02');
											dt.setMonth(dt.getMonth() + 1);
											chgDate = dt.toJSON().substring(0,
													7).replace('-', '');
										}
										$target.attr('value', chgDate);
										$target
												.expressionEngine('fieldAttValue')
										if (callback)
											eval(callback);
									});
					$(document).on('change', '.ac_change.stepper_input',
							function() {
								var callback = $(this).data('callback');
								if (callback)
									eval(callback);
							});
					$(document)
							.on(
									'change',
									'div.grid_event_apply div:not(".frozen") td input[type="checkbox"]',
									function() {
										var $target = $(this).siblings(
												'input[type="checkbox"]');
										if (this.hasAttribute('readonly')) {
											return false;
										}
										if ($(this).prop('checked')) {
											$target.prop('checked', false);
										} else {
											$target.prop('checked', true);
										}
										updateRow($(this));
									});
					$(document).on(
							'change',
							'input[type="checkbox"].cloned',
							function() {
								var $target = $(this).siblings(
										'input[type="checkbox"]');
								if (this.hasAttribute('readonly')) {
									return false;
								}
								if ($(this).prop('checked')) {
									$target.prop('checked', false);
								} else {
									$target.prop('checked', true);
								}
							});
					$(document)
							.on(
									'click',
									'div.grid_event_apply div:not(".frozen") td span.stepper_prev, td span.stepper_next',
									function() {
										updateRow($(this));
									});
					$(document).on(
							'change',
							'input[type="checkbox"].check_all',
							function() {
								var modelId = $(this).data('id');
								var $target = $(this).parents('table').parent(
										'div').parent('div').next().find(
										'table');
								var gridId = $target.attr('id');
								var stat = $(this).prop('checked');
								$target.find(
										'td[aria-describedby="' + gridId + '_'
												+ modelId + '"]').each(
										function() {
											$(this).find(
													'input[type="checkbox"]')
													.prop('checked', stat);
										})
								$(this).trigger('changed');
							});
					$('.ac_click.tab > li:first-child').trigger('click');
					$(document).on(
							'focus',
							'select',
							function() {
								if ($(this).filter('[readonly]').size() > 0) {
									$(this).find('option:selected')
											.removeClass('hide readonly')
											.siblings(':not(.hide)').addClass(
													'hide readonly')
								} else {
									$(this).find('option.readonly')
											.removeClass('hide readonly')
								}
							})
					if (!browserChk) {
						$(document).on(
								'keypress',
								'textarea',
								function() {
									var maxLength = $(this).attr('maxlength');
									if ($(this).val().length > maxLength) {
										$(this).val(
												$(this).val().substring(0,
														maxLength));
									}
								})
					}
					$(document).on(
							'focus',
							'select',
							function() {
								if ($(this).filter('[readonly]').size() > 0) {
									$(this).find('option:selected')
											.removeClass('hide readonly')
											.siblings(':not(.hide)').addClass(
													'hide readonly')
								} else {
									$(this).find('option.readonly')
											.removeClass('hide readonly')
								}
							})
				});
function commonAjaxTab(url, $target) {
	$.ajax({
		url : CTX + url,
		data : {},
		cache : false,
		success : function(data, textStatus, jqXHR) {
			$target.html(data);
		},
		complete : function() {
		}
	});
}

var messages = {
		'en': {
			'QUESTION' : 'Would you like to save it?',
			'FAIL' : 'Save data unsuccessfully.',
			'SUCCESS' : 'Save data successfully.'
		},
		'ko':{
			'QUESTION' : '저장하시겠습니까?',
				'FAIL' :  '저장실패하였습니다.',
				'SUCCESS' :  '저장성공했습니다.'
		}
		
}


function saveAjax(form, callback) {
	var selectedLang = lang? lang: 'en';

	var message = {
		'QUESTION' : {
			'MESSAGE' : messages[selectedLang]['QUESTION']
		},
		'FAIL' : {
			'MESSAGE' : messages[selectedLang]['FAIL']
		},
		'SUCCESS' : {
			'MESSAGE' : messages[selectedLang]['SUCCESS']
		}
	}
	if ($(form).data('msg')) {
		message = getMessage($(form).data('msg'));
	}
	$(form).expressionEngine('detach');
	if ($(form).data('msg') != null) {
		if (confirm(message.QUESTION.MESSAGE)) {
			$(form).ajaxSubmit({
				success : function(data, textStatus, jqXHR) {
					if (data == "true" || data.result == "true") {
						if (data.msg2) {
							alert(data.msg2);
						} else {
							alert(message.SUCCESS.MESSAGE);
						}
						if (callback) {
							eval(callback + '(form, data)');
						}
					} else {
						if (data.message) {
							alert(data.message)
						} else {
							alert(message.FAIL.MESSAGE);
						}
					}
				},
				complete : function() {
					return true;
				},
				error : function() {
					alert(message.FAIL.MESSAGE);
					return false;
				}
			});
		}
	} else {
		$(form).ajaxSubmit({
			success : function(data, textStatus, jqXHR) {
				if (data == "true" || data.result == "true") {
					alert(message.SUCCESS.MESSAGE);
					if (callback) {
						eval(callback + '(form, data)');
					}
				} else {
				}
			},
			complete : function() {
				return true;
			},
			error : function() {
				return false;
			}
		});
	}
}
function getMessage(msg) {
	var message;
	if (msg != null) {
		$.ajax({
			url : CTX + '/common/message',
			type : 'post',
			data : {
				'msg' : msg
			},
			cache : false,
			async : false,
			success : function(data, textStatus, jqXHR) {
				if (data) {
					message = JSON.parse(data)
				}
			},
			complete : function() {
				return true;
			},
			error : function() {
				return false;
			}
		});
	} else {
		message
	}
	return message;
}
function getDialogPopupParam(param) {
	var paramData;
	if (param) {
		paramData = param.replace(/^\{|\}$|[\s*]+/g, '');
	}
	var ParamObj = {};
	var paramStr = '';
	if (paramData) {
		paramData = paramData.split(',');
		$.each(paramData, function(i, val) {
			var tmp = paramData[i].split(":");
			ParamObj[tmp[0]] = tmp[1];
		});
		var sep = '';
		$.each(ParamObj, function(key, vals) {
			paramStr += sep + key + '=' + vals
			sep = "&";
		});
	}
	return paramStr;
}
function getParamStr(param) {
	var str = ""
	var list = [];
	if (typeof param === "object") {
		$.map(param, function(val, key) {
			list.push(key + ':' + val);
		})
		str = '{' + list.join() + '}'
	} else if (jQuery.isArray(param)) {
		str = '{' + param.join() + '}'
	}
	return str;
}
function getParamObj(str) {
	var obj = {}
	str = str.replace('{', '').replace('}', '')
	var list = str.split(',');
	$.each(list, function(i, val) {
		var values = val.split(':')
		obj[values[0]] = values[1];
	})
	return obj;
}
function generateDialogDom() {
	var cid = $(document).find('body').find('.a2m_dialog').length
	$(document).find('body').append(
			'<div id="a2m_dialog' + cid + '" class="a2m_dialog"></div>');
	var $target = $('#a2m_dialog' + cid);
	return $target;
}
function getDialogPopup(url, cls, type, defaultValue, target, callback,
		eventType, funcname, width, height, x, y, paramStr) {
	var $target = generateDialogDom();
	var param = {
		'url' : url,
		'type' : type,
		'cls' : cls,
		'type' : type,
		'target' : target,
		'defaultValue' : defaultValue,
		'callback' : callback,
		'eventType' : eventType,
		'funcname' : funcname
	};
	commonDialog($target, url, param, width, height, x, y, paramStr)
}
function reposition($target, width, height, x, y) {
	if (x != null && y != null) {
		$target.parent().css('left', x);
		$target.parent().css('top', y);
	} else {
		$target.parent().css(
				'left',
				$target.parent().position().left
						- (width == 'auto' ? $target.width() : 0) / 2)
		$target.parent().css(
				'top',
				$target.parent().position().top
						- (height == 'auto' ? $target.height() : 0) / 2)
	}
}
function commonDialog(target, url, param, width, height, x, y, paramStr) {
	var $target = target;
	var params = '';
	if (paramStr)
		params = '?' + paramStr;
	$.ajax({
		url : CTX + url + params,
		data : param,
		cache : false,
		success : function(data, textStatus, jqXHR) {
			$target.html(data);
		},
		complete : function() {
			if (width == 'auto' || height == 'auto') {
				reposition($target, width, height, x, y)
			}
		}
	});
	$target.dialog({
		resizable : false,
		modal : true,
		width : (width == 'auto' ? 'auto' : eval(width) + 10),
		height : (height == 'auto' ? 'auto' : eval(height) + 10),
		position : {
			my : "center",
			at : "center",
			of : $('body')
		},
		close : function() {
			$target.dialog('destroy').remove()
		},
		open : function(event, ui) {
			$(this).parent().promise().done(function() {
			});
			$(".ui-dialog").css("box-shadow", "#999 5px 5px 5px");
		}
	});
}
function getWindowPopup(url, cls, type, defaultValue, target, callback,
		eventType, funcname, width, height, paramStr) {
	var data = 'cls=' + cls + '&type=' + type + '&defaultValue=' + defaultValue
			+ '&target=' + target + '&callback=' + callback + '&eventType='
			+ eventType + '&funcname=' + funcname;
	var params = '';
	if (paramStr)
		params = '&' + paramStr;
	window.open(CTX + url + '?' + data + params, '_blank', 'width=' + width
			+ ', height=' + height + ', resizable=yes,location=no');
}
function closeDialogPopup($form) {
	var $target;
	$form = createJqueyObject($form);
	if ($form.hasClass('a2m_dialog')) {
		$target = $form;
	} else {
		$target = $form.parents('div.a2m_dialog');
	}
	$target.empty();
	$target.dialog('close');
}
function destroyDialogPopup($form) {
	var $target;
	$form = createJqueyObject($form);
	if ($form.hasClass('a2m_dialog')) {
		$target = $form;
	} else {
		$target = $form.parents('div.a2m_dialog');
	}
	$target.dialog('destroy');
	$target.remove();
}
function createJqueyObject(obj) {
	var $obj;
	if (obj instanceof jQuery) {
		$obj = obj;
	} else {
		$obj = $(obj);
		obj = $(obj);
	}
	return $obj;
}
function doGwLineView($obj) {
	var docno = $obj.data('docno')
	var rowid = $obj.data('rowid')
	var $parent = $obj.parents('table')
	if (!docno) {
		var rowData = $parent.getLocalRow(rowid);
		if (rowData.GW_DOC_NO) {
			docno = rowData.GW_DOC_NO;
		} else {
			alert('문서번호가 없습니다.')
			return;
		}
	}
	handyGwLineView(docno);
}
function doGwDocView($obj) {
	var docno = $.trim($obj.data('docno'));
	var rowid = $obj.data('rowid');
	var $parent = $obj.parents('table');
	if (!docno) {
		var rowData = $parent.getLocalRow(rowid);
		if (rowData.GW_DOC_NO) {
			docno = $.trim(rowData.GW_DOC_NO);
		} else {
			alert('문서번호가 없습니다.')
			return;
		}
	}
	handyGwDocView(docno);
}
function commonFilePopup($obj) {
	var fileKey = $obj.data('param');
	var field = $obj.data('field');
	var hold = $obj.data('hold');
	window.open(CTX + '/common/file/uploadForm?fileKey=' + fileKey + '&target='
			+ field + '&hold=' + hold, '_file',
			'width=650, height=580, resizable=no,location=no')
}
function setFileFieldBind(name, value) {
	$('[name="' + name + '"]').val(value)
	$('[name="' + name + '"]').prev('span').data('param', value)
}
function setTargetUpdate($obj, fieldnm, data) {
	if ($obj) {
		if (fieldnm) {
			var $target = $obj.parents('tr').find('[col="' + fieldnm + '"]');
			if ($target.find('input').length > 0) {
				$target.find('input').datas(data)
			} else {
				$target.datas(data)
			}
		}
	}
}
var ChoiceInputFormOnkeyup = function(target, type) {
	var $target = $('#' + target.replace('.', '\\.'));
	var name = $target.data('prev');
	var code = $target.data('next');
	var $prevTarget = $('#'
			+ name.replace('[', '\\[').replace(']', '\\]').replace('.', '\\.'));
	var $nextTarget = "";
	if (type == "grid") {
		$nextTarget = $target.parents('tr').find(
				'input[name="' + $target.data('next') + '"]');
	} else {
		$nextTarget = $('#'
				+ code.replace('[', '\\[').replace(']', '\\]').replace('.',
						'\\.'));
	}
	if ($prevTarget.val() == "") {
		eval("$nextTarget.val('');");
	}
};
