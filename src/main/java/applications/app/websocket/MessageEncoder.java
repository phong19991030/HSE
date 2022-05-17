package applications.app.websocket;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import com.google.gson.Gson;

public class MessageEncoder implements Encoder.Text<Message> {

	private static Gson gson = new Gson();
	
	@Override
	public void destroy() {
		// Ignored
	}

	@Override
	public void init(EndpointConfig config) {
		// Ignored
	}

	@Override
	public String encode(Message message) throws EncodeException {
		return gson.toJson(message);
	}

}
