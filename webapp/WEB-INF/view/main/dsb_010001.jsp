<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<style>
  .track {
    position: relative;
    display: inline-block;
  }
  
  .track .tooltiptext {
	 visibility: hidden;
	  width: auto;
	  background-color: #222222;
	  color: #fff;
	  font-size: 12px;
	  text-align: center;
	  border-radius: 6px;
	  padding: 5px 0;
	  position: absolute;
	  z-index: 1;
	  top: 150%;
	  left: 130%;
	  margin-left: -60px;
  }

  .track:hover .tooltiptext {
    visibility: visible;
  }

  /* tootip arrow (@smlee) */
  /* top (default) */
  .tooltiptext:after {
     content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
  }

  /* bottom */
  .tooltiptext.bottom::after {
    bottom: -9px;
    top: auto;
    transform: rotate(360deg) translateX(0);
  }

  /* left */
  .tooltiptext.left::after {
    top: 40%;
    left: -15px;
    transform: rotate(90deg) translateY(-50%);
  }

  /* right */
  .tooltiptext.right::after {
    top: 40%;
    right: -15px;
    transform: rotate(270deg) translateY(-50%);
  }
</style>

<div class="schedule-date-wrap">
  <!-- date-header -->
  <div class="date-header">
    <div class="current"><strong id="YEAR" class="year"></strong><strong id="MONTH" class="month"></strong></div>
    <span class="date-controller">
      <button id="PREV_MONTH" class="prev"><i class="las la-angle-left"></i></button>
      <button id="NEXT_MONTH" class="next"><i class="las la-angle-right"></i></button>
    </span>
  </div>

  <!-- date-lst -->
  <div id="DATE_LIST" class="date-lst">
  </div>
</div>
<!-- --------------------------------------- -->
<!-- schedule-graph-wrap -->  
<div class="schedule-graph-wrap">
  <div class="graph-name">
    <ul>
      <li class="th1">프로젝트 수행기간</li>
      <li class="th2">작업 전 안전교육</li>
      <li class="th3">작업 허가</li>
      <li class="th4">작업 순찰</li>
    </ul>
  </div>
  <!-- D : schedule style
1. track + "on" : When on is added, the schedule is displayed.
2. track + "on" + "one-value" : Please let it be displayed when there is only one schedule.
3. track + "on" + "start" : Please put it in at the beginning of the schedule.
4. track + "on" + "end" : Please put it in at the end of the schedule.
-->
  <div class="graph-area">
    <!-- graph-track1 -->
    <div id="GRAPH_TRACK1" class="graph-track graph-track1">

    </div>
    <div id="GRAPH_TRACK2" class="graph-track graph-track2">

    </div>
    <div id="GRAPH_TRACK3" class="graph-track graph-track3">
      
    </div>
    <div id="GRAPH_TRACK4" class="graph-track graph-track4">
      
    </div>
  </div>
</div>

<script>
$(document).ready(function(){
	// var today = new Date();
  // var thisMonth = today.getMonth(); //monthsNumber[today.getMonth()].padStart(2, '0');
  // var thisYear = today.getFullYear();
  // makeSchedule(thisMonth, thisYear);

  $('button#PREV_MONTH').click(prevMonth);
  $('button#NEXT_MONTH').click(nextMonth);
});

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = [ "일","월","화", "수", "목", "금", "토"];

