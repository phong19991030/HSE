package infrastructure.exception;

@SuppressWarnings("serial")
public class ValidateException extends RuntimeException
{
	public ValidateException(ValidationEnum venum){
//		venum.getMessage();
        super("\n\n" + venum.getMessage() + "\n");
	}
    public ValidateException(int i )
    {
//    	ValidationEnum venum = ValidationEnum.getValEnumByNumber(i);
    	 
        super("\n\n" + ValidationEnum.getValEnumByNumber(i).getMessage()+ "\n");
    }
    public ValidateException(String message)
    {
        super("\n\n" + message + "\n");
        
    }

    public ValidateException(Throwable cause)
    {
        super(cause);
    }

    public ValidateException(String message, Throwable cause)
    {
        super(message, cause);
    }
}