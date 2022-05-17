<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
textarea {
white-space: pre-wrap;
}

/* input type이 number인 경우 화살표 css 제거 */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

</style>

<div class="container system-wrap system-wrap1">
  

  <!-- 공지사항 등록 -->
  <div class="system-detail-wrap">
    <div class="system-left">
      <!--tit-wrap-->
      	  	  <div class="tit-wrap">
	    <h2 class="heading3">
<c:choose>
						<c:when  test="${CRUD eq 'C'}">
							<span class="txt"><spring:message code="button.register"/></span>
						</c:when>
						<c:otherwise>
							<span class="txt"><spring:message code="button.modify"/></span>
						</c:otherwise>
					</c:choose>
						      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>${navimenu.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.MENU_NM}</li>
	      <li class="bold">Alarm code</li>
	      <li class="bold">${NAME}</li>
	      
	    </ul>
	  </div>
      
      	<div class="registration-form registration-form1">
        <div class="registration-form-lst-wrap">
          <ul class="registration-form-lst">
            <li>
              <span><spring:message code='sys.sys_0101.list.title.alarmCode' /><span class="red"> *</span></span>
              <div class="registration-write btn-input-wrap btn-input-double-check">
                <div class="input-group">
                  <label for="SUB_CD" class="sr-only">Alarm code</label>
