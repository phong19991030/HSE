

$(document).ready(function(){
//	$(document).on('keyup', 'input[type="text"].fpattern', keyEvent.keyup);
	$(document).on('focusout', 'input[type="text"].fpattern', function(){
							 $(this).trigger('change');
						 });
 
	//임시 prof 디자인 적용용 
//	$('.form_search_box').prev('h4').css('display','none')
	
	
	// tab DOM 생성
	initTab()
	
	
	Date.prototype.getFromFormat = function(format) {
    var yyyy = this.getFullYear().toString();
    format = format.replace(/yyyy/g, yyyy)
    var mm = (this.getMonth()+1).toString(); 
    format = format.replace(/mm/g, (mm[1]?mm:"0"+mm[0]));
    var dd  = this.getDate().toString();
    format = format.replace(/dd/g, (dd[1]?dd:"0"+dd[0]));
    var hh = this.getHours().toString();
    format = format.replace(/hh/g, (hh[1]?hh:"0"+hh[0]));
    var ii = this.getMinutes().toString();
    format = format.replace(/ii/g, (ii[1]?ii:"0"+ii[0]));
    var ss  = this.getSeconds().toString();
    format = format.replace(/ss/g, (ss[1]?ss:"0"+ss[0]));
    return format;
	};

	$('select.ge_commCode').each(function(){
		setCommCodeSelect($(this));
	})
	/// CHECK 사용여부확인 필요 // 전체 체크박스에서 check 하고 있기 때문에~
	$(document).on('click','input[readonly][type="checkbox"]',function(){
		return false;
	})
	
	$(document).on('mousedown','div.ui-jqgrid-sortable',function(){
		$('#table_'+$(this).parents('.grid_event_apply').attr('id')).removeClass('loadComplete')
	});
//		$(document).on('click','div.ui-jqgrid-sortable',function(){
	$(document).on('mouseover','img.ui-hover-datepicker',function(){
//		$('#table_'+$(this).parents('.grid_event_apply').attr('id')).removeClass('loadComplete')
//		alert()
		var butt= $(this);
		var $target = $(this).prev('input') ;
		
		var getObjectSize = function(obj) {
			var size = 0, key;
			for (key in obj) {
				if (obj.hasOwnProperty(key))
					size++;
			}
			return size;
		};
		
		if($(this).parents('td[role="gridcell"]').length>0){
			var abc = $(this).parents('td[role="gridcell"]').data().attr
			var size = 0, key;
			for (key in abc) {
				if (abc.hasOwnProperty(key))
					size++;
			}
			if(size>0){
				$.each($(this).parents('td[role="gridcell"]').data().attr,function(key,val){
					$target.data(key, val);
				})		
			}
		}
		$(this).prevAll('input.datepicker').each(function() {
			if($(this).hasClass('setFromTo')){
				if(!$(this).hasClass('hasDatepicker')){
					var fromNm = $(this).data('fromnm');
					var toNm = $(this).data('tonm');
					datepickerFromTo(fromNm,toNm); 
				}
			}
			if(!$(this).hasClass('hasDatepicker')){ 
				$(this).datepicker({'onSelect':function(){
					$(this).focus();
					$(this).trigger('change');
				},'buttonImageOnly': true , showOn: "button"});
				
			}
			butt.remove();
			$(this).attr('fpattern',"date");
		}); 
		
		
	});
	
	//그리드 전체 - TO-DO : searchbox 등으로 세분화할 필요 있음 
	initialDom($(document))
//	
});


var initTab = function(){
	$('ul.tab').each(function(){
		var $target = $(this);
		if($('#'+$target.data('rid')).length == 0 ){
			$target.after('<ul id="'+$target.data('rid')+'" class="tab_content clearfix">');
			if($(this).hasClass('ajaxTab')){
				$target.next('ul').append('<li></li>')
			}else{
				$target.find('li').each(function(i){
					var gridId = $(this).data('id');
					$target.next('ul').append('<li><div id="'+gridId+'"></div></li>');
				})
			}
		}
	})
}


/**
 * 기능 : datePicker From ~ To (종료일은 시작일보다 작을수 없다.) 
 * 2015.08.17  
 **/
function datepickerFromTo(fromNm,toNm){
	
	$from = $('[name="'+fromNm+'"]');
	$to   = $('[name="'+toNm+'"]');
	
    $from.data('fromnm',fromNm);
    $from.data('tonm',toNm);
    $to.data('fromnm',fromNm);
    $to.data('tonm',toNm);
   
    
    
    var fromData  = $from.val(); 
	var toData = $to.val();
	
	if(fromData.match(/[0-9]{8}/g) ){
		fromData = fromData.substring(0,4)+'-'+
		fromData.substring(4,6)+'-'+
		fromData.substring(6,8)
	}
	if(toData.match(/[0-9]{8}/g) ){
		toData = toData.substring(0,4)+'-'+
		toData.substring(4,6)+'-'+
		toData.substring(6,8)
	}
	
    $to.datepicker('destroy');
	$to.datepicker({"minDate": fromData , 
		onClose : dateFromTo,
		'onSelect':function(){
			$(this).focus();
			$(this).trigger('change');
		},'buttonImageOnly': true , showOn: "button"});
//	$to.addClass('validate[date]') 
//	$to.attr('fpattern',"date");
	
	$from.datepicker('destroy');
	$from.datepicker({"maxDate": toData,
		onClose : dateFromTo,'onSelect':function(){
			$(this).focus();
			$(this).trigger('change');
		},'buttonImageOnly': true , showOn: "button"
	});
//	$from.addClass('validate[date]') 
//	$from.attr('fpattern',"date");
}
function dateFromTo(selectedDate) {
	var toNm = $(this).data('tonm');
	var fromNm =  $(this).data('fromnm');
	
	
	// 그리드 내부
	if($(this) )
	datepickerFromTo(fromNm,toNm);
	
	// 그리드 외부 
	datepickerFromTo(fromNm,toNm);
	
}

function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function grant_button(){
	if(grant.WRT_YN ){
	}else{
		$('.grant_write').remove()
	}
	if(grant.EXC_DN_YN ){
	}else{
		$('.grant_excel').remove()
	}
}

function Create_grantButton(){
	
//	$( '.btn_저장 ,.btn_거부 ,.btn_결재요청 ,.btn_등록 ,.btn_도움말 ,.btn_목록 ,.btn_발행저장 ,.btn_복사 ,.btn_삭제 ,.btn_승인 ,.btn_확정 ,'
//	+'.btn_신규 ,.btn_신청 ,.btn_인쇄 ,.btn_임시저장 ,.btn_접수 ,.btn_접수목록	,.btn_조회 ,.btn_취소 ,.btn_확인 ,.btn_확인요청 ,.btn_예산반영 ,.btn_기타' )
//	.filter(':not(.no_grant)').addClass('grant_write')
	
	
}



var initialDom = function(obj){ 
	Create_grantButton()
	
	grant_button()
	
	//
	/*
	$(obj).find('input.datepicker').each(function() {
		if($(this).hasClass('setFromTo')){
			if(!$(this).hasClass('hasDatepicker')){
				var fromNm = $(this).data('fromnm');
				var toNm = $(this).data('tonm');
				datepickerFromTo(fromNm,toNm); 
			}
		}
		if(!$(this).hasClass('hasDatepicker')){ 
	
			$(this).datepicker({'onSelect':function(){
				$(this).focus();
				$(this).trigger('change');
			},'buttonImageOnly': true , showOn: "button"});
			
		}
//		,"["+options.validateAttribute+"*=validate]
//		$(this).hasClass('validate*')
		// pattern expression으로 체크가능 하여 validate date 항목은 삭제~
//		$(this).addClass('validate[date]') 
		$(this).attr('fpattern',"date");
		//26은 아이콘 사이즈, imgsize를 찾아서 계산해야됨 
//		if($(this).parent('td').length > 0 && ($(this).parent('td').width() > $(this).width()+26)){
//			$(this).css('width',$(this).width()-26)
//		}
		
		
	}); 
	$(obj).find('input.timepicker').each(function() {
		$(this).timepicker({
			'minTime':'9:00am',
			'maxTime':'6:00pm',
			'step':10,
			'timeFormat':'H:i', 
			'scrollDefault':'now'
		});
		$(this).addClass('validate[time]')
		$(this).attr('fpattern',"time"); 
		//26은 아이콘 사이즈, imgsize를 찾아서 계산해야됨 
		
	});
	*/
	
	//표현식 쓰려면 반드시 켜야함 중요 
	$(document).expressionEngine('attach');
	
	$('input[type="checkbox"]:regex(value,\\[.*\\])').each(function(){
		var $obj = $(this)
		var val = $obj.val();
		
		val = val.replace(/\[|\]/gi,'') ;
        var list = val.split(',')
        $.each(list,function(i,val){
        	var clone =$obj.clone();
        	clone.val(val)
        	clone.addClass('cloned')
        	$obj.before(clone);
        })
        $(this).parent().find('[type="checkbox"]').filter(':first').siblings('[type="checkbox"]').hide()
		$(this).remove()
		
	})
	///check박스 스타일 변경 Form
//	$(obj).find('input[type="checkbox"]:not(.aint)').each(function(){
//		var id= $(this).prop('id'); 
//		var display = $(this).css('display') 
//		var hide = $(this).hasClass('hide');
//		if(!id){
//			id = 'temp_check'+$('input[type="checkbox"]:regex(id,temp_check)').length
//			$(this).attr('id',id);
//		}
//		if(!hide && display!='none' ){
//			var $label = $(this).next('label')
//			if($label.length ==0){
//			$(this).after('<label for="'+id+'"></label>')
//			}else{
//				$label.attr('for',id); 
//			}
//		}
//	})
	
	chkDomVlidate($(obj))
	
	// readonly selectbox 숨기기// show , hide 가 ie에서 동작을 안함, 강제로 remove 시킴 
	// remove 이후에는 복구가 안됨
//	$(obj).find('select.readonly').showHideDropdownOptions()
//	$(obj).find('select.readonly').find('option:not(:selected)').remove()
	$(obj).find('select.readonly').find('option:not(:selected)').prop('disabled',true);
	
	
//	$('#loading1').hide(); 
} 

