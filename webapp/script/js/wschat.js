var chatSock;
var AESKey;
var room_uid;
var room_type;
var goToRoom;
var friendInfoLeft;
var g_currentPage;
var g_currentRoom;
var connected = false;
var client_action = false;

var absentCnt = 0;
var img_ext = [ 'JPEG', 'BMP', 'JPG', 'GIF', 'PNG', 'TIFF', 'TIF' ];
var video_ext = [ 'OGG', 'WMV', 'MP4' ];

var sess = {
	ROOM_UID : '',
	USER_UID : ''
}

/*
 * <img src="${ctxPath}/${SESS_USER.USER_IMG }" />
 */

var messageObj = {
	ROOM_UID : "",
	NEW_MEMBER_ID : [ '20170922100000000002' ],
	USER_UID_THIS : ''
}

var setMessageObj = function() {
	messageObj.ROOM_UID = $('#roomUid').val();
	messageObj.USER_UID_THIS = $('#userUid').val();
}

var open_room = 'no';
// var room_type = {
// IN_CHATROOM : "IN_CHATROOM",
// IN_CONTACT : "IN_CONTACT"
// }
var message_type = {
	LOGIN_IN : {
		"CATEGORY" : "LOGIN",
		"TYPE" : "IN",
		"PAYLOAD" : {
			"USERNAME" : "",
			"PASSWORD" : "",
			"SESSION_ID" : ""
		}
	},
	SECURITY_GET_KEY : {
		"CATEGORY" : "SECURITY",
		"TYPE" : "GET_KEY",
		"PAYLOAD" : {
			"RSA_MODULUS" : "",
			"RSA_EXPONENT" : ""
		}
	},
	CONTACT_LIST : {
		"USER_UID" : "",
		"CATEGORY" : "CONTACT",
		"TYPE" : "LIST",
		"PAYLOAD" : {
			"SEARCH_TYPE" : "",
			"SEARCH_STR" : ""
		}
	},
	CONTACT_LISTFORM : {
		"USER_UID" : "",
		"CATEGORY" : "CONTACT",
		"TYPE" : "LISTFORM",
		"PAYLOAD" : {
			"SEARCH_TYPE" : "",
			"SEARCH_STR" : ""
		}
	},
	CONTACT_LISTFORM2 : {
		"USER_UID" : "",
		"CATEGORY" : "CONTACT",
		"TYPE" : "LISTFORM2",
		"PAYLOAD" : {
			"SEARCH_TYPE" : "",
			"SEARCH_STR" : "",
			"ROOM_UID" : ""
		}
	},
	ROOM_CREATE_2 : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"ROOM_UID" : "",
			"ROOM_NM" : "",
			"ROOM_TYPE" : ""
		},
		"CATEGORY" : "ROOM",
		"TYPE" : "CREATE"
	},
	ROOM_CREATE_CONTACT : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"USER_UID" : "",
			"ROOM_NM" : ""
		},
		"CATEGORY" : "ROOM",
		"TYPE" : "CREATE_CONTACT"
	},
	ROOM_CREATE_CHATROOM : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"ROOM_NM" : ""
		},
		"CATEGORY" : "ROOM",
		"TYPE" : "CREATE_CHATROOM"
	},

	ROOM_CREATE : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"ROOM_UID" : "",
			"ROOM_NM" : "",
			"USER_UID_LIST_INVITE" : [], // ['ersf123435e1', '123ssfs']
			"ROOM_TYPE" : "IN_CHATROOM"
		},
		"CATEGORY" : "ROOM",
		"TYPE" : "CREATE"
	},

	ROOM_MODIFY : { // sua ten chat room
		"USER_UID" : "",
		"PAYLOAD" : {
			"ROOM_NM" : "",
			"ROOM_UID" : ""
		},
		"CATEGORY" : "ROOM",
		"TYPE" : "MODIFY"
	},
	ROOM_CHECK : {// Check trang thai da doc, tin nhan, da xem trang thai tao
		// room
		"USER_UID" : "",
		"PAYLOAD" : {
			"USER_CHECK" : "",
			"USER_OPEN_CHECK" : "",
			"ROOM_UID" : ""
		},
		"CATEGORY" : "ROOM",
		"TYPE" : "CHECK"
	},

	SECURITY_SEND_KEY : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"KEY" : ""
		},
		"CATEGORY" : "SECURITY",
		"TYPE" : "SEND_KEY"
	},
	// SORT_ORDER : RECENT ASC, NAME ASC , NAME DESC
	ROOM_LIST : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"ORDER_TYPE" : "TIME",
			"SEARCH_STR" : ""
		},
		"CATEGORY" : "ROOM",
		"TYPE" : "LIST"
	},
	ROOM_OUT : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"ROOM_UID" : "",
			"USER_UID" : ""
		},
		"CATEGORY" : "ROOM",
		"TYPE" : "OUT"
	},
	ROOM_VIEW : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"ROOM_UID" : ""
		},
		"CATEGORY" : "ROOM",
		"TYPE" : "VIEW"
	},
	ROOM_INVITE : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"USER_UID" : "",
			"ROOM_UID" : ""
		},
		"CATEGORY" : "ROOM",
		"TYPE" : "INVITE"
	},
	CHAT_CONFIRM : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"LIST_READ" : "",
			"ROOM_UID" : ""
		},
		"CATEGORY" : "CHAT",
		"TYPE" : "CONFIRM"
	},
	CHAT_SEND : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"TEMP_MSG_UID" : "",
			"MSG_UID" : "",
			"ROOM_UID" : "",
			"CONT_TYPE" : "", // 파일 , 이미지, 채팅,시스템
			"MSG" : "",
			"MSG_UID_OLD" : ""
		},
		"CATEGORY" : "CHAT",
		"TYPE" : "SEND"
	},
	CHAT_RECEIVE : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"TEMP_MSG_UID" : "",
			"MSG_UID" : "",
			"ROOM_UID" : "",
			"CONT_TYPE" : "", // 파일 , 이미지, 채팅,시스템
			"MSG" : "",
			"COUNT" : "",
			"RECV_TIME" : ""
		},
		"CATEGORY" : "CHAT",
		"TYPE" : "RECEIVE"
	},
	CHAT_LIST : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"ROOM_UID" : "",
			"START_INDEX" : "",
			"GROUP_KEY" : ""
		},
		"CATEGORY" : "CHAT",
		"TYPE" : "LIST"
	},

	FILE_VIEW : {
		"USER_UID" : "",
		"PAYLOAD" : {},
		"CATEGORY" : "FILE",
		"TYPE" : "VIEW"
	},
	FILE_UPLOAD : {
		"USER_UID" : "",
		"PAYLOAD" : {},
		"CATEGORY" : "FILE",
		"TYPE" : "UPLOAD"
	},
	FILE_DOWNLOAD : {
		"USER_UID" : "",
		"PAYLOAD" : {},
		"CATEGORY" : "FILE",
		"TYPE" : "DOWNLOAD"
	},
	MEMBER_LIST : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"ROOM_UID" : "" //
		},
		"CATEGORY" : "MEMBER",
		"TYPE" : "LIST"
	},
	MEMBER_VIEW : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"USER_UID" : ""
		},
		"CATEGORY" : "MEMBER",
		"TYPE" : "VIEW"
	},
	MEMBER_MODIFY : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"USER_NM_TMP" : ""
		},
		"CATEGORY" : "MEMBER",
		"TYPE" : "MODIFY"
	},
	MEMBER_REFRESH : {
		"USER_UID" : "",
		"PAYLOAD" : {},
		"CATEGORY" : "MEMBER",
		"TYPE" : "REFRESH"
	},
	SETTING_VIEW : {
		"USER_UID" : "",
		"PAYLOAD" : {
			SKIN_UID : "",
			CONF_FONT_SIZE : ""
		},
		"CATEGORY" : "SETTING",
		"TYPE" : "VIEW"
	},
	SETTING_MODIFY : {
		"USER_UID" : "",
		"PAYLOAD" : {
			SKIN_UID : "",
			CONF_FONT_SIZE : "",
			READ_CHECK : "",
			NOTIFY_SOUND_YN : ""
		},
		"CATEGORY" : "SETTING",
		"TYPE" : "MODIFY"
	},
	FRIEND_INVITE : {
		"USER_UID" : "",
		"PAYLOAD" : {
			MESSAGE : "",
			USER_UID_2 : ""
		},
		"CATEGORY" : "FRIEND",
		"TYPE" : "INVITE"
	},
	FRIEND_ACCEPT : {
		"USER_UID" : "",
		"PAYLOAD" : {
			ROOM_UID : ""
		},
		"CATEGORY" : "FRIEND",
		"TYPE" : "ACCEPT"
	},
	FRIEND_CANCEL : {
		"USER_UID" : "",
		"PAYLOAD" : {
			ROOM_UID : ""
		},
		"CATEGORY" : "FRIEND",
		"TYPE" : "CANCEL"
	},
	FRIEND_ADD_FAVORITE : {
		"USER_UID" : "",
		"PAYLOAD" : {
			USER_UID_2 : ""
		},
		"CATEGORY" : "FRIEND",
		"TYPE" : "ADD_FAVORITE"
	},
	FRIEND_DELETE_FAVORITE : {
		"USER_UID" : "",
		"PAYLOAD" : {
			USER_UID_2 : ""
		},
		"CATEGORY" : "FRIEND",
		"TYPE" : "DELETE_FAVORITE"
	},
	FRIEND_DELETE : {
		"USER_UID" : "",
		"PAYLOAD" : {
			USER_UID_2 : "",
			ROOM_UID : ""
		},
		"CATEGORY" : "FRIEND",
		"TYPE" : "DELETE"
	},
	FRIEND_LIST : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"USER_UID" : ""
		},
		"CATEGORY" : "FRIEND",
		"TYPE" : "LIST"
	},
	MEMBER_ONLINE : {
		"USER_UID" : "",
		"PAYLOAD" : {
			"ONLINE" : ""
		},
		"CATEGORY" : "FRIEND",
		"TYPE" : "LIST"
	},
	CONNECTION_PING : {
        "USER_UID" : "",
        "PAYLOAD" : {
//            "ONLINE" : ""
        },
        "CATEGORY" : "CONNECTION",
        "TYPE" : "PING"
    }

}

var click_db = 0;
var typeSearch = 0;

var command = {
	LOGIN_IN : function(){		
	},
	SECURITY_GET_KEY : function(){		
	},
	ROOM_CREATE : function() {

		var message = message_type.ROOM_CREATE;
		message.USER_UID = $('.chatbody').data('chat').USER_UID;
		messageObj = $('.form_Layout.MESSAGE').data('message');
		message.PAYLOAD = $.extend({}, message.PAYLOAD, messageObj);

		chatSock.send(JSON.stringify(message));
	},
	ROOM_VIEW : function(room) {

		var message = message_type.ROOM_VIEW;
		message.USER_UID = getUserUid();
		message.PAYLOAD.ROOM_UID = room.ROOM_UID;
		messageObj = $('.form_Layout.MESSAGE').data('message');
		message.PAYLOAD = $.extend({}, message.PAYLOAD, messageObj);
		// console.log(message);
		chatSock.send(JSON.stringify(message));
	},
	ROOM_LIST : function() {
	},
	ROOM_OUT : function() {
	},
	ROOM_INVITE : function() {
	},
	CHAT_SEND : function() {
	},
	CHAT_RECEIVE : function() {
	},
	CHAT_LIST : function(data) {

		/*
		 * var send_btn = '<div id="sendmessage"><input id="txtMsg"
		 * type="text" value="" placeholder="..."><button id="send"></button></div>';
		 * chmsg.append(send_btn);
		 */
	},
	CHAT_CONFIRM : function() {
	},
	FILE_VIEW : function() {
	},
	FILE_UPLOAD : function() {
	},
	FILE_DOWNLOAD : function() {
	},
	MEMBER_LIST : function() {
	},
	MEMBER_VIEW : function() {
	},
	MEMBER_MODIFY : function() {
	},
	MEMBER_REFRESH : function() {
	},
	SETTING_VIEW : function() {
	},
	SETTING_MODIFY : function() {
	},
	CONNECTION_PING : function(){     
    }
}

function IsJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

var recieveMessage = function(message) {

	if (IsJsonString(message)) {
		// debugger;
		message = JSON.parse(message);
		var PAYLOAD = message.PAYLOAD;
		var CATEGORY = message.CATEGORY;
		var TYPE = message.TYPE;
		var RESULT = message.RESULT;
		var command = CATEGORY + '_' + TYPE;
		if (RESULT != 'OK') {
			console.log('ERROR: ' + message.MSG + ' at: ' + command);
			alert('ERROR in server: ' + message.MSG + ' at: ' + command);
		} else if (command)
			wschat.recieve[command].call(message);

	}
}

var sendMessage = function(message) {

}

