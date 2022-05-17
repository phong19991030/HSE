var _highchart = {
	/*  
     *   typeof 연산자로도 변수의 타입체크가 가능 하지만 null, array, object, 사용저 정의 객체등 
     *   거의 모든 객체의 경우 object만들 반환 하므로 타입에 대한 좀 더 구체적 결과를 위해 만든 함수
     */
    getType: function(t) {
        return Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
    },
	/*
	 * 		# NOTE
	 * 		* Member 함수 내부에서 this를 사용 할 경우, 일반 함수 선언 시에는 문제 없지만 callback 함수 (click event..) 로 사용 될 경우, 
	 * 		  scope로 인해 this가 달라짐  
	 */
	///// [ chart 관련 ] ////////////////////////////////////////////////////////////////////////////////////
	getChart:function(i) {
//        if(i) {
//            var chart;
//            chart = Highcharts.charts.filter((e) => e.renderTo.id === i)[0];    
//            if(!chart) chart = Highcharts.charts[i];
//        } else {
//            chart = Highcharts.charts[0];
//        }
        return $('#' + i).highcharts();
    },
    getChartByNum: function(i) {
        return Highcharts.charts[i];
    },
    getChartByID: function(id) {
        return Highcharts.charts.filter((e) => e.renderTo.id === id)[0];
    },
    deleteChartByID: function(id) {
        var charts = Highcharts.charts, i = Highcharts.charts.length;
        
        while(i--) {
            if(charts[i].renderTo.id === id) {
                charts[i].destroy();
                charts.splice(i, 1); 
            }
        }
        
//    	for(var i=Highcharts.charts.length-1; i>=0; i--) {
//            var e = Highcharts.charts[i];
//            if(e.renderTo.id === id) {
//                // 기존 차트 삭제 
//                e.destroy();
//                Highcharts.charts.splice(i, 1);
//            }
//        }
    },
    /* 
        Chart List 초기화 
    */
    chartsInitialization: function() {
    	for(var i=Highcharts.charts.length-1; i>=0; i--) {
            var e = Highcharts.charts[i];

            if(e) {
                // 기존 차트 삭제 
                e.destroy();
            }
            Highcharts.charts.splice(i, 1);
        }
    }, 
    chartSetOptions: function(options) {
        return Highcharts.setOptions(options);
    },
    mergeOptions: function(options, addOption) {
        return Highcharts.merge(options, addOption);
    },
    /*
        추후 업데이트 예정 Highcharts.Chart.prototype.toggleFullscreen()  
        # 관련 링크
        * https://www.highcharts.com/forum/viewtopic.php?t=42542
    */
    showFullScreen: function(id) {
        var chart = _highchart.getChart(id);
        if(chart) {
            Highcharts.FullScreen = function(container) {
                this.init(container.parentNode); // main div of the chart
            };

            Highcharts.FullScreen.prototype = {
                init: function(container) {
                    if (container.requestFullscreen) {
                        container.requestFullscreen();
                    } else if (container.mozRequestFullScreen) {
                        container.mozRequestFullScreen();
                    } else if (container.webkitRequestFullscreen) {
                        container.webkitRequestFullscreen();
                    } else if (container.msRequestFullscreen) {
                        container.msRequestFullscreen();
                    }
                }
            };
            chart.fullscreen = new Highcharts.FullScreen(chart.container);        
        }
    },
    ///// [ series 관련 ] ///////////////////////////////////////////////////////////////////////////////
    addSeries: function(id, series) {
        var chart = _highchart.getChart(id);
//        if(chart) {
//            var series = {};
//            if(id) series['id'] = id;
//            if(data) series['data'] = data;
//            chart.addSeries(series);        
//        }
        return chart.addSeries(series);
    },
    updateSeriesDate: function(id, i, data) {
        var chart = _highchart.getChart(id);
        if(chart) {
            if(chart.get(i)) chart.get(i).setData(data);
            if(chart.series[i]) chart.series[i].date(data);
        }
    },
    removeSeries: function(id, i) {
        var chart = _highchart.getChart(id);
        if(chart) {
            if(chart.get(i)) chart.get(i).remove();
            if(chart.series[i]) chart.series[i].remove();
        }
    },
    getSeries: function(id, i) {
        var chart = _highchart.getChart(id);
        if(chart) {
            if(chart.get(i)) return chart.get(i);
            if(chart.series[i]) return chart.series[i];
        }
    },
    hideSeries: function(id, i) {
        var chart = _highchart.getChart(id);
        if(chart) {
            if(chart.get(i)) chart.get(i).hide();
            if(chart.series[i]) chart.series[i].hide();
        }
    },
    showSeries: function(id, i) {
        var chart = _highchart.getChart(id);
        if(chart) {
            if(chart.get(i)) chart.get(i).show();
            if(chart.series[i]) chart.series[i].show();
        }
    },
    ///// [ plotLine 관련 ] /////////////////////////////////////////////////////////////////////////////////
    /*
            # NOTE
            1.  addPlotLine, removePlotLine 이외에 
                addPlotBand, removePlotBand, removePlotBandOrLine, addPlotBandOrLine 도 존재 
    */
    
    getPlotLine: function(id, target_id, xy, index) {
        var axis = _highchart.getAxis(id, xy, index);
        if(axis) {
            var plotLines = axis.plotLinesAndBands, i = axis.plotLinesAndBands.length;
            while(i--) {
                //if(target_id) {
                    if(target_id === plotLines[i].id) {
                        return plotLines[i];
                    }
                //}
            }
        }
    },
    /*  
        # addPlotLines : chart에 plotline을 추가하는 기능
        @param  id : 대상 chart container element id
                plotLines : 추가 할 plotlines list (list or object)
                xy : axis type
                index : axis index
    */
    addPlotLines: function(id, plotLines, xy, index) {
        var axis = _highchart.getAxis(id, xy, index);
        if(axis) {
            if(_highchart.getType(plotLines) === 'array') {
                plotLines.forEach((e) => {
                    axis.addPlotLine(e);
                });
            } else if(_highchart.getType(plotLines) === 'object') {
                axis.addPlotLine(plotLines);              
            }
        }
    },
    /*  
        # removePlotLines : chart에 plotline을 삭제
        @param  id: 대상 chart container element id
                xy: axis type
                index: axis index
                target_id: 제거 할 특정 plotline id
        
        @NOTICE target_id 값을 입력 안 할 경우, 존재하는 모든 plotline 삭제 
        
    */
    removePlotLines: function(id, target_id, xy, index) {
        var axis = _highchart.getAxis(id, xy, index);
        if(axis) {
            var plotLines = axis.plotLinesAndBands, i = axis.plotLinesAndBands.length;
            while(i--) {
                if(target_id) {
                    if(target_id === plotLines[i].id) {
                        plotLines[i].destroy();
                        //plotLines[i]['destroy']();
                    }
                }
                // 모든 plotLine 삭제 
                else {
                    plotLines[i].destroy();
                }
            }
        }
    },
    hidePlotLines: function(id, target_id, xy, index) {
        var axis = _highchart.getAxis(id, xy, index);
        if(axis) {
            
            var plotLines = axis.plotLinesAndBands, i = axis.plotLinesAndBands.length;
            
            while(i--) {
                if(target_id) {
                    if(target_id === plotLines[i].id) {
                        plotLines[i].svgElem.hide();
//                        plotLines[i].svgElem['hide']();
//                        plotLines[i].svgElem['show']();
                        if(plotLines[i].label) plotLines[i].label.hide();
                    }
                }
                // 모든 plotLine 삭제 
                else {
                    plotLines[i].svgElem.hide();
                    if(plotLines[i].label) plotLines[i].label.hide();
                }
            }
        }
    },
    showPlotLines: function(id, target_id, xy, index) {
        var axis = _highchart.getAxis(id, xy, index);
        if(axis) {
            
            var plotLines = axis.plotLinesAndBands, i = axis.plotLinesAndBands.length;
            
            while(i--) {
                if(target_id) {
                    if(target_id === plotLines[i].id) {
                        plotLines[i].svgElem.show();
                        if(plotLines[i].label) plotLines[i].label.show();
                    }
                }
                // 모든 plotLine 삭제 
                else {
                    plotLines[i].svgElem.show();
                    if(plotLines[i].label) plotLines[i].label.show();
                }
            }
        }
    },
    
    ///// [ axis 관련 ] /////////////////////////////////////////////////////////////////////////////////
    getAxis: function(id, xy, index) {
        var chart = _highchart.getChart(id);
        var axis = xy === 'x' ? chart.xAxis : xy === 'y' ? chart.yAxis : [];
        
        if(_highchart.getType(index) === 'number') {
            if(axis[index]) {
                return axis[index];    
            } else {
                console.error('index error');
            }
        }
        else if(_highchart.getType(index) === 'undefined') {
            return axis[0];
        }
        else {
            console.error('parameter type error');
        }
    },
    /*  
        axis view 조정 기능 
        index undefined 일 경우, 0 번째
    */
    setAxisView: function(id, from, to, xy, index) {
        var axis = _highchart.getAxis(id, xy, index);
        if(axis) {
            axis.setExtremes(from, to);    
        }
    },
    /*
        target 
        * max / min         : 해당 축의 max / min 값
        * tickInterval      : 해당 축의 tick 간격 
        * dataMax / dataMin : data의 max / min 값
    */
    getAxisValue: function(id, target, xy, index) {
        var axis = _highchart.getAxis(id, xy, index);
        if(axis) {
            return axis[target];
        }
    },
    
    ///// [ export 관련 ] ///////////////////////////////////////////////////////////////////////////////
    exportFile: function(id, type, filename) {
        var type;
        switch(type) {
            case 'pdf':
                type = 'application/pdf'
                break;
            case 'png':
                type = 'image/png'
                break;
            case 'jpeg':
                type = 'image/jpeg'
                break;
            case 'xml':
                type = 'image/svg+xml'
                break;
            default:
                type = 'image/png'
        }
        
        var chart = _highchart.getChart(id);
        if(chart) {
            filename = filename ? filename : chart.renderTo.id;
            chart.exportChart({
                type: type,
                filename: filename
            });        
        } 
    },
    exportData: function(id, type) {
        var chart = _highchart.getChart(id);
        if(chart) {
            var output;
            switch(type) {
                case 'csv':
                    output = chart.getCSV();        
                    break;
                case 'svg':
                    output = chart.getSVG();        
                    //output = chart.getSVGForExport();        
                    break;
                case 'data':
                    output = chart.getDataRows();        
                    break;
                case 'table':
                    output = chart.getTable();        
                    break;
                default:
                    output = chart.getCSV();        
                    
            }
            return output;  
        }
    },
    // Highcharts.charts[0].exporting.update({sourceWidth:1000, sourceHeight: 500});
    updateExportOptions: function(id, options) {
        var flag;
        var chart = _highchart.getChart(id);
        if(chart) chart.exporting.update(options);
    },
    selectNavigationMenu: function(num) {
        /*
         * 		0 : Full Screen
         * 		1 : Print Chart
         * 		2 : Download (.png)
         * 		3 : Download (.jpeg)
         * 		4 : Download (.pdf)
         * 		5 : Download (.svg) vector image
         * 		6 : Download (.csv) excel
         * 		7 : Download (.xls) excel
         * 		8 : View Data Table
         */
        // menu active btn click
        $('.highcharts-contextbutton').click();
        // menu hide
        $('ul.highcharts-menu').css('display', 'none');
        // menu click
        $('.highcharts-menu-item')[num].click();
    },
    
}



