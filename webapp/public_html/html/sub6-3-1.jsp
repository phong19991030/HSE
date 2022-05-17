<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

  <div class="container system-wrap system-wrap1">
    <!-- 시용자 등록테이블 -->
    <!--tit-wrap-->
    <!-- <div class="tit-wrap">
      <h2 class="heading3">
        <span class="txt">User Management</span>
        <span class="version">V47</span>
      </h2>
      <ul class="location">
        <li>SYSTEM</li>
        <li class="bold">User Management</li>
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

   <!--  <div class="btn-table">
      <div class="base_grid_table">
        <table>
          <caption>User Management - No, ID, Name, Organization, License, API, APP, Recent Login</caption>
          <colgroup>
            <col style="width:7.5%">
            <col style="width:15%">
            <col style="width:15%">
            <col style="width:15%">
            <col style="width:15%">
            <col style="width:10%">
            <col style="width:7.5%">
            <col style="width:15%">
          </colgroup>
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Organization</th>
              <th scope="col">License</th>
              <th scope="col">API</th>
              <th scope="col">APP</th>
              <th scope="col">Recent Login</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>jeju_ad</td>
              <td>Jeju Energy Corporation</td>
              <td>Owner</td>
              <td>WAsP certificate</td>
              <td>118.52.216.222</td>
              <td>4621</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>9</td>
              <td>jeju_ad</td>
              <td>Jeju Energy Corporation</td>
              <td>Owner</td>
              <td>WAsP certificate</td>
              <td>118.52.216.222</td>
              <td>4621</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>8</td>
              <td>jeju_ad</td>
              <td>Jeju Energy Corporation</td>
              <td>Owner</td>
              <td>WAsP certificate</td>
              <td>118.52.216.222</td>
              <td>4621</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>7</td>
              <td>jeju_ad</td>
              <td>Jeju Energy Corporation</td>
              <td>Owner</td>
              <td>WAsP certificate</td>
              <td>118.52.216.222</td>
              <td>4621</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>6</td>
              <td>jeju_ad</td>
              <td>Jeju Energy Corporation</td>
              <td>Owner</td>
              <td>WAsP certificate</td>
              <td>118.52.216.222</td>
              <td>4621</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>5</td>
              <td>jeju_ad</td>
              <td>Jeju Energy Corporation</td>
              <td>Owner</td>
              <td>WAsP certificate</td>
              <td>118.52.216.222</td>
              <td>4621</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>4</td>
              <td>jeju_ad</td>
              <td>Jeju Energy Corporation</td>
              <td>Owner</td>
              <td>WAsP certificate</td>
              <td>118.52.216.222</td>
              <td>4621</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>3</td>
              <td>jeju_ad</td>
              <td>Jeju Energy Corporation</td>
              <td>Owner</td>
              <td>WAsP certificate</td>
              <td>118.52.216.222</td>
              <td>4621</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>2</td>
              <td>jeju_ad</td>
              <td>Jeju Energy Corporation</td>
              <td>Owner</td>
              <td>WAsP certificate</td>
              <td>118.52.216.222</td>
              <td>4621</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>1</td>
              <td>jeju_ad</td>
              <td>Jeju Energy Corporation</td>
              <td>Owner</td>
              <td>WAsP certificate</td>
              <td>118.52.216.222</td>
              <td>4621</td>
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
    <!--// 시용자 등록테이블 -->

    <!-- 발전기 등록 -->
    <div class="system-detail-wrap">
      <div class="system-left">
        <!--tit-wrap-->
        <div class="tit-wrap">
          <h2 class="heading3">
            <span class="txt">User Management</span>
            <!-- <span class="version">V47</span> -->
          </h2>
          <ul class="location">
            <li>SYSTEM</li>
            <li class="bold">WF Management</li>
          </ul>
        </div>
        <!--//tit-wrap-->
        <!-- registration form -->
        <div class="registration-form registration-form1">
          <div class="registration-form-lst-wrap">
            <ul class="registration-form-lst">
              <li>
                <span>ID*</span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="serManagementId" class="sr-only">ID</label>
                    <input type="text" name="serManagementId" id="serManagementId" placeholder="">
                  </div>
                </div>
              </li>
              <li>
                <span>Password*</span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="serManagementPw" class="sr-only">Password</label>
                    <input type="text" name="serManagementPw" id="serManagementPw" placeholder="">
                  </div>
                </div>
              </li>
              <li>
                <span>Retype password*</span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="serManagementRetypePw" class="sr-only">Retype password</label>
                    <input type="text" name="serManagementRetypePw" id="serManagementRetypePw" placeholder="">
                  </div>
                </div>
              </li>
              <li>
                <span>Name*</span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="serManagementName" class="sr-only">Name</label>
                    <input type="text" name="serManagementName" id="serManagementName" placeholder="">
                  </div>
                </div>
              </li>
              <li>
                <span>Organization*</span>
                <div class="registration-write btn-input-wrap">
                  <div class="input-group">
                    <label for="serManagementOrg" class="sr-only">Organization</label>
                    <input type="text" name="serManagementOrg" id="serManagementOrg" placeholder="">
                  </div>
                  <button type="button" class="registration-search-btn">Select</button>
                </div>
              </li>
            </ul>

            <ul class="registration-form-lst">
              <li>
                <span>License*</span>
                <div class="registration-write btn-input-wrap">
                  <div class="input-group">
                    <label for="serManagementLicense" class="sr-only">License</label>
                    <input type="text" name="serManagementLicense" id="serManagementLicense" placeholder="">
                  </div>
                  <button type="button" class="registration-search-btn">Select</button>
                </div>
              </li>
              <li>
                <span>Menu access*</span>
                <div class="registration-write registration-write-select">
                  <div class="input-group-wrapper">
                    <div class="select-box">
                      <label for="menuAccess">Menu access</label>
                      <select name="menuAccess" id="menuAccess" class="info-select">
                        <option value="1">-</option>
                        <option value="2"></option>
                        <option value="3"></option>
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <span>E-mail*</span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="serManagementEmail" class="sr-only">E-mail</label>
                    <input type="text" name="serManagementEmail" id="serManagementEmail" placeholder="">
                  </div>
                </div>
              </li>
              <li>
                <span>Permission setting*</span>
                <div class="registration-write btn-input-wrap">
                  <div class="input-group">
                    <label for="serManagementPermission" class="sr-only">Permission setting</label>
                    <input type="text" name="serManagementPermission" id="serManagementPermission" placeholder="">
                  </div>
                  <button type="button" class="registration-search-btn popup-btn">Select</button>
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
    <!-- //발전기 등록 -->
  </div>

  <!-- layerpopup -->
  <div id="layerPopup" class="layer-popup-permission active">
    <div class="layer-cont">
      <div class="tit-wrap">
        <strong class="heading6">Permission setting</strong>
      </div>

      <div class="btn-table">
        <div class="base_grid_table">
          <table>
            <caption>Permission setting - Farm name</caption>
            <thead>
              <tr>
                <th scope="col">
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="farmNam">
                    <label for="farmNam">Farm name</label>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="farmNam1">
                    <label for="farmNam1">Hangwon</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="farmNam2">
                    <label for="farmNam2">Yeong Deok</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="farmNam3">
                    <label for="farmNam3">Taean</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="farmNam4">
                    <label for="farmNam4">Jeju</label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="base_grid_table">
          <table>
            <caption>Permission setting - Group name</caption>
            <thead>
              <tr>
                <th scope="col">
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="groupName">
                    <label for="groupName">Group name</label>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="groupName1">
                    <label for="groupName1">Group 01</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="groupName2">
                    <label for="groupName2">Group 02</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="groupName3">
                    <label for="groupName3">Group 03</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="groupName4">
                    <label for="groupName4">Group 04</label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="base_grid_table">
          <table>
            <caption>Permission setting - Turbine name</caption>
            <thead>
              <tr>
                <th scope="col">
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="turbineName">
                    <label for="turbineName">Turbine name</label>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="turbineName1">
                    <label for="turbineName1">V47</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="turbineName2">
                    <label for="turbineName2">U50</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="turbineName3">
                    <label for="turbineName3">Turbine 04</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="checkbox-radio-custom">
                    <input type="checkbox" class="checkbox" id="turbineName4">
                    <label for="turbineName4">A50</label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="footer_table_btn">
          <a href="" class="btn">Cancel</a>
          <a href="" class="btn">Complete</a>
        </div>
      </div>

      <a href="#none" class="layer-close">
        <span class="sr-only">close layer popup</span>
        <i class="xi-close"></i>
      </a>
    </div>
  </div>
  <!-- //layerpopup -->

<jsp:include page="include/footer.jsp"></jsp:include>