var chkDomVlidate = function($obj){
	var $targetObj = $(this).parent('.box_txt ,.t_txt').prev('.box_tit,.t_tit');
	$obj.parents('.ui-jqgrid-bdiv').prev('div').find('em.aster').remove()
	$obj.find('[class*=validate]:not([type=checkbox]):not([type=radio])').each(function(){
		var rulesParsing = $(this).attr('class')
		var getRules = /validate\[(.*)\]/.exec(rulesParsing);
		
		if (getRules){
			var str = getRules[1]; 
			var rules = str.split(/\[|,|\]/); 
			var have_required = $.inArray('required', rules);
			if(have_required>=0){
				if($(this).parent('.box_txt ,.t_txt').prev('.box_tit,.t_tit').length>0){
					var $targetObj = $(this).parent('.box_txt ,.t_txt').prev('.box_tit,.t_tit');
					if($targetObj.find('em.aster').length==0) {
						var fieldNM = $targetObj.text()
						$targetObj.text(fieldNM.trim())	
						$targetObj.append('<em class="aster"><i class="icon-ok"></i><span class="blind">필수항목</span></em>')
					}
				}else if($(this).parents('.ui-jqgrid-bdiv').prev('.ui-jqgrid-hdiv').length > 0 ){
					var $td = $(this).parents('td')
					var $th = $(this).parents('.ui-jqgrid-bdiv').prev('.ui-jqgrid-hdiv').find('th#'+$td.attr('aria-describedby') )
					if($th.find('div.ui-jqgrid-sortable').find('em.aster').length == 0) {
						$th.find('div.ui-jqgrid-sortable').find('label').before('<em class="aster"><i class="icon-ok"></i></em>')
					}else
						return false;
					
				} 
				else if($(this).parents('td').prev('th').length>0){ 
					
					
					if($(this).parents('td').prev('th').find('em.aster').length==0){ 
						var fieldNM = $(this).parents('td').prev('th').text()
						$(this).parents('td').prev('th').text(fieldNM.trim());
						$(this).parents('td').prev('th').append('<em class="aster"><i class="icon-ok"></i><span class="blind">필수항목</span></em>')
					}
					
					
					
				}
			}else{
				if($(this).parent('.box_txt ,.t_txt').prev('.box_tit,.t_tit').length>0){
					var $targetObj = $(this).parent('.box_txt ,.t_txt').prev('.box_tit,.t_tit');
					if($targetObj.length==0) {
						var fieldNM = $targetObj.text()
						$targetObj.text(fieldNM.trim())	
						$targetObj.find('em.aster').remove()
					}
				}else if($(this).parents('.ui-jqgrid-bdiv').prev('.ui-jqgrid-hdiv').length > 0 ){
					var $td = $(this).parent('td')
					var $th = $(this).parents('.ui-jqgrid-bdiv').prev('.ui-jqgrid-hdiv').find('th#'+$td.attr('aria-describedby') )
					$th.find('div.ui-jqgrid-sortable').find('em.aster').remove()
					
					
				} 
				else if($(this).parents('td').prev('th').length>0){ 
					
					
					if($(this).parents('td').prev('th').find('label').length==0){ 
						var fieldNM = $(this).parents('td').prev('th').text()
						$(this).parents('td').prev('th').text(fieldNM.trim());
						$(this).parents('td').prev('th').find('em.aster').remove()
					}
					
					
					
				}
			}
		}
	})
}




// 없앨 예정
var getPopupSize= function(cls,param){
	if(!param['width'] &&  !param['height']){
		if(cls == "member"){ 
			param['width']="950";  
			param['height']="650";
		}else if(cls == "depart"){
			param['width']="400"; 
			param['height']="600";
		}else if(cls == "empl"){
			param['width']="800";  
			param['height']="800";
		}else if(cls == "binding"){
			param['width']="1000";  
			param['height']="800";
		} else if (cls == 'businessUnit') {
			param['width']="600";  
			param['height']="820";
		} else{
			param['width']="600"; 
			param['height']="800";
		}
	}
};

//jqGrid 용 다이얼로그 & 팝업 파라미터 세팅 (공통)
function getGridDialogPopupParam(param) {
	// ******** 고정Item을 제외한 나머지Item으로 파라미터 데이터 세팅
	var deleteItem = ['target', 'codefield', 'textfield', 'cls', 'funcname', 'width', 'height']; // 삭제할 대상
	var paramsObj = {};		// 파리미터 Object
	var paramsData = ''; 	// 파리미터 String
	
	if(param) {
		// param중에 고정된 형태 제거(param내의 'target', 'codefield', 'textfield', 'cls', 'funcname', 'width', 'height' 제외한 나머지)
		$.each(deleteItem,function(i, key){
			delete param[key];	// 해당 key를 가지고 있는 것들 삭제
			paramsObj = param;	// 삭제 후 나머지
		});
		
		// 파라미터로 넘길 데이터 가공
		$.each(paramsObj,function(key, val){
			var com = ','; // 구분자(콤마)
			paramsData += key+':'+val + com;
		});
		
		// 파라미터 String이 존재할때만
		if(paramsData) paramsData = '{'+paramsData.replace(/,$/g, '')+'}';	// replace(/,$/g, '') : 제일마지막 콤바 제거
	}
	return paramsData;
}

