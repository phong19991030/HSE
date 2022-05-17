package infrastructure.view;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.AbstractView;

@Deprecated
public class EmptyView extends AbstractView {
 
	public EmptyView(){}
 
	@Override
	protected void renderMergedOutputModel(Map parameter, HttpServletRequest request, HttpServletResponse response) 
			throws Exception {
		//아무것도 리턴하지 않는 빈뷰
	}

}