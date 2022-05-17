
function FileAttachment(fileFormId, contextPath){
    this.CREATE_TYPE = "C";
    this.READ_TYPE = "R";
    this.DELETE_TYPE = "D"
    this.UPDATE_TYPE = "U"
    this.fileFormId = fileFormId;
    this.contextPath = contextPath;
    this.a2mUpload = null;
    this.onDeleteCompleteInnerCallback = null;
    this.onDeleteErrorInnerCallback = null;
    this.onUploadCompleteInnerCallback = null;

    this.onInitCallbacks =[];                            
    this.onFileAddedCallbacks =[]; 
    this.onPauseCallbacks =[]; 
    this.onUploadStartCallbacks =[];
    this.onFileProgressCallbacks =[];
    this.onUploadCompleteCallbacks =[];
    this.onBeforeDownCallbacks =[];
    this.onDownCompleteCallbacks =[];
    this.onDownErrorCallbacks =[];
    this.onBeforeDeleteCallbacks =[];
    this.onDeleteCompleteCallbacks =[];
    this.onDeleteErrorCallbacks =[];
    this.addedFileInfoArr = [];
	this.deletedFileInfoArr = [];
	
	this.useAlias = false;
}

FileAttachment.prototype.build = function(){
	this.a2mUpload = $(this.fileFormId).A2mUpload({
		    contextPath:this.contextPath,
            inputName: this.inputName,
            baseControllerPath:'/fum/fum_0101',
            chunkRetryInterval:this.chunkRetryInterval,
            maxChunkRetries:this.maxChunkRetries,
            maxFileSize:this.maxFileSize, // BYTE 단위
            maxFileCount:this.maxFileCount,
            minFileCount:this.minFileCount,
            totalMaxSize :this.totalMaxSize,// BYTE 단위
            blockPolicy:this.blockPolicy,
            blackExtension:this.blackExtensions,
            whiteExtension:this.whiteExtensions,
            controlType:this.controlType,
            functionExtType: "ajax",
            dropAreaView: this.isSupprortDrop,
            developMode : this.isDevelopMode,
            generateUniqueIdentifier: function(file, event){
            	return FileAttachment.generateUuidAttachFile(file, event);
            },
            onInit: this.onInit,
            onFileAdded:this.onFileAdded,
            onPause:this.onPause,
            onUploadStart:this.onUploadStart,
            onFileProgress:this.onFileProgress,
            onUploadComplete:this.onUploadComplete,
            onBeforeDown:this.onBeforeDown,
            onDownComplete:this.onDownComplete,
            onDownError:this.onDownError,
            onBeforeDelete:this.onBeforeDelete,
            onDeleteComplete:this.onDeleteComplete,
            onDeleteError:this.onDeleteError,
            wrapperObj: this,
            pauseImageUrl: this.contextPath + "/images/pause.png",
            resumeImageUrl: this.contextPath + "/images/resume.png",
            closeImageUrl: this.contextPath + "/images/close.png",
            useAlias : this.useAlias,
            
            licenseKey:"0cpvkkR8PdPuYp/fGg/UK9IYPuylkdBhP+wQCtOJhREiG2ZUR7EFUceNjktGqj/GAuXfDJ1N7RJ59c/ChgcEYOMPop7qdbNX+Mr4mCnjebkRbvtj5QG52R9yTIpYrXFspby++L7tL9pEneciiOWXB0E0sJkns1So/F2/6M8VlifoK8LovnqwdqoXjrUw/ZnjZxTE2/UkPMb+aKfIjwGW00WPuLt6YGBy0pPpKSs+ZRoRPx8GEySthN87mX9xvEHJ0+cDiAcZpj9PnSu/LaOZ/168KWu5Ehl1pyTUYszBNGkxIAcg+I7ASBPa/TFn4nJNiWwUTXHLRSc2in01A6BWIIGRTUHof4fVnxlD9fZWRNe6yo0zYB7q6Zgq16JUjLiXScvSOgZRTo2Pgr8eDPfZZqe9eP2qvcrnySNMkaCt9zMNxzc4Nzh7y4fNWnLTyKkChtzddTfWkF9+Hi26HVrHA8tjHMRUdCPBIlSb+40Vh5QzqkNZp+ALSJuvCjnYqQyEp9sAE1bG7ITX53/+hLnlKylVJgJ/3YxeybTxJINGzkzB5zIiwrWEwfaJZpuAxlce974DyUFkDr8SzgPMwvgka+WFmiNRs4BRlr97jOANwYEmcaChoGxZ9fGocU08KiUBDzn3GBda+V/o5CbHTJvyIdu84oXl26sScXaFYywIM2KT1+5C/ONXwA0rwiyG4oR3Ib+rgQ2j1g4q+8I10/5GEA=="
	});
}

