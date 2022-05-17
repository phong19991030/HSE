<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">

// insert 후처리

// var GROUP_COUNT = '${DATA.GROUP_COUNT}';

var checkDuplName = 'unset';
var checkDuplGroup = 'unset';

var listGroup = ${DATA.LIST_GROUP};
$(document).ready(function() {
	
	$('#FARM_NM').change(function(){
		doubleCheck();
	});
	
	$('input[name="farm.COMPANY_NM"]').change(function(){
		$(this).resetWarning();
	})

	checkDuplicateGroup();
// 	console.log(listGroup);
	if(listGroup.length >0){
		var str = '';
		for(var i = 0; i< listGroup.length; i++){
// 			if(listGroup[i].GROUP_NM == 'NO GROUP'){
// 				break;
// 			}
			if(i == listGroup.length-1){
				str += '<div class="input-group-wrapper">'
	                 +' <div class="input-group">'
	                 +' <label for="Group'+(i+1)+'" class="sr-only">Group</label>'
	                 +' <input type="text" class="group_nm"  name="group.'+(i+1)+'.name" value="'+listGroup[i].GROUP_NM+'"><input class="group_id"  name="group.'+(i+1)+'.id" hidden value="'+listGroup[i].GROUP_ID+'">'
                +' </div>'
                +'  <div class="add-delete-btn-wrap">'
                +'    <a  class="delete-btn">'
                +'     <span class="sr-only">delete</span>'
                +'     <i class="xi-minus-square"></i>'
                +'  </a>'
                +' <a  class="add-btn">'
                +'   <span class="sr-only">add</span>'
                  +'   <i class="xi-plus-square"></i>'
                  +'  </a>'
                  +'  </div>'
                  +'  </div>';

			}else{
				str += '<div class="input-group-wrapper">'
	                 +' <div class="input-group">'
	                 +' <label for="Group'+(i+1)+'" class="sr-only">Group</label>'
	                 +' <input type="text" class="group_nm"  name="group.'+(i+1)+'.name" value="'+listGroup[i].GROUP_NM+'"><input class="group_id"  name="group.'+(i+1)+'.id" hidden value="'+listGroup[i].GROUP_ID+'">'
               +' </div>'
               +'  <div class="add-delete-btn-wrap">'
               +'    <a  class="delete-btn">'
               +'     <span class="sr-only">delete</span>'
               +'     <i class="xi-minus-square"></i>'
               +'  </a>'
//                +' <a  class="add-btn">'
//                +'   <span class="sr-only">add</span>'
//                  +'   <i class="xi-plus-square"></i>'
//                  +'  </a>'
                 +'  </div>'
                 +'  </div>';			}
		}
		seqGroup = listGroup.length;
		$('#group_area').empty().append(str);
	}
	
});



