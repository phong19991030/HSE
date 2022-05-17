function dsb0100() {
	initCompany();
	getAllProjectDetail();
//	
//	getPaymentCnt();
//	getMenuPaymentLst();
}
var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
	  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
	  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
	  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
	  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
	  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
	  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
	  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
	  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
	  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

function getAllProjectDetail() {
	var param = {};
	var data = _sys.mariaDB.getData(CTX + '/main/getAllProjectDetail.ajax', param);
	
	$("#id_num_project_today").html(data.PRJ_TD_CNT);
	$("#id_num_project_all").html(data.PRJ_CNT);
	$("#id_chart_box_project").html('');
	$("#id_chart_detail_project").html('');
	
	$("#id_num_emp_today").html(data.todayInputManpower);
	$("#id_num_emp_all").html(data.noInputManpower);
	$("#id_chart_detail_emp").html('');	
	
	data.LIST.forEach((e, index) => {
		var sample = '<div class="example1" style="background: '+colorArray[index]+';"></div>';
		$(sample).prop('info', e);
		$('#id_chart_box_project').append(sample);
		
		makeInfoProj(e, data, index);
		makeInfoEmp(e, data, index);
	});
}

function makeInfoProj(e, data, index){
	var companyProjCnt = e.lstProject.length ? e.lstProject.length : 0;
	if(companyProjCnt > 0){
		var ratioProj = (companyProjCnt / data.PRJ_CNT * 100).toFixed(2);
		var tmpEle = '<li>'
			+ 	'<span style="width: 9px; height: 21px; position: absolute; top: 50%; transform: translateY(-50%); left: 0; background: '+ colorArray[index] +';"></span>'
			+ 	'<span class="tit">'+ e.COMPANY_NAME +'</span>'
			+ 	'<div class="inner">'
			+ 		'<span class="total"><em>'+ companyProjCnt +'</em>건</span>'
			+		'<span class="per"><em>'+ ratioProj +'</em>%</span>'
			+	'</div>'
			+ '</li>'
	}
	$(tmpEle).prop('info', e);
	$('#id_chart_detail_project').append(tmpEle);
}

function makeInfoEmp(e, data, index){
	var companyEmpCnt = e.companyManpower ? e.companyManpower : 0;
	if(companyEmpCnt > 0){
		var ratioEmp = (companyEmpCnt / data.noInputManpower * 100).toFixed(2);
		var tmpEle = '<li>'
					+ 	'<span style="width: 9px; height: 21px; position: absolute; top: 50%; transform: translateY(-50%); left: 0; background: '+ colorArray[index] +';"></span>'
					+ 	'<span class="tit">'+ e.COMPANY_NAME +'</span>'
					+ 	'<div class="inner">'
					+ 		'<span class="total"><em>'+ companyEmpCnt +'</em>건</span>'
					+		'<span class="per"><em>'+ ratioEmp +'</em>%</span>'
					+	'</div>'
					+ '</li>'
	}
	$(tmpEle).prop('info', e);
	$('#id_chart_detail_emp').append(tmpEle);
}

function initCompany(){
  $('ul#ROW_COMPANY').html('');
  var param = {};
  var data = _sys.mariaDB.getData(CTX + '/com/com_0405/getAllCompanys.ajax', param);
  var list = data.LIST;
  list.forEach((e, index) => {
	  if(index == 0) $('#SELECTED_COMPANY_ID').val(e.COMPANY_ID);
    var sample = `<li><a href="javascript:void(0);">${e.COMPANY_NAME}</a></li>`;
    sample = $(sample).css('cursor', 'pointer').click(function(event) {
      if(event.target.tagName === 'LI' || event.target.tagName === 'A') {
        var info = $(this).prop('info');
        $('h1#SELECTED_COMPANY').html(info.COMPANY_NAME);
        $('#SELECTED_COMPANY_ID').val(info.COMPANY_ID);
        scheduleFunction(info.COMPANY_ID);
      }
    });    
    // 프로퍼티 추가 
    $(sample).prop('info', e);
    $('ul#ROW_COMPANY').append(sample);
  });
  $('h1#SELECTED_COMPANY').html(list[0].COMPANY_NAME);
  scheduleFunction(list[0].COMPANY_ID);
}

function scheduleFunction(companyId){
  console.log(companyId);
  initSchedule(companyId);
  getAccidentAnalysis();
 
  makeChart();
  
}