FileAttachment.prototype.onInit =  function(context){
    var wrapperObj =  context.getOpt('wrapperObj');
    for (var i = 0; i< wrapperObj.onInitCallbacks.length; i++){
        wrapperObj.onInitCallbacks[i](context);
    }
} 
FileAttachment.prototype.onFileAdded =  function(context, file){
    var wrapperObj =  context.getOpt('wrapperObj');
    for (var i = 0; i< wrapperObj.onFileAddedCallbacks.length; i++){
        wrapperObj.onFileAddedCallbacks[i](context, file);
    }

    wrapperObj.insertFileInfoToArray(file, wrapperObj.addedFileInfoArr);
}
FileAttachment.prototype.onPause =  function(context){
    var wrapperObj =  context.getOpt('wrapperObj');
    for (var i = 0; i< wrapperObj.onPauseCallbacks.length; i++){
        wrapperObj.onPauseCallbacks[i]();
    }
}
FileAttachment.prototype.onUploadStart =  function(context){
    var wrapperObj =  context.getOpt('wrapperObj');
    for (var i = 0; i< wrapperObj.onUploadStartCallbacks.length; i++){
        wrapperObj.onUploadStartCallbacks[i]();
    }
}
FileAttachment.prototype.onFileProgress =  function(context, file){
    var wrapperObj =  context.getOpt('wrapperObj');
    for (var i = 0; i< wrapperObj.onFileProgressCallbacks.length; i++){
        wrapperObj.onFileProgressCallbacks[i](context, file);
    }
}
FileAttachment.prototype.onUploadComplete =  function(context){
    var wrapperObj =  context.getOpt('wrapperObj');
    for (var i = 0; i< wrapperObj.onUploadCompleteCallbacks.length; i++){
        wrapperObj.onUploadCompleteCallbacks[i]();
    }

    if(wrapperObj.onUploadCompleteInnerCallback != null && typeof wrapperObj.onUploadCompleteInnerCallback === 'function'){
        wrapperObj.onUploadCompleteInnerCallback();
        wrapperObj.onUploadCompleteInnerCallback = null;
    }
}
FileAttachment.prototype.onBeforeDown =  function(context, files){
    var wrapperObj =  context.getOpt('wrapperObj');
    for (var i = 0; i< wrapperObj.onBeforeDownCallbacks.length; i++){
        wrapperObj.onBeforeDownCallbacks[i](files);
    }
}
FileAttachment.prototype.onDownComplete =  function(context, files){
    var wrapperObj =  context.getOpt('wrapperObj');
    for (var i = 0; i< wrapperObj.onDownCompleteCallbacks.length; i++){
        wrapperObj.onDownCompleteCallbacks[i](files);
    }
}
FileAttachment.prototype.onDownError =  function(context, files){
    var wrapperObj =  context.getOpt('wrapperObj');
    for (var i = 0; i< wrapperObj.onDownErrorCallbacks.length; i++){
        wrapperObj.onDownErrorCallbacks[i](files);
    }
}
FileAttachment.prototype.onBeforeDelete =  function(context, files){
    var wrapperObj =  context.getOpt('wrapperObj');
    for (var i = 0; i< wrapperObj.onBeforeDeleteCallbacks.length; i++){
        wrapperObj.onBeforeDeleteCallbacks[i](context, files);
    }
}
FileAttachment.prototype.onDeleteComplete =  function(context, files){
    var wrapperObj =  context.getOpt('wrapperObj');
    for (var i = 0; i< wrapperObj.onDeleteCompleteCallbacks.length; i++){
        wrapperObj.onDeleteCompleteCallbacks[i](context, files);
    }
    wrapperObj.addToDeletedFileList(files, wrapperObj.deletedFileInfoArr, wrapperObj.addedFileInfoArr);

    if(wrapperObj.onDeleteCompleteInnerCallback != null && typeof wrapperObj.onDeleteCompleteInnerCallback === 'function'){
        wrapperObj.onDeleteCompleteInnerCallback();
        wrapperObj.onDeleteCompleteInnerCallback = null;
    }
}

