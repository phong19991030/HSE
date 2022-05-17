<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

 
<style type="text/css">
#filedown{
width:618px;
	    color: #555;
    border: 1px solid #d9d9d9;
    border-radius: 0px 0px 2px 7px;
    cursor: default;
    height: 100px; 
    overflow-y: scroll;
}

#filedrag
{
	width:618px;
	    color: #555;
    border: 1px solid #d9d9d9;
    border-radius: 0px 0px 2px 7px;
    cursor: default;
    height: 200px; 
    overflow-y: scroll;
    background : url('/mis/images/common/innorix/inno_drop_image_pu.png') 50% 50% no-repeat;
}

#filedrag.hover
{
	color: #f00;
	border-color: #f00;
	border-style: solid;
	box-shadow: inset 0 3px 4px #888;
}


.uploadFileList{
width:600px;
}
.uploadFileList tr {
    background-color: #FFFFFF;
}  
.uploadFileList tr td {
    border-bottom: 1px solid #d9d9d9;
    background-color: #FFFFFF;
}  
#upload_header{
	
}
.header table{ 
width:620px;height:15px; 
    border-collapse: collapse;
    border-spacing: 0;
    border-left: 1px solid #d9d9d9;
    clear: both;
}
.header table th{
    border-top: 2px solid #38aac3;
    color: #4c4c4c;
    border-bottom: 1px solid #d9d9d9;
    border-right: 1px solid #b9d2d7;
    background: #eaf3f5;
    text-align: center;
}

</style>
<script type="text/javascript">
/*
window.onload = function()
{
	innoInit({
		ContainElementID : "innorix_component", // 컴포넌트 출력객체 ID
		ActionElementID : "form_write",			// 메타정보 전송폼 ID
		UploadURL : CTX+ "/common/file/uploadFile", 				// 업로드 처리 페이지
		ResultURL :  CTX+ "/common/file/uploadFile", 				// 업로드 결과 페이지
		MaxTotalSize : "500MB",					// 첨부가능 전체용량
		MaxFileSize : "100MB",					// 첨부가능 1개파일 용량
		MaxFileCount : "200",					// 첨부가능 파일개수
		TransferMode : "innods"					// InnoDS 업로드 모드 설정		
	});
}
*/
</script>

<script type="text/javascript">
var getObjectSize = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
var fileList = new Object;

$(document).ready(function(){
// 	alert(browserChk)
	 if(browserChk){
	 	$('#fileFieldForIE').hide();
		$('#fileField').show() ;
		$('#fileSelect_button').show();
	 }else{
		$('#fileFieldForIE').show(); 
		$('#fileField').hide() ; 
		$('#fileSelect_button').hide();
	 }
	
	
	//call initialization file
	if (window.File && window.FileList && window.FileReader) {
		Init();
	}
	//
	//initialize
	function Init() {

		var fileselect =document.getElementById("fileselect")  ,
			filedrag = document.getElementById("filedrag"),
			submitbutton = document.getElementById("submitbutton") ;

		// file select
		fileselect.addEventListener("change", FileSelectHandler, false);

		// is XHR2 available?
	 	var xhr = new XMLHttpRequest();
	 	if (xhr.upload) {
		
// 			file drop
	 		filedrag.addEventListener("dragover", FileDragHover, false);
	 		filedrag.addEventListener("dragleave", FileDragHover, false);
	 		filedrag.addEventListener("drop", FileSelectHandler, false);
	 		filedrag.style.display = "block";
			
// 			remove submit button
// 	 		submitbutton.style.display = "none";
	 	}
	 	 
	 	
	}
	
	$('.check.all').on('change',function(){
		var type = $(this).data('type')
		var target = $(this).data('target')
		var checked = $(this).prop('checked')
		if(checked){
			$('#'+target).find('td input[type="checkbox"]').prop('checked',true)
		}else{
			$('#'+target).find('td input[type="checkbox"]').prop('checked',false)
		}
	})
	
	


})

	function FileSelectHandler(e) {

		// cancel event and hover styling
		FileDragHover(e);

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;
		

		// process all File objects
		for (var i = 0, f; f = files[i]; i++) {
			var length = getObjectSize(fileList)
			fileList[length]=f
			ParseFile(f,length);
// 			getObjectSize(length)
		}
		$('#upload_header .check.all').trigger('click')
	}
// file drag hover
function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}
function Output(msg) {
// 	var m = document.getElementById("uploadFileList");
// // 	m.innerHTML = msg + m.innerHTML;
	$('#uploadFileList').append(msg)
}

