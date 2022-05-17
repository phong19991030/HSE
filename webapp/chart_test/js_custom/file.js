var file = {
    loader: async function (inputName) {
        var sender = $(inputName)[0];
        return await loadFile(sender, parseData);
    },
    
    /*
        * byte 용량을 환산하여 반환
        * 용량의 크기에 따라 MB, KB, byte 단위로 환산함
        * @param fileSize  byte 값
        * @param fixed     환산된 용량의 소수점 자릿수
        * @returns {String}
    */
    convertFileSize: function (fileSize, fixed) {
        var str

        //MB 단위 이상일때 MB 단위로 환산
        if (fileSize >= 1024 * 1024) {
            fileSize = fileSize / (1024 * 1024);
            fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
            str = fileSize + ' MB';
        }
        //KB 단위 이상일때 KB 단위로 환산
        else if (fileSize >= 1024) {
            fileSize = fileSize / 1024;
            fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
            str = fileSize + ' KB';
        }
        //KB 단위보다 작을때 byte 단위로 환산
        else {
            fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
            str = fileSize + ' byte';
        }
        return str;
    }
}


function loadFile(sender, callback) {

    // check file ext
    var validExts = new Array('.csv', '.json');
    var fileExt = sender.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));



    // exception
    if(fileExt && validExts.indexOf(fileExt) < 0) {
        alert('Invalid file selected. <br> valid files are of <b>' + validExts.toString() + '</b> types. ');
        return false;
    }


    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        
        // 파일 내용을 읽은 후 실행 
        reader.onload = (sender) => {
            var data = sender.target.result;
            //var data = reader.result;

            // .. if json
            if(fileExt === '.json') {
                data = JSON.parse(data.replace(/u'(?=[^:]+')/g, "'"));
                data = callback(data);
            }
            else if (fileExt === ".csv") {
                data = data.split(/\r\n|\n/); // 줄바꿈으로 나눔 
                data = data.map((e) => e.split(',').map(val => parseFloat(val.trim()) ?  parseFloat(val.trim()) : val.trim()  ));
                data = callback(data);
            }
            
            // return
            resolve(data);
        };
        
        // 읽기 도중 에러 발생 할 경우, 실행 
        reader.onerror = reject;
        
        // 파일 내용 읽기
        reader.readAsText(sender.files[0]);
    });
}

function parseData(data) {

    var useRow = $('#row').is(':checked');

    var useColumn = $('#column').is(':checked');

    var useJson = $('#json').is(':checked');


    var row, column;

    if(useRow && useColumn) {

        //row = data.filter((v, i) => i==0);
        row = data[0].filter((v,i) => i>0);
        //row = row.filter((v,i) => i>0);
        column = data.map((e) => e[0]).filter((v,i) => i>0);;
        //column = column.filter((v,i) => i>0);

        data = data.filter((v, i) => i>0);
        data = data.map((e) => e.filter((v, i) => i>0));
    }
    else if(useRow) {
        //row = data.filter((v, i) => i==0);
        row = data[0];
        data = data.filter((v, i) => i>0);
    } 
    else if(useColumn) {
        column = data.map((e) => e[0]);
        data = data.map((e) => e.filter((v, i) => i>0));
    } 

    if(useJson) {

        if(useRow && useColumn) {
            var obj = {};
            data.forEach((e, i) => {
                //obj[column[i]] = [];

                var obj2 = {};
                e.forEach((e2, i2) => {

                    obj2[row[i2]] = e2;
                });
                //obj[column[i]].push(obj2);
                obj[column[i]] = obj2;
            });
            data = obj;
        }

        else if(useRow) {
            var arr = [];
            data.forEach((e) => {
                var obj = {};
                e.forEach((e2, i2) => {
                    obj[row[i2]] = e2;
                });
                arr.push(obj);
            });
            data = arr;
        }

        else if(useColumn) {
            var obj = {};
            data.forEach((e, i) => {
                obj[column[i]] = e;
            });
            data = obj;
        }


    }
    return {row: row, column: column, data: data};
}