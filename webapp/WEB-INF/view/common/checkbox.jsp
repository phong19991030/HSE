<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<div>
<a2m:checkbox id="${DATA.id}" type="${DATA.type}" cls="${DATA.cls}" defaultValue="${DATA.defaultValue}" selected="${DATA.selected}" script="${DATA.script}"/> 
</div>
							                                   
							                                    <td class="txt-center">
							                                      <span class="checkbox-radio-group">
							                                        <label for="${param.key}-1" class="radio">
							                                          <input type="radio" name="${param.key}" id="${param.key}-1">
							                                          <span class="circle"></span>
							                                          <em>Yes</em>
							                                        </label>
							                                      </span>
							                                      <span class="checkbox-radio-group">
							                                        <label for="${param.key}-2" class="radio">
							                                          <input type="radio" name="${param.key}" id="${param.key}-2">
							                                          <span class="circle"></span>
							                                          <em>No</em>
							                                        </label>
							                                      </span>
							                                      <span class="checkbox-radio-group">
							                                        <label for="${param.key}-3" class="radio">
							                                          <input type="radio" name="${param.key}" id="${param.key}-3">
							                                          <span class="circle"></span>
							                                          <em>N/A</em>
							                                        </label>
							                                      </span>
							                                    </td>
<script>
function getCheckInfos(key, checkId){
	var param = {}
	
	if(checkId){
		param.strUid = checkId;
	}else{
		param.strUid = checkId;
	}
	
	
	
	controlShowHide1(cnt, key);
	
}

getValue() {
	  var yes = document.getElementById("A-1-1");  
	  var no = document.getElementById("A-1-2"); 
	  var na = document.getElementById("A-1-3");
	  if (yes.checked == true){  
		    var y = document.getElementById("A-1-1").value;  
		    return document.getElementById("result").innerHTML = y;   
	  } else if(no.checked == true){
		  var n = document.getElementById("A-1-2").value;  
		    return document.getElementById("result").innerHTML = n;   
	  } else if(na.checked == true){
		  var na = document.getElementById("A-1-3").value;
		  return document.getElementById("result").innerHTML = na;
	  }
	  
}
</script>