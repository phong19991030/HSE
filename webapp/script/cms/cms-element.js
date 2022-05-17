
var _cms_elements = {
	dashboard: {
		map: {
			farm_popup: function(param) {
				
				//*참고사항 클릭시 마커 정보 나오는 효과
//				$('#infowindow-pop').click(function(){
//					$(this).toggleClass('popup-farm-detail-active'); 
//			  	});
				
				// *참고사항 - cms - map - popup 심각일 경우  .problem
				
				var cls = param.error_cnt > 0 ? ' problem' : '';
				
				var sample = 
//					'<div id="'+ param.id +'-farm" class="popup-farm' + cls + '">'
					'<div id="'+ param.id +'-farm" class="popup-farm">'
					+ '	<div class="info">'
					+ '		<span>' 								
					+ '			<em class="name">'+ param.name +'</em>'			
					+ '			<strong class="num">'+ param.cnt +'</strong>'	
					+ '		</span>'								
					+ '	</div>'
					+ '	<div class="popup-farm-detail">'
					+ '		<ul>'
					+ '			<li>'
					+ '				<strong class="tit">Error</strong>'
					+ '				<strong class="detail-num">'
					+ '					<span id="'+ param.id +'-farm-error" class="point point-txt">0</span>'
					+ '					<em>/</em>'
					+ '					<span>' + param.cnt + '</span>'
					+ '				</strong>'
					+ '			</li>'
					+ '			<li>'
					+ '				<strong class="tit">Alarm</strong>'
					+ '				<strong class="detail-num">'
					+ '					<span id="'+ param.id +'-farm-alarm" class="point">0</span>'
					+ '					<em>/</em>'
					+ '					<span>' + param.cnt + '</span>'
					+ '				</strong>'
					+ '			</li>'
					+ '		</ul>'
					+ '	</div>'
					+ '	<div class="action">'
					+ '		<span></span>'
					+ '		<span></span>'
					+ ' </div>'
					+ ' <div class="bg"></div>'
					+ '</div>';
				return sample;
			},
		},
		info: {
			alarm: function(param) {
				
				var tooltip = ['Error occurred', 'Planning', 'Under repair', 'Repair completed', ''][param.status - 1]; 
				var icon = ['xi-error', 'xi-library-books', 'xi-wrench', 'xi-check-circle', 'xi-error'][param.status - 1]; 
				var cls = ['process-mark1', 'process-mark2', 'process-mark3', 'process-mark4', 'process-mark5'][param.status - 1];
				
				
				param.desc = param.desc.length > 115 ? param.desc.substring(0, 115) + '...' : param.desc;
				var sample = 
					'<tr id="' + param.id + '">'
					+ '	<td>' + param.num + '</td>'
					+ '	<td>' + param.datetime + '</td>'
					+ '	<td>' + param.postion + '</td>'
					+ '	<td><strong class="point-num">' + param.code + '</strong></td>'
					+ '	<td>'
					+ ' 	<span class="process-mark ' + cls + '">'
					+ ' 		<i class="' + icon + '" title="' + tooltip + '"></i>'
					+ ' 		<span class="sr-only">' + tooltip + '</span>'
					+ ' 	</span>'
					+ ' </td>'
					+ '	<td>' + param.txt + '</td>'
					+ '	<td>' + param.desc + '</td>'
					+ '</tr>';
				return sample;
			},
			alarm_m: function(param) {
				
				var tooltip = ['Error occurred', 'Planning', 'Under repair', 'Repair completed', ''][param.status - 1]; 
				var icon = ['xi-error', 'xi-library-books', 'xi-wrench', 'xi-check-circle', 'xi-error'][param.status - 1]; 
				var cls = ['process-mark1', 'process-mark2', 'process-mark3', 'process-mark4', 'process-mark5'][param.status - 1];
				
				
				param.desc = param.desc.length > 115 ? param.desc.substring(0, 115) + '...' : param.desc;
				var sample = 
					'<tr id="' + param.id + '">'
					+ '	<td>' + param.num + '</td>'
					+ '	<td>' + param.datetime + '</td>'
					+ '	<td>' + param.postion + '</td>'
					+ '	<td><strong class="point-num">' + param.code + '</strong></td>'
					+ '	<td>'
					+ ' 	<span class="process-mark ' + cls + '">'
					+ ' 		<i class="' + icon + '" title="' + tooltip + '"></i>'
					+ ' 		<span class="sr-only">' + tooltip + '</span>'
					+ ' 	</span>'
					+ ' </td>'
					+ '	<td>' + param.txt + '</td>'
					+ '</tr>';
				return sample;
			},
			noData: function() {
				var sample = '<tr><td colspan="7"><div class="msg_empty" style="height:9rem">No Data</div></td></tr>'
				return sample;
			},
			sensor: function(param) {
				
				var i = 0;
				if(param.keyword.includes('LOAD')) i=0;
				if(param.keyword.includes('VIBRATION')) i=1;
				if(param.keyword.includes('POWER')) i=2;
				if(param.keyword.includes('RPM') || param.keyword.includes('DIRECTION')) i=3;
				if(param.keyword.includes('WIND') || param.keyword.includes('TEMP')) i=4;
				var cls = ['blade1', 'blade2', 'blade3', 'blade4', 'blade5'][i];
				
				var occur_point_name = param.keyword.split('-')[0];
				
				param.unit = param.unit.toLowerCase() === 'meterpersecondsquared' ? 'm/s^2' : param.unit;
				
				var sample = 
					'<div class="gauge-wrap">'
					+ '	<a id="' + param.id + '" href="javascript:void(0);" style="cursor:default;">'
					+ '		<span class="tit">'
					+ '			<strong class="blade blade3">' + param.turbine_nm + '</strong>'
					+ '			<span>' + param.date + '</span>'
					+ '		</span>'
//					+ '		<span class="gauge-cont" data-percentage="20" data-value="' + param.value + '">'
//					+ '			<span class="gauge">'
//					+ '				<span class="gauge-value">'
//					+ '					<span>' + param.min + '</span>'
//					+ '					<span>' + param.max + '</span>'
//					+ '				</span>'
//					+ '				<span class="inner"></span>'
//					+ '			</span>'
					+ '		<span class="gauge-cont" data-percentage="20">'
					+ '			<span class="gauge-value">'
					+ '				<span>' + param.min + '</span>'
					+ '				<span>' + param.max + '</span>'
					+ '			</span>'
					+ '			<span class="gauge">'
					+ '				<span class="inner"></span>'
					+ '			</span>'
					+ '			<span class="pointer"><strong class="gauge-num problem-num"></strong></span>'
					+ '			<span class="pointer-knob"></span>'
					+ '		</span>'
					+ '		<span class="output-num">' + param.value + ' [' + param.unit + ']' + '</span>'
					+ '		<span class="blade-name">'
					+ '			<strong class="blade ' + cls + '"><span>' + occur_point_name + '</span><span>' + param.sensor_nm + '</span></strong>'
					+ '		</span>'
					+ '	</a>'
					+ '</div>';
				return sample;
			},
			stock: function(param) {
				var positions = param.position.split(' > ');
				if(param.position.length > 24) {
					positions[0] = positions[0].length > 7 ? positions[0].substring(0,7) + ' ...' : positions[0];
					positions[1] = positions[1].length > 7 ? positions[1].substring(0,7) + ' ...' : positions[1];
					param.position = positions[0] + ' > ' + positions[1] + ' > ' + positions[2]; 
				}
				param.category = param.category ? param.category : ''; 
				param.category = param.category.length > 15 ? param.category.substring(0,14) + ' ...' : param.category;
				param.name = param.name.length > 15 ? param.name.substring(0,14) + ' ...' : param.name;
				var sample = 
					'<tr id="' + param.id + '">'
					+ '	<td>' + param.num + '</td>'
					+ '	<td>' + param.position + '</td>'
					+ '	<td>' + param.category + '</td>'
					+ '	<td>' + param.name + '</td>'
					+ '	<td><strong class="point2">' + param.stock_qty + '</strong></td>'
					+ '	<td>' + param.require_qty + '</td>'
					+ '</tr>';
				return sample;
			},
			schedule: function(param) {
				/* work */
//				var work_nm = JSON.parse(param.work.name);
//				var work_detail = JSON.parse(param.work.detail);
//				var work_worker = JSON.parse(param.work.worker);
//				var work_from = JSON.parse(param.work.from);
//				var work_to = JSON.parse(param.work.to);
//				var work_cost = JSON.parse(param.work.cost);
				
				var work_nm = param.work.name ? param.work.name.split(' | ') : [];
				var work_detail = param.work.detail ? param.work.detail.split(' | ') : [];
				var work_worker = param.work.worker ? param.work.worker.split(' | ') : [];
				var work_from = param.work.from ? param.work.from.split(' | ') : [];
				var work_to = param.work.to ? param.work.to.split(' | ') : [];
				var work_cost = param.work.cost ? param.work.cost.split(' | ') : [];
				
				var work_sample = '';
				var work_detail_sample = '';
				for(var i=0; i<work_nm.length; i++) {
					
					var workers = work_worker[i] ? work_worker[i].split(' || ') : [];
					var others = workers.length > 1 ? ' and ' + (workers.length - 1) + ' others' : '';
					
					work_sample = work_sample
						+ '<span>'
						+ '		<span class="name">' + unescape(work_nm[i]) + '</span>'
						+ '		<span class="participant">' + unescape(workers[0]) + others + '</span>'
						+ '</span>';
					
					// 공백 1줄 추가
					if(i>=1) work_detail_sample = work_detail_sample + '<span><span class="name"></span><span class="detail"></span></span>';
					
					work_detail_sample = work_detail_sample
						+ '<span>'
						+ '		<span class="name">Details</span>'
						+ '		<span class="detail">' + unescape(work_detail[i]) + '</span>'
						+ '</span>'
						+ '<span>'
						+ '		<span class="name">Period</span>'
						+ '		<span class="detail">' 
						+ moment.tz(work_from[i], _timezone).format('YYYY-MM-DD HH:mm') + ' ~ ' + moment.tz(work_to[i], _timezone).format('YYYY-MM-DD HH:mm') 
						+ '		</span>'
						+ '</span>'
						+ '<span>'
						+ '		<span class="name">Worker</span>'
						+ '		<span class="detail">';
						for(var j=0; j<workers.length; j++) {
							work_detail_sample = work_detail_sample + '<em style="display:block;">' + unescape(workers[j]) + '</em>';
						}
					work_detail_sample = work_detail_sample
						+ '		</span>'
						+ '</span>';
					
					work_detail_sample = work_detail_sample
						+ '<span>'
						+ '		<span class="name">Cost</span>'
						+ '		<span class="detail"><em>' + work_cost[i] + ' WON</em></span>'
						+ '</span>';
				}
				
				/* part start */
				var part_sample = 
						'<span class="parts-lst">'
						+ ' 	<strong class="schedules-tit">Parts</strong>'
						+ ' 	<span class="d-day-lst">';
				
				var part_detail_sample = 
						'<span class="parts-lst detail-lst work-detail-lst">'
						+ ' 	<strong class="schedules-tit">Delivery Detail</strong>'
						+ ' 	<span class="d-day-lst">';
				
				/* part	*/
//				var part_nm = JSON.parse(param.part.name);
//				var part_from = JSON.parse(param.part.from);
//				var part_to = JSON.parse(param.part.to);
				var part_nm = param.part.name ? param.part.name.split(' | ') : [];
				var part_from = param.part.from ? param.part.from.split(' | ') : [];
				var part_to = param.part.to ? param.part.to.split(' | ') : [];
				for(var i=0; i<part_nm.length; i++) {
					var from = moment.tz(part_from[i], _timezone);
					var now = moment.tz(_timezone);
					var to = moment.tz(part_to[i], _timezone);
					var percent = parseInt((now.valueOf() - from.valueOf()) / (to.valueOf() - from.valueOf()) * 100);
					percent = percent > 100 ? 100 : percent;
					var d_day = to.diff(now, 'days', false);
					//d_day = d_day === 0 ? to.diff(now, 'hours', false) + 'hours' : d_day + 'days';
					d_day = d_day > 0 ?  d_day + 'days' : (to.diff(now, 'hours', false) > 0 ? to.diff(now, 'hours', false) + 'hours' : 'Ready');
					
					part_sample = part_sample 
						+ '<span>'
						+ '		<span class="name">' + part_nm[i] + '</span>'
						+ '		<span class="d-day-gauge">'
						+ '			<em style="width:' + percent + '%"></em>'
						+ '		</span>'
						+ '		<span class="d-day-num">' + d_day + '</span>'
						+ '</span>';
					
					part_detail_sample = part_detail_sample
						+ '<span>'
						+ '		<span class="name">' + part_nm[i] + '</span>'
						//+ '		<span class="detail">' + from.format('YYYY-MM-DD') + '~' + to.format('YYYY-MM-DD') + '</span>'
						+ '		<span class="detail">' 
						+ '			<em style="display:block;">' + from.format('YYYY-MM-DD HH:mm:ss') + ' ~ </em>'
						+ '			<em style="display:block;">' + to.format('YYYY-MM-DD HH:mm:ss') + '</em>'
						+ '		</span>'
						+ '</span>';
				}
				
				/* part end */
				part_sample = part_sample + '</span></span>'; 
				part_detail_sample = part_detail_sample + '</span></span>'; 
						
				
				/* tool & ppe start */
				var tool_ppe_sample = 
						'<span class="tool-lst">'
						+ ' 	<strong class="schedules-tit">Tools&amp;PPE</strong>'
						+ ' 	<span class="d-day-lst">';
				
				var tool_ppe_detail_sample = 
						'<span class="detail-lst work-detail-lst">'
						+ ' 	<strong class="schedules-tit">Delivery Detail</strong>'
						+ ' 	<span class="d-day-lst">';
				
				/* tool */
//				var tool_nm = JSON.parse(param.tool.name);
//				var tool_from = JSON.parse(param.tool.from);
//				var tool_to = JSON.parse(param.tool.to);
				var tool_nm = param.tool.name ? param.tool.name.split(' | ') : [];
				var tool_from = param.tool.from ? param.tool.from.split(' | ') : [];
				var tool_to = param.tool.to ? param.tool.to.split(' | ') : [];
				for(var i=0; i<tool_nm.length; i++) {
					
					var from = moment.tz(tool_from[i], _timezone);
					var now = moment.tz(_timezone);
					var to = moment.tz(tool_to[i], _timezone);
					var percent = parseInt((now.valueOf() - from.valueOf()) / (to.valueOf() - from.valueOf()) * 100);
					percent = percent > 100 ? 100 : percent;
					var d_day = to.diff(now, 'days', false);
					//d_day = d_day === 0 ? to.diff(now, 'hours', false) + 'hours' : d_day + 'days';
					d_day = d_day > 0 ?  d_day + 'days' : (to.diff(now, 'hours', false) > 0 ? to.diff(now, 'hours', false) + 'hours' : 'Ready');
					
					tool_ppe_sample = tool_ppe_sample 
						+ '<span>'
						+ '		<span class="name">' + tool_nm[i] + '</span>'
						+ '		<span class="d-day-gauge">'
						+ '			<em style="width:' + percent + '%"></em>'
						+ '		</span>'
						+ '		<span class="d-day-num">' + d_day + '</span>'
						+ '</span>';
					
					tool_ppe_detail_sample = tool_ppe_detail_sample
						+ '<span>'
						+ '		<span class="name">' + tool_nm[i] + '</span>'
						//+ '		<span class="detail">' + from.format('YYYY-MM-DD') + '~' + to.format('YYYY-MM-DD') + '</span>'
						+ '		<span class="detail">' 
						+ '			<em style="display:block;">' + from.format('YYYY-MM-DD HH:mm:ss') + ' ~ </em>'
						+ '			<em style="display:block;">' + to.format('YYYY-MM-DD HH:mm:ss') + '</em>'
						+ '		</span>'
						+ '</span>';
				}
				
				/* ppe */
//				var ppe_nm = JSON.parse(param.ppe.name);
//				var ppe_from = JSON.parse(param.ppe.from);
//				var ppe_to = JSON.parse(param.ppe.to);
				var ppe_nm = param.ppe.name ? param.ppe.name.split(' | ') : [];
				var ppe_from = param.ppe.from ? param.ppe.from.split(' | ') : [];
				var ppe_to = param.ppe.to ? param.ppe.to.split(' | ') : [];
				for(var i=0; i<ppe_nm.length; i++) {
					
					var from = moment.tz(ppe_from[i], _timezone);
					var now = moment.tz(_timezone);
					var to = moment.tz(ppe_to[i], _timezone);
					var percent = parseInt((now.valueOf() - from.valueOf()) / (to.valueOf() - from.valueOf()) * 100);
					percent = percent > 100 ? 100 : percent; 
					var d_day = to.diff(now, 'days', false);
					//d_day = d_day === 0 ? to.diff(now, 'hours', false) + 'hours' : d_day + 'days';
					d_day = d_day > 0 ?  d_day + 'days' : (to.diff(now, 'hours', false) > 0 ? to.diff(now, 'hours', false) + 'hours' : 'Ready');
					
					tool_ppe_sample = tool_ppe_sample 
						+ '<span>'
						+ '		<span class="name">' + ppe_nm[i] + '</span>'
						+ '		<span class="d-day-gauge">'
						+ '			<em style="width:' + percent + '%"></em>'
						+ '		</span>'
						+ '		<span class="d-day-num">' + d_day + '</span>'
						+ '</span>';
					
					tool_ppe_detail_sample = tool_ppe_detail_sample
						+ '<span>'
						+ '		<span class="name">' + ppe_nm[i] + '</span>'
						//+ '		<span class="detail">' + from.format('YYYY-MM-DD') + '~' + to.format('YYYY-MM-DD') + '</span>'
						+ '		<span class="detail">' 
						+ '			<em style="display:block;">' + from.format('YYYY-MM-DD HH:mm:ss') + ' ~ </em>'
						+ '			<em style="display:block;">' + to.format('YYYY-MM-DD HH:mm:ss') + '</em>'
						+ '		</span>'
						+ '</span>';
				}
				
				/* part end */
				tool_ppe_sample = tool_ppe_sample + '</span></span>'; 
				tool_ppe_detail_sample = tool_ppe_detail_sample + '</span></span>'; 
				
				// 전체
				var sample = 
					'<div class="schedules-wrap">'
					+ '	<a id="' + param.id + '" href="#">'
					+ '		<span class="tit">'
					+ '			<strong>' + param.turbine_nm + '</strong>'
					+ '		</span>'
					+ '		<span class="schedules-lst">'
					
//					+ '			<span class="tool-lst">'
//					+ '				<strong class="schedules-tit">Part &amp; Tool &amp; PPE</strong>'
//					+ '				<span class="d-day-lst">'
					+ part_sample
//					+ '				</span>'
//					+ '			</span>'
					
//					+ '			<span class="detail-lst delivery-detail-lst">'
//					+ '				<strong class="schedules-tit">Delivery-detail</strong>'
//					+ '				<span class="d-day-lst">'
					+ part_detail_sample
//					+ '				</span>'
//					+ '			</span>'
					
					+ tool_ppe_sample
					+ tool_ppe_detail_sample
					
					+ '			<span class="work-lst">'
					+ '				<strong class="schedules-tit">Work</strong>'
					+ '				<span class="d-day-lst">'
					+ work_sample
					+ '				</span>'
					+ '			</span>'
					
					+ '			<span class="work-lst detail-lst work-detail-lst">'
					+ '				<strong class="schedules-tit">Work Detail</strong>'
					+ '				<span class="d-day-lst">'
					+ work_detail_sample
					+ '				</span>'
					+ '			</span>'
					+ '		</span>'
					+ '	</a>'
					+ '</div>';
				return sample;
			}
		}
	},
	cms_0100: {
		map: {
			farm_popup: function(param) {
				var sample = 
					'<div id="'+ param.id +'-farm" class="popup-farm">'
					+ '	<div>'
					+ '		<span>' 								
					+ '			<em class="name">'+ param.name +'</em>'			
					+ '			<strong class="num">'+ param.cnt +'</strong>'	
					+ '		</span>'								
					+ '	</div>'
					+ '</div>';
				return sample;
			},
			group_popup: function(param) {
				var sample = 
					'<div id="' + param.id + '-group" class="popup-group' + param.style + '" farm_id="'+param.farm_id+'">'
					+ '	<div>'
					+ '		<div class="wt-infowindow">'
					+ '			<em class="name">' + param.name +'</em>'
					+ '			<span class="stick-graph">'
					+ '				<em>State</em>'
					+ '				<span id="' + param.id + '-group-error" class="bar-wrap">'
					+ '					<span class="bar-fill" style="width:80%;"></span>'
					+ '				</span>'
					+ '			</span>'
					+ '			<ul class="state-lst">'
					+ '				<li>'
					+ '					<strong>' + param.capacity + '</strong>'
					+ '					<span>MW</span>'
					+ '				</li>'
					+ '				<li>'
					+ '					<strong>' + param.cnt + '</strong>'
					+ '					<span>Unit</span>'
					+ '				</li>'
					+ '			</ul>'
					+ '		</div>'
//					+ '		<div class="wt-icon-wrap">'
//					+ '			<span></span>'
//					+ '		</div>'
					+	'</div>'
					+ '</div>';
				return sample;
			},
			turbine_infowindow: function(param) {
				var sample = 
					'<div id="'+ param.id +'-infowindow" class="infowindow-turbine" onclick="clickTarget(\''+param.farm_id+'\', \''+param.group_id+'\', \''+param.id+'\')">'
					+ ' <div>'
					+ ' 	<div class="wt-infowindow">'
					+ '			<em class="name">' + param.name + '</em>'
					+ ' 		<span class="stick-graph">'
					+ ' 			<em>State</em>'
					+ ' 			<span id="'+ param.id +'-turbine-error" class="bar-wrap">'
					+ ' 				<span class="bar-fill" style="width:80%;"></span>'
					+ ' 			</span>'
					+ ' 		</span>'	
					+ ' 		<ul class="state-lst">'
					+ ' 			<li>'
					+ ' 				<strong>' + param.power + '</strong>'
					+ '					<span>MW</span>'	
					+ ' 			</li>'	
					+ ' 		</ul>'
					+ ' 	</div>'
					+ ' </div>'
					+ ' </div>';
				return sample;
			},
			
		},
		detail_info: {
			logo_img: function(param) {
				var sample = '<img alt="" src="' + param.ctx + '/util/upload/imageView/' + param.path + '" style="width: 32%; display:inline-block; margin-right: 2%;">';
				return sample;
			},
			loading: function() {
				var sample = 
					'<div class="no_data">'
					+ '		<i class="fi fi-spinner fi-pulse"></i>'
					+ ' 	<div class="no_data_text">Loding...</div>'
					+ ' </div>';
				return sample;
			},
			no_chart: function() {
				var sample = 
					'<div class="no_data">'
					+ '		<div class="no_data_img"></div>'
					+ ' 	<div class="no_data_text"> No Data </div>'
					+ ' </div>';
				return sample;
			},
		},
		
	},
	cms_0200: {
		main: {
			tr_alarm_row: function(param) {
				
				var icon = ['xi-error', 'xi-library-books', 'xi-wrench', 'xi-check-circle', 'xi-error'][param.status - 1]; 
				var cls = ['process-mark1', 'process-mark2', 'process-mark3', 'process-mark4', 'process-mark5'][param.status - 1];
				
				var sample = 
					'<tr>'
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
	cms_0300: {
		main: {
			div_component_class_table: function(param) {
				var id = param.id;
				var name = param.name;
				
				var sample =  
					'<div class="sensor-table-wrap sensor-table-wrap-m" style="width: 500px;">'
					+ '	<div class="sensor-table sensor-table-default">' 												
					+ '		<a href="#none" class="sensor-data-btn sensor-data-btn-modify">' 								
					+ '			<i class="xi-pen"></i>'
					+ '			<span class="sr-only">modify</span>'
					+ '		</a>'
					+ '		<a href="#none" class="sensor-data-btn sensor-data-btn-complete">'
					+ '			<i class="xi-check"></i>'
					+ '			<span class="sr-only">complete</span>'
					+ '		</a>'
					+ '		<div class="base_grid_table">'
					+ '			<table>'
//					+ '				<caption>Sensor Data - ' + name + '</caption>'		// check
					+ '				<colgroup>'
					+ '					<col style="width:50%">'
					+ '					<col style="width:50%">'
					+ ' 			</colgroup>'
					+ '				<thead>'
					+ '					<tr>'
					+ '						<th scope="col" colspan="2">' + name + '</th>'
					+ '					</tr>'
					+ '				</thead>'
					+ '				<tbody id="' + id + '">'
					+ '				</tbody>'
					+ '			</table>'
					+ '		</div>' 
					+ '		<em class="unit" id="' + id + 'Unit"></em>'	// check
					+ '	</div>'
					+ '	</div>';
				return sample;
			}, 
			div_sensor_row: function(param) {
				var id = param.id;
				var name = param.name;
				
				var sample =  
					'<tr id="' + id + '">'
					+ '	<td><a href="#none">' + name + '</a></td>' 												
					+ ' <td>' 								
					+ '		<a href="#none">'
					+ '			<span id="' + id + 'Row" class="sensor-data-result"><span id="' + id + 'Value"> </span><span id="' + id + 'Unit"></span></span>'
					+ '			<span class="input-wrapper">'
					+ '				<span class="input-group">'
					+ '					<label for="' + id + 'Min" class="sr-only"></label>'
					+ '					<input type="text" id="' + id + 'Min" name="' + id + '" placeholder="min">'
					+ '				</span>'
					+ '				<span class="input-group">'
					+ '					<label for="' + id + 'Max" class="sr-only"></label>'
					+ '					<input type="text" id="' + id + 'Max" name="' + id + '" placeholder="max">'
					+ '				</span>'
					+ '			</span>'
					+ '		</a>'
					+ '	</td>'
					+ '</tr>';
				return sample;
			},
		},
		popup: {
			li_component_class : function(param){
				var sample = 
						'<li>'
						+ '		<a href="#" id="' + param.id + '-Compare" turbine_id="' + param.turbine_id + '" component_class_id="' + param.id + '">'
						+ ' 		<span>' + param.name + '<span>'
						+ ' 	</a>'
						+ '</li>';
				return sample;
			},
			li_sensor : function(param){
				
				/*
				 * 			input의 id와 label에 for 값을 맞춰야 css 작동 
				 */
				var sample = 
						'<li>'
						+ '		<input type="radio" class="radio" id="radio-' + param.id + '" name="sensorSelect" keyword="' + param.keyword + '">'
						+ ' 	<label for="radio-' + param.id + '" sensor-name="' + param.name + '">' + param.name + '</label>'
						+ '</li>';
				return sample;
			},
			li_turbine_model: function(param) {
//				"${ctxPath}/util/upload/imageView/#=NEW_FLE_NM#"
				var sample = 
					'<li id="model-' + param.id + '" class="target" sortation="' + param.sortation + '" turbine_id="' + param.id + '" group_id="' + param.group_id + '" model_nm="' + param.model + '">'
					+ '		<img src="' + ctx + '/util/upload/imageView/' + param.logo + '" alt="" class="logo">'
					+ ' 	<span class="wtg-company-info">'
					+ '			<span>Manufacture / Model</span>'
					+ '			<em>' + param.manufacture + ' / ' + param.model + '</em>'
					+ '		</span>'
					if(param.sortation == 'compare_target') {
						sample = sample 
						+ ' 	<div class="btns">'
						+ ' 		<a class="btn-style btn-style4" id="change-' + param.id + '" >'
						+ ' 			 <i class="xi-exchange"></i>'
						+ ' 		</a>'
						+ ' 		<a class="btn-style btn-style4" id="delete-' + param.id + '">'
						+ ' 			 <i class="xi-close"></i>'
						+ ' 		</a>'
						+ ' 	</div>'	
					}
					+ '</li>';
				return sample;
			},
			
			/* Compare Model Selector option */
			option_selector_option: function(param) {
				var sample = '<option value="' + param.id + '">' + param.name + '</option>	';
				return sample;
			},
			li_chart_legend: function(param) {
				var sample = 
					'<li id="legend-' + param.id + '" chart_id="container2" series_id="' + param.id + '">'
					+ ' <em style="background:' + param.color + ' !important; width:9px !important; height:9px !important; border-style: solid; border-color: ' + param.color + '; border-width: 2px;"></em>'
					+ ' <span>' + param.name + '</span>'
					+ '</li>'
				return sample;	
			},
		}
		
	}
};