var message = {
    NotFoundConf : 'Sie können die Konfigurationsdatei nicht finden.',
    CheckBrowser : 'Der Browser Sie verwenden nicht die Datei-Download unterstützen. Bitte überprüfen Sie Ihren Browser.',
    TotalSizeError : 'Gesamtgröße der Datei darf nicht länger als {1}.',
    MaxFileCountError : 'Sie können nicht mehr Dateien {1} zu einem Zeitpunkt hochladen.',
    MinFileCountError : 'Sie müssen mindestens {1} Dateien zu einem Zeitpunkt ein laden.',
    MinFileSizeError : 'Die Größe von {1} ist zu klein. Sie können müssen laden größer als {2}.',
    MaxFileSizeError : 'Die Größe von {1} ist zu groß. Sie können müssen laden weniger als {2}.',
    FileWhiteTypeError : '{1} Dateien können nicht hochgeladen werden. Die folgenden Datei sind nur erlaubt hochzuladen. \r\n"{2}\"',
    FileBlackTypeError : '{1} Dateien können nicht hochgeladen werden. Die folgenden Dateien werden an die Grenze hochgeladen. \r\n{2}\"',
    PopupAllow : 'Für den normalen Gebrauch bitte Popups zulassen.',
    DownloadError : "Download-Fehler",
    DeleteError : "Löschen von Dateien Fehler",
    GetfileError : "Um die Datei zu bringen hat ein Fehler auftritt",
    InitialError : "InitialError",
    DeleteConfirm : {
        title: "Sind Sie sicher, dass Sie löschen möchten?",
        text: "Sie können eine eine Datei nicht wiederhergestellt werden gelöscht, wenn.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ja, ich möchte löschen.",
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