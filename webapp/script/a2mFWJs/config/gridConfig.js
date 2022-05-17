//gridOptions
var defaultGridOptions = {
	allowCopy: false,	// 복사 불가능
	columnMenu: false,	// 열 조작 불가능
	//editable: { confirmation : '삭제하시겠습니까?', createAt: 'top'},	- 각 페이지 마다 개별적으로 쓰길 바람, 공통으로 처리 안됨 
	editable: true,		// 수정 가능
	filterable: false,	// 필터링 불가능
	groupable: false,	// 그룹화 불가능
//	loadonce: true,		// ?
	mobile: false,		// 모바일 최적화 안 함 
	pageable: false,	// 페이지 구분 없음
	serverPaging: { // 공통옵션으로 쓰지 말고, 되도록 해당 그리드에만 적용하기
		enable : false,
//		datafield : 'list',
//		totalfield : 'total',
//		pageSize : 30
	},
	reorderable: false,	// 열 순서 변경 불가능
	resizable: true,	// 열 너비 변경 불가능 
	navigatable : true,
	scrollable:  {
        virtual: true 
    },	// 스크롤 가능
	selectable: true,	// 행 선택 가능
	sortable: true,		// 정렬 가능
	height: 900,
	gridHeightAdaptMinSize : 3, // 최소사이즈 , GridDatasize < gridHeightAdaptMinSize then gridHeightAdaptMinSize*Colheight else adapt ; 
	gridHeightAdaptMaxSize : 7 // 조건발동식, GridDatasize < gridHeightAdaptMaxSize then adapt else fixed height ;
}; 

//column 기본 옵션 
/** 
 * 우선순위 
 * defaultColOption < defaultOptions < colModel
 */
var defaultColOption = {  
	width: 200,
	height: 30,
	fontsize: '11px',
	align : 'center',
	sortable: true, 
	locked: false,
	filterable: false,
	lockable: false
};
var setDataBinderGrid = function($target,datas) {
//	$target.parents('#detail-content').find('.search-form-wrap .total-wrap span.num strong').text( datas.length);

	if(datas.length <= 1){
		$target.parents('#detail-content').find('.search-form-wrap .total-wrap span.num').html( 'Total <strong>'+datas.length+'</strong> row');

	}else{
		$target.parents('#detail-content').find('.search-form-wrap .total-wrap span.num').html( 'Total <strong>'+datas.length+'</strong> rows');
		
	}

}

var setDataBinderGridWithPage = function($target,length) {
	var $grid_message = $target.parents('div.grid_target').find('#grid_message');
	var message = ' (총 ' + length + '건)';
	$grid_message.text(message); 
}
// 30 이하로 사용하지 마세요~ 
var datasource={};datasource['pageSize'] = 30;

var gridConfig = {
		
//그리드에 텍스트박스 표시여부 
//그리드 타입이 crud,tree 일때만 동작
		exposeField:true, 
		
//그리드필드명 자동변환 
autoFieldNameChange: false,
//그리드상태표시 한글 사용여부 
displayStateTemplate:true,
//로딩바 사용여부
gridLoading:true,
//그리드메시지 표시여부 
gridShowMessage:true ,
//그리드 높이 자동조절 기능 사용여부 
gridHeightAdapt : false


// 


}
var displayStateName = {
		c:'추가',
		u:'수정',
		d:'삭제'
}