var wschat = {
	USERNAME : '',
	CREDENTIAL : '',
	genTempkey : function() {
		var d = new Date();
		var time = d.getTime();
		return time;
	},
	init : function(url) {
		chatSock = new WebSocket(url);
		chatSock.onopen = function() {
			console.log('onOpen.');
			wschat.send.SECURITY_GET_KEY();
			//wschat.send.LOGIN_IN();
			/*createRSAKey();
			wschat.send.ROOM_LIST();
			wschat.send.SETTING_VIEW();*/
		};

		chatSock.onmessage = function(evt) {
			console.log('onMessage.');
			recieveMessage(evt.data);
		};

		chatSock.onclose = function() {
			console.log('onClose.');
		};
		chatSock.onerror = function() {
			console.log('Error while sent socket to server.');
		};
	},
	initOpenAgain : function(url) {
		if (chatSock.readyState != 1) {
			console.log('websocket state: ' + chatSock.readyState);
			chatSock = new WebSocket(url);
		} else {
			console.log('websocket check state: ' + chatSock.readyState);
		}
	},
	createRoomForm : function() {

	},
	send : {
		// send message
		LOGIN_IN : function(param) {
			console.log('send.LOGIN_IN');
			var message = message_type.LOGIN_IN;

			var rsa = new RSAKey();
			rsa.setPublic(param.RSA_MODULUS, param.RSA_EXPONENT);
			connected = true;
			message.PAYLOAD.USERNAME =  rsa.encrypt(wschat.USERNAME);
			message.PAYLOAD.PASSWORD =  rsa.encrypt(wschat.CREDENTIAL);
			
			chatSock.send(JSON.stringify(message));
		},
		SECURITY_GET_KEY : function(param) {
			console.log('send.SECURITY_GET_KEY');
			var message = message_type.SECURITY_GET_KEY;
			
			chatSock.send(JSON.stringify(message));
		},
		CONTACT_LIST : function(param) {
			// wschat.initOpenAgain(jsUrlWs);
			console.log('send.CONTACT_LIST');
			/* $('#group-chat-msg-send-msg').css('display','none'); */
			sess.ROOM_UID = '';
			var message = message_type.CONTACT_LIST;
			message.USER_UID = getUserUid();
			if (param) {
				message.PAYLOAD.SEARCH_STR = param;
			} else {
				message.PAYLOAD.SEARCH_STR = '';
			}
			if (typeSearch == 1) {
				message.PAYLOAD.SEARCH_TYPE = 'global';
			} else {
				message.PAYLOAD.SEARCH_TYPE = '';
			}

			chatSock.send(JSON.stringify(message));
		},
		ROOM_CREATE : function(userList, roomType) {
			// wschat.initOpenAgain(jsUrlWs);
			console.log('send. ROOM_CREATE');
			// Create room: room has 2 members
			var message = message_type.ROOM_CREATE;
			message.USER_UID = getUserUid();
			message.PAYLOAD.ROOM_NM = 'Untitled conversation';
			message.PAYLOAD.USER_UID_LIST_INVITE = userList;
			message.PAYLOAD.ROOM_TYPE = roomType;
			/*
			 * if (roomType == 'IN_CHATROOM') { message.PAYLOAD.ROOM_NM =
			 * $('#frm_room_nm').val(); }
			 */
			chatSock.send(JSON.stringify(message));

			// message.PAYLOAD.ROOM_NM = '';
			// message.PAYLOAD.USER_UID_LIST_INVITE = [];
		},
		ROOM_CREATE_CONTACT : function(obj) {
			// wschat.initOpenAgain(jsUrlWs);
			console.log('send. ROOM_CREATE CONTACT ');
			// Create room: room has 2 members
			var message = message_type.ROOM_CREATE_CONTACT;
			message.USER_UID = getUserUid();
			message.PAYLOAD.USER_UID = obj.USER_UID;
			message.PAYLOAD.ROOM_NM = obj.ROOM_NM;
			// 
			chatSock.send(JSON.stringify(message));

		},
		ROOM_CREATE_CHATROOM : function() {
			console.log('send. ROOM_CREATE ROOM');
			// Create room: room has 2 members
			var message = message_type.ROOM_CREATE_CHATROOM;
			message.USER_UID = getUserUid();
			message.PAYLOAD.ROOM_NM = 'Untitled conversation';

			chatSock.send(JSON.stringify(message));

		},
		SECURITY_SEND_KEY : function(key) {

			console.log('send.SECURITY_SEND_KEY');
			var msg = message_type.SECURITY_SEND_KEY;
			msg.USER_UID = getUserUid();
			msg.PAYLOAD.KEY = key;

			chatSock.send(JSON.stringify(msg));
		},
		ROOM_VIEW : function(obj) {
			console.log('send.ROOM_VIEW');
			g_currentRoom = obj;
			command.ROOM_VIEW(obj);

		},
		ROOM_LIST : function(param, orderType) {
			// wschat.initOpenAgain(jsUrlWs);
			// 동작업음
			//

			console.log('send.ROOM_LIST');
			sess.ROOM_UID = '';
			// $('#group-chat-msg-send-msg').css('display','none');
			var message = message_type.ROOM_LIST;
			message.USER_UID = getUserUid();
			if (param) {
				message.PAYLOAD.SEARCH_STR = param;
				message.PAYLOAD.ORDER_TYPE = orderType
						|| message.PAYLOAD.ORDER_TYPE;
			} else {
				message.PAYLOAD.SEARCH_STR = '';
				message.PAYLOAD.ORDER_TYPE = orderType
						|| message.PAYLOAD.ORDER_TYPE;
			}	  
			chatSock.send(JSON.stringify(message));
		},
		ROOM_OUT : function() {

		},
		CONNECTION_PING: function() {
		    console.log('send.CONNECTION_PING');
		    var message = message_type.CONNECTION_PING;
		    chatSock.send(JSON.stringify(message));
        },
		ROOM_MODIFY : function(obj) {
			// wschat.initOpenAgain(jsUrlWs);

			var msg = message_type.ROOM_MODIFY;
			msg.USER_UID = getUserUid();

			msg.PAYLOAD.USER_UID = getUserUid();
			msg.PAYLOAD.ROOM_UID = obj.ROOM_UID;

			chatSock.send(JSON.stringify(msg));

		},
		ROOM_INVITE : function(obj) {
			console.log('send ROOM_ INVITE');
			var msg = message_type.ROOM_INVITE;
			msg.USER_UID = getUserUid();
			msg.PAYLOAD.USER_UID = obj.USER_UID;
			msg.PAYLOAD.ROOM_UID = obj.ROOM_UID;
			chatSock.send(JSON.stringify(msg));

		},
		ROOM_CHECK : function(inviteMlist) {
			console.log('send ROOM _CHECK');
			var msg = message_type.ROOM_CHECK;
			msg.USER_UID = getUserUid();
			msg.PAYLOAD.USER_CHECK = "Y";
			msg.PAYLOAD.ROOM_UID = getRoomUid();
			msg.PAYLOAD.ROOM_OPEN_CHECK = "Y";
			chatSock.send(JSON.stringify(msg));
		},
		CHAT_SEND : function(type, pCurUserUid, roomUid, params, loaderId) {
			console.log('send.CHAT_SEND: ' + getUserUid());
			if (type == "TEXT") {
				$('#group-chat-msg-send-msg').css('display', '');
				var txtMsg = message;
				if (txtMsg == '' || txtMsg == ' ' || txtMsg == '   ')
					return;
				// txtMsg = txtMsg.replace(/</g, '< ').replace(/>/g, ' >');
				// PO
				var tempKey = wschat.genTempkey();
				var chmsg = $('#chat-messages');
				var divMsg = $('<div class="message">');
				var img_logon = $("#img_avatar").attr('src');
				var tempImg = '<img src="' + img_logon + '" />';
			
				var msgString = $('<label>');
				msgString.text(txtMsg);
				txtMsg = $(msgString).html();

//				divMsg.append(tempImg);
				divMsg.attr('id', getUserUid());
				divMsg.attr('is_read','Y');
				var thisUid = getUserUid();
				divMsg.addClass('right');
				
				var divtext = $("<div>",{
					class:'text'
				}).appendTo(divMsg);
				
				var spanreadcount = $("<span>",{
					class:'read_count',
					style:'float:initial;margin:5px 5px 0px 5px; color:#d0c0c0;vertical-align:bottom;'
				}).appendTo(divtext);
				
				var divbubble = $("<div>",{
					class:'bubble',
					id:thisUid,
					text:' '+txtMsg
				}).appendTo(divtext);
				
				var br = $("<br>").appendTo(divtext);
				
				var span = $("<span>", {
					class:tempKey,
					text:'sending...'
				}).appendTo(divtext);
				
				divMsg.append(tempImg);
				
//				var string = '<div id=' + thisUid + ' class="bubble">' + ''
//						+ ' ' + txtMsg
//						+ '<div class="corner"></div><span class="' + tempKey
//						+ '">sending...</span></div><span class="read_count" style="float:initial;margin:5px 5px 0px 5px; color:#d0c0c0;"></span>';

//				divMsg.append(string);

				chmsg.append(divMsg);
			    $(divMsg).find('img').error(function() {
                    $(this).attr('src', CTX + '/images/wsc/avatar-default1.png')
                });
				$(".bubble").each(function() {
					$(this).html(emojione.shortnameToImage($(this).html()));
				});

				var room_uid = $('#chat-messages').data('ROOM_UID');
				$('#rooms').find('[room_uid=' + room_uid + ']').find('a')
						.empty().append(txtMsg);
				$('#rooms').find('[room_uid=' + room_uid + ']').each(
						function() {
							$(this).html(
									emojione.shortnameToImage($(this).html()));
						});
				// console.log('ASEKEY: ' + AESKey);
				// encrypt MSG
				var encryptedMSG = CryptoJS.AES.encrypt(txtMsg, AESKey)
						.toString();
				// console.log(encryptedMSG);

				// var decryptedMSG = CryptoJS.AES.decrypt(encryptedMSG, AESKey)
				// .toString(CryptoJS.enc.Utf8);

				// Sent to server to save db
				var msg = message_type.CHAT_SEND;
				msg.USER_UID = getUserUid();
				msg.PAYLOAD.TEMP_MSG_UID = tempKey;
				msg.PAYLOAD.SEND_USER_UID = getUserUid();
				msg.PAYLOAD.MSG = encryptedMSG;
				msg.PAYLOAD.ROOM_UID = $('#chat-messages').data('ROOM_UID');
				msg.PAYLOAD.CONT_TYPE = 'TEXT';
				chatSock.send(JSON.stringify(msg));
				$('#txtMsg').val('');
				$('.emojionearea-editor').text('');
			} else if (type == "FILE") {
				sendFileMsg(pCurUserUid, roomUid, params, loaderId);
			}

			var div = $('#rooms').find('[room_uid=' + room_uid + ']');
			var li = div.parent().clone(true);
			var ul = div.parent().parent();
			div.parent().remove();
			ul.prepend(li);

			var objDiv = $('#chat-messages')[0];
			objDiv.scrollTop = objDiv.scrollHeight;
			client_action = true;	
		},
		CHAT_LIST : function(obj) {

			console.log('sne.CHAT_LIST: roomUid ' + obj);
			var msg = message_type.CHAT_LIST;
			msg.USER_UID = getUserUid();
			// msg.PAYLOAD.ROOM_UID = obj.ROOM_UID;
			// msg.PAYLOAD.START_INDEX = obj.START_INDEX;
			msg.PAYLOAD = obj;

			g_currentRoom = obj.ROOM_UID;
			$('#chat-messages').data('ROOM_UID', obj.ROOM_UID);
			$('#chat-messages').empty();
			$('#chat-messages').data('THIS_USER_UID', getUserUid());

			chatSock.send(JSON.stringify(msg));

		},
		CHAT_CONFIRM : function(obj) {
			console.log(' send CHAT CONFIRM ' + obj.USER_UID);
			var msg = message_type.CHAT_CONFIRM;
			msg.USER_UID = obj.USER_UID;

			// msg.PAYLOAD.MSG_UID = obj.MSG_UID;
			// msg.PAYLOAD.ROOM_UID = obj.ROOM_UID;
			// msg.PAYLOAD.LIST_READ = obj.LIST_READ;
			msg.PAYLOAD = obj;

			chatSock.send(JSON.stringify(msg));
		},
		FILE_VIEW : function(message) {

		},
		FILE_UPLOAD : function(message) {

		},
		FILE_DOWNLOAD : function(message) {

		},
		MEMBER_LIST : function() {
			// wschat.initOpenAgain(jsUrlWs);
			console.log('send.MEMBER_LIST');

			var msg = message_type.MEMBER_LIST;
			msg.USER_UID = getUserUid();
			msg.PAYLOAD.ROOM_UID = get_room_uid();
			chatSock.send(JSON.stringify(msg));

		},
		MEMBER_VIEW : function(USER_UID_MEMBER) {
			// wschat.initOpenAgain(jsUrlWs);
			// sendMemberView(this, message);
			var msg = message_type.MEMBER_VIEW;
			msg.USER_UID = getUserUid();
			msg.PAYLOAD.USER_UID = USER_UID_MEMBER;
			chatSock.send(JSON.stringify(msg));
		},
		MEMBER_MODIFY : function(message) {

		},
		MEMBER_REFRESH : function(message) {

		},
		SETTING_VIEW : function(message) {
			console.log('send SETTING_ VIEW');
			console.log(message_type.SETTING_VIEW);

			var user_uid = getUserUid();
			var msg = message_type.SETTING_VIEW;
			msg.USER_UID = user_uid;
			chatSock.send(JSON.stringify(msg));

		},
		SETTING_MODIFY : function(message) {
			// wschat.initOpenAgain(jsUrlWs);

			var user_uid = getUserUid();
			var msg = message_type.SETTING_MODIFY;
			msg.USER_UID = user_uid;
			msg.PAYLOAD.SKIN_UID = $('input[name="rd_theme"]:checked').val();
			msg.PAYLOAD.CONF_FONT_SIZE = $("#conf-font-size-id").val();
			if ($('#ck_chat_nof').is(":checked"))
				msg.PAYLOAD.READ_CHECK = "Y";
			else
				msg.PAYLOAD.READ_CHECK = "N";
			if ($('#ck_chat_nof_snd').is(":checked")) {
				msg.PAYLOAD.NOTIFY_SOUND_YN = "Y";
				NOTIFY_SOUND = "Y"; // from global variable
			} else {
				NOTIFY_SOUND = "N";
				msg.PAYLOAD.NOTIFY_SOUND_YN = "N";
			}
			chatSock.send(JSON.stringify(msg));
		},
		CONTACT_LISTFORM : function(param) {
			// wschat.initOpenAgain(jsUrlWs);

			console.log('send.CONTACT_LISTFORM');
			sess.ROOM_UID = '';
			var message = message_type.CONTACT_LISTFORM;
			message.USER_UID = getUserUid();
			if (param) {
				message.PAYLOAD.SEARCH_STR = param;
			} else {
				message.PAYLOAD.SEARCH_STR = '';
			}
			chatSock.send(JSON.stringify(message));
		},
		CONTACT_LISTFORM2 : function(param) {
			// wschat.initOpenAgain(jsUrlWs);

			console.log('send.CONTACT_LISTFORM');
			sess.ROOM_UID = '';
			var message = message_type.CONTACT_LISTFORM2;
			message.USER_UID = getUserUid();
			message.PAYLOAD.ROOM_UID = getRoomUid();
			if (param) {
				message.PAYLOAD.SEARCH_STR = param;
			} else {
				message.PAYLOAD.SEARCH_STR = '';
			}
			chatSock.send(JSON.stringify(message));
		},

		/*
		 * FRIEND_INVITE : function(msgAdd) { // save invitation var message =
		 * message_type.FRIEND_INVITE; message.USER_UID = getUserUid(); if
		 * (msgAdd) { message.PAYLOAD.MESSAGE = msgAdd; } else {
		 * message.PAYLOAD.MESSAGE = 'Please add me as friend'; } var
		 * user_send_to = $('#lb_user_uid_person').val(); var displayName =
		 * $('#dlg_view_profile_person').find('.lb_user_id').text();
		 * 
		 * message.PAYLOAD.USER_UID_2 = user_send_to;
		 * $('#dlg_message_add').css("display", "none");
		 * chatSock.send(JSON.stringify(message)); // send invitation to friend
		 * wschat.send.ROOM_CREATE_CONTACT({ USER_UID : user_send_to, ROOM_NM:
		 * displayName });
		 * 
		 * $('#sendmessage').hide(); // $('#group-chat-msg-send-msg').hide(); },
		 */
		FRIEND_INVITE : function(msgAdd) {
			// save invitation
			$('#sendmessage').hide();
			var message = message_type.FRIEND_INVITE;
			message.USER_UID = getUserUid();
			if (msgAdd) {
				message.PAYLOAD.MESSAGE = msgAdd;
			} else {
				message.PAYLOAD.MESSAGE = 'Please add me as friend';
			}
			var user_send_to = $('#user_id_2').val();
//			var displayName = $('#dlg_view_profile_person').find('.lb_user_id')
//					.text();

			message.PAYLOAD.USER_UID_2 = user_send_to;
			$('#dlg_message_add').css("display", "none");
			chatSock.send(JSON.stringify(message));

			// send invitation to friend
			/*
			 * wschat.send.ROOM_CREATE_CONTACT({ USER_UID : user_send_to,
			 * ROOM_NM: displayName });
			 */

			// $('#group-chat-msg-send-msg').hide();
		},
		FRIEND_ACCEPT : function(user_uid_2) {
			console.log('send.FRIEND_ACCEPT');

			var message = message_type.FRIEND_ACCEPT;

			message.USER_UID = getUserUid();
			if (user_uid_2) {
				message.PAYLOAD.USER_UID_2 = user_uid_2
			}

			chatSock.send(JSON.stringify(message));

		},
		FRIEND_CANCEL : function(user_uid_2) {
			console.log('send.FRIEND_CANCEL');
			// debugger;
			var message = message_type.FRIEND_CANCEL;
			if (user_uid_2) {
				message.PAYLOAD.USER_UID_2 = user_uid_2
			}
			message.USER_UID = getUserUid();
			chatSock.send(JSON.stringify(message));

		},
		FRIEND_DELETE_FAVORITE : function(param) {
			console.log('send.FRIEND_DELETE_FAVORITE');

			var message = message_type.FRIEND_DELETE_FAVORITE;

			message.USER_UID = getUserUid();
			if (param) {
				message.PAYLOAD.USER_UID_2 = param;
				chatSock.send(JSON.stringify(message));

			}

		},
		FRIEND_ADD_FAVORITE : function(param) {
			console.log('send.FRIEND_ADD_FAVORITE');

			var message = message_type.FRIEND_ADD_FAVORITE;

			message.USER_UID = getUserUid();

			if (param) {
				message.PAYLOAD.USER_UID_2 = param;
				chatSock.send(JSON.stringify(message));
			}
		},
		FRIEND_DELETE : function(param) {

			console.log('send.FRIEND_DELETE');
			var message = message_type.FRIEND_DELETE;
			message.USER_UID = getUserUid();

			if (param) {
				message.PAYLOAD.USER_UID_2 = param;
				chatSock.send(JSON.stringify(message));
			}
		}

	},
	recieve : {
		AUTH_EXPIRE : function(message) {
			console.log('AUTH_EXPIRE');
			window.location.href = CTX + '/common/auth/expire';
		},
		LOGIN_IN : function(message) {
			console.log('recieve.LOGIN_IN');
			createRSAKey();
//			wschat.send.ROOM_LIST();
//			wschat.send.SETTING_VIEW();
		    openWSchatDialog();
		},
		SECURITY_GET_KEY : function(message) {
			console.log('recieve.SECURITY_GET_KEY');
			console.log('OK');
			wschat.send.LOGIN_IN(this.PAYLOAD);
		},
		CONTACT_LIST : function(message) {
			console.log('recieve.CONTACT_LIST');
			var list = $('#friendslist');

			var items = $('#friends').clone();
			list.find('#friends').remove();
			items.empty();
			items.data('data_contacts', this.DATALIST);
			var ul = $('<ul/>');
			if (typeSearch != 1) {

				var divFavorite = $('<div class="group_favorite" />');
				divFavorite
						.append('<div class="title_bar">Favorite list</div>');
				var divNormal = $('<div class="group_friend" />');
				divNormal.append('<div class="title_bar">Friend list</div>');

				$
						.each(
								this.DATALIST,
								function(i, obj) {
									obj.ROOM_TYPE = "IN_CONTACT";
									var li = $('<li/>');
									var div = $('<div class="friend" />');

									div.attr('contact_room_uid', obj.ROOM_UID);
									$('.main_roomInfo').attr(
											'contact_room_uid', obj.ROOM_UID);
									div.data("obj", JSON.stringify(obj));
									// Room click event
									div
											.click(function() {
												if(event.which == 2 || event.which == 3 ){
												    return;
												}
												if ($('#friends div.select-room')) {
													if ($(
															'#friends div.select-room')
															.attr(
																	"contact_room_uid") == $(
															this).attr(
															"contact_room_uid")) {
														// same room
														return;
													}
												}
												var obj = JSON.parse($(this).data('obj'));
												$("#dlg_create_room").hide();

												$(".setting-modal-wrap").hide();
												$('#loading_animation').show();
												$('#settingView').hide();
												$('#group-chat-msg-send-msg')
														.css('display', '');

												$('.profile-floatingImg').attr(
														'is_chat_room', 'N');
												var tmp_user = '';
												var displayName = obj.USER_ID;
												if (obj.USER_NM_KOR) {
													displayName = obj.USER_NM_KOR;
												} else if (obj.USER_NM_ENG) {
													displayName = obj.USER_NM_ENG;
												}

												var roomUidPar = $(this).attr(
														'contact_room_uid');
												if (roomUidPar
														&& roomUidPar.length > 0) {
													wschat.send.ROOM_VIEW({
														ROOM_UID : roomUidPar
													});
													// fill out data to room in
													// the right
													obj.ROOM_NM = displayName;
													room_in_right(obj);
													// diable_out_invt_btn();

												}
												else
												{
													var user_obj = {
															USER_UID :obj.USER_UID
															};
													wschat.send.ROOM_CREATE_CONTACT(user_obj);
													wschat.send.CONTACT_LIST();
													open_room = 'yes';
													
												}

												$('.profile-floatingImg').attr(
														'src',
														jsCtxPath + '/'
																+ obj.USER_IMG);

												tmp_user = displayName;
												$('.main_roomInfo').empty()
														.html(tmp_user);
												$('#acc-info-username').html(
														obj.USER_ID || 'x');
												$('#acc-info-email').html(
														obj.USER_EMAIL || 'x');

												$('#acc-info-phone-number')
														.html(
																obj.USER_PHONE
																		|| 'x');
												$('.main_roomInfo').attr(
														'is_in_contact', 'y');
												$('.main_roomCountMember')
														.empty();
												$('div.friend').removeClass(
														'select-room');
												$(this).addClass('select-room');
												$(this).find(
														'span[friend-notify]')
														.remove();
												if ($('span[friend-notify]').length == 0) {
													if ($('i.fa-address-book')
															.attr(
																	'notify-user-check') == 'y') {
														$('i.fa-address-book')
																.css('color',
																		'');
														$('i.fa-address-book')
																.attr(
																		'notify-user-check',
																		'');
													} else {

													}
												}

											});
									var imgSrc = jsCtxPath + '/' + obj.USER_IMG;

									div.append('<img user_uid="' + obj.USER_UID
											+ '" user_id="' + obj.USER_ID
											+ '" src="' + imgSrc + '" >');
									
									var displayName = obj.USER_ID;
									if (obj.USER_NM_KOR) {
										displayName = obj.USER_NM_KOR;
									} else if (obj.USER_NM_ENG) {
										displayName = obj.USER_NM_ENG;
									}
									div.append('<p><strong title="'
											+ obj.USER_ID + '" style="">'
											+ displayName + '</strong> </p>');
									if (obj.IS_ONLINE == "Y") {
										div
												.append('<div class="light_status light_status_on"/>');

									} else {
										div
												.append('<div class="light_status light_status_off"/>');

									}
									div.attr('id', obj.USER_UID);
									div.attr('contact_user_uid', obj.USER_UID);

									div.attr('user_room_uid', obj.USER_UID
											+ '_' + obj.ROOM_UID);

									items.data('' + obj.USER_UID, obj);
									li.append(div);
									if (obj.FAV_YN == 'Y' || obj.FAV_YN == 'y') {
									    li.find('div.friend').addClass('favorite');
										divFavorite.append(li.clone(true));
									}else{
									    li.find('div.friend').addClass('normal');
									}
									divNormal.append(li);
								});
				
				if(divFavorite.find('li').length != 0){
	                ul.append(divFavorite);
				}
				ul.append(divNormal);
				// add link search global friend

				if ($('#searchfriend').val().length > 0) {
					var div = $('<div class="friend" id="searchAllPeople" style="text-align:center;"><p style="text-decoration: underline;"><strong style>Search all people </strong></p> </div>  ');
					var li = $('<li/>');
					div.click(function() {
						typeSearch = 1;
						wschat.send.CONTACT_LIST($('#searchfriend').val());

					});
					li.append(div);
					li.appendTo(ul);
				}
//				menuRight();

			} else {

				$.each(this.DATALIST, function(i, obj) {

					var li = $('<li/>');
					var div = $('<div class="friend" />');

					div.attr('contact_room_uid', obj.ROOM_UID);
					$('.main_roomInfo').attr('contact_room_uid', obj.ROOM_UID);

					var imgSrc = jsCtxPath + '/' + obj.USER_IMG;
					var displayName = obj.USER_ID;
					if (obj.USER_NM_KOR) {
						displayName = obj.USER_NM_KOR;
					} else if (obj.USER_NM_ENG) {
						displayName = obj.USER_NM_ENG;
					}

					div.append('<img user_uid="' + obj.USER_UID + '" user_id="'
							+ obj.USER_ID + '" src="' + imgSrc + '" >');
					div.append('<p><strong title="' + obj.USER_ID
							+ '" style="">' + displayName + '</strong> </p>');
					
				
                   
					
					if (obj.IS_FRIEND == 0 || obj.IS_FRIEND == 2) {
//						div.click(function() {
//
//							// div.append('<div class="bt_add_friend" />');
//							friendInfoLeft = true;
//
//							wschat.send.MEMBER_VIEW(obj.USER_UID);
//
//						});
					    
					    div.addClass('stranger');
					    
					   

					} else {
						div
								.click(function() {
									$('#settingView').hide();
									$('#group-chat-msg-send-msg').css(
											'display', '');

									$('.profile-floatingImg').attr(
											'is_chat_room', 'N');

									var roomUidPar = $(this).attr(
											'contact_room_uid');
									if (roomUidPar && roomUidPar.length > 0) {
										wschat.send.ROOM_VIEW({
											ROOM_UID : roomUidPar
										});
									}

									$('.profile-floatingImg').attr('src',
											jsCtxPath + '/' + obj.USER_IMG);

									var tmp_user = '';

									tmp_user = obj.USER_NM_ENG;
									$('.main_roomInfo').empty().html(tmp_user);
									$('#acc-info-username').html(
											obj.USER_ID || 'x');
									$('#acc-info-email').html(
											obj.USER_EMAIL || 'x');

									$('#acc-info-phone-number').html(
											obj.USER_PHONE || 'x');
									$('.main_roomInfo').attr('is_in_contact',
											'y');

									$('.main_roomCountMember').empty();
									$('div.friend').removeClass('select-room');
									$(this).addClass('select-room');
									$(this).find('span[friend-notify]')
											.remove();
									if ($('span[friend-notify]').length == 0) {
										if ($('i.fa-address-book').attr(
												'notify-user-check') == 'y') {
											$('i.fa-address-book').css('color',
													'');
											$('i.fa-address-book').attr(
													'notify-user-check', '');
										} else {

										}
									}

								});
						  console.log('friend');
						  div.append('<img style="border-radius: 0px; width: 15px; height: 15px; margin-top: 30px;" src="'+CTX+'/images/wsc/friend.png" >');
					}
					div.attr('id', obj.USER_UID);
					div.attr('contact_user_uid', obj.USER_UID);

					div
							.attr('user_room_uid', obj.USER_UID + '_'
									+ obj.ROOM_UID);

					items.data('' + obj.USER_UID, obj);
					li.append(div);
					li.appendTo(ul);

				});
				$.contextMenu('destroy');
			}
			items.append(ul);
			list.append(items);
			
			setContextMenuContact();
			 
			$('#rooms').find('img').each(function() {
				$(this).error(function() {
					$(this).attr('src', CTX + '/images/wsc/grp.png')
				});
			});

			$('#bt_add_friend').click(function() {

				$('#dlg_message_add').css("display", "inline");
				var user_id_2 = $(this).parents().attr('contact_user_uid')
				$('#user_id_2').val(user_id_2);
				// 
				$('#title_dialog_add').empty();
				$('#title_dialog_add').append('Say something to ' + user_id_2);

			});

			if (goToRoom) {
				$(goToRoom).addClass('select-room');
				$('#dlg_view_profile_friend').hide();
			}

			$('#friends').find('img').each(function() {
				$(this).error(function() {
					$(this).attr('src', CTX + '/images/wsc/avatar-default1.png')
				});
			});
		},
		FRIEND_INVITE : function(message) {
			console.log('recieve.FRIEND_INVITE');
			if (this.USER_UID == getUserUid()) {
				$('#topmenu span.rooms').click();
			}
		//	console.log('recieve.FRIEND_INVITE');

		},
		CONTACT_LISTFORM : function(message) {
			console.log('recieve.CONTACT_LISTFORM');
			showForm(this);
		},
		CONNECTION_PING: function(message) {

        },
		CONTACT_LISTFORM2 : function(message) {
			console.log('recieve.CONTACT_LISTFORM 2');
			showFormAdd(this);
		},

		/*
		 * ROOM_CREATE : function(message) { console.log('recieve.ROOM_CREATE'); //
		 * save the key of room g_currentPage = '0'; AESKey =
		 * rsa.decrypt(this.PAYLOAD.KEY_ROOM); var obj = { ROOM_UID :
		 * this.PAYLOAD.ROOM_UID, KEY_ROOM : this.PAYLOAD.KEY_ROOM, START_INDEX:
		 * g_currentPage }; wschat.send.CHAT_LIST(obj); },
		 */
		ROOM_CREATE : function(message) {
			console.log('recieve.ROOM_CREATE');
//	        visibleChatList();
			wschat.send.ROOM_LIST();
		},
		ROOM_CREATE_CONTACT : function(message) {
			console.log('recieve.ROOM_CREATE CONTACT');

			// save the key of room
			AESKey = rsa.decrypt(this.PAYLOAD.KEY_ROOM);
			room_uid = this.PAYLOAD.ROOM_UID;
			var obj = {
				ROOM_UID : room_uid,
				KEY_ROOM : AESKey
			};
			var $div = $('div[contact_user_uid="' + this.PAYLOAD.USER_UID
					+ '"]');
			if ($div) {
				$div.attr('contact_room_uid', room_uid);
			}
			
			if(open_room == 'yes')
			{
				open_room = 'no';
				var room_obj = {
						ROOM_UID:room_uid
				};
				wschat.send.ROOM_VIEW(room_obj);
			}
			
			var user_rec = this.PAYLOAD.USER_UID;
			wschat.send.ROOM_INVITE({
				ROOM_UID : room_uid,
				USER_UID : this.USER_UID
			});
			wschat.send.ROOM_INVITE({
				ROOM_UID : room_uid,
				USER_UID : user_rec
			});

			// send MSG
			var tempKey = wschat.genTempkey();

			// console.log('ASEKEY: ' + AESKey);
			// encrypt MSG
			var encryptedMSG = CryptoJS.AES
					.encrypt($('#msg_add').val(), AESKey).toString();
			// console.log(encryptedMSG);

			// var decryptedMSG = CryptoJS.AES.decrypt(encryptedMSG, AESKey)
			// .toString(CryptoJS.enc.Utf8);

			// Sent to server to save db
			var msg = message_type.CHAT_SEND;
			msg.USER_UID = getUserUid();
			msg.PAYLOAD.TEMP_MSG_UID = tempKey;
			msg.PAYLOAD.SEND_USER_UID = this.PAYLOAD.USER_UID;
			msg.PAYLOAD.MSG = encryptedMSG;
			msg.PAYLOAD.ROOM_UID = room_uid;
			msg.PAYLOAD.CONT_TYPE = 'TEXT';
			chatSock.send(JSON.stringify(msg));

			$('#msg_add').val('');
			$('#' + user_rec).find('.bt_add_friend').remove();
			// $('#' + user_rec).append('<div class="bt_wait" />');

			// ///////////////////////// send mes + type

		},
		/*
		 * ROOM_CREATE_CONTACT : function(message) {
		 * console.log('recieve.ROOM_CREATE CONTACT'); // save the key of room
		 * 
		 * AESKey = rsa.decrypt(this.PAYLOAD.KEY_ROOM); room_uid =
		 * this.PAYLOAD.ROOM_UID; var obj = { ROOM_UID : room_uid, KEY_ROOM :
		 * AESKey }; var $div = $('div[contact_user_uid="' +
		 * this.PAYLOAD.USER_UID + '"]'); if ($div) {
		 * $div.attr('contact_room_uid', room_uid); } var user_rec =
		 * this.PAYLOAD.USER_UID; wschat.send.ROOM_INVITE({ ROOM_UID : room_uid,
		 * USER_UID : this.USER_UID }); wschat.send.ROOM_INVITE({ ROOM_UID :
		 * room_uid, USER_UID : user_rec }); // // send MSG var tempKey =
		 * wschat.genTempkey(); // // console.log('ASEKEY: ' + AESKey); //
		 * encrypt MSG var encryptedMSG =
		 * CryptoJS.AES.encrypt($('#msg_add').val(), AESKey).toString(); //
		 * console.log(encryptedMSG); // var decryptedMSG =
		 * CryptoJS.AES.decrypt(encryptedMSG, AESKey) //
		 * .toString(CryptoJS.enc.Utf8); // Sent to server to save db var msg =
		 * message_type.CHAT_SEND; msg.USER_UID = getUserUid();
		 * msg.PAYLOAD.TEMP_MSG_UID = tempKey; msg.PAYLOAD.SEND_USER_UID =
		 * this.PAYLOAD.USER_UID; msg.PAYLOAD.MSG = encryptedMSG;
		 * msg.PAYLOAD.ROOM_UID = room_uid; msg.PAYLOAD.CONT_TYPE = 'TEXT';
		 * chatSock.send(JSON.stringify(msg));
		 * 
		 * $('#msg_add').val(''); $('#' +
		 * user_rec).find('.bt_add_friend').remove(); // $('#' +
		 * user_rec).append('<div class="bt_wait" />'); //
		 * ///////////////////////// send mes + type },
		 */
		ROOM_CREATE_CHATROOM : function(message) {
			console.log('recieve.ROOM_CREATE_ CHATROOM');
			// save the key of room

			var roomUid = this.PAYLOAD.ROOM_UID;

			var rul = $('#invt-right').find('li');
			var uid_list = [];
			$.each(rul, function(i, obj) {
				if ($(obj).attr('user_uid') != getUserUid())
					uid_list.push($(obj).attr('user_uid'));
			});

			if (uid_list.length > 0) {
				wschat.send.ROOM_INVITE({
					USER_UID : this.USER_UID,
					ROOM_UID : roomUid
				});

				for (var i = 0; i < uid_list.length; i++) {
					wschat.send.ROOM_INVITE({
						USER_UID : uid_list[i],
						ROOM_UID : roomUid
					});
				}
			}

			/*
			 * AESKey = rsa.decrypt(this.PAYLOAD.KEY_ROOM); g_currentPage = '0';
			 * var obj = { ROOM_UID : this.PAYLOAD.ROOM_UID, KEY_ROOM :
			 * this.PAYLOAD.KEY_ROOM, ROOM_NM : this.PAYLOAD.ROOM_NM,
			 * START_INDEX: g_currentPage }; wschat.send.CHAT_LIST(obj);
			 * 
			 * wschat.send.ROOM_LIST();
			 * 
			 * show_room_right();
			 * 
			 * room_in_right(obj);
			 */
			wschat.send.ROOM_LIST();
		},
		ROOM_VIEW : function(message) {// errornhe
			console.log('recieve.ROOM_VIEW');

			AESKey = rsa.decrypt(this.PAYLOAD.KEY_ROOM);
			g_currentPage = '0';

			room_uid = this.PAYLOAD.ROOM_UID;
			document.title = titleDef;
			var obj = {
				ROOM_UID : this.PAYLOAD.ROOM_UID,
				START_INDEX : g_currentPage
			};
			wschat.send.CHAT_LIST(obj);
		},
		ROOM_MODIFY : function(message) {
			console.log('recieve.ROOM_MODIFY');
			changeRoomName(this.PAYLOAD.ROOM_UID, this.PAYLOAD.ROOM_NM,
					sess.ROOM_UID);
		},
		ROOM_LIST : function(message) {
			console.log('recieve.ROOM_LIST');
	       //  console.log('add data rooms'+ this.DATALIST.length);
			var list = $('#roomslist');
		//	console.log(list);
			if($('#rooms').length > 0){
		         list.find('#rooms').remove();
		         console.log('co #rooms, re-append');
			}
			var items = $('<div id="rooms" />');
			var ul = $('<ul/>');
			items.append(ul);
         //   console.log('add ul');

			list.append(items);
         //   console.log('#room add to list '+ list);

		//	console.log('render li');
			$.each(this.DATALIST, function(i, obj) {
				var li = createRoomListItem(obj);
				li.appendTo(ul);
			});
			setContextMenuRoom();
			var sum = 0;
			items.find('span.fa-stack.has-badge').each(function(index, obj){
			    var str = $(obj).attr('data-count');
			    
			    if(!isNaN(str)){
			        sum += parseInt(str);
			    }
			});
			if(sum > 0){
			    $('#a2m-chatbox .notification').empty().append(sum);
	            $('#a2m-chatbox .notification').show();
			}else{
	             $('#a2m-chatbox .notification').hide();
			}
		
			
		//	console.log('ul: '+ $('#roomslist ul').length + ', li: '+ $('#roomslist li').length );
		//	if($('#dialog_wschat ul').length <= 0){
		//	    console.log('no data');
		//	}
			// Select first child
//			$("#rooms ul li").first().find("div.room").trigger('click');
			$('#rooms').find('img').each(function() {
				$(this).error(function() {
					$(this).attr('src', CTX + '/images/wsc/grp.png')
				});
			});
		},
		ROOM_OUT : function(message) {
			console.log(this);
			console.log('reve  ROOM OUT ');
			// hide_room_right();
		},
		ROOM_INVITE : function(message, user_rec) {
			console.log('reve  ROOM_INVITE');
			$('#msg_add').val('');
			$('#' + user_rec).find('.bt_add_friend').remove();
		},
		ROOM_CHECK : function(message) {
			console.log('reve  ROOM _CHECK');
			console.log('recieve.ROOM _CHECK ' + this.USER_UID + ' '
					+ this.USER_REC_UID);
		},
		CHAT_RECEIVE : function(message) {
			console.log('recieve.CHAT_RECEIVE ' + this.USER_UID);
			// ///////////anhpv/
			var divTmp = '';
			var receiveAESKey;
			try {
				if (this.PAYLOAD.KEY_ROOM) {
					receiveAESKey = rsa.decrypt(this.PAYLOAD.KEY_ROOM);
					divTmp = this.PAYLOAD.MSG;
					divTmp = CryptoJS.AES.decrypt(divTmp, receiveAESKey)
							.toString(CryptoJS.enc.Utf8);
				}
			} catch (e) {
				divTmp = 'Not valid key room.';
			}

			var msgString = $('<label>');
			divTmp = divTmp.replace(/</g, '< ').replace(/>/g, ' >');

			$('#group-chat-msg-send-msg').css('display', '');
			var tempKey = this.PAYLOAD.TEMP_MSG_UID;
			var str1 = toStr(new Date(this.PAYLOAD.SEND_DATE));
            var displayName =  this.PAYLOAD.USER_ID;

            if (this.PAYLOAD.USER_NM_KOR) {
                displayName = this.PAYLOAD.USER_NM_KOR;
            } else if (this.PAYLOAD.USER_NM_ENG) {
                displayName = this.PAYLOAD.USER_NM_ENG;
            }

            var str1 = displayName + ", " + str1;

			// Check if message is from room that is current room
			if (getUserUid() == this.USER_UID) {
			    //message is mine
				if (sess.ROOM_UID != this.PAYLOAD.ROOM_UID) {
					if (this.PAYLOAD.MSG_TYPE_CODE == 'CREATE_ROOM') {
						$('#topmenu span.rooms').click();
					}
					// not in room
				} else {
					if (this.RESULT == 'OK') {
						var $divPa;
						if (this.PAYLOAD.CONT_TYPE == 'TEXT') {
						
							if($('span.' + tempKey + '').parent()
                                    .parent().length == 0 ){
							    tempKey = wschat.genTempkey();
							    var chmsg = $('#chat-messages');
				                var divMsg = $('<div class="message">');
				                var img_logon = $("#img_avatar").attr('src');
				                var tempImg = '<img src="' + img_logon + '" />';
				            
				                var msgString = $('<label>');
				                msgString.text(divTmp);
				                divTmp = $(msgString).html();

//				              divMsg.append(tempImg);
				                divMsg.attr('id', getUserUid());
				                divMsg.attr('is_read','Y');
				                var thisUid = getUserUid();
				                divMsg.addClass('right');
				                
				                var divtext = $("<div>",{
				                    class:'text'
				                }).appendTo(divMsg);
				                
				                var spanreadcount = $("<span>",{
				                    class:'read_count',
				                    style:'float:initial;margin:5px 5px 0px 5px; color:#d0c0c0;vertical-align:bottom;'
				                }).appendTo(divtext);
				                
				                var divbubble = $("<div>",{
				                    class:'bubble',
				                    id:thisUid,
				                    text:' '+divTmp
				                }).appendTo(divtext);
				                
				                var br = $("<br>").appendTo(divtext);
				                
				                var span = $("<span>", {
				                    class:tempKey,
				                    text:'sending...'
				                }).appendTo(divtext);
				                
				                divMsg.append(tempImg);

				                chmsg.append(divMsg);
				                $(divMsg).find('img').error(function() {
				                    $(this).attr('src', CTX + '/images/wsc/avatar-default1.png')
				                });
				                $(".bubble").each(function() {
				                    $(this).html(emojione.shortnameToImage($(this).html()));
				                });
							}
							 $divPa = $('span.' + tempKey + '').parent()
                             .parent();
							$('span.' + tempKey + '').empty().html(str1);
							$divPa.attr("msg_uid", this.PAYLOAD.MSG_UID);
							var titlePa = $divPa.attr('title');
							var user_id = $('#myProfile').attr('user_id');
							var user_name = getUserName();
							if (titlePa) {
								$divPa
										.attr("title", titlePa + ', '
												+ user_name);
							} else {
								$divPa.attr("title", 'Readers: ' + user_name);
							}
							
						} else {
							if ($('#' + tempKey).size() > 0) {
								$divTemp = $('#' + tempKey).parent();
								var $divPa = $divTemp.clone(true);
								$divTemp.remove();
								var listDiv = $('#chat-messages .message');
								if (listDiv.size() > 0) {
									for (var i = listDiv.size() - 1; i > 0; i--) {
										var timeStr = $(listDiv[i]).find(
												'div span').html()
										if (timeStr) {
											var time = timeStr.split(',')[1]
													.replace(/ /g, '');
											var date = time.split('-')[0];
											var datePath = date.split('/');
											var time = time.split('-')[1];
											var timePath = time.split(':');
											var tempDate = new Date(
													datePath[2],
													datePath[0] - 1,
													datePath[1], timePath[0],
													timePath[1], timePath[2]);
											// console.log(tempDate);
											// console.log(new
											// Date(this.PAYLOAD.SEND_DATE));
											if (new Date(this.PAYLOAD.SEND_DATE) >= tempDate) {
												// $divTemp.after($(listDiv[i]));
												$(listDiv[i]).after($divPa);
												break;
											}
										}

									}
								}

							} else {
								$divPa = $('<div class="message right" ></div>');
								var listDiv = $('#chat-messages .message');
								if (listDiv.size() > 0) {
									for (var i = listDiv.size() - 1; i > 0; i--) {
										var timeStr = $(listDiv[i]).find(
												'div span').html()
										if (timeStr) {
											var time = timeStr.split(',')[1]
													.replace(/ /g, '');
											var date = time.split('-')[0];
											var datePath = date.split('/');
											var time = time.split('-')[1];
											var timePath = time.split(':');
											var tempDate = new Date(
													datePath[2],
													datePath[0] - 1,
													datePath[1], timePath[0],
													timePath[1], timePath[2]);
											// console.log(tempDate);
											// console.log(new
											// Date(this.PAYLOAD.SEND_DATE));
											if (new Date(this.PAYLOAD.SEND_DATE) >= tempDate) {
												// $divTemp.after($(listDiv[i]));
												$(listDiv[i]).after($divPa);
												break;
											}
										}

									}
								}
								// $('#chat-messages').append($divPa);
							}
							if (this.PAYLOAD.MSG_TYPE_CODE != 'FILE') {
								$divPa.removeClass("right");
							}
							updateMessageDiv($divPa, this.PAYLOAD);
							var chmsg = $('#chat-messages');
							chmsg.append($divPa);
						}

						var listRead = [];
						listRead.push(this.PAYLOAD.MSG_UID);
						if(client_action){
						    wschat.send.CHAT_CONFIRM({
	                            ROOM_UID : this.PAYLOAD.ROOM_UID,
	                            USER_UID : this.USER_UID,
	                            LIST_READ : listRead
	                        });
						    client_action = false;
						}
					} else {
						if (this.PAYLOAD.CONT_TYPE == 'TEXT') {
							var reSend = $('<i title="RESEND" class="ibtn fa fa-refresh fa-2x" aria-hidden="true"></i>');
							reSend.click(function() {
								var pre_msg = $('span.' + tempKey + '')
										.parent().text();

								var encryptedMSG = CryptoJS.AES.encrypt(
										pre_msg, AESKey).toString();
								// Sent to server to save db
								var msg = message_type.CHAT_SEND;
								msg.USER_UID = getUserUid();
								msg.PAYLOAD.TEMP_MSG_UID = tempKey;
								msg.PAYLOAD.SEND_USER_UID = getUserUid();
								msg.PAYLOAD.MSG = encryptedMSG;
								msg.PAYLOAD.ROOM_UID = $('#chat-messages')
										.data('ROOM_UID');
								msg.PAYLOAD.CONT_TYPE = 'TEXT';
								chatSock.send(JSON.stringify(msg));
							});
							$('span.' + tempKey + '').empty().append(reSend);
						} else {
							// FILE
							$('span.' + tempKey + '').empty().html(
									'<i stype="color:red;">error</i>');
						}
					}
				}
				wschat.send.ROOM_LIST();
			} else { 
			    
			    // Get message from other person
				if (sess.ROOM_UID != this.PAYLOAD.ROOM_UID) { // Khong o room
					// co tin nhan.
					console.log('In other chatroom ' + this.USER_UID + ' '
							+ this.USER_REC_UID);
					play_sound();

					// if someone invite me to group chat
					var add_new = false;
					if (this.PAYLOAD.MSG_TYPE_CODE == 'CREATE_ROOM'
							|| this.PAYLOAD.MSG_TYPE_CODE == 'FRIEND_INVITE'
							|| (this.PAYLOAD.USER2_UID == getUserUid() && this.PAYLOAD.MSG_TYPE_CODE == 'IN_ROOM')) {
						this.PAYLOAD.IMG_PARTNER = "";
						this.PAYLOAD.LAST_MSG = this.PAYLOAD.MSG_CONT;
						var li = createRoomListItem(this.PAYLOAD);
						$('#rooms ul').prepend(li);
						add_new = true;
					} // some one rename chat
					else if (this.PAYLOAD.MSG_TYPE_CODE == 'ROOM_MODIFY') {
						changeRoomName(this.PAYLOAD.ROOM_UID,
								this.PAYLOAD.ROOM_NM, sess.ROOM_UID);
					}

					var div = $('#rooms').find(
							'div[room_uid="' + this.PAYLOAD.ROOM_UID + '"]');
					
					if(this.PAYLOAD.USER_COUNT != null)
					{
						div.find('.room_user_count').text(this.PAYLOAD.USER_COUNT);
					}

					if (this.PAYLOAD.ROOM_TYPE == 'IN_CHATROOM') {
						$("i.fa-comments").css('color', '#202845');
						$("i.fa-comments").attr('notify-user-check', 'y');

						if (!add_new) {
							div.find('a').empty().append(divTmp).css('color',
									'#253675');
						}

						if (div.find('.fa-stack').length > 0) {
							var noti = div.find('.fa-stack').attr('data-count');
							var count = 0;
							if (!isNaN(noti)) {
								count = Number(noti);
							}
							count = count + 1;
							div.find('.fa-stack').attr('data-count', count);
				                
				            if(count == 0){
				                 $('#a2m-chatbox .notification').hide();
				            }else{
				                 $('#a2m-chatbox .notification').empty().append(count);
                                 $('#a2m-chatbox .notification').show();
				            }
				                
						} else {
							div.append('<span room-notify style="float: right; margin: 30px 15px 10px 10px;" class="fa-stack has-badge" data-count="1"></span>');
							   $('#a2m-chatbox .notification').empty().append(1);
                               $('#a2m-chatbox .notification').show();
						}
						// wschat.send.ROOM_LIST();

					} else if (this.PAYLOAD.ROOM_TYPE == 'IN_CONTACT') {
						$("i.fa-address-book").css('color', '#202845');
						$("i.fa-address-book").attr('notify-user-check', 'y');
						div.find('a').empty().append(divTmp).css('color',
								'#253675');

						if (div.find('.fa-stack').length > 0) {
							var count = Number(div.find('.fa-stack').attr(
									'data-count')) + 1;
							div.find('.fa-stack').attr('data-count', count);
						} else {
							div
									.append('<span room-notify style="float: right;margin: 15px;" class="fa-stack has-badge" data-count="1"></span>');
							   $('#a2m-chatbox .notification').empty().append(1);
                               $('#a2m-chatbox .notification').show();
						}
					} else {
						console.log('wschat error');
					}
					div
							.each(function() {
								$(this).html(
										emojione.shortnameToImage($(this)
												.html()));
							});

					var li = div.parent().clone(true);
					var ul = div.parent().parent();
					div.parent().remove();
					ul.prepend(li);

				} else {
					// O room co tin nhan gui ve.
					// Send chat confirm
					console.log('trong phong chat co tin nhan gui ve'
							+ this.USER_UID + ' ' + this.USER_REC_UID);
					var chmsg = $('#chat-messages');
					var divMsg = $('<div class="message">');
					updateMessageDiv(divMsg, this.PAYLOAD);

					chmsg.append(divMsg);

					var objDiv = chmsg[0];
					if (isCurWindow) {
						objDiv.scrollTop = objDiv.scrollHeight;
					} else {
						absentCnt++;
					}
					var obj2 = new Object();
					obj2.ROOM_UID = this.PAYLOAD.ROOM_UID;

					// wschat.initOpenAgain(jsUrlWs);
					wschat.send.ROOM_CHECK(obj2);

					var listRead = [];
					listRead.push(this.PAYLOAD.MSG_UID);

					wschat.send.CHAT_CONFIRM({
						ROOM_UID : this.PAYLOAD.ROOM_UID,
						USER_UID : this.USER_UID,
						LIST_READ : listRead
					});

					var $divPa = $('span.' + tempKey + '').parent().parent();
					$divPa.attr("msg_uid", this.PAYLOAD.MSG_UID);
					var titlePa = $divPa.attr('title') || "";
					$divPa.attr("title", titlePa + ',' + this.USER_UID);

					// update chat room
					if (this.PAYLOAD.MSG_TYPE_CODE == 'OUT_ROOM'
							|| this.PAYLOAD.MSG_TYPE_CODE == 'IN_ROOM') {
						room_in_right(this.PAYLOAD);
					} // some one rename chat
					else if (this.PAYLOAD.MSG_TYPE_CODE == 'ROOM_MODIFY') {
						changeRoomName(this.PAYLOAD.ROOM_UID,
								this.PAYLOAD.ROOM_NM, sess.ROOM_UID);
					}
				}

				var count = 0;
                var list = $(document).find('.fa-stack');
                $.each(list, function(i, obj) {
                    var noti = obj.getAttribute('data-count');
                    if (!isNaN(noti)) {
                        count = count + Number(noti);
                    }
                });
                                
                if(count == 0){
                    $('#a2m-chatbox .notification').hide();
                }else{
                    $('#a2m-chatbox .notification').empty().append(count);
                    $('#a2m-chatbox .notification').show();
                }
                
				if (!isCurWindow) {
					
					if (count != 0) {
						document.title = '(' + count + ') ' + titleDef;
					}
					play_sound();

				} else {
				    if($('#dialog_wschat').css('display')== 'none'){
	                    play_sound();
	                    document.title = '(' + count + ') ' + titleDef;
	                }else{
	                    document.title = titleDef;
	                }
					
				}
				
			
			}

			// Update file list if get file msg
			var type_file = '';
			if (this.PAYLOAD.FILE && this.PAYLOAD.FILE.type)
				type_file = this.PAYLOAD.FILE.type;

			if (type_file && type_file.startsWith('image'))
				type_file = "IMAGE";
			else if (type_file.startsWith('audio'))
				type_file = "AUDIO";
			if (type_file == 'IMAGE') {
				if ('y' == $('#btn_image_his')
						.attr('room_right_btn_tab_active')) {
					// reload
					$('#btn_image_his').click();
					console.log('image history');
				}
			} else if (type_file == 'AUDIO') {
				if ('y' == $('#btn_voice_his')
						.attr('room_right_btn_tab_active')) {
					// reload
					$('#btn_voice_his').click();
					console.log('audio history');
				}
			} else {
				if ('y' == $('#btn_file_his').attr('room_right_btn_tab_active')) {
					// reload
					$('#btn_file_his').click();
					console.log('file history');
				}
			}

		},
		CHAT_LIST : function(message) {
			console.log('recieve.CHAT_LIST record count:'
					+ this.DATALIST.length);
			room_type = this.PAYLOAD.STATUS;
			room_uid = this.PAYLOAD.ROOM_UID;
			$('.main_roomInfo').attr('room_uid', room_uid);
			if (this.PAYLOAD.GROUP_KEY == null) {
				AESKey = rsa.decrypt(this.PAYLOAD.KEY_ROOM);
			} else {
				AESKey = this.PAYLOAD.GROUP_KEY
			}

			var data = this;
			$('#group-chat-msg-send-msg').css('display', '');
			$('#chatview').css('display', 'block');
			$('#roomCreate').css('display', 'none');
			$('#loading_animation').hide();
			var chmsg = $('#chat-messages');
			chmsg.empty();
			sess.ROOM_UID = data.PAYLOAD.ROOM_UID;
			// console.log(data.DATALIST);
			// console.log(AESKey);

			var list_img = [];
			var list_file = [];
			var list_read = [];
			var numberOfMsg = data.DATALIST.length;

			if (numberOfMsg >= 100) {
				chmsg
						.append('<div class="message commandLink" id="see_older_msg">See older messages!</div>');
			}
			$firstUnread = null;
			$.each(data.DATALIST, function(i, obj) {

				var divMsg = $('<div class="message">');
				updateMessageDiv(divMsg, obj);
				// append message
				chmsg.append(divMsg);
				if (obj.RYN == null || obj.RYN == 'N') {
					list_read.push(obj.MSG_UID);
					if ($firstUnread == null) {
						$firstUnread = divMsg;
					}
				}

			}); // End each

			// update read check, neu tin nhan chua doc thi cap nhat
			wschat.send.CHAT_CONFIRM({
				ROOM_UID : sess.ROOM_UID,
				USER_UID : this.USER_UID,
				LIST_READ : list_read
			});

			if (g_currentPage > 0) {
				chmsg
						.append('<div class="message commandLink" id="see_new_msg">See last messages!</div>');
			}

			// have request add or not
			var divMsg = $('<div class="message" style="text-align: center;">');

			if (room_type == 'INVITED') {

				divMsg
						.append('<a style="  position: relative; font-size:16px;">Waiting for accept friend!...</a>');
				divMsg
						.append('<button id="btn_cancel_request_add" class="btn btn_cancel" style="position: relative;border-radius:20px;font-size:16px;width: 200px;">Cancel the request</button>');

				chmsg.append(divMsg);
				$('#btn_cancel_request_add').click(function() {
					// debugger;
					var list = $('#profile2').find('.r-listmember').find('li');
					var user_uid_2 = '';
					$.each(list, function(i, obj) {
						user_uid = $(obj).attr('user_uid');
						if (user_uid != getUserUid())
							user_uid_2 = user_uid;
					});
					wschat.send.FRIEND_CANCEL(user_uid_2);

				});
				$('#sendmessage').hide();

			} else if (room_type == 'BE_INVITED') {
				divMsg
						.append('<a style="    position: relative; font-size:16px;">You have a add friend request!...</a>');
				divMsg
						.append('<button id="btn_accept_friend" class="btn btn_save"  style="position: relative;border-radius:20px;font-size:16px;width: 200px;">Accept the request</button>');
				chmsg.append(divMsg);

				$('#btn_accept_friend').click(function() {
					// debugger;

					var list = $('#profile2').find('.r-listmember').find('li');
					var user_uid_2 = '';
					$.each(list, function(i, obj) {
						user_uid = $(obj).attr('user_uid');
						if (user_uid != getUserUid())
							user_uid_2 = user_uid;
					});
					wschat.send.FRIEND_ACCEPT(user_uid_2);

				});
				$('#sendmessage').hide();
			} else {
				$('#sendmessage').show();

			}

			$('.main_roomInfo ').data('list_img', list_img);
			$('.main_roomInfo ').data('list_file', list_file);

			$(".bubble").each(function() {
				$(this).html(emojione.shortnameToImage($(this).html()));
				// console.log( $(this).html());
			});

			$('#see_older_msg').click(function() {
				g_currentPage = Number(g_currentPage) + 1;
				var obj = {
					ROOM_UID : g_currentRoom,
					START_INDEX : g_currentPage
				};
				console.log(g_currentPage);
				wschat.send.CHAT_LIST(obj);
			});

			$('#see_new_msg').click(function() {
				g_currentPage = Number(g_currentPage) - 1;
				var obj = {
					ROOM_UID : g_currentRoom,
					START_INDEX : g_currentPage
				};
				wschat.send.CHAT_LIST(obj);

			});

			// Scroll to first unread
//			console.log('scroll');
			var objDiv = chmsg[0];
			var topPos;

			if ($firstUnread == null) {
				topPos = objDiv.scrollHeight;
			} else {
				topPos = $firstUnread[0].offsetTop;
				topPos = topPos - chmsg.height() / 2;
			}
			objDiv.scrollTop = topPos;
			
		

//			$('#chat-messages')
//					.find('.message')
//					.find('img:not(.fileImage)')
//					.each(
//							function() {
//								$(this)
//										.error(
//												function() {
//													$(this)
//															.attr('src',
//																	CTX + '/images/wsc/avatar-default1.png')
//												});
//							});
//
//			$('#profile2').find('.memberlist').find('img').each(function() {
//				$(this).error(function() {
//					$(this).attr('src', CTX + '/images/wsc/avatar-default1.png')
//				});
//			});
			// debugger;
//			$('#profile2').find('.memberlist').find('img').each(
//					function() {
//						var url = validImageUrl($(this).attr('src'),
//								CTX + '/images/wsc/avatar-default1.png');
//
//						$(this).attr('src', url);
//					});

			// Update room open check
			var msg = message_type.ROOM_CHECK;
			msg.USER_UID = getUserUid();
			msg.PAYLOAD.USER_CHECK = "Y";
			msg.PAYLOAD.ROOM_OPEN_CHECK = "Y";
			msg.PAYLOAD.ROOM_UID = getRoomUid();
			chatSock.send(JSON.stringify(msg));
		},
		CHAT_CONFIRM : function(obj) {
			console.log('Rec CHAT CONFIRM ' + this.USER_UID + ' '
					+ this.USER_REC_UID);
			// Them nut da xem tai tin nhan cua tat ca cac thanh vien trong nhom
			// chat
			//$('div[msg_uid="20180817162504820109"]')
			if(this.DATALIST.length > 0)
			{
				$.each(this.DATALIST, function(i, obj){
					$('div[msg_uid="'+obj.MSG_UID+'"]').find('.read_count').text(
							(($('#profile2').attr('user_count')-obj.READ_MEMBERS.split(',').length)>0?($('#profile2').attr('user_count')-obj.READ_MEMBERS.split(',').length):'')
							);
					$('div[msg_uid="'+obj.MSG_UID+'"]').attr('title', obj.READ_MEMBERS);
				});
			}
		},
		FRIEND_ACCEPT : function(message) {

		console.log('recieve.FRIEND_ACCEPT');
	          if (getUserUid() == this.USER_UID) {
	              $('#btn_accept_friend').parents(".message").remove();
	              $('#dlg_view_profile_person').hide();
	              $('#sendmessage').show();

	          }else{
	              $('#btn_cancel_request_add').parents(".message").remove();
	              $('#dlg_view_profile_person').hide();
	          }

	
			if ($("#chatbox").is(":visible")) {
				$('#topmenu span.friends').click();
			}
			if (g_currentRoom) {
			if (this.PAYLOAD.ROOM_UID == g_currentRoom) {
				    $('#sendmessage').show();
//					curRoom.click();
				}
			}

			// console.log(this);
		},
		FRIEND_CANCEL : function(message) {
			console.log('recieve.FRIEND_CANCEL');

			var thisUid = getUserUid();
			// $("#roombox").is(":visible");
			// $("#chatbox").is(":visible")
			if ($("#roombox").is(":visible") || thisUid == this.USER_UID) {
				// if($("#roombox").is(":visible") && thisUid == this.USER_UID)
				// {
				$('#topmenu span.rooms').click();
				$('#chat-messages').empty();
				$('#dlg_view_profile_person').hide();
			}

			console.log(this);
		},
		FILE_VIEW : function(message) {
			console.log(this);
		},
		FILE_UPLOAD : function(message) {
			console.log(this);
		},
		FILE_DOWNLOAD : function(message) {
			console.log(this);
		},
		MEMBER_LIST : function(message) {
			var room_uid = this.PAYLOAD.ROOM_UID;
			var room_type = this.PAYLOAD.ROOM_TYPE;
			var div_c = $('.r-listmember');
			
			div_c.empty();
			$('#info-room-back').addClass('hide');
			var ul = $('<ul class="memberlist" />');
			var size = this.DATALIST.length;
			if (size > 0) {
				$('#info-room-size').empty().html(' (' + size + ')');
			}
			
			$('div[room_uid="'+room_uid+'"]').find('.room_user_count').text(size);
			$('#profile2').attr('user_count', size);
			
			$
					.each(
							this.DATALIST,
							function(i, obj) {
								var li = $('<li  />');
								li.attr('user_uid', obj.USER_UID);
								var str_a = '<a href="#">'
										+ '<img src="tmp_img_src" style="width:16%; border-radius:50%">'
										+ '<div class="member">'
										+ '<p class="name"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> tmp_fullname </font></font><span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">tmp_position_nm</font></font></span></p>'
										+ '<p class="team"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">tmp_dept_name</font></font></p></div></a></li>';
								var tmp_src = CTX + '/images/wc/avatar-default1.png';
								tmp_src = CTX + '/' + obj.USER_IMG;
								var dep_nm = obj.DEPT_NM || '';
								var position_nm = obj.POSITION_NM || '';
								str_a = str_a.replace('tmp_img_src', tmp_src);

								var displayName = obj.USER_ID;
								if (obj.USER_NM_KOR) {
									displayName = obj.USER_NM_KOR;
								} else if (obj.USER_NM_ENG) {
									displayName = obj.USER_NM_ENG;
								}
								str_a = str_a.replace('tmp_fullname',
										displayName);
								str_a = str_a.replace('tmp_position_nm',
										position_nm);
								str_a = str_a.replace('tmp_dept_name', dep_nm);
								li.append(str_a);

								var img = li.find('img');
								img
										.error(function() {
											img
													.attr('src',
															CTX + '/images/wsc/avatar-default1.png');
										});

								li.click(function() {
									friendInfoLeft = false;
									wschat.send.MEMBER_VIEW(obj.USER_UID);

								});
								ul.append(li);
							});
			div_c.append(ul);

		},
		MEMBER_VIEW : function(message) {
			// debugger;
			$("#md-name").html(this.PAYLOAD.USER_NM_ENG);
			$("#md-description").html(this.PAYLOAD.USER_ID);

			var dialog;
			if (this.PAYLOAD.TYPE_MEMBER == 'ME') {
				dialog = $("#dlg_view_profile");
				dialog.find('#lb_user_uid').empty();
				dialog.find('.lb_user_id').empty();

				if (this.PAYLOAD.IS_ONLINE == 'Y') {
					dialog.find('.light_status')
							.removeClass('light_status_off');
					dialog.find('.light_status').addClass('light_status_on');
				} else {
					dialog.find('.light_status').removeClass('light_status_on');
					dialog.find('.light_status').addClass('light_status_off');
				}
				dialog.find('#my_img').attr("src",
						CTX + '/' + this.PAYLOAD.USER_IMG);
				dialog.find('#lb_user_uid_friend')
						.append(this.PAYLOAD.USER_UID);

				var displayName = this.PAYLOAD.USER_ID;
				if (this.PAYLOAD.USER_NM_KOR) {
					displayName = this.PAYLOAD.USER_NM_KOR;
				} else if (this.PAYLOAD.USER_NM_ENG) {
					displayName = this.PAYLOAD.USER_NM_ENG;
				}
				if (this.PAYLOAD.USER_ID) {
					dialog.find('.lb_user_id').append(displayName);
				}
				if (this.PAYLOAD.USER_EMAIL) {
					dialog.find('.lb_email').empty();
					dialog.find('.lb_email').append(this.PAYLOAD.USER_EMAIL);
				} else {
					dialog.find('.lb_email').empty().append('Unknown');
				}
				if (this.PAYLOAD.USER_ADDR) {
					dialog.find('#lb_my_addr').empty();
					dialog.find('#lb_my_addr').append(this.PAYLOAD.USER_ADDR);
				} else {
					dialog.find('#lb_my_addr').empty().append('Unknown');
				}
				if (this.PAYLOAD.USER_PHONE) {
					dialog.find('#lb_my_mobile').empty();
					dialog.find('#lb_my_mobile')
							.append(this.PAYLOAD.USER_PHONE);
				} else {
					dialog.find('#lb_my_mobile').empty().append('Unknown');
				}
				if (friendInfoLeft) {

					dialog.css({
						"right" : "0px",
						"left" : "380px",
						"top" : "0px"
					});
					friendInfoLeft = false;

				} else {
					dialog.css({
						"right" : "40px",
						"left" : "auto",
						"top" : "0px"
					});

				}

				$('#my_img')
						.error(
								function() {
									$('#my_img')
											.attr('src',
													CTX + '/images/stnd/avatar-default-square1.png');
								});

				var url = validImageUrl($('#my_img').attr('src'),
						CTX + '/images/stnd/avatar-default-square1.png');
				$('#my_img').attr('src', url);
				dialog.show();
				$(document).mouseup(
						function(e) {
							if (!dialog.is(e.target)
									&& dialog.has(e.target).length === 0) {
								dialog.hide();
							}
						});

			} else if (this.PAYLOAD.TYPE_MEMBER == 'FRIEND') {

				var userReg = $('.info-room-right').attr('reg_user_uid');
				var isAdmR = userReg == getUserUid() ? true : false;
				var user_uid_member = this.PAYLOAD.USER_UID;
				if (!isAdmR) {
					$('#btn_remove_user').addClass('hide');
					$('#dlg_view_profile_friend').css('height', 630);
				} else {
					$('#btn_remove_user').removeClass('hide');
					$('#btn_remove_user').unbind('click');
					$('#btn_remove_user').click(function() {
						// alert('remove user: ' + user_uid_member);
						if (confirm("Are you sure ?") == true) {
							var room_out = message_type.ROOM_OUT;
							room_out.USER_UID = getUserUid();
							room_out.PAYLOAD.ROOM_UID = get_room_uid();
							room_out.PAYLOAD.USER_UID = user_uid_member;
							chatSock.send(JSON.stringify(room_out));
						} else {
							return;
						}
					});
				}

				dialog = $("#dlg_view_profile_friend");
				dialog.find('#lb_user_uid_friend').empty();
				dialog.find('.lb_user_id').empty();
				if (this.PAYLOAD.IS_ONLINE == 'Y') {
					dialog.find('.light_status')
							.removeClass('light_status_off');
					dialog.find('.light_status').addClass('light_status_on');
				} else {
					dialog.find('.light_status').removeClass('light_status_on');
					dialog.find('.light_status').addClass('light_status_off');
				}

				dialog.find('#lb_is_favorite').empty();
				if (this.PAYLOAD.FAV_YN == 'Y' || this.PAYLOAD.FAV_YN == 'y') {
					dialog.find('#lb_is_favorite').append('Favorite friend');
					dialog.find('#btn_add_favorite').css("background",
							"#202548");
					$("#lb_is_fv").val('Y');
				} else if (this.PAYLOAD.FAV_YN == 'N'
						|| this.PAYLOAD.FAV_YN == 'n') {
					dialog.find('#lb_is_favorite').append('Add to favorite');
					dialog.find('#btn_add_favorite').css("background",
							"#4854a2");

					$("#lb_is_fv").val('N');

				}

				dialog.find('#img_friend_ava').attr("src",
						CTX + '/' + this.PAYLOAD.USER_IMG);
				dialog.find('#lb_user_uid_friend').val(this.PAYLOAD.USER_UID);
				var displayName = this.PAYLOAD.USER_ID;
				if (this.PAYLOAD.USER_NM_KOR) {
					displayName = this.PAYLOAD.USER_NM_KOR;
				} else if (this.PAYLOAD.USER_NM_ENG) {
					displayName = this.PAYLOAD.USER_NM_ENG;
				}
				dialog.find('.lb_user_id').append(displayName);
				if (this.PAYLOAD.USER_EMAIL) {
					dialog.find('.lb_email').empty();
					dialog.find('.lb_email').append(this.PAYLOAD.USER_EMAIL);
				} else {
					dialog.find('.lb_email').empty().append('Unknown');
				}
				if (this.PAYLOAD.USER_ADDR) {
					dialog.find('#lb_friend_addr').empty();
					dialog.find('#lb_friend_addr').append(
							this.PAYLOAD.USER_ADDR);
				} else {
					dialog.find('#lb_friend_addr').empty().append('Unknown');
				}
				if (this.PAYLOAD.USER_PHONE) {
					dialog.find('#lb_friend_mobile').empty();
					dialog.find('#lb_friend_mobile').append(
							this.PAYLOAD.USER_PHONE);
				} else {
					dialog.find('#lb_friend_mobile').empty().append('Unknown');
				}

				if (friendInfoLeft) {

					dialog.css({
						"right" : "0px",
						"left" : "380px",
						"top" : "0px"

					});
					friendInfoLeft = false;

				} else {
					dialog.css({
						"right" : "40px",
						"left" : "auto",
						"top" : "0px"
					});

				}

				$('#img_friend_ava')
						.error(
								function() {
									$('#img_friend_ava')
											.attr('src',
													CTX + '/images/stnd/avatar-default-square1.png');
								});

				var url = validImageUrl($('#img_friend_ava').attr('src'),
						CTX + '/images/stnd/avatar-default-square1.png');
				$('#img_friend_ava').attr('src', url);

				dialog.show();
				$(document).mouseup(
						function(e) {
							if (!dialog.is(e.target)
									&& dialog.has(e.target).length === 0) {
								dialog.hide();
							}
						});

			} else {

				dialog = $("#dlg_view_profile_person");

				dialog.find('#img_person_ava').attr("src",
						CTX + '/' + this.PAYLOAD.USER_IMG);
				dialog.find('#lb_user_uid_person').empty().val(
						this.PAYLOAD.USER_UID);
				var displayName = this.PAYLOAD.USER_ID;
				if (this.PAYLOAD.USER_NM_KOR) {
					displayName = this.PAYLOAD.USER_NM_KOR;
				} else if (this.PAYLOAD.USER_NM_ENG) {
					displayName = this.PAYLOAD.USER_NM_ENG;
				}
				dialog.find('.lb_user_id').empty().append(displayName);
				if (this.PAYLOAD.USER_EMAIL) {
					dialog.find('.lb_email').empty().append(
							this.PAYLOAD.USER_EMAIL);
				} else {
					dialog.find('.lb_email').empty().append('Unknown');
				}
				if (this.PAYLOAD.USER_ADDR) {
					dialog.find('#lb_person_addr').empty().append(
							this.PAYLOAD.USER_ADDR);
				} else {
					dialog.find('#lb_person_addr').empty().append('Unknown');
				}
				if (this.PAYLOAD.USER_PHONE) {
					dialog.find('#lb_person_mobile').empty().append(
							this.PAYLOAD.USER_PHONE);
				} else {
					dialog.find('#lb_person_mobile').empty().append('Unknown');
				}

				if (this.PAYLOAD.TYPE_MEMBER == 'BE_INVITED') {
					$('#lb_person_status').empty().append('Request adding');

					$('#lb_action').empty().append('Accept friend');
					$('#btn_action').unbind("click").click(function() {
						var user_uid_2 = $('#lb_user_uid_person').val();
						wschat.send.FRIEND_ACCEPT(user_uid_2);
					});

				} else if (this.PAYLOAD.TYPE_MEMBER == 'INVITED') {
					$('#lb_person_status').empty().append('Sent an invitation');

					$('#lb_action').empty().append('Cancel request');
					$('#btn_action').unbind("click").click(function() {
						var user_uid_2 = $('#lb_user_uid_person').val();
						wschat.send.FRIEND_CANCEL(user_uid_2);

					});

				} else {
					$('#lb_person_status').empty().append('Unknown');

					$('#lb_action').empty().append('Add friend');
					$('#btn_action').unbind("click").click(
							function() {
								// debugger;
								$('#dlg_message_add').css("display", "inline");
								var user_id_2 = $('#dlg_view_profile_person')
										.find('.lb_user_id').text();
								dialog.hide();
								$('#user_id_2').val(user_id_2);
								// 
								$('#title_dialog_add').empty();

								$('#title_dialog_add').append(
										'Say something to ' + user_id_2);

							});

				}

				if (friendInfoLeft) {

					dialog.css({
						"right" : "0px",
						"left" : "380px",
						"top" : "0px"
					});
					friendInfoLeft = false;

				} else {
					dialog.css({
						"right" : "40px",
						"left" : "auto",
						"top" : "0px"
					});

				}

				$('#img_person_ava')
						.error(
								function() {
									$('#img_person_ava')
											.attr('src',
													CTX + '/images/stnd/avatar-default-square1.png');
								});

				var url = validImageUrl($('#img_person_ava').attr('src'),
						CTX + '/images/stnd/avatar-default-square1.png');
				$('#img_person_ava').attr('src', url);

				dialog.show();
				$(document).mouseup(
						function(e) {
							if (!dialog.is(e.target)
									&& dialog.has(e.target).length === 0) {
								dialog.hide();
							}
						});

			}
		},
		MEMBER_MODIFY : function(message) {
			console.log(this);
		},
		MEMBER_REFRESH : function(message) {
			console.log(this);
		},
		SETTING_VIEW : function(message) {
			console.log('rec: SETTING_ VIEW');
			$('#conf-font-size-id').val(this.PAYLOAD.CONF_FONT_SIZE + "");
			$('input[value="' + this.PAYLOAD.SKIN_UID + '"]').attr('checked',
					true);
			if (this.PAYLOAD.NOTIFY_SOUND_YN == 'Y')
				$('#ck_chat_nof_snd').prop('checked', true);
			else
				$('#ck_chat_nof_snd').prop('checked', false);

		},
		SETTING_MODIFY : function(message) {
			console.log('rec: SETTING_VIEW');
		},

		FRIEND_DELETE_FAVORITE : function(message) {

			console.log('rec: FRIEND_DELETE_FAVORITE');
			var dialog = $("#dlg_view_profile_friend");

			dialog.find('#lb_is_favorite').empty();
			dialog.find('#lb_is_favorite').append('Add to favorite');
			$("#lb_is_fv").val('N');
			$('#btn_add_favorite').css("background", "#4854a2");
			$('#topmenu span.friends').click();
		},
		FRIEND_ADD_FAVORITE : function(message) {

			console.log('rec: FRIEND_ADD_FAVORITE');
			var dialog = $("#dlg_view_profile_friend");

			dialog.find('#lb_is_favorite').empty();

			dialog.find('#lb_is_favorite').append('Favorite friend');
			var user_uid_2 = dialog.find('#lb_user_uid_friend').val();
			$("#lb_is_fv").val('Y');
			$('#btn_add_favorite').css("background", "#202548");
			// var li = $('#friends').find('div#' + user_uid_2).parent();
			// var tempLi = li.clone();
			// $('#friends').find('.group_favorite').append(tempLi);
			// li.remove();
			$('#topmenu span.friends').click();
		},
		FRIEND_DELETE : function(message) {
			console.log('rec: FRIEND_DELETE');
			// $('.friends').click();

			var sender = this.USER_UID;
			var receiver = this.PAYLOAD.USER_UID_2;
			var current = getUserUid();
			if (current == sender) {
				$("#friends .friend[contact_user_uid='" + receiver + "']")
						.remove();
			} else {
				$("#friends .friend[contact_user_uid='" + sender + "']")
						.remove();
			}
			// $("#roombox").is(":visible");
			if ($("#chatbox").is(":visible")) {
				$("#friends li .friend").first().click();
			}
			if ($("#roombox").is(":visible")) {
				var chatitem = $("#rooms .room[room_uid='"
						+ this.PAYLOAD.ROOM_UID + "']");
				if (chatitem) {
					chatitem.remove();
					if (chatitem.hasClass("select-room")) {
						$("#rooms .room").first().click();
					}
				}
			}

		//	alert('Deleted successfully!');
			// 
			// var dialog = $("#dlg_view_profile_friend");
			//
			// dialog.find('#lb_is_favorite').empty();
			//
			// dialog.find('#lb_is_favorite').append('Favorite friend');
			// $("#lb_is_fv").val('Y');
			// $('#btn_add_favorite').css("background", "#a3a3a3");

		},

		MEMBER_ONLINE : function(message) {
			console.log('rec: MEMBER_ONLINE from ' + this.PAYLOAD.USER_UID
					+ ' current: ' + this.PAYLOAD.ONLINE);
			var light1 = $('#friends').find('#' + this.PAYLOAD.USER_UID).find(
					'.light_status');
			if (this.PAYLOAD.ONLINE == 'Y') {
				light1.removeClass('light_status_off');
				light1.addClass('light_status_on');
			} else if (this.PAYLOAD.ONLINE == 'N') {
				light1.removeClass('light_status_on');
				light1.addClass('light_status_off');
			}

			light1 = $('#list_ul_left').find(
					"[user_uid='" + this.PAYLOAD.USER_UID + "']").find(
					'.light_status_2');
			if (this.PAYLOAD.ONLINE == 'Y') {
				light1.removeClass();
				light1.addClass('light_status_2 light_status_on_2');

			} else if (this.PAYLOAD.ONLINE == 'N') {
				light1.removeClass();
				light1.addClass('light_status_2 light_status_off_2');

			}

		}

	}
}

