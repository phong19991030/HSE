package module.com.com_0102;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.ModelAndView;

import infrastructure.inheritance.service.AbstractService;
import infrastructure.util.CalendarUtil;
import infrastructure.util.CastUtil;
import module.com.com_0001.Com_0001ServiceImpl;
import module.com.com_0405.Com0405DaoImpl;
import module.hea.Hea_0001DAOImpl;
import module.sys_new.Sys_1100ServiceImpl;

@Service("Com_0102ServiceImpl")
public class Com_0102ServiceImpl extends AbstractService {
	
	@Autowired
	Com_0102DAOImpl projectMgtDAOImpl;
	
	@Autowired
	Com0405DaoImpl com0405DaoImpl;
	
	@Autowired
	Hea_0001DAOImpl hea0001DAOImpl;
	
	@Autowired
	private Sys_1100ServiceImpl sys1100Service;
	
	@Autowired 
	private Com_0001ServiceImpl com0001Service;
	
	@Transactional(propagation= Propagation.REQUIRED, readOnly=true)
    public Map getProjectList(Map param) throws Exception {
		
		Map<Object,Object>  cnt = projectMgtDAOImpl.getProjectCnt(param);
        Map<Object, Object> map = new HashMap<>();
        List list = projectMgtDAOImpl.getProjectList(param);
        map.put("PAGE", param.get("PAGE"));
        map.put("PAGE_SIZE", param.get("PAGE_SIZE"));
        map.put("CNT", cnt.get("CNT"));
        map.put("LIST", list);
        return map;
    }
    
    @Transactional(propagation= Propagation.REQUIRED, readOnly=true)
    public Map getProjectsByCompanyId(Map param) throws Exception {
        Map<Object, Object> map = new HashMap<>();
        List list = projectMgtDAOImpl.getProjectsByCompanyId(param);
        map.put("LIST", list);
        return map;
    }
	
    public Map getAllProjectDetail(Map param) throws Exception {
		
		Map<Object,Object>  cnt = projectMgtDAOImpl.getProjectCnt(param);
        Map<Object, Object> map = new HashMap<>();
        map.put("PRJ_CNT", cnt.get("CNT"));
        map.put("PRJ_TD_CNT", cnt.get("PRJ_TD_CNT"));
        
        Map<Object,Object>  empCnt = hea0001DAOImpl.getEmpMgtCnt(param);
        map.put("EMP_CNT", empCnt.get("CNT"));
        map.put("EMP_TD_CNT", empCnt.get("EMP_TD_CNT"));
        
//     getAllCompany
        List lstCompany = com0405DaoImpl.getAllCompanys(param);
        int noInputManpower = 0;
        int todayInputManpower = 0;
        for (Iterator iterator = lstCompany.iterator(); iterator.hasNext();) {
			Map company = (Map) iterator.next();
			
			Integer companyManpower = 0;
					
			List lstProject = projectMgtDAOImpl.getProjectsByCompanyId(company);
			for (int i = 0; i < lstProject.size(); i++) {
				Map project = (Map) lstProject.get(i);
				Integer manpower = CastUtil.castToInteger(project.get("TOTAL_MANPOWER"));
				noInputManpower += manpower;
				companyManpower += manpower;
				
				String insDt = CastUtil.castToString(project.get("INS_DATE_FM"));
				String td = CalendarUtil.getTodayStrWithFormat("yyyyMMdd"); 
				if(insDt.equals(td)) {
					todayInputManpower += manpower;
				}
				
			}
			company.put("companyManpower", companyManpower);
			company.put("lstProject", lstProject);

			List lstEmp = hea0001DAOImpl.getEmpListByCompanyId(company);
			company.put("lstEmp", lstEmp);
		}
        map.put("noInputManpower", noInputManpower);
        map.put("todayInputManpower", todayInputManpower);
        map.put("LIST", lstCompany);
        return map;
    }
	
	@Transactional(propagation= Propagation.REQUIRED, readOnly=true)
	public List getUserList(Map param) throws Exception {
        List list = projectMgtDAOImpl.getUserList(param);
        return list;
    }

    @Transactional(propagation= Propagation.REQUIRED, readOnly=true)
    public Map getProjectInfo(Map param) throws Exception {
    	Map map = new HashMap();
    	map = projectMgtDAOImpl.getProjectInfo(param);
    	String SFT_PLAN_NAME = "";
    	
    	param.put("COMM_CD", "SPS_CD");
    	List spsLst = sys1100Service.getComCodeListByComm_Cd(param);
    	String str = CastUtil.castToString(map.get("SFT_PLAN"));
    	if(!"".equals(str)) {
    		String[] arr = str.split(",");
    		for (int i = 0; i < arr.length; i++) {
    			for (int j = 0; j < spsLst.size(); j++) {
    				String commCd = (String) ((Map)spsLst.get(j)).get("COMM_CD");
    				String commNm = (String) ((Map)spsLst.get(j)).get("COMM_NM");
    				String tmp = arr[i];
    				if(tmp.equals(commCd)) {
    					SFT_PLAN_NAME += commNm + "!@#";
    				}
				}
				
			}
    	}
    	if(!"".equals(SFT_PLAN_NAME)) {
    		SFT_PLAN_NAME = SFT_PLAN_NAME.substring(0, SFT_PLAN_NAME.length() - 3);
    	}
    	map.put("SFT_PLAN_NAME", SFT_PLAN_NAME);
       return  map;
    }

    @Transactional(propagation=Propagation.REQUIRED)
    public Map delete(ModelAndView mav, Map param) throws Exception {
        Map result = new HashMap();
        boolean isDelete = false;
        try {
            int delete_project_cnt = projectMgtDAOImpl.deleteProject(param);
            result.put("DELETE_PROJECT_CNT", delete_project_cnt > 0 ? 1 : 0);
            isDelete = delete_project_cnt > 0 ? true : false;
            
//          delete Payment
            com0001Service.deletePaymentStatus(mav, param, "PROJECT_ID");
        }
        // 무결성 제약조건(참조키 존재)
        // SQLIntegrityConstraintViolationException |
        catch (DataIntegrityViolationException e) {
            isDelete = false;
            result.put("EXCEPTION", "SQLIntegrityConstraintViolationException");
        }
        result.put("IS_DELETE", isDelete);

        return result;
    }

    @Transactional(rollbackFor = Exception.class)
    public Map insert(ModelAndView mav, Map param) throws Exception {
        Map result = new HashMap();
        try {
        	int insert_project_cnt = projectMgtDAOImpl.insertProject(param);
        	result.put("RESULT_SAVE", insert_project_cnt > 0 ? 1 : 0);
        	result.put("PROJECT_ID", param.get("PROJECT_ID"));
        	
//        	insert Payment
        	com0001Service.insertPaymentStatus(mav, param, "PROJECT_ID");
		} catch (Exception e) {
			throw new RuntimeException();
		}
        
        return result;
    }

    @Transactional(propagation=Propagation.REQUIRED)
    public Map update(Map param) throws Exception {
        Map result = new HashMap();
        int update_project_cnt = projectMgtDAOImpl.updateProject(param);
        result.put("RESULT_SAVE", update_project_cnt > 0 ? 1 : 0);
        result.put("PROJECT_ID", param.get("PROJECT_ID"));
        
        return result;
    }
	
}
