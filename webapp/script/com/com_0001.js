function com0001() {
	onSearch();
	
	getPaymentCnt();
	getMenuPaymentLst();
}

function getPaymentCnt(){
	var param = {};
	var data = _sys.mariaDB.getData(CTX + '/com/com_0001/getPaymentCnt.ajax', param);
	
	if(data){
//		$("#id_cnt_payment_new").html(data.CNT1);
//		$("#id_cnt_payment_review").html(data.CNT2);
//		$("#id_cnt_payment_approved").html(data.CNT3);
		
//		
		$("#id_div_cnt_payment_new").append(drawBadgeCnt(data.CNT1))
		$("#id_div_cnt_payment_review").append(drawBadgeCnt(data.CNT2))
		$("#id_div_cnt_payment_approved").append(drawBadgeCnt(data.CNT3))
		
		
		
		$("#id_cnt_all_payment").html(data.CNT);
//		$("#id_cnt_new_stt_payment").html(parseInt(data.CNT1) + parseInt(data.CNT2) + parseInt(data.CNT3));
		$("#id_div_cnt_new_stt_payment").append(drawBadgeCnt(parseInt(data.CNT1) + parseInt(data.CNT2) + parseInt(data.CNT3)))
	}
}

function drawBadgeCnt(cnt){
	var sample = "";
	if(cnt && cnt > 0){
		sample =
			'<span class="badge-custom7">'
			+	'+<em id="id_cnt_payment_new">' + cnt + '</em>'
			+ '</span>'
	}else{
		sample = '<span class="badge-custom6">-</span>'
	}
	return sample;
}

function getMenuPaymentLst(){
	var param = {};
	var data = _sys.mariaDB.getData(CTX + '/com/com_0001/getMenuPaymentLst.ajax', param);
	
	makeMenuPayment(data);
}

function makeMenuPayment(data){
	$('#id_tb_menu_payment_stt').html('');
	var tmpUpMenuId = ""
	data.forEach((e) => {
		var sample = "";
		var tmpTd = '<td class="txt-left">'+ e.MENU_NM +'</td>'
 		  		+	makeTdCntElement(e, 'NEW')
 		  		+	makeTdCntElement(e, 'REVIEW')
 		  		+	makeTdCntElement(e, 'APPROVED')
		if(tmpUpMenuId != e.UP_MENU_ID){
			tmpUpMenuId = e.UP_MENU_ID;
			
			sample = '<tr>'
				   + 	'<th scope="row" rowspan="'+ e.RP_CNT +'">'+ e.UP_MENU_NM +'</th>'
				   +	tmpTd
				   + '</tr>'	
		}else{
			sample = '<tr>'
				   + 	tmpTd
				   + '</tr>'
		}
		
//		sample = $(sample).css('cursor', 'pointer').click(function(event) {
//			var info = $(this).prop('info');
//			var path = e.LINK_PATH.substr(0, e.LINK_PATH.lastIndexOf("/")+1);
//			window.location = CTX + path + 'detailForm?'+e.REFERENCE_KEY+'=' + info.REFERENCE_ID;
//		});
		
		// 프로퍼티 추가 
		$(sample).prop('info', e);
		
		// row 추가 
		
		$('#id_tb_menu_payment_stt').append(sample);
	});
}

function makeTdCntElement(e, type){
	var tdElement = "<td>-</td>";
	if(parseInt(e["CNT_ALL_"+ type]) > 0){
		if(parseInt(e["CNT_TODAY_"+ type]) > 0){
			tdElement = '<td>'
				  + 	'<span class="new-mark">'
				  +			'<span class="f-bolder black">'+ e["CNT_ALL_"+ type] +'건</span>'
				  +			'<span class="new-tag">'
				  +				'<em class="circle">N</em>'
				  +				'<em class="num-wrap">'
				  +					' <i>+</i>'
				  +					'<em class="num">'+ e["CNT_TODAY_"+ type] +'</em>'
				  +				'</em>'
				  +			'</span>'
				  +		'</span>'
				  + '</td>'
		}else{
			tdElement = '<td>'+ e["CNT_ALL_"+ type] +'건</td>'
		}
	}
	
	return tdElement
}

/* 검색 이벤트 */
function onSearch() {
	var param = {};
	var data = _sys.mariaDB.getData(CTX + '/com/com_0001/getData.ajax', param);
	
	// row 생성
	makeList(data);
}

function makeList(data) {
	list = data;
	$('#id_report_payment_new').html('');
	$('#id_report_payment_review').html('');
	$('#id_report_payment_approved').html('');
	
	var cntNew = 0;
	var cntReview = 0;
	var cntApproved = 0;
	list.forEach((e) => {
		var tmp = "";
		if(e.STATUS == "PAYMENT_STATUS-1"){
			tmp = 
				'<div class="info">'
				+	'<span class="info1">'
				+		'<em class="date">'+ e.INS_DT +'</em>'
				+		'<em class="time">'+ e.INS_TIME +'</em>'
				+	'</span>'
				+	'<span class="info2">'
				+		'<em class="name">'+ e.INS_EMP_NM +'</em>'
				+		'<em class="position">'+ e.INS_DUTY_NM +'</em>'
				+	'</span>'
				+'</div>'
		}else{
			tmp = 
				'<div class="info">'
				+	'<span class="info1">'
				+		'<em class="date">'+ e.UPT_DT +'</em>'
				+		'<em class="time">'+ e.UPT_TIME +'</em>'
				+	'</span>'
				+	'<span class="info2">'
				+		'<em class="name">'+ e.UPT_EMP_NM +'</em>'
				+		'<em class="position">'+ e.UPT_DUTY_NM +'</em>'
				+	'</span>'
				+'</div>'
		}
		
		// row 생성 
		var sample = 
			'<li>'
			+ 	'<a href="javascript:void(0);">'
			+		'<span>'
			+			'<em class="tit">'+ e.UP_MENU_NM +'</em>'
			+			'<em class="sub">'+ e.MENU_NM +'</em>'
			+		'</span>'
			+		tmp
			+ 	'</a>'
			+ '</li>';
		
		sample = $(sample).css('cursor', 'pointer').click(function(event) {
			
			var info = $(this).prop('info');
			var path = e.LINK_PATH.substr(0, e.LINK_PATH.lastIndexOf("/")+1);
			if(e.REFERENCE_KEY == 'TOOL_GRANT_REVOKE_ID'){
				path = '/sft/sft_0002/';
			}
			window.location = CTX + path + 'detailForm?'+e.REFERENCE_KEY+'=' + info.REFERENCE_ID;
			
		});
		
		// 프로퍼티 추가 
		$(sample).prop('info', e);
		
		// row 추가 
		
		if(e.STATUS == "PAYMENT_STATUS-1"){
			cntNew++;
			$('#id_report_payment_new').append(sample);
		}else if(e.STATUS == "PAYMENT_STATUS-2"){
			cntReview++;
			$('#id_report_payment_review').append(sample);
		}else{
			cntApproved++;
			$('#id_report_payment_approved').append(sample);
		}
	});
	
	var blankEle = 
		'<li class="blank-li"><div class="blank"><div class="txt-area"><span class="icon"></span><span class="txt">업데이트된 내용이 없습니다.</span></div></div></li>'
	
	if(cntNew == 0){
		$('#id_report_payment_new').append(blankEle);
	}
	if(cntReview == 0){
		$('#id_report_payment_review').append(blankEle);
	}
	if(cntApproved == 0){
		$('#id_report_payment_approved').append(blankEle);
	}
		
};
