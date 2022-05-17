package module.model;

import java.util.List;

import personal.aug.convert.MapAndObjectConversion;
import personal.aug.convert.annotations.MapKey;

public class Report extends MapAndObjectConversion {

	@MapKey("RPT_ID")
	private String reportId;
	@MapKey("RPT_TYPE")
	private String reportType;
	@MapKey("RPT_TYPE_NM")
	private String reportTypeName;
	@MapKey("RPT_NO")
	private String reportNo;
	@MapKey("PROJECT")
	private String project;
	@MapKey("GERATOR_ID")
	private String geratorId;
	@MapKey("CUST_ID")
	private String customerId;
	@MapKey("STRT_DOWNTIME")
	private String startDowntime;
	@MapKey("END_DOWNTIME")
	private String endDowntime;
	@MapKey("START_WRK_TIME")
	private String startWorkingTime;
	@MapKey("END_WRK_TIME")
	private String endWorkingTime;
	@MapKey("EVENT_ID")
	private String eventId;
	@MapKey("WRTR_ID")
	private String writerId;
	@MapKey("AUTHOR_NM")
	private String authorName;
	@MapKey("INSPECTION_RESULTS")
	private String inspectionResults;
	@MapKey("COMMENT")
	private String comment;
	@MapKey("CONCLUSION")
	private String conclusion;
	private List<ReportBladeProcedure> procedureBlade01;
	private List<ReportBladeProcedure> procedureBlade02;
	private List<ReportBladeProcedure> procedureBlade03;

	public Report() {
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

	public String getReportNo() {
		return reportNo;
	}

	public void setReportNo(String reportNo) {
		this.reportNo = reportNo;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public String getGeratorId() {
		return geratorId;
	}

	public void setGeratorId(String geratorId) {
		this.geratorId = geratorId;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getStartDowntime() {
		return startDowntime;
	}

	public void setStartDowntime(String startDowntime) {
		this.startDowntime = startDowntime;
	}

	public String getEndDowntime() {
		return endDowntime;
	}

	public void setEndDowntime(String endDowntime) {
		this.endDowntime = endDowntime;
	}

	public String getStartWorkingTime() {
		return startWorkingTime;
	}

	public void setStartWorkingTime(String startWorkingTime) {
		this.startWorkingTime = startWorkingTime;
	}

	public String getEndWorkingTime() {
		return endWorkingTime;
	}

	public void setEndWorkingTime(String endWorkingTime) {
		this.endWorkingTime = endWorkingTime;
	}

	public String getEventId() {
		return eventId;
	}

	public void setEventId(String eventId) {
		this.eventId = eventId;
	}

	public String getWriterId() {
		return writerId;
	}

	public void setWriterId(String writerId) {
		this.writerId = writerId;
	}

	public String getAuthorName() {
		return authorName;
	}

	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}

	public String getInspectionResults() {
		return inspectionResults;
	}

	public void setInspectionResults(String inspectionResults) {
		this.inspectionResults = inspectionResults;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getConclusion() {
		return conclusion;
	}

	public void setConclusion(String conclusion) {
		this.conclusion = conclusion;
	}

	public List<ReportBladeProcedure> getProcedureBlade01() {
		return procedureBlade01;
	}

	public void setProcedureBlade01(List<ReportBladeProcedure> procedureBlade01) {
		this.procedureBlade01 = procedureBlade01;
	}

	public List<ReportBladeProcedure> getProcedureBlade02() {
		return procedureBlade02;
	}

	public void setProcedureBlade02(List<ReportBladeProcedure> procedureBlade02) {
		this.procedureBlade02 = procedureBlade02;
	}

	public List<ReportBladeProcedure> getProcedureBlade03() {
		return procedureBlade03;
	}

	public void setProcedureBlade03(List<ReportBladeProcedure> procedureBlade03) {
		this.procedureBlade03 = procedureBlade03;
	}

}