//Grid 용 다이얼로그
var ChoiceInputFormDialog = function(container, options,opts,model, param, obj){
	var param = (typeof  param == 'string' ? JSON.parse(param):param);
//	var cval=(cval ? cval : '' ); 
	var idx = options.model.parent().indexOf(options.model)+1;
	var name= model.id; 
	var code= (param.target ? param.target:''); 
	var codeField= (param.codefield ? param.codefield:'');
	var textField= (param.textfield ? param.textfield:'');
	var targetFields = JSON.stringify(param.targetFields ? param.targetFields :[]);
	var dataFields = JSON.stringify(param.dataFields ? param.dataFields:[]);
	var value = options.model[model.id]? options.model[model.id]:'';
	var textClass = param.cssClass;
	var textStyle = (param['textStyle'] ? param.textStyle:'width:100px' ); // field Style
	var cls = param.cls;
	var funcname = (param.funcname ? param.funcname : 'onSelectGrid'); 
	var fields = param.fields ? param.fields : '';
	var targets = param.targets ? param.targets : '';
	getPopupSize(cls, param);
	
	var width = (param.width ? param.width : '600'); 
	var height = (param.height ? param.height : '800');
	var paramsData =(param.params? param.params: '');	// 파리미터 데이터
	var btn_id = 'button_'+idx+'_'+name; 
	var id = param.id; //여러개 팝업을 오픈해야할 경우
	var url = (param.url ? param.url : '/common/popup/controls.do');
	var typeOption = param.typeOption ? param.typeOption:''; 

	if(paramsData){
		while(paramsData.match('\#([^,|.]*)\#') != null){
			var mat = paramsData.match('\#([^,|.]*)\#');
			paramsData = paramsData.replace(mat[0], (options.model[mat[1]]? options.model[mat[1]] :''))
		}
	}
	 
//		(param.params? param.params: '');	// 파리미터 데이터
		
	
	
	
	// 속성값 추가 20160601 - 전체 추가  
	var bt_disabled = '' ;
	var attr = $(container).data('attr');
	var attrKey ='' ;
	if(attr){ 
		if(typeof attr != 'object'){
			attr =JSON.parse(attr) ;
		}
		$.each(attr,function(key,val){
			attrKey = key+'="'+val+'" ' 
			
			if(key=='readonly'){
				bt_disabled = 'bt_disabled';
			}
		})
	} 
//	var validate; 
//	if(param.validate){
//		validate = 'validate['+param.validate+']';
//	} 
//	var pattern  = (param.pattern ? param.pattern : '');
	
	 
	var all='';
	
	// 버튼 : id="button_grid'+opts.rowId+''+opts.pos+'" - rowid와 pos(위치번호)를 조합한다.
	// -> rowid만 셋팅하면 같은 줄에서 여러개의 공통다이얼로그 사용 시 값이 제대로 bind되지 않는다.
	var htmls = '<input type="text" '+typeOption+' value="'+value+'" name="'+name+'" value="'+value+'" data-auto-bind="true"  data-bind="value:'+name+'"  class="gridEvent gridInput buttoned '+textClass+'" style="'+textStyle+'"  onkeydown="ChoiceInputFormOnkeydown(event,\''+btn_id+'\',\'grid\')" onkeyup="ChoiceInputFormOnkeyup'+all+'(\''+btn_id+'\',\'grid\')" '+attrKey+'>' 

//	var htmls = '<input type="text" '+typeOption+' value="'+value+'" name="'+name+'" value="'+value+'" data-auto-bind="true"  data-bind="value:'+name+'"  class="gridEvent gridInput buttoned '+textClass+'" style="width: 100px;"  onkeydown="ChoiceInputFormOnkeydown(event,\''+btn_id+'\',\'grid\')" onkeyup="ChoiceInputFormOnkeyup'+all+'(\''+btn_id+'\',\'grid\')" '+attrKey+'>' 
		+'<span id="'+btn_id+'" data-width="'+width+'" data-height="'+height+'" data-id="'+btn_id+'" data-idx= "'+idx+'" type="button" class="btn_ico btxs_ico_search ac_click popup '+bt_disabled+'" data-type="dialog" data-url="'+url+'" data-defaultvalue=""' 
		+'data-param="'+paramsData+'" data-id="search" data-cls="'+cls+'" data-targetcode = "'+codeField+'" data-targettext = "'+textField+'" data-prev="'+name+'" data-next="'+code+'" data-funcname="'+funcname+'" data-eventtype="dblclick"'
		+'data-fields="'+fields+ '"'+' data-targets="'+targets+ '" '+attrKey+' >새창열림</span>'; 
		
//	$htmls.appendTo(container); 
//		var html = kendo.template($(htmls).html())
	return htmls; 
}  
//jqGrid 용 팝업
var ChoiceInputFormPopup =  function(container, options,opts,model, param, obj){
	var param = (typeof  param == 'string' ? JSON.parse(param):param);
//	var cval=(cval ? cval : '' ); 
	var idx = options.model.parent().indexOf(options.model)+1;
	var name= model.id; 
	var code= (param.target ? param.target : ''); 
	var codeField= (param.codefield ? param.codefield:'');
	var textField= (param.textfield ? param.textfield:'');
	var targetFields = JSON.stringify(param.targetFields ? param.targetFields :[]);
	var dataFields = JSON.stringify(param.dataFields ? param.dataFields:[]);
	var value = options.model[model.id]? options.model[model.id]:'';
	//yjin1214변경
	var textClass = param.cssClass;
	//var textClass = param.class;
	var textStyle = (param['textStyle'] ? param.textStyle:'width:100px' ); // field Style
	var cls = param.cls;
	var funcname = (param.funcname ? param.funcname : 'onSelectGrid'); 
	var fields = param.fields ? param.fields : '';
	var targets = param.targets ? param.targets : '';
	getPopupSize(cls, param);
	
	var width = (param.width ? param.width : '600'); 
	var height = (param.height ? param.height : '500');
	var paramsData =(param.params? param.params: '');	// 파리미터 데이터
	var btn_id = 'button_'+idx+'_'+name; 
	var id = param.id; //여러개 팝업을 오픈해야할 경우
	var url = (param.url ? param.url : '/common/popup/controls.do');
	var typeOption = param.typeOption ? param.typeOption:''; 

	
	if(paramsData){
		while(paramsData.match('\#([^,|.]*)\#') != null){
			var mat = paramsData.match('\#([^,|.]*)\#');
			paramsData = paramsData.replace(mat[0], (options.model[mat[1]]? options.model[mat[1]] :''))
		}
	}
	
	// 속성값 추가 20160601 - 전체 추가  
	var bt_disabled = '' ;
	var attr = $(container).data('attr');
	var attrKey ='' ;
	if(attr){ 
		if(typeof attr != 'object'){
			attr =JSON.parse(attr) ;
		}
		$.each(attr,function(key,val){
			attrKey = key+'="'+val+'" ' 
			
			if(key=='readonly'){
				bt_disabled = 'bt_disabled';
			}
		})
	} 
	
	
	
	
	
//	var validate; 
//	if(param.validate){
//		validate = 'validate['+param.validate+']';
//	} 
//	var pattern  = (param.pattern ? param.pattern : ''); 
	
	
	var all='';
	
	// 버튼 : id="button_grid'+opts.rowId+''+opts.pos+'" - rowid와 pos(위치번호)를 조합한다.
	// -> rowid만 셋팅하면 같은 줄에서 여러개의 공통다이얼로그 사용 시 값이 제대로 bind되지 않는다.
	var htmls = '<input type="text" '+typeOption+' value="'+value+'" name="'+name+'" value="'+value+'" data-auto-bind="true"  data-bind="value:'+name+'"  class="gridEvent gridInput buttoned '+textClass+'  " style="'+textStyle+'"  onkeydown="ChoiceInputFormOnkeydown(event,\''+btn_id+'\',\'grid\')" onkeyup="ChoiceInputFormOnkeyup'+all+'(\''+btn_id+'\',\'grid\')" '+attrKey+'>' 
//	var htmls = '<input type="text" '+typeOption+' value="'+value+'" name="'+name+'" value="'+value+'" data-auto-bind="true"  data-bind="value:'+name+'"  class="gridEvent gridInput buttoned '+textClass+'  " style="width: 100px;"  onkeydown="ChoiceInputFormOnkeydown(event,\''+btn_id+'\',\'grid\')" onkeyup="ChoiceInputFormOnkeyup'+all+'(\''+btn_id+'\',\'grid\')" '+attrKey+'>' 

	+'<span id="'+btn_id+'" data-width="'+width+'" data-height="'+height+'" data-id="'+btn_id+'" data-idx= "'+idx+'" type="button" class="btn_ico btxs_ico_search ac_click popup '+bt_disabled+'" data-type="popup" data-url="'+url+'" data-defaultvalue=""' 
		+'data-param="'+paramsData+'" data-id="search" data-cls="'+cls+'" data-targetcode = "'+codeField+'" data-targettext = "'+textField+'" data-prev="'+name+'" data-next="'+code+'" data-funcname="'+funcname+'" data-eventtype="dblclick"'
		+'data-fields= "'+fields+'" data-targets= "'+targets+'" '+attrKey+'   >새창열림</span>' 
		+''
		
//	$htmls.appendTo(container); 
//		var html = kendo.template($(htmls).html())
	return htmls; 
	
	//버튼 : id="button_grid'+eval(opts.rowId-1)+''+eval(opts.pos-1)+'" - rowid와 pos(위치번호)를 조합하여 분리
	// -> rowid만 셋팅하면 같은 줄에서 여러개의 공통팝업 사용 시 값이 제대로 bind되지 않는다.       
//	var htmls = '<input type="text" id="'+idx+'.'+name+'" '+typeOption+' name="'+idx+'.'+name+'" class="gridInput buttoned '+textClass+' '+validate+'"  '+ ( pattern ? 'fpattern="'+pattern+'"' : '' )+ ' style="'+textStyle+'" value = "'+cval+'" onkeypress="ChoiceInputFormOnkeypress(event,\''+btn_id+'\',\'grid\')" onkeyup="ChoiceInputFormOnkeyup'+all+'(\''+btn_id+'\',\'grid\')">'
//		+'<span id="'+btn_id+'" data-width="'+width+'" data-height="'+height+'" data-id="'+id+'" data-idx= "'+idx+'" type="button" class="grid ico_small l13 bg_mint ac_click popup " data-type="popup" data-url="'+url+'" data-defaultvalue=""' 
//		+'data-param="'+paramsData+'" data-id="search" data-cls="'+cls+'" data-targetcode = "'+codeField+'" data-targettext = "'+textField+'" data-prev="'+idx+'.'+name+'" data-next="'+idx+'.'+code+'" data-funcname="'+funcname+'" data-eventtype="ondblClickRow"></span>'

}  

