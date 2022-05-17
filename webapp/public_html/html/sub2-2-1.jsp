<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

		<div class="container">
         <!--tit-wrap-->
         <div class="tit-wrap">
           <h2 class="heading3">
             <span class="txt">WTG Inspection</span>
             <span class="version">V47</span>
           </h2>
           <ul class="location">
             <li>O&amp;M</li>
             <li>Report </li>
             <li class="bold">WTG Inspection</li>
           </ul>
         </div>
         <!--//tit-wrap-->
         <!--search-form-->
         <div class="search-form-wrap">
           <div class="search-wrapper">
             <form id="detailKeywordForm" name="detailKeywordForm" method="post">
               <div class="input-group">
                 <label for="detailKeyword" class="sr-only">검색어입력</label>
                 <input type="text" name="detailKeyword" id="detailKeyword" placeholder="Plaease enter something...">
               </div>
               <a href="#none" class="slide-toggle-search">
                 <span class="sr-only">상세검색 토글 버튼</span>
                 <i class="xi-angle-down-min"></i>
               </a>
             </form>
             <div class="search-detail">
               <ul class="detail-search-lst">
                 <li>
                   <span class="detail-search-keyword">Process</span>
                   <div class="select-box">
                     <label for="search_type"></label>
                     <select name="search_type" id="search_type" class="info-select">
                       <option value="1" selected="selected">Repair completed</option>
                       <option value="2">Planning</option>
                       <option value="3">Error occurred</option>
                       <option value="4">Under repair</option>
                     </select>
                   </div>
                 </li>
                 <li>
                   <span class="detail-search-keyword">Alarm code</span>
                   <div class="input-group">
                     <label for="alarmCode" class="sr-only">alarmCode</label>
                     <input type="text" id="alarmCode" name="alarmCode" value="">
                   </div>
                 </li>
                 <li>
                   <span class="detail-search-keyword">Text</span>
                   <div class="input-group">
                     <label for="searchText" class="sr-only">searchText</label>
                     <input type="text" id="searchText" name="searchText" value="">
                   </div>
                 </li>
               </ul>
               <button class="search-btn">search</button>
             </div>
           </div>

           <div class="total-wrap">
             <span class="num">Total <strong>1,211</strong></span>
             <div class="select-box">
               <label for="search_type"></label>
               <select name="search_type" id="search_type" class="info-select">
                 <option value="1" selected="selected">10</option>
                 <option value="2">20</option>
                 <option value="3">30</option>
               </select>
             </div>
           </div>
         </div>
         <!--//search-form-->

         <div class="base_grid_table btn-table">
             <table>
               <caption>SCADA Alarm - No, Progress, Data, Alarm code, Description, Manual, Report</caption>
               <colgroup>
                 <col style="width:5%">
                 <col style="width:5%">
                 <col style="width:10%">
                 <col style="width:10%">
                 <col style="width:25%">
                 <col style="width:10%">
                 <col style="width:10%">
                 <col style="width:15%">
                 <col style="width:5%">
                 <col style="width:5%">
               </colgroup>
               <thead>
                 <tr>
                   <th scope="col">No.</th>
                   <th scope="col">Alarm code</th>
                   <th scope="col">Type</th>
                   <th scope="col">Report number</th>
                   <th scope="col">Report name</th>
                   <th scope="col">Description</th>
                   <th scope="col">Date</th>
                   <th scope="col">Process</th>
                   <th scope="col"></th>
                   <th scope="col"></th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>10</td>
                   <td>159</td>
                   <td>WTG Inspection</td>
                   <td>Report20190821_01</td>
                   <td>If the error the turbine has stopped with has reset before the....</td>
                   <td> 홍길동 Hong GilDong</td>
                   <td>2019.08.23  12:12:12</td>
                   <td>[Registration completed]</td>
				   <td>
                     <a href="" class="download-btn">
						<i class="xi-download"></i>
					</a>
                   </td>
                   <td>
                     <a href="" class="detail-btn">
						<i class="xi-search"></i>
					</a>
                   </td>
                 </tr>
                 <tr>
                   <td>9</td>
                   <td>159</td>
                   <td>WTG Inspection</td>
                   <td>Report20190821_01</td>
                   <td>If the error the turbine has stopped with has reset before the....</td>
                   <td> 홍길동 Hong GilDong</td>
                   <td>2019.08.23  12:12:12</td>
                   <td>[Registration completed]</td>
				   <td>
                     <a href="" class="download-btn">
						<i class="xi-download"></i>
					</a>
                   </td>
                   <td>
                     <a href="" class="detail-btn">
						<i class="xi-search"></i>
					</a>
                   </td>
                 </tr>
                 <tr>
                   <td>8</td>
                   <td>159</td>
                   <td>WTG Inspection</td>
                   <td>Report20190821_01</td>
                   <td>If the error the turbine has stopped with has reset before the....</td>
                   <td> 홍길동 Hong GilDong</td>
                   <td>2019.08.23  12:12:12</td>
                   <td>[Registration completed]</td>
				   <td>
                     <a href="" class="download-btn">
						<i class="xi-download"></i>
					</a>
                   </td>
                   <td>
                     <a href="" class="detail-btn">
						<i class="xi-search"></i>
					</a>
                   </td>
                 </tr>
                 <tr>
                   <td>7</td>
                   <td>159</td>
                   <td>WTG Inspection</td>
                   <td>Report20190821_01</td>
                   <td>If the error the turbine has stopped with has reset before the....</td>
                   <td> 홍길동 Hong GilDong</td>
                   <td>2019.08.23  12:12:12</td>
                   <td>[Registration completed]</td>
				   <td>
                     <a href="" class="download-btn">
						<i class="xi-download"></i>
					</a>
                   </td>
                   <td>
                     <a href="" class="detail-btn">
						<i class="xi-search"></i>
					</a>
                   </td>
                 </tr>
                 <tr>
                   <td>10</td>
                   <td>159</td>
                   <td>WTG Inspection</td>
                   <td>Report20190821_01</td>
                   <td>If the error the turbine has stopped with has reset before the....</td>
                   <td> 홍길동 Hong GilDong</td>
                   <td>2019.08.23  12:12:12</td>
                   <td>[Registration completed]</td>
				   <td>
                     <a href="" class="download-btn">
						<i class="xi-download"></i>
					</a>
                   </td>
                   <td>
                     <a href="" class="detail-btn">
						<i class="xi-search"></i>
					</a>
                   </td>
                 </tr>
               </tbody>
             </table>
           
	         <div class="pager">
	           <a href="" class="arr prev">prev</a>
	           <a href="" title="1페이지" class="active">1</a>
	           <a href="" title="2페이지">2</a>
	           <a href="" title="3페이지">3</a>
	           <a href="" title="4페이지">4</a>
	           <a href="" class="arr next">Next</a>
	         </div>
         </div>

         
         <div class="footer_table_btn">
        	<a href="" class="btn-style btn-style1">Register</a>
        </div>
       </div>
        
<jsp:include page="include/footer.jsp"></jsp:include>