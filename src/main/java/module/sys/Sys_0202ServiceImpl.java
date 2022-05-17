package module.sys;

import infrastructure.inheritance.service.AbstractService;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author "kimhd" on 2016.4.5
 *
 */
@Service("Sys_0202ServiceImpl")
@Transactional
public class Sys_0202ServiceImpl extends AbstractService {
	@Autowired
	public Sys_0202DAOImpl stm_0202dao;
	public Sys_0202ServiceImpl() {
		super.name= "sys_0202DAOImpl";
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public String saveSTM0202(Map parameter, HttpServletRequest request) throws Exception {
		return stm_0202dao.saveSTM0202(parameter, request);
	}
}