// text필드
// - [cval] : 셀의 값, [opts] : row옵션들, [rowObject] : row의 모든정보 , [typeOption] : html기본제공 옵션 
// - [typeCss] : style Css, [typeClass] : class명, [name] : grid modelName
var textField = function(container,options,opts,model){ 
	var modelId;
	if(gridConfig.autoFieldNameChange){
		modelId = opts.cid+'_'+model.id
	}else{
		modelId = model.id;
	}
	
//	var idx = options.model.parent().indexOf(options.model)+1;
	var idx = 1;
	var id =  modelId+'_'+idx;
	var name= modelId; 
	var field = modelId ;
	var value = options.model[model.id]? options.model[model.id]:'';
	var value ;
	if (typeof(options.model[model.id]) != 'undefined' && options.model[model.id] != null){
		value=options.model[model.id];
	}else{
		value='';
	}
	
	
	if(model.cellattr){
		/*
		 * @VIET - 보안 취약점 수정
		 */
		//var cellattr =eval( model.cellattr(value,options.model,model,opts));
		var cellattr =model.cellattr(value,options.model,model,opts);
	}
	
	
	// 수정20160803 options.model[model.id]? options.model[model.id]:'';
	value = model.formatter? model.formatter(value,options) : value;
	var typeClass = model.typeClass ? model.typeClass:'';
	var typeCss = model.typeCss ? model.typeCss:'';
	var pattern = model.pattern ? model.pattern:'';
	var patternOption = pattern ? 'fpattern="'+pattern+'"' : '';
	var placeholder  = model.placeHolder ? model.placeHolder :''; 
	
	
	
	
	// 속성값 추가 20160601 - 전체 추가  
	var attr = $(container).data('attr');
	var attrKey ='' ;
	if(attr){ 
		if(typeof attr != 'object'){
			attr =JSON.parse(attr) ;
		}
		$.each(attr,function(key,val){
			attrKey = key+'="'+val+'" ' 
		})
	}  
	var html = '<input type="text" name="' +name + '" style="'+typeCss+'" value ="'+value+'" '+cellattr+' placeholder="'+placeholder+'" class="k-input ch_event k-textbox '+typeClass+'" '+attrKey+' '+patternOption+'/>'
//	var html = '<input type="text" id="'+ id+'" name="' +name + '" style="'+typeCss+'" value ="'+value+'" '+cellattr+' placeholder="'+placeholder+'" class="k-input ch_event k-textbox '+typeClass+'" '+attrKey+' '+patternOption+'/>'
	var $dom = $(html);
	
	if(gridConfig.exposeField){
		return html;
	}else{
		$dom.appendTo(container); 
	}
	
	
} 

var numberField2 = function(container,options,opts,model){ 
	var modelId;
	if(gridConfig.autoFieldNameChange){
		modelId = opts.cid+'_'+model.id
	}else{
		modelId = model.id;
	}
	
//	var idx = options.model.parent().indexOf(options.model)+1;
	var idx = 1;
	var id =  modelId+'_'+idx;
	var name= modelId; 
	var field = modelId ;
	var value = options.model[model.id]? options.model[model.id]:'';
	var value ;
	if (typeof(options.model[model.id]) != 'undefined' && options.model[model.id] != null){
		value=options.model[model.id];
	}else{
		value='';
	}
	
	
	if(model.cellattr){
		/*
		 * @VIET - 보안 취약점 수정
		 */
		//var cellattr =eval( model.cellattr(value,options.model,model,opts))
		var cellattr =model.cellattr(value,options.model,model,opts);
	}
	
	
	// 수정20160803 options.model[model.id]? options.model[model.id]:'';
	value = model.formatter? model.formatter(value,options) : value;
	var typeClass = model.typeClass ? model.typeClass:'';
	var typeCss = model.typeCss ? model.typeCss:'';
	var pattern = model.pattern ? model.pattern:'';
	var patternOption = pattern ? 'fpattern="'+pattern+'"' : '';
	var placeholder  = model.placeHolder ? model.placeHolder :''; 
	
	
	
	
	// 속성값 추가 20160601 - 전체 추가  
	var attr = $(container).data('attr');
	var attrKey ='' ;
	if(attr){ 
		if(typeof attr != 'object'){
			attr =JSON.parse(attr) ;
		}
		$.each(attr,function(key,val){
			attrKey = key+'="'+val+'" ' 
		})
	}  
	var html = '<input type="text"  name="' +name + '" style="'+typeCss+'" value ="'+value+'" '+cellattr+' placeholder="'+placeholder+'" class="k-input ch_event k-textbox '+typeClass+'" '+attrKey+' '+patternOption+'/>'
//	var html = '<input type="text" id="'+ id+'" name="' +name + '" style="'+typeCss+'" value ="'+value+'" '+cellattr+' placeholder="'+placeholder+'" class="k-input ch_event k-textbox '+typeClass+'" '+attrKey+' '+patternOption+'/>'
	var $dom = $(html);
	
	if(gridConfig.exposeField){
		return html;
	}else{
		$dom.appendTo(container); 
	}
	
	
} 
var numberField = function(container,options,opts,model){ 
	var field =  model.id ;
	var typeClass = model.typeClass ? model.typeClass:''; 
	var typeCss = model.typeCss ? model.typeCss:'';
	
	// 속성값 추가 20160601 - 전체 추가  
	var attr = $(container).data('attr');
	var attrKey ='' ;
	if(attr){
		if(typeof attr != 'object'){
			attr =JSON.parse(attr) ;
		}
		$.each(attr,function(key,val){
			attrKey = key+'="'+val+'" '
		})
	}
	var value = options.model[model.id]? options.model[model.id]:'';
	value = model.formatter? model.formatter(value) : value;
	
	var html = '<input name="' +field + '"  style="'+typeCss+'" value="'+value+'"  class="k-type-number k-input ch_event '+typeClass+'" '+attrKey+'/>';
	var $dom = $(html);
	
	if(gridConfig.exposeField){
		return html;
	}else{
		$dom.appendTo(container); 
		$dom.kendoNumericTextBox(); 
	}

//
} 




//해당 컬럼에 Link (조회 그리드에서 사용)
function linkField(container,options,opts,model, params, obj) {// 해당 Column에 Link 걸기
	var rowid = model.id;
//	var data = [];
	var datas ='';
	if(params){
		$.each(JSON.parse(params),function(key,obj){
			datas += 'data-'+key+'="'+obj+'" '
		})
		
	}
	
	
	if(datas !=''){
		return '<span class= "ac_click link text" '+datas+' data-field="'+rowid+'">' + options.model[rowid] + '</span>';
	}else {
		return options.model[rowid];
	}
}

//20160620 yjin1214 textarea 수정
var textAreaField = function(container,options,opts,model){ 
	var idx = options.model.parent().indexOf(options.model)+1;
	var id =  model.id+'_'+idx;
	var name= model.id; 
	var field = model.id ;
	var value = options.model[model.id]? options.model[model.id]:'';
	var typeClass = model.typeClass ? model.typeClass:'';
	var typeCss = model.typeCss ? model.typeCss:'';
	
	// 속성값 추가 20160601 - 전체 추가  
	var attr = $(container).data('attr');
	var attrKey ='' ;
	if(attr){ 
		if(typeof attr != 'object'){
			attr =JSON.parse(attr) ;
		}
		$.each(attr,function(key,val){
			attrKey = key+'="'+val+'" ' 
		})
	} 
	
	var html = '<textarea   name="' +name + '" style="'+typeCss+'" class="k-textarea ch_event k-textbox'+typeClass+'" '+attrKey+' >'+value+'</textarea>';
//	var html = '<textarea id="'+ id+'" name="' +name + '" style="'+typeCss+'" class="k-textarea ch_event k-textbox'+typeClass+'" '+attrKey+' >'+value+'</textarea>';
	var $dom = $(html);
	if(gridConfig.exposeField){
		return html;
	}else{
		$dom.appendTo(container); 
	}
	
	/*
	var field =  model.id ;
	var typeClass = model.typeClass ? model.typeClass:'';
	var typeCss = model.typeCss ? model.typeCss:'';
	// 속성값 추가 20160601 - 전체 추가  
	var attr = $(container).data('attr');
	var attrKey ='' ;
	if(attr){
		if(typeof attr != 'object'){
			attr =JSON.parse(attr) ;
		}
		$.each(attr,function(key,val){
			attrKey = key+'="'+val+'" '
		})
	}
	var field = '<textarea name="'+name+'['+eval(opts.rowId-1)+'].'+ids+'" style="width:100%; '+typeCss+'" class="textarea0 '+typeClass+'" >'+cval+'</textarea>';  
	var dom = '<textarea id="'+ field+'" name="' +field + '" style="'+typeCss+'"  class="k-input ch_event k-textbox'+typeClass+'" '+attrKey+' > </textarea>';
	$(dom).appendTo(container);
	
	*/
}
var passwordField =  function(container,options,opts,model){ 
	var field =  model.id ;
	var typeClass = model.typeClass ? model.typeClass:''; 
	var typeCss = model.typeCss ? model.typeCss:'';
	
	
	var value = options.model[model.id]? options.model[model.id]:'';
	var value ;
	if (typeof(options.model[model.id]) != 'undefined' && options.model[model.id] != null){
		value=options.model[model.id];
	}else{
		value='';
	}
	// 속성값 추가 20160601 - 전체 추가  
	var attr = $(container).data('attr');
	var attrKey ='' ;
	if(attr){
		if(typeof attr != 'object'){
			attr =JSON.parse(attr) ;
		}
		$.each(attr,function(key,val){
			attrKey = key+'="'+val+'" '
		})
	}

	var html = '<input type="password" name="' +field + '"  style="'+typeCss+'"  value ="'+value+'" class="k-input ch_event'+typeClass+'" '+attrKey+'/>';
	var $dom = $(html);
	
	if(gridConfig.exposeField){
		return html;
	}else{
		$dom.appendTo(container); 
	}
	
}
var datePickerField = function(container,options,opts,model){
	
	var field =  model.id ;
	var typeClass = model.typeClass ? model.typeClass:''; 
	var typeCss = model.typeCss ? model.typeCss:'';
	
	var value = options.model[model.id]? options.model[model.id]:'';
	var value;
	if (typeof(options.model[model.id]) != 'undefined' && options.model[model.id] != null){
		value = options.model[model.id];
	}else{
		value = '';
	}
	
	value = addDateFormat(value,'-');
	
	// 속성값 추가 20160601 - 전체 추가  
	var attr = $(container).data('attr');
	var attrKey ='' ;
	if(attr){
		if(typeof attr != 'object'){
			attr =JSON.parse(attr);
		}
		$.each(attr,function(key,val){
			attrKey = key+'="'+val+'"';
		})
	}
//	var $dom = $('<input name="' +field + '"  style="'+typeCss+'"  class="k-input '+typeClass+'"  '+attrKey+'/>');
	var html = 
//	<span class="inp_cal">
//	<input name="ETC2" type="text" style="" value="2014-06-08" class="datepicker k-input  hasDatepicker" id="dp1476685418379" pattern="date">
//	<img class="ui-datepicker-trigger" src="/A2mframework/images/stnd/common/calender.png" alt="달력보기" title="달력보기"></span>	
		
	'<span class="inp_cal"><input name="' +field + '" type="text"  style="'+typeCss+'" value="'+value+'"  class="datepicker k-input '+typeClass+'"  '+attrKey+'/>'
	
    var $dom = $(html);
	
//	$dom.appendTo(container);
	
	  
	if(gridConfig.exposeField){
		html += '<img class="ui-datepicker-trigger ui-hover-datepicker" src="'+CTX+'/images/stnd/common/calender.png" alt="달력보기" title="달력보기"></span>';
        return html;
    }else{
        $dom.appendTo(container); 
    }
	
	var datepick = $dom.kendoDatePicker({culture:"ko-KR" , format:"yyyy-MM-dd",
		change: function (e)
	    { 
	        var d = kendo.toString( new Date(this.value()), "yyyy-MM-dd")
//	         $tr = $dom.parents('tr')
	        var $tr = $('[data-uid = "'+ $dom.parents('tr').data('uid')+'" ]')
	        $dom.parents('td').setData(field,d) 
	        updateRow($tr);
	    } 
	});
} 

