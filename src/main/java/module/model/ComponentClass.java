package module.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 
 *  ComponentClass.java
 *  
 *  @author pjk
 *  @version 1.0
 *  @Date Oct 14, 2019
 *  @Description Component_class of Generator (power_system)
 *  
 *	
 *	수정자				수정 내용
 *	-------------------------------
 *	pjk				최초 생성
 *
 */
@Document(collection="component_class")	// collection 지정 
@Deprecated
public class ComponentClass {
	
	@Id	// Object ID annotation
	private String _id;					// Object ID
	
	private String name;				// 이름
	private String serial;				// 시리얼
	private int is_power_system_sub;	// 상위 클래스 터빈 여부
	private String superior_id;			// 상위 클래스 ID = Power_system_id
	private String description;			// 설명
	private String date;				// 날짜
	
	
	public ComponentClass() {}

	public ComponentClass(String _id
				, String name
				, String serial
				, int is_power_system_sub
				, String superior_id
				, String description
				, String date) {
		this._id = _id;
		this.name = name;
		this.serial = serial;
		this.is_power_system_sub = is_power_system_sub;
		this.superior_id = superior_id;
		this.description = description;
		this.date = date;
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSerial() {
		return serial;
	}

	public void setSerial(String serial) {
		this.serial = serial;
	}

	public int getIs_power_system_sub() {
		return is_power_system_sub;
	}

	public void setIs_power_system_sub(int is_power_system_sub) {
		this.is_power_system_sub = is_power_system_sub;
	}

	public String getSuperior_id() {
		return superior_id;
	}

	public void setSuperior_id(String superior_id) {
		this.superior_id = superior_id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "ComponentClass [_id=" + _id + ", name=" + name + ", serial=" + serial + ", is_power_system_sub="
				+ is_power_system_sub + ", superior_id=" + superior_id + ", description=" + description + ", date="
				+ date + "]";
	}

}