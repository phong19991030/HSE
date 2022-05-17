package config;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({
							"classpath:config/spring/context-mongo.xml",
							"classpath:config/spring/context-common.xml",
							"classpath:config/spring/context-datasource.xml",
							"classpath:config/spring/context-transction.xml",
							"classpath:/WEB-INF/config/framework/springmvc/dispatcher-servlet.xml"
					  })
@WebAppConfiguration
public class WebTestConfig {
	
	@Autowired
	private WebApplicationContext context;
	protected MockMvc mockMvc;
	
	/*
	 *  @BeforeClass (static > 사용빈도가 떨어짐)
	 * 		
	 * 		@Before - @Test - @After
	 * 		@Before - @Test - @After
	 * 		..............
	 * 
	 *  @AfterClass (static > 사용빈도가 떨어짐)
	 */
	
	@Before
	public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
	}
		
}
