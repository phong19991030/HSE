
(function($){
var r20=/%20/g,
rbracket=/\[\]$/,
rCRLF=/\r?\n/g,
rinput=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
rselectTextarea=/^(?:select|textarea)/i;
$.fn.serialize=function(){
$(this).expressionEngine('detach');
var result=jQuery.param($(this).serializeArray())
$(this).expressionEngine('attach');
return result;
}
$.fn.serializeArray=function(){
$(this).expressionEngine('detach')
var result=this.map(function(){
return this.elements?jQuery.makeArray(this.elements):this;
})
.filter(function(){
return this.name&&!this.disabled&&
(this.checked||rselectTextarea.test(this.nodeName)||
rinput.test(this.type));
})
.map(function(i,elem){
var val=jQuery(this).val();
return val==null?
null:
jQuery.isArray(val)?
jQuery.map(val,function(val,i){
return{name:elem.name,value:val.replace(rCRLF,"\r\n")};
}):
{name:elem.name,value:val.replace(rCRLF,"\r\n")};
}).get();
$(this).expressionEngine('attach');
return result;
};
$.fn.datas=function(data){
if(data!=null){
if($(this).filter('input[type="text"],input[type="hidden"]').length>0){
return $(this).val(data)
}else{
return $(this).text(data)
}
}else{
if($(this).filter('input').length>0){
return $(this).val().trim()
}else{
return $(this).text().trim()
}
}
};
$.fn.showHideDropdownOptions=function(){
if($(this).hasClass('readonly')){
$(this).find('option:not(:selected)').prop('disabled',true);
$(this).find('option:not(:selected)').hide()
$(this).find('option:selected').prop('disabled',false);
$(this).find('option:selected').show();
}else{
$(this).find('option').prop('disabled',false);
$(this).find('option').show();
}
}
})(jQuery);
