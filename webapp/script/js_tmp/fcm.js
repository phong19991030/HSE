
// 그리드의  colNm check 여부를 구하여, 메세지
function doChkCount( gridId , colNm ){	
	var chkCnt =  getGridCheckboxCnt( gridId, colNm); //common.js
	if(chkCnt <= 0){
		alert("선택 된 대상이 없습니다.\n대상을 선택해 주십시오."); 
		return false;
	} else {
		return true;
	}		
};


//임대관리 : role에 따라 재단 / TBC 건물 ID 반환  

function fcmRentRollChk(roleId){
	
	//var roleId = "${SESS_ROLE_ID }";
	
	//alert("SESS_ROLE_ID" + roleId);
	
	roleId = roleId.replace("[","");
	roleId = roleId.replace("]","");
	roleId = roleId.replace(" ","");
	var roles = roleId.split(",");
		
	var role = "";
	var rent_buld_no = "";
	var i = 0;
		
	for( i = 0; i < roles.length; i++){
		
		role = roles[i] ;	
			
		if (role == "R_BUM_001") {
			rent_buld_no = "1";
		} else if (role == "R_BUM_002"){
			rent_buld_no = "2";
		} else if (role == "R000"){
			rent_buld_no = "0"
		}
	}
	
	//alert(rent_buld_no);
	
	return rent_buld_no;
}


//차량관리 : role에 따라 지역구분 반환  

function fcmCarRollChk(roleId, seLocalCls){
	
	//alert(seLocalCls);	
	roleId = roleId.replace("[","");
	roleId = roleId.replace("]","");
	roleId = roleId.replace(" ","");
	var roles = roleId.split(",");
		
	var role = "";
	var localCls = "";
	var i = 0;
		
	for( i = 0; i < roles.length; i++){
		
		role = roles[i] ;
		
		//role = "R001" ;
		//seLocalCls = "118-030" ;
		
		//권한 체크 순서 중요! 높은 권한 부터 확인.
		
		if (role == "R000" || role == "R_BUM_003") {
			localCls = "";
			return localCls;
		} else if (role == "R_BUM_030" || role == "R_BUM_040" || role == "R_BUM_050" ||role == "R_BUM_060"  ) {			
			localCls = "118-" + role.substr(6,9) ;
			return localCls;
		} else if (role == "R001"){
			localCls = fcmCarLocalset(seLocalCls);
		}		
	}	
	return localCls;
}

function fcmCarLocalset(localCls){ 
	
	//세션정보 중 지역 정보 : 대덕특구를 진흥재단으로 치환	
	//"${SESS_USER.SESS_AREA_CLS_CD }"
	
	if (localCls == '118-020'){
		localCls = '118-010';
	}
	
	return localCls;
	
}

//콤보박스 컨트롤 
function fcmcomboControl(target, value){  
	if(value == 'undefined'|| !value ) value = '';
	$('select[name="search.'+target+'"] option[value="'+value+'"]').attr('selected', true);
	$('select[name="search.'+target+'"] option:not(:selected)').remove();   
	
	// 1. 방법1
	//$('select[name="form.CAR_SEQ"] option').removeAttr('selected').removeAttr('disabled'); // 기존 selected, disabled 제거
	//$('select[name="form.CAR_SEQ"] option[value="'+value+'"]').attr('selected', true); // 해당 데이터 selected  
	//$('select[name="form.CAR_SEQ"] option:not(:selected)').attr('disabled', true); // selected되지 않는 데이터 비활성화  
	
	// 2. 방법2
	//$('select[name="form.CAR_SEQ"] option[value="'+value+'"]').attr('selected', true);
	//$('select[name="form.CAR_SEQ"] option:not(:selected)').attr('disabled', true);
	
	// 3. 방법3
	//comboControl('CAR_SEQ', value);
}

function fcmcomboControl2(target, value){  
	if(value == 'undefined'|| !value ) value = '';
	$('select[name="'+target+'"] option[value="'+value+'"]').attr('selected', true);
	$('select[name="'+target+'"] option:not(:selected)').remove();
}