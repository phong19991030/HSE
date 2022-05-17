const _com_elements = {
	
	com_01021: {
		popup: {
			emp_row: function(param){
				var sample = ''
					+ '<tr id="tr_emp' + param.ID + '">'
					+ '		<td>'
					+ '			<span class="checkbox-radio-group">'
					+ '				<label><input type="checkbox" name="checkbox" id= EMP_CHECK_BOX'+ param.ID +'></label>'
					+ '			</span>'
					+ '		</td>'
					+ '		<td>' + param.COMPANY_NAME + '</td>'
					+ '		<td>' + param.EMP_NAME + '</td>'
					+ '		<td>' + param.COMM_NM + '</td>'
					+ '</tr>';
				return sample;	
			},
			popup_sps_cd: function(){
				var sample = '';
				return sample;
			},
			sps_cd_row: function(param){
			 	var sample = ''
					+ '<tr id="tr_sps_cd_"' + param.COMM_CD + '>'
					+ 	'<td class="txt-center">'
					+ 		'<input hidden type="text" class="cls_commCd" value="'+param.COMM_CD+'">'
					+ 		'<input hidden type="text" class="cls_commNm" value="'+param.COMM_NM+'">'
					+  		param.RN + '</td>'
					+ 	'<td>'+ param.COMM_NM +'</td>'
					+ 	'<td class="txt-center">'
					+ 		'<div class="toggle-switch">'
					+ 			'<input type="checkbox" class="cls_cb_toggle" id="TOGGLE_' + param.COMM_CD + '">'
					+ 			'<label for="TOGGLE_'+ param.COMM_CD +'"></label>'
					+ 		'</div>'
					+ 	'</td>'
					+ '</tr>';
				return sample;
			},
		},
		approver: {
			view: function(){
				var sample = ''
					+ '<article class="approval-view">'
					+ 	'<div class="flexWrap">'
					+		'<h2 class="heading4">결재라인</h2>'
					+ 	'</div>'
					+	'<ul class="approval-view--line" id="APPROVAL_VIEW_LINE">'
					
					+	'</ul>'
					+  '</article>'
				return sample;
			},
			view_line: function(param){
				var sample = ''
					+ 	'<li class="">'
					+		'<p class="state">'
					//+			'<span class="checkbox-radio-group">'
					//+ 				'<label><input type="checkbox" name="checkbox" id= "APPROVER_CHECK_BOX_'+ param.EMP_NO + '"></label>'
					//+ 			'</span>'
					+        '결재승인'
					+		'</p>'
					+		'<div class="box">'
					+			'<div class="info-wrap">'
					+				'<span class="info">'
					+					'<em class="team">' + param.COMM_NM + '</em>'
					+					'<em class="name">' + param.EMP_NAME + '</em>'
					+					'<em class="position">' + param.COMPANY_NAME + '</em>'
					+				'</span>'
					+				'<small class="approval-badge1">' + param.STATUS + '</small>'
					+			'</div>'
					+			'<p class="approval-date">'
					+				'<em>2021.06.01</em>'
					+				'<em>09:16</em>'
					+			'</p>'
					+ 		'</div>'
					+	'</li>';
				return sample;
			}
			
		},
	},
	
	com_0102: {
		popup: {
			/* 유지보수사 콘�?츠 */
			project_content: function(param) {
				var sample = ''
					+ '<div class="layer-cont ' + param.TYPE + '" popup-type="' + param.TYPE + '">'
					// Title
					+ ' 	<div class="tit-wrap">'
					+ ' 		<strong id="popup_title" class="heading6">' + param.TITLE + '</strong>'
					+ '		</div>'
					// Title
					
					// SearchBox
					+ '		<div class="search-form-wrap">'
					+ '			<div class="search-wrapper">'
					+ ' 			<form id="detailKeywordForm" name="detailKeywordForm">'
					+ ' 				<div class="input-group">'
					+ ' 					<label for="" class="sr-only"></label>'
					+ ' 					<input id="popup_search" type="text" placeholder="Enter your search term and then press Enter." autocomplete="off">'
					+ ' 				</div>'
					+ ' 				<a id="popup_search_refresh" class="refresh-btn">'
					+ ' 					<i class="xi-refresh" title="Refresh"></i>'
					+ ' 				</a>'
					+ '				</form>'
					+ ' 		</div>'
					+ ' 	</div>'
					// SearchBox
					
					// Table
					+ '		<div class="base_grid_table" style="margin-bottom:10px;width:100%;max-height:80%;">'
					+ ' 		<table>'
					+ '				<colgroup>'
					+ '					<col style="width:20px">'
					+ '					<col style="width:95px">'
					+ '				</colgroup>'
					+ ' 			<thead>'
					+ '					<tr>'
					+ '						<th></th>'
					+ '						<th>Project Name</th>'
					+ '					</tr>'
					+ ' 			</thead>'
					+ ' 			<tbody id="popup_list">'
					
					// Sample
//					+ '					<tr>'
//					+ '						<td>'
//					+ '							<div class="checkbox-radio-custom">'
//					+ '								<input type="radio" id="checkA" name="checkA">'
//					+ '								<label for="checkA" class="sr-only"></label>'
//					+ '							</div>'
//					+ '						</td>'
//					+ '						<td>'
//					+ ' 						<img src="">'
//					+ '						</td>'
//					+ '						<td>A</td>'
//					+ '					</tr>'
					// Sample
					
					+ ' 			</tbody>'
					+ ' 		</table>'
					+ ' 	</div>'
					// Table
					
					// Button
					+ ' 	<div class="btns txt-right">'
					+ ' 		<a id="popup_register" href="javascript:void(0)" class="btn-style btn-style1">Register</a>'
					+ ' 	</div>'
					
					+ ' 	<a id="popup_close" href="javascript:void(0)" class="layer-close">'
					+ ' 		<span class="sr-only">close layer popup</span>'
					+ ' 		<i class="xi-close" title="Close popup"></i>'
					+ ' 	</a>'
					// Button
					+ '</div>';
				
				return sample;
			},
			tr_project_row: function(param) {

				var sample = ''
					+ '<tr id="tr_' + param.ID + '">'
					+ '		<td>'
					+ '			<div class="checkbox-radio-custom">'
					+ '				<input type="radio" id="radio_' + param.ID +  '" name="raido">'
					+ '				<label for="radio_' + param.ID +  '" class="sr-only"></label>'
					+ '			</div>'
					+ '		</td>'
					+ '		<td>' + param.PROJECT_NAME + '</td>'
					+ '</tr>';
				return sample;
			},
			/* 메뉴 접근 권한 권한 콘�?츠 */
			
		}
	},
	}