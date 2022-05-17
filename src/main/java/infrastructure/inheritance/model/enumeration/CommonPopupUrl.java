package infrastructure.inheritance.model.enumeration;

import module.common.popup.PopupController;

/**
 * @author keim
 * @사용방법 3가지 Enum을 정의 해야함,  hierarchy 구조를 가지고 있음  
 *
 */
public enum CommonPopupUrl {
	/* 
	 * 팝업명 ([Groups.cls], "[팝업 jsp 위치 경로]", "[팝업명]")
	 * ex) 부서팝업( Groups.depart, "common/popup/popupDepartPopup", "부서팝업")
	 */
	
	// 2개 씩 있는 항목을 하나로 줄일 수 있음 
	//** 공통 **//
	부서팝업( Groups.depart, "common/popup/popupDepartPopup", "부서팝업"),
	사용자팝업(Groups.user, "common/popup/popupUser", "사용자팝업"),
	프로그램팝업( Groups.pgm, "common/popup/popupPgmId", "프로그램팝업"),
	프로그램필드팝업( Groups.pgmfld, "common/popup/popupPgmFldId", "프로그램필드관리팝업"),
	국가팝업( Groups.ntn, "common/popup/popupNtn", "국가팝업"),
	우편번호팝업( Groups.post, "common/popup/popupPost", "우편번호팝업"),
	공통코드팝업( Groups.commCd, "common/popup/popupCommCd", "공통코드팝업"),
	결재라인팝업( Groups.gwLine, "common/popup/popupGwLine", "결재라인팝업"),
	발주기관팝업(Groups.Bms, "common/popup/popupBms", "발주기관팝업"),
	employeeItem( Groups.emp, "common/popup/popupEmp", "프로그램팝업"),
	emplItem( Groups.empl, "common/popup/popupEmpl", "Employee popup"),
	deptPItem(Groups.deptP ,"common/popup/popupOtherDept", "Department popup"),
	empl2Item( Groups.empl2, "common/popup/popupEmpl2", "Employee popup 2"),
	buCommCd(Groups.businessUnitCommCd, "common/popup/popupBU_CommCd", "Business unit common code"),
	bindingItem( Groups.binding, "common/popup/popupBinding", "Binding popup"),
	businessUnitPopup( Groups.businessUnit, "common/popup/popupBusinessUnit", "Business unit popup"),
	userdeptItem(Groups.userdept, "common/popup/popupUserDept", "User in Department popup "),
	userasignItem(Groups.userasign, "common/popup/popupUserAsign", "User is asigned popup "),
	emplSmDeptItem( Groups.emplSmDept, "common/popup/popupEmplSameDept", "Employee popup in same department"),
	emplChildItem( Groups.emplChild, "common/popup/popupEmplChild", "Employee popup"),
	나라선택팝업( Groups.cntry, "vac/vac_010201","나라선택팝업"),
	groupPopup(Groups.group, "common/popup/popupGroup", "Group popup"),	
	generatorPopup(Groups.generator, "common/popup/popupGenerator", "Generator popup"),
	generator2Popup(Groups.generator2, "common/popup/popupGenerator2", "Generator popup 2"),
	generator3Popup(Groups.generator3, "common/popup/popupGenerator3", "Generator popup 3"),
	generator4Popup(Groups.generator4, "common/popup/popupGenerator4", "Generator popup 4"),
	partPopup(Groups.part, "common/popup/popupPart", "Part popup"),
	multilPart(Groups.multilPart, "common/popup/multilPart", "multile Part popup"),
	propertyPopup(Groups.property, "common/popup/popupProperty", "Property popup"),
	selectHuman(Groups.selectHuman, "common/popup/popupSelectHuman", "Select Human Popup"),
	selectAlarmCode(Groups.selectAlarmCode, "common/popup/selectAlarmCode", "Select popup alarm code"),
	selectMaintenCode(Groups.selectMaintenCode, "common/popup/popupMaintenCode", "Select popup maintence code"),
	selectCommonCode(Groups.selectCommonCode, "common/popup/selectCommonCode", "Select popup common code"),
	selectMutilCommonCode(Groups.selectMutilCommonCode, "common/popup/selectMutilCommonCode", "Select popup mutil common code"),
	selectPartCode(Groups.selectPartCode, "common/popup/selectPartCode", "Select popup part code"),
	selectCompany(Groups.selectCompany, "common/popup/popupSelectCompany", "Select Company Popup"),
	selectRole(Groups.selectRole, "common/popup/popupSelectRole", "Select Role Popup"),
	selectTurbine(Groups.selectTurbine, "common/popup/popupSelectTurbine", "Select Turbine Popup"),
	allReports(Groups.allReports, "common/popup/popupSelectReports", "All Reports"),
	selectChecklist(Groups.selectChecklist, "common/popup/popupSelectChecklist", "Select Checklist Popup");

	private String type;
	private Groups group;
	private String view;
	private String desc;
	
