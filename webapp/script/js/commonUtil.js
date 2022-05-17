

var init_perH = 0.8;
var init_perW = 0.8;
var init_h;
var init_w;




function openPopupByUrl(url, closeCallback){
	if(!url || url.trim() == ''){
		return false;
	}
	var w, h, left, top;

	if(init_h && init_w && $.isNumeric(init_h) && $.isNumeric(init_w)){
		h = init_h;
		w = init_w;

	}else if(init_perH && init_perW && $.isNumeric(init_perH) && $.isNumeric(init_perW)){
		w = parseInt(window.innerWidth) * init_perW;
		h = parseInt(window.innerHeight) * init_perH;

	}else{
		w = parseInt(window.innerWidth) * 0.8;
		h = parseInt(window.innerHeight) * 0.8;


	}
	left = (screen.width - w) / 2;
	top = (screen.height - h) / 2;
	
	var popupWindow = window.open(url,  'popup', 'width=' + w + ',height=' + h + ',top=' + top + ',left=' + left);
	
	popupWindow.addEventListener('resize', function(){
		popupWindow.resizeTo(w, h);
    });
	if (closeCallback && typeof(closeCallback) == 'function') {
		popupWindow.onbeforeunload = function() {
			closeCallback.call(null);
		}
	}
		if (window.focus) {
			popupWindow.focus();
		}
	return popupWindow;

		
}

function getPopupSize(){
	
	if(init_h && init_w && $.isNumeric(init_h) && $.isNumeric(init_w)){
		h = init_h;
		w = init_w;

	}else if(init_perH && init_perW && $.isNumeric(init_perH) && $.isNumeric(init_perW)){
		w = parseInt(window.innerWidth) * init_perW;
		h = parseInt(window.innerHeight) * init_perH;

	}else{
		w = parseInt(window.innerWidth) * 0.8;
		h = parseInt(window.innerHeight) * 0.8;
	}
	
	return {"HEIGHT": h, "WIDTH": w};
	
}

function getRootPopupSize(){
	const win = rootWindow();
	
	if (init_h && init_w && $.isNumeric(init_h) && $.isNumeric(init_w)) {
		h = init_h;
		w = init_w;
	} else if (init_perH && init_perW && $.isNumeric(init_perH) && $.isNumeric(init_perW)) {
		w = parseInt(win.innerWidth) * init_perW;
		h = parseInt(win.innerHeight) * init_perH;
	} else {
		w = parseInt(win.innerWidth) * 0.8;
		h = parseInt(win.innerHeight) * 0.8;
	}
	
	return {"HEIGHT": h, "WIDTH": w};
	
}

function rootWindow() {
	var root = window.opener;
	if (!root) return window;
	
	while (root.opener != null) {
		root = root.opener;
	}
	
	return root;
}