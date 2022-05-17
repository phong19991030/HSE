  
var getEgYn = "";

// 그리드의 colNm의 합계를 구하여 prefix+targetNm에 데이터 셋팅
function fGridNotDelSum(gridId, preFix, targetNm, colNm){
	//var gridData = $('#'+gridId);
	var sumAmt = 0;
	
	$.each($('#'+gridId).getDataIDs(),function(i,ind){
		var obj = $('#'+gridId).getRowData(ind);
		sumAmt = eval(sumAmt) + eval(obj[colNm].replace(/,/g, ''));
	});
	
	$('#'+preFix+'\\.'+targetNm).val(sumAmt);
	
}

//그리드 특정 컬럼의 합계 리턴
function fAcmGridSum(gridId, colNm){
	var sumAmt = 0; 
	
	//var gridVal = 0;
	$('#'+gridId).find('td[col="'+colNm+'"]').each(function(i, val){ 
		var thisVal = Number(acmNullToZero($(this).find('input').val()));
		if(thisVal == ''){
			thisVal = 0;
		}
		sumAmt = sumAmt + thisVal; // 값
	});
	/*$('#'+gridId).each(function(i, val){ 	 
		var rowData = $('#'+gridId).getRowData(i+1); // grid row별 data
		
		$.each(rowData, function(key, vals) {
			if(key == colNm){
				sumAmt = sumAmt + $(vals).val();
			}
		});
	});*/
	
	return sumAmt;
}

//그리드 특정 컬럼의 합계 리턴(input 태그가 없을경우)
function fAcmGridSumNotInput(gridId, colNm){
	var sumAmt = 0; 
	
	//var gridVal = 0;
	$('#'+gridId).find('td[col="'+colNm+'"]').each(function(i, val){ 	 
		sumAmt = sumAmt + Number(acmNullToZero($(this).text())); // 값
	});
	/*$('#'+gridId).each(function(i, val){ 	 
		var rowData = $('#'+gridId).getRowData(i+1); // grid row별 data
		
		$.each(rowData, function(key, vals) {
			if(key == colNm){
				sumAmt = sumAmt + $(vals).val();
			}
		});
	});*/
	
	return sumAmt;
}

// 공백을 0으로 변환
function nullToString(preFix, tagetNm, defaultVal){
	if($('#'+preFix+'\\.'+tagetNm).val() == null || $('#'+preFix+'\\.'+tagetNm).val() == ''){
		$('#'+preFix+'\\.'+tagetNm).val(defaultVal);
	}
}


//부가세 구분에서 계산서,세금계산서 구분
function fGetVatClsYn(vatCls){
	
	var vatYn = false;
	$.ajax({
		url:CTX+'/acm/acm_0000/getVatClsYn.ajax',
		dataType:'json',
		type:'post',
// 		data:'${param}',
		//data:'APRQ_NO='+$('#sub\\.APRQ_NO').val()+'&RQST_NO='+$('#sub\\.RQST_NO').val(),
		data:{},
		cache:false,
		async:false,		
		success:function(data, textStatus, jqXHR){
			if(data){
				//$.each(data, function(key, val){
					var getCommCd = data.COMM_CD; 
					var getRefCd  = data.REF_CD;
					getEgYn   = data.EG_YN;
					var getDtitype = data.DTI_TYPE;
				
					getSplitCd = getCommCd.split("@@");			
					getSplitRef = getRefCd.split("@@");			
					getSplitEgYn = getEgYn.split("@@");
					getSplitDtitype = getDtitype.split("@@");
					
					for(var i=0; i<getSplitCd.length; i++){
						if(vatCls==getSplitCd[i]){
							getEgYn = getSplitEgYn[i];
							
							if(getSplitRef[i]=='Y'){								
								vatYn = true;
								
							}
							break;
						}
					}
					
				//});
			}
			
		}

	});
	
	return vatYn;
}


//테이블 데이터 금액 콤마 제거 후 금액 리턴(공백일 경우 0으로 리턴)
var acmNullToZero = function(amt){
	//var val = $('#'+jqName).val();
	var val = eval( amt.replace(/,/g, '') );
	
	return isNaN(val)?0:val;
};

//테이블 데이터 금액이 0일 경우 공백으로 리턴
var acmZeroToNull = function(amt){
	if(amt == '0'){
		amt = '';
	}
	return amt;
};


/*
기    능 : 계좌,은행,수령인 등등의 정보
파라미터 : gbn		: 구분
		 nm			: 이름
		 cd			: 코드값
*/
function fGetBkAcct(crdtorCls,cd,nm,ptmCls,regNo){
	
}





// 마감기간 설정 안내 팝업
function acmSlipDeadLineCheck(){
	$.ajax({
		url:CTX+'/acm/acm_0000/getTnacSlipDeadLine.ajax',
		dataType:'json',
		type:'post',
		cache:false,
		async:false,		
		success:function(data, textStatus, jqXHR){
			if(data.CNT > 0){
				var url = CTX + "/common/popup/controls";
				var param = "SET_FRM_DT="+data.SET_FRM_DT+"&SET_TO_DT="+data.SET_TO_DT;
				param = param + "&cls=acmSlipDeadLineNotice&type=popup";
				window.open(url + "?" + param, "acmNotice", "width=500, height=150, resizeable=no");
			}
		}
	});
}