<!--                   <input type="text" name="alarmCode" id="alarmCode" placeholder=""> -->
                  <input maxlength="20" type="number" id="SUB_CD" nova-validation="required" name="SUB_CD" value="${DATA.ALARM_SUB_CD}">
                  
                </div>
                <button type="button" onclick="doubleCheck()" class="registration-search-btn"><spring:message code='sys.sys_0101.list.button.doubles' /></button>
              </div>
            </li>
            <li>
              <span><spring:message code='sys.sys_0101.list.title.alarmText' /><span class="red"> *</span></span>
              <div class="registration-write">
                <div class="input-group">
                  <label for=""ALARM_TXT"" class="sr-only">Alarm text</label>
                  		<input type="text" nova-validation="required" id="ALARM_TXT" name="ALARM_TXT" value="${DATA.ALARM_TXT}">

                </div>
              </div>
            </li>
          </ul>
          <ul class="registration-form-lst">
            <li>
              <span><spring:message code='sys.sys_0101.list.title.manual' /></span>
              <div class="registration-write btn-input-wrap fake-field-file-wrap">
                <div class="input-group">
                  <div class="fake-field-file"><c:if test="${DATA.FLE_NM != null && DATA.FLE_NM != '' && DATA.FLE_NM != 'null'}">${DATA.FLE_NM}</c:if></div>
                      <input type="file" name="cv-arquivo" hidden id="file" class="field-file">
                    
                  <!--                   <input type="file" id="FILE" name="file" value='' readonly class="field-file"> -->
                  							<input type="text" hidden id="DOC_PATH" name="DOC_PATH">										
                  
                </div>
                <label for="cv-arquivo" aria-label="Attach file" id="btnUpload1" class="registration-search-btn">
                  <i class="xi-paperclip"></i>
                </label>
              </div>
            </li>
          </ul>
        </div>

        <div class="registration-form-lst-wrap registration-form-lst-wrap-full">
          <ul class="registration-form-lst">
            <li class="note">
              <span><spring:message code='sys.sys_0101.list.title.exp' /><span class="red"> *</span></span>
              <div class="registration-write">
              					                              <div class="input-group input-group-wrap">
              
                <label for="EXPLANATION" class="sr-only">Description</label>
					<textarea maxlength="3000" nova-validation="required" id="EXPLANATION" name="EXPLANATION">${DATA.DESCRPT}</textarea>
	          </div>
	              </div>
            </li>
            <li class="note">
              <span><spring:message code='sys.sys_0101.list.title.sugg' /></span>
              <div class="registration-write">
               					                              <div class="input-group input-group-wrap">
                <label for="SUGGESTION" class="sr-only">Proposal</label>
								<textarea maxlength="3000" nova-validation="required" id="SUGGESTION" name="SUGGESTION" >${DATA.SUGGEST}</textarea>
              </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="registration-form-lst-wrap">
          <ul class="registration-form-lst">
            <li>
              <span><spring:message code='sys.sys_0101.list.title.action' /></span>
              <div class="registration-write btn-input-wrap group_area action">
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="Action1" class="sr-only">Action</label>
                    <input type="text" name="Action" id="Action1" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a  class="delete-btn">
                      <span class="sr-only">delete</span>
                      <i class="xi-minus-square"></i>
                    </a>
                  </div>
                </div>
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="Action1" class="sr-only">Action</label>
                    <input type="text" name="Action" id="Action1" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a  class="delete-btn">
                      <span class="sr-only">delete</span>
                      <i class="xi-minus-square"></i>
                    </a>
                  </div>
                </div>
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="Action2" class="sr-only">Action</label>
                    <input type="text" name="Action" id="Action2" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a  class="delete-btn">
                      <span class="sr-only">delete</span>
                      <i class="xi-minus-square"></i>
                    </a>
                    <a  class="add-btn">
                      <span class="sr-only">add</span>
                      <i class="xi-plus-square"></i>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <span><spring:message code='sys.sys_0101.list.title.tool' /></span>
              <div class="registration-write btn-input-wrap btn-input-wrap group_area tool">
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="Tool1" class="sr-only">Tool</label>
                    <input type="text" name="Tool" id="Tool1" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a  class="add-btn">
                      <span class="sr-only">add</span>
                      <i class="xi-plus-square"></i>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <ul class="registration-form-lst">
            <li>
              <span><spring:message code='sys.sys_0101.list.title.parts' /></span>
              <div class="registration-write btn-input-wrap btn-input-wrap group_area part">
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="Parts1" class="sr-only">Parts</label>
                    <input type="text" name="Parts" id="Parts1" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a  class="delete-btn">
                      <span class="sr-only">delete</span>
                      <i class="xi-minus-square"></i>
                    </a>
                  </div>
                </div>
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="Parts2" class="sr-only">Parts</label>
                    <input type="text" name="Parts" id="Parts2" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a  class="delete-btn">
                      <span class="sr-only">delete</span>
                      <i class="xi-minus-square"></i>
                    </a>
                    <a  class="add-btn">
                      <span class="sr-only">add</span>
                      <i class="xi-plus-square"></i>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <span><spring:message code='sys.sys_0101.list.title.ppe' /></span>
              <div class="registration-write btn-input-wrap btn-input-wrap group_area ppe">
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="ppe1" class="sr-only">PPE</label>
                    <input type="text" name="Parts" id="ppe1" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a  class="delete-btn">
                      <span class="sr-only">delete</span>
                      <i class="xi-minus-square"></i>
                    </a>
                  </div>
                </div>
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="ppe2" class="sr-only">PPE</label>
                    <input type="text" name="ppe2" id="ppe2" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a  class="delete-btn">
                      <span class="sr-only">delete</span>
                      <i class="xi-minus-square"></i>
                    </a>
                    <a  class="add-btn">
                      <span class="sr-only">add</span>
                      <i class="xi-plus-square"></i>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

 </div>
 <div class="system-right">
	<div class="btns">
		<c:if test="${navimenu.SUBMENU.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
			<a class="btn-style btn-style1" onclick="addCode()"><spring:message code='button.save' /></a> 
		</c:if>
		<c:if test="${not(CRUD eq 'C') && navimenu.SUBMENU.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
			<a class="btn-style btn-style3" onclick="deleteAlarm()"><spring:message	code='button.delete' /></a>
		</c:if>
		<a class="btn-style btn-style2" href="">Cancel</a>
      </div>
    </div>
  </div>
  <!-- //공지사항 등록 -->
</div>



