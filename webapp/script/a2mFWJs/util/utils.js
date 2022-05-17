var a2mjslib = function () {
    // Define module
    var utils = {};
   
    
    utils.getCidfromUrl = function (destObj) {
        var targetObj = destObj ;
        if(destObj){
        destObj = targetObj.match(/[a-zA-Z]{1,}\_[0-9]{4,}[\/?[0-9]{1,}]{0,}/);
	        if(destObj){
	        	destObj = (destObj.length==1 ? destObj[0]:'')
	        	destObj = destObj.replace(/\//g,'');
	        }else{
	        	destObj = targetObj.replace(/[\/\.]/g,'');
	        }
        
        }
        return destObj;
    };
    
    // Expose
    return utils;
}(); 

var initCountMails = function () {
	$.ajax({
     url : CTX + '/asm/asm_0106/countEmails.ajax',
     type : "post",
     cache : false,
     success : function (data, textStatus, jqXHR) {
    	 if (data != undefined && data != -1) {
    		 $('#a2mMailCount').html(data);        		
     	}
     },
     complete: function () {
     }
	});
};


Date.prototype.yyyy_mm_dd = function() {
	  var mm = this.getMonth() + 1; // getMonth() is zero-based
	  var dd = this.getDate();

	  return [this.getFullYear(),
	          (mm>9 ? '' : '0') + mm,
	          (dd>9 ? '' : '0') + dd
	         ].join('-');
	};
