	/*
     * 		# unix timestamp
     * 		
     * 		* milliseconds
     * 		- moment().valueOf(), +moemnt()
     * 		
     * 		* seconds
     * 		- moment().unix();
     * 
     * 		# 해당 월(month) 의 일(days) 수
     * 		- moment('2020-02', 'YYYY-MM').daysInMonth() 	// 29
     * 
     *  	# Javascript Date 형식 출력 
     *  	- moment().toDate();
     *  
     *  	# Array 출력 
     *  	- moment().toArray();
     *  	
     *  	# JSON 출력 
     *  	- moment().toJSON();
     *  
     *  	# ISO8061 String 출력 
     *  	- moment().toISOString();
     *  	- 참고 .toISOString()문제의 순간 로컬 모드에있는 경우에도 UTC의 타임 스탬프를 반환합니다. 
     *  	  이것은 ES2015 사양에.toISOString() 요약 된대로 기본 JavaScript Date에 대한 사양과 일관성을 제공하기 위해 수행됩니다. 
     *  	  버전 2.20.0 에서 UTC 변환을 방지하기 위해 호출 할 수 있습니다 ..toISOString(true)
	 *		  버전 2.8.4 부터는 Date.prototype.toISOString성능상의 이유로 사용 가능한 경우 기본 이 사용됩니다.
     *  
     *  	# Object 출력 
     *  	- moment().toObject();
     *  
     *  	# String 출력
     *  	- moment().toString();
     *  
     *  	# 시간 비교 
     *  	* isBefore
     *  	- moment('2010-10-20').isBefore('2010-10-21');			// true
     *  	- moment('2010-10-20').isBefore('2011-10-20', 'year');	// true
     *  	- moment('2010-10-20').isBefore('2010-10-25', 'year');	// false
     *  	
     *  	* isSame
     *  	* isAfter
     *  	* isSameOrBefore
     *  	* isSameOrAfter
     *  	* isBetween
     *  	- moment('2020-10-20').isBetween('2020-10-19', '2010-10-25'); 
     *  
     *  	# moment object 비교
     *  	* isMoment
     *  	- moment.isMoment()				// false
     *  	- moment.isMoment(new Date())	// false
     *  	- moment.isMoment(moemnt())		// true
     *  	
     *  	* instanceof	ver 2.11.0 부터
     *  	- moment() instanceof moemnt 	// true
     *  	
     *  	# Date object 비교 (js)
     *  	* isDate
     *  	- moment.isDate()				// false
     *   	- moment.isDate(new Date())		// true
     *   	- moment.isDate(moment())		// false
     *  
     *  	# 윤년 비교
     *  	* isLeapYear
     *  	- moemnt([2020]).isLeapYear()	// true
     *  	- moemnt([2100]).isLeapYear()	// false
     *  	
     */
