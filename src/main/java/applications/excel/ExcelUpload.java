package applications.excel;

import java.util.List;
import java.util.Map;

public interface ExcelUpload {
	/**
	 * 
	 * <b>엑셀을 업로드하면 List데이터로 변환하여 반환한다.</b>
	 * @param request
	 *        : file - excel file
	 *        : columns - String : 컬럼정보를 ","로 연결하여 설정 ex)"CD,NM,DEPT_CD,DEPT_NM..."
	 *        : firstRow - 읽기시작할 Row Index
	 * @return List
	 * @throws Exception
	 */
	//public List doUpload(HttpServletRequest request) throws Exception;
	public List doUpload(Map parameter) throws Exception;
}
