/**
 * 
 */

var privateRSAKey;
var rsa;

function createRSAKey(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd = '0'+dd
	} 

	if(mm<10) {
	    mm = '0'+mm
	} 

	today = mm + dd +yyyy +"A2MVN";
//	console.log(today);
	var Bits = 512;
	 rsa = new JSEncrypt()
	rsa = new JSEncrypt({
	    default_key_size: 2048,
	    default_public_exponent: "03"
	});
	rsa.getKey();
	var privateRSAKey = rsa.getPrivateKeyB64();
//	var publicRSAKey = rsa.getPublicKeyB64(); 
	var modulus = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(rsa.getKey().n);
//	console.log(modulus);

	
//	console.log(privateRSAKey);
//	privateRSAKey = cryptico.generateRSAKey(today, Bits);
//	console.log("private key");
//	console.log(publicRSAKey);
//
//	var PublicKeyString = cryptico.publicKeyString(privateRSAKey);
//	
//   var string = rsa.encrypt("15451627022018userUid0315197211169230000");
//	console.log("string sau khi ma hoa");
//	console.log(string);	
//	console.log("string sau khi giai");
//	console.log(rsa.decrypt(string));

	wschat.send.SECURITY_SEND_KEY(modulus);    
	
	
	
	
//	$.ajax({
//	    type : "POST",
//	    url : "/main/getPublicKey",
//	    data : {key:PublicKeyString},
//	    timeout : 100000,
//	    success : function(key) {
//	        console.log("SUCCESS: ", key);
//	        display(key);
//	        alert(response);   
//	    },
//	    error : function(e) {
//	        console.log("ERROR: ", e);
//	    },
//	    done : function(e) {
//	        console.log("DONE");
//	    }
//	});
	
	
}

//$(document).ready(createRSAKey);
