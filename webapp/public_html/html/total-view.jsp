<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
		
		<!-- view start -->
		
		  <!-- progress-header -->
		  <div class="progress-wrap">
		    <ul class="clearfix progress-box">
		      <li class="step01">
		        <span><i class="xi-warning"></i>SCADA Error</span>
		      </li>
		      <li class="step02">
		        <span><i class="xi-documents"></i>Planning</span>
		      </li>
		      <li class="step03">
		        <span><i class="xi-wrench"></i>Operating</span>
		      </li>
		      <li class="step04">
		        <span><i class="xi-file-check"></i>Complete</span>
		      </li>
		    </ul>
		  </div>
		  <!-- //progress-header -->
  		
  		
		<div class="container view-contain">
		
		<!-- section1 -->
		<section class="view-section view-section1">
			<div class="inner">
				<div class="tit-wrap">
					<h2 class="heading13">
						<span class="txt">#010102103</span>
					</h2>
					<span class="sub-heading">
						<span class="tit">External RPM guard</span>
						<em class="sub">This error is generated if the phase sequence on the grid is not correct.</em>
					</span>
				</div>
				<div class="data-info-wrap">
					<div class="current-position">
						<strong class="location">V47</strong>
						<span class="location-name">HANGWON > Group01 ><strong> V47</strong></span>
					</div>
					<div class="current-weather">
						<span class="heading5 tit">Weather</span>
						<ul class="weather-cont">
							<li>
								<span class="case case01">
									<strong class="min">20°</strong>
									<strong class="max">22°</strong>
								</span>
							</li>
							<li>
								<strong class="case case02">1.5mm</strong>
							</li>
							<li>
								<strong class="case case03">2m/s</strong>
							</li>
						</ul>
					</div>
				</div>
			</div>
		
			<article>
				<span class="mark mark1">Sensor Position</span>
				<div class="position-area">
					<ul>
						<li class="area1">
							<span class="point">
								<span class="tooltip">b1_r_flap</span>
							</span>
							<img alt="sensor이미지-1" src="../../img/sub/sensor1.png">
						</li>
						<li class="area2">
							<span class="point point-1">
								<span class="tooltip">Metmast_boom_w_direction_96_31</span>
							</span>
							<span class="point point-2">
								<span class="tooltip">Ctr_Nac_r_azimuth_angle</span>
							</span>
							<span class="point point-3">
								<span class="tooltip">Ctr_Nac_r_azimuth_angle</span>
							</span>
							<img alt="sensor이미지-2" src="../../img/sub/sensor2.png">
						</li>
						<li class="area3">
							<img alt="sensor이미지-3" src="../../img/sub/sensor3.png">
						</li>
					</ul>
				</div>
			</article>
			<article>
				<span class="mark mark2">Sensor Monitoring</span>

				<div class="monitor-wrap"> 
					<span class="btn-right">
						<a href="javascript:void(0);" class="btn-style refresh-btn"><i class="xi-refresh"><span class="sr-only">refresh 버튼</span></i></a>
						<a href="javascript:void(0);" class="btn-style shot-btn">Snapshot</a>
					</span>
					<div class="monitor-lst-wrap">
						<ul class="monitor-lst">
							<li class="style1 type2">
								<span>b1_r_flap</span>
								
								<!-- 센서별 툴팁 -->
								<div class="sen-tooltip">
									<p>위치 : <span>BLADE1 - ROOT</span></p>
									<p>측정 항목 : <span>하중(LOAD)-FLAP</span></p>
									<p>측정 단위 : <span>Nm</span></p>
								</div>
								<!-- //센서별 툴팁 -->
							</li>
							<li class="style2">
								<span>Ctr_Nac_r_azimuth_angle</span>
								<!-- 센서별 툴팁 -->
								<div class="sen-tooltip">
									<p>위치 : <span>BLADE1 - ROOT</span></p>
									<p>측정 항목 : <span>하중(LOAD)-FLAP</span></p>
									<p>측정 단위 : <span>Nm</span></p>
								</div>
								<!-- //센서별 툴팁 -->
							</li>
							<li class="style3 type2">
								<span>Metmast_boom_w_direction_96_31</span>
								<!-- 센서별 툴팁 -->
								<div class="sen-tooltip">
									<p>위치 : <span>BLADE1 - ROOT</span></p>
									<p>측정 항목 : <span>하중(LOAD)-FLAP</span></p>
									<p>측정 단위 : <span>Nm</span></p>
								</div>
								<!-- //센서별 툴팁 -->
							</li>
							<li class="style4">
								<span>Ctr_Nac_azimuth_angle</span>
								<!-- 센서별 툴팁 -->
								<div class="sen-tooltip">
									<p>위치 : <span>BLADE1 - ROOT</span></p>
									<p>측정 항목 : <span>하중(LOAD)-FLAP</span></p>
									<p>측정 단위 : <span>Nm</span></p>
								</div>
								<!-- //센서별 툴팁 -->
							</li>
							<li class="add"><span class="sr-only">추가버튼</span></li>
						</ul>
					</div>
					<!-- Sensor Monitoring graph -->
					<div class="monitor-graph-box">
						<div class="monitor-legend-wrap">
							<span class="legend-item1">Occurrence</span>
							<span class="legend-item2">Counterplan</span>
							<span class="legend-item3">Result Report</span>
						</div>
						
						<p style="position: absolute; top: 50%; left: 50%; transform:translate(-50%, -50%); font-weight: 800;">
						 Sensor Monitoring 그래프 영역입니다.</p>
					</div>
					<!-- //Sensor Monitoring graph -->
				</div>
			</article>
			
		</section>
		<!-- //section1 -->
		
		<!-- section2 -->
		<section class="view-section view-section2">
			<div class="tit-wrap">
				<h2 class="heading13">
					<span class="txt">Planning (1)</span>
				</h2>
				<div class="new-checkbox-custom">
					<input type="checkbox" class="" id="no_plan">
					<label for="no_plan">No plan</label>
				</div>
			</div>
			
			<article>
				<span class="mark mark1">Plan Record List</span>
				 
				<!-- plan-lst-wrap -->
				<div class="plan-lst-wrap">
					<ul class="plan-lst">
						<li class="">
							<div class="plan-lst-info-wrap">
								<div class="plan-info-wrap">
									<div class="new-checkbox-custom">
										<input type="radio" name="radio" id="radio1">
										<label for="radio1">행원풍력발전단지 유지보수 용역</label>
									</div>
									<span class="plan-info">
										<strong>Maintenance for Hangwon Wind Farm</strong>
										<!-- <em>Temp</em> -->
									</span>
								</div>
		
								<span class="plan-etc">
									<em>2020.04.03</em>
									<a href="javascript:void(0);" class="plan-modify">
										<span class="sr-only">paln modify</span>
										<i class="xi-pen"></i>
									</a>
								</span>
							</div>
							<a href="javascript:void(0);" class="plan-Confirm">Confirm</a>
						</li>
						<li>
							<div class="plan-lst-info-wrap">
								<div class="plan-info-wrap">
									<div class="new-checkbox-custom">
										<input type="radio" name="radio" id="radio2">
										<label for="radio2">행원풍력발전단지 유지보수 용역</label>
									</div>
									<span class="plan-info">
										<strong>Maintenance for Hangwon Wind Farm</strong>
										<!-- <em>Temp</em> -->
									</span>
								</div>
		
								<span class="plan-etc">
									<em>2020.04.03</em>
									<a href="javascript:void(0);" class="plan-modify">
										<span class="sr-only">paln modify</span>
										<i class="xi-pen"></i>
									</a>
								</span>
							</div>
							<a href="javascript:void(0);" class="plan-Confirm">Confirm</a>
						</li>
						<li>
							<div class="plan-lst-info-wrap">
								<div class="plan-info-wrap">
									<div class="new-checkbox-custom">
										<input type="radio" name="radio" id="radio3">
										<label for="radio3">행원풍력발전단지 유지보수 용역</label>
									</div>
									<span class="plan-info">
										<strong>Maintenance for Hangwon Wind Farm</strong>
										<!-- <em>Temp</em> -->
									</span>
								</div>
		
								<span class="plan-etc">
									<em>2020.04.03</em>
									<a href="javascript:void(0);" class="plan-modify">
										<span class="sr-only">paln modify</span>
										<i class="xi-pen"></i> 
									</a>
								</span>
							</div>
							<a href="javascript:void(0);" class="plan-Confirm">Confirm</a>
						</li>
					</ul>
				</div>
				<!-- //plan-lst-wrap -->
				
			</article>
			
			<article>
				<span class="mark mark2">New Plan List (플랜 작성 전 & 비활성화)</span>
				<div class="new-form-warp">
					<!-- 플랜 작성 전 단계 -->
					<div class="disabled">
						<em> 
							<span class="disabled-txt">Create a corresponding maintenance plan.</span>
							<a href="javascript:void(0);" class="btn-style btn-style1">Report Plan</a>
						</em>
					</div>
					<!-- //플랜 작성 전 단계 -->
					
					<!-- 플랜 작성 비활성화 (class='no-plan'추가) -->
					<div class="disabled no-plan">
						<em> 
							<span class="disabled-txt">Create a corresponding maintenance plan.</span>
							<a href="javascript:void(0);" class="btn-style btn-style1">Report Plan</a>
						</em>
					</div>
					<!-- //플랜 작성 비활성화  -->
				</div> 
			</article>
			
			<article>
				<span class="mark mark2">New Plan List (플랜 추가했을때)</span>
				
				<!-- new plan-lst-wrap 플랜 추가했을때 -->
				<div class="plan-lst-wrap">
					<ul class="plan-lst">
						<li class="">
							<div class="plan-lst-info-wrap">
								<div class="plan-info-wrap">
									<div class="new-checkbox-custom">
										<input type="radio" name="radio" id="radio4">
										<label for="radio4">행원풍력발전단지 유지보수 용역</label>
									</div>
									<span class="plan-info">
										<strong>Maintenance for Hangwon Wind Farm</strong>
										<!-- <em>Temp</em> -->
									</span>
								</div>
		
								<span class="plan-etc">
									<em>2020.04.03</em>
									<a href="javascript:void(0);" class="plan-modify">
										<span class="sr-only">paln modify</span>
										<i class="xi-pen"></i>
									</a>
								</span>
							</div>
							<a href="javascript:void(0);" class="plan-Confirm">Confirm</a>
						</li>
						<li>
							<div class="plan-lst-info-wrap">
								<div class="plan-info-wrap">
									<div class="new-checkbox-custom">
										<input type="radio" name="radio" id="radio5">
										<label for="radio5">행원풍력발전단지 유지보수 용역</label>
									</div>
									<span class="plan-info">
										<strong>Maintenance for Hangwon Wind Farm</strong>
										<!-- <em>Temp</em> -->
									</span>
								</div>
		
								<span class="plan-etc">
									<em>2020.04.03</em>
									<a href="javascript:void(0);" class="plan-modify">
										<span class="sr-only">paln modify</span>
										<i class="xi-pen"></i>
									</a>
								</span>
							</div>
							<a href="javascript:void(0);" class="plan-Confirm">Confirm</a>
						</li>
					</ul>
				</div>
				<!-- //new plan-lst-wrap 플랜 추가했을때  -->
			</article>
		</section>

		<section class="view-section view-section2">
			<div class="tit-wrap">
				<h2 class="heading13">
					<span class="txt">Planning (2)</span>
				</h2>
				<span class="sub-heading">
					<span class="tit">11 vibration sensors and speed measurement</span>
					<em class="sub">A Study on the Maintenance Plan Considering Maintenance Cycle of Wind Turbine Component</em>
				</span>
			</div>
			
			<article>
				<span class="mark mark1">Plan Info</span>
				<div style="overflow: hidden;">
					<ul class="plan-form-lst">
						<li>
							<strong class="tit">WTG Name :</strong>
							<span>V47</span>
						</li>
						<li>
							<strong class="tit">Estimated Down Time :</strong>
							<span>2021-02-01  15:00:00 ~ 2021-02-09  15:00:00</span>
							<strong class="badge">58h</strong>
						</li>
						<li class="plan-cost">
							<strong class="tit">Cost :</strong>
							<span>Parts purchase<strong class="value">0</strong></span>
							<span>Work input<strong class="value">900,000</strong><strong class="badge">900,000</strong></span>
						</li>
					</ul>
				</div>
			</article>
			
			<article>
				<span class="mark mark1">Plan Schedule</span>
				
				<!-- plan-schedule-box -->
				<div class="plan-schedule-box">
					<div class="plan-legend-wrap">
						<span class="legend-item1">Parts in stock</span>
						<span class="legend-item2">Parts in stock</span>
					</div>
					<p style="position: absolute; top: 50%; left: 50%; transform:translate(-50%, -50%); font-weight: 800;">
						plan-schedule 영역입니다.</p>
				</div>
				<!-- //plan-schedule-box -->
			</article>
		</section>
		<!-- //section2 -->
		
		<!-- section3 -->
		<section class="view-section view-section3">
			<div class="tit-wrap">
				<h2 class="heading13">
					<span class="txt">Operating (1)</span>
				</h2>
				<span class="badge">+3</span>
			</div>

			<article>
				<span class="mark mark1">Report Record List</span>
				
				<!-- report record list wrap -->
				<div>
			         <div class="base_grid_table btn-table">
			             <table>
			               <caption>SCADA Alarm - No, Progress, Data, Alarm code, Description, Manual, Report</caption>
			               <colgroup>
			                 <col style="width:5%">
			                 <col style="width:10%">
			                 <col style="width:15%">
			                 <col style="width:35%">
			                 <col style="width:5%">
			                 <col style="width:17%">
			                 <col style="width:8%">
			                 <col style="width:5%">
			               </colgroup>
			               <thead>
			                 <tr>
			                   <th scope="col">No</th>
			                   <th scope="col">Alarm code</th>
			                   <th scope="col">Report number</th>
			                   <th scope="col">Report name</th>
			                   <th scope="col">Author</th>
			                   <th scope="col">Date</th>
			                   <th scope="col">Process</th>
			                   <th scope="col">Report</th>
			                 </tr>
			               </thead>
			               <tbody>
			                 <tr>
			                   <td>3</td>
			                   <td>010101163</td>
			                   <td>20200824020256006</td>
			                   <td>010101163_체크리스트_2</td>
			                   <td>admin</td>
			                   <td>2020-0824T02:01:56</td>
       			               <td>Complete</td>
							   <td>
			                     <a href="javascript:void(0);" class="download-btn">
									<i class="xi-download"></i>
								</a>
			                   </td>
			                 </tr>
			                 <tr>
			                   <td>2</td>
			                   <td>010101163</td>
			                   <td>20200824020256006</td>
			                   <td>점검보고서_Yaw system inspection</td>
			                   <td>admin</td>
			                   <td>2020-0824T02:01:56</td>
       			               <td>Complete</td>
							   <td>
			                     <a href="javascript:void(0);" class="download-btn">
									<i class="xi-download"></i>
								</a>
			                   </td>
			                 </tr>
       			             <tr>
			                   <td>1</td>
			                   <td>010101163</td>
			                   <td>20200824020256006</td>
			                   <td>알람코드있는 체크리스트</td>
			                   <td>admin</td>
			                   <td>2020-0824T02:01:56</td>
       			               <td>Complete</td>
							   <td>
			                     <a href="javascript:void(0);" class="download-btn">
									<i class="xi-download"></i>
								</a>
			                   </td>
			                 </tr>
			               </tbody>
			             </table>
			         </div>		
				</div>
				<!-- //report record list wrap -->
			</article>
			
			<article>
				<span class="mark mark2">New Report List(새로운 Report 작성)</span>
				<div class="new-form-warp">
					<!-- 레포트 작성 전 단계 -->
					<div class="disabled">
						<em> 
							<span class="disabled-txt">Write a report of the maintenance results.</span>
							<a href="javascript:void(0);" class="btn-style btn-style1">Report registration</a>
						</em>
					</div>
					<!-- //레포트 작성 전 단계 -->
				</div> 
			</article>
		</section>
		
		
		<section class="view-section view-section3">
			<div class="tit-wrap">
				<h2 class="heading13">
					<span class="txt">Operating (2)</span>
				</h2>
				<span class="badge">+3</span>
				<a href="javascript:void(0);" class="btn-style btn-style1 approval-btn">Approval</a>
			</div>

			<article> 
				<span class="mark mark1">Report Record List</span>
				
				<!-- report list wrap -->
				<div>
			         <div class="base_grid_table btn-table oper-report-lst">
			             <table>
			               <caption>Report List - No, Alarm code, Report ,number, Report, name, Author, Date, Process, Report</caption>
			               <colgroup>
			            	 <col style="width:3%">
			                 <col style="width:5%">
			                 <col style="width:10%">
			                 <col style="width:15%">
			                 <col style="width:32%">
			                 <col style="width:5%">
			                 <col style="width:17%">
			                 <col style="width:8%">
			                 <col style="width:5%">
			               </colgroup>
			               <thead>
			                 <tr>
		                	   <th scope="col"></th>
			                   <th scope="col">No</th>
			                   <th scope="col">Alarm code</th>
			                   <th scope="col">Report number</th>
			                   <th scope="col">Report name</th>
			                   <th scope="col">Author</th>
			                   <th scope="col">Date</th>
			                   <th scope="col">Process</th>
			                   <th scope="col">Report</th>
			                 </tr>
			               </thead>
			               <tbody>
			                 <tr>
			                   <td>
			                   	  <div class="new-checkbox-custom">
									<input type="checkbox" name="checkbox" id="chk_1">
									<label for="chk_1"></label> 
								  </div>
			                   </td>
			                   <td>3</td>
			                   <td>010101163</td>
			                   <td>20200824020256006</td>
			                   <td>010101163_체크리스트_2</td>
			                   <td>admin</td>
			                   <td>2020-0824T02:01:56</td>
       			               <td>Complete</td>
							   <td>
			                     <a href="javascript:void(0);" class="download-btn">
									<i class="xi-download"></i>
								</a>
			                   </td>
			                 </tr>
			                 <tr>
			                   <td>
			                   	  <div class="new-checkbox-custom">
									<input type="checkbox" name="checkbox" id="chk_2">
									<label for="chk_2"></label>
								  </div>
			                   </td>
			                   <td>2</td>
			                   <td>010101163</td>
			                   <td>20200824020256006</td>
			                   <td>점검보고서_Yaw system inspection</td>
			                   <td>admin</td>
			                   <td>2020-0824T02:01:56</td>
       			               <td>Complete</td>
							   <td>
			                     <a href="javascript:void(0);" class="download-btn">
									<i class="xi-download"></i>
								</a>
			                   </td>
			                 </tr>
       			             <tr>
       			               <td>
       			               	  <div class="new-checkbox-custom">
									<input type="checkbox" name="checkbox" id="chk_3">
									<label for="chk_3"></label>
								  </div>
       			               </td>
			                   <td>1</td>
			                   <td>010101163</td>
			                   <td>20200824020256006</td>
			                   <td>알람코드있는 체크리스트</td>
			                   <td>admin</td>
			                   <td>2020-0824T02:01:56</td>
       			               <td>Complete</td>
							   <td>
			                     <a href="javascript:void(0);" class="download-btn">
									<i class="xi-download"></i>
								</a>
			                   </td>
			                 </tr>
			               </tbody>
			             </table>
			         </div>		
				</div>
				<!-- //report list wrap -->
			</article>
			
			<article>
				<span class="mark mark2">New Report List</span>
	
				<!-- New Report List wrap -->
				<div>
			         <div class="base_grid_table btn-table oper-report-lst">
			             <table>
			               <caption>New Report List - No, Alarm code, Report ,number, Report, name, Author, Date, Process, Report</caption>
			               <colgroup>
			            	 <col style="width:3%">
			                 <col style="width:5%">
			                 <col style="width:10%">
			                 <col style="width:15%">
			                 <col style="width:32%">
			                 <col style="width:5%">
			                 <col style="width:17%">
			                 <col style="width:8%">
			                 <col style="width:5%">
			               </colgroup>
			               <thead>
			                 <tr>
		                	   <th scope="col"></th>
			                   <th scope="col">No</th>
			                   <th scope="col">Alarm code</th>
			                   <th scope="col">Report number</th>
			                   <th scope="col">Report name</th>
			                   <th scope="col">Author</th>
			                   <th scope="col">Date</th>
			                   <th scope="col">Process</th>
			                   <th scope="col">Report</th>
			                 </tr>
			               </thead>
			               <tbody>
			                 <tr>
			                   <td>
			                   	  <div class="new-checkbox-custom">
									<input type="checkbox" name="checkbox" id="chk_4">
									<label for="chk_4"></label> 
								  </div>
			                   </td>
			                   <td>3</td>
			                   <td>010101163</td>
			                   <td>20200824020256006</td>
			                   <td>010101163_체크리스트_2</td>
			                   <td>admin</td>
			                   <td>2020-0824T02:01:56</td>
       			               <td>Complete</td>
							   <td>
			                     <a href="javascript:void(0);" class="download-btn">
									<i class="xi-download"></i>
								</a>
			                   </td>
			                 </tr>
			                 <tr>
			                   <td>
			                   	  <div class="new-checkbox-custom">
									<input type="checkbox" name="checkbox" id="chk_5">
									<label for="chk_5"></label>
								  </div>
			                   </td>
			                   <td>2</td>
			                   <td>010101163</td>
			                   <td>20200824020256006</td>
			                   <td>점검보고서_Yaw system inspection</td>
			                   <td>admin</td>
			                   <td>2020-0824T02:01:56</td>
       			               <td>Complete</td>
							   <td>
			                     <a href="javascript:void(0);" class="download-btn">
									<i class="xi-download"></i>
								</a>
			                   </td>
			                 </tr>
       			             <tr>
       			               <td>
       			               	  <div class="new-checkbox-custom">
									<input type="checkbox" name="checkbox" id="chk_6">
									<label for="chk_6"></label>
								  </div>
       			               </td>
			                   <td>1</td>
			                   <td>010101163</td>
			                   <td>20200824020256006</td>
			                   <td>알람코드있는 체크리스트</td>
			                   <td>admin</td>
			                   <td>2020-0824T02:01:56</td>
       			               <td>Complete</td>
							   <td>
			                     <a href="javascript:void(0);" class="download-btn">
									<i class="xi-download"></i>
								</a>
			                   </td>
			                 </tr>
			               </tbody>
			             </table>
			         </div>		
				</div>
				<!-- //New Report List wrap -->
				
			</article>
		</section>
		

		
		<!-- //section3 -->
		
		
		</div>
		<!-- //view end -->
		
<jsp:include page="include/footer.jsp"></jsp:include>