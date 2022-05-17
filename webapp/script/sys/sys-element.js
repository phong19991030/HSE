const _sys_elements = {
	sys_0100: {
		
	},
	sys_0101: {
		main: {
			div_group_row: function(param) {
				
				param.NAME = param.NAME ? param.NAME : '';
				
				var sample = ''
					+ '<div id="GROUP_ROW_' + param.ID + '" class="input-group-wrapper">'
					+ '		<div class="input-group">'
					+ ' 		<label for="GROUP_NM_' + param.ID + '" class="sr-only"></label>'
					+ ' 		<input type="text" id="GROUP_NM_' + param.ID + '" validation-check="required" value="' + param.NAME + '" maxlength="15">'
					+ '		</div>'
					+ '  	<div class="add-delete-btn-wrap">'
					sample = sample
					+ '			<a id="DELETE_BTN_' + param.ID + '" class="delete-btn">'
					+ '     		<span class="sr-only">delete</span>'
					+ '    	 		<i class="xi-minus-square" title="Delete group"></i>'
					+ '  	 	</a>';
//					if(param.NUM > 0) {
//						sample = sample
//						+ '			<a id="DELETE_BTN_' + param.ID + '" class="delete-btn">'
//						+ '     		<span class="sr-only">delete</span>'
//						+ '    	 		<i class="xi-minus-square"></i>'
//						+ '  	 	</a>';
//					}
//					if(param.NUM === 0) {
//						sample = sample 
//						+ ' 		<a id="ADD_BTN_' + param.ID + '" class="add-btn">'
//						+ '      		<span class="sr-only">add</span>'
//						+ '      		<i class="xi-plus-square"></i>'
//						+ '    		</a>';
//					}
					sample = sample 
					+ '    </div>'
					+ '</div>';	
				return sample;
			},
		},
		popup: {
			tr_company_row : function(param) { 
				var row = 
					'<tr>'
					+ '<td>' + '<div class="checkbox-radio-custom">'
							 + '<input type="checkbox" class="checkbox" id="CHECKBOX_' + param.ID +'">'
							 + '<label for="CHECKBOX_' + param.ID +'" class="sr-only"></label>'
							 + '</div>'
					+ '</td>'
					+ '<td>' + '<img src="' + param.LOGO_PATH + '" style="width:100%;max-height:23px;object-fit:scale-down">' 
					+ '</td>'
					+ '<td>' + param.COMPANY_NM + '</td>'
					+ '</tr>';
				
				return row;
			}
		},
	},
	sys_0201: {
		popup: {
			model_content: function(param){
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
					+ ' 		<i class="xi-close" title="Close Popup"></i>'
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
					+ ' 		<img src="' + param.MODEL_IMG_PATH + '" style="width:100%;max-height:200px;object-fit:scale-down;">'
					+ ' 	</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_B">'
					+ ' 	<th scope="row">Model</th>'
					+ ' 	<td>' + param.MODEL_NM + '</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_C">'
					+ ' 	<th scope="row">Manufacturer</th>'
					+ ' 	<td><img src="' + param.MANUFACTURER_LOGO_PATH + '" style="width:100%;max-height:25px;object-fit:scale-down;"></td>'
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
			/* 운�?사 콘�?츠 */
			operator_content: function(param){
				var sample = ''
					+ '<div class="layer-cont ' + param.TYPE + '" popup-type="' + param.TYPE + '">'
					// Title
					+ '		<div class="tit-wrap"> '
					+ '			<strong id="POPUP_TITLE" class="heading6">' + param.TITLE + '</strong>'
					+ '		</div>'
					
					// SearchBox
					+ '		<div class="search-form-wrap">'
					+ '			<div class="search-wrapper">'
					+ '				<form id="detailKeywordForm" name="detailKeywordForm">'
					+ '					<div class="input-group">'
					+ '						 <label for="detailKeyword" class="sr-only"></label>'
					+ '						 <input id="popup_search" type="text"validation-check="required"  placeholder="Enter your search term and then press Enter." autocomplete="off">'
					+ '					</div>'
					+ ' 				<a id="popup_search_refresh" class="refresh-btn">'
					+ ' 					<i class="xi-refresh" title="Refresh"></i>'
					+ ' 				</a>'
					+ '				</form>'
					+ ' 		</div>'
					+ ' 	</div>'
					
					// Table
					+ '		<div class="base_grid_table" style="margin-bottom:10px;width:100%;max-height:80%;">'
					+ ' 		<table>'
					+ '				<colgroup>'
					+ '					<col style="width:15%">'
					+ '					<col style="width:35%">'
					+ '					<col style="width:50%">'
					+ '				</colgroup>'
					+ ' 			<thead>'
					+ '					<tr>'
					+ '						<th></th>'
					+ '						<th>Logo</th>'
					+ '						<th>Operator</th>'
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
			tr_operator_row: function(param) {
				var sample = ''
					+ '<tr id="tr_' + param.ID + '">'
					+ '		<td>'
					+ '			<div class="checkbox-radio-custom">'
					+ '				<input type="radio" id="RADIO_' + param.ID +  '" name="raido" validation-check="required">'
					+ '				<label for="radio_' + param.ID +  '" class="sr-only"></label>'
					+ '			</div>'
					+ '		</td>'
					+ '		<td>'
					+ ' 		<img src="' + param.LOGO_PATH + '" style="width:100%;max-height:23px;object-fit:scale-down;">'
					+ '		</td>'
					+ '		<td>' + param.COMPANY_NM + '</td>'
					+ '</tr>';
				return sample;
			},
		}
	},
	sys_0300: {
		
	},
	sys_0301: {
		popup: {
			/* 유지보수사 콘�?츠 */
			company_content: function(param) {
				var sample = ''
					+ '<div class="popup-cont layer-cont ' + param.TYPE + '" popup-type="' + param.TYPE + '">'
					// Title
					+ '	<h2 class="heading4">' + param.TITLE + '</h2>'
					// Title
					
					// SearchBox
					+ '	<div class="fixed-search-form2">'
					+ '		<div class="search-bar">'
					+ ' 		<input id="popup_search" type="text" placeholder="Enter your search term and then press Enter." autocomplete="off">'
					+ ' 		<button id="popup_search_refresh" class="search-btn refresh-btn">검색</button>'	
					+ ' 	</div>'
					+ '	</div>'
					// SearchBox
					
					// Table
					+ ' <article class="list-form">'
					+ '		<div class="base-table">'
					+ ' 		<table>'
					+ '				<colgroup>'
					+ '					<col style="width:20px">'
					/*+ '					<col style="width:80px">'*/
					// + '					<col style="width:60px">'
					+ '				</colgroup>'
					+ ' 			<thead>'
					+ '					<tr>'
					+ '						<th></th>'
					/*+ '						<th>Logo</th>'*/
					+ '						<th>Organization</th>'
					// + '						<th>Classification</th>'
					+ '					</tr>'
					+ ' 			</thead>'
					+ ' 			<tbody id="popup_list">'
					+ ' 			</tbody>'
					+ ' 		</table>'	
					+ '		</div>'
					+ ' </article>'
					// Table
		
					// Button
					+ ' 	<div class="foot-btn-area">'
					+ ' 		<button id="popup_register" class="btn-style1">등록</button>'
					+ ' 	</div>'
					
					+ '  	<button id="popup_close" type="button" class="popup-close-btn">'
					+ '			<i class="xi-close"></i>'
					+ '		</button>'
					// Button
					+ '</div>';
				
				return sample;
			},
			tr_company_row: function(param) {
				// var CLS = {1: 'Operator', 2: 'Manufacturer', 3: 'ISP', 4:'Consulting firm'};
				// param.CLS = param.CLS !== undefined ? CLS[param.CLS] : "";
				var sample = ''
					+ '<tr id="tr_' + param.ID + '">'
					+ '		<td>'
					+ '			<div class="checkbox-radio-custom">'
					+ '				<input type="radio" id="radio_' + param.ID +  '" name="raido">'
					+ '				<label for="radio_' + param.ID +  '"></label>'
					+ '			</div>'
					+ '		</td>'
				/*	+ '		<td>'
					+ ' 		<img src="' + param.LOGO_PATH + '" style="width:100%;max-height:23px;object-fit:scale-down;">'
					+ '		</td>'*/
					+ '		<td>' + param.COMPANY_NM + '</td>'
					// + '		<td>' + param.CLS + '</td>'
					+ '</tr>';
				return sample;
			},
			/* 메뉴 접근 권한 권한 콘�?츠 */
			menu_access_content: function(param) {
				var sample = ''
					+ '<div class="popup-cont layer-cont ' + param.TYPE + '" popup-type="' + param.TYPE + '">'
					// Title
					+ ' 	<h2 class="heading4">' + param.TITLE + '</h2>'
					// Title
					
					// SearchBox
					+ '	<div class="fixed-search-form2">'
					+ '		<div class="search-bar">'
					+ ' 		<input id="popup_search" type="text" placeholder="Enter your search term and then press Enter." autocomplete="off">'
					+ ' 		<button id="popup_search_refresh" class="search-btn refresh-btn">검색</button>'	
					+ ' 	</div>'
					+ '	</div>'
					// SearchBox
					
					// Table
					+ ' 	<article class="list-form base_grid_table">'
					+ '			<div class="base-table">'
					+ ' 			<table>'
					+ '					<colgroup>'
					+ '						<col style="width:20px">'
					+ '						<col style="width:75px">'
					+ '						<col style="width:80px">'
					+ '					</colgroup>'
					+ ' 				<thead>'
					+ '						<tr>'
					+ '							<th>'
					+ '								<span class="checkbox-radio-group">'
					+ ' 								<label><input type="checkbox" name="checkbox" class="checkbox" id="all_check"></label>'
					+ ' 							</span>'
					+ '							</th>'
					+ '							<th>Permission</th>'
					+ '							<th>Description</th>'
					+ '						</tr>'
					+ ' 				</thead>'
					+ ' 				<tbody id="popup_list">'
					
					+ ' 				</tbody>'
					+ ' 			</table>'
					+ '			</div>'
					+ ' 	</article>'
					// Table
					
					// Button
					+ ' 	<div class="foot-btn-area">'
					+ ' 		<button id="popup_register" class="btn-style1">등록</button>'
					+ ' 	</div>'
					
					+ '  	<button id="popup_close" type="button" class="popup-close-btn">'
					+ '			<i class="xi-close"></i>'
					+ '		</button>'
					// Button
					+ '</div>';
				
				return sample;
			},
			tr_menu_access_row: function(param) {
				var sample = ''
					+ '<tr id="tr_' + param.ID + '">'
					+ '		<td>'
					+ '			<span class="checkbox-radio-group">'
					+ '				<label for="checkbox_' + param.ID +  '"><input type="checkbox" name="checkbox" id="checkbox_' + param.ID +  '"></label>'
					+ '			</span>'
					+ '		</td>'
					+ '		<td>' + param.NAME + '</td>'
					+ '		<td>' + param.DESC + '</td>'
					+ '</tr>';
				return sample;
			},
			turbine_permission_content: function(param) {
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
					+ '					<col style="width:75px">'
					+ '					<col style="width:75px">'
					+ '					<col style="width:75px">'
					+ '				</colgroup>'
					+ ' 			<thead>'
					+ '					<tr>'
					+ '						<th>'
					+ '							<div class="checkbox-radio-custom">'
					+ ' 							<input type="checkbox" class="checkbox" id="all_check">'
					+ ' 							<label for="all_check"></label>'
					+ ' 						</div>'
					+ '						</th>'
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
			tr_turbine_permission_row: function(param) {
				var sample = ''
					+ '<tr id="tr_' + param.ID + '">'
					+ '		<td>'
					+ '			<div class="checkbox-radio-custom">'
					+ '				<input type="checkbox" id="checkbox_' + param.ID +  '">'
					+ '				<label for="checkbox_' + param.ID +  '" class="sr-only"></label>'
					+ '			</div>'
					+ '		</td>'
					+ '		<td>' + param.FARM_NM + '</td>'
					+ '		<td>' + param.GROUP_NM + '</td>'
					+ '		<td>' + param.TURBINE_NM + '</td>'
					+ '</tr>';
				return sample;
			},
		}
	},
	
	project_0101: {
		popup: {
			status_content: function(param) {
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
						+ '					<col style="width:80px">'
						+ '					<col style="width:60px">'
						+ '				</colgroup>'
						+ ' 			<thead>'
						+ '					<tr>'
						+ '						<th></th>'
						+ '						<th>Code</th>'
						+ '						<th>Status</th>'
						+ '						<th>Detail</th>'
						+ '					</tr>'
						+ ' 			</thead>'
						+ ' 			<tbody id="popup_list">'
						
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
			tr_status_row: function(param) {
					var sample = ''
						+ '<tr id="tr_' + param.COMM_CD + '">'
						+ '		<td>'
						+ '			<div class="checkbox-radio-custom">'
						+ '				<input type="radio" id="radio_' + param.COMM_CD +  '" name="raido">'
						+ '				<label for="radio_' + param.COMM_CD +  '" class="sr-only"></label>'
						+ '			</div>'
						+ '		</td>'
						+ '		<td>' + param.COMM_CD + '</td>'
						+ '		<td>' + param.COMM_NM + '</td>'
						+ '		<td>' + param.DESCRPT + '</td>'
						+ '</tr>';
					return sample;
			},
			manager_content: function(param) {
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
						+ '					<col style="width:80px">'
						+ '					<col style="width:60px">'
						+ '				</colgroup>'
						+ ' 			<thead>'
						+ '					<tr>'
						+ '						<th></th>'
						+ '						<th>Name</th>'
						+ '						<th>Duty Code</th>'
						+ '						<th>Area code</th>'
						+ '					</tr>'
						+ ' 			</thead>'
						+ ' 			<tbody id="popup_list">'
						
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
			tr_manager_row: function(param) {
					var sample = ''
						+ '<tr id="tr_' + param.EMP_NO + '">'
						+ '		<td>'
						+ '			<div class="checkbox-radio-custom">'
						+ '				<input type="radio" id="radio_' + param.EMP_NO +  '" name="raido">'
						+ '				<label for="radio_' + param.EMP_NO +  '" class="sr-only"></label>'
						+ '			</div>'
						+ '		</td>'
						+ '		<td>' + param.EMP_NAME + '</td>'
						+ '		<td>' + param.DUTY + '</td>'
						+ '		<td>' + param.AREA_CD + '</td>'
						+ '</tr>';
					return sample;
			},
		}
	},
	
	sys_0601: {
		main: {
			tr_grant_row: function(param) {
				var readonly = '';
				if(param.READ_ONLY) readonly = 'readonly'; 
				var sample = ''
					+ '<tr menu-id="' + param.MENU_ID + '" parent-menu-id="' + param.UP_MENU_ID + '">'
					+ '		<td>' + param.NUM + '</td>'
					+ '		<td>' + param.MENU_NM_KOR + '</td>'
					+ '		<td>' + param.MENU_NM_ENG + '</td>'
					+ '		<td>' + param.MENU_ID + '</td>'
					+ '		<td>'
					+ '			<div class="checkbox-radio-group">'
					+ '				<input type="checkbox" id="CHECK_READ_' + param.MENU_ID + '" name="checkbox" ' + readonly + '>'
					+ '				<label for="CHECK_READ_' + param.MENU_ID + '" class="sr-only"></label>'
					+ '			</div>'
					+ '		</td>'
					+ '		<td>'
					+ '			<div class="checkbox-radio-group">'
					+ '				<input type="checkbox" id="CHECK_WRITE_' + param.MENU_ID + '" name="checkbox" ' + readonly + '>'
					+ '				<label for="CHECK_WRITE_' + param.MENU_ID + '" class="sr-only"></label>'
					+ '			</div>'
					+ '		</td>'
					+ '		<td>'
					+ '			<div class="checkbox-radio-group">'
					+ '				<input type="checkbox" id="CHECK_DOWN_' + param.MENU_ID + '" name="checkbox" ' + readonly + '>'
					+ '				<label for="CHECK_DOWN_' + param.MENU_ID + '" class="sr-only"></label>'
					+ '			</div>'
					+ '		</td>'
					+ '</tr>';
				return sample;
			},
		},
	},
	sys_0602: {
		main: {
			tr_grant_row: function(param) {
				var readonly = '';
				if(param.READ_ONLY) readonly = 'readonly'; 
				var sample = ''
					+ '<tr>'
					+ '		<td>' + param.NUM + '</td>'
					+ '		<td>' + param.MENU_NM_KOR + '</td>'
					+ '		<td>' + param.MENU_NM_ENG + '</td>'
					+ '		<td>' + param.MENU_ID + '</td>'
					+ '		<td>'
					+ '			<div class="checkbox-radio-group">'
					+ '				<input type="checkbox" id="CHECK_READ_' + param.MENU_ID + '" name="checkbox" ' + readonly + '>'
					+ '				<label for="CHECK_READ_' + param.MENU_ID + '" class="sr-only"></label>'
					+ '			</div>'
					+ '		</td>'
					+ '		<td>'
					+ '			<div class="checkbox-radio-group">'
					+ '				<input type="checkbox" id="CHECK_WRITE_' + param.MENU_ID + '" name="checkbox" ' + readonly + '>'
					+ '				<label for="CHECK_WRITE_' + param.MENU_ID + '" class="sr-only"></label>'
					+ '			</div>'
					+ '		</td>'
					+ '		<td>'
					+ '			<div class="checkbox-radio-group">'
					+ '				<input type="checkbox" id="CHECK_DOWN_' + param.MENU_ID + '" name="checkbox" ' + readonly + '>'
					+ '				<label for="CHECK_DOWN_' + param.MENU_ID + '" class="sr-only"></label>'
					+ '			</div>'
					+ '		</td>'
					+ '</tr>';
				return sample;
			},
		},
	},
	/* 공지사항 리스트 페�?�지 */
	sys_0700: {
		main: {
			tr_notice_row: function(param){
				var sample = 
					'<tr>'
					+ ' <td>' + param.RN + '</td>'
					+ ' <td>' + param.TITLE + '</td>'
					+ ' <td>' + param.REGISTER + '</td>'
					+ ' <td>' + param.INS_DATETIME + '</td>'
					if(param.ATCH_FILE === 1){
						sample = sample
						+ ' <td>'
						+ ' 	<a id="DOWNLOAD_BTN" class="download-btn" title="Attachment exist">'
						+ '			<i class="xi-download"></i>'
						+ '		</a>' 
						+ ' </td>';	
					}else if(param.ATCH_FILE === 0){
						sample = sample
						+ ' <td>'
						+ ' </td>';
					}
					sample = sample
					if(param.STATUS === 0){
						sample = sample
						+ ' <td>'
						+ ' 	<span class="active_0">Inactive</span>'
						+ '</td>';
					}else if(param.STATUS === 1){
						sample = sample
						+ ' <td>'
						+ ' 	<span class="active_1">Active</span>'
						+ '</td>';
					}
					sample = sample
					+ '</tr>';
				return sample;
			},
			no_data: function(){
				var sample = 
					'<tr><td colspan="6" style="padding: 10rem .45rem 10rem .45rem !important; font-size: 1rem !important;">No Data</td></tr>';
				return sample;
			}
		},
	},
	/* Menu Management */
	sys_0800: {
		main: {
			tr_menu_row: function(param) {
				param.ID = param.MENU_ID;
				var checked = param.USE_YN === 'Y' ? 'checked' : '';
				var sample = ''
					+ '<tr id="MENU-ROW-' + param.ID + '" class="menu-row lev' + param.LEV + '">'
					+ ' 	<td class="txt-left">'
					
//					+ ' 		<a id="FOLD-BTN-' + param.ID + '" href="javascript:void(0);" class="fold-btn fold">';
//					if(param.hasChild) {
//						// fold / unfold
//						sample = sample 
//						+ ' 			<i class="xi-plus-circle" title="Fold"></i>'
//						+ ' 			<i class="xi-minus-circle-o" title="Unfold"></i>';
//					}
//					sample = sample
//					+ ' 		</a>'
					
					+ ' 		<a id="FOLD-BTN-' + param.ID + '" href="javascript:void(0);" class="fold-btn unfold" style="' + (param.hasChild ? '' : 'opacity:0;pointer-events:none;') + '">'
					+ ' 			<i class="xi-plus-circle" title="Fold"></i>'
					+ ' 			<i class="xi-minus-circle-o" title="Unfold"></i>'
					+ ' 		</a>'
					
					+ ' 		<span>' + param.MENU_NM + '</span>'
					+ ' 	</td>'
					+ ' 	<td>' + param.MENU_NM_ENG + '</td>'
					+ ' 	<td>' + param.MENU_ID + '</td>'
					+ ' 	<td>' + (param.LINK_PATH ? param.LINK_PATH : '') + '</td>'
					+ ' 	<td>' + (param.UP_MENU_ID ? param.UP_MENU_ID : '') + '</td>'
					+ ' 	<td>' + param.USE_YN
//					+ ' 		<span class="active-toggle-wrap">'
//					+ ' 			<input type="checkbox" id="ACTIVE-BTN-' + param.ID + '" class="sr-only" ' + checked + '>'
//					+ ' 			<label for="ACTIVE-BTN-' + param.ID + '">'
//					+ ' 				<span class="sr-only"></span>'
//					+ ' 			</label>'
//					+ ' 		</span>'
					+ '		</td>'
					+ ' 	<td>' + param.ORD_NO + '</td>'
					+ ' 	<td>' + param.LEV + '</td>'
					+ ' 	<td>'
					+ ' 		<a id="MODIFY-BTN-' + param.ID + '" href="javascript:void(0);" class="delete-btn">'
					+ ' 			<i class="xi-pen" title="Modify"></i>'
					+ ' 		</a>'
					+ '		</td>'
					+ ' 	<td>'
					+ ' 		<a id="ADD-BTN-' + param.ID + '" href="javascript:void(0);" class="delete-btn" style="' + (parseInt(param.LEV) > 3 ? 'display:none;' : '') + '">'
					+ ' 			<i class="xi-plus" title="Add"></i>'
					+ ' 		</a>'
					+ '		</td>'
					+ ' 	<td>'
					+ ' 		<a id="DELETE-BTN-' + param.ID + '" href="javascript:void(0);" class="delete-btn">'
					+ ' 			<i class="xi-trash" title="Delete"></i>'
					+ ' 		</a>'
					+ '		</td>'
					+ '</tr>';
				return sample;
			},
			tr_menu_sub_row: function(param) {
				var sample = ''
					+ '<tr id="MENU-SUB-ROW-' + param.UP_MENU_ID + '" class="sub-table">'
					+ ' 	<td colspan="11">'
					+ ' 		<div id="MENU-FOLD-' + param.UP_MENU_ID + '" class="base_grid_table">'
					+ ' 			<div class="table-wrap">'
					+ ' 				<table>'
					+ ' 					<caption>Menu Management - No, Condition, Menu, Menu ID, URL, Use or not, Upper menu, Order, Menu level</caption>'
					+ ' 					<colgroup>'
					+ param.COL
//					+ ' 						<col style="width:20%">'
//					+ ' 						<col style="width:20%">'
//					+ ' 						<col style="width:15%">'
//					+ ' 						<col style="width:15%">'
//					+ ' 						<col style="width:10%">'
//					+ ' 						<col style="width:5%">'
//					+ ' 						<col style="width:3%">'
//					+ ' 						<col style="width:3%">'
//					+ ' 						<col style="width:3%">'
//					+ ' 						<col style="width:3%">'
					//+ ' 						<col style="width:3%">'
					+ ' 					</colgroup>'
					+ ' 					<tbody id="MENU-LIST-' + param.UP_MENU_ID + '">'
					+ ' 					</tbody>'
					+ ' 				</table>'
					+ '				</div>'
					+ '			</div>'
					+ '		</td>'
					+ '</tr>';
				return sample;
			},
		}, 
		popup: {
			menu_content: function(param) {
				var sample = ''
					+ '<div class="layer-cont ' + param.TYPE + '" popup-type="' + param.TYPE + '">'
					
					// Title
					+ ' 	<div class="tit-wrap">'
					+ ' 		<strong id="popup_title" class="heading6">' + param.TITLE + '</strong>'
					+ '		</div>'
					// Title
					
					+ '		<div class="system-detail-wrap">'
					
					// 왼쪽
					+ ' 		<div id="scroll_target" class="system-left" style="max-height:636px;">'
					
					+ ' 			<div class="registration-form">'
					+ ' 			<div class="registration-form-lst-wrap">'
					
					// 왼쪽 �?�
					+ ' 				<ul class="registration-form-lst">'
					
					+ ' 					<li>'
					+ ' 						<span>Upper Menu ID</span>'
					+ ' 						<div class="registration-write">'
					+ '								<span id="UP_MENU_ID"></span>'
//					+ ' 							<div class="input-group">'
//					+ ' 								<label for="UP_MENU_ID" class="sr-only">Up Menu ID</label>'
//					+ '		 							<input type="text" id="UP_MENU_ID" readonly>'
//					+ ' 							</div>'
					+ ' 						</div>'
					+ ' 					</li>'
					
					+ ' 					<li>'
					+ ' 						<span>Menu ID</span>'
					+ ' 						<div class="registration-write">'
					+ '								<span id="MENU_ID"></span>'
//					+ ' 							<div class="input-group">'
//					+ ' 								<label for="MENU_ID" class="sr-only">Menu ID</label>'
//					+ '		 							<input type="text" id="MENU_ID" readonly>'
//					+ ' 							</div>'
					+ ' 						</div>'
					+ ' 					</li>'
					
					+ ' 					<li>'
					+ ' 						<span>Level</span>'
					+ ' 						<div class="registration-write">'
					+ '								<span id="LEV"></span>'
//					+ ' 							<div class="input-group">'
//					+ ' 								<label for="LEV" class="sr-only">Order</label>'
//					+ '		 							<input type="number" id="LEV" readonly>'
//					+ ' 							</div>'
					+ ' 						</div>'
					+ ' 					</li>'
					
					
					+ ' 					<li>'
					+ ' 						<span>Menu<span class="red"> *</span></span>'
					+ ' 						<div class="registration-write">'
					+ ' 							<div class="input-group">'
					+ ' 								<label for="MENU_NM" class="sr-only">Menu name</label>'
					+ '		 							<input type="text" id="MENU_NM" validation-check="required" maxlength="20" autocomplete="off">'
					+ ' 							</div>'
					+ ' 						</div>'
					+ ' 					</li>'
					
					+ ' 					<li>'
					+ ' 						<span>Menu(Eng)<span class="red"> *</span></span>'
					+ ' 						<div class="registration-write">'
					+ ' 							<div class="input-group">'
					+ ' 								<label for="MENU_NM_ENG" class="sr-only">Menu name(Eng)</label>'
					+ '		 							<input type="text" id="MENU_NM_ENG" validation-check="required" maxlength="20" autocomplete="off">'
					+ ' 							</div>'
					+ ' 						</div>'
					+ ' 					</li>'
					
					+ ' 					<li>'
					+ ' 						<span>Order<span class="red"> *</span></span>'
					+ ' 						<div class="registration-write">'
					+ ' 							<div class="input-group">'
					+ ' 								<label for="ORD_NO" class="sr-only">Order</label>'
					+ '		 							<input type="number" id="ORD_NO" maxNumberLength="2" placeholder="You can type up to 2 number.">'
					+ ' 							</div>'
					+ ' 						</div>'
					+ ' 					</li>'
					
					
					
					+ ' 				</ul>'
					// 왼쪽 �?�
					
					// 오른쪽 �?�
					+ ' 				<ul class="registration-form-lst">'
					
					+ ' 					<li>'
					+ ' 						<span>Active</span>'
					+ ' 						<div class="registration-write registration-write-select">'
					+ ' 							<div class="input-group-wrapper">'
					+ ' 								<div class="select-box">'
					+ ' 									<label for="USE_YN"></label>'
					+ '										<select id="USE_YN" class="info-select">'
					+ ' 										<option value="Y">Active</option>'
					+ ' 										<option value="N">Unactive</option>'
					+ ' 									</select>'
					+ ' 								</div>'
					+ ' 							</div>'
					+ ' 						</div>'
					+ ' 					</li>'
					
					+ ' 					<li>'
					+ ' 						<span>URL</span>'
					+ ' 						<div class="registration-write">'
					+ ' 							<div class="input-group">'
					+ ' 								<label for="LINK_PATH" class="sr-only">Link path</label>'
					+ '		 							<input type="text" id="LINK_PATH" maxlength="50" autocomplete="off">'
					+ ' 							</div>'
					+ ' 						</div>'
					+ ' 					</li>'
					
					+ ' 					<li>'
					+ ' 						<span>Parameter</span>'
					+ ' 						<div class="registration-write">'
					+ ' 							<div class="input-group">'
					+ ' 								<label for="PARAM" class="sr-only">Link path</label>'
					+ '		 							<input type="text" id="PARAM" maxlength="50" autocomplete="off">'
					+ ' 							</div>'
					+ ' 						</div>'
					+ ' 					</li>'
					
					+ ' 					<li>'
					+ ' 						<span>Description</span>'
					+ ' 						<div class="registration-write">'
					+ ' 							<div class="input-group">'
					+ ' 								<label for="RMK" class="sr-only">Link path</label>'
					+ '		 							<textarea type="text" id="RMK" maxlength="1000" autocomplete="off" style="height:8rem;"></textarea>'
					+ ' 							</div>'
					+ ' 						</div>'
					+ ' 					</li>'
					
					
					+ ' 				</ul>'
					// 오른쪽 �?�
					
					+ ' 			</div>'
					+ ' 			</div>'
					+ ' 		</div>'
					// 왼쪽
					
					// 오른쪽
					+ ' 		<div class="system-right">'
					+ ' 			<div class="btns">'
					+ ' 				<a id="popup_register" class="btn-style btn-style1">Save</a>'
					+ ' 				<a id="popup_close" class="btn-style btn-style2">Cancel</a>'
					+ ' 			</div>'
					+ ' 		</div>'
					// 오른쪽 			
					
					
					+ '		</div>'
					// Button
					+ ' 	<a id="popup_close" href="javascript:void(0)" class="layer-close">'
					+ ' 		<span class="sr-only">close layer popup</span>'
					+ ' 		<i class="xi-close" title="Close popup"></i>'
					+ ' 	</a>'
					// Button
					+ '</div>'
				return sample;
			},
		},
	},
	/* Alarm Code */
	sys_0901: {
		main: {
			tr_alarm_row: function(param) {
				var sample = ''
					+ '<tr id="ALARM_' + param.WT_ALARM_ID + '">'
					+ '		<td>' + (param.RN || '') + '</td>'
					+ '		<td>' + param.ALARM_SUB_CD + '</td>'
					+ '		<td>' + param.ALARM_TXT + '</td>'
					+ '		<td>' + param.INS_DT + '</td>'
					+ '		<td>' + param.ALARM_ACTION_CNT + '</td>'
					+ '		<td>' + param.ALARM_PART_CNT + '</td>'
					+ '		<td>' + param.ALARM_TOOL_CNT + '</td>'
					+ '		<td>' + param.ALARM_PPE_CNT + '</td>'
					+ '		<td>'
					+ '			<span class="delete-btn">'
					+ '				<i class="xi-trash" title="Delete alarm"></i>'
					+ '			</span>'
					+ '		</td>'
					+ '</tr>';
				return sample;
			}
		},
		popup: {
			model_content: function(param) {
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
					+ ' 		<img src="' + param.IMG_PATH + '" style="width:100%;max-height:200px;object-fit:scale-down;">'
					+ ' 	</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_B">'
					+ ' 	<th scope="row">Model</th>'
					+ ' 	<td>' + param.MODEL_NM + '</td>'
					+ '</tr>'
					+ '<tr id="tr_' + param.ID + '_C">'
					+ ' 	<th scope="row">Manufacturer</th>'
//					+ ' 	<td>' + param.MANUFACTURER_NM + '</td>'
//					+ ' 	<td><img src="' + param.MANUFACTURER_LOGO_PATH + '" style="width:140px;object-fit:scale-down;"></td>'
					+ ' 	<td><img src="' + param.MANUFACTURER_LOGO_PATH + '" style="width:100%;max-height:25px;object-fit:scale-down;"></td>'
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
			alarm_content: function(param) {
				var sample = ''
					+ '<div class="layer-cont ' + param.TYPE + '" popup-type="' + param.TYPE + '">'
					+ ' 	<input id="WT_ALARM_ID" type="hidden">'
					// Title
					+ ' 	<div class="tit-wrap">'
					+ ' 		<strong id="popup_title" class="heading6">' + param.TITLE + '</strong>'
					+ '		</div>'
					// Title
					
					+ '		<div class="system-detail-wrap">'
					// 왼쪽
					+ ' 		<div id="scroll_target" class="system-left" style="max-height:636px;">'
					+ ' 			<div class="registration-form">'
					
					// �?�1
					+ ' 				<div class="registration-form-lst-wrap" style="overflow:auto;">'
					+ ' 					<ul class="registration-form-lst">'
					+ ' 						<li>'
					+ ' 							<span>Alarm Code<span class="red"> *</span></span>'
					+ ' 							<div class="registration-write btn-input-wrap">'
					+ ' 								<div class="input-group">'
					+ ' 									<label for="ALARM_SUB_CD" class="sr-only"></label>'
					+ ' 									<input type="number" id="ALARM_SUB_CD" validation-check="required" autocomplete="off" placeholder="you can type up to 6 integers." maxlength="6">'
					+ ' 								</div>'
					+ ' 								<button id="DUPLICATE_CHECK_BTN" class="input-btn btn-style1">Check</button>'
					+ ' 							</div>'
					+ ' 						</li>'
					+ ' 						<li>'
					+ ' 							<span>Alarm Text<span class="red"> *</span></span>'
					+ ' 							<div class="registration-write">'
					+ ' 								<div class="input-group">'
					+ ' 									<label for="ALARM_TXT" class="sr-only"></label>'
					+ ' 									<input type="text" id="ALARM_TXT" validation-check="required" autocomplete="off" placeholder="" >'
					+ ' 								</div>'
					+ ' 							</div>'
					+ ' 						</li>'
					+ '						</ul>'
					+ '						<ul class="registration-form-lst">'
//					+ ' 						<li>'
//					+ ' 							<span>Attachment</span>'
//					+ ' 							<div class="registration-write btn-input-wrap fake-field-file-wrap">'
//					+ ' 								<div class="input-group">'
//					+ ' 									<div class="fake-field-file"></div>'
//					+ ' 									<input type="file" name="cv-arquivo" hidden="" id="file" class="field-file" autocomplete="off">'
//					+ ' 								</div>'
//					+ ' 								<label id="" for="cv-arquivo" aria-label="Attach file" class="registration-search-btn">'
//					+ ' 									<i class="xi-paperclip"></i>'
//					+ ' 								</label>'
//					+ ' 							</div>'
//					+ ' 						</li>'
					+ '						</ul>'
					+ ' 				</div>'
					// �?�1
					
					// �?�2
					+ ' 				<div class="registration-form-lst-wrap registration-form-lst-wrap-full">'
					+ ' 					<ul class="registration-form-lst">'
					+ ' 						<li>'
					+ ' 							<span>Description</span>'
					+ ' 							<div class="registration-write">'
					+ ' 								<div class="input-group">'
					+ ' 									<label for="ALARM_DESCRPT" class="sr-only"></label>'
					+ ' 									<textarea id="ALARM_DESCRPT" maxlength="3000"></textarea>'
					+ ' 								</div>'
					+ ' 							</div>'
					+ ' 						</li>'
					+ ' 						<li>'
					+ ' 							<span>Suggestion</span>'
					+ ' 							<div class="registration-write">'
					+ ' 								<div class="input-group">'
					+ ' 									<label for="ALARM_SUGGEST" class="sr-only"></label>'
					+ ' 									<textarea id="ALARM_SUGGEST" maxlength="3000"></textarea>'
					+ ' 								</div>'
					+ ' 							</div>'
					+ ' 						</li>'
					+ ' 					</ul>'
					+ ' 				</div>'
					// �?�2
					
					// �?�3
					+ ' 				<div class="registration-form-lst-wrap">'
					
					+ ' 					<ul class="registration-form-lst">'
												// ACTION
					+ ' 						<li>'
					+ ' 							<span>Action</span>'
					+ ' 							<div id="ACTION_LIST" class="registration-write">'
					
					// 샘플
//					+ '									<div id="ACTION_ROW_" class="input-group-wrapper">'
//					+ ' 									<div class="input-group">'
//					+ ' 										<label for="" class="sr-only"></label>'
//					+ ' 										<input type="text" validation-check="required" maxlength="50" autocomplete="off">'
//					+ '										</div>'
//					+ '										<div class="add-delete-btn-wrap">'
//					+ '											<a class="delete-btn">'
//					+ '												<span class="sr-only">delete</span>'
//					+ '												<i class="xi-minus-square"></i>'
//					+ ' 										</a>'
//					+ ' 									</div>'
//					+ ' 								</div>'
					// 샘플
					
														// 추가버튼
					+ ' 								<a id="ACTION_ADD_BTN" href="javascript:void(0);" class="add-btn" title="Add action">'
					+ ' 									<span class="sr-only">add</span>'
					+ ' 									<i class="xi-plus"></i>'
					+ ' 								</a>'
														// 추가버튼
					+ ' 							</div>'
					+ ' 						</li>'
												// ACTION
					
												// PART
					+ ' 						<li>'
					+ ' 							<span>Part</span>'
					+ ' 							<div id="PART_LIST" class="registration-write">'
					
														// 추가버튼
					+ ' 								<a id="PART_ADD_BTN" href="javascript:void(0);" class="add-btn" title="Add part">'
					+ ' 									<span class="sr-only">add</span>'
					+ ' 									<i class="xi-plus"></i>'
					+ ' 								</a>'
														// 추가버튼
					+ ' 							</div>'
					+ ' 						</li>'
												// PART
					+ ' 					</ul>'
					
					
					+ ' 					<ul class="registration-form-lst">'
												// TOOL
					+ ' 						<li>'
					+ ' 							<span>Tool</span>'
					+ ' 							<div id="TOOL_LIST" class="registration-write">'
					
														// 추가버튼
					+ ' 								<a id="TOOL_ADD_BTN" href="javascript:void(0);" class="add-btn" title="Add tool">'
					+ ' 									<span class="sr-only">add</span>'
					+ ' 									<i class="xi-plus"></i>'
					+ ' 								</a>'
														// 추가버튼
					+ ' 							</div>'
					+ ' 						</li>'
												// TOOL
					
												// PPE
					+ ' 						<li>'
					+ ' 							<span>PPE</span>'
					+ ' 							<div id="PPE_LIST" class="registration-write">'
					
														// 추가버튼
					+ ' 								<a id="PPE_ADD_BTN" href="javascript:void(0);" class="add-btn" title="Add ppe">'
					+ ' 									<span class="sr-only">add</span>'
					+ ' 									<i class="xi-plus"></i>'
					+ ' 								</a>'
														// 추가버튼
					+ ' 							</div>'
					+ ' 						</li>'
												// PPE
					+ ' 					</ul>'
					
					+ ' 				</div>'
					// �?�3
					
					+ ' 			</div>'
					+ ' 		</div>'
					// 왼쪽
					
					// 오른쪽
					+ ' 		<div class="system-right">'
					+ ' 			<div class="btns">'
					+ ' 				<span id="popup_register" class="btn-style btn-style1">Save</span>'
					+ (param.TYPE === 'ALARM' ? ' 				<span id="popup_delete" class="btn-style btn-style3">Delete</span>' : '')
					+ ' 				<span id="popup_close" class="btn-style btn-style2">Cancel</span>'
					+ ' 			</div>'
					+ ' 		</div>'
					// 오른쪽 					
					
					+ '		</div>'
					// Button
					+ ' 	<a id="popup_close" href="javascript:void(0)" class="layer-close">'
					+ ' 		<span class="sr-only">close layer popup</span>'
					+ ' 		<i class="xi-close" title="Close popup"></i>'
					+ ' 	</a>'
					// Button
					+ '</div>';
				return sample;
			},
			div_alarm_detail_row: function(param) {
				var sample = ''
					+ '<div class="input-group-wrapper">'
					+ ' 	<div class="input-group">'
					+ ' 		<label for="" class="sr-only"></label>'
					+ ' 		<input id="' + param.TYPE + '_NM" type="text" validation-check="required">'
					+ '		</div>'
					+ ' 	<div class="add-delete-btn-wrap">'
					+ ' 		<a href="javascript:void(0);" class="delete-btn" title="Delete ' + param.TYPE.toLowerCase() + '">'
					+ ' 			<span class="sr-only">delete</span>'
					+ ' 			<i class="xi-minus-square"></i>'
					+ '			</a>'
					+ ' 	</div>'
					+ '</div>';
				return sample;
			},
		}
	},
	sys_0902: {
		main: {
			tr_alarm_row: function(param) {
				var sample = ''
					+ '<tr id="ALARM_' + param.WT_ALARM_ID + '">'
					+ '		<td>' + param.RN + '</td>'
					+ '		<td>' + param.ALARM_SUB_CD + '</td>'
					+ '		<td>' + param.ALARM_TXT + '</td>'
					+ '		<td>' + param.INS_DT + '</td>'
					+ '		<td>' + param.ALARM_ACTION_CNT + '</td>'
					+ '		<td>' + param.ALARM_PART_CNT + '</td>'
					+ '		<td>' + param.ALARM_TOOL_CNT + '</td>'
					+ '		<td>' + param.ALARM_PPE_CNT + '</td>'
					+ '</tr>';
				return sample;
			}
		},
		popup: {
			alarm_content: function(param) {
				var sample = ''
					+ '<div class="layer-cont ' + param.TYPE + '" popup-type="' + param.TYPE + '">'
					// Title
					+ ' 	<div class="tit-wrap">'
					+ ' 		<strong id="popup_title" class="heading6">' + param.TITLE + '</strong>'
					+ '		</div>'
					// Title
					
					+ '		<div id="scroll_target" class="system-detail-wrap" class="system-left" style="max-height:636px;">'
					
					+ ' 			<div class="registration-form">'
					// �?�1
					+ ' 				<div class="registration-form-lst-wrap">'
					+ ' 					<ul class="registration-form-lst">'
					+ ' 						<li>'
					+ ' 							<span>Alarm Code</span>'
					+ ' 							<div class="registration-write">'
					+ ' 								<span id="ALARM_SUB_CD"></span>'
					+ ' 							</div>'
					+ ' 						</li>'
					+ ' 						<li>'
					+ ' 							<span>Alarm Text</span>'
					+ ' 							<div class="registration-write">'
					+ ' 								<span id="ALARM_TXT"></span>'	
					+ ' 							</div>'
					+ ' 						</li>'
					+ '						</ul>'
					+ '						<ul class="registration-form-lst">'
//					+ ' 						<li>'
//					+ ' 							<span>Attachment</span>'
//					+ ' 							<div class="registration-write btn-input-wrap fake-field-file-wrap">'
//					+ ' 								<div class="input-group">'
//					+ ' 									<div class="fake-field-file"></div>'
//					+ ' 									<input type="file" name="cv-arquivo" hidden="" id="file" class="field-file" autocomplete="off">'
//					+ ' 								</div>'
//					+ ' 								<label id="" for="cv-arquivo" aria-label="Attach file" class="registration-search-btn">'
//					+ ' 									<i class="xi-paperclip"></i>'
//					+ ' 								</label>'
//					+ ' 							</div>'
//					+ ' 						</li>'
					+ '						</ul>'
					+ ' 				</div>'
					// �?�1
					
					// �?�2
					+ ' 				<div class="registration-form-lst-wrap registration-form-lst-wrap-full">'
					+ ' 					<ul class="registration-form-lst">'
					+ ' 						<li>'
					+ ' 							<span>Description</span>'
					+ ' 							<div class="registration-write change-line">'
					+ ' 								<span id="ALARM_DESCRPT"></span>' 
					+ ' 							</div>'
					+ ' 						</li>'
					+ ' 						<li>'
					+ ' 							<span>Suggestion</span>'
					+ ' 							<div class="registration-write change-line">'
					+ ' 								<span id="ALARM_SUGGEST"></span>' 
					+ ' 							</div>'
					+ ' 						</li>'
					+ ' 					</ul>'
					+ ' 				</div>'
					// �?�2
					
					// �?�3
					+ ' 				<div class="registration-form-lst-wrap">'
					
					+ ' 					<ul class="registration-form-lst">'
												// ACTION
					+ ' 						<li>'
					+ ' 							<span>Action</span>'
					+ ' 							<div id="ACTION_LIST" class="registration-write">'
					
					// <p></p>
					+ ' 							</div>'
					+ ' 						</li>'
												// ACTION
					
												// PART
					+ ' 						<li>'
					+ ' 							<span>Part</span>'
					+ ' 							<div id="PART_LIST" class="registration-write">'
					
					// <p></p>
					+ ' 							</div>'
					+ ' 						</li>'
												// PART
					+ ' 					</ul>'
					
					
					+ ' 					<ul class="registration-form-lst">'
												// TOOL
					+ ' 						<li>'
					+ ' 							<span>Tool</span>'
					+ ' 							<div id="TOOL_LIST" class="registration-write">'
					
					// <p></p>
					+ ' 							</div>'
					+ ' 						</li>'
												// TOOL
					
												// PPE
					+ ' 						<li>'
					+ ' 							<span>PPE</span>'
					+ ' 							<div id="PPE_LIST" class="registration-write">'
					
					// <p></p>
					+ ' 							</div>'
					+ ' 						</li>'
												// PPE
					+ ' 					</ul>'
					
					+ ' 				</div>'
					// �?�3
					
					+ ' 			</div>'
					
					
					 					
					
					+ '		</div>'
					// Button
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
	sys_1000: {
		main: {
			li_code_row: function(param) {
				var sample = ''
					+ '<li id="CODE-ROW-' + param.CODE + '">'
					+ ' 	<div class="registration">'
					+ ' 		<a id="FOLD-BTN-' + param.CODE + '" href="javascript:void(0);" class="fold-btn unfold" style="' + (param.hasChild ? '' : 'opacity:0;pointer-events:none;') + '">'
					+ ' 			<i class="xi-plus-circle" title="Fold"></i>'
					+ ' 			<i class="xi-minus-circle-o" title="Unfold"></i>'
					+ ' 		</a>'
					+ ' 		<span class="num">' + param.PREFIX_NM + '</span>'
					+ ' 		<span>' + param.SUFFIX_NM + '</span>'
					+ ' 		<em class="hide-arrow">'
					+ ' 			<i class="xi-long-arrow-right"></i>'
					+ ' 		</em>'
					+ ' 	</div>'
					+ ' 	<ul id="CODE-LIST-' + param.CODE + '" class="depth2">'
					+ ' 	</ul>'
					+ '</li>';
				return sample;
			},
			right_detail_form: function(param) {
				var sample = ''
					+ '<ul id="detail-panel" class="registration-form-lst right">'
					+ ' 	<li class="head-area">'
					+ ' 		<h3>' + param.UP_CODE + '</h3>'
					+ ' 		<span class="btn-wrap">'
					+ ' 			<a href="javascript:void(0);" class="add-btn" title="Add">'
					+ ' 				<i class="xi-plus"></i>'
					+ ' 			</a>'
					+ ' 			<a href="javascript:void(0);" class="modify-btn" title="Modify">'
					+ ' 				<i class="xi-eraser"></i>'
					+ ' 			</a>'
					+ ' 			<a href="javascript:void(0);" class="del-btn" title="Delete">'
					+ ' 				<i class="xi-trash"></i>'
					+ ' 			</a>'
					+ ' 		</span>'
					+ ' 	</li>'
					+ ' 	<li class="tit-area">'
					+ ' 		<span class="tit">Code</span>'
					+ ' 		<strong class="tit-sub">'
					+ ' 			<em class="num prefix">' + param.PREFIX_NM + '</em>'
					+ ' 			<span class="code-name suffix">' + param.SUFFIX_NM + '</span>'
					+ ' 		</strong>'
					+ ' 	</li>'
					+ ' 	<li class="sub-area">'
					+ ' 		<span class="tit">Description</span>'
					+ ' 		<span class="cont description">'
					+ ' 		</span>'
					+ ' 	</li>'
					+ '</ul>'
				return sample;
			},
			right_modify_form: function(param) {
				var sample = ''
					+ '<ul id="update-panel" class="registration-form-lst right">'
					+ ' 	<li class="head-area">'
					+ ' 		<h3>' + param.UP_CODE + '</h3>'
					+ ' 		<span class="btn-wrap">'
					+ ' 			<a href="javascript:void(0);" class="add-btn" title="Add">'
					+ ' 				<i class="xi-plus"></i>'
					+ ' 			</a>'
					+ ' 			<a href="javascript:void(0);" class="modify-btn" title="Modify">'
					+ ' 				<i class="xi-eraser"></i>'
					+ ' 			</a>'
					+ ' 			<a href="javascript:void(0);" class="del-btn" title="Delete">'
					+ ' 				<i class="xi-trash"></i>'
					+ ' 			</a>'
					+ ' 		</span>'
					+ ' 	</li>'
					+ ' 	<li class="tit-area">'
					+ ' 		<span class="tit">Code</span>'
					+ ' 		<strong class="tit-sub">'
					+ ' 			<em class="num prefix">' + param.PREFIX_NM + '</em>'
					+ ' 			<span class="code-name suffix">' + param.SUFFIX_NM + '</span>'
					+ ' 		</strong>'
					+ ' 	</li>'
					+ ' 	<li class="sub-area">'
					+ ' 		<span class="tit">Description</span>'
					+ ' 		<span class="cont description">'
					+ ' 		</span>'
					+ ' 	</li>'
					+ '</ul>'
				return sample;
			},
		},
		popup: {
			
		},
	},
	sys_1100: {
		main: {
			li_code_row: function(param) {
				var sample = ''
					+ '<li id="CODE-ROW-' + param.COMM_CD + '">'
					+ ' 	<div class="registration">'
					+ ' 		<a id="FOLD-BTN-' + param.COMM_CD + '" href="javascript:void(0);" class="fold-btn unfold" style="' + (param.hasChild ? '' : 'opacity:0;pointer-events:none;') + '">'
					+ ' 			<i class="xi-plus-circle" title="Fold"></i>'
					+ ' 			<i class="xi-minus-circle-o" title="Unfold"></i>'
					+ ' 		</a>'
					+ ' 		<span>' + param.COMM_NM + '</span>'
					+ ' 		<em class="hide-arrow">'
					+ ' 			<i class="xi-long-arrow-right"></i>'
					+ ' 		</em>'
					+ ' 	</div>'
					+ ' 	<ul id="CODE-LIST-' + param.COMM_CD + '" class="depth2">'
					+ ' 	</ul>'
					+ '</li>';
				return sample;
			},
		},
		popup: {
			
		},
	},
};