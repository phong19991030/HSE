<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<!-- <style>
img { max-height:150px;}
.system-detail-wrap .registration-form-lst {
    position: relative;
    float: left;
    width: 100%;
    height: auto;
    padding-left: 2.5rem;
}
.node-title {
	text-align: center;
	color: white;
}

table, th, td {
  border: 1px solid black;
}
</style>
<script type="text/javascript" src="${ctxPath}/script/sys/sys-common.js"></script>
<script type="text/javascript">

	var write_grant = _MENU_GRANT.WRT_YN;
	var down_grant = _MENU_GRANT.EXC_DN_YN;
	
	$(document).ready(function() {
		if(!write_grant) {
			$('#modifybtn').hide();
			$('#deletebtn').hide();			
		}
	});
	
	function goList() {
		$(location).attr('href', CTX + '/sft/sft_0101/list');
	}

	function goUpdate() {
		var crud = "U";
		var	empNo = "${DATA.EMP_NO}";
		var url = CTX+'/sft/sft_0101/formManual?CRUD='+crud+'&EMP_NO='+empNo;
		window.location.href = url;
	}	

	// Delete button - manual delete
    function deleteForm() {
		var empNo = $('#EMP_NO').val();
        if(confirm("<spring:message code='message.confirmDelete'/>\n<spring:message code='message.confirmDeleteBack'/>")) {
            $.ajax({
                url : CTX + "/sft/sft_0101/delete.ajax"
                , type : 'post'
                , data : {'EMP_NO' : empNo}
                , cache : false
                , success : function(data) {
                	console.log("data: ", data);
                    var resultDelete = data.RESULT_DELETE;
                	if(resultDelete == 1) {
                		alert('<spring:message code="message.deletedSuccess"/>');
                		goList();
                	} else {
                		alert('<spring:message code="message.deletedFailed"/>');
                	}
                }
                , error : function(){
                    alert('<spring:message code="message.deletedFailed"/>');
                    location.reload();
                    return false;
                }
            });
        }
    }
		
</script>

<div class="container onm-wrap2 system-wrap system-wrap1">
	<input type="hidden" id="EMP_NO" name="EMP_NO" value="${DATA.EMP_NO}">
	<div class="system-detail-wrap">
		<div class="system-left">
			<div class="tit-wrap">
				<h2 class="heading3">
					<span class="txt"><spring:message code="sft.sft_0101.label.detail" /></span>
				</h2>
				<ul class="location">
						<li><spring:message code="sft.sft_0101.label.header"/></li>
				</ul>
			</div>
			<div class="registration-form registration-form1">
				<div class="registration-form-lst-wrap">
					<ul class="registration-form-lst">
						<li>
							<span><spring:message code="sft.sft_0101.label.empName"/></span>
							<div class="registration-write">
								<span id="EMP_NAME"></span>
							</div>
						</li>
						<li>
							<span><spring:message code="sft.sft_0101.label.empDuty"/></span>
							<div class="registration-write">
								<span id="EMP_DUTY"></span>
							</div>
						</li>
						<li><span style="width: 100%"><spring:message
									code="sft.sft_0101.label.header" /></span></li>
						<li>
							<table id="ppeList">
								<tr id="menu">
									<th><spring:message code="sft.sft_0101.label.menu" /></th>
								</tr>
								<tr id="brand">
									<td><spring:message code="sft.sft_0101.label.brand" /></td>
								</tr>
								<tr id="modelName">
									<td><spring:message code="sft.sft_0101.label.modelName" /></td>
								</tr>
								<tr id="grantDate">
									<td><spring:message code="sft.sft_0101.label.grantDate" /></td>
								</tr>
								<tr id="renewDate">
									<td><spring:message code="sft.sft_0101.label.renewDate" /></td>
								</tr>
								<tr id="status">
									<td><spring:message code="sft.sft_0101.label.status" /></td>
								</tr>
							</table>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="system-right">
				<div class="btns" style="position:fixed; width:12%;">
					<span class="btn-style btn-style-m btn-style1 float-right" id="modifybtn" onclick="goUpdate()"><spring:message code="button.modify"/></span>
					<span class="btn-style btn-style3" id="deletebtn" onclick="deleteForm()"><spring:message code="button.delete"/></span>
					<span class="btn-style btn-style-m btn-style2 float-left" onclick="goList()"><spring:message code="button.cancel"/></span>
				</div>
			</div>
	</div>
