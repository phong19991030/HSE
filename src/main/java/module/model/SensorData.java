package module.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @Description : Sensor Data VO(센서데이터 VO)
 * @author		: yjkim
 * @since		: 2019.10.10
 */
@Document
@Deprecated
public class SensorData {
	
	@Id
	private String _id;				// ID
	
	private String sensor_id;		// 센서 ID
	private String file_server_id;	// raw data 업로드 된 서버 ID
	private String path;			// 서버 내 파일 전체 경로
	private String filename;		// 파일 이름
	private Double min;				// raw data 최소값
	private Double max;				// raw data 최대값
	private Double rms;				// 센서 측정값
	private Double avg;				// raw data 평균값
	private Integer fs;				// 샘플링 속도
	private Integer nsample;		// 샘플 수
	private String state;			// 측정 상태
	private String sdate;			// 샘플링 시작 시각
	private String edate;			// 샘플링 종료 시각
	
	public SensorData() {}
	
	public SensorData(String _id
					, String sensor_id
					, String file_server_id
					, String path
					, String filename
					, Double min
					, Double max
					, Double rms
					, Double avg
					, Integer fs
					, Integer nsample
					, String state
					, String sdate
					, String edate) {
		this._id = _id;
		this.sensor_id = sensor_id;
		this.file_server_id = file_server_id;
		this.path = path;
		this.filename = filename;
		this.min = min;
		this.max = max;
		this.rms = rms;
		this.avg = avg;
		this.fs = fs;
		this.nsample = nsample;
		this.state = state;
		this.sdate = sdate;
		this.edate = edate;
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}
	
	public String getSensor_id() {
		return sensor_id;
	}

	public String getFile_server_id() {
		return file_server_id;
	}
	
	public void setFile_server_id(String file_server_id) {
		this.file_server_id = file_server_id;
	}
	
	public String getPath() {
		return path;
	}
	
	public void setPath(String path) {
		this.path = path;
	}
	
	public String getFilename() {
		return filename;
	}
	
	public void setFilename(String filename) {
		this.filename = filename;
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
	
	public Double getRms() {
		return rms;
	}
	
	public void setRms(Double rms) {
		this.rms = rms;
	}
	
	public Double getAvg() {
		return avg;
	}
	
	public void setAvg(Double avg) {
		this.avg = avg;
	}
	
	public Integer getFs() {
		return fs;
	}
	
	public void setFs(Integer fs) {
		this.fs = fs;
	}
	
	public Integer getNsample() {
		return nsample;
	}
	
	public void setNsample(Integer nsample) {
		this.nsample = nsample;
	}
	
	public String getState() {
		return state;
	}
	
	public void setState(String state) {
		this.state = state;
	}
	
	public String getSdate() {
		return sdate;
	}
	
	public void setSdate(String sdate) {
		this.sdate = sdate;
	}
	
	public String getEdate() {
		return edate;
	}
	
	public void setEdate(String edate) {
		this.edate = edate;
	}

	@Override
	public String toString() {
		return "SensorData [_id=" + _id + ", sensor_id=" + sensor_id
				+ ", file_server_id=" + file_server_id + ", path=" + path
				+ ", filename=" + filename + ", min=" + min + ", max=" + max
				+ ", rms=" + rms + ", avg=" + avg + ", fs=" + fs + ", nsample="
				+ nsample + ", state=" + state + ", sdate=" + sdate
				+ ", edate=" + edate + "]";
	}
	
}