function getAccidentAnalysis(){
	var screenParam = getScreenParam();
	var param = {};
	param.COMPANY_ID = screenParam.companyId;
	param.START_DM = screenParam.startDm;
	param.END_DM = screenParam.endDm;
	var data = _sys.mariaDB.getData(CTX + '/main/getAccidentAnalysis.ajax', param);
	
	if(!data.LIST || data.LIST.length == 0){
		var blankEle = 
			'<ul class="update-lst" style="height: 300px;"><li class="blank-li"><div class="blank"><div class="txt-area"><span class="icon"></span><span class="txt">업데이트된 내용이 없습니다.</span></div></div></li></ul>'
		$('#id_tab_list_table_accident').append(blankEle);	
	}else{
		$("#id_tab_list_table_accident").html('');	
		reportTypeArr.forEach((e) => {
			var lstAccident = data.LIST.filter((item, index) => item.REPORT_TYPE == e.COMM_CD);
			
			var sample = "";
			var tmpUl = '<ul class="list-info-area">';
			if(lstAccident.length > 0){
				lstAccident.forEach((accident) => {
					var tmpCnt =  accident.CNT_INVOLVE_MORE;
					var tmpMore = "";
					if(tmpCnt > 0){
						tmpMore =  " " +$('#id_msg_and').val()+ "  " + tmpCnt + $('#id_msg_other').val();
					}
					
					var tmpEle = 
						'<li>'
						+	'<div class="item-subject">'
						+		'<a href="javascript:void(0);" class="subject" onclick="goToAccidentDetailForm('+ accident.ACCIDENT_ID +')">'
						+			'<strong>'+ accident.ACCIDENT_NAME +'</strong>'
						+			'<span>'+ accident.PROJECT_NAME +'</span>'	
						+		'</a>'
						+		'<small class="bottom-info">'
						+			'<em class="place">'+ accident.PLACE +'<span>'+ accident.PLACE_DETAIL +'</span></em>'
						+			'<em class="staff">'+ accident.EMP_NAME_INJURED+'</em>'
						+		'</small>'
						+	'</div>'
						+	'<div class="item-info">'
						+		'<span class="staff">'
						+			'<em>'+ accident.FIRST_EMP_NAME_INVOLVE + tmpMore +'</em>'
						+		'</span>'
						+		'<span class="date-time-wrap">'
						+			'<em class="date">'+ accident.ACCIDENT_DATE+'</em>'
//						<em class="time">15:20</em>
						+		'</span>'		
						+	'</div>'
						+ '</li>'
						
						tmpUl += tmpEle;
				});
				
				tmpUl += '</ul>'; 
				
				
				sample = 
					'<div class="row">'
					+ 	'<div class="total-panel">'
					+		'<div class="total-panel-wrap">'
					+			'<p class="name">'+ e.COMM_NM +'</p>'
					+			'<strong class="num">'+ lstAccident.length +'</strong>'
					+		'</div>'
					+ 	'</div>'
					+	tmpUl
					+ '</div>'
			}
			
			$(sample).prop('info', e);
			$('#id_tab_list_table_accident').append(sample);
		});
	}
	
}

function goToAccidentDetailForm(ACCIDENT_ID){
	window.location = CTX + '/sft/sft_0301/detailForm?ACCIDENT_ID='+ ACCIDENT_ID;
}

function getScreenParam(){
	var screenParam = new Object();
	var companyId = $('#SELECTED_COMPANY_ID').val();
	var tmpYear = $("#YEAR").html();
	var tmpMonth = $("#MONTH").html();
	var lastDt = new Date(tmpYear, parseInt(tmpMonth), 0).getDate();
	
	var startDm = tmpYear + '-' + tmpMonth + '-01';
	var endDm = tmpYear + '-' + tmpMonth + '-' +lastDt;
	
	screenParam.companyId = companyId;
	screenParam.tmpYear = tmpYear;
	screenParam.tmpMonth = tmpMonth;
	screenParam.lastDt = lastDt;
	screenParam.startDm = startDm;
	screenParam.endDm = endDm;
	
	return screenParam;
}

function getDataAccidentChart(){
	
	var screenParam = getScreenParam();
	
	var param = {};
	param.START_DM = screenParam.startDm;
	param.END_DM = screenParam.endDm;
	param.COMPANY_ID = screenParam.companyId
	var data = _sys.mariaDB.getData(CTX + '/main/getDataAccidentChart.ajax', param);
	data.lastDt = screenParam.lastDt;
	console.log("d0an", data)
	return data;
}

function makeChart(){
	var res = getDataAccidentChart();
	dataArray = [['Date', reportTypeArr[0].COMM_NM, reportTypeArr[1].COMM_NM, reportTypeArr[2].COMM_NM]]
	
	for (var i = 0; i < res.lastDt; i++) {
		var num = i+1;
		var dateInx = "";
		if(num < 10){
			dateInx = "0" + num;
		}else{
			dateInx = "" + num;
		}
		
		var cntArr = [];
		cntArr = cntArr.concat([dateInx]);
		reportTypeArr.forEach((e, i ) => {
			var lstCnt = res.LIST.filter((item, index) => item.REPORT_TYPE == e.COMM_CD && item.DAY_ACCIDENT == dateInx);
			if(lstCnt.length > 0){
				cntArr = cntArr.concat([lstCnt[0].CNT]);
			}else{
				cntArr = cntArr.concat([0])
			}
		});
		dataArray
		dataArray.push(cntArr);
		
	}
	
	
	/* google chart */
	 google.charts.load('current', {'packages':['bar']});
     google.charts.setOnLoadCallback(drawChart);

     function drawChart() {
    	 var data = new google.visualization.arrayToDataTable(dataArray);

    	 var options = {
	         chart: {
	           title: '',
	           subtitle: '',
	         },
	         bars: 'vertical',
//	         vAxis: {format: 'decimal'},
	         height: 400,
	         colors: ['#4e958a', '#e99f00', '#455eee'],
	         legend: { position: "none" },
	         vAxis: {
	             title: 'LIKELIHOOD',
	             format: 'decimal',
	             titleTextStyle: {
	              color: '#a7a7a7'
	            }
	         },
	         
	         hAxis: {
	             title: 'DATE', 
	             format: 'decimal',
	             titleTextStyle: {
	              color: '#a7a7a7'
	            }
	         },

    	 };

       var chart = new google.charts.Bar(document.getElementById('chart_div'));

       chart.draw(data, google.charts.Bar.convertOptions(options));

     }
}