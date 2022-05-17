
$(document).ready(function(){
$('.form_search_box').prev('h4').css('display','none')
initTab()
$('select.ge_commCode').each(function(){
setCommCodeSelect($(this));
})
$(document).on('click','input[readonly][type="checkbox"]',function(){
return false;
})
initialDom($(document))
});
var initTab=function(){
$('ul.tab').each(function(){
var $target=$(this);
if($('#'+$target.data('rid')).length==0){
$target.after('<ul id="'+$target.data('rid')+'" class="tabContents">')
if($(this).hasClass('ajaxTab')){
$target.next('ul').append('<li></li>')
}else{
$target.find('li').each(function(i){
var gridId=$(this).data('id');
$target.next('ul').append('<li><div id="'+gridId+'"></div></li>');
})
}
}
})
}
function datepickerFromTo(fromNm,toNm){
$from=$('[name="'+fromNm+'"]');
$to=$('[name="'+toNm+'"]');
$from.data('fromnm',fromNm);
$from.data('tonm',toNm);
$to.data('fromnm',fromNm);
$to.data('tonm',toNm);
var fromData=$from.val();
var toData=$to.val();
if(fromData.match(/[0-9]{8}/g)){
fromData=fromData.substring(0,4)+'-'+
fromData.substring(4,6)+'-'+
fromData.substring(6,8)
}
if(toData.match(/[0-9]{8}/g)){
toData=toData.substring(0,4)+'-'+
toData.substring(4,6)+'-'+
toData.substring(6,8)
}
$to.datepicker('destroy');
$to.datepicker({"minDate":fromData,
onClose:dateFromTo,
'onSelect':function(){
$(this).focus()
},'buttonImageOnly':true,showOn:"button"});
$from.datepicker('destroy');
$from.datepicker({"maxDate":toData,
onClose:dateFromTo,'onSelect':function(){
$(this).focus()
},'buttonImageOnly':true,showOn:"button"
});
}
function dateFromTo(selectedDate){
var toNm=$(this).data('tonm');
var fromNm=$(this).data('fromnm');
datepickerFromTo(fromNm,toNm);
}
function hasClass(ele,cls){
return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
var initialDom=function(obj){
$(obj).find('input.datepicker').each(function(){
if($(this).hasClass('setFromTo')){
if(!$(this).hasClass('hasDatepicker')){
var fromNm=$(this).data('fromnm');
var toNm=$(this).data('tonm');
datepickerFromTo(fromNm,toNm);
}
}
if(!$(this).hasClass('hasDatepicker')){
$(this).datepicker({'onSelect':function(){
$(this).focus()
},'buttonImageOnly':true,showOn:"button"});
}
$(this).attr('pattern',"date");
});
$(obj).find('input.timepicker').each(function(){
$(this).timepicker({
'minTime':'9:00am',
'maxTime':'6:00pm',
'step':10,
'timeFormat':'H:i',
'scrollDefault':'now'
});
$(this).addClass('validate[time]')
$(this).attr('pattern',"time");
});
$(document).expressionEngine('attach');
$('input[type="checkbox"]:regex(value,\\[.*\\])').each(function(){
var $obj=$(this)
var val=$obj.val();
val=val.replace(/\[|\]/gi,'');
var list=val.split(',')
$.each(list,function(i,val){
var clone=$obj.clone();
clone.val(val)
clone.addClass('cloned')
$obj.before(clone);
})
$(this).parent().find('[type="checkbox"]').filter(':first').siblings('[type="checkbox"]').hide()
$(this).remove()
})
$(obj).find('input[type="checkbox"]').each(function(){
var id=$(this).prop('id');
var display=$(this).css('display')
var hide=$(this).hasClass('hide');
if(!id){
id='temp_check'+$('input[type="checkbox"]:regex(id,temp_check)').length
$(this).attr('id',id);
}
if(!hide&&display!='none'){
var $label=$(this).next('label')
if($label.length==0){
$(this).after('<label for="'+id+'"></label>')
}else{
$label.attr('for',id);
}
}
})
chkDomVlidate($(obj))
$(obj).find('select.readonly').find('option:not(:selected)').prop('disabled',true);
$('#loading1').hide();
}
var chkDomVlidate=function($obj){
$obj.find('[class*=validate]:not([type=checkbox]):not([type=radio])').each(function(){
var rulesParsing=$(this).attr('class')
var getRules=/validate\[(.*)\]/.exec(rulesParsing);
if(getRules){
var str=getRules[1];
var rules=str.split(/\[|,|\]/);
var have_required=$.inArray('required',rules);
if(have_required>=0){
if($(this).parent('.box_txt ,.t_txt').prev('.box_tit,.t_tit').length>0){
var $targetObj=$(this).parent('.box_txt ,.t_txt').prev('.box_tit,.t_tit');
if($targetObj.find('label.aster').length==0){
var fieldNM=$targetObj.text()
$targetObj.text(fieldNM.trim())
$targetObj.append('<label class="aster" style="color:red;">*</label>')
}
}else if($(this).parents('.ui-jqgrid-bdiv').prev('.ui-jqgrid-hdiv').length>0){
var $td=$(this).parent('td')
var $th=$(this).parents('.ui-jqgrid-bdiv').prev('.ui-jqgrid-hdiv').find('th#'+$td.attr('aria-describedby'))
if($th.find('div.ui-jqgrid-sortable').find('label.aster').length==0){
$th.find('div.ui-jqgrid-sortable').find('span').before('<label class="aster" style="color:red;   ">*</label>')
}
}
else if($(this).parents('td').prev('th').length>0){
if($(this).parents('td').prev('th').find('label.aster').length==0){
var fieldNM=$(this).parents('td').prev('th').text()
$(this).parents('td').prev('th').text(fieldNM.trim());
$(this).parents('td').prev('th').append('<label class="aster" style="color:red;   ">*</label>')
}
}
}else{
if($(this).parent('.box_txt ,.t_txt').prev('.box_tit,.t_tit').length>0){
var $targetObj=$(this).parent('.box_txt ,.t_txt').prev('.box_tit,.t_tit');
if($targetObj.length==0){
var fieldNM=$targetObj.text()
$targetObj.text(fieldNM.trim())
$targetObj.find('label.aster').remove()
}
}else if($(this).parents('.ui-jqgrid-bdiv').prev('.ui-jqgrid-hdiv').length>0){
var $td=$(this).parent('td')
var $th=$(this).parents('.ui-jqgrid-bdiv').prev('.ui-jqgrid-hdiv').find('th#'+$td.attr('aria-describedby'))
$th.find('div.ui-jqgrid-sortable').find('label.aster').remove()
}
else if($(this).parents('td').prev('th').length>0){
if($(this).parents('td').prev('th').find('label').length==0){
var fieldNM=$(this).parents('td').prev('th').text()
$(this).parents('td').prev('th').text(fieldNM.trim());
$(this).parents('td').prev('th').find('label.aster').remove()
}
}
}
}
})
}
var getPopupSize=function(cls,param){
if(cls=="member"){
param['width']="950";
param['height']="650";
}else if(cls=="depart"){
param['width']="400";
param['height']="600";
}else if(cls=="ntn"){
param['width']="500";
param['height']="600";
}else if(cls=="post"){
param['width']="570";
param['height']="700";
}else if(cls=="bank"){
param['width']="400";
param['height']="700";
}
}
function getGridDialogPopupParam(param){
var deleteItem=['target','codefield','textfield','cls','funcname','width','height'];
var paramsObj={};
var paramsData='';
if(param){
$.each(deleteItem,function(i,key){
delete param[key];
paramsObj=param;
});
$.each(paramsObj,function(key,val){
var com=',';
paramsData+=key+':'+val+com;
});
if(paramsData)paramsData='{'+paramsData.replace(/,$/g,'')+'}';
}
return paramsData;
}
var ChoiceInputFormDialog=function(cval,opts,rowObject,param,names,obj){
var param=param;
var cval=(cval?cval:'');
var idx=names+'['+eval(opts.rowId-1)+']';
var name=opts.colModel.index;
var code=param.target;
var codeField=param.codefield;
var textField=param.textfield;
var textClass=param.class;
var textStyle=(param['textStyle']?param.textStyle:'width:100px');
var cls=param.cls;
var funcname=(param.funcname?param.funcname:'onSelectGrid');
getPopupSize(cls,param);
var width=(param.width?param.width:'600');
var height=(param.height?param.height:'500');
var paramsData=param.params;
var btn_id="button_"+opts.gid+opts.rowId+''+opts.pos;
var id=param.id;
var validate;
if(param.validate){
validate='validate['+param.validate+']'
}
var typeOption=param.typeOption;
var pattern=(param.pattern?param.pattern:'');
var all='';
if(funcname=='onSelectGridAll'){all='All';}
var htmls='<input type="text" id="'+idx+'.'+name+'" name="'+idx+'.'+name+'" '+typeOption+'  class="gridInput buttoned '+textClass+' '+validate+'" '+(pattern?'pattern="'+pattern+'"':'')+' style="'+textStyle+'" value = "'+cval+'" onkeypress="ChoiceInputFormOnkeypress(event,\''+btn_id+'\',\'grid\')" onkeyup="ChoiceInputFormOnkeyup'+all+'(\''+btn_id+'\',\'grid\')">'
+'<span id="'+btn_id+'" data-width="'+width+'" data-height="'+height+'" data-id="'+id+'" data-idx= "'+idx+'" type="button" class="grid ico_small l13 bg_mint ac_click popup " data-type="dialog" data-url="/common/popup/controls.do" data-defaultvalue=""'
+'data-param="'+paramsData+'" data-id="search" data-cls="'+cls+'" data-targetcode = "'+codeField+'" data-targettext = "'+textField+'" data-prev="'+idx+'.'+name+'" data-next="'+idx+'.'+code+'" data-funcname="'+funcname+'" data-eventtype="ondblClickRow"></span>'
+''
return htmls;
}
var ChoiceInputFormPopup=function(cval,opts,rowObject,param,names,obj){
var param=param;
var cval=(cval?cval:'');
var idx=names+'['+eval(opts.rowId-1)+']';
var name=opts.colModel.index;
var code=param.target;
var codeField=param.codefield;
var textField=param.textfield;
var textClass=param.class;
var textStyle=(param['textStyle']?param.textStyle:'width:100px');
var cls=param.cls;
var funcname=(param.funcname?param.funcname:'onSelectGrid');
getPopupSize(cls,param);
var width=(param.width?param.width:'auto');
var height=(param.height?param.height:'auto');
var paramsData=param.params
var btn_id="button_"+opts.gid+opts.rowId+''+opts.pos;
var id=param.id;
var validate;
if(param.validate){
validate='validate['+param.validate+']'
}
var typeOption=param.typeOption;
var pattern=(param.pattern?param.pattern:'');
var all='';
if(funcname=='onSelectGridAll'){all='All';}
var htmls='<input type="text" id="'+idx+'.'+name+'" '+typeOption+' name="'+idx+'.'+name+'" class="gridInput buttoned '+textClass+' '+validate+'"  '+(pattern?'pattern="'+pattern+'"':'')+' style="'+textStyle+'" value = "'+cval+'" onkeypress="ChoiceInputFormOnkeypress(event,\''+btn_id+'\',\'grid\')" onkeyup="ChoiceInputFormOnkeyup'+all+'(\''+btn_id+'\',\'grid\')">'
+'<span id="'+btn_id+'" data-width="'+width+'" data-height="'+height+'" data-id="'+id+'" data-idx= "'+idx+'" type="button" class="grid ico_small l13 bg_mint ac_click popup " data-type="popup" data-url="/common/popup/controls.do" data-defaultvalue=""'
+'data-param="'+paramsData+'" data-id="search" data-cls="'+cls+'" data-targetcode = "'+codeField+'" data-targettext = "'+textField+'" data-prev="'+idx+'.'+name+'" data-next="'+idx+'.'+code+'" data-funcname="'+funcname+'" data-eventtype="ondblClickRow"></span>'
return htmls;
}
var ChoiceInputFormOnkeypress=function(e,target,type){
if(e.keyCode==13){
var $target=$('#'+target.replace('.','\\.'));
var name=$target.data('prev');
var code=$target.data('next');
var $prevTarget=$('#'+name.replace('[','\\[').replace(']','\\]').replace('.','\\.'));
var $nextTarget="";
if(type=="grid"){
$nextTarget=$target.parents('tr').find('input[name="'+$target.data('next')+'"]');
}else{
$nextTarget=$('#'+code.replace('[','\\[').replace(']','\\]').replace('.','\\.'));
}
var cls=$target.data('cls');
var id=$target.data('id');
var funcname=$target.data('funcname');
var targetcode=$target.data('targetcode');
var targettext=$target.data('targettext');
var callback=$target.data('callback');
var _url="";
var postData={};
postData[targettext]=$prevTarget.val();
if(cls=="member"||cls=="eamEmpMulti"){
postData['HOLD_CLS']='101-010';
_url=CTX+'/common/popup/getDataEmpPopup.ajax';
}else if(cls=="depart"){
_url=CTX+'/common/popup/getDataDepartOnce.ajax';
}else if(cls=="ntn"){
_url=CTX+'/common/popup/getDataNtnPopup.ajax';
}
$.ajax({
url:_url,
data:postData,
cache:false,
success:function(data,textStatus,jqXHR){
if(data.length==1){
if(funcname!="onSelectGrid"&&funcname!="onSelect"){
eval(funcname+"EnterOne(data,id,target)");
}else{
$(data).each(function(idx,item){
eval("$prevTarget.val(item."+targettext+");");
eval("$nextTarget.val(item."+targetcode+");");
});
if(type=="grid"){
updateRow($prevTarget);
}
if(callback)eval(callback);
}
}else{
$target.trigger('click');
}
}
});
}
};
var textField=function(cval,opts,defaultValue,rowObject,typeOption,typeCss,typeClass,maxLength,name){
if(cval==null){if(cval!=0){cval=(defaultValue?defaultValue:'')}};
if(typeOption=='undefined'||!typeOption)typeOption='';
if(typeClass=='undefined'||!typeClass)typeClass='';
if(typeCss=='undefined'||!typeCss)typeCss='';
if(maxLength=='undefined'||!maxLength)maxLength='';
var field='<input type="text" id="'+name+'['+eval(opts.rowId-1)+'].'+opts.colModel.id+'" name="'+name+'['+eval(opts.rowId-1)+'].'+opts.colModel.id+'"  value="'+cval+'" style="'+typeCss+'" '+typeOption+' class="input0 '+typeClass+'" '+(maxLength?'maxlength="'+maxLength+'"':'')+'/>';
return field;
}
var textAreaField=function(cval,opts,defaultValue,rowObject,typeOption,typeCss,typeClass,name){
if(cval==null){cval=(defaultValue?defaultValue:'')};
if(typeOption=='undefined'||!typeOption)typeOption='';
if(typeClass=='undefined'||!typeClass)typeClass='';
if(typeCss=='undefined'||!typeCss)typeCss='';
var field='<textarea name="'+name+'['+eval(opts.rowId-1)+'].'+opts.colModel.id+'" style="width:100%; '+typeCss+'" class="textarea0 '+typeClass+'" >'+cval+'</textarea>';
return field;
}
var readOnlytextField=function(cval,opts,defaultValue,rowObject,typeOption,typeCss,typeClass,name){
if(cval==null){if(cval!=0){cval=(defaultValue?defaultValue:'')}};
if(typeOption=='undefined'||!typeOption)typeOption='';
if(typeClass=='undefined'||!typeClass)typeClass='';
if(typeCss=='undefined'||!typeCss)typeCss='';
var field='<input type="text" name="'+name+'['+eval(opts.rowId-1)+'].'+opts.colModel.id+'" value="'+cval+'" style="'+typeCss+'" readonly '+typeOption+' class="input0 '+typeClass+'"/>';
return field;
}
var checkBoxField=function(cval,opts,defaultValue,rowObject,typeOption,data,typeCss,typeClass,name,obj){
if(!cval){cval=(defaultValue?defaultValue:'')};
var gridId=$(obj).attr('id');
var field='';
var checked='';
if(typeOption=='undefined'||!typeOption)typeOption='';
if(typeClass=='undefined'||!typeClass)typeClass='';
if(typeCss=='undefined'||!typeCss)typeCss='';
if(data){
$.each(data,function(i,val){
if((cval==val.DATA)||(cval==''&&i==data.length-1)){
checked='checked';
}else{checked='';}
field+='<input type="checkbox" id="'+name+'['+eval(opts.rowId-1)+'].'+opts.colModel.id+'" name="'+name+'['+eval(opts.rowId-1)+'].'+opts.colModel.id+'" '+(typeOption.typeHeader?'':typeOption)+' value="'+val.DATA+'" '+checked+' class="toggle '+typeClass+'" style="'+(i==0?"":"display:none")+'"/>';
})
}else{
field+='<input type="checkbox" id="'+name+'['+eval(opts.rowId-1)+'].'+opts.colModel.id+'" name="'+name+'['+eval(opts.rowId-1)+'].'+opts.colModel.id+'" '+(typeOption.typeHeader?'':typeOption)+' class="toggle '+typeClass+'" />';
if(typeOption.typeHeader){
if($('#'+gridId+'_'+opts.colModel.id).find('#'+gridId+'_check_all_'+opts.colModel.id).length<=0){
var $txt=$('#'+gridId+'_'+opts.colModel.id).find('div')
var toggle='<span style="margin-top: 0; display: inline-block;"><input type="checkbox" id="'+gridId+'_check_all_'+opts.colModel.id+'" data-id= "'+opts.colModel.id+'" class="toggle check_all" /><label for="'+gridId+'_check_all_'+opts.colModel.id+'"></label>'+$txt.text()+'</span>';
$txt.remove()
$('#'+gridId+'_'+opts.colModel.id).append(toggle)
}
}
}
return field;
}
var datePickerField=function(cval,opts,defaultValue,rowObject,typeOption,typeCss,typeClass,name){
if(!cval){cval=(defaultValue?defaultValue:'');};
var field="";
var fromNm="";
var toNm="";
var arr=[];
if(typeOption!=null&&typeOption!=''){
arr=typeOption.split(":");
if(arr[0]=='setFromTo'){
fromNm=name+'['+eval(opts.rowId-1)+'].'+opts.colModel.id;
toNm=name+'['+eval(opts.rowId-1)+'].'+arr[1];
field='<span><input type="text" style="width: 70px;" name="'+name+'['+eval(opts.rowId-1)+'].'+opts.colModel.id+'" value="'+cval+'" class="datepicker '+typeClass+' setFromTo" data-fromnm="'+fromNm+'" data-tonm="'+toNm+'"/></span>';
}
}else{
field='<span><input type="text" style="width: 70px;" name="'+name+'['+eval(opts.rowId-1)+'].'+opts.colModel.id+'" value="'+cval+'" class="datepicker '+typeClass+'" /></span>';
}
return field;
}
var timePickerField=function(cval,opts,defaultValue,rowObject,typeOption,name){
if(!cval){cval=(defaultValue?defaultValue:'')};
var field='<span><input type="text" style="width: 50px;" name="'+name+'['+eval(opts.rowId-1)+'].'+opts.colModel.id+'" value="'+cval+'" class="timepicker"/></span>';
return field;
}
var passwordField=function(cval,opts,defaultValue,rowObject,typeOption,typeCss,typeClass,name){
if(!cval){cval=(defaultValue?defaultValue:'')};
if(typeOption=='undefined'||!typeOption)typeOption='';
if(typeClass=='undefined'||!typeClass)typeClass='';
if(typeCss=='undefined'||!typeCss)typeCss='';
var field='<span><input type="password" name="'+name+'['+eval(opts.rowId-1)+'].'+opts.colModel.id+'" value="'+cval+'" style="'+typeCss+'" '+typeOption+' class="input0 '+typeClass+'"/></span>';
return field;
}
var selectField=function(cval,opts,defaultValue,defaultText,rowObject,typeOption,typeValue,typeCss,typeClass,name){
if(typeOption=='undefined'||!typeOption)typeOption='';
if(typeClass=='undefined'||!typeClass)typeClass='';
if(typeCss=='undefined'||!typeCss)typeCss='';
if(defaultValue=='undefined'||!defaultValue)defaultValue='';
if(defaultText=='undefined'||!defaultText){defaultText='::선택::';}
else{
if(defaultText=='null'){
defaultText=null;
}
}
var addedFields=[];
if(typeOption.addedFields!='undefined'&&typeOption.addedFields){
if(typeOption.addedFields instanceof Array)
addedFields=typeOption.addedFields
}
var field='<select name="'+name+'['+eval(opts.rowId-1)+'].'+opts.colModel.id+'" '+typeOption+' style="'+typeCss+'" class="'+typeClass+'">';
if(defaultText){
field+='<option value="">'+defaultText+'</option>';
}
if(typeValue instanceof Array){
$.each(typeValue,function(i,val){
var optionField='';
if(addedFields.length>0){
$.each(addedFields,function(j,field){
if(val[field]){
optionField+='data-'+field+' = "'+val[field]+'" ';
}
})
}
field+='<option value="'+val.DATA+'" '+(cval==val.DATA?"selected":"")+' '+optionField+'>'+val.LABEL+'</option>';
});
}else{
}
field+='</select>';
return field;
}
var fileField=function(cval,opts,defaultValue,rowObject,typeOption,typeCss,typeClass,name){
if(cval==null){cval=''};
$.each(defaultValue,function(i,obj){
cval+=rowObject[obj]
})
if(typeOption=='undefined'||!typeOption)typeOption='';
if(typeClass=='undefined'||!typeClass)typeClass='';
if(typeCss=='undefined'||!typeCss)typeCss='';
var field='<span   style="'+typeCss+'" '+typeOption+' class=" sbtn btn ac_click bg_mint ico a7"  data-func="commonFilePopup"  data-param="'+cval+'" data-field="'+name+'['+eval(opts.rowId-1)+'].fileKey">  첨부파일 </span>'
+'<input type="text" id="'+name+'['+eval(opts.rowId-1)+'].'+opts.colModel.id+'" name="'+name+'['+eval(opts.rowId-1)+'].fileKey" value="'+cval+'" style="display:none;" />'
return field;
}
var setCommCodeSelect=function($obj){
var cls=$obj.data('cls');
$.each(code,function(i,val){
if(val.UP_COMM_CD){
if(val.UP_COMM_CD==cls){
$obj.append('<option value="'+val.DATA+'">'+val.LABEL+'</option>');
}
}
})
}
var treeHeaderWrapper=function(funcName,cellvalue,option,rowObject,treeview){
var lev;
var pid;
var id;
if(rowObject[treeview.levField])lev=rowObject[treeview.levField]
if(rowObject[treeview.pcodeField])pid=rowObject[treeview.pcodeField]
if(rowObject[treeview.codeField])id=rowObject[treeview.codeField]
var html='<span class="tnode   lev'+lev+'" data-lev="'+lev+'" data-pid="'+pid+'" data-id="'+id+'"><span></span></span>';
if(funcName){
var result=funcName(cellvalue,option,rowObject);
html+=result;
}else{
html+=cellvalue;
}
return html;
}
var GridDateStepper=function(cval,opts,rowObject,param,names,obj){
var param=param;
var cval=(cval?cval:'');
var idx=names+'['+eval(opts.rowId-1)+']';
var name=opts.colModel.index;
var cls=param.cls;
var readonly=param.readonly;
var inactivate=param.inactivate;
var fun=(param.script?param.script:'');
var toDayYY=new Date().toJSON().substring(0,4);
var toDayYM=new Date().toJSON().substring(0,7);
if(cls=="YY"){cval=(cval?cval:toDayYY);
}else{cval=(cval?cval:toDayYM.replace("-",""));}
var htmls='<span type="button" class="ico_small f13 bg_mint '+(inactivate=='true'?'':'ac_click')+' stepper_prev" data-inputid="'+idx+'.'+name+'" data-cls="'+cls+'" data-callback="'+fun+'" style="padding:0;margin:0 1px 2px 0;"></span>'
+'<span><input type="text" id="'+idx+'.'+name+'" name="'+idx+'.'+name+'" class="ac_change stepper_input" pattern="stepper" data-callback="'+fun+'" value="'+cval+'" '+(readonly=='true'?'readonly':'')+' style="width:'+(cls=='YY'?'40px':'60px')+';text-align:center;" maxlength="'+(cls=='YY'?'4':'7')+'"></span>'
+'<span type="button" class="ico_small d13 bg_mint '+(inactivate=='true'?'':'ac_click')+' stepper_next" data-inputid="'+idx+'.'+name+'" data-cls="'+cls+'" data-callback="'+fun+'" style="padding:0;margin:0 0 2px 1px;"></span>'
+'';
return htmls;
}
var gwLineViewlink=function(cval,opts,defaultValue,rowObject,typeOption,typeCss,typeClass,name){
var rowid=opts.rowId;
var val;
if(rowObject.GW_DOC_NO){
val='data-docno = "'+rowObject.GW_DOC_NO+'"'
}
if(cval){
return'<span class= "ac_click link text" data-func="doGwLineView" data-rowid= "'+rowid+'" '+val+'>'+cval+'</span>';
}else{
return'';
}
}
var gwDocViewlink=function(cval,opts,defaultValue,rowObject,typeOption,typeCss,typeClass,name){
var rowid=opts.rowId;
if(cval){
return'<span class= "ico_결재 ac_click link" data-func="doGwDocView"  data-rowid= "'+rowid+'" data-docno="'+cval+'"></span>';
}else{
return'';
}
}
