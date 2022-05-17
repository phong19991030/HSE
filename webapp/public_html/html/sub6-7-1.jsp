<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

<div class="container system-wrap system-wrap1">
  <!-- 공지사항 등록테이블 -->
  <!--tit-wrap-->
  <!-- <div class="tit-wrap">
    <h2 class="heading3">
      <span class="txt">Notice Management</span>
      <span class="version">V47</span>
    </h2>
    <ul class="location">
      <li>SYSTEM</li>
      <li class="bold">Notice Management</li>
    </ul>
  </div> -->
  <!--//tit-wrap-->
  <!--search-form-->
  <!-- <div class="search-form-wrap">
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
  </div> -->
  <!--//search-form-->

  <!-- <div class="btn-table">
    <div class="base_grid_table">
      <table>
        <caption>Notice Management - No, Wind Farm, Group, WTG, Manufacture, Power(MW), Date</caption>
        <colgroup>
          <col style="width:10%">
          <col style="width:60%">
          <col style="width:15%">
          <col style="width:15%">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Title</th>
            <th scope="col">Date</th>
            <th scope="col">Attachment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10</td>
            <td>Advise on preparation for operation of the business continuity plan</td>
            <td>2020.02.12 12:12:12</td>
            <td>
              <a href="" class="download-btn">
                <i class="xi-download"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>9</td>
            <td>Advise on preparation for operation of the business continuity plan</td>
            <td>2020.02.12 12:12:12</td>
            <td>
              <a href="" class="download-btn">
                <i class="xi-download"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>8</td>
            <td>Advise on preparation for operation of the business continuity plan</td>
            <td>2020.02.12 12:12:12</td>
            <td>
              <a href="" class="download-btn">
                <i class="xi-download"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td>Advise on preparation for operation of the business continuity plan</td>
            <td>2020.02.12 12:12:12</td>
            <td>
              <a href="" class="download-btn">
                <i class="xi-download"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>Advise on preparation for operation of the business continuity plan</td>
            <td>2020.02.12 12:12:12</td>
            <td>
              <a href="" class="download-btn">
                <i class="xi-download"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Advise on preparation for operation of the business continuity plan</td>
            <td>2020.02.12 12:12:12</td>
            <td>
              <a href="" class="download-btn">
                <i class="xi-download"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Advise on preparation for operation of the business continuity plan</td>
            <td>2020.02.12 12:12:12</td>
            <td>
              <a href="" class="download-btn">
                <i class="xi-download"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Advise on preparation for operation of the business continuity plan</td>
            <td>2020.02.12 12:12:12</td>
            <td>
              <a href="" class="download-btn">
                <i class="xi-download"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Advise on preparation for operation of the business continuity plan</td>
            <td>2020.02.12 12:12:12</td>
            <td>
              <a href="" class="download-btn">
                <i class="xi-download"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Advise on preparation for operation of the business continuity plan</td>
            <td>2020.02.12 12:12:12</td>
            <td>
              <a href="" class="download-btn">
                <i class="xi-download"></i>
              </a>
            </td>
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
  <!--// 공지사항 등록테이블 -->

  <!-- 공지사항 등록 -->
  <div class="system-detail-wrap">
    <div class="system-left">
      <!--tit-wrap-->
      <div class="tit-wrap">
        <h2 class="heading3">
          <span class="txt">Notice Management</span>
          <!-- <span class="version">V47</span> -->
        </h2>
        <ul class="location">
          <li>SYSTEM</li>
          <li class="bold">Notice Management</li>
        </ul>
      </div>
      <!--//tit-wrap-->
      <!-- registration form -->
      <div class="registration-form registration-form1">
        <div class="registration-form-lst-wrap registration-form-lst-wrap-full">
          <ul class="registration-form-lst">
            <li class="registration-input-checkbox-wrap">
              <span>Title*</span>
              <div class="registration-write">
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="noticeTitle" class="sr-only">Title</label>
                    <input type="text" name="noticeTitle" id="noticeTitle" placeholder="">
                  </div>
                </div>
                <ul class="checkbox-radio-custom">
                  <li>
                    <input type="checkbox" class="checkbox" id="noticeSetting">
                    <label for="noticeSetting">Notice setting</label>

                  </li>
                  <li class="calendar-picker">
                    <div class="calendar-check-wrap">
                      <input type="checkbox" class="checkbox" id="noticeCalendar">
                      <label for="noticeCalendar" class="sr-only"></label>
                    </div>
                    <div class="calendar-wrap">
                      <div class="input-group">
                        <label for="noticeCalendarPrev" class="sr-only"></label>
                        <input type="text" id="noticeCalendarPrev" name="noticeCalendarPrev" value="">
                        <button class="calendar-picker-btn">
                          <i class="xi-calendar"></i>
                        </button>
                      </div>
                      <em class="hyphen">
                        <span class="sr-only">-</span>
                      </em>
                      <div class="input-group">
                        <label for="noticeCalendarNext" class="sr-only"></label>
                        <input type="text" id="noticeCalendarNext" name="noticeCalendarNext" value="">
                        <button class="calendar-picker-btn">
                          <i class="xi-calendar"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li class="note">
              <span>Content*</span>
              <div class="registration-write">
                <label for="noticeContent" class="sr-only">Content</label>
                <textarea id="noticeContent"></textarea>
              </div>
            </li>
            <li>
              <span>Attachment</span>
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
          </ul>
        </div>
      </div>
    </div>
    <div class="system-right">
      <div class="btns">
        <a href="" class="btn-style btn-style1">Save</a>
        <a href="" class="btn-style btn-style2">Cancel</a>
        <a href="" class="btn-style btn-style3">Delete</a>
      </div>
    </div>
  </div>
  <!-- //공지사항 등록 -->
</div>

<jsp:include page="include/footer.jsp"></jsp:include>