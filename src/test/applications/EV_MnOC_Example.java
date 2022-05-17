package applications;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import applications.util.ValidationAndConvert;
import personal.aug.convert.annotations.MapKey;
import personal.aug.easy.validation.annotations.ValidateByteArray;
import personal.aug.easy.validation.annotations.ValidateDate;
import personal.aug.easy.validation.annotations.ValidateNotNull;
import personal.aug.easy.validation.annotations.ValidateNumber;
import personal.aug.easy.validation.annotations.ValidateString;
import personal.aug.easy.validation.supporttypes.Status;

public class EV_MnOC_Example extends ValidationAndConvert {

	@ValidateNotNull
	@MapKey("OBJ_KEY")
	private Object o;
	
	@ValidateNotNull
	@ValidateString(match = "\\d+")
	@MapKey("STR_KEY")
	private String s;
	
	@ValidateDate(pattern = "dd/MM/yyyy", min = "11/11/2001", max = "01/01/2022")
	@MapKey("DATE_KEY")
	private String date;
	
	@ValidateNumber(min = 20, max = 2000)
	@MapKey("NUMBER_KEY")
	private Integer n;
	
	@ValidateByteArray
	@MapKey("BYTE_KEY")
	private byte[] bytes;
	
	public Object getO() {
		return o;
	}

	public void setO(Object o) {
		this.o = o;
	}

	public String getS() {
		return s;
	}

	public void setS(String s) {
		this.s = s;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Integer getN() {
		return n;
	}

	public void setN(Integer n) {
		this.n = n;
	}

	public byte[] getBytes() {
		return bytes;
	}

	public void setBytes(byte[] bytes) {
		this.bytes = bytes;
	}

	@Override
	public String toString() {
		return "EV_MnOC_Example [o=" + o + ", s=" + s + ", date=" + date + ", n=" + n + ", bytes="
				+ Arrays.toString(bytes) + "]";
	}

	public static void main(String[] args) throws Exception {
		EV_MnOC_Example t = new EV_MnOC_Example();
		t.setO("This is an object");
		t.setS("44");
		t.setDate("01/01/2021");
		t.setN(1995);
		t.setBytes("The string".getBytes());
		
		Map<String, Object> result = t.validate();
		/*for (Map.Entry<String, Object> obj : result.entrySet()) {
			System.out.print(obj.getKey() + "=> ");
			
			if (obj.getValue() instanceof Map<?, ?>) {
				Map<String, Object> validateResult = (Map<String, Object>) obj.getValue();
				for (Map.Entry<String, Object> obj2 : validateResult.entrySet()) {
					ProcessResult rs = (ProcessResult) obj2.getValue();
					System.out.println(obj2.getKey() + ": " + rs.getStatusList());
				}
			} else {
				System.out.println(obj.getValue());
			}
		}*/
		
		System.out.println("# Before changing data");
		System.out.println("\t[BEFORE] Instance to string: " + t.toString());
		System.out.println("\t[BEFORE] Valid: " + result.get(Status.ALL_ARE_VALID.getCode()));
		//System.out.println("\t[BEFORE] To Map: " + t.toMap());
		
		System.out.println("# Sleeping for a second...");
		Thread.sleep(1000);
		System.out.println("# Changing data...");
		
		Map<Object, Object> map = new HashMap<Object, Object>();
		map.put("OBJ_KEY", 1945);
		map.put("STR_KEY", "I'm a new string");
		map.put("DATE_KEY", "04/08/1995");
		map.put("NUMBER_KEY", 2001);
		map.put("BYTE_KEY", "So suck!".getBytes());
		//t.fromMap(map);  // changing instance data from the map
		result = t.validate();  // validate again
		
		System.out.println("# After data changes");
		System.out.println("\t[AFTER] Instance to string: " + t.toString());
		System.out.println("\t[AFTER] Valid: " + result.get(Status.ALL_ARE_VALID.getCode()));
		//System.out.println("\t[AFTER] To Map: " + t.toMap());
	}
}