var isCurWindow = true;

$(window).on(
		"blur focus",
		function(e) {
			// console.log('click brower');
			var prevType = $(this).data("prevType") || 'focus';
			console.log('click browser' + absentCnt.toString());
			if (prevType != e.type) {
				switch (e.type) {
				case "blur":
					isCurWindow = false;
					break;
				case "focus":
					// do work
					isCurWindow = true;

					var str = document.title;
					var currentCount = str.substring(str.lastIndexOf("(") + 1,
							str.lastIndexOf(")"));
					currentCount -= absentCnt;
					currentCount = Math.max(currentCount, 0);
					console.log('click browser' + absentCnt.toString());
					if (currentCount > 0) {
						document.title = '(' + currentCount + ') ' + titleDef;
					} else {
						document.title = titleDef;
					}
					absentCnt = 0;
					break;
				}
			} else {

			}

			$(this).data("prevType", e.type);
		});

function sendChatList(message) { // message is string
	console.log('send chat list: ' + message);
}
function getUserUid() {
	var userUid =      sessionStorage.getItem("userUid_wsc");
	return userUid;
}

function getUserName() {

	var displayName = getUserUid();
	var korname = $('#myProfile').data("user_name_kr");
	var engname = $('#myProfile').data("user_name_eng");

	if (korname != null && korname != "") {
		displayName = korname;
	} else if (engname != null && engname != "") {
		displayName = engname;
	}

	return displayName;
}

