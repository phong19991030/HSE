package module.model;

import personal.aug.convert.MapAndObjectConversion;
import personal.aug.convert.annotations.MapKey;

public class RememberLoginAuth extends MapAndObjectConversion {

	@MapKey("ID")
	private Long id;
	@MapKey("SELECTOR")
	private String selector;
	@MapKey("VALIDATOR")
	private String validator;
	@MapKey("USER_ID")
	private String userId;
	
	public RememberLoginAuth() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSelector() {
		return selector;
	}

	public void setSelector(String selector) {
		this.selector = selector;
	}

	public String getValidator() {
		return validator;
	}

	public void setValidator(String validator) {
		this.validator = validator;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
}
