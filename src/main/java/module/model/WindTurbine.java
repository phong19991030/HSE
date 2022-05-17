package module.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @Description : Wind Turbine VO(발전기 VO)
 * @author		: yjkim
 * @since		: 2019.10.10
 */
@Document(collection="power_system")
@Deprecated
public class WindTurbine {
	
	@Id
	private String _id;				// ID
	
	private String name;			// 이름
	private String serial;			// 시리얼
	private String spec_file_id;	// 사양서 파일 ID
	private String address;			// 주소
	private Double latitude;		// 위도
	private Double longitude;		// 경도
	private String owner_id;		// 소유주 ID
	private String manager_id;		// 관리자 ID
	private String file_server_id;	// 파일 서버 ID
	private String db_server_id;	// DB 서버 ID
	private String description;		// 설명
	private String date;			// 날짜
	
	public WindTurbine() {}
	
	public WindTurbine(String _id
					 , String name
					 , String serial
					 , String spec_file_id
					 , String address
					 , Double latitude
					 , Double longitude
					 , String owner_id
					 , String manager_id
					 , String file_server_id
					 , String db_server_id
					 , String description
					 , String date) {
		this._id = _id;
		this.name = name;
		this.serial = serial;
		this.spec_file_id = spec_file_id;
		this.address = address;
		this.latitude = latitude;
		this.longitude = longitude;
		this.owner_id = owner_id;
		this.manager_id = manager_id;
		this.file_server_id = file_server_id;
		this.db_server_id = db_server_id;
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

	public String getSpec_file_id() {
		return spec_file_id;
	}

	public void setSpec_file_id(String spec_file_id) {
		this.spec_file_id = spec_file_id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public String getOwner_id() {
		return owner_id;
	}

	public void setOwner_id(String owner_id) {
		this.owner_id = owner_id;
	}

	public String getManager_id() {
		return manager_id;
	}

	public void setManager_id(String manager_id) {
		this.manager_id = manager_id;
	}

	public String getFile_server_id() {
		return file_server_id;
	}

	public void setFile_server_id(String file_server_id) {
		this.file_server_id = file_server_id;
	}

	public String getDb_server_id() {
		return db_server_id;
	}

	public void setDb_server_id(String db_server_id) {
		this.db_server_id = db_server_id;
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
		return "WindTurbine [_id=" + _id + ", name=" + name + ", serial="
				+ serial + ", spec_file_id=" + spec_file_id + ", address="
				+ address + ", latitude=" + latitude + ", longitude="
				+ longitude + ", owner_id=" + owner_id + ", manager_id="
				+ manager_id + ", file_server_id=" + file_server_id
				+ ", db_server_id=" + db_server_id + ", description="
				+ description + ", date=" + date + "]";
	}
	
}
