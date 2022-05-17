/* 초기화 */
function sys0800(){
	makeMenuList();
}

function makeMenuList() {
	// 메뉴 리스트 비우기 
	$('#MENU-LIST').html('');
	// 메뉴 리스트 조회 
	var data = _sys.mariaDB.getData(CTX + '/sys_new/sys_0800/getData.ajax', {});
	console.log(data);
	// 메뉴 리스트 생성
	data.forEach((e) => {
		// 메뉴 row 생성
		var sample = _sys_elements.sys_0800.main.tr_menu_row(e);
		// 상위 메뉴 있을 경우,
		if(e.UP_MENU_ID) {
			// 상위 메뉴의 sub row 없을 경우
			if(!$('tbody#MENU-LIST-' + e.UP_MENU_ID).length) {
				// 제일 상위 table 태그의 colgroup col 가져오기
				var colgroup = $('#MENU-LIST').parent('table').children('colgroup').find('col').toArray().reduce((acc, e2) => acc + e2.outerHTML, '');
				// 상위 메뉴의 sub row 생성  
				var up_sub_sample = _sys_elements.sys_0800.main.tr_menu_sub_row(Object.assign({COL: colgroup}, e));
				// 상위 메뉴의 row 뒤에 sub row 삽입
				$('tr#MENU-ROW-' + e.UP_MENU_ID).after(up_sub_sample);
			}
			// 상위 메뉴의 sub row에 메뉴 row 삽입
			//$('tbody#MENU-LIST-' + e.UP_MENU_ID).append(sample);
		}
		// 상위 메뉴 없을 경우,
		else {
			//$('tbody#MENU-LIST').append(sample);
		}
		
		/* Property */
		sample = $(sample).prop('info', e);
		
		/* Event */
		// row 클릭 이벤트
		//sample = $(sample).click(openPopup).css('cursor', 'pointer');
		
		// fold 버튼 클릭 이벤트
		sample = $(sample).find('a[id*=FOLD-BTN-]').click(function(event) {
			var info = $(this).parents('tr').prop('info');
			var add, remove
			
			if($(this).hasClass('unfold')) 
				add='fold', remove='unfold';
			else if($(this).hasClass('fold')) 
				add='unfold', remove='fold';
			
			// 클래스
			$(this).addClass(add).removeClass(remove);
			// 감추기
			$('div#MENU-FOLD-' + info.MENU_ID).slideToggle().parent('td').toggleClass('fold');
		}).parents('tr');
		
		// active 버튼 클릭 이벤트
		$(sample).find('input[id*=ACTIVE-BTN-]').click(function(event) {
			var checked = !$(this).prop('checked');
			if(confirm(_MESSAGE.sys.activeMenuConfirm)) {
				var info = $(this).parents('tr[id*=MENU-ROW]').prop('info');
				info.USE_YN = !checked ? 'Y' : 'N', info.PROCESS = 'UPDATE';
				
				var result = _sys.mariaDB.ajax(CTX + '/sys_new/sys_0800/save.ajax', info, 'get');
				if(result.UPDATE_MENU_CNT > 0) {
					alert(_MESSAGE.common.saveSuccess);
				} else {
					alert(_MESSAGE.common.saveFail);
				}
			} else {
				$(this).prop('checked' , checked);
			}
		}).parents('tr');
		
		// modify 버튼 클릭 이벤트
		$(sample).find('a[id*=MODIFY-BTN-]').click(openPopup).parents('tr');
		
		// add 버튼 클릭 이벤트
		$(sample).find('a[id*=ADD-BTN-]').click(openPopup).parents('tr');
		
		// delete 버튼 클릭 이벤트
		$(sample).find('a[id*=DELETE-BTN-]').click(function(event) {
			// 삭제 여부 컨펌 
			if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 삭제 요청
			var info = $(this).parents('tr[id*=MENU-ROW-]').prop('info');
			var result = _sys.mariaDB.ajax(CTX + '/sys_new/sys_0800/delete.ajax', info, 'get');
			// 삭제 성공
			if(result.IS_DELETE) {
				alert(_MESSAGE.common.deleteSuccess);
				makeMenuList();
			}
			// Exception 발생
			else if(result.EXCEPTION){
				if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
			}
			// 삭제 실패
			else {
				alert(_MESSAGE.common.deleteFail);
			}
		}).parents('tr');
		/* //Event */
		
		// 상위 메뉴 없을 경우 = $('tbody#MENU-LIST'), 상위 메뉴 있을 경우 $('tbody#MENU-LIST-' + e.UP_MENU_ID)
		$('tbody#MENU-LIST' + (e.UP_MENU_ID ? '-' + e.UP_MENU_ID : '')).append(sample);
	});
}

