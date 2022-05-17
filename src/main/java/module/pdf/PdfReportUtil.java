package module.pdf;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.itextpdf.text.BadElementException;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Image;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.codec.Base64;
import com.itextpdf.text.pdf.parser.PdfTextExtractor;
import com.itextpdf.tool.xml.NoCustomContextException;
import com.itextpdf.tool.xml.Pipeline;
import com.itextpdf.tool.xml.Tag;
import com.itextpdf.tool.xml.WorkerContext;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerFontProvider;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.css.CssFilesImpl;
import com.itextpdf.tool.xml.css.StyleAttrCSSResolver;
import com.itextpdf.tool.xml.exceptions.RuntimeWorkerException;
import com.itextpdf.tool.xml.html.CssAppliersImpl;
import com.itextpdf.tool.xml.html.HTML;
import com.itextpdf.tool.xml.html.TagProcessorFactory;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;


public class PdfReportUtil {
	
	public static Logger logger = LogManager.getLogger(PdfUtil.class);

	public static byte[] makeReportPDF(PdfContent content,String reportType, String rptNo, String title, String operation, Map<String,String> userCompanyInfo) throws Exception {
		if (content == null) {
			throw new Exception("PdfContent parameter cannot be null!");
		}
		
		if (content.getTemplate() == null) {
			throw new Exception("PdfContent > template property cannot be null!");
		}
		
		FileReader fr = null;
		BufferedReader br = null;
		try {
			if("RPT_TYP_01".equals(reportType)) {
				String[] tmpKeys = new String[10];
				for(int i=0; i<10;i++) {
					int index = i+1;
					tmpKeys[i] = "#{TOC_"+index+"}";
				}
				
				String[] tmpValues = new String[10];
				tmpValues[0] = "1. Safety";
				tmpValues[1] = "2. Purpose";
				tmpValues[2] = "3. Alarm";
				tmpValues[3] = "4. Tool list";
				tmpValues[4] = "5. Parts";
				tmpValues[5] = "6. Personal Protection Equipment";
				tmpValues[6] = "7. Procedure";
				tmpValues[7] = "8. Issue";
				tmpValues[8] = "9. Remark";
				tmpValues[9] = "10. Conclusion";
				
				content.setKeyList(tmpKeys);
				content.setValueList(tmpValues);
				
				/*
				 * @JK - 보안 취약점 수정
				 */
				//File file = new File(PdfUtil.class.getClassLoader().getResource(content.getTemplate()).getPath());
				String filePath = "";
				if(PdfUtil.class.getClassLoader().getResource(content.getTemplate()) != null) {
					filePath = PdfUtil.class.getClassLoader().getResource(content.getTemplate()).getPath();
				}
				File file = new File(filePath);
//				FileReader fr = new FileReader(file);
//				BufferedReader br = new BufferedReader(fr);
				fr = new FileReader(file);
				br = new BufferedReader(fr);
				StringBuilder s = new StringBuilder();
				String line;
				while ((line = br.readLine()) != null) {
					s.append(line);
				}
//				br.close();
				String ct = s.toString();
				ct = convertImageToBase64(ct);
				String data = content.editContent(ct);
				
				byte[] pdf = generateInspectionPdf(content, null,rptNo, title, operation, userCompanyInfo);
		        PdfReader reader = new PdfReader(pdf);
		        int[] pageNumbers = new int[content.getKeyList().length];
		       
		        int index = 0;
		        int startCal = content.getStartPageToCalculatePageNumber() > 0 ? content.getStartPageToCalculatePageNumber() : 2;
		        
				
		        for (String toc : content.getValueList()) {
		        	for (int i = 1; i <= reader.getNumberOfPages(); i++) {
		        		if (i < startCal || (index != 0 && i < pageNumbers[index - 1])) continue;
		        		final String textFromPage = PdfTextExtractor.getTextFromPage(reader, i);
	    	        	
	    	        	if (textFromPage.contains(toc)) {
	            			pageNumbers[index] = i;
	            			break;
	            		}
		        	}
		        	index++;
		        }
		        
		        if (pageNumbers[0] == 0) pageNumbers[0] = 1;
		        for (int i = 0; i < pageNumbers.length; i++) {
	        		data = data.replace(content.getKeyList()[i], pageNumbers[i] + "");
	        	}
				return generateInspectionPdf(content,data,rptNo, title, operation, userCompanyInfo);
			}
		} catch (IOException e) {
			//e.printStackTrace();
			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
		} finally {
			if(br != null) br.close();
			if(fr != null) fr.close();
		}
		
		return null;
	}
	
