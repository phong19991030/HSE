package module.model;

import applications.util.ValidationAndConvert;
import personal.aug.convert.annotations.MapKey;

public class Attachment extends ValidationAndConvert {

	@MapKey("RPT_PROC_ID")
	private String procId;
	@MapKey("ATCH_FLE_SEQ")
	private String attachFileSeq;
	@MapKey("FLE_PATH")
	private String filePath;
	@MapKey("DESCRPT")
	private String description;

	public Attachment() {
	}

	public Attachment(String procId, String attachFileSeq, String filePath, String description) {
		super();
		this.procId = procId;
		this.attachFileSeq = attachFileSeq;
		this.filePath = filePath;
		this.description = description;
	}

	public String getProcId() {
		return procId;
	}

	public void setProcId(String procId) {
		this.procId = procId;
	}

	public String getAttachFileSeq() {
		return attachFileSeq;
	}

	public void setAttachFileSeq(String attachFileSeq) {
		this.attachFileSeq = attachFileSeq;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
