package module.sys;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import infrastructure.inheritance.dao.AbstractDAO;
import infrastructure.util.ParameterUtil;

/**
 *  
 * @ Create date  : Sep 11, 2019 
 * @ Author     : anhpv
 * @ Description :
 * @ Status: TO-DO, DEBUG, TEST, COMPLETE  
 */
@Component("Sys_0302DAOImpl")
public class Sys_0302DAOImpl extends AbstractDAO {

	public Sys_0302DAOImpl() 
	{
		super.namespace = "sys.sys0302";
	}

	public List getTurbine(Map parameter) throws Exception {
		return list("getTurbineByID", parameter);
	}
	public Object get1TurbineByID(Map parameter) throws Exception {
		return object("get1TurbineByID", parameter);
	}


	public void insertMainPart(Map turbine) throws Exception {
		
		//blade 1
		turbine.put("PART_CD", "BLADE");
		turbine.put("PART_NM", "BLDE_CD1");
		turbine.put("SERIAL_NUMBER", turbine.get("BLDE_CD1"));
		insert("insertMainPart", turbine);

		turbine.put("PART_PROP_ID", "BLADE_COLOR");
		turbine.put("PROP_VALUE", turbine.get("BLDE_CLOR"));
		insert("insertPartDetail", turbine);
		turbine.put("PART_PROP_ID", "BLADE_TYPE");
		turbine.put("PROP_VALUE", turbine.get("BLDE_TP"));
		insert("insertPartDetail", turbine);
		turbine.put("PART_PROP_ID", "BLADE_LENGTH");
		turbine.put("PROP_VALUE", turbine.get("BLDE_LGTH"));
		insert("insertPartDetail", turbine);
		
		//blade 2

		turbine.put("PART_NM", "BLDE_CD2");
		turbine.put("SERIAL_NUMBER", turbine.get("BLDE_CD2"));
		insert("insertMainPart", turbine);

		
		turbine.put("PART_PROP_ID", "BLADE_COLOR");
		turbine.put("PROP_VALUE", turbine.get("BLDE_CLOR"));
		insert("insertPartDetail", turbine);
		turbine.put("PART_PROP_ID", "BLADE_TYPE");
		turbine.put("PROP_VALUE", turbine.get("BLDE_TP"));
		insert("insertPartDetail", turbine);
		turbine.put("PART_PROP_ID", "BLADE_LENGTH");
		turbine.put("PROP_VALUE", turbine.get("BLDE_LGTH"));
		insert("insertPartDetail", turbine);
		
		//blade 3

		turbine.put("PART_NM", "BLDE_CD3");
		turbine.put("SERIAL_NUMBER", turbine.get("BLDE_CD3"));
		insert("insertMainPart", turbine);

		
		turbine.put("PART_PROP_ID", "BLADE_COLOR");
		turbine.put("PROP_VALUE", turbine.get("BLDE_CLOR"));
		insert("insertPartDetail", turbine);
		turbine.put("PART_PROP_ID", "BLADE_TYPE");
		turbine.put("PROP_VALUE", turbine.get("BLDE_TP"));
		insert("insertPartDetail", turbine);
		turbine.put("PART_PROP_ID", "BLADE_LENGTH");
		turbine.put("PROP_VALUE", turbine.get("BLDE_LGTH"));
		insert("insertPartDetail", turbine);
		
		//tower
		turbine.put("PART_CD", "TOWER");
		turbine.put("SERIAL_NUMBER", "TOWER1");
		insert("insertMainPart", turbine);

		
		turbine.put("PART_PROP_ID", "TOWER_HEIGHT");
		turbine.put("PROP_VALUE", turbine.get("TOWR_HGHT"));
		insert("insertPartDetail", turbine);
		
		//rotor
		turbine.put("PART_CD", "ROTOR");
		turbine.put("SERIAL_NUMBER", "ROTOR_D1");
		insert("insertMainPart", turbine);

		
		turbine.put("PART_PROP_ID", "ROTOR");
		turbine.put("PROP_VALUE", turbine.get("ROTOR_D"));
		insert("insertPartDetail", turbine);

	}



