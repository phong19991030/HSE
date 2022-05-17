package module.model;

import java.util.List;

public class PPEUser {
	
	private String EMP_NO;
	
	private String EMP_NAME;
	
	private String DUTY_NAME;
	
	private List<PPE> PPES;

	public String getEMP_NO() {
		return EMP_NO;
	}

	public void setEMP_NO(String eMP_NO) {
		EMP_NO = eMP_NO;
	}

	public String getEMP_NAME() {
		return EMP_NAME;
	}

	public void setEMP_NAME(String eMP_NAME) {
		EMP_NAME = eMP_NAME;
	}

	public String getDUTY_NAME() {
		return DUTY_NAME;
	}

	public void setDUTY_NAME(String dUTY_NAME) {
		DUTY_NAME = dUTY_NAME;
	}

	public List<PPE> getPPES() {
		return PPES;
	}

	public void setPPES(List<PPE> pPES) {
		PPES = pPES;
	}

}
