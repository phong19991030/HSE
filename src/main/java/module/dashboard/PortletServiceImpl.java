package module.dashboard;

import infrastructure.inheritance.service.AbstractService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import module.common.main.MainDAOImpl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import applications.config.TransactionalWithRollback;


/**
 * @author AnhPV
 *@createDate 19th Apr 2019
 */
@Service("PortletServiceImpl")
public class PortletServiceImpl extends AbstractService {
	@Autowired
	public PortletDAOImpl portletdao;
	
	public PortletServiceImpl() {
		super.name= "PortletDAOImpl";
	}

	@TransactionalWithRollback
	public void savePortlet(Map parameter) throws Exception {
		insert("insertWidgetPst", parameter);
	}

	public List getWidgetsData(Map parameter) throws Exception {
		return list("getCurrentUsedWidgets", parameter);
	}
	
	public List getWidgetsDataByActive(Map parameter) throws Exception {
		return list("getWidgetsByActive", parameter);
	}

	public Object addWidget(Map parameter) throws Exception {
		return insert("insertNewWidget", parameter);
	}

	public void saveWidget(Map parameter) throws Exception {
		update("updateWidget", parameter);
	}

	public void deleteWidget(Map parameter) throws Exception {
		delete("deleteWidget", parameter);
	}

	public List getCurrentUsedWidgets(Map parameter) throws Exception {
		return list("getCurrentUsedWidgets", parameter);
	}
	
	public List getDefaultWidgets(Map parameter) throws Exception {
		return list("getCurrentUsedWidgets", parameter);
	}
	
	public List getAllVesion() throws Exception {
		return list("getAllCopy");
	}

	public void deleteCopy(Map parameter) throws Exception {
		delete("deleteCopy", parameter);
	}

	public void createVersion(Map parameter) throws Exception {
		object("generateVersion", parameter);
	}

	public Map getWidgetById(Map parameter) throws Exception {
		return 		(Map) object("getWidgetById", parameter);
	}

	public String checkAdmin(Map parameter) throws Exception {
		return Integer.parseInt(object("checkAdmin", parameter).toString()) > 0? "true": "false";
	}
	
	
	
}