package infrastructure.exception;

@SuppressWarnings("serial")
public class ModelConvertException extends RuntimeException
{

    public ModelConvertException(){}

    public ModelConvertException(String message)
    {
        super("\n\n" + message + "\n");
    }

    public ModelConvertException(Throwable cause)
    {
        super(cause);
    }

    public ModelConvertException(String message, Throwable cause)
    {
        super(message, cause);
    }
}