/*초기화*/
var on_site_check_list;
function safety_0701(){
	
	var project_list = _sys.mariaDB.getData(CTX + '/com/com_0102/getData.ajax', {});
	project_list.LIST.forEach((e) => {
		
		var option = '<option value="' + e.PROJECT_ID + '">' + e.PROJECT_NAME + '</option>';
		option = $(option).prop('info', e);
		$('select#PROJECT').append      (option);
	});
	
  //append ratio group
	var check_list = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax', {CODE : 'CHECK_STATUS'});
  $('td#COMMON_CHECK').append(createLabel(1,check_list)); //name="radio1"
  $('td#HEALTH_CHECK').append(createLabel(2,check_list)); //name="radio2"
  $('td#SAFETY_CHECK').append(createLabel(3,check_list)); //name="radio3"
  $('td#WORKING_CHECK').append(createLabel(4,check_list)); //name="radio4"
  $('td#ENVIROMENT_CHECK').append(createLabel(5,check_list)); //name="radio5"

  //popupCheckList
  on_site_check_list = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax', {CODE : 'ONSIDE_CL_ST'});

  $('button#BTN_CHECK_LIST').css('cursor', 'pointer').click(openPopupCheckList);

	// 수정페이지일 경우
	if($('input#PROCESS').val() === 'UPDATE') {
		modifyInit();
	} 
	
	//저장버튼 클릭
	$('button#SAVE_BTN').click(save);
}

function openPopupCheckList(){
  $('div#layer_popup_check_list').attr('class', 'layer-popup active');	
	$('button#btn_save_popup_check_list').css('cursor', 'pointer').click(savePopup);
  createPopupCheckList(on_site_check_list);
}

function createPopupCheckList(list){
  $('#ON_SITE_CHECK_LIST').html('');
  let index = 1;
  list.forEach((e) => {
    var sample = 
           `<tr>`
          +`  <td class="txt-center">${index}</td>`
          +` <td>${e.NAME}</td>`
          +` <td class="txt-center">`
          +`   <div class="toggle-switch">`
          +`     <input type="checkbox" id="toggle${index}">`
          +`    <label for="toggle${index}"></label>`
          +`   </div>`
          +`  </td>`
          +`</tr>`;

          sample = $(sample).css('cursor', 'pointer').click(function(event) {
            /* if(event.target.tagName === 'TD' || event.target.tagName === 'EM' || event.target.tagName === 'SPAN') {
              var info = $(this).prop('info');
              window.location = CTX + '/sft/sft_0001/detailForm?TOOL_ID=' + info.TOOL_ID;
            } */
          });

          $(sample).prop('info', e);
    $('#ON_SITE_CHECK_LIST').append(sample);
    index++;
  });  
}

function initContainerCheckList(){  
  var sample = `<th scope="row">`+ $('#checkList').val() +`</th>`
              +`<td colspan="3">`
              +`  <div class="check-selected-wrap">`
              +`    <button id="BTN_RESET_CHECK_LIST" class="btn1 style2">`+ $('#reset').val() +`</button>`
              +`    <ul id ="CHECK_LIST_CHOOSE">`
              +`      `
              +`    </ul>`
              +`  </div>`
              +`  <div class="view-form">`
              +`    <table class="base-table">`
              +`      <colgroup>`
              +`        <col style="width: 5%;">`
              +`        <col style="width: 15%;">`
              +`        <col style="width: 30%;">`
              +`        <col style="width: 35%;">`
              +`        <col style="width: 15%;">`
              +`      </colgroup>`
              +`      <thead>`
              +`        <tr>`
              +`          <th scope="col">NO</th>`
              +`          <th scope="col">`+ $('#division').val() +`</th>`
              +`          <th scope="col">`+ $('#Checking').val() +`</th>`
              +`          <th scope="col">` + $('#Error').val()+`</th>`
              +`          <th scope="col" class="txt-center">` +$('#Action').val()+`</th>`
              +`        </tr>`
              +`      </thead>`
              +`      <tbody id="CHECK_LIST_QUESTION">`
              +`               `
              +`      </tbody>`
              +`    </table>`
              +`  </div>`
              +`</td>`;
  $('tr#CHECK_LIST').html(sample); //container
  $('button#BTN_RESET_CHECK_LIST').css('cursor', 'pointer').click(openPopupCheckList);

}