function getRoomUid() {

	var v = $('#chat-messages').data('ROOM_UID');
	return v;
}
function getCurUserId() {
	var userUid = $('#myProfile').attr('user_id');
	return userUid;
}

function reloadMemberView(wsc, message) {

}

$(document).ready(function() {

	$('#send').click(function() {
		message = $("#txtMsg").val();
		wschat.send.CHAT_SEND("TEXT");

	});

	// Quan ly danh sach cuar CHAT ROOM
	$('.main_roomCountMember').click(function() {
		wschat.send.MEMBER_LIST();
	});

});

function showForm(data) {
	var list = data.DATALIST;
	var pl = data.PAYLOAD;

	var tbl = $('<table  style="width:100%">');
	var length = list.length;
	for (var i = 0; i < length; i = i + 4) {
		var tr = $('<tr>');
		for (j = i; (j <= i + 3 && j < length); j++) {
			var imgSrc = jsCtxPath + "/" + list[j].USER_IMG;
			var td = $('<td>  </td>');
			td.attr('uid', list[j].USER_UID);
			var imgAvataString = '<img class="img-td-list contact-added-item-tmp" src="'
					+ imgSrc + '"/>';
			var imgAvata = $(imgAvataString);
			td.append(imgAvata);
			td.attr('title', list[j].USER_ID);
			var div_content = $('<span class="btn-ng" btn-for-click-add  click_choose_user_uid="0" uid="'
					+ list[j].USER_UID + '">' + list[j].USER_NM_ENG + '</span>');
			td.click(function() {
				if ($(this).attr('click_choose_user_uid') == '1') {
					$(this).attr('click_choose_user_uid', '0');
					$(this).css('background', '');
					$(this).find('.k-i-check-outline').remove();
					$('.contact-added-item[uid="' + $(this).attr('uid') + '"]')
							.remove();

				} else {
					$(this).attr('click_choose_user_uid', '1');
					$(this).css('background', '#C7EDFC');
					var span = $('<span class="bag contact-added-item" uid="'
							+ $(this).attr('uid') + '">'
							+ $(this).find('img').prop("outerHTML")
							+ $(this).text() + '</span>');
					$('.contact-added').append(span);
					$(this).append(
							'<span class="k-icon k-i-check-outline"></span>');
				}
			});
			td.append(div_content);
			var $uids = $('span.bag[uid]');
			$
					.each(
							$uids,
							function(i, obj) {

								if (list[j].USER_UID == $(obj).attr('uid')) {
									td.attr('click_choose_user_uid', '1');
									td.css('background', '#C7EDFC');
									td
											.append('<span class="k-icon k-i-check-outline"></span>');
								}
							});
			tr.append(td);
		}
		tbl.append(tr);
	}
	var divtable = $('#tblMember');
	divtable.empty();
	tbl.appendTo(divtable);

}

