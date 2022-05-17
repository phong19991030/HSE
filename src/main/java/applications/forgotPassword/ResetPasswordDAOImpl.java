package applications.forgotPassword;

import org.springframework.stereotype.Component;

import infrastructure.inheritance.dao.AbstractDAO;


@Component("resetPasswordDAOImpl")
public class ResetPasswordDAOImpl extends AbstractDAO {

	public ResetPasswordDAOImpl() {
		super.namespace = "common.ResetPassword";
	}
}