FileAttachment.prototype.onDeleteError =  function(context, files){
    var wrapperObj =  context.getOpt('wrapperObj');
    for (var i = 0; i< wrapperObj.onDeleteErrorCallbacks.length; i++){
        wrapperObj.onDeleteErrorCallbacks[i](context, files);
    }

    if(wrapperObj.onDeleteErrorInnerCallback != null && typeof wrapperObj.onDeleteErrorInnerCallback === 'function'){
        wrapperObj.onDeleteErrorInnerCallback();
        wrapperObj.onDeleteErrorInnerCallback = null;
    }
    
}
FileAttachment.prototype.insertFileInfoToArray =  function(fileContainer, addedFiles){
    var file = fileContainer.file;
		var addedFileDto = {
			'uid' : file.uniqueIdentifier,
		}
	addedFiles.push(addedFileDto);
}

FileAttachment.prototype.addToDeletedFileList =  function(files, deletedFiles, insertFiles){
    if(files != null ){
        for(var i = 0; i < files.length; i++){
            var file = files[i];
            var index = this.isFileInFiles(file.uniqueIdentifier, insertFiles);
            if( index > -1){
                insertFiles.splice(index, 1);
            }
            else{
                var fileDto = {
                    'uid' : file.uniqueIdentifier,
                }
                deletedFiles.push(fileDto);
               // console.log("deleted File UID: " + file.uniqueIdentifier);
            }
        }
    }
}

FileAttachment.prototype.getDtoFileInfos =  function(){
    var	files = this.getCurrentFileInfo();
    var dtoFiles = [];
    for (var i =0; i< files.length; i++){
        var file = files[i];
        if(this.isFileInFiles(file.uniqueIdentifier, this.addedFileInfoArr) > -1){
            var dtoFile = {
                'fileFormId' : this.fileFormId,
                'ATCH_FLE_ORD': i,
                'DRFT_FILE_ACS_GRD': '',
                'FLE_KEY' : 'Temp',
                'ATCH_FLE_SEQ' : file.uniqueIdentifier,
                'FLE_TP': file.fileType,
                'FLE_PATH' : file.filePath,
                'FLE_NM' : file.fileName,
                'NEW_FLE_NM': file.filePath,
                'FLE_SZ' : file.fileSize,
                'CRUD': this.CREATE_TYPE,
            }
            dtoFiles.push(dtoFile);
        }
    }
    
    for(var k =0; k< this.deletedFileInfoArr.length; k++){
        var file = this.deletedFileInfoArr[k];
        var dtoFile = {
            'fileFormId' : this.fileFormId,
            'FLE_KEY' : 'Temp',
            'ATCH_FLE_SEQ' : file.uid,
            'FLE_NM' : file.fileName,
            'CRUD': this.DELETE_TYPE,
        }
        dtoFiles.push(dtoFile);
    }	
//    console.log("fileType = " + fileType + "dtoFiles = " + JSON.stringify(dtoFiles));
    return dtoFiles;
}

FileAttachment.prototype.getCurrentDtoFileInfos = function(){
    var dtoFiles = [];
    var	files = this.getCurrentFileInfo();
    for (var i =0; i< files.length; i++){
        var file = files[i];
        var dtoFile = {
            'fileFormId' : this.fileFormId,
            'ATCH_FLE_ORD': i,
            'DRFT_FILE_ACS_GRD': '',
            'FLE_KEY' : 'Temp',
            'ATCH_FLE_SEQ' : file.uniqueIdentifier,
            'FLE_TP': file.fileType,
            'FLE_PATH' : file.filePath,
            'FLE_NM' : file.fileName,
            'NEW_FLE_NM': file.filePath,
            'FLE_SZ' : file.fileSize,
        }
        dtoFiles.push(dtoFile);
    }
    return dtoFiles;
}

FileAttachment.prototype.getCurrentFileInfo =  function(){
    $fileFormId = $(this.fileFormId);
    return $fileFormId.data('dms').data; 
}

FileAttachment.prototype.resetAllofData =  function(){
    this.addedFileInfoArr = [];
    this.deletedFileInfoArr = [];
    $(this.fileFormId).data('dms').reset();
}

FileAttachment.prototype.isFileInFiles = function(uid, files){
    for(i = 0; i< files.length; i++ ){
        if(uid == files[i].uid){
            return i;
        }
    }
    return -1;
}

