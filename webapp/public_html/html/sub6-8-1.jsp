<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

<div class="container system-wrap system-wrap1">
  <!-- 알람코드 등록테이블 -->
  <!--tit-wrap-->
  <!-- <div class="tit-wrap">
    <h2 class="heading3">
      <span class="txt">Alarm code</span>
      <span class="version">V47</span>
    </h2>
    <ul class="location">
      <li>SYSTEM</li>
      <li>Code management </li>
      <li class="bold">Alarm code</li>
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

<!--   <div class="btn-table">
    <div class="base_grid_table">
      <table>
        <caption>Alarm code - No, Code management , Description, Date, Attachment</caption>
        <colgroup>
          <col style="width:10%">
          <col style="width:25%">
          <col style="width:30%>                                                                                                                                                                                                                    %">
          <col style="width:25%">
          <col style="width:10%">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Code management</th>
            <th scope="col">Description</th>
            <th scope="col">Date</th>
            <th scope="col">Attachment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10</td>
            <td>admin</td>
            <td>The 4th confirmed case of a new coronavirus ...</td>
            <td>2019.10.02 12:12:12</td>
            <td>
              <a href="" class="detail-btn">
                <i class="xi-search"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>9</td>
            <td>admin</td>
            <td>The 4th confirmed case of a new coronavirus ...</td>
            <td>2019.10.02 12:12:12</td>
            <td>
              <a href="" class="detail-btn">
                <i class="xi-search"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>8</td>
            <td>admin</td>
            <td>The 4th confirmed case of a new coronavirus ...</td>
            <td>2019.10.02 12:12:12</td>
            <td>
              <a href="" class="detail-btn">
                <i class="xi-search"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td>admin</td>
            <td>The 4th confirmed case of a new coronavirus ...</td>
            <td>2019.10.02 12:12:12</td>
            <td>
              <a href="" class="detail-btn">
                <i class="xi-search"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>admin</td>
            <td>The 4th confirmed case of a new coronavirus ...</td>
            <td>2019.10.02 12:12:12</td>
            <td>
              <a href="" class="detail-btn">
                <i class="xi-search"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>admin</td>
            <td>The 4th confirmed case of a new coronavirus ...</td>
            <td>2019.10.02 12:12:12</td>
            <td>
              <a href="" class="detail-btn">
                <i class="xi-search"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>admin</td>
            <td>The 4th confirmed case of a new coronavirus ...</td>
            <td>2019.10.02 12:12:12</td>
            <td>
              <a href="" class="detail-btn">
                <i class="xi-search"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>admin</td>
            <td>The 4th confirmed case of a new coronavirus ...</td>
            <td>2019.10.02 12:12:12</td>
            <td>
              <a href="" class="detail-btn">
                <i class="xi-search"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>admin</td>
            <td>The 4th confirmed case of a new coronavirus ...</td>
            <td>2019.10.02 12:12:12</td>
            <td>
              <a href="" class="detail-btn">
                <i class="xi-search"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>admin</td>
            <td>The 4th confirmed case of a new coronavirus ...</td>
            <td>2019.10.02 12:12:12</td>
            <td>
              <a href="" class="detail-btn">
                <i class="xi-search"></i>
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
  <!--// 알람코드 등록테이블 -->

  <!-- 알람코드 등록 -->
  <!-- <div class="system-detail-wrap">
    <div class="system-left">
      <div class="tit-wrap">
        <h2 class="heading3">
          <span class="txt">Alarm code</span>
          <span class="version">V47</span>
        </h2>
        <ul class="location">
          <li>SYSTEM</li>
          <li>Code management </li>
          <li class="bold">Alarm code</li>
        </ul>
      </div>
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
            <li class="registration-write-three">
              <span>Manufacturer / Type / Capacity*</span>
              <div class="registration-write btn-input-wrap">
                <div class="input-group overlap">
                  <label for="serManagementPw" class="sr-only">Password</label>
                  <input type="text" name="serManagementPw" id="serManagementPw" placeholder="">
                </div>
                <em class="slash">/</em>
                <div class="input-group">
                  <label for="serManagementPw" class="sr-only">Password</label>
                  <input type="text" name="serManagementPw" id="serManagementPw" placeholder="">
                </div>
                <em class="slash">/</em>
                <div class="input-group">
                  <label for="serManagementPw" class="sr-only">Password</label>
                  <input type="text" name="serManagementPw" id="serManagementPw" placeholder="">
                </div>
                <button type="button" class="registration-search-btn">Double Check</button>
              </div>
            </li>
          </ul>

          <ul class="registration-form-lst">
            <li>
              <span>Description*</span>
              <div class="registration-write">
                <div class="input-group">
                  <label for="alarmDescription" class="sr-only">Description</label>
                  <input type="text" name="alarmDescription" id="alarmDescription" placeholder="">
                </div>
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
  </div> -->
  <!-- //알람코드 등록 -->

  <!-- 알람코드 상세 테이블 -->
 <!--  <div class="tit-wrap">
    <h2 class="heading3">
      <span class="txt">#010102</span>
      <span class="version">V47</span>
    </h2>
    <ul class="location">
      <li>SYSTEM</li>
      <li>Code management </li>
      <li>Alarm code</li>
      <li class="bold">#010102 V47</li>
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
        <caption>Alarm code - No, Alarm code, Alarm text, Attachment, Detail</caption>
        <colgroup>
          <col style="width:10%">
          <col style="width:20%">
          <col style="width:50%>                                                                                                                                                                                                                    %">
          <col style="width:10%">
          <col style="width:10%">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Alarm code</th>
            <th scope="col">Alarm text</th>
            <th scope="col">Attachment</th>
            <th scope="col">Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10</td>
            <td>3</td>
            <td>Turbine OK</td>
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
            <td>3</td>
            <td>Turbine OK</td>
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
            <td>3</td>
            <td>Turbine OK</td>
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
            <td>3</td>
            <td>Turbine OK</td>
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
            <td>6</td>
            <td>3</td>
            <td>Turbine OK</td>
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
            <td>5</td>
            <td>3</td>
            <td>Turbine OK</td>
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
            <td>4</td>
            <td>3</td>
            <td>Turbine OK</td>
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
            <td>3</td>
            <td>3</td>
            <td>Turbine OK</td>
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
            <td>2</td>
            <td>3</td>
            <td>Turbine OK</td>
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
            <td>1</td>
            <td>3</td>
            <td>Turbine OK</td>
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
  <!--// 알람코드 상세 테이블 -->

  <!-- 알람코드 테이블 관리 -->
  <div class="system-detail-wrap">
    <div class="system-left">
      <!--tit-wrap-->
      <div class="tit-wrap">
        <h2 class="heading3">
          <span class="txt">#010102</span>
          <span class="version">V47</span>
        </h2>
        <ul class="location">
          <li>SYSTEM</li>
          <li>Code management </li>
          <li>Alarm code</li>
          <li class="bold">#010102 V47</li>
        </ul>
      </div>
      <!--//tit-wrap-->
      <!-- registration form -->
      <div class="registration-form registration-form1">
        <div class="registration-form-lst-wrap">
          <ul class="registration-form-lst">
            <li>
              <span>Alarm code*</span>
              <div class="registration-write btn-input-wrap btn-input-double-check">
                <div class="input-group">
                  <label for="alarmCode" class="sr-only">Alarm code</label>
                  <input type="text" name="alarmCode" id="alarmCode" placeholder="">
                </div>
                <button type="button" class="registration-search-btn">Double Check</button>
              </div>
            </li>
            <li>
              <span>Alarm text*</span>
              <div class="registration-write">
                <div class="input-group">
                  <label for="alarmText" class="sr-only">Alarm text</label>
                  <input type="text" name="alarmText" id="alarmText" placeholder="">
                </div>
              </div>
            </li>
          </ul>
          <ul class="registration-form-lst">
            <li>
              <span>Menual</span>
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

        <div class="registration-form-lst-wrap registration-form-lst-wrap-full">
          <ul class="registration-form-lst">
            <li class="note">
              <span>Description*</span>
              <div class="registration-write">
                <label for="alaramDescription" class="sr-only">Description</label>
                <textarea id="alaramDescription"></textarea>
              </div>
            </li>
            <li class="note">
              <span>Proposal</span>
              <div class="registration-write">
                <label for="alaramProposal" class="sr-only">Proposal</label>
                <textarea id="alaramProposal"></textarea>
              </div>
            </li>
          </ul>
        </div>

        <div class="registration-form-lst-wrap">
          <ul class="registration-form-lst">
            <li>
              <span>Action</span>
              <div class="registration-write btn-input-wrap">
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="Action1" class="sr-only">Action</label>
                    <input type="text" name="Action" id="Action1" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a href="" class="delete-btn">
                      <span class="sr-only">delete</span>
                      <i class="xi-minus-square"></i>
                    </a>
                  </div>
                </div>
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="Action1" class="sr-only">Action</label>
                    <input type="text" name="Action" id="Action1" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a href="" class="delete-btn">
                      <span class="sr-only">delete</span>
                      <i class="xi-minus-square"></i>
                    </a>
                  </div>
                </div>
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="Action2" class="sr-only">Action</label>
                    <input type="text" name="Action" id="Action2" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a href="" class="delete-btn">
                      <span class="sr-only">delete</span>
                      <i class="xi-minus-square"></i>
                    </a>
                    <a href="" class="add-btn">
                      <span class="sr-only">add</span>
                      <i class="xi-plus-square"></i>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <span>Tool</span>
              <div class="registration-write btn-input-wrap btn-input-wrap2">
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="Tool1" class="sr-only">Tool</label>
                    <input type="text" name="Tool" id="Tool1" placeholder="">
                    <a href="" class="btn-input-wrap-search">
                    	<span class="sr-only">Search</span>
                    	<i class="xi-search"></i>
                    </a>
                  </div>
                  <div class="input-group input-group-num">
                    <label for="Tool2 " class="sr-only">Tool</label>
                    <input type="text" name="Tool" id="Tool2" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a href="" class="add-btn">
                      <span class="sr-only">add</span>
                      <i class="xi-plus-square"></i>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <ul class="registration-form-lst">
            <li>
              <span>Parts</span>
              <div class="registration-write btn-input-wrap btn-input-wrap2">
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="Parts1" class="sr-only">Parts</label>
                    <input type="text" name="Parts" id="Parts1" placeholder="">
                    <a href="" class="btn-input-wrap-search">
                    	<span class="sr-only">Search</span>
                    	<i class="xi-search"></i>
                    </a>
                  </div>
                  <div class="input-group input-group-num">
                    <label for="Parts2 " class="sr-only">Parts</label>
                    <input type="text" name="Parts" id="Parts2" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a href="" class="delete-btn">
                      <span class="sr-only">delete</span>
                      <i class="xi-minus-square"></i>
                    </a>
                  </div>
                </div>
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="Parts3" class="sr-only">Parts</label>
                    <input type="text" name="Part3" id="Parts3" placeholder="">
                    <a href="" class="btn-input-wrap-search">
                    	<span class="sr-only">Search</span>
                    	<i class="xi-search"></i>
                    </a>
                  </div>
                  <div class="input-group input-group-num">
                    <label for="Parts4 " class="sr-only">Parts</label>
                    <input type="text" name="Parts4" id="Parts4" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a href="" class="delete-btn">
                      <span class="sr-only">delete</span>
                      <i class="xi-minus-square"></i>
                    </a>
                    <a href="" class="add-btn">
                      <span class="sr-only">add</span>
                      <i class="xi-plus-square"></i>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <span>PPE</span>
              <div class="registration-write btn-input-wrap btn-input-wrap2">
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="ppe1" class="sr-only">PPE</label>
                    <input type="text" name="ppe" id="ppe1" placeholder="">
                    <a href="" class="btn-input-wrap-search">
                    	<span class="sr-only">Search</span>
                    	<i class="xi-search"></i>
                    </a>
                  </div>
                  <div class="input-group input-group-num">
                    <label for="ppe2 " class="sr-only">PPE</label>
                    <input type="text" name="ppe" id="ppe2" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a href="" class="delete-btn">
                      <span class="sr-only">delete</span>
                      <i class="xi-minus-square"></i>
                    </a>
                  </div>
                </div>
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="ppe3" class="sr-only">PPE</label>
                    <input type="text" name="ppe3" id="ppe3" placeholder="">
                    <a href="" class="btn-input-wrap-search">
                    	<span class="sr-only">Search</span>
                    	<i class="xi-search"></i>
                    </a>
                  </div>
                  <div class="input-group input-group-num">
                    <label for="ppe4 " class="sr-only">PPE</label>
                    <input type="text" name="ppe4" id="ppe4" placeholder="">
                  </div>
                  <div class="add-delete-btn-wrap">
                    <a href="" class="delete-btn">
                      <span class="sr-only">delete</span>
                      <i class="xi-minus-square"></i>
                    </a>
                    <a href="" class="add-btn">
                      <span class="sr-only">add</span>
                      <i class="xi-plus-square"></i>
                    </a>
                  </div>
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
  <!-- //알람코드 테이블 관리 -->
</div>

<jsp:include page="include/footer.jsp"></jsp:include>