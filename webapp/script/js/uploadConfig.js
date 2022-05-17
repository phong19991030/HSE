var commonContetextPath = window.location.protocol + '//' + window.location.hostname + (window.location.port == ''?'':':'+window.location.port)

var uploadDefaultOpt = {
    contextPath:'', // 기본 Context Path
    baseControllerPath: "/fum/fum_0101", // Controller 주소
	maxFileSize:'', // 한 파일 당 최대 용량 설정
	maxFileCount:'', // 한번에 업로드 가능한 최대 파일 개수
    minFileSize:'', // 한 파일 당 최소 용량 설정
    minFileCount:'', // 한번에 업로드 해야할 최소 파일 개수
    totalMaxSize :'', // 한번에 업로드 가능한 최대 용량 설정
	developMode:{  // 개발자모드. 내부 log를 console에 남깁니다.
    	enable : false // true | false
		// 'printLevel' : 'i' // print Level
	},
	blockPolicy:'black', // 업로드 차단 정책 (black | white)
    licenseKey:"0cpvkkR8PdPuYp/fGg/UK9IYPuylkdBhP+wQCtOJhREiG2ZUR7EFUceNjktGqj/GAuXfDJ1N7RJ59c/ChgcEYOMPop7qdbNX+Mr4mCnjebkRbvtj5QG52R9yTIpYrXFspby++L7tL9pEneciiOWXB0E0sJkns1So/F2/6M8VlifoK8LovnqwdqoXjrUw/ZnjZxTE2/UkPMb+aKfIjwGW00WPuLt6YGBy0pPpKSs+ZRoRPx8GEySthN87mX9xvEHJ0+cDiAcZpj9PnSu/LaOZ/168KWu5Ehl1pyTUYszBNGkxIAcg+I7ASBPa/TFn4nJNiWwUTXHLRSc2in01A6BWIIGRTUHof4fVnxlD9fZWRNe6yo0zYB7q6Zgq16JUjLiXScvSOgZRTo2Pgr8eDPfZZqe9eP2qvcrnySNMkaCt9zMNxzc4Nzh7y4fNWnLTyKkChtzddTfWkF9+Hi26HVrHA8tjHMRUdCPBIlSb+40Vh5QzqkNZp+ALSJuvCjnYqQyEp9sAE1bG7ITX53/+hLnlKylVJgJ/3YxeybTxJINGzkzB5zIiwrWEwfaJZpuAxlce974DyUFkDr8SzgPMwvgka+WFmiNRs4BRlr97jOANwYEmcaChoGxZ9fGocU08KiUBDzn3GBda+V/o5CbHTJvyIdu84oXl26sScXaFYywIM2KT1+5C/ONXwA0rwiyG4oR3Ib+rgQ2j1g4q+8I10/5GEA==",
    blackExtension:[], // blockPolicy가 black일 경우 적용될 차단 목록
	whiteExtension:[], // blockPolicy가 white일 경우 적용될 허용 목록
	controlType:'UPLOADBOX', // 업로드 컴포넌트의 타입
    functionExtType: 'ajax' // { 'jsp' | 'ajax' }. 필수값입니다.
};

uploadDefaultOpt.transmitDirection={ // 기능 경로. 해당 값이 없을 경우 default 값으로 설정됩니다.
    // 경로는 상단에 설정한 contextPath + baseControllerPath + '/' + transmitDirection.* + '.' + functionExtType 으로 자동 결정됩니다.
    upload: "upload",
    delete: "deleteFiles",
    download: "downloadFile",
    zip: "zipFiles",
    downloadZip: "downloadZipFile",
    progress: "progressDownloadFile",
    deletetemp: "deleteTempFile",
    clearupload: "clearUpload",
    foldercheck: "folderCheck",
    preupload: "preUpload"
};

var messageConfig = { // 다국어 지원 메시지 설정
	'ko':'message-kr.js',
	'en':'message-en.js',
	'jp':'message-jp.js',
	'vi':'message-vi.js',
	'de':'message-de.js'
};

