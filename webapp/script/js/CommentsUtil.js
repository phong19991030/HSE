var FLAG = '';
var gNoticeCode = '';
var selfUid = '';
var items = [];

function getData(postId, noticeCode, user_uid) {
	var url = CTX + '/common/common/comment/getCommentList.ajax';
	gNoticeCode = noticeCode;

	selfUid = user_uid;
	$.ajax({
		url : url,// CTX+ url, )
		data : {
			"NOTICE_CODE" : noticeCode,
			"POST_ID" : postId
		},
		cache : false,
		success : function(data, textStatus, jqXHR) {
			// $target.dialog({width:'auto'})
			buildTree(data, user_uid);
			
			items.length = 0;  // clear this array
			data.forEach(function(obj, index) {
				items.push(new ElapsedTime('elapsedTime' + index, new Date(obj['POST_DATE'].time)));
			});
			elapsedTime(items);
		}
	});
}

function buildTree(data, user_uid) {
//	debugger;
	if (!data || data.length < 1) {
		return;
	}
	// var USER_UID = '${sessionScope.SESS_USER.USER_UID }';
	// console.log(${sessionScope.SESS_USER});
	var deleteLbl = 'Delete';
	var editLbl = 'Edit';
	var commentArea = $('#commentArea');
	var parentId = '';
	
	
	data.forEach(function(object, index) {

				var strActions = '<span class="action_btn ac_click" onClick="onReplyComment(event)"><i class="fa fa-reply"></i>Reply</span>';
				if (user_uid == object['WRITER']) {
					strActions += '<span class="action_btn ac_click" onClick="onUpdateComment(event)"><i class="fa fa-pencil"></i>' + editLbl + '</span>'
								+ '<span class="action_btn ac_click" onClick="onDeleteComment(event)"><i class="fa fa-trash"></i>' + deleteLbl + '</span>';
				}
				;

				if (object['LEV'] == 1) {
					var commentItem = '<div class="commentItem item" comment-id="#comment_id" level="#lvl">'
									+ '    <div class="comment bubble ">'
									+ '        <div class="writer" title="#display_name" user-uid="#writer"> <img src="#img"></div>'
									+ '        <div class="content"><a class="writerTag">#display_name</a>'+unEntity(object['CONTENT'])+'</div>'
									+ '        <div class="action_area">' + strActions
									+ '            <span class="time_cmt" title="' + new Date(object['POST_DATE'].time).toString() + '"><i class="fa fa-clock-o"></i><span id="elapsedTime' + index + '"></span></span>'
									+ '        </div>'
									+ '    </div>'
									+ '    <div class="replyArea"></div>'
									+ '</div>';
					commentItem = commentItem.replaceAll('#comment_id', object['COMMENT_ID'])
					.replaceAll('#writer',	object['WRITER'])
					.replaceAll('#lvl',	object['LEV'])
					.replaceAll('#img',	object['AVATAR_IMG'])
//					.replaceAll('#content',	unEntity(object['CONTENT']))
					//.replaceAll('#time', object['POST_DATE'])
					.replaceAll('#display_name', object['DISPLAY_NAME']);
					$('#commentArea').append(commentItem);
					parentId =  object['COMMENT_ID'];
				}else{
					var replyItem = '<div class="replyItem item" comment-id="#comment_id" level="#lvl">'
								  + '    <div class="reply bubble ">'
								  + '        <div class="writer" title="#display_name" user-uid="#writer"> <img src="#img"></div>'
								  + '        <div class="content"><a class="writerTag">#display_name</a>'+unEntity(object['CONTENT'])+'</div>'
								  + '        <div class="action_area">' + strActions
								  + '            <span class="time_cmt" title="' + new Date(object['POST_DATE'].time).toString() + '"><i class="fa fa-clock-o"></i><span id="elapsedTime' + index + '"></span></span>'
								  + '        </div>' 
								  + '    </div>'
								  + '</div>';
					replyItem = replyItem.replaceAll('#comment_id',	object['COMMENT_ID'])
					.replaceAll('#lvl',object['LEV'])
					.replaceAll('#writer',	object['WRITER'])
					.replaceAll('#img',object['AVATAR_IMG'])
	//				.replaceAll('#content', unEntity(object['CONTENT']))
					//.replaceAll('#time',object['POST_DATE'])
					.replaceAll('#display_name',object['DISPLAY_NAME']);
					commentArea.find('.commentItem[comment-id="' + parentId	+ '"] div.replyArea').append(replyItem);
				}
				
				
			});

//	data.forEach(function(object, index) {
//
//				var strActions = '	<span class="action_btn ac_click "  onClick="onReplyComment(event)"><i class="fa fa-reply"></i>Reply</span>';
//				if (user_uid == object['WRITER']) {
//					strActions += '			<span class="action_btn ac_click" onClick="onUpdateComment(event)"><i class="fa fa-pencil"></i>'
//							+ editLbl
//							+ '</span>'
//							+ '			<span class="action_btn ac_click" onClick="onDeleteComment(event)"><i class="fa fa-trash"></i>'
//							+ deleteLbl + '</span>';
//				};
//
//				if (object['LEV'] != 1) {
//					var replyItem = '	<div class="replyItem item" comment-id="#comment_id" level="#lvl">'
//							+ '		<div class="reply bubble ">'
//							+ '			<div class="writer" title="#display_name"> <img src="#img">'
//							+ '			</div> <div class="content"><a class="writerTag">#display_name</a>'+unEntity(object['CONTENT'])+'</div>'
//							+ '		</div>'
//							+ '		<div class="action_area">'
//							+ strActions
//							+ '			<span class="time_cmt"><i class="fa fa-clock-o"></i>#time</span>'
//							+ '		</div>' + '	</div>';
//					replyItem = replyItem.replaceAll('#comment_id',	object['COMMENT_ID'])
//					.replaceAll('#lvl',object['LEV'])
//					.replaceAll('#img',object['AVATAR_IMG'])
////					.replaceAll('#content', unEntity(object['CONTENT']))
//					.replaceAll('#time',object['POST_DATE'])
//					.replaceAll('#display_name',object['DISPLAY_NAME']);
//					commentArea.find('.commentItem[comment-id="' + object['PARENT_ID']	+ '"] div.replyArea').append(replyItem);
//				}
//			});
	commentArea.find('.writer img').each(function(index, object) {
		$(object).error(function() {
			$(this).attr("src", "../../images/wsc/avatar-default-square.png");
		})
	});

}

