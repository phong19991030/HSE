package infrastructure.inheritance.model.enumeration;

import infrastructure.context.AppContext;
import infrastructure.inheritance.dao.AbstractDAO;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;




public enum CommonClsDataStatic {
///////////////////////    공통     /////////////////////////	
	YN,  
	YN_ENG,
	SEX,
	USE_YN,
	FINISH_YN,
	YEAR,
	MONTH,
	DAY,
	TIME,
	TIME_NUM,
	REGI_YN,
	REQT_YN,
	PRINT,
	SEND_STAT_CD,
	OPEN,
	APRQ_YNC,
	USE,						// USE_YN과 겹침
	CONFIRM,
	COST_YN,
	ENABLE,
	CHK_YN,
	CONFIRM_YN,
	HDAY_YN,
	TRP_TIME,
	AMT_CLS,
	HOUR,						// TIME과 겹침
	OUT_HOUR,
	MINUTE10,
	APRQ_YNCH,
	HOT_CHK,
	AMT_CHK,
	DATA_TP,
	APROV_STAT,					// 결재상태(승인, 미승인)
	APROV_STAT2,				// 승인상태(승인, 신청취소, 반려)
	APROV_STAT3,				// 승인상태(승인, 미승인, 반려)
	END_YN,						//완료 여부(완료, 진행중)
///////////////////////    인사(HRM)     /////////////////////////
//	RQST_CLS,					// mis+pms 신청서종류
	EDUC_TYPE,
	VACT_TYPE,
	LOCAL_CLS,
	EDU_TYPE,
//	OUTING_CLS,
///////////////////////    급여(PAM)     /////////////////////////	
	PAM_PAY_SUB_CLS,
	PAM_PAY_TAX_CLS,
	PAM_RESIGN_AMT_YN,
	PAM_WITHHLD_RESPER_CLS,
	PAM_INOT_CLS,
	PAM_BASE_CLS,
	PAM_PAY_SUB_CD,
	PAM_PEN_SAVE_PMT_YEAR,
	PAM_INSU_CLS,
	PAM_COP_AMT,
	PAM_RQST_CLS,
	PAM_CLOS_YN,
	PAM_CONFIRM_YES,
	PAM_DEDUCT_CLS, 
	PAY_RFLT_YN,
	///////연말정산관련
	PAM_HABT_CLS,
	PAM_HOME_CLS,
	FRGN_TAX_YN,
	HOUSE_HLDR_YN,
	KEEP_PS,
	SUB_CLS,
	PAY_EDU_CLS,
	HDC_PERS_CLS,
	PAY_DATA_CLS,
	TAX_GUBUN,
	RSIGN_CLS,
	LH_LRSF_LMT,	
	HOU_TYPE,
///////////////////////    회계(ACM)     /////////////////////////
	DR_CR,
	CUST_CLS,
	MAPPING_YN,
	BUSI_GBN,	
	IO_CLS, // 세금계산서 매입/매출
	ACT_PRINT_CLS,
	ACT_REF_CD,//계산서, 세금계산서 구분
	//ACT_SIN_CLS,//부가세 신고 구분
	SIN_GBN,//부가세 신고 구분
	//ACT_KI_CLS,//부가세 분기 구분
	GI_GBN,//부가세 분기 구분
	EBILL_GBN,//세금계산서, 계산서 발급구분(전자발급, 전자이외발급)
	VAT_DT_CLS,//부가세검색일자 기준(계산서일자, 국세청전송일자)
///////////////////////    예산(BGM)     /////////////////////////
	BDG_CONF,
	BUSI_YN,
	CLOSE_YN,
	APROV_YN,
	BGM_CLS, 				//구분 : 세부(A), 총괄(B)
	IE_CLS,					//수입(I), 지출(E)

///////////////////////   쿼리(공통, 파라미터X)   ///////////////////////
	CORP_CD,				// 사업장코드
	USE_AIRMAN,				// 총무_이용항공사
	MILEG_AIRMAN,			// 총무_마일리지항공사
	CAR_TP,					// 차종조회
	CAR_ALL,				// 차량전체조회
	CAR_OK,					// 배차가능한 차량조회
	CAR_USE,				// 사용가능한 차량조회
	REPAIR_ITM,				// 수리정비항목조회
	/*CLUB_CD				// 동호회목록조회 (사용안함)*/
	BUILD_CD,				// 시설동 코드조회
	DORM_NO,				// 기숙사 건물동 조회
	BANK_CD,				// 은행코드 콤보
	AIR_GP,					// 마일리지그룹 조회
	TRF_TYPE,				// 교통 종류 구분
	/*STD_SAL,				// 기본급년월 (사용안함, 쿼리존재X)*/	
	PAM_SUB_CD,				// 지급,공제목록
	PAM_BF,					// 기지금수당
	PAM_SUB_ALL, 			// 지급전체목록 (사용안함, 쿼리존재X)
	PAM_CODE_ALL,			// 급여코드전체목록
	PAM_ENTRU_CODE,			// 외부인력 사용 급여코드목록
	PAM_TOT_CLS,			// 급여집계구분항목
	PAY_N_TAX,				// 비과세구분(데이터없음) (pay_2030_005)
	RSLT_EVAL_DGRE,			// 성과급등급
	RESL_CLS,				// 결의구분(데이터없음)
	MINS_CD,				// 부처코드
	MGT_ORG_CD,				// 관리기관코드
	EVA_GUBUN_CLS,			// 지적사항 구분코드
	PUR_OPT_CD, 			// 수의계약코드 조회
	/*HRM_EDU_TP,				// 교육기준코드 (사용안함 15.08.19 cmk )*/
	/*RQST_CLS				// mis+pms 신청서종류 (사용안함, 쿼리존재X, fixed combo에 반영됨)*/	
	JOB_CLS,				// 직무종류
	CMT,					// 위원회 종류
	VCTN_CLS, 				// 휴가구분조회
	COMM_UP_CD,				// 상위 공통코드 조회
	ETC_CLS,				// 업무구분 콤보박스 설정
	VAT_CLS,				// 출금 계산서구분 콤보박스 설정
	BTM_TRP_GRD,			// 총무관리 > 출장관리 > 출장직급
	GAM_VACF_CD,			// 휴양시설코드
	BUM_DNWI_SEQ,			// 총무관리 > 시설 > 소속기관 (데이터없음)
	LBM_GNSTK_NO,			// 문헌관리 > 장서점검 > 계획, 쿼리 내에는 파라미터 받는 부분 있음. 실질적으로 사용할때는 파라미터를 넘기지 않음, 확인요망!
	CLS_CD, 				// 교육중분류(인사관리 > 교육 > 중분류)**/
	ROLE_ID,				// 롤(담당자) 조회
	PAM_OUTEMP,				// 급여외부인력구분
	