	CommonPopupUrl(Groups group,String view,String desc) {
		 this.group = group; 
		 this.view = view;
		 this.desc= desc;
	}
	/**
	 * Group 컨트롤러 객체 
	 * @작성일    : 2015. 12. 15. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * CommonPopupUrl에 모든 정보를 넣고 사용할 수 있음에도 2개로 나눈 이유는 (사실상 Groups 는 의미가 퇴색함 ) 
	 * 같은 컨트롤러를 타면서(데이터 정보가 같을경우 , e.g, 부서팝업인데 같은 데이터를 사용하지만 보여주는 방법이 다르거나 검색 필드가 다를경우)
	 * View만 바뀔 경우에 사용하기 위해....
	 * @진행상태: TO-DO  
	 *	To-do member, personnel -> 용어 정리 필요
	 *  
	 */
	//To-do member, personnel -> 용어 정리 필요 
	public enum Groups{
		// 컨트롤러 메소드명 , 클래스프리픽스 , 페이지 URL, DATA AJAX URL ;
		depart("doDepartPopup", ClassPrefix.common, "/common/popup/departPopup","/common/popup/getDataDepartPopup"),
		member("doEmpPopup", ClassPrefix.common, "/common/popup/empPopup","/common/popup/getDataEmpDeptPopup"),
		user("doUserPopup", ClassPrefix.common, "/common/popup/userPopup","/common/popup/getDataUserPopup"),
		pgm("doPgmPopup", ClassPrefix.common, "/common/popup/pgmPopup","/common/popup/getDataPgmPopup"),
		pgmfld("doPgmFldPopup", ClassPrefix.common, "/common/popup/pgmFldPopup","/common/popup/getDataPgmFldPopup"),
		ntn("doNtnPopup", ClassPrefix.common, "/common/popup/ntnPopup","/common/popup/getDataNtnPopup"),
		post("doPostPopup", ClassPrefix.common, "/common/popup/postPopup","/common/popup/getDataPostPopup"),
		commCd("popupCommCd", ClassPrefix.common, "/common/popup/popupCommCd","/common/popup/getDataCommCd.ajax"),
		gwLine("popupGwLine", ClassPrefix.common, "/common/popup/popupGwLine","/common/popup/getListGwLine.ajax"),
		Bms("popupBms", ClassPrefix.common, "/common/popup/popupBms","/common/popup/getBms.ajax"),
		empl("doEmplPopup",ClassPrefix.common, "/common/popup/emplPopup","/common/popup/getDataEmployeePopup"),
		emp("doEmpPopup",ClassPrefix.common, "/common/popup/empPopup","/common/popup/getDataEmpPopup"),
		empl2("doEmpl2Popup",ClassPrefix.common, "/common/popup/empl2Popup","/common/popup/getDataEmpl2Popup"),
		//other department
		deptP("doOtherDeptPopup",ClassPrefix.common, "/common/popup/deptOtherDeptPopup","/common/popup/getDataOtherDeptPopup"),
		businessUnitCommCd("popupBU_CommCd", ClassPrefix.common, "/common/popup/popupBU_CommCd", "/stm/stm_0101/getDataList04.ajax"),
		binding("doBindingPopup",ClassPrefix.common, "/common/popup/bindingPopup","/common/popup/getDataBindingPopup"),
		businessUnit("popupBusinessUnit", ClassPrefix.common, "/common/popup/popupBusinessUnit", "/common/popup/popupBusinessUnit/getDataList01.ajax"),
		userdept("doUserDeptPopup",ClassPrefix.common, "/common/popup/userdeptPopup","/common/popup/getDataUserDepartPopup.ajax"),
		userasign("doUserAsignPopup",ClassPrefix.common, "/common/popup/userasignPopup","/common/popup/getDataUserAsignPopup"),
		emplSmDept("doEmpPopupInSameDept",ClassPrefix.common, "/common/popup/popupEmplSameDept","/common/popup/getListEmployeeInSameDept"),
		cntry("popupCntry", ClassPrefix.common,"/common/popup/popupCntry","/common/popup/getCntry.ajax"),
		emplChild("doEmplPopupChild",ClassPrefix.common, "/common/popup/emplPopupChild","/common/popup/getDataEmployeePopupChild"),
		group("doGroupPopup", ClassPrefix.common, "/common/popup/groupPopup","/common/popup/getDataGroupPopup"),
		generator("doGeneratorPopup", ClassPrefix.common, "/common/popup/generatorPopup","/common/popup/getDataGeneratorPopup"),
		generator2("doGeneratorPopup2", ClassPrefix.common, "/common/popup/generatorPopup2","/common/popup/getDataGeneratorPopup2"),
		generator3("doGeneratorPopup3", ClassPrefix.common, "/common/popup/generatorPopup3","/common/popup/getDataGeneratorPopup3"),
		generator4("doGeneratorPopup4", ClassPrefix.common, "/common/popup/generatorPopup4","/common/popup/getDataGeneratorPopup4"),
		part("doPartPopup", ClassPrefix.common, "/common/popup/partPopup","/common/popup/getDataPartPopup"),
		multilPart("multilPart", ClassPrefix.common, "/common/popup/multilPart","/common/popup/getMultilPartPopup"),
		property("doPropertyPopup", ClassPrefix.common, "/common/popup/propertyPopup","/common/popup/getDataPropertyPopup"),
		selectHuman("popupSelectHuman",ClassPrefix.common, "/common/popup/popupSelectHuman","/common/popup/popupSelectHuman/getDataList.ajax"),
		selectRole("popupSelectRole",ClassPrefix.common, "/common/popup/popupSelectRole","/common/popup/popupSelectRole/getDataList.ajax"),
		selectTurbine("selectTurbinePopup", ClassPrefix.common, "/common/popup/popupSelectTurbine", "/common/popup/popupSelectTurbine/getDataList.ajax"),
		allReports("doSelectReports", ClassPrefix.common, "/common/popup/popupSelectReports", "/common/popup/popupSelectReports/getReports.ajax"),
		
