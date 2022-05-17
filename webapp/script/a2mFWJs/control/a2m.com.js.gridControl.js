
(function($){
var datas;
var grid;
var maxLength=3000;
var maxGroupLength=20;
var agt=navigator.userAgent.toLowerCase();
var $target;
var GridHeight;
if(agt.indexOf("chrome")!=-1){
maxLength=3000;
}else if(agt.indexOf("msie")!=-1){
maxLength=3000;
}
var setDataBinderGrid=function($thisGrid){
var $grid_message=$target.find('#grid_message');
var message=' (총 '+datas.length+'건의 데이터가 존재합니다.)';
$grid_message.text(message);
var intervals;
}
$.fn.setViewGrid=function(options){
datas=null;
var $formId;
$target=$(this);
$(this).setGridEvent();
$target.GridDestroy();
$target.empty();
var defaultGridOptions={
sortable:true,
loadonce:true
};
var opts=$.extend({},$.fn.setViewGrid.defaults,options);
var gridOptions=$.extend({},defaultGridOptions,opts.gridOptions);
opts.gridOptions=gridOptions;
if(opts.gridOptions.height){
opts.gridOptions.height=opts.gridOptions.height-60
$target.data('height',opts.gridOptions.height);
}
opts['datatype']='local';
if(!opts.localData){
if(opts.url){
opts['datatype']='json';
}
}
if(opts.param){
if(opts.param instanceof Object){
}else{
$formId=$('#'+opts.param)
opts.param=$formId.serialize();
}
}else{
$formId=$('.form_search_box')
opts.param=$formId.serialize();
}
var types='crud';
if(opts.treeview){
types='tree';
opts.gridOptions.sortable=false;
}
if(gridOptions.caption){
var title='<h5><label>'+gridOptions.caption+'</label><label id="grid_message" style="font-weight:normal;"></label><div class="float_right">';
if(opts.btn.length>0){
$.each(opts.btn,function(i,val){
if(Object.keys(val).length>0){
var btn=opts.btn[i];
var btnId='button_'+btn.button+'_'+opts.id;
var icoCd='';
var label=btn.label;
if(btn.button=='add'){
icoCd='bg_gray a13'
if(!btn.label){
label='추가';
}
}else if(btn.button=='delete'){
icoCd='bg_gray b13'
if(!btn.label){
label='삭제';
}
}else if(btn.button=='save'){
icoCd='bg_orange g8';
if(!btn.func){
btn.func='save';
}
if(!btn.label){
label='저장';
}
}else if(btn.button=='excel'){
icoCd='bg_gray o4';
if(!btn.func){
btn.func='excel';
}
if(btn.hidden){
}
if(!btn.label){
label='엑셀다운로드';
}
}else if(btn.button=='excelUp'){
icoCd='bg_gray m4';
if(!btn.func){
btn.func='excelUpload';
}
if(!btn.label){
label='엑셀업로드';
}
}else if(btn.button=='excelSam'){
icoCd='bg_gray o4';
if(!btn.func){
btn.func='excelSample';
}
if(!btn.label){
label='엑셀업로드양식';
}
}
else if(btn.button=='help'){
if(!btn.label){
label='도움말';
}
icoCd='bg_gray i9';
}else{
label=btn.label;
}
var paramsData=getGridDialogPopupParam(btn.param);
title+='<span id="'+btnId+'" class="sbtn btn ac_click  ico '+icoCd+' '+btn.classes+'" data-func="'+btn.func+'" data-type="'+btn.type+'" data-cls="'
+btn.cls+'" data-gridtype="'+types+'" data-width="'+btn.width+'" data-height="'+btn.height+'" data-url = "'+btn.url+'.'+btn.type
+'" data-field="'+btn.dataField+'" data-param="'+paramsData+'"data-firstrow="'+btn.firstRow+'" '+(btn.hidden?'data-hidden="true"':'')+'>'+label+'</span>'
}
})
}
title+='</div></h5>';
$target.append(title);
}
$target.addClass('grid_event_apply')
$target.append('<table id="table_'+opts.id+'" class="base_grid_table"> ')
$target.append('<div id="pager_'+opts.id+'" class=""> ')
opts=genColModel(opts);
var $parent=$target.parent('li');
var display=$parent.css('display');
var hide=$parent.hasClass('hide');
$parent.show();
if($formId){
if(validateWithOutForm($formId)){
drawGrid(opts);
$formId.expressionEngine('attach');
}
}else{
drawGrid(opts);
}
if(hide||display=='none'){
$parent.hide();
}
$('#table_'+opts.id).jqGrid('setGroupHeaders',{
useColSpanStyle:true,
groupHeaders:opts.colGroup
});
resizeGrid()
};
var genFrozen=function(opts){
$('#frozen_wrapper').remove();
var $target=$('#table_'+opts.id).parents('div.ui-jqgrid-bdiv');
var $headTarget=$target.prev();
var headHtml=$headTarget.find('table').clone();
var html=$('#table_'+opts.id).clone();
$target.after('<div id="frozen_wrapper" style="position: absolute; top: 0; overflow-y: hidden;overflow-x: hidden;">'
+'<div id="frozen_hgrids" class="frozen"> </div><div id="frozen_grids" class="frozen" style="overflow-y: hidden;overflow-x: hidden;"> </div></div>');
$('div#frozen_wrapper').css('position','absolute');
genFrozenContents(opts);
}
var genFrozenContents=function(opts){
var frozenCols=getFrozenCol(opts);
var $target=$('#table_'+opts.id).parents('div.ui-jqgrid-bdiv');
var $headTarget=$target.prev();
var headHtml=$headTarget.find('table').clone();
var html=$('#table_'+opts.id).clone();
var $frozenWrapper=$('div#frozen_wrapper')
var $frozenHeadWrapper=$('div#frozen_hgrids')
var $frozenGridWrapper=$('div#frozen_grids')
$frozenHeadWrapper.empty();
$frozenHeadWrapper.append(headHtml);
$frozenGridWrapper.empty();
$frozenGridWrapper.append(html);
$frozenHeadWrapper.children('.ui-jqgrid-htable').prop('id','frozen_table_hgrid');
$frozenGridWrapper.children('#table_'+opts.id).prop('id','frozen_table_grid');
var $frozenHeadGrid=$('#frozen_table_hgrid');
var $frozenTable=$('#frozen_table_grid');
$frozenTable.css('width','');
$frozenHeadGrid.css('width','');
$frozenTable.find('tr:first td').each(function(i,obj){
if(i>frozenCols.frozenColArray.length+1){
$(obj).remove()
}
})
$frozenHeadGrid.find('tr').each(function(i,obj){
$(obj).find('th').each(function(j,val){
if(j>frozenCols.frozenColArray.length+1){
$(val).remove()
}
});
})
$.each(frozenCols.normalColArray,function(i,col){
$frozenTable.find('td[aria-describedby="table_grid_'+col+'"]').remove()
$frozenHeadGrid.find('th#table_grid_'+col).remove();
})
$frozenTable.width($frozenHeadGrid.width())
$frozenHeadGrid.find('tr:not(".jqg-first-row-header") th').eq(0).css('cssText','height :'+eval($headTarget.find('table tr:not(".jqg-first-row-header") th').eq(0).height()+2)+'px !important');
$frozenHeadGrid.find('tr:not(".jqg-first-row-header") th').eq(0).css('width',25)
$frozenTable.css('margin-top','1px');
$frozenGridWrapper.css('padding-bottom','1px');
$frozenGridWrapper.css('overflow-y','hidden');
$frozenGridWrapper.find('tr:first,tr:not(".jqgfirstrow"):first ').find(':first').css('width',25);
$frozenGridWrapper.find('input,select').each(function(){
$(this).data('id',$(this).prop('name'));
$(this).removeAttr('name');
})
$('#frozen_grids').css('width',$frozenWrapper.width()).css('height',$target.height()-13)
setFrozenEvent(opts)
}
var restoreGrid=function(opts){
genFrozen(opts);
}
var setFrozenEvent=function(opts){
var $target=$('#table_'+opts.id).parents('div.ui-jqgrid-bdiv');
var $grid=$('#table_'+opts.id).jqGrid();
var $frozenWrapper=$('div#frozen_wrapper');
var $frozenHeadWrapper=$('div#frozen_hgrids');
var $frozenGridWrapper=$('div#frozen_grids');
$frozenGridWrapper.on('click',' .parent span.tnode > span',function(){
});
$('#frozen_hgrids table tr th').hover(
function(){
$(this).addClass('ui-state-hover');
},function(){
$(this).removeClass('ui-state-hover');
}
);
$('#table_'+opts.id).parents('div.ui-jqgrid-bdiv').scroll(function(){
$frozenGridWrapper.animate({scrollTop:$(this).scrollTop()},0);
});
$('div.frozen').on('change','table tr input:not("[type="checkbox"]"), table tr select',function(){
var $el=$('#table_'+opts.id).find('[name="'+$(this).data('id')+'"]');
$el.val($(this).val());
updateRow($el);
});
$frozenGridWrapper.on('change',' table tr td input[type="checkbox"]',function(){
var $target=$(this).next('tr td input[type="checkbox"]');
var $el=$('#table_'+opts.id).find('[name="'+$(this).data('id')+'"]:first');
if($(this).prop('checked')){
$target.prop('checked',false)
$el.prop('checked',true).trigger('change')
}else{
$target.prop('checked',true)
$el.prop('checked',false).trigger('change')
}
updateRow($el);
});
$target.find('table').on('click','tr',function(){
$('div#frozen_grids').find('tr#'+$(this).attr('id')).addClass('ui-state-highlight').siblings().removeClass('ui-state-highlight');
});
$frozenGridWrapper.on('focus','tr',function(){
$target.find('tr#'+$(this).attr('id')).trigger('click');
});
$target.find('table tr').hover(
function(){
$frozenGridWrapper.find('tr#'+$(this).attr('id')).addClass('ui-state-hover');
},
function(){
$frozenGridWrapper.find('tr#'+$(this).attr('id')).removeClass('ui-state-hover');
}
);
$frozenGridWrapper.find('table tr').hover(
function(){
$target.find('tr#'+$(this).attr('id')).trigger('mouseover');
},function(){
$target.find('tr#'+$(this).attr('id')).trigger('mouseout');
}
);
$frozenHeadWrapper.on('click','.ui-jqgrid-sortable',function(){
$('.ui-jqgrid-hbox .ui-jqgrid-htable').find('#'+$(this).prop('id')).trigger('click');
});
$('#frozen_grids').on('customEvents',function(){
restoreGrid(opts)
});
$('div#frozen_grids tr').on('keydown','input:not([style="display:none"]):last, select:not([style="display:none"]):last',function(e){
var keyCode=e.keyCode||e.which;
if(keyCode==9){
var length=$(this).parents('tr').find('td').length;
$grid.find('tr#'+$(this).parents('tr').prop('id')+' td:nth-child('+(length)+')').find('input,select').focus();
}
});
$grid.find('tr').find(' td:last').on('keydown',' input:not([style="display:none"]):last,  select:not([style="display:none"]):last',function(e){
var keyCode=e.keyCode||e.which;
if(keyCode==9){
var length=$(this).parents('tr').find('input,select').length;
$('div#frozen_grids').find('tr#'+(eval($(this).parents('tr').prop('id'))+1)+' ').find('input:not([style="display:none"]),select:not([style="display:none"])').filter(':first').focus();
}
});
};
var getFrozenCol=function(opts){
var frozenColArray=new Array();
var normalColArray=new Array();
$.each(opts.colModels,function(i,val){
if(!val.frozen){
normalColArray.push(val.id);
}else{
frozenColArray.push(val.id)
}
})
return{
'frozenColArray':frozenColArray,
'normalColArray':normalColArray
};
}
var genColModel=function(opts){
var colNames=[];
var list=[];
var modelName=opts.modelName;
colNames.push('상태');
var objs={};
objs['name']='CRUD';
objs['index']='CRUD';
objs['width']='35';
objs['frozen']=true;
objs['formatter']=function(cval,opts,rowObject){
return'<input type="text" name="'
+modelName
+'['
+eval(opts.rowId-1)
+'].CRUD" value="'
+(cval?cval:'')
+'" class="crud input0" readonly="readonly" style="width:21px;text-align:center;background-color:#fff;"/>'
};
objs['cellattr']=function(rowId,tv,rawObject,cm,rdata){
return'col="'+cm.name+'"';
};
objs['hidden']=(opts.displayState?!opts.displayState:!false);
list.push(objs);
$.each(opts.colModels,function(i,model){
var obj=model;
colNames.push(model.name);
obj['name']=model.id;
obj['index']=model.id;
if(obj['title']){
obj['title']=obj['title'];
}else{
obj['title']=false;
}
if(obj['cellattr']){
var func=obj['cellattr'];
obj['cellattr']=function(rowId,tv,rawObject,cm,rdata){
result=func(rowId,tv,rawObject);
var title='';
if(obj['title']){
title='title = "'+obj['title']+'"';
}
return'id="'+cm.name+'_'+rowId+'" '+title+' '+' col="'+cm.name+'" idx="'+rowId+'"'+result;
}
}else{
obj['cellattr']=function(rowId,tv,rawObject,cm,rdata){
var title='';
if(obj['title']){
title='title = "'+obj['title']+'"';
}
return'id="'+cm.name+'_'+rowId+'" '+title+' '+' col="'+cm.name+'" idx="'+rowId+'"';
}
}
if(opts.type=='tree'){
}
$.each(opts.defaultOptions,function(key,val){
if(!obj[key])
obj[key]=val;
})
obj['sortable']=opts.gridOptions.sortable;
if(obj.attrType){
if(obj.typeValue){
obj['formatter']=formatter(opts,obj,obj.attrType,
obj.typeOption,obj.typeCss,obj.typeClass,obj.defaultValue,obj.defaultText,
obj.typeValue);
}else{
obj['formatter']=formatter(opts,obj,obj.attrType,
obj.typeOption,obj.typeCss,obj.typeClass,obj.defaultValue,obj.defaultText);
}
}else{
if(obj['formatter']=='undefined'){
if(opts.defaultAttrType){
obj['formatter']=formatter(opts,obj,
opts.defaultAttrType,obj.typeOption,
obj.typeCss,obj.typeClass,obj.defaultValue);
}else{
obj['formatter']=formatter(opts,obj,'view',
obj.typeOption,obj.typeCss,obj.typeClass,obj.defaultValue);
}
}else{
}
}
if(opts.treeview){
if(model.id==opts.treeview.viewField){
var func=obj['formatter'];
obj['formatter']=function(cellValue,option,rowObject){
return treeHeaderWrapper(func,cellValue,option,
rowObject,opts.treeview);
}
}
obj['sortable']=false;
}
list.push(obj);
})
opts['colModel']=list;
opts['colViewNames']=colNames;
return opts;
}
var formatter=function(opts,obj,edittype,typeOption,typeCss,typeClass,defaultValue,defaultText,
typeValue){
var functionName;
if(!(edittype instanceof Object)){
switch(edittype){
case'view':
break;
case'text':
functionName=textField;
functionName=new Function(
'cellvalue',
'option',
'rowObject',
'var typeValue = '
+JSON.stringify(typeValue)
+';'
+'var typeOption = '
+JSON.stringify(typeOption)
+';'
+'var typeCss = '
+JSON.stringify(typeCss)
+';'
+'var typeClass = '
+JSON.stringify(typeClass)
+';'
+'var defaultValue = '
+JSON.stringify(defaultValue)
+';'
+'var cellvalue = cellvalue;'
+'var option = option;'
+'var rowObject = rowObject;'
+'var cm = cm;'
+'var rdata = rdata;'
+'var maxLength = '+obj.maxlength+';'
+'return textField(cellvalue,option,defaultValue,rowObject,typeOption,typeCss,typeClass,maxLength,\''
+opts.modelName+'\',this);'+'');
break;
case'textArea':
functionName=textAreaField;
functionName=new Function(
'cellvalue',
'option',
'rowObject',
'var typeValue = '
+JSON.stringify(typeValue)
+';'
+'var typeOption = '
+JSON.stringify(typeOption)
+';'
+'var typeCss = '
+JSON.stringify(typeCss)
+';'
+'var typeClass = '
+JSON.stringify(typeClass)
+';'
+'var defaultValue = '
+JSON.stringify(defaultValue)
+';'
+'var cellvalue = cellvalue;'
+'var option = option;'
+'var rowObject = rowObject;'
+'var cm = cm;'
+'var rdata = rdata;'
+'return textAreaField(cellvalue,option,defaultValue,rowObject,typeOption,typeCss,typeClass,\''
+opts.modelName+'\',this);'+'');
break;
case'readonlytext':
functionName=new Function(
'cellvalue',
'option',
'rowObject',
'var typeValue= '
+JSON.stringify(typeValue)
+';'
+'var typeOption= '
+JSON.stringify(typeOption)
+';'
+'var typeCss= '
+JSON.stringify(typeCss)
+';'
+'var typeClass= '
+JSON.stringify(typeClass)
+';'
+'var defaultValue = '
+JSON.stringify(defaultValue)
+';'
+'var cellvalue = cellvalue;'
+'var option = option;'
+'var rowObject =rowObject;'
+'var cm= cm; var rdata= rdata;'
+'return readOnlytextField(cellvalue,option,defaultValue,rowObject,typeOption,typeCss,typeClass,\''
+opts.modelName+'\',this);'+'');
break;
case'password':
functionName=new Function(
'cellvalue',
'option',
'rowObject',
'var typeValue = '
+JSON.stringify(typeValue)
+';'
+'var typeOption = '
+JSON.stringify(typeOption)
+';'
+'var typeCss= '
+JSON.stringify(typeCss)
+';'
+'var typeClass= '
+JSON.stringify(typeClass)
+';'
+'var defaultValue = '
+JSON.stringify(defaultValue)
+';'
+'var cellvalue = cellvalue;'
+'var option = option;'
+'var rowObject = rowObject;'
+'var cm = cm;'
+'var rdata = rdata;'
+'return passwordField(cellvalue,option,defaultValue,rowObject,typeOption,typeCss,typeClass,\''
+opts.modelName+'\',this);'+'');
break;
case'popup':
functionName='';
break;
case'dialog':
functionName='';
break;
case'datepicker':
functionName=new Function(
'cellvalue',
'option',
'rowObject',
'var typeValue = '
+JSON.stringify(typeValue)
+';'
+'var typeOption = '
+JSON.stringify(typeOption)
+';'
+'var typeCss= '
+JSON.stringify(typeCss)
+';'
+'var typeClass= '
+JSON.stringify(typeClass)
+';'
+'var defaultValue = '
+JSON.stringify(defaultValue)
+';'
+'var cellvalue = cellvalue;'
+'var option = option;'
+'var rowObject = rowObject;'
+'var cm = cm;'
+'var rdata = rdata;'
+'return datePickerField(cellvalue,option,defaultValue,rowObject,typeOption,typeCss,typeClass,\''
+opts.modelName+'\',this);'+'');
break;
case'timepicker':
functionName=new Function(
'cellvalue',
'option',
'rowObject',
'var typeValue = '
+JSON.stringify(typeValue)
+';'
+'var typeOption = '
+JSON.stringify(typeOption)
+';'
+'var defaultValue = '
+JSON.stringify(defaultValue)
+';'
+'var cellvalue = cellvalue;'
+'var option = option;'
+'var rowObject = rowObject;'
+'var cm = cm;'
+'var rdata = rdata;'
+'return timePickerField(cellvalue,option,defaultValue,rowObject,typeOption,\''
+opts.modelName+'\',this);'+'');
break;
case'button':
functionName='';
break;
case'checkbox':
functionName=new Function(
'cellvalue',
'option',
'rowObject',
'var typeValue = '
+JSON.stringify(typeValue)
+';'
+'var typeOption = '
+JSON.stringify(typeOption)
+';'
+'var typeCss= '
+JSON.stringify(typeCss)
+';'
+'var typeClass= '
+JSON.stringify(typeClass)
+';'
+'var defaultValue = '
+JSON.stringify(defaultValue)
+';'
+'var cellvalue = cellvalue;'
+'var option = option;'
+'var rowObject = rowObject;'
+'var cm = cm;'
+'var rdata = rdata;'
+'return checkBoxField(cellvalue,option,defaultValue,rowObject,typeOption,typeValue,typeCss,typeClass,\''
+opts.modelName+'\',this);'+'');
break;
case'select':
functionName=new Function(
'cellvalue',
'option',
'rowObject',
'var typeValue = '
+JSON.stringify(typeValue)
+';'
+'var typeOption = '
+JSON.stringify(typeOption)
+';'
+'var typeCss= '
+JSON.stringify(typeCss)
+';'
+'var typeClass= '
+JSON.stringify(typeClass)
+';'
+'var defaultValue = '
+JSON.stringify(defaultValue)
+';'
+'var defaultText = '
+JSON.stringify(defaultText)
+';'
+'var cellvalue = cellvalue;'
+'var option = option;'
+'var rowObject = rowObject;'
+'var cm = cm;'
+'var rdata= rdata;'
+'return selectField(cellvalue,option,defaultValue,defaultText,rowObject,typeOption,typeValue,typeCss,typeClass,\''
+opts.modelName+'\',this);'+'');
break;
case'gwLineViewlink':
functionName=new Function(
'cellvalue',
'option',
'rowObject',
'var typeValue = '
+JSON.stringify(typeValue)
+';'
+'var typeOption = '
+JSON.stringify(typeOption)
+';'
+'var typeCss= '
+JSON.stringify(typeCss)
+';'
+'var typeClass= '
+JSON.stringify(typeClass)
+';'
+'var defaultValue = '
+JSON.stringify(defaultValue)
+';'
+'var defaultText = '
+JSON.stringify(defaultText)
+';'
+'var cellvalue = cellvalue;'
+'var option = option;'
+'var rowObject = rowObject;'
+'var cm = cm;'
+'var rdata= rdata;'
+'return gwLineViewlink(cellvalue,option,defaultValue,rowObject,typeOption,typeValue,typeCss,typeClass,\''
+opts.modelName+'\',this);'+'');
break;
case'gwDocViewlink':
functionName=new Function(
'cellvalue',
'option',
'rowObject',
'var typeValue = '
+JSON.stringify(typeValue)
+';'
+'var typeOption = '
+JSON.stringify(typeOption)
+';'
+'var typeCss= '
+JSON.stringify(typeCss)
+';'
+'var typeClass= '
+JSON.stringify(typeClass)
+';'
+'var defaultValue = '
+JSON.stringify(defaultValue)
+';'
+'var defaultText = '
+JSON.stringify(defaultText)
+';'
+'var cellvalue = cellvalue;'
+'var option = option;'
+'var rowObject = rowObject;'
+'var cm = cm;'
+'var rdata= rdata;'
+'return gwDocViewlink(cellvalue,option,defaultValue,rowObject,typeOption,typeValue,typeCss,typeClass,\''
+opts.modelName+'\',this);'+'');
break;
case'file':
functionName=fileField;
functionName=new Function(
'cellvalue',
'option',
'rowObject',
'var typeValue = '
+JSON.stringify(typeValue)
+';'
+'var typeOption = '
+JSON.stringify(typeOption)
+';'
+'var typeCss = '
+JSON.stringify(typeCss)
+';'
+'var typeClass = '
+JSON.stringify(typeClass)
+';'
+'var defaultValue = '
+JSON.stringify(defaultValue)
+';'
+'var cellvalue = cellvalue;'
+'var option = option;'
+'var rowObject = rowObject;'
+'var cm = cm;'
+'var rdata = rdata;'
+'return fileField(cellvalue,option,defaultValue,rowObject,typeOption,typeCss,typeClass,\''
+opts.modelName+'\',this);'+'');
break;
}
}else{
if(!functionName){
functionName=edittype.func;
var funcParams={};
funcParams=JSON.stringify(edittype.param);
var obj=new Function('cellvalue','option','rowObject',
'var params = '+funcParams+';'
+'var cellvalue = cellvalue;'
+'var option = option;'
+'var rowObject = rowObject;'+'var cm = cm;'
+'var rdata= rdata;'+'return '
+functionName
+'(cellvalue,option,rowObject,params,\''
+opts.modelName+'\',this);'+'');
functionName=obj;
}
}
return functionName;
}
var getGridOption=function(opts){
}
var drawGrid=function(opts){
var local=[]
var $grid=$('#table_'+opts.id);
if(opts.localData){
local=opts.localData;
datas=opts.localData;
}else{
local=[];
datas=[];
if(opts.url){
$.ajax({
url:opts.url,
type:'POST',
data:opts.param,
async:false,
cache:false,
success:function(data,textStatus,jqXHR){
if(data.length>0){
if(data.length>maxLength){
local=data
datas=data;
}else{
local=data;
datas=data;
}
}else{
local=[];
datas=[];
}
},
complete:function(){
}
});
}
}
var custRowAttr=opts.rowattr;
var rowattr=function(rowData,currentObj,rowId){
var result;
if(custRowAttr){
result=custRowAttr(rowData,currentObj,rowId);
}
if(currentObj.hasChild){
return $.extend({},{
'class':'parent',
'data-lev':currentObj.LEV
},result)
}else{
return $.extend({},{
'data-lev':currentObj.LEV
},result)
}
};
var gridOptions={
datatype:'local',
data:local,
autowidth:true,
shrinkToFit:false,
forceFit:false,
width:opts.gridOptions.width,
height:opts.gridOptions.height,
scrollrows:true,
colNames:opts.colViewNames,
colModel:opts.colModel,
loadonce:opts.gridOptions.loadonce,
sortable:false,
scroll:(local.length>maxLength?1:false),
rowNum:(local.length>maxLength?20:1000000),
rownumbers:opts.gridOptions.rownumbers,
viewrecords:true,
emptyrecords:'조회된 데이터가 없습니다.',
loadComplete:function(){
initialDom($(this));
if(opts['pinHeader']==true){
if(!opts.treeview){
genFrozen(opts)
}
}
if(opts.gridOptions.setDataBinderGrid!=false){
setDataBinderGrid($grid);
}
if(opts.groupAggregation){
try{
groupAggregation($(this),opts.groupAggregation['groupColumns'],
opts.groupAggregation['sumColumns'],'',opts.gridOptions.rownumbers,
opts.displayState);
}catch(e){
}
}
if(opts.groupMerger){
opts.gridOptions.rownumbers;
merger($(this),opts.groupMerger['groupColumns']);
}
if(opts.callback instanceof Array){
$.each(opts.callback,function(i,val){
eval(val+'()')
})
}else{
if(opts.callback){
if(opts.callback instanceof Function){
var caller=eval(opts.callback)
caller();
}else{
if(opts.callback.indexOf('(')>0){
eval(opts.callback)
}else{
eval(opts.callback+'()')
}
}
}
}
},
rowattr:function(rowData,currentObj,rowId){
return rowattr(rowData,currentObj,rowId)
},
loadtext:'loading...'
}
if(opts.events.length>0){
$.each(opts.events,
function(i,val){
var event={};
var funcName;
if(val.funcName){
if(val.type){
if(val.funcName=='onSelectAll'
||val.funcName=='onSelectGridAll'){
funcName=val.funcName+val.cls
+val.type
}else{
funcName=val.funcName+val.type
}
}else{
funcName=val.funcName
}
}else{
if(val.type){
funcName=val.type
}else{
funcName=''
}
}
event[val.event]=new Function(
'rowid',
'iRow',
'iCol',
'rowData',
'var rowData = rowData;var rowid = rowid;var target = \''
+val.target
+'\';var iRow=iRow;var iCol= iCol;var callback=\''
+val.callback
+'\'; '
+funcName
+'(rowid,iRow,iCol,rowData,target,callback,this);'
+(val.callback
&&val.callback!='undefined'?val.callback
+'(rowid,iRow,iCol,rowData,target,callback,this)'
:''));
gridOptions=$.extend({},gridOptions,event)
})
}
grid=$grid.jqGrid(gridOptions);
$grid.expressionEngine('attach')
if(opts.method){
$.each(opts.method,function(i,val){
var methodparams=new Array();
;
$.each(val['param'],function(key,vals){
methodparams.push(vals);
})
eval('grid.'+val['method']+'('+methodparams.toString()
+')')
});
}
};
$.fn.setViewGrid.defaults={
id:'grid',
type:'',
url:'',
data:[],
colViewNames:[],
colModelNames:[],
colAttrTypes:[],
options:[],
defaultOptions:{},
events:[],
btn:[],
gridType:'crudGrid'
};
$.fn.setGridEvent=function(){
$(this).on('focus','div:not(".frozen") > table[id^="table_"] td input, div:not(".frozen") > table[id^="table_"] td textarea',function(){
$(this).parents('table').jqGrid().setSelection($(this).parent('td').parent('tr').prop('id'));
});
$(this).on('change','div:not(".frozen") > table tr input:not("[type="checkbox"]"), div:not(".frozen") > table tr select, div:not(".frozen") > table tr textarea',function(){
updateRow($(this));
});
};
})(jQuery);
var reGen=function(obj){
var result;
if(obj instanceof Array){
var result={};
$.each(obj,function(key,ob){
$.each(ob,function(key,val){
if(val&&val.indexOf('input')>0){
var html=$.parseHTML(val);
ob[key]=$(html).val();
}else{
ob[key]=val;
}
})
})
}
else{
var object={}
var objectVal=obj;
$.each(obj,function(key,val){
if(val&&val.indexOf('input')>0){
var html=$.parseHTML(val);
object[key]=$(html).val();
}else{
object[key]=val;
}
})
result=object;
}
return result
}
function groupAggregation($grid,GroupCellNames,SumCellNames,AvgCellNames,
DisplayRownum,displayState){
var mya=$grid.getDataIDs();
var length=mya.length;
var total={};
total['total']={};
if(SumCellNames){
if(SumCellNames instanceof Array){
$.each(GroupCellNames,function(i,GroupCellName){
total[GroupCellName]={}
$.each(SumCellNames,function(i,SumCellName){
total[GroupCellName][SumCellName]=0;
})
})
$.each(SumCellNames,function(i,SumCellName){
total['total'][SumCellName]=0;
})
}else{
total[SumCellNames]=0;
}
}
for(var i=0;i<length;i++){
var aa=$grid.jqGrid('getRowData',mya[i]);
var before=reGen(aa);
var end;
var rowSpanTaxCount=1;
var loop=1;
$.each(GroupCellNames,function(x,GroupCellName){
$.each(SumCellNames,function(y,SumCellName){
total[GroupCellName][SumCellName]=eval(total[GroupCellName][SumCellName])
+eval(removeComma(before[SumCellName]));
})
})
$.each(SumCellNames,function(y,SumCellName){
total['total'][SumCellName]=total['total'][SumCellName]
+(before[SumCellName]?eval(removeComma(before[SumCellName])):0);
})
if(GroupCellNames.length>0){
for(j=i+1;j<=length;j++){
var end=$grid.jqGrid('getRowData',mya[j]);
end=reGen(end);
var iter=false;
var target=[];
$.each(GroupCellNames,function(k,GroupCellName){
if(before[GroupCellName]!=end[GroupCellName]){
if(!iter){
iter=true;
}
target.push(GroupCellName);
}else{
if(iter){
target.push(GroupCellName);
}
}
})
if(!iter){
iter=false;
rowSpanTaxCount++;
loop=rowSpanTaxCount;
$.each(GroupCellNames,function(i,GroupCellName){
$.each(SumCellNames,function(i,SumCellName){
total[GroupCellName][SumCellName]=eval(total[GroupCellName][SumCellName])
+eval(removeComma(end[SumCellName]));
})
})
$.each(SumCellNames,function(y,SumCellName){
total['total'][SumCellName]=total['total'][SumCellName]
+eval(removeComma(end[SumCellName]));
})
}
if(iter){
rowSpanTaxCount=1;
var $view=$grid.find('tr#'+(i+loop))
var tdLength=$view.find('td').length;
if(j==length){
end=$grid.jqGrid('getRowData',mya[j-1]);
end=reGen(end);
}
$.each(target,function(y,GroupCellName){
$view.after('<tr class="ui-sum " data-target="'+GroupCellName+'" ></tr>')
if(DisplayRownum){
$view.next('tr').append('<td style="text-align:right"></td>')
}
$.each(end,function(key,vals){
if(GroupCellNames.indexOf(key)>=0){
if(GroupCellName==key){
$view.next('tr').append('<td style="text-align:center">소계</td>')
}else if(y<GroupCellNames.indexOf(key)){
$view.next('tr').append('<td style="text-align:right"></td>')
}
}else if(SumCellNames.indexOf(key)>=0){
$view.next('tr').append('<td style="text-align:right">'+addComma(total[GroupCellName][key])+'</td>')
total[GroupCellName][key]=0;
}else{
if($view.find('[col="'+key+'"]').css('display')!='none'){
$view.next('tr').append('<td style="text-align:right"></td>')
}
}
})
})
i=j-1;
break;
}
if(j==length){
end=$grid.jqGrid('getRowData',mya[j-1]);
end=reGen(end);
}
}
}else{
end=$grid.jqGrid('getRowData',mya[length-1]);
end=reGen(end);
}
}
for(var i=0;i<length;i++){
var $view=$grid.find('tr#'+(i+1))
$.each(GroupCellNames,function(k,GroupCellName){
if(($view.prev('.ui-sum').length==0&&i!=0)||(k<GroupCellNames.indexOf($view.prev('.ui-sum').data('target')))){
$grid.setCell(mya[i],GroupCellName,'',{display:'none'});
}else{
var lengths=$view.nextUntil('tr.ui-sum[data-target="'+GroupCellName+'"]').length
$("#"+GroupCellName+"_"+mya[i]+"").attr("rowspan",lengths+1);
if(k==0){
$("#"+GroupCellName+"_"+mya[i]+"").parent('tr').addClass('rowspaned')
}
}
})
}
var $view=$grid.find('tr:last');
$view.after('<tr class="ui-sum " data-target="total" ></tr>')
var $prev=$grid.find('tr.rowspaned:last');
if($prev.length==0)
$prev=$grid.find('tr.jqgrow:last');
if(DisplayRownum){
$view.next('tr').append('<td style="text-align:right"></td>');
}
$.each($prev.find('td'),function(z,vals){
var key=$(this).attr('col');
if(SumCellNames.indexOf(key)>=0){
$view.next('tr').append('<td style="text-align:right">'+addComma(total['total'][key])+'</td>')
}else{
if(key&&$(this).css('display')!='none'){
if((DisplayRownum&&$view.next('tr').find('td').length==1)||(!DisplayRownum&&$view.next('tr').find('td').length==0)){
if(DisplayRownum){
}
$view.next('tr').append('<td >합계</td>');
}else{
$view.next('tr').append('<td style="text-align:right"></td>');
}
}
}
})
}
function merger($grid,CellNames){
var mya=$grid.getDataIDs();
var length=mya.length;
var cnt=0;
cnt=0;
for(var i=cnt;i<length;i++){
var before=$grid.jqGrid('getRowData',mya[i]);
var rowSpanTaxCount=1;
var loops=length;
$.each(CellNames,function(k,CellName){
for(j=i+1;j<i+loops;j++){
var end=$grid.jqGrid('getRowData',mya[j]);
if(before[CellName]==end[CellName]){
rowSpanTaxCount++;
$grid.setCell(mya[j],CellName,'',{display:'none'});
}else{
cnt=j;
loops=rowSpanTaxCount;
break;
}
}
if(rowSpanTaxCount>1){
$grid.find("#"+CellName+"_"+mya[i]+"").attr("rowspan",rowSpanTaxCount);
loops=rowSpanTaxCount;
rowSpanTaxCount=1;
}
})
loops=length;
}
}
function onSelectdialog(rowid,iRow,iCol,rowData,target,callback,obj){
var $target=$('#'+target.replace('.','\\.'))
var $prevTarget=$target.prevAll('[name="'+$target.data('prev')+'"]').eq(0);
var $nextTarget=$target.nextAll('[name="'+$target.data('next')+'"]').eq(0);
var $cls=$target.data('cls');
var data=$(obj).jqGrid('getRowData',rowid);
$prevTarget.val(data[$target.data('targettext')]);
$nextTarget.val(data[$target.data('targetcode')]);
var func=$target.data("callback")
destroyDialogPopup($(obj));
}
function onSelectpopup(rowid,iRow,iCol,rowData,target,callback,obj){
var $target=$(window.opener.document).find('#'+target.replace('.','\\.'))
var $prevTarget=$target.prevAll('[name="'+$target.data('prev')+'"]').eq(0);
var $nextTarget=$target.nextAll('[name="'+$target.data('next')+'"]').eq(0);
var $cls=$target.data('cls');
var data=$(obj).jqGrid('getRowData',rowid);
$prevTarget.val(data[$target.data('targettext')]);
$nextTarget.val(data[$target.data('targetcode')]);
window.close();
}
function onSelectGriddialog(rowid,iRow,iCol,rowData,target,callback,obj){
var $target=$('#'+target.replace('.','\\.'))
var idx=$target.data('idx')+'.';
var $prevTarget=$target.prev('[name="'+$target.data('prev')+'"]').eq(0);
var $nextTarget=$target.parents('tr').find('input[name="'+$target.data('next')+'"]');
var $cls=$target.data('cls');
var data=$(obj).jqGrid('getRowData',rowid);
$prevTarget.val(data[$target.data('targettext')]);
$nextTarget.val(data[$target.data('targetcode')]);
$prevTarget.trigger('change');
updateRow($prevTarget)
closeDialogPopup($(obj));
}
function onSelectGridpopup(rowid,iRow,iCol,rowData,target,callback,obj){
var $target=$(window.opener.document).find(
'#'+target.replace('.','\\.'))
var idx=$target.data('idx')+'.';
var $prevTarget=$target.prev('[name="'+$target.data('prev')+'"]').eq(
0);
var $nextTarget=$target.parents('tr').find(
'input[name="'+$target.data('next')+'"]');
var $cls=$target.data('cls');
var data=$(obj).jqGrid('getRowData',rowid);
$prevTarget.val(data[$target.data('targettext')]);
$nextTarget.val(data[$target.data('targetcode')]);
updateRow($prevTarget);
window.close();
}
$(document).ready(function(){
$(document).on('click','div:not(".frozen") >table  tr.parent span.tnode > span',function(){
var $parent=$(this).parent('span');
var $node;
$($parent).parents('tr').nextAll().each(function(){
if($(this).data('lev')<=$parent.data('lev')){
$node=$(this);
return false;
}
})
if($parent.hasClass('fold')){
$parent.removeClass('fold');
if($node){
$($parent).parents('tr').nextUntil('#'+$node.attr('id')).each(function(){
if($(this).filter('.hide').data('lev')-1==$parent.parents('tr').data('lev')){
$(this).removeClass('hide')
}
})
}else{
$($parent).parents('tr').nextAll().each(function(){
if($(this).filter('.hide').data('lev')-1==$parent.parents('tr').data('lev')){
$(this).removeClass('hide')
}
})
}
}else{
$parent.addClass('fold');
if($node){
$($parent).parents('tr').nextUntil('#'+$node.attr('id')).each(function(){
$(this).addClass('hide')
$(this).find('.tnode ').addClass('fold')
})
}else{
$($parent).parents('tr').nextAll().each(function(){
$(this).addClass('hide')
$(this).find('.tnode ').addClass('fold')
})
}
}
})
})
var save=function(obj){
obj.parents('form').submit();
}
function updateRow(obj){
var $grid=$(obj).parents('table[role="grid"]').jqGrid();
var gridId=$grid.prop('id')
var rowId=$(obj).parents('tr:first').prop('id')
var $row=$(obj).parents('tr:first')
var $stat=$row.find('td > input.crud')
var statValue=true;
var dataRow=$grid.getLocalRow(rowId);
$row.find('input:not([readonly="readonly"]), select:not([readonly="readonly"]), textarea:not([readonly="readonly"])').each(function(i,val){
var key=$(val).parents('td').attr('col');
if(Object.size(dataRow)>0){
if(!dataRow[key]){
dataRow[key]=''
}
if($(this).is('[type="checkbox"]')){
var vals=dataRow[key];
if($(this).parent().find('input[type="checkbox"]').length>1){
if(!vals){
vals=$(this).parent().find('input:last').val()
}
}
if($(this).parent().find('input:checked').length>0){
if(vals!=$(this).parent().find('input:checked').val()){
statValue=false;
}
}
}else{
var val=$(this).val();
if($(this).has('[pattern]')){
$(this).expressionEngine('fieldDetValue')
val=$(this).val();
$(this).expressionEngine('fieldAttValue')
}
if(dataRow[key]!=val){
statValue=false;
}
}
}
})
if($stat.val()!='C'){
if(statValue){
$stat.val('');
$row.removeClass('updatedRow')
}else{
$stat.val('U');
$row.addClass('updatedRow')
}
}
$('#frozen_grids').trigger('customEvents')
}
function addRow(obj){
var func=$(obj).data('func');
var type=$(obj).data('type');
var cls=$(obj).data('cls');
var gridTypes=$(obj).data('gridtype');
var url=$(obj).data('url');
var width=$(obj).data('width');
var height=$(obj).data('height');
var dataField=$(obj).data('field').split(',');
var dataStr=$(obj).data('param');
var data={};
var gridId=$(obj).parents('h5').parent('div').attr('id');
var $grid=$('#'+gridId+' table#table_'+gridId).jqGrid();
var selectedId=$grid.find('tr[aria-selected="true"]').prop('id');
var rowData;
if(selectedId){
rowData=$grid.getLocalRow(selectedId);
}
var sep='';
if(rowData!=null){
$.each(dataField,function(i,val){
data[val]=rowData[val];
dataStr+=sep+val+"="+rowData[val];
sep='&';
});
}
if(type=='popup'){
var sep='';
if(dataStr)
sep='&';
window.open(url+'?'+dataStr+sep+'type='+type,'_target',
width="600");
}else if(type=='dialog'){
var $target=generateDialogDom();
$.ajax({
url:url,
data:$.extend({
'type':type
,'cls':cls
},data),
cache:false,
success:function(data,textStatus,jqXHR){
$target.html(data);
}
});
if(height=='undefined'){
height=700
}
if(width=='undefined'){
width=998
}
$target.dialog({
resizable:false,
width:width,
height:height,
modal:true,
open:function(){$(".ui-dialog").css("box-shadow","#999 5px 5px 5px");},
close:function(){
destroyDialogPopup($target);
}
});
}else{
var parameters={
rowID:$grid.jqGrid('getGridParam','records')+1,
initdata:{
CRUD:'C'
},
data:[],
position:'first',
useDefValues:false,
useFormatter:false,
addRowParams:{
extraparam:{}
}
};
if(gridTypes=='tree'){
parameters.position='first';
$grid.jqGrid('addRow',parameters);
$preRow=$grid.find('#'+selectedId);
$rowClone=$grid.find('tr:not(".jqgfirstrow"):first');
$preRow.after($rowClone);
$rowClone.focus()
}else{
parameters.position='first';
$grid.jqGrid('addRow',parameters);
}
}
initialDom($grid)
$('#frozen_grids').trigger('customEvents');
}
function deleteRow(obj){
var func=$(obj).data('func');
var type=$(obj).data('type');
var gridTypes=$(obj).data('gridtype');
var gridId=$(obj).parents('h5').parent('div').prop('id');
var $grid=$('#'+gridId+' table#table_'+gridId).jqGrid();
var selectedId=$grid.find('tr[aria-selected="true"]').prop('id')
var $selectedRow=$grid.find('#'+selectedId);
var $stat=$selectedRow.find('td > input.crud')
if($stat.val()=='D'){
updateRow($stat)
$selectedRow.removeClass('deletedRow')
}else if($stat.val()=='C'){
$selectedRow.remove();
}else{
$stat.val('D');
$selectedRow.addClass('deletedRow')
}
$('#frozen_grids').trigger('customEvents');
}
function generateExcelInfo(gridId,excelTitle,hiddenColumnDisplay){
if(hiddenColumnDisplay==null)hiddenColumnDisplay=false;
var groupStartColumnIds="";
var groupNumberOfColumns="";
var groupColumnNames="";
var groupHeader=$("#table_"+gridId).getGridParam("groupHeader");
if(groupHeader!=null){
var groupHeaders=groupHeader.groupHeaders;
if(groupHeaders!=null){
for(var i=0;i<groupHeaders.length;i++){
if(i==0){
groupStartColumnIds=groupStartColumnIds+groupHeaders[i].startColumnName;
groupNumberOfColumns=groupNumberOfColumns+groupHeaders[i].numberOfColumns;
groupColumnNames=groupColumnNames+groupHeaders[i].titleText;
}else{
groupStartColumnIds=groupStartColumnIds+","+groupHeaders[i].startColumnName;
groupNumberOfColumns=groupNumberOfColumns+","+groupHeaders[i].numberOfColumns;
groupColumnNames=groupColumnNames+","+groupHeaders[i].titleText;
}
}
groupColumnNames=groupColumnNames.replace(/(<([^>]+)>)/gi,"");
}
}
var colType=[];
var colNames=$("#table_"+gridId).getGridParam("colNames");
var colModel=$("#table_"+gridId).getGridParam("colModel");
var columnIds="";
var columnNames="";
if(colNames!=null&&colModel!=null){
for(var i=0;i<colNames.length;i++){
if(colNames[i]!=""){
if(hiddenColumnDisplay==true||(hiddenColumnDisplay==false&&colModel[i].hidden==false)){
if(columnIds==""){
if(colModel[i].name!="CRUD"){
columnIds=columnIds+colModel[i].name;
columnNames=columnNames+colNames[i];
if($('[col="'+colModel[i].name+'"]').find('input').length>0){
if($('[col="'+colModel[i].name+'"]:last input').datas().indexOf(',')>0||$('[col="'+colModel[i].name+'"]:last input').datas().indexOf(',')>0){
colType.push(true)
}else{colType.push(false)}
}else{
if($('[col="'+colModel[i].name+'"]:last').datas().indexOf(',')>0||$('[col="'+colModel[i].name+'"]:last').datas().indexOf(',')>0){
colType.push(true)
}else{colType.push(false)}
}
}
}else{
columnIds=columnIds+","+colModel[i].name;
columnNames=columnNames+","+colNames[i];
if($('[col="'+colModel[i].name+'"]').find('input').length>0){
if($('[col="'+colModel[i].name+'"]:last input').datas().indexOf(',')>0||$('[col="'+colModel[i].name+'"]:last input').datas().indexOf(',')>0){
colType.push(true)
}else{colType.push(false)}
}else{
if($('[col="'+colModel[i].name+'"]:last').datas().indexOf(',')>0||$('[col="'+colModel[i].name+'"]:last').datas().indexOf(',')>0){
colType.push(true)
}else{colType.push(false)}
}
}
}
}
}
columnNames=columnNames.replace(/(<([^>]+)>)/gi,"");
}
var gridData=$("#table_"+gridId).jqGrid('getGridParam','data');
var jsonData=JSON.stringify(gridData);
jsonData=RemoveHTML(jsonData);
jsonData=removeSpecial(jsonData);
var obj={}
obj['excelTitle']=excelTitle;
obj['columnIds']=columnIds;
obj['columnNames']=columnNames;
obj['columnType']=colType;
obj['groupStartColumnIds']=groupStartColumnIds;
obj['groupNumberOfColumns']=groupNumberOfColumns;
obj['groupColumnNames']=groupColumnNames;
obj['jsonData']=jsonData;
return obj;
}
function excel(obj){
alert('excel 출력시 수정된 수정된 내용은 반영되지 않습니다. ')
var gridId=$(obj).parents('h5').parent('div').prop('id');
var label=$(obj).parents('h5').find('label:first').text();
var type="download";
var hidden=$(obj).data('hidden');
if(hidden=='undefined')hidden=false;
var dataObj=generateExcelInfo(gridId,label,hidden);
dataObj['type']=type;
doExcel(dataObj);
}
function excelSample(obj){
var gridId=$(obj).parents('h5').parent('div').prop('id');
var label=$(obj).parents('h5').find('label:first').text();
var type="sample";
var hidden=$(obj).data('hidden');
if(hidden=='undefined')hidden=false;
var dataObj=generateExcelInfo(gridId,label,hidden);
dataObj['type']=type;
doExcel(dataObj);
}
function doExcel(dataObj){
var url=CTX+'/excel/getExcel?MODE=EXCEL';
var oForm=document.createElement("form");
var sexcelTitle=document.createElement("input");
var scolumnIds=document.createElement("input");
var scolumnNames=document.createElement("input");
var scolumnType=document.createElement("input");
var sgroupStartColumnIds=document.createElement("input");
var sgroupNumberOfColumns=document.createElement("input");
var sgroupColumnNames=document.createElement("input");
var list=document.createElement("input");
var fexcelFiel=document.createElement("input");
var sfirstRow=document.createElement("input");
oForm.name="excelForm";
oForm.method="post";
oForm.action=url;
sexcelTitle.type="hidden";
sexcelTitle.name="excelTitle";
sexcelTitle.value=dataObj.excelTitle;
scolumnIds.type="hidden";
scolumnIds.name="columnIds";
scolumnIds.value=dataObj.columnIds;
scolumnNames.type="hidden";
scolumnNames.name="columnNames";
scolumnNames.value=dataObj.columnNames;
scolumnType.type="hidden";
scolumnType.name="columnType";
scolumnType.value=dataObj.columnType;
sgroupStartColumnIds.type="hidden";
sgroupStartColumnIds.name="groupStartColumnIds";
sgroupStartColumnIds.value=dataObj.groupStartColumnIds;
sgroupNumberOfColumns.type="hidden";
sgroupNumberOfColumns.name="groupNumberOfColumns";
sgroupNumberOfColumns.value=dataObj.groupNumberOfColumns;
sgroupColumnNames.type="hidden";
sgroupColumnNames.name="groupColumnNames";
sgroupColumnNames.value=dataObj.groupColumnNames;
list.type="hidden";
list.name="list";
list.value=(dataObj.type=="download"?dataObj.jsonData:"");
oForm.appendChild(sexcelTitle);
oForm.appendChild(scolumnIds);
oForm.appendChild(scolumnNames);
oForm.appendChild(sgroupStartColumnIds);
oForm.appendChild(sgroupNumberOfColumns);
oForm.appendChild(sgroupColumnNames);
oForm.appendChild(scolumnType);
oForm.appendChild(list);
document.body.appendChild(oForm);
oForm.submit();
}
function excelUpload(obj){
var gridId=$(obj).parents('h5').parent('div').prop('id');
var label=$(obj).parents('h5').find('label:first').text();
var firstRow=$(obj).data('firstrow');
var hidden=$(obj).data('hidden');
if(hidden=='undefined')hidden=false;
$(document).find('body').append(
'<div id="excelUpload" class="a2m_dialog">'
+'<form id="excelUploadForm" action="'+CTX+'/excel/setExcel" data-grid="'+gridId+'" data-func="excelUploadAjax" data-callback="saveCallbackFunc" enctype="multipart/form-data">'
+'<table class="table_bg" style="width: 100%;margin-top: 4%;">'
+'<tr>'
+'<th scope="row">엑셀파일</th>'
+'<td>'
+'<input type="file" id="tmpFile" name="tmpFile" value="" />'
+'<input type="hidden" id="columnIds" name="columnIds" value=""/>'
+'<input type="hidden" id="columnNames" name="columnNames" value=""/>'
+'<input type="hidden" id="firstRow" name="firstRow" value=""/>'
+'</td>'
+'<td>'
+'<span id="uploadBtn" class="btn bg_gray ico m4 ac_click sbtn " data-func="validatefile">업로드</span>'
+'</td>'
+'</tr>'
+'</table>'
+'</form>'
+'</div>'
);
$('#excelUpload').dialog({
resizable:false,
modal:true,
width:"500",
height:"120",
open:function(){$(".ui-dialog").css("box-shadow","#999 5px 5px 5px");},
close:function(){
$('#excelUpload').dialog('destroy').remove();
}
});
var dataObj=generateExcelInfo(gridId,label,hidden);
$('#columnIds').val(dataObj.columnIds);
$('#columnNames').val(dataObj.columnNames);
if(firstRow=='undefined'||!firstRow){
if(dataObj.groupColumnNames!=null&&dataObj.groupColumnNames!=""){
firstRow="4";
}else{
firstRow="3";
}
}
$('#firstRow').val(firstRow);
}
function validatefile(obj){
var file=$('#tmpFile').val()
var ext=file.substring(file.lastIndexOf('.'));
if(ext.match(/\.xls|\.xlsx/))
$(obj).parents('form').submit();
else{
alert('엑셀파일만 가능합니다.')
}
}
function excelUploadAjax(form,callback){
var gridId=$(form).data('grid');
var $grid=$('#'+gridId+' table#table_'+gridId).jqGrid();
$(form).ajaxSubmit({
success:function(data,textStatus,jqXHR){
var datas;
if(data.constructor===String){
datas=data.replace('<pre>','').replace('</pre>','');
datas=JSON.parse(datas);
}else{
datas=data;
}
$.each(datas,function(i,objData){
objData.CRUD="C";
var rowId=$grid.getDataIDs().length;
var parameters={
rowID:rowId+1,
initdata:objData,
data:[],
position:'first',
useDefValues:false,
useFormatter:false,
addRowParams:{
extraparam:{}
}
};
$grid.jqGrid('addRow',parameters);
});
initialDom($grid);
},complete:function(){
$('#excelUpload').dialog('destroy').remove();
return true;
},error:function(){
alert('업로드에 실패했습니다.');
return false;
}
});
}
