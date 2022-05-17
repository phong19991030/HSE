package module.pdf;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;

import com.itextpdf.text.PageSize;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfPageEventHelper;

import infrastructure.inheritance.BaseController;

/**
 * @author HungDM
 *
 */
public abstract class PdfContent implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private class DefaultOptions {
		public static final float MARGIN_TOP = 76f;
		public static final float MARGIN_BOTTOM = 60f;
		public static final float MARGIN_LEFT = 60f;
		public static final float MARGIN_RIGHT = 60f;
		public static final String FONT = PdfFont.NANUM_BARUN_GOTHIC;
	}

	private String font;
	private String template;
	private Rectangle pageSize;
	private float marginLeft;
	private float marginRight;
	private float marginTop;
	private float marginBottom;
	private String[] keyList;
	private String[] valueList;
	private int startPageToCalculatePageNumber;
	private PdfPageEventHelper pageEventHelper;
	
	public PdfContent() {
		font = DefaultOptions.FONT;
		pageSize = PageSize.A4;
		marginLeft = DefaultOptions.MARGIN_LEFT;
		marginRight = DefaultOptions.MARGIN_RIGHT;
		marginTop = DefaultOptions.MARGIN_TOP;
		marginBottom = DefaultOptions.MARGIN_BOTTOM;
	}

	public PdfContent(String font, String template, Rectangle pageSize, float marginLeft, float marginRight,
			float marginTop, float marginBottom, String[] keyList, String[] valueList) {
		super();
		this.font = font;
		this.template = template;
		this.pageSize = pageSize;
		this.marginLeft = marginLeft;
		this.marginRight = marginRight;
		this.marginTop = marginTop;
		this.marginBottom = marginBottom;
		this.keyList = keyList;
		this.valueList = valueList;
	}
	
	public abstract String editContent(String content);

	public String getFont() {
		return font;
	}

	public void setFont(String font) {
		this.font = font;
	}

	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template;
	}

	public Rectangle getPageSize() {
		return pageSize;
	}

	public void setPageSize(Rectangle pageSize) {
		this.pageSize = pageSize;
	}

	public float getMarginLeft() {
		return marginLeft;
	}

	public void setMarginLeft(float marginLeft) {
		this.marginLeft = marginLeft;
	}

	public float getMarginRight() {
		return marginRight;
	}

	public void setMarginRight(float marginRight) {
		this.marginRight = marginRight;
	}

	public float getMarginTop() {
		return marginTop;
	}

	public void setMarginTop(float marginTop) {
		this.marginTop = marginTop;
	}

	public float getMarginBottom() {
		return marginBottom;
	}

	public void setMarginBottom(float marginBottom) {
		this.marginBottom = marginBottom;
	}
	
	public String[] getKeyList() {
		/*
		 * @JK - 보안 취약점 수정
		 * : private로 선언된 배열을 public 으로 선언된 메소드를 통해 반환
		 */
		//return keyList;
		String[] arr = null;
		if(this.keyList != null) {
			arr = new String[keyList.length];
			for(int i = 0; i<keyList.length; i++) {
				arr[i] = this.keyList[i];
			}
		}
		return arr;
	}

	public void setKeyList(String[] keyList) {
		/*
		 * @JK - 보안 취약점 수정 
		 * : private로 선언된 배열을 public 으로 선언된 메소드를 통해 할당
		 */
		//this.keyList = keyList;
		this.keyList = new String[keyList.length];
		for(int i=0; i<keyList.length; i++) {
			this.keyList[i] = keyList[i];
		}
	}

	public String[] getValueList() {
		/*
		 * @JK - 보안 취약점 수정
		 * : private로 선언된 배열을 public 으로 선언된 메소드를 통해 반환 
		 */
		//return valueList;
		String[] arr = null;
		if(this.valueList != null) {
			arr = new String[valueList.length];
			for(int i=0; i<valueList.length; i++) {
				arr[i] = this.valueList[i];
			}
		}
		return arr;
	}

	public void setValueList(String[] valueList) {
		/*
		 * @JK - 보안 취약점 수정
		 * : private로 선언된 배열을 public 으로 선언된 메소드를 통해 할당 
		 */
		//this.valueList = valueList;
		this.valueList = new String[valueList.length];
		for(int i=0; i<valueList.length; i++) {
			this.valueList[i] = valueList[i];
		}
	}
	
	public int getStartPageToCalculatePageNumber() {
		return startPageToCalculatePageNumber;
	}

	public void setStartPageToCalculatePageNumber(int startPageToCalculatePageNumber) {
		this.startPageToCalculatePageNumber = startPageToCalculatePageNumber;
	}

	public PdfPageEventHelper getPageEventHelper() {
		return pageEventHelper;
	}

	public void setPageEventHelper(PdfPageEventHelper pageEventHelper) {
		this.pageEventHelper = pageEventHelper;
	}

	public String getContent() {
		/*
		 * @JK - 보안 취약점 수정 
		 */
		//File file = new File(PdfUtil.class.getClassLoader().getResource(template).getPath());
		String filePath = "";
		if(PdfUtil.class.getClassLoader().getResource(template) != null) {
			filePath = PdfUtil.class.getClassLoader().getResource(template).getPath();
		}
		File file = new File(filePath);
		InputStreamReader fr = null;
		BufferedReader br = null;
		try {
			//File file = new File(PdfUtil.class.getClassLoader().getResource(template).getPath());
			//InputStreamReader fr = new InputStreamReader(new FileInputStream(file), StandardCharsets.UTF_8);
			fr = new InputStreamReader(new FileInputStream(file), StandardCharsets.UTF_8);
			//BufferedReader br = new BufferedReader(fr);
			br = new BufferedReader(fr);
			StringBuilder s = new StringBuilder();
			String line;
			while ((line = br.readLine()) != null) {
				s.append(line);
			}
			//br.close();
			String ct = s.toString();
			ct = PdfUtil.convertImageToBase64FromContent(ct);
			return editContent(ct);
		} catch (IOException e) {
			BaseController.exceptionLogging(e);
			return null;
		} finally {
			try {
				if(fr != null) fr.close();
				if(br != null) br.close();
			} catch (IOException e) {
				BaseController.exceptionLogging(e);
			}
		}
	}

}
