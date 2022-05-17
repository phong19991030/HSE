

var _googlemap = {
	/*
	 * 		여러 좌표중 중심 좌표 구하기 
	 */
	calculateCenterPosition: function(positions, keyLat, keyLng, default_position) {
		var x1, y1, x2, y2;			// 가장 작은 위도 값, 가장 작은 경도 값, 가장 큰 위도 값, 가장 큰 경도 값
		var lng, lat;
		if(positions.length > 0) {
			
			positions.forEach((e) =>  {
				
				if(x1 == undefined) {
					x1 = e[keyLat];
					x2 = e[keyLat];
					y1 = e[keyLng];
					y2 = e[keyLng];
				}
				
				if(e[keyLat] > x2) {
					x2 = e[keyLat];
				}
				
				if(e[keyLat] < x1) {
					x1 = e[keyLat];
				}
				
				if(e[keyLng] > y2) {
					y2 = e[keyLng];
				}
				
				if(e[keyLng] < y1) {
					y1 = e[keyLng];
				}
				
			});
			
			lat = x1 + ((x2-x1) / 2);
			lng = y1 + ((y2-y1) / 2);
			
		} else {
			if(default_position) {
				lat = default_position[keyLat];
				lng = default_position[keyLng];
			} else {
				// default position
				lat = 39.02791474178068;
				lng = 125.76694142503095;
			}
		}
		return {lat: lat, lng: lng};
	},
	getMeterPerPixel: function(latitude, zoom) {
		return 156543.03392 * Math.cos(latitude * Math.PI / 180) / Math.pow(2, zoom);
	},
	zoom: {
		changeLog: function(zoom) {
			console.log('[new-zoom] 		: ' + zoom.newZoom + '\n' + 
					'[old-zoom]		: ' + zoom.oldZoom + '\n' +
					'[zoom-motion]	: ' + zoom.motion + '\n' + 
					'[bounds] 		: ' + zoom.bound + '\n' + 
					'[m/pixel] 		: ' + zoom.metersPerPx + '\n' +
					'[Control] 		: ' + zoom.control + '\n' +
					'[View]			: ' + zoom.view		
			);
		},
	}

};