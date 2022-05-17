package module.common.main;

import infrastructure.inheritance.dao.AbstractDAO;

import java.util.List;

import org.springframework.stereotype.Component;

/**
 * 메인 DAO 구현체
 * 기능 : 
 * 이력 : 
 * 1) 2013. 10. 7. kdna2m001 최초생성
 * 비고 :
 */
@Component("mainDAOImpl")
public class MainDAOImpl extends AbstractDAO  {
	
	public MainDAOImpl() {
		super.namespace = "common.Main";
	}
	
	
	public Object object(Object parameter) throws Exception {
		return object("get_nextval_seq", parameter);
	}

}
