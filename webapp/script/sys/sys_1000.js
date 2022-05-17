/* 초기화 */
function sys1000(){
	makeCodeList();
	
	// 조회 정렬 셀렉트박스 변경 이벤트 
	$('select#ORDER_BY').change(function() {
		$('ul#DETAIL-FORM, ul#MODIFY-FORM').hide();
		makeCodeList();
	});
	// ROOT 등록 버튼 클릭 이벤트
	$('button#ROOTADD-BTN').click(openForm);
	
	// 하위 등록 버튼 클릭 이벤트  
	$('a#ADD-BTN').click(openForm);
	// 수정 버튼 클릭 이벤트  
	$('a#MODIFY-BTN').click(openForm);
	// 삭제 버튼 클릭 이벤트
	$('a#DELETE-BTN').click(function() {
		
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var info = $('div.registration.active').parent('li').prop('info');
		var result = _sys.mariaDB.ajax(ctx + '/sys_new/sys_1000/delete.ajax', info, 'get');
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			makeCodeList();
			$('ul#MODIFY-FORM, ul#DETAIL-FORM').hide();
		}
		// Exception 발생
		else if(result.EXCEPTION){
			if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
		}
		// 삭제 실패
		else {
			alert(_MESSAGE.common.deleteFail);
		}
	});
	
	// 저장 버튼 클릭 이벤트 
	$('a#SAVE-BTN').click(function() {
		
		// validation check
		if(!validationCheck()) return;
		
		var info = $(this).prop('info');
		info.PREFIX_NM = $('input#PREFIX_NM').val();
		info.SUFFIX_NM = $('input#SUFFIX_NM').val();
		info.DESCRPT = $('textarea#DESCRPT').val();
		
		var result = _sys.mariaDB.ajax(ctx + '/sys_new/sys_1000/save.ajax', info, 'get');
		if(result.INSERT_CODE_CNT > 0 || result.UPDATE_CODE_CNT > 0) {
			alert(_MESSAGE.common.saveSuccess);
			makeCodeList();
			$('li#CODE-ROW-' + result.MAINTEN_CD + ' > div.registration').addClass('active');
			openForm();
		} else {
			alert(_MESSAGE.common.saveFail);
		}
	});
	// 닫기 버튼 클릭 이벤트 
	$('a#CLOSE-BTN').click(function() {
		$('ul#MODIFY-FORM').hide();
		if($('div.registration.active').length) openForm();
	});
	
	
	//$('input#PREFIX_NM').keyup(function(e) {this.value = this.value.replace(/[ㄱ-ㅎㅏ-ㅡ가-핳a-z]/g,'')});
	$('input#PREFIX_NM').keyup(function(e) {this.value = this.value.replace(/[ㄱ-ㅎㅏ-ㅡ가-핳 \{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,'').toUpperCase()});
}

function makeCodeList() {
	// 코드 리스트 비우기 
	$('#CODE-LIST').html('');
	// 코드 리스트 조회 
	var data = _sys.mariaDB.getData(CTX + '/sys_new/sys_1000/getData.ajax', {ORDER_BY: $('select#ORDER_BY option:selected').val()});
	console.log(data);
	// 코드 리스트 생성
	data.forEach((e) => {
		// 코드 row 생성
		var sample = _sys_elements.sys_1000.main.li_code_row(e);
		
		/* Property */
		sample = $(sample).prop('info', e);
		
		/* Event */
		// row 클릭 이벤트
		sample = $(sample).find('div.registration').click(function(event) {
			if(event && event.target !== event.currentTarget) return;
			// 해당 li 활성화, 나머지 li 비활성화
			$('#CODE-LIST div.registration.active').removeClass('active');
			$(this).addClass('active');
			openForm();
		}).parents('li');
		
		// fold 버튼 클릭 이벤트
		sample = $(sample).find('a[id*=FOLD-BTN-]').click(function(event) {
			var info = $(this).parents('li').prop('info');
			var add, remove;
			
			if($(this).hasClass('unfold')) 
				add='fold', remove='unfold';
			else if($(this).hasClass('fold')) 
				add='unfold', remove='fold';
			
			// 클래스
			$(this).addClass(add).removeClass(remove);
			// 감추기
			//$('div#CODE-FOLD-' + info.MENU_ID).slideToggle().parent('td').toggleClass('fold');
			$('ul#CODE-LIST-' + info.CODE).slideToggle();
		}).parents('li');
		/* //Event */
		
		// 상위 코드 없을 경우 = $('ul#CODE-LIST'), 상위 코드 있을 경우 $('ul#CODE-LIST-' + e.UP_CD)
		$('ul#CODE-LIST' + (e.UP_CD ? '-' + e.UP_CD : '')).append(sample);
	});
	
	/* 코드 리스트 영역 스크롤 */
	$(".wrap-scroll-area").mCustomScrollbar({
		axis: "y",
		advanced: {
			autoExpandHorizontalScroll: true
		},
		theme: "minimal-dark",
		mouseWheelPixels: 300
	});
}

function openForm() {
	
	var type = $(this).attr('id') ? $(this).attr('id').split('-')[0] : null;
	
	if(type === 'ROOTADD') {
		// 기존에 선택 된 row 비활성화
		$('div.registration.active').removeClass('active');
		
		$('span#TITLE').text('Register');
		$('em#UP_PREFIX_NM').text('');
		$('span#UP_SUFFIX_NM').text('ROOT');
		$('input#PREFIX_NM').val('');
		$('input#SUFFIX_NM').val('');
		$('textarea#DESCRPT').val('');
		
		$('a#SAVE-BTN').prop('info', {PROCESS:'INSERT', LEV:1, UP_CD: null, PREFIX_NM: null, SUFFIX_NM: null, DESCRPT: null});
	}
	else if(type === 'ADD') {
		var info = $('div.registration.active').parent('li').prop('info');
		$('span#TITLE').text('Register');
		$('em#UP_PREFIX_NM').text(info.PREFIX_NM);
		$('span#UP_SUFFIX_NM').text(info.SUFFIX_NM);
		$('input#PREFIX_NM').val('');
		$('input#SUFFIX_NM').val('');
		$('textarea#DESCRPT').val('');
		
		$('a#SAVE-BTN').prop('info', {PROCESS:'INSERT', LEV:info.LEV + 1, UP_CD: info.MAINTEN_CD, PREFIX_NM: null, SUFFIX_NM: null, DESCRPT: null});
	}
	else if(type === 'MODIFY') {
		var info = $('div.registration.active').parent('li').prop('info');
		$('span#TITLE').text('Modify');
		$('em#UP_PREFIX_NM').text(info.UP_CD ? info.UP_PREFIX_NM : '');
		$('span#UP_SUFFIX_NM').text(info.UP_CD ? info.UP_SUFFIX_NM : 'ROOT');
		$('input#PREFIX_NM').val(info.PREFIX_NM);
		$('input#SUFFIX_NM').val(info.SUFFIX_NM);
		$('textarea#DESCRPT').val(info.DESCRPT);
		
		$('a#SAVE-BTN').prop('info', Object.assign({PROCESS: 'UPDATE'}, info));
	} else {
		// 상세 폼 활성화
		var info = $('div.registration.active').parents('li').prop('info');
		$('h3#UP_CODE').text(info.UP_CD ? info.UP_PREFIX_NM + ' | ' + info.UP_SUFFIX_NM : 'ROOT');
		$('em#PREFIX_NM').text(info.PREFIX_NM);
		$('span#SUFFIX_NM').text(info.SUFFIX_NM);
		$('span#DESCRPT').html('').append('<p>' + (info.DESCRPT ? info.DESCRPT.split('\n').join('<p></p>') : '') + '</p>');
		
		// LEV2 일 경우 등록 막기 
		if(info.LEV > 1) $('a#ADD-BTN').hide();
		else $('a#ADD-BTN').show();
	}
	
	// 상세폼, 입력폼 on/off
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
	
	
	// 중복 체크
	var info = $('a#SAVE-BTN').prop('info');
	if($('input#PREFIX_NM').val()) {
		info.PREFIX_NM = $('input#PREFIX_NM').val();
		var result = _sys.mariaDB.ajax(ctx + '/sys_new/sys_1000/checkDuplicate.ajax', info, 'get');
		if(result.CNT > 0) {
			$('input#PREFIX_NM').vcWarning(_MESSAGE.common.duplicateCheckFail('code'));
			check = false;
		}
	}
	
	
	return check; 
}