//checkBox필드
//var checkBoxField =function(container,options,opts,model){ 
//	var field = options.field;
//	var typeClass = model.typeClass ? model.typeClass:''; 
//	var typeCss = model.typeCss ? model.typeCss:'';
//	var $dom = $('<input name="' +field + '"  style="'+typeCss+'"  class="k-input '+typeClass+'" />');
//	$dom.appendTo(container);  
//	$dom.kendoNumericTextBox(); 
//} 
var checkBoxField =function(container,options,opts,model, params, obj){ 
	var field = 'selected_'+model.id;
	var typeClass = model.typeClass ? model.typeClass:''; 
	var typeCss = model.typeCss ? model.typeCss:'';
//	var $dom = $('<input name="' + field + '"  style="' + typeCss + '"  class="k-input ' + typeClass + '" />');
	var typeValue = [];
	if(model.typeValue){
		typeValue = model.typeValue;
//		if(model.typeValue.length > 0 ){
//			if(!model.typeValue[0].LABEL){
//				$.each(model.typeValue,function(i,obj){
//					obj['LABEL']=obj.DATA;
//				})
//			}
//		}
	}
	var value = options.model[model.id]? options.model[model.id]:'';
	
	var checked = (model && model.typeValue && value == model.typeValue[0].DATA? 'checked': '');
	var cellattr ='';
	if(model.cellattr){
		/*
		 * @VIET - 보안 취약점 수정
		 */
		//cellattr =eval( model.cellattr(value,options.model,model,opts))
		cellattr = model.cellattr(value,options.model,model,opts);
	}
	
	
	// 속성값 추가 20160601 - 전체 추가  // 예외처리 
	var attr = $(container).data('attr');
	var attrKey ='' ;
	if(attr){
		if(typeof attr != 'object'){
			attr =JSON.parse(attr) ;
		}
		$.each(attr,function(key,val){
			attrKey = key+'="'+val+'" '
		})
	} 
	var typeData1 = (model && model.typeValue && model.typeValue[0].DATA? model.typeValue[0].DATA: '');
	var typeData2 = (model && model.typeValue && model.typeValue[1].DATA? model.typeValue[1].DATA: '');
	
	//anhpv 20181031 disable checkbox with contrain
	var strDisabled = '';

	if(model.typeOption && model.typeOption.disable){
	    var colCheck = model.typeOption.disable;
	    if(colCheck.length >3 && colCheck.substring(0,2) =='#='  && colCheck.substring(colCheck.length-1,colCheck.length) == '#'){
	        colCheck = colCheck.substring(2,colCheck.length-1);
	        strDisabled = options.model[colCheck];
	    }
	}
	
	if(model.typeOption && ( model.typeOption.disable == 'true' ||model.typeOption.disable == 'TRUE')){
	       strDisabled = 'disabled';
	}
	var strOnChange = '';
	if(params){
		var mapParam =JSON.parse(params);
		
		strOnChange = 'onchange="'+mapParam["onchange"]+'(event)"';
	}

	var count = options.model['uid'];
	var obj = '<div class="checkbox-radio-custom">'
//        +'<input type="checkbox" class="checkbox" id="checkLogo1">'
		+'<input id="checkLogo'+count+'_'+options.field+'" type="checkbox" '+strOnChange+' data-id="'+field+'" name="'+model.id+'"  value="'+typeData1+'" '+checked+' '+ strDisabled +'  class="k-type-check aint toggle checkbox '+typeClass+'" '+cellattr+' data-checked="'+typeData1+'" data-unchecked="'+typeData2+'" '+attrKey+'/>'

        +'<label for="checkLogo'+count+'_'+options.field+'" class="sr-only"></label>'
        +' </div>';
	
//	var obj = '<label class="containerCheckbox">'
//		+'<input type="checkbox" '+strOnChange+' data-id="'+field+'" name="'+model.id+'"  value="'+typeData1+'" '+checked+' '+ strDisabled +'  class="k-type-check aint toggle '+typeClass+'" '+cellattr+' data-checked="'+typeData1+'" data-unchecked="'+typeData2+'" '+attrKey+'/>'
//		+' <span class="checkmark" style="top: -5px;"></span>'
//		+'</label>';
	
//	var obj = '<input type="checkbox" '+strOnChange+' data-id="'+field+'" name="'+model.id+'"  value="'+typeData1+'" '+checked+' '+ strDisabled +'  class="k-type-check aint toggle '+typeClass+'" '+cellattr+' data-checked="'+typeData1+'" data-unchecked="'+typeData2+'" '+attrKey+'/>';
	
	
	
	field = obj;
	return field;
}

var radioField =function(container,options,opts,model, params, obj){ 
	var field = 'selected_'+model.id;
	var typeClass = model.typeClass ? model.typeClass:''; 
	var typeCss = model.typeCss ? model.typeCss:'';
//	var $dom = $('<input name="' + field + '"  style="' + typeCss + '"  class="k-input ' + typeClass + '" />');
	var typeValue = [];
	if(model.typeValue){
		typeValue = model.typeValue;
//		if(model.typeValue.length > 0 ){
//			if(!model.typeValue[0].LABEL){
//				$.each(model.typeValue,function(i,obj){
//					obj['LABEL']=obj.DATA;
//				})
//			}
//		}
	}
	var value = options.model[model.id]? options.model[model.id]:'';
	
	var checked = (model && model.typeValue && value == model.typeValue[0].DATA? 'checked': '');
	var cellattr ='';
	if(model.cellattr){
		/*
		 * @VIET - 보안 취약점 수정
		 */
		//cellattr =eval( model.cellattr(value,options.model,model,opts))
		cellattr = model.cellattr(value,options.model,model,opts);
	}
	
	
	// 속성값 추가 20160601 - 전체 추가  // 예외처리 
	var attr = $(container).data('attr');
	var attrKey ='' ;
	if(attr){
		if(typeof attr != 'object'){
			attr =JSON.parse(attr) ;
		}
		$.each(attr,function(key,val){
			attrKey = key+'="'+val+'" '
		})
	} 
	var typeData1 = (model && model.typeValue && model.typeValue[0].DATA? model.typeValue[0].DATA: '');
	var typeData2 = (model && model.typeValue && model.typeValue[1].DATA? model.typeValue[1].DATA: '');
	
	//anhpv 20181031 disable checkbox with contrain
	var strDisabled = '';

	if(model.typeOption && model.typeOption.disable){
	    var colCheck = model.typeOption.disable;
	    if(colCheck.length >3 && colCheck.substring(0,2) =='#='  && colCheck.substring(colCheck.length-1,colCheck.length) == '#'){
	        colCheck = colCheck.substring(2,colCheck.length-1);
	        strDisabled = options.model[colCheck];
	    }
	}
	
	if(model.typeOption && ( model.typeOption.disable == 'true' ||model.typeOption.disable == 'TRUE')){
	       strDisabled = 'disabled';
	}
	var strOnChange = '';
	if(params){
		var mapParam =JSON.parse(params);
		
		strOnChange = 'onchange="'+mapParam["onchange"]+'(event)"';
	}

	var count = options.model['uid'];
	var obj = '<div class="checkbox-radio-custom">'
//        +'<input type="checkbox" class="checkbox" id="checkLogo1">'
		+'<input id="checkLogo'+count+'_'+options.field+'" type="radio" '+strOnChange+' data-id="'+field+'" name="'+model.id+'"  value="'+typeData1+'" '+checked+' '+ strDisabled +'  class="k-type-check aint toggle checkbox '+typeClass+'" '+cellattr+' data-checked="'+typeData1+'" data-unchecked="'+typeData2+'" '+attrKey+'/>'

        +'<label for="checkLogo'+count+'_'+options.field+'" class="sr-only"></label>'
        +' </div>';
	
//	var obj = '<label class="containerCheckbox">'
//		+'<input type="checkbox" '+strOnChange+' data-id="'+field+'" name="'+model.id+'"  value="'+typeData1+'" '+checked+' '+ strDisabled +'  class="k-type-check aint toggle '+typeClass+'" '+cellattr+' data-checked="'+typeData1+'" data-unchecked="'+typeData2+'" '+attrKey+'/>'
//		+' <span class="checkmark" style="top: -5px;"></span>'
//		+'</label>';
	
//	var obj = '<input type="checkbox" '+strOnChange+' data-id="'+field+'" name="'+model.id+'"  value="'+typeData1+'" '+checked+' '+ strDisabled +'  class="k-type-check aint toggle '+typeClass+'" '+cellattr+' data-checked="'+typeData1+'" data-unchecked="'+typeData2+'" '+attrKey+'/>';
	
	
	
	field = obj;
	return field;
}