function ParseFile(file,seq) {
// 	$('#fileField').append(
// 	'<input type="file" id="fileselect" name="fileselect[]" multiple="multiple"  value = "'+file+'" />'
// 	);
	Output( 
		'<tr>'+	 
		'<td style="text-align:center;">'+ 
		'<input id="upload_'+seq+'" type="checkbox" class="checked" value="'+seq+'" data-FLE_KEY ="${param.fileKey }"/>'+
		'<label for="upload_'+seq+'"></label>'+
		'</td>'+
		'<td>'+file.name +'</td>'+
		'<td>'+file.size +'Byte</td>'+ 
		'<td><span class=" sbtn btn ac_click bg_mint ico a7" data-func="deleteTempFile" data-seq="'+seq+'">삭제</span></td>'+
		'</tr>'
// 		"<p>File information: <strong>" + file.name +
// 		"</strong> type: <strong>" + file.type +
// 		"</strong> size: <strong>" + file.size +
// 		"</strong> bytes</p>"
	);
}
function deleteTempFile($obj){
	var seq = $obj.data('seq')
	delete fileList[seq];
	$obj.parents('tr').remove();
}
function fileselect(){
	$('#fileselect').trigger('click')
}
function saveFile(){ 
    	recentBowserSaveFile();
	
}
function fileFilter(file){
	var filename = file.name;
	var ext =  filename.substr(filename.lastIndexOf('.')+1)
	
	var list = '*.xls;*.xlsx;*.doc;*.docx;*.ppt;*.pptx;*.hwp;*.jpg;*.jpeg;*.gif;*.png;*.bmp;*.pdf;*.txt;'
		+'*.xls;*.xlsx;*.doc;*.docx;*.ppt;*.pptx;*.hwp;*.jpg;*.jpeg;*.gif;*.png;*.bmp;*.pdf;*.txt';
		
	if( list.indexOf(ext) >= 0  ){
		return true
	} else{
		return false
	}
}

function recentBowserSaveFile(){
	var data = new FormData();
	
	var bool = true
	if($('#uploadFileList').find('td input:checked').length> 0){
        $('#uploadFileList').find('td input:checked').each(function(){
        	if(fileFilter(fileList[$(this).val()]) ){
        		data.append('file_list[]', fileList[$(this).val()]); 
        	}else{
        		bool = false
        			alert('업로드 할 수 없는 파일입니다. ')
        		return false;
        	}
        	
        })
        
        if($('#fileKey').val()){
        data.append('fileKey', $('#fileKey').val());
        }else{
        	data.append('fileKey', null);
        }
        if(bool){
	        $.ajax({
	            url: CTX + '/common/file/uploadFile',
	            type: "post",
	            dataType: "text",
	            data: data,
	            // cache: false,
	            processData: false,
	            contentType: false,
	            success: function(data, textStatus, jqXHR) {
	            	var filenam = $('#field').val();
	
	            	// opener.setFileFieldBind(filenam,JSON.parse(data).fileKey);

					opener.setFleKey(document.location.search.split('target=')[1].split('&')[0], JSON.parse(data).fileKey);
                    location.href = CTX+'/common/file/uploadForm?fileKey='+JSON.parse(data).fileKey+'&target='+filenam

	            }, 
	            error: function(jqXHR, textStatus, errorThrown) {}
	        });
        }
	}else{
		alert('선택된 파일이 없습니다.')
	}
}



