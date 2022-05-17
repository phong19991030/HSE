package module.common.popup;
import infrastructure.inheritance.dao.AbstractDAO;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.util.HtmlUtils;

/**
 * 
 * @author kdna2m001
 * @title  팝업용 DAO
 * @contents 
 * - 코드 등 팝업을 통한 선택
 * @version
 *  - 1.0 생성 2013. 01. 15. kdna2m001
 */
@Component("popupDAOImpl")
public class PopupDAOImpl extends AbstractDAO {
	
	public PopupDAOImpl() {
		super.namespace = "common.popup";
	}
	
	/**
	 * 상위메뉴
	 */
	public List getListUppoMenu(Object parameter) throws Exception {
		return list("common.popup.Popup.getListUppoMenu", parameter);
	}
	/**
	 * 상위메뉴(권한-추천메뉴)
	 */
	public List getListUppoRCMenu(Object parameter) throws Exception { 
		return list("common.popup.Popup.getListUppoRCMenu", parameter);
	}
	/**
	 * 상위메뉴(나의메뉴)
	 */
	public List getListUppoMYMenu(Object parameter) throws Exception {
		return list("common.popup.Popup.getListUppoMYMenu", parameter);
	}	
	/**
	 * 프로그램ID
	 */
	public List getListPgmId(Object parameter) throws Exception {
		return list("common.popup.Popup.getListPgmId", parameter);
	}	
	/**
	 * 프로그램ID (나의메뉴)
	 */
	public List getListMyPgmId(Object parameter) throws Exception {
		return list("common.popup.Popup.getListMyPgmId", parameter);
	}
	/**
	 *  고객정보(갯수)
	 */
	public int getCountCustInfo(Object parameter) throws Exception {
		return Integer.parseInt(object("common.popup.Popup.getCountCustInfo", parameter).toString());
	}
	/**
	 *  고객정보
	 */
	/*public List getListCustInfo(Object parameter, int offset, int limit) throws Exception {
		return list("common.popup.Popup.getListCustInfo", parameter, offset, limit );
	}*/	
	public List getListCustInfo(Object parameter) throws Exception {
		return list("common.popup.Popup.getListCustInfo", parameter);
	}
	/**
	 * 사용자ID
	 */
	public List getListUserId(Object parameter) throws Exception {
		return list("common.popup.Popup.getListUserId", parameter);
	}
	
	/**
	 *  추천메뉴 폴더 리스트(상위메뉴)
	 */
	public List getListRcUppoMenuFolder(Object parameter) throws Exception {
		return list("common.popup.Popup.getListRcUppoMenuFolder", parameter);
	}
	
	/**
	 *  나의메뉴 폴더 리스트(상위메뉴)
	 */
	public List getListMyUppoMenuFolder(Object parameter) throws Exception {
		return list("common.popup.Popup.getListMyUppoMenuFolder", parameter);
	}
	
	/**
	 *  나의메뉴추가할 즐겨찾기 메뉴
	 */
	public Map getMapMyFavorMenu(Object parameter) throws Exception {
		return (Map)object("common.popup.Popup.getMapMyFavorMenu", parameter);
	}
	
	/**
	 *  나의메뉴 상위메뉴에 같은 pgm_id을 등록시 체크
	 */
	public String getMapMyMenuDuplChk(Object parameter) throws Exception {
		return (String)object("common.popup.Popup.getMapMyMenuDuplChk", parameter);
	}
	
	/**
	 *  즐겨찾기 추가 시 같은 pgm_id을 등록시 체크
	 */
	public String getMapMyMenuFavoritesChk(Object parameter) throws Exception {
		return (String)object("common.popup.Popup.getMapMyMenuFavoritesChk", parameter);
	}
	
	/**
	 * 
	 * getAllBusinessUnit
	 *
	 * @Description : get list business unit for popup
	 * @Output : List<Map>
	 * @Create : Nov 5, 2018 
	 * @Author : HungDM
	 * @Status : COMPLETE
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List<Map> getAllBusinessUnit(Object parameters) throws Exception {
		return (List<Map>) list("getAllBusinessUnit", parameters);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<Map> getHumanList(Object parameters) throws Exception {
		List<Map> result = (List<Map>) list("popup_selectHuman", parameters);
		if (result == null) result = new ArrayList<Map>();
		for (Map obj : result) {
			if (obj.containsKey("USER_NM")) {
				String value = HtmlUtils.htmlUnescape(HtmlUtils.htmlUnescape(String.valueOf(obj.get("USER_NM"))));
				if (!value.equals("null")) {
					obj.put("USER_NM", value);
				}
			}
			
			if (obj.containsKey("USER_ENG_NM")) {
				String value = HtmlUtils.htmlUnescape(HtmlUtils.htmlUnescape(String.valueOf(obj.get("USER_ENG_NM"))));
				if (!value.equals("null")) {
					obj.put("USER_ENG_NM", value);
				}
			}
		}
		
		return result;
	}
	
}

