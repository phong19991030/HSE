onmessage  = function(e) {
		var $grid,datas,maxLength;
		$grid = e[0];
		datas = e[1];
		maxLength = e[2];
		
		//console.log(datas)
		
		
		var intervals;
		 if(datas.length >maxLength ){
			 $grid_message.append('(<label class="loading"></label>)');
			 var $loading_message =$grid_message.find('label.loading');
			 var i = maxLength;
			 intervals = setInterval(function() {
			 if(i <= datas.length){
			 var lengths = (datas.length < i +maxGroupLength ?
			 datas.length:i+maxGroupLength);
			 for(i ;i<= lengths;i++){
				 $grid.jqGrid('addRowData',i+1,datas[i]); //addRowData(ID, Data);
			 $loading_message.text(i+'/'+datas.length);
			 }
			 }else{
			 clearInterval(intervals);
			 }
			 }, 1);
		 }else{
		 clearInterval(intervals);
		 }
	}