<script type="text/javascript" >
var alarmCd = '${WT_ALARM_GR_ID}';
var crud = '${CRUD}';
var alarmSubId = '${DATA.WT_ALARM_ID}';
$('#ALARM_TXT').val('${DATA.ALARM_TXT}');

$('#DOC_PATH').val('${DATA.DOC_PATH}');
// var fileName = '${DATA.FLE_NM}';
// $('#FLE_NM').val(fileName);


if(crud=='U'){
	$('#SUB_CD').attr('disabled', true);
	$('button[onclick="doubleCheck()"]').attr('disabled', true);
	
// 	$('button[onclick="doubleCheck()"]').css('display', 'none');
// 	$('input[name=PART_NM]').val('${PART_ID}');
// 	$('input[name=TOOL_NAME]').val('${TOOL_ID}');
// 	$('input[name=PPE_NAME]').val('${PPE_ID}');
	var dataAction = '${ACTION_LIST}';
	var arrayAction = JSON.parse("[" + dataAction + "]");
	
	var dataPart = '${PART_LIST}';
	var arrayPart = JSON.parse("[" + dataPart + "]");

	
	var dataPpe = '${PPE_LIST}';
	var arrayPpe = JSON.parse("[" + dataPpe + "]");


	var dataTool = '${TOOL_LIST}';
	var arrayTool = JSON.parse("[" + dataTool + "]");

	
	var actionList = arrayAction[0];
	var partList = arrayPart[0];
	var ppeList = arrayPpe[0];
	var toolList = arrayTool[0];
// 	var toolIdList = arrayToolId[0];
// 	var partIdList = arrayPartId[0];
// 	var ppeIdList = arrayPpeId[0];
//  	var formAction = document.getElementById('ACTION');
// 	var formTool = document.getElementById('TOOL');
// 	var formPart = document.getElementById('PARTS');
// 	var formPpe = document.getElementById('PPE');
	
	generateListInput($('.group_area.action'),actionList,'action', crud);
	
	
	generateListInput2($('.group_area.part'),partList,'part', crud);
	generateListInput2($('.group_area.tool'),toolList,'tool', crud);
	generateListInput2($('.group_area.ppe'),ppeList,'ppe',crud);

// 	for(var i= 0; i<toolList.length; i++){
// 		genElement("tool", formTool, toolList, qtyToolList);
// 	}
// 	for(var i= 0; i<partList.length; i++){
// 		genElement("part", formPart, partList, qtyPartList);
// 	}
// 	for(var i= 0; i<ppeList.length; i++){
// 		genElement("ppe", formPpe, ppeList, qtyPpeList);
// 	}	
}else{
generateListInput($('.group_area.action'),[""],'action');
	
	
	generateListInput2($('.group_area.part'),[''],'part');
	generateListInput2($('.group_area.tool'),[''],'tool');
	generateListInput2($('.group_area.ppe'),[''],'ppe');
}

function deleteAlarm(){
	

		 if(confirm(_MESSAGE.common.deleteConfirm)){
			$.ajax({
				  type: "DELETE",
				  url:  CTX + '/sys/sys_0103/deleteSubAlarmCd.ajax?WT_ALARM_ID='+alarmSubId,
			      success: function(data) {
			         // alert('<spring:message code='sys.sys_0101.list.alert.deleteSucess' />');
			         alert(_MESSAGE.common.deleteSuccess);
			          window.location.href="";
			       },
			       error: function (data) {
			           //alert("Delete error!");
			           alert(_MESSAGE.common.deleteFail);
			         }
				}); 
		 }

}

