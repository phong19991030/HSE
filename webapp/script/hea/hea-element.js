const elements = {
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

					sample = sample 
					+ '    </div>'
					+ '</div>';	
				return sample;
			},
			emp_popup: function(param) {
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
			tr_emp_row: function(param) {
				var sample = ''
					+ '<tr id="tr_' + param.EMP_NO + '">'
					+ '		<td>'
					+ '			<div class="checkbox-radio-custom">'
					+ '				<input type="radio" id="radio_' + param.EMP_NO +  '" name="raido">'
					+ '				<label for="radio_' + param.EMP_NO +  '" class="sr-only"></label>'
					+ '			</div>'
					+ '		</td>'
					+ '		<td>' + param.EMP_NAME + '</td>'
					+ '		<td>' + param.DUTY_CD + '</td>'
					+ '		<td>' + param.AREA_CD + '</td>'
					+ '</tr>';
				return sample;
			},
			
			diseases_form: function(param) {
				var sample = ''
					+ '<div class="layer-cont ' + param.TYPE + '" popup-type="' + param.TYPE + '">'
					// Title
					+ ' 	<div class="tit-wrap">'
					+ ' 		<strong id="popup_title" class="heading6">' + param.TITLE + '</strong>'
					+ '		</div>'
					// Title
					
					// Table
					+ '<div class="registration-form registration-form1">'
					+ '		<div class="base_grid_table">'
					+ '			<table>'
					+ '				<caption>Eye sight - Left eye, Right eye</caption>'
					+ '				<colgroup>'
					+ '					<col style="width:20%">'
					+ '					<col style="width:80%">'
					+ '				</colgroup>'
					+ '				<tbody>'
					+ '					<tr>'
					+ '						<th scope="row"><spring:message code="health.health_0200.label.diseases"/></th>'
					+ '						<td class="txt-left">'
					+ '							<div class="registration-write" style="width:100%">'
					+ '								<div class="input-group" style="width:100%">'
					+ '									<label for="DISEASE" class="sr-only"><spring:message code="health.health_0200.label.diseases"/></label>'
					+ '									<input type="text" id="DISEASE" name="DISEASE" placeholder="" autocomplete="off"/>'
					+ '								</div>'
					+ '							</div>'
					+ '						</td>'
					+ '					</tr>'
					+ '					<tr>'
					+ '						<th scope="row"><spring:message code="health.health_0200.label.startDate"/></th>'
					+ '						<td class="txt-left">'
					+ '							<div class="registration-write" style="width:100%">'
					+ '								<div class="input-group" style="width:100%">'
					+ '									<label for="DISEASE_START_DATE" class="sr-only"><spring:message code="health.health_0200.label.startDate"/></label>'
					+ '									<input type="date" id="DISEASE_START_DATE" name="DISEASES_START_DATE" placeholder="" autocomplete="off"/>'
					+ '								</div>'
					+ '							</div>'
					+ '						</td>'
					+ '					</tr>'
					+ '					<tr>'
					+ '						<th scope="row"><spring:message code="health.health_0200.label.endDate"/></th>'
					+ '						<td class="txt-left">'
					+ '							<div class="registration-write" style="width:100%">'
					+ '								<div class="input-group" style="width:100%">'
					+ '									<label for="DISEASE_END_DATE" class="sr-only"><spring:message code="health.health_0200.label.endDate"/></label>'
					+ '									<input type="date" id="DISEASE_END_DATE" name="DISEASES_END_DATE" placeholder="" autocomplete="off"/>'
					+ '								</div>'
					+ '							</div>'
					+ '						</td>'
					+ '					</tr>'
					+ '					<tr>'
					+ '						<th scope="row"><spring:message code="health.health_0200.label.note"/></th>'
					+ '						<td class="txt-left">'
					+ '							<div class="registration-write" style="width:100%">'
					+ '								<div class="input-group" style="width:100%">'
					+ '									<label for="DISEASE_NOTE" class="sr-only"><spring:message code="health.health_0200.label.note"/></label>'
					+ '									<textarea id="DISEASE_NOTE" name="DISEASES_NOTE" autocomplete="off" row="4"></textarea>'
					+ '								</div>'
					+ '							</div>'
					+ '						</td>'
					+ '					</tr>'
					+ '				</tbody>'
					+ '			</table>'
					+ '		</div>'
					+ ' </div>'
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
		}	
	};