	public void updateMainPart(Map turbine) throws Exception {
						
				//blade 1
				turbine.put("MAIN_PART_ID", turbine.get("MAIN_PART_1"));
				turbine.put("SERIAL_NUMBER", turbine.get("BLDE_CD1"));
				update("updateMainPart", turbine);
				
				
				turbine.put("PART_PROP_ID", "BLADE_COLOR");
				turbine.put("PROP_VALUE", turbine.get("BLDE_CLOR"));
				update("updatePartDetail", turbine);
				turbine.put("PART_PROP_ID", "BLADE_TYPE");
				turbine.put("PROP_VALUE", turbine.get("BLDE_TP"));
				update("updatePartDetail", turbine);
				turbine.put("PART_PROP_ID", "BLADE_LENGTH");
				turbine.put("PROP_VALUE", turbine.get("BLDE_LGTH"));
				update("updatePartDetail", turbine);

				//blade 2
				
				turbine.put("MAIN_PART_ID", turbine.get("MAIN_PART_2"));
				turbine.put("SERIAL_NUMBER", turbine.get("BLDE_CD2"));
				update("updateMainPart", turbine);

				turbine.put("PART_PROP_ID", "BLADE_COLOR");
				turbine.put("PROP_VALUE", turbine.get("BLDE_CLOR"));
				update("updatePartDetail", turbine);
				turbine.put("PART_PROP_ID", "BLADE_TYPE");
				turbine.put("PROP_VALUE", turbine.get("BLDE_TP"));
				update("updatePartDetail", turbine);
				turbine.put("PART_PROP_ID", "BLADE_LENGTH");
				turbine.put("PROP_VALUE", turbine.get("BLDE_LGTH"));
				update("updatePartDetail", turbine);

				//blade 3

				turbine.put("MAIN_PART_ID", turbine.get("MAIN_PART_3"));
				turbine.put("SERIAL_NUMBER", turbine.get("BLDE_CD3"));
				update("updateMainPart", turbine);

				turbine.put("PART_PROP_ID", "BLADE_COLOR");
				turbine.put("PROP_VALUE", turbine.get("BLDE_CLOR"));
				update("updatePartDetail", turbine);
				turbine.put("PART_PROP_ID", "BLADE_TYPE");
				turbine.put("PROP_VALUE", turbine.get("BLDE_TP"));
				update("updatePartDetail", turbine);
				turbine.put("PART_PROP_ID", "BLADE_LENGTH");
				turbine.put("PROP_VALUE", turbine.get("BLDE_LGTH"));
				update("updatePartDetail", turbine);

				//tower
				turbine.put("MAIN_PART_ID", turbine.get("MAIN_PART_TOWER"));
				
				turbine.put("PART_PROP_ID", "TOWER_HEIGHT");
				turbine.put("PROP_VALUE", turbine.get("TOWR_HGHT"));
				if(("").equals(turbine.get("MAIN_PART_TOWER"))) {
					turbine.put("PART_CD", "TOWER");
					turbine.put("SERIAL_NUMBER", "TOWER1");
					insert("insertMainPart", turbine);

					
					turbine.put("PART_PROP_ID", "TOWER_HEIGHT");
					turbine.put("PROP_VALUE", turbine.get("TOWR_HGHT"));
					insert("insertPartDetail", turbine);
				}else {
					update("updatePartDetail", turbine);
				}
									
				//rotor
				turbine.put("MAIN_PART_ID", turbine.get("MAIN_PART_ROTOR"));
				
				turbine.put("PART_PROP_ID", "ROTOR");
				turbine.put("PROP_VALUE", turbine.get("ROTOR_D"));
				if(("").equals(turbine.get("MAIN_PART_ROTOR"))) {
					turbine.put("PART_CD", "ROTOR");
					turbine.put("SERIAL_NUMBER", "ROTOR_D1");
					insert("insertMainPart", turbine);

					
					turbine.put("PART_PROP_ID", "ROTOR");
					turbine.put("PROP_VALUE", turbine.get("ROTOR_D"));
					insert("insertPartDetail", turbine);
				}else {
					update("updatePartDetail", turbine);
				}
					
	}

}
