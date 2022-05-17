/**
 * 함 수 ID: p_cmpValue(srcNode, desNode, msg)
 * 기     능: srcNode값 < desNode 여부체크
 * 파라메서: srcNode(비교노드), desNode(비교대상노드), msg(출력메시지)
 */
function p_cmpValue(srcNode, desNode, msg, gridRow){
	var srcAmt = 0;
	var desAmt = 0;
	
	if(srcNode == "" || desNode == ""){
		alert("스크립트 에러!!");
		return false;
	}
	
	if(gridRow != null){
		srcAmt = eval(gridRow.srcNode);
		desAmt = eval(gridRow.desNode);
		
		if(srcAmt == 0 && desAmt == 0){
			alert("금액을 입력하여 주십시요.");
			return false;
		}
		
		if(srcAmt < desAmt){
			alert(msg);
			gridRow.desNode = "0";
			return false;
		}
	}else{
		srcAmt = eval(srcNode);
		desAmt = eval(desNode);
		
		if(srcAmt == 0 && desAmt == 0){
			alert("금액을 입력하여 주십시요.");
			return false;
		}
		
		if(srcAmt < desAmt){
			alert(msg);
			desNode = "0";
			return false;
		}
	}
	
	return true;
}

/**
 * 함 수 ID: p_setMultSumAmt(ac:ArrayCollection, srcRef:String)<br>
 * 기     능: 그리드의 컬럼별(srcRef)합계를 지정노드(desNode)에 셋팅 <br>
 */
//function p_setMultSumAmt(ac:ArrayCollection, srcRef:String):Object{
//	var rObj:Object = new Object();
//	var arrSrcRef:Array = srcRef.split(".");
//	var arrSumAmt:Array = new Array();
//	var cnt:int = 0;
//	
//	for(var i:int=0; i < ac.length; i++){
//		var item:Object = ac.getItemAt(i);
//		//삭제대상제외
//		if(item.CRUD != "D"){		
//			for(var j:int=0; j < arrSrcRef.length; j++){
//
//				var colAmt:Number = 0;
//				
//				if(item[arrSrcRef[j]] != null && item[arrSrcRef[j]] != ""){
//					
//					colAmt = Number(item[arrSrcRef[j]]);
//				}else{
//					colAmt = 0;
//				}
//					
//				if(cnt == 0){
//					arrSumAmt[j] = 0;
//				}
//				
//				arrSumAmt[j] = Number(arrSumAmt[j]) + colAmt;					
//			}
//			cnt++;
//		}
//	} 
//	
//	for(var k:int=0; k < arrSrcRef.length; k++){
//		rObj[arrSrcRef[k]] = arrSumAmt[k];
//
//	}
//	
//	return rObj;
//}