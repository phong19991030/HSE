package applications.code;

import infrastructure.inheritance.dao.AbstractDAO;

import org.springframework.stereotype.Component;

@Component("codeDAOImpl")
public class CodeDAOImpl extends AbstractDAO {
	
	public CodeDAOImpl() {
		super.namespace = "common.code.Code";
	}
}