function deleteFile($obj){
//     var data = new FormData();
 	var data ={};
 	var datas= [];
    data['FLE_KEY'] =  $('#fileKey').val(); 
    var seq =$obj.data('atch_fle_seq')
    if(seq=='all'){
    	 $('#downloadFileList').find('td input:checked').each(function(){
//          	data.append('file_list[]', fileList[$(this).val()]); 
// 	    	data.append('ATCH_FLE_SEQ[]',  $(this).val());
	    	datas.push($(this).val());
         })
         data['ATCH_FLE_SEQ[]'] = datas;
    }else{
// 	    data.append();
		data['ATCH_FLE_SEQ'] = seq;
    }
     
    $.ajax({
        url: CTX + '/common/file/deleteFile',
        type: "get",
//         dataType: "text",
        data: (data),
        // cache: false,
        success: function(data, textStatus, jqXHR) {
			location.reload();
        }, 
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}
</script>



<!-- 
<div id="popup_wrapper" style="width:autox;">

	<div id="fileForm">
		<ul>
			
			<c:forEach items="${fileList }" var="item" varStatus="loop">
				<li>${item.FLE_NM} </li>
			</c:forEach>
		</ul>
	</div>



	<form name="form_write" id="form_write" method="post">
	test1 : <input type="text" name="test1" id="test1" />
	</form><br />
		
	<div id="innorix_component" style="border: 1px solid #97b4cc; width:500px; height:200px"></div><br />
	
	<input class="innoGreenBtn" type="button" value="파일추가" onClick="File.OpenFileDialog();" />
	<input class="innoBlueBtn" type="button" value="전송하기" onClick="File.Upload();" />

</div>	

 -->
<div>
	<div id="fileList" style="margin-bottom:40px;">
			<h4>
			<label>파일다운로드</label>
			<div style="float:right"> 
				<c:if test="${!param.hold}" >
				<span class=" sbtn btn ac_click bg_mint ico a7" data-func="deleteFile" data-ATCH_FLE_SEQ="all" >
					일괄삭제
				</span> 
				</c:if>
			</div>
			</h4>
			<div id="downfileField" >
				<div id ="download_header" class="header">						
					<table>
						<tr> 
							<th width="62px">
								<input type="checkbox" class="check all" value="all" data-type="download" data-target="downloadFileList">
							</th>
							<th width="310px">파일명</th>
							<th width="124px">사이즈</th>
							 <th width="124px">
							 	<c:if test="${!param.hold}" >
							 삭제
							 	</c:if>
							 </th>
						</tr>
					</table>
				</div>
				<div id="filedown">
					<table id="downloadFileList" class="uploadFileList ">
						<colgroup>
							<col width="62px"></col>
							<col width="310px"></col>
							<col width="124px"></col>
							<col width="104px"></col>
							
						</colgroup>
						<c:forEach items="${fileList }" var="item" varStatus="loop">
							<tr>	 
								<td style="text-align:center">
									<input type="checkbox" class="checked" id="down_${loop.count }" value="${item.ATCH_FLE_SEQ}" data-FLE_KEY ="${param.fileKey }">
								</td>
								<td>
									<a href="${ctxPath}/common/file/download?FLE_KEY=${param.fileKey }&ATCH_FLE_SEQ=${item.ATCH_FLE_SEQ}">
									${item.FLE_NM }
									</a>
								</td>
								<td>${item.FLE_SZ }</td>
								
								<td>
										<c:if test="${!param.hold}" >
									<span class=" sbtn btn ac_click bg_mint ico a7" data-func="deleteFile" data-ATCH_FLE_SEQ="${item.ATCH_FLE_SEQ}" >
	<%-- 								<a href="${ctxPath}/common/file/download?FLE_KEY=${param.fileKey }&ATCH_FLE_SEQ=${item.ATCH_FLE_SEQ}" --%>
									삭제
									</span>
									</c:if>
								</td>
							</tr>
						</c:forEach>
					</table>
				</div>
			</div>
			
	</div>
	
	<div id="fileFormWrapper">
		<form action="" id="fileForm"  data-func="excelUploadAjax" data-callback="saveCallbackFunc" enctype="multipart/form-data">
		<input type="hidden" id ="fileKey" name="fileKey"  value="${param.fileKey }"/>
		<input type="hidden" id ="field" name="field"  value="${param.target }"/>
		
			<fieldset>
				<legend>파일관리</legend>
				
				<input type="hidden" id="MAX_FILE_SIZE" name="MAX_FILE_SIZE" value="300000000" />
				

				<h4 >파일업로드</h4>
				<div id="fileFieldForIE">
					<input type="file" id="fileselect" name="file_list" multiple="multiple" />
				</div>
				
				<div id="fileField"  >
					<div id ="upload_header" class="header">						
						<table>
							<tr> 
								<th width="62px">
									<input type="checkbox" class="check all" value="all" data-type="upload" data-target="uploadFileList">
								</th>
								<th width="310px">파일명</th>
								<th width="124px">사이즈</th>
							<c:if test="${!param.hold}" >	<th width="124px">삭제</th></c:if>
							</tr>
						</table>
					</div>
					<div id="filedrag">
						<table id="uploadFileList" class="uploadFileList " border="0" cellspacing="0" cellpadding="0">
							<colgroup>
								<col width="62px"></col>
								<col width="310px"></col>
								<col width="124px"></col>
							<c:if test="${!param.hold}" >	<col width="104px"></col></c:if>
							</colgroup>
							
						</table>
					</div>
				</div>
				
				<div id="submitButton" style="text-align:right;margin-top:10px"> 
				
					<c:if test="${!param.hold}" >
<!-- 					<span class=" sbtn btn ac_click bg_mint ico a7" data-func="fileselect">파일선택 -->
<!-- 					</span> -->
					
					<label id="fileSelect_button" class=" sbtn btn ac_click bg_mint ico a7" data-func="fileselect">파일선택</label>
					<span class=" sbtn btn ac_click bg_mint ico a7" data-func="saveFile">파일저장
					</span>
					</c:if>
					<span class="ac_click winclose btn_닫기"> 
						
					</span>
				</div>
			
			</fieldset>

		</form>

	</div>
<%-- 	ie9 용 --%>
<!-- 	<div style="display:none">  -->
<%-- 		<form id= "ie9FileForm" action="${ctxPath}/common/file/uploadFile"> --%>
<!-- 			<input type="hidden" id ="form2.fileKey" name="fileKey"  /> -->
<!-- 		</form> -->
<!-- 	</div>  -->
 </div>
 