function initSchedule(){
  var today = new Date();
  var thisMonth = today.getMonth(); //thisMonth+1 = realMonth;
  var thisYear = today.getFullYear();
  makeSchedule(thisMonth, thisYear);
}
function projectExecutionPeriod(data, month, year, dayTotal){
  $('#GRAPH_TRACK1 div').prop('class','track');
  var list = data.LIST;
  list.forEach(e => {
    var startTime = e.START_TIME_PROJECT.split('-');
    var startYear = Number(startTime[0]);
    var startMonth = Number(startTime[1]);
    var startDay = Number(startTime[2]);

    var endTime = e.END_TIME_PROJECT.split('-');
    var endYear = Number(endTime[0]);
    var endMonth = Number(endTime[1]);
    var endDay = Number(endTime[2]);

    //case 1
    if(startYear==year && startMonth == month && endYear==year && endMonth == month && startDay != endDay){
      //start
      if( $('div#track1-'+startDay).attr('class')=='track' ){
        $('div#track1-'+startDay).prop("class", "track on start");
        var old = $('div#track1-'+startDay+' span[class=tooltiptext]').html();
        $('div#track1-'+startDay+' span[class=tooltiptext]').html(old + " "+e.PROJECT_NAME);
      }
        
      //end
      if( $('div#track1-'+endDay).attr('class')=='track' ){
        $('div#track1-'+endDay).prop("class", "track on end");
        var old = $('div#track1-'+endDay+' span[class=tooltiptext]').html();
        $('div#track1-'+endDay+' span[class=tooltiptext]').html(old + " "+e.PROJECT_NAME);
      }
        

      for(let i =startDay+1; i< endDay;i++){
          $('div#track1-'+i).prop("class", "track on");
          var old = $('div#track1-'+i+' span[class=tooltiptext]').html();
          $('div#track1-'+i+' span[class=tooltiptext]').html(old + " "+e.PROJECT_NAME);
      }
    }

    //case 2
    if((startYear==year && startMonth == month) && (endYear>year || endMonth > month)){
      //start
      if( $('div#track1-'+startDay).attr('class')=='track' ){
        $('div#track1-'+startDay).prop("class", "track on start");
        var old = $('div#track1-'+startDay+' span[class=tooltiptext]').html();
        $('div#track1-'+startDay+' span[class=tooltiptext]').html(old + " "+e.PROJECT_NAME);
      }
        
      //end
      // if( $('div#track1-'+endDay).attr('class')=='track' ) 
      //   $('div#track1-'+endDay).prop("class", "track on end");

      for(let i =startDay+1; i< dayTotal;i++){
          $('div#track1-'+i).prop("class", "track on");
          var old = $('div#track1-'+i+' span[class=tooltiptext]').html();
        $('div#track1-'+i+' span[class=tooltiptext]').html(old + " "+e.PROJECT_NAME);
      }

      $('div#track1-'+dayTotal).prop("class", "track on end");
      var old = $('div#track1-'+dayTotal+' span[class=tooltiptext]').html();
      $('div#track1-'+dayTotal+' span[class=tooltiptext]').html(old + " "+e.PROJECT_NAME);
    }

    //case 3
    if((startYear<year || startMonth < month) && (endYear==year && endMonth == month)){
      //start
      // if( $('div#track1-'+startDay).attr('class')=='track' ) 
      //   $('div#track1-'+startDay).prop("class", "track on start");
      //end
      $('div#track1-'+1).prop("class", "track on start");
      var old = $('div#track1-'+1+' span[class=tooltiptext]').html();
      $('div#track1-'+1+' span[class=tooltiptext]').html(old + " "+e.PROJECT_NAME);

      if( $('div#track1-'+endDay).attr('class')=='track' ){
        $('div#track1-'+endDay).prop("class", "track on end");
        var old = $('div#track1-'+endDay+' span[class=tooltiptext]').html();
        $('div#track1-'+endDay+' span[class=tooltiptext]').html(old + " "+e.PROJECT_NAME);
      }
        

      for(let i =2; i< endDay;i++){
        $('div#track1-'+i).prop("class", "track on");
        var old = $('div#track1-'+i+' span[class=tooltiptext]').html();
        $('div#track1-'+i+' span[class=tooltiptext]').html(old + " "+e.PROJECT_NAME);
      }
    }

    //case 4
    if(startYear==year && startMonth == month && endYear==year && endMonth == month && startDay== endDay){
      if( $('div#track1-'+startDay).attr('class')=='track' ) {
        $('div#track1-'+startDay).prop("class", "track on one-value");
        var old = $('div#track1-'+startDay+' span[class=tooltiptext]').html();
        $('div#track1-'+startDay+' span[class=tooltiptext]').html(old + " "+e.PROJECT_NAME);
      }
    }
  });  
}

function genTrack(graphTrack, track) {
  $(graphTrack).html('');
  for (let i = 1; i <= 31; i++) {
    var content = '<div id="'+track+'-'+i+'" class="track">'
      + '<span class="bar"></span>'
      + '<span class="sr-only">'+i+'</span><span class="tooltiptext"></span>'
      + '</div>';
    $(graphTrack).append(content);
  }

}

function cleanToolTip(track){
  for(let i =1; i<= 31;i++){
        var tooltiptext = $('div#'+track+'-'+i+' span[class=tooltiptext]').html();
        if(tooltiptext.trim()==""){
          $('div#'+track+'-'+i+' span[class=tooltiptext]').remove();
        }
        
      }
}

