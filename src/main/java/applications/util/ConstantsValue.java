package applications.util;

/**
 * 
 * ConstantsValue
 *
 * @Description : class provide common constants value for this application, can use anywhere
 * @Create : Oct 31, 2018 
 * @Author : HungDM
 * @Status : COMPLETE
 */
public class ConstantsValue {

	public static final String MAIL_CONFIG_FILE_NAME = "mailconfig.properties";
	public static final String TRUSTSTORE_CONFIG_FILE_NAME = "truststoreconfig.properties";
	public static final String COMMON_PROPS_NAME = "common.properties";
	
	/**
	 * 
	 * SessionKey
	 *
	 * @Description : session key, use to get value of session by key
	 * @Create : Oct 31, 2018 
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	public static enum SessionKey {
		
		USER_SECURITY_LEVEL("USER_SECURITY_LEVEL"),
		USER_ID("USER_ID"),
		USER_UID("USER_UID"),
		SESSION_ID("SESSION_ID");
		
		private String key;
		
		private SessionKey(String key) {
			this.key = key;
		}
		
		public String getKey() {
			return key;
		}
	}
	
	public static enum SubmitResponse{
		
		SUBMIT_SUCCESS("001-1"),
		APVL_LINE_EMPTY("001-2"),
		APPROVER_SEC_LESS_THAN_DRAFT("001-3"),
		SUBMMITER_SEC_LESS_THAN_DRAFT("001-4"),
		RECEIVERS_IS_EMPTY("001-5"),
		UNDO_SUCCESS("001-6"),
		INVALID_ATCTION("001-7"),
		BINDING_IS_EMPTY("001-8"),
		APVL_LINE_WRONG("001-9");
		
		private String key;
		
		private SubmitResponse(String key) {
			this.key = key;
		}
		
		public String getValue() {
			return key;
		}
	}
	
	/**
	 * 
	 * EmailType
	 *
	 * @Description : type for system send email separate by each type
	 * @Create : Nov 20, 2018 
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	public static enum EmailType {
		NOTICE_ACCEPTED,
		NOTICE_CAME,
		NOTICE_RETURN,
		NOTICE_REJECT,
		NOTICE_COMPLETE
	}
	public static enum ApiMesseageResponse{
		
		VALIDATE_APPROVALINE("000-000"),
		APVL_LINE_ERROR_SIZE("000-001"),
		APVL_LINE_ERROR_TYPE("000-002"),
		APVL_LINE_ERROR_USER("000-003"),
		APVL_LINE_ERROR_SECURITY("000-004"),
		DONT_CREATE_DOCUMENT("000-005"),
		APPROVAL_DOCUMENT("000-006"),
		REJECT_DOCUMENT("000-007"),
		UNDO_DOCUMENT("000-008"),
		ERROR_BINDING_DOCUMENT("000-009"),
		ERROR_TITLE_DOCUMENT("000-010");
		private String key;
		
		private ApiMesseageResponse(String key) {
			this.key = key;
		}
		
		public String getValue() {
			return key;
		}
	}
	public static enum EmailJsonResult {
		STATUS_KEY("status"),
		MESSAGE_KEY("message"),
		STATUS_VALUE_SUCCESS("success"),
		STATUS_VALUE_ERROR("error");
		
		private String value;
		
		private EmailJsonResult(String value) {
			this.value = value;
		}

		public String getValue() {
			return value;
		}
		
	}
	
	public static enum MailQueueStatus {
		
		WAITING_FOR_SEND(0, "Waiting for send email"),
		SENT(1, "Email is sent"),
		ERROR_CONNECT(2, "Can't connect to mail server or timeout"),
		ERROR_EXCEPTION(3, "Exception occurs when trying to send email");
		
		private int value;
		private String description;
		
		private MailQueueStatus(int value, String description) {
			this.value = value;
			this.description = description;
		}

		public int getValue() {
			return value;
		}

		public String getDescription() {
			return description;
		}
		
	}
	
}