function showFormAdd(data) {
	var list = data.DATALIST;
	var pl = data.PAYLOAD;
	var roomUid = getRoomUid();

	var tbl = $('<table  style="width:100%">');
	var length = list.length;
	for (var i = 0; i < length; i = i + 3) {
		var tr = $('<tr>');
		for (j = i; (j <= i + 2 && j < length); j++) {
			var imgSrc = jsCtxPath + "/" + list[j].USER_IMG;
			var td = $('<td>  </td>');
			td.attr('uid', list[j].USER_UID);
			var imgAvataString = '<img class="img-td-list contact-added-item-tmp" src="'
					+ imgSrc + '"/>';
			var imgAvata = $(imgAvataString);
			td.append(imgAvata);
			td.attr('title', list[j].USER_ID);
			var div_content = $('<span class="btn-ng" btn-for-click-add  click_choose_user_uid="0" uid="'
					+ list[j].USER_UID + '">' + list[j].USER_NM_ENG + '</span>');
			td
					.click(function() {
						if ($(this).attr('click_choose_user_uid') == '1') {
							$(this).attr('click_choose_user_uid', '0');
							$(this).css('background', '');
							$(this).find('.k-i-check-outline').remove();
							$(
									'.contact-added-item[uid="'
											+ $(this).attr('uid') + '"]')
									.remove();

						} else {
							// ROOOM_INVITE 15216280338210000
							var userUidAdd = $(this).attr('uid');
							wschat.send.ROOM_INVITE({
								USER_UID : userUidAdd,
								ROOM_UID : roomUid
							});
							// MEMBER_LIST
							wschat.send.MEMBER_LIST();

							$(this).empty().attr('align', 'center');
							$(this)
									.append(
											'<span style="background:#7CFC00;"><i class="fa fa-check"></i> Success </span>');
							$(this).unbind('click');
							// Close dialog
							// $('#dialog-add-member').dialog('close');
							$("#dialog-list-member").dialog("close");

						}
					});
			td.append(div_content);
			var $uids = $('span.bag[uid]');
			$
					.each(
							$uids,
							function(i, obj) {

								if (list[j].USER_UID == $(obj).attr('uid')) {
									td.attr('click_choose_user_uid', '1');
									td.css('background', '#C7EDFC');
									td
											.append('<span class="k-icon k-i-check-outline"></span>');
								}
							});
			tr.append(td);
		}
		tbl.append(tr);
	}
	var divtable = $('#tblMember_add');
	divtable.empty();
	tbl.appendTo(divtable);

}

Number.prototype.padLeft = function(base, chr) {
	var len = (String(base || 10).length - String(this).length) + 1;
	return len > 0 ? new Array(len).join(chr || '0') + this : this;
}