function makeSchedule(month, year){
  var today = new Date();
  var curentDate = today.getDate();
  var companyId = $('#SELECTED_COMPANY_ID').val();
  
  $('strong#YEAR').html(year);
  $('strong#MONTH').html((month+1).toString().padStart(2, '0'));

  $("div#DATE_LIST").html(''); 
  var dayTotal = daysInMonth(month+1, year);

  genTrack("#GRAPH_TRACK1", "track1");
  genTrack("#GRAPH_TRACK2", "track2");
  genTrack("#GRAPH_TRACK3", "track3");
  genTrack("#GRAPH_TRACK4", "track4");
  var param = {"COMPANY_ID": companyId, "SEARCH_YEAR":year, "SEARCH_MONTH": month+1};
  var data1 = _sys.mariaDB.getData(CTX + '/com/com_0102/getProjectsByCompanyId.ajax', param);
  projectExecutionPeriod(data1, month+1, year, dayTotal);

  var data2 = _sys.mariaDB.getData(CTX + '/sft/sft_0201/getALlByCompanyId.ajax', param);
  safetyTraining(data2, month+1, year, dayTotal);

  var data3 = _sys.mariaDB.getData(CTX + '/tsk/tsk_0100/getLicenseListByCompanyId.ajax', param);
  workPermit(data3, month+1, year, dayTotal);

  var data4 = _sys.mariaDB.getData(CTX + '/sft/sft_0701/searchAllByCompanyId.ajax', param);
  workPatrol(data4, month+1, year, dayTotal);
  
  cleanToolTip("track1");
  cleanToolTip("track2");
  cleanToolTip("track3");
  cleanToolTip("track4");

  
  for (let date = 1; date <= dayTotal ; date++) {
    monthTxt = months[month];
    var thisDate =new Date(monthTxt+' '+date+', '+year +' GMT');//date
    //console.log(thisDate.getDay()+'///'+thisDate.getDate());
    if(datecompare(thisDate,"===",today)){
      var sample = 
      '<div class="day today">'
      +  '<span>'+days[thisDate.getDay()]+'</span>'
      +  '<span class="num">'+thisDate.getDate()+'</span>'
      +'</div>';
      $("div#DATE_LIST").append(sample);
      continue;
    }
    if(datecompare(thisDate,">",today)){
      var sample = 
      '<div class="day">'
      +  '<span>'+days[thisDate.getDay()]+'</span>'
      +  '<span class="num">'+thisDate.getDate()+'</span>'
      +'</div>';
      $("div#DATE_LIST").append(sample);
    }
    if(!datecompare(thisDate,">",today)){
      var sample = 
      '<div class="day disabled">'
      +  '<span>'+days[thisDate.getDay()]+'</span>'
      +  '<span class="num">'+thisDate.getDate()+'</span>'
      +'</div>';
      $("div#DATE_LIST").append(sample);
    }
  }
}

function safetyTraining(data, month, year, dayTotal) { 
  $('#GRAPH_TRACK2 div').prop('class','track');
  var list = data.LIST;
  list.forEach(e => {
    var startTime = e.COURSE_DATE.split('-');
    var startYear = Number(startTime[0]);
    var startMonth = Number(startTime[1]);
    var startDay = Number(startTime[2]);

    $('div#track2-'+startDay).prop("class", "track on one-value");
    var old = $('div#track2-'+startDay+' span[class=tooltiptext]').html();
    $('div#track2-'+startDay+' span[class=tooltiptext]').html(old + " "+e.DOC_NO);
  });
}

function workPermit(data, month, year, dayTotal) { 
  $('#GRAPH_TRACK3 div').prop('class','track');
  var list = data.LIST;
  list.forEach(e => {
    var startTime = e.WORK_DATE.split('-');
    var startYear = Number(startTime[0]);
    var startMonth = Number(startTime[1]);
    var startDay = Number(startTime[2]);

    $('div#track3-'+startDay).prop("class", "track on one-value");
    var old = $('div#track3-'+startDay+' span[class=tooltiptext]').html();
    $('div#track3-'+startDay+' span[class=tooltiptext]').html(old + " "+e.FIRST_WORK_CONTENT);
  });
}

function workPatrol(data, month, year, dayTotal) { 
  $('#GRAPH_TRACK4 div').prop('class','track');
  var list = data.LIST;
  list.forEach(e => {
    var startTime = e.CHECK_DATE.split('-');
    var startYear = Number(startTime[0]);
    var startMonth = Number(startTime[1]);
    var startDay = Number(startTime[2]);

    $('div#track4-'+startDay).prop("class", "track on one-value");
    var old = $('div#track4-'+startDay+' span[class=tooltiptext]').html();
    $('div#track4-'+startDay+' span[class=tooltiptext]').html(old + " "+e.PROJECT_NAME);
  });
}

function datecompare(date1, sign, date2) {
    var day1 = date1.getDate();
    var mon1 = date1.getMonth();
    var year1 = date1.getFullYear();
    var day2 = date2.getDate();
    var mon2 = date2.getMonth();
    var year2 = date2.getFullYear();
    if (sign === '===') {
        if (day1 === day2 && mon1 === mon2 && year1 === year2) return true;
        else return false;
    }
    else if (sign === '>') {
        if (year1 > year2) return true;
        else if (year1 === year2 && mon1 > mon2) return true;
        else if (year1 === year2 && mon1 === mon2 && day1 > day2) return true;
        else return false;
    }    
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function prevMonth(){
  var oldYear = Number($('strong#YEAR').html());
  var oldMonth = Number($('strong#MONTH').html());
  if(oldMonth==1){
    makeSchedule(11, oldYear-1);
  }else{
    makeSchedule(oldMonth-2, oldYear);
  }
  
  makeChart();
  getAccidentAnalysis();
}

function nextMonth(){
  var oldYear = Number($('strong#YEAR').html());
  var oldMonth = Number($('strong#MONTH').html());
  if(oldMonth==12){
    makeSchedule(0, oldYear+1);
  }else{
    makeSchedule(oldMonth, oldYear);
  }
  
  makeChart();
  getAccidentAnalysis();
}
</script>