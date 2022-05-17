<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<main id="content" class="clearfix">
  <section class="section1">
    <div class="total-cont1">
      <h2 class="sub-tit">업체별 수행 프로젝트</h2>
      <!-- D : If there's a new registration -> add class "new" -->
      <p class="update-txt">오늘 새로 추가 된<br>프로젝트가<span><em id="id_num_project_today">0</em>건</span>있습니다.</p>
      <div class="chart-info">
        <span class="tit">총 수행 프로젝트</span>
        <span class="num"><em id="id_num_project_all">3</em>건</span>
      </div>
      <div class="chart-box" id="id_chart_box_project">
        <!-- D : "example1,2,3" I temporarily put it in. -->
        <div class="example1"></div>
        <div class="example2"></div>
        <div class="example3"></div>
        <div class="example1"></div>
        <div class="example2"></div>
      </div>
      <div class="chart-detail">
        <ul id="id_chart_detail_project">
        </ul>
      </div>
    </div>

    <div class="total-cont2">
      <h2 class="sub-tit">투입인력</h2>
      <!-- D : If there's a new registration -> add class "new" -->
      <p class="update-txt new">오늘 새로 추가 된<br>투입인력이<span><em id="id_num_emp_today">2</em>명</span>이 있습니다.</p>
      <div class="chart-box">
        <!-- D : I temporarily added the background color. Please delete it after checking it. -->
        <div class="circle-chart-box" style="background: #b5cec8;">
          <div class="chart-txt">
            <span class="tit">총 투입인력</span>
            <span class="num"><em id="id_num_emp_all">20</em>명</span>
          </div>
        </div>
      </div>
      <div class="chart-detail">
        <ul id="id_chart_detail_emp">
          <li>
            <span class="tit">윈디텍</span>
            <div class="inner">
              <span class="total"><em>10</em>명</span>
              <span class="per"><em>50</em>%</span>
            </div>
          </li>
          <li>
            <span class="tit">금화PSC</span>
            <div class="inner">
              <span class="total"><em>5</em>명</span>
              <span class="per"><em>25</em>%</span>
            </div>
          </li>
          <li>
            <span class="tit">로맥스</span>
            <div class="inner">
              <span class="total"><em>5</em>명</span>
              <span class="per"><em>25</em>%</span>
            </div>
          </li>
          <li>
            <span class="tit">윈디텍</span>
            <div class="inner">
              <span class="total"><em>5</em>명</span>
              <span class="per"><em>25</em>%</span>
            </div>
          </li>
          <li>
            <span class="tit">금화PSC</span>
            <div class="inner">
              <span class="total"><em>5</em>명</span>
              <span class="per"><em>25</em>%</span>
            </div>
          </li>
          <li>
            <span class="tit">로맥스</span>
            <div class="inner">
              <span class="total"><em>5</em>명</span>
              <span class="per"><em>25</em>%</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section2">
    <div class="header-cont">
      <div class="header-cont-wrap">
        <h1 id="SELECTED_COMPANY" class="header-tit">윈디텍(주)</h1>
        <button class="select-btn"></button>
        
      </div>
      <div class="company-select">
        <ul id="ROW_COMPANY">
          <li onclick="helloYukki();"><a href="javascript:void(0);">금화PSC</a></li>
          <li><a href="javascript:void(0);" onclick="helloYukki();">로맥스</a></li>
          <li><a href="javascript:void(0);">케이윈드</a></li>
          <li><a href="javascript:void(0);">윈드트리</a></li>
          <li><a href="javascript:void(0);">회사명</a></li>
          <li><a href="javascript:void(0);">회사명</a></li>
          <li><a href="javascript:void(0);">회사명</a></li>
          <li><a href="javascript:void(0);">회사명</a></li>
          <li><a href="javascript:void(0);">회사명</a></li>
        </ul>
      </div>
      
    </div>
    <div>
    	<input hidden="true" id="SELECTED_COMPANY_ID" />
    	<c:set var="msg_and"><spring:message code="txt.and"/></c:set>
		<input id="id_msg_and" type="hidden" value="${msg_and}"/>
	    <c:set var="msg_other"><spring:message code="txt.other"/></c:set>
	    <input id="id_msg_other" type="hidden" value="${msg_other}"/>
    </div>

    <!-- sub-cont1 -->
    <div class="sub-cont sub-cont1">
      <div class="tit-area">
        <h2 class="sub-tit">스케줄 관리</h2>
      </div>
      <div class="schedule-area">
        <!-- schedule-date-wrap -->
        <!-- --------------------------------------- -->
        <!-- schedule-graph-wrap -->
        <jsp:include page="dsb_010001.jsp"/>
      </div>
    </div>

    <div class="sub-cont-wrap">
      <!-- sub-cont2 -->
      <div class="sub-cont sub-cont2">
        <div class="tit-area">
          <h2 class="sub-tit">작업 위험성 평가</h2>
        </div>
        <div class="work-risk-assessment">
          <ul class="value-bar value-bar1">
            <li style="background: #87c7bd;">
              <em class="num count" data-count="2163">2163</em>
            </li>
            <li style="background: #ffd249;">
              <em class="num count" data-count="128">128</em>
            </li>
            <li style="background: #ff6934;">
              <em class="num count" data-count="96">96</em>
            </li>
            <li class="total-value count" data-count="2387">2387</li>

          </ul>
          <ul class="value-bar value-bar2">
            <li style="background: #4e958a;">
              <em class="num count" data-count="28">28</em>
            </li>
            <li style="background: #e99f00;">
              <em class="num count" data-count="16">16</em>
            </li>
            <li style="background: #e44b15;">
              <em class="num count" data-count="9">9</em>
            </li>
            <li class="total-value count" data-count="53">53</li>
          </ul>
          <div class="value-box-wrap">
            <small class="x-axis">빈도 (LIKELIHOOD)</small>
            <small class="y-axis">결과 (CONSEQUENCES)</small>
            <ul class="value-box">
              <!-- D :  type color 
              1. LOW - type1 : #87c7bd
              2. MEDIUM - type2 : #ffd249
              3. HIGH - tyep3 : #ff6934
              -->
              <li class="x-num-axis y-num-axis type3">
                <em class="num count" data-count="1">1</em>
                <span>LOW</span>
              </li>
              <li class="x-num-axis  type3">
                <em class="num count" data-count="4">4</em>
                <span>HIGH</span>
              </li>
              <li class="x-num-axis type3">
                <em class="num count" data-count="32">32</em>
                <span>HIGH</span>
              </li>
              <li class="x-num-axis type3">
                <em class="num count" data-count="5">5</em>
                <span>HIGH</span>
              </li>
              <li class="x-num-axis type3">
                <em class="num count" data-count="7">7</em>
                <span>HIGH</span>
              </li>
              <li class="y-num-axis type2">
                <em class="num count" data-count="10">10</em>
                <span>MEDIUM</span>
              </li>
              <li class="type2">
                <em class="num count" data-count="4">4</em>
                <span>MEDIUM</span>
              </li>
              <li class="type3">
                <em class="num count" data-count="36">36</em>
                <span>HIGH</span>
              </li>
              <li class="type3">
                <em class="num count" data-count="1">1</em>
                <span>HIGH</span>
              </li>
              <li class="type3">
                <em class="num count" data-count="2">2</em>
                <span>HIGH</span>
              </li>
              <li class="y-num-axis type1">
                <em class="num count" data-count="1">1</em>
                <span>LOW</span>
              </li>
              <li class="type2">
                <em class="num count" data-count="11">11</em>
                <span>MEDIUM</span>
              </li>
              <li class="type2">
                <em class="num count" data-count="83">83</em>
                <span>MEDIUM</span>
              </li>
              <li class="type2">
                <em class="num count" data-count="7">7</em>
                <span>MEDIUM</span>
              </li>
              <li class="type2">
                <em class="num count" data-count="2">2</em>
                <span>MEDIUM</span>
              </li>
              <li class="y-num-axis type1">
                <em class="num count" data-count="0">0</em>
                <span>LOW</span>
              </li>
              <li class="type1">
                <em class="num count" data-count="13">13</em>
                <span>LOW</span>
              </li>
              <li class="type1">
                <em class="num count" data-count="422">422</em>
                <span>LOW</span>
              </li>
              <li class="type2">
                <em class="num count" data-count="3">3</em>
                <span>MEDIUM</span>
              </li>
              <li class="type2">
                <em class="num count" data-count="1">1</em>
                <span>MEDIUM</span>
              </li>
              <li class="y-num-axis type1">
                <em class="num count" data-count="5">5</em>
                <span>LOW</span>
              </li>
              <li class="type1">
                <em class="num count" data-count="10">10</em>
                <span>LOW</span>
              </li>
              <li class="type1">
                <em class="num count" data-count="1687">1687</em>
                <span>LOW</span>
              </li>
              <li class="type1">
                <em class="num count" data-count="6">6</em>
                <span>LOW</span>
              </li>
              <li class="type1">
                <em class="num count" data-count="2">2</em>
                <span>LOW</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- sub-cont3 -->
      <div class="sub-cont sub-cont3">
        <div class="tit-area both">
          <h2 class="sub-tit">사고분석</h2>
          <!-- tab menu -->
          <ul class="tab-menu clearfix">
            <li tab="tab1" class="current">
              <a href="javascript:void(0);">발생 이력</a>
            </li>
            <li tab="tab2">
              <a href="javascript:void(0);">리스트</a>
            </li>
          </ul>
          <!-- //tab menu -->
        </div>

        <!-- tab-content1 -->
        <div class="tab-content current" tab="tab1">
          <div class="tab-graph-area">
            <ul class="legend">
              <li class="item1"><i class="color"></i><span>Hazard</span></li>
              <li class="item2"><i class="color"></i><span>Near Miss</span></li>
              <li class="item3"><i class="color"></i><span>Injury</span></li>
            </ul>
            <div class="graph-box" id="chart_div">
            	<!-- <div id="chart_div" style="width: auto;height: 100%;"></div>  -->
              <!-- <span class="axis x-axis">빈도 (LIKELIHOOD)</span>
              <span class="axis y-axis">날짜 (DATE)</span>
              <em
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); text-decoration: underline; font-weight: 700;">This
                is the area
                where the graph goes in.</em> -->
            </div>
          </div>
        </div>

        <!-- tab-content2 -->
        <div class="tab-content" tab="tab2">
          <div class="bar-top"></div>
          <!-- tab-list-table -->
          <div class="tab-list-table" id="id_tab_list_table_accident">

          </div>
          <!-- // tab-list-table -->
        </div>

      </div>
    </div>
  </section>
</main>

<!-- Popup Sample Area-->
<div id="popup"></div>

<script src="${ctxPath}/script/dashboard/dsb_0100.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

<script type="text/javascript">
	var _timezone = '${CLIENT_ACCESS_TIMEZONE}';
	
	var reportTypeArr = new Array();
	<c:forEach items="${reportTypes}" var="reportType" varStatus="status"> 
	    obj = new Object();
	    obj.COMM_NM = "${reportType.COMM_NM}";
	    obj.COMM_CD = "${reportType.COMM_CD}";

	    reportTypeArr.push(obj);
	</c:forEach> 

	
	$(document).ready(function() {	
		console.log("reportTypeArr", reportTypeArr)
		dsb0100();
	});	
	
</script>
