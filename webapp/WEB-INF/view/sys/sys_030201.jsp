<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/WEB-INF/_include/taglib.jsp"%>
    
<script>
var defLat =  36.36;
var defLog =  127.38;
var lat0 = '${DATA.LATITUDE}';
var log0 = '${DATA.LONGTUD}';
// var markers = [];
var marker;
var seqGroup = 1;
var map;
var coordInfoWindow;
var checkDuplID = 'unset';
var crud 

function initMap() {
// 	console.log(lat0 + ' - ' + log0);
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
//       console.log(mapsMouseEvent.latLng);
//       var _lat = Math.round(mapsMouseEvent.latLng.lat() * 100) / 100;
//       var _log = Math.round(mapsMouseEvent.latLng.lng() * 100) / 100;
      var _lat = mapsMouseEvent.latLng.lat();
      var _log = mapsMouseEvent.latLng.lng();
      
      $('input[name="turbine.LONGTUD"').val(_log);
	  $('input[name="turbine.LATITUDE"]').val(_lat);
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
	crud = $('input[name="CRUD"]').val();
/* 	if(crud == 'U'){

		defLat = parseFloat(lat0);
		defLog = parseFloat(log0);

	} */
	
	$('input[name="turbine.COMPANY_NM"]').change(function(){
		$(this).resetWarning();
	})
	
	$('input[name="turbine.LOC_ID"]').change(function(){
		$(this).resetWarning();
	})
	
	$('input[name="turbine.POWER"]').change(function(){
		$(this).resetWarning();
	})
	
	
	 $('input[name="turbine.LONGTUD"').keyup(function(e){
			if(e.which == 8 || (e.which >= 37 && e.which <= 40) || (e.which >= 48 && e.which <= 57) || e.which == 189 || e.which == 190 ){
			
			}else{
				this.value = this.value.slice(0, -1);
			}
		});
		$('input[name="turbine.LATITUDE"').keyup(function(e){
			if(e.which == 8 || (e.which >= 37 && e.which <= 40) || (e.which >= 48 && e.which <= 57) || e.which == 189 || e.which == 190 ){
			}else{
				this.value = this.value.slice(0, -1);
			}
		}); 


	$('input.location').change(function(){
		var log = $('input[name="turbine.LONGTUD"').val();
		var lat = $('input[name="turbine.LATITUDE"]').val();
		
		var check1 = false;
		var check2 = false;
		var msg ="";
		if(lat){
			if(lat.match(/^-?[0-9]{1,3}[.]{1}[0-9]+$/)){
			var val = parseFloat(lat);
				if(val >= -90 && val <= 90){
					$('input[name="turbine.LATITUDE"]').available()
					check1 = true;
				}else{
					$('input[name="turbine.LATITUDE"]').inputWarning('"Latitude" is invalid.');
					msg+='Latitude value is from -90.00 to 90.00\n'
				}
			}else{
				$('input[name="turbine.LATITUDE"]').inputWarning('"Latitude" is invalid.')
				msg+='Latitude template is "-X.Y" or "X.Y".   X, Y are integers.\nThis field\'s value is from -90.00 to 90.00\n';
			}
		}
		if(log){
			if(log.match(/^-?[0-9]{1,3}[.]{1}[0-9]+$/)){
			var val = parseFloat(log);
				if(val >= -180 && val <= 180){
					$('input[name="turbine.LONGTUD"]').available()	
					check2 = true;
				}else{
					$('input[name="turbine.LONGTUD"]').inputWarning('"Longtitude" is invalid.')
					msg+='Longtitude value is from -180.00 to 180.00\n';
				}
			}else{
				$('input[name="turbine.LONGTUD"]').inputWarning('"Longtitude" is invalid.')
				msg+='Longtitude\'s template is "-X.Y" or "X.Y".   X, Y are integers.\nThis field\'s value is from -180.00 to 180.00';
			}
		}
		if(!check1 || !check2){
			if(msg){
				alert(msg);					
			}
			return false;
		}
		
// 		console.log(lat + '-' + log + '- ' + typeof log == 'number' +' '+ typeof lat == 'number');
		if($.isNumeric(log) && $.isNumeric(lat)){
			var log1 = parseFloat(log);
			var lat1 = parseFloat(lat);
		      var uluru = {lat: lat1, lng: log1};
		  	
		      if(marker){
		    	  marker.setMap(null);
		      }

		      marker = new google.maps.Marker({position: uluru, map: map});
// 		      markers.push(marker);
		      moveToLocation(lat1, log1);
	
		}
	});

	getFarms();

	 $("#FARM_ID").change(function(){
		getGroups();
	 });
	 
});

