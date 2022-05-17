package module.dashboard;


import infrastructure.inheritance.dao.AbstractDAO;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;




@Component("PortletDAOImpl")
public class PortletDAOImpl extends AbstractDAO {
	
	public PortletDAOImpl() {
		super.namespace = "portlet.portlet";
	}




}