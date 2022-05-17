package applications.sys;

import org.springframework.stereotype.Component;

import infrastructure.inheritance.dao.AbstractDAO;

@Component("sys_0501DAOImpl")
public class Sys_0501DAOImpl extends AbstractDAO {
	
	public Sys_0501DAOImpl() {
		super.namespace = "sys.sys0501";
	}
	
	/**
	 * 사용자내역 저장 (비즈니스 로직)
	 * @작성일    : 2014. 12. 2. 
	 * @작성자      : leehs
	 * @프로그램설명 : 사용자내역 저장 (비즈니스 로직)
	 * @진행상태: TO-DO
	 */
//	@Transactional(propagation=Propagation.REQUIRED)
//	public String saveSTM0201(Map parameter) throws Exception 
//	{
//		
//		return res;
//	}
//	
}
