package infrastructure.util;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

/**
 *created by: anhpv
 *description: crop image
 *
 */

public class ImageUtil {
	
	private static final int MAX_SIZE_EGDE = 200;

	
	 public static void resize(String inputImagePath, String outputImagePath, int scaledWidth, int scaledHeight) throws IOException {
	        // reads input image
	        File inputFile = new File(inputImagePath);
	        BufferedImage inputImage = ImageIO.read(inputFile);
	        
	        // creates output image
	        /*
	         * @JK - 보안 취약점 수정
	         */
	        //BufferedImage outputImage = new BufferedImage(scaledWidth, scaledHeight, inputImage.getType());
	        BufferedImage outputImage = null;
	        if(inputImage != null) {
	        	outputImage = new BufferedImage(scaledWidth, scaledHeight, inputImage.getType());
	        }
	 
	        // scales the input image to the output image
	        Graphics2D g2d = outputImage.createGraphics();
	        g2d.drawImage(inputImage, 0, 0, scaledWidth, scaledHeight, null);
	        g2d.dispose();
	 
	        // extracts extension of output file
	        String formatName = outputImagePath.substring(outputImagePath.lastIndexOf(".") + 1);
	 
	        // writes to output file
	        ImageIO.write(outputImage, formatName, new File(outputImagePath));
	    }
	  
	  public static void resize(String inputImagePath, String outputImagePath, double percent) throws IOException {
	        File inputFile = new File(inputImagePath);
	        BufferedImage inputImage = ImageIO.read(inputFile);
	        /*
	         * @JK - 보안 취약점 수정
	         */
//	        int scaledWidth = (int) (inputImage.getWidth() * percent);
//	        int scaledHeight = (int) (inputImage.getHeight() * percent);
	        int scaledWidth = 0;
	        int scaledHeight = 0;
	        if(inputImage != null) {
	        	scaledWidth = (int) (inputImage.getWidth() * percent);
	        	scaledHeight = (int) (inputImage.getHeight() * percent);
	        }
	        resize(inputImagePath, outputImagePath, scaledWidth, scaledHeight);
	    }
	    
	    
	  
	  //return new image with bigger edge equal a param value
	    public static void resizeByMaxEdgeSize(String inputImagePath, String outputImagePath, int MAX_SIZE_EGDE) throws IOException {
	        File inputFile = new File(inputImagePath);
	        BufferedImage inputImage = ImageIO.read(inputFile);
	        /*
	         * @JK - 보안 취약점 수정
	         */
//	        int imageWidth = inputImage.getWidth();
//	        int imageHeight = inputImage.getHeight();
//	        int scaledWidth = 0;
//	        int scaledHeight = 0;
//	        if(imageHeight >= imageWidth) {
//	        	if(imageHeight <= MAX_SIZE_EGDE) {
//	        		scaledWidth = imageWidth;
//	        		scaledHeight = imageHeight;
//	        	}else {
//	        		double percent = MAX_SIZE_EGDE*1.0/imageHeight;
//	        		scaledWidth = (int) (inputImage.getWidth() * percent);
//	        		scaledHeight = (int) (inputImage.getHeight() * percent);
//	        	}
//	        }else {
//	        	
//	        	if(imageWidth <= MAX_SIZE_EGDE) {
//	        		scaledWidth = imageWidth;
//	        		scaledHeight = imageHeight;
//	        	}else {
//	        		double percent = MAX_SIZE_EGDE*1.0/imageWidth;
//	        		scaledWidth = (int) (inputImage.getWidth() * percent);
//	        		scaledHeight = (int) (inputImage.getHeight() * percent);
//	        	}
//	        }
	        int imageWidth = 0;
	        int imageHeight = 0;
	        int scaledWidth = 0;
        	int scaledHeight = 0;
	        if(inputImage != null) {
	        	imageWidth = inputImage.getWidth();
	        	imageHeight = inputImage.getHeight();
	        	if(imageHeight >= imageWidth) {
	        		if(imageHeight <= MAX_SIZE_EGDE) {
	        			scaledWidth = imageWidth;
	        			scaledHeight = imageHeight;
	        		}else {
	        			double percent = MAX_SIZE_EGDE*1.0/imageHeight;
	        			scaledWidth = (int) (inputImage.getWidth() * percent);
	        			scaledHeight = (int) (inputImage.getHeight() * percent);
	        		}
	        	}else {
	        		
	        		if(imageWidth <= MAX_SIZE_EGDE) {
	        			scaledWidth = imageWidth;
	        			scaledHeight = imageHeight;
	        		}else {
	        			double percent = MAX_SIZE_EGDE*1.0/imageWidth;
	        			scaledWidth = (int) (inputImage.getWidth() * percent);
	        			scaledHeight = (int) (inputImage.getHeight() * percent);
	        		}
	        	}
	        }

	        resize(inputImagePath, outputImagePath, scaledWidth, scaledHeight);
	    }
	    
	    
	    public static void resizeFromBufferedImageByMaxEdgeSize(BufferedImage inputImage,
	            String outputImagePath) throws IOException {
	    
	        int imageWidth = inputImage.getWidth();
	        int imageHeight = inputImage.getHeight();
	        int scaledWidth = 0;
	        int scaledHeight = 0;
	        if(imageHeight >= imageWidth) {
	        	if(imageHeight <= MAX_SIZE_EGDE) {
	        		scaledWidth = imageWidth;
	        		scaledHeight = imageHeight;
	        	}else {
	        		double percent = MAX_SIZE_EGDE*1.0/imageHeight;
	        		scaledWidth = (int) (inputImage.getWidth() * percent);
	        		scaledHeight = (int) (inputImage.getHeight() * percent);
	        	}
	        }else {
	        	
	        	if(imageWidth <= MAX_SIZE_EGDE) {
	        		scaledWidth = imageWidth;
	        		scaledHeight = imageHeight;
	        	}else {
	        		double percent = MAX_SIZE_EGDE*1.0/imageWidth;
	        		scaledWidth = (int) (inputImage.getWidth() * percent);
	        		scaledHeight = (int) (inputImage.getHeight() * percent);
	        	}
	        }
	        
	        // creates output image
	        BufferedImage outputImage = new BufferedImage(scaledWidth,
	                scaledHeight, inputImage.getType());
	 
	        // scales the input image to the output image
	        Graphics2D g2d = outputImage.createGraphics();
	        g2d.drawImage(inputImage, 0, 0, scaledWidth, scaledHeight, null);
	        g2d.dispose();
	 
	        // extracts extension of output file
	        String formatName = outputImagePath.substring(outputImagePath
	                .lastIndexOf(".") + 1);
	 
	        // writes to output file
	        ImageIO.write(outputImage, formatName, new File(outputImagePath));
	    }
	
	public static BufferedImage cropImageToSquare(BufferedImage image) {

		int width = image.getWidth();
		int height = image.getHeight();

		if (width == height) {
			return image;
		} else if (width > height) {
			int pointX = (width - height) / 2;
			return cropImage(image, pointX, 0, height, height);
		} else {
			int pointY = (height - width) / 2;
			return cropImage(image, 0, pointY, width, width);
		}
	}
	

	private static BufferedImage cropImage(BufferedImage src, int x, int y, int width, int height) {
		BufferedImage dest = src.getSubimage(x, y, width, height);
		return dest;
	}
}
