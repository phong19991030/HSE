package module.model;

import personal.aug.convert.MapAndObjectConversion;
import personal.aug.convert.annotations.MapKey;

public class TurbineSpecification extends MapAndObjectConversion {

	@MapKey("GERATOR_SPEC_ID")
	private String geratorSpecId;
	@MapKey("MODEL")
	private String model;
	@MapKey("ROTOR_DIAM")
	private Integer rotorDiam;
	@MapKey("TWR_H")
	private Integer towerHeight;
	@MapKey("BLD_TYPE")
	private String bladeType;
	@MapKey("BLD_LEN")
	private Integer bladeLength;
	@MapKey("BLD_COLOR")
	private String bladeColor;
	@MapKey("BLD_SER_NO")
	private String bladeSerial;
	
	public TurbineSpecification() { }

	public String getGeratorSpecId() {
		return geratorSpecId;
	}

	public void setGeratorSpecId(String geratorSpecId) {
		this.geratorSpecId = geratorSpecId;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public Integer getRotorDiam() {
		return rotorDiam;
	}

	public void setRotorDiam(Integer rotorDiam) {
		this.rotorDiam = rotorDiam;
	}

	public Integer getTowerHeight() {
		return towerHeight;
	}

	public void setTowerHeight(Integer towerHeight) {
		this.towerHeight = towerHeight;
	}

	public String getBladeType() {
		return bladeType;
	}

	public void setBladeType(String bladeType) {
		this.bladeType = bladeType;
	}

	public Integer getBladeLength() {
		return bladeLength;
	}

	public void setBladeLength(Integer bladeLength) {
		this.bladeLength = bladeLength;
	}

	public String getBladeColor() {
		return bladeColor;
	}

	public void setBladeColor(String bladeColor) {
		this.bladeColor = bladeColor;
	}

	public String getBladeSerial() {
		return bladeSerial;
	}

	public void setBladeSerial(String bladeSerial) {
		this.bladeSerial = bladeSerial;
	}
	
}
