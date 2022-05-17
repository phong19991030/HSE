var uploadDefaultOpt = {
    contextPath:'${ctxPath}', // 기본 Context Path
    baseControllerPath: "/fum/fum_0101", // Controller 주소
	maxFileSize:'', // 한 파일 당 최대 용량 설정
	maxFileCount:'', // 한번에 업로드 가능한 최대 파일 개수
    minFileSize:'', // 한 파일 당 최소 용량 설정
    minFileCount:'', // 한번에 업로드 해야할 최소 파일 개수
    totalMaxSize :'', // 한번에 업로드 가능한 최대 용량 설정
	developMode:{  // 개발자모드. 내부 log를 console에 남깁니다.
    	enable : true, // true | false
		printLevel : 'i' // print Level
	},
	blockPolicy:'black', // 업로드 차단 정책 (black | white)
    licenseKey:"0cpvkkR8PdPuYp/fGg/UK9IYPuylkdBhP+wQCtOJhREiG2ZUR7EFUceNjktGqj/GAuXfDJ1N7RJ59c/ChgcEYOMPop7qdbNX+Mr4mCnjebn1NnC0DKErjbj9nQSaZFaupby++L7tL9pEneciiOWXB0E0sJkns1So/F2/6M8VlifoK8LovnqwdqoXjrUw/ZnjZxTE2/UkPMb+aKfIjwGW00WPuLt6YGBy0pPpKSs+ZRoRPx8GEySthN87mX9xvEHJOoYVnyvKKJpBFMK5ehIiBD99gxIz/mVkBw02YsLVSIddxSemAZGvtQMOC1u/elpHaVuoZ+V3gzhPNGZNy0Gt2zdQ5YKMNbo7D5WjfKu2qvRyKLR98n4lZqQdXBoJ9SrV5l8D24FxnPZpUhpkexuMByWXu3e9uAt224krWFH15AWu6JaDiP+vuFHdhDckn5uCqg0y7V8zrC/1N1xR6FlrAzXxvTi2FOy8ia6VGdE9e7Zbf6SyYcmdK8Hl+FyEUTrUfvj6HAGJ3JpAbh5IOlRuuFypDR2DJKFlgBtzt898wAoPxZ264ZPgs33AM9kWVrxlMKo8lrcQxl1N06UhhnnICmnbI6qGYOw7FP5Y2QBJUuohk5eQ+2NDjiwGxeMvN3+Taf4YkVWBtWUwrf34f2kR25erN9o1kauSWO+ngTph1xxFkdSm35+OJCo5Hc6zxloVXfZqNBeJmmOPkq8wV7o6tPOtf6zhWqBI7Y3tuprCkLg=",
    blackExtension:[], // blockPolicy가 black일 경우 적용될 차단 목록
	whiteExtension:[], // blockPolicy가 white일 경우 적용될 허용 목록
	controlType:'UPLOADBOX', // 업로드 컴포넌트의 타입
    functionExtType: 'jsp' // { 'jsp' | 'ajax' }. 필수값입니다.
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
    preupload: "preUpload",
    ieUpload: "ieUpload"
};

var messageConfig = { // 다국어 지원 메시지 설정
	'ko':'message-kr.js',
	'en':'message-en.js',
	'jp':'message-jp.js',
	'de':'message-de.js'
};

