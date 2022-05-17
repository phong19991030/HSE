package applications.util;

import java.util.Map;

import personal.aug.easy.validation.supporttypes.Status;

/**
 * Make more functions inside the inherit classes, includes: validation, convert from class to Map and opposite
 * 
 * @author HungDM
 *
 */
public abstract class ValidationAndConvert {

	private personal.aug.easy.validation.process.Processing evProcessing;
	//private personal.aug.convert.annotations.Processing mocProcessing;
	
	public ValidationAndConvert() {
		evProcessing = new personal.aug.easy.validation.process.Processing();
		//mocProcessing = new personal.aug.convert.annotations.Processing();
	}
	
	/**
	 * Validate the fields are marked by annotations with "Validate" prefix<br>
	 * Example to get only true/false result, use script follows: <br>
	 * <pre>
	 * Map<String, Object> rs = instance.validate();
	 * bool isValid = rs.get(Status.ALL_ARE_VALID.getCode());
	 * </pre>
	 * <br><br>See more status from here: {@link Status}
	 * @return a detail Map describe detail for validation result
	 * @throws Exception
	 * @author HungDM
	 */
	public Map<String, Object> validate() throws Exception {
		return evProcessing.processing(this.getClass(), this);
	}
	
	/**
	 * Convert from class instance to a Map that keep information from class instance. The Map keep keys default by fields name if that field does not marked by @MapKey annotation, 
	 * else keep keys with value of annotation
	 * 
	 * @return a Map that keep information from class instance
	 * @throws Exception
	 * @author HungDM
	 */
	/*public Map<Object, Object> toMap() throws Exception {
		return mocProcessing.toMap(this.getClass(), this);
	}*/
	
	/**
	 * Convert from a Map instance to a object instance, the Map keys must be the same field name or the same value of @MapKey annotation then the value can be applied, else do nothing
	 * 
	 * @param map is a Map that keep information to convert to class instance
	 * @throws Exception
	 * @author HungDM
	 */
	/*public void fromMap(Map<Object, Object> map) throws Exception {
		mocProcessing.fromMap(map, this);
	}*/
}
