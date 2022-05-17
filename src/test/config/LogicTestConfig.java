package config;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({
							"classpath*:config/spring/context-mongo.xml",
							"classpath*:config/spring/context-common.xml",
							"classpath*:config/spring/context-datasource.xml",
							"classpath*:config/spring/context-transction.xml",
							"classpath*:config/spring/context-mapper.xml",
					  })
public class LogicTestConfig {

}
