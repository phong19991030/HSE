<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

	<div class="container system-wrap system-wrap1">
	  <!-- 조직 등록테이블 -->
	  <!--  <div class="tit-wrap">
	    <h2 class="heading3">
	      <span class="txt">Organization management</span>
	      <span class="version">V47</span>
	    </h2>
	    <ul class="location">
	      <li>SYSTEM</li>
	      <li class="bold">Organization management</li>
	    </ul>
	  </div> 
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
	            <div class="select-box bul-none">
	              <label for="search_keyword">Process</label>
	              <select name="search_keyword" id="search_keyword" class="info-select">
	                <option value="1" selected="selected">Wind Farm</option>
	                <option value="2"></option>
	                <option value="3"></option>
	                <option value="4"></option>
	              </select>
	            </div>
	          </li>
	          <li>
	            <span class="detail-search-keyword">Search</span>
	            <div class="input-group">
	              <label for="searchText" class="sr-only">Search</label>
	              <input type="text" id="searchText" name="searchText" value="">
	            </div>
	          </li>
	          <li class="calendar-picker">
	            <span class="detail-search-keyword">Date</span>
	            <div class="calendar-wrap">
	              <div class="input-group">
	                <label for="searchText" class="sr-only"></label>
	                <input type="text" id="searchText" name="searchText" value="">
	                <button class="calendar-picker-btn">
	                  <i class="xi-calendar"></i>
	                </button>
	              </div>
	              <em class="hyphen">
	                <span class="sr-only">-</span>
	              </em>
	              <div class="input-group">
	                <label for="searchText" class="sr-only"></label>
	                <input type="text" id="searchText" name="searchText" value="">
	                <button class="calendar-picker-btn">
	                  <i class="xi-calendar"></i>
	                </button>
	              </div>
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
	
	 <div class="btn-table">
	    <div class="base_grid_table">
	      <table>
	        <caption>Organization management - No, Classification, Organization, Number of user</caption>
	        <colgroup>
	          <col style="width:10%">
	          <col style="width:40%">
	          <col style="width:30%">
	          <col style="width:30%">
	        </colgroup>
	        <thead>
	          <tr>
	            <th scope="col">No.</th>
	            <th scope="col">Classification</th>
	            <th scope="col">Organization</th>
	            <th scope="col">Number of user</th>
	          </tr>
	        </thead>
	        <tbody>
	          <tr>
	            <td>10</td>
	            <td>ROLE_business</td>
	            <td>발전사업자</td>
	            <td>발전사업자용 권한입니다.</td>
	          </tr>
	          <tr>
	            <td>9</td>
	            <td>ROLE_business</td>
	            <td>발전사업자</td>
	            <td>발전사업자용 권한입니다.</td>
	          </tr>
	          <tr>
	            <td>8</td>
	            <td>ROLE_business</td>
	            <td>발전사업자</td>
	            <td>발전사업자용 권한입니다.</td>
	          </tr>
	          <tr>
	            <td>7</td>
	            <td>ROLE_business</td>
	            <td>발전사업자</td>
	            <td>발전사업자용 권한입니다.</td>
	          </tr>
	          <tr>
	            <td>6</td>
	            <td>ROLE_business</td>
	            <td>발전사업자</td>
	            <td>발전사업자용 권한입니다.</td>
	          </tr>
	          <tr>
	            <td>5</td>
	            <td>ROLE_business</td>
	            <td>발전사업자</td>
	            <td>발전사업자용 권한입니다.</td>
	          </tr>
	          <tr>
	            <td>4</td>
	            <td>ROLE_business</td>
	            <td>발전사업자</td>
	            <td>발전사업자용 권한입니다.</td>
	          </tr>
	          <tr>
	            <td>3</td>
	            <td>ROLE_business</td>
	            <td>발전사업자</td>
	            <td>발전사업자용 권한입니다.</td>
	          </tr>
	          <tr>
	            <td>2</td>
	            <td>ROLE_business</td>
	            <td>발전사업자</td>
	            <td>발전사업자용 권한입니다.</td>
	          </tr>
	          <tr>
	            <td>1</td>
	            <td>ROLE_business</td>
	            <td>발전사업자</td>
	            <td>발전사업자용 권한입니다.</td>
	          </tr>
	        </tbody>
	      </table>
	    </div>
	    <div class="pager">
	      <a href="" class="arr prev">prev</a>
	      <a href="" title="1페이지" class="active">1</a>
	      <a href="" title="2페이지">2</a>
	      <a href="" title="3페이지">3</a>
	      <a href="" title="4페이지">4</a>
	      <a href="" class="arr next">Next</a>
	    </div>
	    <a href="" class="btn-style btn-style1">Register</a>
	  </div> -->
	  <!--// 조직 등록테이블 -->
	
	  <!-- 조직 등록 -->
	  <div class="system-detail-wrap">
	    <div class="system-left">
	      <!--tit-wrap-->
	      <div class="tit-wrap">
	        <h2 class="heading3">
	          <span class="txt">Organization management</span>
	          <!-- <span class="version">V47</span> -->
	        </h2>
	        <ul class="location">
	          <li>SYSTEM</li>
	          <li class="bold">Organization management</li>
	        </ul>
	      </div>
	      <!--//tit-wrap-->
	      <!-- registration form -->
	      <div class="registration-form registration-form1">
	        <div class="registration-form-lst-wrap">
	          <ul class="registration-form-lst">
	            <li>
	              <span>Organization*</span>
	              <div class="registration-write">
	                <div class="input-group">
	                  <label for="orgOrganization" class="sr-only">Organization</label>
	                  <input type="text" name="orgOrganization" id="orgOrganization" placeholder="">
	                </div>
	              </div>
	            </li>
	            <li>
	              <span>Classification*</span>
	              <div class="registration-write">
	                <div class="input-group">
	                  <label for="orgClassification" class="sr-only">Classification</label>
	                  <input type="text" name="orgClassification" id="orgClassification" placeholder="">
	                </div>
	              </div>
	            </li>
	          </ul>
	
	          <ul class="registration-form-lst">
	            <li>
	              <span>Address</span>
	              <div class="registration-write">
	                <div class="input-group">
	                  <label for="orgAddress" class="sr-only">Address</label>
	                  <input type="text" name="orgAddress" id="orgAddress" placeholder="">
	                </div>
	              </div>
	            </li>
	            <li>
	              <span>Logo</span>
	              <div class="registration-write btn-input-wrap fake-field-file-wrap">
	                <div class="input-group">
	                  <div class="fake-field-file"></div>
	                  <input type="file" name="cv-arquivo" id="cv-arquivo" class="field-file">
	                </div>
	                <label for="cv-arquivo" aria-label="Attach file" class="registration-search-btn">
	                  <i class="xi-paperclip"></i>
	                </label>
	              </div>
	            </li>
	            <li class="note">
	              <span>Note</span>
	              <div class="registration-write">
	                <label for="orgNote" class="sr-only">Note</label>
	                <textarea id="orgNote"></textarea>
	              </div>
	            </li>
	          </ul>
	
	        </div>
	      </div>
	      <!-- //registration form -->
	    </div>
	    <div class="system-right">
	      <div class="btns">
	        <a href="" class="btn-style btn-style1">Save</a>
	        <a href="" class="btn-style btn-style2">Cancel</a>
	        <a href="" class="btn-style btn-style3">Delete</a>
	      </div>
	    </div>
	  </div>
	
	  <!-- //조직 등록 -->
	</div>

<jsp:include page="include/footer.jsp"></jsp:include>