var _moment = {
	createRegularDateArray: function (from, to, type, pattern, timezone, convert_timezone, allowFormat) {
		   
        if(!timezone || !convert_timezone) {
            timezone = 'UTC';
            convert_timezone = 'UTC';
        }
        
        var mFrom, mTo;
        
        if(this.regex.isZ(timezone) && this.regex.isZ(convert_timezone)) {
            mFrom = moment(from).zone(timezone).zone(convert_timezone);
            mTo = moment(to).zone(timezone).zone(convert_timezone);
        } else {
            mFrom = moment.tz(from, timezone).tz(convert_timezone);
            mTo = moment.tz(to, timezone).tz(convert_timezone);
        }        
        
        var format;
        switch(type) {
            case 'year':
                format = 'year';
                if(allowFormat) {
                    mFrom.set('month', 0);
                    mFrom.set('date', 1);
                    mFrom.set('hour', 0);
                    mFrom.set('minute', 0);
                    mFrom.set('second', 0);

                    mTo.set('month', 0);
                    mTo.set('date', 1);
                    mTo.set('hour', 0);
                    mTo.set('minute', 0);
                    mTo.set('second', 0);    
                }
                break;
            case 'month':
                format = 'month';
                if(allowFormat) {
                    mFrom.set('date', 1);
                    mFrom.set('hour', 0);
                    mFrom.set('minute', 0);
                    mFrom.set('second', 0);

                    mTo.set('date', 1);
                    mTo.set('hour', 0);
                    mTo.set('minute', 0);
                    mTo.set('second', 0);
                }
                break;    
            case 'day':
                format = 'date';
                if(allowFormat) {
                    mFrom.set('hour', 0);
                    mFrom.set('minute', 0);
                    mFrom.set('second', 0);

                    mTo.set('hour', 0);
                    mTo.set('minute', 0);
                    mTo.set('second', 0);
                }
                break;
            case 'hour':
                format = 'hour';
                if(allowFormat) {
                    mFrom.set('minute', 0);
                    mFrom.set('second', 0);
                    mTo.set('minute', 0);
                    mTo.set('second', 0);
                }
                break;
            case 'min':
                format = 'minute';
                if(allowFormat) {
                    mFrom.set('second', 0);
                    mTo.set('second', 0);
                }
                break;
            case 'sec':
                format = 'second';
                mFrom.set('second', Math.floor(mFrom.get('second') / 10) * 10);
                mTo.set('second', Math.floor(mTo.get('second') / 10) * 10);
                break;
        }
        
        
        var diff = mTo.diff(mFrom);
        var arr = [];
        if(diff >= pattern) {
            arr.push(mFrom.valueOf());
            arr.push(mTo.valueOf());    
            
            // begin ~ today 사이 날짜 생성 
            for(var i=0; i<arr.length; i++) {

                if(arr[i] < arr[i+1]) {

                    var date = moment(arr[i]);
                    var time;

                    /* from ~ to 사이의 pattern 간격 arr 생성 */
                    time = date.get(format) + pattern;
                    date.set(format, time);

                    if(date < arr[i+1]) {
                        arr.splice(i+1, 0, date.valueOf());
                    }	         

                }
            }
        } else {
            arr.push(mFrom.valueOf());
        }
        return arr;
    },
    /*
        # Default timezone을 설정 하는 기능 
        1. timezone 초기화시 tz 없이 setDefault 사용하면 됨
    */
    setDefaultTimezone: function(tz) {
        moment.tz.setDefault(tz);
        return moment.defaultZone;
    },
    
    /*  
        # Browser에 접속한 Client의 timezone을 return
        * true 없이도 가능, true 설정 시 캐시값 무시되고, 새 값으로 겹쳐 쓴다. 
    */
    getAccessTimezone: function() {
        return moment.tz.guess(true);   
    },
    
    /*
        # 해당 year이 윤년 인지 계산 
        * 2월 달이 마지막날이 28일 인 해는 평년(normal year), 29일 인 해는 윤년(leaf year) 
    
        *  윤년 계산 
        *  1. 4로 나누어 떨어지는 년도 = 윤년  
        *  2. 4로 나누어 떨어지더라도 100으로 나누어 떨어질 경우 = 평년 
        *  3. 4로 나누어 떨어지고 100으로도 나누어 떨어지나 400으로 나누어 떨어질 경우 = 운년 
    */
    isLeafYear: function(year) {
        var flag;
        flag = (year % 4) === 0;
        if(flag) flag = !((year % 100) === 0);
        if(!flag) flag = (year % 400) === 0;    
        return flag;
    },
    /*
        정규 표현식 
    */
    regex: {
        isZ: function(str) {
            var regex = /^(\+|\-)(\d{2}):(\d{2})$/; //     /^(\+|\-)\d{2}:\d{2}$/       +09:00
            return regex.test(str);
        }
    },
    difference: function(from, to, unit, allow_decimal) {
        var a = moment(from);
        var b = moment(to);
        
        switch(unit) {
            case 'years':
                return b.diff(a, unit, allow_decimal);    
                break;
            case 'month':
                return b.diff(a, unit, allow_decimal);    
                break;
            case 'days':
                return b.diff(a, unit, allow_decimal);    
                break;
            case 'hours':
                return b.diff(a, unit, allow_decimal);    
                break;
            case 'minutes':
                return b.diff(a, unit, allow_decimal);    
                break;
            case 'seconds':
                return b.diff(a, unit, allow_decimal);    
                break;
        }
        return b.diff(a);
    },
    /* 해당 달의 일 수 반환 함수 */
    dayOfMonth: function(year, month) {
        return 32 - new Date(year, month-1, 32).getDate();
    },
    
};