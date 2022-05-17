/**
 * Gray theme for Highcharts JS 
 * 2013.04.24
 * @author a2m

 */
var SVG_NS = 'http://www.w3.org/2000/svg';
var hasSVG = !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect;


/**
 * Default options 
 */
Highcharts.theme = {
	
	colors: ['#5090d7','#10aac5','#6aa72e','#b8c516','#ff9900','#df73dc'],
	symbols: ['circle'],
	lang: {
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
		spacingLeft:5,
		spacingRight:5,
		spacingTop:10,
		spacingBottom:5,
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
			color:'#666'
		}
	},
	title: {
		style: {
			color: '#666',//#3E576F',
			fontSize: '12px',
			fontWeight: 'bold'
		},
		text: ''
	},
	subtitle: {
		style: {
			color: '#666'
		},
		text: ''
	},
	xAxis: {
		gridLineWidth: 0,
		tickmarkPlacement:'on',
		tickLength:0,
		offset:0,
		lineWidth:1,
		lineColor:'#777',
		labels:{style:{color:'#666'}}
	},
	yAxis:  {
		gridLineWidth: 1,
		gridLineDashStyle:'line',
		gridLineColor:'#e4e4e4',
		lineWidth:1,
		lineColor:'#777',
		startOnTick:false,
		endOnTick:false,
		title: {
			text: '',
			style:{fontSize:'12px',fontWeight:'normal'}
		},
		labels:{style:{color:'#666'}}
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
			color: '#666', // docs
			fontSize: '12px'
		},
		itemHoverStyle: {
			color: '#ff6600'
		},
		itemHiddenStyle: {
			color: '#ddd'
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
			color: '#666'
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
			fillOpacity:1,
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
				color:'#666'
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
			backgroundColor: 'white',
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
		valueDecimals:2,
		xDateFormat: '%Y년 %m월 %d일 %H:%M:%S',
		headerFormat: '<span style="font-weight:bold;">{point.key}</span><br/>',
		pointFormat: '<span style="margin-top:30px;color:{series.color}">{series.name}</span>: {point.y}<br/>',
		style: {
			color: '#666',
			cursor: 'default',
			fontSize: '12px',
			padding: '6px',
			whiteSpace: 'nowrap'
		}
	},
	credits: {
		enabled: false
	}
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);