function onReplyComment(o) {
//	debugger;

	var editor = '<div id="textCommentArea">'
			+ '<div style="display: inline-block; width: 90%;    margin-left: 20px;">'
			+ '<textarea  id="COMMENT_CONT" rows="4" aria-label="editor"></textarea>'

			+ '</div>'
			+ '<div style="    display: inline-block;    width: 5%;    margin-left: 10px;    margin-top: 10px;    position: absolute;">'
			+ '	<button class="btn ac_click" onClick="onSave()"><i class="fa fa-paper-plane"></i></button>'

			+ '<button style="  margin-top: 2px;    background: white;    color: #a9a9a9;    border: solid 1px #c1c1c1;" class="btn ac_click"><i class="fa fa-times"  onClick="onCancel()"></i></button>'
			+ '</div>' 
			+ '<input hidden id="parentId">' 
			+ '<input hidden id="replyTo">' 

			+ '</div>';
	$('#textCommentArea').remove();
//	$(editor).insertAfter($(o.target).closest('.item'));
//	$(editor).insertAfter("#commentArea");
	var level = $(o.target).closest('.item').attr('level');
//	  $("#COMMENT_CONT").kendoEditor({
//          resizable: {
//              content: true,
//              toolbar: true
//          }
//      });

	
	if($(o.target).parents('.item').length > 0){
			$(o.target).closest('.commentItem').find('.replyArea').append(editor);
			$('#parentId').val($(o.target).closest('.item').attr('comment-id'));
			$('#a2m_dialog0').animate({
				scrollTop : $('#textCommentArea')[0].offsetTop -  $('#a2m_dialog0')[0].offsetHeight/2
			}, 'slow');
	}else{
		$('#commentArea').append(editor);
		$('#a2m_dialog0').animate({
		scrollTop : $('#textCommentArea')[0].offsetTop - $('#a2m_dialog0')[0].offsetHeight/2
	}, 'slow');
	}
	
	var writerUid = $(o.target).closest('.item').find('.writer').attr('user-uid');
	if(level != 1 && (writerUid != undefined && selfUid != writerUid.toString())){
		var replyTo = $(o.target).closest('.item').find('.writer').attr('title');
		$('#replyTo').val(replyTo);
//		tag = '<p style="    font-weight: bolder;		    color: #273eb7;	    background: #dfe6ff;	    width: fit-content;">'+tag+'</p><p></p>';
//		$('#COMMENT_CONT').data("kendoEditor").value(tag);
	}
	
	FLAG = "C";
	// $('#a2m_dialog0').scrollTop($('#textCommentArea').offset().top);
	//	
	// $('#textCommentArea').focus();
//	$('#a2m_dialog0').animate({
//		scrollTop : $('#a2m_dialog0')[0].scrollHeight
//	}, 'slow');
//	$('#COMMENT_CONT').val('');
}