var checkBoxHeaderField =function(opts,model){ 
	var field = 'selected_'+model.id;
	var typeClass = model.typeClass ? model.typeClass:''; 
	var typeCss = model.typeCss ? model.typeCss:'';
//	var $dom = $('<input name="' + field + '"  style="' + typeCss + '"  class="k-input ' + typeClass + '" />');
	var typeValue = [];
	if(model.typeValue){
		typeValue = model.typeValue;
	}
//	var value = container[model.id]? container[model.id]:'';
	
//	var checked = ( value == model.typeValue[0].DATA? 'checked': '');

//	var obj = 
//	'<input type="checkbox" id="check_all_'+model.id+'" data-field="'+model.id+'" class="check_all aint toggle" style="position:relative;z-index:1999"/>'
	
	var strOnChange,typeClass, checked, typeData1 = '';
		var obj = '<div>'+model.name +'</div><div class="checkbox-radio-custom">'
		+'<input id="check_all_'+model.id+'"  type="checkbox" '+strOnChange+'  data-field="'+model.id+'" name="'+model.id+'"  value="'+typeData1+'" '+checked+'  class="check_all k-type-check aint toggle checkbox '+typeClass+'" />'

        +'<label for="check_all_'+model.id+'" class="sr-only"></label>'
        +' </div>';
	
	field = obj
	return field;
}


var selectField = function(container, options, opts, model, params, obj){ 
	var field = 'selected_'+model.id;
	var idx = options.model.parent().indexOf(options.model)+1;
	var id =  model.id+'_'+idx;
	var name= model.id+'_'+idx; ; 
	var typeClass = model.typeClass ? model.typeClass:''; 
	var typeCss = model.typeCss ? model.typeCss:'';
	var value = options.model[model.id]? options.model[model.id]:'';
	var typeOption;
	if(model.typeOption){
		typeOption =model.typeOption; 
	}
	var onChange = '';
	if(typeOption){
	    if(typeOption.onChange){
	        onChange = typeOption.onChange + '(this)';
	    }
	}
	
	var attr = $(container).data('attr'); 
	var attrKey ={} 
	if(attr)
		attrKey =JSON.parse(attr) ;

	var typeValue = [];
	if(gridConfig.exposeField){
		var readonly = attrKey['readonly'] ? attrKey['readonly']:''
		var html = '<select id="'+id+'" name="' + name + '"  data-typeOption="'+getParamStr(typeOption)+'"  style="' + typeCss + '"  class="k-type-select k-input ' + typeClass + '" '+readonly+' onChange="'+ onChange +'"> ';
		if(model.typeValue){
			typeValue = model.typeValue;
			if(model.typeValue.length > 0 ){
					html+= '<option value=""'+('' == value?  'selected':'') 
					html+=' data-typevalue = ""> --- </option>'
				$.each(model.typeValue,function(i,obj){
					if(!obj.LABEL){
						obj['LABEL']=obj.DATA;
					}
					html+= '<option value="'+obj['DATA']+'" '+(obj.DATA == value?  'selected="selected"':'') 
					html+=' data-typevalue = "'+getParamStr(obj)+'"> '+obj['LABEL']+' </option>'
				})
			}
		}
		
		html += ' </select >' 
		var $dom = $(html);
	
	
		return html;  
	}else{
		
		if(model.typeValue){
			typeValue = model.typeValue;
			if(model.typeValue.length > 0 ){
				$.each(model.typeValue,function(i,obj){
					if(!obj.LABEL){
						obj['LABEL']=obj.DATA;
					}
				})
			}
		}
		
		var html = '<input name="' + field + '"  style="' + typeCss + '"   class="k-type-select k-input ' + typeClass + '" />';
		var $dom = $(html);
		$dom.appendTo(container); 
		
		var combo = $dom.kendoComboBox({ 
			dataSource: typeValue,
			dataTextField: "LABEL",
			dataValueField: "DATA",
			enable: attrKey['readonly'] ? attrKey['readonly']:true,
			change: function (e) { 
				var params = params;
				var dataItem = e.sender.dataItem();
				var textfield = '';
				var codefield = ''; 
				if(typeOption){
					textfield = typeOption.textfield,
					codefield = typeOption.codefield;
				}
				 
				var obj = {};
				$.each(dataItem,function(key,val){
					if(typeof val == 'string' && key != 'uid' ){
						options.model.set(key, val);
					}
				})
				if(textfield)
					options.model.set(textfield, dataItem.LABEL);
				if(codefield)
					options.model.set(codefield, dataItem.DATA);

				var $tr =$('[data-uid = "'+options.model.uid+'" ]');
				var grind = $tr.eq(0).getGrid()
				updateRow($tr.eq(0));
			}
		});   
		
		
	}
}
/**
var selectField = function(container, options, opts, model, params, obj){ 
	var field = 'selected_'+model.id;
	var typeClass = model.typeClass ? model.typeClass:''; 
	var typeCss = model.typeCss ? model.typeCss:'';
	var typeValue = [];
	if(model.typeValue){
		typeValue = model.typeValue;
		if(model.typeValue.length > 0 ){
			if(!model.typeValue[0].LABEL){
				$.each(model.typeValue,function(i,obj){
					obj['LABEL']=obj.DATA;
				})
			}
		}
	}
	var typeOption;
	if(model.typeOption){
		typeOption =model.typeOption; 
	}
	
	
	var attr = $(container).data('attr');
	var attrKey ={} 
	if(attr)
		attrKey =JSON.parse(attr) ;

	var html = '<input name="' + field + '"  style="' + typeCss + '"data-typeOption="'+typeOption+'" data-typevalue="'+typeValue+'"  class="k-type-select k-input ' + typeClass + '" />';
	var $dom = $(html);
	
	var combo = $dom.kendoComboBox({
		dataSource: typeValue,
		dataTextField: "LABEL",
		dataValueField: "DATA",
		enable: attrKey['readonly'] ? attrKey['readonly']:true,
		change: function (e) { 
			var params = params;
			var dataItem = e.sender.dataItem();
			var textfield = '';
			var codefield = ''; 
			if(typeOption){
				textfield = typeOption.textfield,
				codefield = typeOption.codefield;
			}
			 
			var obj = {};
			$.each(dataItem,function(key,val){
				if(typeof val == 'string' && key != 'uid' ){
					options.model.set(key, val);
				}
			})
			if(textfield)
				options.model.set(textfield, dataItem.LABEL);
			if(codefield)
				options.model.set(codefield, dataItem.DATA);

			var $tr =$('[data-uid = "'+options.model.uid+'" ]');
			var grind = $tr.eq(0).getGrid()
			updateRow($tr.eq(0));
		}
	});  
	
	
	if(gridConfig.exposeField){
		return html;
	}else{
		$dom.appendTo(container); 
	}
}


**/
// readonly필드
//- [cval] : 셀의 값, [opts] : row옵션들, [rowObject] : row의 모든정보 , [typeOption] : html기본제공 옵션 
//- [typeCss] : style Css, [typeClass] : class명, [name] : grid modelName
var readOnlytextField = function(container,options,opts,model){
	var idx = options.model.parent().indexOf(options.model)+1;
	var id =  model.id+'_'+idx;
	var name= model.id; 
	var field = model.id ;
	var value ;
	if (typeof(options.model[model.id]) != 'undefined' && options.model[model.id] != null){
		value=options.model[model.id];
	}else{
		value='';
	}
	//수정20160803
	//var value = options.model[model.id]? options.model[model.id]:'';
	var typeClass = model.typeClass ? model.typeClass:'';
	var typeCss = model.typeCss ? model.typeCss:'';
	
	
	// 속성값 추가 20160601 - 전체 추가  
	var attr = $(container).data('attr');
	var attrKey ='' ;
	if(attr){
		if(typeof attr != 'object'){
			attr =JSON.parse(attr) ;
		}
		$.each(attr,function(key,val){
			attrKey = key+'="'+val+'" '
		})
	}
	
//	var html = '<input type="text" id="'+ field+'" value ="'+value+'"  name="' +field + '"'
	var html = '<input type="text"  value ="'+value+'"  name="' +field + '"'
//	+'style="'+typeCss+'"' 
//	+' style="width: 100px" '
	+'class="k-input ch_event k-textbox'+typeClass+'" readonly="readonly" '+attrKey+'/>'
	var $dom = $(html);
	
	if(gridConfig.exposeField){
		return html; 
	}else{ 
		$dom.appendTo(container); 
	}
	
}

