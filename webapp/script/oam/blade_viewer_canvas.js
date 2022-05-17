/**
 * # blade viewer 관련 
 * @param window
 * @returns
 * @author parkjk
 */
(function(window) {
    
    /* 생성자 */
    function A(canvasId, bladeLength) {
        
        this.bladeViewerImg = window.CTX + '/images/blades/turbine-blade.png';
        // 위험도 컬러
        this.SERVERITY_COLOR = {0:'gray',1:'green',2:'lightgreen',3:'yellow',4:'orange',5:'red'};
        this.contextSaved = false;
        this.OFFSET_W = 50;
        // 화면 블레이드 높이 (pixels) - BLADE_HEIGHT
        this.BLADE_VIEW_HEIGHT = 714;
        // 실제 블레이드 길이 (meter) - REAL_LENGTH
        this.BLADE_REAL_LENGTH = bladeLength || 50;
        // m 당 pixel 수치 (m/pixels)
        this.METER_PER_PIXEL = (this.BLADE_VIEW_HEIGHT/this.BLADE_REAL_LENGTH);
        // y: 격자 시작점
        this.FIRST_MID_POS = {x: 173, y: 27};
        // y: 격자 끝점
        this.LAST_MID_POS = {x: 173, y: 741};
        
        // 왼쪽 border line LE
        this.L_BORDER_LE = [];
        // 오른쪽 border line LE
        this.R_BORDER_LE = [];
        
        // LEFT
        this.L_FIRST_POS = {x: 105 + this.OFFSET_W, y: 26};
        this.L_MID_POS = {x: 105 + this.OFFSET_W, y: 245};
        this.L_LAST_POS = {x: 139, y: 741};
        
        // RIGHT
        this.R_FIRST_POS = {x: 141 + this.OFFSET_W, y: 26};
        this.R_MID_POS = {x: 141 + this.OFFSET_W, y: 245};
        this.R_LAST_POS = {x: 209, y: 741};
        
        this.OFFSET_TAN = ((this.L_MID_POS.x - this.L_LAST_POS.x) / (this.L_LAST_POS.y - this.L_MID_POS.y));
        
        /* left positions 설정 */
        for(var i = this.L_FIRST_POS.y, len = this.L_MID_POS.y; i < len; i++) {
            this.L_BORDER_LE.push({x: this.L_FIRST_POS.x, y: i});
        }
        for (var i = this.L_MID_POS.y, len = this.L_LAST_POS.y; i < len; i++) {
            const oppositeLength = i - this.L_MID_POS.y;
            this.L_BORDER_LE.push({x: parseFloat((this.L_FIRST_POS.x - getOppositeLength(this.OFFSET_TAN, oppositeLength))), y: i});
        }
        /* right positions 설정 */
        for (var i = this.R_FIRST_POS.y, len = this.R_MID_POS.y; i < len; i++) {
            this.R_BORDER_LE.push({x: this.R_FIRST_POS.x, y: i});
        }
        for (var i = this.R_MID_POS.y, len = this.R_LAST_POS.y; i < len; i++) {
            const oppositeLength = i - this.R_MID_POS.y;
            this.R_BORDER_LE.push({x: parseFloat((this.R_FIRST_POS.x + getOppositeLength(this.OFFSET_TAN, oppositeLength))), y: i});
        }
        
        function getOppositeLength(tan, adjacentEdge) {
            return parseFloat((tan * adjacentEdge));;
        }
        
        // click 가능한 범위 리스트 : drawNumber(push), drawImage(event 추가)
        this.clickableZones = [];
        
        // 대상 canvas tag
        this.target = document.getElementById(canvasId);
        // Damage List 정보 
        this.DAMAGE_LIST = [];
        // canvas 상태 저장 
        this.history = [];
    };
    
    /* 초기화 */
    A.prototype.init = function() {
        // canvas 지원 검증
        if(this.target.getContext) {
            this.canvas = this.target.getContext('2d');
        } else {
            // canvas 지원 안 할 경우 
        }
        
        // 배경색, 크기 세팅 
        this.canvas.fillStyle = 'white';
        this.canvas.fillRect(0,9, this.target.width, this.target.height);
        
        return this;
    }
    
    /* 블레이드 길이 세팅 */
    A.prototype.setBladeLength = function(length) {
        if(typeof length === 'number') {
            this.BLADE_REAL_LENGTH = length;
            this.METER_PER_PIXEL = (this.BLADE_VIEW_HEIGHT/this.BLADE_REAL_LENGTH);
        }
        return this;
    }
    /* 손상 내역 리스트 비우기 */
    A.prototype.emptyDamageList = function() {
        this.DAMAGE_LIST = [];
        return this;
    }
    
    /* 이미지 그리기 */
    A.prototype.drawImage = function(path = this.bladeViewerImg) {
        var img = new Image(); 
        img.crossOrigin = 'Anonymous';
        img.src = path;
        
        var a = this;
        var c = this.canvas;
        var offset = this.OFFSET_W;
        c.drawImage(img, offset, 0);
        
        // Image 로드가 완료 된 후 실행
        img.addEventListener('load', function(e) {
            c.width = this.naturalWidth + 50;
            c.height = this.naturalHeight;
            c.drawImage(img, offset, 0);
        });
        return this;
    }
    
    /* 왼쪽 격자 그리기 */
    A.prototype.drawRuler = function() {
        var c = this.canvas;
        var length = this.BLADE_REAL_LENGTH;
        c.setLineDash([0, 0]);
        c.beginPath();
        c.moveTo(35, this.FIRST_MID_POS.y);
        
        // 마지막 라인
        c.lineTo(35, this.LAST_MID_POS.y);
        c.lineTo(45, this.LAST_MID_POS.y);
        
        // 격자 눈금 갯수 : 10m 당 px 값 변환하여 저장
        var dotsCount = parseInt(length / 10) + 1;
        var dots = [];
        for(var i=0; i<dotsCount; i++) {
            dots.push(i * (this.METER_PER_PIXEL * 10));
        }
        
        // 격자 눈금 그리기 
        for(var i=0; i<=dots.length; i++) {
            // 오차 범위 추가?? 맞나??
            var y = dots[i] + this.FIRST_MID_POS.y;
            
            // 표시 미터 글자 수
            var digits = (i * 10).toString().replace('.', '').length;
            
            // 10m 당 격자 
            c.moveTo(35, y);
            c.lineTo(45, y);
            
            console.log(i, y, dots, this.FIRST_MID_POS.y, length%10);
            // 5m 당 격자 
            if(i>0) {
                var _5m = y - ((this.METER_PER_PIXEL * 10) / 2);
                c.moveTo(35, _5m);
                c.lineTo(40, _5m);
                
                // 길이%10 나머지가 5m 이상 + 마지막 dot 일 경우 뒤(+5m)에 5m 격자 한번더 찍기
                if(length%10 > 5 && i === dots.length - 1) {
                    _5m = y + ((this.METER_PER_PIXEL * 10) / 2);
                    c.moveTo(35, _5m);
                    c.lineTo(40, _5m);
                }
            }
        }
        
        c.lineWidth = 2;
        c.strokeStyle = 'black';
        c.stroke();
        c.closePath();
        
        return this;
    }
    
    /* 왼쪽 격자 수치 text 표시 */
    A.prototype.drawRulerFigure = function() {
        // 블레이드 실제 길이 
        var length = this.BLADE_REAL_LENGTH;
        // 글씨 폰트 지정 
        this.canvas.font = '10px serif';
        this.canvas.fillStyle = 'black';
        // 마지막 라인 텍스트 
        this.canvas.fillText(length + 'm', 21 - (length.toString().replace('.', '').length * 6), this.LAST_MID_POS.y + 3);
        // 격자 눈금 갯수 : 10m 당 px 값 변환하여 저장  
        var dotsCount = parseInt(length / 10) + 1;
        var dots = [];
        for (var i = 0; i < dotsCount; i++) {
            dots.push(i * (this.METER_PER_PIXEL * 10));
        }
        // 격자 눈금 그리기 
        for(var i = 0; i < dots.length; i++) {
            // 오차 범위 추가?? 맞나??
            var y = dots[i] + this.FIRST_MID_POS.y;
            // 표시 미터 글자 수
            var digits = (i * 10).toString().replace('.', '').length;
            // 10m 당 격자 
            this.canvas.fillText(i * 10 + 'm', 21 - (digits * 6), y+3);
        }
        return this;
    }
    
    A.prototype.removeRuler = function() {
        var c = this.canvas;
        c.clearRect(0,0,50,750);
        return this;
    }
    
    /* 가운데 점섬 그리기 */
    A.prototype.drawMiddleDash = function() { 
        var c = this.canvas;
        c.beginPath();
        c.setLineDash([2, 2]);
        c.moveTo(173, this.L_FIRST_POS.y);
        c.lineTo(173, this.L_LAST_POS.y);
        
        c.lineWidth = 1;
        c.stroke();
        c.closePath();
        return this;
    }
    
    /* 그릴수 있는 영역 설정 - 블레이드 border 라인 안쪽에만 그릴 수 있다. */
    A.prototype.makeDrawAbleZone = function() {
        var c = this.canvas;
        if(!this.contextSaved) {
            c.save();
            this.contextSaved = true;
        }
        c.beginPath();
        
        // left side 
        c.moveTo(107, 36);
        c.bezierCurveTo(124, 23, 143, 23, 157, 36);
        c.bezierCurveTo(160, 141, 155, 268, 154, 330);
        c.lineTo(this.L_LAST_POS.x, this.L_LAST_POS.y);
        c.lineTo(125, this.L_LAST_POS.y);
        c.lineTo(99, 440);
        c.lineTo(77, 245);
        c.bezierCurveTo(77, 245, 70, 170, 86, 129);
        c.bezierCurveTo(110, 98, 112, 81, 107, 36);
        
        // right side
        c.moveTo(240, 35);
        c.bezierCurveTo(228, 23, 206, 23, 191, 35);
        c.bezierCurveTo(191, 35, 190, 263, 194, 330);
        c.lineTo(this.R_LAST_POS.x, this.R_LAST_POS.y);
        c.lineTo(222, this.R_LAST_POS.y);
        c.lineTo(249, 440);
        c.lineTo(271, 245);
        c.bezierCurveTo(271, 245, 276, 155, 261, 129);
        c.bezierCurveTo(261, 129, 228, 97, 240, 35);
        
        // ruler side 23(원래 수치) -> 0
        c.moveTo(0, 22);
        c.lineTo(50, 22);
        c.lineTo(50, 750);
        c.lineTo(0, 750);
        c.lineTo(0, 22);
        
        // between 2 blades side
        c.moveTo(157, 36);
        c.lineTo(191, 36);
        c.lineTo(191, 308);
        c.lineTo(this.R_LAST_POS.x, this.R_LAST_POS.y);
        c.lineTo(this.L_LAST_POS.x, this.L_LAST_POS.y);
        c.lineTo(156, 308);
        c.lineTo(157, 36);
        
        // 영역 확인용 - 테두리 점선
//        c.setLineDash([2, 2]);
//        c.lineWidth = 2;
//        c.strokeStyle = 'red';
//        c.stroke();
        // 영역 확인용 - 색채우기 
        //c.fillStyle = 'red';
        //c.fill();
        
        c.closePath();
        // 현재 그려지는 경로를 잘라내기
	    c.clip();
        return this;
    }
    
    /* 손상 범위 그리기 */
    // {NUM:1, VERTI:1.6,HORIZ:2.4, FROM_R: 4, FROM_LE: 1, DMG_AREA: 'SuS', DMG_SEVERITY: '1'}
    A.prototype.drawDamage = function(obj) {
        if(!obj) return;
        
        // obj 복사 
        obj = Object.assign({}, obj);
        
        // VERTI, HORIZ 값으로 원을 그린 후 obj에 추가 
        if(obj.HORIZ && obj.HORIZ > 0 && obj.VERTI && obj.VERTI > 0) 
            obj['S'] = Math.PI * (parseFloat(obj.HORIZ) / 2) * (parseFloat(obj.VERTI) / 2);
        
        var _rootVal = obj.FROM_R;
        var _leVal = obj.FROM_LE;
        var _hVal = obj.HORIZ;
        var _vVal = obj.VERTI;
        var serverity = obj.DMG_SEVERITY;
        var breakage = obj.DMG_AREA;
        
        // 파손 위치에 따른 단면 방향 결정 
        var SIDE = '';
        if(breakage === 'SuS') SIDE = 'left';
        else if(breakage === 'PrS') SIDE = 'right';
        else SIDE = 'middle';
        
        // meter => pixel
        _hVal = parseFloat((_hVal * this.METER_PER_PIXEL));
        _vVal = parseFloat((_vVal * this.METER_PER_PIXEL));
        
        // left (suction side)
        if(SIDE === 'left') {
            _rootVal = parseInt((_rootVal * this.METER_PER_PIXEL)) + this.L_FIRST_POS.y;
            var lePos = this.L_BORDER_LE.find((e) => e.y === _rootVal);
            if(lePos) _leVal = parseFloat(lePos.x - (_leVal * this.METER_PER_PIXEL));
            _rootVal = parseFloat((_rootVal + (_vVal / 2)));
            _leVal = parseFloat((_leVal - (_hVal / 2)));
        }
        // right (pressure side)
        else if(SIDE === 'right') {
            _rootVal = parseInt((_rootVal * this.METER_PER_PIXEL)) + this.R_FIRST_POS.y;
            var lePos = this.R_BORDER_LE.find((e) => e.y === _rootVal);
            if(lePos) _leVal = parseFloat(lePos.x + (_leVal * this.METER_PER_PIXEL));
            _rootVal = parseFloat((_rootVal + (_vVal / 2)));
            _leVal = parseFloat((_leVal + (_hVal / 2)));
        }
        // both (draw between 2 blades)
        else {
            _leVal = this.FIRST_MID_POS.x;
            _rootVal = (_rootVal * this.METER_PER_PIXEL) + this.FIRST_MID_POS.y;
            _rootVal = parseFloat((_rootVal + (_vVal / 2)));
        }
        if(SIDE) {
            var rX = _hVal / 2;
            var rY = _vVal / 2;
            var c = this.canvas;
            // 손상 지점 원 그리기 - drawEllipse
            c.beginPath();
            c.moveTo(_leVal, _rootVal);
            c.ellipse(_leVal, _rootVal, rX, rY, 0, 0, Math.PI * 2);
            c.fillStyle = this.SERVERITY_COLOR[obj.DMG_SEVERITY];
            c.fill();
            c.closePath();
            
            
            // DAMAGE 생성 내역 추가 
            obj['SIDE'] = SIDE;
            obj['_rootVal'] = _rootVal;
            obj['_leVal'] = _leVal;
            obj['_hVal'] = _hVal;
            obj['_vVal'] = _vVal;
            obj['rX'] = rX;
            obj['rY'] = rY;
            // 넘버링 체크 여부 
            obj['checked'] = false;
            
            // 손상 내역 리스트에 추가 
            this.DAMAGE_LIST.push(obj);
            
        }
        return this;
    }
    
    /* 손상 범위에 숫자 표시 그리기 (numbering) */
    A.prototype.drawNumber = function() {
        var c = this.canvas;
        this.DAMAGE_LIST.forEach((e) => {
            
            var num = e.NUM;
            var x = e._leVal;
            var y = e._rootVal - e.rY - 15;
            
            c.closePath();
            c.beginPath();
            c.fillStyle = 'white';
            c.arc(x, y, 10, 0, Math.PI * 2);
            
            c.setLineDash([0,0]);
            c.lineWidth = 2;
            c.strokeStyle = 'black';
            c.stroke();
            c.fill();
            c.font = "14px Arial";
            c.fillStyle = "black";
            c.textAlign = "center";
            c.fillText(num, x, y + 5);
            c.closePath();
            this.clickableZones.push({x:x, y:y, circleSize:10, number: num});
        });
        return this;
    }
    
    /* canvas를 base64 image data로 변환 */
    A.prototype.canvasToBase64 = function(backgroundColor) {
        var c = this.canvas;
        var target = this.target;
        
        // cache height and width
        var w = target.width;
        var h = target.height;
        
        var data;
        
        if(backgroundColor) {
            // 현재 캔버스의 이미지 데이터를 저장 
            data = c.getImageData(0, 0, w, h);
            //store the current globalCompositeOperation
            var compositeOperation = c.globalCompositeOperation;
            //set to draw behind current content
            c.globalCompositeOperation = "destination-over";
            // 배경색 세팅 
            c.fillStyle = backgroundColor;
            // 배경색 적용 
            c.fillRect(0,0,w,h);
        }
        
        //get the image data from the canvas
        var imageData = target.toDataURL();
        
        if(backgroundColor) {
            // 캔버스 지우기 
            c.clearRect(0,0,w,h);
            // 배경색 적용전 캔버스 이미지 데이터 적용 
            c.putImageData(data,0,0);
            // reset the globalCompositeOperation to what it was
            c.globalCompositeOperation = compositeOperation;
        }
        //return the Base64 encoded data url string
	    return imageData;
    }
    
    /* 이미지 태그에 미러링 */
    A.prototype.mirroringToImgTag = function(target) {
        var success = false; 
        if($(target)) {
            var data = this.target.toDataURL();
            $(target).attr('src', data);
            success = true;
        }
        return success;
    }
    
    /* canvas 현재 상태 저장 - id = 저장 id 값 */
    A.prototype.save = function(id) {
        // 현재 시간 기준으로 ID 생성 
        var id = id || new Date().getTime();
        
        // 현재 상태 이미지 데이터 
        var data = this.canvas.getImageData(0, 0, this.target.width, this.target.height);
        
        // history 생성
        var history = {_id: id,data: data};
        
        // history에 저장
        var index = this.history.findIndex((e) => e._id === id);
        // _id 가 같은 history가 있을 경우,
        if(index > -1) {
            this.history[index] = history;
        } 
        // _id 가 같은 history가 없을 경우,
        else {
            this.history.push(history);    
        }
        return id;
    }
    
    /* canvas 이전 상태로 되돌리기 */
    A.prototype.restore = function(id) {
        var c = this.canvas;
        var history; 
        // history 찾기 
        if(id) history = this.history.find((e) => e._id === id);
        else history = this.history[this.history.length-1];
        // canvas 비우기 
        c.clearRect(0,0,this.target.width,this.target.height);
        
        var compositeOperation = c.globalCompositeOperation;
        c.globalCompositeOperation = 'destination-over';
        
        // 상태 적용 
        if(history) c.putImageData(history.data,0,0);
        
        c.globalCompositeOperation = compositeOperation;
        return this;
    }
    
    window.bladeViewer = A;
})(window);