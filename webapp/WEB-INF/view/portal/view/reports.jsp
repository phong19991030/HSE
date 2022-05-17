<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>


<script>

	$(function(){
		$.ajax({
			  url: CTX+'/common/forDashboard.ajax',
			  type: 'GET',
			  success: function(data) {
					renderData(data);
			  
			  
			  },
			  error: function( req, status, err ) {
			    console.log( 'something was wrong!', status, err );
			  }
			});		
	});
	
// 	function initItem4(){
// 		$.ajax({
// 			  url: CTX+'/common/forDashboard.ajax',
// 			  type: 'GET',
// 			  success: function(data) {
// 					renderData(data);
			  
			  
// 			  },
// 			  error: function( req, status, err ) {
// 			    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
// 			  }
// 			});		
// 		return false;

// 	}
	
	function renderData(data){
		if(data && data.length> 1){
			var countMap = data[data.length-1];
			$('.box3 .box-content ul.report-lst > li.WI > strong').empty().append(countMap.WTG_COUNT);
			$('.box3 .box-content ul.report-lst > li.WC > strong').empty().append(countMap.WTG_CHK_COUNT);
			$('.box3 .box-content ul.report-lst > li.BI > strong').empty().append(countMap.BLADE_COUNT);
			var str = '';
			for(i = 0; i < data.length-1; i++){
				console.log(i);
				str+= ' <tr>'
                  +'  <td>'+data[i].RPT_TYPE_NM+'</td>'
                  +'  <td>'+data[i].RPT_NO+'</td>'
                  +' <td>'+data[i].PROJECT+'</td>'
                  +'<td>'+data[i].INS_DT+'</td>'
                  +' <td>'+''+'</td>'
                  +'</tr>'
			}
			$('.box3 .base_grid_table tbody').empty().append(str);	
		}
	}
	

</script>


              
              <div class="box-cont box3">
              <strong class="heading6">
                <span>Report</span>
                <a href="" class="box-btn">
                  <i class="xi-angle-right-min"></i>
                </a>
              </strong>
             	
             	<ul class="report-lst">
                  <li  class="WI">
                    <span>WTG Inspection</span>
                    <strong>85</strong>
                  </li>
                  <li  class="WC">
                    <span>WTG Checklist</span>
                    <strong>26</strong>
                  </li>
                  <li class="BI">
                    <span>Blade Inspection</span>
                    <strong >32</strong>
                  </li>
                </ul>
                <div class="box-content">
                  <div class="base_grid_table">
                    <table>
                      <caption>Report - Type, No., Title, Date, Tag</caption>
                      <thead>
                        <tr>
                          <th scope="col">Type</th>
                          <th scope="col">No.</th>
                          <th scope="col">Title</th>
                          <th scope="col">Date</th>
                          <th scope="col">Tag</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>WTG Checklist</td>
                          <td>323</td>
                          <td>Maintenance for Hangwon Wind Farm</td>
                          <td>2019.08.12 12:12:12</td>
                          <td>#Alarm #Rain</td>
                        </tr>
                        <tr>
                          <td>WTG Checklist</td>
                          <td>323</td>
                          <td>Maintenance for Hangwon Wind Farm</td>
                          <td>2019.08.12 12:12:12</td>
                          <td>#Alarm #Rain</td>
                        </tr>
                        <tr>
                          <td>WTG Checklist</td>
                          <td>323</td>
                          <td>Maintenance for Hangwon Wind Farm</td>
                          <td>2019.08.12 12:12:12</td>
                          <td>#Alarm #Rain</td>
                        </tr>
                        <tr>
                          <td>WTG Checklist</td>
                          <td>323</td>
                          <td>Maintenance for Hangwon Wind Farm</td>
                          <td>2019.08.12 12:12:12</td>
                          <td>#Alarm #Rain</td>
                        </tr>
                        <tr>
                          <td>WTG Checklist</td>
                          <td>323</td>
                          <td>Maintenance for Hangwon Wind Farm</td>
                          <td>2019.08.12 12:12:12</td>
                          <td>#Alarm #Rain</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