//timePicker필드
var timePickerField = function(cval, opts, defaultValue, rowObject, typeOption, name){
	if(!cval){ cval=(defaultValue ? defaultValue:'')};
	var ids = (opts.colModel.alias ?opts.colModel.alias:opts.colModel.id)
	
	
	// 속성값 추가 20160601 - 전체 추가  
	var attr = $(container).data('attr');
	var attrKey ='' ;
	if(attr){
		if(typeof attr != 'object'){
			attr =JSON.parse(attr) ;
		}
		$.each(attr,function(key,val){
			attrKey = key+'="'+val+'" '
		})
	}
	
	/*
	 * @VIET - 보안 취약점 수정
	 */
	//var field = '<span><input type="text" style="width: 50px;" name="'+name+'['+eval(opts.rowId-1)+'].'+ids+'" value="'+cval+'" class="timepicker" '+attrKey+'/></span>'; 
	var field = '<span><input type="text" style="width: 50px;" name="'+name+'['+(opts.rowId-1)+'].'+ids+'" value="'+cval+'" class="timepicker" '+attrKey+'/></span>'; 
	return field;
}

// file 필드 (임시 테스트용)
//- [cval] : 셀의 값, [opts] : row옵션들, [rowObject] : row의 모든정보 , [typeOption] : html기본제공 옵션 
//- [typeCss] : style Css, [typeClass] : class명, [name] : grid modelName
var fileField = function(container,options,opts,model,a,b,c){ 
	var param = (typeof  param == 'string' ? JSON.parse(param):param);
//	var cval=(cval ? cval : '' ); 
	var idx = options.model.parent().indexOf(options.model)+1;
	var name= model.id+'_'+idx; 
	var value = options.model[model.id]? options.model[model.id]:'';
	
	var btn_id = 'button_'+idx+'_'+name; 
//	var id = param.id+'_'+idx; //여러개 팝업을 오픈해야할 경우
	var typeOption = model.typeOption ? model.typeOption:'';  
	var typeCss = model.typeCss ? model.typeCss:'';
	
	
	// 속성값 추가 20160601 - 전체 추가  
	var attr = $(container).data('attr');
	var attrKey ='' ;
	if(attr){
		if(typeof attr != 'object'){
			attr =JSON.parse(attr) ;
		}
		$.each(attr,function(key,val){
			attrKey = key+'="'+val+'" '
		})
	}
	 
	var typeClass = attrKey['disabled'] ? 'btg_gray bt_disabled' : (value? 'btg_blue':'') 
	
//	var field = '<input type="file" id="'+name+'['+eval(opts.rowId-1)+'].'+ids+'" multiple name="'+name+'['+eval(opts.rowId-1)+'].'+ids+'"  value="'+cval+'" style="'+typeCss+'" '+typeOption+' class="input0 '+typeClass+'" />'; 
	var field = '<span  id="'+btn_id+'" style="'+typeCss+'" '+typeOption+' class=" ac_click sbtn btn bts_fileupload '+typeClass+'"  data-func="commonFilePopup"  data-param="'+value + '" data-field="'+name+'.fileKey"></span>'
//	title += '<span id="' + btnId + '" class="sbtn btn ac_click  ico ' + icoCd + ' ' + btn.classes + '" data-func="' + btn.func + '" data-type="' + btn.type + '" data-cls="'
//	+ btn.cls + '" data-gridtype="' + types + '" data-width="' + btn.width + '" data-height="' + btn.height + '" data-url = "' + btn.url + '.' + btn.type 
//	+ '" data-field="' + btn.dataField + '" data-param="'+paramsData + '"data-firstrow="' + btn.firstRow+ '" '+(btn.hidden ? 'data-hidden="true"':'')+ '>' + label + '</span>'
		+ '<input type="text" id="'+name+'" name="'+name+'.fileKey" value="'+value+'" style="display:none;" />'
	
		
		
		
	return field; 
}

var setCommCodeSelect = function($obj){
//	var code = '${code}';
	var cls = $obj.data('cls');
	
	$.each(code,function(i,val){
		if(val.UP_COMM_CD){
			if(val.UP_COMM_CD == cls){
				$obj.append('<option value="'+val.DATA+'">'+val.LABEL+'</option>');
			}
		}
	})
	
}

var treeHeaderWrapper = function(container,opts,model,treeview,obj){
	var lev ;
	var pid ;
	var id ;
	var cssClass = '';
	if(container[treeview.levField]  ){
		lev =container[treeview.levField]  ;
		}
	if(container[treeview.pcodeField]){
		pid =container[treeview.pcodeField];
	}
	if(container[treeview.codeField] ){
		id = container[treeview.codeField]; 
	}
	//IITP유진정보 요청 변경- 변경사유 :  데이터를 불러올때 메소드 사용 안하고 query에서 HASCHILD를 추가
	if(container.hasChild || container.HASCHILD){
		cssClass='parent'; 
	}else{
		cssClass='noChild'; 
	}
	var html='<span class="tnode  '+cssClass+' lev'+lev+'" data-lev="'+lev+'" data-pid="'+pid+'" data-id="'+id+'"><span>'+container[model.id]+'</span></span> ';
	
	return html 
}


var DateStepper = function(cval,opts,rowObject,param,names,obj){
	var param = param;
	var cval=(cval ? cval : '' ); 
	var name= opts.colModel.index; 
	var cls = param.cls;
	var readonly = param.readonly;
	var inactivate = param.inactivate;
	var fun = (param.script ? param.script : '' );
	//값이 없을경우 오늘년월로 세팅
	var toDayYY = new Date().toJSON().substring(0,4);
	var toDayYM = new Date().toJSON().substring(0,7);
	if(cls == "YY"){ cval = (cval ? cval : toDayYY );
	}else{ cval = (cval ? cval : toDayYM.replace("-","") ); }
	
	// 버튼 : id="button_grid'+opts.rowId+''+opts.pos+'" - rowid와 pos(위치번호)를 조합한다.
	// -> rowid만 셋팅하면 같은 줄에서 여러개의 공통다이얼로그 사용 시 값이 제대로 bind되지 않는다.
	var htmls = '<span type="button" class="btn btm bt_ico f13  '+(inactivate=='true'? '':'ac_click')+' stepper_prev" data-inputid="'+name+'" data-cls="'+cls+'" data-callback="'+fun+'" style="padding:0;margin:0 1px 2px 0;"></span>'
		+'<span><input type="text" id="'+name+'" name="'+name+'" class="ac_change stepper_input" fpattern="stepper" data-callback="'+fun+'" value="'+cval+'" '+(readonly=='true'? 'readonly':'')+' style="width:'+(cls=='YY'? '40px':'60px')+';text-align:center;" maxlength="'+(cls=='YY'? '4':'7')+'"></span>'	
		+'<span type="button" class="btn btm bt_ico d13  '+(inactivate=='true'? '':'ac_click')+' stepper_next" data-inputid="'+name+'" data-cls="'+cls+'" data-callback="'+fun+'" style="padding:0;margin:0 0 2px 1px;"></span>'
		+'';

	return htmls; 
}

