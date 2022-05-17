function isExist(arr, value) {
	if(!arr) {
		return false;
	}
	var index = arr.indexOf(value);
	if(index >= 0){
		return true;
	}
	return false;
}

function previewAvailable(ext) {
	if(!ext) {
		return false;
	}
	var exts = ['txt', 'pdf'];
	if(isExist(exts, ext.toLowerCase())) {
		return true;
	}
	return false;
}

function previewAvailableByType(type) {
	if(!type) {
		return false;
	}
	var types = ['application/pdf', 'text/plain'];
	if(isExist(types, type.toLowerCase())) {
		return true;
	}
	return false;
}

function previewAvailableByFileName(fileName) {
	if(!fileName) {
		return false;
	}
	var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
	return previewAvailable(ext);
}

function buildLinkComponent(MSG_UID, FILE_ORI_NM, ext, tempKey) {
	if(!tempKey){
		tempKey = "";
	}
	var fileLink = 
		'<div class="bubble">'
			+ '<a class="'+tempKey+'" target="_blank" href="'+wschatCtx+'/common/file/DwnlMsgFileNew.ajax?MSG_UID='
				+ MSG_UID
			+ '">'
				+ '<i class="fa fa-download" aria-hidden="true" title="Download"></i>'
			+ '</a>'
			+ '<a class="btn-preview-file '+tempKey+'" file-ext="'+ ext +'" target="_blank" href="'+wschatCtx+'/common/file/DwnlMsgFileNew.ajax?MSG_UID='
				+ MSG_UID
			+ '">'
				+ '<i class="fa fa-eye" aria-hidden="true" title="Preview"></i>'
			+ '</a>'
			+ '<i>'
				+ FILE_ORI_NM
			+ '</i>'
			+'<div class="corner"></div>'
			+'<span></span>'
		+'</div>';
	return fileLink;
}

function showPreviewModal() {
	var dialog = $("#dialog-file-viewer");
	dialog.dialog({
		title:'File viewer',
		autoOpen : false,
		modal : true,
		width : 1200,
		height : 700
	});
	console.log('anhpv111');
	dialog.closest('div.ui-dialog').find('div.ui-dialog-titlebar').css({'background': '#353b56 !important'});
	dialog.closest('div.ui-dialog').find('span.ui-dialog-title').css({'color':'#fff  !important'});
	dialog.dialog("open"); 
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                
                callback(allText);
            }
        }
    }
    rawFile.send(null);
}

function textPreview(text) {
	if(!text){
		return;
	}
	text = text.replace(/(?:\r\n|\r|\n)/g, '<br />'); //replace all line breaks in a string with <br /> tags
	
	$(".file-preview-content").empty();
	$(".file-preview-content").append("<div>"+text+"</div>");
}

function pdfPreview(fileUrl) {
	var pdfEmbed = 
		'<embed src="'
		+fileUrl
		+'" type="application/pdf" width="100%" height="100%" />';

	$(".file-preview-content").empty();
	$(".file-preview-content").append(pdfEmbed);
}

$(document).ready(function() {
	$(document).on("click", ".btn-preview-file", function(e) {
		var fileUrl = $(this).attr("href");
		var ext = $(this).attr("file-ext");
		if(ext.toLowerCase() == "pdf"){
			pdfPreview(fileUrl);
			showPreviewModal();
			return false;
		}

		console.log(ext);
		if(ext.toLowerCase() == "txt"){ 
			readTextFile(fileUrl, textPreview);
			showPreviewModal();
			return false;
		}
    });
});