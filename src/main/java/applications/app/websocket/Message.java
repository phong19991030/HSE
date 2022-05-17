package applications.app.websocket;

import java.util.Map;

import personal.aug.convert.MapAndObjectConversion;

public class Message extends MapAndObjectConversion {

	private String title;
	private String body;
	private String image;
	private String icon;
	private String color;
	private Map<String, String> extras;

	public Message() {
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Map<String, String> getExtras() {
		return extras;
	}

	public void setExtras(Map<String, String> extras) {
		this.extras = extras;
	}

	@Override
	public String toString() {
		return "Message [title=" + title + ", body=" + body + ", image=" + image + ", icon=" + icon + ", color=" + color
				+ ", extras=" + extras + "]";
	}

}
