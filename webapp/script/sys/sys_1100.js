/* 초기화 */
var dataCOM = [];
function sys1100(){
	makeCodeList();
	
	// 조회 정렬 셀렉트박스 변경 �?�벤트 
	$('select#SEARCH_TYPE, select#ORDER_BY').change(function() {
		$('ul#DETAIL-FORM, ul#MODIFY-FORM').hide();
		makeCodeList();
	});
	// ROOT 등�? 버튼 �?�릭 �?�벤트
	$('button#ROOTADD-BTN').click(openForm);
	
	// 하위 등�? 버튼 �?�릭 �?�벤트  
	$('a#ADD-BTN').click(openForm);
	// 수정 버튼 �?�릭 �?�벤트  
	$('a#MODIFY-BTN').click(openForm);
	// 삭제 버튼 �?�릭 �?�벤트
	$('a#DELETE-BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var info = $('div.registration.active').parent('li').prop('info');
		var result = _sys.mariaDB.ajax(CTX + '/sys_new/sys_1100/delete.ajax', info, 'get');
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			makeCodeList();
			$('ul#MODIFY-FORM, ul#DETAIL-FORM').hide();
		}
		// Exception 발�?
		else if(result.EXCEPTION){
			if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
		}
		// 삭제 실패
		else {
			alert(_MESSAGE.common.deleteFail);
		}
	});
	
	// 저장 버튼 �?�릭 �?�벤트 
	$('a#SAVE-BTN').click(function() {
		
		// validation check
		if(!validationCheck()) return;
		
		var info = $(this).prop('info');
		info.COMM_NM = $('input#COMM_NM').val();
		info.DESCRPT = $('textarea#DESCRPT').val();
		info.COMM_CD = $('input#COMM_CD').val();
		
		var result = _sys.mariaDB.ajax(CTX + '/sys_new/sys_1100/save.ajax', info, 'get');
		if(result.INSERT_CODE_CNT > 0 || result.UPDATE_CODE_CNT > 0) {
			alert(_MESSAGE.common.saveSuccess);
			makeCodeList();
			$('li#CODE-ROW-' + result.COMM_CD + ' > div.registration').addClass('active');
			openForm();
		} else {
			alert(_MESSAGE.common.saveFail);
		}
	});
	// 닫기 버튼 �?�릭 �?�벤트 
	$('a#CLOSE-BTN').click(function() {
		$('ul#MODIFY-FORM').hide();
		if($('div.registration.active').length) openForm();
	});
	// $('input#PREFIX_NM').keyup(function(e) {this.value = this.value.replace(/[ㄱ-ㅎ�?-ㅡ가-핳a-zA-Z \{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,'').toUpperCase()});
}

function makeCodeList() {
	// 코드 리스트 비우기 
	$('#CODE-LIST').html('');
	// 코드 리스트 조회 
	var data = _sys.mariaDB.getData(CTX + '/sys_new/sys_1100/getData.ajax', {ORDER_BY: $('select#ORDER_BY option:selected').val()});
    dataCOM = data;
	// 코드 리스트 �?성
	data.forEach((e) => {
            
		// 코드 row �?성
		var sample = _sys_elements.sys_1100.main.li_code_row(e);
		
		/* Property */
		sample = $(sample).prop('info', e);
		
		/* Event */
		// row �?�릭 �?�벤트
		sample = $(sample).find('div.registration').click(function(event) {
			if(event && event.target !== event.currentTarget) return;
			// 해당 li 활성화, 나머지 li 비활성화
			$('#CODE-LIST div.registration.active').removeClass('active');
			$(this).addClass('active');
			openForm();
		}).parents('li');
		
		// fold 버튼 �?�릭 �?�벤트
		sample = $(sample).find('a[id*=FOLD-BTN-]').click(function(event) {
			var info = $(this).parents('li').prop('info');
			var add, remove;
			
			if($(this).hasClass('unfold')) 
				add='fold', remove='unfold';
			else if($(this).hasClass('fold')) 
				add='unfold', remove='fold';
			
			// �?�래스
			$(this).addClass(add).removeClass(remove);
			// �?추기
			//$('div#CODE-FOLD-' + info.MENU_ID).slideToggle().parent('td').toggleClass('fold');
			$('ul#CODE-LIST-' + info.COMM_CD).slideToggle();
		}).parents('li');
		/* //Event */
		
		// �?위 코드 없�?� 경우 = $('ul#CODE-LIST'), �?위 코드 있�?� 경우 $('ul#CODE-LIST-' + e.UP_COMM_CD)
		$('ul#CODE-LIST' + (e.UP_COMM_CD ? '-' + e.UP_COMM_CD : '')).append(sample);
	});
	
	/* 코드 리스트 �?역 스�?�롤 */
	$(".wrap-scroll-area").mCustomScrollbar({
		axis: "y",
		advanced: {
			autoExpandHorizontalScroll: true
		},
		theme: "minimal-dark",
		mouseWheelPixels: 300
	});
}

