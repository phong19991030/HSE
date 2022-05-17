package module.common.system_alarm;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import infrastructure.inheritance.service.AbstractService;

@Service("SystemAlarmServiceImpl")
public class SystemAlarmServiceImpl extends AbstractService {
	
	@Autowired
	SystemAlarmDAOImpl dao;
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getSensorError(Map param) throws Exception {
		return dao.getSensorError(param);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getNotice(Map param) throws Exception {
		return dao.getNotice(param);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, readOnly=true)
	public List getScadaAlarm(Map param) throws Exception {
		return dao.getScadaAlarm(param);
	}
	
	public void insertAllAlarmHistory(Map param) throws Exception {
		dao.insertAllAlarmHistory(param);
	}
	
	public void updateAlarmHistory(Map param) throws Exception {
		dao.updateAlarmHistory(param);
	}
	
	public void updateAllAlarmHistory(Map param) throws Exception {
		dao.updateAllAlarmHistory(param);
	}
	
}
