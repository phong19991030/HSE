<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript" src="${ctxPath}/script/excel/dist/xlsx.full.min.js"></script>
<script>
function htmlDecode(value){
    return $("<div/>").html(value).text();
}

var popupData = htmlDecode(decodeURI('${POPUP}'));
var xArray;
var popupParameter = {};
var matcher = /"(.*?)"="(.*?)"/g;

while(xArray = matcher.exec(popupData))
    popupParameter[xArray[1]] = xArray[2];

var json_data = '';
var header = []; //= popupParameter.headerLabel.split('-');
var headerID = []; //  popupParameter.headerID.split('-');

popupParameter.headerID = getParamObj(popupParameter.headerID);

$.each(popupParameter.headerID,function(key,val){
	
	headerID.push(key);
	header.push(decodeURI(val));	
})



$(document).ready(function(){
	$('.excel_option_apply').hide();
	$('#mapping_list').hide();

	$(document).on('change', 'input#excel', function(){
		$('.excel_option_apply').show();
	})
	
	$(document).on('change', 'input#all_checker', function(){
		$('#mapping_list input[type=checkbox]').prop("checked",$(this).prop("checked"));
	})
});

function mappingColumn(jsonData){
// 	var insvalue = $('.ins_value:selected');
// 	var excelvalue = $('.map_value:selected');
	var return_data = [];
	var tr = $('tr.mapping_data');
	$.each(jsonData, function(index, value){
		var data = {};
		for(i=0;i<tr.size();i++)
		{
			var check = $(tr[i]).find('input:checked');
			if(check.length == 1)
			{
				var mapping = $(tr[i]).find("td");
				var key = $(mapping[1]).find('span').data('val');
				var val = value[$(mapping[3]).find('select').val()];
				data[key] = val;
				data['CRUD'] = 'C'
			}
		}
		return_data.push(data);
	})
	
	return return_data;
}

function mappingApply(){
	var $this;
	var applyData = mappingColumn(json_data);
	var type = popupParameter.type == 'popup';
	if(type){
    	$this = window.opener;
	}
	
	var target = popupParameter.targetId;

		            	
	var appendTop = popupParameter.appendTop;
	var clear = popupParameter.clear;
	
	if(type)
		$this.appendGridData(target, applyData, appendTop, clear);
	else
		appendGridData(target, applyData, appendTop, clear);
	
	if(!popupParameter.instantSave){
		$this.saveExcelGrid(target, applyData);
	}
	
	if(type) self.close();
	else destroyDialogPopup(this);
}

