package applications.app;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import infrastructure.inheritance.dao.AbstractDAO;
import infrastructure.util.CastUtil;
import module.model.DeviceInfo;

/**
 * @author HungDM
 *
 */
@Component
public class AppDAOImpl extends AbstractDAO {

	public AppDAOImpl() {
		super.setNamespace("applications.app.App");
	}

	public int saveDeviceInfo(Map<Object, Object> data) {
		DeviceInfo deviceInfo = new DeviceInfo().fromMap(data);

		try {
			List<DeviceInfo> deviceInfoList = getDeviceInfoByDeviceId(deviceInfo.getDeviceId());
			if (!deviceInfoList.isEmpty()) {
				DeviceInfo deviceExist = null;
				for (DeviceInfo device : deviceInfoList) {
					if (deviceInfo.getDeviceId().equals(device.getDeviceId())) {
						deviceExist = device;
					}
				}

				if (deviceExist != null) {
					deviceInfo.setId(deviceExist.getId());
					return CastUtil.castToInteger(updateDeviceInfoByDeviceId(deviceInfo.toMap()));
				} else {
					return CastUtil.castToInteger(this.insert("saveDeviceInfo", data));
				}
			} else {
				return CastUtil.castToInteger(this.insert("saveDeviceInfo", data));
			}
		} catch (Exception e) {
			//e.printStackTrace();
			exceptionLogging(e);
		}
		
		return 0;
	}

	public int updateDeviceInfoByDeviceId(Map<Object, Object> data) throws Exception {
		return CastUtil.castToInteger(this.update("updateDeviceInfoByDeviceId", data));
	}

	@SuppressWarnings("unchecked")
	public List<DeviceInfo> getDeviceInfoByUserUID(String userUid) {
		List<DeviceInfo> rs = new ArrayList<DeviceInfo>(0);
		try {
			Object result = this.list(super.getNamespace(), "getDeviceInfoByUserUID", userUid);
			if (result != null) {
				List<Map<Object, Object>> resultList = (List<Map<Object, Object>>) result;
				for (Map<Object, Object> deviceMap : resultList) {
					if (deviceMap != null && !deviceMap.isEmpty()) {
						rs.add(new DeviceInfo().fromMap(deviceMap));
					}
				}
			}
		} catch (Exception e) {
			//e.printStackTrace();
			exceptionLogging(e);
		}
		return rs;
	}
	
	/**
	 * Get device info list by User ID and Windows platform.
	 * @param userId
	 * @return
	 * @author HungDM
	 */
	@SuppressWarnings("unchecked")
	public List<DeviceInfo> getDeviceInfoByUserID(String userId) {
		List<DeviceInfo> rs = new ArrayList<DeviceInfo>(0);
		try {
			Object result = this.list(super.getNamespace(), "getDeviceInfoByUserID", userId);
			if (result != null) {
				List<Map<Object, Object>> resultList = (List<Map<Object, Object>>) result;
				for (Map<Object, Object> deviceMap : resultList) {
					if (deviceMap != null && !deviceMap.isEmpty()) {
						rs.add(new DeviceInfo().fromMap(deviceMap));
					}
				}
			}
		} catch (Exception e) {
			//e.printStackTrace();
			exceptionLogging(e);
		}
		
		return rs;
	}

	@SuppressWarnings("unchecked")
	public List<DeviceInfo> getDeviceInfoByDeviceId(String deviceId) {
		List<DeviceInfo> rs = new ArrayList<DeviceInfo>(0);
		try {
			Object result = this.list(super.getNamespace(), "getDeviceInfoByDeviceId", deviceId);
			if (result != null) {
				List<Map<Object, Object>> resultList = (List<Map<Object, Object>>) result;
				for (Map<Object, Object> deviceMap : resultList) {
					if (deviceMap != null && !deviceMap.isEmpty()) {
						rs.add(new DeviceInfo().fromMap(deviceMap));
					}
				}
			}
		} catch (Exception e) {
			//e.printStackTrace();
			exceptionLogging(e);
		}

		return rs;
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> getUserInfoByUserId(String userId) {
		try {
			Object result = this.objectString("getUserInfoByUserId", userId);
			if (result != null) {
				return (Map<String, Object>) result;
			}
		} catch (Exception e) {
			//e.printStackTrace();
			exceptionLogging(e);
		}
		
		return null;
	}
	
	public int insertFCMMessage(Map<Object, Object> data) throws Exception {
		return CastUtil.castToInteger(this.insert("insertFCMMessage", data));
	}

}