// SVG 태그 Base64(SVG) 데이터로 변환 
SVGElement.prototype.toDataURL = function(type, options) {
    var _svg = this;

    function debug(s) {
        console.log("SVG.toDataURL:", s);
    }

    function exportSVG() {
        var svg_xml = XMLSerialize(_svg);
        var svg_dataurl = base64dataURLencode(svg_xml);
        debug(type + " length: " + svg_dataurl.length);

        // NOTE double data carrier
        if (options.callback) options.callback(svg_dataurl);
        return svg_dataurl;
    }

    function XMLSerialize(svg) {

        // quick-n-serialize an SVG dom, needed for IE9 where there's no XMLSerializer nor SVG.xml
        // s: SVG dom, which is the <svg> elemennt
        function XMLSerializerForIE(s) {
            var out = "";

            out += "<" + s.nodeName;
            for (var n = 0; n < s.attributes.length; n++) {
                out += " " + s.attributes[n].name + "=" + "'" + s.attributes[n].value + "'";
            }

            if (s.hasChildNodes()) {
                out += ">\n";

                for (var n = 0; n < s.childNodes.length; n++) {
                    out += XMLSerializerForIE(s.childNodes[n]);
                }

                out += "</" + s.nodeName + ">" + "\n";

            } else out += " />\n";

            return out;
        }


        if (window.XMLSerializer) {
            debug("using standard XMLSerializer.serializeToString")
            return (new XMLSerializer()).serializeToString(svg);
        } else {
            debug("using custom XMLSerializerForIE")
            return XMLSerializerForIE(svg);
        }

    }

    function base64dataURLencode(s) {
        var b64 = "data:image/svg+xml;base64,";
        //var b64 = "data:image/png;base64,";

        // https://developer.mozilla.org/en/DOM/window.btoa
        if (window.btoa) {
            debug("using window.btoa for base64 encoding");
            //b64 += btoa(s);
            // VM3563:1 Uncaught DOMException: Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.
            b64 += btoa(unescape(encodeURIComponent(s)));
        } else {
            debug("using custom base64 encoder");
            b64 += Base64.encode(s);
        }

        return b64;
    }

    function exportImage(type) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');

        // TODO: if (options.keepOutsideViewport), do some translation magic?

        var svg_img = new Image();
        var svg_xml = XMLSerialize(_svg);
        svg_img.src = base64dataURLencode(svg_xml);

        svg_img.onload = function() {
            debug("exported image size: " + [svg_img.width, svg_img.height])
            canvas.width = svg_img.width;
            canvas.height = svg_img.height;
            ctx.drawImage(svg_img, 0, 0);

            // SECURITY_ERR WILL HAPPEN NOW
            var png_dataurl = canvas.toDataURL(type);
            debug(type + " length: " + png_dataurl.length);

            if (options.callback) options.callback( png_dataurl );
            else debug("WARNING: no callback set, so nothing happens.");
        }

        svg_img.onerror = function() {
            console.log(
                "Can't export! Maybe your browser doesn't support " +
                "SVG in img element or SVG input for Canvas drawImage?\n" +
                "http://en.wikipedia.org/wiki/SVG#Native_support"
            );
        }

        // NOTE: will not return anything
    }

    function exportImageCanvg(type) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        var svg_xml = XMLSerialize(_svg);

        // NOTE: canvg gets the SVG element dimensions incorrectly if not specified as attributes
        //debug("detected svg dimensions " + [_svg.clientWidth, _svg.clientHeight])
        //debug("canvas dimensions " + [canvas.width, canvas.height])

        var keepBB = options.keepOutsideViewport;
        if (keepBB) var bb = _svg.getBBox();

        // NOTE: this canvg call is synchronous and blocks
        canvg(canvas, svg_xml, { 
            ignoreMouse: true, ignoreAnimation: true,
            offsetX: keepBB ? -bb.x : undefined, 
            offsetY: keepBB ? -bb.y : undefined,
            scaleWidth: keepBB ? bb.width+bb.x : undefined,
            scaleHeight: keepBB ? bb.height+bb.y : undefined,
            renderCallback: function() {
                debug("exported image dimensions " + [canvas.width, canvas.height]);
                var png_dataurl = canvas.toDataURL(type);
                debug(type + " length: " + png_dataurl.length);

                if (options.callback) options.callback( png_dataurl );
            }
        });

        // NOTE: return in addition to callback
        return canvas.toDataURL(type);
    }

    // BEGIN MAIN

    if (!type) type = "image/svg+xml";
    if (!options) options = {};

    if (options.keepNonSafe) debug("NOTE: keepNonSafe is NOT supported and will be ignored!");
    if (options.keepOutsideViewport) debug("NOTE: keepOutsideViewport is only supported with canvg exporter.");

    switch (type) {
        case "image/svg+xml":
            return exportSVG();
            break;

        case "image/png":
        case "image/jpeg":

            if (!options.renderer) {
                if (window.canvg) options.renderer = "canvg";
                else options.renderer="native";
            }

            switch (options.renderer) {
                case "canvg":
                    debug("using canvg renderer for png export");
                    return exportImageCanvg(type);
                    break;

                case "native":
                    debug("using native renderer for png export. THIS MIGHT FAIL.");
                    return exportImage(type);
                    break;

                default:
                    debug("unknown png renderer given, doing noting (" + options.renderer + ")");
            }

            break;

        default:
            debug("Sorry! Exporting as '" + type + "' is not supported!")
    }
};


