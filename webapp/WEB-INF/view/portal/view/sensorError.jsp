<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ include file="/WEB-INF/_include/taglib.jsp"%>
    
<!DOCTYPE html>
<script>

$(function(){
	$.ajax({
		
		  url: CTX+'/common/api/sensorError.ajax',
		  type: 'GET',
		  success: function(data) {
				renderData(data);
		  
		  
		  },
		  error: function( req, status, err ) {
		    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
		  }
		});		
});

// function initItem2(){
// 	$.ajax({
// 		  url: CTX+'/common/api/sensorError.ajax',
// 		  type: 'GET',
// 		  success: function(data) {
// 				renderData(data);
		  
		  
// 		  },
// 		  error: function( req, status, err ) {
// 		    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
// 		  }
// 		});		
// 	return false;

// }

function renderData(data){
	
	if(data.responseData && data.responseData.list.length> 1){
		var str = '';
		list = data.responseData.list.slice();
		for(i = 0; i < list.length-1; i++){
// 			console.log(i);
			str+= ' <tr>'
              +'  <td>'+list[i].GERATOR_ID+'</td>'
              +'  <td>'+list[i].SENSOR_NM+'</td>'
              +' <td>'+list[i].MAX_VALUE+'</td>'
              +'<td>'+list[i].MIN_VALUE+'</td>'
              +'<td>'+list[i].ERR_VALUE+'</td>'
              +'<td>'+list[i].ERR_STATE+'</td>'
              +'<td>'+list[i].ERR_POINT_CNT+'</td>'
              +'<td>'+list[i].OCCUR_START+'</td>'
              +'<td>'+list[i].OCCUR_END+'</td>'
              +'</tr>'
		}
		$('.box5 .base_grid_table tbody').empty().append(str);	
	}
}

</script>
             
              <div class="box-cont box5">
               <strong class="heading6">
                <span>Sensor error</span>
                <a href="" class="box-btn">
                  <i class="xi-angle-right-min"></i>
                </a>
              </strong>
                <div class="box-content">
                  <div class="base_grid_table">
                    <table>
                      <caption>Sensor error - <spring:message code="title.tb.GERATOR_NM" />, >Sensor <spring:message code="edu.edu_0101.list.label.name" />, Max value, Min value...</caption>
                      <thead>
                        <tr>
                          <th scope="col"><spring:message code="title.tb.GERATOR_NM" /></th>
                          <th scope="col">Sensor <spring:message code="edu.edu_0101.list.label.name" /></th>
                          <th scope="col">Max value</th>
                          <th scope="col">Min value</th>
                          <th scope="col">Error value</th>
                          <th scope="col">Error state</th>
                          <th scope="col">Occur point name</th>
                          <th scope="col">Occurrence time start</th>
                          <th scope="col">Occurrence time end</th>
                        </tr>
                      </thead>
                      <tbody>
                        
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

<script>

	
</script>