package module.model;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @Description : Sensor Report VO(센서 가공데이터 VO)
 * @author		: yjkim
 * @since		: 2019.10.14
 */
@Document
@Deprecated
public class SensorReport {
	
	private String _id;				// ID
	
	private Double total;			// 발전량 총계
	private Double avg;				// 발전량 평균
	
	
	public SensorReport() {}

	public SensorReport(String _id
					  , Double total
					  , Double avg) {
		this._id = _id;
		this.total = total;
		this.avg = avg;
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}


	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public Double getAvg() {
		return avg;
	}

	public void setAvg(Double avg) {
		this.avg = avg;
	}

	@Override
	public String toString() {
		return "SensorReport [_id=" + _id + ", total=" + total + ", avg=" + avg
				+ "]";
	}

}