	///////////////////////    회계(ACM)     /////////////////////////
	ACT_INCM,				// 소득구분 조회
	ACT_STD_UPNM, 			// 회계 공통코드 상위코드 콤보(데이터 없음)
	ACT_ACCT_CHAR,			// 회계 계정코드 콤보
	ACT_APROV,	 			// 회계 결재권자정보 콤보(데이터 없음)
	ACT_EXPN,				// 비목코드, 비목명 조회
	ACT_RESL_BK,			// 계좌코드(데이터없음)
	ACT_ACCT_CD,			// 미결계정
	COLL_YN,				// CMS수금 대상 여부
	ACT_RESL_X,				// 결산결의서(데이터없음)
	
	///////////////////////    시설(BUM -> FCM)     /////////////////////////
	CAR_APP_CLS,				// 차량신청상태 - 사용안함. 공통코드로 전환
	BUM_BUILD_CLS,				// 시설구분 - 사용안함. 공통코드로 전환
	BUM_INCOME_CLS,             //
	EXEM_YN,                     //면제 여부   
	SUBMIT_YN,                   //제출 여부 
	CALC_YN,                     //계산 여부	
	TAX_BILL_YN,                 //(세금)계산서 발행 여부
	MEAN_YN,                     //공공요급 정산액(평균액) 사용여부 여부
	INCOME_RQST_CLS,			// 시설 수입구본 1. 임대료, 2. 관리비 
	TRP_CLS,                   //출장/외출 구분 1. 출장, 2. 외출	
	///////////////////////    자산(ASM)     /////////////////////////
	ASM_DISCORD_CLS,				//불일치 상태 구분(DB값을 비교 하여 상태 처리 하는 값으로 코드화 되지 않음)
	///////////////////////    기관평가(EVM)     /////////////////////////
	EVM_CPLT_YN, // 평가완료여부
	///////////////////////    구매(BYM)     /////////////////////////
	REPT_YN, // 접수여부
	CNTRY,
	///////////////////////		기타		//////////////////////////
	DEVICE_TYPE
	;
	
	private String cls;
	private String json;
	private List<Map> list;
	AbstractDAO adao = new AbstractDAO();
	//AbstractDAO adao = new CodeDAOImpl();
	
	CommonClsDataStatic() {
		 this.cls = this.name();
		 this.list = getDataList(cls);
		 this.json = JSONArray.fromObject(list).toString();
	}

//	public Map getEnum(CommonClsData ccd){
//		Map map = new HashMap();
//		
//		map.put()
//	}

	public String getCls() {
		return cls;
	}

	public String getJson() {
		return json;
	}

