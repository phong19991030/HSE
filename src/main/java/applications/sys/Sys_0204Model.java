package applications.sys;

import java.util.Date;

import infrastructure.inheritance.model.defaultModel.DefaultModel;

public class Sys_0204Model extends DefaultModel {

	public Sys_0204Model() {
		// TODO Auto-generated constructor stub
	}

	public Sys_0204Model(String rOLE_ID, String rOLE_NM, String uSE_YN,
			String rMK, String iNS_ID, Date iNS_DT, String uPT_ID, Date uPT_DT) {
		super();
		ROLE_ID = rOLE_ID;
		ROLE_NM = rOLE_NM;
		USE_YN = uSE_YN;
		RMK = rMK;
		INS_ID = iNS_ID;
		INS_DT = iNS_DT;
		UPT_ID = uPT_ID;
		UPT_DT = uPT_DT;
	}

	// ROLE_ID  VARCHAR2(9 BYTE),
	// ROLE_NM  VARCHAR2(20 BYTE),
	// USE_YN   CHAR(1 BYTE),
	// RMK      VARCHAR2(4000 BYTE),
	// INS_ID   VARCHAR2(20 BYTE),
	// INS_DT   DATE,
	// UPT_ID   VARCHAR2(20 BYTE),
	// UPT_DT   DATE

	String ROLE_ID;
	String ROLE_NM;
	String USE_YN;
	String RMK;
	String INS_ID;
	Date INS_DT;
	String UPT_ID;
	Date UPT_DT;
	
	public String getROLE_ID() {
		return ROLE_ID;
	}
	public void setROLE_ID(String rOLE_ID) {
		ROLE_ID = rOLE_ID;
	}
	public String getROLE_NM() {
		return ROLE_NM;
	}
	public void setROLE_NM(String rOLE_NM) {
		ROLE_NM = rOLE_NM;
	}
	public String getUSE_YN() {
		return USE_YN;
	}
	public void setUSE_YN(String uSE_YN) {
		USE_YN = uSE_YN;
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
}