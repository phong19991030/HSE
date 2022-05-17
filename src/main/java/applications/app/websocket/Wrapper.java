package applications.app.websocket;

import javax.websocket.Session;

public class Wrapper {

	private String deviceId;
	private String username;
	private Session session;
	private WindTurbineEnpoint enpoint;

	public Wrapper(String deviceId, String username, Session session, WindTurbineEnpoint enpoint) {
		super();
		this.deviceId = deviceId;
		this.username = username;
		this.session = session;
		this.enpoint = enpoint;
	}

	public String getDeviceId() {
		return deviceId;
	}
	
	public String getUsername() {
		return username;
	}

	public Session getSession() {
		return session;
	}

	public WindTurbineEnpoint getEnpoint() {
		return enpoint;
	}
}
