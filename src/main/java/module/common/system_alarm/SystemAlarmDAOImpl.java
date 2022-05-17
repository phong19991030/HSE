package module.common.system_alarm;

import java.util.List;
import java.util.Map;

import infrastructure.inheritance.dao.AbstractDAO;

import org.springframework.stereotype.Repository;

@Repository("SystemAlarmDAOImpl")
public class SystemAlarmDAOImpl extends AbstractDAO {

	public SystemAlarmDAOImpl() {
		super.namespace = "common.systemalarm";
	}
	
	public List getSensorError(Map param) throws Exception {
		return list("getSensorError", param);
	}
	
	public List getNotice(Map param) throws Exception {
		return list("getNotice", param);
	}
	
	public List getScadaAlarm(Map param) throws Exception {
		return list("getScadaAlarm", param);
	}
	
	public void insertAllAlarmHistory(Map param) throws Exception {
		insert("insertAllAlarmHistory", param);
	}
	
	public void updateAlarmHistory(Map param) throws Exception {
		update("updateAlarmHistory", param);
	}
	
	public void updateAllAlarmHistory(Map param) throws Exception {
		update("updateAllAlarmHistory", param);
	}
}
