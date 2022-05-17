package module.model;

import java.util.Date;

public class BaseModel {
	
	private Date INS_DATE;
	
	private String INS_USER;
	
	private Date UPD_DATE;
	
	private String UPP_USER;

	public BaseModel() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Date getINS_DATE() {
		return INS_DATE;
	}

	public void setINS_DATE(Date iNS_DATE) {
		INS_DATE = iNS_DATE;
	}

	public String getINS_USER() {
		return INS_USER;
	}

	public void setINS_USER(String iNS_USER) {
		INS_USER = iNS_USER;
	}

	public Date getUPD_DATE() {
		return UPD_DATE;
	}

	public void setUPD_DATE(Date uPD_DATE) {
		UPD_DATE = uPD_DATE;
	}

	public String getUPP_USER() {
		return UPP_USER;
	}

	public void setUPP_USER(String uPP_USER) {
		UPP_USER = uPP_USER;
	}
	
}
