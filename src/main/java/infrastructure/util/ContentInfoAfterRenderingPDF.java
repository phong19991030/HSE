package infrastructure.util;

public class ContentInfoAfterRenderingPDF {
	int height;
	int numberOfPage;
	
	public int getHeight() {
		return height;
	}
	
	public int getNumberOfPage() {
		return numberOfPage;
	}

	public ContentInfoAfterRenderingPDF(int height, int numberOfPage) {
		this.height = height;
		this.numberOfPage = numberOfPage;
	}
}
