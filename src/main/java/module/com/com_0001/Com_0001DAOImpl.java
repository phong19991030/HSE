package module.com.com_0001;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("Com_0001DAOImpl")
public class Com_0001DAOImpl extends AbstractDAO {

	public Com_0001DAOImpl() {
		super.namespace = "com.com_0001";
	}

	public List getPaymentList(Map param) throws Exception{
		return list("getPaymentList", param);
	}
	
	public List getMenuPaymentLst(Map param) throws Exception{
		return list("getMenuPaymentLst", param);
	}
	
	public Map getPaymentCnt(Map param) throws Exception{
		return map("getPaymentCnt", param);
	}
	
	public int insertPaymentStatus(Map param) throws Exception {
		return (int) insert("insertPaymentStatus", param);
	}
	
	public int deletePaymentStatus(Map param) throws Exception {
		return (int) delete("deletePaymentStatus", param);
	}
}
