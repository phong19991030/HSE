package module.sys;

import java.util.Date;

import infrastructure.inheritance.model.defaultModel.DefaultModel;

public class Sys_0203Model extends DefaultModel {

	public Sys_0203Model() {
		// TODO Auto-generated constructor stub
	}

	public Sys_0203Model(String mENU_ID, String mENU_NM, Integer lEV,
			String uP_MENU_ID, String uSE_YN, String iMG_PATH,
			String iMG_OVER_PATH, String lEFT_IMG_PATH, String pGM_ID,
			String pARAM, Integer oRD_NO, String mENU_TP, String cLS_CD,
			String wDT_SZ, String hGT_SZ, String rMK, String iNS_ID,
			Date iNS_DT, String uPT_ID, Date uPT_DT, String mENU_OUT_YN) {
		super();
		MENU_ID = mENU_ID;
		MENU_NM = mENU_NM;
		LEV = lEV;
		UP_MENU_ID = uP_MENU_ID;
		USE_YN = uSE_YN;
		IMG_PATH = iMG_PATH;
		IMG_OVER_PATH = iMG_OVER_PATH;
		LEFT_IMG_PATH = lEFT_IMG_PATH;
		PGM_ID = pGM_ID;
		PARAM = pARAM;
		ORD_NO = oRD_NO;
		MENU_TP = mENU_TP;
		CLS_CD = cLS_CD;
		WDT_SZ = wDT_SZ;
		HGT_SZ = hGT_SZ;
		RMK = rMK;
		INS_ID = iNS_ID;
		INS_DT = iNS_DT;
		UPT_ID = uPT_ID;
		UPT_DT = uPT_DT;
		MENU_OUT_YN = mENU_OUT_YN;
	}

	// MENU_ID        VARCHAR2(50 BYTE),
	// MENU_NM        VARCHAR2(200 BYTE),
	// LEV            NUMBER,
	// UP_MENU_ID     VARCHAR2(50 BYTE),
	// USE_YN         CHAR(1 BYTE),
	// IMG_PATH       VARCHAR2(200 BYTE),
	// IMG_OVER_PATH  VARCHAR2(200 BYTE),
	// LEFT_IMG_PATH  VARCHAR2(200 BYTE),
	// PGM_ID         VARCHAR2(20 BYTE),
	// PARAM          VARCHAR2(200 BYTE),
	// ORD_NO         NUMBER(3),
	// MENU_TP        VARCHAR2(21 BYTE),
	// CLS_CD         VARCHAR2(21 BYTE),
	// WDT_SZ         VARCHAR2(4 BYTE),
	// HGT_SZ         VARCHAR2(4 BYTE),
	// RMK            VARCHAR2(4000 BYTE),
	// INS_ID         VARCHAR2(20 BYTE),
	// INS_DT         DATE,
	// UPT_ID         VARCHAR2(20 BYTE),
	// UPT_DT         DATE

	String MENU_ID;
    String MENU_NM;
    Integer LEV;
    String UP_MENU_ID;
    String USE_YN;
    String IMG_PATH;
    String IMG_OVER_PATH;
    String LEFT_IMG_PATH;
    String PGM_ID;
    String PARAM;
    Integer ORD_NO;
    String MENU_TP;
    String CLS_CD;
    String WDT_SZ;
    String HGT_SZ;
    String RMK;
    String INS_ID;
    Date INS_DT;
    String UPT_ID;
    Date UPT_DT;
    String MENU_OUT_YN;
    
    
	

	public String getMENU_ID() {
		return MENU_ID;
	}
	public void setMENU_ID(String mENU_ID) {
		MENU_ID = mENU_ID;
	}
	public String getMENU_NM() {
		return MENU_NM;
	}
	public void setMENU_NM(String mENU_NM) {
		MENU_NM = mENU_NM;
	}
	public Integer getLEV() {
		return LEV;
	}
	public void setLEV(Integer lEV) {
		LEV = lEV;
	}
	public void setLEV(String lEV) {
		LEV = Integer.parseInt(lEV);
	}
	public String getUP_MENU_ID() {
		return UP_MENU_ID;
	}
	public void setUP_MENU_ID(String uP_MENU_ID) {
		UP_MENU_ID = uP_MENU_ID;
	}
	public String getUSE_YN() {
		return USE_YN;
	}
	public void setUSE_YN(String uSE_YN) {
		USE_YN = uSE_YN;
	}
	public String getIMG_PATH() {
		return IMG_PATH;
	}
	public void setIMG_PATH(String iMG_PATH) {
		IMG_PATH = iMG_PATH;
	}
	public String getIMG_OVER_PATH() {
		return IMG_OVER_PATH;
	}
	public void setIMG_OVER_PATH(String iMG_OVER_PATH) {
		IMG_OVER_PATH = iMG_OVER_PATH;
	}
	public String getLEFT_IMG_PATH() {
		return LEFT_IMG_PATH;
	}
	public void setLEFT_IMG_PATH(String lEFT_IMG_PATH) {
		LEFT_IMG_PATH = lEFT_IMG_PATH;
	}
	public String getPGM_ID() {
		return PGM_ID;
	}
	public void setPGM_ID(String pGM_ID) {
		PGM_ID = pGM_ID;
	}
	public String getPARAM() {
		return PARAM;
	}
	public void setPARAM(String pARAM) {
		PARAM = pARAM;
	}
	public Integer getORD_NO() {
		return ORD_NO;
	}
	public void setORD_NO(Integer oRD_NO) {
		ORD_NO = oRD_NO;
	}
	public void setORD_NO(String oRD_NO) {
		ORD_NO = Integer.parseInt(oRD_NO);
	}
	public String getMENU_TP() {
		return MENU_TP;
	}
	public void setMENU_TP(String mENU_TP) {
		MENU_TP = mENU_TP;
	}
	public String getCLS_CD() {
		return CLS_CD;
	}
	public void setCLS_CD(String cLS_CD) {
		CLS_CD = cLS_CD;
	}
	public String getWDT_SZ() {
		return WDT_SZ;
	}
	public void setWDT_SZ(String wDT_SZ) {
		WDT_SZ = wDT_SZ;
	}
	public String getHGT_SZ() {
		return HGT_SZ;
	}
	public void setHGT_SZ(String hGT_SZ) {
		HGT_SZ = hGT_SZ;
	}
	public String getRMK() {
		return RMK;
	}
	public void setRMK(String rMK) {
		RMK = rMK;
	}
	public String getINS_ID() {
		return INS_ID;
	}
	public void setINS_ID(String iNS_ID) {
		INS_ID = iNS_ID;
	}
	public Date getINS_DT() {
		return INS_DT;
	}
	public void setINS_DT(Date iNS_DT) {
		INS_DT = iNS_DT;
	}
	public void setINS_DT(String iNS_DT) {
		INS_DT = new Date(iNS_DT);
	}
	public String getUPT_ID() {
		return UPT_ID;
	}
	public void setUPT_ID(String uPT_ID) {
		UPT_ID = uPT_ID;
	}
	public Date getUPT_DT() {
		return UPT_DT;
	}
	public void setUPT_DT(Date uPT_DT) {
		UPT_DT = uPT_DT;
	}
	public void setUPT_DT(String uPT_DT) {
		UPT_DT = new Date(uPT_DT);
	}
	
	public String getMENU_OUT_YN() {
		return MENU_OUT_YN;
	}

	public void setMENU_OUT_YN(String mENU_OUT_YN) {
		MENU_OUT_YN = mENU_OUT_YN;
	}
    
}


