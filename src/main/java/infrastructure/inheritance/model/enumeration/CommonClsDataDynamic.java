package infrastructure.inheritance.model.enumeration;

import infrastructure.context.AppContext;
import infrastructure.inheritance.dao.AbstractDAO;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class CommonClsDataDynamic{
	AbstractDAO adao = new AbstractDAO();
	protected  Logger logger = LogManager.getLogger(CommonClsDataDynamic.class);
	
	public CommonClsDataDynamic() {
		// TO-DO Auto-generated constructor stub
	}
	
	public List getData(String cls, Map param){
		List list = new ArrayList();
		getClsData(cls, param, list);
		return list;
	}
	
	private void getClsData(String cls, Map param, List list){
		adao.setSqlSessionFactory((SqlSessionFactory)  AppContext.getApplicationContext().getBean("sqlMapClientBase"));

		try {
			if(cls.equals("COMM_CD")){ /** 공통코드 **/
				list.addAll(adao.list("enumeration.ClsCode", "getListComStdMgt", param));
			}else if(cls.equals("COMM_CD_CONDITION")){ /** 공통코드기타조건 **/
				list.addAll(adao.list("enumeration.ClsCode", "comStdMgtCondition", param));
			/*else if (cls.equals("IMPL_NO")){ // 평가마스터 (테이블 구조가 바뀌었음)
				list.addAll(adao.list("enumeration.ClsCode", "getEvaMst", param));
			}*/
			}else if (cls.equals("PAM_INFO")){ /** 급여정보 **/
				list.addAll(adao.list("enumeration.ClsCode", "getPamInfoCombo", param));
			}else if (cls.equals("PAM_INFO_TERM")){ /** 동적 급여정보 **/
				list.addAll(adao.list("enumeration.ClsCode", "getPamInfoTermCombo", param));
			}else if (cls.equals("PAM_VIEW_CD")){ /** 지급항목 **/
				list.addAll(adao.list("enumeration.ClsCode", "getPamCombo", param));
			}else if (cls.equals("PAM_BASE_GRD")){ /** 급여기본급 직급항목 **/
				list.addAll(adao.list("enumeration.ClsCode", "getBaseGrdCombo", param));
			}else if (cls.equals("RQST_EMP_NO")){ /** 작성자 **/
				list.addAll(adao.list("enumeration.ClsCode", "getCombo", param));
			}else if (cls.equals("ASM_STAT")){ /** 자산상태코드 조회 **/
				list.addAll(adao.list("enumeration.ClsCode", "getAssetStat", param));
			}else if (cls.equals("TRF_CLS")){ /** 교통구분별 등급, 파라미터 ETC2 = 807-001, 807-002, 807-003, 807-004 **/
				list.addAll(adao.list("enumeration.ClsCode", "getComboTrfCls2", param));
			}else if (cls.equals("PASS_CLS")){ /** 채용합격종류, 파라미터 ETC2 = 137-01, 137-02, 137-03 **/
				list.addAll(adao.list("enumeration.ClsCode", "getPassYn", param));
			}else if (cls.equals("BUM_BILD_SEQ")){ /** 총무관리 > 시설 > 건물명(데이터 없음) **/
				list.addAll(adao.list("enumeration.ClsCode", "getBumBildSeq", param));
			}
			else if (cls.equals("CLS_DTL_CD")){ /** 교육중분류 **/
				list.addAll(adao.list("enumeration.ClsCode", "getDtlClsCd", param));
			}
			/*else if (cls.equals("INCID_JOB")){ // 부수직무 조회(사용안함)
				list.addAll(adao.list("enumeration.ClsCode", "getIncidJob", param));
			}*/
			///////////////////// 회계(ACM) /////////////////////
			else if (cls.equals("ACT_STD_MGT")){ /** 회계 공통코드 콤보(데이터없음) **/
				list.addAll(adao.list("enumeration.ClsCode", "getActStdMgtCombo", param));
			}else if(cls.equals("ACT_STAT")){ /** 회계 결재상태 콤보 **/
				list.addAll(adao.list("enumeration.ClsCode", "getStatCombo", param));
			}else if(cls.equals("ACT_APROV_DT")){ /** 결제일자(데이터없음) **/
				list.addAll(adao.list("enumeration.ClsCode", "getAprovDtCombo", param));
			}else if(cls.equals("TNAC_BANK_ACNT")){ /** 계좌번호 **/
				list.addAll(adao.list("enumeration.ClsCode", "getTnacBankAcntCombo", param));
			}
		}
		 catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error(e.getMessage());
		}
	}
}