function moveToLocation(lat, lng){

  const center = new google.maps.LatLng(lat, lng);
	  // using global variable:
	  window.map.panTo(center);
	}


var first = true;
function getGroups(){
	if(!$("#FARM_ID").val()){
		return false;
	}
	
	$.ajax({
		url: CTX+'/sys/sys_0302/getGroupSys.ajax',
		data: {"FARM_ID": $("#FARM_ID").val()} ,
		success: function (response) {
// 			console.log(response);
			var str = '';
			$.each( response, function( index, obj ) {
				str += '<option value="'+obj.GROUP_ID+'">'+obj.GROUP_NM+'</option>'
			});
			
			 $("#GROUP_ID").empty().val('').append(str);
			 $('#GROUP_ID').change(function(){
					$(this).closest('div.select-box').find('label').text($('#GROUP_ID option:selected').text());
			 })
			 var group_id = $('select[name="turbine.GROUP_ID"]').attr('val');
				if(group_id){
					$('#GROUP_ID').val(group_id);
					$('#GROUP_ID').closest('div.select-box').find('label').text($('#GROUP_ID option:selected').text());
					
				}else{
					var id = $('#GROUP_ID option:contains("NO GROUP")').val();
					$('#GROUP_ID').val(id);
					$('#GROUP_ID').closest('div.select-box').find('label').text("NO GROUP");

				}
				$('input[name="turbine.GERATOR_NM"]').resetWarning();
				if(!first){
					doubleCheckName();	
				}
				if(first){
					first = !first;
				}
				$('#GROUP_ID').unbind('change').change(function(){
					doubleCheckName();					
				})
				
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

function doVerify(){
// 	debugger;
	if(!$("#GERATOR_EN_NM").val()){
		return false;
	}
	
	$.ajax({
		url: CTX+'/sys/sys_0302/doVerify.ajax',
		data: {"GERATOR_EN_NM": $("#GERATOR_EN_NM").val()} ,
		success: function (response) {
// 			console.log(response);
			
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}

function getFarms(){
	
	$.ajax({
		url: CTX+'/sys/sys_0302/getFarmSys.ajax',
		data: {} ,
		success: function (response) {
			var str = '';
			$.each( response, function( index, obj ) {
				str += '<option value="'+obj.FARM_ID+'">'+obj.FARM_NM+'</option>'
				});
			
			 $("#FARM_ID").append(str);
			setFarmID($('#FARM_ID').attr('val'));

			 $('#FARM_ID').change(function(){
					$(this).closest('div.select-box').find('label').text($('#FARM_ID option:selected').text());
					setFarmID($('#FARM_ID option:selected').val());
			 });
				var str = $('input[name="turbine.GERATOR_NM"]').val();
				if(str){
					var arr = str.split('-');
					$('input[name="turbine.GERATOR_NM"]').val(arr[0]);
					$('input[name="turbine.GERATOR_NM"]_2').val(arr[1]);
					$('#FARM_ID').val($('select[name="turbine.FARM_ID"]').attr('val'));
					$('#FARM_ID').closest('div.select-box').find('label').text($('#FARM_ID option:selected').text());
					getGroups();
				}

		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		}
	});
}
function backToList(){
		window.location.reload();
}
function doCreate(){
	var type = "TURBIN";
	var genId = '${DATA.GERATOR_ID}';
	var code = "Brand";
	var url = CTX+'/sys/sys_0101/listdetailBasic/form.tab?CODE='+code+"&TYPE="+type+"&GERATOR_ID="+genId;
	var param = {};		
	var success = function(html){
			};
	var ajax = new AjaxAccess();
	ajax.loadingHTML(url, $('#cont'), param, success, "");
}



function saveCallbackFunc2(form, data){
	if(data && data.result == 'true' && !data.err_cd ){
		backToList();
		//window.opener.callBackAddTurbine();
		//window.self.close();
	}else if(data && data.result == 'true' && data.msg){
		if(data.err_cd ){
			var err_cd_arr = data.err_cd.split[','];
			if(err_cd_arr.indexOf('existed')){
				$('input#GERATOR_ID').inputWarning('WTG ID already have existed.');
			}
			if(err_cd_arr.indexOf('gen_existed_nm')){
				$('input#GERATOR_ID').inputWarning('WTG Korean already have existed.');
			}
			if(err_cd_arr.indexOf('gen_existed_nm_2')){
				$('input#GERATOR_ID').inputWarning('WTG English already have existed.');
			}
		}
		
	}
} 


var brand = '${DATA.MANFCTURE_NM}';

$(document).ready(function() {
	
	$("#MANFCTURE_NM").val(brand);
	$("#MANFCTURE_ID").val(brand);
	
	$('input[name="turbine.GERATOR_ID"]').change(function(){
		if($(this).val().trim()){
			duplCheckIDAjax();			
		}else{
			checkDuplID = 'unset';
		}
	});
	
	$('input[name="turbine.GERATOR_NM"]').change(function(){
		if($(this).val().trim()){
			doubleCheckName();			
		}else{
			duplName = 'unset';
		}
	});
	
	
	getData();
	
});

function duplCheckIDAjax() {
	if(!$('#GERATOR_ID').val()){
		$('#GERATOR_ID').resetWarning();
		return false;
	}
	var msgDupl = 'WTD ID already have existed.';
    $.ajax({
        url: CTX + "/sys/sys_0302/duplCheckID.ajax",
        type: 'post',
        data: $('#turbineForm').serialize(),
        cache: false,
        success: function(data, textStatus, jqXHR) {
            if(data == "uniq"){
                $('#GERATOR_ID').available();
//                 	alert("사용가능: 사용자ID 변경");
                checkDuplID = true;
                
            } else if (data == "dupl") {
//             	alert("이미 사용중입니다.");
                $('#GERATOR_ID').inputWarning(msgDupl);
                checkDuplID = false;
        //        document.getElementById('btn_sub').disabled = true;
            }
            
        },error : function(e){
//             console.log(e);
            alert('Error');
        }
    });
}
var duplName = 'unset';;

function doubleCheckName(){
	if(!$('#FARM_ID').val()){
		duplName = false;
    	$('input[name="turbine.GERATOR_NM"]').inputWarning('Please choose a farm.');
    	$('input[name="turbine.GERATOR_NM"]').val('');
    	return false;

	}
	var farmId = $('#FARM_ID').val();
	var groupId = $('#GROUP_ID').val();
	var name = $('input[name="turbine.GERATOR_NM"]').val();
	var nameOld = $('input[name="turbine.GERATOR_NM_OLD"]').val();
	if(name==null||name==''){
    	$('input[name="turbine.GERATOR_NM"]').resetWarning();

		return false;
	}else{
		$.ajax({
			  url: CTX+'/sys/sys_0302/checkDoubleName.ajax?GERATOR_NM='+name + '&CRUD='+crud + '&GERATOR_NM_OLD='+ nameOld+ '&GROUP_ID='+ groupId + '&FARM_ID='+farmId,
			  type: 'GET',
			  success: function(data) {
				    if(data == "true"){
				    	$('input[name="turbine.GERATOR_NM"]').available();
						duplName = true;
				    }else{
				    	$('input[name="turbine.GERATOR_NM"]').inputWarning('This generator Korea name already have existed!');
						duplName = false;
				    }
			  },
			  error: function( req, status, err ) {
			    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
			  }
			});		
	}
	
}


function getData(){
	var url = CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax';
	 $.ajax({
	        url:  url,
// 	        type: "post",
	        data:  {'CODE': 'Brand'} ,
	        success: function (data) {
	        	renderCombo(data);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	           console.log(textStatus, errorThrown);
	        }
	    }); 
	
	
}

function renderCombo(data){
	if(data && data.length> 0){
		var options = '<option value="">-------</option>';
		for(var i = 0; i< data.length; i++){
			options += '<option value="'+data[i].CODE+'">'+data[i].CODE+'</option>'
		}
		
		$('#selectBrand').empty().append(options);
		$('#selectBrand').val($('#selectBrand').attr('value1'));
	}
	
}


	function submitWithValidation() {

		var log = $('input[name="turbine.LONGTUD"').val();
		var lat = $('input[name="turbine.LATITUDE"]').val();
		var check1 = false;
		var check2 = false;
		
		var msg ="";
		if(lat){
			
		if(lat.match(/^-?[0-9]{1,3}[.]{1}[0-9]+$/)){
// 			if(/-?[0-9]{1,3}[.][0-9]+/.test(lat)){
			var val = parseFloat(lat);
				if(val >= -90 && val <= 90){
					$('input[name="turbine.LATITUDE"]').available()
					check1 = true;
				}else{
					$('input[name="turbine.LATITUDE"]').inputWarning('"Latitude" is invalid.');
					msg+='Latitude value is from -90.00 to 90.00\n'
				}
			}else{
				$('input[name="turbine.LATITUDE"]').inputWarning('"Latitude" is invalid.')
				msg+='Latitude template is "-X.Y" or "X.Y".   X, Y are integers.\nThis field\'s value is from -90.00 to 90.00\n';
			}
		}
		if(log){
		if(log.match(/^-?[0-9]{1,3}[.]{1}[0-9]+$/)){
// 		if(log && /-?[0-9]{1,3}[.][0-9]+/.test(log)){
			var val = parseFloat(log);
				if(val >= -180 && val <= 180){
					$('input[name="turbine.LONGTUD"]').available()	
					check2 = true;
				}else{
					$('input[name="turbine.LONGTUD"]').inputWarning('"Longtitude" is invalid.')
					msg+='Longtitude value is from -180.00 to 180.00\n';
				}
			}else{
				$('input[name="turbine.LONGTUD"]').inputWarning('"Longtitude" is invalid.')
				msg+='Longtitude\'s template is "-X.Y" or "X.Y".   X, Y are integers.\nThis field\'s value is from -180.00 to 180.00';
			}
		}
		if(!check1 || !check2){
			if(msg) {
				alert(msg);
				return false;
			}
		}
		
		
	 if(checkDuplID === false || duplName === false){
// 			$('input#GERATOR_ID').inputWarning('WTD ID already have existed.');
			return false;
		}
			$('#turbineForm').submit();
	}

	
	
	var msgConfirmDelete = '<spring:message code='message.confirmDelete' />';
	var deleteSuccess = '<spring:message code='message.deletedSuccess' />';
	var deleteFailed = '<spring:message code='message.deletedFailed' />';
	  function removeTurbine(){
// 	    	obj.preventDefault();
// 	    	obj.stopPropagation();
	    	var message={
	        	    'QUESTION' : {'MESSAGE': msgConfirmDelete},
	        	    'FAIL':{'MESSAGE':deleteFailed},
	        	    'SUCCESS':{'MESSAGE': deleteSuccess}
	        	    }
	      	var param = {};
			var id  = $('#GERATOR_ID').val()	;
		
			if(confirm(message.QUESTION.MESSAGE)){

	      	   $.ajax({
	    	        url:  CTX + "/sys/sys_0302/delete01.ajax",
	    	        type: "post",
	    	        data:  {"GERATOR_ID" : id} ,
	    	        success: function (response) {
	     	        	if(response == 'true'){
							alert(message.SUCCESS.MESSAGE);

							backToList()
						}else{
							alert(message.FAIL.MESSAGE);
						}
	    	        },
	    	        error: function(jqXHR, textStatus, errorThrown) {
	    	           console.log(textStatus, errorThrown);
	    	        }
	    	    }); 
	    	}
	    	
	    }
	  function setFarmID(value){
		var paramStr =   $('span[data-id="OPERATOR_ID"]').attr('data-param');
		paramStr = paramStr.substring(1, paramStr.length-1);
		var arr = paramStr.split(',');
		if(!value || arr <2) return false;
		paramStr = "{";
		for(i =0; i< arr.length-1; i++){
			paramStr+= arr[i]+ ',';
		}
		paramStr+= 'FARM_ID:'+value+'}';
// 		console.log(paramStr)
		
// 		paramStr = paramStr.replace('#FARM_ID', value);
		
		 $('span[data-id="OPERATOR_ID"]').attr('data-param',paramStr);
	  }
</script>
 
	      <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCh3K14xNRxPzr5lD0Y02yHfIpgJnO0SYI&callback=initMap">
	      </script>
    
    <div class="container system-wrap system-wrap1">
    
 <!-- 발전기 등록 -->
	  <div class="system-detail-wrap">
	    <div class="system-left">
	    <form:form action="${formPath}/save01.ajax" id="turbineForm" data-func="saveAjax" data-callback="saveCallbackFunc2">
		<input name="CRUD" hidden value="${DATA.CRUD}">
		 <input type="text" hidden value="${DATA.GERATOR_ID}" name="turbine.GERATOR_ID_OLD" id="GERATOR_ID_OLD" >
		
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
					</c:choose>			      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>SYSTEM</li>
	      <li class="bold"><spring:message code='title.turbine.module' /></li>
	    </ul>
	  </div>
	      <!--//tit-wrap-->
	      <!-- registration form -->
	      <div class="registration-form registration-form1">
	        <div class="registration-form-lst-wrap">
	          <ul class="registration-form-lst">
	            <li>
	              <span><spring:message code='title.farm.FARM_NM' /><span class="red"> *</span></span>
	              <div class="registration-write  registration-write-select">
	                <div class="input-group input-group-wrapper">
		                <div class="select-box">
		                    <label for="FARM_ID"></label>
		                    <select id="FARM_ID" nova-validation="required" val="${DATA.FARM_ID}" name="turbine.FARM_ID" class="info-select">
		                      	<option value="">-- <spring:message code='title.farm.FARM_NM' /> --</option>
	
		                    </select>
		                  </div>
	                </div>
	            </li>
	            <li>
<!-- 	                <em>&gt;</em> -->
	              <span><spring:message code='title.farm.group' /></span>
	              <div class="registration-write  registration-write-select">
	                <div class="input-group-wrapper">
	                  <div class="select-box">
	                    <label for="GROUP_ID"></label>
	                    <select  id="GROUP_ID"  val="${DATA.GROUP_ID}" name="turbine.GROUP_ID" class="info-select">
	                      	<option>-- <spring:message code='title.farm.group' /> --</option>

	                    </select>
	                  </div>
	                  </div>
	                </div>
	            </li>
	            <li>
	              <span><spring:message code='title.tb.GERATOR_ID' /><span class="red"> *</span></span>
	              <div class="registration-write">
	                <div class="input-group">
	                  <label for="wtgId" class="sr-only">WTG ID</label>
	                  <input type="text" nova-validation="required" value="${DATA.GERATOR_ID}" name="turbine.GERATOR_ID" id="GERATOR_ID" >
	                </div>
	              </div>
	            </li>
	            <li>
	              <span><spring:message code='title.tb.brand' /><span class="red"> *</span></span>
	              <div class="registration-write btn-input-wrap">
	                    <a2m:choiceInputForm type = "dialog" cls = "selectCompany" id ='COMPANY_ID' params = "{selectType: one, COMP_TYPE: manu}" 
											defaultValue="" callback="" eventType="dblclick" codeDefaultValue="${DATA.COMPANY_ID}" textDefaultValue="${DATA.MANFCTURE_NM}"
											textTargetName="turbine.COMPANY_NM" codeTargetName="turbine.COMPANY_ID" textFieldName="COMPANY_NM" codeFieldName="COMPANY_ID" textValidate="required"
											textTargetReadonly="true"
											codeView = "true" funcname="onSelectCompany" classes="dialog_company" />
											</div>
     			
	            </li><li>
	              <span><spring:message code='title.farm.operator' /></span>
	              <div class="registration-write btn-input-wrap">
	                    <a2m:choiceInputForm type = "dialog" cls = "selectCompany" id ='OPERATOR_ID' params = "{COMP_TYPE: opera, selectType: one, FARM_ID: #FARM_ID}" 
											defaultValue="" callback="" eventType="dblclick" codeDefaultValue="${DATA.OPERATOR_ID}" textDefaultValue="${DATA.OPERATOR_NM}"
											textTargetName="turbine.OPERATOR_NM" codeTargetName="turbine.OPERATOR_ID" textFieldName="COMPANY_NM" codeFieldName="COMPANY_ID" 
											textTargetReadonly="true"
											codeView = "true" funcname="onSelectCompany" classes="dialog_company" />
											</div>
     			
	            </li>
	            <li>
	              <span><spring:message code='title.tb.GERATOR_NM' /><span class="red"> *</span></span>
	              <div class="registration-write twice-input">
	                <div class="input-group-wrapper">
	                  <div class="input-group">
	                    <label for="wtg1" class="sr-only">WTG</label>
	                    <input   nova-validation="required" placeholder="Korean name" value="${DATA.GERATOR_NM}"  name="turbine.GERATOR_NM">
	                    <input  hidden value="${DATA.GERATOR_NM}"  name="turbine.GERATOR_NM_OLD">
	                  </div>
	                </div>
	                <div class="input-group-wrapper">
	                  <div class="input-group">
	                    <label for="wtg2" class="sr-only">WTG</label>
	                    <input  id="LOC_ID" nova-validation="required" placeholder="English name" value="${DATA.LOC_ID}" name="turbine.LOC_ID" >
	                    	                    <input  hidden value="${DATA.LOC_ID}"  name="turbine.LOC_ID_OLD">
	                    
	                  </div>
	                </div>
	              </div>
	            </li>
	            <li>
	              <span><spring:message code='title.tb.POWER' />(MW)<span class="red"> *</span></span>
	              <div class="registration-write">
	                <div class="input-group-wrapper">
	                  <div class="input-group">
	                    <label for="power" class="sr-only">Power(MW)</label>
	                    <input type="number" min=0 maxlength="4" placeholder="You only can type number 0~9999" nova-validation="required, number" value="${DATA.POWER}" name="turbine.POWER" id="POWER" >
	                  </div>
	                </div>
	              </div>
	            </li>
	          </ul>
	
	          <ul class="registration-form-lst">
	            <li>
	              <span><spring:message code='title.tb.TOWR_HGHT' /></span>
	              <div class="registration-write">
	                <div class="input-group">
	                  <label for="towerHeight" class="sr-only">Tower Height</label>
	                  <input type="number" min=0 name="turbine.TOWR_HGHT" value="${DATA.TOWR_HGHT}" id="TOWR_HGHT" >
						<input hidden name="turbine.MAIN_PART_TOWER"  value="${DATA.MAIN_PART_TOWER}">
	                </div>
	              </div>
	            </li>
	            <li>
	              <span><spring:message code='title.tb.ROTOR_D' /> (M)</span>
	              <div class="registration-write">
	                <div class="input-group">
	                  <label for="rotorDiameter" class="sr-only">Rotor Diameter</label>
						<input type="number" min=0 name="turbine.ROTOR_D" value="${DATA.ROTOR_D}" id="ROTOR_D" >
						<input hidden name="turbine.MAIN_PART_ROTOR" value="${DATA.MAIN_PART_ROTOR}">
					</div>
	              </div>
	            </li>
	            <li>
	              <span><spring:message code='title.tb.BLADE' /></span>
	              <div class="registration-write twice-input">
	                <ul class="registration-lst">
	                  <li>
	                    <div class="input-group-wrapper">
	                      <div class="input-group">
	                        <label for="bladeType" class="sr-only">Type</label>
	                        <input type="text" name="turbine.BLDE_TP" value="${DATA.BLDE_TP}" id="BLDE_TP"  placeholder="<spring:message code='title.tb.BLDE_TP' />">
	                      </div>
	                    </div>
	                    <div class="input-group-wrapper">
	                      <div class="input-group">
	                        <label for="serial1" class="sr-only">Serial #1</label>
						<input type="text"  name="turbine.BLDE_CD1" value="${DATA.BLDE_CD1}" id="BLDE_CD1" placeholder="Serial #1" >
						<input hidden name="turbine.MAIN_PART_1" value="${DATA.MAIN_PART_1}">
						  </div>
	                    </div>
	                  </li>
	                  <li>
	                    <div class="input-group-wrapper">
	                      <div class="input-group">
	                        <label for="bladeLength" class="sr-only">Length</label>
	                        <input  type="number" min="0"  name="turbine.BLDE_LGTH" value="${DATA.BLDE_LGTH}" id="BLDE_LGTH" placeholder="<spring:message code='title.tb.BLDE_LGTH' /> (M)">
	                      </div>
	                    </div>
	                    <div class="input-group-wrapper">
	                      <div class="input-group">
	                        <label for="serial2" class="sr-only">Serial #2</label>
	                        <input type="text"    name="turbine.BLDE_CD2" value="${DATA.BLDE_CD2}" id="BLDE_CD2" placeholder="Serial #2">
						<input hidden name="turbine.MAIN_PART_2" value="${DATA.MAIN_PART_2}" >
	                      </div>
	                    </div>
	                  </li>
	                  <li>
	                    <div class="input-group-wrapper">
	                      <div class="input-group">
	                        <label for="bladeColor" class="sr-only">Color</label>
	                        <input  type="text"  name="turbine.BLDE_CLOR" value="${DATA.BLDE_CLOR}" id="BLDE_CLOR" placeholder="<spring:message code='title.tb.BLDE_CLOR' />">
	                      </div>
	                    </div>
	                    <div class="input-group-wrapper">
	                      <div class="input-group">
	                        <label for="serial3" class="sr-only">Serial #3</label>
	                        <input type="text"  name="turbine.BLDE_CD3" value="${DATA.BLDE_CD3}" id="BLDE_CD3" placeholder="Serial #3">
						<input hidden name="turbine.MAIN_PART_3" value="${DATA.MAIN_PART_3}">
	                      </div>
	                    </div>
	                  </li>
	                </ul>
	              </div>
	            </li>
	          </ul>
	
	        </div>
	      </div>
	      <!-- //registration form -->
	      <div id="map"></div>
	
	
	
	      <div class="registration-form registration-form2">
	        <div class="registration-form-lst-wrap">
	          <ul class="registration-form-lst">
	            <li>
	              <span><spring:message code='title.tb.LOCATION' /><span class="red"> *</span></span>
	              <div class="registration-write twice-input">
	                <ul class="registration-lst">
	                  <li>
	                    <div class="input-group-wrapper">
	                      <div class="input-group">
	                        <label for="latitude" class="sr-only">LATITUDE</label>
	                        <input id="latitude" type="text" nova-validation="required"  class=" location" value="${DATA.LATITUDE}" name="turbine.LATITUDE" placeholder="LATITUDE">
	                      </div>
	                    </div>
	                    <div class="input-group-wrapper">
	                      <div class="input-group">
	                        <label for="longitude" class="sr-only">LONGITUDE</label>
	                        <input type="text" id="longitude" nova-validation="required"  class="location" value="${DATA.LONGTUD}" name="turbine.LONGTUD" placeholder="LONGITUDE">
	                      </div>
	                    </div>
	                  </li>
	                </ul>
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
	            <li class="note">
	              <span><spring:message code='title.tb.DESCRPT' /></span>
	              <div class="registration-write">
	              					                              <div class="input-group input-group-wrap">
	              
	                <label for="note" class="sr-only">Note</label>
	                <textarea id="note"  name="turbine.DESCRPT" id="DESCRPT">${DATA.DESCRPT}</textarea>
	                </div>
	              </div>
	            </li>
	          </ul>
	        </div>
	      </div>
	      </form:form>
	    </div>
	    <div class="system-right">
	      <div class="btns">
	      	<c:if test="${navimenu.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
				<a class="btn-style btn-style1" onclick="submitWithValidation()"><spring:message code='button.save' /></a> 
			</c:if>
			<c:if test="${not(DATA.CRUD eq 'C') && navimenu.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
				<a class="btn-style btn-style3" onclick="removeTurbine()"><spring:message	code='button.delete' /></a>
			</c:if>
			<a class="btn-style btn-style2" onclick="backToList()"><spring:message code='button.back' /></a>
	      </div>
	    </div>
	  </div>
	
	  <!-- //발전기 등록 -->
	  </div>