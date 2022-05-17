var fu_message = [];
fu_message['en'] = {
	totalSize: 'Total size cannot exceed maximum size!',
	maxSize: 'max size',
	upload: 'Upload',
	preview: 'Images Preview',
	update: 'Update',
	confirmDelete: 'Do you want to delete this file?',
	selectFilesToUpload: 'Please select a file to upload!',
	uploadFailed: 'Upload failed!',
	deleteFailed: 'Delete failed!',
	updateFailed: 'Update failed!',
	noPhotosToPreview: 'No photos to preview!',
	descPlaceholder: 'Add a description...',
	col_thumbnail: 'Thumbnail',
	col_fileInfo: 'File Information',
	col_fileDesc: 'File Description',
	col_actions: 'Actions'
};

fu_message['ko'] = {
	totalSize: '총 크기는 최대 크기를 초과 할 수 없습니다!',
	maxSize: '최대 크기',
	upload: '업로드',
	preview: '이미지 미리보기',
	update: '최신 정보',
	confirmDelete: '이 파일을 삭제 하시겠습니까?',
	selectFilesToUpload: '업로드 할 파일을 선택하십시오!',
	uploadFailed: '업로드하지 못했습니다!',
	deleteFailed: '삭제하지 못했습니다!',
	updateFailed: '업데이트가 실패!',
	noPhotosToPreview: '미리 볼 사진이 없습니다!',
	descPlaceholder: '설명 추가 ...',
	col_thumbnail: '섬네일',
	col_fileInfo: '파일 정보',
	col_fileDesc: '파일 설명',
	col_actions: '조치'
};

fu_message['vi'] = {
	totalSize: 'Tổng dung lượng các tệp không được vượt quá kích thước tối đa!',
	maxSize: 'tối đa',
	upload: 'Tải lên',
	preview: 'Xem trước ảnh',
	update: 'Cập nhật',
	confirmDelete: 'Bạn có muốn xóa tệp tin này không?',
	selectFilesToUpload: 'Vui lòng chọn một tệp tin trước khi tải lên!',
	uploadFailed: 'Tải lên thất bại!',
	deleteFailed: 'Xóa thất bại!',
	updateFailed: 'Cập nhật thất bại!',
	noPhotosToPreview: 'Không có ảnh nào để xem trước!',
	descPlaceholder: 'Thêm một mô tả...',
	col_thumbnail: 'Hình thu nhỏ',
	col_fileInfo: 'Thông tin tệp',
	col_fileDesc: 'Mô tả tệp',
	col_actions: 'Hành động'
};

function FileInfo() {
	this.key = '';
	this.sequence = '';
	this.type = '';
	this.path = '';
	this.name = '';
	this.newName = '';
	this.size = null;
	this.insertId = '';
	this.insertDate = null;
	this.updateId = '';
	this.updateDate = null;
	this.description = '';
	
	this.reset = function() {
		this.key = '';
		this.sequence = '';
		this.type = '';
		this.path = '';
		this.name = '';
		this.newName = '';
		this.size = null;
		this.insertId = '';
		this.insertDate = null;
		this.updateId = '';
		this.updateDate = null;
		this.description = '';
	};
	
	this.fromObject = function(o) {
		if (!o || typeof(o) != 'object') {
			this.reset();
			return false;
		}
		
		if (o.hasOwnProperty('FLE_KEY')) this.key = o['FLE_KEY'];
		if (o.hasOwnProperty('ATCH_FLE_SEQ')) this.sequence = o['ATCH_FLE_SEQ'];
		if (o.hasOwnProperty('FLE_TP')) this.type = o['FLE_TP'];
		if (o.hasOwnProperty('FLE_PATH')) this.path = o['FLE_PATH'];
		if (o.hasOwnProperty('FLE_NM')) this.name = o['FLE_NM'];
		if (o.hasOwnProperty('NEW_FLE_NM')) this.newName = o['NEW_FLE_NM'];
		if (o.hasOwnProperty('FLE_SZ')) this.size = o['FLE_SZ'];
		if (o.hasOwnProperty('INS_ID')) this.insertId = o['INS_ID'];
		if (o.hasOwnProperty('INS_DT')) this.insertDate = o['INS_DT'];
		if (o.hasOwnProperty('UPT_ID')) this.updateId = o['UPT_ID'];
		if (o.hasOwnProperty('UPT_DT')) this.updateDate = o['UPT_DT'];
		if (o.hasOwnProperty('DESCRPT')) this.description = o['DESCRPT'];
	};
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    
    return 'aug' + (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()).substring(3);
}

