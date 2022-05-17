<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

<div class="container system-wrap system-wrap1">
  <!-- 로그 등록테이블 -->
  <!--tit-wrap-->
  <div class="tit-wrap">
    <h2 class="heading3">
      <span class="txt">Log Management</span>
      <!-- <span class="version">V47</span> -->
    </h2>
    <ul class="location">
      <li>SYSTEM</li>
      <li class="bold">Log Management</li>
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
  <!--//search-form-->

  <div class="btn-table">
    <div class="base_grid_table">
      <table>
        <caption>WTG Management - No, Timestamp, ID, IP, Event, Menu, Access Point</caption>
        <colgroup>
          <col style="width:10%">
          <col style="width:20%">
          <col style="width:15%">
          <col style="width:15%">
          <col style="width:15%">
          <col style="width:10%">
          <col style="width:15%">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Timestamp</th>
            <th scope="col">ID</th>
            <th scope="col">IP</th>
            <th scope="col">Event</th>
            <th scope="col">Menu</th>
            <th scope="col">Access Point</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10</td>
            <td>2019.10.02 12:12:12</td>
            <td>jeju_ad</td>
            <td>118.122.153.134</td>
            <td>View</td>
            <td>CMS</td>
            <td>Browser</td>
          </tr>
          <tr>
            <td>9</td>
            <td>2019.10.02 12:12:12</td>
            <td>jeju_ad</td>
            <td>118.122.153.134</td>
            <td>View</td>
            <td>CMS</td>
            <td>Browser</td>
          </tr>
          <tr>
            <td>8</td>
            <td>2019.10.02 12:12:12</td>
            <td>jeju_ad</td>
            <td>118.122.153.134</td>
            <td>View</td>
            <td>CMS</td>
            <td>Browser</td>
          </tr>
          <tr>
            <td>7</td>
            <td>2019.10.02 12:12:12</td>
            <td>jeju_ad</td>
            <td>118.122.153.134</td>
            <td>View</td>
            <td>CMS</td>
            <td>Browser</td>
          </tr>
          <tr>
            <td>6</td>
            <td>2019.10.02 12:12:12</td>
            <td>jeju_ad</td>
            <td>118.122.153.134</td>
            <td>View</td>
            <td>CMS</td>
            <td>Browser</td>
          </tr>
          <tr>
            <td>5</td>
            <td>2019.10.02 12:12:12</td>
            <td>jeju_ad</td>
            <td>118.122.153.134</td>
            <td>View</td>
            <td>CMS</td>
            <td>Browser</td>
          </tr>
          <tr>
            <td>4</td>
            <td>2019.10.02 12:12:12</td>
            <td>jeju_ad</td>
            <td>118.122.153.134</td>
            <td>View</td>
            <td>CMS</td>
            <td>Browser</td>
          </tr>
          <tr>
            <td>3</td>
            <td>2019.10.02 12:12:12</td>
            <td>jeju_ad</td>
            <td>118.122.153.134</td>
            <td>View</td>
            <td>CMS</td>
            <td>Browser</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2019.10.02 12:12:12</td>
            <td>jeju_ad</td>
            <td>118.122.153.134</td>
            <td>View</td>
            <td>CMS</td>
            <td>Browser</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2019.10.02 12:12:12</td>
            <td>jeju_ad</td>
            <td>118.122.153.134</td>
            <td>View</td>
            <td>CMS</td>
            <td>Browser</td>
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
    <!--mobile pager-->
    <p class="pager pageNum">
      <a href="" class="arr prev">prev</a>
      <span class="currentPage">
        <em>1</em>/42
      </span>
      <a href="" class="arr next">Next</a>
    </p>
    <!--//mobile pager-->
    <a href="" class="btn-style btn-style1">Register</a>
  </div>


  <!--// 로그 등록테이블 -->


</div>

<jsp:include page="include/footer.jsp"></jsp:include>