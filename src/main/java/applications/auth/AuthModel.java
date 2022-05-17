package applications.auth;

public class AuthModel extends BaseModel {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private boolean isSuccess;
	private String errCode;
	private int fail_cnt;
	
	private String RSAModulus;
	private String RSAExponent;
	private String username;
	public boolean isSuccess() {
		return isSuccess;
	}
	public void setSuccess(boolean isSuccess) {
		this.isSuccess = isSuccess;
	}
	public String getErrCode() {
		return errCode;
	}
	public void setErrCode(String errCode) {
		this.errCode = errCode;
	}
	public int getFail_cnt() {
		return fail_cnt;
	}
	public void setFail_cnt(int fail_cnt) {
		this.fail_cnt = fail_cnt;
	}
	public String getRSAModulus() {
		return RSAModulus;
	}
	public void setRSAModulus(String rSAModulus) {
		RSAModulus = rSAModulus;
	}
	public String getRSAExponent() {
		return RSAExponent;
	}
	public void setRSAExponent(String rSAExponent) {
		RSAExponent = rSAExponent;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
}
