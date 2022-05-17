var ebillUrl = 'http://www.taxbill365.com';

// 공급받는자 보관용 프린트
function ebillPrintBuyr(issuId){
	
	url = ebillUrl + '/jsp/corp/comm/comm_0002_01.jsp?ISSU_ID='+issuId;
	//url = ebillUrl + '/jsp/corp/comm/comm_0002_01.jsp?ISSU_ID=20150626410000260005hu11';
	
	//window.open(url, 'ebillBuyr','width='+width+',height='+height+',top='+y+',left='+x);
	windowOpen(url, 'ebillBuyr');
}


//공급자 보관용 프린트
function ebillPrintSelr(issuId){
	
	url = ebillUrl + '/jsp/corp/comm/comm_0001_01.jsp?ISSU_ID='+issuId;
	//url = ebillUrl + '/jsp/corp/comm/comm_0001_01.jsp?ISSU_ID=20150626410000260005hu11';
	
	//window.open(url, 'ebillSelr','width='+width+',height='+height+',top='+y+',left='+x);
	windowOpen(url, 'ebillSelr');
	
}