</div>
<script>
$(document).ready(function() {
	var empNo = '${DATA.EMP_NO}';
	var detailData = _sys.mariaDB.getData(CTX + '/sft/sft_0101/getDetailData.ajax', {'EMP_NO': empNo});
	console.log("model", detailData);
	
	var empName = detailData.EMP_NAME;
	$("#EMP_NAME").html(empName);
	
	var empDuty = detailData.EMP_DUTY;
	$("#EMP_DUTY").html(empDuty);
	
	var list = detailData.LIST;
	var ppeListTable = $("#ppeList");
	var menuTr = ppeListTable.find("#menu");
	var brandTr = ppeListTable.find("#brand");
	var modelNameTr = ppeListTable.find("#modelName");
	var grantDateTr = ppeListTable.find("#grantDate");
	var renewDateTr = ppeListTable.find("#renewDate");
	var statusTr = ppeListTable.find("#status");
	list.forEach(function(item, index) {
		
		var ppeName = item['PPE_NAME'];
		var menuTd = '<th>' + ppeName +'</th>';
		menuTr.append(menuTd);
		
		var brand = item['BRAND'];
		var brandTd = '<td>' + brand +'</td>';
		brandTr.append(brandTd);
		
		var modelName = item['MODEL'];
		var modelNameTd = '<td>' + modelName +'</td>';
		modelNameTr.append(modelNameTd);
		
		var grantDate = item['GRANT_DATE'];
		var grantDateTd = '<td>' + grantDate +'</td>';
		grantDateTr.append(grantDateTd);
		
		var renewDate = item['RENEW_DATE'];
		var renewDateTd;
		if(renewDate == null) {
			renewDateTd = '<td><spring:message code="sft.sft_0101.label.noticeRenewDateEmpty" /></td>'
		}
		else {
			renewDateTd = '<td>' + renewDate +'</td>';
		}
		renewDateTr.append(renewDateTd);
		
		var status = item['STATUS'];
		var statusTd = '<td>' + status +'</td>';
		statusTr.append(statusTd);
	});
});
</script> -->