FileAttachment.uploadFileIntoDisk =  function(fileAttachments, onUploadCompleteInnerCallback){
    if(fileAttachments.length > 0){
        var fileAttachment = fileAttachments[0];
        fileAttachment.onUploadCompleteInnerCallback = onUploadCompleteInnerCallback;
        var isHaveFile = false;
        var dmsUI = $(fileAttachment.fileFormId).data('dms').a2mDmsUI;
        var dataList = dmsUI.mA2mDms;
        for(var i = 0; i < fileAttachments.length; i++){
            var data = $(fileAttachments[i].fileFormId).data('dms');
            var files = $(fileAttachments[i].fileFormId).data('dms').lfu.files;
            if(files.length > 0){
                isHaveFile = true;
            }
            dataList.push(data);
        }
        if(isHaveFile){
            dmsUI.upload();
            return true;
        }
        else{
            onUploadCompleteInnerCallback();
            return false;
        }
    }
}

FileAttachment.prototype.renderFiles = function(receivedFiles){
    var files = this.mapFileDtoToModel(receivedFiles); 
    //console.log("FileAttachment renderFiles = " + JSON.stringify(files));
    if(files.length > 0){
        $(this.fileFormId).data('dms').setData(files);
    }
    
    //TODO - add Doc File Attachment
    $.each(files, function(i, file) {
    	// URL (올린 이름으로 다운로드) .../fum/fum_0101/downloadFile.ajax??fileName=${file.fileName}&filePath=${file.filePath}'
    });
}

FileAttachment.prototype.mapFileDtoToModel = function(receivedFiles){
    //console.log("FileAttachment mapFileDtoToModel receivedFiles = " + JSON.stringify(receivedFiles));
    var modelFiles = [];
		for (var i =0; i < receivedFiles.length; i++){
            var file = receivedFiles[i];
            var insertDateTime = "";
            if(typeof file.INS_DT === 'string' || file.INS_DT instanceof String){
                insertDateTime = file.INS_DT;
            }
            else{
                if(file.INS_DT.time){
                    insertDateTime = file.INS_DT.time
                }
            }
			var modelFile = {
			   "fileMngId": null,
			   "uniqueIdentifier": file.ATCH_FLE_SEQ,
			   "fileName": file.FLE_NM,
			   "fileDesc": null,
			   "fileType": file.FLE_TP,
			   "fileSize": Number(file.FLE_SZ),
			   "downloadSize":null,
			   "filePath": file.FLE_PATH,
			   "uploadUser": file.INS_ID,
			   "uploadDate": file.INS_DT.time,
			   "status":"ALL_FINISHED",
			   "contextPath":null,
			   "baseControllerPath":null,
			   "now": file.INS_DT.time,
			   "uploaded":true
			}						
		    modelFiles.push(modelFile);				
		}
	return modelFiles;
}
FileAttachment.prototype.deleteFileInHardDisk = function(onDeleteCompleteInnerCallback, onDeleteErrorInnerCallback){
    this.onDeleteCompleteInnerCallback = onDeleteCompleteInnerCallback;
    this.onDeleteErrorInnerCallback = onDeleteErrorInnerCallback;
    $(this.fileFormId).data('dms').deleteFileInHardDisk();
}

/**
 * This method process only save file to hard disk 
 * and return list of files is inserted 
 * and list of files that user want to delete but it is not delete from hard disk in callback
 * @param {*} fileAttachments 
 * @param {*} onProcessCrudComplete 
 * @param {*} onProcessCrudError 
 */
FileAttachment.processsCrudNotDeleteFromHardDisk = function(fileAttachments, onProcessCrudComplete, onProcessCrudError){
    if(fileAttachments != null){
        //Delete from cache
       fileAttachments.forEach(function(fileAttachment){
            var deletedFiles = $(fileAttachment.fileFormId).data('dms').deleteFilesFromCache();
            fileAttachment.addToDeletedFileList(deletedFiles, fileAttachment.deletedFileInfoArr, fileAttachment.addedFileInfoArr);      
       });

       //upload file
        FileAttachment.uploadFileIntoDisk(fileAttachments, function(){
            var totalDtoFilesInfo = [];
            for(var i =0; i < fileAttachments.length; i++){
                var fileAttachment = fileAttachments[i];
                var dtoFileInfo = fileAttachment.getDtoFileInfos();
                totalDtoFilesInfo = totalDtoFilesInfo.concat(dtoFileInfo);
            }
            onProcessCrudComplete(totalDtoFilesInfo);
        });
    }
}