function onUpdateComment(o) {
//	debugger;
	var editor = '<div id="textCommentArea">'
			+ '<div style="display: inline-block; width: 90%;     margin-left: 20px;">'
			+ '<textarea  id="COMMENT_CONT" rows="4" aria-label="editor"></textarea>'

			+ '</div>'
			+ '<div style="    display: inline-block;    width: 5%;    margin-left: 10px;    margin-top: 10px;    position: absolute;">'
			+ '	<button class="btn ac_click" onClick="onSave()"><i class="fa fa-paper-plane"></i></button>'

			+ '<button style="   margin-top: 2px;    background: white;    color: #a9a9a9;    border: solid 1px #c1c1c1;" class="btn ac_click" onClick="onCancel()"><i class="fa fa-times"></i></button>'
			+ '</div>'
			// + '<input hidden id="parentId">'
			+ '<input hidden id="replyTo">' 
			+ '<input hidden id="commentId">' + '</div>';
	$('#textCommentArea').remove();
	$(editor).insertAfter($(o.target).closest('.item'));
	//	$(editor).insertAfter("#commentArea");
	var level = $(o.target).closest('.item').attr('level');
//	  $("#COMMENT_CONT").kendoEditor({
//        resizable: {
//            content: true,
//            toolbar: true
//        }
//    });
//	  
	

	$('#commentId').val($(o.target).closest('.item').attr('comment-id'));

	FLAG = "U";
	// $('#a2m_dialog0').scrollTop($('#textCommentArea').offset().top);
	//	
	// $('#textCommentArea').focus();
	$('#a2m_dialog0').animate({
		scrollTop : $('#textCommentArea')[0].offsetTop - $('#a2m_dialog0')[0].offsetHeight/2
	}, 'slow');
	
	var content = $(o.target).closest('.item').find('.content').html();
	var div = '<div>'+ content + '</div>';
	var content2 = getContent(content);
	if($(div).find('a.tag').length > 0){
		$('#replyTo').val($(div).find('a.tag').html());
	}
	
	
	
	$('#COMMENT_CONT').val(content2);


}

function onCancel() {
	FLAG = '';
	$('#textCommentArea').remove();
}