function countChild(COMM_CD){
	var count = 0;
	var idx = 0;
    dataCOM.forEach(e =>{
        if(e.UP_COMM_CD == COMM_CD){
            count++;
			var lastCd = e["COMM_CD"];
			var lastposition = lastCd.lastIndexOf("-");
			if(lastposition > 0){
				var tmp = Number(lastCd.substring(lastposition+1));
				if(idx == 0){
					idx = tmp;
				}else if(idx < tmp){
					idx = tmp;
				}
				
			}
        }
    });

    
    return Number(parseInt(idx) + 1);

}

function openForm() {
//	debugger
    $('input#COMM_CD').val("").focus().prop("disabled", false);
	var type = $(this).attr('id') ? $(this).attr('id').split('-')[0] : null;
	if(type === 'ROOTADD') {
		// 기존�? 선�? �?� row 비활성화
		$('div.registration.active').removeClass('active');
		$('span#TITLE').text('Register');
		$('span#UP_COMM_NM').text('ROOT');
		$('input#COMM_NM').val('');
		$('textarea#DESCRPT').val('');
		$('a#SAVE-BTN').prop('info', {PROCESS:'INSERT', LEV:1, UP_COMM_CD: null, COMM_NM: null, DESCRPT: null, TYPE: null});
	}
	else if(type === 'ADD') {
		var info = $('div.registration.active').parent('li').prop('info');
		$('input#COMM_CD').val(info.COMM_CD + "-"+ countChild(info.COMM_CD));
        if(info.LEV == 1) $('input#COMM_CD').prop("disabled", true);
		$('span#TITLE').text('Register');
		$('span#UP_COMM_NM').text(info.COMM_NM);
		$('input#COMM_NM').val('');
		$('textarea#DESCRPT').val('');
		$('a#SAVE-BTN').prop('info', {PROCESS:'INSERT', LEV:info.LEV + 1, UP_COMM_CD: info.COMM_CD, COMM_NM: null, DESCRPT: null});
	}
	else if(type === 'MODIFY') {
        $('input#COMM_CD').prop("disabled", true);
		var info = $('div.registration.active').parent('li').prop('info');
		$('span#TITLE').text('Modify');
		$('span#UP_COMM_NM').text(info.UP_COMM_CD ? info.UP_COMM_NM : 'ROOT');
		$('input#COMM_NM').val(info.COMM_NM);
		$('input#COMM_CD').val(info.COMM_CD);
		$('textarea#DESCRPT').val(info.DESCRPT);
		
		$('a#SAVE-BTN').prop('info', Object.assign({PROCESS: 'UPDATE'}, info));
	} else {
		// �?세 �?� 활성화
                
		var info = $('div.registration.active').parents('li').prop('info');
		$('h3#UP_CODE').text(info.UP_COMM_CD ? info.UP_COMM_NM : 'ROOT');
		$('span#COMM_NM').text(info.COMM_NM);
		$('span#DESCRPT').html('').append('<p>' + (info.DESCRPT ? info.DESCRPT.split('\n').join('<p></p>') : '') + '</p>');
		
		// LEV2 �?� 경우 등�? 막기 
		if(info.LEV > 1) $('a#ADD-BTN').hide();
		else $('a#ADD-BTN').show();
	}
	
	// �?세�?�, 입력�?� on/off
	if(['ROOTADD', 'ADD', 'MODIFY'].includes(type)) {
		$('ul#DETAIL-FORM').hide();
		$('ul#MODIFY-FORM').show();
	} else {
		$('ul#DETAIL-FORM').show();
		$('ul#MODIFY-FORM').hide();
	}
}


/* 유효성 검사 */
function validationCheck(root='') {
	var check = true;
	/* validation-check */
	check = $(root + ' [validation-check]').vcCheck();
	
	var info = $('a#SAVE-BTN').prop('info');
        
	// 중복 체�?�
	if($('input#COMM_CD').val() && info.LEV === 1) {
        info.COMM_CD = $('input#COMM_CD').val();
		var result = _sys.mariaDB.ajax(CTX + '/sys_new/sys_1100/checkDuplicate.ajax', info, 'get');
		if(result.CNT > 0) {
			$('input#COMM_CD').vcWarning(_MESSAGE.common.duplicateCheckFail('code'));
			check = false;
		}
	}
	
	return check; 
}