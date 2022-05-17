<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<!DOCTYPE html>
<html lang="KO-KR">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <title>wind Turbine Platform</title>
  <meta name="robots" content="index,follow">
  <meta name="keywords" content="WT, Wind, Turbine, Platform">
  <meta name="description" content="">
  <meta name="copyright" content="Copyright 2020 © AtwoM. ALL Rights Reserved">
  <link href="${ctxPath}/stylesheet/common/common.css" rel="stylesheet" type="text/css" media="all">
  <link href="${ctxPath}/stylesheet/common/layout.css" rel="stylesheet" type="text/css" media="all">
  <link href="${ctxPath}/stylesheet/common/jquery.mCustomScrollbar.min.css" rel="stylesheet" type="text/css" media="all">
  <link href="${ctxPath}/stylesheet/common/main.css" rel="stylesheet" type="text/css" media="all">

  <script type="text/javascript" src="${ctxPath}/script/lib/jquery-2.2.4.min.js"></script>
  <script type="text/javascript" src="${ctxPath}/script/lib/jquery.mCustinScrollbar.concat.min.js"></script>
  <script type="text/javascript" src="${ctxPath}/script/common/common.js"></script>
  <script type="text/javascript" src="${ctxPath}/script/common/layout.js"></script>
  <script type="text/javascript" src="${ctxPath}/script/common/main.js"></script>

  <!--[if lt IE 9]>
 <script src="/_res/jquery/html5shiv.js"></script>
 <script src="/_res/jquery/respond.1.4.2.min.js"></script>
<![endif]-->
</head>