function excelOptionApply(){
	var rABS = true;

	if($('#excel').val() == '')
		alert('파일을 선택해주세요');
	else {
		$('#mapping_list').show();

		
		var file = document.getElementById('excel');
		var reader = new FileReader();
		reader.readAsBinaryString(file.files[0]);
		reader.onloadend = function(){
				$('#mapping_list div table tbody').empty();
	            var data = event.target.result;
	 
	            var workbook;
	 
	            if(rABS) {
	                /* if binary string, read with type 'binary' */
	                workbook = XLSX.read(data, {type: 'binary'});
	            } else {
	                /* if array buffer, convert to base64 */
	                //var arr = fixdata(data);
	                workbook = XLSX.read(data, {type: 'base64'});
	            }//end. if
	            workbook.SheetNames.forEach(function(item, index, array) {
	            	 
	                //var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[item]);
	                //var html = XLSX.utils.sheet_to_html(workbook.Sheets[item]);
	                if($('#rownum') != '')
                		json_data = XLSX.utils.sheet_to_json(workbook.Sheets[item], {range:$('#rownum').val()-1 ,header:'A',defval:''});
	                else
	                	json_data = XLSX.utils.sheet_to_json(workbook.Sheets[item], {header:'A',defval:''});
	               //var formulae = XLSX.utils.sheet_to_formulae(workbook.Sheets[item]);
		 			
	                //console.log(csv);
	                //console.log(html);
//		                console.log(json_data);
	                //console.log(formulae);
	 				
	                //$("section").html(json);
	            });
	            
	            var loopcount = header.length;
	    		for(i=0;i<loopcount;i++)
	    		{
	    			var tr = $('<tr>',{
	    				'class':'mapping_data'
	    			}).appendTo($('#mapping_list div table tbody'));
	    			var td4 = $('<td>').appendTo(tr);
	    			var td1 = $('<td>').appendTo(tr);
	    			var td5 = $('<td>').appendTo(tr);
	    			var td2 = $('<td>').appendTo(tr);
	    			var td3 = $('<td>').appendTo(tr);
	    			
// 	    			var select1 = $('<select>').appendTo(td1);
// 	    			select1.attr('readonly', 'true');
					var titleSpan = $('<span>').appendTo(td1);
					var idSpan = $('<span>').appendTo(td5);

	    			var select2 = $('<select>').appendTo(td2);
	    			
	    			titleSpan.data('val', headerID[i]);
	    			titleSpan.html(header[i]);
	    			
	    			idSpan.html(headerID[i]);
// 	    			$.each(header, function(index, value){
// 	    				if(value=='')
// 	    					return true;
// 	    				var option = $('<option>', {
// 	    					'value':headerID[index],
// 	    					'text':value,
// 	    					'class':'ins_value'
// 	    				}).appendTo(select1);
// 	    				if(i == index)
// 	    					option.prop("selected", true);
// 	    			})
	    			$.each(json_data[0], function(index, value){
	    				var option = $('<option>', {
	    					'value':index,
	    					'text':index,
	    					'class':'map_value'
	    				}).appendTo(select2);
	    				option.data('preview', value);
	    				if(i == (index.charCodeAt()-'A'.charCodeAt()))
	    					option.prop("selected", true);
	    			})
	    			
	    			var span = $('<span>').appendTo(td3);
	    			var preView = $(span.parents('tr').find('td')[3]).find('option:selected').data('preview');
	    			
	    			span.html(preView);
	    			
	    			$(document).on('change', 'select', function(){
	    				var $this = $(this);
	    				var previewStr = $(this).find('option:selected').data('preview');
	    				$($(this).parents('tr').find('td')[4]).html(previewStr);
	    			});
	    			
	    			var check = $('<input>',{
	    				'type':'checkbox',
	    				'class':'center'
	    			}).appendTo(td4);
	    		}
	            
//		            $('#mapping_apply').click(function(){
	            	
//		            	var $this;
//		            	var applyData = mappingColumn(json_data);
//		            	var type = popupParameter.type == 'popup';
//		            	if(type){
//			            	$this = window.opener;
//		            	}
	            	
//		            	var target = popupParameter.targetId;

	            		            	
//		            	var appendTop = popupParameter.appendTop;
//		            	var clear = popupParameter.clear;
	            	
//		            	if(type)
//	            			$this.appendGridData(target, applyData, appendTop, clear);
//		            	else
//		            		appendGridData(target, applyData, appendTop, clear);
	            	
//	            		if(!popupParameter.instantSave){
//		            		$this.saveExcelGrid(target, applyData);
//		            	}
            		
//	            		if(type) self.close();
//	            		else destroyDialogPopup(this);

//		        	})
		}
	}
}
</script>


<section>
	<h3>Excel Upload</h4>
	<div class="group">
		<div class="group_title">
			<strong class="g_title">엑셀 선택 및 옵션 적용</strong>
		</div>
		<div class="group_content">
			<table class="search_tbl">
				<colgroup>
					<col style="width:140px;" />
					<col style="width:auto;" />
				</colgroup>
				<tbody>
					<tr>
						<th><label>파일선택</label></th>
						<td>
							<input type="file" id="excel" name="excel"/>				
						</td>
					</tr>
					<tr class="excel_option_apply">
						<th><label>First Data Row</label></th>
						<td>
							<input type="text" id="rownum" />			
						</td>
					</tr>		
				</tbody>
			</table>
			<div class="g_content_btn right excel_option_apply">
				<span id="apply" class="btn ac_click sbtn bts" data-func="excelOptionApply">적용</span>
			</div>
		</div>
	</div>
	
	<div id="mapping_list">
		<div class="group group_grid">
			<div class="group_title">
				<strong class="g_title">Mapping Table</strong>
<!-- 				<div class="g_title_btn">버튼</div> -->
			</div>
			<div class="group_content table">
				<table class="tbl">
					<colgroup>
						<col style="width:10%"></col>
						<col style="width:20%"></col>						
						<col style="width:20%"></col>
						<col style="width:10%"></col>
						<col style="width:40%"></col>
					</colgroup>
					<thead>
						<tr>
							<th></th>
							<th colspan="2">그리드</th>
							<th colspan="2">엑셀</th>
						</tr>
						<tr>
							<th>
								<label for="all_checker")>사용</label>
								<input type="checkbox" id="all_checker">
							</th>
							<th>열 이름</th>
							<th>ID</th>
							<th>열 이름</th>
							<th>데이터 미리보기</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
				<div class="g_content_btn center">
					<span id="mapping_apply" class="btn ac_click sbtn bts" data-func="mappingApply">엑셀업로드</span>
				</div>	
			</div>
		</div>
	</div>
</section>