var selectedCheckList =[];
function savePopup(){
  initContainerCheckList();
  var cnt = 0;
  selectedCheckList = [];
  $("#ON_SITE_CHECK_LIST tr").each(function (i){
		var info =$(this).prop('info');
		var tmpChecked 	= $(this).find("input");
		var isChecked = tmpChecked[0].checked;
		if(isChecked){
			cnt++;
			info.idx = cnt;
      info.SAFE_CHECK_ACTION = "NO"; //default value Create
			selectedCheckList.push(info)
			makeSelectedCheckList(info);
		
		}
	});

  $('div#layer_popup_check_list').attr('class', 'layer-popup');
  $('html').removeClass('hidden');
}

function makeSelectedCheckList(info){
  let sample = `<li>`
                    +`  <span class="badge-custom4">${info.NAME}</span>`
                    +`</li>`
        $('#CHECK_LIST_CHOOSE').append(sample);

        let sample2 = `<tr>`
                        +`	<td>${info.idx}</td>`
                        +`	<td>${info.NAME}</td>`
                        +`	<td>${info.DESCRPT}</td>`
                        +`	<td>`
                        +`	<div class="register-write w100p">`
                        +`	  <div class="input-group">`
                        +`		<input  validation-check="required" id="error_${info.idx}" type="text" title="지적 사항" placeholder="지적 사항을 입력해주세요"`
                        +`		  value="${(info.SAFE_CHECK_ERROR)?info.SAFE_CHECK_ERROR:''}">`
                        +`	  </div>`
                        +`	</div>`
                        +`	</td>`
                        +`	<td class="txt-center">`
                        +`	<span class="checkbox-radio-group">`
                        +`	  <label for="confirm${info.idx}-1" class="radio">`
                        +`		<input  validation-check="required" value="YES" type="radio" name="confirm${info.idx}" id="confirm${info.idx}-1" ${(info.SAFE_CHECK_ACTION =='YES')?'checked':''}>`
                        +`		<span class="circle"></span>`
                        +`		<em>YES</em>`
                        +`	  </label>`
                        +`	</span>`
                        +`	<span class="checkbox-radio-group">`
                        +`	  <label for="confirm${info.idx}-2" class="radio">`
                        +`		<input  validation-check="required" value="NO" type="radio" name="confirm${info.idx}" id="confirm${info.idx}-2" ${(info.SAFE_CHECK_ACTION =='NO')?'checked':''}>`
                        +`		<span class="circle"></span>`
                        +`		<em>NO</em>`
                        +`	  </label>`
                        +`	</span>`
                        +`	</td>`
                        +`	</tr>`;
        
          sample2 = $(sample2).css('cursor', 'pointer').click(function(event) {
            /* if(event.target.tagName === 'TD' || event.target.tagName === 'EM' || event.target.tagName === 'SPAN') {
              var info = $(this).prop('info');
              window.location = CTX + '/sft/sft_0001/detailForm?TOOL_ID=' + info.TOOL_ID;
            } */
          });
          
          // 프로퍼티 추가 
          $(sample2).prop('info', info);

        $('#CHECK_LIST_QUESTION').append(sample2);
}

function save() {
	// validation check
	if(!validationCheck()) {
		return;
	} 
		
	// 파라미터 생성
	var param = createParameter();
	console.log(param);
	// 파라미터 변환 (object, array => JSON string)
	param = _sys.convertParam(param);
	// 저장
	var data = _sys.mariaDB.ajax(CTX + '/sft/sft_0701/save.ajax', param, 'post');
	console.log(data);
	
	if(data.INSERT_RESULT > 0 || data.UPDATE_RESULT > 0) {
		alert(_MESSAGE.common.saveSuccess);
    var id = data.SAFE_CHECK_ID;
		saveCheckList(id);
		window.location = CTX + '/sft/sft_0701/list';
	} else {
		alert(_MESSAGE.common.saveFail);
	}
}

