package module.model;

import java.util.List;

import personal.aug.convert.MapAndObjectConversion;
import personal.aug.convert.annotations.MapKey;

public class ReportBladeProcedure extends MapAndObjectConversion {

	@MapKey("BLD_PROC_ID")
	private String id;
	@MapKey("MAINT_CD")
	private String maintenanceCode;
	@MapKey("BREAKAGE")
	private String breakage;
	@MapKey("BREAKAGE_SEVERITY")
	private String breakageSeverity;
	@MapKey("BREAKAGE_INFO")
	private String breakageInfo;
	@MapKey("OP_MAINT_PLN")
	private String plan;
	@MapKey("BLD_ORD")
	private Integer order;
	@MapKey("NO")
	private Long no;
	private List<TccoFile> attachments;
	
	public ReportBladeProcedure() { }

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMaintenanceCode() {
		return maintenanceCode;
	}

	public void setMaintenanceCode(String maintenanceCode) {
		this.maintenanceCode = maintenanceCode;
	}

	public String getBreakage() {
		return breakage;
	}

	public void setBreakage(String breakage) {
		this.breakage = breakage;
	}

	public String getBreakageSeverity() {
		return breakageSeverity;
	}

	public void setBreakageSeverity(String breakageSeverity) {
		this.breakageSeverity = breakageSeverity;
	}

	public String getBreakageInfo() {
		return breakageInfo;
	}

	public void setBreakageInfo(String breakageInfo) {
		this.breakageInfo = breakageInfo;
	}

	public String getPlan() {
		return plan;
	}

	public void setPlan(String plan) {
		this.plan = plan;
	}

	public Integer getOrder() {
		return order;
	}

	public void setOrder(Integer order) {
		this.order = order;
	}

	public Long getNo() {
		return no;
	}

	public void setNo(Long no) {
		this.no = no;
	}

	public List<TccoFile> getAttachments() {
		return attachments;
	}

	public void setAttachments(List<TccoFile> attachments) {
		this.attachments = attachments;
	}
	
}
