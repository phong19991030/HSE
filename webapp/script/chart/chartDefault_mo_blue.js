/**
 * Gray theme for Highcharts JS 
 * 2013.04.24
 * @author a2m

 */
var SVG_NS = 'http://www.w3.org/2000/svg';
var hasSVG = !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect;

//chart2,chart3,chart4
var defaultOptions1 =  {colors: ['#0c9aef','#50b432','#ed561b','#7d47c0','#24cbe5','#64e572','#ff9655','#aa78dc']};
var defaultOptions2 =  {colors: ['#50b432','#ed561b','#7d47c0','#24cbe5','#64e572','#ff9655','#aa78dc','#0c9aef']};
var defaultOptions3 =  {colors: ['#ed561b','#7d47c0','#24cbe5','#64e572','#ff9655','#aa78dc','#0c9aef','#50b432']};
var defaultOptions4 =  {colors: ['#7d47c0','#24cbe5','#64e572','#ff9655','#aa78dc','#0c9aef','#50b432','#ed561b']};

/**
 * Default options 
 */
Highcharts.theme = {
	
	colors: ['#0c9aef','#50b432','#ed561b','#7d47c0','#24cbe5','#64e572','#ff9655','#aa78dc'],
	symbols: ['circle'],
	lang: {
		spacingLeft:5,
		spacingRight:5,
		spacingTop:10,
		spacingBottom:5,			
		loading: 'Loading...',
		months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		shortMonths: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
		decimalPoint: '.',
		numericSymbols: null,// ['k', 'M', 'G', 'T', 'P', 'E'], // SI prefixes used in axis labels
		resetZoom: 'Reset zoom',
		resetZoomTitle: 'Reset zoom level 1:1',
		thousandsSep: ','
	},
	global: {
		useUTC: true,
		canvasToolsURL: 'canvas-tools.js',
		VMLRadialGradientURL: 'vml-radial-gradient.png'
	},
	chart: {
		backgroundColor:null,
		borderWidth: 0,
		borderColor: '#ddd',
		borderRadius: 5,
		plotBackgroundColor: null,
		plotShadow: false,
		plotBorderWidth:0,
		defaultSeriesType:'line',
		resetZoomButton: {
			position: {
				align: 'right',
				x: -10,
				y: 10
			},
			theme: {
				zIndex: 20
			}
		},
		style: {
			fontFamily: 'dotum, Arial, Verdana, Helvetica, sans-serif', // default font
			fontSize: '12px',
			color:'#fff'
		}
	},
	title: {
		style: {
			color: '#fff',//#3E576F',
			fontSize: '12px',
			fontWeight: 'normal'
		},
		text: ''
	},
	subtitle: {
		style: {
			color: '#fff'
		},
		text: ''
	},
	xAxis: {
		//allowDecimals: false,
		gridLineWidth: 1,
		gridLineDashStyle:'Dot',
		gridLineColor:'#ccc',
		tickLength:0,
		tickmarkPlacement:'on',
		offset:1,
		lineWidth:1,
		lineColor:'#fff',
		labels:{style:{color:'#fff'}}
	},
	yAxis:  {
		//allowDecimals: false,
		gridLineWidth: 1,
		gridLineDashStyle:'Dot',
		gridLineColor:'#ccc',
		lineWidth:1,
		startOnTick:false,
		endOnTick:false,
		title: {
			text: '',
			style:{fontSize:'12px',fontWeight:'normal'}
		},
		labels:{style:{color:'#fff'}}
	},
	legend: {
		verticalAlign: 'top',
		labelFormatter: function () {
			return this.name;
		},
		backgroundColor: null,
		borderWidth: 0,
		navigation: {
			activeColor: '#ff6600' // docs
		},
		itemStyle: {
			cursor: 'pointer',
			color: '#fff', // docs
			fontSize: '12px'
		},
		itemHoverStyle: {
			color: '#ff6600'
		},
		itemHiddenStyle: {
			color: '#888'
		},
		itemCheckboxStyle: {
			position: 'absolute',
			width: '13px', // for IE precision
			height: '13px'
		},
		symbolWidth: 15,
		y: 0,
		title: { // docs
			style: {
				fontWeight: 'bold'
			}
		}	
	},
	labels: {
		style: {
			position: 'absolute',
			color: '#fff'
		}
	},
	navigation: {
		buttonOptions: {
			theme: {
				stroke: '#888'
			}
		}
	},
	plotOptions: {
		area: {
			fillOpacity:0.8,
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		arearange: {
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		areaspline: {
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		areasplinerange: {
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		bar: {
			borderWidth : 0,
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		boxplot: {
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		bubble: {
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		column: {
			borderWidth : 0,
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		columnrange: {
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		errorbar: {
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		funnel: {
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		gauge :{
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		line: { // base series options
			lineWidth: 1,
			marker: {
				radius: 4,
				states: { // states for a single point
					select: {
						lineWidth: 2
					}
				}
			},
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		pie :{
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		scatter :{
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		spline :{
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		waterfall :{
			dataLabels: {
				formatter:function() {
					return Highcharts.numberFormat(this.y, 2, ".", ",");	
				}
			}
		},
		series:{
			dataLabels: {
				color:'#fff'
			}
		}
	},

	loading: {
		labelStyle: {
			fontWeight: 'bold',
			position: 'relative',
			top: '1em'
		},
		style: {
			position: 'absolute',
			backgroundColor: null,
			opacity: 0.5,
			textAlign: 'center'
		}
	},
	tooltip: {
		dateTimeLabelFormats: { 
			millisecond: '%Y년 %m월 %d일 %H:%M:%S.%L',//'%A, %b %e, %H:%M:%S.%L',//jcreator
			second: '%Y년 %m월 %d일 %H:%M:%S',//'%A, %b %e, %H:%M:%S'
			minute: '%Y년 %m월 %d일 %H:%M',//'%A, %b %e, %H:%M'
			hour: '%Y년 %m월 %d일 %H:%M',//'%A, %b %e, %H:%M'
			day: '%Y년 %m월 %d일 (%A)',//'%A, %b %e, %Y'
			week: '%Y년 %m월 %d일 (%A)',//'Week from %A, %b %e, %Y'
			month: '%Y년 %m월',// '%B %Y'
			year: '%Y년'//'%Y'
		},
		xDateFormat: '%Y년 %m월 %d일 %H:%M:%S',
		headerFormat: '<span style="font-weight:bold;">{point.key}</span><br/>',
		pointFormat: '<span style="margin-top:30px;color:{series.color}">{series.name}</span>: {point.y}<br/>',
		style: {
			color: '#666',
			cursor: 'default',
			fontSize: '12px',
			padding: '6px',
			whiteSpace: 'nowrap'
		},
		valueDecimals:2
	},
	credits: {
		enabled: false
	},
	exporting: {
		enabled:false
	}
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);

