<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<style>
	#mailContainer {
		padding: 10px;
	}

	#mailEditor {
		float: left;
		width: 60%;
		height: 100%;
	}
	
	#mailFileAttachments {
		float: right;
		border: 1px solid #DDD;
		width: 40%;
		height: 100%;
		padding: 5px;
		margin-top: 5px;
	}

	#mailEditor table tr,
	#mailEditor table td {
		border: none;
		padding: 5px 5px 5px 0;
	}

	#mailEditor input[type="text"],
	#mailFileAttachments input[type="file"]
	#mailEditor textarea {
		width: 100%;
	}
	
	#mailEditor input[type="text"],
	#mailFileAttachments input[type="file"] {
		border: none;
		border-radius: 0px !important;
		outline: none;
	}
	
	#mailFileAttachments form {
		width: 100% !important;
		margin: 0 !important;
		padding: 0 !important;
	}
	
	#mailFileAttachments input[type="file"] {
		width: 100% !important;
	}
	
	#mailContainer .btn {
		border: 1px solid #DDD !important;
		background-color: #EEE !important;
		font-size: 12px !important;
		margin: 5px 0;
		padding: 3px 3px 5px 3px !important;
	}
	
	#mailContainer #btnSend {
		padding: 5px 20px;
	}
	
	#mailContainer #btnUpload {
		margin-top: 5px;
	}
	
	.sendLoading {
		width: 100%;
		height: 100%;
		position: absolute;
		background: #000;
		top: 0;
		left: 0;
		z-index: 99999;
		cursor: not-allowed;
		opacity: 0.4;
		display: none;
	}
	
	.contentLoading {
		margin: 50px auto;
		z-index: 9999999;
		position: relative;
		background: #FFF;
		width: 200px;
		opacity: 1;
	}
	
	.contentLoading img {
		width: 50px;
		height: 36px;
	}
	
	#dialogPassword {
		padding: 10px !important;
	}
</style>
<script type="text/javascript">
	function initEditor() {
		$("#mailContent").css({
			height: 400
		});
		
	    $("#mailContent").kendoEditor({
	    	tools: [
	            "bold",
	            "italic",
	            "underline",
	            "strikethrough",
	            "justifyLeft",
	            "justifyCenter",
	            "justifyRight",
	            "justifyFull",
	            "insertUnorderedList",
	            "insertOrderedList",
	            "indent",
	            "outdent",
	            "createLink",
	            "unlink",
	            "insertImage",
	            "insertFile",
	            "subscript",
	            "superscript",
	            "tableWizard",
	            "createTable",
	            "addRowAbove",
	            "addRowBelow",
	            "addColumnLeft",
	            "addColumnRight",
	            "deleteRow",
	            "deleteColumn",
	            "viewHtml",
	            "formatting",
	            "cleanFormatting",
	            {
	                name: "fontName",
	                items: [
	                    { text: "Arial Unicode MS", value: "Arial Unicode MS" }
	                ]
	            },
	            		          
	            "fontSize",
	            "foreColor",
	            "backColor",
	            "print",
	            {
	                name: "custom",
	                tooltip: "Insert a horizontal rule",
	                exec: function(e) {
	                    var editor = $(this).data("kendoEditor");
	                    editor.exec("inserthtml", { value: "<hr>" });
	                }
	            }
	        ]
	    });
	}
	
	var a2mNormalFileAttachment = null;
	
	$(document).ready(function(e) {
		initEditor();

		var contextPath = '${pageContext.request.contextPath}';
		var a2mUploadBuilder = new FileAttachmentBuilder('#filesAttachment', contextPath);
		a2mNormalFileAttachment = a2mUploadBuilder.build();
	});