var seqGroup = 1;
var crud = '${DATA.CRUD}';
var defLat =  36.36;
var defLog =  127.38;
var lat0 = '${DATA.LATITUDE}';
var log0 = '${DATA.LONGTUD}';
var currentPart = 1;
var map;
var marker;
var coordInfoWindow;



	        function initMap() {
	        	console.log(lat0 + ' - ' + log0);
	        	if(!lat0 ){
	        		lat0 = defLat;	
	        	}else{
	        		lat0 = parseFloat(lat0);
	        	}
	        	
	        	if(!log0){
	        		log0 = defLog;
	        	}else{
	        		log0 = parseFloat(log0);
	        	}
	        	
	          var centerMap = new google.maps.LatLng(lat0, log0);
	
	          map = new google.maps.Map(document.getElementById('map'), {
	            center: centerMap,
	            zoom: 12.5
	          });
	
	          var image = '/img/sub/wf_marker.png';
	          marker = new google.maps.Marker({
	            position: centerMap,
	            map: map,
	            icon: image
	          });
	
	
	          coordInfoWindow = new google.maps.InfoWindow();
	          coordInfoWindow.setContent(createInfoWindowContent(centerMap, map.getZoom()));
	          coordInfoWindow.setPosition(centerMap);
	          coordInfoWindow.open(map);
	
	          map.addListener('zoom_changed', function() {
	            coordInfoWindow.setContent(createInfoWindowContent(centerMap, map.getZoom()));
	            coordInfoWindow.open(map);
	          });
	          
	          
	          map.addListener('click', function(mapsMouseEvent) {
	              // Close the current InfoWindow.
	            /*   infoWindow.close();

	              // Create a new InfoWindow.
	              infoWindow = new google.maps.InfoWindow({position: mapsMouseEvent.latLng});
	              infoWindow.setContent(mapsMouseEvent.latLng.toString());
	              infoWindow.open(map); */
	              console.log(mapsMouseEvent.latLng);
// 	              var _lat = Math.round(mapsMouseEvent.latLng.lat() * 100) / 100;
// 	              var _log = Math.round(mapsMouseEvent.latLng.lng() * 100) / 100;
	              var _lat = mapsMouseEvent.latLng.lat();
	              var _log = mapsMouseEvent.latLng.lng();
	              
	              $('input[name="farm.LONGTUD"').val(_log);
				  $('input[name="farm.LATITUDE"]').val(_lat);
			      if(marker){
			    	  marker.setMap(null);
			      }
			      
			      var centerMap = new google.maps.LatLng(_lat, _log);
			  	
			      moveToLocation(_lat, _log);
		
		          var image = '/img/sub/wf_marker.png';
		          marker = new google.maps.Marker({
		            position: centerMap,
		            map: map,
		            icon: image
		          });
				
		          closeInfoWindow();
		
		          coordInfoWindow = new google.maps.InfoWindow();
		          coordInfoWindow.setContent(createInfoWindowContent(centerMap, map.getZoom()));
		          coordInfoWindow.setPosition(centerMap);
		          coordInfoWindow.open(map);
		
		          map.addListener('zoom_changed', function() {
		            coordInfoWindow.setContent(createInfoWindowContent(centerMap, map.getZoom()));
		            coordInfoWindow.open(map);
		          });
	            });
				
	   
	          /* Popup = createPopupClass();
	          popup = new Popup(
	              new google.maps.LatLng(-33.866, 151.196),
	              document.getElementById('content'));
	          popup.setMap(map); */
	        }
	
	        var TILE_SIZE = 256;
	
	        function createInfoWindowContent(latLng, zoom) {
	          var scale = 1 << zoom;
	
	          var worldCoordinate = project(latLng);
	
	          return [
	            latLng
	          ].join('<br>');
	        }
	
	        // The mapping between latitude, longitude and pixels is defined by the web
	        // mercator projection.
	        function project(latLng) {
	          var siny = Math.sin(latLng.lat() * Math.PI / 180);
	
	          // Truncating to 0.9999 effectively limits latitude to 89.189. This is
	          // about a third of a tile past the edge of the world tile.
	          siny = Math.min(Math.max(siny, -0.9999), 0.9999);
	
	          return new google.maps.Point(
	            TILE_SIZE * (0.5 + latLng.lng() / 360),
	            TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
	        }
	        
	        
	        
	        function closeInfoWindow() {
	            if (coordInfoWindow !== null) {
	                google.maps.event.clearInstanceListeners(coordInfoWindow);  // just in case handlers continue to stick around
	                coordInfoWindow.close();
	                coordInfoWindow = null;
	            }
	        }
	        
	$(document).ready(function(){
	// 	$('div[class="selectItem"][part="1"] input').prop('checked',true);
		if(crud == 'U'){
			defLat = parseFloat(lat0);
			defLog = parseFloat(log0);
			var maxGroup = ${DATA.LIST_GROUP};
			if(maxGroup.length==0){
				seqGroup = 1;
			}else{
				seqGroup = maxGroup.length;
			}
			
		}
		
		
		
		
		$('.input-group-wrapper a.add-btn').unbind('click').click(function(){
			addRowGroup();
		});
		$('.input-group-wrapper a.delete-btn').unbind('click').click(function(){
			removeRowGroup(this);
		});
		 $('input[name="farm.LONGTUD"').keyup(function(e){
			if(e.which == 8 || (e.which >= 37 && e.which <= 40) || (e.which >= 48 && e.which <= 57) || e.which == 189 || e.which == 190 ){
			
			}else{
				this.value = this.value.slice(0, -1);
			}
		});
		$('input[name="farm.LATITUDE"').keyup(function(e){
			if(e.which == 8 || (e.which >= 37 && e.which <= 40) || (e.which >= 48 && e.which <= 57) || e.which == 189 || e.which == 190 ){
			}else{
				this.value = this.value.slice(0, -1);
			}
		}); 
		
		$('input.location').change(function(){
			var log = $('input[name="farm.LONGTUD"').val();
			var lat = $('input[name="farm.LATITUDE"]').val();
			var check1 = false;
			var check2 = false;
			var msg ="";
	           var regEx = new RegExp("/-?[0-9]{1,3}[.]{1}[0-9]+/", "g");

			if(lat){
				if(lat.match(/^-?[0-9]{1,3}[.]{1}[0-9]+$/)){
				var val = parseFloat(lat);
					if(val >= -90 && val <= 90){
						$('input[name="farm.LATITUDE"]').available()
						check1 = true;
					}else{
						$('input[name="farm.LATITUDE"]').inputWarning('"Latitude" is invalid.');
						msg+='Latitude value is from -90.00 to 90.00\n'
					}
				}else{
					$('input[name="farm.LATITUDE"]').inputWarning('"Latitude" is invalid.')
					msg+='Latitude template is "-X.Y" or "X.Y".   X, Y are integers.\nThis field\'s value is from -90.00 to 90.00\n';
				}
			}
			if(log){
				if(log.match(/^-?[0-9]{1,3}[.]{1}[0-9]+$/)){
				var val = parseFloat(log);
					if(val >= -180 && val <= 180){
						$('input[name="farm.LONGTUD"]').available()	
						check2 = true;
					}else{
						$('input[name="farm.LONGTUD"]').inputWarning('"Longtitude" is invalid.')
						msg+='Longtitude value is from -180.00 to 180.00\n';
					}
				}else{
					$('input[name="farm.LONGTUD"]').inputWarning('"Longtitude" is invalid.')
					msg+='Longtitude\'s template is "-X.Y" or "X.Y".   X, Y are integers.\nThis field\'s value is from -180.00 to 180.00';
				}
			}
			if(!check1 || !check2){
				if(msg){
					alert(msg);					
				}
				return false;
			}
			console.log(lat + '-' + log + '- ' + typeof log == 'number' +' '+ typeof lat == 'number');
			if($.isNumeric(log) && $.isNumeric(lat)){
			  	
// 			      if(marker){
// 			    	  marker.setMap(null);
// 			      }
// 				var log1 = parseFloat(log);
// 				var lat1 = parseFloat(lat);
// 			      var uluru = {lat: lat1, lng: log1};
// 			      marker = new google.maps.Marker({position: uluru, map: map});
// 			      moveToLocation(lat1, log1);
			      

			      if(marker){
			    	  marker.setMap(null);
			      }
			      
			      var centerMap = new google.maps.LatLng(lat, log);
			  	
			      moveToLocation(lat, log);
		
		          var image = '/img/sub/wf_marker.png';
		          marker = new google.maps.Marker({
		            position: centerMap,
		            map: map,
		            icon: image
		          });
				
		          closeInfoWindow();
		
		          coordInfoWindow = new google.maps.InfoWindow();
		          coordInfoWindow.setContent(createInfoWindowContent(centerMap, map.getZoom()));
		          coordInfoWindow.setPosition(centerMap);
		          coordInfoWindow.open(map);
		
		          map.addListener('zoom_changed', function() {
		            coordInfoWindow.setContent(createInfoWindowContent(centerMap, map.getZoom()));
		            coordInfoWindow.open(map);
		          });
		
			}
		});
	
// 		getCompany();
		

	
	});
	
	function moveToLocation(lat, lng){
		  const center = new google.maps.LatLng(lat, lng);
		  // using global variable:
		  window.map.panTo(center);
		}
	
	function submitWithValidation() {
		
		
		var log = $('input[name="farm.LONGTUD"').val();
		var lat = $('input[name="farm.LATITUDE"]').val();
		var check1 = false;
		var check2 = false;
		var msg ="";
		if(lat){
			if(lat.match(/^-?[0-9]{1,3}[.]{1}[0-9]+$/)){
			var val = parseFloat(lat);
				if(val >= -90 && val <= 90){
					$('input[name="farm.LATITUDE"]').available()
					check1 = true;
				}else{
					$('input[name="farm.LATITUDE"]').inputWarning('"Latitude" is invalid.');
					msg+='Latitude value is from -90.00 to 90.00\n'
				}
			}else{
				$('input[name="farm.LATITUDE"]').inputWarning('"Latitude" is invalid.')
				msg+='Latitude template is "-X.Y" or "X.Y".   X, Y are integers.\nThis field\'s value is from -90.00 to 90.00\n';
			}
		}
		if(log){
			if(log.match(/^-?[0-9]{1,3}[.]{1}[0-9]+$/)){
			var val = parseFloat(log);
				if(val >= -180 && val <= 180){
					$('input[name="farm.LONGTUD"]').available()	
					check2 = true;
				}else{
					$('input[name="farm.LONGTUD"]').inputWarning('"Longtitude" is invalid.')
					msg+='Longtitude value is from -180.00 to 180.00\n';
				}
			}else{
				$('input[name="farm.LONGTUD"]').inputWarning('"Longtitude" is invalid.')
				msg+='Longtitude\'s template is "-X.Y" or "X.Y".   X, Y are integers.\nThis field\'s value is from -180.00 to 180.00';
			}
		}
		if(!check1 || !check2){
			if(msg) {
				alert(msg);
				return false;
			}
		}
		
		
		
		var check = true;
		$('#farmForm .group_nm').each(function(i, obj){
			var name = $(this).val().toString().toLowerCase();
			if(name == 'no group' || name == 'nogroup' || name == '...'){
				$(this).inputWarning('<spring:message code="msg.canNotUseThisName" />');
				check = false;
			}
		})
		if(!check){
			return false;
		}
		
		if(checkDuplName === false || checkDuplGroup === false){
			return false;
		}
		
		$('#farmForm').submit();

	}
	
	
	function saveCallbackFunc2(form, data){
		if(data == "true"){
			backToList();
		}else{
		}
	} 
	
	
	function getCompany(){
		
		$.ajax({
			url: CTX+'/sys/sys_0301/getCompany.ajax',
			data: {} ,
			success: function (response) {
				console.log(response);
				var str = '';
				$.each( response, function( index, obj ) {
					str += '<option value="'+obj.COMPANY_ID+'">'+obj.COMPANY_NM+'</option>'
					});
				console.log($("#COMPANY_ID").attr('value'));
				 $("#COMPANY_ID").append(str);
				 $("#COMPANY_ID").val($("#COMPANY_ID").attr('temp'));
		},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}
	
	function addRowGroup(){
		seqGroup++;
		$('#group_area').find('a.add-btn').remove();
		$('#group_area').append(
	// 			'<div class="group_tb"><input type="text" class="inp_inside_btn"  name="group.'+seqGroup+'.name" ><input class="group_id"  name="group.'+seqGroup+'.id" hidden><span class="btn_span remove">-</span><span class=" btn_span add">+</span></div>'
				'<div group="'+seqGroup+'" class="input-group-wrapper">'
	            +' <div class="input-group">'
	            +' <label for="Group'+seqGroup+'" class="sr-only">Group</label>'
	            +' <input type="text" class="group_nm"  name="group.'+seqGroup+'.name" value=""><input class="group_id"  name="group.'+seqGroup+'.id" hidden value="">'
	       +' </div>'
	       +'  <div class="add-delete-btn-wrap">'
	       +'    <a  class="delete-btn">'
	       +'     <span class="sr-only">delete</span>'
	       +'     <i class="xi-minus-square"></i>'
	       +'  </a>'
	       +' <a  class="add-btn">'
	       +'   <span class="sr-only">add</span>'
	         +'   <i class="xi-plus-square"></i>'
	         +'  </a>'
	         +'  </div>'
	         +'  </div>'		
		);
		$('.input-group-wrapper[group="'+seqGroup+'"] a.add-btn').unbind('click').click(function(){
			addRowGroup();
		});
		$('.input-group-wrapper[group="'+seqGroup+'"]  a.delete-btn').unbind('click').click(function(){
			removeRowGroup(this);
		});
		checkDuplicateGroup()
	}
	
	async function removeRowGroup(obj){
		console.log('remove');
		var isUsed = true;
		if($(obj).closest('div.input-group-wrapper').find('input.group_id').val()){
			isUsed = await checkGroup($(obj).closest('div.input-group-wrapper').find('input.group_id').val());
			if(isUsed == 'true'){
				alert('<spring:message code='msg.removeGroup.hasChildren' />');
				return false;
			}else{
				if($('#group_area').find('div.input-group-wrapper').length<=1){
					$('#group_area').empty().append('<div group="1" class="input-group-wrapper">'
		            +' <div class="input-group">'
		            +' <label for="Group'+seqGroup+'" class="sr-only">Group</label>'
		            +' <input type="text" class="group_nm" name="group.'+seqGroup+'.name" value=""><input class="group_id"  name="group.1.id" hidden value="">'
		       +' </div>'
		       +'  <div class="add-delete-btn-wrap">'
		       +'    <a  class="delete-btn">'
		       +'     <span class="sr-only">delete</span>'
		       +'     <i class="xi-minus-square"></i>'
		       +'  </a>'
		       +' <a  class="add-btn">'
		       +'   <span class="sr-only">add</span>'
		         +'   <i class="xi-plus-square"></i>'
		         +'  </a>'
		         +'  </div>'
		         +'  </div>'	);
					return false;
				}
			}
		}else{
			if($('#group_area').find('div.input-group-wrapper').length<=1){
				$('#group_area').find('div.input-group-wrapper input.group_id').val('');
				$('#group_area').find('div.input-group-wrapper input.group_nm').val('');
				return false;
			}
		}
		
		$(obj).closest('div.input-group-wrapper').remove();
		$('#group_area').find('a.add-btn').remove();
		$('#group_area').find('div.input-group-wrapper:last-child div.add-delete-btn-wrap').append('<a class="add-btn">   <span class="sr-only">add</span>   <i class="xi-plus-square"></i>  </a>');
		$('div.input-group-wrapper:last-child > div.add-delete-btn-wrap > a.add-btn').unbind('click').click(function(){
			addRowGroup();
		});	
	}
	
	
	function checkDuplicateGroup(){
		$('input[class="group_nm"]').unbind().change(function(){
			var check = true;
			$('input[class="group_nm"]').resetWarning()
// 			var $current = $(this);
// 			if(!$current.val()){
// 				return false;
// 			}
			var listGroupInput =  $('input[class="group_nm"]');
			if(listGroupInput && listGroupInput.length <= 1){
				return false;
			}else{
				listGroupInput.each(function(i, obj ){
					
					listGroupInput.each(function(i2, obj2 ){
						if(i != i2){
							if($(obj).val() && $(obj).val() == $(obj2).val()){
								check = false;
								$(obj).inputWarning('');
								$(obj2).inputWarning('');

							}
						}
					})
										
// 					if($(obj).attr('name') != $current.attr('name')){
// 						if($(obj).val() && $(obj).val() == $current.val()){
// 							check = false
// 						}
// 					}
				})
			}
			if(check){
// 				$current.available();
				checkDuplGroup = true;
			}else{
				alert('Duplicate group name.');
				checkDuplGroup = false;
			}
		});
	}
	
	 function doubleCheck(){
			var farmName = $('#FARM_NM').val().trim();
			var farmNameOld = $('#FARM_NM_OLD').val();
			if(farmName==null||farmName==''){
		    	$('#FARM_NM').resetWarning();
		    	checkDuplName = 'unset';
				return false;
			}else{
				$.ajax({
					  url: CTX+'/sys/sys_0301/checkDoubleName.ajax?FARM_NM='+farmName + '&CRUD='+crud + '&FARM_NM_OLD='+ farmNameOld,
					  type: 'GET',
					  success: function(data) {
						    if(data == "true"){
						    	$('#FARM_NM').available();
						    	checkDuplName = true;
						    }else{
						    	$('#FARM_NM').inputWarning('This farm name already have existed!');
						    	checkDuplName = false;
						    }
					  },
					  error: function( req, status, err ) {
					    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
					  }
					});		
			}
			
		}
	
	async function  checkGroup(id){
		
		return 	$.ajax({
			url: CTX+'/sys/sys_0301/checkGroup.ajax',
	// 		async: false,
			data: {'GROUP_ID': id} ,
			success: function (response) {
				if(response == 'true'){
					return true;
				}else{
					return false;
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
				return false;
			}
		});
		
	}
	function backToList(){
		window.location.reload();
	}
	var msgConfirmDelete = '<spring:message code='message.confirmDelete' />';
	var deleteSuccess = '<spring:message code='message.deletedSuccess' />';
	var deleteFailed = '<spring:message code='message.deletedFailed' />';
	function removeFarm(){

        var message={
        	    'QUESTION' : {'MESSAGE': msgConfirmDelete},
        	    'FAIL':{'MESSAGE':deleteFailed},
        	    'SUCCESS':{'MESSAGE': deleteSuccess}
        	    }


		var id  = $('#selectedFarm').val()	;
        if(!id){
        	return false;
        }

        if(confirm(message.QUESTION.MESSAGE)){

      	   $.ajax({
    	        url:  CTX + "/sys/sys_0301/delete01.ajax",
    	        type: "post",
    	        data:  {'FARM_ID': id} ,
    	        success: function (response) {
     	        	if(response && response.result &&   response.result == 'true'){
						alert(message.SUCCESS.MESSAGE);
						backToList();
					}else{
						if(response.msg)
						alert(response.msg);
					}
    	        },
    	        error: function(jqXHR, textStatus, errorThrown) {
    	           console.log(textStatus, errorThrown);
    	        }
    	    }); 
    	}
    	
    }
	
</script>


<script async defer
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCh3K14xNRxPzr5lD0Y02yHfIpgJnO0SYI&callback=initMap">
	      </script>

<div class="container system-wrap system-wrap1">
	<!-- 발전단지 등록 -->
	
	<form:form action="${formPath}/save01.ajax" id="farmForm"
		data-func="saveAjax" data-callback="saveCallbackFunc2">
		<div class="system-detail-wrap">
			<div class="system-left">
				<!--tit-wrap-->
				<div class="tit-wrap">
					<h2 class="heading3">
					<c:choose>
						<c:when test="${DATA.CRUD eq 'C'}">
							<span class="txt"><spring:message code="button.register"/></span>
						</c:when>
						<c:otherwise>
							<span class="txt"><spring:message code="button.modify"/></span>
						</c:otherwise>
					</c:choose>						
					<!-- <span class="version">V47</span> -->
					</h2>
					<ul class="location">
						<li>SYSTEM</li>
						<li class="bold">WF Management</li>
					</ul>
				</div>
				<!--//tit-wrap-->
				<!-- registration form -->

				<input hidden="true" id="selectedFarm" name="farm.FARM_ID"
					value="${DATA.FARM_ID}" /> <input name="CRUD" hidden
					value="${DATA.CRUD}">
				<div class="registration-form registration-form1">
					<div class="registration-form-lst-wrap">
						<ul class="registration-form-lst">
							<li><span><spring:message code='title.farm.FARM_NM' /><span class="red"> *</span></span>
								<div class="registration-write">
									<div class="input-group">
										<label for="WindFarm" class="sr-only">Wind Farm</label> 
										<input
											type="text" nova-validation="required" name="farm.FARM_NM"
											value="${DATA.FARM_NM}" id="FARM_NM">
										<input hidden
											type="text" 
											value="${DATA.FARM_NM}" id="FARM_NM_OLD">
									</div>
								</div></li>
							<li><span><spring:message code='title.farm.operator' /><span class="red"> *</span></span>

								<div class="registration-write  btn-input-wrap">

									<a2m:choiceInputForm type="dialog" cls="selectCompany"
										id='COMPANY_ID' params="{COMP_TYPE: opera, selectType: ALL}" defaultValue=""
										callback="" eventType="dblclick"
										codeDefaultValue="${DATA.COMPANY_ID}"
										textDefaultValue="${DATA.COMPANY_NM}"
										textTargetName="farm.COMPANY_NM"
										codeTargetName="farm.COMPANY_ID" textFieldName="COMPANY_NM"
										codeFieldName="COMPANY_ID" textValidate="required"
										textTargetReadonly="true" codeView="true"
										funcname="onSelectCompany" classes="dialog_company" />



								</div>
						</ul>
						<ul class="registration-form-lst">
							<li><span><spring:message code='title.farm.group' /></span>
								<div id="group_area" class="registration-write btn-input-wrap">
									<div class="input-group-wrapper">
										<div class="input-group">
											<label for="Group1" class="sr-only">Group</label> <input
												type="text" class="group_nm" class="inp_beside_btn"
												name="group.1.name"><input class="group_id"
												name="group.1.id" hidden>
										</div>
										<div class="add-delete-btn-wrap">
											<a class="delete-btn"> <span class="sr-only">delete</span>
												<i class="xi-minus-square"></i>
											</a> <a class="add-btn"> <span class="sr-only">add</span> <i
												class="xi-plus-square"></i>
											</a>
										</div>
									</div>

								</div></li>
						</ul>
					</div>
				</div>
				<!-- //registration form -->
				<div id="map"></div>


				<div class="registration-form registration-form2">
					<div class="registration-form-lst-wrap">
						<ul class="registration-form-lst">
							<li><span><spring:message code='title.farm.LOCATION' /><span class="red"> *</span></span>
								<div class="registration-write twice-input">
									<div class="input-group-wrapper">
										<div class="input-group">
											<label for="latitude" class="sr-only">Location</label> <input
												id="latitude"
												class="location"
												nova-validation="required" name="farm.LATITUDE"
												value="${DATA.LATITUDE}"
												placeholder="LATITUDE">
										</div>
									</div>
									<div class="input-group-wrapper">
										<div class="input-group">
											<label for="longitude" class="sr-only">Longitude</label> <input
												id="longitude"
												class="location"
												nova-validation="required" 
												value="${DATA.LONGTUD}" name="farm.LONGTUD"
												placeholder="LONGTITUDE">
										</div>
									</div>
								</div>
								</li>
								<li>
								<div style="font-size: 12px;">
								<span>Please enter the coordinates with a dot (.)<br/>
								 Example: 
								</span>
								<div>Latitude is 12.321
								<br/>
								Longtitude is 123.4134
									</div>
								</div>
									
								</li>
						</ul>
						<ul class="registration-form-lst">
							<li class="note"><span><spring:message
										code='title.farm.DESCRPT' /></span>
								<div class="registration-write">
													                              <div class="input-group input-group-wrap">
								
									<label for="DESCRPT" class="sr-only"><spring:message
											code='title.farm.DESCRPT' /></label>
									<textarea name="farm.DESCRPT" id="DESCRPT">${DATA.DESCRPT}</textarea>
									</div>
								</div></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="system-right">
				<div class="btns">
					<c:if test="${navimenu.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
						<a class="btn-style btn-style1" onclick="submitWithValidation()"><spring:message code='button.save' /></a> 
					</c:if>
					<c:if test="${not(DATA.CRUD eq 'C') && navimenu.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
						<a class="btn-style btn-style3" onclick="removeFarm()"><spring:message code='button.delete' /></a>
					</c:if>
					<a class="btn-style btn-style2" onclick="backToList()"><spring:message code='button.back' /></a>
				</div>
			</div>
		</div>
	</form:form>

	<!-- //발전단지 등록 -->
</div>