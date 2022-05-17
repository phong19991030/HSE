
var _oam_elements = {
	oam_0100: {
		main: {
			tr_alarm_row: function(param) {
				
				var tooltip = ['Error occurred', 'Planning', 'Under repair', 'Repair completed', ''][param.status - 1]; 
				var icon = ['xi-error', 'xi-library-books', 'xi-wrench', 'xi-check-circle', 'xi-error'][param.status - 1]; 
				var cls = ['process-mark1', 'process-mark2', 'process-mark3', 'process-mark4', 'process-mark5'][param.status - 1];
				
				var sample = 
					'<tr id="tr-' + param.id + '">'
					+ '		<td>' + param.num + '</td>' 												
					+ '		<td>'
					+ ' 		<span class="process-mark ' + cls + '">'
					+ ' 			<i class="'+ icon + '" title="' + tooltip + '"></i>'
					+ ' 			<span class="sr-only">' + tooltip + '</span>'
					+ ' 		</span>'
					+ ' 	</td>'
					+ '		<td>' + param.position + '</td>'
					+ '		<td>' + param.datetime + '</td>'
					+ '		<td>' + param.code + '</td>'
					+ '		<td>' + param.description + '</td>'
//					+ '		<td>'
//					+ ' 		<a href="" class="download-btn">'
//					+ ' 			<i class="xi-download"></i>'
//					+ ' 		</a>'
//					+ ' 	</td>'
//					+ '		<td>'
//					+ ' 		<a href="" class="download-btn">'
//					+ ' 			<i class="xi-download"></i>'
//					+ ' 		</a>'
//					+ ' 	</td>'
					+ '</tr>';
				return sample;
			},
			no_data: function() {
				var sample = 
					'<tr><td colspan="8" style="padding: 10rem .45rem 10rem .45rem !important; font-size: 1rem !important;">No Data</td></tr>';
				return sample;
			}
		},
	},
	oam_0102: {
		main: {
			/* plan li */
			li_plan_row: function(param) {
				
				// 컨펌된 계획이 있을 경우, 모든 계획 radio 버튼 사용중지  
				var disabled = param.HAS_CONFIRM === 'Y' ? ' disabled' : '';
				// 컨펌된 계획 radio 체크
				var checked = param.IS_CONFIRM === 'Y' ? ' checked' : '';
				
				var sample = 
					'<li id="plan_' + param.ID + '">'
					+ ' 	<div class="plan-lst-info-wrap">'
					+ ' 		<div class="plan-info-wrap">'
					+ ' 			<div class="checkbox-radio-custom">'
					+ ' 				<input type="radio" name="radio" id="radio_' + param.ID + '"' + disabled + checked + '>' //disabled
					+ ' 				<label for="radio_' + param.ID + '">' + param.PLAN_NM + '</label>'
					+ ' 			</div>'
					+ ' 			<span class="plan-info">';
					//+ ' 				<strong>' + param.PLAN_NM_EN + '</strong>';
					
					// 컴펌된 사항 일 때
					if(param.IS_CONFIRM === 'Y') {
						sample = sample 
						//+ '					<em>Confirm</em>'
						+ '					<strong>Confirm</strong>'
					}
					// 컴펌된 사항 일 때
					
					sample = sample 
					+ ' 			</span>'
					+ ' 		</div>';
					
					if(param.IS_NOPLAN !== 'Y') {
						sample = sample
						/* 계획 없음 아닐때 */ 
						+ '			<span class="plan-etc">'
						+ '				<em>' + param.DATETIME + '</em>';
						
						if(param.HAS_CONFIRM !== 'Y') {
							sample = sample
							// /oam/oam_0101/01/planForm : 수정
							+ '				<a id="MODIFY_BTN_' + param.ID + '" href="javascript:void(0);" class="plan-modify" title="Modify paln">'
							+ ' 				<span class="sr-only">modify paln</span>'
							+ '					<i class="xi-pen"></i>'
							+ '				</a>';
						}
						
						sample = sample
						// /oam/oam_0101/01/planView : 조회
						+ '				<a id="SCHEDULE_BTN_' + param.ID + '" href="javascript:void(0);" class="plan-modify plan_schdule" title="Schedule plan">'
						+ '					<span class="sr-only">schdule plan</span>'
						+ ' 				<i class="xi-document"></i>'
						+ '				</a>'
						
						// /oam/oam_0101/exportPdfPlan : 다운로드 
						+ '				<a id="DOWNLOAD_BTN_' + param.ID + '" href="javascript:void(0);" class="plan-modify" title="Download PDF">'
						+ '					<span class="sr-only">plan download</span>'
						+ ' 				<i class="xi-download"></i>'
						+ '				</a>'
						+ '			</span>';
						/* 계획 없음 아닐때 */
					}
					sample = sample
					+ ' 	</div>'
					+ (param.HAS_CONFIRM !== 'Y' || param.IS_NOPLAN !== 'Y' ? 
							'<span id="CONFIRM_BTN_' + param.ID + '" class="plan-Confirm">Confirm</span>' : '');
					+ '</li>';
				return sample;
			},
		},
	},
	oam_010201: {
		main: {
			tr_item_row: function(param) {
				var sample = ''
					+ '<tr id="tr_' + param.ID + '">'
					+ ' 	<td>' + param.CATEGORY + '</td>'
					+ ' 	<td>' + param.ITEM_NM + '</td>'
					+ '		<td>' + param.COST + '</td>'
							
//					+ '		<td>'
//					+ ' 		<span class="stock stock1">' + param.STATUS + '</span>'
//					// oam_0101010201.jsp => moveRequest();
//					//+ ' 		<span class="stock-info" onclick="moveRequest()">[Purchase Request]</span>'
//					+ ' 	</td>'
					
//					+ '     <td>'
//					+ '			<div class="calendar-picker">'
//					+ ' 			<div class="input-group">'
//					+ ' 				<label for="' + START_DT_ID + '" class="sr-only"></label>'
//					+ ' 				<input type="text" id="' + START_DT_ID + '" name="' + START_DT_ID + '" class="datetimepicker" validation-check="required" placeholder="Start time">'
//					+ ' 			</div>'
//					+ ' 			<em class="hyphen">'
//					+ ' 				<span class="sr-only">-</span>'
//					+ ' 			</em>'
//					+ ' 			<div class="input-group">'
//					+ ' 				<label for="' + END_DT_ID + '" class="sr-only"></label>'
//					+ ' 				<input type="text" id="' + END_DT_ID + '" name="' + END_DT_ID + '" class="datetimepicker" validation-check="required" placeholder="End time">'
//					+ ' 			</div>'
//					+ ' 		</div>'
//					+ ' 	</td>'
					
					+ '		<td>'
					+ '			<div style="line-height: 1;">' + param.START_TIME + '</div>'
					+ '			<div style="line-height: 1;">'
					+ ' 			<span style="padding-right: 0.5rem;font-size: 1.2rem;">~</span>' + param.END_TIME
					+ '			</div>'
					+ '		</td>'
					
					+ ' 	<td>'
					+ '			<span class="delete-btn">'
					+ '				<i class="xi-trash" title="Delete ' + param.TYPE.toLowerCase()  + '"></i>'
					+ ' 		</span>'
					+ '		</td>'
					+ '</tr>';
				return sample;
			},
			div_work_row: function(param){
				var sample = ''
					+ '<div class="base_grid_table table-row" style="margin-top:10px;">'
					+ '		<table>'
					+ '			<caption>Work - Maintenance code, Difficulty, Work, Detail, Attachment, Part Replacement</caption>'
					+ '			<colgroup>'
					+ '				<col style="width:20%">'
					+ '				<col style="width:80%">'
					+ '			</colgroup>'
					+ '			<tbody id="WORK_' + param.ID + '">'
					// WORK_NM
					+ '				<tr>'
					+ '					<th scope="row">Title<span class="red"> *</span></th>'
					+ '					<td class="txt-left">'
					+ '						<div class="registration-write">'
					+ '							<div class="input-group">'
					+ '								<label for="WORK_NM_' + param.ID + '" class="sr-only"></label>'
					+ '								<input type="text" id="WORK_NM_' + param.ID + '" validation-check="required" maxlength="20">'
					+ '							</div>'
					+ '						</div>'
					+ '					</td>'
					+ '				</tr>'
					// WORK_DETAIL
					+ '				<tr>'
					+ '					<th scope="row">Detail<span class="red"> *</span></th>'
					+ '					<td class="txt-left note">'
					+ '						<div class="registration-write">'
					+ '							<div class="input-group">'
					+ '								<label for="WORK_DETAIL_' + param.ID + '" class="sr-only"></label>'
					+ '								<textarea id="WORK_DETAIL_' + param.ID + '" validation-check="required" maxlength="500"></textarea>'
					+ '							</div>'
					+ '						</div>'
					+ '					</td>'
					+ '				</tr>'
					// WORK_TIME
					+ '				<tr>'
					+ '					<th scope="row">Work Time<span class="red"> *</span></th>'
					+ '					<td class="txt-left">'
					+ '						<div class="calendar-picker" style="position:relative;width:60%;">'
					+ '							<div class="calendar-wrap">'
					+ '								<div class="input-group">'
					+ '									<label for="WORK_START_TIME_' + param.ID + '" class="sr-only"></label>'
					+ '									<input type="text" id="WORK_START_TIME_' + param.ID + '" class="datetimepicker" validation-check="required" placeholder="Start time" readonly>'
					+ '								</div>'
					+ '								<em class="hyphen">'
					+ '									<span class="sr-only">-</span>'
					+ '								</em>'
					+ '								<div class="input-group">'
					+ '									<label for="WORK_END_TIME_' + param.ID + '" class="sr-only"></label>'
					+ '									<input type="text" id="WORK_END_TIME_' + param.ID + '" class="datetimepicker" validation-check="required" placeholder="End time" readonly>'
					+ '								</div>'
					+ '							</div>'
					+ '						</div>'
					+ '					</td>'
					+ '				</tr>'
					// COST
					+ '				<tr>'
					+ '					<th scope="row">Cost(₩)<span class="red"> *</span></th>'
					+ '					<td class="txt-left">'
					+ '						<div class="registration-write">'
					+ '							<div class="input-group">'
					+ '								<label for="WORK_COST_' + param.ID + '" class="sr-only"></label>'
					+ '								<input type="text" id="WORK_COST_' + param.ID + '" validation-check="required" maxlength="8" placeholder="You can type up to 8 number">'
					+ '							</div>'
					+ '						</div>'
					+ '					</td>'
					+ '				</tr>'
					// WORKERS
					+ '				<tr>'
					+ '					<th scope="row" rowspan="2">Workers<span class="red"> *</span></th>'
					+ '					<td class="txt-left">'
					+ '						<div class="base_grid_table">'
					+ '							<table>'
					+ '								<colgroup>'
					+ '									<col style="width:45%">'
					+ '									<col style="width:45%">'
//					+ '									<col style="width:10%">'
					+ '								</colgroup>'
					+ '								<thead>'
					+ '									<tr>'
					+ '										<th scope="col">Company</th>'
					+ '										<th scope="col">Worker</th>'
//					+ '										<th scope="col"></th>'
					+ '									</tr>'
					+ '								</thead>'
					+ '								<tbody id="WORKER_LIST_' + param.ID + '">'
					
//					+ '									<tr id="WORKER">'
//					+ '										<td>WINDETEC</td>'
//					+ '										<td>박정권</td>'
//					+ '										<td>'
//					+ '											<span class="delete-btn">'
//					+ '												<i class="xi-trash"></i>'
//					+ '											</span>'
//					+ '										</td>'
//					+ '									</tr>'
					
					+ '								</tbody>'
					+ '							</table>'
					+ '						</div>'
					+ '						<div class="more-btn-wrap" style="margin:0;">'
					+ '							<span id="WORKER_ADD_BTN_' + param.ID + '" class="more">'
					+ '								<span class="sr-only">Add work</span>'
					+ '								<i class="xi-plus-circle" title="Add worker"></i>'
					+ '							</span>'
					+ '						</div>'
					+ '					</td>'
					+ '				</tr>'
					+ '			</tbody>'
					+ '		</table>'
					+ '		<span id="DELETE_BTN_' + param.ID + '" href="javascript:void(0);" class="row-delete" title="Delete work">'
					+ ' 		<span class="sr-only">close layer popup</span>'
					+ ' 		<i class="xi-trash"></i>'
					+ '		</span>'
					+ '</div>';
				
				return sample;
			},
			tr_worker_row: function(param) {
				var sample = ''
					+ '<tr>'
					+ '		<td>' + param.COMPANY_NM + '</td>'
					+ '		<td>' + param.USER_NM + '</td>'
//					+ '		<td>'
//					+ '			<span class="delete-btn">'
//					+ '				<i class="xi-trash"></i>'
//					+ '			</span>'
//					+ '		</td>'
					+ '</tr>';
				return sample;
			}
		},
		popup: {
			item_content: function(param) {
				// title 앞글자만 대문자, 나머지 소문자로 변경
				param.TITLE = param.TITLE !== 'PPE' ? param.TITLE.charAt(0) + param.TITLE.slice(1).toLowerCase() : param.TITLE;
				var sample = ''
					+ '<div class="layer-cont ' + param.TYPE + '" popup-type="' + param.TYPE + '">'
					// Title
					+ ' 	<div class="tit-wrap">'
					+ ' 		<strong id="popup_title" class="heading6">' + param.TITLE + '</strong>'
					+ '		</div>'
					// Title
					
					// Select Category
					+ '		<div class="category-wrap">'
					+ '			<span class="category-name">Category <span class="red"> *</span> </span>'
					+ ' 		<div class="select-box">'
					+ '				<label for="popup_category"></label>'
					+ ' 			<select id="popup_category" name="popup_category" class="info-select" validation-check="required">'
					+ ' 				<option value=""># Category</option>'
					+ ' 			</select>'
					+ ' 		</div>'
					+ ' 	</div>'
					// Select Category
					
					// Select Item
					+ '		<div class="category-wrap">'
					+ '			<span class="category-name">' + param.TITLE + '<span class="red"> *</span></span>'
					+ ' 		<div class="select-box">'
					+ '				<label for="popup_item"></label>'
					+ ' 			<select id="popup_item" name="popup_item" class="info-select" validation-check="required">'
					+ ' 				<option value=""># ' + param.TITLE + '</option>'
					+ ' 			</select>'
					+ ' 		</div>'
					+ ' 	</div>'
					// Select Item
					
					// Preparation Time
					+ '		<div class="category-wrap">'
					+ '			<span class="category-name">Preparation Time <span class="red"> *</span> </span>'
					+ ' 		<div class="calendar-picker">'
					+ '				<div class="calendar-wrap">'
					+ ' 				<div class="input-group">'
					+ '						<label for="popup_start_time" class="sr-only"></label>'
					+ ' 					<input type="text" id="popup_start_time" name="popup_start_time" style="width: 100%" class="datetimepicker" placeholder="Start datetime" validation-check="required"/>'
					+ ' 				</div>'
					+ ' 				<em class="hyphen">'
					+ ' 					<span class="sr-only">-</span>'
					+ ' 				</em>'
					+ ' 				<div class="input-group">'
					+ '						<label for="popup_end_time" class="sr-only"></label>'
					+ ' 					<input type="text" id="popup_end_time" name="popup_end_time" style="width: 100%" class="datetimepicker" placeholder="End datetime" validation-check="required" />'
					+ ' 				</div>'
					+ ' 			</div>'
					+ ' 		</div>'
					+ ' 	</div>'
					// Preparation Time
					
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
			worker_content: function(param) {
				var sample = ''
					+ '<div class="layer-cont ' + param.TYPE + '" popup-type="' + param.TYPE + '" target-id="' + param.TARGET_ID + '">'
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
					+ '					<col style="width:75px">'
					+ '					<col style="width:80px">'
					+ '					<col style="width:80px">'
					+ '				</colgroup>'
					+ ' 			<thead>'
					+ '					<tr>'
					+ '						<th>'
					+ '							<div class="checkbox-radio-custom">'
					+ ' 							<input type="checkbox" class="checkbox" id="all_check">'
					+ ' 							<label for="all_check"></label>'
					+ ' 						</div>'
					+ '						</th>'
					+ '						<th>Logo</th>'
					+ '						<th>Company</th>'
					+ '						<th>Worker</th>'
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
			tr_worker_row: function(param) {
				var sample = ''
					+ '<tr id="tr_' + param.ID + '">'
					+ '		<td>'
					+ '			<div class="checkbox-radio-custom">'
					+ '				<input type="checkbox" id="check_' + param.ID +  '" name="check" ' + (param.CHECKED ? 'checked' : '') + '>'
					+ '				<label for="check_' + param.ID +  '" class="sr-only"></label>'
					+ '			</div>'
					+ '		</td>'
					+ '		<td>'
					+ ' 		<img src="' + param.LOGO_PATH + '" style="width:80px;">'
					+ '		</td>'
					+ '		<td>' + param.COMPANY_NM + '</td>'
					+ '		<td>' + param.USER_NM + '</td>'
					+ '</tr>';
				return sample;
			},
			
		}
	},
	oam_010202: {
		main: {
			tr_item_row: function(param) {
				var sample = ''
					+ '<tr>'
					+ ' 	<td>' + param.CATEGORY + '</td>'
					+ ' 	<td>' + param.ITEM_NM + '</td>'
					+ '		<td>' + param.COST + '</td>'
							
//					+ '		<td>'
//					+ ' 		<span class="stock stock1">' + param.STATUS + '</span>'
//					+ ' 	</td>'

					+ '		<td>'
					+ '			<div style="line-height: 1;">' + param.START_TIME + '</div>'
					+ '			<div style="line-height: 1;">'
					+ ' 			<span style="padding-right: 0.5rem;font-size: 1.2rem;">~</span>' + param.END_TIME
					+ '			</div>'
					+ '		</td>'
					+ '</tr>';
				return sample;
			},
			tr_work_row: function(param) {
				
				param.WORKERS = param.WORKERS.join(', '); 
				
				// DETAIL 줄 수 나누기 
				//var front = '<p style="text-align:left; text-overflow:ellipsis; overflow: hidden;">';
				//var back = '</p>';	
				var front = '<span style="display:block; text-align:left; text-overflow:ellipsis; overflow: hidden;">';
				var back = '</span>';
				param.WORK_DETAIL = param.WORK_DETAIL.split('\n');
				param.WORK_DETAIL = front + param.WORK_DETAIL.join(back + ' ' + front) + back;
				
				var sample = ''
					+ '<tr id="tr_' + param.ID + '">'
					+ ' 	<td>' + param.WORK_TITLE + '</td>'
					+ ' 	<td>' + param.WORK_DETAIL + '</td>'
					+ ' 	<td>' + param.WORK_COST + '</td>'
					+ '		<td>' + param.WORKERS + '</td>'
					+ '		<td>'
					+ '			<div style="ine-height: 1;">' + param.START_TIME + '</div>'
					+ '			<div style="ine-height: 1;">'
					+ ' 			<span style="padding-right: 0.5rem;font-size: 1.2rem;">~</span>' + param.END_TIME
					+ '			</div>'
					+ '		</td>'
					+ '</tr>';	
				return sample;	
			},
			div_work_row: function(param){
				var sample = ''
					+ '<div class="base_grid_table table-row" style="margin-top:10px;">'
					+ '		<table>'
					+ '			<caption>Work - Maintenance code, Difficulty, Work, Detail, Attachment, Part Replacement</caption>'
					+ '			<colgroup>'
					+ '				<col style="width:20%">'
					+ '				<col style="width:80%">'
					+ '			</colgroup>'
					+ '			<tbody id="WORK_' + param.ID + '">'
					// WORK_NM
					+ '				<tr>'
					+ '					<th scope="row">Title</th>'
					+ '					<td class="txt-left">'
					+ '						<div class="registration-write">'
					+ '							<span>' + param.WORK_TITLE + '</span>'
					+ '						</div>'
					+ '					</td>'
					+ '				</tr>'
					// WORK_DETAIL
					+ '				<tr>'
					+ '					<th scope="row">Detail</th>'
					+ '					<td class="txt-left note">'
					+ '						<div class="registration-write change-line">'
					+ '							<span>' + param.WORK_DETAIL + '</span>'
					+ '						</div>'
					+ '					</td>'
					+ '				</tr>'
					// WORK_TIME
					+ '				<tr>'
					+ '					<th scope="row">Work Time</th>'
					+ '					<td class="txt-left">'
					+ '						<div class="calendar-picker" style="position:relative;width:60%;">'
					+ '							<div class="calendar-wrap">'
					+ '								<span>' + param.START_TIME + ' ~ ' + param.END_TIME + '</span>'
					+ '							</div>'
					+ '						</div>'
					+ '					</td>'
					+ '				</tr>'
					// COST
					+ '				<tr>'
					+ '					<th scope="row">Cost</th>'
					+ '					<td class="txt-left">'
					+ '						<div class="registration-write">'
					+ '							<span>' + param.WORK_COST + '</span>'
					+ '						</div>'
					+ '					</td>'
					+ '				</tr>'
					// WORKERS
					+ '				<tr>'
					+ '					<th scope="row" rowspan="2">Workers</th>'
					+ '					<td class="txt-left">'
					+ '						<div class="base_grid_table">'
					+ '							<table>'
					+ '								<colgroup>'
					+ '									<col style="width:50%">'
					+ '									<col style="width:50%">'
					+ '								</colgroup>'
					+ '								<thead>'
					+ '									<tr>'
					+ '										<th scope="col">Company</th>'
					+ '										<th scope="col">Worker</th>'
					+ '										<th scope="col"></th>'
					+ '									</tr>'
					+ '								</thead>'
					+ '								<tbody id="WORKER_LIST_' + param.ID + '">'
					
//					+ '									<tr id="WORKER">'
//					+ '										<td>WINDETEC</td>'
//					+ '										<td>박정권</td>'
//					+ '									</tr>'
					
					+ '								</tbody>'
					+ '							</table>'
					+ '						</div>'
					+ '					</td>'
					+ '				</tr>'
					+ '			</tbody>'
					+ '		</table>'
					+ '</div>';
				
				return sample;
			},
			tr_worker_row: function(param) {
				var sample = ''
					+ '<tr>'
					+ '		<td>' + param.COMPANY_NM + '</td>'
					+ '		<td>' + param.USER_NM + '</td>'
					+ '</tr>';
				return sample;
			}
			
		},
	},
	oam_0103: {
		main: {
			/* report li */
			li_report_row: function(param) {
				
				var sample = 
					'<li id="report_' + param.ID + '">'
					+ ' 	<div class="plan-lst-info-wrap">'
					+ ' 		<div class="plan-info-wrap">'
					+ ' 			<div class="checkbox-radio-custom">'
					+ (param.HAS_AUTH ? ' 				<input type="radio" name="radio" id="radio_' + param.ID + '">' : '') 
					+ ' 				<label for="radio_' + param.ID + '">' + param.RPT_TYPE + '</label>'
					+ ' 			</div>'
					+ ' 			<span class="plan-info">'
					+ ' 				<strong>' + param.RPT_NM + '</strong>'
					+ ' 			</span>'
					+ ' 		</div>'
					
					 
					+ '			<span class="plan-etc">'
					+ '				<em>' + param.REGISTRATOR + '</em>'
					+ '				<em>' + param.DATETIME + '</em>'
						
					+ (param.HAS_AUTH ? '				<a id="MODIFY_BTN_' + param.ID + '" href="javascript:void(0);" class="plan-modify" title="Modify report">' : '')
					+ (param.HAS_AUTH ? ' 					<span class="sr-only">modify report</span>' : '')
					+ (param.HAS_AUTH ? '					<i class="xi-pen"></i>' : '')
					+ (param.HAS_AUTH ? '				</a>' : '')
					

					+ '				<a id="DOWNLOAD_BTN_' + param.ID + '" href="javascript:void(0);" class="plan-modify" title="Download pdf">'
					+ '					<span class="sr-only">download pdf</span>'
					+ ' 				<i class="xi-download"></i>'
					+ '				</a>'
					+ '			</span>'
						
					+ ' 	</div>'
					+ (param.HAS_AUTH ? '		<span id="DELETE_BTN_' + param.ID + '" class="plan-Confirm">Delete</span>' : '')
					+ '</li>';
				return sample;
			},
			li_no_report_row: function() {
				var sample = 
					'<li>'
					+ ' 	<div class="plan-lst-info-wrap">'
					+ ' 		<div class="plan-info-wrap">'
					+ ' 			<div class="checkbox-radio-custom">'
					+ ' 				<label>No Report</label>'
					+ ' 			</div>'
					+ ' 			<span class="plan-info">'
					//+ ' 				<strong>Please fill out the report.</strong>'
					+ ' 			</span>'
					+ ' 		</div>'
					+ ' 	<div>'
					+ '</li>';
				return sample;
			},
		},
	},
	
	/* 점검 보고서 리스트 페이지 */
	oam_0200: {
		main: {
			tr_report_row: function(param) {
				var sample = 
					'<tr id="tr-' + param.ID + '">'
					+ '		<td>' + param.RN + '</td>' 												
					+ '		<td>' + param.ALARM_CODE + '</td>'
					+ '		<td>' + param.POSITION + '</td>'
					+ '		<td>' + param.RPT_NM + '</td>'
					+ '		<td>' + param.REGISTRATOR + '</td>'
					+ '		<td>' + param.DATETIME + '</td>'
					+ '		<td>'
					+ ' 		<a href="javascript:void(0);" class="download-btn" title="Download PDF">'
					+ ' 			<i class="xi-download"></i>'
					+ ' 		</a>'
					+ ' 	</td>'
					+ '</tr>';
				return sample;
			},
			no_data: function() {
				var sample = 
					'<tr><td colspan="7" style="padding: 10rem .45rem 10rem .45rem !important; font-size: 1rem !important;">No Data</td></tr>';
				return sample;
			}
		}, 
	},
	/* 점검 보고서 등록, 수정 페이지 */
	oam_0201: {
		main: {
			/* Safety, Perpose, Work 첨부파일 row - 변경 전 */
			li_file_row: function(param) {
				/*
				 * ID : 넘버링, FILE_SEQ
				 * TYPE : ISSUE, PURPOSE, PROCEDURE, WORK
				 * FILE_NAME : 파일 이름
				 * FILE_SIZE : 파일 크기
				 * FILE_TIME : 파일 시간
				 */
				/* 기존 */
				var sample = ''
					+ '<li id="' + param.TYPE + '_FILE_' + param.ID + '">'
					+ '		<span class="path-fiie-detail">'
					+ ' 		<strong class="file-name">' + param.FILE_NAME + '</strong>'
					+ ' 		<strong class="file-info">'
					+ ' 			<span class="input-group">'
					+ ' 				<label for="' + param.TYPE + '_FILE_INFO_' + param.ID + '" class="sr-only"></label>'
					+ ' 				<input type="text" name="' + param.TYPE + '_FILE_INFO_' + param.ID + '" id="' + param.TYPE + '_FILE_INFO_' + param.ID + '" placeholder="You can type up to 20 characters." maxlength="20">'
					+ ' 			</span>'
					+ ' 		</strong>'
					+ '			<em class="file-time">' + param.FILE_TIME + ' (' + param.FILE_SIZE + ')</em>'
					+ '		</span>'
					+ '		<span>'
					+ ' 		<button id="' + param.TYPE + '_FILE_DELETE_' + param.ID + '" class="delete-btn">'
					+ ' 			<i class="xi-trash" title="Delete file"></i>'
					+ ' 		</button>'
					+ '		</span>'
					+ '</li>';
				return sample;
			},
			/* Safety, Perpose, Work 첨부파일 row */
			tr_file_row: function(param) {
				/*
				 * ID : 넘버링, FILE_SEQ
				 * TYPE : ISSUE, PURPOSE, PROCEDURE, WORK
				 * FILE_NAME : 파일 이름
				 * FILE_SIZE : 파일 크기
				 * FILE_EXTENSION : 파일 확장자
				 */
				var sample = ''
					+ '<tr id="' + param.TYPE + '_FILE_' + param.ID + '">'
					+ ' 	<td>'
					+ ' 		<span class="path-img imgcut">'
					+ ' 			<span class="img">'
					+ ' 				<img src="' + (param.SRC ? param.SRC : '') + '" style="width:100%; height:100%; object-fit: scale-down;">'
					+ ' 			</span>'
					+ ' 		</span>'
					+ ' 	</td>'
					+ ' 	<td>'
					+ ' 		<div class="registration-write comments">'
					+ ' 			<label for="' + param.TYPE + '_FILE_INFO_' + param.ID + '" class="sr-only"></label>'
					+ ' 			<textarea id="' + param.TYPE + '_FILE_INFO_' + param.ID + '" style="border: 1px solid #f4f4f4;height:155px;" maxlength="100" max-line="6">' + (param.FILE_INFO ? param.FILE_INFO : '') + '</textarea>'
					+ ' 			<div>'
					+ ' 				<span style="float:left; overflow:hidden;text-overflow: ellipsis;white-space: nowrap; max-width:70%;">' + param.FILE_NAME + '</span>'
					+ '					<span style="float:left;">' + param.FILE_EXTENSION + '</span>'
					+ '					<span style="float:right;">(' + param.FILE_SIZE + ')</span>'
					+ ' 			</div>'
					+ ' 		</div>'
					+ ' 	</td>'
					+ ' 	<td>'
					+ ' 		<a id="' + param.TYPE + '_FILE_DELETE_' + param.ID + '" href="javascript:void(0);" class="delete-btn">'
					+ ' 			<i class="xi-trash" title="Delete file"></i>'
					+ ' 		</a>'
					+ ' 	</td>'
					+ '</tr>';
				return sample;	
			},
			/* file이 없을 경우 tr */
			tr_nofile_row: function(param) {
				var sample = '<tr id="NO_FILE"><td colspan="3">' + param.TEXT + '</td></tr>';
				return sample;
			},
			/* PART, TOOL, PPE row */
			tr_item_row: function(param) {
				/*
				 * ID : 넘버링, ITEM_ID
				 * TYPE : PART, TOOL, PPE
				 * CATEGORY  : 카테고리
				 * ITEM_NAME : 이름 
				 * RETURN_YN : 반납 여부
				 */
				var color = param.RETURN_YN ? '#455eee' : '#db4453';
				var checked = param.RETURN_YN ? ' checked' : '';
				var message = param.RETURN_YN ? 'Return completed' : 'Return not completed';
				
				var sample = ''
					+ '<tr id="tr_' + param.TYPE + '_' + param.ID + '">'
					+ ' 	<td>' + param.CATEGORY + '</td>'
					+ ' 	<td>' + param.ITEM_NM + '</td>'
					+ ' 	<td>'
					+ ' 		<span style="font-weight:500; color:' + color + ';">' + message + '</span>'
					+ ' 		<span class="active-toggle-wrap">'
					+ ' 			<input type="checkbox" id="CHECK_' + param.TYPE + '_' + param.ID + '" class="sr-only"' + checked + '>'
					+ ' 			<label for="CHECK_' + param.TYPE + '_' + param.ID + '">'
					+ ' 				<span class="sr-only"></span>'
					+ ' 			</label>'
					+ '			</span>'
					+ ' 	</td>'
					+ ' 	<td>'
					+ ' 		<span class="delete-btn">'
					+ ' 			<i class="xi-trash" title="Delete ' + param.TYPE.toLowerCase() + '"></i>'
					+ ' 		</span>'
					+ ' 	</td>'
					+ '</tr>';
				return sample;
			},
			div_work_row: function(param) {
				var sample = ''
					+ '<div class="base_grid_table table-row" style="margin-top:10px;">'
					+ '		<table>'
					+ '			<caption>Work - Maintenance code, Difficulty, Work, Detail, Attachment, Part Replacement</caption>'
					+ ' 		<colgroup>'
					+ ' 			<col style="width:20%">'
					+ ' 			<col style="width:80%">'
					+ ' 		</colgroup>'
					+ ' 		<tbody id="WORK_' + param.ID + '">'
					// MAINTENANCE CODE
					+ ' 			<tr>'
					+ ' 				<th scope="row">Maintenance code<span class="red"> *</span></th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<div class="registration-write btn-input-wrap">'
					+ ' 						<div class="input-group">'
					+ ' 							<label for="WORK_MAINTEN_CD_' + param.ID + '" class="sr-only"></label>'
					+ ' 							<input type="text" name="WORK_MAINTEN_CD_' + param.ID + '" id="WORK_MAINTEN_CD_' + param.ID + '" validation-check="required" placeholder="Select Code" readonly>'
					+ ' 						</div>'
					+ ' 						<button id="MAINTENCD_SEARCH_BTN_' + param.ID + '" type="button" class="input-btn btn-style1">Select</button>'
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					// DIFFICULTY
					+ ' 			<tr>'
					+ ' 				<th scope="row">Difficulty<span class="red"> *</span></th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<div class="registration-write registration-write-select">'
					+ ' 						<div class="input-group-wrapper">'
					+ ' 							<div class="select-box input-group">'
					+ ' 								<label for="WORK_DIFFICULTY_' + param.ID + '"></label>'
					+ ' 								<select name="WORK_DIFFICULTY_' + param.ID + '" id="WORK_DIFFICULTY_' + param.ID + '" class="info-select" validation-check="required">'
					+ ' 									<option value=""># Difficulty</option>'
					+ ' 									<option value="1">Safety</option>'
					+ ' 									<option value="2">Attention</option>'
					+ ' 									<option value="3">Caution</option>'
					+ ' 									<option value="4">Warning</option>'
					+ ' 									<option value="5">Danger</option>'
					+ ' 								</select>'
					+ ' 							</div>'
					+ ' 						</div>'
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					// TITLE
					+ ' 			<tr>'
					+ ' 				<th scope="row">'
					+ ' 					<span class="essential">Title<span class="red"> *</span></span>'
					+ ' 				</th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<div class="registration-write">'
					+ ' 						<div class="input-group">'
					+ ' 							<label for="WORK_NM_' + param.ID + '" class="sr-only"></label>'
					+ ' 							<input type="text" name="WORK_NM_' + param.ID + '" id="WORK_NM_' + param.ID + '" validation-check="required" maxlength="50">'
					+ ' 						</div>'
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					// DETAIL
					+ ' 			<tr>'
					+ ' 				<th scope="row">'
					+ ' 					<span class="essential">Detail<span class="red"> *</span></span>'
					+ ' 				</th>'
					+ ' 				<td class="txt-left note">'
					+ ' 					<div class="registration-write">'
					+ ' 						<div class="input-group">'
					+ ' 							<label for="WORK_DETAIL_' + param.ID + '" class="sr-only"></label>'
					+ ' 							<textarea name="WORK_DETAIL_' + param.ID + '" id="WORK_DETAIL_' + param.ID + '" validation-check="required" maxlength="4000"></textarea>'
					+ ' 						</div>'
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					// WORKTIME
					+ ' 			<tr>'
					+ ' 				<th scope="row">'
					+ ' 					<span class="essential">Work Time<span class="red"> *</span></span>'
					+ ' 				</th>'
					+ '					<td class="txt-left">'
					+ '						<div class="calendar-picker" style="position: relative; width: 60%;">'
					+ ' 						<div class="calendar-wrap">'
					+ ' 							<div class="input-group">'
					+ ' 								<label for="WORK_START_TIME_' + param.ID + '" class="sr-only"></label>'
					+ ' 								<input type="text" id="WORK_START_TIME_' + param.ID + '" name="WORK_START_TIME_' + param.ID + '" class="datetimepicker" placeholder="Start date" validation-check="required" readonly>'
					+ ' 							</div>'
					+ ' 							<em class="hyphen">'
					+ ' 								<span class="sr-only">-</span>'
					+ ' 							</em>'
					+ ' 							<div class="input-group">'
					+ ' 								<label for="WORK_END_TIME_' + param.ID + '" class="sr-only"></label>'
					+ ' 								<input type="text" id="WORK_END_TIME_' + param.ID + '" name="WORK_END_TIME_' + param.ID + '" class="datetimepicker" placeholder="End date" validation-check="required" readonly>'
					+ ' 							</div>'
					+ '							</div>'
					+ '						</div>'
					+ ' 					<div style="position:relative; float:right;">'
					+ ' 						<div class="checkbox-radio-custom">'
					+ ' 							<input type="checkbox" id="WORK_CHECK_DOWNTIME_' + param.ID + '" name="check">'
					+ ' 							<label for="WORK_CHECK_DOWNTIME_' + param.ID + '" class="sr-only" style="vertical-align:middle;"></label>'
					+ ' 						</div>'
					+ ' 						<span>Turbine Stop</span>'
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					// ATTACHMENT
					+ ' 			<tr>'
					+ ' 				<th scope="row" rowspan="2">'
					+ ' 					<span class="essential">Attachments</span>'
					+ ' 				</th>'
					+ ' 				<td class="txt-left">'
					+ '  					<div class="base_grid_table">'
					+ ' 						<table>'
					+ ' 							<caption>Attachment - NO, Images, Comments</caption>'
					+ ' 							<colgroup>'
					+ ' 								<col style="width:37.5%">'
					+ ' 								<col style="width:37.5%">'
					+ ' 								<col style="width:15%">'
					+ ' 							</colgroup>'
					+ ' 							<thead>'
					+ ' 								<tr>'
					+ ' 									<th scope="col">Images</th>'
					+ ' 									<th scope="col">Comment</th>'
					+ ' 									<th scope="col"></th>'
					+ ' 								</tr>'
					+ ' 							</thead>'
					+ ' 							<tbody id="WORK_FILE_LIST_' + param.ID + '">'
														// WORK_FILE
					+ '									<tr id="NO_FILE">'
					+ '										<td colspan="3">No File</td>'
					+ '									</tr>'
					
					+ ' 							</tbody>'
					+ ' 						</table>'
					+ '  					</div>'
					+ ' 				</td>'
					
					/* 기존 */
//					+ ' 				<td class="txt-left">'
//					+ ' 					<ul id="WORK_FILE_LIST_' + param.ID + '" class="path-file-wrk path-file">'
//											// WORK FILE
//					+ ' 					</ul>'
//					+ ' 					<div class="registration-write btn-input-wrap fake-field-file-wrap">'
//					+ ' 						<div class="input-group">'
//					+ ' 							<div class="fake-field-file-wrk fake-field-file" id="fake-field-file-wrk"></div>'
//													// multiple 사용 불가
//					+ ' 							<input type="file" name="ADD_FILE_WORK_' + param.ID + '" id="ADD_FILE_WORK_' + param.ID + '" class="field-file" accept="image/*">'
//					+ ' 						</div>'
//					+ ' 						<label for="ADD_FILE_WORK_' + param.ID + '" aria-label="Attach file" class="registration-search-btn">'
//					+ ' 							<i class="xi-paperclip"></i>'
//					+ ' 						</label>'
//					+ ' 					</div>'
//					+ ' 				</td>'
					+ ' 			</tr>'
					
					/* 신규 */
					+ ' 			<tr>'
					+ ' 				<td class="txt-left">'
					+ ' 					<div class="registration-write btn-input-wrap fake-field-file-wrap">'
					+ ' 						<div class="input-group">'
					+ ' 							<div class="fake-field-file"></div>'
													// multiple 사용 불가
					+ ' 							<input type="file" name="ADD_FILE_WORK_' + param.ID + '" id="ADD_FILE_WORK_' + param.ID + '" class="field-file" accept=".png,.jpg,.jpeg">'
					+ ' 						</div>'
					+ ' 						<label for="ADD_FILE_WORK_' + param.ID + '" aria-label="Attach file" class="registration-search-btn">'
					+ ' 							<i class="xi-paperclip" title="Add file"></i>'
					+ ' 						</label>'
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					
					+ ' 	</tbody>'
					+ '		</table>'
					+ '		<span id="DELETE_BTN_' + param.ID + '" href="javascript:void(0);" class="row-delete">'
					+ ' 		<span class="sr-only">close layer popup</span>'
					+ ' 		<i class="xi-trash" title="Delete work"></i>'
					+ '		</span>'
					+ '</div>'
				return sample;
			},
		},
		popup: {
			/* 발전기 콘텐츠 */
			turbine_content: function(param) {
				var sample = ''
					+ '<div class="layer-cont" popup-type="' + param.TYPE + '">'
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
					+ ' 					<input id="popup_search" type="text" placeholder="Enter your search term and then press Enter.">'
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
					+ '					<col style="width:50px">'
					+ '					<col style="width:50px">'
					+ '					<col style="width:50px">'
					+ '				</colgroup>'
					+ ' 			<thead>'
					+ '					<tr>'
					+ '						<th></th>'
					+ '						<th>Farm</th>'
					+ '						<th>Group</th>'
					+ '						<th>Turbine</th>'
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
//					+ '						<td>A</td>'
//					+ '						<td>A</td>'
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
			/* 발전기 ROW */
			tr_turbine_row: function(param) {
				var sample = ''
					+ '<tr id="tr_' + param.ID + '">'
					+ ' 	<td>'
					+ ' 		<div class="checkbox-radio-custom">'
					+ ' 			<input type="radio" id="raido_' + param.ID + '" name="raido">'
					+ ' 			<label for="raido_' + param.ID + '" class="sr-only"></label>'
					+ ' 		</div>'
					+ ' 	</td>'
					+ ' 	<td>' + param.FARM_NM + '</td>'
					+ ' 	<td>' + param.GROUP_NM + '</td>'
					+ ' 	<td>' + param.TURBINE_NM + '</td>'
					+ '</tr>'
				return sample;
			},
			/* 유지보수사 콘텐츠 */
			company_content: function(param) {
				var sample = ''
					+ '<div class="layer-cont" popup-type="' + param.TYPE + '">'
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
					+ ' 					<input id="popup_search" type="text" placeholder="Enter your search term and then press Enter.">'
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
					+ '					<col style="width:75px">'
					+ '					<col style="width:75px">'
					+ '				</colgroup>'
					+ ' 			<thead>'
					+ '					<tr>'
					+ '						<th></th>'
					+ '						<th>Logo</th>'
					+ '						<th>ISP</th>'
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
			tr_company_row: function(param) {
				var sample = ''
					+ '<tr id="tr_' + param.ID + '">'
					+ '		<td>'
					+ '			<div class="checkbox-radio-custom">'
					+ '				<input type="radio" id="radio_' + param.ID +  '" name="raido">'
					+ '				<label for="radio_' + param.ID +  '" class="sr-only"></label>'
					+ '			</div>'
					+ '		</td>'
					+ '		<td>'
					+ ' 		<img src="' + param.LOGO_PATH + '" style="width:80px;">'
					+ '		</td>'
					+ '		<td>' + param.COMPANY_NM + '</td>'
					+ '</tr>'
				return sample;
			},
			/* 작업자 콘텐츠 */
			worker_content: function(param) {
				var sample = ''
					+ '<div class="layer-cont" popup-type="' + param.TYPE + '">'
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
					+ ' 					<input id="popup_search" type="text" placeholder="Enter your search term and then press Enter.">'
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
					+ '					<col style="width:75px">'
					+ '					<col style="width:75px">'
					+ '				</colgroup>'
					+ ' 			<thead>'
					+ '					<tr>'
					+ '						<th></th>'
					+ '						<th>Company</th>'
					+ '						<th>Name</th>'
					+ '					</tr>'
					+ ' 			</thead>'
					+ ' 			<tbody id="popup_list">'
					
					// Sample
//					+ '					<tr>'
//					+ '						<td>'
//					+ '							<div class="checkbox-radio-custom">'
//					+ '								<input type="checkbox" id="check" name="checkA">'
//					+ '								<label for="checkA" class="sr-only"></label>'
//					+ '							</div>'
//					+ '						</td>'
//					+ '						<td>A</td>'
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
			tr_worker_row: function(param) {
				var sample = ''
					+ '<tr id="tr_' + param.ID + '">'
					+ '		<td>'
					+ '			<div class="checkbox-radio-custom">'
					+ '				<input type="checkbox" id="check_' + param.ID + '" name="check">'
					+ '				<label for="check_' + param.ID + '" class="sr-only"></label>'
					+ '			</div>'
					+ '		</td>'
					+ '		<td>' + param.COMPANY_NM + '</td>'
					+ '		<td>' + param.WORKER_NM + '</td>'
					+ '</tr>';
				return sample;
			},
			/* 유지보수 코드 콘텐츠 */ 
			code_content: function(param){
				var sample = ''
					+ '<div class="layer-cont" popup-type="' + param.TYPE + '" work-id="' + param.WORK_ID + '">'
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
					+ ' 					<input id="popup_search" type="text" placeholder="Enter your search term and then press Enter.">'
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
					+ '					<col style="width:15%">'
					+ '					<col style="width:20%">'
					+ '					<col style="width:65%">'
					+ '				</colgroup>'
					+ ' 			<thead>'
					+ '					<tr>'
					+ '						<th></th>'
					+ '						<th>Code</th>'
					+ '						<th>Name</th>'
					+ '					</tr>'
					+ ' 			</thead>'
					+ ' 			<tbody id="popup_list">'
					
					// Sample
//					+ '					<tr style="font-weight: bold;">'
//					+ '						<td>'
//					+ '						</td>'
//					+ '						<td>A</td>'
//					+ '						<td>A</td>'
//					+ '					</tr>'
//					
//					+ '					<tr>'
//					+ '						<td>'
//					+ '							<div class="checkbox-radio-custom">'
//					+ '								<input type="checkbox" id="check" name="checkA">'
//					+ '								<label for="checkA" class="sr-only"></label>'
//					+ '							</div>'
//					+ '						</td>'
//					+ '						<td>A</td>'
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
			/* MAINTEN LEV1 CODE ROW*/
			tr_codeLEV1_row: function(param) {
				var sample = ''
					+ '<tr id="tr_lev1_' + param.ID + '" style="font-weight: bold;">'
					+ '		<td>'
					+ '		</td>'
					+ '		<td>' + param.CODE + '</td>'
					+ '		<td>' + param.NAME + '</td>'
					+ '</tr>';
				return sample;
			},
			/* MAINTEN LEV2 CODE ROW*/
			tr_code_row: function(param) {
				var sample = ''
					+ '<tr id="tr_' + param.ID + '">'
					+ '		<td>'
					+ '			<div class="checkbox-radio-custom">'
					+ '				<input type="radio" id="radio_' + param.ID + '" name="radio">'
					+ '				<label for="radio_' + param.ID + '" class="sr-only"></label>'
					+ '			</div>'
					+ '		</td>'
					+ '		<td>' + param.CODE + '</td>'
					+ '		<td>' + param.NAME + '</td>'
					+ '</tr>';
				return sample;	
			},
			/* PART, TOOL, PPE Content */
			item_content: function(param) {
				// title 앞글자만 대문자, 나머지 소문자로 변경
				param.TITLE = param.TITLE !== 'PPE' ? param.TITLE.charAt(0) + param.TITLE.slice(1).toLowerCase() : param.TITLE;
				var sample = ''
					+ '<div class="layer-cont" popup-type="' + param.TYPE + '">'
					// Title
					+ ' 	<div class="tit-wrap">'
					+ ' 		<strong id="popup_title" class="heading6">' + param.TITLE + '</strong>'
					+ '		</div>'
					// Title
					
					// Select Category
					+ '		<div class="category-wrap">'
					+ '			<span class="category-name">Category<span class="red"> *</span></span>'
					+ ' 		<div class="select-box">'
					+ '				<label for="popup_category"></label>'
					+ ' 			<select id="popup_category" name="popup_category" class="info-select">'
					+ ' 				<option value="#"># Category</option>'
					+ ' 			</select>'
					+ ' 		</div>'
					+ ' 	</div>'
					// Select Category
					
					// Select Item
					+ '		<div class="category-wrap">'
					+ '			<span class="category-name">' + param.TITLE + '<span class="red"> *</span></span>'
					+ ' 		<div class="select-box input-group">'
					+ '				<label for="popup_item"></label>'
					+ ' 			<select id="popup_item" name="popup_item" class="info-select" validation-check="required">'
					+ ' 				<option value=""># ' + param.TITLE + '</option>'
					+ ' 			</select>'
					+ ' 		</div>'
					+ ' 	</div>'
					// Select Item
					
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
		}
	},
	/* 점검 보고서 상세 페이지 */
	oam_0202: {
		main: {
			/* Safety, Perpose, Work 첨부파일 row */
			tr_file_row: function(param) {
				/*
				 * ID : 넘버링, FILE_SEQ
				 * TYPE : ISSUE, PURPOSE, PROCEDURE, WORK
				 * FILE_NAME : 파일 이름
				 * FILE_SIZE : 파일 크기
				 * FILE_EXTENSION : 파일 확장자
				 */
				param.FILE_INFO = '<p>' + param.FILE_INFO.split('\n').join('</p><p>') + '</p>'; 
				var sample = ''
					+ '<tr id="' + param.TYPE + '_FILE_' + param.ID + '">'
					+ ' 	<td>'
					+ ' 		<span class="path-img imgcut">'
					+ ' 			<span class="img">'
					+ ' 				<img src="' + param.SRC + '" style="width:100%; height:100%; object-fit: scale-down;">'
					+ ' 			</span>'
					+ ' 		</span>'
					+ ' 	</td>'
					+ ' 	<td>'
					+ ' 		<div class="registration-write comments">'
					+ ' 			<div style="height:155px;text-align:left;">'
									// <p>contents 1row</p>
					+ param.FILE_INFO
					+ ' 			</div>'
					+ ' 			<div>'
					+ ' 				<span style="float:left; overflow:hidden;text-overflow: ellipsis;white-space: nowrap; max-width:70%;">' + param.FILE_NAME + '</span>'
					+ '					<span style="float:left;">' + param.FILE_EXTENSION + '</span>'
					+ '					<span style="float:right;">(' + param.FILE_SIZE + ')</span>'
					+ ' 			</div>'
					+ ' 		</div>'
					+ ' 	</td>'
					+ '</tr>';
				return sample;	
			},
			/* file이 없을 경우 tr */
			tr_nofile_row: function(param) {
				var sample = '<tr><td colspan="2">' + param.TEXT + '</td></tr>';
				return sample;
			},
			tr_item_row: function(param) {
				var color = param.RETURN_YN ? '#455eee' : '#db4453';
				var message = param.RETURN_YN ? 'Return completed' : 'Return not completed';
				var sample = ''
					+ '<tr>'
					+ '		<td>' + param.CATEGORY + '</td>'
					+ '		<td>' + param.ITEM_NM + '</td>'
					+ '		<td><sapn style="font-weight:500;color:' + color + ';" >' + message + '</span></td>'
					+ '</tr>';
				return sample;	
			},
			/* file이 없을 경우 tr */
			tr_noitem_row: function(param) {
				var sample = '<tr><td colspan="3">' + param.TEXT + '</td></tr>';
				return sample;
			},
			div_work_row: function(param) {
				
				// 작업 위험도 
				var difficulty_color = ['#479B5F', '#A6CB72', '#EDBC40', '#DC6129', '#c6162b'][param.DIFFICULTY - 1];
				var difficulty_message = ['Safety', 'Attention', 'Caution', 'Warning', 'Danger'][param.DIFFICULTY - 1];
				
				// 작업 상세 
				var work_detail = '<p>' + param.WORK_DETAIL.split('\n').join('</p><p>') + '</p>';
				
				// 작업 시간
				param.DOWNTIME_YN = param.DOWNTIME_YN === 'Y' ? 'With Turbine Stop' : '';
				
				var sample = ''
					+ '<div class="base_grid_table" style="margin-top:10px;">'
					+ '		<table>'
					+ '			<caption>Work - Maintenance code, Difficulty, Work, Detail, Attachment, Part Replacement</caption>'
					+ ' 		<colgroup>'
					+ ' 			<col style="width:20%">'
					+ ' 			<col style="width:80%">'
					+ ' 		</colgroup>'
					+ ' 		<tbody id="WORK_' + param.ID + '">'
					// MAINTENANCE CODE
					+ ' 			<tr>'
					+ ' 				<th scope="row">Maintenance code</th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<div class="registration-write">'
					+ ' 						<span>' + param.MAINTEN_CD + '</span>'
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					// DIFFICULTY
					+ ' 			<tr>'
					+ ' 				<th scope="row">Difficulty</th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<div class="registration-write">'
					+ ' 						<span style="font-weight:500;color:' + difficulty_color + ';">' + difficulty_message + '</span>'
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					// TITLE
					+ ' 			<tr>'
					+ ' 				<th scope="row">'
					+ ' 					<span class="essential">Title</span>'
					+ ' 				</th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<div class="registration-write">'
					+ ' 						<span>' + param.WORK_NM + '</span>'		
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					// DETAIL
					+ ' 			<tr>'
					+ ' 				<th scope="row">'
					+ ' 					<span class="essential">Detail</span>'
					+ ' 				</th>'
					+ ' 				<td class="txt-left note">'
					+ ' 					<div class="registration-write class" style="clear:left; white-space:pre-line; word-break:break-all;">' + work_detail + '</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					// WORKTIME
					+ ' 			<tr>'
					+ ' 				<th scope="row">'
					+ ' 					<span class="essential">Work Time</span>'
					+ ' 				</th>'
					+ '					<td class="txt-left note">'
					+ ' 					<div class="registration-write">'
					+ ' 						<span>' + param.WORK_TIME + '</span>'
					+ ' 						<span class="total-hour point2">' + param.WORK_TOTAL_TIME + '</span>'
					+ ' 						<span class="total-hour point2">' + param.DOWNTIME_YN + '</span>'
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					// ATTACHMENT
					+ ' 			<tr>'
					+ ' 				<th scope="row"">'
					+ ' 					<span class="essential">Attachments</span>'
					+ ' 				</th>'
					+ ' 				<td class="txt-left">'
					+ '  					<div class="base_grid_table">'
					+ ' 						<table>'
					+ ' 							<caption>Attachment - NO, Images, Comments</caption>'
					+ ' 							<colgroup>'
					+ ' 								<col style="width:37.5%">'
					+ ' 								<col style="width:37.5%">'
					+ ' 							</colgroup>'
					+ ' 							<thead>'
					+ ' 								<tr>'
					+ ' 									<th scope="col">Images</th>'
					+ ' 									<th scope="col">Comment</th>'
					+ ' 								</tr>'
					+ ' 							</thead>'
					+ ' 							<tbody id="WORK_FILE_LIST_' + param.ID + '">'
														// WORK_FILE
					
					+ ' 							</tbody>'
					+ ' 						</table>'
					+ '  					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					
					+ ' 	</tbody>'
					+ '		</table>'
					+ '</div>'
				return sample;
			},
		}, 
		popup: {
			
		}
	},
	/* 블레이드 점검 보고서 리스트 페이지 */
	oam_0300: {
		main: {
			tr_report_row: function(param) {
				var sample = 
					'<tr id="tr-' + param.ID + '">'
					+ '		<td>' + param.RN + '</td>' 												
					+ '		<td>' + param.ALARM_CODE + '</td>'
					+ '		<td>' + param.POSITION + '</td>'
					+ '		<td>' + param.RPT_NM + '</td>'
					+ '		<td>' + param.REGISTRATOR + '</td>'
					+ '		<td>' + param.DATETIME + '</td>'
					+ '		<td>'
					+ ' 		<a href="javascript:void(0);" class="download-btn" title="Download PDF">'
					+ ' 			<i class="xi-download"></i>'
					+ ' 		</a>'
					+ ' 	</td>'
					+ '</tr>';
				return sample;
			},
			no_data: function() {
				var sample = 
					'<tr><td colspan="7" style="padding: 10rem .45rem 10rem .45rem !important; font-size: 1rem !important;">No Data</td></tr>';
				return sample;
			}
		}, 
	},
	/* 블레이드 점검 보고서 등록, 수정 페이지 */
	oam_0301: {
		main: {
			div_flight_row: function(param) {
				var sample = ''
					+ '<div class="base_grid_table table-row" style="margin-top:10px;">'
					+ ' 	<table>'
					+ ' 		<caption>>Flight time &amp; Weather - Down time</caption>'
					+ ' 		<colgroup>'
					+ ' 			<col style="width: 10%">'	
					+ ' 			<col style="width: 15%">'	
					+ ' 			<col style="width: 75%">'	
					+ ' 		</colgroup>'
					+ '			<tbody id="FLIGHT_' + param.ID + '">'
					+ ' 			<tr>'
					+ ' 				<th scope="row" rowspan="5">Weather</th>'
					+ ' 			</tr>'
					+ ' 			<tr>'
					+ ' 				<th scope="row" style="border-left:1px;">Weather<span class="red"> *</span></th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<div class="registration-write registration-write-select">'
					+ ' 						<div class="input-group-wrapper">'
					+ ' 							<div class="select-box input-group">'
					+ ' 								<label for="FLIGHT_WEATHER_' + param.ID + '"></label>'
					+ ' 								<select id="FLIGHT_WEATHER_' + param.ID + '" class="info-select" validation-check="required">'
					+ ' 									<option value=""># Weather</option>'
					+ ' 									<option value="SUNNY">맑음 / Sunny</option>'
					+ ' 									<option value="CLOUD">흐림 / Cloud</option>'
					+ ' 									<option value="RAIN">비  / Rain</option>'
					+ ' 									<option value="SNOW">눈  / Snow</option>'
					+ ' 									<option value="THUNDERSTORM">천둥 / Thunderstorm</option>'
					+ ' 									<option value="MIST">안개 / Mist</option>'
					+ ' 								</select>'
					+ ' 							</div>'
					+ ' 						</div>'
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					+ ' 			<tr>'
					+ ' 				<th scope="row" style="border-left: 1px;">Temperature (°C)<span class="red"> *</span></th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<div class="registration-write">'
					+ ' 						<div class="input-group">'
					+ ' 							<label for="FLIGHT_TEMPERATURE_' + param.ID + '" class="sr-only"></label>'
					+ ' 							<input type="text" id="FLIGHT_TEMPERATURE_' + param.ID + '" validation-check="required" maxNumberLength="2" maxDecimalLength="2" placeholder="You can enter 2 integers and 2 decimal places.">'
					+ ' 						</div>'
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					+ ' 			<tr>'
					+ ' 				<th scope="row" style="border-left: 1px;">Wind Speed (m/s)<span class="red"> *</span></th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<div class="registration-write">'
					+ ' 						<div class="input-group">'
					+ ' 							<label for="FLIGHT_WIND_SPEED_' + param.ID + '" class="sr-only"></label>'
					+ ' 							<input type="text" id="FLIGHT_WIND_SPEED_' + param.ID + '" validation-check="required" maxNumberLength="3" maxDecimalLength="2" placeholder="You can enter 3 integers and 2 decimal places.">'
					+ ' 						</div>'
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					+ ' 			<tr>'
					+ ' 				<th scope="row" style="border-left: 1px;">Humidity (%)<span class="red"> *</span></th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<div class="registration-write">'
					+ ' 						<div class="input-group">'
					+ ' 							<label for="FLIGHT_HUMIDITY_' + param.ID + '" class="sr-only"></label>'
					+ ' 							<input type="text" id="FLIGHT_HUMIDITY_' + param.ID + '" validation-check="required" maxNumberLength="2" maxDecimalLength="2" placeholder="You can enter 2 integers and 2 decimal places.">'
					+ ' 						</div>'
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					+ ' 			<tr>'
					+ ' 				<th scope="row" colspan="2">Flight Time<span class="red"> *</span></th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<div class="calendar-picker" style="position:relative;width:60%;">'
					+ ' 						<div class="calendar-wrap">'
					+ ' 							<div class="input-group">'
					+ ' 								<label for="FLIGHT_START_TIME_' + param.ID + '" class="sr-only"></label>'
					+ ' 								<input type="text" id="FLIGHT_START_TIME_' + param.ID + '" name="FLIGHT_START_TIME_' + param.ID + '" class="datetimepicker" validation-check="required" placeholder="Start time" readonly>'
					+ ' 							</div>'
					+ ' 							<em class="hyphen"><span class="sr-only">-</span></em>'
					+ ' 							<div class="input-group">'
					+ ' 								<label for="FLIGHT_END_TIME_' + param.ID + '" class="sr-only"></label> '
					+ ' 								<input type="text" id="FLIGHT_END_TIME_' + param.ID + '" name="FLIGHT_END_TIME_' + param.ID + '" class="datetimepicker" validation-check="required" placeholder="End time" readonly>'
					+ ' 							</div>'
					+ ' 						</div>'
					+ ' 					</div>'
					+ ' 					<div style="position:realative;float:right;">'
					+ ' 						<div class="checkbox-radio-custom">'
					+ ' 							<input type="checkbox" id="FLIGHT_CHECK_DOWNTIME_' + param.ID + '" name="check">'
					+ ' 							<label for="FLIGHT_CHECK_DOWNTIME_' + param.ID + '" class="sr-only" style="vertical-align:middle;"></label>'
					+ ' 						</div>'
					+ ' 						<span>Turbine Stop</span>'
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					+ ' 			<tr>'
					+ ' 				<th scope="row" colspan="2">Remarks</th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<div class="registration-write">'
					+ ' 						<div class="input-group">'
					+ ' 							<label for="FLIGHT_RMK_' + param.ID + '" class="sr-only"></label>'
					+ ' 							<input type="text" id="FLIGHT_RMK_' + param.ID + '" maxlength="50">'
					+ ' 						</div>'
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					+ ' 		</tbody>'
					+ ' 	</table>'
					+ '		<span id="DELETE_BTN_' + param.ID + '" href="javascript:void(0);" class="row-delete">'
					+ ' 		<span class="sr-only">close layer popup</span>'
					+ ' 		<i class="xi-trash" title="Delete flight"></i>'
					+ '		</span>'
					+ '</div>';
				return sample;
			},
			tr_damage_row: function(param) {
				var sample = ''
					+ '<tr id="DAMAGE_' + param.ID + '">'
					+ ' 	<td>' + param.NO + '</td>'
					+ ' 	<td>' + param.BLADE_SERIAL_NUM + '</td>'
					+ ' 	<td>' + param.MAINTEN_CD + '</td>'
					+ ' 	<td>' + param.DMG_AREA + '</td>'
					+ ' 	<td>' + param.DMG_INFO + '</td>'
					+ ' 	<td>'
								// num-mark 1~5
					+ ' 		<span class="num-mark num-mark' + param.DMG_SEVERITY + '">' + param.DMG_SEVERITY +  '</span>'
					+ ' 	</td>'
					+ ' 	<td>' + param.ATTACHMENT_CNT + '</td>'
					+ ' 	<td>'
					//+ ' 		<span id="DAMAGE_UPDATE_' + param.ID + '" class="delete-btn"><i class="xi-pen"></i></span>'
					+ ' 		<span id="DAMAGE_DELETE_' + param.ID + '" class="delete-btn"><i class="xi-trash" title="Delete damage"></i></span>'
					+ ' 	</td>'
 					+ '</tr>';
				return sample;
			},
		},
		popup: {
			model_content: function(param) {
				var sample = ''
					+ '<div class="layer-cont" popup-type="' + param.TYPE + '">'
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
					+ ' 					<input id="popup_search" type="text" placeholder="Enter your search term and then press Enter.">'
					+ ' 				</div>'
					+ ' 				<a id="popup_search_refresh" class="refresh-btn">'
					+ ' 					<i class="xi-refresh"></i>'
					+ ' 				</a>'
					+ '				</form>'
					+ ' 		</div>'
					+ ' 	</div>'
					// SearchBox
					
					// Table
					+ '		<div class="base_grid_table" style="margin-bottom:10px;width:100%;max-height:80%;">'
					+ ' 		<table>'
					+ '				<colgroup>'
					+ '					<col style="width:10%">'
					+ '					<col style="width:35%">'
					+ '					<col style="width:15%">'
					+ '					<col style="width:40%">'
					+ '				</colgroup>'
					+ ' 			<thead>'
					+ '					<tr>'
					+ '						<th scope="row"></th>'
					+ '						<th scope="row">Image</th>'
					+ '						<th colspan="2" scope="row">Specifications</th>'
					+ '					</tr>'
					+ ' 			</thead>'
					+ ' 			<tbody id="popup_list">'
					
					
					
					
					+ ' 			</tbody>'
					+ ' 		</table>'
					+ ' 	</div>'
					// Table
					
					// Button
					+ ' 	<div class="txt-right">'
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
			tr_model_row:function(param) {
				var sample = ''
					+ '<tr id="tr_' + param.ID + '_A">'
					+ ' 	<td rowspan="6">'
					+ ' 		<div class="checkbox-radio-custom">'
					+ ' 			<input type="radio" id="radio_' + param.ID + '" name="radio">'
					+ ' 			<label for="radio_' + param.ID + '" class="sr-only"></label>'
					+ ' 		</div>'
					+ ' 	</td>'
					+ ' 	<td rowspan="6">'
					+ ' 		<img src="' + param.SRC + '" style="width:100%;max-height:200px;object-fit:scale-down;">'
					+ ' 	</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_B">'
					+ ' 	<th scope="row">Model</th>'
					+ ' 	<td>' + param.MODEL_NM + '</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_C">'
					+ ' 	<th scope="row">Manufacturer</th>'
					+ ' 	<td>' + param.MANUFACTURER_NM + '</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_D">'
					+ ' 	<th scope="row">Power</th>'
					+ ' 	<td>' + param.POWER + '</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_E">'
					+ ' 	<th scope="row">Rotor Diameter</th>'
					+ ' 	<td>' + param.ROTOR_D + '</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_F">'
					+ ' 	<th scope="row">Tower Height</th>'
					+ ' 	<td>' + param.TOWER_H + '</td>'
					+ '</tr>';
				return sample;
			},
			drone_content: function(param) {
				var sample = ''
					+ '<div class="layer-cont" popup-type="' + param.TYPE + '">'
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
					+ ' 					<input id="popup_search" type="text" placeholder="Enter your search term and then press Enter.">'
					+ ' 				</div>'
					+ ' 				<a id="popup_search_refresh" class="refresh-btn">'
					+ ' 					<i class="xi-refresh"></i>'
					+ ' 				</a>'
					+ '				</form>'
					+ ' 		</div>'
					+ ' 	</div>'
					// SearchBox
					
					// Table
					+ '		<div class="base_grid_table" style="margin-bottom:10px;width:100%;max-height:80%;">'
					+ ' 		<table>'
					+ '				<colgroup>'
					+ '					<col style="width:10%">'
					+ '					<col style="width:35%">'
					+ '					<col style="width:15%">'
					+ '					<col style="width:40%">'
					+ '				</colgroup>'
					+ ' 			<thead>'
					+ '					<tr>'
					+ '						<th scope="row"></th>'
					+ '						<th scope="row">Image</th>'
					+ '						<th colspan="2" scope="row">Specifications</th>'
					+ '					</tr>'
					+ ' 			</thead>'
					+ ' 			<tbody id="popup_list">'
					
					
					
					
					+ ' 			</tbody>'
					+ ' 		</table>'
					+ ' 	</div>'
					// Table
					
					// Button
					+ ' 	<div class="txt-right">'
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
			tr_drone_row:function(param) {
				var sample = ''
					+ '<tr id="tr_' + param.ID + '_A">'
					+ ' 	<td rowspan="9">'
					+ ' 		<div class="checkbox-radio-custom">'
					+ ' 			<input type="radio" id="radio_' + param.ID + '" name="radio">'
					+ ' 			<label for="radio_' + param.ID + '" class="sr-only"></label>'
					+ ' 		</div>'
					+ ' 	</td>'
					+ ' 	<td rowspan="9">'
					+ ' 		<img src="' + param.SRC + '" style="width:100%;max-height:200px;object-fit:scale-down;">'
					+ ' 	</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_B">'
					+ ' 	<th scope="row">Model</th>'
					+ ' 	<td>' + param.DRONE_NM + '</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_C">'
					+ ' 	<th scope="row">Manufacturer</th>'
					+ ' 	<td>' + param.MANUFACTURER_NM + '</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_D">'
					+ ' 	<th scope="row">Type</th>'
					+ ' 	<td>' + param.TYPE + '</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_E">'
					+ ' 	<th scope="row">Flight Time</th>'
					+ ' 	<td>' + param.FLIGHT_TIME + '</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_F">'
					+ ' 	<th scope="row">Flight Range</th>'
					+ ' 	<td>' + param.FLIGHT_RNG + '</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_G">'
					+ ' 	<th scope="row">Flight Altitude</th>'
					+ ' 	<td>' + param.FLIGHT_ALT + '</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_H">'
					+ ' 	<th scope="row">Flight Speed</th>'
					+ ' 	<td>' + param.FLIGHT_SPD + '</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_I">'
					+ ' 	<th scope="row">Flight Wind Speed</th>'
					+ ' 	<td>' + param.FLIGHT_WIND_SPD + '</td>'
					+ '</tr>';
				return sample;
			},
			blade_type_content: function(param) {
				var sample = ''
					+ '<div class="layer-cont" popup-type="' + param.TYPE + '" blade-num="' + param.BLADE_NUM + '">'
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
					+ ' 					<input id="popup_search" type="text" placeholder="Enter your search term and then press Enter.">'
					+ ' 				</div>'
					+ ' 				<a id="popup_search_refresh" class="refresh-btn">'
					+ ' 					<i class="xi-refresh"></i>'
					+ ' 				</a>'
					+ '				</form>'
					+ ' 		</div>'
					+ ' 	</div>'
					// SearchBox
					
					// Table
					+ '		<div class="base_grid_table" style="margin-bottom:10px;width:100%;max-height:80%;">'
					+ ' 		<table>'
					+ '				<colgroup>'
					+ '					<col style="width:15px">'
					+ '					<col style="width:25px">'
					+ '					<col style="width:60px">'
					+ '				</colgroup>'
					+ ' 			<thead>'
					+ '					<tr>'
					+ '						<th></th>'
					+ '						<th>Code</th>'
					+ '						<th>Detail</th>'
					+ '					</tr>'
					+ ' 			</thead>'
					+ ' 			<tbody id="popup_list">'
					// Sample
//					+ '					<tr>'
//					+ '						<td>'
//					+ '							<div class="checkbox-radio-custom">'
//					+ '								<input type="checkbox" id="check" name="checkA">'
//					+ '								<label for="checkA" class="sr-only"></label>'
//					+ '							</div>'
//					+ '						</td>'
//					+ '						<td>A</td>'
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
			tr_blade_type_row: function(param) {
				var sample = ''
					+ '<tr id="tr_' + param.ID + '">'
					+ '		<td>'
					+ '			<div class="checkbox-radio-custom">'
					+ '				<input type="radio" id="radio_' + param.ID + '" name="radio">'
					+ '				<label for="radio_' + param.ID + '" class="sr-only"></label>'
					+ '			</div>'
					+ '		</td>'
					+ '		<td>' + param.TYPE_CD + '</td>'
					+ '		<td>' + param.TYPE_DETAIL + '</td>'
					+ '</tr>';
				return sample;
			},
			blade_color_content: function(param) {
				var sample = ''
					+ '<div class="layer-cont" popup-type="' + param.TYPE + '" blade-num="' + param.BLADE_NUM + '">'
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
					+ ' 					<input id="popup_search" type="text" placeholder="Enter your search term and then press Enter.">'
					+ ' 				</div>'
					+ ' 				<a id="popup_search_refresh" class="refresh-btn">'
					+ ' 					<i class="xi-refresh"></i>'
					+ ' 				</a>'
					+ '				</form>'
					+ ' 		</div>'
					+ ' 	</div>'
					// SearchBox
					
					// Table
					+ '		<div class="base_grid_table" style="margin-bottom:10px;">'
					+ ' 		<table>'
					+ '				<colgroup>'
					+ '					<col style="width:20px">'
					+ '					<col style="width:75px">'
					+ '					<col style="width:75px">'
					+ '				</colgroup>'
					+ ' 			<thead>'
					+ '					<tr>'
					+ '						<th></th>'
					+ '						<th>Color</th>'
					+ '						<th>Name</th>'
					+ '					</tr>'
					+ ' 			</thead>'
					+ ' 			<tbody id="popup_list">'
					
					// Sample
//					+ '					<tr>'
//					+ '						<td>'
//					+ '							<div class="checkbox-radio-custom">'
//					+ '								<input type="checkbox" id="check" name="checkA">'
//					+ '								<label for="checkA" class="sr-only"></label>'
//					+ '							</div>'
//					+ '						</td>'
//					+ '						<td>A</td>'
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
			tr_blade_color_row: function(param) {
				var sample = ''
					+ '<tr id="tr_' + param.ID + '">'
					+ '		<td>'
					+ '			<div class="checkbox-radio-custom">'
					+ '				<input type="radio" id="radio_' + param.ID + '" name="radio">'
					+ '				<label for="radio_' + param.ID + '" class="sr-only"></label>'
					+ '			</div>'
					+ '		</td>'
					+ '		<td style="background:' + param.COLOR + ';"></td>'
					+ '		<td>' + param.COLOR_NM + '</td>'
					+ '</tr>';
				return sample;
			},
			damage_content: function(param) {
				var sample = '' 
					+ '<div class="layer-cont" popup-type="' + param.TYPE + '" damage-id="' + param.ID + '" process="' + param.PROCESS + '">'
					
					// Title
					+ ' 	<div class="tit-wrap">'
					+ ' 		<strong id="popup_title" class="heading6">' + param.TITLE + '</strong>'
					+ '		</div>'
					// Title
					
					+ ' 	<div class="system-detail-wrap">'
					
					// LEFT
					+ ' 		<div id="scroll_target" class="system-left" style="margin-bottom:10px;width:70%;max-height:100%;">'
					//+ ' 		<div class="system-left" style="width:70%;max-height:90%;">'
					//+ ' 			<h3 class="heading4" style="margin-top:0px;">' + param.TITLE + '</h3>'
					+ ' 			<div class="base_grid_table">'
					+ ' 				<table>'
					+ ' 					<caption>Register blade damage - Maintenance code, Rotor diameter, Tower height, Blade type, Blade length, Blade color, Blade color</caption>'
					+ ' 					<colgroup>'
					+ ' 						<col style="width:20%">'
					+ ' 						<col style="width:40%">'
//					+ ' 						<col style="width:35%">'
//					+ ' 						<col style="width:5%">'
					+ ' 						<col style="width:40%">'
					+ ' 					</colgroup>'
					+ ' 					<tbody>'
												
												// BLADE_SERIAL_NUM
					+ ' 						<tr>'
					+ ' 							<th scope="row"><span class="essential">Blade Serial Number<span class="red"> *</span></span></th>'
					+ ' 							<td class="txt-left" colspan="3">'
					//+ ' 								<div class="registration-write twice-input registration-write-select">'
					+ ' 									<div class="input-group-wrapper">'
					+ ' 										<div class="select-box input-group" style="display:block;">'
					+ ' 											<label for="BLD_ID"></label>'
					+ ' 											<select name="BLD_ID" id="BLD_ID" class="info-select" validation-check="required">'
					+ ' 												<option value=""># Blade Serial Number</option>'
					+ ' 											</select>'
					+ ' 										</div>'
					+ ' 									</div>'			
					//+ ' 								</div>'					
					+ ' 							</td>'					
					+ ' 						</tr>'
												// BLADE_SERIAL_NUM
					
												// MAINTTEN_CD
					+ ' 						<tr>'
					+ ' 							<th scope="row"><span class="essential">Maintenance Code<span class="red"> *</span></span></th>'
					+ ' 							<td class="txt-left" colspan="3">'
					//+ ' 								<div class="registration-write twice-input registration-write-select">'
					+ ' 									<div class="input-group-wrapper">'
					+ ' 										<div class="select-box input-group" style="display:block;">'
					+ ' 											<label for="MAINTEN_CD"></label>'
					+ ' 											<select name="MAINTEN_CD" id="MAINTEN_CD" class="info-select" validation-check="required">'
					+ ' 												<option value=""># Maintenance Code</option>'
					+ ' 											</select>'
					+ ' 										</div>'
					+ ' 									</div>'			
					//+ ' 								</div>'					
					+ ' 							</td>'					
					+ ' 						</tr>'
												// MAINTTEN_CD
					
												// DMG_AREA
					+ ' 						<tr>'
					+ ' 							<th scope="row"><span class="essential">Damage Area<span class="red"> *</span></span></th>'
					+ ' 							<td class="txt-left" colspan="3">'
					//+ ' 								<div class="registration-write twice-input registration-write-select">'
					+ ' 									<div class="input-group-wrapper">'
					+ ' 										<div class="select-box input-group" style="display:block;">'
					+ ' 											<label for="DMG_AREA"></label>'
					+ ' 											<select name="DMG_AREA" id="DMG_AREA" class="info-select" validation-check="required">'
					+ ' 												<option value=""># Damage Area</option>'
					+ ' 												<option value="LE">LE / Leading edge</option>'
					+ ' 												<option value="SuS">SuS / Suction side</option>'
					+ ' 												<option value="TE">TE / Trailing edge</option>'
					+ ' 												<option value="PrS">PrS / Pressure side</option>'
					+ ' 												<option value="PP">PP / Pre-preg</option>'
					+ ' 												<option value="R">R / Root</option>'
					+ ' 											</select>'
					+ ' 										</div>'
					+ ' 									</div>'
					//+ ' 								</div>'
					+ '								</td>'
					+ ' 						</tr>'
												// DMG_AREA
					
												// DMG_SEVERITY
					+ ' 						<tr>'
					+ ' 							<th scope="row"><span class="essential">Damage Severity<span class="red"> *</span></span></th>'
					+ ' 							<td class="txt-left" colspan="3">'
					//+ ' 								<div class="registration-write twice-input registration-write-select">'
					+ ' 									<div class="input-group-wrapper">'
					+ ' 										<div class="select-box input-group" style="display:block;">'
					+ ' 											<label for="DMG_SEVERITY"></label>'
					+ ' 											<select name="DMG_SEVERITY" id="DMG_SEVERITY" class="info-select" validation-check="required">'
					+ ' 												<option value=""># Damage Severity</option>'
					+ ' 												<option value="1">단순 표면 오염</option>'
					+ ' 												<option value="2">경미한 손상</option>'
					+ ' 												<option value="3">심각하지 않은 손상</option>'
					+ ' 												<option value="4">심각한 손상</option>'
					+ ' 												<option value="5">매우 심각한 손상</option>'
					+ ' 											</select>'
					+ ' 										</div>'
					+ ' 									</div>'
					//+ ' 								</div>'
					+ '								</td>'
					+ ' 						</tr>'
												// DMG_SEVERITY
					
												// DMG_INFO
					+ ' 						<tr>'
					+ ' 							<th scope="row"><span class="essential">Damage Info<span class="red"> *</span></span></th>'
					+ ' 							<td class="txt-left" colspan="3">'
					//+ ' 								<div class="registration-write twice-input registration-write-select">'
					+ ' 									<div class="input-group-wrapper">'
					+ ' 										<div class="select-box input-group" style="display:block;">'
					+ ' 											<label for="DMG_INFO"></label>'
					+ ' 											<select name="DMG_INFO" id="DMG_INFO" class="info-select" validation-check="required">'
					+ ' 												<option value=""># Damage info</option>'
					+ ' 												<option value="부식 및 마모">부식 및 마모</option>'
					+ ' 												<option value="페인트 박리">페인트 박리</option>'
					+ ' 												<option value="표면 불량">표면 불량</option>'
					+ ' 												<option value="표면 페인트 오염">표면 페인트 오염</option>'
					+ ' 												<option value="Laminate 손상">Laminate 손상</option>'
					+ ' 											</select>'
					+ ' 										</div>'
					+ ' 									</div>'
					//+ ' 								</div>'
					+ ' 							</td>'
					+ ' 						</tr>'
												// DMG_INFO
					
												// MAINTEN_PLAN
					+ ' 						<tr>'
					+ ' 							<th scope="row"><span class="essential">Maintenance Plan<span class="red"> *</span></span></th>'
					+ ' 							<td class="txt-left" colspan="3">'
					+ ' 								<div class="input-group" style="width:100%;">'
					+ ' 									<label for="MAINTEN_PLAN" class="sr-only"></label>'
					+ ' 									<input type="text" name="MAINTEN_PLAN" id="MAINTEN_PLAN" maxlength="100" validation-check="required">'
					+ ' 								</div>'
					+ ' 							</td>'
					+ ' 						</tr>'
												// MAINTEN_PLAN
					
												// DAMAGE RANGE
					+ ' 						<tr>'
					+ ' 							<th scope="row"><span class="essential">Damage Range</span></th>'
					
													// FROM_R, FROM_LE
					+ ' 							<td class="txt-left">'
					+ ' 								<div class="base_grid_table">'
					+ ' 									<table>'
					+ ' 										<caption>Damage range - From Root(m), From LE(m)</caption>'
					+ ' 										<colgroup>'
					+ ' 											<col style="width:50%">'
					+ ' 											<col style="width:50%">'
					+ ' 										</colgroup>'
					+ ' 										<thead>'
					+ ' 											<tr>'
					+ ' 												<th scope="col"><span class="essential">From Root (m)<span class="red"> *</span></span></th>'
					+ ' 												<th scope="col"><span class="essential">From LE (m)<span class="red"> *</span></span></th>'
					+ ' 											</tr>'
					+ ' 										</thead>'
					+ ' 										<tbody>'
					+ ' 											<tr>'
					+ ' 												<td>'
					+ ' 													<div class="input-group">'
					+ ' 														<label for="FROM_R" class="sr-only"></label>'
					+ ' 														<input type="text" name="FROM_R" id="FROM_R" maxnumberlength="2" maxdecimallength="1" placeholder="You can enter 2 integers and 1 decimal places." validation-check="required">'
					+ ' 													</div>'
					+ ' 												</td>'
					+ ' 												<td>'
					+ ' 													<div class="input-group">'
					+ ' 														<label for="FROM_LE" class="sr-only"></label>'
					+ ' 														<input type="text" name="FROM_LE" id="FROM_LE" maxnumberlength="2" maxdecimallength="1" placeholder="You can enter 2 integers and 1 decimal places." validation-check="required">'
					+ ' 													</div>'
					+ ' 												</td>'
					+ ' 											</tr>'
					+ ' 										</tbody>'
					+ ' 									</table>'
					+ ' 								</div>'
					+ ' 							</td>'
													// FROM_R, FROM_LE
													
													// HORIZ, VERTI
					+ ' 							<td class="txt-left">'
					+ ' 								<div class="base_grid_table">'
					+ ' 									<table>'
					+ ' 										<caption>Damage range - horizontal(m), Vertical(m)</caption>'
					+ ' 										<colgroup>'
					+ ' 											<col style="width:50%">'
					+ ' 											<col style="width:50%">'
					+ ' 										</colgroup>'
					+ ' 										<thead>'
					+ ' 											<tr>'
					+ ' 												<th scope="col"><span class="essential">Horizontal (m)<span class="red"> *</span></span></th>'
					+ ' 												<th scope="col"><span class="essential">Vertical (m)<span class="red"> *</span></span></th>'
					+ ' 											</tr>'
					+ ' 										</thead>'
					+ ' 										<tbody>'
					+ ' 											<tr>'
					+ ' 												<td>'
					+ ' 													<div class="input-group">'
					+ ' 														<label for="HORIZ" class="sr-only"></label>'
					+ ' 														<input type="text" name="HORIZ" id="HORIZ" maxnumberlength="2" maxdecimallength="1" placeholder="You can enter 2 integers and 1 decimal places." validation-check="required">'
					+ ' 													</div>'
					+ ' 												</td>'
					+ ' 												<td>'
					+ ' 													<div class="input-group">'
					+ ' 														<label for="VERTI" class="sr-only"></label>'
					+ ' 														<input type="text" name="VERTI" id="VERTI" maxnumberlength="2" maxdecimallength="1" placeholder="You can enter 2 integers and 1 decimal places." validation-check="required">'
					+ ' 													</div>'
					+ ' 												</td>'
					+ ' 											</tr>'
					+ ' 										</tbody>'
					+ ' 									</table>'
					+ ' 								</div>'
					+ ' 							</td>'
													// HORIZ, VERTI
					
//					+ ' 							<td>'
//					+ ' 								<a href="javascript:void(0);" class="btn-style btn-style4 btn-style-l">'
//					+ ' 									<i class="xi-search"></i>'
//					+ ' 									<span class="sr-only">search</span>'
//					+ ' 								</a>'
//					+ ' 							</td>'
					
					+ ' 						</tr>'
												// DAMAGE RANGE
												
												// ATTACHMENT
					+ ' 						<tr>'
					+ ' 							<th scope="row" rowspan="2">Attachment</th>'
					+ ' 							<td class="txt-left" colspan="3">'
					+ ' 								<div class="base_grid_table">'
					+ ' 									<table>'
					+ ' 										<caption>Attachment - NO, Images, Comments</caption>'
					+ ' 										<colgroup>'
					+ ' 											<col style="width:25%">'
					+ ' 											<col style="width:25%">'
					+ ' 											<col style="width:5%">'
					+ ' 										</colgroup>'
					+ ' 										<thead>'
					+ ' 											<tr>'
					+ ' 												<th scope="col">Images</th>'
					+ ' 												<th scope="col">Comments</th>'
					+ ' 												<th scope="col"></th>'
					+ ' 											</tr>'
					+ ' 										</thead>'
					+ ' 										<tbody id="DAMAGE_FILE_LIST">'
					
					+ ' 											<tr id="NO_FILE">'
					+ ' 												<td colspan="3">No File</td>'
					+ ' 											</tr>'
					
																// 샘플
//					+ ' 											<tr>'
//					+ ' 												<td>'
//					+ ' 													<span class="path-img imgcut">'
//					+ ' 														<span class="img" style="overflow:hidden">'
//					+ ' 															<img src="/img/sub/login_bg.png" alt="예시이미지" style="width:auto; height:100%">'
//					+ ' 														</span>'
//					+ ' 													</span>'
//					+ ' 												</td>'
//					+ ' 												<td>'
//					+ ' 													<div class="registration-write comments">'
//					+ ' 														<label for="comments" class="sr-only">comments</label>'
//					+ ' 														<textarea id="comments"></textarea>'
//					+ ' 													</div>'
//					+ ' 												</td>'
//					+ ' 												<td>'
//					+ ' 													<a href="javascript:void(0);" class="delete-btn">'
//					+ ' 														<i class="xi-trash"></i>'
//					+ ' 													</a>'
//					+ ' 												</td>'
//					+ ' 											</tr>'
					
					
//					+ ' 											<tr>'
//					+ ' 												<td>'
//					+ ' 													<span class="path-img imgcut">'
//					+ ' 														<span class="img" style="overflow:hidden">'
//					+ ' 															<img src="/img/sub/login_bg.png" alt="예시이미지" style="width:auto; height:100%">'
//					+ ' 														</span>'
//					+ ' 													</span>'
//					+ ' 												</td>'
//					+ ' 												<td>'
//					+ ' 													<div class="registration-write comments">'
//					+ ' 														<label for="comments" class="sr-only">comments</label>'
//					+ ' 														<textarea id="comments"></textarea>'
//					+ ' 													</div>'
//					+ ' 												</td>'
//					+ ' 												<td>'
//					+ ' 													<a href="javascript:void(0);" class="delete-btn">'
//					+ ' 														<i class="xi-trash"></i>'
//					+ ' 													</a>'
//					+ ' 												</td>'
//					+ ' 											</tr>'
																	// 샘플
					
					
					+ ' 										</tbody>'
					+ ' 									</table>'
					+ ' 								</div>'
					+ ' 							</td>'
					+ ' 						</tr>'
					
												// FILE ADD BUTTON
					+ ' 						<tr>'
					+ ' 							<td class="txt-left" colspan="3">'
					//+ ' 								<ul class="path-file"></ul>'
					+ ' 								<div class="registration-write btn-input-wrap fake-field-file-wrap">'
					+ ' 									<div class="input-group">'
					+ ' 										<div class="fake-field-file"></div>'
					+ ' 										<input type="file" name="ADD_FILE_DAMAGE" id="ADD_FILE_DAMAGE" class="field-file" accept=".png,.jpg,.jpeg">'
					+ ' 									</div>'
					+ ' 									<label for="ADD_FILE_DAMAGE" aria-label="Attach file" class="registration-search-btn">'
					+ ' 										<i class="xi-paperclip"></i>'
					+ ' 									</label>'
					+ ' 								</div>'
					+ ' 							</td>'
					+ ' 						</tr>'
												// FILE ADD BUTTON
												// ATTACHMENT
					
					+ ' 					</tbody>'
					+ ' 				</table>'
					+ ' 			</div>'
					+ ' 		</div>'
					// LEFT	
					
					// RIGHT
					+ ' 		<div class="system-right" style="width:30%;padding-left:0;">'
//					+ ' 			<div class="blade-view-form">'
//					+ ' 				<div class="serverity-view">'
//					+ ' 					<canvas id="blade-canvas-layer" width="295" height="756"></canvas>'
//					+ ' 				</div>'
//					+ ' 			</div>'
					+ ' 			<img id="img" style="display:block;margin:0 auto;object-fit:scale-down;">'
					//+ ' 			<img id="img" style="display:block;margin:0 auto;width:auto;max-width:100%;height:auto;">'
					+ ' 		</div>'
					// RIGHT
					
					+ '		</div>'
					
					
					// BUTTON
					+ ' 	<div class="txt-right">'
					+ ' 		<a id="popup_register" href="javascript:void(0)" class="btn-style btn-style1">Register</a>'
					+ ' 	</div>'
					
					
					+ ' 	<a id="popup_close" href="javascript:void(0)" class="layer-close">'
					+ ' 		<span class="sr-only">close layer popup</span>'
					+ ' 		<i class="xi-close" title="Close popup"></i>'
					+ ' 	</a>'
					// BUTTON
					+ '</div>';
				return sample;
			},
			blade_viewer_content: function(param) {
				//#layerPopup class
				//planning : layer-popup-planing
				//blade viewer popup : 'layer-popup-blade-inspection layer-popup-blade-inspection2 active'
				var sample = ''
					+ '<div class="layer-cont" popup-type="' + param.TYPE + '" style="min-height:90%;">'
					// layer-scroll
					//+ ' 	<div class="layer-scroll">'
					+ ' 	<div class="tit-wrap">'
					+ ' 		<strong id="popup_title" class="heading6">' + param.TITLE + '</strong>'
					+ ' 	</div>'
					+ ' 	<ul class="blade-info-lst">'
					+ ' 		<li>Location : ' + param.LOCATION + '</li>'
					+ ' 		<li>Model : ' + param.MODEL + '</li>'
					+ '		</ul>'
					+ ' 	<div class="blade-view-wrap">'
								// 블레이드 탭
					+ ' 		<ul id="BLADEVIEWER_TAB" class="tab2">'
									// tab
//					+ ' 			<li class="active">'
//					+ ' 				<a href="#none">'
//					+ ' 					<span>Blade #1</span>'
//					+ ' 				</a>'
//					+ ' 			</li>'
//					+ ' 			<li>'
//					+ ' 				<a href="#none">'
//					+ ' 					<span>Blade #2</span>'
//					+ ' 				</a>'
//					+ ' 			</li>'
//					+ ' 			<li>'
//					+ ' 				<a href="#none">'
//					+ ' 					<span>Blade #3</span>'
//					+ ' 				</a>'
//					+ ' 			</li>'
					+ ' 		</ul>'
								// 블레이드 탭
					
								// 블레이드 뷰어 
					+ ' 		<div id="scroll_viewer" class="blade-view-form">'
					+ ' 			<img id="img" style="display:block;margin:0 auto;object-fit:scale-down;">'
					+ '	 		</div>'
								// 블레이드 뷰어
					
								// 데미지
					+ ' 		<div id="scroll_target" class="blade-events">'
					+ ' 			<strong class="heading6">Damage</strong>'
					
									// 데미지 리스트 
					+ ' 			<strong class="heading8">Damage List</strong>'
					+ ' 			<div class="base_grid_table">'
					+ ' 				<table>'
					+ ' 					<caption>Events - NO, Maintenance code, Damage Maintenance Plan, Severity</caption>'
					+ ' 					<colgroup>'
					+ '							<col style="width:6%">'
					+ '							<col style="width:25%">'
					+ '							<col style="width:15%">'
					+ '							<col style="width:7%">'
					+ '							<col style="width:7%">'
					+ '							<col style="width:40%">'
					+ ' 					</colgroup>'
					+ ' 					<thead>'
					+ ' 						<tr>'
					+ ' 							<th scope="col">NO.</th>'
					+ ' 							<th scope="col">Maintenance Code</th>'
					+ ' 							<th scope="col">Damage Info</th>'
					+ ' 							<th scope="col">Severity</th>'
					+ ' 							<th scope="col">Attachment</th>'
					+ ' 							<th scope="col">Maintenance Plan</th>'
					+ ' 						</tr>'
					+ ' 					</thead>'
					+ ' 					<tbody id="BLADEVIEWER_DAMAGE_LIST">'
											// DAMAGE LIST
					
//					+ '							<tr>'
//					+ '								<td>1</td>'
//					+ '								<td>H11 / Blade - Bearing</td>'
//					+ '								<td>부식 및 마모</td>'
//					+ '								<td>'
//					+ '									<span class="num-mark num-mark5">5</span>'				
//					+ '								</td>'
//					+ '								<td>+1</td>'
//					+ '								<td>교체 요망</td>'
//					+ '							</tr>'
					
					+ ' 					</tbody>'
					+ ' 				</table>'
					+ ' 			</div>'
									// 데미지 리스트 
					
									// 데미지 상세  
					+ ' 			<strong class="heading8" style="margin-top:1rem">Damage Detail</strong>'
					+ ' 			<div class="base_grid_table">'
					+ ' 				<table style="table-layout:auto !important;">'
					+ '						<caption>Register blade damage - Maintenance code, Rotor diameter, Tower height, Blade type, Blade length, Blade color, Blade color</caption>'
					+ ' 					<colgroup>'
					+ ' 						<col style="width:20%">'
					+ ' 						<col style="width:20%">'
					+ ' 						<col style="width:20%">'
					+ ' 					</colgroup>'
					+ ' 					<tbody>'
					+ ' 						<tr>'
					+ ' 							<th scope="row">'
					+ ' 								<span class="essential">Damage Area</span>'
					+ ' 							</th>'
					+ ' 							<td id="BLADEVIEWER_DAMAGE_AREA" class="txt-left" colspan="2"></td>'
					+ ' 						</tr>'
					+ ' 						<tr>'
					+ ' 							<th scope="row">'
					+ ' 								<span class="essential">Damage Range</span>'
					+ ' 							</th>'
					+ ' 							<td class="txt-left">'
					+ ' 								<div class="base_grid_table">'
					+ ' 									<table>'
					+ ' 										<caption>Damage range - From Root(m), From LE(m)</caption>'
					+ ' 										<colgroup>'
					+ ' 											<col style="width:50%">'
					+ ' 											<col style="width:50%">'
					+ ' 										</colgroup>'
					+ ' 										<thead>'
					+ ' 											<tr>'
					+ ' 												<th scope="col">From Root (m)</th>'
					+ ' 												<th scope="col">From LE (m)</th>'
					+ ' 											</tr>'
					+ ' 										</thead>'
					+ ' 										<tbody>'
					+ ' 											<tr>'
					+ ' 												<td id="BLADEVIEWER_FROM_R"></td>'
					+ ' 												<td id="BLADEVIEWER_FROM_LE"></td>'
					+ ' 											</tr>'
					+ ' 										</tbody>'
					+ ' 									</table>'
					+ ' 								</div>'
					+ ' 							</td>'
					+ ' 							<td class="txt-left">'
					+ ' 								<div class="base_grid_table">'
					+ ' 									<table>'
					+ ' 										<caption>Damage range - horizontal(m), Vertical(m)</caption>'
					+ ' 										<colgroup>'
					+ ' 											<col style="width:50%">'
					+ ' 											<col style="width:50%">'
					+ ' 										</colgroup>'
					+ ' 										<thead>'
					+ ' 											<tr>'
					+ ' 												<th scope="col">Horizontal(m)</th>'
					+ ' 												<th scope="col">Verticality(m)</th>'
					+ ' 											</tr>'
					+ ' 										</thead>'
					+ ' 										<tbody>'
					+ ' 											<tr>'
					+ ' 												<td id="BLADEVIEWER_HORIZ"></td>'
					+ ' 												<td id="BLADEVIEWER_VERTI"></td>'
					+ ' 											</tr>'
					+ ' 										</tbody>'
					+ ' 									</table>'
					+ ' 								</div>'
					+ ' 							</td>'
					+ ' 						</tr>'
					+ ' 					</tbody>'
					+ ' 				</table>'
					+ ' 			</div>'
									// 데미지 상세
					
									// BLADE IMAGE
					+ ' 			<strong class="heading8" style="margin-top:1rem">Damage Attachments</strong>'
					
					+ '				<div style="position:relative;overflow:hidden;">'
					
					+ ' 			<ul id="BLADEVIEWER_FILE_LIST" class="img-viewer-lst">'
					
										// FILE_LIST
//					+ ' 				<li>'
//					+ ' 					<span class="img">'
//					+ ' 						<img src="/img/sub/ex_blade_sample.png" style="width:100%; height:100%; object-fit: scale-down;">'
////					+ ' 						<a href="" class="download-img">'
////					+ ' 							<i class="xi-download"></i>'
////					+ ' 							<span class="sr-only">download img</span>'
////					+ ' 						</a>'
//					+ ' 					</span>'
//					+ ' 					<span class="img-info" style="width:50%;margin:.6rem auto 0;text-align:center;">Figure1. surface paint contamination</span>'	
//					+ ' 				</li>'

					+ ' 			</ul>'
					
					+ '				</div>'
									// BLADE IMAGE
					
					+ ' 		</div>'
								// 이벤트
					+ ' 	</div>'
					
					+ ' 	<a id="popup_close" href="javascript:void(0)" class="layer-close">'
					+ ' 		<span class="sr-only">close layer popup</span>'
					+ ' 		<i class="xi-close" title="Close popup"></i>'
					+ ' 	</a>'
					+ '</div>';
				return sample;
			},
			li_blade_viewer_tab: function(param) {
				var sample = ''
					// li class="active"
					+ '<li style="max-width:20%;">'
					+ '		<a href="javascript:void(0);">'
					+ ' 		<span>Blade' + param.BLADE_NUM + ' - ' + param.BLADE_SERIAL_NUM + '</span>'
					+ ' 	</a>'
					+ '</li>';
				return sample;
			},
			tr_blade_viewer_damage_row: function(param) {
				var sample = ''
					+ '<tr>'
					+ '		<td>' + param.NUM + '</td>'
					+ '		<td>' + param.MAINTEN_CD + '</td>'
					+ '		<td>' + param.DMG_INFO + '</td>'
					+ '		<td>'
					+ '			<span class="num-mark num-mark' + param.DMG_SEVERITY + '">' + param.DMG_SEVERITY + '</span>'				
					+ '		</td>'
					+ '		<td>' + param.ATTACHMENT_CNT + '</td>'
					+ '		<td>' + param.MAINTEN_PLAN + '</td>'
					+ '</tr>'
				return sample;
			},
			tr_blade_viewer_no_damage_row: function(param) {
				var sample = '<tr><td colspan="6">No Damages</td></tr>';
				return sample;
			},
			li_blade_viewer_damage_file: function(param) {
				var sample = ''
					+ ' 				<li>'
					+ ' 					<span class="img">'
					+ ' 						<img src="' + param.SRC + '" style="width:100%; height:100%; object-fit: scale-down;">'
//					+ ' 						<a href="" class="download-img">'
//					+ ' 							<i class="xi-download"></i>'
//					+ ' 							<span class="sr-only">download img</span>'
//					+ ' 						</a>'
					+ ' 					</span>'
					+ ' 					<span class="img-info" style="width:50%;margin:.6rem auto 0;text-align:center;">' + param.FILE_INFO + '</span>'
					+ ' 				</li>'
				return sample;
			},
		}
	},
	/* 블레이드 점검 보고서 상세 페이지 */
	oam_0302: {
		main: {
			div_flight_row: function(param) {
				var sample = ''
					+ '<div class="base_grid_table" style="margin-top:10px;">'
					+ ' 	<table>'
					+ ' 		<caption>>Flight time &amp; Weather - Down time</caption>'
					+ ' 		<colgroup>'
					+ ' 			<col style="width: 10%">'	
					+ ' 			<col style="width: 15%">'	
					+ ' 			<col style="width: 75%">'	
					+ ' 		</colgroup>'
					+ '			<tbody id="FLIGHT_' + param.ID + '">'
					+ ' 			<tr>'
					+ ' 				<th scope="row" rowspan="5">Weather</th>'
					+ ' 			</tr>'
					+ ' 			<tr>'
					+ ' 				<th scope="row" style="border-left: 1px;">Weather</th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<span>' + param.WEATHER + '</span>'
					+ ' 				</td>'
					+ ' 			</tr>'
					+ ' 			<tr>'
					+ ' 				<th scope="row" style="border-left: 1px;">Temperature (°C)</th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<span>'+ param.TEMPERATURE + '</span>'
					+ ' 				</td>'
					+ ' 			</tr>'
					+ ' 			<tr>'
					+ ' 				<th scope="row" style="border-left: 1px;">Wind Speed (m/s)</th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<span>'+ param.WIND_SPEED + '</span>'
					+ ' 				</td>'
					+ ' 			</tr>'
					+ ' 			<tr>'
					+ ' 				<th scope="row" style="border-left: 1px;">Humidity (%)</th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<span>'+ param.HUMIDITY + '</span>'
					+ ' 				</td>'
					+ ' 			</tr>'
					+ ' 			<tr>'
					+ ' 				<th scope="row" colspan="2">Flight Time</th>'
					+ ' 				<td class="txt-left note">'
					+ ' 					<div class="registration-write">'
					+ ' 						<span>' + param.WORK_TIME + '</span>'
					+ '		 					<span class="total-hour point2">' + param.WORK_TOTAL_TIME + '</span>'
					+ ' 						<span class="total-hour point2">' + param.DOWNTIME_YN + '</span>'
					+ ' 					</div>'
					+ ' 				</td>'
					+ ' 			</tr>'
					+ ' 			<tr>'
					+ ' 				<th scope="row" colspan="2">Remarks</th>'
					+ ' 				<td class="txt-left">'
					+ ' 					<span>'+ param.RMK + '</span>'
					+ ' 				</td>'
					+ ' 			</tr>'
					+ ' 		</tbody>'
					+ ' 	</table>'
					+ '</div>';
				return sample;
			},
			tr_damage_row: function(param) {
				var sample = ''
					+ '<tr id="DAMAGE_' + param.ID + '">'
					+ ' 	<td>' + param.NO + '</td>'
					+ ' 	<td>' + param.BLADE_SERIAL_NUM + '</td>'
					+ ' 	<td>' + param.MAINTEN_CD + '</td>'
					+ ' 	<td>' + param.DMG_AREA + '</td>'
					+ ' 	<td>' + param.DMG_INFO + '</td>'
					+ ' 	<td>'
								// num-mark 1~5
					+ ' 		<span class="num-mark num-mark' + param.DMG_SEVERITY + '">' + param.DMG_SEVERITY +  '</span>'
					+ ' 	</td>'
					+ ' 	<td>' + param.ATTACHMENT_CNT + '</td>'
					+ '</tr>';
				return sample;
			},
		}, 
		popup: {
			/* 손상 내역 클릭 */
			damage_content: function(param) {
				var area = {LE:'Leading edge', SuS:'Suction side', TE:'Trailing edge', PrS:'Pressure side', PP:'Pre-preg', R:'Root'};
				var severity = {1:'단순 표면 오염', 2:'경미한 손상', 3:'심각하지 않은 손상', 4:'심각한 손상', 5:'매우 심각한 손상'};
				var severity_color = {1:'#4EAD5B', 2:'#A0CE63', 3:'#FEFF54', 4:'#ED772F', 5:'#EA3323'};
				
				var sample = '' 
					+ '<div class="layer-cont" popup-type="' + param.TYPE + '" damage-id="' + param.ID + '" process="' + param.PROCESS + '">'
					
					// Title
					+ ' 	<div class="tit-wrap">'
					+ ' 		<strong id="popup_title" class="heading6">' + param.TITLE + '</strong>'
					+ '		</div>'
					// Title
					
					+ ' 	<div class="system-detail-wrap">'
					
					// LEFT
					+ ' 		<div id="scroll_target" class="system-left" style="margin-bottom:10px;width:70%;max-height:100%;">'
					+ ' 			<div class="base_grid_table">'
					+ ' 				<table>'
					+ ' 					<caption>Register blade damage - Maintenance code, Rotor diameter, Tower height, Blade type, Blade length, Blade color, Blade color</caption>'
					+ ' 					<colgroup>'
					+ ' 						<col style="width:20%">'
					+ ' 						<col style="width:40%">'
					+ ' 						<col style="width:40%">'
					+ ' 					</colgroup>'
					+ ' 					<tbody>'
												
												// BLADE_SERIAL_NUM
					+ ' 						<tr>'
					+ ' 							<th scope="row"><span class="essential">Blade Serial Number</span></th>'
					+ ' 							<td class="txt-left" colspan="3">'
					+ ' 								<span id="SERIAL_NUM">' + param.SERIAL_NUM + '</span>'
					+ ' 							</td>'					
					+ ' 						</tr>'
												// BLADE_SERIAL_NUM
					
												// MAINTTEN_CD
					+ ' 						<tr>'
					+ ' 							<th scope="row"><span class="essential">Maintenance Code</span></th>'
					+ ' 							<td class="txt-left" colspan="3">'
					+ ' 								<span id="MAINTEN_CD">' + param.MAINTEN_CD + '</span>'
					+ ' 							</td>'					
					+ ' 						</tr>'
												// MAINTTEN_CD
					
												// DMG_AREA
					+ ' 						<tr>'
					+ ' 							<th scope="row"><span class="essential">Damage Area</span></th>'
					+ ' 							<td class="txt-left" colspan="3">'
					+ ' 								<span id="DMG_AREA">' + param.DMG_AREA + ' / ' + area[param.DMG_AREA] + '</span>'
					+ '								</td>'
					+ ' 						</tr>'
												// DMG_AREA
					
												// DMG_SEVERITY
					+ ' 						<tr>'
					+ ' 							<th scope="row"><span class="essential">Damage Severity</span></th>'
					+ ' 							<td class="txt-left" colspan="3">'
					+ ' 								<span id="DMG_SEVERITY" style="font-weight:700;color:' + severity_color[param.DMG_SEVERITY] + ';">' + severity[param.DMG_SEVERITY] + '</span>'
					+ '								</td>'
					+ ' 						</tr>'
												// DMG_SEVERITY
					
												// DMG_INFO
					+ ' 						<tr>'
					+ ' 							<th scope="row"><span class="essential">Damage Info</span></th>'
					+ ' 							<td class="txt-left" colspan="3">'
					+ ' 								<span id="DMG_INFO">' + param.DMG_INFO + '</span>'
					+ ' 							</td>'
					+ ' 						</tr>'
												// DMG_INFO
					
												// MAINTEN_PLAN
					+ ' 						<tr>'
					+ ' 							<th scope="row"><span class="essential">Maintenance Plan</span></th>'
					+ ' 							<td class="txt-left" colspan="3">'
					+ ' 								<span id="MAINTEN_PLAN">' + param.MAINTEN_PLAN + '</span>'
					+ ' 							</td>'
					+ ' 						</tr>'
												// MAINTEN_PLAN
					
												// DAMAGE RANGE
					+ ' 						<tr>'
					+ ' 							<th scope="row"><span class="essential">Damage Range</span></th>'
					
													// FROM_R, FROM_LE
					+ ' 							<td class="txt-left">'
					+ ' 								<div class="base_grid_table">'
					+ ' 									<table>'
					+ ' 										<caption>Damage range - From Root(m), From LE(m)</caption>'
					+ ' 										<colgroup>'
					+ ' 											<col style="width:50%">'
					+ ' 											<col style="width:50%">'
					+ ' 										</colgroup>'
					+ ' 										<thead>'
					+ ' 											<tr>'
					+ ' 												<th scope="col"><span class="essential">From Root (m)</span></th>'
					+ ' 												<th scope="col"><span class="essential">From LE (m)</span></th>'
					+ ' 											</tr>'
					+ ' 										</thead>'
					+ ' 										<tbody>'
					+ ' 											<tr>'
					+ ' 												<td>'
					+ ' 													<span id="FROM_R">' + param.FROM_R + '</span>'
					+ ' 												</td>'
					+ ' 												<td>'
					+ ' 													<span id="FROM_LE">' + param.FROM_LE+ '</span>'
					+ ' 												</td>'
					+ ' 											</tr>'
					+ ' 										</tbody>'
					+ ' 									</table>'
					+ ' 								</div>'
					+ ' 							</td>'
													// FROM_R, FROM_LE
													
													// HORIZ, VERTI
					+ ' 							<td class="txt-left">'
					+ ' 								<div class="base_grid_table">'
					+ ' 									<table>'
					+ ' 										<caption>Damage range - horizontal(m), Vertical(m)</caption>'
					+ ' 										<colgroup>'
					+ ' 											<col style="width:50%">'
					+ ' 											<col style="width:50%">'
					+ ' 										</colgroup>'
					+ ' 										<thead>'
					+ ' 											<tr>'
					+ ' 												<th scope="col"><span class="essential">Horizontal (m)</span></th>'
					+ ' 												<th scope="col"><span class="essential">Vertical (m)</span></th>'
					+ ' 											</tr>'
					+ ' 										</thead>'
					+ ' 										<tbody>'
					+ ' 											<tr>'
					+ ' 												<td>'
					+ ' 													<span id="HORIZ">' + param.HORIZ + '</span>'
					+ ' 												</td>'
					+ ' 												<td>'
					+ ' 													<span id="VERTI">' + param.VERTI + '</span>'
					+ ' 												</td>'
					+ ' 											</tr>'
					+ ' 										</tbody>'
					+ ' 									</table>'
					+ ' 								</div>'
					+ ' 							</td>'
													// HORIZ, VERTI
					+ ' 						</tr>'
												// DAMAGE RANGE
												
												// ATTACHMENT
					+ ' 						<tr>'
					+ ' 							<th scope="row" rowspan="2">Attachment</th>'
					+ ' 							<td class="txt-left" colspan="3">'
					+ ' 								<div class="base_grid_table">'
					+ ' 									<table>'
					+ ' 										<caption>Attachment - NO, Images, Comments</caption>'
					+ ' 										<colgroup>'
					+ ' 											<col style="width:25%">'
					+ ' 											<col style="width:25%">'
					+ ' 										</colgroup>'
					+ ' 										<thead>'
					+ ' 											<tr>'
					+ ' 												<th scope="col">Images</th>'
					+ ' 												<th scope="col">Comments</th>'
					+ ' 											</tr>'
					+ ' 										</thead>'
					+ ' 										<tbody id="DAMAGE_FILE_LIST">'
					
					+ ' 											<tr id="NO_FILE">'
					+ ' 												<td colspan="2">No File</td>'
					+ ' 											</tr>'
					
					+ ' 										</tbody>'
					+ ' 									</table>'
					+ ' 								</div>'
					+ ' 							</td>'
					+ ' 						</tr>'
												// ATTACHMENT
					
					+ ' 					</tbody>'
					+ ' 				</table>'
					+ ' 			</div>'
					+ ' 		</div>'
					// LEFT	
					
					// RIGHT
					+ ' 		<div class="system-right" style="width:30%;padding-left:0;">'
					+ ' 			<img id="img" style="display:block;margin:0 auto;object-fit:scale-down;">'
					+ ' 		</div>'
					// RIGHT
					
					+ '		</div>'
					
					
					// BUTTON
					+ ' 	<div class="txt-right">'
//					+ ' 		<a id="popup_register" href="javascript:void(0)" class="btn-style btn-style1">Register</a>'
					+ ' 	</div>'
					
					
					+ ' 	<a id="popup_close" href="javascript:void(0)" class="layer-close">'
					+ ' 		<span class="sr-only">close layer popup</span>'
					+ ' 		<i class="xi-close" title="Close popup"></i>'
					+ ' 	</a>'
					// BUTTON
					+ '</div>';
				return sample;
			},
		}
	},
	/* 발전기 체크 리스트 페이지 */
	oam_0400: {
		main: {
			tr_report_row: function(param) {
				var sample = 
					'<tr id="tr-' + param.ID + '">'
					+ '		<td>' + param.RN + '</td>' 												
					+ '		<td>' + param.ALARM_CODE + '</td>'
					+ '		<td>' + param.POSITION + '</td>'
					+ '		<td>' + param.RPT_NM + '</td>'
					+ '		<td>' + param.REGISTRATOR + '</td>'
					+ '		<td>' + param.DATETIME + '</td>'
					+ '		<td>'
					+ ' 		<a href="javascript:void(0);" class="download-btn" title="Download PDF">'
					+ ' 			<i class="xi-download"></i>'
					+ ' 		</a>'
					+ ' 	</td>'
					+ '</tr>';
				return sample;
			},
			no_data: function() {
				var sample = 
					'<tr><td colspan="7" style="padding: 10rem .45rem 10rem .45rem !important; font-size: 1rem !important;">No Data</td></tr>';
				return sample;
			}
		}, 
	},
	/* 발전기 체크 리스트 등록, 수정 페이지 */
	oam_0401: {
		main: {
			tr_checklist_row: function(param) {
				var sample= ''
					+ '<tr id="ITEM_' + param.ID + '">'
					
					if(param.GROUP_NUM === 1 && param.GROUP_CNT > 1) {
						sample = sample
						+ ' 	<td rowspan="' + param.GROUP_CNT + '">' + param.CHK_NO + '</td>'
						+ ' 	<td rowspan="' + param.GROUP_CNT + '">' + param.CHK_ITEM + '</td>';
					} 
					else if(param.GROUP_NUM === 1 && param.GROUP_CNT === 1){
						sample = sample
						+ ' 	<td>' + param.CHK_NO + '</td>'
						+ ' 	<td>' + param.CHK_ITEM + '</td>';
					}
				
					if(param.IS_REMARK) {
						sample = sample 
						+ '		<td colspan="3">'
						+ ' 		<div class="input-group">'
						+ ' 			<label for="REMARK_' + param.ID + '" class="sr-only"></label>'
						+ ' 			<input type="text" name="REMARK_' + param.ID + '" id="REMARK_' + param.ID + '" maxlength="100">'
						+ ' 		</div>'
						+ '		</td>';
					} else {
						sample = sample
						+ ' 	<td>' + param.CHK_DETAIL + '</td>'
						+ ' 	<td>'
						+ ' 		<ul class="checkbox-radio-custom">'
						+ ' 			<li>'
						+ ' 				<input type="radio" class="radio" name="radio_' + param.ID + '" id="radio_Y_' + param.ID + '" value="Y">'
						+ ' 				<label for="radio_Y_' + param.ID + '">Normal</label>'
						+ ' 			</li>'
						+ ' 			<li>'
						+ ' 				<input type="radio" class="radio" name="radio_' + param.ID + '" id="radio_N_' + param.ID + '" value="N">'
						+ ' 				<label for="radio_N_' + param.ID + '">Abnormal</label>'
						+ ' 			</li>'
						+ ' 		</ul>'
						+ '		</td>'
						+ '		<td>'
						+ ' 		<div class="input-group">'
						+ ' 			<label for="REMARK_' + param.ID + '" class="sr-only"></label>'
						+ ' 			<input type="text" name="REMARK_' + param.ID + '" id="REMARK_' + param.ID + '" maxlength="20">'
						+ ' 		</div>'
						+ '		</td>';
					}
					sample = sample + '</tr>';
				return sample;
			},
		}, 
	},
	/* 발전기 체스리스트 상세 페이지 */
	oam_0402: {
		main: {
			tr_checklist_row: function(param) {
				
				param.CHK = param.CHK === 'Y' ? 'Normal' : (param.CHK === 'N' ? 'Abnormal' : 'Unchecked'); 
				
				var cls = param.CHK.toLowerCase(); 
				var sample= ''
					+ '<tr id="ITEM_' + param.ID + '">'
					
					if(param.GROUP_NUM === 1 && param.GROUP_CNT > 1) {
						sample = sample
						+ ' 	<td rowspan="' + param.GROUP_CNT + '">' + param.CHK_NO + '</td>'
						+ ' 	<td rowspan="' + param.GROUP_CNT + '">' + param.CHK_ITEM + '</td>';
					} 
					else if(param.GROUP_NUM === 1 && param.GROUP_CNT === 1){
						sample = sample
						+ ' 	<td>' + param.CHK_NO + '</td>'
						+ ' 	<td>' + param.CHK_ITEM + '</td>';
					}
				
					if(param.IS_REMARK) {
						sample = sample 
						+ '		<td colspan="3"><span class="remark change-line">' + param.RMK + '</span></td>';
					} else {
						sample = sample
						+ ' 	<td>' + param.CHK_DETAIL + '</td>'
						+ ' 	<td><span class="' + cls + '">' + param.CHK + '</span></td>'
						+ '		<td><span class="remark change-line">' + param.RMK + '</span></td>';
					}
					sample = sample + '</tr>';
				return sample;
			}
		}, 
	},
	
	oam_0500: {
		main: {
			tr_alarm_row: function(param) {
				
				var icon = ['xi-error', 'xi-library-books', 'xi-wrench', 'xi-check-circle', 'xi-error'][param.status - 1]; 
				var cls = ['process-mark1', 'process-mark2', 'process-mark3', 'process-mark4', 'process-mark5'][param.status - 1];
				
				var sample = 
					'<tr id="tr-' + param.id + '">'
					+ '		<td>' + param.num + '</td>' 												
					+ '		<td>'
					+ ' 		<span class="process-mark ' + cls + '">'
					+ ' 			<i class="'+ icon + '"></i>'
					+ ' 			<span class="sr-only">Repair completed</span>'
					+ ' 		</a>'
					+ ' 	</td>'
					+ '		<td>' + param.position + '</td>'
					+ '		<td>' + param.datetime + '</td>'
					+ '		<td>' + param.code + '</td>'
					+ '		<td>' + param.description + '</td>'
					+ '		<td>'
					+ ' 		<a href="" class="download-btn">'
					+ ' 			<i class="xi-download"></i>'
					+ ' 		</a>'
					+ ' 	</td>'
					+ '		<td>'
					+ ' 		<a href="" class="download-btn">'
					+ ' 			<i class="xi-download"></i>'
					+ ' 		</a>'
					+ ' 	</td>'
					+ '</tr>';
				return sample;
			},
			no_data: function() {
				var sample = 
					'<tr><td colspan="8" style="padding: 10rem .45rem 10rem .45rem !important; font-size: 1rem !important;">No Data</td></tr>';
				return sample;
			}
		},
	},
	oam_0501: {
		section1: {
			li_sensor_colors: function(i) {
				//var colors = ['#f27e0d', '#59c1d3', '#ee2a82', '#1763ff'];
				var colors = ['#F44336', '#FF4081', '#9C27B0', '#673AB7', '#2196F3', '#009688', '#4CAF50', '#FFC107', '#FF5722', '#795548', '#607D8B', '#212121'];
				return colors[i]; 
			},
			span_sensor_point: function(param) {
//				BLADE1-TOP   	60px  86px
//				BLADE1-MIDDLE   227px 86px
//				BLADE1-ROOT     432px 86px
//
//				BLADE2-TOP   	60px  238px
//				BLADE2-MIDDLE   227px 238px
//				BLADE2-ROOT     432px 238px
//
//				BLADE3-TOP   	60px  383px
//				BLADE3-MIDDLE   227px 383px
//				BLADE3-ROOT     432px 383px
//
//				TOWER-TOP   	74px 1520px
//				TOWER-MIDDLE   259px 1520px
//				TOWER-ROOT     432px 1520px
//
//				CONTROLLER-NACELLE 213px 560px
//
//				GEAR_BOX-HOUSING 222px 467px
//
//				HUB-SHAFT 	230px 270px
				var position = {
					BLADE1_TOP 		: {top:60, left:86},
					BLADE1_MIDDLE 	: {top:227, left:86},
					BLADE1_ROOT 	: {top:432, left:86},
					
					BLADE2_TOP 		: {top:60, left:238},
					BLADE2_MIDDLE 	: {top:227, left:238},
					BLADE2_ROOT 	: {top:432, left:238},
					
					BLADE3_TOP 		: {top:60, left:383},
					BLADE3_MIDDLE 	: {top:227, left:383},
					BLADE3_ROOT 	: {top:432, left:383},
					
					TOWER_TOP 		: {top:70, left:149},
					TOWER_MIDDLE 	: {top:200, left:149},
					TOWER_ROOT 		: {top:400, left:149},
					
					CONTROLLER_NACELLE : {top:213, left:560},
					
					GEAR_BOX_HOUSING: {top:222, left:467},
					
					HUB_SHAFT: {top:230, left:270},
				};
				var color = _oam_elements.oam_0501.section1.li_sensor_colors(param.INDEX);
				var sample = ''
				+ '<span id="SENSOR_POINT_' + param.ID + '" class="point" style="top:' + position[param.POSITION].top + 'px; left:' + position[param.POSITION].left + 'px;">'
				+ '		<span class="tooltip" style="background:' + color + ';">' + param.SENSOR_NM + '</span>'
				+ '</span>'
				return sample;
			},
			li_sensor_button: function(param) {
				
				var color = _oam_elements.oam_0501.section1.li_sensor_colors(param.INDEX);
				
				var sample = ''
				+ '<li id="SENSOR_' + param.ID + '" class="active" style="background:' + color + ';color:#fff;border:2px solid ' + color + ';">'
				+ '		<span>' + param.SENSOR_NM + '</span>'
				+ '		<div class="sen-tooltip">'
				+ '			<p>위치 : <span>' + param.POSITION + '</span></p>'
				+ '			<p>측정 항목 : <span>' + param.MEASUREMENT + '</span></p>'
				+ '			<p>측정 단위 : <span>' + param.UNIT + '</span></p>'
				+ '		</div>'
				+ '</li>';
				return sample;
			},
		},
		section2: {
			li_pre_plan_row: function(param) {
				var sample = ''
				+ '<li id="PRE_PLAN_' + param.ID + '">'
				+ ' 	<div class="plan-lst-info-wrap">'
				+ ' 		<div class="plan-info-wrap">'
				+ ' 			<div class="new-checkbox-custom">'
				+ ' 				<label>' + param.PLAN_NM_KR + '</label>'
				+ ' 			</div>'
				+ ' 			<span class="plan-info">'
				+ ' 				<strong>' + param.PLAN_NM_EN + '</strong>'
				+ ' 			</span>'
				+ ' 		</div>'
				+ ' 		<span class="plan-etc">'
				+ ' 			<em>' + param.WRITER + '</em>'
				+ ' 			<em>' + param.DATETIME + '</em>'
				+ ' 			<a id="DOWNLOAD_BTN_' + param.ID + '" href="javascript:void(0);" class="plan-modify">'
				+ ' 				<span class="sr-only">plan download</span>'
				+ ' 				<i class="xi-download"></i>'
				+ ' 			</a>'
				+ ' 		</span>'
				+ ' 	</div>'
				+ '</li>';
				return sample;	
			},
			li_new_plan_row: function(param) {
				var sample = ''
				+ '<li id="NEW_PLAN_' + param.ID + '">'
				+ ' 	<div class="plan-lst-info-wrap">'
				+ ' 		<div class="plan-info-wrap">'
				+ ' 			<div class="new-checkbox-custom">'
				+ ' 				<input id="RADIO_' + param.ID + '" type="radio" name="radio">'
				+ ' 				<label for="RADIO_' + param.ID + '">' + param.PLAN_NM_KR + '</label>'
				+ ' 			</div>'
				+ ' 			<span class="plan-info">'
				+ ' 				<strong>' + param.PLAN_NM_EN + '</strong>'
				//+ ' 				<em>Confirm</em>'
				+ ' 			</span>'
				+ ' 		</div>'
				+ ' 		<span class="plan-etc">'
				+ ' 			<em>' + param.WRITER + '</em>'
				+ ' 			<em>' + param.DATETIME + '</em>'
//				+ ' 			<a id="MODIFY_BTN_' + param.ID + '" href="javascript:void(0);" class="plan-modify">'
//				+ ' 				<span class="sr-only">plan modify</span>'
//				+ ' 				<i class="xi-pen"></i>'
//				+ ' 			</a>'
//				+ ' 			<a id="SCHEDULE_BTN_' + param.ID + '" href="javascript:void(0);" class="plan-modify">'
//				+ ' 				<span class="sr-only">plan schedule</span>'
//				+ ' 				<i class="xi-document"></i>'
//				+ ' 			</a>'
				+ ' 			<a id="DOWNLOAD_BTN_' + param.ID + '" href="javascript:void(0);" class="plan-modify">'
				+ ' 				<span class="sr-only">plan download</span>'
				+ ' 				<i class="xi-download"></i>'
				+ ' 			</a>'
				+ ' 		</span>'
				+ ' 	</div>'
				+ ' 	<a id="CONFIRM_BTN_' + param.ID + '" href="javascript:void(0);" class="plan-Confirm">Confirm</a>'
				+ '</li>';
				return sample;
			},
		},
		section3: {
			li_pre_report_row: function(param) {
				var sample = ''
				+ '<li id="PRE_REPORT_' + param.ID + '">'
				+ ' 	<div class="plan-lst-info-wrap">'
				+ ' 		<div class="plan-info-wrap">'
				+ ' 			<div class="new-checkbox-custom">'
				+ ' 				<label>' + param.TYPE + '</label>'
				+ ' 			</div>'
				+ ' 			<span class="plan-info">'
				+ ' 				<strong>' + param.RPT_NM + '</strong>'
				+ ' 			</span>'
				+ ' 		</div>'
				+ ' 		<span class="plan-etc">'
				+ ' 			<em>' + param.WRITER + '</em>'
				+ ' 			<em>' + param.DATETIME + '</em>'
				+ ' 			<a id="DOWNLOAD_BTN_' + param.ID + '" href="javascript:void(0);" class="plan-modify">'
				+ ' 				<span class="sr-only">plan download</span>'
				+ ' 				<i class="xi-download"></i>'
				+ ' 			</a>'
				+ ' 		</span>'
				+ ' 	</div>'
				+ '</li>';
				return sample;	
			},
			li_new_report_row: function(param) {
				var sample = ''
				+ '<li id="NEW_REPORT_' + param.ID + '">'
				+ ' 	<div class="plan-lst-info-wrap">'
				+ ' 		<div class="plan-info-wrap">'
				+ ' 			<div class="new-checkbox-custom">'
//				+ ' 				<input id="RADIO_' + param.ID + '" type="radio" name="radio">'
				+ ' 				<label for="RADIO_' + param.ID + '">' + param.TYPE + '</label>'
				+ ' 			</div>'
				+ ' 			<span class="plan-info">'
				+ ' 				<strong>' + param.RPT_NM + '</strong>'
				//+ ' 				<em>Confirm</em>'
				+ ' 			</span>'
				+ ' 		</div>'
				+ ' 		<span class="plan-etc">'
				+ ' 			<em>' + param.WRITER + '</em>'
				+ ' 			<em>' + param.DATETIME + '</em>'
//				+ ' 			<a id="MODIFY_BTN_' + param.ID + '" href="javascript:void(0);" class="plan-modify">'
//				+ ' 				<span class="sr-only">plan modify</span>'
//				+ ' 				<i class="xi-pen"></i>'
//				+ ' 			</a>'
//				+ ' 			<a id="SCHEDULE_BTN_' + param.ID + '" href="javascript:void(0);" class="plan-modify">'
//				+ ' 				<span class="sr-only">plan schedule</span>'
//				+ ' 				<i class="xi-document"></i>'
//				+ ' 			</a>'
				+ ' 			<a id="DOWNLOAD_BTN_' + param.ID + '" href="javascript:void(0);" class="plan-modify">'
				+ ' 				<span class="sr-only">plan download</span>'
				+ ' 				<i class="xi-download"></i>'
				+ ' 			</a>'
				+ ' 		</span>'
				+ ' 	</div>'
//				+ ' 	<a id="CONFIRN_BTN_' + param.ID + '" href="javascript:void(0);" class="plan-Confirm">Confirm</a>'
				+ '</li>';
				return sample;
			},
		}
	}
	
	
}