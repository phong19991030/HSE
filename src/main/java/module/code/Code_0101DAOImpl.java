package module.code;

import org.springframework.stereotype.Component;

import infrastructure.inheritance.dao.AbstractDAO;

@Component("Code_0101DAOImpl")
public class Code_0101DAOImpl extends AbstractDAO{
	
	public Code_0101DAOImpl() {
		super.namespace = "code.Code_0101";
	}
}
