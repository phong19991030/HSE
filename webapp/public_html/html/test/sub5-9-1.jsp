<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

  <div class="container system-wrap system-wrap1">
    <!-- 발전기 등록테이블 -->
    <!--tit-wrap-->
    <div class="tit-wrap">
      <h2 class="heading3">
        <span class="txt">WTG Management</span>
        <!-- <span class="version">V47</span> -->
      </h2>
      <ul class="location">
        <li>SYSTEM</li>
        <li class="bold">WTG Management</li>
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

    <div class="table onm-table">
      <div class="table-wrap">
        <table>
          <caption>WTG Management - No, Wind Farm, Group, WTG, Manufacture, Power(MW), Date</caption>
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
              <th scope="col">Wind Farm</th>
              <th scope="col">Group</th>
              <th scope="col">WTG</th>
              <th scope="col">Manufacture</th>
              <th scope="col">Power(MW)</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>Hangwon</td>
              <td>Group 01</td>
              <td>V47</td>
              <td>vestas</td>
              <td>5.5</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>9</td>
              <td>Hangwon</td>
              <td>Group 01</td>
              <td>V47</td>
              <td>vestas</td>
              <td>5.5</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>8</td>
              <td>Hangwon</td>
              <td>Group 01</td>
              <td>V47</td>
              <td>vestas</td>
              <td>5.5</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Hangwon</td>
              <td>Group 01</td>
              <td>V47</td>
              <td>vestas</td>
              <td>5.5</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Hangwon</td>
              <td>Group 01</td>
              <td>V47</td>
              <td>vestas</td>
              <td>5.5</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Hangwon</td>
              <td>Group 01</td>
              <td>V47</td>
              <td>vestas</td>
              <td>5.5</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Hangwon</td>
              <td>Group 01</td>
              <td>V47</td>
              <td>vestas</td>
              <td>5.5</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Hangwon</td>
              <td>Group 01</td>
              <td>V47</td>
              <td>vestas</td>
              <td>5.5</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Hangwon</td>
              <td>Group 01</td>
              <td>V47</td>
              <td>vestas</td>
              <td>5.5</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Hangwon</td>
              <td>Group 01</td>
              <td>V47</td>
              <td>vestas</td>
              <td>5.5</td>
              <td>2019.10.02 12:12:12</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="btns txt-right">
      <a href="" class="btn-style btn-style1">Register</a>
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
    <!--// 발전기 등록테이블 -->

    <!-- 발전기 등록 -->
    <div class="wf-detail-wrap">
      <div class="wf-left">
        <!--tit-wrap-->
        <div class="tit-wrap">
          <h2 class="heading3">
            <span class="txt">WF Management</span>
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
                <span>Select WF*</span>
                <div class="registration-write twice-input registration-write-select">
                  <div class="input-group-wrapper">
                    <div class="select-box">
                      <label for="selectWf"></label>
                      <select name="selectWf" id="selectWf" class="info-select">
                        <option value="1">-</option>
                        <option value="2"></option>
                        <option value="3"></option>
                      </select>
                    </div>
                  </div>
                  <em>&gt;</em>
                  <div class="input-group-wrapper">
                    <div class="select-box">
                      <label for="selectWf"></label>
                      <select name="selectWf" id="selectWf" class="info-select">
                        <option value="1">-</option>
                        <option value="2"></option>
                        <option value="3"></option>
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <span>WTG ID*</span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="wtgId" class="sr-only">WTG ID</label>
                    <input type="text" name="wtgId" id="wtgId" placeholder="">
                  </div>
                </div>
              </li>
              <li>
                <span>Manufacture*</span>
                <div class="registration-write btn-input-wrap">
                  <div class="input-group">
                    <label for="Manufacture" class="sr-only">Manufacture</label>
                    <input type="text" name="Manufacture" id="Manufacture" placeholder="">
                  </div>
                  <a href="" class="registration-search-btn">Select</a>
                </div>
              </li>
              <li>
                <span>WTG*</span>
                <div class="registration-write twice-input">
                  <div class="input-group-wrapper">
                    <div class="input-group">
                      <label for="wtg1" class="sr-only">WTG</label>
                      <input type="text" name="wtg1" id="wtg1" placeholder="">
                    </div>
                  </div>
                  <div class="input-group-wrapper">
                    <div class="input-group">
                      <label for="wtg2" class="sr-only">WTG</label>
                      <input type="text" name="wtg2" id="wtg2" placeholder="">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <span>Power(MW)*</span>
                <div class="registration-write">
                  <div class="input-group-wrapper">
                    <div class="input-group">
                      <label for="power" class="sr-only">Power(MW)</label>
                      <input type="text" name="power" id="power" placeholder="">
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <ul class="registration-form-lst">
              <li>
                <span>Tower Height</span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="towerHeight" class="sr-only">Tower Height</label>
                    <input type="text" name="towerHeight" id="towerHeight" placeholder="">
                  </div>
                </div>
              </li>
              <li>
                <span>Rotor Diameter</span>
                <div class="registration-write">
                  <div class="input-group">
                    <label for="rotorDiameter" class="sr-only">Rotor Diameter</label>
                    <input type="text" name="rotorDiameter" id="rotorDiameter" placeholder="">
                  </div>
                </div>
              </li>
              <li>
                <span>Blade</span>
                <div class="registration-write twice-input">
                  <ul class="registration-lst">
                    <li>
                      <div class="input-group-wrapper">
                        <div class="input-group">
                          <label for="bladeType" class="sr-only">Type</label>
                          <input type="text" name="bladeType" id="bladeType" placeholder="Type">
                        </div>
                      </div>
                      <div class="input-group-wrapper">
                        <div class="input-group">
                          <label for="serial1" class="sr-only">Serial #1</label>
                          <input type="text" name="serial1" id="serial1" placeholder="Serial #1">
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="input-group-wrapper">
                        <div class="input-group">
                          <label for="bladeLength" class="sr-only">Length</label>
                          <input type="text" name="bladeLength" id="bladeLength" placeholder="Length">
                        </div>
                      </div>
                      <div class="input-group-wrapper">
                        <div class="input-group">
                          <label for="serial2" class="sr-only">Serial #2</label>
                          <input type="text" name="serial2" id="serial2" placeholder="Serial #2">
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="input-group-wrapper">
                        <div class="input-group">
                          <label for="bladeColor" class="sr-only">Color</label>
                          <input type="text" name="bladeColor" id="bladeColor" placeholder="Color">
                        </div>
                      </div>
                      <div class="input-group-wrapper">
                        <div class="input-group">
                          <label for="serial3" class="sr-only">Serial #3</label>
                          <input type="text" name="serial3" id="serial3" placeholder="Serial #3">
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>

          </div>
        </div>
        <!-- //registration form -->
        <div id="map"></div>
        <script>
          function initMap() {
            var centerMap = new google.maps.LatLng(33.5177623, 126.6457088);

            var map = new google.maps.Map(document.getElementById('map'), {
              center: centerMap,
              zoom: 12.5
            });

            var image = '/img/sub/wf_marker.png';
            var mapMarker = new google.maps.Marker({
              position: centerMap,
              map: map,
              icon: image
            });


            var coordInfoWindow = new google.maps.InfoWindow();
            coordInfoWindow.setContent(createInfoWindowContent(centerMap, map.getZoom()));
            coordInfoWindow.setPosition(centerMap);
            coordInfoWindow.open(map);

            map.addListener('zoom_changed', function() {
              coordInfoWindow.setContent(createInfoWindowContent(centerMap, map.getZoom()));
              coordInfoWindow.open(map);
            });

            /* Popup = createPopupClass();
            popup = new Popup(
                new google.maps.LatLng(-33.866, 151.196),
                document.getElementById('content'));
            popup.setMap(map); */
          }

          var TILE_SIZE = 256;

          function createInfoWindowContent(latLng, zoom) {
            var scale = 1 << zoom;

            var worldCoordinate = project(latLng);

            return [
              latLng
            ].join('<br>');
          }

          // The mapping between latitude, longitude and pixels is defined by the web
          // mercator projection.
          function project(latLng) {
            var siny = Math.sin(latLng.lat() * Math.PI / 180);

            // Truncating to 0.9999 effectively limits latitude to 89.189. This is
            // about a third of a tile past the edge of the world tile.
            siny = Math.min(Math.max(siny, -0.9999), 0.9999);

            return new google.maps.Point(
              TILE_SIZE * (0.5 + latLng.lng() / 360),
              TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
          }
        </script>
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCh3K14xNRxPzr5lD0Y02yHfIpgJnO0SYI&callback=initMap">
        </script>



        <div class="registration-form registration-form2">
          <div class="registration-form-lst-wrap">
            <ul class="registration-form-lst">
              <li>
                <span>Location*</span>
                <div class="registration-write twice-input">
                  <ul class="registration-lst">
                    <li>
                      <div class="input-group-wrapper">
                        <div class="input-group">
                          <label for="latitude" class="sr-only">Location</label>
                          <input type="text" name="latitude" id="latitude" placeholder="Latitude">
                        </div>
                      </div>
                      <div class="input-group-wrapper">
                        <div class="input-group">
                          <label for="latitude" class="sr-only">Location</label>
                          <input type="text" name="latitude" id="latitude" placeholder="Latitude">
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <ul class="registration-form-lst">
              <li class="note">
                <span>Note</span>
                <div class="registration-write">
                  <label for="note" class="sr-only">Longitude</label>
                  <textarea id="note"></textarea>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="wf-right">
        <div class="btns">
          <a href="" class="btn-style btn-style1">Save</a>
          <a href="" class="btn-style btn-style2">Cancel</a>
          <a href="" class="btn-style btn-style3">Delete</a>
        </div>
      </div>
    </div>

    <!-- //발전기 등록 -->
  </div>

<jsp:include page="include/footer.jsp"></jsp:include>