function openPopup(e) {
//	console.log(this, e.target, e.currentTarget);
//	if(e && e.target !== e.currentTarget) return;
	
	var TYPE = $(this).attr('id').split('-')[0].toUpperCase();
	
	if(['MODIFY', 'ADD'].includes(TYPE)) $('div#layerPopup').attr('class', 'layer-popup-planing');
	
	var info = $(this).parents('tr[id*=MENU-ROW-]').prop('info');
	
	/* MODIFY */
	if(TYPE === 'MODIFY') {
		var content = _sys_elements.sys_0800.popup.menu_content({
			TITLE: 'Modify Menu',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		
		// 기존 값 설정
		$('span#UP_MENU_ID').text(info.UP_MENU_ID);
		$('span#MENU_ID').text(info.MENU_ID);
		$('span#LEV').text(info.LEV);
		$('input#MENU_NM').val(info.MENU_NM);
		$('input#MENU_NM_ENG').val(info.MENU_NM_ENG);
		$('input#ORD_NO').val(info.ORD_NO);
		$('select#USE_YN option[value=' + info.USE_YN + ']').prop('selected', true);
		$('input#LINK_PATH').val(info.LINK_PATH);
		$('input#PARAM').val(info.PARAM);
		$('textarea#RMK').val(info.RMK);
		
		// 프로퍼티 추가
		$('.layer-cont').prop('info', info);
	}
	/* ADD */
	else if(TYPE === 'ADD') {
		var content = _sys_elements.sys_0800.popup.menu_content({
			TITLE: 'Register Menu',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		
		// MENU_ID 자동 생성
		var menu_id = $('tbody#MENU-LIST-' + info.MENU_ID + ' > tr').not('.sub-table').toArray().map((e) => {
		    var parts = $(e).prop('info').MENU_ID.split('_');
		    return parseInt(parts[parts.length - 1]);
		}).sort((a,b) => a-b).reduce((acc, e) => {
		    acc = (acc < e) ? acc : acc + 1;
		    return acc;
		}, 1);
		menu_id = info.MENU_ID + '_' + (menu_id.toString().length > 1 ? menu_id : '0' + menu_id);
		
		// ORD_NO 자동 생성
		var ord_no = $('tbody#MENU-LIST-' + info.MENU_ID + ' > tr').not('.sub-table').toArray().map((e) => {
		    return $(e).prop('info').ORD_NO;
		}).sort((a,b) => a-b).pop() + 1 || 1;
		
		// 자동 생성 값 설정 
		$('span#UP_MENU_ID').text(info.MENU_ID);
		$('span#MENU_ID').text(menu_id);
		$('span#LEV').text(parseInt(info.LEV) + 1);
		$('input#ORD_NO').val(ord_no);
		
		// 프로퍼티 추가
		$('.layer-cont').prop('info', {UP_MENU_ID: info.MENU_ID, MENU_ID: menu_id, LEV: parseInt(info.LEV) + 1, MENU_NM: null, MENU_NM_ENG: null, ORD_NO: ord_no, USE_YN: 'Y', URL: null, PARAM: null, RMK: null});
	}
	
	
	//$('#MENU_NM').keyup(_sys.deleteEnglish);
	$('#MENU_NM_ENG').keyup(_sys.deleteHangul);
	//$('#ORD_NO').keyup(function(e){ this.value = this.value.replace(/[^0-9]/gi, ''); });
	$('#ORD_NO').keypress(_sys.isNumberKey);
	
	// 팝업 닫기 버튼 이벤트
	$('a#popup_close').click(closePopup);
	
	// 팝업 등록 버튼 이벤트
	$('a#popup_register').click(closePopup);
	
	// 팝업창 활성화 
	$('div#layerPopup').addClass('active');
	
	initialControl();
	
}

function closePopup() {
	// 등록, 닫기 여부 체크  
	var isRegister = $(this).attr('id').split('_')[1] === 'register';
	
	// type 체크 
	var type = $(this).parents('div.layer-cont').attr('popup-type');
	
	if(isRegister && ['MODIFY', 'ADD'].includes(type)) {
		// validation check
		if(!validationCheck()) return;
		// 프로퍼티 가져오기 
		var info = $('.layer-cont').prop('info');
		// 수정 일 경우, 
		if(type === 'MODIFY') info.PROCESS = 'UPDATE';
		// 추가 일 경우,
		else if(type === 'ADD') info.PROCESS = 'INSERT';
		
		// 입력값 추가
		info.MENU_NM = $('input#MENU_NM').val();
		info.MENU_NM_ENG = $('input#MENU_NM_ENG').val();
		info.ORD_NO = $('input#ORD_NO').val();
		info.USE_YN = $('select#USE_YN option:selected').val();
		info.LINK_PATH = $('input#LINK_PATH').val();
		info.PARAM = $('input#PARAM').val();
		info.RMK = $('textarea#RMK').val();
		
		// 등록, 수정
		var result = _sys.mariaDB.ajax(CTX + '/sys_new/sys_0800/save.ajax', info, 'get');
		if(result.INSERT_MENU_CNT > 0 || result.UPDATE_MENU_CNT > 0) {
			alert(_MESSAGE.common.saveSuccess);
			makeMenuList();
		} else {
			alert(_MESSAGE.common.saveFail);
		}
	}
	else {
		console.log('닫기');
	}
	// popup 내용 삭제, 비활성화 
	$('div#layerPopup').html('').removeClass('active');
}

/* 유효성 검사 */
function validationCheck(root='') {
	var check = true;
	/* validation-check */
	check = $(root + ' [validation-check]').vcCheck();
	return check; 
}