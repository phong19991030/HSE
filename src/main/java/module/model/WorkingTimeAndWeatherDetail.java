package module.model;

import oracle.jdbc.logging.annotations.DisableTrace;
import personal.aug.convert.MapAndObjectConversion;
import personal.aug.convert.annotations.MapKey;

//@Deprecated
public class WorkingTimeAndWeatherDetail extends MapAndObjectConversion {

	@MapKey("START_WRK_TIME")
	private String startWorkingTime;
	@MapKey("END_WRK_TIME")
	private String endWorkingTime;
	@MapKey("WEATHER_CD")
	private String weatherCode;
	@MapKey("WEATHER")
	private String weatherValue;
	@MapKey("TEMP")
	private String temperature;
	@MapKey("WIND_SPEED")
	private String windSpeed;
	@MapKey("HUMIDITY")
	private Float humidity;
	
	public WorkingTimeAndWeatherDetail() { }

	public String getStartWorkingTime() {
		return startWorkingTime;
	}

	public void setStartWorkingTime(String startWorkingTime) {
		this.startWorkingTime = startWorkingTime;
	}

	public String getEndWorkingTime() {
		return endWorkingTime;
	}

	public void setEndWorkingTime(String endWorkingTime) {
		this.endWorkingTime = endWorkingTime;
	}

	public String getWeatherCode() {
		return weatherCode;
	}

	public void setWeatherCode(String weatherCode) {
		this.weatherCode = weatherCode;
	}

	public String getWeatherValue() {
		return weatherValue;
	}

	public void setWeatherValue(String weatherValue) {
		this.weatherValue = weatherValue;
	}

	public String getTemperature() {
		return temperature;
	}

	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}

	public String getWindSpeed() {
		return windSpeed;
	}

	public void setWindSpeed(String windSpeed) {
		this.windSpeed = windSpeed;
	}

	public Float getHumidity() {
		return humidity;
	}

	public void setHumidity(Float humidity) {
		this.humidity = humidity;
	}
	
}
