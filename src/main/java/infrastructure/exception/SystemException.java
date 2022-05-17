package infrastructure.exception;

@SuppressWarnings("serial")
public class SystemException extends RuntimeException
{

    public SystemException(){}

    public SystemException(String message)
    {
        super("\n\n" + message + "\n");
    }

    public SystemException(Throwable cause)
    {
        super(cause);
    }

    public SystemException(String message, Throwable cause)
    {
        super(message, cause);
    }
}