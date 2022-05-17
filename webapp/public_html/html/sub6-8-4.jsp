<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

<div class="container system-wrap system-wrap1">
  <!-- 공통코드 등록테이블 -->
   <!-- <div class="tit-wrap">
     <h2 class="heading3">
       <span class="txt">Common code</span>
       <span class="version">V47</span>
     </h2>
     <ul class="location">
       <li>SYSTEM</li>
       <li>Code management </li>
       <li class="bold">Common code</li>
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
        <caption>Common code - No, Code name, Parent code, Date</caption>
        <colgroup>
          <col style="width:10%">
          <col style="width:35%">
          <col style="width:35%">
          <col style="width:20%">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Code name</th>
            <th scope="col">Parent cod</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10</td>
            <td>안전장비</td>
            <td>SE</td>
            <td>2019.10.02 12:12:12</td>
          </tr>
          <tr>
            <td>9</td>
            <td>안전장비</td>
            <td>SE</td>
            <td>2019.10.02 12:12:12</td>
          </tr>
          <tr>
            <td>8</td>
            <td>안전장비</td>
            <td>SE</td>
            <td>2019.10.02 12:12:12</td>
          </tr>
          <tr>
            <td>7</td>
            <td>안전장비</td>
            <td>SE</td>
            <td>2019.10.02 12:12:12</td>
          </tr>
          <tr>
            <td>6</td>
            <td>안전장비</td>
            <td>SE</td>
            <td>2019.10.02 12:12:12</td>
          </tr>
          <tr>
            <td>5</td>
            <td>안전장비</td>
            <td>SE</td>
            <td>2019.10.02 12:12:12</td>
          </tr>
          <tr>
            <td>4</td>
            <td>안전장비</td>
            <td>SE</td>
            <td>2019.10.02 12:12:12</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안전장비</td>
            <td>SE</td>
            <td>2019.10.02 12:12:12</td>
          </tr>
          <tr>
            <td>2</td>
            <td>안전장비</td>
            <td>SE</td>
            <td>2019.10.02 12:12:12</td>
          </tr>
          <tr>
            <td>1</td>
            <td>안전장비</td>
            <td>SE</td>
            <td>2019.10.02 12:12:12</td>
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
  <!--// 공통코드 등록테이블 -->
  
  <!-- 공통코드 등록 -->
  <div class="system-detail-wrap">
    <div class="system-left">
      <!--tit-wrap-->
      <div class="tit-wrap">
        <h2 class="heading3">
          <span class="txt">Common code</span>
          <!-- <span class="version">V47</span> -->
        </h2>
        <ul class="location">
          <li>SYSTEM</li>
          <li>Code management </li>
          <li class="bold">Common code</li>
        </ul>
      </div>
      <!--//tit-wrap-->
      <!-- registration form -->
      <div class="registration-form registration-form1">
        <div class="registration-form-lst-wrap">
          <ul class="registration-form-lst">
            <li>
              <span>Code name*</span>
              <div class="registration-write">
                <div class="input-group">
                  <label for="codeName" class="sr-only">Code name</label>
                  <input type="text" name="codeName" id="codeName" placeholder="">
                </div>
              </div>
            </li>
            <li>
              <span>Parent code*</span>
              <div class="registration-write btn-input-wrap btn-input-double-check">
                <div class="input-group">
                  <label for="parentCode" class="sr-only">Parent code</label>
                  <input type="text" name="parentCode" id="parentCode" placeholder="ex) SE01-01-01">
                </div>
                <button type="button" class="registration-search-btn">Double Check</button>
              </div>
            </li>
          </ul>

          <ul class="registration-form-lst">
            <li>
              <span>Description</span>
              <div class="registration-write">
                <div class="input-group">
                  <label for="Description" class="sr-only">Description</label>
                  <input type="text" name="Description" id="Description" placeholder="">
                </div>
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
  <!-- //공통코드 등록 -->
</div>

<jsp:include page="include/footer.jsp"></jsp:include>