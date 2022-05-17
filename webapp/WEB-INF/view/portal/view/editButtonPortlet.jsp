<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="portletBase.jsp"></jsp:include>
<div id="edit_btn" class="area_info">
	<div id="edit_approved" class="edit_btn_area">
		<div class="condition_icon"></div>
		<span>결재작성</span>
	</div>
	<div id="edit_board" class="edit_btn_area">
		<div class="condition_icon"></div>
		<span>게시판 작성</span>
	</div>
</div>
<script type="text/javascript">
	function openEditorWindow(url) {
		popupWindow = window.open(url, 'popup', 'width=' + (parseInt(parent.window.innerWidth) * 0.9) + ',height=' + (parseInt(parent.window.innerHeight) * 0.9));
	}
	
	function addDocument(rowid, target, callback, obj) {
		var url = CTX+'/apv/apv_0101/poupNewDocument/form.popup?';
		openEditorWindow(url);	
	}
		
	$('#edit_btn').on('click', '#edit_approved', addDocument);
	$('#edit_btn').on('click', '#edit_board', function() {
		onSelect("", '/comm/comm_0103/01/form.dialog', 'BOARD_ID')
	});
</script>