function toStr(d) {

	var dformat = [ (d.getMonth() + 1).padLeft(), d.getDate().padLeft(),
			d.getFullYear() ].join('/')
			+ ' - '
			+ [ d.getHours().padLeft(), d.getMinutes().padLeft(),
					d.getSeconds().padLeft() ].join(':');
	return dformat;
}

var titleDef = document.title;

function changeTitle(numNotify) {
	var newTitle = '(' + 'new' + ') ' + titleDef;
	document.title = newTitle;

}

function showVideoPlayer(imgElm) {
	var url = $(imgElm).data("video");
	/*
	 * console.log("Video: " + url); $("#ws_video_player_cn").attr("src", url);
	 * $("#ws_video_player").load(); $("#ws_video").toggle();
	 */
	var win = window.open(url, '_blank');
	win.focus();
}

function showImageSlide(imgElm, index) {
	$(imgElm).prop('disabled', true);
	// var currentImage = $(divMsg).attr('src');
	var this_msg_uid = $(imgElm).data('msg_uid');
	var room_uid = $(imgElm).data('room_uid');
	var this_num = 0;
	count = 0;
	$
			.ajax({
				url : wschatCtx + '/common/file/getListFile.ajax',
				data : {
					ROOM_UID : room_uid,
					ORDER_BY : 'ASC',
					TYPE_FILE : 'MEDIA'
				},
				success : function(data) {
					var lstImg = [];
					var lstFle = [];
					$.each(data, function(i, o) {
						
						/*
						 * var fileName = o.FILE_ORI_NM || ''; var isImg =
						 * false; var ext =
						 * fileName.substring(fileName.lastIndexOf('.') +
						 * 1).toUpperCase(); if ($.inArray(ext, img_ext) > -1) {
						 * isImg = true; } if (isImg == true && o.BIN_IMG !=
						 * null && o.BIN_IMG != '') { lstImg.push(o); count =
						 * count + 1; } else { lstFle.push(o); }
						 */
						/*
						 * if (isImg == true) { lstImg.push(o); count = count +
						 * 1; }
						 */
						lstImg.push(o);
						count = count + 1;
					});

					lstImg.reverse();

					/*
					 * var sx = $('.demo'); sx.empty(); sx.append('<div
					 * class="item"><div class="clearfix" style="width:
					 * 100%;height: 100%;"><ul id="image-gallery"> </ul> </div></div>');
					 * var sx = $('<div class="clearfix" style="width:
					 * 100%;height: 100%;"><ul id="image-gallery"> </ul>
					 * </div>');
					 */
					var sx = $('#dialog-slider');
					sx.empty();
					sx
							.append('<div class="item"><div class="clearfix" style="width: 100%;height: 100%;"><ul id="image-gallery"> </ul> </div></div>');
					var slider = $('#image-gallery');
					slider.empty();
					$
							.each(
									lstImg,
									function(i, o) {
										/*
										 * if (o.BIN_IMG == '' || o.BIN_IMG ==
										 * null) { } else {
										 */
										var fileName = o.FILE_ORI_NM;
										var ext = fileName.substring(
												fileName.lastIndexOf('.') + 1)
												.toUpperCase();
										var srcFile = wschatCtx
												+ '/common/file/DwnlMsgFileNew.ajax?MSG_UID='
												+ o.MSG_UID;
										var li = $('<li />');
										var div = $("<div>");
										var img1;
										if ($.inArray(ext, video_ext) > -1) {
											li
													.attr('data-thumb',	srcFile);
											var videoFile = wschatCtx
											+ '/common/file/DwnlMsgFileNew.ajax?MSG_UID='
											+ o.MSG_UID+"&type=slide";
											// ext = "webm";
											// srcFile =
											// "http://dl3.webmfiles.org/big-buck-bunny_trailer.webm";
											img1 = $('<video id="video_'
													+ o.MSG_UID
													+ '" class="imgMainView" controls="controls" style="height:480px;"><source src="'
													+ videoFile
													+ '" type="video/'
													+ ext.toLowerCase()
													+ '">Your browser does not support the video tag.</video>');
										} else {
											// srcFile = 'data:image/' + ext +
											// ';base64,' + o.BIN_IMG;
											li.attr('data-thumb', srcFile);
											img1 = $('<img class="imgMainView" />');
											img1.attr('src', srcFile);
										}
										li.append(div);
										div.append(img1);
										div
												.append("<a class='img_down_btn' href='"
														+ srcFile
														+ "'>Download</a>");
										slider.append(li);
										
										$('#dialog-slider').find('a.lSPrev').on('click', function (e) {
					                        console.log('back');
					                        $('#dialog-slider').find('video').each(function(i,obj){
												if(!obj.get(0).paused){
													obj.get(0).pause();
												}
											});
										});

										if (o.MSG_UID == this_msg_uid) {
											this_num = i;
										}
										// }

									});

					slide_play = $('#image-gallery').lightSlider({
						gallery : true,
						item : 1,
						loop : true,
						thumbItem : 9,
						slideMargin : 0,
						enableDrag : false,
						currentPagerPosition : 'left',
						onSliderLoad : function(el) {
							var imgs = el.find('img');
							$.each(imgs, function(i, obj){
								if($(obj).height() > $(obj).width())
								{
									var oriHeight = $(obj).height();
									$(obj).height('480px');
									$(obj).width((($(obj).width()*480)/oriHeight));
								}
								else
								{
									var oriWidth = $(obj).width();
									var oriHeight = $(obj).height();
									$(obj).width('960px');
									if($(obj).height()>480)
									{
										$(obj).height(((960*oriHeight)/oriWidth));
									}
//									$(obj).height(((960*$(obj).height())/oriWidth));
								}
							});
						}

					});

					slide_play.goToSlide(this_num + 1);

				}
			}); // end ajax

	$('#dialog-slider').show();

	$(document).mouseup(
			function(e) {
				if (!$('#dialog-slider').is(e.target)
						&& $('#dialog-slider').has(e.target).length === 0) {
					$('#dialog-slider').hide();
					$('#dialog-slider').find('video').each(function(i,obj){
							if(!obj.paused){
								obj.pause();
							}
						});
				}
			});

	$(imgElm).prop('disabled', false);
}

function sendFileMsg(userid, room_uid, params, loaderid) {
	if (params == null || params == undefined) {
		return;
	}
	console.log('Sending file...');
	$('#group-chat-msg-send-msg').css('display', '');
	var srcImg = params.path;
	var typeImg = params.type;

	var isImgFile = false;
	var bin_img = '';
	//console.log(CTX + '/common/file/getBase64.ajax');

	if (params.type.startsWith('image')) {
		isImgFile = true;
		// call ajax
		$.ajax({
			url : wschatCtx + '/common/file/getBase64.ajax',
			data : {
				FILE_PATH : params.path
			},
			async : false,
			success : function(data) {
				srcImg = 'data:' + typeImg + ';base64,' + data;
				bin_img = data;
			},
			error : function() {
				alert('error!');
			}
		});
	}

	var id = getTimestamp();
	txtMsg = params.name;

	// var room_uid = $('#chat-messages').data('ROOM_UID');
	$roomElm = $('#rooms').find('[room_uid=' + room_uid + ']');
	if ($roomElm.hasClass("select-room")) {
		$roomElm.find('a').empty().append(txtMsg);
	}

	// var tempKey = wschat.genTempkey();
	var txtMsg = CryptoJS.AES.encrypt(txtMsg, AESKey).toString();
	// var thisUid = getUserUid();
	// var chmsg = $('#chat-messages');

	// Sent to server to save db record message/ not file
	var msg = message_type.CHAT_SEND;
	// msg.USER_UID = getUserUid();
	msg.USER_UID = userid;
	msg.PAYLOAD.TEMP_MSG_UID = loaderid;
	msg.PAYLOAD.SEND_USER_UID = userid;
	msg.PAYLOAD.MSG = txtMsg;
	msg.PAYLOAD.FILE = params;
	// msg.PAYLOAD.ROOM_UID = $('#chat-messages').data('ROOM_UID');
	msg.PAYLOAD.ROOM_UID = room_uid;
	msg.PAYLOAD.CONT_TYPE = 'FILE';

	chatSock.send(JSON.stringify(msg));

}

function getTimestamp() {
	return Date.now().toString();
}

function play_sound() {

	if (NOTIFY_SOUND === 'N') {
		return;
	}

	try {
		var audio = document.getElementById("audio");
		audio.play();
	} catch (err) {
		console.log("cant' play audio - "+ err);
	}

	/*
	 * Open chrome://flags/#autoplay-policy Setting No user gesture is required
	 * Relaunch Chrome
	 */
}

function selectFistRoom() {

}

function clearChatWindow() {
	var chmsg = $('#chat-messages');
	chmsg.empty();
}

function get_room_uid() {
	var id = $('.info-room-right').attr('room_uid');
	return id;
}

function home_page() {
	$('.info-room-right').hide();
	$('.info-room-right').find('member').remove();

}

function hide_room_right() {
	$('.info-room-right').hide();
	$('.info-room-right').find('member').remove();
}

function show_room_right() {
	$('.info-room-right').show();
	$('.info-room-right').find('member').remove();
}

function diable_out_invt_btn() {
	$('#btn_room_out').unbind('click');
	$('#btn_add_mem').unbind('click');
}

function room_in_right(obj) {
	console.log('contact:' + obj.USER_ID);
	show_room_right();
	// new
	var info_room_right = $('.info-room-right');
	info_room_right.attr('room_uid', obj.ROOM_UID);
	info_room_right.attr('reg_user_uid', obj.REG_USER_UID);
//	info_room_right.attr('user_count', obj.USER_COUNT);

	var room_name = obj.ROOM_NM;
	if (room_name == undefined || room_name == null) {
		room_name = obj.ROOM_DEFAULT_NAME;
	}
	$('#info-room-nm').html(room_name + ' ');
	$('.main_roomInfo ').html(room_name);
	$('.main_roomCountMember').html(room_name);
	// list members
	wschat.send.MEMBER_LIST();
	// new UI
	// logout button
	$('#btn_room_out').unbind('click');
	$('#btn_room_out').on('click', function() {
		if (confirm("Would you like to log out of the chat room ?") == true) {
			var room_out = message_type.ROOM_OUT;
			room_out.USER_UID = getUserUid();
			room_out.PAYLOAD.ROOM_UID = obj.ROOM_UID;
			room_out.PAYLOAD.USER_UID = getUserUid();// logout
			// myseft
			chatSock.send(JSON.stringify(room_out));
			clearChatWindow();
			hide_room_right();
			wschat.send.ROOM_LIST();
		} else {
			return;
		}
	});

	if (obj.ROOM_TYPE == "IN_CHATROOM") {
		$('#btn_room_out').show();
	} else {
		$('#btn_room_out').hide();
	}

	// add new member
	$('#btn_add_mem').unbind('click');
	$('#btn_add_mem').on('click', function() {

		var r = get_room_uid();
		show_form_invt_room({
			ROOM_UID : r,
			ROOM_TYPE : obj.ROOM_TYPE
		});
	});

	// file history
	var btn_file_his = $('#btn_file_his');
	btn_file_his.unbind('click');

	btn_file_his
			.click(function() {
				$('#btn_image_his').removeClass('active');
				$('#btn_file_his').addClass('active');
				$('#btn_voice_his').removeClass('active');
				$('div[room_right_btn_tab_active]').attr(
						'room_right_btn_tab_active', 'n');
				$(this).attr('room_right_btn_tab_active', 'y');
				$('#info-room-back').removeClass('hide');
				var room_uid = get_room_uid();
				var div_container = $('.r-listmember');
				div_container.empty();
				$
						.ajax({
							url : wschatCtx + '/common/file/getListFile.ajax',
							data : {
								ROOM_UID : room_uid,
								ORDER_BY : 'DESC',
								TYPE_FILE : 'FILE'
							},
							success : function(data) {
								var div_container = $('.r-listmember');
								div_container.empty();

								var ul = $('<ul class="memberlist" file_tab_his="y" />');
								var size = data.length;
								// if (size > 0) {
								$('#info-room-size').empty().html(
										' (' + size + ')');
								// }
								$
										.each(
												data,
												function(i, obj) {
													var li = $('<li file_his_click="y" style="    border-bottom: 1px solid #c1c1c1;"/>');
													li.attr('user_uid',
															obj.USER_UID);
													var str_a = '<a href="#">'
															+ '<div class="member">'
															+ '<p class="name"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> tmp_file_name </font></font><span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">tmp_file_size</font></font></span></p>'
															+ '<p class="team"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">tmp_send_date</font></font></p></div><img id="img_download" src="tmp_img_src" style="width:16%;float: right;"></a></li>';
													var tmp_src = CTX + '/images/stnd/download.png';
													str_a = str_a.replace(
															'tmp_img_src',
															tmp_src);
													str_a = str_a.replace(
															'tmp_file_name',
															obj.FILE_ORI_NM);
													str_a = str_a.replace(
															'tmp_file_size',
															obj.FILE_SIZE
																	+ ' KB');
													var d2 = new Date(
															obj.SEND_DATE.time);
													var d2_str = d2
															.getFullYear()
															+ '-'
															+ (d2.getMonth() + 1)
															+ '-'
															+ d2.getDate();
													str_a = str_a.replace(
															'tmp_send_date',
															d2_str);
													li.append(str_a);
													var ext = obj.FILE_EXTN
															|| '';
													ext = ext.replace('.', '');
													var isPdfText = (ext
															.toLowerCase() == 'pdf' || ext
															.toLowerCase() == 'txt') ? true
															: false;
													li.find('#img_download')
															.unbind('click');
													li
															.find(
																	'#img_download')
															.click(
																	function() {
																		window.location.href = wschatCtx
																				+ '/common/file/DwnlMsgFileNew.ajax?MSG_UID='
																				+ obj.MSG_UID;
																	});
													if (isPdfText) {
														li
																.find('p.name')
																.click(
																		function() {
																			var urlFile = wschatCtx
																					+ '/common/file/DwnlMsgFileNew.ajax?MSG_UID='
																					+ obj.MSG_UID;
																			if (ext
																					.toLowerCase() == "pdf") {
																				pdfPreview(urlFile);
																				showPreviewModal();
																				return false;
																			}
																			if (ext
																					.toLowerCase() == "txt") {
																				readTextFile(
																						urlFile,
																						textPreview);
																				showPreviewModal();
																				return false;
																			}
																		});
													}
													ul.append(li);
												});
								div_container.append(ul);
							},
							error : function() {
								alert('error');
							}
						});
			});

	// image history
	var btn_image_his = $('#btn_image_his');
	btn_image_his.unbind('click');

	btn_image_his.click(function() {

		$('#btn_image_his').addClass('active');
		$('#btn_file_his').removeClass('active');
		$('#btn_voice_his').removeClass('active');

		$('div[room_right_btn_tab_active]').attr('room_right_btn_tab_active',
				'n');
		$(this).attr('room_right_btn_tab_active', 'y');
		$('#info-room-back').removeClass('hide');
		var room_uid = get_room_uid();
		var div_container = $('.r-listmember');
		div_container.empty();

		$.ajax({
			url : wschatCtx + '/common/file/getListFile.ajax',
			data : {
				ROOM_UID : room_uid,
				ORDER_BY : 'DESC',
				TYPE_FILE : 'MEDIA'
			},
			success : function(data) {
				var div_container = $('.r-listmember');
				div_container.empty();

				var tbl = $('<table class="tbl-h-img" image_tab_his="y" />');
				var size = data.length;
				$('#info-room-size').empty().html('(' + size + ')');
				var count = 0;
				var tr;
				// debugger;
				$.each(data, function(i, obj) {
					var currentImage = 0;
					var amountImage = 0;
					var slide_play;
					var td = $('<td class="td-h-img"/>');
					var srcFile = '';
					var ext = obj.FILE_EXTN || ' ';
					ext = ext.replace('.', '').toUpperCase();
					// srcFile = 'data:image/' + ext + ';base64,' + obj.BIN_IMG;
					var cls = "slide_img";
					if ($.inArray(ext, video_ext) > -1) {
						srcFile = wschatCtx + "/images/wc/video-thumbnail.png";
						cls = "slide_video";
					} else {
						srcFile = wschatCtx
								+ '/common/file/DwnlMsgFileNew.ajax?MSG_UID='
								+ obj.MSG_UID;
					}

					var img_elm = $('<img class="' + cls + '" src="' + srcFile
							+ '"  style="width:100%; cursor: pointer">');
					img_elm.data("room_uid", obj.ROOM_UID);
					img_elm.data("msg_uid", obj.MSG_UID);
					td.append(img_elm);
					// amountImage = td.find('img').length;
					if (img_elm.hasClass("slide_img")) {
						img_elm.unbind('click').click(function(event) {
							event.preventDefault();
							showImageSlide($(this));
						});
					} else {
						img_elm.data("video", wschatCtx
								+ '/common/file/DwnlMsgFileNew.ajax?MSG_UID='
								+ obj.MSG_UID);
						img_elm.unbind('click').click(function(event) {
							event.preventDefault();
							showVideoPlayer($(this));
						});
					}

					if (i % 3 == 0) {
						if (i == 0 && size == 1) {
							tr = $('<tr class="tr-h-img"></tr>');
							tr.append(td);
							tbl.append(tr);
						} else {
							// add tr
							if (i >= 3)
								tbl.append(tr);
							// new tr
							tr = $('<tr class="tr-h-img"></tr>');
							tr.append(td);
							if (i == (size - 1)) {
								// last image
								tbl.append(tr);
							}
						}

					} else {
						// old tr
						tr.append(td);
						if (i == (size - 1)) // the last image
							tbl.append(tr);
					}
				});
				div_container.append(tbl);
			},
			error : function() {
				alert('error');
			}
		});

	});

	// voice history
	var btn_voice_his = $('#btn_voice_his');
	btn_voice_his.unbind('click');
	btn_voice_his
			.click(function() {

				$('#btn_image_his').removeClass('active');
				$('#btn_file_his').removeClass('active');
				$('#btn_voice_his').addClass('active');

				$('div[room_right_btn_tab_active]').attr(
						'room_right_btn_tab_active', 'n');
				$(this).attr('room_right_btn_tab_active', 'y');
				$('#info-room-back').removeClass('hide');
				var div_container = $('.r-listmember');
				div_container.empty();
				$
						.ajax({
							url : wschatCtx + '/common/file/getListFile.ajax',
							data : {
								ROOM_UID : room_uid,
								ORDER_BY : 'DESC',
								TYPE_FILE : 'AUDIO'
							},
							success : function(data) {
								var div_container = $('.r-listmember');
								div_container.empty();
								var ul = $('<ul class="memberlist" audio_tab_his="y" />');
								var size = data.length;
								// if (size > 0) {
								$('#info-room-size').empty().html(
										' (' + size + ')');
								// }

								$
										.each(
												data,
												function(i, obj) {
													var li = $('<li file_his_click="y"  style="	border-bottom: 1px solid #c1c1c1;"/>');
													li.attr('user_uid',
															obj.USER_UID);
													var str_a = '<a href="#">'
															+ '<div class="member">'
															+ '<p class="name"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> tmp_file_name </font></font><span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">tmp_file_size</font></font></span></p>'
															+ '<p class="team"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">tmp_send_date</font></font></p></div>'
															+ '<div style="display:inline-block;float:right;"><img src=' +CTX + '/images/stnd/play.png" style="width:30px; margin-top:10px"> </div>'
															+ '</a></li>';

													str_a = str_a.replace(
															'tmp_file_name',
															obj.FILE_ORI_NM);
													str_a = str_a.replace(
															'tmp_file_size',
															obj.FILE_SIZE
																	+ ' KB');
													var d2 = new Date(
															obj.SEND_DATE.time);
													var d2_str = d2
															.getFullYear()
															+ '-'
															+ (d2.getMonth() + 1)
															+ '-'
															+ d2.getDate();
													str_a = str_a.replace(
															'tmp_send_date',
															d2_str);

													li.append(str_a);
													li.find('img').unbind(
															'click');
													li
															.find('img')
															.click(
																	function() {
																		window
																				.open(wschatCtx
																						+ '/common/file/DwnlMsgFileNew.ajax?MSG_UID='
																						+ obj.MSG_UID);
																	});

													ul.append(li);
												});
								div_container.append(ul);
							},
							error : function() {
								alert('error');
							}
						}); // end ajax

			}); // end click

	var btn_back = $('#info-room-back');
	btn_back.unbind('click').click(function() {
		$('#btn_image_his').removeClass('active');
		$('#btn_file_his').removeClass('active');
		$('#btn_voice_his').removeClass('active');

		wschat.send.MEMBER_LIST();
		$(this).addClass('hide');
	});// end click

}

