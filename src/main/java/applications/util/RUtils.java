package applications.util;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.stream.Collectors;

import infrastructure.util.ResourceUtil;

public class RUtils {

	
	public final static String getMeanScriptContent() throws IOException, URISyntaxException {

		Map mapRootPath = ResourceUtil.getMessageMap("system.dir.predict.Rscript");
		String rootPath = (String) mapRootPath.get("MESSAGE");
		
		String path = rootPath + "testNNETAR.R";
		
        Path inputScript = Paths.get(path);
        return Files.lines(inputScript)
            .collect(Collectors.joining());
	}
	
	
}