	public static void writeToFile(byte[] data, String targetPath) {
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(targetPath);
			fos.write(data);
		} catch (IOException e) {
			//e.printStackTrace();
			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
		} finally {
			if (fos != null) {
				try {
					fos.close();
				} catch (IOException e) {
					//e.printStackTrace();
					logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
				}
			}
		}
	}
	
	private static byte[] generateInspectionPdf(PdfContent content, String textContent, String rptNo, String title, String operation, Map<String,String> userCompanyInfo) throws Exception {
		Document doc = new Document(content.getPageSize(), content.getMarginLeft(), content.getMarginRight(), content.getMarginTop(), content.getMarginBottom());
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			PdfWriter writer = PdfWriter.getInstance(doc, baos);
			
			InspectionReportHeaderFooterPageEvent event = new InspectionReportHeaderFooterPageEvent(rptNo, title, operation, userCompanyInfo);
			writer.setPageEvent(event);
			doc.open();
			doc.add(new Chunk(""));
			String data = "";
	
			if (textContent != null && !textContent.isEmpty()) {
				data = textContent;
			} else {
				/*
				 * @JK - 보안 취약점 수정 
				 */
				//File file = new File(PdfReportUtil.class.getClassLoader().getResource(content.getTemplate()).getPath());
				String filePath = "";
				if(PdfReportUtil.class.getClassLoader().getResource(content.getTemplate()) != null) {
					filePath = PdfReportUtil.class.getClassLoader().getResource(content.getTemplate()).getPath();
				}
				File file = new File(filePath);
				FileReader fr = new FileReader(file);
				BufferedReader br = new BufferedReader(fr);
				StringBuilder s = new StringBuilder();
				String line;
				while ((line = br.readLine()) != null) {
					s.append(line);
				}
				br.close();
				String ct = s.toString();
				ct = convertImageToBase64(ct);
				data = content.editContent(ct);
			}
			
			XMLWorkerFontProvider font = new XMLWorkerFontProvider(XMLWorkerFontProvider.DONTLOOKFORFONTS);
			/*
			 * @JK - 보안 취약점 수정 
			 */
			//String fontPath = PdfReportUtil.class.getClassLoader().getResource(content.getFont()).getPath();
			String fontPath = ""; 
			if(PdfReportUtil.class.getClassLoader().getResource(content.getFont()) != null) {
				fontPath = PdfReportUtil.class.getClassLoader().getResource(content.getFont()).getPath();
			}
			font.register(fontPath);
			
			final TagProcessorFactory tagProcessorFactory = Tags.getHtmlTagProcessorFactory();
	        tagProcessorFactory.removeProcessor(HTML.Tag.IMG);
	        tagProcessorFactory.addProcessor(new ImageTagProcessor(), HTML.Tag.IMG);
	        
	        final CssFilesImpl cssFiles = new CssFilesImpl();
	        cssFiles.add(XMLWorkerHelper.getInstance().getDefaultCSS());
	        final StyleAttrCSSResolver cssResolver = new StyleAttrCSSResolver(cssFiles);
	        final HtmlPipelineContext hpc = new HtmlPipelineContext(new CssAppliersImpl(font));
	        hpc.setAcceptUnknown(true).autoBookmark(true).setTagFactory(tagProcessorFactory);
	        final HtmlPipeline htmlPipeline = new HtmlPipeline(hpc, new PdfWriterPipeline(doc, writer));
	        final Pipeline<?> pipeline = new CssResolverPipeline(cssResolver, htmlPipeline);
	        final XMLWorker worker = new XMLWorker(pipeline, true);
	        final Charset charset = Charset.forName("UTF-8");
	        final XMLParser xmlParser = new XMLParser(true, worker, charset);
	        xmlParser.parse(new ByteArrayInputStream(data.getBytes()), charset);
			
	        doc.close();
			writer.close();
			
			return baos.toByteArray();
		} catch (IOException e) {
			//e.printStackTrace();
			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
		} finally {
			baos.close();
		}
		
		return null;
	}
	
	
	private static class ImageTagProcessor extends com.itextpdf.tool.xml.html.Image {
		@Override
		public List<Element> end(final WorkerContext ctx, final Tag tag, final List<Element> currentContent) {
		    final Map<String, String> attributes = tag.getAttributes();
		    String src = attributes.get(HTML.Attribute.SRC);
		    List<Element> elements = new ArrayList<Element>(1);
		    if (null != src && src.length() > 0) {
		        Image img = null;
		        if (src.startsWith("data:image/")) {
		            final String base64Data = src.substring(src.indexOf(",") + 1);
		            try {
		                img = Image.getInstance(Base64.decode(base64Data));
		            } catch (IOException | BadElementException e) {
		                //e.printStackTrace();
		            	logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
		            }
		            if (img != null) {
		                try {
		                    final HtmlPipelineContext htmlPipelineContext = getHtmlPipelineContext(ctx);
		                    elements.add(getCssAppliers().apply(new Chunk((com.itextpdf.text.Image) getCssAppliers().apply(img, tag, htmlPipelineContext), 0, 0, true), tag,
		                        htmlPipelineContext));
		                } catch (NoCustomContextException e) {
		                    throw new RuntimeWorkerException(e);
		                }
		            }
		        }

		        if (img == null) {
		            elements = super.end(ctx, tag, currentContent);
		        }
		    }
		    return elements;
		}
	}
	
	private static String convertImageToBase64(String content) {
		Pattern pattern = Pattern.compile("(<img[^>]*?src=([\"']?)\\b(?!data:image/)\\b*?([^>]*?)([\"']?)*?/*?>)", Pattern.CASE_INSENSITIVE);
		Matcher matcher = pattern.matcher(content);
		Set<String> imgTags = new HashSet<>(0);
		Set<String> imgs = new HashSet<>(0);
		while (matcher.find()) {
			for (int i = 0; i < matcher.groupCount(); i++) {
				imgTags.add(matcher.group(0));
				imgs.add(matcher.group(3));
			}
		}
		
		List<String> imgTagList = new ArrayList<>(imgTags);
		List<String> imgList = new ArrayList<>(imgs);
		
		for (int i = 0; i < imgList.size(); i++) {
			final String fileName = imgList.get(i);
			String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
			if (extension == null) extension = "";
			extension = extension.toLowerCase();
			
			if ("jpeg,jpg,png,gif".contains(extension)) {
				synchronized (content) {
					URL url = PdfReportUtil.class.getClassLoader().getResource("pdf/" + fileName);
					if (url == null) {
						content = content.replace(imgTagList.get(i), "");
						continue;
					}
					
					String filePath = url.getPath();
					File file = new File(filePath);
					if (file.exists()) {
						String base64 = Base64.encodeFromFile(filePath);
						if (base64 != null && !base64.isEmpty()) {
							base64 = base64.replaceAll("[\r\n]?", "");
							content = content.replace(imgTagList.get(i), "<img src='data:image/" + extension + ";base64," + base64 + "'/>");
						}
					}
				}
			}
		}
		
		return content;
	}
	
}
