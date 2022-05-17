(function($) {
	var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	rselectTextarea = /^(?:select|textarea)/i;
	$.fn.serialize = function(){
		$(this).expressionEngine('detach');
		var result = jQuery.param( $(this).serializeArray() )
		$(this).expressionEngine('attach');
		return result ;
	}
	$.fn.serializeArray = function(){
		
		$(this).expressionEngine('detach')
		var result =  this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			
			
			var val = jQuery( this ).val();
			return val == null ?
						null :
						jQuery.isArray( val ) ?
							jQuery.map( val, function( val, i ){
								return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
							}) :
							{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					
		}).get();
		$(this).expressionEngine('attach');
		return result;
	};
	
	$.fn.serializeArray2 = function(filtered){
		
		$(this).expressionEngine('detach')
		var result =  this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) || 
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			
			var val = jQuery( this ).val();
			if(jQuery( this ).closest(filtered).length == 0){
			 
			return val == null ?
						null :
						jQuery.isArray( val ) ?
							jQuery.map( val, function( val, i ){
								return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
							}) :
							{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			}

					
		}).get();
		$(this).expressionEngine('attach');
		return result;
	};
	
	
	$.fn.serializeObject = function(){
		
		$(this).expressionEngine('detach')
		var result =  this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			
			
			var val = jQuery( this ).val();
			return val == null ?
						null :
						jQuery.isArray( val ) ?
							jQuery.map( val, function( val, i ){
								return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
							}) :
							{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					
		}).get();
		$(this).expressionEngine('attach');
		return result;
	};
	
	 $.fn.datas = function(data){
		 if(data != null ){
			 if($(this).filter('input[type="text"],select,input[type="hidden"]').length> 0 ){
					return $(this).val(data) 
				 }else if($(this).find('input[type="text"],input[type="hidden"]').length> 0){
					 return $(this).find('input[type="text"],input[type="hidden"]').val(data) 
				 }else if($(this).find('select').length> 0){
					 return $(this).find('select').val(data)  
				 }else{
					 return $(this).text(data)
				 }
		 }else{
//			 if($(this).filter('input[type="text"],select,input[type="hidden"]').length> 0 ){
//				return $(this).val('');
//			 }else if($(this).find('input[type="text"],input[type="hidden"]').length> 0){
//				 return $(this).find('input[type="text"],input[type="hidden"]').val('');
//			 }else if($(this).find('select').length> 0){
//				 return $(this).find('select').find('option:selected').prop('selected',false)  
//			 }else{
//				 return $(this).text('');
//			 }			 
			 
			 if($(this).filter('input,select').length> 0 ){
				return $(this).val().trim() 
			 }else{
				 return $(this).text().trim()
			 }
		 }
	 }; 
	 
	 $.fn.showHideDropdownOptions = function( ) { 
		 
//		 $(this).find('option:not(:selected)').remove()
//		 
		 if($(this).hasClass('readonly')){
			 $(this).find('option:not(:selected)').prop('disabled',true);
			 $(this).find('option:not(:selected)').hide()
			 $(this).find('option:selected').prop('disabled',false);
			 $(this).find('option:selected').show();
		 }else{
			 $(this).find('option').prop('disabled',false); 
			 $(this).find('option').show();
		 }
//		 $(this).find('option:not(:selected)').each(function(){
//			 return $(this).parent('span').length === 0 ? this : null;
//		 }).wrap('<span>').hide(); 
//		  
//		 
//		 $(this).find('option:selected').each(function(){
//			 if($(this).parent('span').length === 0){
//				 $(this).show()
//			 } else{
//				 $(this).unwrap().show()
//			 }
//		 }) 
		 

	 }
	 $.fn.filterByData = function(prop, val) {
		  return this.filter(
		    function() { return $(this).data(prop)==val; }
		  );
		}
	 
})(jQuery);
