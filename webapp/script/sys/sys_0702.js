/**
 * ######## Selector ####################################
 * strong#TITLE : 공지사항 제목
 * li#START_DT : 공지사항 Date setting 시작일
 * li#ENT_DT : 공지사항 Date setting 종료일
 * span#INS_DT : 공지사항 등록/수정 일자
 * span#REGISTER : 공지사항 등록자
 * span#CONTENT : 공지사항 내용
 * span#ATCH_FILE : 첨부파일 영역
 * em#FILE_NM : 첨부파일명
 */

/* 초기화 */
function sys0702(){
	
	//데이터 조회 
	var data = _sys.mariaDB.getData('/sys_new/sys_0700/detailForm/getDetailInfo.ajax', {
		NOTICE_ID: $('input#NOTICE_ID').val(),
	});
	console.log(data);
	
	//데이터 없을 경우 return
	if(!data) return;
	
	$('strong#TITLE').text(data.TITLE);
	$('span#INS_DT').text(data.INS_DT);
	$('span#REGISTER').text(data.REGISTER);
	$('span#CONTENT').text(data.CONTENT);
	$('em#FILE_NM').text(data.FLE_NM);
	
	$('input#ATCH_FLE_SEQ').val(data.ATCH_FLE_SEQ);
	$('input#FLE_PATH').val(data.FLE_PATH); 
	$('input#NEW_FLE_NM').val(data.NEW_FLE_NM);
	$('input#FLE_NM').val(data.FLE_NM);
	
	//첨부파일 ul 생성
	makeAtchFile(data);
	
	//수정 버튼 클릭 이벤트
	$('span#MODIFY_BTN').click(function(){
		window.location = ctx + '/sys_new/sys_0700/modifyForm?NOTICE_ID=' + $('input#NOTICE_ID').val();
	});
	
	//삭제 버튼 클릭 이벤트
	$('span#DELETE_BTN').click(function(){
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		
		// 삭제 요청
		var result = _sys.mariaDB.getData('/sys_new/sys_0700/detailForm/delete.ajax', {
			NOTICE_ID: $('input#NOTICE_ID').val(),
			ATCH_FLE_SEQ: $('input#ATCH_FLE_SEQ').val(),
			FLE_PATH: $('input#FLE_PATH').val(),
			NEW_FLE_NM: $('input#NEW_FLE_NM').val(),
		});
		console.log(result);
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = ctx + '/sys_new/sys_0700/list';
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
	
	// 첨부파일 다운로드
//	$('span#ATCH_FILE').click(function(){
//		var fileName =  $('input#NEW_FILE_NM').val();
//		var fileName =  $('input#FLE_NM').val();
//		if(!fileName) return false;
//		var arr = [];
//		arr = fileName.split('.');
//		window.location.href = CTX + '/util/upload/downloadFile?fileName='+arr[0]+ '&extension='+arr[1];
//		
//		window.location = encodeURI(CTX + '/sys_new/sys_0700/downloadFile.ajax?NEW_FLE_NM=' + fileName + '&FLE_TP=' + extension + '&FLE_PATH=' + file.FLE_PATH + '&FLE_NM=' + file.FLE_NM);
//		
//	});
}

/* 첨부파일 ul 생성 */
function makeAtchFile(file){
	
	//########### 추후 첨부파일 갯수 추가 기능 넣어야 할수도 ###############
	if(file.FLE_NM != ''){
		var sample = 
			'<li class="file">'
			+ ' <a>'
			+ ' 	<span id="ATCH_FILE" class="file-name" style="cursor: pointer;">'
			+ ' 		<em class="download-btn" style="cursor:pointer;">'
			//+ ' 			<input type="hidden" id="NEW_FILE_NM" value="' + file.NEW_FLE_NM + '"/>'	
			+ ' 		</em>'
			+ '			<em id="FILE_NM">' + file.FLE_NM + '</em>'
			+ ' 	</span>'
			+ ' </a>'
			+ '</li>';
	}
	sample = $(sample).find('em#FILE_NM').click(function(event){
		if(event.target.tagName === 'EM') {
			//파일 새로운 파일로 저장되기 때문에 "."으로 split 가능함
			var splitUrl = (file.NEW_FLE_NM).split(".");
			var fileName = splitUrl[0];
			var extension = splitUrl[1];
			console.log(fileName);
			window.location = encodeURI(CTX + '/sys_new/sys_0700/downloadFile.ajax?NEW_FLE_NM=' + fileName + '&FLE_TP=' + extension + '&FLE_PATH=' + file.FLE_PATH + '&FLE_NM=' + file.FLE_NM);
		}
	}).parents('li');
	//파일 로우 추가
	$('ul#ATCH_LIST').append(sample);
}