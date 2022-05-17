var com0302Data = [];

function com0302() {
	// 검색 폼 토글 버튼 클릭 이벤트 
    onSearch();

    $('a#REGISTER_BTN').click(function(){
		window.location = CTX + '/sys_new/doc_0100/registerForm?DOC_GROUP=CQB';
	});
}




/* 검색 이벤트 */
function onSearch() {
	var data = _sys.mariaDB.getData(CTX + '/com/com_0302/getData.ajax');
	// row 생성
	makeList(data.LIST);
	
	
	
}
function dowloadFile(index){
    var info = com0302Data[index];
    if(info.FILE_ID)
    window.open(CTX + '/util/upload/downloadFileV2?fileId=' + info.FILE_ID + '&fileName=' + info.FLE_NM, '_blank');
    else
    alert("File not exists");
}



function makeList(list) {
    com0302Data = list;
    list.forEach(e => {
        var  html = '<a href="javascript:;" onclick="dowloadFile('+list.indexOf(e)+')">[Dowload] <span>'+e.DOC_NAME+'</span></a></br>';
        $('#ROW_LIST').append(html);
    });
};


