package infrastructure.exception;

/**
 * 기능명 
 * @작성일    : 2016. 7. 8. 
 * @작성자      : keim
 * @프로그램설명 :
 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
 */
public enum ValidationEnum
{

	require( 1, "{1}은 필수값입니다."),
	length(2, "{1}의 자리수는 {2} 입니다."),
	format(3, "{1}은 형식이 맞지 않습니다."),
	email( 4, "{1}은 email 형식이 맞지 않습니다."),
	tel( 5, "{1}은 전화번호 형식이 맞지 않습니다."),
	sn( 6, "{1}은 주민번호 형식이 맞지 않습니다.");
	
	private int id;
	private String message;
	
	ValidationEnum(int i, String message) {
		 this.id = i; 
		 this.message = message;
	}

	public int getId() {
		return id;
	}

	public String getMessage() {
		return message;
	}
	
	public static ValidationEnum getValEnumByNumber(int num){
		ValidationEnum result = null;
		
		for(ValidationEnum rt: ValidationEnum.values()){
			if(rt.getId() == num){
				result = rt;
			}
		}

		return result;
	}
	
	public String getMessage(String[] field){
//		venum.getMessage().matches(regex)
		
		String message = this.getMessage() ;
		int i = 1; 
		for(String str : field){
			message =message.replace("{"+i+"}","\""+ str+"\"");
			i++;
		}
		
		return  message ;
	}
	
}