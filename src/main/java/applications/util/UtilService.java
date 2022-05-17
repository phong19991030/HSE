package applications.util;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import applications.util.ConstantsValue.SessionKey;
import infrastructure.inheritance.dao.AbstractDAO;
import infrastructure.util.CastUtil;
import infrastructure.util.CommonUtil;

/**
 * 
 * UtilService
 *
 * @Description : provide some utilities method to call anywhere in this application
 * @Create : Oct 31, 2018 
 * @Author : HungDM
 * @Status : COMPLETE
 */
@Service
public class UtilService extends AbstractDAO {

	// set namespace to get mapper UtilMapper.xml
	public UtilService() {
		super.setNamespace("util.mapper");
	}
	
	/**
	 * 
	 * getUserSecurityLevel
	 *
	 * @Description : get user security level by USER_UID
	 * @Output : int
	 * @Create : Oct 31, 2018 
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	public int getUserSecurityLevel(HttpServletRequest request, Object parameters) throws Exception {
		// check session exist user security level
		Object lev = request.getSession().getAttribute(SessionKey.USER_SECURITY_LEVEL.getKey());
		if (lev != null)
			return (int) lev;
		
		int userSecLev = CastUtil.castToInteger(object("getUserSecurityLevel", parameters));
		request.getSession().setAttribute(SessionKey.USER_SECURITY_LEVEL.getKey(), userSecLev);
		
		return userSecLev;
	}
	
	/**
	 * 
	 * getDocSecurityLevel
	 *
	 * @Description : get Document or Documentary security level by DOC_MNG_NO
	 * @Output : int
	 * @Create : Oct 31, 2018 
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	public int getDocSecurityLevel(Object parameters) throws Exception {
		return CastUtil.castToInteger(object("getDocSecurityLevel", parameters));
	}
	
	/**
	 * 
	 * updateMailQueue
	 *
	 * @Description : insert email waiting for send to MAIL_QUEUE and return rows affected
	 * @Output : int
	 * @Create : Nov 28, 2018 
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	public int updateMailQueue(Object parameters) throws Exception {
		return CastUtil.castToInteger(update("updateMailQueue", parameters));
	}
	
	/**
	 * 
	 * insertMailQueue
	 *
	 * @Description : insert email waiting for send to MAIL_QUEUE and return rows affected
	 * @Output : int
	 * @Create : Nov 28, 2018 
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	public int insertMailQueue(Object parameters) throws Exception {
		return CastUtil.castToInteger(insert("insertMailQueue", parameters));
	}
	
	/**
	 * 
	 * selectMailOnQueue
	 *
	 * @Description : insert email waiting for send to MAIL_QUEUE and return rows affected
	 * @Output : List<Map<String, Object>>
	 * @Create : Nov 28, 2018 
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectMailOnQueue(Object parameters) throws Exception {
		return (List<Map<String, Object>>) list("selectMailOnQueue", parameters);
	}
	
	public int insertFileToTCCO_FILE(Object parameters) throws Exception {
		return CastUtil.castToInteger(insert("insertFileToTCCO_FILE", parameters));
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> getFileById(Map param) throws Exception {
		Object result = map("getFileById", param);
		return result != null ? (HashMap<String, Object>) result : null;
	}
	
	public int updateDescForFile(Object parameters) throws Exception {
		return CastUtil.castToInteger(update("updateDescForFile", parameters));
	}
	
	public void deleteFileFromTCCO_FILE(String fileSequence) throws Exception {
		delete("deleteFileFromTCCO_FILE", fileSequence);
	}
	
	public void deleteFileFromTCCO_FILEV2(String fileSequence) throws Exception {
		delete("deleteFileFromTCCO_FILEV2", fileSequence);
	}
	
	public String getOriginalFileName(String newName) throws Exception {
		Object rs = objectString("getOriginalFileName", newName);
		return rs != null ? String.valueOf(rs) : "";
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> getRememberMeByUserUID(String userUid) throws Exception {
		Object result = objectString("getRememberMeByUserUID", userUid);
		return result != null ? (HashMap<String, Object>) result : new HashMap<String, Object>();
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> rememberMeFindSelector(String selector) throws Exception {
		Object result = objectString("rememberMeFindSelector", selector);
		return result != null ? (HashMap<String, Object>) result : new HashMap<String, Object>();
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> getUserByUserId(String userId) throws Exception {
		Object result = objectString("getUserByUserId", userId);
		return result != null ? (HashMap<String, Object>) result : null;
	}
	
	public int insertRememberMe(Object params) throws Exception {
		return CastUtil.castToInteger(insert("insertRememberMe", params));
	}
	
	public void deleteRememberMe(Object params) throws Exception {
		delete("deleteRememberMe", params);
	}
	
	public int updateUserPassword(Object params) throws Exception {
		return CastUtil.castToInteger(update("updateUserPassword", params));
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> getGereratorSuggestion(Object params) throws Exception {
		Map<String, Object> rs = new HashMap<>();
		if (params == null || !((Map<String, Object>) params).containsKey("EVENT_ID")
				|| CommonUtil.getMapValue((Map<String, Object>) params, "EVENT_ID", "").isEmpty()) {
			return rs;
		}
		Object generatorInfo = object("getGereratorSuggestion", params);
		if (generatorInfo != null) {
			rs = (Map<String, Object>) generatorInfo;
			if (!rs.isEmpty() && rs.containsKey("GERATOR_ID")) {
				((Map<String, Object>) params).putAll(rs);
				List<Map<String, Object>> props = (List<Map<String, Object>>) list("getGereratorProps", params);
				if (props != null && !props.isEmpty()) {
					Map<String, Object> serial = new HashMap<>();
					for (Map<String, Object> prop : props) {
						if (prop != null && !prop.isEmpty()) {
							final String partName = CommonUtil.getMapValue(prop, "PART_NM", "");
							final String propId = CommonUtil.getMapValue(prop, "PART_PROP_ID", "");
							if (!propId.isEmpty()) {
								switch (propId) {
								case "BLADE_COLOR":
									if (!rs.containsKey("BLADE_COLOR"))
										rs.put("BLADE_COLOR", CommonUtil.getMapValue(prop, "PROP_VALUE", ""));
									break;
								case "BLADE_LENGTH":
									if (!rs.containsKey("BLADE_LENGTH"))
										rs.put("BLADE_LENGTH", CommonUtil.getMapValue(prop, "PROP_VALUE", ""));
									break;
								case "BLADE_TYPE":
									if (!rs.containsKey("BLADE_TYPE"))
										rs.put("BLADE_TYPE", CommonUtil.getMapValue(prop, "PROP_VALUE", ""));
									break;
								case "TOWER_HEIGHT":
									if (!rs.containsKey("TOWER_HEIGHT"))
										rs.put("TOWER_HEIGHT", CommonUtil.getMapValue(prop, "PROP_VALUE", ""));
									break;
								case "ROTOR":
									if (!rs.containsKey("ROTOR"))
										rs.put("ROTOR", CommonUtil.getMapValue(prop, "PROP_VALUE", ""));
									break;
								}
							}
							
							if (!partName.isEmpty()) {
								switch (partName) {
								case "BLDE_CD1":
									if (!serial.containsKey("1"))
										serial.put("1", CommonUtil.getMapValue(prop, "SERIAL_NO", ""));
									break;
								case "BLDE_CD2":
									if (!serial.containsKey("2"))
										serial.put("2", CommonUtil.getMapValue(prop, "SERIAL_NO", ""));
									break;
								case "BLDE_CD3":
									if (!serial.containsKey("3"))
										serial.put("3", CommonUtil.getMapValue(prop, "SERIAL_NO", ""));
									break;
								}
							}
							
							rs.put("BLADE_SERIAL", serial);
						}
					}
				}
			}
		}
		
		return rs;
	}
	
	public AjaxResult deleteFileUtil(String fileSeq, String filePath){
		AjaxResult result = new AjaxResult();
		if (Utils.isNullOrEmpty(fileSeq)) {
			result.setStatus(false);
			result.setMessage("No sequence found to delete!");
		} else {
			try {
				deleteFileFromTCCO_FILE(fileSeq);
				if (!filePath.isEmpty()) {
					File fileToDelete = new File(filePath);
					
					synchronized (fileToDelete) {
						if (fileToDelete.exists())
							fileToDelete.delete();
					}
				}
				result.setStatus(true);
				result.setMessage("Delete successfully!");
			} catch (Exception e) {
				e.printStackTrace();
			}
			// delete file from hard disk
		}
			
		return result;
	}
}
