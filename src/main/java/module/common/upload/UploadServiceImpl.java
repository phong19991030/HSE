package module.common.upload;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import applications.util.AjaxResult;
import applications.util.UtilService;
import applications.util.Utils;
import infrastructure.inheritance.service.AbstractService;

@Service("UploadServiceImpl")
public class UploadServiceImpl extends AbstractService {

	@Autowired
	public UploadDAOImpl dao;
	@Autowired
	private ServletContext servletContext;

	@Autowired
	private UtilService utilService;

	public AjaxResult fileUpload(MultipartFile file, String userUid) throws Exception {
		AjaxResult result = new AjaxResult();
		if (file != null && file.getSize() > 0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			File f = new File(servletContext.getRealPath(""));
			String rootDir = "";
			if (f.getParentFile() != null && f.getParentFile().getParentFile() != null) {
				rootDir = f.getParentFile().getParentFile().getAbsolutePath() + File.separator
						+ Utils.getProperty("base.uploadDir") + File.separator + sdf.format(new Date());
			}
			if (!Utils.isDirExist(rootDir)) {
				Utils.makeDir(rootDir);
			}

			final int dotPos = file.getOriginalFilename().lastIndexOf(".");
			final String fileName = String.valueOf(new Date().getTime() + Math.abs(new Random().nextInt(404)));
			final String extension = file.getOriginalFilename().substring(dotPos + 1).toLowerCase();
			File saveFile = new File(rootDir + File.separator + fileName + "." + extension);
			BufferedOutputStream bos = null;

			try {
				bos = new BufferedOutputStream(new FileOutputStream(saveFile));
				byte[] bytes = file.getBytes();
				bos.write(bytes);
				bos.flush();

				Map<String, Object> params = new HashMap<>();
				params.put("ATCH_FLE_SEQ", UUID.randomUUID().toString());
				params.put("FLE_TP", extension);
				params.put("FLE_PATH", saveFile.getAbsolutePath());
				params.put("FLE_NM", file.getOriginalFilename());
				params.put("NEW_FLE_NM", fileName + "." + extension);
				params.put("FLE_SZ", file.getSize());
				params.put("INS_ID", userUid);
				params.put("DESCRPT", "");
				utilService.insertFileToTCCO_FILE(params);
				result.setStatus(true);
				result.setResponseData(params);
			} catch (IOException e) {
				logger.error("Error when upload files: " + e);
			} finally {
				if (bos != null) {
					bos.close();
				}
			}
		}
		return result;
	}
}