</script>
<div id="mailContainer">
	<h1>New mail</h1>
	<br>
	<div id="mailEditor">
		<table>
			<colgroup>
				<col style="width: 10%;">
				<col style="width: 90%;">
			</colgroup>
			<tr>
				<td>To</td>
				<td>
					<input type="text" name="recipient">
				</td>
			</tr>
			<tr>
				<td>Cc</td>
				<td>
					<input type="text" name="cc">
				</td>
			</tr>
			<tr>
				<td>Bcc</td>
				<td>
					<input type="text" name="bcc">
				</td>
			</tr>
			<tr>
				<td>Subject</td>
				<td>
					<input type="text" name="subject">
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<textarea id="mailContent" aria-label="editor" name="mailContent"></textarea>
				</td>
			</tr>
		</table>
	</div>
	<div id="mailFileAttachments">
		<div style="margin-bottom: 20px;">Files attachment</div>
		<div id="container" class="attach_content">
			<%-- <form method="POST" action="${pageContext.request.contextPath }/common/mail/uploadAttachments" enctype="multipart/form-data">
	            <input type="file" name="fileUpload" size="50">
	            <input type="file" name="fileUpload" size="50">
	            <input id="btnUpload" type="submit" value="Upload">
			</form> --%>
			<label><spring:message code="title.attach.file.normal" /></label>
			<div id="filesAttachment" style="width:100%;"></div>
		</div>
		<br>
		<div style="color: red;">* Total size can be attached must be small less than ${DATA }MB</div>
		<div style="color: orange;">* Note: add files and click "Attached" button below before send email to attached files.</div>
		<div>
			<input id="btnUpload" type="button" value="Attached">
		</div>
	</div>
	<div style="clear: both;"></div>
	<br>
	<div>
		<input id="btnSend" type="button" value="Send">
	</div>
	<div id="dialogPassword" style="display: none;">
		<div><b>Confirm your email password</b></div>
		<br>
		<input type="password" name="passwd">
	</div>
</div>
<div class="sendLoading">
	<div class="contentLoading">
		<table>
			<tr>
				<td width="50"><img alt="" src="${pageContext.request.contextPath }/images/Loading_icon.gif"></td>
				<td align="left">Sending...</td>
			</tr>
		</table>
	</div>
</div>
<script type="text/javascript">
var filesSend = [];
var mailAttachments = null;
var sendAjax = false;
var maxSizeUpload = '${DATA}';
var patternBlank = /^\s*$/;

