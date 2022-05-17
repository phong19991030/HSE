package applications.app.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

	@MessageMapping("/notificationCenter")
	@SendTo("/topic/greetings")
	public String greetings() {
		System.out.println("WebSocket GREETINGS!!!");
		return "WEBSOCKET GREETINGS";
	}
	
}
