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


public class InspectionReportHeaderFooterPageEvent extends PdfPageEventHelper {
	
	protected Logger logger = LogManager.getLogger(this.getClass());
	
	private PdfTemplate t;
	private Image total;
	private String rptNo;
	private String title;
	private String operation;
	private Map<String,String> userCompanyInfo;
	
	
	public InspectionReportHeaderFooterPageEvent(String rptNo, String title, String operation, Map<String,String> userCompanyInfo) {
		super();
		this.rptNo = rptNo;
		this.title = title;
		this.operation = operation;
		this.userCompanyInfo = userCompanyInfo;
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
		PdfPTable header = new PdfPTable(3);
		try {
			// set defaults
			header.setWidths(new int[] {5, 10, 3});
			final float totalWidth = document.getPageSize().getWidth() - (document.leftMargin() + document.rightMargin());
			header.setTotalWidth(totalWidth);
			header.setLockedWidth(true);
			header.getDefaultCell().setFixedHeight(40);
			header.getDefaultCell().setBorder(Rectangle.BOTTOM);
			header.getDefaultCell().setBorderColor(BaseColor.BLACK);

			// add text
			PdfPCell text = new PdfPCell();
			text.setPaddingBottom(15);
			text.setPaddingLeft(10);
			text.setBorder(Rectangle.BOTTOM);
			text.setBorderColor(BaseColor.BLACK);
			Paragraph p = new Paragraph(new Phrase("Report No: "+this.rptNo, new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL)) );
			//p.setAlignment(Element.ALIGN_RIGHT);
			Paragraph p2 = new Paragraph(new Phrase("Issued by: "+this.operation, new Font(Font.FontFamily.HELVETICA, 8)));
			//p2.setAlignment(Element.ALIGN_RIGHT);
			text.addElement(p);
			text.addElement(p2);
			header.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			header.addCell(text);
			
			PdfPCell textCenter = new PdfPCell();
			textCenter.setPaddingBottom(15);
			textCenter.setPaddingLeft(10);
			textCenter.setBorder(Rectangle.BOTTOM);
			textCenter.setBorderColor(BaseColor.BLACK);
			Paragraph p3 = new Paragraph(new Phrase(this.title, new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD)));
			p3.setAlignment(Element.ALIGN_CENTER);
			textCenter.addElement(p3);
			header.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
			header.addCell(textCenter);
			
			PdfPCell textRight = new PdfPCell();
			textRight.setPaddingBottom(15);
			textRight.setPaddingLeft(10);
			textRight.setBorder(Rectangle.BOTTOM);
			textRight.setBorderColor(BaseColor.BLACK);
			Paragraph p4 = new Paragraph(new Phrase("Confidential", new Font(Font.FontFamily.HELVETICA, 10, Font.NORMAL)));
			p4.setAlignment(Element.ALIGN_RIGHT);
			textRight.addElement(p4);
			header.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			header.addCell(textRight);

			// write content
			header.writeSelectedRows(0, -1, document.leftMargin(), (document.getPageSize().getHeight() - 30), writer.getDirectContent());
		} catch (DocumentException e) {
//			e.printStackTrace();
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

			// add image
			//Image logo = Image.getInstance(InspectionReportHeaderFooterPageEvent.class.getResource("/pdf/wind-turbine.jpg"));
			Image logo = Image.getInstance(userCompanyInfo.get("FLE_PATH"));
			logo.setWidthPercentage(10);
			footer.addCell(logo);
			
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
		} catch (DocumentException | IOException de) {
			throw new ExceptionConverter(de);
		}
	}
	
}
