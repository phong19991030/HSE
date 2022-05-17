package applications.util;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

public class AjaxResult implements Serializable {
	private static final long serialVersionUID = 1L;
	private boolean status;
	private String message;
	private Object responseData;
	
	public AjaxResult() {}

	public AjaxResult(boolean status, String message, Object responseData) {
		this.status = status;
		this.message = message;
		this.responseData = responseData;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getResponseData() {
		return responseData;
	}

	public void setResponseData(Object responseData) {
		this.responseData = responseData;
	}
	
	public Map<String, Object> toMap() throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		Field[] fields = AjaxResult.class.getDeclaredFields();
		for (Field field : fields) {
			field.setAccessible(true);
			
			resultMap.put(field.getName(), field.get(this));
		}
		
		return resultMap;
	}
}
