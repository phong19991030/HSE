/**### 전체적으로 console.log 는 ie 10이하 에서는 error 로 반응  그러니까 주석 처리 */ 
	
	(function($) {
	
		$.fn.setGridEvent = function(){
			
			$(this).on('focus','div:not(".frozen") > table[id^="table_"] td input, div:not(".frozen") > table[id^="table_"] td textarea', function() {  
				// onSelect Trigger Event가 동작하지 않아
				// 만듬(Bug fix 되면
				// 트리거  
				// 이벤트로 원복 예정)
				$(this).parents('table').jqGrid().setSelection($(this).parent('td').parent('tr').prop('id'));
			});
	
			// 그리드 내부 필드 수정시 변경 (input, select, textarea)
			$(this).on('change', 'div:not(".frozen") > table tr input:not("[type="checkbox"]"), div:not(".frozen") > table tr select, div:not(".frozen") > table tr textarea', function() {
				updateRow($(this));
			});
		};
	
		
		/** 
		 * getAllViewGrid()
		 * 문서 내 모든 그리드에 대해 그리드를 감싸고 있는 $('div')를 반환한다.
		 * @this {jQuery} 조건 없음
		 * @param {null}
		 * @return {jQuery} 문서 내에서 Grid를 감싸고 있는 모든 $('div')
		 */
		
		$.fn.getAllViewGrid = function () {
			return $(document).find('.base_grid_table');
		}
		
		/** 
		 * getAllGrid()
		 * 문서 내 모든 그리드 객체를 반환한다.
		 * @this {jQuery} 조건 없음
		 * @param {null}
		 * @return {Array<Object>} 문서 내 모든 Grid 객체의 배열
		 */
		$.fn.getAllGrid = function () {
			var allViewGrids,
				gridArr = [];
			
			allViewGrids = $(this).getAllViewGrid();
			allViewGrids.each(function() {
				gridArr.push($(this).getGrid());
			});
			return gridArr;
		}
		
		/** 
		 * getViewGrid()
		 * $(this)를 포함하고, 그리드를 감싸고 있는 $('div')를 반환한다.
		 * @this {jQuery} div.grid_target 및 그 하위 전체 jQuery object
		 * @param {null}
		 * @return {jQuery} Grid를 감싸고 있는 $('div')
		 */
		$.fn.getViewGridWrap = function(){
			var gridId =$(this).attr('id');

			if(!gridId && $(this).length == 0 ){
				gridId = this.selector.replace(/\#?\.?/g,'')
			}
			var $target; 
			
			if($(this).length == 0){
//				$this = $('[data-shadowid="'+gridId+'"]'); 
				$this =  $('.grid_event_apply').filterByData('shadowid',gridId) 
			}else{
				$this= $(this);
			}
//			var CID = options.cid;
			if(!CID){
				if($this.parents('.tabWrapper').find('ul.tab_content > li').length>0){
					var url = $this.parents('.tabWrapper').find('ul.tab_content > li').data('url');
					CID = a2mjslib.getCidfromUrl(url);
				}else{
					CID = a2mjslib.getCidfromUrl(document.location.pathname);
				}
			}else{
				if($this.parents('.tabWrapper').find('ul.tab_content > li').length>0){
					var url = $this.parents('.tabWrapper').find('ul.tab_content > li').data('url');
					CID = a2mjslib.getCidfromUrl(url);
				}
			}
			
				
			//그리드가 1개 이상 
			if($('#'+gridId).length > 0){
				 
				
				
				
				if($('#'+gridId).parents('#txt').length > 0  ){
					//아무것도 없는 상태 
					if($('#'+$(this).attr('id')+':not(.grid_event_apply)').length ==1 ){
						
//						$target =$('.content_grap').find('#'+gridId+':not(.grid_event_apply)');
//						$target.data('shadowid', gridId);
//						$target.attr('id', CID+'_'+gridId );
					}else if($('#'+gridId+':not(.grid_event_apply)').length >1){
						// 중복의 의미로 구분해 낼 재간이 없음
					}else{
						//그리드가 기존에 있을 경우 반드시 여기를 타게 될거임 
						if(CID){
							$target =   $('.content_grap').find('.grid_event_apply#'+CID+'_'+gridId);
						}else{
							$target =   $('.content_grap').find('.grid_event_apply#'+gridId);
						}
					}
				}else{
					// popup,dialog
					$target  = $('#'+gridId);
				}
			}else{
				if($('#'+CID+'_'+gridId).length>0){
					$target =$('#'+CID+'_'+gridId)
					
				} 
				
			}
			return $target;
		}
		
		
		/** 
		 * getViewGrid()
		 * $(this)를 포함하고, 그리드를 감싸고 있는 $('div')를 반환한다.
		 * @this {jQuery} div.grid_target 및 그 하위 전체 jQuery object
		 * @param {null}
		 * @return {jQuery} Grid를 감싸고 있는 $('div')
		 */
		$.fn.getViewGrid = function(){
			var $res, $this;
			$this = $(this);
			
			// $('div.grid_target')은 Grid를 감싼 $('div')와 제목 $('h5')을
			// 감싸고 있는 한 단계 더 상위 $('div')
			if ($this.closest('.grid_target').length > 0) {
				$this = $this.closest('.grid_target');
			}
			$res = $this.find('.base_grid_table');
			
			// 감싸고 있는 $(this)를 포함한 $('div')에 viewGrid가 있는 경우
			if ($res.length == 1) {
				return $res;
			}else if ($res.length > 1){
				return $res.eq(0)
			}else {
				// Error: 그리드가 없거나 여러 개
				return null;
			}
		}
		
		$.fn.getFormViewGrid = function(){
			var $res, $this;
			$this = $(this);
			
			// $('div.grid_target')은 Grid를 감싼 $('div')와 제목 $('h5')을
			// 감싸고 있는 한 단계 더 상위 $('div')
			if ($this.closest('.grid_target').length > 0) {
				$this = $this.closest('.grid_target');
			}
			$res = $this.find('.base_grid_table');
			
			// 감싸고 있는 $(this)를 포함한 $('div')에 viewGrid가 있는 경우
			
			return $res;
		}
		

		/** 
		 * getGrid()
		 * 그리드 객체를 반환한다.
		 * @this {jQuery} div.grid_target 및 그 하위 전체 jQuery object
		 * @param {null}
		 * @return {Object} ue.ui.D…t.e…d.init {element: F.fn.init[1], ...} 
		 */
		$.fn.getGrid = function() {
			var grid = $(this).getViewGrid();
			var res;
			if(grid){
			res = $(this).getViewGrid().data('kendoGrid');
			}
			if (!res) {
				return;
			} else {
				return res;
			}
		}

		
		/** 
		 * getDataSource()
		 * 그리드의 dataSource 객체를 반환한다.
		 * @this {jQuery} div.grid_target 및 그 하위 전체 jQuery object
		 * @param {null}
		 * @return {Object} (kendo.data.DataSource)
		 */
		$.fn.getDataSource = function() {
			var res = $(this).getGrid().dataSource;
			if (!res) {
				return;
			} else {
				return res;
			}
		}

		/** 
		 * getColList()
		 * 그리드의 열 정보로 이루어진 배열을 반환한다.
		 * @this {jQuery} div.grid_target 및 그 하위 전체 jQuery object
		 * @param {null}
		 * @return {Array<Object>}
		 */
		$.fn.getColList = function() {
			var res = $(this).getGrid().columns;
			if (!res) {
				return;
			} else {
				return res;
			}
		}
		
		/** 
		 * getIds()
		 * 그리드의 컬럼명으로 이루어진 배열을 반환한다.
		 * @this {jQuery} div.grid_target 및 그 하위 전체 jQuery object
		 * @param {null}
		 * @return {Array<Object>}
		 */
		$.fn.getIds = function() {
			var cols = $(this).getGrid().columns; 
			var res=[];
			if (!cols) {
				return;
			} else {
				getId(res,cols)
				
				return res;
			}
		}
		var getId = function(res , cols){
			
			$.each(cols,function(i,obj){
				res.push(obj.field)
				if(obj.columns){
					getId(res,obj.columns)
				}
				
			})
		}
		

		/** 
		 * getRowData()
		 * UI로 수정한 내용이 반영된 데이터를 반환한다. 매개변수가 있을 경우
		 * 전체 데이터를 Array<Object>로 반환하고, 매개변수가 없을 경우 
		 * 매개변수로 입력한 행에 대한 정보를 반환한다.
		 * @this {jQuery} div.grid_target 및 그 하위 전체 jQuery object
		 * @param {null|Element|jQuery|String} 그리드의 한 행에 대한 정보.
		 * 		<tr>, $('tr'), 혹은 한 행에 대한 그리드의 uid 값이 될 수 있다.
		 * @return {Array<Object>|Object} 그리드의 한 행에 대한 데이터 객체 
		 * 		또는 그 객체들의 배열
		 */
		 	
		$.fn.getRowData = function(obj) {
			var $target = $(this), 
			$obj,objType = chkParamType(obj);
			
			
			if( $target && $target.getGrid() != null){
			switch (objType) {
			
			// obj가 없는 경우, 전체 데이터 반환
			case "NULL":
				return $(this).getDataSource().data().toJSON();
			
			// obj가 jQuery 타입인 경우, $('tr')을 찾아 해당 데이터 반환
			case "JQUERY": 
				// $obj로부터 가장 가까운 부모 $('tr')을 찾는다.
				$tr = obj.closest('tr');
				
				// $tr의 데이터를 반환한다.
				if ($tr.length == 1) {
					return $(this).getGrid().dataItem($tr);
				} 
				// $tr을 찾지 못한 경우 빈 배열을 반환한다.
				else {
					return;
				}
				
			// obj가 HTML element 타입인 경우, jQuery로 타입 캐스팅해서 처리	
			case "ELEM":
				// jQuery로 타입 캐스팅한다.
				$obj = $(obj);
				
				// $obj로부터 가장 가까운 부모 $('tr')을 찾는다.
				$tr = $obj.closest('tr');
				
				// $tr의 데이터를 반환한다.
				if ($tr.length == 1) {
					return $(this).getGrid().dataItem($tr);
				} 
				// $tr을 찾지 못한 경우 빈 배열을 반환한다.
				else {
					return;
				}

			// obj가 String 타입인 경우, 값이 유효한 uid이면 해당 데이터 반환
			case "STR":
				if($(this).getDataSource().getByUid(obj)) {
					return $(this).getDataSource().getByUid(obj);
				}
				return;
				
			// 해당하는 경우가 없을 경우, chkParamType() 디버깅할 것.
			default:
				return;
			}
			}else{
				return;
			}
		}
		
		/** 
		 * getLocalData()
		 * UI로 수정하기 전 상태의 데이터를 반환한다.
		 * 매개변수가 없을 경우 전체 데이터를 Array<Object>로 반환하고,
		 * 매개변수가 있을 경우 매개변수로 입력한 행에 대한 정보를 반환한다.
		 * @this {jQuery} div.grid_target 및 그 하위 전체 jQuery object
		 * @param {null|Element|jQuery|String}
		 * @return {Array<Object>|Object}
		 */
		$.fn.getLocalData = function(obj) {
			var $obj,
				objType = chkParamType(obj);
			
			switch (objType) {
			
			// obj가 없는 경우, 전체 데이터 반환
			case "NULL":
				return $(this).getDataSource()._pristineData;
			
			// obj가 jQuery 타입인 경우, $('tr')을 찾아 해당 데이터 반환
			case "JQUERY": 
				// $obj로부터 가장 가까운 부모 $('tr')을 찾는다.
				$tr = obj.closest('tr');
				
				// $tr의 수정 전 데이터를 반환한다.
				if ($tr.length == 1) {
					return getLocalDataRow($tr);
				} 
				// $tr을 찾지 못한 경우 빈 배열을 반환한다.
				else {
					return;
				}

			// obj가 HTML element 타입인 경우, jQuery로 타입 캐스팅해서 처리
			case "ELEM":
				// jQuery로 타입 캐스팅한다.
				$obj = $(obj);
				
				// $obj로부터 가장 가까운 부모 $('tr')을 찾는다.
				$tr = $obj.closest('tr');
				
				// $tr의 수정 전 데이터를 반환한다.
				if ($tr.length == 1) {
					return getLocalDataRow($tr);
				} 
				// $tr을 찾지 못한 경우 빈 배열을 반환한다.
				else {
					return;
				}
				
			// obj가 String 타입인 경우, 값이 유효한 uid이면 해당 데이터 반환
			case "STR":
				var $tr,
					$gridDom = $(this).getViewGrid();
				
				$tr = $gridDom.find('tr[data-uid="' + obj + '"]');
				if (!$tr) {
					return;
				}
				return getLocalDataRow($tr);
				
			// 해당하는 경우가 없을 경우, chkParamType() 디버깅할 것.
			default:
				return;
			}
		}
		
		/**
		 * cmpRowAndLocal()
		 * 한 행에 대해 UI로 수정하기 전과 후의 데이터가 일치하는지 판별한다.
		 * @this {jQuery} div.grid_target 및 그 하위 전체 jQuery object
		 * @param {element|jQuery|Object} tr
		 * @return {Boolean}
		 * @test
		 *   공통코드관리에서 셀 클릭 후
		 *   var tdSelect = $('#table_grid1_active_cell');
		 *   tdSelect.cmpRowAndLocal(tdSelect.parent('tr'));
		 */
		$.fn.cmpRowAndLocal = function(obj) {
			var rowData = $(this).getRowData(obj),
				localData = $(this).getLocalData(obj);
			
			if (cmpRowAinB(localData, rowData)) {
				return true;
			} else {
				return false;
			}
		}
		
		
		
		
		$.fn.getDataC = function($tr) {
			if ($tr.is('tr') && $tr.length == 1) {
				var $grid = $tr.getGrid(),
					trIndex,
					addedList = [];
				
				// 새로 만든 레코드들을 addedList에 넣음
				$.each($tr.getRowData(), function(i,val) {
					if (val.CRUD == 'C'){
						addedList.push(val);
					}
				});
			}
			return addedList;
		}
		
		
		$.fn.getDataCIndex = function($tr) {
			if ($tr.is('tr') && $tr.length == 1) {
				var $grid = $tr.getGrid(),
					trIndex,
					addedIndexList = [];
				
				// 새로 만든 레코드들의 index를 addedIndexList에 넣음
				$.each($tr.getRowData(), function(i,val) {
					if (val.CRUD == 'C'){
						addedIndexList.push(i);
					}
				});
			}
			return addedIndexList;
		}
		
		/**
		 * setData
		 * 선택한 셀의 값을 txt로 변경한다. UI에 변경사항이 반영되며,
		 * 변경 전 상태는 getLocalData()로 알 수 있다.
		 * @this {jQuery} div.grid_target 및 그 하위 전체 jQuery object
		 * @param {String, String}
		 */
		$.fn.setData = function(field, txt) {
			var bindData,
				colName,
				$td, 
				$thisRow;
			
			// $(this) 혹은 상위 DOM에 $('td')가 있는지 확인하고 선택
			if ($(this).closest('td').length == 1) {
				$td = $(this).closest('td');
			}else{
				// 없을 경우는 target이 상위 선택자 
				$td = $(this).find('[col="'+field+'"]')
				
			}	
				
				
				
			$td.each(function(k,td){
				// $td의 상위 DOM에 $('tr')이 있는지 확인하고 getRowData() 호출
				if ($(td).closest('tr').length == 1) {
					$thisRow = $(td).getRowData($(td).closest('tr'));
					// 입력이 없는 경우, 동작 불가능
					if ((!field || !txt) && txt!='') {
					}
					// 데이터 수정 및 그리드 새로고침 
					else {
						var grind = $(this).getGrid();
						if(grind){
							var focusedCell = grind._current;
							var uid = $(focusedCell).parent('tr').data('uid');
							var focuesdCol = $(focusedCell).data('col');
							colName = field;
							bindData = txt;
							
							
							//set을 할 경우 input이 새로 그려짐에 따라 이벤트가 적용되지 않음 
//							$thisRow.set(colName,txt)
							// 데이터를 일반 바인드 하고 후속 처리 
							$thisRow[colName] =txt;
							$(td).datas(txt)
							if(colName != 'CRUD'){
								updateRow($(td).closest('tr'))
							}
						}
					}
				}
			})
//		   $(this).getGrid().refresh();
		}
		
		$.fn.setAllData = function(field, txt) {
			var bindData,
				colName,
				$td, 
				$thisRow;
			
			// $(this) 혹은 상위 DOM에 $('td')가 있는지 확인하고 선택
			
			var grind = $(this).getGrid()
			
			if (grind) {
				var rowDatas = grind.dataSource.data()
				$.each(rowDatas, function(i,obj){
					obj[field] = txt;
					obj['CRUD'] = 'U';
				})
				
//				grind.dataSource(rowDatas);
				grind.refresh();
					
			}
		}
		
		
		$.fn.getOpt = function() {
			var $dom = $(this)
			var col = $dom.data('col');
			var result; 
			$.each($(this).getGrid().columns,function(i,val){
				if(val.field == col){
					result= this;
				}
				
			})
			return result;
		}
			
		
		
		
		$.fn.any2Obj = function() {
			
		}
		
		$.fn.any2Dom = function() {
			
		}
		
	
		/**
		 * setData
		 * 선택한 셀의 값을 txt로 변경한다. UI에 변경사항이 반영되며,
		 * 변경 전 상태는 getLocalData()로 알 수 있다.
		 * @this {jQuery} div.grid_target 및 그 하위 전체 jQuery object
		 * @param {String, String}
		 */
		$.fn.setDomAttr= function( attr) {
			var bindData,
				colName,
				$td,  
				$thisRow;
			
			// $(this) 혹은 상위 DOM에 $('td')가 있는지 확인하고 선택
//			if ($(this).closest('td').length == 1) {
//				$td = $(this).closest('td');
//			}else{
//				// 없을 경우는 target이 상위 선택자 
//				$td = $(this).find('[col="'+field+'"]')
//				
//			}	
//			var attr = $(container).data('attr');
			
			
			$td= $(this)
				
			$td.each(function(k,td){
				// $td의 상위 DOM에 $('tr')이 있는지 확인하고 getRowData() 호출
				if(gridConfig.exposeField){
					
					var attrKey ='' ;
					if(attr){
						if(typeof attr != 'object'){
							attr =JSON.parse(attr) ;
						} 
						
						var attrData= jQuery.extend(true, $(this).data().attr, attr)
						$.each(attrData,function(key,val){
//							attrKey += key+'="'+val+'" '
							$(td).find('select,input').prop(key,val)
							
							if(key=='readonly'){
								if(val == 'readonly' || val =='true'){
									$(td).find('span.btn, span.btn_ico').addClass('bt_disabled')
								}
							}
							
						})
					}
				}
				$(td).data('attr',attrData)
			})
		}
		$.fn.removeDomAttr= function( attr) {
			var bindData,
				colName,
				$td,  
				$thisRow;
			
			$td= $(this)
				
			$td.each(function(k,td){
				// $td의 상위 DOM에 $('tr')이 있는지 확인하고 getRowData() 호출
				if(gridConfig.exposeField){
					
					var attrData = $(td).data('attr')
					if(attr){
						if(typeof attr != 'object'){
							attr =JSON.parse(attr) ;
						}
						$.each(attr,function(i,key){
//							attrKey += key+'="'+val+'" '
							$(td).find('select,input').removeAttr(key)
							
							if(key=='readonly'){
								$(td).find('span.btn_ico').removeClass('bt_disabled')
							}
							if(attrData)
							delete attrData[key]; 
							
						})
					}
				}
				
				
				$(td).data('attr',attrData);
					
				
			})
		}
		
		
		$.fn.grid_callback_func= function( callback) {
			var $gridDom = $(this) 
			if (callback instanceof Array) {
				$.each(callback, function(i, val) {
					/*
					 * @JK - 보안 취약점 수정  
					 */
					//eval(val + '()')
					window[val]();
				})
			} else {
				if (callback) {
					if (callback instanceof Function) {
						/*
						 * @JK - 보안 취약점 수정
						 */
						//var caller = eval(callback)
						//caller();
						callback();
					} else {
						if (callback.indexOf('(') > 0) {
							/*
							 * @JK - 보안 취약점 수정
							 */
							//eval(callback) 
							window[callback]();
						} else {
							/*
							 * @JK - 보안 취약점 수정
							 */
							//eval(callback + '($gridDom)')
							window[callback]($gridDom)
						}
					}
				}
			}
		}
	})(jQuery);

var formatDate = function(txt){
	var result; 
	if(txt && txt.length ==8){
		result = txt.substring(0,4)+'-'+ txt.substring(4,6) +'-'+ txt.substring(6,8)
	}else{
		result = ''
	}
	return result
}

var getDataByKey = function(txt,key){
	var result ; 
	if(txt ){
		result = txt[key] ?txt[key] :'' ;
	}else{
		result = '';
	}
	return result;
}

var getObjectByKey = function(obj,key,value){
	var result ;
	$.each(obj, function(i,val){
		if(i== key){	//
			result = obj;
		}else if(val[key]== value){
			result = val;
		}
		
	})
	return result;
}

/**
 * chkParamType()
 * 매개변수에 대한 타입 판별
 * @param {null|Element|jQuery|String|Object}
 * @return {String} 타입에 대한 정보를 문자열로 반환
 */ 
var chkParamType = function(param) {
	if (!param) {
		return "NULL";
	} else if (param.nodeType) {
		return "ELEM";
	} else if (param.jquery) {
		return "JQUERY";
	} else if (typeof param == "string") {
		return "STR";
	} else if (typeof param == "object") {
		return "OBJ";
	} else {
		return "ELSE";
	}
}

/**
 * getLocalDataRow()
 * 해당 행에 대한 UI 수정 전 데이터 반환
 * @param {jQuery} tr
 * @return {Object}
 */ 
var getLocalDataRow = function($tr) { 
	var grid = $tr.getGrid(),
		trIndex,
		numAdded = 0;
	
	trIndex = grid.items().index($tr);
	
	$.each($tr.getRowData(), function(i, val) {
		if (val.CRUD == 'C') {
			// 새 레코드들 중 선택한 레코드보다 index가 작은 레코드들의 개수 세기 
			if (i < trIndex) {
				numAdded++;
			}
			// 새로 만든 레코드는 local data가 없으므로 실패
			else if (i == trIndex) {
				numAdded = -1;
				return false;	// $.each문 탈출
			}
			// 선택한 레코드보다 index가 큰 경우는 검색할 필요 없음
			else {
				return false;	// $.each문 탈출
			}
		}
	});
	
	// 새 레코드에 getLocalData()를 호출한 경우
	if (numAdded == -1) {
		return -1;
	}
	// 나머지의 경우 (정상 동작)
	else {
		res = grid.dataSource._pristineData[trIndex - numAdded];
		return res;
	}
}

/**
 * cmpRowAinB
 * 두 행 데이터를 비교하되, A의 key-value가 B의 key-value와 일치하는지
 * 판별한다. B의 크기가 더 클 수 있다.
 * ex) A = {key1:val1}, B = {key1:val1}
 *    cmpRowAinB(A, B) => true
 *    cmpRowAinB(B, A) => true
 * ex) A = {key1:val1}, B = {key1:val1, key2:val2}
 *    cmpRowAinB(A, B) => true
 *    cmpRowAinB(B, A) => false
 * @param {element|jQuery|Object} tr
 * @return {Boolean}
 */
var cmpRowAinB = function(rowA, rowB) {
	var $rowA,
		$rowB,
		objA,
		objB;
	
	// row type: <tr> or $('tr') or object(tr)
	if (chkParamType(rowA) == "ELEM") {
		$rowA = $(rowA);
		objA = $rowA.getRowData($rowA.data('uid'));
	} else if (chkParamType(rowA) == "JQUERY") {
		$rowA = rowA;
		objA = $rowA.getRowData($rowA.data('uid'));
	} else if (chkParamType(rowA) == "OBJ") {
		objA = rowA;
	} else {
		return false;
	}
	
	if (chkParamType(rowB) == "ELEM") {
		$rowB = $(rowB);
		objB = $rowB.getRowData($rowB.data('uid'));
	} else if (chkParamType(rowB) == "JQUERY") {
		$rowB = rowB;
		objB = $rowB.getRowData($rowB.data('uid'));
	} else if (chkParamType(rowB) == "OBJ") {
		objB = rowB;
	} else {
		return false;
	}
	var target = (objA.length > objB.length ? objA : objB)
		for (key in target) {
			// 크기 비교로 불가능 ROwdata에 이벤트 등의 필드가 내장되어 있음
			// filter 기능 필요 
			if((typeof target[key] == 'string' && (key != 'uid'&& key != 'id' && key != 'dirty' && key != 'CRUD') ) || target[key] == null|| target[key] == 'undefined'){
				if (objA[key] != objB[key]) {
					return false;
				}
			}
		}
//	}
	return true;
}




/** 추가 **/ 
var getDomById= function(childId){
	return $('#' + childId);
}

var templateWrapper = function(funcName , container, options,opts,model,funcParams,obj){
	var contain = container;
	var options = {'field' : model.id, 'model' : contain }
	container = null;
	if($('tr[data-uid="'+options.model.uid+'"]')){
		container = $('tr[data-uid="'+options.model.uid+'"] td[col="'+model.id+'"]')
	}
	/*
	 * @JK - 보안 취약점 수장 
	 */
	//return eval(funcName+'(container,options,opts,model,funcParams,obj);')
	return window[funcName](container, options, opts, model, funcParams, obj);
}

var formattingWrapper  = function(funcName , container, options,opts,model,funcParams,obj){ 
	var val = '';
	val = container.model[container.field];
	if(opts.format){
		
		return kendo.toString( kendo.parseInt( val),opts.format) 
	}else if (opts.formatter){
		value = opts.formatter? opts.formatter(val,options) : val;
		val = value;
	}
	if(val==undefined || val ==null){
		val = ''
	}
	

	//return titleInCell(options, opts) + val ; 
	return titleInCell(options, opts) + '<span class="event_enable">'+ val + '</span>'; 
}


//해당 컬럼에 Link (조회 그리드에서 사용)
function linkField2(container,options,opts,model, params, obj) {// 해당 Column에 Link 걸기
	var rowid = model.id;
//	var data = [];
	var datas ='';
	if(params){
		$.each(JSON.parse(params),function(key,obj){
			datas += 'data-'+key+'="'+obj+'" '
		})
		
	}
	
	
	if(datas !=''){
		return '<span class= "ac_click link text" '+datas+' data-field="'+rowid+'">' + options.model[rowid] + '</span>';
	}else {
		return  titleInCell(options, opts) +'<span class="event_enable">'+ options.model[rowid]+ '</span>'; 
	}
}


var titleInCell = function(options, opts){
	var id = opts.id;
	var name = '';
	options.colModel.forEach(function(obj,i){
		if(obj.field == id){
			name = obj.title;
		}
	})
//	var display_title = options.gridOptions.responsive == false? '': 'display-title'; 
//	return '<strong class="th-tit '+display_title+'">'+name+' </strong>';
	return  '' ;
}

var gridLoadingBarHide = function($gridDom){
//	setTimeout(function(){ 
//		kendo.ui.progress($gridDom, false);
//	}, 1000);
kendo.ui.progress($gridDom, false);
	
} 


var gridLoadingBarShow = function($gridDom){
	kendo.ui.progress($gridDom, true);
}



