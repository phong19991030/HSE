package applications.sys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import infrastructure.inheritance.service.AbstractService;

/**
 * @author "kimhd" on 2016.4.5
 *
 */
@Service("Sys_0204ServiceImpl")
@Transactional
public class Sys_0204ServiceImpl extends AbstractService {
	
	@Autowired
	public Sys_0204DAOImpl sys_0204dao;
	public Sys_0204ServiceImpl() {
		super.name= "sys_0204DAOImpl";
	}

}