	public List<Map> getList() {
		return list;
	}
	
	
	private List<Map> getDataList(String cls){
		Logger logger = LogManager.getLogger(CommonClsDataStatic.class);
		adao.setSqlSessionFactory((SqlSessionFactory)  AppContext.getApplicationContext().getBean("sqlMapClientBase"));
		
		List<Map> list = new ArrayList();
		String[][] data = null ;
//////////////////////		공통     /////////////////////////			
		if(cls.equals("YN"))
		{
			String[][] temp = {{"Y","예"},{"N","아니오"}};
			data = temp;
		}
		else if(cls.equals("YN_ENG"))
		{
			String[][] temp = {{"Y","Y"},{"N","N"}};
			data = temp;
		}
		else if(cls.equals("SEX"))
		{
			String[][] temp = {{"M","남자"},{"F","여자"}};
			data = temp;
		}
		else if(cls.equals("USE_YN"))
		{
			String[][] temp = {{"Y","사용"},{"N","미사용"}};
			data = temp;
		}
		else if(cls.equals("FINISH_YN"))
		{
			String[][] temp = {{"Y","완료"},{"N","미완료"}};
			data = temp;
		}		
		else if(cls.equals("YEAR"))
		{
			//현재년선택(기본)
			int i_year = Calendar.getInstance().get(Calendar.YEAR);
			//데이터
			data = new String[8][2];
			int k = 0;
			for(int i = (i_year - 5);i <= (i_year + 2);i++)
			{
				data[k][0] = i+"";
				data[k][1] = i + "년";
				k++;
			}
		}
		else if(cls.equals("MONTH"))
		{
			//현재월선택(기본)
			//데이터
			data = new String[12][2];
			for(int i = 1;i <= 12;i++){
				data[i-1][0] = (i < 10) ? "0"+i:i+"";
				data[i-1][1] = (i < 10) ? "0"+i+"월":i+"월";
			}
		}
		else if(cls.equals("DAY"))
		{
			//현재일선택(기본)
			int dayofMonth = Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
			
			//데이터
			data = new String[dayofMonth][2];
			for(int i = 1;i <= dayofMonth;i++){
				data[i-1][0] = (i < 10) ? "0"+i:i+"";
				data[i-1][1] = (i < 10) ? "0"+i+"일":i+"일";
			}
		}
		else if(cls.equals("TIME"))
		{
			//현재시간선택(기본)
			//int time = Calendar.getInstance().get(Calendar.HOUR);
			//데이터
			data = new String[24][2];
			for(int i = 1;i <= 24;i++){
				data[i-1][0] = (i < 10) ? "0"+i:i+"";
				data[i-1][1] = (i < 10) ? "0"+i+"시":i+"시";
			}
		}
		else if(cls.equals("TIME_NUM"))
		{
			//현재시간선택(기본)
			//데이터
			data = new String[24][2];
			for(int i = 1;i <= 24;i++)
			{
				data[i-1][0] = (i < 10) ? "0"+i+"00":i+"00";
				data[i-1][1] = (i < 10) ? "0"+i+":00":i+":00";
			}
		}
		else if(cls.equals("SEND_STAT_CD"))
		{//메일상태
			String[][] temp = {{"01","생성"},{"02","전송"}};
			data = temp;
		}
		else if(cls.equals("REGI_YN"))
		{
			String[][] temp = {{"Y","등록"},{"N","미등록"}};
			data = temp;
		}
		else if(cls.equals("REQT_YN"))
		{
			String[][] temp = {{"Y","대상"},{"N","비대상"}};
			data = temp;
		}
	
		
		else if(cls.equals("PRINT"))
		{
			String[][] temp = {{"Y","출력"},{"N","미출력"}};
			data = temp;
		}	
		else if(cls.equals("OPEN"))
		{
			String[][] temp = {{"Y","공개"},{"N","비공개"}};
			data = temp;
		}
		else if(cls.equals("APRQ_YNC"))
		{
			String[][] temp = {{"Y","완료"},{"N","미완료"},{"C","취소"}};
			data = temp;
		}
		else if(cls.equals("USE")) // USE_YN과 겹침
		{
			String[][] temp = {{"Y","사용"},{"N","미사용"}};
			data = temp;
		}
		else if(cls.equals("CONFIRM"))
		{
			String[][] temp = {{"Y","확정"},{"N","미확정"}};
			data = temp;
		}
		else if(cls.equals("COST_YN"))
		{
			String[][] temp = {{"Y","실비"},{"N","금액"}};
			data = temp;
		}
		else if(cls.equals("ENABLE"))
		{
			String[][] temp = {{"Y","가능"},{"N","불가능"}};
			data = temp;
		}
		else if(cls.equals("CHK_YN"))
		{
			String[][] temp = {{"N","확인전"},{"Y","확인완료"}};
			data = temp;
		}
		else if(cls.equals("CONFIRM_YN"))
		{
			String[][] temp = {{"","확정전"},{"N","불가"},{"Y","확정"}};
			data = temp;
		}
		else if(cls.equals("HDAY_YN"))
		{
			String[][] temp = {{"Y","휴일"},{"N","평일"}};
			data = temp;
		}
		else if(cls.equals("TRP_TIME"))
		{
			String[][] temp = {{"1","4시간이내"},{"2","4시간이상"}};
			data = temp;
		}
		else if(cls.equals("AMT_CLS"))
		{
			String[][] temp = {{"A","왕복"},{"B","편도"}};
			data = temp;
		}
		else if(cls.equals("HOUR"))  // TIME과 겹침
		{
			data = new String[24][2];
			for(int i = 1;i <= 24; i++){
				data[i-1][0] = (i < 10) ? "0"+i:i+"";
				data[i-1][1] = (i < 10) ? "0"+i:i+"";
			}
		}
		else if(cls.equals("OUT_HOUR"))
		{
			/*data = new String[24][2];
			for(int i = 7; i <= 18; i++)
			{
				for(int j = 0; j <= 1; j++){
					if(j % 2 == 0){
						data[(i-7)*2][0] = (i < 10) ? "0"+i+"00":i+"00";
						data[(i-7)*2][1] = (i < 10) ? "0"+i+":00":i+":00";
					}else {
						data[((i-6)*2)-1][0] = (i < 10) ? "0"+i+"30":i+"30";
						data[((i-6)*2)-1][1] = (i < 10) ? "0"+i+":30":i+":30";
					}
				}

			}*/
			String[][] temp = {
					{"0700", "07:00"},{"0730", "07:30"},
					{"0800", "08:00"},{"0830", "08:30"},
					{"0900", "09:00"},{"0930", "09:30"},
					{"1000", "10:00"},{"1030", "10:30"},
					{"1100", "11:00"},{"1130", "11:30"},
					{"1200", "12:00"},{"1230", "12:30"},
					{"1300", "13:00"},{"1330", "13:30"},
					{"1400", "14:00"},{"1430", "14:30"},
					{"1500", "15:00"},{"1530", "15:30"},
					{"1600", "16:00"},{"1630", "16:30"},
					{"1700", "17:00"},{"1730", "17:30"},
					{"1800", "18:00"},{"1830", "18:30"}
			};
			data = temp;
		}
		else if(cls.equals("MINUTE10"))
		{
			String[][] temp = {
				{"00", "00"},{"10", "10"},{"20", "20"},{"30", "30"},{"40", "40"},{"50", "50"}
			};
			data = temp;
		}		
		else if(cls.equals("APRQ_YNCH"))
		{
			String[][] temp = {
				{"Y", "완료"},{"N", "미완료"},{"C", "승인취소"},{"H", "현금납부"}
			};
			data = temp;
		}		
		else if(cls.equals("HOT_CHK"))
		{
			String[][] temp = {
				{"H", "휴일"},{"O", "출장"},{"T", "타임"}
			};
			data = temp;
		}		
		else if(cls.equals("AMT_CHK"))
		{
			String[][] temp = {
				{"0", "선택"},{"1", "이상"},{"2", "이하"},{"3", "초과"},{"4", "미만"}
			};
			data = temp;
		}
		else if(cls.equals("DATA_TP"))	
		{
			String[][] temp = {{"P","팝업형"},{"I","입력형"},{"U","로드형"}};
			data = temp; 
		}
		else if(cls.equals("APROV_STAT"))	
		{
			String[][] temp = {{"N","미승인"},{"Y","승인"}};
			data = temp; 
		}
		else if(cls.equals("APROV_STAT2"))	
		{
			String[][] temp = {{"N","신청"},{"F","신청취소"},{"Y","승인"},{"R","반려"}};
			data = temp; 
		}
		else if(cls.equals("APROV_STAT3"))	
		{
			String[][] temp = {{"N","미승인"},{"Y","승인"},{"R","반려"}};
			data = temp; 
		}
		else if(cls.equals("END_YN"))
		{
			String[][] temp = {{"Y","완료"},{"N","진행중"}};
			data = temp;
		}
///////////////////////    인사(HRM)     /////////////////////////			
//		else if(cls.equals("RQST_CLS")) //15.08.03 cmk 미사용코드 주석처리 
//		{
//			String[][] temp = {{"최초","최초"},{"재계약","재계약"},{"변경","변경"},{"종료","종료"}};
//			data = temp;
//		}
		//임시
		else if(cls.equals("EDUC_TYPE"))
		{
			String[][] temp = {{"1","전문교육"},{"2","직무교육"},{"3","소양교육"}};
			data = temp;
		}
		else if(cls.equals("VACT_TYPE"))
		{
			String[][] temp = {{"1","연차휴가"},{"2","특별휴가"},{"3","공가"},{"4","병가"}};
			data = temp;
		}
		else if(cls.equals("LOCAL_CLS"))
		{
			String[][] temp = {{"01","대덕특구"},{"02","광주특구"},{"03","대구특구"},{"04","부산특구"}};
			data = temp;
		}
//		else if(cls.equals("OUTING_CLS")) //15.08.03 cmk 미사용코드 주석처리
//		{
//			String[][] temp = {{"01","외출"},{"02","조퇴"}};
//			data = temp;
//		}
///////////////////////    급여(PAM)     /////////////////////////	
		else if(cls.equals("PAM_PAY_SUB_CLS"))
		{
			String[][] temp = {{"1","지급"},{"2","공제"},{"3","기타"}};
			data = temp;
		}
		else if(cls.equals("PAY_RFLT_YN"))
		{
			String[][] temp = {{"Y","반영"},{"N","미반영"}};
			data = temp;
		}
		else if(cls.equals("PAM_PAY_TAX_CLS"))
		{
			String[][] temp = {{"1","과세"},{"2","비과세"}};
			data = temp;
		}
		else if(cls.equals("PAM_RESIGN_AMT_YN"))
		{
			String[][] temp = {{"1", "급여"},{"2", "상여"}};
			data = temp;
		}			
		else if(cls.equals("PAM_WITHHLD_RESPER_CLS"))
		{
			String[][] temp = {{"1","사업장"},{"3","공적연금사업자"}};
			data = temp;
		}	
		else if(cls.equals("PAM_INOT_CLS"))
		{
			String[][] temp = {{"Y","내부인"},{"N","외부인"}};
			data = temp;
		}	
		else if(cls.equals("PAM_BASE_CLS"))
		{
			String[][] temp = {{"1", "정액급"},{"2", "연구활동비"},{"3", "평가급"}};
			data = temp;
		}	
		else if(cls.equals("PAM_PAY_SUB_CD"))
		{
			String[][] temp = {{"203", "[203]국민연금"},{"204", "[204]건강보험"},{"205", "[205]고용보험"}};
			data = temp;
		}	
		else if(cls.equals("PAM_PEN_SAVE_PMT_YEAR"))
		{
			String[][] temp = {{"01", "1년차"},{"02", "2년차"},{"03", "3년차"}};
			data = temp;
		}	
		else if(cls.equals("PAM_INSU_CLS"))
		{
			String[][] temp = {{"1", "국민연금"},{"2", "건강보험"},{"3", "고용보험"},{"4", "노인장기요양보험"},{"5", "산재보험"}};
			data = temp;
		}	
		else if(cls.equals("PAM_COP_AMT"))
		{
			String[][] temp = {
					{"213", "국민연금[사업자부담금]"},{"214", "건강보험[사업자부담금]"},
					{"215", "고용보험[사업자부담금]"},{"216", "퇴직연금[사업자부담금]"}					
			};
			data = temp;
		}	
		else if(cls.equals("PAM_RQST_CLS"))
		{
			String[][] temp = {
				{"1",   "급여"},{"213", "국민연금[사업자부담금]"},
				{"214", "건강보험[사업자부담금]"},{"215", "고용보험[사업자부담금]"}				
			};
			data = temp;
		}	
		else if(cls.equals("PAM_CLOS_YN"))
		{
			String[][] temp = {{"N", "미확정"},{"Y", "확정"}};
			data = temp;
		}	
		else if(cls.equals("PAM_CONFIRM_YES"))
		{
			String[][] temp = {{"N", "확정전"},{"Y", "확정"}};
			data = temp;
		}
		else if(cls.equals("PAM_DEDUCT_CLS"))
		{
			String[][] temp = {{"1","비율"},{"2","금액"}};
			data = temp;
		}
		/////연말정산관련
		else if(cls.equals("PAM_HABT_CLS"))
		{
			String[][] temp = {{"1","거주자"},{"2","비거주자"}};
			data = temp;
		}
		else if(cls.equals("PAM_HOME_CLS"))
		{
			String[][] temp = {{"1","내국인"},{"9","외국인"}};
			data = temp;
		}
		else if(cls.equals("FRGN_TAX_YN"))
		{
			String[][] temp = {{"2","미적용"},{"1","적용"}};
			data = temp;
		}
		else if(cls.equals("HOUSE_HLDR_YN"))
		{
			String[][] temp = {{"1","세대주"},{"2","세대원"}};
			data = temp;
		}
		else if(cls.equals("KEEP_PS"))
		{
			String[][] temp = {{"1","계속근로"},{"2","중도퇴사"}};
			data = temp;
		}
		else if(cls.equals("SUB_CLS"))
		{
			String[][] temp = {{"1","종근무지"},{"2","납세조합"}};
			data = temp;
		}
		else if(cls.equals("PAY_EDU_CLS"))
		{
			String[][] temp = {{"1","본인"},{"2","취학전아동"},{"3","초중고"},{"4","대학생"}};
			data = temp;
		}
		else if(cls.equals("HDC_PERS_CLS"))
		{
			String[][] temp = {{"1","장애인복지법에따른 자"},{"2","국가유공자 미 유사한 자"},{"3","중증환자"}};
			data = temp;
		}
		else if(cls.equals("PAY_DATA_CLS"))
		{
			String[][] temp = {{"1","본인,장애인,경로우대자"},{"2","그 외 기본공제대상자"}};
			data = temp;
		}
		else if(cls.equals("TAX_GUBUN"))
		{
			String[][] temp = {{"1","과세,영세"},{"2","면세"}};
			data = temp;
		}
		else if(cls.equals("RSIGN_CLS"))
		{
			String[][] temp = {{"1","중간정산"},{"2","퇴직"}};
			data = temp;
		}
		else if(cls.equals("LH_LRSF_LMT"))
		{
			String[][] temp = {{"0","비대상"}
							,{"1","[2011년이전차입]15년미만(600만원)"}
							,{"2","[2011년이전차입]15~30년미만(1000만원)"}
							,{"3","[2011년이전차입]30년이상(1500만원)"}
							,{"4","[2012년~2014년차입]15년이상,고정금리or비거치식(1500만원)"}
							,{"5","[2012년~2014년차입]15년이상,기타(500만원)"}
							,{"6","[2015년이후차입]15년이상,고정금리and비거치식(1800만원)"}
							,{"7","[2015년이후차입]15년이상,고정금리or비거치식(1500만원)"}
							,{"8","[2015년이후차입]15년이상,기타(500만원)"}
							,{"9","[2015년이후차입]10년~15년미만,고정금리or비거치식(300만원)"}
						};
			data = temp;
		}
		else if(cls.equals("HOU_TYPE"))
		{
			String[][] temp = {{"1","단독주택"},{"2","다가구"},{"3","다세대"},{"4","연립"},{"5","아파트"},{"6","오피스텔"},{"7","기타"}};
			data = temp;
		}
///////////////////////    회계(ACM)     /////////////////////////	
		else if(cls.equals("DR_CR"))
		{
			String[][] temp = {{"D","차변"},{"C","대변"}};
			data = temp; 
		}
		else if(cls.equals("CUST_CLS"))
		{//거래처 구분
			String[][] temp = {{"1","법인"},{"2","개인"}};
			data = temp;
		}
		else if(cls.equals("MAPPING_YN"))
		{
			String[][] temp = {{"Y","연결"},{"N","미연결"}};
			data = temp;
		}
		else if(cls.equals("BUSI_GBN"))
		{
			String[][] temp = {{"Y","사업비성격"},{"N","경상비성격"}};
			data = temp;
		}
		else if(cls.equals("IO_CLS"))
		{
			String[][] temp = {{"I","매입"},{"O","매출"}};
			data = temp;
		}
		else if(cls.equals("ACT_PRINT_CLS"))
		{
			String[][] temp = {{"18","청구"},{"1","영수"}};
			data = temp;
		}
		else if(cls.equals("ACT_REF_CD"))
		{
			String[][] temp = {{"Y","세금계산서"},{"N","계산서"}};
			data = temp;
		}	
		/*
		else if(cls.equals("ACT_SIN_CLS"))
		{
			String[][] temp = {{"03","예정신고"},{"01","확정신고"}};//부가세 신고구분
			data = temp;
		}
		*/	
		else if(cls.equals("SIN_GBN"))
		{
			String[][] temp = {{"03","예정신고"},{"01","확정신고"}};//부가세 신고구분
			data = temp;
		}	
		/*
		else if(cls.equals("ACT_KI_CLS"))
		{
			String[][] temp = {{"01","1기"},{"02","2기"}};
			data = temp;
		}
		*/
		else if(cls.equals("GI_GBN"))
		{
			String[][] temp = {{"01","1기"},{"02","2기"}};
			data = temp;
		}						
		else if(cls.equals("EBILL_GBN"))
		{
			String[][] temp = {{"EBILL","전자발급"},{"PBILL","전자이외발급"}};
			data = temp;
		}
		else if(cls.equals("VAT_DT_CLS"))
		{
			String[][] temp = {{"VAT_DT","계산서일자"},{"SEND_DT","전송일자"}};
			data = temp;
		}
		else if(cls.equals("COLL_YN"))
		{
			String[][] temp = {{"Y","대상"},{"N","제외"}};
			data = temp;
		}
/////////////////////    예산BGM)     /////////////////////////		
		else if(cls.equals("BDG_CONF"))
		{
			String[][] temp = {{"N","미확정"},{"C","잠정예산확정"},{"Y","확정"}};
			data = temp;
		}
		else if(cls.equals("BUSI_YN"))
		{
			String[][] temp = {{"Y","과제"},{"N","운영비"}};
			data = temp;
		}
		else if(cls.equals("CLOSE_YN"))
		{
			String[][] temp = {{"N","사용"},{"Y","마감"}};
			data = temp;
		}
		else if(cls.equals("APROV_YN"))
		{
			String[][] temp = {{"Y","반영"},{"N","미반영"}};
			data = temp;
		}
		else if(cls.equals("BGM_CLS"))
		{
			String[][] temp = {{"A","세부"},{"B","총괄"}};
			data = temp;
		}
		else if(cls.equals("IE_CLS"))
		{
			String[][] temp = {{"I","수입"},{"E","지출"}};
			data = temp;
		}
/////////////////////    시설(BUM => FCM)     /////////////////////////			
		else if(cls.equals("CAR_APP_CLS"))
		{
			String[][] temp = {{"01","신청"},{"02","승인"},{"03","완료"}};
			data = temp;
		}
		else if(cls.equals("BUM_BUILD_CLS"))
		{
			String[][] temp = {{"01","재단사옥"},{"02","TBC"}};
			data = temp;
		}
		else if(cls.equals("BUM_INCOME_CLS"))
		{
			String[][] temp = {{"01","임대료"},{"02","관리비"}};
			data = temp;
		}
		else if(cls.equals("EXEM_YN"))
		{
			String[][] temp = {{"Y","면제"},{"N","부과"}};
			data = temp;
		}
		else if(cls.equals("SUBMIT_YN"))
		{
			String[][] temp = {{"Y","제출"},{"N","미제출"}};
			data = temp;
		}
		else if(cls.equals("CALC_YN"))
		{
			String[][] temp = {{"N","계산전"},{"Y","계산완료"}};
			data = temp;
		}
		else if(cls.equals("TAX_BILL_YN"))
		{
			String[][] temp = {{"N","발행전"},{"Y","발행완료"}};
			data = temp;
		}
		else if(cls.equals("MEAN_YN"))
		{
			String[][] temp = {{"N","월정액"},{"Y","퇴거정산"}};
			data = temp;
		}
		else if(cls.equals("INCOME_RQST_CLS"))
		{
			String[][] temp = {{"1","임대료"},{"2","관리비"}};
			data = temp;
		}
		else if(cls.equals("TRP_CLS"))
		{
			String[][] temp = {{"1","출장"},{"2","외출"}};
			data = temp;
		}
/////////////////////    자산(ASM)     /////////////////////////	
		else if(cls.equals("ASM_DISCORD_CLS"))
		{
			String[][] temp = {{"AC","일치"},{"DC","불일치"}};
			data = temp;
		}
/////////////////////    기관평가(EVM)     /////////////////////////								
		else if(cls.equals("EVM_CPLT_YN")) // 평가완료여부
		{
			String[][] temp = {{"N","평가진행"},{"Y","평가완료"}};
			data = temp;
		}
/////////////////////    구매(BYM)     /////////////////////////								
		else if(cls.equals("REPT_YN")) // 평가완료여부
		{
			String[][] temp = {{"N","미접수"},{"Y","접수완료"}};
			data = temp;
		}
		else if(cls.equals("CNTRY"))
		{
			String[][] temp = {
					{"A0101","뉴욕"},
					{"A0102","런던"},
					{"A0103","LA"},
					{"A0104","모스크바"},
					{"A0105","샌프란시스코"},
					{"A0106","워싱턴"},
					{"A0107","파리"},
					{"A0108","홍콩"},
					{"A0109","일본"},
					{"B0101","대만"},
					{"B0102","북경"},
					{"B0103","싱가포르"},
					{"B0104","인도"},
					{"B0201","미국"},
					{"B0202","아르헨티나"},
					{"B0203","브라질"},
					{"B0301","네덜란드"},
					{"B0302","노르웨이"},
					{"B0303","덴마크"},
					{"B0304","독일"},
					{"B0305","러시아"},
					{"B0306","루마니아"},
					{"B0307","룩셈부르크"},
					{"B0308","벨기에"},
					{"B0309","스웨덴"},
					{"B0310","스위스"},
					{"B0311","스페인"},
					{"B0312","영국"},
					{"B0313","오스트리아"},
					{"B0314","이탈리아"},
					{"B0315","체코"},
					{"B0316","프랑스"},
					{"B0317","핀란드"},
					{"B0318","헝가리"},
					{"B0319","아일랜드"},
					{"B0401","남아공"},
					{"B0402","수단"},
					{"B0403","아랍에미리트"},
					{"B0404","쿠웨이트"},
					{"C0101","뉴질랜드"},
					{"C0102","말레이시아"},
					{"C0103","방글라데시"},
					{"C0104","베트남"},
					{"C0105","인도네시아"},
					{"C0106","태국"},
					{"C0107","터키"},
					{"C0108","중국"},
					{"C0109","파키스탄"},
					{"C0110","필리핀"},
					{"C0111","몽골"},
					{"C0112","네팔"},
					{"C0113","스리랑카"},
					{"C0114","캄보디아"},
					{"C0201","우루과이"},
					{"C0202","칠레"},
					{"C0203","콜롬비아"},
					{"C0204","파라과이"},
					{"C0205","페루"},
					{"C0301","그리스"},
					{"C0302","불가리아"},
					{"C0303","알바니아"},
					{"C0304","유고슬라비아"},
					{"C0305","포르투칼"},
					{"C0306","폴란드"},
					{"C0307","크로아티아"},
					{"C0401","이비아"},
					{"C0402","바레인"},
					{"C0403","사우디아라비아"},
					{"C0404","요르단"},
					{"C0405","이란"},
					{"C0406","이스라엘"},
					{"C0407","이집트"},
					{"C0408","카메룬"},
					{"C0409","케냐"},
					{"C0410","가나"},
					{"C0411","나이지리아"},
					{"C0412","세네갈"},
					{"C0413","이라크"},
					{"C0414","튀니지"}
			};
			data = temp;
		} else if(cls.equals("DEVICE_TYPE")) {
			String[][] temp = {{"AND","Android"},{"IOS","iOS"}};
			data = temp;
		}
////////////////////////////////////////////////////////////////
		else{
			//임시 
			/** sample 교육항목 데이터 포맷맞춰야 함
			 //      "["
//					"{LABEL:'전문교육',DATA:'01',children:[{LABEL :'전문성강화' , DATA:'0101'},{LABEL :'특별교육' , DATA:'0102'}]},"
//					"{LABEL:'직무교육',DATA:'02',children:[{LABEL :'리더십' , DATA:'0201'},{LABEL :'직무역량강화' , DATA:'0202'},{LABEL :'온라인' , DATA:'0203'}]},"
//					"{LABEL:'소양교육',DATA:'03',children:[{LABEL :'소양교육' , DATA:'0301'},{LABEL :'법정교육' , DATA:'0302'},{LABEL :'기타교육' , DATA:'0303'}]}"
//					"]";
			*/
			// 파라미터 없는 코드
			try {
				if(cls.equals("EDU_TYPE")){ /** 교육코드 **/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getListActCorp");
					
//					List clslist = new ArrayList();
//					Map map1=new HashMap();
//					Map map2=new HashMap();
//					Map map3=new HashMap();
//					
//					map1.put("LABEL", "전문교육");
//					map1.put("DATA", "01");
//					List list1 = new ArrayList();
//						Map list1Map1 = new HashMap();list1Map1.put("LABEL", "전문성 강화"); list1Map1.put("DATA", "0101");
//						Map list1Map2 = new HashMap();list1Map2.put("LABEL", "특별교육"); list1Map2.put("DATA", "0102");
//						list1.add(list1Map1);
//						list1.add(list1Map2);
//					map1.put("CHILDREN", list1);
//					
//					map2.put("LABEL", "직무교육");
//					map2.put("DATA", "02");
//					List list2 = new ArrayList();
//						Map list2Map1 = new HashMap();list2Map1.put("LABEL", "리더십"); list2Map1.put("DATA", "0201");
//						Map list2Map2 = new HashMap();list2Map2.put("LABEL", "직무역량강화"); list2Map2.put("DATA", "0202");
//						Map list2Map3 = new HashMap();list2Map3.put("LABEL", "온라인"); list2Map3.put("DATA", "0203");
//						list2.add(list2Map1);
//						list2.add(list2Map2);
//						list2.add(list2Map3);
//					map2.put("CHILDREN", list2);
//					
//					
//					map3.put("LABEL", "소양교육");
//					map3.put("DATA", "03");
//					List list3 = new ArrayList();
//						Map list3Map1 = new HashMap();list3Map1.put("LABEL", "소양교육"); list3Map1.put("DATA", "0301");
//						Map list3Map2 = new HashMap();list3Map2.put("LABEL", "법정교육"); list3Map2.put("DATA", "0302");
//						Map list3Map3 = new HashMap();list3Map3.put("LABEL", "기타교육"); list3Map3.put("DATA", "0303");
//						list3.add(list3Map1);
//						list3.add(list3Map2);
//						list3.add(list3Map3);
//					list3.add(new HashMap().put("LABEL", "소양교육"));
//					map3.put("CHILDREN",list3 );
//					
//					
//					clslist.add(map1);
//					clslist.add(map2);
//					clslist.add(map3);
//					list = clslist;
				}else if(cls.equals("CORP_CD")){ /** 사업장코드 **/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getListActCorp");
				}
//				else if(cls.equals("CAR_TP")){ /** 차종조회 **/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getListCarTp");
//				}
//				else if(cls.equals("CAR_ALL")){ /** 차량전체조회 **/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getListCarAll");
//				}
//				else if(cls.equals("CAR_OK")){ /** 배차가능한 차량조회 **/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getListCarOk");
//				}
//				else if(cls.equals("CAR_USE")){ /** 사용가능한 차량조회 **/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getListCarUse");
//				}
				/*else if(cls.equals("REPAIR_ITM")){ // 수리정비항목조회 (사용안함)
					list = (List<Map>) adao.list("enumeration.ClsCode", "getListrepairItm");
				}*/					
				/*else if(cls.equals("CLUB_CD")){ // 동호회목록조회 (사용안함)
					list = (List<Map>) adao.list("enumeration.ClsCode", "getClubCombo");
				}*/				
//				else if(cls.equals("BUILD_CD")){ /** 시설동 코드조회*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "buildComboList");
//				}			
				/*
				else if(cls.equals("DORM_NO")){ //기숙사 건물동 조회 (사용안함)
					list = (List<Map>) adao.list("enumeration.ClsCode", "getDormNo");
				}*/			
				else if(cls.equals("BANK_CD")){ /** 은행코드 콤보*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getBankCdCombo"); 
				}
				else if(cls.equals("TRF_TYPE")){ /** 교통 종류 구분*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getComboTrfCls"); 
				}		
				/*else if(cls.equals("STD_SAL")){ // 기본급년월 (사용안함, 쿼리존재X)
					list = (List<Map>) adao.list("enumeration.ClsCode", "dateList"); 
				}*/		
//				else if(cls.equals("PAM_SUB_CD")){ /** 지급,공제목록*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getPamSubCombo"); 
//				}			
//				else if(cls.equals("PAM_BF")){ /** 기지금수당*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getPamBFCombo"); 
//				}			
				/*else if(cls.equals("PAM_SUB_ALL")){ //지급전체목록 (사용안함, 쿼리존재X)
					list = (List<Map>) adao.list("enumeration.ClsCode", "getPamSubAllCombo"); 
				}*/		
//				else if(cls.equals("PAM_CODE_ALL")){ /** 급여코드전체목록*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getPamCodeAllCombo"); 
//				}			
//				else if(cls.equals("PAM_ENTRU_CODE")){ /** 외부인력 사용 급여코드목록*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getPamEntruCodeCombo"); 
//				}			
				else if(cls.equals("PAM_TOT_CLS")){ /** 급여집계구분항목*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getTotCombo"); 
				}			
				else if(cls.equals("PAY_N_TAX")){ /** 비과세구분(데이터없음) (pay_2030_005)*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "doComboNTax"); 
				}			
				else if(cls.equals("RSLT_EVAL_DGRE")){ /** 성과급등급*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getRsltEvalDgre"); 
				}			
				else if(cls.equals("RESL_CLS")){ /** 결의구분(데이터없음)*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getReslCls"); 
				}			
				else if(cls.equals("MINS_CD")){ /** 부처코드*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getMinsCd"); 
				}			
				else if(cls.equals("MGT_ORG_CD")){ /** 관리기관코드*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getMgtOrgCd"); 
				}			 
				else if(cls.equals("EVA_GUBUN_CLS")){ /** 지적사항 구분코드**/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getEvaIntelClsCombo"); 
				}
				/*else if(cls.equals("HRM_EDU_TP")){ // 교육기준코드
					list = (List<Map>) adao.list("enumeration.ClsCode", "getEdutpCombo"); 
				}*/			
				/*else if(cls.equals("RQST_CLS")){ // mis+pms 신청서종류 (사용안함, 쿼리존재X, fixed combo에 반영됨)
					list = (List<Map>) adao.list("enumeration.ClsCode", "getRqstCls"); 
				}*/			
				/*else if(cls.equals("JOB_CLS")){ // 직무종류
					list = (List<Map>) adao.list("enumeration.ClsCode", "getJobCls"); 
				}		*/
				/*else if(cls.equals("CMT")){ // 위원회 종류
					list = (List<Map>) adao.list("enumeration.ClsCode", "getCommittee"); 
				}	*/	
				/*else if(cls.equals("VCTN_CLS")){ // 휴가구분조회
					list = (List<Map>) adao.list("enumeration.ClsCode", "getVctnCls"); 
				}*/		
				else if(cls.equals("COMM_UP_CD")){ /** 상위 공통코드 조회*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getUpCdList"); 
				}		
				else if(cls.equals("ETC_CLS")){ /** 업무구분 콤보박스 설정*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getEtcList"); 
				}		
				else if(cls.equals("VAT_CLS")){ /**  출금 계산서구분 콤보박스 설정*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getVatClsCombo"); 
				}		
				/*else if(cls.equals("BTM_TRP_GRD")){ // 총무관리 > 출장관리 > 출장직급 (사용안함)
					list = (List<Map>) adao.list("enumeration.ClsCode", "getBtmTrfGradeCombo"); 
				}*/		
//				else if(cls.equals("GAM_VACF_CD")){ /** 휴양시설코드**/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getGamVacfCdCombo"); 
//				}		
//				else if(cls.equals("BUM_DNWI_SEQ")){ /** 총무관리 > 시설 > 소속기관 (데이터없음)**/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getBumDnwiSeq"); 
//				}		
//				else if(cls.equals("LBM_GNSTK_NO")){ /** 문헌관리 > 장서점검 > 계획**/
//					/** 
//					 *  쿼리 내에는 파라미터 받는 부분 있음
//					 * 실질적으로 사용할때는 파라미터를 넘기지 않음, 확인요망!**/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getLbmGnstkNo"); 
//				}		
//				else if(cls.equals("CLS_CD")){ /** 교육중분류(인사관리 > 교육 > 중분류)**/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getClsCd"); 
//				}		
				else if(cls.equals("ROLE_ID")){ /** 롤(담당자) 조회**/
					list = (List<Map>) adao.list("enumeration.ClsCode", "getRoleId"); 
				}		
				else if(cls.equals("PAM_OUTEMP")){ /**급여외부인력구분*/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getPamOutEmpCombo"); 
				}	
				///////////////////////    회계(ACM)     /////////////////////////
				else if (cls.equals("ACT_INCM")){ /** 소득구분 조회 **/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getIncm");
				}else if (cls.equals("ACT_STD_UPNM")){ /** 회계 공통코드 상위코드 콤보(데이터 없음) **/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getActStdUpNm");
				}else if (cls.equals("ACT_ACCT_CHAR")){ /** 회계 계정코드 콤보 **/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getAcctCharCombo");
				}else if (cls.equals("ACT_APROV")){ /** 회계 결재권자정보 콤보(데이터 없음)**/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getAprovCombo");
				}else if(cls.equals("ACT_EXPN")){ /** 비목코드, 비목명 조회 **/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getExpnCombo");
				}else if(cls.equals("TNAC_BANK_ACNT")){ /** 계좌코드**/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getTnacBankAcntCombo");
				}else if(cls.equals("ACT_ACCT_CD")){ /** 미결계정 **/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getPendyCd");
//				}else if(cls.equals("ACT_RESL_X")){ /** 결산결의서(데이터없음) **/
//					list = (List<Map>) adao.list("enumeration.ClsCode", "getXreslMst");
				}
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				logger.error(e.getMessage());
			}
		}
		
		
		if(data != null) {
			for (int i = 0; i < data.length; i++) {
				Map map = new HashMap();
				map.put("DATA", data[i][0]);
				map.put("LABEL", data[i][1]);
				list.add(map);
			}
		}
		
		return list;
	}
	
	public static Map getEnumList(){
		Map map = new HashMap();
		List<CommonClsDataStatic> list = Arrays.asList(CommonClsDataStatic.values());
		
		for(CommonClsDataStatic enums : list){
			Map enumMap = new HashMap();
			enumMap.put("json", enums.getJson());
			enumMap.put("list", enums.getList());
			enumMap.put("cls", enums.getCls());
			map.put(enums.getCls(), enumMap);
		}
		
		
		return map;
	}
	
	public static CommonClsDataStatic getEnum(String name){
		CommonClsDataStatic result = null;
		
		for(CommonClsDataStatic rt: CommonClsDataStatic.values()){
			if(rt.name().equals(name)){
				result = rt;
			}
		}
		return result;
		
	}
}
