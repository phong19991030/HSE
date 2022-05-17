var message = {
    NotFoundConf : "can't find configure file",
    CheckBrowser : 'Your device do not support files downloading. Please try again in desktop browser.',
    TotalSizeError : 'over {1} file(s) at a time.',
    MaxFileCountError : 'Please upload no more than {1} file(s) at a time.',
    MinFileCountError : 'Please upload more than {1} file(s) at a time.',
    MinFileSizeError : '{1} is too small, please upload files larger than {2}.',
    MaxFileSizeError : '{1} is too large, please upload files less than {2}.',
    FileWhiteTypeError : '{1} has type not allowed, please upload files of type {2}.',
    FileBlackTypeError : '{1} has type not allowed, please upload except to files of type {2}.',
    PopupAllow : 'Please allow popups for this website',
    DownloadError : "download error",
    DeleteError : "Delete error",
    GetfileError : "getFile error",
    InitialError : "InitialError",
    DeleteConfirm : {
        title: "Are you sure?",
        text: "You will not be able to recover this file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false,
        closeOnCancel: false
    }
    //TODO swal 구현 참조
    /*      swal 삭제 확인 및 취소 선택후 알림창
    * function(isConfirm){
     if (isConfirm) {
     swal("Deleted!", "Your imaginary file has been deleted.", "success");
     } else {
     swal("Cancelled", "Your imaginary file is safe :)", "error");
     }
     */
}