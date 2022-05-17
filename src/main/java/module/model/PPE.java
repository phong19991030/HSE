package module.model;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class PPE extends BaseModel {
	
	private Integer EMP_PPE_ID;
	
	private String EMP_NO;
	
	private String PPE_CODE;
	
	private String BRAND;
	
	private String MODEL;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date GRANT_DATE;
	
	private Boolean IS_EOL;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date RENEW_DATE;
	
	private String STATUS;

	public PPE() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Integer getEMP_PPE_ID() {
		return EMP_PPE_ID;
	}

	public void setEMP_PPE_ID(Integer eMP_PPE_ID) {
		EMP_PPE_ID = eMP_PPE_ID;
	}

	public String getEMP_NO() {
		return EMP_NO;
	}

	public void setEMP_NO(String eMP_NO) {
		EMP_NO = eMP_NO;
	}

	public String getPPE_CODE() {
		return PPE_CODE;
	}

	public void setPPE_CODE(String pPE_CODE) {
		PPE_CODE = pPE_CODE;
	}

	public String getBRAND() {
		return BRAND;
	}

	public void setBRAND(String bRAND) {
		BRAND = bRAND;
	}

	public String getMODEL() {
		return MODEL;
	}

	public void setMODEL(String mODEL) {
		MODEL = mODEL;
	}

	public Date getGRANT_DATE() {
		return GRANT_DATE;
	}

	public void setGRANT_DATE(Date gRANT_DATE) {
		GRANT_DATE = gRANT_DATE;
	}

	public Boolean getIS_EOL() {
		return IS_EOL;
	}

	public void setIS_EOL(Boolean iS_EOL) {
		IS_EOL = iS_EOL;
	}

	public Date getRENEW_DATE() {
		return RENEW_DATE;
	}

	public void setRENEW_DATE(Date rENEW_DATE) {
		RENEW_DATE = rENEW_DATE;
	}

	public String getSTATUS() {
		return STATUS;
	}

	public void setSTATUS(String sTATUS) {
		STATUS = sTATUS;
	}
	
}
