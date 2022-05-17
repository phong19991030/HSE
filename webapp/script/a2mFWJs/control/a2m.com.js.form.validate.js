
(function($){
var allRules;
var methods={
init:function(options){
if($.formatEngineRules)
allRules=$.formatEngineRules.allRules;
$.expressionEngine.defaults.allrules=allRules;
},
fieldAttValue:function(){
var $field=$(this);
var pattern=$(this).attr('pattern');
return formatting._format($(this));
},
fieldDetValue:function(){
var $field=$(this);
var pattern=$(this).attr('pattern');
return formatting._deformat($(this));
},
attach:function(){
var $form=$(this);
if((!$form.data('fmt')||$form.data('fmt')==null)||!$form.hasClass('fmt')){
$form.data('fmt','active');
$form.addClass('fmt')
$(this).find('input[pattern],label[pattern],td[pattern],span[pattern]').each(function(){
var changeEvent;
var pattern=$(this).attr('pattern');
if(pattern){
var regex=new RegExp(/^\{.+\}$/);
if(regex.test(pattern)){
$(this).data('pattern',pattern)
}else{
if(!allRules[pattern]){
alert('지정된 형식이 없습니다.');
return
}
if(pattern=='currency'){
$(this).addClass(pattern)
}
formatting._format($(this))
}
}
if($(this).filter('input[type="text"]:not(.expression)').length>0){
$(this).on('keyup',keyEvent.keyup);
$(this).on('focusout',function(){
$(this).trigger('change');
});
$(this).addClass("expression")
}
})
}
},
detach:function(){
var $form=$(this);
if(($form.data('fmt')&&$form.data('fmt')!=null)&&$form.hasClass('fmt')){
$form.data('fmt');
$form.removeClass('fmt');
}
$(this).find('input[pattern],label[pattern],td[pattern],span[pattern]').each(function(i,obj){
var pattern=$(this).attr('pattern');
if(pattern){
var regex=new RegExp(/^\{.+\}$/);
if(regex.test(pattern)){
$(this).data('pattern',pattern)
}else{
if(!allRules[pattern]){
alert('지정된 형식이 없습니다.');
return
}
if(pattern=='currency'){
$(this).removeClass(pattern)
}
formatting._deformat($(this))
}
}
$(this).removeClass("expression")
if($(this).filter('input[type="text"]').length>0){
$(this).off('keyup',keyEvent.keyup);
}
})
},
attached:[],
setFormat:function(){
},
restoreFormat:function(){
}
};
var keyEvent={
keydown:function(e){
},
keyup:function(e){
var pattern=$(this).data('pattern');
formatting._format($(this))
}
}
var filter={
fraction:function(){
},
integer:'',
}
var formatting={
fraction:function(){
},
integer:'',
_format:function(obj){
var pol=$(obj).attr('pattern');
switch(pol){
case"number":
func.number.attach(obj)
break;
case"currency":
func.currency.attach(obj)
break;
case"date":
func.date.attach(obj)
break;
case"time":
func.time.attach(obj)
break;
case"stepper":
func.stepper.attach(obj)
break;
default:
}
},
_deformat:function(obj){
var pol=$(obj).attr('pattern');
switch(pol){
case"number":
func.number.detach(obj)
break;
case"currency":
func.currency.detach(obj)
break;
case"date":
func.date.detach(obj)
break;
case"time":
func.time.detach(obj)
break;
case"stepper":
func.stepper.detach(obj)
break;
default:
}
},
}
var func={
number:{
attach:function(obj){
var $obj=$(obj);
var value=$(obj).val().replace(/-/g,'');
var datas=$(obj).val().split('-');
var size=[]
var strb='';
$.each(datas,function(i,objs){
size.push(objs.length)
})
if(value){
value=$(obj).getOnlyNumeric();
value=value.toString();
if(value=='NaN')
value='';
$.each(size,function(i,idx){
if(i==0){
strb+=value.substring(0,idx)+(size.length-1>i?'-':'');
value=value.substring(idx);
}else{
strb+=value.substring(0,idx)+(size.length-1>i?'-':'');
value=value.substring(idx);
}
})
}
$(obj).datas(strb);
},detach:function(obj){
var value=$(obj).datas().replace(/-/g,'');
$(obj).datas(value);
}
},
currency:{
attach:function(obj){
var $obj=$(obj);
var strb,len,revslice,decimal,mark='';
var cipher=3;
strb=$(obj).datas().toString();
if(strb.indexOf('-')>=0){
mark='-'
}
strb=$(obj).getOnlyNumeric();
strb=strb.replace(/,/g,'');
if(strb.indexOf('.')>0){
decimal=strb.substring(strb.indexOf('.'))
strb=strb.substring(0,strb.indexOf('.'));
}
strb=parseInt(strb,10);
if(isNaN(strb))
return $(obj).datas(mark+'');
strb=strb.toString();
len=strb.length;
if(len<4){
if(decimal){
return $(obj).datas(mark+strb+decimal)
}else{
return $(obj).datas(mark+strb);
}
}
if(cipher==undefined||!isNumeric(cipher))
cipher=3;
count=len/cipher;
slice=new Array();
for(var i=0;i<count;++i){
if(i*cipher>=len)
break;
slice[i]=strb.slice((i+1)*-cipher,len-(i*cipher));
}
revslice=slice.reverse();
if(decimal){
return $(obj).datas(mark+revslice.join(',')+decimal)
}else{
return $(obj).datas(mark+revslice.join(','));
}
},detach:function(obj){
var value=$(obj).datas().replace(/,/g,'');
$(obj).datas(value);
}
}
,
date:{
attach:function(obj){
var strb,len,revslice;
var cipher=3;
strb=$(obj).datas().toString();
strb=strb.replace(/-/g,'');
strb=$(obj).getOnlyNumeric();
strb=parseInt(strb,10);
if(isNaN(strb))
return $(obj).datas('');
strb=strb.toString();
len=strb.length;
if(len<5){
return $(obj).datas(strb);
}
if(len>=5&&len<7){
if(strb.substring(4,6)>12){
return $(obj).datas(strb.substring(0,4)+'-');
}
return $(obj).datas(strb.substring(0,4)+'-'+strb.substring(4,6));
}
if(len>=7){
var year=strb.substring(0,4);
var month=strb.substring(4,6);
var date=new Date(year,month,0)
if(strb.substring(4,6)>12){
return $(obj).datas(strb.substring(0,4)+'-');
}
if(date.getDate()<strb.substring(6,8)){
return $(obj).datas(strb.substring(0,4)+'-'+strb.substring(4,6));
}
return $(obj).datas(strb.substring(0,4)+'-'+strb.substring(4,6)+'-'+strb.substring(6,8));
}
},
detach:function(obj){
var value=$(obj).datas().replace(/-/g,'');
$(obj).datas(value);
}
}
,time:{
attach:function(obj){
var strb,len,revslice;
var cipher=3;
strb=$(obj).datas().toString();
strb=strb.replace(/:/g,'');
strb=$(obj).getOnlyNumeric();
if(isNaN(strb))
return $(obj).datas('');
strb=strb.toString();
len=strb.length;
if(len<2){
return $(obj).datas(strb);
}
if(len>=2&&len<4){
return $(obj).datas(strb.substring(0,2)+':'+strb.substring(2,4));
}
if(len==4){
return $(obj).datas(strb.substring(0,2)+':'+strb.substring(2,4));
}
},
detach:function(obj){
var value=$(obj).datas().replace(/:/g,'');
$(obj).datas(value);
}
},
stepper:{
attach:function(obj){
var strb,len,revslice;
var cipher=3;
strb=$(obj).datas().toString();
strb=strb.replace(/-/g,'');
strb=$(obj).getOnlyNumeric();
strb=parseInt(strb,10);
if(isNaN(strb))
return $(obj).datas('');
strb=strb.toString();
len=strb.length;
if(len<5){
return $(obj).datas(strb);
}
if(len>=5&&len<7){
return $(obj).datas(strb.substring(0,4)+'-'+strb.substring(4,6));
}
},
detach:function(obj){
var value=$(obj).datas().replace(/-/g,'');
$(obj).datas(value);
}
}
}
$.fn.getOnlyNumeric=function($obj){
var chrTmp,strTmp;
var len,str;
if($obj==undefined){
str=$(this).datas();
}
else{
str=$(this).datas();
}
len=str.length;
strTmp='';
for(var i=0;i<len;++i){
chrTmp=str.charCodeAt(i);
if((chrTmp>47||chrTmp<=31||chrTmp==46)&&chrTmp<58){
strTmp=strTmp+String.fromCharCode(chrTmp);
}
if(len>i&&chrTmp=='0'){
}
}
if($obj==undefined)
return strTmp;
else{
if(!strTmp){
strTmp=0;
}
return $obj.datas(strTmp);
}
}
var isNumeric=function(data){
var len,chrTmp;
len=data.length;
for(var i=0;i<len;++i){
chrTmp=str.charCodeAt(i);
if((chrTmp<=47&&chrTmp>31)||chrTmp>=58){
return false;
}
}
return true;
}
var inptRegs={
'9':/[0-9]/,
'a':/[A-Za-z]/,
'*':/[A-Za-z0-9]/
};
$.expressionEngine={fieldIdCounter:0,defaults:{}}
$.fn.expressionEngine=function(method){
var form=$(this);
if(!form[0])return form;
if(typeof(method)=='string'&&method.charAt(0)!='_'&&methods[method]){
if(method!="showPrompt"&&method!="hide"&&method!="hideAll")
methods.init.apply(form);
return methods[method].apply(form,Array.prototype.slice.call(arguments,1));
}else if(typeof method=='object'||!method){
methods.init.apply(form,arguments);
return methods.attach.apply(form);
}else{
$.error('Method '+method+' does not exist in expressionEngine');
}
};
$.fn.formatEngineRules=function(){};
$.formatEngineRules={
setRules:function()
{
$.formatEngineRules.allRules={
"number":{
},
"currency":{
'pattern':'{{999}},{{999}},{{999}},{{9999}}',
'allowed':/[0-9]/,
'persistent':true
},"time":{
'pattern':'{{999}},{{999}},{{999}},{{9999}}',
'allowed':/[0-9]/,
'persistent':true
},
"stepper":{},
"maxSize":{
"regex":"none",
"alertText":"* 최대 ",
"alertText2":" 자의 입력이 가능합니다."
},
"length2":{
"regex":"none",
"alertText":"* ",
"alertText2":"자 이상 입력이 가능합니다."},
"maxCheckbox":{
"regex":"none",
"alertText":"* Checks allowed Exceeded"},
"minCheckbox":{
"regex":"none",
"alertText":"* 선택하세요 ",
"alertText2":" 옵션"},
"confirm":{
"regex":"none",
"alertText":"* 값이 일치하지 않습니다."},
"telephone":{
"regex":/^0[0-9]{1,2}\-\[0-9]{3,4}\-\[0-9]{3,4}$/,
"alertText":"* 전화번호 형식이 아닙니다.( - 포함)"},
"url":{
"regex":/^[a-zA-Z0-9\&\=\?\/\.\:\-\_\ \']+$/,
"alertText":"* URL형식이 아닙니다."},
"email":{
"regex":/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/,
"alertText":"* 이메일 형식이 아닙니다"},
"date":{
"regex":/^[0-9]{4}\-\[0-9]{1,2}\-\[0-9]{1,2}$/,
"alertText":"* 날짜형식이 아닙니다. 'YYYY-MM-DD'"},
"year":{
"regex":/^[0-9]{4}$/,
"alertText":"* 날짜형식이 아닙니다. 'YYYY'"},
"onlyNumber":{
"regex":/^[0-9]+$/,
"alertText":"* 숫자만 가능합니다."},
"noSpecialCaracters":{
"regex":/^[0-9a-zA-Z]+$/,
"alertText":"* 특수문자는 허용되지 않습니다"},
"onlyLetter":{
"regex":/^[a-zA-Z\ \']+$/,
"alertText":"* 영문자만 가능합니다"},
"onlyLetterUnd":{
"regex":/^[_A-Z']+$/,
"alertText":"* 영어 대문자와 '_'만 가능합니다"},
"onlyEngNumber":{
"regex":/^[a-zA-Z0-9\ \']+$/,
"alertText":"* 영어와 숫자만 가능합니다"},
"UpperEngNumber":{
"regex":/^[_A-Z0-9]+$/,
"alertText":"* 영어 대문자와 숫자와 '_'만  가능합니다"},
"LowerEngNumber":{
"regex":/^[_a-z0-9]+$/,
"alertText":"* 영어 소문자와 숫자와 '_'만  가능합니다"},
"onlyKor":{
"regex":/^[ 가-힣ㄱ-ㅎ]+$/,
"alertText":"* 한글만 입력가능합니다"},
"noKor":{
"regex":/^[ _a-zA-Z0-9]+$/,
"alertText":"* 영어와 숫자와 '-'만 가능합니다."},
"onlyKorEng":{
"regex":/^[ 가-힣a-zA-Zㄱ-ㅎ]+$/,
"alertText":"* 한글과 영문만 입력가능합니다"},
"onlyKorEngNumber":{
"regex":/^[ 가-힣a-zA-Z0-9ㄱ-ㅎ]+$/,
"alertText":"* 한글,영문,숫자만 입력가능합니다"},
"reqSubject":{
"regex":/^[ ^']+$/,
"alertText":"* 제목을 입력하세요"},
"reqContents":{
"regex":/^[ ^']+$/,
"alertText":"* 내용을 입력하세요"},
"validate2fields":{
"nname":"validate2fields",
"alertText":"* 필수입력란 입니다"}
}
}
}
$.formatEngineRules.setRules()
})(jQuery);
$(document).on('submit','form',function(){
var $form=$(this);
if($form.data('submit')){
return true;
}
submitFormValidate($form);
return false;
})
function submitFormValidate($form){
var $form=$($form);
var result=false;
var func=$form.data('func');
var callback=$form.data('callback');
if(validate($form)){
if(func){
eval(func+'($form,callback)');
}
$form.expressionEngine('attach');
return true
}else{
$form.expressionEngine('attach');
}
return false;
}
var validate=function(obj){
var bool=true;
$(obj).expressionEngine('detach');
return $(obj).validationEngine('immediate');
}
var validateWithOutForm=function(obj){
var bool=true;
if(!$(obj).hasClass('validated')){
validate(obj)
}
return bool;
}
var duplicationValue=function($grid,keyColumn,keyVals){
var $grid=$($grid);
var result=true;
var value=keyVals;
$grid.find('tr').each(function(k,tr){
var compareVal
if($(tr).find('[col="'+keyColumn+'"]').find('input')){
compareVal=$(tr).find('[col="'+keyColumn+'"]').find('input').val();
}else{
compareVal=$(tr).find('[col="'+keyColumn+'"]').text();
}
if(value==compareVal){
result=false;
}
})
if(!result){
alert('중복데이터가 있습니다.')
}
return result;
}
var duplicationKey=function($grid,keyGroups){
var $grid=$($grid);
var keys=[]
if(keyGroups instanceof String){
keys.push(keyGroups)
}else if(keyGroups instanceof Array){
keys=keyGroups;
}
var result=true;
$.each(keys,function(i,key){
var loop=$grid.find('[col="'+key+'"]');
$.each(loop,function(j,val){
var value;
if($(val).find('input')){
value=$(val).find('input').val();
}else{
value=$(val).text();
}
$(this).parents('tr').siblings().each(function(k,tr){
var compareVal;
if($(tr).find('[col="'+key+'"]').find('input')){
compareVal=$(tr).find('[col="'+key+'"]').find('input').val();
}else{
compareVal=$(tr).find('[col="'+key+'"]').text();
}
if(value==compareVal){
result=false;
}
})
})
})
if(!result){
alert('중복데이터가 있습니다.')
}
return result;
}
var valChkBudg=function(gridId,budg_cd,acct_cd,acct_cd_mthd){
$grid=$('#'+gridId);
var result=true;
var preVal;
var k=1;
var mthd;
$grid.find('tr').each(function(i,tr){
if($(tr).find('[col="'+budg_cd+'"]').find('input').val()==''&&$(tr).find('[col="'+acct_cd+'"]').find('input').val()==''){
alert(i+'번째 Row : 예산(또는 계정)을 선택해야합니다.');
result=false;
return false;
}
$(this).find('[col="'+budg_cd+'"]').each(function(ii,val){
var thisVal;
if($(this).find('input').val()!=''){
if(k==1){preVal=$(this).parents('tr').find('[col="'+acct_cd_mthd+'"] input').val();}
thisVal=$(this).parents('tr').find('[col="'+acct_cd_mthd+'"] input').val();
k++;
if(preVal!=thisVal){
alert('선택하신 예산의 회계구분이 서로 상이합니다.\n예산을 다시 선택해주세요.');
result=false;
return false;
}
}
mthd=preVal;
});
});
if(result==true){
$grid.find('tr').each(function(i,tr){
$(this).find('[col="'+acct_cd+'"]').each(function(ii,val){
if($(this).find('input').val()!=''){
$(this).parents('tr').find('[col="'+acct_cd_mthd+'"] input').val(mthd);
}
});
});
}
return result;
};
var submitFormatter=function(obj){
var bool=true;
$(obj).find('input[type="text"].hasDatepicker').each(function(i,dom){
$(dom).val($(dom).val().replace(/-/gi,''))
})
return bool;
}
var validate_require=function(obj){
if(!$(obj).val()){
return false;
}
return true;
}
function keyFilter(e){
if(e.keyCode==8||e.keyCode==46||e.keyCode==37||e.keyCode==39)return false;
else return true;
}
function leadingZeros(num,digits){
var zeros="";
num=num.toString();
if(num.length<digits){
for(var i=0;i<(digits-num.length);i++){
zeros+="0";
}
}
return zeros+num;
}
function addComma(str){
if(str){
str=removeComma(str);
str=parseFloat(str).toFixed(2)
x=str.split(".");
x1=x[0];
x2=x.length>1?(eval(x[1])==0?"":"."+x[1]):"";
var regex=/(\d+)(\d{3})/;
while(regex.test(x1)){
x1=x1.replace(regex,"$1"+","+"$2");
}
return x1+x2;
}else{
if(str=='0'){
return"0";
}else{
return"";
}
}
}
function removeComma(str){
str+="";
var regex=/,/g;
return str.replace(regex,"");
}
function formatComma(e){
$(this).val(addComma($(this).val()));
}
function formatSelect(){
$(this).select();
}
function restrict_money(e){
var regex=/[^0-9]/g;
$(this).val($(this).val().replace(regex,""));
}
function restrict_number(e){
var regex=/[^0-9\.]/g;
return $(this).val($(this).val().replace(regex,""));
}
function restrict_decimal(e){
var regex=/[^0-9\.]/g;
return $(this).val($(this).val().replace(regex,""));
}
function restrict_OnlyNumber(e){
if(keyFilter(e)){
var regex=/[^0-9]/g;
$(this).val($(this).val().replace(regex,""));
}
}
function restrict_OnlyEnglish(e){
if(keyFilter(e)){
var regex=/[^a-z]/gi;
$(this).val($(this).val().replace(regex,""));
}
}
function restrict_OnlyEnglishUpper(e){
if(keyFilter(e)){
var regex=/[^a-z]/gi;
$(this).val($(this).val().replace(regex,"").toUpperCase());
}
}
function restrict_OnlyEnglishLower(e){
if(keyFilter(e)){
var regex=/[^a-z]/gi;
$(this).val($(this).val().replace(regex,"").toLowerCase());
}
}
function restrict_ForCode(e){
if(keyFilter(e)){
var regex=/[^0-9a-z\_]/gi;
$(this).val($(this).val().replace(regex,"").toUpperCase());
}
}
function restrict_ForId(e){
if(keyFilter(e)){
var regex=/[^0-9a-z\_\-\!\@\#\$\%\^]/gi;
$(this).val($(this).val().replace(regex,""));
}
}