		//popupcode
		selectAlarmCode("popupAlarmCode",ClassPrefix.common, "/common/popup/popupAlarmCode","/common/popup/popupAlarmCode/getDataList.ajax"),
		selectPartCode("popupPartCode",ClassPrefix.common, "/common/popup/popupPartCode","/common/popup/popupPartCode/getDataList.ajax"),
		selectCommonCode("popupCommonCode",ClassPrefix.common, "/common/popup/popupCommonCode","/common/popup/popupCommonCode/getDataList.ajax"),
		selectMutilCommonCode("popupMutilCommonCode",ClassPrefix.common, "/common/popup/popupMutilCommonCode","/common/popup/popupMutilCommonCode/getDataList.ajax"),
//		selectMaintenCode("popupMaintenCode",ClassPrefix.common, "/common/popup/popupMaintenCode","/sys/sys_0101/getMaintanceCode.ajax"),
		selectMaintenCode("popupMaintenCode",ClassPrefix.common, "/common/popup/popupMaintenCode","/common/popup/popupMaintenCode/getDataList.ajax"),
		selectCompany("doselectCompany", ClassPrefix.common, "/common/popup/popupSelectCompany","/common/popup/popupSelectCompany/getDataList.ajax"),
		selectChecklist("doselectChecklist", ClassPrefix.common, "/common/popup/popupSelectChecklist","/common/popup/popupSelectChecklist/getDataList.ajax");
		
		private String methodName;
		private ClassPrefix fix;
		private String url;
		private String ajaxDataUrl;

		Groups(String methodName ,ClassPrefix fix , String url,String ajaxDataUrl){
			 this.methodName= methodName;
			 this.url = url;
			 this.ajaxDataUrl= ajaxDataUrl;
			 this.fix = fix;
		}

		public ClassPrefix getFix() {
			return fix;
		}
		
		public String getMethodName() {
			return methodName;
		}
		
		public String getUrl() {
			return url;
		}
		
		public String getAjaxDataUrl() {
			return ajaxDataUrl;
		}
	}
	
	public enum ClassPrefix{
		common(PopupController.class,"공통"),
//		hrm(Hrm_PopupController.class,"인사"),
//		gam(Gam_PopupController.class,"총무"),
//		pam(Pam_PopupController.class,"급여"),
//		btm(Btm_PopupController.class,"출장"),
//		bgm(Bgm_PopupController.class,"예산"),
//		acm(Acm_PopupController.class,"회계"),
//		bym(Bym_PopupController.class,"구매"),
//		asm(Asm_PopupController.class,"자산"),
//		fcm(Fcm_PopupController.class,"시설"),		
//		evm(Evm_PopupController.class,"기관평가"),
//		eam(Eam_PopupController.class,"감사")
		;
		
		private String className;
		private Class object;
		private String name;

		ClassPrefix(Class object , String name){
			 this.object = object;
			 this.className= object.getName();
			 this.name = name;
		}
		
//		ClassPrefix(String className , String name){
//			 this.className= className;
//			 this.name = name;
//		}

		public String getClassName() {
			return className;
		}
		
		public Class getObject() { 
			return object;
		}
		
		public String getName() {
			return name;
		}
	}

	public static CommonPopupUrl getCommonPopupUrlByTypeGroup(String type, String groupName){
		CommonPopupUrl result = null;
		Groups group = Groups.valueOf(groupName);
		
		for(CommonPopupUrl rt: CommonPopupUrl.values()){
			if(rt.getGroup().equals(group)){
				rt.type= type;
				result = rt;
			}
		}

		return result;
	}
	
	public String getType() {
		return type;
	}
	
	public Groups getGroup() {
		return group;
	}
	
	/**
	 * 기능명 
	 * @작성일    : 2014. 12. 8. 
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: TO-DO 메시지 정의 필요 
	 */
	public String getView() {
		if(!type.equals("popup") && !type.equals("dialog")){
//			return ResourceUtil.getMessage(msgId);
			return "404 에러 또는 빈페이지 또는 메시지 ";
		}
		
		return  type +":"+view;
	}
	
	public String getDesc() {
		return desc;
	}
}