function generateListInput($parentElement, list, type, crud){
	
	$parentElement.attr('count', list.length);
	$parentElement.empty();
	if(list.length  == 0 ){
		var i = 0;
		var str =	'<div class="input-group-wrapper">'
            +'<div class="input-group">'
            +'  <label for="'+type+""+i+'" class="sr-only">Action</label>'
            +'  <input type="text" name="'+type+""+i+'" id="'+type+""+i+'"  placeholder="">'
            +'</div>'
            +'<div class="add-delete-btn-wrap">'
            +' <a  class="delete-btn">'
            +'   <span class="sr-only">delete</span>'
            +'  <i class="xi-minus-square"></i>'
            +'</a>'
            +'<a class="add-btn">'
            +'<span class="sr-only">add</span>'
            +'<i class="xi-plus-square"></i>'
            +'</a>'
            +'</div>'
            +'</div>';
			
       	 $parentElement.append(str);
       	$parentElement.attr('count', 1);

	}
	for(var i= 0; i<list.length; i++){
	
		$parentElement.find('.add-btn').remove();
		var str = '';	
			
			if(i== list.length- 1){
				str = '<div class="input-group-wrapper">'
		            +'<div class="input-group">'
		            +'  <label for="'+type+""+i+'" class="sr-only">Action</label>'
		            +'  <input type="text" name="'+type+""+i+'" id="'+type+""+i+'"  value="'+list[i]+'"  placeholder="">'
		            +'</div>'
		            +'<div class="add-delete-btn-wrap">'
		            +' <a  class="delete-btn">'
		            +'   <span class="sr-only">delete</span>'
		            +'  <i class="xi-minus-square"></i>'
		            +'</a>'
		            +'<a class="add-btn">'
		            +'<span class="sr-only">add</span>'
		            +'<i class="xi-plus-square"></i>'
		            +'</a>'
		            +'</div>'
		            +'</div>';
			}else{
				str = '<div class="input-group-wrapper">'
		            +'<div class="input-group">'
		            +'  <label for="'+type+""+i+'" class="sr-only">Action</label>'
		            +'  <input type="text" name="'+type+""+i+'" id="'+type+""+i+'"  value="'+list[i]+'"  placeholder="">'
		            +'</div>'
		            +'<div class="add-delete-btn-wrap">'
		            +' <a  class="delete-btn">'
		            +'   <span class="sr-only">delete</span>'
		            +'  <i class="xi-minus-square"></i>'
		            +'</a>'

		            +'</div>'
		            +'</div>';
			}
			
			
			
       	 $parentElement.append(str);

	}
	
	 $parentElement.find('.add-btn').unbind('click').click(function(e){
			addInput($parentElement,type);
		});
	 $parentElement.find('.delete-btn').unbind('click').click(function(e){
			removeInput(this,$parentElement, type);
	});

}

function addInput($parentElement, type){		
	seq = $parentElement.attr('count');
	 $parentElement.find('.add-btn').remove();
	 var str =	'<div class="input-group-wrapper">'
         +'<div class="input-group">'
         +'  <label for="'+type+""+seq+'" class="sr-only">Action</label>'
         +'  <input type="text" name="'+type+""+seq+'" id="Action'+seq+'"   placeholder="">'
         +'</div>'
         +'<div class="add-delete-btn-wrap">'
         +' <a  class="delete-btn">'
         +'   <span class="sr-only">delete</span>'
         +'  <i class="xi-minus-square"></i>'
         +'</a>'
         +'<a class="add-btn">'
         +'<span class="sr-only">add</span>'
         +'<i class="xi-plus-square"></i>'
         +'</a>'
         +'</div>'
         +'</div>';
	 $parentElement.append(str);
	$parentElement.attr('count', Number(seq)+1);

	 $parentElement.find('.add-btn').unbind('click').click(function(e){
		addInput($parentElement,type);
	});
	 $parentElement.find('.delete-btn').unbind('click').click(function(e){
		removeInput(this,$parentElement, type);
	});
}


function removeInput(obj, $parentElement, type){
	if($parentElement.find('input').length<=1){
		$parentElement.find('input').val('');
		return false;
	}
	$(obj).closest('div.input-group-wrapper').remove();
	$parentElement.find('.add-btn').remove();
	$parentElement.find('div.input-group-wrapper:last-child > .add-delete-btn-wrap').append('<a class="add-btn">'
	         +'<span class="sr-only">add</span>'
	         +'<i class="xi-plus-square"></i>'
	         +'</a>');
	 $parentElement.find('.add-btn').unbind('click').click(function(e){
			addInput($parentElement,type);
		});
	 $parentElement.find('.delete-btn').unbind('click').click(function(e){
			removeInput(this,$parentElement, type);
		});
}	




