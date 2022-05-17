package module.pdf;

import java.io.IOException;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.ExceptionConverter;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfName;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfTemplate;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * @author HungDM
 *
 */
public class PeriodicInspectionHeaderFooterPageEvent extends PdfPageEventHelper {
	
	private Logger logger = LogManager.getLogger(this.getClass());
	
	private PdfTemplate t;
	private Image total;
	// FLE_PATH: 회사 로고 파일 경로
	// COMPANY_NM: 회사명
	// RPT_TYPE: 보고서 타입, 0:PLAN, 1: INSPECTION, 2: BLADE_INSPECTION, 3: CHECKLIST
	private Map<String, String> companyInfo; 
	private String[] header_title = {"Wind Turbine Plan Report", "Wind Turbine Inspection", "Wind Turbine Blade Inspection", "Wind Turbine Check List"};
	
	public PeriodicInspectionHeaderFooterPageEvent(Map<String, String> companyInfo) {
		this.companyInfo = companyInfo;
	}

	@Override
	public void onOpenDocument(PdfWriter writer, Document document) {
		t = writer.getDirectContent().createTemplate(30, 16);
		try {
			total = Image.getInstance(t);
			total.setRole(PdfName.ARTIFACT);
		} catch (DocumentException de) {
			throw new ExceptionConverter(de);
		}
	}

	@Override
	public void onCloseDocument(PdfWriter writer, Document document) {
		int totalLength = String.valueOf(writer.getPageNumber()).length();
		int totalWidth = totalLength * 5;
		ColumnText.showTextAligned(t, Element.ALIGN_RIGHT,
				new Phrase(String.valueOf(writer.getPageNumber()), new Font(Font.FontFamily.HELVETICA, 8)), totalWidth, 0, 0);
	}

	@Override
	public void onEndPage(PdfWriter writer, Document document) {
		addHeader(writer, document);
		addFooter(writer, document);
		// super.onEndPage(writer, document);
	}

	private void addHeader(PdfWriter writer, Document document) {
		PdfPTable header = new PdfPTable(2);
		try {
			// set defaults
			header.setWidths(new int[] { 3, 8 });
			final float totalWidth = document.getPageSize().getWidth() - (document.leftMargin() + document.rightMargin());
			header.setTotalWidth(totalWidth);
			header.setLockedWidth(true);
			header.getDefaultCell().setFixedHeight(40);
			header.getDefaultCell().setBorder(Rectangle.BOTTOM);
			header.getDefaultCell().setBorderColor(BaseColor.BLACK);

			// add image
			//Image logo = Image.getInstance(PeriodicInspectionHeaderFooterPageEvent.class.getResource("/pdf/wind-turbine.jpg"));
			Image logo = Image.getInstance(companyInfo.get("FLE_PATH"));
			logo.setWidthPercentage(10);
			header.addCell(logo);
			
			int num = Integer.parseInt(companyInfo.get("RPT_TYPE") != null ? companyInfo.get("RPT_TYPE"): "0");
			
			// add text
			PdfPCell text = new PdfPCell();
			text.setPaddingBottom(15);
			text.setPaddingLeft(10);
			text.setBorder(Rectangle.BOTTOM);
			text.setBorderColor(BaseColor.BLACK);
			Paragraph p = new Paragraph(new Phrase(header_title[num], new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD)));
			p.setAlignment(Element.ALIGN_RIGHT);
			Paragraph p2 = new Paragraph(new Phrase("Conveyed Confidentially", new Font(Font.FontFamily.HELVETICA, 8)));
			p2.setAlignment(Element.ALIGN_RIGHT);
			text.addElement(p);
			text.addElement(p2);
			header.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			header.addCell(text);

			// write content
			header.writeSelectedRows(0, -1, document.leftMargin(), (document.getPageSize().getHeight() - 30), writer.getDirectContent());
		} catch (DocumentException | IOException e) {
			//e.printStackTrace();
			logger.info(e.getStackTrace()[0].getClassName() + "." + e.getStackTrace()[0].getMethodName() + " => " + e.getClass().getName() + "\n" + " [ Cause ] : " + e.getMessage());
		}
	}

	private void addFooter(PdfWriter writer, Document document) {
		PdfPTable footer = new PdfPTable(3);
		try {
			// set defaults
			footer.setWidths(new int[] { 24, 2, 1 });
			final float totalWidth = document.getPageSize().getWidth() - (document.leftMargin() + document.rightMargin());
			footer.setTotalWidth(totalWidth);
			footer.setLockedWidth(true);
			footer.getDefaultCell().setFixedHeight(40);
			footer.getDefaultCell().setBorder(Rectangle.TOP);
			footer.getDefaultCell().setBorderColor(BaseColor.BLACK);

			// add copyright
			footer.getDefaultCell().setPaddingTop(8);
			PdfPCell copyright = new PdfPCell();
			copyright.setBorder(Rectangle.TOP);
			copyright.setBorderColor(BaseColor.BLACK);
			Paragraph p = new Paragraph(new Phrase(companyInfo.get("COMPANY_NM"), new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD)));
			Paragraph p2 = new Paragraph(new Phrase("\u00A9 All Rights Reserved 2016", new Font(Font.FontFamily.HELVETICA, 8)));
			copyright.addElement(p);
			copyright.addElement(p2);
			footer.addCell(copyright);

			// add current page count
			footer.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			footer.addCell(new Phrase(String.format("%d /", writer.getPageNumber()), new Font(Font.FontFamily.HELVETICA, 8)));

			// add placeholder for total page count
			PdfPCell totalPageCount = new PdfPCell(total);
			totalPageCount.setBorder(Rectangle.TOP);
			totalPageCount.setBorderColor(BaseColor.BLACK);
			footer.addCell(totalPageCount);

			// write page
			PdfContentByte canvas = writer.getDirectContent();
			canvas.beginMarkedContentSequence(PdfName.ARTIFACT);
			footer.writeSelectedRows(0, -1, document.leftMargin(), document.bottomMargin() - 10, canvas);
			canvas.endMarkedContentSequence();
		} catch (DocumentException de) {
			throw new ExceptionConverter(de);
		}
	}
}