function show_form_invt_room(obj) {
	$("#dlg_create_room").toggle();
	$("#dlg_create_room").attr('room_uid', '');
	$('#dlg_room_nm').val('');
	var save = $('#btn_submit_create_room');
	var cancel = $('#btn_submit_cancel_room');
	var search = $('#searchfriend_room');
	var list_left = $('#invt-left');
	list_left.empty();
	var list_right = $('#invt-right');
	cancel.click(function() {
		$('#dlg_create_room').css('display', 'none');
	});

	var room_uid = ''; // Neu la rong thi tao moi, con khong thi them user vao
	// phong chat.

	if (obj && obj.ROOM_UID) {
		if (obj.ROOM_TYPE == "IN_CHATROOM") {
			$("#dlg_create_room").attr('room_uid', obj.ROOM_UID);
		}
		room_uid = obj.ROOM_UID;
	}

	$('#invt-right').find('ul[form_invt_ul_right_member]').empty();
	var ul_right = $('ul[form_invt_ul_right]');

	ul_right.empty();

	if (room_uid && room_uid > 0) {
		var r_nm_tmp = $('#info-room-nm').text();
		$('#dlg_room_nm').val(r_nm_tmp);

		$
				.ajax({
					url : wschatCtx + '/chatuser/chatuser_0101/getListMember.ajax',
					data : {
						ROOM_UID : obj.ROOM_UID
					},
					success : function(data) {
						// list thanh vien cua nhom//Them vao ben phai
						var list_right = $('#invt-right');
						var mb = list_right
								.find('ul[form_invt_ul_right_member]');
						mb.empty();
						$
								.each(
										data,
										function(i, obj) {
											var li = '<li class="ibtn2" ><div style="" class="li-div"><label class="container"><input type="checkbox"><span class="checkmark"></span></label><img src="tmp_left_img_src" style="width:15%"><p style="display: inline-block;position: relative;color: #444" class="name_search user_name">tmp_left_name</p>tmp_on_of</div></li>';

											var src = wschatCtx + '/' + obj.USER_IMG;
											src = validImageUrl(src,
											        CTX + '/images/wsc/avatar-default1.png');
											var displayName = obj.USER_ID;
											if (obj.USER_NM_KOR) {
												displayName = obj.USER_NM_KOR;
											} else if (obj.USER_NM_ENG) {
												displayName = obj.USER_NM_ENG;
											}
											li = li.replace('tmp_left_img_src',
													src);
											li = li.replace('tmp_left_name',
													displayName);
											li = li.replace('tmp_left_img_src',
													src);

											var off = '<div class="light_status_2 light_status_off_2" style="margin-top:15px"></div>';
											var on = '<div class="light_status_2 light_status_on_2" style="margin-top:15px"></div>';

											if (obj.ONLINE_YN == 'Y')
												li = li
														.replace('tmp_on_of',
																on);
											else
												li = li.replace('tmp_on_of',
														off);

											li = $(li);
											li.attr('user_uid', obj.USER_UID);
											mb.append(li);

										});

						mb
								.find('img')
								.each(
										function(i, obj) {
											$(this)
													.error(
															function() {
																$(this)
																		.attr(
																				'src',
																				CTX + '/images/wsc/avatar-default1.png')
															});

										});

					},
					error : function(data) {
						alert('Error');
					}

				});
	}


	var user_uid = getUserUid();
	$.ajax({
		url : wschatCtx + '/chatuser/chatuser_0101/getListFrd.ajax',
		data : {
			USER_UID : user_uid,
			ROOM_UID : room_uid
		},
		success : function(data) {
			append_frd(data);
		},
		error : function(data) {

		}
	});

}

function get_img_src(img_base64) {
	return '';
}

function append_frd(datalist, obj) {
	var save = $('#btn_submit_create_room');
	var cancel = $('#btn_submit_cancel_room');
	var search = $('#searchfriend_room');
	var list_left = $('#invt-left');
	list_left.empty();
	// $('#invt-left ul').remove();
	var list_right = $('#invt-right');

	var list = datalist;
	var ul_left = $('<ul id="list_ul_left" ul_left />');
	var ul_right = $('ul[form_invt_ul_right]');
	ul_right.empty();
	$
			.each(
					list,
					function(i, obj) {
						var li = '<li class="ibtn" click_count="1" li_type = "left"><div style="" class="li-div"><label class="container"><input type="checkbox"><span class="checkmark"></span></label><img src="tmp_left_img_src" style="width:15%"><p style="display: inline-block; position: relative; bottom: 20px; left: 10px; font-size: 16px;" class="name_search user_name">tmp_left_name</p> tmp_on_of  </div></li>';
						var src = CTX + '/images/wc/avatar-default1.png';
						if (obj.USER_IMG) {
							src = wschatCtx + '/' + obj.USER_IMG;
						}

						src = validImageUrl(src,
								CTX + '/images/wsc/avatar-default1.png');

						var displayName = obj.USER_ID;
						if (obj.USER_NM_KOR) {
							displayName = obj.USER_NM_KOR;
						} else if (obj.USER_NM_ENG) {
							displayName = obj.USER_NM_ENG;
						}
						li = li.replace('tmp_left_img_src', src);
						li = li.replace('tmp_left_name', displayName);
						li = li.replace('tmp_left_img_src', src);
						var off = '<div class="light_status_2 light_status_off_2" style="margin-top:15px"></div>';
						var on = '<div class="light_status_2 light_status_on_2" style="margin-top:15px"></div>';

						if (obj.ONLINE_YN == 'Y')
							li = li.replace('tmp_on_of', on);
						else
							li = li.replace('tmp_on_of', off);
						li = $(li);
						li.attr('user_uid', obj.USER_UID);

//						li
//								.click(function() {
//
//									var count = parseInt($(this).attr(
//											'click_count'));
//									if (count % 2 == 0) {
//										// sang trai
//										count++;
//										li.attr('click_count', count);
//										ul_left.append($(this));
//										var size_r = $('#invt-right')
//												.find('li').size();
//										$('#title_dialog_count').empty().html(
//												size_r);
//										// cong 1 o ben trai
//										var size_l = parseInt($(
//												'#dlg_search_count').text());
//										$('#dlg_search_count').empty().html(
//												size_l + 1);
//									} else {
//										// sang phai
//										count++;
//										li.attr('click_count', count);
//
//										ul_right.append($(this));
//
//										var size_r = $('#invt-right')
//												.find('li').size();
//										$('#title_dialog_count').empty().html(
//												size_r);
//										// tru 1 o ben trai
//										var size_l = parseInt($(
//												'#dlg_search_count').text());
//										$('#dlg_search_count').empty().html(
//												size_l - 1);
//
//									}
//								});

						// lan dau tien
						ul_left.append(li);
						li.find('.container span.checkmark').click(function(){
						    if (li.find('input[type="checkbox"]').is(":checked"))
						    {
						        li.find('input[type="checkbox"]').prop('checked', true);
						    }else{
	                              li.find('input[type="checkbox"]').prop('checked', false);
						    }
						})

					});

	ul_left.find('img').each(function(i, obj) {
		$(this).error(function() {
			$(this).attr('src', CTX + '/images/wsc/avatar-default1.png')
		});
	});

	list_left.append(ul_left);
	// list_right.append(ul_right);

	save.unbind('click').click(function() {
		//debugger;
		var room_nm = $('#dlg_room_nm');
		var rul = $('#list_ul_left').find('li');
		var uid_list = [];
		$.each(rul, function(i, obj) {
		    if($(obj).find('input[type="checkbox"]').is(":checked")){
		        uid_list.push($(obj).attr('user_uid'));
		    }			
		});
		 debugger;
		if (uid_list.length > 0) {
			var new_room_uid = $('#dlg_create_room').attr('room_uid');
			if (new_room_uid.length == 0) {
				// wschat.send.ROOM_CREATE_CHATROOM();
//				var cul = $('ul[form_invt_ul_right_member]').find('li');
//				if (cul.length > 0) {
//					$.each(cul, function(i, obj) {
//						if ($(obj).attr('user_uid') != getUserUid()) {
//							uid_list.push($(obj).attr('user_uid'));
//						}
//					});
//				}
				// debugger;
				wschat.send.ROOM_CREATE(uid_list, 'IN_CHATROOM');
			} else {
				$.each(uid_list, function(i, obj) {
					wschat.send.ROOM_INVITE({
						USER_UID : obj,
						ROOM_UID : new_room_uid
					});
				});
				$('.info-room-right').attr('room_uid', new_room_uid);
				wschat.send.MEMBER_LIST();
			}
			$('#dlg_create_room').css('display', 'none');
		} else
			alert('Do not add user');

	});

	myFunction_room();
}

function myFunction_room() {
	// Declare variables
	var input, filter, ul, li, a, i;
	input = document.getElementById('searchfriend_room');
	filter = input.value.toUpperCase();
	ul = document.getElementById("list_ul_left");
	li = ul.getElementsByTagName('li');

	// Loop through all list items, and hide those who don't match the search
	// query
	var size = 0;
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByTagName("p")[0];
		if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
			size++;
		} else {
			li[i].style.display = "none";
		}
	}
	$('#dlg_search_count').empty().html(size);
}

function updateMessageDiv(divMsg, obj) {
    
	divMsg.empty();
	if (obj.MSG_TYPE_CODE != "FILE" && obj.MSG_TYPE_CODE != "TEXT") {
		divMsg.addClass('msg-center');
		 var stringMSG = '';
		if(obj.MSG_CONT != '' && obj.MSG_CONT != undefined){
			    stringMSG = CryptoJS.AES.decrypt(obj.MSG_CONT, AESKey).toString(
	                CryptoJS.enc.Utf8);
		}
		
		divMsg.append("<div class='inform'>" + stringMSG + "</div>");
		return;
	}

	var srcImg = jsCtxPath + '/' + obj.USER_IMG;
	var uid = obj.USER_UID;
	var displayName = uid;
	var room_uid = obj.ROOM_UID;

	divMsg.attr('id', uid);
	divMsg.attr('room_uid', room_uid);
	var thisUid = getUserUid();

	if (obj.USER_NM_KOR) {
		displayName = obj.USER_NM_KOR;
	} else if (obj.USER_NM_ENG) {
		displayName = obj.USER_NM_ENG;
	}

	var sent_time = displayName + ", " + toStr(new Date(obj.SEND_DATE));
	if (thisUid == obj.USER_UID) {
		divMsg.addClass('right');
	} else {
		divMsg.addClass('left');
		divMsg.append('<img class="msg_profile" title="' + displayName + '" src="'
		+ srcImg + '" />');
	}

	if (obj.MSG_TYPE_CODE == "FILE" || obj.MSG_TYPE_CODE == "FILE_HIS") {
		var fileName = obj.FILE_ORI_NM || ' ??? ';
		var msg_uid_1 = obj.MSG_UID || '0';
		divMsg.attr('msg_uid', msg_uid_1);

		var isImg = false;
		var ext = fileName.substring(fileName.lastIndexOf('.') + 1)
				.toUpperCase();

		if ($.inArray(ext, img_ext) > -1 || $.inArray(ext, video_ext) > -1
		// && (obj.BIN_IMG != '' || obj.BIN_IMG != null)
		) {
			isImg = true;
		}

		if (isImg) {
			var srcFile;
			// srcFile = 'data:image/' + ext + ';base64,' + obj.BIN_IMG;
			var isVideo = false;
			if ($.inArray(ext, video_ext) > -1) {
				srcFile = wschatCtx + '/common/file/DwnlMsgFileNew.ajax?MSG_UID='
						+ obj.MSG_UID;
				isVideo = true;
			} else {
				srcFile = wschatCtx + '/common/file/DwnlMsgFileNew.ajax?MSG_UID='
						+ obj.MSG_UID;
			}
			
			var divimage = $("<div>",{
				class:'image'
			}).appendTo(divMsg);
			
			var image = null;
			
			if (thisUid != obj.USER_UID){
				if(isVideo)
				{
					var div = $("<div>",{
						style:'position:relative;display:inline-block'
					}).appendTo(divimage);
					
					image = $('<img>',{
						class:'fileImage',
						style:'width:100px;border-radius:0%;',
						src:srcFile
					}).appendTo(div);
					
					var div2 = $("<div>",{
						style:'position:absolute;top:24%;right:35%;'
					}).appendTo(div);
					
					var img = $("<img>",{
						src:CTX + '/images/stnd/video_play.png'
					}).appendTo(div2);
				}
				else
				{
					image = $('<img>',{
						class:'fileImage',
						style:'width:100px;border-radius:0%;',
						src:srcFile
					}).appendTo(divimage);
				}
			}
			
			if(obj.READ_MEMBERS != null)
			{
				if(($("#profile2").attr('user_count')-obj.READ_MEMBERS.split(',').length)>0)
				{
					var spanreadcount = $("<span>",{
						class:'read_count',
						style:'float:initial;margin:5px 5px 0px 5px;color:#d0c0c0;vertical-align:bottom;',
						text:$('#profile2').attr('user_count')-obj.READ_MEMBERS.split(',').length
					}).appendTo(divimage);
				}
				else
				{
					var spanreadcount = $("<span>",{
						class:'read_count',
						style:'float:initial;margin:5px 5px 0px 5px;color:#d0c0c0;vertical-align:bottom;'
					}).appendTo(divimage);
				}
			}
			else
			{
				var spanreadcount = $("<span>",{
					class:'read_count',
					style:'float:initial;margin:5px 5px 0px 5px;color:#d0c0c0;vertical-align:bottom;'
				}).appendTo(divimage);
			}

			if (thisUid == obj.USER_UID){
				if(isVideo)
				{
					var div = $("<div>",{
						style:'position:relative;display:inline-block'
					}).appendTo(divimage);
					
					image = $('<img>',{
						class:'fileImage',
						style:'width:100px;border-radius:0%;',
						src:srcFile
					}).appendTo(div);
					
					var div2 = $("<div>",{
						style:'position:absolute;top:24%;right:35%;'
					}).appendTo(div);
					
					var img = $("<img>",{
						src:CTX + '/images/stnd/video_play.png'
					}).appendTo(div2);
				}
				else
				{
					image = $('<img>',{
						class:'fileImage',
						style:'width:100px;border-radius:0%;',
						src:srcFile
					}).appendTo(divimage);
				}
			}
			
			var br = $("<br>").appendTo(divimage);
			
//			var divcorner = $("<div>",{
//				class:"corner"
//			}).appendTo(divimage);
			
			var span = $("<span>",{
				text:sent_time,
				style:'white-space:nowrap'
			}).appendTo(divimage);
			
//			divMsg
//					.append('<div class="image"><img class="fileImage" style="width: 100px;border-radius: 0%;" src="'
//							+ srcFile
//							+ '" />  <div class="corner"></div><span>'
//							+ sent_time + '</span> </div>'
//							+(obj.READ_MEMBERS != null?
//									(
//										($('#profile2').attr('user_count')-obj.READ_MEMBERS.split(',').length)>0?
//												('<span class="read_count" style="float:initial; margin: 5px 5px 0px 5px; color:#d0c0c0;">'
//														+($('#profile2').attr('user_count')-obj.READ_MEMBERS.split(',').length)
//														+'</span>'):''
//									)
//									:'<span class="read_count" style="float:initial;margin: 5px 5px 0px 5px; color:#d0c0c0;"></span>')
//							); 
			// toStr(new
			// Date(obj.SEND_DATE))

			var img_elm = divMsg.find(".fileImage").parent();
			img_elm.data("room_uid", obj.ROOM_UID);
			img_elm.data("msg_uid", obj.MSG_UID);
			if (!isVideo) {
				img_elm.unbind('click').click(function(event) {
					event.preventDefault();
//					showImageSlide($(this));
					//console.log('anhpv ok 1')
				}); // end click in div
			} else {
				// img_elm.data("video", CTX
				// + '/common/file/DwnlMsgFileNew.ajax?MSG_UID='
				// + obj.MSG_UID);
				img_elm.unbind('click').click(function(event) {
					event.preventDefault();
					// showVideoPlayer($(this));
//					showImageSlide($(this));
	                //   console.log('anhpv ok 2')


				}); // end click in div
			}
		} else if (previewAvailable(ext)) { // preview is available
			var fileLink = buildLinkComponent(obj.MSG_UID, obj.FILE_ORI_NM, ext);
			divMsg.append(fileLink);
		} else {
			var divtext = $("<div>",{
				class:'text'
			}).appendTo(divMsg);
			
			var divbubble = null;
			
			if (thisUid != obj.USER_UID){
				divbubble = $("<div>",{
					class:'bubble'
				}).appendTo(divtext);
			}
			
			if(obj.READ_MEMBERS != null)
			{
				if(($("#profile2").attr('user_count')-obj.READ_MEMBERS.split(',').length)>0)
				{
					var spanreadcount = $("<span>",{
						class:'read_count',
						style:'float:initial;margin:5px 5px 0px 5px;color:#d0c0c0;vertical-align:bottom;',
						text:$('#profile2').attr('user_count')-obj.READ_MEMBERS.split(',').length
					}).appendTo(divtext);
				}
				else
				{
					var spanreadcount = $("<span>",{
						class:'read_count',
						style:'float:initial;margin:5px 5px 0px 5px;color:#d0c0c0;vertical-align:bottom;'
					}).appendTo(divtext);
				}
			}
			else
			{
				var spanreadcount = $("<span>",{
					class:'read_count',
					style:'float:initial;margin:5px 5px 0px 5px;color:#d0c0c0;vertical-align:bottom;'
				}).appendTo(divtext);
			}
			if (thisUid == obj.USER_UID){
				divbubble = $("<div>",{
					class:'bubble'
				}).appendTo(divtext);
			}
			
			var a = $("<a>",{
				target:"_blank",
				href:CTX+'/common/file/DwnlMsgFile.ajax?MSG_UID='+obj.MSG_UID,
				text:obj.FILE_ORI_NM
			}).appendTo(divbubble);
			
			var i = $("<i>",{
				class:'fa fa-paperclip',
				'aria-hidden':"true"
			}).appendTo(a);
			var br = $("<br>").appendTo(divtext);
			var span = $("<span>", {
				text:sent_time
			}).appendTo(divtext);
			
//			divMsg
//					.append('<div class="bubble"><a target="_blank" href="/common/file/DwnlMsgFile.ajax?MSG_UID='
//							+ obj.MSG_UID
//							+ '"><i class="fa fa-paperclip" aria-hidden="true"></i>'
//							+ obj.FILE_ORI_NM
//							+ '</a><div class="corner"></div><span>'
//							+ sent_time + '</span> </div>'
//							+(obj.READ_MEMBERS != null?
//								(
//									($('#profile2').attr('user_count')-obj.READ_MEMBERS.split(',').length)>0?
//											('<span class="read_count" style="float:initial;margin: 5px 5px 0px 5px; color:#d0c0c0;vertical-align:bottom;">'
//													+($('#profile2').attr('user_count')-obj.READ_MEMBERS.split(',').length)
//													+'</span>'):''
//								)
//								:'<span class="read_count" style="float:initial;margin: 5px 5px 0px 5px; color:#d0c0c0;"></span>')	
//							);
		}

	} // end file, history file
	else {
		var stringMSG = CryptoJS.AES.decrypt(obj.MSG_CONT, AESKey).toString(
				CryptoJS.enc.Utf8);

		stringMSG = stringMSG.replace(/</g, '< ').replace(/>/g, ' >');
		
		var divtext = $("<div>",{
			class:'text'
		}).appendTo(divMsg);
		
		var divbubble = null;
		
		if (thisUid != obj.USER_UID){
			divbubble = $("<div>",{
				class:'bubble',
				text:" " + stringMSG
			}).appendTo(divtext);
		}
		
		if(obj.READ_MEMBERS != null)
		{
			if(($("#profile2").attr('user_count')-obj.READ_MEMBERS.split(',').length)>0)
			{
				var spanreadcount = $("<span>",{
					class:'read_count',
					style:'float:initial;margin:5px 5px 0px 5px;color:#d0c0c0;vertical-align:bottom;',
					text:$('#profile2').attr('user_count')-obj.READ_MEMBERS.split(',').length
				}).appendTo(divtext);
			}
			else
			{
				var spanreadcount = $("<span>",{
					class:'read_count',
					style:'float:initial;margin:5px 5px 0px 5px;color:#d0c0c0;vertical-align:bottom;'
				}).appendTo(divtext);
			}
		}
		else
		{
			var spanreadcount = $("<span>",{
				class:'read_count',
				style:'float:initial;margin:5px 5px 0px 5px;color:#d0c0c0;vertical-align:bottom;'
			}).appendTo(divtext);
		}
		
		if (thisUid == obj.USER_UID){
			divbubble = $("<div>",{
				class:'bubble',
				text:" " + stringMSG
			}).appendTo(divtext);
		}
		
		var br = $("<br>").appendTo(divtext);
		var span = $("<span>", {
			text:sent_time
		}).appendTo(divtext);
		
//		divMsg.append('<div class="bubble">' + " " + stringMSG
//				+ '<div class="corner"></div><span>' + sent_time
//				+ '</span> </div>'
//				+(obj.READ_MEMBERS != null?
//					(
//						($('#profile2').attr('user_count')-obj.READ_MEMBERS.split(',').length)>0?
//						('<span class="read_count" style="float:initial;margin: 5px 5px 0px 5px; color:#d0c0c0;">'
//								+($('#profile2').attr('user_count')-obj.READ_MEMBERS.split(',').length)
//								+'</span>'):''
//					)
//					:'<span class="read_count" style="float:initial;margin: 5px 5px 0px 5px; color:#d0c0c0;"></span>')
//				);
	}
	
	if (thisUid == obj.USER_UID) {
	divMsg.append('<img class="msg_profile" title="' + displayName + '" src="'
			+ srcImg + '" />');
	}
	
	divMsg.attr('IS_READ', obj.RYN);
	if (obj.READ_MEMBERS == null || obj.READ_MEMBERS == undefined) {
		obj.READ_MEMBERS = displayName;
		if (thisUid != obj.USER_UID) {
			obj.READ_MEMBERS += ", " + getUserName();
		}
	}

	divMsg.attr('title', ' Readers: ' + obj.READ_MEMBERS);

	divMsg.attr('MSG_UID', obj.MSG_UID);

	divMsg.find(".msg_profile").error(function() {
		$(this).attr('src', CTX + '/images/wsc/avatar-default1.png')
	});
}

