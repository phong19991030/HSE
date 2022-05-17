package module.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 
 *  Component.java
 *  
 *  @author pjk
 *  @version 1.0
 *  @Date Oct 14, 2019
 *  @Description Generator Component_class
 *  
 *	
 *	수정자				수정 내용
 *	-------------------------------
 *	pjk				최초 생성
 *
 */
@Document(collection="component")
@Deprecated
public class Component {
	
	@Id
	private String _id;					// Object ID
	
	private String name;				// 이름
	private String spec_file_id;		// 업로드 사양서 파일
	private String component_class_id;	// Component 상위 class ID
	private String description;			// 설명
	private String date;				// 날짜
	
	
	public Component() {}

	public Component(String _id
				, String name
				, String spec_file_id
				, String component_class_id
				, String description
				, String date) {
		this._id = _id;
		this.name = name;
		this.spec_file_id = spec_file_id;
		this.component_class_id = component_class_id;
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

	public String getSpec_file_id() {
		return spec_file_id;
	}

	public void setSpec_file_id(String spec_file_id) {
		this.spec_file_id = spec_file_id;
	}

	public String getComponent_class_id() {
		return component_class_id;
	}

	public void setComponent_class_id(String component_class_id) {
		this.component_class_id = component_class_id;
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
		return "Component [_id=" + _id + ", name=" + name + ", spec_file_id=" + spec_file_id + ", component_class_id="
				+ component_class_id + ", description=" + description + ", date=" + date + "]";
	}
	
}