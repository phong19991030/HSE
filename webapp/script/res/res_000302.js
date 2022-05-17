
/*초기화*/
function res_000302(){
	// 데이터 조회
	// var data = _sys.mariaDB.getData(CTX +'/res/res_0003/detailForm/getDetailInfo.ajax', {
	// 	RES_NO: $('input#RES_NO').val(),
	// });
	// console.log($('input#RES_NO').val());
	// console.log(data);
	// // 데이터 없을 경우 return 
	// if(!data) return;
	// 작성자와 사용자의 UID가 다를 경우 삭제, 수정 불가
//	if(data.INS_ID != _CLIENT.USER_UID) {
//		// 수정, 삭제 버튼 삭제 
//		$('span#modify_btn').remove();
//		$('span#delete_btn').remove();
//	} else {
//		// 수정 버튼 클릭 이벤트
//		$('span#modify_btn').click(function() {
//			if($('input#EVENT_ID').val()) window.location = CTX + '/oam2/oam_0200/reportModify?RPT_ID=' + $('input#RPT_ID').val() + '&EVENT_ID=' + $('input#EVENT_ID').val();
//			else window.location = CTX + '/oam2/oam_0200/reportModify?RPT_ID=' + $('input#RPT_ID').val(); 
//		});
//		
//		// 삭제 버튼 클릭 이벤트
//		$('span#delete_btn').click(function() {
//			// 삭제여부 컨펌
//			if(!confirm(_MESSAGE.common.deleteConfirm)) return;
//			// 삭제 요청
//			var result = _oam.mariaDB.getData('/oam2/oam_0200/reportDetail/deleteReport.ajax', {
//				RPT_ID: $('input#RPT_ID').val(),
//			});
//			console.log(result);
//			// 삭제 성공
//			if(result.IS_DELETE_RPT) {
//				alert(_MESSAGE.common.deleteSuccess);
//				window.location = CTX + '/oam2/oam_0200/main';
//			} 
//			// 삭제 실패
//			else {
//				alert(_MESSAGE.common.deleteFail);
//			}
//		});
//	}
  // 수정 버튼 클릭 이벤트
  // $('button#MODIFY_BTN').click(function() {
  //   window.location = CTX + '/sft/sft_0501/modifyForm?EDU_ID=' + $('input#EDU_ID').val();
  // });

  $('button#MODIFY_BTN').click(function() {
		window.location = CTX + '/res/res_0003/modifyForm?HAZARDOUS_ID=' + $('input#HAZARDOUS_ID').val();
	});	
}

function goList() { 
  window.location = CTX + '/res/res_0003/list';
}