function onSave() {
//	debugger;
	var content = $('#COMMENT_CONT').val().trim();

	if (content == '')
		return;
	

	if (!FLAG) {
		return;
	}
	if (FLAG == 'C') {
		if($('#replyTo').val()){
			content = '<a class="tag">'+$('#replyTo').val()+'</a><a class="text_content">'+ content + '</a>';
		}else{
			content = '<a class="text_content">'+ content + '</a>'
		}
		
		var url = CTX + '/common/common/comment/addComment.ajax';
		var postId = $('#NOTICE_ID').val() ? $('#NOTICE_ID').val() : ($('#BOARD_ID').val() ? $('#BOARD_ID').val() : ($('#COMM_ID').val() ? $('#COMM_ID').val() : $('#LIST_ID').val()));
		var parentId = $('#parentId').val();

		$.ajax({
			url : url,// CTX+ url, )
			data : {
				'NOTICE_CODE' : gNoticeCode,
				'POST_ID' : postId, // required
				'PARENT_ID' : parentId, // option, maybe null or not set
				'CONTENT' : content, // required

			},
			cache : false,
			type: 'POST',

			success : function(data, textStatus, jqXHR) {
				if (data['status']) {
					var responseData = data['responseData'];
					//alert('OK');

					var elapsedId = 'elapsedTime' + items.length;  // create elapsed ID
					items.push(new ElapsedTime(elapsedId, new Date(responseData['POST_DATE'].time)));  // push new date to items
					
					var strActions = '<span class="action_btn ac_click "  onClick="onReplyComment(event)"><i class="fa fa-reply"></i>Reply</span>'
							+ '<span class="action_btn ac_click" onClick="onUpdateComment(event)"><i class="fa fa-pencil"></i>Edit</span>'
							+ '<span class="action_btn ac_click" onClick="onDeleteComment(event)"><i class="fa fa-trash"></i>Delete</span>';
					if(parentId){
						var replyItem = '<div class="replyItem item" comment-id="#comment_id" level="#lvl">'
									  + '		<div class="reply bubble ">'
									  + '			<div class="writer" title="#display_name" user-uid="#writer"> <img src="#img">'
									  + '			</div> <div class="content"><a class="writerTag">#display_name</a>'+content+'</div>'
									  + '		</div>'
									  + '		<div class="action_area">' + strActions
									  + '			<span class="time_cmt" title="' + new Date(responseData['POST_DATE'].time).toString() + '"><i class="fa fa-clock-o"></i><span id="' + elapsedId + '">Just now</span></span>'
									  + '		</div>' 
									  + '</div>';
					replyItem = replyItem.replaceAll('#comment_id',	responseData['COMMENT_ID'])
					.replaceAll('#writer',	responseData['WRITER'])
					.replaceAll('#lvl',	responseData['LEV'])
					.replaceAll('#img',	responseData['AVATAR_IMG'])
					//.replaceAll('#content',	unEntity(responseData['CONTENT']))
					//.replaceAll('#time',responseData['POST_DATE'])
					.replaceAll('#display_name', responseData['DISPLAY_NAME']);
					//$('#commentArea').find('.item[comment-id="'+parentId+'"]').find('.replyArea').append(replyItem);
					$('#commentArea').find('.item[comment-id="'+parentId+'"]').closest('.commentItem').find('.replyArea').append(replyItem);
					}else{
						var commentItem = '<div class="commentItem item" comment-id="#comment_id" level="#lvl">'
										+ '    <div class="comment bubble ">'
										+ '        <div class="writer" title="#display_name" user-uid="#writer"> <img src="#img"></div>'
										+ '        <div class="content"><a class="writerTag">#display_name</a>'+content+'</div>'
										+ '        <div class="action_area">' + strActions
										+ '            <span class="time_cmt" title="' + new Date(responseData['POST_DATE'].time).toString() + '"><i class="fa fa-clock-o"></i><span id="' + elapsedId + '">Just now</span></span>'
										+ '        </div>'
										+ '        <div class="replyArea"></div>'
									    + '    </div>'
										+ '</div>';
						commentItem = commentItem.replaceAll('#comment_id',	responseData['COMMENT_ID'])
						.replaceAll('#lvl', responseData['LEV'])
						.replaceAll('#writer',	responseData['WRITER'])
						.replaceAll('#img',	responseData['AVATAR_IMG'])
						//.replaceAll('#content', unEntity(responseData['CONTENT']))
						//.replaceAll('#time',	responseData['POST_DATE'])
						.replaceAll('#display_name',responseData['DISPLAY_NAME']);
						
						$('#commentArea').append(commentItem);
					}
					
					$('#a2m_dialog0').animate({
						scrollTop : $('.item[comment-id="'+responseData['COMMENT_ID']+'"]')[0].offsetTop - $('#a2m_dialog0')[0].offsetHeight/2
					}, 'slow');
					$('#commentArea').find('.writer img').each(function(index, object) {
						$(object).error(function() {
							$(this).attr("src", "../../images/wsc/avatar-default-square.png");
						})
					});
					$('#textCommentArea').remove();

				}
				// $target.dialog({width:'auto'})
			}
		});
	} else if (FLAG == 'U') {
		if($('#replyTo').val()){
			content = '<a class="tag">'+$('#replyTo').val()+'</a><a class="text_content">'+ content + '</a>';
		}else{
			content = '<a class="text_content">'+ content + '</a>'
		}
		
		var url = CTX + '/common/common/comment/updateComment.ajax';
//		var postId = $('#NOTICE_ID').val();
		var postId = $('#NOTICE_ID').val() ? $('#NOTICE_ID').val() : ($('#BOARD_ID').val() ? $('#BOARD_ID').val() : ($('#COMM_ID').val() ? $('#COMM_ID').val() : $('#LIST_ID').val()));
		var commentId = $('#commentId').val();

		$.ajax({
			url : url,// CTX+ url, )
			data : {
				'NOTICE_CODE' : gNoticeCode,
				'POST_ID' : postId, // required
				'COMMENT_ID' : commentId, // option, maybe null or not set
				'CONTENT' : content
			// required
			},
			cache : false,
			type: 'POST',

			success : function(data, textStatus, jqXHR) {
				// $target.dialog({width:'auto'})
				if (data['status']) {

//					alert('OK');

					var commentArea = $('#commentArea');
					var writer = commentArea.find('.item[comment-id="' + commentId + '"]').children('.bubble').find('.content').find('a.writerTag').html();
					commentArea.find('.item[comment-id="' + commentId + '"]').children('.bubble').find('.content').empty().append('<a class="writerTag">'+writer+'</a>'+content);
					$('#textCommentArea').remove();
					$('#a2m_dialog0').animate({
						scrollTop : $('.item[comment-id="' + commentId + '"]')[0].offsetTop - $('#a2m_dialog0')[0].offsetHeight/2
					}, 'slow');

				}

			}
		});
	} else {
		return;
	}

}