function humanFileSize(size) {
    var s = 0;
    var i = 0;
    if (size < 1024) {
    	s = size / 1024;
    	i = 0;
    } else {
    	s = size / (1024 * 1024);
    	i = 1;
    }
    
    return s.toFixed(2) + ['KB', 'MB'][i];
};

function parseFilePath(path) {
	var splitChar = '\\';
	if (path.indexOf('\\') > -1)
		splitChar = '\\';
	else if (path.indexOf('/') > -1) {
		splitChar = '/';
	}
	
	var arr = path.split(splitChar);
	const fileName = arr[arr.length - 1].split('.')[0];
	const extension = arr[arr.length - 1].split('.')[1];
	const dir = arr[arr.length - 2];
	
	return {dir: dir, fileName: fileName, extension: extension};
}

function pushObjectToArray(arr, key, obj) {
	if (arr && arr.length) {
		var index = -1;
		$.each(arr, function(i, o) {
			if (o[key] == obj[key]) {
				index = i;
				return false;
			}
		});
		
		if (index != -1) arr.splice(index, 1);
	} else if (!arr) {
		arr = [];
	}
	
	arr.push(obj);
}

function FileUploadHandle() {
	this.url = '';
	this.chunkSize = 1024 * 1024;
	this.file = null;
	this.fileIndex = -1;
	this.chunksUploadStatus = [];
	this.chunks = [];
	this.done = function() {};
	
	this.onProgress = function(event) {};
	
	this.processFile = function() {
		if (this.file) {
			var self = this;
			var size = this.file.size;
			var start = 0;
			loop();
			
			function loop() {
				var end = start + self.chunkSize;
				if (size - end < 0) {
					end = size;
				}
				
				var s = self._slice(self.file, start, end);
				self._send(s, start, end, function() {
					if (end < size) {
						start += self.chunkSize;
						loop.call(null);
					}
				});
			}
		}
	};
	
	this.validate = function() {
		if (this.chunks && this.chunksUploadStatus && (this.chunks.length != this.chunksUploadStatus.length)) {
			return false;
		}
		
		for (var i = 0, len = this.chunksUploadStatus.length; i < len; i++) {
			if (!this.chunksUploadStatus[i].success) {
				return false;
			}
		}
		
		return true;
	};
	
	this._chunkIndex = 0;
	
	this._send = function(piece, start, end, onSuccess, onError) {
		var self = this;
		var reader = new FileReader();
		reader.readAsArrayBuffer(piece);
		reader.onloadend = function() {
			var formdata = new FormData();
			formdata.append('start', start);
			formdata.append('end', end);
			formdata.append('fileName', self.file.name);
			formdata.append('file', piece);
			formdata.append('isChunk', true);
			formdata.append('chunkIndex', self._chunkIndex);
			formdata.append('fileIndex', self.fileIndex);
			formdata.append('isLastChunk', (self.file.size == end));
		
			var wordArray = CryptoJS.lib.WordArray.create(reader.result);
			var sha1Hash = CryptoJS.SHA1(wordArray);
			formdata.append('sha1', sha1Hash.toString());
			
			var xhr = new XMLHttpRequest();
			xhr.timeout = 600000;
			xhr.upload.addEventListener("progress", function(event) {
				if (self.onProgress && typeof(self.onProgress) == 'function') {
					self.onProgress.call(null, event);
				}
			}, false);
			xhr.addEventListener("load", function(event) {
				/*if (onSuccess && typeof(onSuccess) == 'function') {
					onSuccess.call(null, event);
				}*/
			}, false);
			xhr.addEventListener("error", function(event) {
				if (onError && typeof(onError) == 'function') {
					onError.call(null, event);
				}
				
				alert('The ' + self.file.name + ' file can not uploaded because error occursed while upload process.');
			}, false);
			xhr.addEventListener("abort", function(event) {
				if (onError && typeof(onError) == 'function') {
					onError.call(null, event);
				}
				
				alert('The ' + self.file.name + ' file can not uploaded because this file is aborted.');
			}, false);
			xhr.addEventListener("timeout", function(event) {
				if (onError && typeof(onError) == 'function') {
					onError.call(null, event);
				}
				
				alert('The ' + self.file.name + ' file can not uploaded because timed out.');
			}, false);
			
			xhr.onreadystatechange = function() {
				if(xhr.readyState === 4 && xhr.status === 200) {
					var data = JSON.parse(xhr.responseText);
					pushObjectToArray(self.chunksUploadStatus, 'chunkIndex', data.responseData);
					if (onSuccess && typeof(onSuccess) == 'function') {
						onSuccess.call(null, event);
					}
					
					if (self.file.size == end && (self.done && typeof(self.done) == 'function')) {
						self.done.call(null);
					}
				}
			};
			
			xhr.open('POST', self.url, true);
			xhr.send(formdata);
		};
	};

	this._slice = function(file, start, end) {
		var slice = file.mozSlice ? file.mozSlice :
		    file.webkitSlice ? file.webkitSlice :
		    file.slice ? file.slice : this._noop;
  		
  		var piece = slice.bind(file)(start, end);
  
  		pushObjectToArray(this.chunks, 'chunkIndex', {
			chunkIndex: this._chunkIndex + 1,
			data: piece
		});
  		this._chunkIndex++;
		return piece;
	};
	
	this._noop = function() {};
}