function generateListInput2($parentElement, listItem, type, crud){
	
// 	if(listItem.length != listQty.length){
// 		console.log(type+' - error data!');
// 		return false;
// 	}
	
	$parentElement.attr('count', listItem.length);
	$parentElement.empty();
	if(listItem.length  == 0 ){
		var i = 0;
		var str =	'<div class="input-group-wrapper">'
            +'<div class="input-group">'
            +'<label for="'+type+""+i+'" class="sr-only">Parts</label>'
            +' <input type="text" class="name0"  id="'+type+"Name"+i+'"   placeholder="">'
//             +' <input type="text" class="code0" name="'+type+""+i+'" id="'+type+""+i+'" hidden  placeholder="">'
            +'  </div>'
            +'     <div class="add-delete-btn-wrap">'
		      +'       <a  class="delete-btn">'
		      +'         <span class="sr-only">delete</span>'
		      +'          <i class="xi-minus-square"></i>'
		      +'       </a>'
		      +'<a  class="add-btn">'
		      +'<span class="sr-only">add</span>'
		      +'<i class="xi-plus-square"></i>'
		      +'</a>'
		      +'      </div>'
		      +'    </div>';
			
       	 $parentElement.append(str);
       	$parentElement.attr('count', 1);
	}
	for(var i= 0; i<listItem.length; i++){
		if(i==0){
			$parentElement.find('.delete-btn').remove();
			$parentElement.find('input').remove();
		}
		$parentElement.find('.add-btn').remove();
		var str = '';
		if(i == listItem.length - 1){
			str =	'<div class="input-group-wrapper">'
	            +'<div class="input-group">'
	            +'<label for="'+type+""+i+'" class="sr-only">Parts</label>'
	            +' <input type="text" class="name0"  id="'+type+"Name"+i+'" value="'+listItem[i]+'" placeholder="">'
// 	            +' <input type="text" class="code0" name="'+type+""+i+'" id="'+type+""+i+'"  value="'+listId[i]+'" hidden  placeholder="">'
	            +'  </div>'
	            +'     <div class="add-delete-btn-wrap">'
			      +'       <a  class="delete-btn">'
			      +'         <span class="sr-only">delete</span>'
			      +'          <i class="xi-minus-square"></i>'
			      +'       </a>'
			      +'<a  class="add-btn">'
			      +'<span class="sr-only">add</span>'
			      +'<i class="xi-plus-square"></i>'
			      +'</a>'
			      +'      </div>'
			      +'    </div>';
		}else{
			str =	'<div class="input-group-wrapper">'
	            +'<div class="input-group">'
	            +'<label for="'+type+""+i+'" class="sr-only">Parts</label>'
	            +' <input type="text"  class="name0"   id="'+type+"Name"+i+'"  value="'+listItem[i]+'" placeholder="">'
// 	            +' <input type="text" class="code0" name="'+type+""+i+'" id="'+type+""+i+'"  value="'+listId[i]+'" hidden placeholder="">'
	            +'  </div>'
	            +'     <div class="add-delete-btn-wrap">'
			      +'       <a  class="delete-btn">'
			      +'         <span class="sr-only">delete</span>'
			      +'          <i class="xi-minus-square"></i>'
			      +'       </a>'
	
			      +'      </div>'
			      +'    </div>';
		}
		
			
       	 $parentElement.append(str);

	}
	
	 $parentElement.find('.add-btn').unbind('click').click(function(e){
			addInput2($parentElement,type);
		});
	 $parentElement.find('.delete-btn').unbind('click').click(function(e){
			removeInput2(this,$parentElement, type);
	});

}

