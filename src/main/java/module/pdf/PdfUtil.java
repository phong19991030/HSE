package module.pdf;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.net.MalformedURLException;
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

/**
 * @author HungDM
 *
 */
public class PdfUtil {
	
	public static Logger logger = LogManager.getLogger(PdfUtil.class);

	public static byte[] makePDF(PdfContent content) throws Exception {
		if (content == null) {
			throw new Exception("PdfContent parameter cannot be null!");
		}
		
		if (content.getTemplate() == null) {
			throw new Exception("PdfContent > template property cannot be null!");
		}
		
		try {
			if (content.getKeyList() != null && content.getValueList() != null 
					&& content.getKeyList().length == content.getValueList().length) {
				/*
				 * @JK - 보안 취약점 수정
				 */
				//File file = new File(PdfUtil.class.getClassLoader().getResource(content.getTemplate()).getPath());
				String filePath = "";
				if(PdfUtil.class.getClassLoader().getResource(content.getTemplate()) != null) {
					filePath = PdfUtil.class.getClassLoader().getResource(content.getTemplate()).getPath();
				}
				File file = new File(filePath);
				FileReader fr = new FileReader(file);				
				BufferedReader br = new BufferedReader(fr);
				StringBuilder s = new StringBuilder();
				String line;
				while ((line = br.readLine()) != null) {
					s.append(line);
				}
				fr.close();
				br.close();
				
				// 이미지 변환
				String ct = s.toString();
				ct = convertImageToBase64FromContent(ct);
				String data = content.editContent(ct);
				
				byte[] pdf = generatePdf(content, null);
		        PdfReader reader = new PdfReader(pdf);
		        int[] pageNumbers = new int[content.getKeyList().length];
		        
		        int index = 0;
		        int startCal = content.getStartPageToCalculatePageNumber() > 0 ? content.getStartPageToCalculatePageNumber() : 3;
	        	for (String toc : content.getValueList()) {
	        		for (int i = 1; i <= reader.getNumberOfPages(); i++) {
	        			if (i < startCal /*|| (index != 0 && i < pageNumbers[index - 1])*/) continue;
	        			
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
				
				return generatePdf(content, data);
			} else {
				return generatePdf(content, null);
			}
		} catch (IOException e) {
			//e.printStackTrace();
			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
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
	
	private static byte[] generatePdf(PdfContent content, String textContent) throws Exception {
		Document doc = new Document(content.getPageSize(), content.getMarginLeft(), content.getMarginRight(), content.getMarginTop(), content.getMarginBottom());
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			PdfWriter writer = PdfWriter.getInstance(doc, baos);
			// 헤더, 풋터
			if (content.getPageEventHelper() != null) {
				writer.setPageEvent(content.getPageEventHelper());
			}
			doc.open();
			doc.add(new Chunk(""));
			String data = "";
			
			if (textContent != null && !textContent.isEmpty()) {
				data = textContent;
			} else {
				/*
				 * @JK - 보안 취약점 수정
				 */
				//File file = new File(PdfUtil.class.getClassLoader().getResource(content.getTemplate()).getPath());
				String filePath = "";
				if(PdfUtil.class.getClassLoader().getResource(content.getTemplate()) != null) {
					filePath = PdfUtil.class.getClassLoader().getResource(content.getTemplate()).getPath();
				}
				File file = new File(filePath);
				
				FileReader fr = new FileReader(file);
				BufferedReader br = new BufferedReader(fr);
				StringBuilder s = new StringBuilder();
				String line;
				while ((line = br.readLine()) != null) {
					s.append(line);
				}
				fr.close();
				br.close();
				String ct = s.toString();
				ct = convertImageToBase64FromContent(ct);
				data = content.editContent(ct);
			}
			
			/*
			 * @JK - 보안 취약점 수정 
			 */
			//final String fontPath = PdfUtil.class.getClassLoader().getResource(content.getFont()).getPath();
			String fontPath = "";
			if(PdfUtil.class.getClassLoader().getResource(content.getFont()).getPath() != null) {
				fontPath = PdfUtil.class.getClassLoader().getResource(content.getFont()).getPath();
			}
			XMLWorkerFontProvider font = new XMLWorkerFontProvider(XMLWorkerFontProvider.DONTLOOKFORFONTS);
			boolean isRegistered = font.isRegistered(fontPath);
			/*
			 * @JK - 보안 취약점 수정
			 */
			//if (!isRegistered) font.register(PdfUtil.class.getClassLoader().getResource(content.getFont()).getPath());
			if (!isRegistered) font.register(fontPath);
			
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
			
	        worker.close();
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
		            } catch (BadElementException e) {
		                //e.printStackTrace();
		            	logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
		            } catch (MalformedURLException e) {
						// TODO Auto-generated catch block
		            	logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
					} catch (IOException e) {
						// TODO Auto-generated catch block
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
	
	public static String convertImageToBase64FromContent(String content) {
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
			
			if ("jpeg,jpg,png,gif,svg+xml".contains(extension)) {
				synchronized (content) {
					URL url = PdfUtil.class.getClassLoader().getResource("pdf/" + fileName);
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
							content = content.replaceAll(imgList.get(i), "data:image/" + extension + ";base64," + base64);
						}
					}
				}
			}
		}
		
		
		return content;
	}
	
	public static String convertImageToBase64(String filePath) {
		
		String extension = filePath.substring(filePath.lastIndexOf(".") + 1);
		if (extension == null) extension = "";
		extension = extension.toLowerCase();
		
		if ("jpeg,jpg,png,gif,svg+xml".contains(extension)) {
			File file = new File(filePath);
			if (file.exists()) {
				String base64 = Base64.encodeFromFile(filePath);
				if (base64 != null && !base64.isEmpty()) {
					base64 = base64.replaceAll("[\r\n]?", "");
					return "data:image/" + extension + ";base64," + base64;
				}
			}
		}
		
		return null;
	}
	
}
