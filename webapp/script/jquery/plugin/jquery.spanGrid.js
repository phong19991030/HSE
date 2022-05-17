
/**
 * For jqgrid rowSpan
 * 
 * 사용법 : $("#그리드아이디").sgTableRowSpan([컬럼인덱스1, 컬럼인덱스2...]);//그리드 컬럼 인덱스는 0부터
 * 
 * 주의 : 그리드가 로드된 후에 호출하는 것을 추천
 * 개선 : td별로 tr을 반복탐색 -> tr별로 td를 탐색
 **/
jQuery.fn.sgTableRowSpan = function(colInxs) {
    return this.each(function() {
		//0) 초기화
		var rowspan_cols = new Array();
        //1) grid의 tr탐색
        $('tbody tr', this).each(function(row_index) {
        	//2) tr의 td(컬럼) 탐색 - colInxs에 지정된 컬럼만
        	for (var i = 0; i < colInxs.length; i++) {
        		var rowspan_count = 1;
                $('td:eq(' + colInxs[i] + ')', this).each(function(column_index) {
                	//2-1) rowspan으로 숨겨질 컬럼인 경우(rowspan대상컬럼과 값이 같은)
                    if (rowspan_cols[i] != null && $(this).html() == $(rowspan_cols[i]).html()) {
                        rowspan_count = $(rowspan_cols[i]).attr("rowSpan");
                        if(rowspan_count == undefined)  rowspan_count = 1;
                        rowspan_count = Number(rowspan_count) + 1;
                        $(rowspan_cols[i]).attr("rowSpan", rowspan_count);//rowspan대상 컬럼의 rowSpan속성 업데이트
                        $(this).css("display","none");//현재 컬럼은 숨김
                    } else {//처음이거나 이전과 다른 컬럼이면 새로운 rowspan대상 컬럼
                        rowspan_cols[i] = this;
                    }
                });
        	}
        });
    });
};



jQuery.fn.sgTableRowSpan_old = function(colIndexs) {
    return this.each(function() {
        //var indexs = eval("([" + colIndexs + "])");
        for (var i = 0; i < colIndexs.length; i++) {
        	
            var colIdx = colIndexs[i];
            var that;
            var rowspan = 1;//초기화 시켜고 undefined확인 로직 제거
            $('tbody tr', this).each(function(row) {
            	//$('td:eq(' + colIdx + ')', this).filter(':visible').each(function(col) { //속도저하로 filter제거
                $('td:eq(' + colIdx + ')', this).each(function(col) {
                    if (that != null && $(this).html() == $(that).html()) {
                        rowspan = $(that).attr("rowSpan");
                       /* if (rowspan == undefined) {

                            $(that).attr("rowSpan", 1);
                            rowspan = $(that).attr("rowSpan");
                        }*/
                        rowspan = Number(rowspan) + 1;
                        $(that).attr("rowSpan", rowspan); // do your action for the colSpan cell here
                        //$(this).remove(); // .hide(); // do your action for the old cell here
                        $(this).css("display","none");
                    } else {
                        that = this;
                    }
                    // that = (that == null) ? this : that; // set the that if not already set
                });

            });
        }
    });
};