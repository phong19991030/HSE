package applications.app.websocket;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import applications.util.Utils;

@ServerEndpoint(value = "/notificationCenter/{username}/{deviceId}", encoders = MessageEncoder.class, decoders = MessageDecoder.class)
public class WindTurbineEnpoint {
	private static final Logger logger = LogManager.getLogger(WindTurbineEnpoint.class);

	private Wrapper wrapper;
	private static Set<Wrapper> notificationWrappers = new CopyOnWriteArraySet<>();

	@OnOpen
	public void onOpen(Session session, @PathParam("username") String username,
			@PathParam("deviceId") String deviceId) {

		try {
			// TODO: check username exist & unique in DB?
			this.wrapper = new Wrapper(deviceId, username, session, this);
			notificationWrappers.add(this.wrapper);
			logger.info(String.format("[%s] connected.", username));
			// Message message = new Message();
			// broadcast(message);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
	}

	@OnMessage
	public void onMessage(Session session, Message message) {
		// Ignored, because this server use only to send push notification messages.
		logger.info(message.toString());
	}

	@OnClose
	public void onClose(Session session) {

		try {
			logger.info(String.format("[%s] disconnected.", this.wrapper.getUsername()));
			notificationWrappers.remove(this.wrapper);
			// Message message = new Message();
			// broadcast(message);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
	}

	@OnError
	public void onError(Session session, Throwable throwable) {
		// Do error handling here
		throwable.printStackTrace();
		logger.error(
				String.format("[%s] error when communication!\nDetail:\n%s", this.wrapper.getUsername(), throwable));
	}

	public static void send(String username, Message message) throws IOException, EncodeException {
		if (Utils.isNullOrEmpty(username) || message == null || notificationWrappers == null
				|| notificationWrappers.isEmpty())
			return;

		notificationWrappers.forEach(wrapper -> {
			synchronized (wrapper) {
				if (username.equals(wrapper.getUsername())) {
					try {
						wrapper.getSession().getBasicRemote().sendObject(message);
					} catch (IOException | EncodeException e) {
						e.printStackTrace();
					}
				}
			}
		});
	}
}