function createRoomListItem(obj) {
	var imgSrc = jsCtxPath
			+ (obj.IMG_PARTNER != '' ? ('/' + obj.IMG_PARTNER)
					: '/images/wsc/grp.png');
	if (obj.ROOM_TYPE == 'IN_CHATROOM') {
		if (obj.ROOM_IMG && obj.ROOM_IMG.length > 0)
			imgSrc = jsCtxPath + '/' + obj.ROOM_IMG;
	}

	var room_nm = obj.ROOM_DEFAULT_NAME || 'Untitled name';
	if (obj.ROOM_TYPE == 'IN_CONTACT') {
		if (obj.NAME_PARTNER) {
			room_nm = obj.NAME_PARTNER;
		} else {
			if (getUserUid() == obj.USER_UID) {
				room_nm = obj.USER_NM;
			} else {
				room_nm = obj.USER2_NM;
			}
		}

	}

	var room_key = rsa.decrypt(obj.KEY_ROOM);
	// if (room_nm.length > 21)
	// room_nm = room_nm.substring(0, 20);
	var li = $('<li />');
	li.attr('title', room_nm);
	var div = $('<div class="room" />');
	div.attr('title', new Date(obj.MODI_DATE));
	div.click(function() {
	    
	    if(event.which == 2 || event.which == 3 ){
            return;
        }
        visibleChatList();

		if ($('#rooms div.select-room')) {
			if ($('#rooms div.select-room').attr("room_uid") == $(this).attr(
					"room_uid")) {
				// same room
				return;
			}
		}

		$("#dlg_create_room").hide();
		$('#loading_animation').show();

		var checkRemoveIcon = $('#profile-userinfo').find('.icon-remove-sign');
		if (checkRemoveIcon)
			checkRemoveIcon.click();
		// room in the right
		obj.ROOM_NM = room_nm;
		room_in_right(obj);
		if (obj.ROOM_TYPE == 'IN_CONTACT') {
			// diable_out_invt_btn();
		}

		// setting show/hide
		$('#settingView').hide();
		$('#group-chat-msg-send-msg').css('display', '');

		$("#USER_UID2").val(getUserUid());
		$("#ROOM_UID2").val(obj.ROOM_UID);

		if (obj.ROOM_TYPE == 'IN_CHATROOM') {
			$('.profile-floatingImg').attr('is_chat_room', 'Y');
		} else {
			$('.profile-floatingImg').attr('is_chat_room', 'N');
		}

		$('.profile-floatingImg').attr('title', 'CHANGE IMAGE ');
		$('#dep\\.ROOM_UID').val(obj.ROOM_UID);
		$('.profile-floatingImg').attr('src', imgSrc);

		var img = $('.profile-floatingImg');
		img.error(function() {

			if (obj.ROOM_TYPE == 'IN_CHATROOM') {
				img.attr('src', CTX + '/images/wsc/grp.png');
			} else {
				img.attr('src', CTX + '/images/wsc/avatar-default1.png');
			}
		});

		$('div.room').removeClass('select-room');
		$(this).addClass('select-room');

		$(this).find('span[room-notify]').remove();
		if ($('span[room-notify]').length == 0) {
			if ($('i.fa-comments').attr('notify-user-check') == 'y') {
				$('i.fa-comments').css('color', ''); //
				$('i.fa-comments').attr('notify-user-check', '');
			}
		}

		$('.main_roomCountMember').empty().append(
				obj.ROOM_COUNT_MEMBER + ' participants');
		$('.main_roomInfo').empty().html(room_nm);
		var in_contact = 'n';
		if (obj.ROOM_TYPE == 'IN_CONTACT')
			in_contact = 'y';
		$('.main_roomInfo').attr('is_in_contact', in_contact);

		$('.main_roomInfo').attr('room_uid', obj.ROOM_UID);

		// SEND ROOM VIEW:
		// console.log('recieve.ROOM_VIEW');
		// wschat.send.ROOM_VIEW(obj);
		g_currentPage = '0';
		document.title = titleDef;
		var obj2 = {
			ROOM_UID : obj.ROOM_UID,
			START_INDEX : g_currentPage,
//			GROUP_KEY : room_key
		};
		wschat.send.CHAT_LIST(obj2);
		$('#txtMsg').val('');
        $('.emojionearea-editor').text('');
	}); // end div click

	div.append('<img src="' + imgSrc + '" >');

	// console.log(room_key);
	var last_msg = obj.LAST_MSG;

	if (room_key !== null && last_msg != null && last_msg != undefined
			&& last_msg != "") {
		try {
			last_msg = CryptoJS.AES.decrypt(obj.LAST_MSG, room_key).toString(
					CryptoJS.enc.Utf8);
		} catch (err) {
			console.log(err);
		}
		last_msg = last_msg.replace(/</g, '< ').replace(/>/g, ' >');
	} else {
		last_msg = "";
	}
	// if (!last_msg)
	// last_msg = "";

	div
			.append('<div style="height: auto; display: inline-block;    width: calc(100% - 140px); overflow-x: hidden;"><div style="overflow: hidden;white-space: nowrap;margin-top: 10px; ">'
					+ '<p><strong style="position: absolute; font-size:16px; color:#597a96" chat_user_room_nm="'
					+ room_nm
					+ '">'
					+ room_nm
					+ '</strong>'
					+ (obj.ROOM_TYPE == 'IN_CHATROOM'?'<span class="room_user_count" style="display:initial; margin-left:3px; font-weight bold;">'+obj.USER_COUNT+'</span>':'')
					+ '</p>'
					+'</div><div style="overflow: hidden;white-space: nowrap;margin-top: 5px;"><a style="font-size:14px; color: #a0a0a0">'
					+ (last_msg || '') + ' </a></div></div>'
					);

	if (obj.AMOUNT_UNREAD && obj.AMOUNT_UNREAD > 0) {
		div
				.append('<span room-notify style="float: right;    margin: 30px 15px 10px 10px;" class="fa-stack has-badge" data-count="'
						+ obj.AMOUNT_UNREAD + '"></span>');

		$('i.fa-comments').attr('notify-user-check', 'y');
	} else if (obj.ROOM_OPEN_CHECK == 'N') {
		div
				.append('<span room-notify style="float: right;    margin: 30px 15px 10px 10px;" class="fa-stack has-badge" data-count="*"></span>');
		$('i.fa-comments').attr('notify-user-check', 'y');
	}

	div.data('roomObj', obj);
	div.attr('room_uid', obj.ROOM_UID);
	div.attr('chat_room_uid', obj.ROOM_UID);
	$('#rooms').data('' + obj.ROOM_UID, obj);
	li.append(div);
	return li;
}

function changeRoomName(ROOM_UID, ROOM_NM, CUR_ROOM_UID) {
	if (ROOM_UID == CUR_ROOM_UID) {
		$('#profile-userinfo .main_roomInfo').text(ROOM_NM);
		$("#info-room-nm").text(ROOM_NM + " ");
	}
	// var divRoom = $("#rooms div.room[room_uid='" + CUR_ROOM_UID +"']");
	var roomNMElm = $("#rooms div.room[room_uid='" + CUR_ROOM_UID
			+ "'] > div strong");
	if (roomNMElm) {
		roomNMElm.text(ROOM_NM);
		roomNMElm.attr("chat_user_room_nm", ROOM_NM);
	}
}

function validImageUrl(url, urlReplace) {
	$("<img>", {
		src : url,
		error : function() {
			return urlReplace;
		}
	});

	return url;

}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}


function setContextMenuContact(){

        $(contextMenuStranger = function() {
            $.contextMenu({
                selector : '.stranger',
                callback : function(key, options) {
                    var m = "clicked: " + key;
                    window.console && console.log(m) || alert(m);
                },
                items : {

//                    "view_profile" : {
//                        name : "View profile",
//                        icon : "paste",
//                        callback : function(key, opt) {
//                            wschat.send.MEMBER_VIEW(opt.$trigger.attr('id'));
//                            friendInfoLeft = true;
//                        }
//                    },
                    "Add friend" : {
                        name : "Add friend",
                        icon : "add",
                        callback : function(key, opt) {
//                            wschat.send.MEMBER_VIEW(opt.$trigger.attr('id'));
//                            friendInfoLeft = true;
                            debugger;
                            $('#dlg_message_add').css("display", "inline");
                            var user_id_2 = opt.$trigger.attr('id');
                            $('#user_id_2').val(user_id_2);
                            // 
                            $('#title_dialog_add').empty();

                            $('#title_dialog_add').append(
                                    'Say something to ' + user_id_2);
                            $('#btn_cancel_add').click(function() {
                                $('#dlg_message_add').css("display", "none");
                            });
                            $('#btn_msg_add').click(function() {

                                wschat.send.FRIEND_INVITE($('#msg_add').val());
                                $('#msg_add').val("");
                                $('#dlg_message_add').css("display", "none");
                            });
                            
                            $('#dlg_message_add').css("display", "block");
                        }
                    },
//                    "delete" : {
//                        name : "Delete friend",
//                        icon : "delete",
//                        callback : function(key, opt) {
//                            if(confirm("Do you really want delete this friend?")) {
//                                wschat.send.FRIEND_DELETE(opt.$trigger.attr('id')); 
//                            }
//                        }
//                    },

//                    "quit1" : {
//                        name : "Cancel",
//                        callback : function() {
//                            $('.context-menu-icon.context-menu-icon-quit').hide();
//                            
//                            return true;
//                        }
//                    }
                },
                position : function(opt, x, y) {
                    //              opt.$menu.position({
                    //                  my : 'center right',
                    //                  at : 'center right',
                    //                  of : opt.$trigger

                    //              });
                    opt.$trigger.click();

                    var posX = currentMousePos.x.toString() + "px";
                    var posY = currentMousePos.y.toString() + "px"
                    opt.$menu.css({
                        "position" : "absolute",
                        "left" : posX,
                        "top" : posY
                    });

                },

            });
            

        });


        $(ctxMenuFriend = function() {
            $.contextMenu({
                selector : '.friend.normal',
                callback : function(key, options) {
                    var m = "clicked: " + key;
                    window.console && console.log(m) || alert(m);
                },
                items : {

//                    "view_profile" : {
//                        name : "View profile",
//                        icon : "paste",
//                        callback : function(key, opt) {
//                            wschat.send.MEMBER_VIEW(opt.$trigger.attr('id'));
//                            friendInfoLeft = true;
//                        }
//                    },
//                    "Add friend" : {
//                        name : "Add friend",
//                        icon : "add",
//                        callback : function(key, opt) {
////                            wschat.send.MEMBER_VIEW(opt.$trigger.attr('id'));
////                            friendInfoLeft = true;
//                        }
//                    },
                    
                    "favorite" : {
                        name : "Favorite",
                        callback : function(key, opt) {
                            console.log(opt);
                            var USER_UID_FRIEND = opt.$trigger.attr('id');
//                                $('#dlg_view_profile_friend').find('#lb_user_uid_friend').val();
                            wschat.send.FRIEND_ADD_FAVORITE(USER_UID_FRIEND);

//                            if ($("#lb_is_fv").val() == 'Y') {
//                                wschat.send.FRIEND_DELETE_FAVORITE(USER_UID_FRIEND);
//                            } else if ($("#lb_is_fv").val() == 'N') {
//                            }
                        }
                    },
                    
                    "delete" : {
                        name : "Delete friend",
                        icon : "delete",
                        callback : function(key, opt) {
                            if(confirm("Do you really want delete this friend?")) {
                                wschat.send.FRIEND_DELETE(opt.$trigger.attr('id')); 
                            }
                        }
                    },

//                    "quit" : {
//                        name : "Cancel",
//                        callback : function() {
//                            $('.context-menu-icon.context-menu-icon-quit').hide();    
//                            return true;                        
//                        }
//                    }
                },
                position : function(opt, x, y) {
                    //              opt.$menu.position({
                    //                  my : 'center right',
                    //                  at : 'center right',
                    //                  of : opt.$trigger

                    //              });
                    opt.$trigger.click();

                    var posX = currentMousePos.x.toString() + "px";
                    var posY = currentMousePos.y.toString() + "px"
                    opt.$menu.css({
                        "position" : "absolute",
                        "left" : posX,
                        "top" : posY
                    });

                },

            });
         });
        
        $(ctxMenuFriend = function() {
            $.contextMenu({
                selector : '.friend.favorite',
                callback : function(key, options) {
                    var m = "clicked: " + key;
                    window.console && console.log(m) || alert(m);
                },
                items : {

//                    "view_profile" : {
//                        name : "View profile",
//                        icon : "paste",
//                        callback : function(key, opt) {
//                            wschat.send.MEMBER_VIEW(opt.$trigger.attr('id'));
//                            friendInfoLeft = true;
//                        }
//                    },
//                    "Add friend" : {
//                        name : "Add friend",
//                        icon : "add",
//                        callback : function(key, opt) {
////                            wschat.send.MEMBER_VIEW(opt.$trigger.attr('id'));
////                            friendInfoLeft = true;
//                        }
//                    },
                    
                    "unfavorite" : {
                        name : "Unfavorite",
                        callback : function(key, opt) {
                            var USER_UID_FRIEND = opt.$trigger.attr('id');
//                                $('#dlg_view_profile_friend').find('#lb_user_uid_friend').val();
                            wschat.send.FRIEND_DELETE_FAVORITE(USER_UID_FRIEND);
                        }
                    },
                    
                    "delete" : {
                        name : "Delete friend",
                        icon : "delete",
                        callback : function(key, opt) {
                            if(confirm("Do you really want delete this friend?")) {
                                wschat.send.FRIEND_DELETE(opt.$trigger.attr('id')); 
                            }
                        }
                    },

//                    "quit" : {
//                        name : "Cancel",
//                        callback : function() {
//                            $('.context-menu-icon.context-menu-icon-quit').hide();    
//                            return true;                        
//                        }
//                    }
                },
                position : function(opt, x, y) {
                    //              opt.$menu.position({
                    //                  my : 'center right',
                    //                  at : 'center right',
                    //                  of : opt.$trigger

                    //              });
                    opt.$trigger.click();

                    var posX = currentMousePos.x.toString() + "px";
                    var posY = currentMousePos.y.toString() + "px"
                    opt.$menu.css({
                        "position" : "absolute",
                        "left" : posX,
                        "top" : posY
                    });

                },

            });
         });
}

function setContextMenuRoom(){
    $(ctxMenuFriend = function() {
        $.contextMenu({
            selector : '.room',
            callback : function(key, options) {
                var m = "clicked: " + key;
                window.console && console.log(m) || alert(m);
            },
            items : {

//                "view_profile" : {
//                    name : "View profile",
//                    icon : "paste",
//                    callback : function(key, opt) {
//                        wschat.send.MEMBER_VIEW(opt.$trigger.attr('id'));
//                        friendInfoLeft = true;
//                    }
//                },
//                "Add friend" : {
//                    name : "Add friend",
//                    icon : "add",
//                    callback : function(key, opt) {
////                        wschat.send.MEMBER_VIEW(opt.$trigger.attr('id'));
////                        friendInfoLeft = true;
//                    }
//                },
                
                "leave" : {
                    name : "Out room",
                    callback : function(key, opt) {
                        var ROOM_UID = opt.$trigger.attr('room_uid');
//                            $('#dlg_view_profile_friend').find('#lb_user_uid_friend').val();
//                        wschat.send.FRIEND_DELETE_FAVORITE(USER_UID_FRIEND);
                        
                        if (confirm("Would you like to log out of the chat room ?") == true) {
                            var room_out = message_type.ROOM_OUT;
                            room_out.USER_UID = getUserUid();
                            room_out.PAYLOAD.ROOM_UID = ROOM_UID;
                            room_out.PAYLOAD.USER_UID = getUserUid();// logout
                            // myseft
                            chatSock.send(JSON.stringify(room_out));
//                            clearChatWindow();
//                            hide_room_right();
                            wschat.send.ROOM_LIST();
                        } else {
                            return;
                        }
                    }
                },
                
//                "delete" : {
//                    name : "Delete friend",
//                    icon : "delete",
//                    callback : function(key, opt) {
//                        if(confirm("Do you really want delete this friend?")) {
//                            wschat.send.FRIEND_DELETE(opt.$trigger.attr('id')); 
//                        }
//                    }
//                },

                "quit" : {
                    name : "Cancel",
                    callback : function() {
                        $('.context-menu-icon.context-menu-icon-quit').hide();    
                        return true;                        
                    }
                }
            },
            position : function(opt, x, y) {
                //              opt.$menu.position({
                //                  my : 'center right',
                //                  at : 'center right',
                //                  of : opt.$trigger

                //              });
                opt.$trigger.click();

                var posX = currentMousePos.x.toString() + "px";
                var posY = currentMousePos.y.toString() + "px"
                opt.$menu.css({
                    "position" : "absolute",
                    "left" : posX,
                    "top" : posY
                });

            },

        });
     });
}