function addInput2($parentElement, type){		
	seq = $parentElement.attr('count');
	 $parentElement.find('.add-btn').remove();
		var str =	'<div class="input-group-wrapper">'
            +'<div class="input-group">'
            +'<label for="'+type+""+seq+'" class="sr-only">Parts</label>'
            +' <input type="text" class="name0"   id="'+type+"Name"+seq+'"    placeholder="">'
//             +' <input type="text" class="code0" name="'+type+""+seq+'" id="'+type+""+seq+'"  hidden  placeholder="">'
            +'  </div>'
            +'     <div class="add-delete-btn-wrap">'
		      +'       <a  class="delete-btn">'
		      +'         <span class="sr-only">delete</span>'
		      +'          <i class="xi-minus-square"></i>'
		      +'       </a>'
		      +'<a  class="add-btn">'
		      +'<span class="sr-only">add</span>'
		      +'<i class="xi-plus-square"></i>'
		      +'</a>'
		      +'      </div>'
		      +'    </div>';
	 $parentElement.append(str);
	$parentElement.attr('count', Number(seq) + 1);

	 $parentElement.find('.add-btn').unbind('click').click(function(e){
		addInput2($parentElement,type);
	});
	 $parentElement.find('.delete-btn').unbind('click').click(function(e){
		removeInput2(this,$parentElement, type);
	});
}


function removeInput2(obj, $parentElement, type){
	
	if($parentElement.find('.input-group-wrapper').length<=1){
		$parentElement.find('input').val('');
		return false;
	}
	$(obj).closest('div.input-group-wrapper').remove();
	$parentElement.find('.add-btn').remove();
	$parentElement.find('div.input-group-wrapper:last-child > .add-delete-btn-wrap').append('<a class="add-btn">'
	         +'<span class="sr-only">add</span>'
	         +'<i class="xi-plus-square"></i>'
	         +'</a>');
	 $parentElement.find('.add-btn').unbind('click').click(function(e){
			addInput2($parentElement,type);
		});
	 $parentElement.find('.delete-btn').unbind('click').click(function(e){
			removeInput2(this,$parentElement, type);
		});
}	


function openDialogpart(obj){
	var url = CTX + '/sys/sys_0103/03/form.dialog';
	var targetCode = $(obj.target).closest('.input-group').find('input.code0').attr('id');
	var targetName = $(obj.target).closest('.input-group').find('input.name0').attr('id');
	openCommonDialog(url, {'CODE':'PART', 'targetCode': targetCode, 'targetName': targetName}, '', '');
}

function openDialogtool(obj){
	var url = CTX + '/sys/sys_0103/03/form.dialog';
	var targetCode = $(obj.target).closest('.input-group').find('input.code0').attr('id');
	var targetName = $(obj.target).closest('.input-group').find('input.name0').attr('id');
	openCommonDialog(url, {'CODE':'TOOL', 'targetCode': targetCode, 'targetName': targetName}, '', '');
}

function openDialogppe(obj){
	var url = CTX + '/sys/sys_0103/03/form.dialog';
	var targetCode = $(obj.target).closest('.input-group').find('input.code0').attr('id');
	var targetName = $(obj.target).closest('.input-group').find('input.name0').attr('id');
	openCommonDialog(url, {'CODE':'PPE', 'targetCode': targetCode, 'targetName': targetName}, '', '');
}



function checkRequired($obj){
	
	if($obj && $obj.val()){
		return true;
	}else{
		var msg = rules['required'].msg[lang];
		var name = $obj.closest('.registration-write').parent().find('span[class="red"]').parent()[0].firstChild.data;
		if(name){
			msg = msg.replace('###', '"'+name+'"')
		}
		
		$obj.inputWarning(msg);
		return false;
	}
}

function save(){
	
	if($('#file')[0].files && $('#file')[0].files.length>0){
		$('#uploadForm').submit();
	}else{
		 addCode();
	}
	
}

function uploadFileCallback(data, result){
	console.log(data);
	console.log(result)
// 	addCode();
}

