package module.model;

import personal.aug.convert.MapAndObjectConversion;
import personal.aug.convert.annotations.MapKey;

public class TccoFile extends MapAndObjectConversion {

	@MapKey("FLE_KEY")
	private String key;
	@MapKey("ATCH_FLE_SEQ")
	private String sequence;
	@MapKey("FLE_TP")
	private String type;
	@MapKey("FLE_PATH")
	private String path;
	@MapKey("FLE_NM")
	private String name;
	@MapKey("NEW_FLE_NM")
	private String newName;
	@MapKey("FLE_SZ")
	private String size;
	@MapKey("DESCRPT")
	private String description;
	
	public TccoFile() { }

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getSequence() {
		return sequence;
	}

	public void setSequence(String sequence) {
		this.sequence = sequence;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNewName() {
		return newName;
	}

	public void setNewName(String newName) {
		this.newName = newName;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
}
