/**
 * 
 * gridCommon UI
 * 
 */

// importScripts('../../jquery-hive-master/jquery.hive.pollen.js');
	
	(function($) {
	
		// //////////////////////////////////////////////////////////////////////////////////////////////////
		/**
		 * id : 그리드 생성 위치 type : 그리드 종류 - view : 리스팅만 하기 위한 그리드 종류 - crud : 수정삭제 기능을
		 * 추가한 그리드 url : Ajax를 통해 데이터를 받아올 주소 data : url이 없을 시 사용하는 데이터. ArrayList<Object>
		 * 의 포맷을 띄고 있어야 한다. colModels : 모델 리스트 attrTypes : 모델 속성 리스트 view : checkbox :
		 * text : readonlytext: password : popup : dialog : datepicker : button :
		 * select :
		 * 
		 * options : jqgrid Options 리스트
		 */
		var datas;
		var grid; 
		var maxLength = 500;
//		var maxGroupLength = 20;
		var agt = navigator.userAgent.toLowerCase();
		var $this;
//		var gridId 
		// msie
//		if (agt.indexOf("chrome") != -1) {
//			maxLength = 1000;
//		} else if (agt.indexOf("msie") != -1) {
//			maxLength = 1000;
//		}
		
		
		$.fn.setViewGrid = function(options) {
			
			datas = null;
			// 1) 변수선언 
			var $formId;

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
			var CID = options.cid;
			if(!CID){
				if($this.parents('.tabWrapper').find('ul.tab_content > li').length>0){
					var url = $this.parents('.tabWrapper').find('ul.tab_content > li').data('url');
					CID = a2mjslib.getCidfromUrl(url);
				}else{
					CID = a2mjslib.getCidfromUrl(document.location.pathname);
				}
			}else{
				
			}
			
				
			//그리드가 1개 이상 
			if($('#'+gridId).length > 0){
				 
				
				
				
				if($('#'+gridId).parents('#txt').length > 0  ){
					//아무것도 없는 상태 
					if($('#'+$(this).attr('id')+':not(.grid_event_apply)').length ==1 ){
						
						$target =$('.content_grap').find('#'+gridId+':not(.grid_event_apply)');
						$target.data('shadowid', gridId);
						$target.attr('id', CID+'_'+gridId );
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
			
			options.cid = CID;
			if(options.cid)
				$target.data('cid',options.cid);
			
			
//			}
			
			
			
			
			
			
			$target.addClass('grid_target group');
			
//			$(this).setGridEvent(); 
			if($target.find('.base_grid_table').length > 0) {
				$target.find('.base_grid_table').getGrid().destroy();
			}
			
			$target.empty();
			
			// 2) 옵션 - 사용자가 지정한 options적용
			var opts = $.extend({}, $.fn.setViewGrid.defaults, options);
			var gridOptions = $.extend({}, defaultGridOptions, opts.gridOptions);
			opts.gridOptions = gridOptions;
			
			
			
			// 높이조절 
//			if(opts.gridOptions.height){
//				opts.gridOptions.height = opts.gridOptions.height-60
//				$target.data('height',opts.gridOptions.height);
//			} 
			
			
			// 로컬 데이터 없으면 AJAX JSON TYPE 으로 세팅 
			opts['datatype'] = 'local';
			if (!opts.localData) {
				if (opts.url) {
					opts['datatype'] = 'json';
				}
			}
			
			
			//파라미터 
			if (opts.param) {
				if (opts.param instanceof Object) {
	
				} else {
					$formId = $('#' + opts.param)
					opts.param = $formId.serialize();
				}
			} else {
				$formId = $('.form_search_box')
				opts.param = $formId.serialize();
			}
			
			
			// Tree시 Sortable불가
			var types = 'crud';
			if (opts.treeview) { 
				types = 'tree';
			}else if(opts.type == 'view'){
				types = opts.type;
			}else{
				types = 'crud'
			}
			opts.type=  types;
			
			
			// opts = $.extend({}, opts , defaultGridOptions);
			// 3) 객체 생성
			// title 및 btn 생성
			if(gridOptions.caption){
				var title = '<div class="group_title"><strong class="g_title">'+ gridOptions.caption + '</strong><span id="grid_message" class=""></span><div class="g_title_btn">';
		
		
				if (opts.btn.length > 0) {
					$.each(opts.btn, function(i, val) {
						if(Object.keys(val).length >0){
							var btn = opts.btn[i];
							var btnId = 'button_' + btn.button + '_' + opts.id;
							var icoCd = '';
							var label = btn.label;
							//레이블이 없을 경우 버튼 사라짐 
		//					if (btn.label) {
								if (btn.button == 'add') {
//									icoCd = 'bts_add'
									icoCd = 'bts_add bt_ico b16'
									if (!btn.label) {
										label = '';
									}
									label = '';	// 디자인에서 추가
								} else if (btn.button == 'delete') {
//									icoCd = 'bts_delete'
									icoCd = 'bts_delete bt_ico f16'
									if (!btn.label) {
										label = '';
									}
									label = '';	// 디자인에서 추가
								} else if (btn.button == 'clone') {
//									icoCd = 'bts_delete'
									icoCd = 'bts_popup clone bt_ico f16'
									if (!btn.label) {
										label = '';
									}
									label = '';	// 디자인에서 추가
								} else if (btn.button == 'save') {
//									icoCd = 'bts_save';
									icoCd = 'bts_save bt_ico o16'
									if(!btn.func){
										btn.func = 'save';
									}
									if (!btn.label) {
										label = '';
									}
									label = '';	// 디자인에서 추가
								} else if (btn.button == 'excel') {
//									icoCd = 'bts';
									icoCd = 'bts_excel  '
									if(!btn.func){
										btn.func = 'excel';
									}
									if(btn.hidden){
										
									}
									if (!btn.label) {
//										label = '엑셀다운로드';
									}
									label = '';
								} else if (btn.button == 'excelUp') {
									icoCd = 'bts';
									if(!btn.func){
										btn.func = 'excelUpload';
									}
									if (!btn.label) {
										label = '엑셀업로드'; 
									}
								} else if (btn.button == 'excelSam') {
									icoCd = 'bts';
									if(!btn.func){
										btn.func = 'excelSample';
									}
									if (!btn.label) {
										label = '엑셀업로드양식'; 
									}
								} else if (btn.button == 'fresh') {
							         icoCd = 'btn bts btg_gray bt_ico k16 ac_click';
							         if(!btn.func){
							          btn.func = 'save';
							         }
							         if (!btn.label) {
							          label = '';  
							         }
								}
								else if (btn.button == 'help') {
									if (!btn.label) {
										label = '도움말';
									}
									icoCd = 'bts';
								} else {
									label = btn.label; 
								}
								
//								icoCd = icoCd+' btn_orange';	//css edit
								
								var paramsData=getGridDialogPopupParam(btn.param);	
								title += '<span id="' + btnId + '" class="btn ac_click sbtn ' + icoCd + ' ' + btn.classes + '" data-func="' + btn.func + '" data-type="' + btn.type + '" data-cls="'
										+ btn.cls + '" data-gridtype="' + types + '" data-width="' + btn.width + '" data-height="' + btn.height + '"  data-url = "' + btn.url + '.' + btn.type+'"' 
										+ ' data-field="' + btn.dataField + '" data-param="'+paramsData + '"data-firstrow="' + btn.firstRow+ '" '+(btn.hidden ? 'data-hidden="true"':'')+ '>' + label + '</span>'
		//					} 
						}
					})
				}
		
				title += '</div>';
				// title 및 grid bind
				$target.append(title);
			}
			
			$target.addClass('grid_event_apply')
			$target.append('<div id="table_' + opts.id + '" class="base_grid_table group_content"> </div> ')
			
	
			
			
			var $gridDom = $target.find('.base_grid_table')
			var gridopts = genColModel(opts);
			gridopts['gridDom'] = $gridDom;
			
			
			if(gridConfig.gridLoading){ 
				gridLoadingBarShow($gridDom)
			} 
			//Tab hide를 위해 들어간 기능#1
			//그리드를 그릴때 부모창 크기가 히든이면 그리드 사이즈가 설정되지 않아 깨지는 현상을 차단 
			var $parent = $target.parent('li');
			var display = $parent.css('display') ;
			var hide = $parent.hasClass('hide');
			$parent.show();
			
			if($formId){
				if(validateWithOutForm($formId)){
					drawGrid(gridopts);
				}
			}else{ 
				drawGrid(gridopts); 
			}
			//Tab hide를 위해 들어간 기능#2
			//그리드를 그릴때 부모창 크기가 히든이면 그리드 사이즈가 설정되지 않아 깨지는 현상을 차단 
			if(hide || display=='none' ){
				$parent.hide();
			}
			
			$gridDom.data('resultKey',opts.modelName);
			setEvent($gridDom,opts);
			
		};// end class
		
		function setEvent($gridDom,opts){
			// 이벤트 변경
			var $form = $gridDom.parents('form');

			if($form)
				$form.validationEngine('immediate');
			if (opts.events.length > 0) {
				$.each(opts.events,
								function(i, val) {
									var event = {};
									var funcName;
									if (val.funcName) {
										if (val.type) {
											// 전체 선택일 경우 CLS 타입 추가.
											// onSelectAll(Form),
											// onSelectGridAll(Grid)
											if (val.funcName == 'onSelectAll'
													|| val.funcName == 'onSelectGridAll') {
												funcName = val.funcName + val.cls
														+ val.type
											} else {
												funcName = val.funcName + val.type
											}
										} else {
											funcName = val.funcName
										}
									} else {
										if (val.type) {
											funcName = val.type
										} else {
											funcName = ''
										}
									}
									$gridDom.on(val.event,'td',
										function(e){
											var $tr = $(this).parent('tr')
											var target= val.target;
											var callback = val.callback;
											var rowid= $tr.data('uid');
											eval(funcName+'(rowid,target,callback,$tr,e,this)');
//											if(callback && callback != 'undefined' && callback !=''){ 
//												eval(callback+'(rowid,target,callback,this)');
//											}
										}	
									
											
//											new Function( 'e',
//													'var target = \'' + val.target + '\';var callback=\''
//															+ val.callback + '\'; ' + funcName + '(rowid,iRow,iCol,rowData,target,callback,this);'
//															+ (val.callback && val.callback != 'undefined' ? val.callback
//																	+ '(rowid,iRow,iCol,rowData,target,callback,this)'
//																	: ''))
									
									
//											new Function('e',funcName+'(e,this)')
//									function(e){
//										eval(obj.funcName)+'(e)'
//									})
//									new Function('e',funcName+'(e,this)')		
									
//									 new Function( 'rowid', 'iRow', 'iCol', 'rowData',
//											'var rowData = rowData;var rowid = rowid;var target = \'' + val.target + '\';var iRow=iRow;var iCol= iCol;var callback=\''
//													+ val.callback + '\'; ' + funcName + '(rowid,iRow,iCol,rowData,target,callback,this);'
//													+ (val.callback && val.callback != 'undefined' ? val.callback
//															+ '(rowid,iRow,iCol,rowData,target,callback,this)'
//															: ''));
//									)
									)
//									gridOptions = $.extend({}, gridOptions, event)
								})
			}
		}
		
		//모델 생성 
		function genColModel(opts) {

			var modelName = opts.modelName;
			// /상태값 필드 강제생성
			
			var colGroups=[];
			var groupList = [] ;
			var colList = [];
			var colIndexList = [];
			//순번 옵션값에 의해 생성
			if(opts.CRUD_C) {
				displayStateName.c = opts.CRUD_C;
			}
			
			if(opts.CRUD_U) {
				displayStateName.u = opts.CRUD_U;
			}
			
			if(opts.CRUD_D) {
				displayStateName.d = opts.CRUD_D;
			}
			
			var readonlyEditor = function (container, options) {
				$(container).parents('.base_grid_table').data('kendoGrid').closeCell();
			};
			var displayStateTemplate = function (valObj) {
//				
				var result ='';
				if(valObj.CRUD == 'C' || valObj.CRUD == 'c' ){
					result = displayStateName.c
				}else if(valObj.CRUD == 'U' || valObj.CRUD == 'u'){
					result = displayStateName.u
				}else if(valObj.CRUD == 'D'|| valObj.CRUD == 'd'){
					result = displayStateName.d
				}
				
				return result ;
			};
			
			if(opts.gridOptions.rownumbers){
				colList.push({
					id : 'SEQ',
					field:'SEQ',
				    title: (opts.titleNo ? opts.titleNo: "순번"),
				     editor :readonlyEditor ,
				    template :function(dataItem,a,b) {
				    	var index = 0;
				    	try {
				    	if(dataItem)
				    		index = dataItem.parent().indexOf(dataItem);
				    	}catch(e){
//				    		alert('데이터 로드에 실패 했습니다. ')
				    	}
				    	
			    		return index + 1; 
        			}, 
				    attributes: {
				          "class": "table-cell table-cell-order",
				          style: "text-align: center; font-size: 11px",
				          "data-col" : "SEQ", 
					      "rd" : "SEQ"
				        	  
				        },
				    width: 50,  
				    sortable: false
				})
				colIndexList.push('SEQ')
			}
			
			//row number DESC anhpv 19/11/21
			if(opts.gridOptions.rownumbersDESC &&  !opts.gridOptions.rownumbers){
				colList.push({
					id : 'SEQ',
					field:'SEQ',
				    title: (opts.titleNo ? opts.titleNo: "No"),
				     editor :readonlyEditor ,
				    template :function(dataItem,a,b) {
				    	var index = 0;
				    	try {
				    	if(dataItem)
				    		index = dataItem.parent().indexOf(dataItem);
				    	}catch(e){
//				    		alert('데이터 로드에 실패 했습니다. ')
				    	}
				    	
			    		return local.length - index; 
        			}, 
				    attributes: {
				          "class": "table-cell table-cell-order",
				          style: "text-align: center; font-size: 11px",
				          "data-col" : "SEQ", 
					      "rd" : "SEQ"
				        	  
				        },
				    width: 50,  
				    sortable: false
				})
				colIndexList.push('SEQ')
			}
			
			// 상태값은 view 일때만 제외 
			
			if(opts.type != 'view'){
			
				colList.push({
				    title: (opts.titleStatus ? opts.titleStatus : "상태"),
				    field : "CRUD",
				    width: 50,  
				    hidden :  (opts.displayState ? !opts.displayState : !false),
				    editor :readonlyEditor ,
				    template : ( gridConfig.displayStateTemplate ?  displayStateTemplate : null), 
				    attributes: {
				          "data-col" : "CRUD", 
					      "rd" : "CRUD",
				          "class": "table-cell",
				          "style": "text-align: center; font-size: 11px" 
			        },
			        sortable: false
				});
				colIndexList.push('CRUD')
			}
			/** 중요 프로세스  */
			var schemaModel = { id: "", fields:{}};
			var havlockedCol= false;
			$.each(opts.colModels, function(i, model) {
				// ID 부여 
				
				
				 
					 
				// 기본옵션 먼저 세팅
				$.each(opts.defaultOptions, function(key, val) {
					// 개별 옵션이 없을 경우만 세팅
					// 개별옵션이 기본옵션보다 우선순위가 높음
					if(!model[key] ){
						model[key] = val;
					}
				})
				
				if(model.locked){
					havlockedCol = true;		
				}
				
				//에디터생성
				if(opts.type != 'view'){
					if(opts.type == 'tree'){
						if (model.id == opts.treeview.viewField) {
							// 에디터가 생성 되면서 이벤트가 안먹음 일단 삭제 
//							genEditor(opts,model); 
							model['template'] = function (container, options) {
//								var params =  funcParams ;
//								var optsparam = optsparam;
								
								
								return eval('treeHeaderWrapper'+'(container,opts,model,opts.treeview,this);' ) 
							};
							
						}else{
							genEditor(opts,model)
						}
					}else{
						genEditor(opts,model)
					}
					
				}else{
					functionName = null ;
						var obj =  function (container, options) {
							var params =  funcParams ;
							var optsparam = optsparam;
							return  templateWrapper('formattingWrapper' , container, options,opts,model,funcParams,this);
						};
					template = obj 	
						
				}
				//mask 생성 mask는 pattern 입력 형태에 따라 동작 
				getPattern(opts,model);
				// 모델포맷 형성 
				var colModelobj = colModel(model);
				
				
				colIndexList.push(model.id);
				colList.push(colModelobj); 
				// 스키마 모델 생성
				schemaModel.fields[model.id] = genSchemaModel(model);
				
				
			});
			opts['schemaModel'] = schemaModel;
			if(havlockedCol){
				if(opts.gridOptions.rownumbers){
					if(colList[0].id=='SEQ'){
						colList[0].locked = true;
					}
				}
				if(opts.type != 'view'){
					if(colList[0].field  =='CRUD'){
						colList[0].locked = true;
					}
					if(colList[1].field  =='CRUD'){
						colList[1].locked = true;
					}
				}
			}
			
			$.each(opts.colGroup,function(i,colgroup){
				
				var groupedCol = [] ;
				
				
				var deg=0; 
				
				
				var idx =colIndexList.indexOf(colgroup.startColumnName);
				for(var i = 0; i< colgroup.numberOfColumns;i++){
					groupedCol.push(colList[idx+i])
				} 
				
		
				// 삭제 
				colList.splice(idx, colgroup.numberOfColumns-1)
				colIndexList.splice(idx, colgroup.numberOfColumns-1)
				
				var group ={
						 title: colgroup.titleText,
						 startCol : colgroup.startColumnName,
						 columns:groupedCol 
				};
				colList[colIndexList.indexOf(colgroup.startColumnName)]
				colList[idx] = group;
			}); 
			
			
			
			opts['colModel'] = colList;
//			opts['colViewNames'] = colNames;
			return opts;
		}
		
		
		
		var getPattern = function(opts,model){
			var pattern = model['fpattern']
			
			switch(pattern){
				case 'currency' : break;
				case 'date': break;
			
			}
			
			
		};
		
		var genSchemaModel = function(model){
			
			var schemaOption ={}
			if(model.validation != undefined && model.validation != null) {
				schemaOption.validation = {};
				if(model.validation.required != undefined && model.validation.required != null) {
					schemaOption.validation['required'] = model.validation.required;
				}
				
				if(model.validation.min != undefined && model.validation.min != null) {
					schemaOption.validation['min'] = model.validation.min;
				}
				
				if(model.validation.max != undefined && model.validation.max != null) {
					schemaOption.validation['max'] = model.validation.max;
				}
			}
			if(!model.attrType ||  model.attrType == '' || model.attrType == 'view' || model.editor == null){
				schemaOption['editable'] = false;
				schemaOption['nullable'] = true;
				schemaOption['type'] = 'string';
				 
//				 defaultValue: 42,
		        
			}else{
//				schemaOption['editable'] = false;
//				schemaOption['nullable'] = true;
//				schemaOption['type'] = 'string';
				 
//				 defaultValue: 42,
//				if(model['validation'])
//					schemaOption['validation']=model['validation']; 
			}
			return schemaOption;
		};
		
		/**
		 * 커스텀 에디트 
		 * 
		 * 
		 */
		var genEditor = function(opts,model){
			
			var editor ;
			var edittype = model.attrType;
			var functionName;
			var template ; 
			if(!model.template) {
			if (!(edittype instanceof Object)) {
				switch (edittype) {
				case null:
				case undefined :
				case '' :
				case 'view':
					functionName = null ;
					var obj =  function (container, options) {
						var params =  funcParams ;
						var optsparam = optsparam;
						return  templateWrapper('formattingWrapper' , container, options,opts,model,funcParams,this);
					};
					template = obj 	
						
					break;
				case 'text':
					
					if(gridConfig.exposeField){
						functionName = edittype.func;
						var funcParams = {};
						funcParams = JSON.stringify(model.typeOption);
						var optsparam= opts
						var obj =  function (container, options) {
							var params =  funcParams ;
							var optsparam = optsparam;
							return  templateWrapper('textField' , container, options,opts,model,funcParams,this);
						};
						template=obj
						functionName=  null;
						// 
						functionName= function (container, options) {
							// 이걸 해야 컨텐츠 박스에 포커스가 감 
							 $(container).parents('.base_grid_table').data('kendoGrid').closeCell();
						};
					}else{
						var obj =  function (container, options) {
							var params =  funcParams ;
							var optsparam = optsparam;
							return  templateWrapper('formattingWrapper' , container, options,opts,model,funcParams,this);
						};
						template=obj
						
						functionName = function (container, options) {
							textField(container,options,opts,model,funcParams,this) ; 
//							templateWrapper('textField' , container, options,opts,model,funcParams,this);
						};
						
					}
					
					break;
				case 'number':
					if(gridConfig.exposeField){
						functionName = edittype.func;
						var funcParams = {};
						funcParams = JSON.stringify(model.typeOption);
						var optsparam= opts
						var obj =  function (container, options) {
							var params =  funcParams ;
							var optsparam = optsparam;
							return  templateWrapper('numberField' , container, options,opts,model,funcParams,this);
						};
						template = obj;
						functionName= function (container, options) {
							 $(container).parents('.base_grid_table').data('kendoGrid').closeCell();
						};
					}else{
						functionName = function (container, options) {
							numberField(container,options,opts,model)
						};
						
					}
					break;
				case 'textArea':
				case 'textarea':
					if(gridConfig.exposeField){
						functionName = edittype.func;
						var funcParams = {};
						funcParams = JSON.stringify(model.typeOption);
						var optsparam= opts
						var obj =  function (container, options) {
							var params =  funcParams ;
							var optsparam = optsparam;
							return  templateWrapper('textAreaField' , container, options,opts,model,funcParams,this);
						};
						template=obj
						functionName= function (container, options) {
							 $(container).parents('.base_grid_table').data('kendoGrid').closeCell();
						};
					}else{
						functionName = function (container, options) {
							textAreaField(container,options,opts,model)
						};
					}
					break;
				case 'readonlytext':
					if(gridConfig.exposeField){
						functionName = edittype.func;
						var funcParams = {};
						funcParams = JSON.stringify(model.typeOption);
						var optsparam= opts
						var obj =  function (container, options) {
							var params =  funcParams ;
							var optsparam = optsparam;
							return  templateWrapper('readOnlytextField' , container, options,opts,model,funcParams,this);
						};
						template=obj
						functionName= null;
					}else{
						functionName = function (container, options) {
							readOnlytextField(container,options,opts,model);
						};
					}
					break;
				case 'password':
					// functionName = passwordField;
					
					if(gridConfig.exposeField){
						functionName = edittype.func;
						var funcParams = {};
						funcParams = JSON.stringify(model.typeOption);
						var optsparam= opts
						var obj =  function (container, options) {
							var params =  funcParams ;
							var optsparam = optsparam;
							return  templateWrapper('passwordField' , container, options,opts,model,funcParams,this);
						};
						template=obj
						functionName= function (container, options) {
							 $(container).parents('.base_grid_table').data('kendoGrid').closeCell();
						};
					}else{
						functionName = function (container, options) {
							passwordField(container,options,opts,model)
						};
					}
					
					
					break;
				case 'link':
					// functionName = passwordField;
					functionName = edittype.func;
					var funcParams = {};
					funcParams = JSON.stringify(model.typeOption);
					var optsparam= opts
					var obj =   function (container, options) {
						var params =  funcParams ;
						var optsparam = optsparam;
						return  templateWrapper('linkField' , container, options,opts,model,funcParams,this); 
					};
					template=obj
					
					functionName= function (container, options) {
						 $(container).parents('.base_grid_table').data('kendoGrid').closeCell();
					};
					break;
				case 'popup':
					functionName = edittype.func;
					var funcParams = {};
					funcParams = JSON.stringify(model.typeOption);
					var optsparam= opts
					var obj =  function (container, options) {
						var params =  funcParams ;
						var optsparam = optsparam;
//						return eval('ChoiceInputFormPopup'+'(container,options,opts,model,params,this);'  ) 
						return  templateWrapper('ChoiceInputFormPopup' , container, options,opts,model,funcParams,this);
					};
					template=obj
					
					functionName= function (container, options) {
						 $(container).parents('.base_grid_table').data('kendoGrid').closeCell();
					};
					
					break;
				case 'dialog':
					functionName = edittype.func;
					var funcParams = {};
					funcParams = JSON.stringify(model.typeOption);
					var optsparam= opts
					var obj =  function (container, options) {
						var params =  funcParams ;
						var optsparam = optsparam;
//						return eval('ChoiceInputFormDialog'+'(container,options,opts,model,params,this);'  ) 
						return  templateWrapper('ChoiceInputFormDialog' , container, options,opts,model,funcParams,this);
					};
					template=obj
					functionName= function (container, options) {
						 $(container).parents('.base_grid_table').data('kendoGrid').closeCell();
					};
					
					break;
				case 'datepicker':
				    
				    functionName = edittype.func;
                    var funcParams = {};
                    funcParams = JSON.stringify(model.typeOption);
                    var optsparam= opts;
//                    var obj =  function (container, options) {
//                        var params =  funcParams ;
//                        var optsparam = optsparam;
////                      return eval('ChoiceInputFormDialog'+'(container,options,opts,model,params,this);'  ) 
//                        return  templateWrapper('datePickerField' , container, options,opts,model,funcParams,this);
//                    }; 
//                    template=obj;
                    
                	if(gridConfig.exposeField){
                		  var obj =  function (container, options) {
                              var params =  funcParams ;
                              var optsparam = optsparam;
//                            return eval('ChoiceInputFormDialog'+'(container,options,opts,model,params,this);'  ) 
                              return  templateWrapper('datePickerField' , container, options,opts,model,funcParams,this);
                          }; 
                		
                		
                		
                		
                        functionName= null;           	
                	}else {
                        functionName = function (container, options) {
    						datePickerField(container,options,opts,model)
    					};                		
                	}
                	 template=obj;
                    break;
////				    
//				    
//					//functionName = datePickerField;
//					template= '#= formatDate( '+model.id+' ) #';
//					functionName = function (container, options) {
//						datePickerField(container,options,opts,model)
//					};
//					break;
				case 'timepicker':
					// 사용안함 필요할 경우 별도 추가 

					break;
				case 'button':
					//사용안함, 필요할 경우 별도 추가 
					functionName = '';
					break;
				case 'checkbox':
					
					functionName = edittype.func;
					var funcParams = {};
					funcParams = JSON.stringify(model.typeOption);
					var optsparam= opts
					var obj =  function (container, options) { 
						var params =  funcParams ;
						var optsparam = optsparam;
//						return eval('checkBoxField'+'(container,options,opts,model,params,this);'  ) 
						return  templateWrapper('checkBoxField' , container, options,opts,model,funcParams,this);
					};
					template=obj
					
					// 
					functionName= function (container, options) {
						// 이걸 해야 컨텐츠 박스에 포커스가 감 
//						$(container).parents('.base_grid_table').data('kendoGrid').closeCell();
//						$(container).find('input[type="checkbox"]').prop('checked',false)
					};
					functionName = null
					if(model.typeOption){
					    console.log('a1');
						if(model.typeOption.typeHeader){
							model['headerTemplate'] = checkBoxHeaderField(opts,model);
							model['sortable']= false;
						}
					}
					
					editor= function (container, options) {
						 $(container).parents('.base_grid_table').data('kendoGrid').closeCell();
					};
//					
					break;
				case 'select': 
					var params =  opts.typeValue ;
					var name = (model.typeOption && model.typeOption.textfield? model.typeOption.textfield : model.id);
					
			
					if(gridConfig.exposeField){
						functionName = edittype.func;
						var funcParams = {};
						funcParams = JSON.stringify(model.typeOption);
						var optsparam= opts
						
						var obj =  function (container, options) { 
							var params =  funcParams ; 
							var optsparam = optsparam;
							return  templateWrapper('selectField' , container, options,opts,model,funcParams,this);
						};
						template=obj;
						
						functionName= null;
						// 이걸 해야 컨텐츠 박스에 포커스가 감
						functionName= function (container, options) {
							// 이걸 해야 컨텐츠 박스에 포커스가 감 
							 $(container).parents('.base_grid_table').data('kendoGrid').closeCell();
							 
						};
					} else {
						// 2018.02.13 김진학 - exposeField : false 일 때, 선택되지 않은 select의 값이 설정한 label값과 동일하도록 수정.
						// 2018.06.04 김진학 - exposeField : false 일 때, name에 일치하는 값을 찾지 못해 add 및 append 안되는 문제 수정. 
		                  if(model.typeValue){
		                     template = '#=typeof '+name +' !== "undefined" ? ';
		                     $.each(model.typeValue, function(){
		                        template += name + ' == "' + this.DATA + '"? "' + this.LABEL + '" : '
		                     })
		                     template += ' "" : "" #';
		                  } else
		                     template= '#=  typeof '+name+' !== "undefined" ? ' + name + ' != null ? '+name+' : ""  : "" #';
		                  var obj = function (container, options) {
		                     var params =  opts.typeValue ;
		                     var optsparam = optsparam;
		                     eval('selectField'+'(container,options,opts,model,params,this);'  )
		                  };
		                  functionName= obj
					}
					
					
					
					break;
				case 'gwLineViewlink':
					break;
				case 'gwDocViewlink':
					break;
				case 'file': // (임시 테스트용)
					// functionName = passwordField;
					functionName = edittype.func;
					var funcParams = {};
					funcParams = JSON.stringify(model.typeOption);
					var optsparam= opts
					var obj =  function (container, options) {
						var params =  funcParams ;
						var optsparam = optsparam;
//						return eval('fileField'+'(container,options,opts,model,params,this);'  ) 
						return  templateWrapper('fileField' , container, options,opts,model,funcParams,this);
						
					};
					template=obj;
					
					functionName= null;
					break;
				}
				
				
				editor = functionName;
			} else {
				if (!functionName) {
					functionName = edittype.func;
					var funcParams = {};
					funcParams = JSON.stringify(edittype.param);
					var optsparam= opts
					var obj =  function (container, options) {
						var params =  funcParams ;
						var optsparam = optsparam;
//						return eval(functionName+'(container,options,opts,model,params,this);'  ) 
						return  templateWrapper(functionName , container, options,opts,model,funcParams,this);
					};
					template=obj
					
					
					// 2017.12.27 기능 정지 - 동일 ID 필드에서 에디터 생성됨 
					// 다른 문제점 확인 필요 
//					editor= function (container, options) {
//						 $(container).parents('.base_grid_table').data('kendoGrid').closeCell();
//					};
				}
			}
			
			
			model['template']=template;
			} 
			
			if(!model.attrType ||  model.attrType == '' || model.attrType == 'view'){
				editor = null
			}
			model['editor']= editor
//			return editor;
		}
		
		
		var colModel = function(model){
			/** 
			 *  option이 필요한 항목  
			 *   filterable - 필터가 필요 할 시 
			 *   editable - 수정이 가능한 모드 
			 *   
			 *  aggregate- aggregation시 필요항목은 false, 그룹지어야 할 항목은 true;
			 *		dataSource에서 항목 반영필요     
			 * */
			
//			if (currentObj.hasChild) {
//				return $.extend({}, {
//					'class' : 'parent',
//					'data-lev' : currentObj.LEV
//				}, result)
//			} else{
//				return $.extend({}, {
//					'data-lev' : currentObj.LEV
//				}, result)
//			}
			
			
//			if(model['validation']){
//					var validatecode = "validate";
//					var validatelist = [];  
//					var rules = $.formatEngineRules.allRules;
//					$.each(model['validation'],function(key, obj){
//						if(rules[key]){
//							validatelist.push(key)
//						}
//					} )
//					validatecode += validatelist
//					console.log(validatecode)
//				
//			}
			
//			autoFieldNameChange
			var modelId= model.id;
			if(gridConfig.autoFieldNameChange){
				modelId = CID+'_'+ modelId
			}
			if(model.alias){
				modelId = model.alias 
			}
			
			var column = {
					field: model.id,// create a column bound to the "name" field
				    title: model.name, // set its title to "Name"
				    editor : model.editor? model.editor : null,
				    attributes: {
				          "data-col" : modelId, 
				          // attrType
				          //  - view/readonly/checkbox/popup/dialog :  'view'
				          //  - select(combo) : 'selectable'
				          //  - 기타 나머지 : 'editable'
				          //  - expose true일 때 : 'hide'
				          "tp" : gridConfig.exposeField?"hide":
				        	  (model.attrType == "select")?"selectable":
				        	  (model.attrType == "text"||model.attrType == "number"||
				        			  model.attrType =="textArea"||model.attrType =="textarea"||
				        			  model.attrType =="password"||model.attrType =="datepicker")?"editable":"view",
					      "rd" : modelId,
					      "col" : modelId,
				          "class": "table-cell "+ (model.cssClass? model.cssClass:''),
				          "style": "text-align: "+(model.align? model.align : defaultColOption.align)+ " ; " +
				          "font-size: " + (model.fontSize ? model.fontsize :  defaultColOption.fontsize) +(model.cssStyle? model.cssStyle : '')
			        },
			        format : model.format ? model.format : '', 
//			        format: "{0: yyyy-MM-dd}", 
			        headerAttributes: {
			            class: "table-header-cell",
			            style: "text-align: center; font-size: 11px",
			            "data-col" :  modelId,
			            "rd" : modelId
			        },
			        headerTemplate : model.headerTemplate ? model.headerTemplate :model.name, 
			        width: model.width ? model.width:defaultColOption.width,
			        height: model.height ? model.height: defaultColOption.height,
			        hidden: model.hidden != null? model.hidden:false,
			        locked: model.locked ,	
	        		sortable : model.sortable != null ? model.sortable : defaultColOption.sortable,		
	        		filterable : model.filterable != null ? model.filterable : defaultColOption.filterble,
			        lockable:  model.lockable ? model.lockable:defaultColOption.lockable,
//			        minScreenWidth: 500  //column will become hidden if screen size is less than 500px but hidden option does not work
			        template: model.template ? model.template: null// 템플릿 
//			        values: [ // 이렇게 하면 데이터 값에 따라 표현되는 값이 다름 
//			                 { text: "Beverages", value: 1 },
//			                 { text: "Food", value: 2 }
//			               ],
//			        filterable: { multi:true ,search: true,ui: "datetimepicker" // use Kendo UI DateTimePicker }, //항목들 선택하는 필터 
			};
			
//			
//			var dataSource=  {
//			    data: [
//			      { name: "Jane Doe", age: 30 },
//			      { name: "John Doe", age: 33 }
//			    ],
//			    aggregate: [
//			        { field: "age", aggregate: "min" },
//			        { field: "age", aggregate: "max" }
//			    ]
//			  }
//			
//			
//			
			return column
		}
		
		
		var drawGrid = function(opts) {	
			
			var local = [];
	
			var $gridDom = opts['gridDom'];
			
			var pageSize = datasource.pageSize ;
			
			
			/* 옵션에 따른 강제 설정 */
			
			// crud 일때도 가상화기능 지원이 필요 
			// tree일 경우만 안되게 처리 
			if(opts.type == 'tree'){
				pageSize  = ''
				opts.gridOptions.scrollable = {virtual: false } 
			}
			
			if (opts.groupAggregation) {
				pageSize  = ''
				opts.gridOptions.scrollable = {virtual: false } 
			}
			if (opts.groupAggreMerger){ 
				pageSize  = ''
				opts.gridOptions.scrollable = {virtual: false } 
			}
			if (opts.groupMerger) {
				pageSize  = ''
				opts.gridOptions.scrollable = {virtual: false } 
			}
			
			
			//가상화 기능 사용 안할경우 default 페이지 사이즈 무시 
			if(!opts.gridOptions.scrollable.virtual){
				pageSize  =0;   
			}
			//그럼에도 불구하고 페이지 사이즈를 화면에서 기재할 경우 반영 
			if(opts.gridOptions.pageSize >0){
				pageSize = opts.gridOptions.pageSize;
			}
			
			var dataSource;
			var totalCount;
			if(isSupportServerPaging(opts)){
				//데이터 소스 정리 
				dataSource = new kendo.data.DataSource({
					transport: {
		                read: function(options){
		                	var sentData = opts.param + "&take= " + options.data.take + "&skip= " + options.data.skip
		                	+ "&page= " + options.data.page + "&pageSize= " + options.data.pageSize;  
		                	console.log("dataSource-transport-read-sentData=" + sentData);
		                	 $.ajax({
		                	        url:  opts.url,
		                	        dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
		                	        type : 'POST', 
		    						data : sentData,
		    						cache : false,
		                	        success: function(result) {
		                	          // notify the data source that the request succeeded
		                	          //JSON.stringify(options);
		                	          totalCount = result.total;
		                	          options.success(result.list);
		                	          afterGetData($gridDom,opts,result.list);
		                	        },
		                	        error: function(result) {
		                	          // notify the data source that the request failed
		                	          options.error(result);
		                	        }
		                	      });
		                }
		            },
		            serverPaging: true,
				  schema: {
				    model: opts['schemaModel'],
				    total: function(){
				    	return totalCount;
				    }
				  },data : local
				  ,pageSize: pageSize
//				  ,change :event 
				});
			}
			else{
				dataSource = new kendo.data.DataSource({
				  schema: {
				    model: opts['schemaModel'],
				  },data : local
				  ,pageSize: pageSize
//				  ,change :event
				});
			}
			  
			
			opts['datasource'] = dataSource;

			
			
			
			var grids = $gridDom.kendoGrid({
				autobind:false,
                dataSource: opts['datasource'],
                columns : opts.colModel,
                excel: {
                    allPages: true
                },
                selectable: "multiple cell",
                allowCopy: true,
                excelExport: function(e) {
                    e.workbook.fileName = opts.gridOptions.caption+".xlsx";
                  },
                pdf: {
                	allPages: true
        	    },
                height : opts.gridOptions.height ? opts.gridOptions.height : defaultGridOptions.height,	//
            	allowCopy : opts.gridOptions.allowCopy ? opts.gridOptions.allowCopy : defaultGridOptions.allowCopy,	// 복사 불가능
            	columnMenu : opts.gridOptions.columnMenu ? opts.gridOptions.columnMenu : defaultGridOptions.columnMenu ,	// 열 조작 불가능
            	editable : opts.gridOptions.editable ? opts.gridOptions.editable : defaultGridOptions.editable ,		// 수정 가능
            	filterable : opts.gridOptions.filterable ? opts.gridOptions.filterable : defaultGridOptions.filterable ,	// 필터링 불가능
            	groupable : opts.gridOptions.groupable ? opts.gridOptions.groupable : defaultGridOptions.groupable ,	// 그룹화 불가능
//            	loadonce: true,		// ?
            	mobile : opts.gridOptions.mobile ? opts.gridOptions.mobile : defaultGridOptions.mobile ,		// 모바일 최적화 안 함
            	navigatable : opts.gridOptions.navigatable ? opts.gridOptions.navigatable : defaultGridOptions.navigatable ,	// 키보드 조작 가능
//        			navigatable : false,
            	pageable : opts.gridOptions.pageable ? opts.gridOptions.pageable : defaultGridOptions.pageable ,	// 페이지 구분 없음
            	reorderable : opts.gridOptions.reorderable ? opts.gridOptions.reorderable : defaultGridOptions.reorderable ,	// 열 순서 변경 불가능
            	resizable : opts.gridOptions.resizable ? opts.gridOptions.resizable : defaultGridOptions.resizable ,	// 열 너비 변경 불가능
            	scrollable : opts.gridOptions.scrollable ? opts.gridOptions.scrollable : defaultGridOptions.scrollable ,	// 스크롤 가능
            	selectable : opts.gridOptions.selectable ? opts.gridOptions.selectable : defaultGridOptions.selectable ,	// 행 선택 가능
            	sortable : opts.gridOptions.sortable ? opts.gridOptions.sortable : defaultGridOptions.sortable ,		// 정렬 가능
            	dataBinding : function(a,b,c,d,e) {
//            		
            		
//	            	   optionText ='';
        	   },dataBound : function onDataBound(e) {
        		   
        		  $gridDom.grid_callback_func(opts.boundEvent);
        		  $gridDom.data('boundevent', opts.boundEvent);

        		  if(gridConfig.exposeField){
        			  formChange($gridDom);
        		  }
        		   //그리드 이벤트 별도로 관리  
      			  
      				
      				
      				
      				//  삭제된 데이터 
      			 $gridDom.find('[rd="CRUD"]').each(function(){
      				 var $tr = $(this).closest('tr')
      				 var crud = $tr.getRowData($tr)['CRUD'];
      				 
      				if(crud == 'D'){
      					$tr.addClass('deletedRow');
  						$tr.addClass('prepareRowDelete')
      				} 
      			 })
      				
      				
 		       },edit:function(e){
 		    	   
 		       },
 		     
 		       
            });
			
			 
			
//		var drawGrid = function(opts) {	
			if(!isSupportServerPaging(opts)){
				setTimeout(function(){afterDrawGrid($gridDom,opts)}, 0) 
			}
		}
		
		var afterDrawGrid = function($gridDom,opts) {	
//			console.log("afterDrawGrid is called: $gridDom" + JSON.stringify($gridDom)+ "opts" + JSON.stringify(opts));
			var datas;
			var pageSize = datasource.pageSize ;
			// 데이터 후위 작업 
			if (opts.localData) {
				local = opts.localData;
				datas = opts.localData;
			} else {
				local = [];
				datas = [];
				if(opts.url){
					$.ajax({
						url : opts.url,
						type : 'POST', 
						data : opts.param, 
						async : false,
						cache : false,
						success : function(data, textStatus, jqXHR) {
							if(data){
								if (data.length > 0) {
									if (data.length > maxLength) {
										local = data
										datas = data;
									} else {
										local = data;
										datas = data;
									}
								} else {
									local = [];
									datas = [];
								}
							}
						},
						complete : function() {
							
						}
					});
				}
			}
			
			if($gridDom.length > 0  && $gridDom.getGrid() != null && $gridDom.getGrid() != 'undefined'){
				$gridDom.getGrid().dataSource.data(local)
			}
			afterGetData($gridDom,opts, datas);
		};// end class
		
		
		var afterGetData = function($gridDom,opts, returnedData) {	
//			console.log("afterDrawGrid is called: $gridDom" + JSON.stringify($gridDom)+ "opts" + JSON.stringify(opts));
			var datas;
			var pageSize = datasource.pageSize ;
			
			local = returnedData;
			datas = returnedData;
			
			
			//데이터 사이즈에 따른 버츄얼 기능에 제한 
			if(local.length  < pageSize){
				if(!opts.gridOptions.pageable ? opts.gridOptions.pageable : defaultGridOptions.pageable){
					pageSize  =0;   
					
					$gridDom.getGrid().setOptions({scrollable : {virtual: false }	})
//					opts.gridOptions.scrollable = {virtual: false }	
				}
				 
			}
			var heightAdapt= false;
			if( opts.gridOptions.gridHeightAdapt != null &&  opts.gridOptions.gridHeightAdapt != 'undefined'){
				heightAdapt = opts.gridOptions.gridHeightAdapt
			}else{
				heightAdapt = gridConfig.gridHeightAdapt
			}
			
			if(heightAdapt){
				if(local.length  <= opts.gridOptions.gridHeightAdaptMaxSize){
					var height = defaultColOption.height+ 1; 
					if(local.length <= opts.gridOptions.gridHeightAdaptMinSize){
						$gridDom.getGrid().setOptions({height: height * (opts.gridOptions.gridHeightAdaptMinSize+1)+5 })
					}else{
						$gridDom.getGrid().setOptions({height: height * (local.length+1)+5 })
					}
					 
				}
			}
			
			 
			/* 20160804 yjin1214위치 변경 
			$gridDom.data('callback', opts.callback);
			$gridDom.grid_callback_func(opts.callback);
			addEventField($gridDom)
			$gridDom.addClass('loadComplete');
			*/
		
			
			
			/**Kendo TreeList 는 inline editor 기능을 지원안함. 따라서 별도의 기능 구현을 필요로 하여 사용하지 않기로 결정  */ 
			if(opts.type == 'tree'){
				
				treeset($gridDom)
			
			}
			
			// 합계 기능만 제공 
			if (opts.groupAggregation) {
				// opts.gridOptions.rownumbers
				// ,opts.groupAggregation['avgColumns'] 평균 집계 현재 지원 되지 않음
				// 집계id , rowspan 될 그룹 리스트 , 집계될 컬럼리스트,추후 평균 집계 리스트 , rownum 표시여부
				try{
					groupAggregation($gridDom, opts.groupAggregation['groupColumns'],
					opts.groupAggregation['sumColumns'], '', opts.gridOptions.rownumbers,
					opts.displayState,opts.groupAggregation['footer']);
					
				}catch(e){
					
				}
			}
			// rowspan merge기능과 합계 기능을 제공 
			if (opts.groupAggreMerger){ 
				// opts.gridOptions.rownumbers 
				// ,opts.groupAggregation['avgColumns'] 평균 집계 현재 지원 되지 않음
				// 집계id , rowspan 될 그룹 리스트 , 집계될 컬럼리스트,추후 평균 집계 리스트 , rownum 표시여부
				try{
					groupAggreMerger($gridDom, opts.groupAggreMerger['groupColumns'],
					opts.groupAggreMerger['sumColumns'], '', opts.gridOptions.rownumbers,
					opts.displayState,opts.groupAggreMerger['footer']);
				}catch(e){
					
				} 
			}
			// rowspan merge 기능만 제공 
			if (opts.groupMerger) {
				opts.gridOptions.rownumbers;
				merger($gridDom, opts.groupMerger['groupColumns'],opts.groupMerger['footer']);
			}
			
			//20160804 yjin1214아래의 위치로 이동
			$gridDom.data('opts', opts);
			$gridDom.data('callback', opts.callback);
			$gridDom.grid_callback_func(opts.callback);
			addEventField($gridDom)
			$gridDom.addClass('loadComplete');
			
			
			var showMessage = opts.gridOptions.gridShowMessage !=null  ? opts.gridOptions.gridShowMessage :   gridConfig.gridShowMessage 
			 
			if(showMessage){
				setDataBinderGrid($gridDom,datas)
			}
			
			if(gridConfig.gridLoading){ 
				gridLoadingBarHide($gridDom)
			} 
		};// end class
		
		
		$.fn.setViewGrid.defaults = {
			id : 'grid',
			type : '',
			url : '',
			seq: true,
			data : [],
			colViewNames : [],
			colModelNames : [],
			colAttrTypes : [],
			options : [],
			defaultOptions : {},
			events : [],
			btn : [],
			colGroup:[],
			gridType : 'crudGrid'
		};
		
//		$.fn.setGridEvent = function(){
//			$(this).getGrid();
	
			// 그리드 내부 필드 수정시 변경 (input, select, textarea)
//			$(this).on('change', '.gridEvent', function() {
//				updateRow($(this));
//				$(this).data('bind')
//			});
//		};
	
		
		
	
	})(jQuery);
	
function isSupportServerPaging(opts){
	return (opts.gridOptions.serverPaging && !opts.localData);
}
	
 function editAll(obj) {
	 var $gridDom = $(obj).getViewGrid(); 
        var theGrid = $gridDom.data("kendoGrid");
    $gridDom.find("tbody").find('tr').each(function () {
      var model =  theGrid.dataItem(this);
      kendo.bind(this,model);
    });
//	       $gridDom.focus();
  }


var reGen =function(obj){
	var result;
	if(obj instanceof Array){
		var result={};
		$.each(obj,function(key,ob){
			$.each(ob,function(key,val){
				if(val && val.indexOf('input') > 0){
					var html = $.parseHTML(val);
					ob[key] = $(html).val();
				}else{
					ob[key] = val;
				}
			})
		})
	}
	else{
		var object={}
		var objectVal=obj;
		$.each(obj,function(key,val){
					if(val && val.indexOf('input') > 0){
						var html = $.parseHTML(val);
						object[key] = $(html).val();
					}else{
						object[key] = val;
					}
		})
		result = object;
	}
	return result
}


var treeset = function($gridDom){
	$gridDom.find('td > span.tnode.parent').closest('tr').addClass('parent')
	$gridDom.find('td > span.tnode').each(function(){
		var lev = $(this).data('lev');
		$(this).closest('tr').data('lev',lev)
	})
}

$(document).ready(function() {
	// tree Fold Event (tree grid 클릭 시)
	$(document).on('click', 'div:not(".frozen") >table  tr.parent span.tnode > span', function() {
		var $parent = $(this).parent('span');
		var $node;
		
		$($parent).closest('tr').nextAll().each(function() {
			if ($(this).data('lev') <= $parent.data('lev')) {
				$node = $(this);
				return false;
			}
		})

		if ($parent.hasClass('fold')) {
			$parent.removeClass('fold');

			if ($node) {
				$($parent).closest('tr').nextUntil($node).each(function() {
					if($(this).filter('.hide').data('lev')-1 == $parent.closest('tr').data('lev')){
						$(this).removeClass('hide')
					}
				})
			} else {
				$($parent).closest('tr').nextAll().each(function() {
//					$(this).removeClass('hide')
					if($(this).filter('.hide').data('lev')-1 == $parent.closest('tr').data('lev')){
						$(this).removeClass('hide')
					}
				}) 
			}
		} else {
			$parent.addClass('fold');
			if ($node) { 
				$($parent).closest('tr').nextUntil($node).each(function() {
					$(this).addClass('hide')
						$(this).find('.tnode ').addClass('fold')
//						$(this).trigger('click')
				})
			} else {
				$($parent).closest('tr').nextAll().each(function() {
					$(this).addClass('hide')
						$(this).find('.tnode ').addClass('fold')
				})
			}
		}
		
		
	
	
	treeset($(this).getViewGrid())		
		
		
	})


})

var save = function(obj) {
	obj.parents('form').submit();
}
// 그리드 내용 변경 시
// tr 기준

/**
 * updateRow()
 * 데이터 수정이 일어날 때마다 해당 행의 CRUD를 업데이트하는 함수
 * $.fn.cmpRowLocal() 함수를 호출해 데이터베이스 내용과 현재 내용을 비교하여
 * 수정 사항이 있을 경우 'U', 없을 경우 빈 칸으로 CRUD를 표시한다.  
 */
function updateRow(obj) {
	var $obj;
	var type = chkParamType(obj);
	if(type == 'ELEM' ){
		$obj = $(obj)
	}else if(type == 'JQUERY' ){
		$obj = obj;
	}
	
	var $crud  = $('tr[data-uid="'+$obj.data('uid')+'"]').find('[rd="CRUD"]')
	$obj = $crud.closest('tr') 
	
	if($obj.length > 0 ){
		
		var stat = $crud.getRowData($crud).CRUD;
		if(stat == 'C'){		 
		}else if (stat == 'U'){
			if ($obj.cmpRowAndLocal($obj)) {
				$crud.setData('CRUD', '');
				if(gridConfig.displayStateTemplate){
					$crud.text('')
				}
			}
		}else if (stat == 'D'){
			
		}else{
			if ($obj.cmpRowAndLocal($obj)) {
//				$obj.find('[rd="CRUD"]').setData('CRUD', '');
			} else {
				$crud.setData('CRUD', 'U');
				if(gridConfig.displayStateTemplate){
					$crud.text(displayStateName.u)
				}
			}
		}
	
	}
//	var $gridDom = $obj.getViewGrid();
//	var $grid = $obj.getGrid();
	
//	if()
	
//	if ($stat.val() != 'C') {
//		if (statValue) {
//			$stat.val('');
//			$row.removeClass('updatedRow')
//		} else {
//			$stat.val('U');
//			$row.addClass('updatedRow')
//		}
//	}
	
//	if ($obj.cmpRowAndLocal($obj)) {
//		$obj.find('[rd="CRUD"]').setData('CRUD', '');
//	} else {
//		$obj.find('[rd="CRUD"]').setData('CRUD', 'U');
//	}

}

/**
 * addRow()
 * @param obj
 */
function addRow(obj) {
	// obj가 HTML element인 경우 jQuery object로 타입 캐스팅하고,
	// jQuery object인 경우 그대로 사용
	var $obj;
	if (obj.nodeType) {
		$obj = $(obj);
	} else if (obj.jquery) {
		$obj = obj;
	}
	
	var func = $obj.data('func');
	var type = $obj.data('type');
	var cls = $obj.data('cls');
	var gridTypes = $obj.data('gridtype');
	var url = $obj.data('url');
	var width = $obj.data('width');
	var height = $obj.data('height');
	var dataField = $obj.data('field').split(',');
	var paramStr = $obj.data('param');
	var paramObj = {};
	
	var data = {};
	var $viewGrid = $obj.getViewGrid();
	var grid = $obj.getGrid();
	
//	grid.validateCheck = false;
	// 선택된 행이 있는 경우 선택 행에 대한 정보를 추출해 전송
	var $selected = grid.select();	// $('tr')
	if ($selected.length == 1) {
		var selected = grid.dataItem($selected);
		$.each(dataField, function(i, val) {
			data[val] = selected[val];
		});
	}
	
	

	var rowData;
//

	var sep = '';
	
	// 파라미터 타입이 obj 
//	if(typeof paramStr=='string'){
		
//		$.each(paramStr.split('&'),function(i,obj){
//			paramObj[obj.split("=")[0]] =obj.split("=")[1]  ;  
//			
//		})
//	}else{
//	}
	if(paramStr){
		paramObj = getParamObj(paramStr);
		data =  $.extend(data, paramObj);
		
		
		paramStr='';
		$.each(data,function(key,obj){
			paramStr += key + '='+obj +'&'  
		})
	}
	
	
	
	
	
	
	var row;
	var newRowidx;

	if (type == 'popup') {
		// 구분자 생성
		var sep = '';
		if (paramStr)
			sep = '&';

		// window.open
		/** 변경 요청  yjin1214 2016-04-27 
		 popup open에 height 추가 요청 - 추가완료 keim
		*/
		window.open(url + '?' + paramStr + sep + 'type=' + type+ sep+'cls=' + cls, '_target','height='+height +', width='+width);
		
		
	} else if (type == 'dialog') {
		var $target = generateDialogDom();
		

		
		$.ajax({
			url :url,// CTX+ url, )
			data : $.extend({
				'type' : type
				,'cls' : cls
			}, data),
			cache : false,
			success : function(data, textStatus, jqXHR) {
				// $target.dialog({width:'auto'})
				$target.html(data);
			}
		});
		if (height == 'undefined') {
			height = 700
		}
		if (width == 'undefined') {
			width = 998
		}
		$target.dialog({
			resizable : false,
			width : width,
			height : height,
			modal: true,
			open : function(){$(".ui-dialog").css("box-shadow","#999 5px 5px 5px");},
			close : function() {
				destroyDialogPopup($target);
			}
		});
	} else {

		// / 선택한 Row 값이 있을 경우 선택한 Row 밑으로 삽입 (변경)
		// / -> grid가 tree 일경우 선택Row값이 있을 경우 Row 아래 삽입// 없을 경우 맨처음 삽입
		if (gridTypes == 'tree') {
			//			
			// $rowClone =$preRow.clone()
			// //to-do tree 일경우 삽입시 레벨 정리
//			var added = grid.addRow();
//			grid.select(added);
//			added.find('[rd="CRUD"]').setData('C');

			var $sel = grid.select();
			var idx= 0 ;
			if($sel){
			    var sel_idx = $sel.index(); 
			    var item = grid.dataItem($sel);
			     idx = grid.dataSource.indexOf(item);
			    idx = Math.min(grid.dataSource.total() - 1,idx+1)
			}
		     row = grid.dataSource.add();
		    grid.dataSource.remove(row);
		    grid.dataSource.insert(idx, row);
		    
			var contact = $viewGrid.find('tr[data-uid="' + row.uid + '"]');
//			
			newRowidx = idx;
			grid.select(contact);
			contact.find('[rd="CRUD"]').setData('CRUD','C');
			if(gridConfig.displayStateTemplate){
				contact.find('[rd="CRUD"]').text(displayStateName.c)
			}
//			$rowClone.focus()

		} else {
			// / 선택한 값이 없을 경우 맨 위에 삽입(변경)
			// / -> grid가 tree 가 아닐경우 선택여부와 상관없이 맨위에 삽
			// 맨 처음 Row 는 설정값이므로
			var $sel = grid.select();
			var idx= 0 ;
			
			
			
			if($sel){
			    var sel_idx = $sel.index(); 
			    var item = grid.dataItem($sel);
			     idx = grid.dataSource.indexOf(item);
			    //idx = Math.min(grid.dataSource.total() - 1,idx+1)		
			    //20160805 수정 option createAt가 bottom일때 마지막row에 행추가되게변경
			    try{
			    	if(grid.options.editable.createAt == 'bottom') {
			    			idx = idx+1
		    		} else {
		    		    idx = Math.min(grid.dataSource.total() ,idx+1)
		    		}
			    } catch(e){
			    		idx = Math.min(grid.dataSource.total() ,idx+1)
			    }
			}
			
			if(grid.options.editable.createAt == 'bottom') {
    			idx = grid.dataSource.total()+1
			}
		    row = grid.dataSource.add();
		    grid.dataSource.remove(row);
		    grid.dataSource.insert(idx, row);    
			
		    newRowidx = idx;
			var contact = grid.table.find('tr[data-uid="' + row.uid + '"]');
			
			contact.find('[rd="CRUD"]').setData('CRUD', 'C');
			if(gridConfig.displayStateTemplate){
				contact.find('[rd="CRUD"]').text(displayStateName.c)
			}
			grid.dataSource.sync()

			
			
			
			var data = $viewGrid.getRowData()
			grid.dataSource.data(data)
			
			
			
			$viewGrid.grid_callback_func($viewGrid.data('callback'))
			$viewGrid.grid_callback_func($viewGrid.data('boundevent'))
			if(grid.options.editable.createAt == 'bottom'){
				
			}
			
		}

		initialDom();
	} 
	
	
	
	//변경필요 dialog type일때 newRowidx 에러나서 임시로 수정 20160919 yjin1214
	if (typeof newRowidx !== "undefined") {
		$row = grid.table.find('tr[data-uid="' + grid.dataSource.data()[newRowidx].uid+ '"]')
		
		
		// 180504 김진학 - exposeField = true 이고 validation필드가 없을 때, 무조건 validation에 걸리는 문제 해결
		var inputObjArray = $row.find('td input');
		if(inputObjArray.length > 0) {
			$.each(inputObjArray, function ( index, inputObj ) {
				if ($(inputObj).attr('class').indexOf('validate[') != -1) {
					grid.validateCheck = false;
					return false;
				}
			})
		} else {
			grid.validateCheck = false;
		}
	}else{
		$row="";
	}
	
	return $row;
}


/**
 * deleteRow()
 * 행 삭제 기능
 * 이미 삭제 표시되어있던 행('D')의 경우, 삭제 취소
 * 생성 후 아직 DB에 저장되지 않은 행('C')의 경우, 행 제거
 * 직접 수정이 일어나지 않은 행의 경우(''), 'D' 표시와 함께 클래스명 추가
 * @param {element|jQuery} <tr> or $('tr')
 */
function deleteRow(obj) {
	var $obj;
	if (obj.nodeType) {
		$obj = $(obj);
	} else if (obj.jquery) {
		$obj = obj;
	}
	
	// class=" btn grid ac_click bg_gray ico '+icoCd+' '+btn.classes+'"
	// data-func="'+btn.func+'"
	// data-actType="'+btn.type+'">'+btn.label+'</span>'
	var func = $obj.data('func');
	var type = $obj.data('type');
	var gridTypes = $obj.data('gridtype');

	// onSelect Trigger Event가 동작하지 않아 정상적인 추출이 불가능 (Bug fix 되면 트리거 이벤트로 원복 예정)
//	var gridId = $(obj).parents('h5').parent('div').prop('id');
//	var $grid = $('#' + gridId + ' table#table_' + gridId).jqGrid();
//	var selectedId = $grid.find('tr[aria-selected="true"]').prop('id')
//	var $selectedRow = $grid.find('#' + selectedId);
//	var $stat = $selectedRow.find('td > input.crud')
	
	var grid = $obj.getGrid();
	var $selected = grid.select();	// 선택된 행 반환
	var selected = grid.dataItem($selected);
	//20161013-keim, 상태값 한글표기로 인한 변경 작업 
	//	var stat = $selected.find('td[rd="CRUD"]').text();
	if($selected && $selected.length>0 ){
		
		
		var stat = selected.CRUD;
	
		
		
		// 삭제를 눌렀던 행을 다시 삭제할 경우 삭제 취소
		if (stat == 'D') {
			updateRow($selected);
			$selected.find('td[rd="CRUD"]').setData('CRUD', '');
			if(gridConfig.displayStateTemplate){
				$selected.find('td[rd="CRUD"]').text('')
			}
			$selected.removeClass('deletedRow');
			$selected.removeClass('prepareRowDelete')
			
		}
		// 방금 생성한 행은 아직 데이터베이스에 저장되지 않았으므로 바로 삭제
		else if (stat == 'C') {
			grid.removeRow(grid.select());
				
			$selected.addClass('deletedRow');
			$selected.addClass('prepareRowDelete')
		}
		// 삭제 표시
		else {
			$selected.find('td[rd="CRUD"]').setData('CRUD', 'D');
			if(gridConfig.displayStateTemplate){
				$selected.find('td[rd="CRUD"]').text(displayStateName.d)
			}
			
			$selected.addClass('deletedRow');
			$selected.addClass('prepareRowDelete')
		}
	}else{
		//TO-DO 추후 메시지영역에서 가져와야 함!! 
		alert('삭제할 대상이 없습니다. ')
	}
	// $selectedRow.State
	// $('#table_'+opts.id).trigger('customEvent')
}








var reGen =function(obj){
	var result;
	if(obj instanceof Array){
		var result={};
		$.each(obj,function(key,ob){
			$.each(ob,function(key,val){
				if(val && val.indexOf('input') > 0){
					var html = $.parseHTML(val);
					ob[key] = $(html).val();
				}else{
					ob[key] = val;
				}
			})
		})
	}
	else{
		var object={}
		var objectVal=obj;
		$.each(obj,function(key,val){
					if(val && val.indexOf('input') > 0){
						var html = $.parseHTML(val);
						object[key] = $(html).val();
					}else{
						object[key] = val;
					}
		})
		result = object;
	}
	return result
}



//합계&소계(일반 )
function groupAggregation($grid, GroupCellNames, SumCellNames, AvgCellNames,
		DisplayRownum, displayState ,footer) {
	var mya = $grid.getGrid().dataItems();
	var trs = $grid.getGrid().items();
	var columns = $grid.getIds();
	var length = mya.length;
	var total = {};
	// var initialize
	total['total'] = {};
	if (SumCellNames) {
		if (SumCellNames instanceof Array) {
			$.each(GroupCellNames, function(i, GroupCellName) {
				total[GroupCellName] = {}
				$.each(SumCellNames, function(i, SumCellName) {
					total[GroupCellName][SumCellName] = 0;
				})

			})
			$.each(SumCellNames, function(i, SumCellName) {
					total['total'][SumCellName] = 0; 
			})
		} else {
			total[SumCellNames] = 0;
		}
	}
	for (var i = 0; i < length; i++) {
		
//		var aa = mya[i];
		var before = mya[i]; 
		
		var end;
		var rowSpanTaxCount = 1;
		var loop = 1;
		$.each(GroupCellNames, function(x, GroupCellName) {
			$.each(SumCellNames, function(y, SumCellName) {
				total[GroupCellName][SumCellName] = eval(total[GroupCellName][SumCellName])
						+ eval(removeComma(before[SumCellName]));
				// total['total'][SumCellName] =
				// total['total'][SumCellName]+
				// eval(before[SumCellName]);
			})
		})
		$.each(SumCellNames, function(y, SumCellName) {
			total['total'][SumCellName] = total['total'][SumCellName]
					+ (before[SumCellName] ? eval(removeComma(before[SumCellName])) : 0);
		})
		if(GroupCellNames.length >0){
		
			for (j = i + 1; j <= length; j++) {
				var end = mya[j];
				
				var iter = false;
				var target = [];
				//마지막에 end 값이 없을 경
				if(j== length){
					iter = true;
					 end = mya[j-1];
				}
				$.each(GroupCellNames, function(k, GroupCellName) {
					if (before[GroupCellName] != end[GroupCellName]) {
						if (!iter) { 
							iter = true;
						}
						target.push(GroupCellName);
					} else {
						if (iter) {
							target.push(GroupCellName);
						}
					}
				})
				
				if (!iter) { 
					iter = false;
					rowSpanTaxCount++;
					// $("#" + gridName + "").setCell(mya[j], GroupCellName, '', {
					// display: 'none' });
					loop = rowSpanTaxCount;
					$ .each( GroupCellNames, function(i, GroupCellName) {
						$ .each( SumCellNames, function(i, SumCellName) {
															total[GroupCellName][SumCellName] = eval(total[GroupCellName][SumCellName])
																	+ eval(removeComma(end[SumCellName]));
														})
									})
					$.each(SumCellNames, function(y, SumCellName) {
						total['total'][SumCellName] = total['total'][SumCellName]
								+ eval(removeComma(end[SumCellName]));
					})
				} 
				if (iter) {
					rowSpanTaxCount = 1;
					var $view = $(trs[(i-1+ loop)])
	
					// TO-DO : length Append Algorithm 추가 필요
					var tdLength = $view.find('td').length;
					if (j == length-1) {
						end = mya[j - 1];
					}
					$.each(target, function(y, GroupCellName) {
						$view.after('<tr class="ui-sum " data-target="'+ GroupCellName+ '" ></tr>')
//						if (DisplayRownum) { 
//							$view.next('tr').append('<td style="text-align:right"></td>')
//						}
						$.each(columns, function(idx,key) {
							if(key != undefined){
								if (GroupCellNames.indexOf(key) >= 0) {
									if (GroupCellName == key) {
										$view.next('tr').append('<td style="text-align:center">소계</td>')
//										$view.next('tr').append('<td style= "text-align:right"></td>')
									} else if (GroupCellNames.indexOf(GroupCellName) < GroupCellNames.indexOf(key) ) {
										$view.next('tr').append('<td style="text-align:right"></td>') 
									}
								} else if (SumCellNames.indexOf(key) >= 0) {
									$view.next('tr').append('<td style="text-align:right">'+ addComma(total[GroupCellName][key])+ '</td>')
									total[GroupCellName][key] = 0;
								} else {
									
									if ($view.find('[rd="'+key+'"]').css('display') != 'none') {
										if($view.find('[rd="'+key+'"]').hasClass('k-first')){
											 
										}else{
											$view.next('tr').append('<td style="text-align:right"></td>')
										}
										
									}else{
										$view.next('tr').append('<td style="display:none;text-align:right"></td>')
									}
								}
							}
						})
					})
					i = j - 1;
					break;
				}
				if (j == length-1) {
					end = mya[j - 1];
				}
				// var lengthss = 
				// $("#grid1").find('tr#'+(i+loop)).prevUntil('[data-sep="'+GroupCellName+'"]').filter(':not(.jqgfirstrow)').length
			}
		}else{
			end =mya[length-2];
		}
	}

	for (var i = 0; i < length; i++) {
		var $view = $(trs[(i + 1)])
		$.each(GroupCellNames, function(k, GroupCellName) {

			if (($view.prev('.ui-sum').length == 0 && i != 0) || (k < GroupCellNames.indexOf($view.prev('.ui-sum').data('target')))) {
				// if(($view.prev('.ui-sum[data-target="'+GroupCellName+'"]').length
				// ==0 && i !=0) ){
//				$grid.setCell(mya[i], GroupCellName, '', {display : 'none'});
			} else {
				// var lengths =
				// $view.next('tr.ui-sum').prevUntil('.ui-sum').filter(':not(.jqgfirstrow)').length;
				var lengths = $view.nextUntil('tr.ui-sum[data-target="'+ GroupCellName + '"]').length
//				$("#" + GroupCellName + "_" + mya[i] + "").attr("rowspan", lengths + 1);
				if(k == 0){
				$(trs[i]).addClass('rowspaned')
				}
			}
		})
	}
	var $view = $grid.find('tr:last');
//	var $view = $grid.find('tr:last')
	$view.after('<tr class="ui-sum total" data-target="total" ></tr>')
	var $prev = $grid.find('tr.rowspaned:last'); 
	if($prev.length == 0 )
		$prev = $grid.find('tr:last');
	// count 합수로 변경하여 "합계" 표시 전까지 colgroup
	
//	if(DisplayRownum){
//		$view.next('tr').append('<td style="text-align:right"></td>'); 
//	}
	//오류수정 151007
//	$.each(end, function(key, vals) {
	
	
	
	
	$.each(columns, function(z, vals) {
//		var key =$(this).attr('rd');
		var key =vals;
		if (SumCellNames.indexOf(key) >= 0) {
			$view.next('tr').append('<td style="text-align:right">'+ addComma(total['total'][key]) + '</td>')
		} else {
			
			//오류수정 151007
//			if ($prev.find('[col="'+key+'"]').length > 0 && $prev.find('[col="'+key+'"]').css('display') != 'none'  ) {  
			if ( $prev.find('[rd="'+key+'"]').length > 0 && $prev.find('[rd="'+key+'"]').css('display') != 'none'  ) {  
//				if(DisplayRownum){
//					$view.next('tr').append('<td style="text-align:right"></td>'); 
//				} 
//				if($prev.find('[col="'+key+'"]').hasClass('jqgrid-rownum')){
//					$view.next('tr').append('<td style="text-align:right"></td>'); 
//				}			 
				if ($view.next('tr').find('td').length == 0) {
					
					// rownum 형성 안할시 td 개수 감산 해야됨
					// 로직 현재 없음 , 추후 col 개수 추정해서 colspan 으로 처리
					if(DisplayRownum){
						
					}
					$view.next('tr').append('<td style="text-align:center">합계</td>');
					
				} else{
					$view.next('tr').append('<td style="text-align:right"></td>'); 
					
				}
				
				
			}else{
				$view.next('tr').append('<td style="display:none;text-align:right"></td>');
			}
			
				
				
//			if (displayState || key != 'CRUD') {
//			if ($prev.find('[col="'+key+'"]').css('display') != 'none') {
			//*** 다중 GroupCell 지정 시 합계 컬럼 밀리는 부분 때문에 추가 (GroupCellNames.indexOf(key) >= 0)
			
		}
	})
	if(footer)
	appendFooter($grid)
}






//합계&소계 merge
function groupAggreMerger($grid, GroupCellNames, SumCellNames, AvgCellNames,
		DisplayRownum, displayState,footer) {
	var mya = $grid.getGrid().dataItems();
	var trs = $grid.getGrid().items();
	var columns = $grid.getIds();
	var length = mya.length;
	var total = {};
	// var initialize
	total['total'] = {};
	if (SumCellNames) {
		if (SumCellNames instanceof Array) {
			$.each(GroupCellNames, function(i, GroupCellName) {
				total[GroupCellName] = {}
				$.each(SumCellNames, function(i, SumCellName) {
					total[GroupCellName][SumCellName] = 0;
				})

			})
			$.each(SumCellNames, function(i, SumCellName) {
					total['total'][SumCellName] = 0; 
			})
		} else {
			total[SumCellNames] = 0;
		}
	}
	for (var i = 0; i < length; i++) {
		
//		var aa = mya[i];
		var before = mya[i]; 
		
		var end;
		var rowSpanTaxCount = 1;
		var loop = 1;
		$.each(GroupCellNames, function(x, GroupCellName) {
			$.each(SumCellNames, function(y, SumCellName) {
				total[GroupCellName][SumCellName] = eval(total[GroupCellName][SumCellName])
						+ eval(removeComma(before[SumCellName]));
				// total['total'][SumCellName] =
				// total['total'][SumCellName]+
				// eval(before[SumCellName]);
			})
		})
		$.each(SumCellNames, function(y, SumCellName) {
			total['total'][SumCellName] = total['total'][SumCellName]
					+ (before[SumCellName] ? eval(removeComma(before[SumCellName])) : 0);
		})
		if(GroupCellNames.length >0){
		
			for (j = i + 1; j <= length; j++) {
				var end = mya[j];
				
				var iter = false;
				var target = [];
				//마지막에 end 값이 없을 경
				if(j== length){
					iter = true;
					 end = mya[j-1];
				}
				$.each(GroupCellNames, function(k, GroupCellName) {
					if (before[GroupCellName] != end[GroupCellName]) {
						if (!iter) { 
							iter = true;
						}
						target.push(GroupCellName);
					} else {
						if (iter) {
							target.push(GroupCellName);
						}
					}
				})
				
				if (!iter) { 
					iter = false;
					rowSpanTaxCount++;
					// $("#" + gridName + "").setCell(mya[j], GroupCellName, '', {
					// display: 'none' });
					loop = rowSpanTaxCount;
					$ .each( GroupCellNames, function(i, GroupCellName) {
						$ .each( SumCellNames, function(i, SumCellName) {
															total[GroupCellName][SumCellName] = eval(total[GroupCellName][SumCellName])
																	+ eval(removeComma(end[SumCellName]));
														})
									})
					$.each(SumCellNames, function(y, SumCellName) {
						total['total'][SumCellName] = total['total'][SumCellName]
								+ eval(removeComma(end[SumCellName]));
					})
				} 
				if (iter) {
					rowSpanTaxCount = 1;
					var $view = $(trs[(i-1+ loop)])
	
					// TO-DO : length Append Algorithm 추가 필요
					var tdLength = $view.find('td').length;
					if (j == length-1) {
						end = mya[j - 1];
					}
					$.each(target, function(y, GroupCellName) {
						$view.after('<tr class="ui-sum " data-target="'+ GroupCellName+ '" ></tr>')
//						if (DisplayRownum) { 
//							$view.next('tr').append('<td style="text-align:right"></td>')
//						}
						$.each(columns, function(idx,key) {
							if(key != undefined){
								if (GroupCellNames.indexOf(key) >= 0) {
									if (GroupCellName == key) {
										$view.next('tr').append('<td style="text-align:center">소계</td>')
//										$view.next('tr').append('<td style= "text-align:right"></td>')
									} else if (GroupCellNames.indexOf(GroupCellName) < GroupCellNames.indexOf(key) ) {
										$view.next('tr').append('<td style="text-align:right"></td>') 
									}
								} else if (SumCellNames.indexOf(key) >= 0) {
									$view.next('tr').append('<td style="text-align:right">'+ addComma(total[GroupCellName][key])+ '</td>')
									total[GroupCellName][key] = 0;
								} else {
									
									if ($view.find('[rd="'+key+'"]').css('display') != 'none') {
										if($view.find('[rd="'+key+'"]').hasClass('k-first')){
											 
										}else{
											$view.next('tr').append('<td style="text-align:right"></td>')
										}
										
									}else{
										$view.next('tr').append('<td style="display:none;text-align:right"></td>')
									}
								}
							}
						})
					})
					i = j - 1;
					break;
				}
				if (j == length-1) {
					end = mya[j - 1];
				}
				// var lengthss = 
				// $("#grid1").find('tr#'+(i+loop)).prevUntil('[data-sep="'+GroupCellName+'"]').filter(':not(.jqgfirstrow)').length
			}
		}else{
			end =mya[length-2];
		}
	}

	for (var i = 0; i < length; i++) {
		var $view = $(trs[(i )])
		$.each(GroupCellNames, function(k, GroupCellName) {

			if (($view.prev('.ui-sum').length == 0 && i != 0) || (k < GroupCellNames.indexOf($view.prev('.ui-sum').data('target')))) {
				// if(($view.prev('.ui-sum[data-target="'+GroupCellName+'"]').length
				// ==0 && i !=0) ){
				$(trs[i]).find('td[rd="'+GroupCellName+'"]').css("display", 'none');
			} else {
				// var lengths =
				// $view.next('tr.ui-sum').prevUntil('.ui-sum').filter(':not(.jqgfirstrow)').length;
				var lengths = $view.nextUntil('tr.ui-sum[data-target="'+ GroupCellName + '"]').length
				$(trs[i]).find('td[rd="'+GroupCellName+'"]').attr("rowspan", lengths + 1);
				if(k == 0){ 
				$(trs[i]).addClass('rowspaned')
				}
			}
		})
	}
	var $view = $grid.find('tr:last');
//	var $view = $grid.find('tr:last')
	var $prev = $grid.find('tr.rowspaned:last'); 
	if($prev.length == 0 )
		$prev = $grid.find('tr:last');
	$view.after('<tr class="ui-sum total" data-target="total" ></tr>')
	// count 합수로 변경하여 "합계" 표시 전까지 colgroup
	
//	if(DisplayRownum){
//		$view.next('tr').append('<td style="text-align:right"></td>'); 
//	}
	//오류수정 151007
//	$.each(end, function(key, vals) {
	$.each(columns, function(z, vals) {
//		var key =$(this).attr('rd');
		var key =vals;
		if (SumCellNames.indexOf(key) >= 0) {
			$view.next('tr').append('<td style="text-align:right">'+ addComma(total['total'][key]) + '</td>')
		} else {
			
			//오류수정 151007
//			if ($prev.find('[col="'+key+'"]').length > 0 && $prev.find('[col="'+key+'"]').css('display') != 'none'  ) {  
			if ( $prev.find('[rd="'+key+'"]').length > 0 && $prev.find('[rd="'+key+'"]').css('display') != 'none'  ) {  
//				if(DisplayRownum){
//					$view.next('tr').append('<td style="text-align:right"></td>'); 
//				} 
//				if($prev.find('[col="'+key+'"]').hasClass('jqgrid-rownum')){
//					$view.next('tr').append('<td style="text-align:right"></td>'); 
//				}			 
				if ($view.next('tr').find('td').length == 0) {
					
					// rownum 형성 안할시 td 개수 감산 해야됨
					// 로직 현재 없음 , 추후 col 개수 추정해서 colspan 으로 처리
//					if(DisplayRownum){
//						
//					}
					$view.next('tr').append('<td style="text-align:center">합계</td>');
					
				} else{
					$view.next('tr').append('<td style="text-align:right"></td>'); 
					
				}
				
				
			}else{
				$view.next('tr').append('<td style="display:none;text-align:right"></td>');
			}
			
				
				
//			if (displayState || key != 'CRUD') {
//			if ($prev.find('[col="'+key+'"]').css('display') != 'none') {
			//*** 다중 GroupCell 지정 시 합계 컬럼 밀리는 부분 때문에 추가 (GroupCellNames.indexOf(key) >= 0)
			
		}
	})
	if(footer)
	appendFooter($grid)
}
function appendFooter($grid){ 
	$grid.after('<div class="ui-sum-total-footer"></div>')
	var $footer = $grid.next('.ui-sum-total-footer');
	$footer.css('padding-right','17px');
	$footer.append('<table></table>')
	var $table = $footer.find('table')
	$table.append($grid.find('colGroup:first').clone())
	$table.append($grid.find('tr:last').clone().clone())
//	$footer.append($('.k-resize-handle').clone())
	
}
function merger($grid, CellNames) {
	var mya = $grid.getGrid().dataItems();
	var trs = $grid.getGrid().items();
	var length = mya.length;
	var cnt = 0;
		cnt= 0;
		// i는 마지막 전데이터까지 이어야 함~ 
		// i== j  비교 이므로 j = data.length 임
		for (var i = cnt; i < length-1; i++) {
			var before = mya[i];
			var rowSpanTaxCount = 1;
			var loops = length;
			$.each(CellNames, function(k,CellName){
				for (j = i+ 1; j < i+loops; j++) {
					
					var end = mya[j];
					//20160520 yjin1214 수정 - 20160520 keim 확인
					if(end!=undefined){
						if (before[CellName] == end[CellName]) {
							rowSpanTaxCount++;
							$(trs[j]).find('td[rd="'+CellName+'"]').css('display','none');
	//						$grid.setCell(mya[j], CellName, '', {display : 'none'});
						} else {
							cnt = j;
							loops= rowSpanTaxCount;
							break; 
						}
					}else{
						cnt = j;
						loops= rowSpanTaxCount;
						break; 
					}
				}
				if(rowSpanTaxCount > 1){
					//$("#" + CellName + "_" + mya[i] + "").attr("rowspan", rowSpanTaxCount);
					$(trs[i]).find('td[rd="'+CellName+'"]').attr("rowspan", rowSpanTaxCount);
					loops= rowSpanTaxCount;
					rowSpanTaxCount = 1;
				}
			})
			loops = length;
		}
}

//2.엑셀다운로드 호출
function excel(obj) {
	alert('excel 출력시 수정된 내용은 반영되지 않습니다. ')
	$(obj).getGrid().saveAsExcel();
}


/////////////////////////////////////////////// 그리드 이벤트 부분 
var formChange= function($grid){
	$grid.find('.k-type-number').kendoNumericTextBox(); 
}

var addEventField = function($grid){
	
	
	//select box
	$grid.on('change','div.k-grid-content  td select',function(){
		
		var typeOption = getParamObj($(this).data('typeoption'));
		var typeValue = getParamObj($(this).find('option:selected').data('typevalue'));
		
		var textfield = '';
		var codefield = ''; 
		if(typeOption){
			textfield = typeOption.textfield,
			codefield = typeOption.codefield;
		}
		var $tr = $(this).closest('tr');
		var dataItem = $tr.getRowData($tr)
		
		
		$.each(dataItem,function(key,val){
			if(typeof val == 'string' && key != 'uid' ){
				dataItem.set(key, val);
			}
		})
		if(textfield){
//			dataItem.set(textfield, typeValue.LABEL);
			dataItem[textfield] =  typeValue.LABEL;
			$tr.find('[rd="'+textfield+'"]').datas(typeValue.LABEL)
		}
		if(codefield){
//			dataItem.set(codefield, typeValue.DATA);
			dataItem[codefield] =  typeValue.DATA;
			$tr.find('[rd="'+codefield+'"]').datas(typeValue.DATA)
		}
		
		
		updateRow($tr);
	});
	//유진 요구에 의한 수정 -  0627
//	$grid.on('change','div.k-grid-content  td input[type="checkbox"]',function(){
//		var $target = $(this).siblings('input[type="checkbox"]');
//		
//		if($(this).prop('checked')){
//			$target.prop('checked',false);
//		}else{ 
//			$target.prop('checked',true);
//		}
//		updateRow($(this));
//	});
	
	//즉시 validation 및 데이터 바인드 
	$grid.on('focusout','div.k-grid-content td input[type="text"],div.k-grid-content td textarea',function(){
//		var $target = $(this).siblings('input[type="checkbox"]');
		  var $tr = $(this).closest('tr');
	      var grid = $(this).closest('tr').getGrid();
	      var field = $(this).attr('name');
	      if(gridConfig.autoFieldNameChange){
	    	  field = field.replace($tr.getViewGrid().parents('.grid_target').data('cid')+'_','');
	      }
	      
	      var val = $(this).val()
	      if(this.hasAttribute('readonly')){
			return false;
	      }
	      if(this.hasAttribute('fpattern')){
	    	  
	    	  $(this).expressionEngine('fieldDetValue');
	    	  val = $(this).val()
	    	  $(this).expressionEngine('fieldAttValue');
	      }
	      
	      dataItem = $tr.getRowData($tr);
	      if(val != null && val != 'undefined'){
	    	  dataItem[field] = val ; 
	      }
		 
	      updateRow($tr);
	});
	///전체 체크 이벤트 
	$grid.on('change','input[type="checkbox"].check_all',function(){
		var modelId = $(this).data('field');
		var stat  ;
		if($(this).prop('checked')){
			stat='Y';
		}else{
			stat='N';
		}
		
		$(this).parents('.base_grid_table').setAllData(modelId ,stat );
		
	});
	///그리드 내 checkbox 기본 동작 
	$grid.on("change",'div.k-grid-content  td input[type="checkbox"].aint.toggle', function (e) {
//        $(e.target).closest("tr").toggleClass("k-state-selected");
	    var $tr = $(this).closest('tr');
        var grid = $(this).closest('tr').getGrid();
      	var field = $(this).attr('name')
      	if(gridConfig.autoFieldNameChange){
    	  field = field.replace($tr.getViewGrid().parents('.grid_target').data('cid')+'_','')
      	}
      	var val = ($(this).is(':checked') ? $(this).data('checked') : $(this).data('unchecked'))
      	if(this.hasAttribute('readonly')){
			return false;
		}
        dataItem = $tr.getRowData($tr);

        dataItem[field] = String(val) ; 
        //그리드의 선택 기능은 update를 하지 않는다
        if(field != 'CHK'){ 
        	updateRow($tr); 
        }
   });
	
	
	
	 
}