<body class="gnb-active">
  <div id="wrap">
    <jsp:include page="include/header.jsp"></jsp:include>
    <!--contents-->
    <section id="contents">

      <!--detail-content-->
      <div id="detail-content">

        <!--main-->
        <main id="main">
          <div class="box-layout-result" style="height:1500px;">
            <!-- 16.666%, 33.332%, 49.998%, 66.664%, 83.33% -->
            <div class="box box1" style="width:49.998%;top:0;left:0;height:131px;">
              <strong class="heading6">
                <span>Operation Condition</span>
                <a href="" class="box-btn">
                  <i class="xi-angle-right-min"></i>
                </a>
              </strong>
              <div class="box-cont">
                <div class="box-content">
                  <ul class="operation-condition-info">
                    <li>
                      <strong>85</strong>
                      <span>Normal</span>
                    </li>
                    <li>
                      <strong>4</strong>
                      <span>Sensor Error</span>
                    </li>
                    <li>
                      <strong>1</strong>
                      <span>SCADA Alarm</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="box box2" style="width:49.998%;height:347px;top:141px;left:0;">
              <strong class="heading6">
                <span>Sensor error</span>
                <a href="" class="box-btn">
                  <i class="xi-angle-right-min"></i>
                </a>
              </strong>
              <div class="box-cont">
                <div class="box-content">
                  <div class="base_grid_table">
                    <table>
                      <caption>Sensor error - Date, WF, WTG, Component, Sensor</caption>
                      <thead>
                        <tr>
                          <th scope="col">Date</th>
                          <th scope="col">WF</th>
                          <th scope="col">WTG</th>
                          <th scope="col">Component</th>
                          <th scope="col">Sensor</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>2019.08.12 12:12:12</td>
                          <td>Hangwon</td>
                          <td>HS5500</td>
                          <td>Controller</td>
                          <td>N)direction</td>
                        </tr>
                        <tr>
                          <td>2019.08.12 12:12:12</td>
                          <td>Hangwon</td>
                          <td>HS5500</td>
                          <td>Controller</td>
                          <td>N)direction</td>
                        </tr>
                        <tr>
                          <td>2019.08.12 12:12:12</td>
                          <td>Hangwon</td>
                          <td>HS5500</td>
                          <td>Controller</td>
                          <td>N)direction</td>
                        </tr>
                        <tr>
                          <td>2019.08.12 12:12:12</td>
                          <td>Hangwon</td>
                          <td>HS5500</td>
                          <td>Controller</td>
                          <td>N)direction</td>
                        </tr>
                        <tr>
                          <td>2019.08.12 12:12:12</td>
                          <td>Hangwon</td>
                          <td>HS5500</td>
                          <td>Controller</td>
                          <td>N)direction</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div class="box box3" style="width:49.998%;height:347px;top:498px;left:0;">
              <strong class="heading6">
                <span>SCADA Alarm</span>
                <a href="" class="box-btn">
                  <i class="xi-angle-right-min"></i>
                </a>
              </strong>
              <div class="box-cont">
                <div class="box-content">
                  <div class="base_grid_table">
                    <table>
                      <caption>SCADA Alarm - Date, WF, WTG, Component, Sensor</caption>
                      <thead>
                        <tr>
                          <th scope="col">Date</th>
                          <th scope="col">WF</th>
                          <th scope="col">WTG</th>
                          <th scope="col">Component</th>
                          <th scope="col">Sensor</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>2019.08.12 12:12:12</td>
                          <td>Hangwon</td>
                          <td>HS5500</td>
                          <td>Controller</td>
                          <td>N)direction</td>
                        </tr>
                        <tr>
                          <td>2019.08.12 12:12:12</td>
                          <td>Hangwon</td>
                          <td>HS5500</td>
                          <td>Controller</td>
                          <td>N)direction</td>
                        </tr>
                        <tr>
                          <td>2019.08.12 12:12:12</td>
                          <td>Hangwon</td>
                          <td>HS5500</td>
                          <td>Controller</td>
                          <td>N)direction</td>
                        </tr>
                        <tr>
                          <td>2019.08.12 12:12:12</td>
                          <td>Hangwon</td>
                          <td>HS5500</td>
                          <td>Controller</td>
                          <td>N)direction</td>
                        </tr>
                        <tr>
                          <td>2019.08.12 12:12:12</td>
                          <td>Hangwon</td>
                          <td>HS5500</td>
                          <td>Controller</td>
                          <td>N)direction</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div class="box box4" style="width:49.998%;height:507px;top:855px;left:0;">
              <strong class="heading6">
                <span>Report</span>
                <a href="" class="box-btn">
                  <i class="xi-angle-right-min"></i>
                </a>
              </strong>
              <div class="box-cont">
                <div class="box-content">
                  <ul class="report-lst">
                    <li>
                      <span>WTG Inspection</span>
                      <Strong>85</Strong>
                    </li>
                    <li>
                      <span>WTG Checklist</span>
                      <Strong>26</Strong>
                    </li>
                    <li>
                      <span>Blade Inspection</span>
                      <Strong>32</Strong>
                    </li>
                  </ul>
                  <div class="base_grid_table">
                    <table>
                      <caption>Report - Type, No., Title, Date, Tag</caption>
                      <thead>
                        <tr>
                          <th scope="col">Type</th>
                          <th scope="col">No.</th>
                          <th scope="col">Title</th>
                          <th scope="col">Date</th>
                          <th scope="col">Tag</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>WTG Checklist</td>
                          <td>323</td>
                          <td>Maintenance for Hangwon Wind Farm</td>
                          <td>2019.08.12 12:12:12</td>
                          <td>#Alarm #Rain</td>
                        </tr>
                        <tr>
                          <td>WTG Checklist</td>
                          <td>323</td>
                          <td>Maintenance for Hangwon Wind Farm</td>
                          <td>2019.08.12 12:12:12</td>
                          <td>#Alarm #Rain</td>
                        </tr>
                        <tr>
                          <td>WTG Checklist</td>
                          <td>323</td>
                          <td>Maintenance for Hangwon Wind Farm</td>
                          <td>2019.08.12 12:12:12</td>
                          <td>#Alarm #Rain</td>
                        </tr>
                        <tr>
                          <td>WTG Checklist</td>
                          <td>323</td>
                          <td>Maintenance for Hangwon Wind Farm</td>
                          <td>2019.08.12 12:12:12</td>
                          <td>#Alarm #Rain</td>
                        </tr>
                        <tr>
                          <td>WTG Checklist</td>
                          <td>323</td>
                          <td>Maintenance for Hangwon Wind Farm</td>
                          <td>2019.08.12 12:12:12</td>
                          <td>#Alarm #Rain</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="box box5" style="width:49.998%;height:421px;top:0;left:calc(49.998% + 26px);">
              <strong class="heading6">
                <span>Availability</span>
                <a href="" class="box-btn">
                  <i class="xi-angle-right-min"></i>
                </a>
              </strong>
              <div class="box-cont">
                <div class="box-content">
                  <div class="chart-info-wrap">
                    <div class="chart-info-cont">
                      <ul class="chart-info-lst">
                        <li>
                          <span>2020</span>
                        </li>
                        <li>
                          <span>2019</span>
                        </li>
                      </ul>

                      <div class="select-box">
                        <label for="daySelect"></label>
                        <select name="daySelect1" id="daySelect" class="info-select">
                          <option value="1">Day</option>
                          <option value="2">Month</option>
                          <option value="3">Year</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="graph-wrap">
                    <div id="container1"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="box box6" style="width:49.998%;height:421px;top:431px;left:calc(49.998% + 26px);">
              <strong class="heading6">
                <span>Production</span>
                <a href="" class="box-btn">
                  <i class="xi-angle-right-min"></i>
                </a>
              </strong>
              <div class="box-cont">
                <div class="box-content">
                  <div class="chart-info-wrap">
                    <div class="chart-info-cont">
                      <ul class="chart-info-lst">
                        <li>
                          <span>2020</span>
                        </li>
                        <li>
                          <span>2019</span>
                        </li>
                      </ul>

                      <div class="select-box">
                        <label for="daySelect"></label>
                        <select name="daySelect1" id="daySelect" class="info-select">
                          <option value="1">Day</option>
                          <option value="2">Month</option>
                          <option value="3">Year</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="graph-wrap">
                    <div id="container2"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="box box7" style="width:49.998%;height:500px;top:862px;left:calc(49.998% + 26px);">
              <strong class="heading6">
                <span>Failure Rate</span>
                <a href="" class="box-btn">
                  <i class="xi-angle-right-min"></i>
                </a>
              </strong>
              <div class="box-cont">
                <div class="box-content">
                  <div class="chart-info-wrap">
                    <div class="chart-info-cont">
                      <ul class="chart-info-lst">
                        <li>
                          <span>2020</span>
                        </li>
                        <li>
                          <span>2019</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="graph-wrap">
                    <div id="container3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <jsp:include page="include/main_footer.jsp"></jsp:include>
        <!--main-->

        <!--main에만 들어가는 js-->
        <script src="https://code.highcharts.com/stock/highstock.js"></script>
        <script src="https://code.highcharts.com/stock/modules/data.js"></script>
        <script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/stock/modules/export-data.js"></script>

        <script type="text/javascript">
          $(document).ready(function() {
            $('body').removeClass('gnb-active');
            $('body').addClass('gnb-none main-wrap');
          });

          Highcharts.setOptions({
            colors: ['#486dfb', '#89898b']
          });

          Highcharts.chart('container1', {
            chart: {
              type: 'areaspline',
              reflow: true
            },
            title: {
              text: null
            },
            legend: {
              layout: 'vertical',
              align: 'left',
              verticalAlign: 'top',
              x: 150,
              y: 100,
              floating: true,
              borderWidth: 1,
              backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#fff'
            },
            xAxis: {
              categories: [
                '03.28',
                '03.29',
                '03.30',
                '03.31',
                '04.01',
                '04.02',
                '04.03',
                '04.04'
              ],
              plotBands: [{ // visualize the weekend
                from: 4.5,
                to: 6.5,
                color: '#fff'
              }]
            },
            yAxis: {
              title: {
                text: null
              }
            },
            tooltip: {
              shared: true,
              valueSuffix: 'units'
            },
            credits: {
              enabled: false
            },
            plotOptions: {
              areaspline: {
                fillOpacity: 0.5
              }
            },
            series: [{
              name: '2020',
              data: [3, 4, 3, 5, 4, 10, 12, 9]
            }, {
              name: '2019',
              data: [1, 3, 4, 3, 3, 5, 4, 5]
            }]
          });

          Highcharts.chart('container2', {
            chart: {
              type: 'area'
            },
            xAxis: {
              allowDecimals: false,
              labels: {
                formatter: function() {
                  return this.value; // clean, unformatted number for year
                }
              },
              accessibility: {
                rangeDescription: null
              }
            },
            yAxis: {
              title: {
                text: null
              },
              labels: {
                formatter: function() {
                  return this.value / 1000 + 'k';
                }
              }
            },
            tooltip: {
              pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            plotOptions: {
              area: {
                pointStart: 1940,
                marker: {
                  enabled: false,
                  symbol: 'circle',
                  radius: 0,
                  states: {
                    hover: {
                      enabled: true
                    }
                  }
                }
              }
            },
            series: [{
              name: '2019',
              data: [
                null, null, null, null, null, 6, 11, 32, 110, 235,
                369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
                20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
                26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380,
                21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824,
                10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326,
                5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018
              ]
            }, {
              name: '2020',
              data: [null, null, null, null, null, null, null, null, null, null,
                5, 25, 50, 120, 150, 200, 426, 660, 869, 1060,
                1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
                11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935,
                30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000,
                37000, 35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                21000, 20000, 19000, 18000, 18000, 17000, 16000, 15537, 14162, 12787,
                12600, 11400, 5500, 4512, 4502, 4502, 4500, 4500
              ]
            }]
          });
          var chart = Highcharts.chart('container3', {

            chart: {
              type: 'column'
            },

            title: {
              text: null
            },

            subtitle: {
              text: null
            },

            /*  legend: {
                 align: 'right',
                 verticalAlign: 'middle',
                 layout: 'vertical'
             }, */

            xAxis: {
              categories: ['Tower', 'Hub &Rotor', 'Gear Train', 'Generator', 'Hydraulic system', 'Yaw system', 'Pitch system', 'Blade'],
              labels: {
                x: -10
              }
            },

            yAxis: {
              allowDecimals: false,
              title: {
                text: null
              }
            },

            series: [{
              name: '2020',
              data: [1, 4, 3, 5, 2, 4, 6, 7]
            }, {
              name: '2019',
              data: [6, 4, 2, 1, 4, 3, 5, 2]
            }],

            
          });

          /*    document.getElementById('small').addEventListener('click', function () {
                 chart.setSize(400);
             });

             document.getElementById('large').addEventListener('click', function () {
                 chart.setSize(600);
             });

             document.getElementById('auto').addEventListener('click', function () {
                 chart.setSize(null);
             }); */

          /* setInterval(function() {
            $("#container1").highcharts().reflow();
          }, 1);
          setInterval(function() {
            $("#container2").highcharts().reflow();
          }, 1);
          setInterval(function() {
            $("#container3").highcharts().reflow();
          }, 1); */
        </script>
        <!--//main에만 들어가는 js-->