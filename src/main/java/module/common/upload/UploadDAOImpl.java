package module.common.upload;

import java.util.Map;

import org.springframework.stereotype.Repository;

import infrastructure.inheritance.dao.AbstractDAO;

@Repository("UploadDAOImpl")
public class UploadDAOImpl extends AbstractDAO {

	public UploadDAOImpl() {
		super.namespace = "common.upload";
	}
	
	public Map getFile(Map param) throws Exception {
		return map("getFile", param);
	}
	
	public void insert(Map param) throws Exception {
		insert("insert", param);
	}
	public void delete(Map param) throws Exception {
		insert("delete", param);
	}
}
