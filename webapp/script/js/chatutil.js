function searchlist(obj, opt, order_by) {
	if (opt == 0) {
		// Search friend
		console.log('search_CONTACT_LIST searchlist');
		wschat.send.CONTACT_LIST(obj.value, order_by);  
	} else {
		// Search room  
		console.log('search_ROOM_LIST searchlist'); 
		wschat.send.ROOM_LIST(obj.value, order_by);
	}
}

var Loader = function (options) {
    this.options = options;
    
    this.options.completeCallback = this.options.completeCallback || function () {};
    this.options.progressCallback = this.options.progressCallback || function () {};
    this.options.borderColor = options.borderColor || '#0000000';
    
    this.holder = document.querySelector(options.holder);
    this.canvas = document.querySelector(options.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.loaded = 0;
    
    var parent = this.canvas.parentNode;
    this.canvas.width = parent.offsetWidth;
    this.canvas.height = parent.offsetHeight;
    
    this.canvasR = parent.offsetWidth >> 1;
    
    this.draw();
  }
  
  Loader.prototype.init = function() {
    this.loaded = 0;
    this.load();
  }

  Loader.prototype.load = function() {
    var me = this;
    
    me.draw();
    me.options.progressCallback(me.holder,me.loaded);
    
    if (me.loaded < 100) {
      requestAnimFrame(function () {
        me.load(); 
      }); 
    } else {
      //me.loadingComplete();
    }    
    //me.loaded += .5;
  }
  
  Loader.prototype.loadingComplete = function() {
	var me = this;
    this.options.completeCallback(me.holder, me.userUid, me.roomUid, this.fileparam);
  }  
  
  Loader.prototype.draw = function () {
    var fillRadian = 360 / 100 * this.loaded * Math.PI / 180,
        midX = this.canvas.width * .5,
        midY = this.canvas.height * .5;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  
    
    // draw arc
    this.ctx.beginPath();
    this.ctx.arc(midX, midY, this.canvasR, 0, fillRadian, false);
    this.ctx.lineWidth =  this.options.arcWidth, 
    this.ctx.strokeStyle = this.options.arcColor,
    this.ctx.stroke();
    
    // draw border
    if (this.options.borderWidth !== 'undefined') {
      this.ctx.beginPath();
      this.ctx.arc(midX, midY, this.canvasR, 0, Math.PI * 2, false);
      this.ctx.arc(midX, midY, this.canvasR - this.options.borderWidth, 0, Math.PI * 2, true);
      this.ctx.fillStyle = this.options.borderColor,
      this.ctx.fill();
    }
  }

var loadingProgress = function (holder,percent) {
	var percentHolder = holder.querySelector('.percent');
    percentHolder.innerHTML = Math.round(percent) + '%';
}
  
var loadingDone = function (holder, userUid, roomUid, params) {
	holder.classList.add('loading-done');
	//$(holder).hide();//isImg 
	//wschat.send.CHAT_SEND( "FILE", getCurUserId(), params, $(holder).attr("id"));
	//wschat.send.CHAT_SEND( "FILE", userUid, roomUid, params, $(holder).attr("id"));
}

var loader_dict = {};
//* **url**: the url of the server
//* **file**: the file to upload
//* **progress**: an handler to follow the progress of the upload
//* **success**: an handler called when the upload is finished
//* **open**: an handler called when the connection to the server is established
//* **close**: an handler called when the connection to the server is closed
//* **blockSize**: the size of packets to send. Default is 1024
//* **type**: the type of transfer : binary or base64. Default is 'base64'
function uploadFile(files) {
	/*var transfer = new WebSocketFileTransfer({
		url: 'ws://ip:port/path/to/upload_web_socket_server',
		file: files[i],
		//type: WebSocketFileTransfer.binarySupported() ? 'binary' : 'base64',
		progress: function(event) {
			// Update the progress bar
		},
		success: function(event) {
			// Do something
		}
	});
	transfer.start();
	//transfer.start(myUsername, myPassword);
*/
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
	  // Great success! All the File APIs are supported.
	} else {
	  alert('The File APIs are not fully supported in this browser.');
	}
	
	var host =  window.location.host;
    var socketServerUrl = 'ws://' + host + wschatCtx + '/file-ws';
    console.log(socketServerUrl);
    
	if( !WebSocketFileTransfer.supported() ) {
		alert('WebSocketFileTransfer is not fully supported by your browser');
		return;		
	}
		
	// Upload the files when user submit the form
		
	// Checks user has selected one or more files
	if( files.length == 0 ) {
		alert('Please select a file!');
		return false;
	}
	
	var thisUid = getUserUid(); 
	var roomUid = $('#chat-messages').data('ROOM_UID');
	for(var i=0; i < files.length; i++) {
		
		/*var $transfer = $('<div />').addClass('transfer');
		var $progress = $('<div />').addClass('progress')
		var $progressBar = $('<div />').addClass('progressBar');
		$progressBar.append($progress);
		
		$transfer.append($progressBar);
		
		$('#progresses').append($transfer);*/
		
		
		var id = getTimestamp();
		var txtMsg = files[i].name;
		
		var fileid = thisUid + '_' + id + "_" + i.toString();
		var tempKey = wschat.genTempkey();
		var chmsg = $('#chat-messages');
		var divMsg = $('<div class="message"><div class="loader-holder right" id="loader-holder_' + id + '">'
				+ '<div class="percent"></div>'
				+ '<canvas id="loader_'+ id +'"></canvas>'
				+ '<div class="fileinfo">' + files[i].name + ' '  + '</div>'
				+ '</div></div>');
		
		divMsg.append('<br/>');
		chmsg.append(divMsg); 
							  
		var loader = new Loader({
			holder: '#loader-holder_' + id,
		    canvas: '#loader_' + id,
		    userUid: thisUid,
		    roomUid: roomUid,
		    arcWidth: 40,
		    arcColor: 'rgb(0, 165, 255)',
		    borderWidth: 10,
		    borderColor: 'rgb(53, 138, 185)',
		    progressCallback: loadingProgress,
		    completeCallback: loadingDone
		});
		
		var objDiv = chmsg[0];
		objDiv.scrollTop = objDiv.scrollHeight;
		//holder.classList.remove('loading-done');
		loader.init();
		loader_dict[fileid] = loader;
		
		// Creates the transfer
		//https://github.com/vincentdieltiens/WebSocketFileTransfer 참조
		var transfer = new WebSocketFileTransfer({
			url: socketServerUrl,
			file: files[i],
			blockSize: 1024,
			userUid: thisUid,
			roomUid: roomUid,
			parameters:{filetype:files[i].type},
			fileid: fileid,			
			type: WebSocketFileTransfer.binarySupported() ? 'binary' : 'base64',
			//loader: loader,
			progress: function(event) {
				//this.$progress.css('width', event.percentage+'%');
				//this.loader.loaded = event.percentage;
				var thisloader = loader_dict[this.fileid];
				if(thisloader != null) {
					thisloader.loaded = event.percentage;
					thisloader.load();	
				}
			},
			success: function(event, param) {
				//this.$progress.addClass('finished');	
				var thisloader = loader_dict[this.fileid];
				var loaderid="";
				//debugger;
				if(thisloader != null) {
					thisloader.fileparam = param;
					thisloader.loaded = 100;
					//thisloader.load();
					thisloader.loadingComplete();
					loaderid = $(thisloader.holder).attr("id");
				} 
				
				if(param.type.includes("video"))
				{
					$.ajax({
						url:CTX+'/common/file/makeThumbnail.ajax',
						data:param,
						success:function(data){
							console.log("thumbnail maked");
							if(data.error == "00")
								console.log("th00");
							else if(data.error == "01")
								console.log("th01");
							else if(data.error == "02")
								console.log("th02");
							else if(data.error == "03")
								console.log("th03");
							else if(data.error == "04")
								console.log("th04");
							wschat.send.CHAT_SEND( "FILE", thisUid, roomUid, param, loaderid);
						},
						fail:function(data){
							console.log("fail to make thumbnail")
						}
					})
				}
				else
				{
					wschat.send.CHAT_SEND( "FILE", this.userUid, this.roomUid, param, loaderid);
				}
			}
		});
	
		// Starts the transfer
		transfer.start();
		
	}
	files = [];
	return false;
	
}

function reSizeMsg(){
	
	var r = $('#profile2').width();
	var p = $('#sendmessage').parent().width();
	$('#sendmessage').width(p-r); 
} 

function resizeComponent() {
	var chatviewHeight = $('#chatview').height();
	var remainH = chatviewHeight - $('#profile').outerHeight() - $('#sendmessage').outerHeight();
	$('#chat-messages').height(remainH);
	$('.setting-modal-nav').height(chatviewHeight - $(".setting-modal-header").outerHeight());
	
	 
	
	var roomBoxH = chatviewHeight - 160;
	$('#roombox').height(roomBoxH);
	//$('#roombox').height(roomBoxH);
	$('#rooms').height(roomBoxH - $(".searchroom").outerHeight()); 
	$('#profile2').height(roomBoxH);
	
	$('#chatbox').height(roomBoxH);
	$('#friends').height(roomBoxH - $(".searchroom").outerHeight());
	
	if ($('#sendmessage').width() > 100) {
		$('#txtMsg').width($('#sendmessage').width() - 100);	
	}
}