<!-- <div class="layer-popup active" id="layer-popup2"> -->
    <div class="popup-cont" style="min-width: 970px;">

      <h2 class="heading4">개인 보호 장비 수정</h2>
      <ul class="popup-cont-inner">
        <li>
          <h3 class="heading5">개인 정보</h3>
          <div class="register-write">
            <div class="input-group">
              <input type="text" title="이름" placeholder="이름" value="홍길동">
            </div>
          </div>
          <div class="register-write">
            <div class="input-group">
              <input type="text" title="직급" placeholder="직급" value="과장">
            </div>
          </div>
        </li>
        <li>
          <h3 class="heading5">개인 보호 장비 정보</h3>
          <article class="view-form">
            <div class="base-table" style="max-height: 55vh;">
              <table>
                <caption></caption>
                <colgroup>
                  <col style="width: 8%;">
                  <col style="width: 12%;">
                  <col style="width: auto;">
                  <col style="width: 12%;">
                  <col style="width: auto;">
                  <col style="width: 3%;">
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row" rowspan="3" class="border-right txt-center">1</th>
                    <th scope="row">품목</th>
                    <td colspan="3">
                      <div class="select-group">
                        <select title="품목">
                          <option>품목명</option>
                          <option selected>안전모</option>
                        </select>
                      </div>
                      <div class="register-write">
                        <div class="input-group">
                          <input type="text" title="브랜드" placeholder="브랜드" value="Petzl">
                        </div>
                      </div>
                      <div class="register-write">
                        <div class="input-group">
                          <input type="text" title="모델명" placeholder="모델명" value="Petzl-Helmet">
                        </div>
                      </div>
                    </td>
                    <td colspan="3" rowspan="3" class="border-left">
                      <button class="table-remove-btn">
                        <i class="las la-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">지급일자</th>
                    <td>
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input type="text" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly
                            value="2021.08.10">
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </td>
                    <th scope="row">교체일자</th>
                    <td>
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input type="text" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                      <span class="mgl10 checkbox-radio-group">
                        <label for="radio" class="radio">
                          <input type="radio" name="radio" id="radio" checked>
                          <span class="circle"></span>
                          <em>파손 시 까지</em>
                        </label>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">상태</th>
                    <td colspan="3">
                      <div class="select-group">
                        <select title="상태">
                          <option>상태</option>
                          <option selected>Good</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                  <!-- -------------------------------------------- -->
                  <tr>
                    <th scope="row" rowspan="3" class="border-right txt-center">2</th>
                    <th scope="row">품목</th>
                    <td colspan="3">
                      <div class="select-group">
                        <select title="품목">
                          <option>품목명</option>
                          <option selected>안전모</option>
                        </select>
                      </div>
                      <div class="register-write">
                        <div class="input-group">
                          <input type="text" title="브랜드" placeholder="브랜드" value="Petzl">
                        </div>
                      </div>
                      <div class="register-write">
                        <div class="input-group">
                          <input type="text" title="모델명" placeholder="모델명" value="Petzl-Helmet">
                        </div>
                      </div>
                    </td>
                    <td colspan="3" rowspan="3" class="border-left">
                      <button class="table-remove-btn">
                        <i class="las la-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">지급일자</th>
                    <td>
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input type="text" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly
                            value="2021.08.10">
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </td>
                    <th scope="row">교체일자</th>
                    <td>
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input type="text" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                      <span class="mgl10 checkbox-radio-group">
                        <label for="radio" class="radio">
                          <input type="radio" name="radio" id="radio" checked>
                          <span class="circle"></span>
                          <em>파손 시 까지</em>
                        </label>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">상태</th>
                    <td colspan="3">
                      <div class="select-group">
                        <select title="상태">
                          <option>상태</option>
                          <option selected>Good</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                  <!-- -------------------------------------------- -->
                  <tr>
                    <th scope="row" rowspan="3" class="border-right txt-center">3</th>
                    <th scope="row">품목</th>
                    <td colspan="3">
                      <div class="select-group">
                        <select title="품목">
                          <option>품목명</option>
                          <option selected>안전모</option>
                        </select>
                      </div>
                      <div class="register-write">
                        <div class="input-group">
                          <input type="text" title="브랜드" placeholder="브랜드" value="Petzl">
                        </div>
                      </div>
                      <div class="register-write">
                        <div class="input-group">
                          <input type="text" title="모델명" placeholder="모델명" value="Petzl-Helmet">
                        </div>
                      </div>
                    </td>
                    <td colspan="3" rowspan="3" class="border-left">
                      <button class="table-remove-btn">
                        <i class="las la-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">지급일자</th>
                    <td>
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input type="text" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly
                            value="2021.08.10">
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </td>
                    <th scope="row">교체일자</th>
                    <td>
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input type="text" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                      <span class="mgl10 checkbox-radio-group">
                        <label for="radio" class="radio">
                          <input type="radio" name="radio" id="radio" checked>
                          <span class="circle"></span>
                          <em>파손 시 까지</em>
                        </label>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">상태</th>
                    <td colspan="3">
                      <div class="select-group">
                        <select title="상태">
                          <option>상태</option>
                          <option selected>Good</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                  <!-- -------------------------------------------- -->
                  <!-- add-btn -->
                  <tr>
                    <td colspan="6" class="txt-center">
                      <button class="row-add-btn">
                        <i class="las la-plus"></i>
                      </button>
                    </td>
                  </tr>
                  <!-- //add-btn -->
                </tbody>
              </table>
            </div>
          </article>
        </li>
      </ul>

      <div class="foot-btn-area">
        <button class="btn-style3">
          <i class="las la-reply"></i><span class="name">취소</span>
        </button>
        <button class="btn-style1">
          <i class="las la-save"></i><span class="name">저장</span></button>
      </div>

      <button type="button" class="popup-close-btn">
        <i class="xi-close"></i>
      </button>
    </div>
  <!-- </div> -->