/**
 * This method process insert, delete file from hard disk 
 * and return list of files is deleted or inserted in callback
 * @param {*} fileAttachments 
 * @param {*} onProcessCrudComplete 
 * @param {*} onProcessCrudError 
 */
FileAttachment.processsCrud = function(fileAttachments, onProcessCrudComplete, onProcessCrudError){
    var deletedFileAttachments = FileAttachment.cloneFileAttachment(fileAttachments);
    FileAttachment.deletedFilesInAllFileAttachments(deletedFileAttachments, function(){
        FileAttachment.uploadFileIntoDisk(fileAttachments, function(){
            var totalDtoFilesInfo = [];
            for(var i =0; i < fileAttachments.length; i++){
                var fileAttachment = fileAttachments[i];
                var dtoFileInfo = fileAttachment.getDtoFileInfos();
                totalDtoFilesInfo = totalDtoFilesInfo.concat(dtoFileInfo);

                FileAttachment.reset(fileAttachment);                
            }
            onProcessCrudComplete(totalDtoFilesInfo);
        })
    }, function(){
        onProcessCrudError();
    });

}

FileAttachment.reset = function(fileAttachment){
    $(fileAttachment.fileFormId).data('dms').removeTempleFiles();
    var dmsUI = $(fileAttachment.fileFormId).data('dms').a2mDmsUI;
    dmsUI.isComplete = false;
    dmsUI.mA2mDms = [];
}

FileAttachment.cloneFileAttachment = function(fileAttachments){
    var cloneFileAttachments = [];
    for(var i = 0; i < fileAttachments.length; i++){
        cloneFileAttachments.push(fileAttachments[i]);
    }
    return cloneFileAttachments;
}

FileAttachment.deletedFilesInAllFileAttachments = function(fileAttachments, onDeleteFilesInAllFileAttachmentsComplete,
     onDeleteFilesInAllFileAttachmentsError){
    if(fileAttachments.length <= 0){
        onDeleteFilesInAllFileAttachmentsComplete();    
        return;
    }
    var fileAttachment = fileAttachments.pop();
    fileAttachment.deleteFileInHardDisk(function(){
        FileAttachment.deletedFilesInAllFileAttachments(fileAttachments, onDeleteFilesInAllFileAttachmentsComplete,
            onDeleteFilesInAllFileAttachmentsError);  
    }, function(){
        onDeleteFilesInAllFileAttachmentsError();
    });
}

FileAttachment.generateUuidAttachFile = function(file, event){
	var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    	//console.log("generated uuid = " + uuid);
        return uuid; 
}

function FileAttachmentBuilder(fileFormId, contextPath){
	this.fileAttachment = new FileAttachment(fileFormId, contextPath);
	this.inputName = '';
	this.chunkRetryInterval ='500';
	this.maxChunkRetries = '5';
	this.maxFileSize = '100000000000'; //Byte
 	this.maxFileCount= '100';
 	this.minFileCount= '1';
  	this.totalMaxSize= '100000000000'; //Byte
	this.blockPolicy= 'black';
   	this.blackExtensions= [];
   	this.whiteExtensions= [];
	this.controlType= 'UPLOADBOX';
  	this.isSupprortDrop= true;
	this.isDevelopMode= false;
	this.useAlias = false;
}

//set callback
FileAttachmentBuilder.prototype.setOnInit = function(onInit){
	this.fileAttachment.onInitCallbacks.push(onInit);
	return this;
}

FileAttachmentBuilder.prototype.setOnFileAdded = function(onFileAdded){
	this.fileAttachment.onFileAddedCallbacks.push(onFileAdded);
	return this;
}

FileAttachmentBuilder.prototype.setOnPause = function(onPause){
	this.fileAttachment.onPauseCallbacks.push(onPause);
	return this;
}

FileAttachmentBuilder.prototype.setOnUploadStart = function(onUploadStart){
	this.fileAttachment.onUploadStartCallbacks.push(onUploadStart);
	return this;
}

FileAttachmentBuilder.prototype.setOnFileProgress = function(onFileProgress){
	this.fileAttachment.onFileProgressCallbacks.push(onFileProgress);
	return this;
}

FileAttachmentBuilder.prototype.setOnUploadComplete = function(onUploadComplete){
	this.fileAttachment.onUploadCompleteCallbacks.push(onUploadComplete);
	return this;
}

