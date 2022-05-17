package applications.sys;

import java.util.Map;

import infrastructure.exception.ValidateException;
import infrastructure.exception.ValidationEnum;
import infrastructure.inheritance.model.defaultModel.DefaultModel;
import infrastructure.util.ValidateUtil;

public class Sys_0201Model extends DefaultModel{

	public Sys_0201Model() {
		// TODO Auto-generated constructor stub
	}

	public Sys_0201Model(Map map) throws Exception {
		// TODO Auto-generated constructor stub
		getMapToModel(map,this);
		printModel(map, this);
	}

	// USER_ID VARCHAR2(20 BYTE),
	// USER_NM VARCHAR2(100 BYTE),
	// PWD VARCHAR2(146 BYTE),
	// DEPT_CD VARCHAR2(10 BYTE),
	// EMAIL VARCHAR2(300 BYTE),
	// MSGR_USE_YN CHAR(1 BYTE),
	// GW_USE_YN CHAR(1 BYTE),
	// WMAIL_USE_YN CHAR(1 BYTE),
	// GW_ID VARCHAR2(20 BYTE),
	// USE_FRM_DT CHAR(8 BYTE), 
	// USE_TO_DT CHAR(8 BYTE),
	// INS_ID VARCHAR2(20 BYTE),
	// INS_DT DATE,
	// UPT_ID VARCHAR2(20 BYTE),
	// UPT_DT DATE,
	// EMP_NO VARCHAR2(20 BYTE)
	String USER_UID;
	String USER_ID;
	String USER_NM;
	String PWD;
	String DEPT_CD;
	String EMAIL;
	String MSGR_USE_YN;
	String GW_USE_YN;
	String WMAIL_USE_YN;
	String GW_ID;
	String USE_FRM_DT;
	String USE_TO_DT;
	String INS_ID;
	String INS_DT; //20160603
	String UPT_ID;
	String UPT_DT; //20160603
	String EMP_NO;
	String CLSF_CD      ;
	String CLSF_NM      ;
	String REF_CLSF_CD  ;
	String  CLSF_LEV     ; //int type
	String  CLSF_SORT    ;
	String COMP;
	
	public String getCOMP() {
		return COMP;
	}

	public void setCOMP(String cOMP) {
		COMP = cOMP;
	}

	public String getUSER_UID() {
		return USER_UID;
	}

	public String getPWD() {
		return PWD;
	}
	
	public void setPWD(String pWD) {
//		String[] strd = {"사용자PW",""};
//
//		if(!ValidateUtil.isEmpty(pWD)  ){
//			throw new ValidateException(ValidationEnum.require.getMessage(strd));
//		}
//		
		PWD = pWD;
	}
	public String getUSER_ID() {
		return USER_ID;
	}

	public void setUSER_ID(String uSER_ID) throws Exception{
		String[] strd = {"사용자ID",""};
		
		if(!ValidateUtil.isEmpty(uSER_ID)  ){
			throw new ValidateException(ValidationEnum.require.getMessage(strd));
		}
		if(!ValidateUtil.maxLength(uSER_ID, 10) ){
			strd[1] = "10"; 
			throw new ValidateException(ValidationEnum.length.getMessage(strd));
		}
			
		
		
		USER_ID = uSER_ID;
	}

	public String getUSER_NM() {
		return USER_NM;
	}

	public void setUSER_NM(String uSER_NM) {
		USER_NM = uSER_NM;
	}
	public String getDEPT_CD() {
		return DEPT_CD;
	}
	public void setDEPT_CD(String dEPT_CD) {
		DEPT_CD = dEPT_CD;
	}
	public String getEMAIL() {
		return EMAIL;
	}
	public void setEMAIL(String eMAIL) {
		EMAIL = eMAIL;
	}
	public String getMSGR_USE_YN() {
		return MSGR_USE_YN;
	}
	public void setMSGR_USE_YN(String mSGR_USE_YN) {
		MSGR_USE_YN = mSGR_USE_YN;
	}
	public String getGW_USE_YN() {
		return GW_USE_YN;
	}
	public void setGW_USE_YN(String gW_USE_YN) {
		GW_USE_YN = gW_USE_YN;
	}
	public String getWMAIL_USE_YN() {
		return WMAIL_USE_YN;
	}
	public void setWMAIL_USE_YN(String wMAIL_USE_YN) {
		WMAIL_USE_YN = wMAIL_USE_YN;
	}
	public String getGW_ID() {
		return GW_ID;
	}
	public void setGW_ID(String gW_ID) {
		GW_ID = gW_ID;
	}
	public String getUSE_FRM_DT() {
		return USE_FRM_DT;
	}
	public void setUSE_FRM_DT(String uSE_FRM_DT) {
		USE_FRM_DT = uSE_FRM_DT;
	}
	public String getUSE_TO_DT() {
		return USE_TO_DT;
	}
	public void setUSE_TO_DT(String uSE_TO_DT) {
		USE_TO_DT = uSE_TO_DT;
	}
	public String getINS_ID() {
		return INS_ID;
	}
	public void setINS_ID(String iNS_ID) {
		INS_ID = iNS_ID;
	}
	
	public String getINS_DT() {
		return INS_DT;
	}

	public void setINS_DT(String iNS_DT) {
		INS_DT = iNS_DT;
	}

	public String getCLSF_CD() {
		return CLSF_CD;
	}

	public void setCLSF_CD(String cLSF_CD) {
		CLSF_CD = cLSF_CD;
	}

	public String getCLSF_NM() {
		return CLSF_NM;
	}

	public void setCLSF_NM(String cLSF_NM) {
		CLSF_NM = cLSF_NM;
	}

	public String getREF_CLSF_CD() {
		return REF_CLSF_CD;
	}

	public void setREF_CLSF_CD(String rEF_CLSF_CD) {
		REF_CLSF_CD = rEF_CLSF_CD;
	}

	public String getCLSF_LEV() {
		return CLSF_LEV;
	}

	public void setCLSF_LEV(String cLSF_LEV) {
		CLSF_LEV = cLSF_LEV;
	}

	public String getCLSF_SORT() {
		return CLSF_SORT;
	}

	public void setCLSF_SORT(String cLSF_SORT) {
		CLSF_SORT = cLSF_SORT;
	}

	public void setUPT_DT(String uPT_DT) {
		UPT_DT = uPT_DT;
	}

	public String getUPT_ID() {
		return UPT_ID;
	}
	public void setUPT_ID(String uPT_ID) {
		UPT_ID = uPT_ID;
	}
	public String getEMP_NO() {
		return EMP_NO;
	}
	public void setEMP_NO(String eMP_NO) {
		EMP_NO = eMP_NO;
	}
	
}
