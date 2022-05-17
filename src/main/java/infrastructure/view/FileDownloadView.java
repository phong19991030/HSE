package infrastructure.view;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.AbstractView;

@Component("downloadView2")
@Deprecated
public class FileDownloadView extends AbstractView {

	@Override
	protected void renderMergedOutputModel(Map<String, Object> model,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		File downloadFile = (File) model.get("file");
		String fileName = (String) model.get("filename");
		
		fileName = URLEncoder.encode(fileName, "UTF-8");
		
		response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
		response.setContentType("application/octet-stream");
		response.setContentLength((int)downloadFile.length());
		
		byte[] buffer = new byte[(int) downloadFile.length()];
		
		BufferedInputStream inputStream = new BufferedInputStream(new FileInputStream(downloadFile));
		
		BufferedOutputStream outputStream = new BufferedOutputStream(response.getOutputStream());
		
		int readCnt = 0;
		while ((readCnt = inputStream.read(buffer)) != -1) {
			outputStream.write(buffer, 0, readCnt);
		}
		
		inputStream.close();
		outputStream.close();
		
	}

}