/* var dialog = $('#dialogPassword').dialog({
    autoOpen: false,
    height: 180,
    width: 250,
    modal: true,
    buttons: {
      Confirm: function() {
    	  if (!$('input[name="passwd"]').val()) {
    		  alert('Please enter your email password!');
    		  $('input[name="passwd"]').focus();
    		  return false;
    	  }
    	  
    	  sendAjax = false;
    	  
    	  if (validateForm()) {
    		  sendAjax = true;
    		  dialog.dialog('close');
  		  }
      }
    },
    close: function() {
    	if (sendAjax) {
    		$.ajax({
    			type: 'POST',
    			url: CTX + '/common/mail/clientSendMail.ajax',
    			data: {
    				recipient: $('input[name="recipient"]').val().trim(),
    				cc: $('input[name="cc"]').val().trim(),
    				bcc: $('input[name="bcc"]').val().trim(),
    				subject: $('input[name="subject"]').val().trim(),
    				mailContent: $('textarea[name="mailContent"]').val(),
    				password: $('input[name="passwd"]').val().trim(),
    				filesToDelete: JSON.parse(JSON.stringify(mailAttachments)),
    				filesAttachment: JSON.parse(JSON.stringify(filesSend))
    			},
    			dataType: 'json',
    			cache: false,
    			beforeSend: function() {
    				$('.sendLoading').show();
    			},
    			success: function(data) {
    				alert(data.message);
    				$('.sendLoading').hide();
    				
    				if (data.status == 'success') {
    					$('#mailContainer').closest('.ui-dialog-content').dialog('close'); 
    				}
    			},
    			error: function(xhr, status, errors) {
    				alert('Something wrong when try to request send email, please try again!');
    			},
    			complete: function() {
    				$('input[name="passwd"]').val('');
    			}
    		});
    	}
    }
  }); */


	$('#btnSend').on('click', function() {
		if (!validateForm()) {
  			return false;
		}
		
		var files = $('#mailFileAttachments').find('.largefileupload-checkbox');
		
		filesSend = [];
		var totalSize = 0;
		$.each(files, function(index, o) {
			var uid = $(o).val();
			if (mailAttachments) {
				for (var i = 0, len = mailAttachments.length; i < len; i++) {
					if (mailAttachments[i].ATCH_FLE_SEQ == uid
							&& _isNotExistInArray(filesSend, uid)) {
						filesSend.push(mailAttachments[i]);
						totalSize += mailAttachments[i].FLE_SZ;
					}
				}
			}
		});
		
		totalSize = totalSize / (1024 * 1024);
		//console.log('Total size: ' + totalSize);
		if (totalSize > parseInt(maxSizeUpload)) {
			var message = '<spring:message code="common.mail.mailDialog.overSize"/>';
			message = message.replace('%size%', maxSizeUpload);
			alert(message);
			return false;
		}
		
		$.ajax({
			type: 'POST',
			url: CTX + '/common/mail/clientSendMail.ajax',
			data: {
				recipient: $('input[name="recipient"]').val().trim(),
				cc: $('input[name="cc"]').val().trim(),
				bcc: $('input[name="bcc"]').val().trim(),
				subject: $('input[name="subject"]').val().trim(),
				mailContent: $('textarea[name="mailContent"]').val(),
				password: $('input[name="passwd"]').val().trim(),
				filesToDelete: JSON.parse(JSON.stringify(mailAttachments)),
				filesAttachment: JSON.parse(JSON.stringify(filesSend))
			},
			dataType: 'json',
			cache: false,
			beforeSend: function() {
				$('.sendLoading').show();
			},
			success: function(data) {
				alert(data.message);
				$('.sendLoading').hide();
				
				if (data.status == 'success') {
					$('#mailContainer').closest('.ui-dialog-content').dialog('close'); 
				}
			},
			error: function(xhr, status, errors) {
				alert('<spring:message code="common.mail.mailDialog.sendFailed"/>');
			},
			complete: function() {
				$('input[name="passwd"]').val('');
				$('.sendLoading').hide();
			}
		});
		
		//dialog.dialog('open');
		return false;
	});
		
	$('#btnUpload').on('click', function() {
		FileAttachment.processsCrud([a2mNormalFileAttachment], function(dtoFilesInfo){
			mailAttachments = dtoFilesInfo;
		});
		
		/* var files = $('#mailFileAttachments').find('.largefileupload-checkbox');
		$.each(files, function(i, o) {
			console.log($(o).data());
		}); */
	});
	
	function _isNotExistInArray(arr, uid) {
		var result = true;
		if (!arr.length) {
			return result;
		}
		
		for (var i = 0, len = arr.length; i < len; i++) {
			if (arr[i].ATCH_FLE_SEQ == uid) {
				result = false;
				break;
			}
		}
		
		return result;
	}
	
	function validateForm() {
		var $recipient = $('input[name="recipient"]'),
	    	$cc = $('input[name="cc"]'),
			$bcc = $('input[name="bcc"]'),
			$subject = $('input[name="subject"]'),
			$content = $('textarea[name="mailContent"]');
		
		if (!$recipient.val()) {
			alert('"To" <spring:message code="common.mail.mailDialog.required"/>');
			return false;
		} else {
			if (!validEmail($recipient.val())) {
				alert('"To" <spring:message code="common.mail.mailDialog.requiredValid"/>');
				return false;
			}
		}
		
		if ($cc.val()) {
			if ($cc.val().indexOf(',') > -1) {
				var arr = $cc.val().split(',');
				for (var i = 0, len = arr.length; i < len; i++) {
					if (!arr[i] || patternBlank.test(arr[i])) {
						continue;
					}
					
					arr[i] = arr[i].trim();
					if (!validEmail(arr[i])) {
						alert('"Cc" <spring:message code="common.mail.mailDialog.ccBccRequired"/>');
						return false;
					}
				}
			} else {
				if (!validEmail($cc.val())) {
					alert('"Cc" <spring:message code="common.mail.mailDialog.requiredValid"/>');
					return false;
				}
			}
		}
		
		if ($bcc.val()) {
			if ($bcc.val().indexOf(',') > -1) {
				var arr2 = $bcc.val().split(',');
				for (var i = 0, len = arr2.length; i < len; i++) {
					if (!arr2[i] || patternBlank.test(arr2[i])) {
						continue;
					}
					
					arr2[i] = arr2[i].trim();
					if (!validEmail(arr2[i])) {
						alert('"Bcc" <spring:message code="common.mail.mailDialog.ccBccRequired"/>');
						return false;
					}
				}
			} else {
				if (!validEmail($bcc.val())) {
					alert('"Bcc" <spring:message code="common.mail.mailDialog.requiredValid"/>');
					return false;
				}
			}
		}
		
		if (!$subject.val()) {
			alert('<spring:message code="common.mail.mailDialog.subjectRequired"/>');
			return false;
		}
		
		if (!$content.val()) {
			alert('<spring:message code="common.mail.mailDialog.contentRequired"/>');
			return false;
		}
		
		return true;
	}
	
	function validEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}
	
	$('#btnUpload').on('click', function() {
		$(this).parent('form').submit();
	});
</script>