FileAttachmentBuilder.prototype.setOnBeforeDown = function(onBeforeDown){
	this.fileAttachment.onUploadCompleteCallbacks.push(onUploadComplete);
	return this;
}

FileAttachmentBuilder.prototype.setOnDownComplete = function(onDownComplete){
	this.fileAttachment.onDownCompleteCallbacks.push(onUploadComplete);
	return this;
}

FileAttachmentBuilder.prototype.setOnDownError = function(onDownError){
	this.fileAttachment.onDownErrorCallbacks.push(onDownError);
	return this;
}
FileAttachmentBuilder.prototype.setOnBeforeDelete = function(onBeforeDelete){
	this.fileAttachment.onBeforeDeleteCallbacks.push(onBeforeDelete);
	return this;
}
FileAttachmentBuilder.prototype.setOnDeleteComplete = function(onDeleteComplete){
	this.fileAttachment.onDeleteCompleteCallbacks.push(onDeleteComplete);
	return this;
}
FileAttachmentBuilder.prototype.setOnDeleteError = function(onDeleteError){
	this.fileAttachment.onDeleteErrorCallbacks.push(onDeleteError);
	return this;
}

//set property
FileAttachmentBuilder.prototype.setInputName = function(inputName){
	this.inputName = inputName;
	return this;
}
FileAttachmentBuilder.prototype.setChunkRetryInterval = function(chunkRetryInterval){
	this.chunkRetryInterval = chunkRetryInterval;
	return this;
}
FileAttachmentBuilder.prototype.setMaxChunkRetries = function(maxChunkRetries){
	this.maxChunkRetries = maxChunkRetries;
	return this;
}
FileAttachmentBuilder.prototype.setMaxFileSize = function(maxFileSize){
	this.maxFileSize = maxFileSize;
	return this;
}
FileAttachmentBuilder.prototype.setMaxFileCount = function(maxFileCount){
	this.maxFileCount = maxFileCount;
	return this;
}
FileAttachmentBuilder.prototype.setMinFileCount = function(minFileCount){
	this.minFileCount = minFileCount;
	return this;
}
FileAttachmentBuilder.prototype.setTotalMaxSize = function(totalMaxSize){
	this.totalMaxSize = totalMaxSize;
	return this;
}
FileAttachmentBuilder.prototype.setBlockPolicy = function(blockPolicy){
	this.blockPolicy = blockPolicy;
	return this;
}
FileAttachmentBuilder.prototype.setBlackExtension = function(blackExtension){
	this.blackExtension = blackExtension;
	return this;
}
FileAttachmentBuilder.prototype.setWhiteExtension = function(whiteExtension){
	this.whiteExtension = whiteExtension;
	return this;
}
FileAttachmentBuilder.prototype.setOnlyView= function(){
	this.controlType = "NOTUPLOADBOX";
	return this;
}
FileAttachmentBuilder.prototype.setDropAreaView = function(dropAreaView){
	this.dropAreaView = dropAreaView;
	return this;
}
FileAttachmentBuilder.prototype.setDevelopMode = function(developMode){
	this.developMode = developMode;
	return this;
}

FileAttachmentBuilder.prototype.setUseAlias = function(useAlias){
	this.useAlias = useAlias;
	return this;
}

FileAttachmentBuilder.prototype.build = function(){
    this.fileAttachment.inputName = this.inputName;
	this.fileAttachment.chunkRetryInterval =this.chunkRetryInterval;
	this.fileAttachment.maxChunkRetries = this.maxChunkRetries;
	this.fileAttachment.maxFileSize = this.maxFileSize; //Byte
 	this.fileAttachment.maxFileCount= this.maxFileCount;
 	this.fileAttachment.minFileCount= this.minFileCount;
  	this.fileAttachment.totalMaxSize= this.totalMaxSize; //Byte
	this.fileAttachment.blockPolicy= this.blockPolicy;
   	this.fileAttachment.blackExtensions= this.blackExtensions;
   	this.fileAttachment.whiteExtensions= this.whiteExtensions;
	this.fileAttachment.controlType= this.controlType;
  	this.fileAttachment.isSupprortDrop= this.isSupprortDrop;
    this.fileAttachment.isDevelopMode= this.isDevelopMode;
    this.fileAttachment.useAlias= this.useAlias;
	this.fileAttachment.build();
	return this.fileAttachment;
}
