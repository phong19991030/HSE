package module.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @Description : Sensor VO(센서 VO)
 * @author		: yjkim
 * @since		: 2019.10.11
 */
@Deprecated
@Document(collection="sensor")
public class Sensor {
	
	@Id
	private String _id;					// ID
	
	private String name;				// 이름
	private String serial;				// 시리얼
	private String spec_file_id;		// 사양서 파일
	private String power_system_id;		// 대상 풍력터빈 ID
	private String daq_id;				// 측정기기 ID
	private String component_id;		// 컴포넌트 ID
	private String physical_node_id;	// 측정지점 ID
	private Integer channer_name;		// 채널명
	private Integer ichannel;			// 채널번호
	private Integer nsamples;			// 1회 측정 샘플수
	private Integer sampling_rate;		// 샘플링 속도
	private Double sensitivity;			// 민감도
	private Double IEPE;				// IEPE 전류량 또는 Offset
	private Double min;					// 입력 최소 물리량
	private Double max;					// 입력 최대 물리량
	private String terminal_mode;		// 결선 방식
	private String table_name;			// 테이블명
	private String description;			// 설명
	private String date;				// 날짜
	
	public Sensor() {}

	public Sensor(String _id
				, String name
				, String serial
				, String spec_file_id
				, String power_system_id
				, String daq_id
				, String component_id
				, String physical_node_id
				, Integer channer_name
				, Integer ichannel
				, Integer nsamples
				, Integer sampling_rate
				, Double sensitivity
				, Double iEPE
				, Double min
				, Double max
				, String terminal_mode
				, String table_name
				, String description
				, String date) {
		this._id = _id;
		this.name = name;
		this.serial = serial;
		this.spec_file_id = spec_file_id;
		this.power_system_id = power_system_id;
		this.daq_id = daq_id;
		this.component_id = component_id;
		this.physical_node_id = physical_node_id;
		this.channer_name = channer_name;
		this.ichannel = ichannel;
		this.nsamples = nsamples;
		this.sampling_rate = sampling_rate;
		this.sensitivity = sensitivity;
		this.IEPE = iEPE;
		this.min = min;
		this.max = max;
		this.terminal_mode = terminal_mode;
		this.table_name = table_name;
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

	public String getPower_system_id() {
		return power_system_id;
	}

	public void setPower_system_id(String power_system_id) {
		this.power_system_id = power_system_id;
	}

	public String getDaq_id() {
		return daq_id;
	}

	public void setDaq_id(String daq_id) {
		this.daq_id = daq_id;
	}

	public String getComponent_id() {
		return component_id;
	}

	public void setComponent_id(String component_id) {
		this.component_id = component_id;
	}

	public String getPhysical_node_id() {
		return physical_node_id;
	}

	public void setPhysical_node_id(String physical_node_id) {
		this.physical_node_id = physical_node_id;
	}

	public Integer getChanner_name() {
		return channer_name;
	}

	public void setChanner_name(Integer channer_name) {
		this.channer_name = channer_name;
	}

	public Integer getIchannel() {
		return ichannel;
	}

	public void setIchannel(Integer ichannel) {
		this.ichannel = ichannel;
	}

	public Integer getNsamples() {
		return nsamples;
	}

	public void setNsamples(Integer nsamples) {
		this.nsamples = nsamples;
	}

	public Integer getSampling_rate() {
		return sampling_rate;
	}

	public void setSampling_rate(Integer sampling_rate) {
		this.sampling_rate = sampling_rate;
	}

	public Double getSensitivity() {
		return sensitivity;
	}

	public void setSensitivity(Double sensitivity) {
		this.sensitivity = sensitivity;
	}

	public Double getIEPE() {
		return IEPE;
	}

	public void setIEPE(Double iEPE) {
		IEPE = iEPE;
	}

	public Double getMin() {
		return min;
	}

	public void setMin(Double min) {
		this.min = min;
	}

	public Double getMax() {
		return max;
	}

	public void setMax(Double max) {
		this.max = max;
	}

	public String getTerminal_mode() {
		return terminal_mode;
	}

	public void setTerminal_mode(String terminal_mode) {
		this.terminal_mode = terminal_mode;
	}

	public String getTable_name() {
		return table_name;
	}

	public void setTable_name(String table_name) {
		this.table_name = table_name;
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
		return "Sensor [_id=" + _id + ", name=" + name + ", serial=" + serial
				+ ", spec_file_id=" + spec_file_id + ", power_system_id="
				+ power_system_id + ", daq_id=" + daq_id + ", component_id="
				+ component_id + ", physical_node_id=" + physical_node_id
				+ ", channer_name=" + channer_name + ", ichannel=" + ichannel
				+ ", nsamples=" + nsamples + ", sampling_rate=" + sampling_rate
				+ ", sensitivity=" + sensitivity + ", IEPE=" + IEPE + ", min="
				+ min + ", max=" + max + ", terminal_mode=" + terminal_mode
				+ ", table_name=" + table_name + ", description=" + description
				+ ", date=" + date + "]";
	}

}
