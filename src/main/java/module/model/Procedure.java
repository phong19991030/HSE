package module.model;

import personal.aug.convert.MapAndObjectConversion;
import personal.aug.convert.annotations.MapKey;

public class Procedure extends MapAndObjectConversion {

	@MapKey("RPT_ID")
	private String reportId;
	@MapKey("RPT_TYPE")
	private String reportType;
	@MapKey("RPT_TYPE_NM")
	private String reportTypeName;
	@MapKey("MAINT_CD")
	private String mainCode;
	@MapKey("JOB_NAME")
	private String jobName;
	@MapKey("CONT")
	private String strCont;
	@MapKey("ISSUES")
	private String strIssues;

	public Procedure() {
	}

	public Procedure(String reportId, String reportType, String reportTypeName, String mainCode, String jobName,
			String strCont, String strIssues) {
		super();
		this.reportId = reportId;
		this.reportType = reportType;
		this.reportTypeName = reportTypeName;
		this.mainCode = mainCode;
		this.jobName = jobName;
		this.strCont = strCont;
		this.strIssues = strIssues;
	}

	public String getReportId() {
		return reportId;
	}

	public void setReportId(String reportId) {
		this.reportId = reportId;
	}

	public String getReportType() {
		return reportType;
	}

	public void setReportType(String reportType) {
		this.reportType = reportType;
	}

	public String getReportTypeName() {
		return reportTypeName;
	}

	public void setReportTypeName(String reportTypeName) {
		this.reportTypeName = reportTypeName;
	}

	public String getMainCode() {
		return mainCode;
	}

	public void setMainCode(String mainCode) {
		this.mainCode = mainCode;
	}

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	public String getStrCont() {
		return strCont;
	}

	public void setStrCont(String strCont) {
		this.strCont = strCont;
	}

	public String getStrIssues() {
		return strIssues;
	}

	public void setStrIssues(String strIssues) {
		this.strIssues = strIssues;
	}

}