function _uploadSuccessCallback(uploads, uploadedList, o, wrapId, formId) {
	var fileLength = 0;
	if (fileLength == 0) {
		var file = document.querySelector('#' + wrapId + ' form#' + formId + ' input[name="files"]');
		if (!file || !file.files.length) return false;
		fileLength = file.files.length;
	}
	if (uploads && o) {
		if (uploads.length == fileLength) {
			document.querySelector('#' + wrapId + ' form#' + formId).reset();  // reset form
			if (o.hasOwnProperty('onUploadSuccess')) {
	    		o.onUploadSuccess.call(null, uploadedList);
	    	}
		}
	}
}

function _warningUploadFailed(wrapId, trId, message) {
	var tr = document.querySelector('#' + wrapId + ' tr#' + trId);
	tr.style.background = 'orange';
	tr.title = message;
}

(function( $ ){
	$.fn.makeUpload = function(o) {
		var wrapId = guidGenerator();
		var autoId = guidGenerator();
		var uploadedList = [];
		var uploads = [];
		
		this.setFileList = function(fileList) {
			o.fileList = fileList;
		};
		
		this.redraw = function() {
			this.makeUpload(o);
		};
		
		if (!o.maxSize) o.maxSize = 15;
		var noPreview = (o.hasOwnProperty('preview') && !o.preview);
		
		if (typeof(o) == 'object') {
			
			var $html = $('<div class="wt-fu" id="' + wrapId + '" style="text-align: left !important;"></div>');
			var $fileList = $('<table class="file-list" style="max-width: 100%; min-width: 60%;"></table>');
			$fileList.append('<tr style="display: none">' + (o.showThumbnail ? '<th style="text-align: center;">' + fu_message[WT_LOCALE].col_thumbnail + '</th>' : '') + '<th style="min-width: 220px; text-align: center;">' + fu_message[WT_LOCALE].col_fileInfo + '</th><th style="min-width: 220px; text-align: center;">' + fu_message[WT_LOCALE].col_fileDesc + '</th><th style="text-align: center;">' + fu_message[WT_LOCALE].col_actions + '</th></tr>');
			//$fileList.append('<colgroup><col style="max-width: 40%;"><col style="max-width: 50%;"><col style="max-width: 9%;"></colgroup>');
			drawFileList();
			
			var $inputFile = $('<input type="file" style="border: none !important;" name="files" ' + (o['multiple'] ? 'multiple="' + o['multiple'] + '"' : '') + ' ' + (o['accept'] ? 'accept="' + o['accept'] + '"' : '') + '>');
			$inputFile.css({
				width: 'auto',
				height: 'auto'
			});
			var $file = $('<form style="margin: 10px 0;" action="#" id="' + autoId + '" enctype="multipart/form-data" method="post"></form>');
			
			$html.append($fileList).append($file.append($inputFile).append('<span style="margin-left: 10px">(' + fu_message[WT_LOCALE].maxSize + ': ' + o.maxSize + 'MB)</span>'));
			
			$inputFile.on('change', function() {
				if (this.files.length) {
					var totalSize = 0;
					$.each(this.files, function(index, f) {
						if (f) totalSize += parseInt(f.size);
					});
					
					const max = ((o.maxSize * 1024) * 1024);  // MB
					if (totalSize > max) {
						alert(fu_message[WT_LOCALE].totalSize);
       					this.value = '';
					}
				}
			});
			
			// upload and preview buttons
			var $btnUpload = $('<img width="24" class="btn-action" style="cursor: pointer;" src="' + CTX + '/images/uploading-archive.png" title="' + fu_message[WT_LOCALE].upload + '">');
			var $btnPreview = noPreview ? '' : $('<img width="24" class="btn-action"  style="cursor: pointer; margin-left: 10px;" src="' + CTX + '/images/images-preview.png" title="' + fu_message[WT_LOCALE].preview + '">');
			
			function doUploadFile(file, index) {
                debugger
				const chunkSize = (o.hasOwnProperty('chunkSize') && o.chunkSize > 0) ? (o.chunkSize * 1024 * 1024) : (10 * 1024 * 1024);  // chunk size is 10MB
				if (file.size > chunkSize) {  // upload with chunks
					const totalChunks = Math.ceil(file.size / chunkSize);
					var fuh = new FileUploadHandle();
					fuh.url = CTX + '/util/upload/uploadMultipleFiles.ajax';
					fuh.file = file;
					fuh.fileIndex = index;
					fuh.chunkSize = chunkSize;
					// proceed
					fuh.processFile();
					
					// on progress
					fuh.onProgress = function(event) {
						const currentIndex = fuh._chunkIndex - 1;
						const startPercent = (currentIndex * (100 / totalChunks));
						var percent = (event.loaded / event.total) * 100;
						percent = startPercent + (percent * ((100 / totalChunks) / 100));
						document.querySelector('#' + wrapId + ' #file-' + index + '-progressBar').style.width = Math.round(percent) + '%';
						
						// styling
						var parent = document.querySelector('#' + wrapId + ' #file-' + index + '-progressParent');
						var status = document.querySelector('#' + wrapId + ' #file-' + index + '-status');
						status.innerHTML = Math.round(percent) + '%';
						status.style.left = ((parent.offsetWidth / 2) - (status.offsetWidth / 2)) + 'px';
					};
					
					// when done
					fuh.done = function() {
						if (fuh.validate()) {
							var obj = fuh.chunksUploadStatus.find(function(o) {
								return o.isLastChunk;
							});
							
							if (obj.merged) {
								var finfo = new FileInfo();
								finfo.fromObject(obj.uploaded);
								if (o.hasOwnProperty('fileList')) {
			                		if (o.fileList == null || o.fileList == 'undefined') {
			                			o.fileList = [];
			                		}
			                	} else {
			                		o.fileList = [];
			                	}
			                	o.fileList.push(finfo);
			                	if (!uploadedList) uploadedList = [];
			                	uploadedList.push(finfo);
			                	
			                	replaceOnSuccess(wrapId, 'tr-file-' + index, finfo);
			                	uploads.push(index);
							} else {
								_warningUploadFailed(wrapId, 'tr-file-' + index, 'The file is too large and during upload, some parts is missing! please refresh the browser and try again later.');
								uploads.push(index);
							}
						} else {
							_warningUploadFailed(wrapId, 'tr-file-' + index, 'The file is too large and during upload, some parts is missing! please refresh the browser and try again later.');
							uploads.push(index);
						}
					};
				} else {  // upload single file
					var formdata = new FormData();
					formdata.append('isChunk', false);
					formdata.append('fileIndex', index);
					formdata.append('file', file);
					var xhr = new XMLHttpRequest();
					xhr.upload.addEventListener("progress", function(event) {
						var percent = (event.loaded / event.total) * 100;
						//document.querySelector('#file-' + index + '-progressBar').value = Math.round(percent);
						//document.querySelector('#file-' + index + '-status').innerHTML = Math.round(percent) + '%';
						document.querySelector('#' + wrapId + ' #file-' + index + '-progressBar').style.width = Math.round(percent) + '%';
						
						// styling
						var parent = document.querySelector('#' + wrapId + ' #file-' + index + '-progressParent');
						var status = document.querySelector('#' + wrapId + ' #file-' + index + '-status');
						status.innerHTML = Math.round(percent) + '%';
						status.style.left = ((parent.offsetWidth / 2) - (status.offsetWidth / 2)) + 'px';
					}, false);
					xhr.addEventListener("load", function(event) {
						//document.querySelector('#' + wrapId + ' #file-' + index + '-progressBar').value = 0;
						//document.querySelector('#' + wrapId + ' #file-' + index + '-status').innerHTML = 'just a moment...';
					}, false);
					xhr.addEventListener("error", function(event) {
						document.querySelector('#' + wrapId + ' #file-' + index + '-status').innerHTML = 'upload failed';
					}, false);
					xhr.addEventListener("abort", function(event) {
						document.querySelector('#' + wrapId + ' #file-' + index + '-status').innerHTML = 'upload aborted';
					}, false);
					xhr.addEventListener("timeout", function(event) {
						document.querySelector('#' + wrapId + ' #file-' + index + '-status').innerHTML = 'request timeout, try again later!';
					}, false);
					
					xhr.onreadystatechange = function() {
						if(xhr.readyState === 4 && xhr.status === 200) {
							var data = JSON.parse(xhr.responseText);
							if (data.status && data.responseData) {
								var finfo = new FileInfo();
								finfo.fromObject(data.responseData);
								if (o.hasOwnProperty('fileList')) {
			                		if (o.fileList == null || o.fileList == 'undefined') {
			                			o.fileList = [];
			                		}
			                	} else {
			                		o.fileList = [];
			                	}
			                	o.fileList.push(finfo);
			                	if (!uploadedList) uploadedList = [];
			                	uploadedList.push(finfo);
			                	
			                	replaceOnSuccess(wrapId, 'tr-file-' + index, finfo);
			                	uploads.push(index);
							} else {
								_warningUploadFailed(wrapId, 'tr-file-' + index, 'During upload the file, some exceptions not expected occurred! please refresh the browser and try again later.');
								uploads.push(index);
							}
						}
					};
					
					xhr.timeout = 600000;
					xhr.open("POST", CTX + '/util/upload/uploadMultipleFiles.ajax');
					xhr.send(formdata);
				}
			}
			
			function drawStatus(formData) {
				if (formData) {
					var files = [];
					var i = 0;
					for (var pair of formData.entries()) {
						files.push({index: i, file: pair[1]});
						i++;
					}
					
					$.each(files, function(idx, f) {
						var $status = '<tr id="tr-file-' + f.index + '">'
										+ '<td colspan="3" style="text-align: left !important;">' 
										//+ '<progress id="file-' + f.index + '-progressBar" value="0" max="100" style="width: 70px;"></progress>&nbsp;'
										//+ '<span id="file-' + f.index + '-status"></span>&nbsp;'
										+ '<div style="float: left;"><div id="file-' + f.index + '-progressParent" style="top: 5px; position:relative; width:100px; background: #EEE; border: 1px solid #CCC; display: inline-block; float: left;"><div id="file-' + f.index + '-progressBar" style="background-color:#00ff00; width:0%; height:10px; transition:width 150ms;"></div><div id="file-' + f.index + '-status" style="position:absolute; display:inline-block; font-weight: bold; top: -3px; font-size: 10px;">0%</div></div></div>&nbsp;'
										+ '<span style="display: inline-flex; max-width: 450px;"><div style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">' + f.file.name + ' (' + humanFileSize(f.file.size) + ')</div></span>'
										+ '</td></tr>';
						
						$fileList.append($status);
						
						// styling
						var parent = document.querySelector('#' + wrapId + ' #file-' + f.index + '-progressParent');
						var status = document.querySelector('#' + wrapId + ' #file-' + f.index + '-status');
						status.style.left = ((parent.offsetWidth / 2) - (status.offsetWidth / 2)) + 'px';
					});
				} else {
					$fileList.html('<tr id="tr-file-' + f.index + '"><td colspan="3"><span style="color: red;">No data found.</span></td></tr>');
				}
			}
			
			$btnUpload.on('click', function() {
				uploadedList = [];
				uploads = [];
				uploads.push = function() {
					Array.prototype.push.apply(this, arguments);
					_uploadSuccessCallback(this, uploadedList, o, wrapId, autoId);
				};
				
				$('#' + wrapId + ' table td').filter(function() {return $(this).attr('colspan') > 1;}).remove();
				var inputFile = document.querySelector('form#' + autoId + ' input[name="files"]');
				if (!inputFile.files.length) {
					alert(fu_message[WT_LOCALE].selectFilesToUpload);
					return false;
				}
				
				var data = new FormData(document.querySelector('form#' + autoId));
				drawStatus(data);
				var i = 0;
				// upload all files
				for (var pair of data.entries()) {
					doUploadFile(pair[1], i);
					i++;
				}
				
				return false;
			});
			
			// photos preview
			if (!noPreview) {
				$btnPreview.on('click', function() {
					if (!o.hasOwnProperty('fileList') || (!o.fileList || !o.fileList.length)) {
						alert(fu_message[WT_LOCALE].noPhotosToPreview);
						return false;
					} else {
						var imageList = [];
						$.each(o.fileList, function(index, file) {
							var path = parseFilePath(file.path);
							if (['png', 'jpeg', 'jpg', 'gif'].indexOf(path.extension.toLowerCase()) > -1) {
								imageList.push({ href: CTX + '/util/upload/imageView/' + path.dir + '/' + path.fileName + '.' + path.extension, title: file.description});
							}
						});
					
						if (!imageList.length) {
							alert(fu_message[WT_LOCALE].noPhotosToPreview);
							return false;
						}
						
						$.fancybox.open(imageList);
					}
					
					
					return false;
				});
			}
			
			$html.append($btnUpload).append($btnPreview);
			this.html($html);
		}
		
		function drawFileList() {
			if (o.hasOwnProperty('fileList')) {
				$fileList.empty();
				$fileList.append('<tr  style="display: none">' + (o.showThumbnail ? '<th style="text-align: center;">' + fu_message[WT_LOCALE].col_thumbnail + '</th>' : '') + '<th style="min-width: 220px; text-align: center;">' + fu_message[WT_LOCALE].col_fileInfo + '</th><th style="min-width: 220px; text-align: center;">' + fu_message[WT_LOCALE].col_fileDesc + '</th><th style="text-align: center;">' + fu_message[WT_LOCALE].col_actions + '</th></tr>');
				if (!o.fileList.length) {
					$fileList.append('<tr class="no-file"><td ' + (o.showThumbnail ? 'colspan="4"' : 'conspan="3"') + '>No files.</td></tr>');
					return false;
				}
				
				$.each(o['fileList'], function(index, file) {  // file is instance of FileInfo
					var nameTitle = file.name + '&#13;Size: ' + humanFileSize(file.size);
					var $item = $('<tr></tr>');
					var $fileName = $('<td style="max-width: 250px;"></td>');
					var $f_name = $('<span style="display: inline-flex; max-width: 60%;"><div title="' + nameTitle + '" style="overflow: hidden; text-overflow: ellipsis;">' + file.name + '</div></span>&nbsp;<span>(' + humanFileSize(file.size) + ')</span>');
					var $f_downloadButton = $('<img width="18" class="btn-action" src="' + CTX + '/images/download-button.png" style="margin: 0 10px; cursor: pointer;">');
					$fileName.append($f_name).append($f_downloadButton);
					
					var $description = $('<td></td>');
					var $inputDesc = $('<input placeholder="' + fu_message[WT_LOCALE].descPlaceholder + '" style="padding: 15px 5px; min-width: 200px;" type="text" name="fileDesc" value="' + file.description + '">');
					var $updateButton = $('<input class="btn" style="width: auto; color: #FFF; width: 100px;" type="button" value="' + fu_message[WT_LOCALE].update + '">');
					$description.append($inputDesc).append($updateButton);
					var $delButton = $('<td style="min-width: 38px;"><img class="btn-action" src="' + CTX + '/images/clear-button.png" style="cursor: pointer; width: 16px;"></td>');
					
					$f_downloadButton.on('click', function() {
						var path = parseFilePath(file.path);
						window.open(CTX + '/util/upload/downloadFile?dir=' + path.dir + '&fileName=' + path.fileName + '&extension=' + path.extension, '_blank');
					});
					
					$updateButton.on('click', function() {
						var desc = $(this).siblings('input[name=fileDesc]').val();
						$.ajax({
							type: 'POST',
				            url: CTX + '/util/upload/updateFileDescription.ajax',
				            data: {
				            	DESCRPT: desc,
				            	ATCH_FLE_SEQ: file.sequence
				            },
				            dataType: 'json',
				            cache: false,
				            success: function(data) {
				                alert(data.message);
				                if (data.status) {
				                	$.each(o.fileList, function(i, f) {
					            		if (f.sequence == file.sequence) {
					            			f.description = desc;
					            			return false;
					            		}
					            	});
				                }
				            },
				            error: function(xhr) {
				                console.log(xhr);
				                alert(fu_message[WT_LOCALE].updateFailed);
				            }
						});
					});
					
					// handle onDeleteSuccess callback
					$delButton.on('click', function() {
						var c = confirm(fu_message[WT_LOCALE].confirmDelete);
						if (!c) return false;
						
						$.ajax({
							type: 'POST',
				            url: CTX + '/util/upload/deleteFile.ajax',
				            data: {
				            	PATH: file.path,
				            	ATCH_FLE_SEQ: file.sequence
				            },
				            dataType: 'json',
				            cache: false,
				            success: function(data) {
				            	var index = -1;
				            	$.each(o.fileList, function(i, f) {
				            		if (f.sequence == file.sequence) {
				            			index = i;
				            			return false;
				            		}
				            	});
				            	o.fileList.splice(index, 1);
				            
				            	$delButton.closest('tr').remove();
				            	if (!o.fileList.length) {
									$fileList.append('<tr class="no-file"><td ' + (o.showThumbnail ? 'colspan="4"' : 'conspan="3"') + '>No files.</td></tr>');
								}
				                alert(data.message);
				                if (o.hasOwnProperty('onDeleteSuccess')) {
									o.onDeleteSuccess.call(null, file);
								}
				            },
				            error: function(xhr) {
				                console.log(xhr);
				                alert(fu_message[WT_LOCALE].deleteFailed);
				            }
						});
					});
					
					if (o.showThumbnail == true) {
						var path = parseFilePath(file.path);
						var imageUrl = 'jpeg,jpg,png,gif'.indexOf(path.extension.toLowerCase()) > -1 ? CTX + '/util/upload/imageView/' + path.dir + '/' + path.fileName + '.' + path.extension : '#';
						var thumbWidth = 128;
						if (o.thumb) {
							if (o.thumb['width']) thumbWidth = o.thumb['width'];
						}
						
						var $thumbnail = $('<td style="min-width: 80px;"><img width="' + thumbWidth + '" src="' + imageUrl + '"></td>');
						$item.append($thumbnail);
					}
					
					$item.append($fileName).append($description).append($delButton);
					$fileList.append($item);
				});
			} else {
				$fileList.append('<tr class="no-file"><td ' + (o.showThumbnail ? 'colspan="4"' : 'conspan="3"') + '>No files.</td></tr>');
			}
		}
		
		function replaceOnSuccess(wrapId, trId, file) {
			var noFile = document.querySelector('.no-file');
			if (noFile) {
				noFile.remove();
			}
		
			var tr = document.createElement('tr');
			if (o.showThumbnail == true) {
				var path = parseFilePath(file.path);
				var imageUrl = 'jpeg,jpg,png,gif'.indexOf(path.extension.toLowerCase()) > -1 ? CTX + '/util/upload/imageView/' + path.dir + '/' + path.fileName + '.' + path.extension : '#';
				var thumbWidth = 128;
				if (o.thumb) {
					if (o.thumb['width']) thumbWidth = o.thumb['width'];
				}
				
				var tdThumb = document.createElement('td');
				tdThumb.innerHTML = '<td style="min-width: 80px;"><img width="' + thumbWidth + '" src="' + imageUrl + '"></td>';
				tr.appendChild(tdThumb);
			}
			
			var nameTitle = file.name + '&#13;Size: ' + humanFileSize(file.size);
			// file name
			var fileName = document.createElement('td');
			fileName.style.maxWidth = '250px';
			fileName.innerHTML = '<span style="display: inline-flex; max-width: 60%;"><div title="' + nameTitle + '" style="overflow: hidden; text-overflow: ellipsis;">' + file.name + '</div></span>&nbsp;<span>(' + humanFileSize(file.size) + ')</span>';
			var downloadButton = document.createElement('span');
			downloadButton.innerHTML = '<img width="18" class="btn-action" src="' + CTX + '/images/download-button.png" style="margin: 0 10px; cursor: pointer;"/>';
			downloadButton.addEventListener('click', function() {
				var path = parseFilePath(file.path);
				window.open(CTX + '/util/upload/downloadFile?dir=' + path.dir + '&fileName=' + path.fileName + '&extension=' + path.extension, '_blank');
			});
			fileName.appendChild(downloadButton);
			
			// description
			var description = document.createElement('td');
			description.innerHTML = '<input placeholder="' + fu_message[WT_LOCALE].descPlaceholder + '" style="padding: 15px 5px; min-width: 200px; width: 200px;" type="text" name="fileDesc" value="' + file.description + '"/>';
			var updateButton = document.createElement('input');
			updateButton.type = 'button';
			updateButton.className = 'btn';
			updateButton.style = 'width: auto; color: #FFF; width: 100px;';
			updateButton.value = fu_message[WT_LOCALE].update;
			updateButton.addEventListener('click', function() {
				var desc = this.getSiblings('input[name=fileDesc]')[0].value;
				$.ajax({
					type: 'POST',
					url: CTX + '/util/upload/updateFileDescription.ajax',
					data: {
						DESCRPT: desc,
						ATCH_FLE_SEQ: file.sequence
					},
					dataType: 'json',
					cache: false,
					success: function(data) {
						alert(data.message);
						if (data.status) {
							for (var f of o.fileList) {
								if (f.sequence == file.sequence) {
									f.description = desc;
									break;
								}
							}
						}
					},
					error: function(xhr) {
						console.log(xhr);
						alert(fu_message[WT_LOCALE].updateFailed);
					}
				});
			});
			description.appendChild(updateButton);
			
			// delete button
			var deleteButton = document.createElement('td');
			deleteButton.style.minWidth = '38px';
			var delBtn = document.createElement('img');
			delBtn.src = CTX + '/images/clear-button.png';
			delBtn.style.cursor = 'pointer';
			delBtn.style.width = '16px';
			delBtn.className = 'btn-action';
			delBtn.addEventListener('click', function() {
				var self = this;
				var c = confirm(fu_message[WT_LOCALE].confirmDelete);
				if (!c) return false;
				
				$.ajax({
					type: 'POST',
					url: CTX + '/util/upload/deleteFile.ajax',
					data: {
						PATH: file.path,
						ATCH_FLE_SEQ: file.sequence
					},
					dataType: 'json',
					cache: false,
					success: function(data) {
						var index = -1;
						for (var i in o.fileList) {
							if (o.fileList[i].sequence == file.sequence) {
								index = i;
								break;
							}
							
						}
						o.fileList.splice(index, 1);
					
						self.closest('tr').remove();
						if (!o.fileList.length) {
							$fileList.append('<tr class="no-file"><td ' + (o.showThumbnail ? 'colspan="4"' : 'conspan="3"') + '>No files.</td></tr>');
						}
						alert(data.message);
						if (o.hasOwnProperty('onDeleteSuccess')) {
							o.onDeleteSuccess.call(null, file);
						}
					},
					error: function(xhr) {
						console.log(xhr);
						alert(fu_message[WT_LOCALE].deleteFailed);
					}
				});
			});
			deleteButton.appendChild(delBtn);
			
			tr.appendChild(fileName);
			tr.appendChild(description);
			tr.appendChild(deleteButton);
			
			// replace
			document.querySelector('#' + wrapId + ' tr#' + trId).replaceWith(tr);
		}
		
		return this;
	}; 
})( jQuery );