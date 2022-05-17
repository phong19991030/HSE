/****************************************************************************
 * 설명 		 : 정확한 소수점 계산을 위한 함수
 * 				get point number calculate
 * date 	 : 2015-11-24
 * author	 : cmk
 * 
 * parameter :  
 * e.g, 	 : 
 ****************************************************************************/
//var getMultiPtNum = function(num){
var truncNum = function(num){
	
	var T = Number('1e'+16);
	
	return Math.round(eval(num)* T )/ T;
};



/****************************************************************************
 * 설명 		 : 최신 환율 목록 정보
 * date 	 : 2015-07-03
 * author	 : cmk
 * 
 * parameter : obj : 대상의 id값
 * e.g, 	 : getListExchange('BASIC_RATE'); 
 ****************************************************************************/
var getListExchange = function(str){
	
	$.ajax({
		url:CTX+'/btm/btm_0204/01/getListExchange.ajax',
		type:'post',
		cache:false,
		success:function(data,textStatus, jqXHR){
			if(data){
// 				A.BASIC_DATE, 
// 				A.CURR_CD CURR_CLS_CD, 
// 				A.BASIC_RATE
				
				$('#'+str).val(data.BASIC_RATE);
			}
		}
	});
};






/****************************************************************************
 * 설명 		 : 출장신청 마스터 조회
 * date 	 : 2015-06-29
 * author	 : cmk
 * 
 * parameter : 
 * e.g, 	 : 
 ****************************************************************************/
var searchBtmMst = function (key){
	
	var param = $('#'+key).val();
	
	if(param != null && param != ''){
		$.ajax({
			url:CTX+'/btm/btm_0202/01/getBtmMst.ajax',
			type:'post',
			cache:false,
			data:{'RQST_NO': param},
			success:function(data, textStatus, jqXHR){
				if(data){
					$.each(data, function(i, obj){
						$('[name="main\\.'+i+'"]').val(obj);
						$('[id="main\\.'+i+'"]').val(obj);
					});
				}
			}
		});
	}
};



/****************************************************************************
 * 설명 		 : 출장자 조회
 * date 	 : 2015-06-29
 * author	 : cmk
 * 
 * parameter : 
 * e.g, 	 : 
 ****************************************************************************/
var searchBtmEmp = function (key){
	if( $('#'+key).val()!=""){
		
		var param = $('#'+key).val();
		
		$.ajax({
			url:CTX+'/btm/btm_0202/01/getBtmEmp.ajax',
			type:'post',
			cache:false,
			data:'RQST_NO='+param,
			data:'TRP_CLS_CD='+$('#main\\.TRP_CLS_CD').val()+'RQST_NO='+param,
//			data:'RQST_NO='+$('#main\\.RQST_NO').val()+'&TRP_CLS_CD='+$('#main\\.TRP_CLS_CD').val(),
			success:function(data, textStatus, jqXHR){
				if(data){
					$.each(data, function(i, obj){
						$('[name="emp.'+i+'"]').val(obj);
					});
				}
			}
		});
	}
};



/****************************************************************************
 * 설명 		 : jq선택자가 NaN일 경우 0을 반환, 아닐 경우 eval(value) 반환
 * date 	 : 2015-07-06
 * author	 : cmk
 * 
 * parameter : jqName 
 * e.g, 	 : nanToZero('main\\.AMT') 
 ****************************************************************************/
//
var nanToZero = function(jqName){
	
	var val = $('#'+jqName).val();
	var $target = 0;
	if(val != null && val != ''){
		$target = eval( val.replace(/,/g, '') );
	}
	
	return isNaN($target)?0:$target;
};

var nanToZero2 = function(val){
	
	var $target = 0;
	
	if (val != 'undefined' && val != null){
		$target = eval( val.replace(/,/g, '') );
	}
	return isNaN($target)?0:$target;
};



/****************************************************************************
 * 설명 		 : 출장비 총 합계 설정
 * date 	 : 2015-07-08
 * author	 : cmk
 * 
 * parameter : 
 * e.g, 	 : var tot_amt = getBtmTotAmt('emp')
 ****************************************************************************/
var getBtmTotAmt = function (kind){
	//출장비 합계 = 일비+식비+숙박비+항공료+기타경비(비자발급+여권발급+예방주사+가지급금+정액비+기타)
	//*************************** 기타경비에 속하는 금액들
	//항공료		
	var air   = nanToZero(kind+'AIR_AMT');
	//비자발급수수료
	var visa   = nanToZero(kind+'VISA_AMT');
	//여권발급수수료
	var passpt = nanToZero(kind+'PASSPT_AMT');
	//예방주사료
	var vacc   = nanToZero(kind+'VACC_AMT');
	//가지급금
	var pre    = nanToZero(kind+'PRE_AMT');
	//정액비
	var fix    = nanToZero(kind+'FIX_AMT');
	//기타
	var etc    = nanToZero(kind+'ETC_AMT'); 
	//기타경비소계
	var etc_tot_amt  = visa + passpt + vacc + pre + fix + etc;
	$('#'+kind+'ETC_TOT_AMT').val(etc_tot_amt);
	
	//*************************** 소계
	//항공료소계
	var air_tot_amt  = (air==null||air=='')?0:air;
	$('input').filter('[data-alias="AIR_TOT_AMT"]').val(air_tot_amt);
	
	//일비소계
	var il_tot_amt   = nanToZero(kind+'IL_TOT_AMT');
	$('#'+kind+'IL_TOT_AMT').val(il_tot_amt);
	
	//숙박비소계
	var lodg_tot_amt = nanToZero(kind+'LODG_TOT_AMT');
	$('#'+kind+'LODG_TOT_AMT').val(lodg_tot_amt);
	
	//식비소계
	var food_tot_amt = nanToZero(kind+'FOOD_TOT_AMT');
	$('#'+kind+'FOOD_TOT_AMT').val(food_tot_amt);
	
	//총계 : 항공료소계 + 일비소계 + 숙박비소계 + 식비소계 + 기타경비소계
	var tot_amt = eval(parseFloat(air_tot_amt + il_tot_amt + lodg_tot_amt + food_tot_amt + etc_tot_amt ).toFixed(2));
	  
	$('#'+kind+'TOT_AMT').val(tot_amt);
	
	return tot_amt;
};