/* 유효성 검사 */
function validationCheck(root='') {
	var check = true;
	/* validation-check */
	check = $(root + ' [validation-check]').vcCheck();
	
	return check; 
}

/* 파라미터 생성 */
function createParameter() {
	var param = {};
	if($('input#PROCESS').val() === 'UPDATE') {
		param.SAFE_CHECK_ID = $('input#SAFE_CHECK_ID').val();
	} else if($('input#PROCESS').val() === 'INSERT') {
		param.SAFE_CHECK_ID = $('input#SAFE_CHECK_ID').val();
	} 
	param.PROCESS = $('input#PROCESS').val();
	param.PROJECT_ID = $('select#PROJECT option:selected').prop('info').PROJECT_ID;
	param.DOC_NO = $('input#DOC_NO').val();

	param.COMMON_CHECK = $('input[name=radio1]:checked').prop('value'); //name="radio1"
	param.HEALTH_CHECK = $('input[name=radio2]:checked').prop('value'); //name="radio2"
	param.SAFETY_CHECK = $('input[name=radio3]:checked').prop('value'); //name="radio3"
	param.WORKING_CHECK = $('input[name=radio4]:checked').prop('value'); //name="radio4"
	param.ENVIROMENT_CHECK = $('input[name=radio5]:checked').prop('value'); //name="radio5"

	param.CHECKER = $('input#id_emp_str_uid_key_checker').val();
	param.CHECK_DATE = $('input#CHECK_DATE').val();
	return param;
}

function saveCheckList(id){
  selectedCheckList.forEach((e) =>{

    var param = {};
    param.PROCESS = $('input#PROCESS').val();
    param.SAFE_CHECK_ID = id;
    param.COMM_CD = e.COMM_CD;
    param.SAFE_CHECK_ERROR = $(`input#error_${e.idx}`).prop('value');
    param.SAFE_CHECK_ACTION = $(`input[name=confirm${e.idx}]:checked`).prop('value');

    var data = _sys.mariaDB.getData(CTX + '/sft/sft_0701/saveCheckList.ajax', param);
  })

  return selectedCheckList;
}

/* 수정페이지에서 실행될 초기화 함수 */
function modifyInit(){
	
	//데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/sft/sft_0701/detailForm/getDetailInfo.ajax', {
		SAFE_CHECK_ID: $('input#SAFE_CHECK_ID').val()
	}); 
	console.log(data);
	//데이터 없을 경우 return
	if(!data) {
		return;
	}
	
	$('input#CHECKER').val(data.CHECKER);
	$('input#CHECK_DATE').val(data.CHECK_DATE);
	$('select#PROJECT').siblings('label').text(data.PROJECT_NAME);
	$('select#PROJECT option[value=' + data.PROJECT_ID + ']').prop('selected', true);
	$('input#DOC_NO').val(data.DOC_NO);

  $("input[name=radio1][value=" + data.COMMON_CHECK + "]").prop('checked', true);
  $("input[name=radio2][value=" + data.HEALTH_CHECK + "]").prop('checked', true);
  $("input[name=radio3][value=" + data.SAFETY_CHECK + "]").prop('checked', true);
  $("input[name=radio4][value=" + data.WORKING_CHECK + "]").prop('checked', true);
  $("input[name=radio5][value=" + data.ENVIROMENT_CHECK + "]").prop('checked', true);

  initContainerCheckList();

  initCheckList(data.CHECK_LIST);

}

function initCheckList(list){
  var idx = 1;
  list.forEach((e)=>{
    e.idx = idx++;
    makeSelectedCheckList(e);
  });

  selectedCheckList = list;
}

function createLabel(radioN, check_list){
    let label = "";
    let j = 1;
    check_list.forEach((e) => {
      label += 
        `<span class="checkbox-radio-group">`
        +`  <label for="radio${radioN}-${j}" class="radio">`
        +`    <input  validation-check="required" value="${e.COMM_CD}" type="radio" name="radio${radioN}" id="radio${radioN}-${j}">`
        +`    <span class="circle"></span>`
        +`    <em>${e.NAME}</em>`
        +`  </label>`
        +`</span>`
      j++;
    });
    return label; 
}

function goList() { 
  window.location = CTX + '/sft/sft_0701/list';
}







