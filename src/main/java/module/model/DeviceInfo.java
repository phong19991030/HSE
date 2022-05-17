package module.model;

import personal.aug.convert.MapAndObjectConversion;
import personal.aug.convert.annotations.MapKey;

/**
 * @author HungDM
 *
 */
public class DeviceInfo extends MapAndObjectConversion {

	@MapKey("ID")
	private Integer id;
	
	@MapKey("USER_UID")
	private String userUid;
	
	@MapKey("DEVICE_ID")
	private String deviceId;
	
	@MapKey("FCM_TOKEN")
	private String fcmToken;

	public DeviceInfo() {
		super();
	}

	public DeviceInfo(int id, String userUid, String deviceId, String fcmToken) {
		super();
		this.id = id;
		this.userUid = userUid;
		this.deviceId = deviceId;
		this.fcmToken = fcmToken;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUserUid() {
		return userUid;
	}

	public void setUserUid(String userUid) {
		this.userUid = userUid;
	}

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	public String getFcmToken() {
		return fcmToken;
	}

	public void setFcmToken(String fcmToken) {
		this.fcmToken = fcmToken;
	}

	@Override
	public String toString() {
		return "DeviceInfo [id=" + id + ", userUid=" + userUid + ", deviceId=" + deviceId + ", fcmToken=" + fcmToken
				+ "]";
	}

}