var GridDateStepper = function(cval,opts,rowObject,param,names,obj){
	var param = param;
	var cval=(cval ? cval : '' ); 
	/*
	 * @VIET - 보안 취약점 수정 
	 */
//	var idx = names+'['+eval(opts.rowId-1)+']'; 
	var idx = names+'['+(opts.rowId-1)+']';
	var name= opts.colModel.index; 
	var cls = param.cls;
	var readonly = param.readonly;
	var inactivate = param.inactivate;
	var fun = (param.script ? param.script : '' );
	//값이 없을경우 오늘년월로 세팅
	var toDayYY = new Date().toJSON().substring(0,4);
	var toDayYM = new Date().toJSON().substring(0,7);
	if(cls == "YY"){ cval = (cval ? cval : toDayYY );
	}else{ cval = (cval ? cval : toDayYM.replace("-","") ); }
	
	// 버튼 : id="button_grid'+opts.rowId+''+opts.pos+'" - rowid와 pos(위치번호)를 조합한다.
	// -> rowid만 셋팅하면 같은 줄에서 여러개의 공통다이얼로그 사용 시 값이 제대로 bind되지 않는다.
	var htmls = '<span type="button" class="btn btm bt_ico f13 ac_click stepper_next '+(inactivate=='true'? '':'ac_click')+' stepper_prev" data-inputid="'+idx+'.'+name+'" data-cls="'+cls+'" data-callback="'+fun+'" style="padding:0;margin:0 1px 2px 0;"></span>'
		+'<span><input type="text" id="'+idx+'.'+name+'" name="'+idx+'.'+name+'" class="ac_change stepper_input" fpattern="stepper" data-callback="'+fun+'" value="'+cval+'" '+(readonly=='true'? 'readonly':'')+' style="width:'+(cls=='YY'? '40px':'60px')+';text-align:center;" maxlength="'+(cls=='YY'? '4':'7')+'"></span>'	
		+'<span type="button" class="btn btm bt_ico d13 ac_click stepper_next '+(inactivate=='true'? '':'ac_click')+' stepper_next" data-inputid="'+idx+'.'+name+'" data-cls="'+cls+'" data-callback="'+fun+'" style="padding:0;margin:0 0 2px 1px;"></span>'
		+'';

	return htmls; 
}
//결재라인 팝업창 이벤트 추가
var gwLineViewlink = function (cval, opts, defaultValue, rowObject, typeOption, typeCss, typeClass, name) {// 해당 Column에 Link 걸기
	var rowid = opts.rowId;
	var val;
	if(rowObject.GW_DOC_NO){
		val = 'data-docno = "'+rowObject.GW_DOC_NO+'"'
	}
	
	if(cval){
		return '<span class= "ac_click link text" data-func="doGwLineView" data-rowid= "'+rowid+'" '+val+'>' + cval + '</span>';	
	}else{
		return '';
	}
	  
}
//결재문서 조회 팝업창 이벤트 추가
var gwDocViewlink = function (cval, opts, defaultValue, rowObject, typeOption, typeCss, typeClass, name) {// 해당 Column에 Link 걸기
	var rowid = opts.rowId;
	if(cval){
		return '<span class= "ico_결재 ac_click link" data-func="doGwDocView"  data-rowid= "'+rowid+'" data-docno="'+cval+'"></span>';	
	}else{ 
		return '';
	}
	  
}






//기능 추가 // 엑셀업로드 KJH  2018.01.09
//20180118 Excel 업로드 구현
function excelInput($obj){
	var colParam = '';
	var labelParam = {};
	var colList = $obj.getColList();
	
	if(colList.length > 0){
		$.each(colList, function(i, col){
			if(col.field != 'SEQ' && col.field != 'CRUD') {
//				colParam += col.field;
//				labelParam += col.title;
//				col.title
				labelParam[col.field] = col.title;
				
				
				
//				if(i < colList.length - 1) {
//					colParam += '-';
//					labelParam += '-';
//				}
			}
		});
		var type = $obj.data('type');
		var labelStr = getParamStr(labelParam);
		
		var parameterObj = getParamObj($obj.data('param'));
		var target = $obj.attr('id') ;

		parameterObj.headerID = labelStr;
//		parameterObj.headerLabel = labelParam;
		parameterObj.targetId = target;

		var url = CTX+'/excel/popupExcel.'+type;
		
		var width =  $obj.data('width') ? $obj.data('width') :'auto';
		var height =  $obj.data('height') ? $obj.data('height') :'auto';
		var offset = {'x':(parameterObj.x ? parameterObj.x :0), 'y':(parameterObj.y ? parameterObj.y :0)};

		parameterObj.type = type;
				
		var parameter='';
		var sep='';
		$.each(parameterObj,function(key, vals){
			parameter += sep + '"'+key +'"="'+vals+'"'
			sep = "&";
		});
		
		
//		parameter = getDialogPopupParam(getParamStr(parameterObj));
		parameter = encodeURI(parameter);
		

		if(type=="popup"){
			var open = window.open(url+'?'+parameter,'_file','width=' + width + ', height=' + height + ', resizable=no,location=no')
			open.focus();		
		} else {
			getDialogPopup(url, null, type, null, target, null, null, null, width, height,offset.x,offset.y, parameter);
		}
	}
}



function appendGridData(target, jsonData, appendTop, clear) {
	var $target = $('#'+target);
	var dataSource;
	
	// 초기 div id로도 가능하게
	try{
		dataSource = $target.getDataSource()
	} catch(e) {
		$target = $target.getViewGridWrap();
		dataSource = $target.getDataSource();
	}
	
	if(clear == 'true'){
		dataSource.data('');
	}
	var row;
	
	
	// Array 혹은 Object 사용 가능하도록 대응
	if(Array.isArray(jsonData)){
		$.each(jsonData, function(i, data){
			row = dataSource.add();
			dataSource.remove(row);
			// 20180206 김진학 - 필요없는 데이터가 추가되는 버그 수정
//			row = $.extend({}, row, data);
			row = data;
			if(appendTop == 'true'){
				dataSource.insert(i, row);
			}else{
				dataSource.insert(row);
			}
						
		})	
	} else {
		row = dataSource.add();
		dataSource.remove(row);
		// 20180206 김진학 - 필요없는 데이터가 추가되는 버그 수정
//		row = $.extend({}, row, data);
		row = jsonData;
		if(appendTop == 'true'){
			dataSource.insert(i, row);
		}else{
			dataSource.insert(row);
		}
	}

	dataSource.sync();
	
	var data = $target.getRowData();
	dataSource.data(data);
	
	$target.grid_callback_func($target.data('callback'))
	$target.grid_callback_func($target.data('boundevent'))
	if($target.getGrid().options.editable.createAt == 'bottom'){
		
	}
	
	initialDom();
	
}

function saveExcelGrid(target, jsonData) {
	var $form = $('#'+target).parents('form');
	var callback = $form.data('callback');
	
//	var $gridDom = $(form).find('.grid_target').getViewGrid();
	var $gridDom = $form.getFormViewGrid();
//	var $kendo = $form.data('kendoGrid')
//	var $kendoData = $form.data('kendoGrid').dataSource
	
//	var items = $form.find('.base_grid_table').getGrid().dataItems()
//	JSON.stringify($('.base_grid_table').data('kendoGrid').dataItems())
	
	var dataObj={};
	if($gridDom){
		$.each($gridDom, function(){
			dataObj[$(this).data('resultKey')] = jsonData;
		})
	}
	//$.extend( dataObj, $form.serializeObject);
	extendForm(dataObj,$form);
	
	var message={
	'QUESTION' : {'MESSAGE':'저장하시겠습니까?'},
	'FAIL':{'MESSAGE':'저장실패하였습니다.'},
	'SUCCESS':{'MESSAGE':'저장성공했습니다.'}
	}
	if($form.data('msg')){
		message = getMessage($form.data('msg'));
	}
	
	
	var arr = {};
	
	$.each($form.serializeArray2('.base_grid_table'), function(i,val){
		//유진요청 - exposeField 에 따라 그리드안에 인풋박스도 캐치됨
		// 수정 필요 TODO
		if(arr[val.name]){
			if(Array.isArray(arr[val.name])){
				arr[val.name].push(val.value)
			}else{
				var tmp = arr[val.name] 
				arr[val.name] = new Array();
				arr[val.name].push(tmp)
				arr[val.name].push(val.value)
			}
		}else{
			arr[val.name] = val.value;
			
		}
	}) ;
	
	$.extend( dataObj,arr);
	
	
	// mesaage (data-msg) 가 null 일경우 메시지 없음 
	// 로직 중복으로 수정필요
//	if($(form).data('msg') !=null){
		if(confirm(message.QUESTION.MESSAGE)){ 
			$.ajax({
				url : $form.attr('action'),
				//dataType:"json",
				cache:false,
				//async:false,
				data: dataObj,
				type:'POST',
				success:function(data, textStatus, jqXHR){
					data = data.replace(/\"/g,''); 
					if(data == "true" || data.result == "true" || data.result == true){
						if(data.msg2){
							alert(data.msg2);			 			
						}else{
							alert(message.SUCCESS.MESSAGE);
						}
					}else{
						//alert(data.message);
						// Server validation - 추후변경 
						if (data.UNVALIDATED) {
							serverInvalidated(data.UNVALIDATED, $(form));
						}
						// Server validation end
						if(data.msg2){
							alert(data.msg2);			 			
						}else if(data.message){
							alert(data.message)
						}else{
							alert(message.FAIL);
						}
					}		
					
					
					if(callback){
						/*
						 * @VIET - 보안 취약점 수정
						 */
//						eval(callback+'(form, data)'); 
						window[callback](form, data);
					}
				},complete: function(){
				
					return true;
				},error : function(){
					alert(message.FAIL);
					return false;
				}
			});
		}
}
