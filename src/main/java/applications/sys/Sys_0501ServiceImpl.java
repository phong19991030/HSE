package applications.sys;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import applications.util.Utils;
import infrastructure.inheritance.service.AbstractService;
import infrastructure.util.CommonUtil;

/**
 * @author "kimhd" on 2016.4.5
 *
 */
@Service("Sys_0501ServiceImpl")
@Transactional
public class Sys_0501ServiceImpl extends AbstractService {

	@Autowired
	public Sys_0501DAOImpl sys_0501dao;

	public Sys_0501ServiceImpl() {
		super.name = "sys_0501DAOImpl";
	}
	
	@Transactional(propagation = Propagation.REQUIRED)
	public String saveSTM0501(Map parameter, HttpServletRequest request) throws Exception {

		String res = "true";
		String crudId= "";
		String ATTACH = CommonUtil.getMapValue(parameter, "ATCH_FLE_SEQ", "");
		/*
		 * @JK - 보안 취약점 수정 
		 */
		//Map formInfor = (Map) parameter.get("form");
		Map formInfor = null;
		if(parameter != null) {
			formInfor = (Map) parameter.get("form");
		}
		final String userUid = CommonUtil.getMapValue(parameter, "USER_UID", "");
		formInfor.put("USER_UID", userUid);
		if (formInfor.size()>0) {
			crudId=  (String) formInfor.get("CRUD");
			if (!Utils.isNullOrEmpty(ATTACH)) {
				formInfor.put("LOGO", ATTACH);
			}
		}
		try {
			if (crudId.equals("U")) {
				Map comp = (Map) sys_0501dao.object("getCompanyById", formInfor);
				if(!comp.get("CLS").toString().equals(formInfor.get("CLS").toString())) {
					boolean check = Integer.parseInt(sys_0501dao.object("checkInuse", parameter.get("form")).toString()) > 0? false: true;
					if(!check) {
						return "inuse";
					}
				}

				update("updateCompany",formInfor);
				request.setAttribute("EVENT", "UPDATE");
			}else if(crudId.equals("C")){			
				insert("insertCompany",formInfor);
				request.setAttribute("EVENT", "DELETE");
			
			}
		}catch (Exception e) {
			res= "false";
			//e.printStackTrace();
			exceptionLogging(e);
		}
		return res;
	}
}