//그리드 특정 컬럼의 합계 리턴
function fGridSum(gridId, colNm){
	var sumAmt = 0; 
	
	//var gridVal = 0;
	$('#'+gridId).find('td[col="'+colNm+'"]').each(function(i, val){
		var num = eval($(this).find('input').val()); // 값
		
		if(num == null || num == ''){
			num = 0;
		}
		
		sumAmt += num;
	});
	
	return sumAmt;
}


/****************************************************************************
 * 설명 		 : 그리드에서 출장 박, 일, 일비소계, 숙박비소계, 식비소계 설정 
 * date 	 : 2015-07-08
 * author	 : cmk
 * 
 * parameter : 
 * e.g, 	 : 
 ****************************************************************************/
var gridBtmCalc = function($tr, kind){
	
	//variable object
	var data = {
		'frm_dt':0, 'to_dt':0, 'days':0, 'bags':0,
		'frgn_il_amt':$tr.find('[col="FRGN_IL_AMT"] input').val(),
		'frgn_food_amt':$tr.find('[col="FRGN_FOOD_AMT"] input').val(),
		'frgn_lodg_amt':$tr.find('[col="FRGN_LODG_AMT"] input').val()
	};
	var rate = ''; //환율
	var il_tot_amt = 0;
	var food_tot_amt = 0;
	var lodg_tot_amt = 0;
	
	data.frm_dt = $tr.find('[col="FRM_DT"] input').val(); //시작일자
	data.to_dt = $tr.find('[col="TO_DT"] input').val(); //종료일자
	
	//박, 일수 계산
	if(data.frm_dt.length == 8 && data.to_dt.length == 8){
		
		data.days = getDateDiff(data.frm_dt, data.to_dt);
		
		if(eval(data.days) <= 1){
			data.bags = 0;
		}else{
			data.bags = data.days-1;
		}
		
		$tr.find('[col=BAGS] input').val(data.bags); // 박
		$tr.find('[col=DAYS] input').val(data.days); //일
	}
	
	//일비, 식비, 숙박비 소계 계산 
	if($tr.find('[col="NTN_CD"] input').val() != '' && eval(data.days) > 0){
		
		//환율(,문자 제거)
		if(kind == 'CHG'){
			rate = $('input').filter('[data-alias="CHG_EXCHNG_RATE"]').val().replace(/,/g, '');
			//var rate = $('#emp\\.EXCHNG_RATE').val().replace(/,/g, '');

			//전체 일비 소계
			il_tot_amt = fGridSum2('FRGN_IL_TOT_AMT') * eval(rate);
			food_tot_amt = fGridSum2('FRGN_FOOD_TOT_AMT') * eval(rate);
			lodg_tot_amt = fGridSum2('FRGN_LODG_TOT_AMT') * eval(rate);
		}else{
			//국가별 일비 소계 (일비 = 일 * 일별 일비)
			$tr.find('[col="FRGN_IL_TOT_AMT"] input').val(eval(data.days)*eval(data.frgn_il_amt));   
			//국가별 식비 소계 (식비 = 일 * 일별 식비)
			$tr.find('[col="FRGN_FOOD_TOT_AMT"] input').val(eval(data.days)*eval(data.frgn_food_amt));   
			//국가별 숙박비 소계 (숙박비 = 박 * 일별 숙박비)
			$tr.find('[col="FRGN_LODG_TOT_AMT"] input').val(eval(data.bags)*eval(data.frgn_lodg_amt));
			rate = $('input').filter('[data-alias="EXCHNG_RATE"]').val().replace(/,/g, '');

			//전체 일비 소계
			il_tot_amt   = fGridSum('table_popup_grid1', 'FRGN_IL_TOT_AMT') * eval(rate);
			food_tot_amt = fGridSum('table_popup_grid1', 'FRGN_FOOD_TOT_AMT') * eval(rate);
			lodg_tot_amt = fGridSum('table_popup_grid1', 'FRGN_LODG_TOT_AMT') * eval(rate);
			
			
		}
		
		il_tot_amt   = eval(parseFloat(il_tot_amt).toFixed(2));
		food_tot_amt = eval(parseFloat(food_tot_amt).toFixed(2));
		lodg_tot_amt = eval(parseFloat(lodg_tot_amt).toFixed(2));
		
		if(kind == 'CHG'){
			$('input').filter('[data-alias="CHG_IL_TOT_AMT"]').val(il_tot_amt);
			$('input').filter('[data-alias="CHG_FOOD_TOT_AMT"]').val(food_tot_amt);
			$('input').filter('[data-alias="CHG_LODG_TOT_AMT"]').val(lodg_tot_amt);
		}else{
			$('input').filter('[data-alias="IL_TOT_AMT"]').val(il_tot_amt);
			$('input').filter('[data-alias="FOOD_TOT_AMT"]').val(food_tot_amt);
			$('input').filter('[data-alias="LODG_TOT_AMT"]').val(lodg_tot_amt);
		}
		
		//출장비 합계 계산
		doTotalSum();
	}
};