function onDeleteComment(o) {
//	debugger;
	if (confirm($('#lblConfirm').text())) {

		var commentId = $(o.target).parents('.item').attr('comment-id');
//		var postId = $('#NOTICE_ID').val();
		var postId = $('#NOTICE_ID').val() ? $('#NOTICE_ID').val() : ($('#BOARD_ID').val() ? $('#BOARD_ID').val() : ($('#COMM_ID').val() ? $('#COMM_ID').val() : $('#LIST_ID').val()));
		var level = $(o.target).parents('.item').attr('level');
		var parentId = null;
		var param = null;
		if (level != 1) {
			parentId = $(o.target).parents('.commentItem').attr('comment-id');
			param = {
				'NOTICE_CODE' : gNoticeCode,
				'POST_ID' : postId,
				'COMMENT_ID' : commentId,
				'PARENT_ID' : parentId
			}
		}else{
			param = {
					'NOTICE_CODE' : gNoticeCode,
					'POST_ID' : postId,
					'COMMENT_ID' : commentId
				}
		}


		var url = CTX + '/common/common/comment/deleteComment.ajax';

		$.ajax({
			url : url,
			data : param,
			cache : false,
			type: 'POST',
			success : function(data, textStatus, jqXHR) {
				// $target.dialog({width:'auto'})
				if (data['status']) {
//					alert('OK');
					var commentArea = $('#commentArea');
					
					var $spanElapsed = commentArea.find('.item[comment-id="' + commentId + '"]').find('span[id^="elapsedTime"]');
					var elapsedId = $spanElapsed.attr('id');
					if (elapsedId) {
						for (var i = 0, len = items.length; i < len; i++) {
							if (items[i].id == elapsedId) {
								items.splice(i, 1);
								break;
							}
						}
					}
					
					commentArea.find('.item[comment-id="' + commentId + '"]').remove();
				}

			}
		});
	}
}

function getContent(str){
	
return $(str).not('a.writerTag').not('a.tag').html();
	
}

function unEntity(str){
	   var temp = $("<textarea></textarea>").html(str).text();
	 return temp.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
	 
	}