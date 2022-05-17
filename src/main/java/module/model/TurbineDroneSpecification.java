package module.model;

import personal.aug.convert.MapAndObjectConversion;
import personal.aug.convert.annotations.MapKey;

public class TurbineDroneSpecification extends MapAndObjectConversion {

	@MapKey("DRONE_ID")
	private String droneId;
	@MapKey("DRONE_TYPE")
	private String droneType;
	@MapKey("FLT_TM")
	private String flightTime;
	@MapKey("FLT_RNG")
	private String flightRange;
	@MapKey("OPRTG_ALT")
	private String operatingAltitude;
	@MapKey("OPRTG_WND_SPD")
	private String operatingWindSpeed;
	@MapKey("MAX_FLT_SPD")
	private String maxFlightSpeed;
	@MapKey("SHOOTING_CAM")
	private String shootingCam;
	@MapKey("LENS")
	private String lens;
	
	public TurbineDroneSpecification() { }

	public String getDroneId() {
		return droneId;
	}

	public void setDroneId(String droneId) {
		this.droneId = droneId;
	}

	public String getDroneType() {
		return droneType;
	}

	public void setDroneType(String droneType) {
		this.droneType = droneType;
	}

	public String getFlightTime() {
		return flightTime;
	}

	public void setFlightTime(String flightTime) {
		this.flightTime = flightTime;
	}

	public String getFlightRange() {
		return flightRange;
	}

	public void setFlightRange(String flightRange) {
		this.flightRange = flightRange;
	}

	public String getOperatingAltitude() {
		return operatingAltitude;
	}

	public void setOperatingAltitude(String operatingAltitude) {
		this.operatingAltitude = operatingAltitude;
	}

	public String getOperatingWindSpeed() {
		return operatingWindSpeed;
	}

	public void setOperatingWindSpeed(String operatingWindSpeed) {
		this.operatingWindSpeed = operatingWindSpeed;
	}

	public String getMaxFlightSpeed() {
		return maxFlightSpeed;
	}

	public void setMaxFlightSpeed(String maxFlightSpeed) {
		this.maxFlightSpeed = maxFlightSpeed;
	}

	public String getShootingCam() {
		return shootingCam;
	}

	public void setShootingCam(String shootingCam) {
		this.shootingCam = shootingCam;
	}

	public String getLens() {
		return lens;
	}

	public void setLens(String lens) {
		this.lens = lens;
	}
	
}
