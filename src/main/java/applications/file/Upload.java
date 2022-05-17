package applications.file;

import java.util.List;
import java.util.Map;

public interface Upload {
	/*public int doUpload(HttpServletRequest request, String BLTN_ID, String BLTN_SENT_SEQ, String COMT_SENT_SEQ) throws Exception;
	public void doDeleteAll(String BLTN_ID, String BLTN_SENT_SEQ) throws Exception;
	public void doDelete(String BLTN_ID, String BLTN_SENT_SEQ, String COMT_SENT_SEQ) throws Exception;
	public void doDeleteOne(String BLTN_ID, String BLTN_SENT_SEQ, String COMT_SENT_SEQ, String ATCH_SENT_SEQ) throws Exception;*/
	public List<Map> doUpload(Map fileParam, String pgm_id, String rqst_no, String atch_fle_seq) throws Exception;
}