function addCode(){
	
	var check = true;
	
	if(!checkRequired($('#SUB_CD')) ){
		check = false
	}
	if(!checkRequired($('#ALARM_TXT')) ){
		check = false
	}
	if(!checkRequired($('#EXPLANATION')) ){
		check = false
	}
	
	if(!check){
		return false;
	}
	
	var formData = new FormData();
	if($('#file')[0].files && $('#file')[0].files.length>0){
		formData.append('file', $('#file')[0].files[0]);
	}

	
	var subCd = $('#SUB_CD').val();
	var alarmTxt = $('#ALARM_TXT').val();
	var explan = $('#EXPLANATION').val();
	var suggest = $('#SUGGESTION').val();

	
	
	var listAction = new Array();
		var action= $(".group_area.action");
		var inputAction = action.find("input");
		for(var i=0; i<inputAction.length; i++){
			var input = inputAction[i];
			var txt = input['value'];
			if(txt!=null&&txt!=''){
				listAction.push(txt);
			}			
		}
		
		
		var part = serializeList('part');
		var tool = serializeList('tool');
		var ppe = serializeList('ppe');
		
	
// 		var partID = $('input[name=PART_NM]').val();
// 		var toolID = $('input[name=TOOL_NAME]').val();
// 		var ppeID = $('input[name=PPE_NAME]').val();
		var path = $('#DOC_PATH').val();
		var mapParam = {
				  WT_ALARM_GR_ID:alarmCd,
				  ACTION: listAction,
// 				  PART_ID: part.LIST,
// 				  TOOL_ID: tool.LIST,
// 				  PPE_ID: ppe.LIST,
				  LEN_ACTION: listAction.length,
				  LEN_PART: part.LIST_NM.length,
				  LEN_TOOL: tool.LIST_NM.length,
				  LEN_PPE: ppe.LIST_NM.length,
				  ALARM_TXT:alarmTxt,
				  ALARM_SUB_CD:subCd,
				  SUGGEST:suggest,
				  DESCRPT:explan,
				  CRUD: crud,
				  WT_ALARM_ID:alarmSubId,
				  DOC_PATH: path,
// 				  PART_QTY:part.LIST_QTY,
// 				  TOOL_QTY:tool.LIST_QTY,
// 				  PPE_QTY:ppe.LIST_QTY,
				  PART:part.LIST_NM,
				  TOOL:tool.LIST_NM,
				  PPE:ppe.LIST_NM
				  };
		
		for (var [key, value] of Object.entries(mapParam)) {
// 			  console.log(key, value);
			  formData.append(key, value);
			}
// 		return false;
		
		$.ajax({
			  url: CTX+'/sys/sys_0103/saveDetailAlarm.ajax',
			  type: 'POST',
			  data: formData,
				dataType: 'json',
				processData: false,
			    contentType: false,
				cache: false,
			  success: function(data) {

				  if(data.result && data.result == 'true'){
					  //alert(crud == 'C'? '<spring:message code='message.saveSuccess' />':'<spring:message code='message.updateSuccess' />');
					  alert(_MESSAGE.common.saveSuccess);
					  cancelCode();
				  }else if(data.code == 'dupl'){
					  alert('<spring:message code='sys.sys_0101.list.alert.doubles' />');
				  }else{
					  //alert(crud == 'C'? '<spring:message code='message.saveFailed' />':'<spring:message code='message.updateFailed' />');
					  alert(_MESSAGE.common.saveFail);
				  }
			  },
			  error: function( req, status, err ) {
				  //alert(crud == 'C'? '<spring:message code='message.saveFailed' />':'<spring:message code='message.updateFailed' />');
				  alert(_MESSAGE.common.saveFail);
			  }
			});	
}

	function serializeList(type){
		
// 		var list = new Array();
// 		var listQty = new Array();
		var listName = new Array();
		
		var count = $('.group_area.'+ type).attr('count');
		for (i=0; i < count; i++){
// 			var code = $('#'+type+i).val();
// 			var qty = $('#'+type+ 'Qty' + i).val();
			var name = $('#'+type+ 'Name' + i).val();
			if(name){
// 				list.push(code);
// 				listQty.push(qty);
				listName.push(name);
			}
		}
		
		return {'LIST_NM': listName};
	}

	
  // back to parent list
	function cancelCode(){
		window.location.href = "";
	}
  // remove element input
	$(document).on('click', '.btn-img', function (event) {
		var id = event.target.id;
		var idInput = 'input-'+id;
		var idInputNumber = 'number-'+id;
		$(".btn-img + br").remove();
		removeElement(id);
		removeElement(idInput);
		if ($('#'+idInputNumber).length) {
			removeElement(idInputNumber);
			}
		
	});
	function removeElement(elementId) {
	    var element = document.getElementById(elementId);
	    element.parentNode.removeChild(element);
	}
	// double check
	function doubleCheck(){
		var subCd = $('#SUB_CD').val();
		if(checkRequired($('#SUB_CD')) ){
			$.ajax({
				  url:  CTX + '/sys/sys_0103/checkDoubleAlarmDetail.ajax?ALARM_SUB_CD='+subCd+'&WT_ALARM_GR_ID='+alarmCd,
			      success: function(data) {
			    	  if(data){
			    		  alert('<spring:message code='sys.sys_0101.list.alert.news' />');
			    		  $('#SUB_CD').available();
			    	  }else{
			    		  $('#SUB_CD').inputWarning('<spring:message code='sys.sys_0101.list.alert.doubles' />')
			    		  alert('<spring:message code='sys.sys_0101.list.alert.doubles' />');
			    	  }
			       },
			       error: function (data) {
		                alert('<spring:message code='message.saveFailed' />');

			       }
				});
		}else{
			alert('<spring:message code='sys.sys_0101.list.alert.invalid' />');
		}
		
	}

 function genElement(type, element, list, qtyList){
		var input = document.createElement("input");
		var inputNumber = document.createElement("input");	
	    var br = document.createElement('br');
		var img = document.createElement("img");
	    input.id = 'input-'+type+'-update-'+i;
	    input.type = 'text';
	    input.name = 'name';
	    input.readOnly = true;
	    inputNumber.id = 'number-'+type+'-update-' + i;
	    inputNumber.type = 'number';
	    inputNumber.name = 'number';
	    inputNumber.min=1;
	    inputNumber.value=qtyList[i];
	    inputNumber.className ='inputNumber';
	    img.className ='btn-img';
	    img.src='/images/minus.png';
	    img.id= type+'-update-' + i;
	    input.value= list[i];
	    element.appendChild(input);
	    element.appendChild(inputNumber);
	    element.appendChild(img);
	    element.appendChild(br);
 }

	var seqGroup = 1;
	function addRowGroup(){		
		seqGroup++;
		$('.group_area').find('span.btn_span.add').remove();
		$('.group_area').append('<div class="group_tb"><input maxlength="200" type="text"><span class="btn_span remove">-</span><span class=" btn_span add">+</span></div>');
		$('span.btn_span.add').click(function(){
			addRowGroup();
		});
		$('span.btn_span.remove').click(function(){
			removeRowGroup(this);
		});
	}
	$('span.btn_span.add').click(function(){
		if(crud=="C"){
			addRowGroup();
		}else{
			if(actionList.length==0){
				addRowGroup();
			}
		}				
	});
	
	$('span.btn_span.remove').click(function(){		
		removeRowGroup(this);
	});
	function removeRowGroup(obj){
		if($('.group_area').find('input').length<=1){
			return false;
		}
		$(obj).closest('div.group_tb').remove();
		$('.group_area').find('span.btn_span.add').remove();
		$('.group_area').find('div.group_tb:last-child').append('<span class=" btn_span add">+</span>')
		$('span.btn_span.add').click(function(){
			addRowGroup();
		});
		$('span.btn_span.remove').click(function(){
			removeRowGroup(this);
		});
	}	

	$(function(){
		$('#btnUpload1').on('click', function() {
			$('#file').trigger('click');
		});
	})
	
</script>