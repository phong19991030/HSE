var handyUrl = 'http://portal.innopolis.or.kr'; // 운영
//var handyUrl = 'http://210.98.50.200:8080'; // 개발

// 기안기 생성
function handyGwCall(form_name,closeYn){
	url = handyUrl + '/handydocs/confhtml/hstgian_cmd_callGian.jsp?F='+form_name;
	
	//window.open(url, 'CallGian',"left=1,top=1,width="+(window.screen.width * 0.8) + ",height="+(window.screen.height * 0.8)+"',scrollbars=yes,resizable=yes,menubar=no'");
	//window.open(url, 'CallGian');
	
	windowOpen(url, 'CallGian');
	//window.open(url, form_name, "width=1200, height=900");
	if(closeYn == 'Y'){
		self.close();
	}
}


// 결재라인 조회 팝업
function handyGwLineView(docNo){
	var url = CTX + "/common/popup/controls";

	var param;
	param = "APPRID="+docNo+"&cls=gwLine&type=popup";
	window.open(url + '?' + param, '_target', 'width=850, height=300');
	
	
	
	
	//url = handyUrl + '/handydocs/confhtml/appr_view.jsp?APPRID='+docNo;
	
	//window.open(url, 'CallGian',"left=1,top=1,width="+(window.screen.width * 0.8) + ",height="+(window.screen.height * 0.8)+"',scrollbars=yes,resizable=yes,menubar=no'");
	//window.open(url, 'CallGwLineView',"width=700, height=270,scrollbars=no,resizable=yes,menubar=no'");
	//windowOpen(url, 'CallGwLineView', 800, 270);
	//window.open(url, 'CallGwLineView',"left=1,top=1,width="+(window.screen.width * 0.8) + ",height="+(window.screen.height * 0.8)+"',scrollbars=no,resizable=yes,menubar=no'");
	//window.open(url, form_name, "width=1200, height=900");
}



//결재문서 조회 팝업
function handyGwDocView(docNo){
	url = handyUrl + '/handydocs/confhtml/doc_view.jsp?APPRID='+docNo;
	
	//window.open(url, 'CallGwDocView');
	windowOpen(url, 'CallGwDocView');
	//window.open(url, 'CallGwLineView',"width=450, height=270,scrollbars=no,resizable=yes,menubar=no'");

}

/*********************************************************************************
** 결재문서에 해당파일 자동첨부 start
**********************************************************************************/
function handyAutoFileUpload(files,ctxPath){
    downUrls = new Array();
    downFileNames = new Array();
    downIndex = 0;

    notifyInit(files,ctxPath);
    
//    return true;
}
function notifyInit(files,ctxPath){
/* attach.ini 파일을 생성시켜 차후 기안기 호출시 해당내용에 있는 파일을 자동 첨부하는 기능 */
/* 위치는 고정 */
	tempFolderPath = "C:\\HandySoft\\HANDYGroupware8\\bin";

    var oShell = hshell.GetWshShell("");
//    var name = "test.PNG";

	filePath = tempFolderPath+"\\attach.ini";
	var fso = hshell.GetWshShell("Scripting.FileSystemObject");
	var tfile = fso.CreateTextFile(filePath);
	tfile.writeline("[attach]");
	tfile.writeline("attach.cnt="+files.length);
	
	for(var i=0; i < files.length; i++){    	
		tfile.writeline("attach."+i+"=C:\\HandySoft\\"+files[i]["file_name"]);
	}	
//	tfile.writeline("attach.0=C:\\HandySoft\\autoUpload\\"+name);
	tfile.close();
	fso = null;

	/* 서버파일저장위치 및 파일명 */
	/* 한글깨짐을 조심하시기 바랍니다. */
	for(var i=0; i < files.length; i++){    	
		downUrls[i] = ctxPath+"/common/file/download?FLE_KEY="+files[i]["file_key"]+"&ATCH_FLE_SEQ="+files[i]["file_seq"];
		downFileNames[i] = files[i]["file_name"];
	}
	    
	formFileDownload();

}
function formFileDownload() {
	if(downUrls.length <= 0){
		alert('다운로드할 첨부 파일이 없습니다.');
	}
	else{
		var hshell = document.all["hshell"];
		var wsh = hshell.GetWshShell("");

/* 위치는 변경가능 */
/* 첨물이 저장될 PC 위치 */

		localFolderPath = "C:\\HandySoft";
		if (localFolderPath != "") {
			downloadUrl();
		}

		wsh = null;
	}
}
function downloadUrl() {
	var hshell = document.all["hshell"];
	// 첫번째 파라미터 url 은 상대주소도 사용 가능
	hshell.DownloadFromURL(downUrls[downIndex], localFolderPath + "\\" + downFileNames[downIndex], 0, 0);
   
    checkStateBeforeProceedDownloading();
}
function checkStateBeforeProceedDownloading() {
	var hshell = document.all["hshell"];

	// download state 가 0이면 다운 완료, 1이면 다운 진행
	if (hshell.GetDownloadSize() == 0 || hshell.GetDownloadState() == 1) {
		// download size 는 현재까지 현재 url 의 다운로드 크기값.
		var downSize = hshell.GetDownloadSize();
		// download 가 완료되지 않았으므로, 잠시 후 다시 검사.
		window.setTimeout("checkStateBeforeProceedDownloading();", 100, "javascript");
	} else if (downIndex < downUrls.length - 1) {
		++downIndex;
		downloadUrl();
	}

	if (hshell.GetDownloadState()==0 && downIndex == downUrls.length-1){
		downloadComplete = true;
		downIndex = 0; //2004.06.04 첨부저장 여러번할 경우 초기화해줘야 제대로 받을 수 있다.
	}
}
/*********************************************************************************
** 결재문서에 해당파일 자동첨부 end
**********************************************************************************/

