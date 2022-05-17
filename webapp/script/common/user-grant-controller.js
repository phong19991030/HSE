

//$(document).ready(function() {
//	console.log('Read :', _MENU_GRANT.READ_YN, ' Write :', _MENU_GRANT.WRT_YN, ' Download :', _MENU_GRANT.EXC_DN_YN, ' Grant :', _MENU_GRANT);
//	_GRANT_CONTROLL[_MENU_GRANT.PGM_ID](_MENU_GRANT);
//});


// REQUEST_URI, PGM_ID, READ_YN(읽기), WRT_YN(쓰기), EXC_DN_YN(다운로드)
var _GRANT_CONTROLL = {
	/* CMS */
	// Availability
	cms_0400: function(param) {
		if(param.REQUEST_URI === '/cms/cms_0400/main') {
			if(!param.EXC_DN_YN) {
				$('head').append('<style>#dw_png_btn, #dw_pdf_btn{display:none !important;}</style>');
			}
		}
	},
	// Capacity Factor
	cms_0500: function(param) {
		if(param.REQUEST_URI === '/cms/cms_0500/main') {
			if(!param.EXC_DN_YN) {
				$('head').append('<style>#dw_png_btn, #dw_pdf_btn{display:none !important;}</style>');
			}
		}
	},
	// Error Events
	cms_0600: function(param) {
		if(param.REQUEST_URI === '/cms/cms_0600/main') {
			if(!param.EXC_DN_YN) {
				$('head').append('<style>#dw_png_btn, #dw_pdf_btn{display:none !important;}</style>');
			}
		}
	},
	// Failure Rate
	cms_0700: function(param) {
		if(param.REQUEST_URI === '/cms/cms_0700/main') {
			if(!param.EXC_DN_YN) {
				$('head').append('<style>#dw_png_btn, #dw_pdf_btn{display:none !important;}</style>');
			}
		}
	},
	// Frequency Measurement
	cms_0900: function(param) {
		if(param.REQUEST_URI === '/cms/cms_0900/main') {
			if(!param.EXC_DN_YN) {
				$('head').append('<style>#dw_png_btn, #dw_pdf_btn{display:none !important;}</style>');
			}
		}
	},
	/*//CMS */
	
	/* O&M */
	// Alarm Management
	oam_0100: function(param) {
		// 계획 리스트 페이지 
		if(param.REQUEST_URI === '/oam2/oam_0100/02/planList') {
			if(!param.WRT_YN) {
				// 등록, 수정 버튼 숨기기 
				$('head').append('<style>#plan_register, [id*=MODIFY_BTN]{display:none !important;}</style>');
				// 컨펌 버튼 비활성화 
				$(document).ready(function() {
					var key = setInterval((e) => {
						var target = $('[id*=CONFIRM_BTN_]');
						if(target.length) {
							// 기존 이벤트 해제, 권한 경고 함수 추가   
							target.unbind('click').click(function() {
								alert(_MESSAGE.common.noPermission);
							});
							// interval 해제 
							clearInterval(key);
						}
					}, 100);
				});
			}
			if(!param.EXC_DN_YN) {
				// 등록, 수정 버튼 숨기기 
				$('head').append('<style>[id*=DOWNLOAD_BTN]{display:none !important;}</style>');
			}
		}
		// 계획 상세 페이지
		else if(param.REQUEST_URI === '/oam2/oam_0100/02/planDetail') {
			if(!param.WRT_YN) {
				// 등록, 수정 버튼 숨기기 
				$('head').append('<style>#modify_btn, #delete_btn{display:none !important;}</style>');
			}
		}
		// 계획 등록, 수정 페이지 
		else if(param.REQUEST_URI === '/oam2/oam_0100/02/planRegister' || param.REQUEST_URI === '/oam2/oam_0100/02/planModify') {
			if(!param.WRT_YN) {
				if(!param.WRT_YN) {
					alert(_MESSAGE.common.noPermission);
					history.back();
				}
			}
		}
		// 보고서 리스트 페이지 
		else if(param.REQUEST_URI === '/oam2/oam_0100/03/reportList') {
			if(!param.WRT_YN) {
				// 등록, 수정 버튼 숨기기 
				$('head').append('<style>#INSPECTION_BTN, #BLADE_INSPECTION_BTN, #CHECKLIST_BTN, [id*=MODIFY_BTN_]{display:none !important;}</style>');
				// 삭제 버튼 비활성화 
				$(document).ready(function() {
					var key = setInterval((e) => {
						var target = $('[id*=DELETE_BTN_]');
						if(target.length) {
							// 기존 이벤트 해제, 권한 경고 함수 추가   
							target.unbind('click').click(function() {
								alert(_MESSAGE.common.noPermission);
							});
							// interval 해제 
							clearInterval(key);
						}
					}, 100);
				});
			}
			
			if(!param.EXC_DN_YN) {
				// PDF 다운로드 버튼 숨기기 
				$('head').append('<style>[id*=DOWNLOAD_BTN_]{display:none !important;}</style>');
			}
		}
		
		// 전체 페이지  
		if(!param.WRT_YN) {
			// 알람 이벤트 완료 버튼 비활성화 
			$(document).ready(function() {
				var key = setInterval((e) => {
					var target = $('#EVENT_COMPLETE_BTN');
					if(target.length) {
						// 기존 이벤트 해제, 권한 경고 함수 추가   
						target.unbind('click').click(function() {
							alert(_MESSAGE.common.noPermission);
						});
						// interval 해제 
						clearInterval(key);
					}
				}, 100);
			});
		}
	},
	// Inspection
	oam_0200: function(param){
		// 리스트 페이지 
		if(param.REQUEST_URI === '/oam2/oam_0200/main') {
			if(!param.WRT_YN) {
				// 등록 버튼 숨기기 
				$('head').append('<style>#register_btn{display:none !important;}</style>');
			}
			if(!param.EXC_DN_YN) {
				// 다운로드 버튼 비활성화 
				$(document).ready(function() {
					var key = setInterval((e) => {
						var target = $('.download-btn');
						if(target.length) {
							// 기존 이벤트 해제, 권한 경고 함수 추가   
							target.unbind('click').click(function() {
								alert(_MESSAGE.common.noPermission);
							});
							// interval 해제 
							clearInterval(key);
						}
					}, 100);
				});
			}
		}
		// 상세 페이지 
		else if(param.REQUEST_URI === '/oam2/oam_0200/reportDetail') {
			if(!param.WRT_YN) {
				// 등록, 수정 버튼 숨기기 
				$('head').append('<style>#modify_btn, #delete_btn{display:none !important;}</style>');
			}
		}
		// 등록, 수정 페이지 
		else if(param.REQUEST_URI === '/oam2/oam_0200/reportRegister' || param.REQUEST_URI === '/oam2/oam_0200/reportModify') {
			if(!param.WRT_YN) {
				if(!param.WRT_YN) {
					alert(_MESSAGE.common.noPermission);
					history.back();
				}
			}
		}
	},
	// Blade Inspection
	oam_0300: function(param){
		// 리스트 페이지 
		if(param.REQUEST_URI === '/oam2/oam_0300/main') {
			if(!param.WRT_YN) {
				// 등록 버튼 숨기기 
				$('head').append('<style>#register_btn{display:none !important;}</style>');
			}
			if(!param.EXC_DN_YN) {
				// 다운로드 버튼 비활성화 
				$(document).ready(function() {
					var key = setInterval((e) => {
						var target = $('.download-btn');
						if(target.length) {
							// 기존 이벤트 해제, 권한 경고 함수 추가   
							target.unbind('click').click(function() {
								alert(_MESSAGE.common.noPermission);
							});
							// interval 해제 
							clearInterval(key);
						}
					}, 100);
				});
			}
		}
		// 상세 페이지 
		else if(param.REQUEST_URI === '/oam2/oam_0300/reportDetail') {
			if(!param.WRT_YN) {
				// 등록, 수정 버튼 숨기기 
				$('head').append('<style>#modify_btn, #delete_btn{display:none !important;}</style>');
			}
		}
		// 등록, 수정 페이지 
		else if(param.REQUEST_URI === '/oam2/oam_0300/reportRegister' || param.REQUEST_URI === '/oam2/oam_0300/reportModify') {
			if(!param.WRT_YN) {
				if(!param.WRT_YN) {
					alert(_MESSAGE.common.noPermission);
					history.back();
				}
			}
		}
	},
	// Checklist
	oam_0400: function(param){
		// 리스트 페이지 
		if(param.REQUEST_URI === '/oam2/oam_0400/main') {
			if(!param.WRT_YN) {
				// 등록 버튼 숨기기 
				$('head').append('<style>#register_btn{display:none !important;}</style>');
			}
			if(!param.EXC_DN_YN) {
				// 다운로드 버튼 비활성화 
				$(document).ready(function() {
					var key = setInterval((e) => {
						var target = $('.download-btn');
						if(target.length) {
							// 기존 이벤트 해제, 권한 경고 함수 추가   
							target.unbind('click').click(function() {
								alert(_MESSAGE.common.noPermission);
							});
							// interval 해제 
							clearInterval(key);
						}
					}, 100);
				});
			}
		}
		// 상세 페이지 
		else if(param.REQUEST_URI === '/oam2/oam_0400/reportDetail') {
			if(!param.WRT_YN) {
				// 등록, 수정 버튼 숨기기 
				$('head').append('<style>#modify_btn, #delete_btn{display:none !important;}</style>');
			}
		}
		// 등록, 수정 페이지 
		else if(param.REQUEST_URI === '/oam2/oam_0400/reportRegister' || param.REQUEST_URI === '/oam2/oam_0400/reportModify') {
			if(!param.WRT_YN) {
				if(!param.WRT_YN) {
					alert(_MESSAGE.common.noPermission);
					history.back();
				}
			}
		}
	},
	/*//O&M */
		
		
		
	/* SYSTEM */
	// Farm Management
	sys_0100: function(param) {
		// list 페이지 
		if(param.REQUEST_URI === '/sys_new/sys_0100/list') {
			// 등록 버튼 숨김
//			if(!param.WRT_YN) $('a#REGISTER_BTN').remove();
			if(!param.WRT_YN) $('head').append('<style>a#REGISTER_BTN{display:none;}</style>');
		}
		// Detail 페이지
		else if(param.REQUEST_URI === '/sys_new/sys_0100/detailForm') {
			
			if(!param.WRT_YN) {
				// 수정, 삭제 버튼 삭제 
//				$('span#MODIFY_BTN, span#DELETE_BTN').remove();
				$('head').append('<style>span#MODIFY_BTN, span#DELETE_BTN{display:none;}</style>');
			}
		}
		// 등록, 수정 페이지
		else if(param.REQUEST_URI === '/sys_new/sys_0100/farmRegister' || param.REQUEST_URI === '/sys_new/sys_0100/farmModify') {
			if(!param.WRT_YN) {
				alert(_MESSAGE.common.noPermission);
				history.back();
			}
		}
	},
	// Turbine Management
	sys_0200: function(param) {
		// list 페이지 
		if(param.REQUEST_URI === '/sys_new/sys_0200/list') {
			// 등록 버튼 삭제 
//			if(!param.WRT_YN) $('a#REGISTER_BTN').remove();
			if(!param.WRT_YN) $('head').append('<style>a#REGISTER_BTN{display:none;}</style>');
		}
		// Detail 페이지
		else if(param.REQUEST_URI === '/sys_new/sys_0200/detailForm') {
			if(!param.WRT_YN) {
				// 수정, 삭제 버튼 삭제 
//				$('span#MODIFY_BTN, span#DELETE_BTN').remove();
				$('head').append('<style>span#MODIFY_BTN, span#DELETE_BTN{display:none;}</style>');
			}
		}
		// 등록, 수정 페이지
		else if(param.REQUEST_URI === '/sys_new/sys_0200/registerForm' || param.REQUEST_URI === '/sys_new/sys_0200/modifyForm') {
			if(!param.WRT_YN) {
				alert(_MESSAGE.common.noPermission);
				history.back();
			}
		}
	},
	// User Management
	sys_0300: function(param) {
		// list 페이지 
		if(param.REQUEST_URI === '/sys_new/sys_0300/list') {
			// 등록 버튼 삭제 
//			if(!param.WRT_YN) $('a#REGISTER_BTN').remove();
			if(!param.WRT_YN) $('head').append('<style>a#REGISTER_BTN{display:none;}</style>');
		}
		// Detail 페이지
		else if(param.REQUEST_URI === '/sys_new/sys_0300/detailForm') {
			if(!param.WRT_YN) {
				// 수정, 삭제 버튼 삭제 
//				$('span#MODIFY_BTN, span#DELETE_BTN').remove();
				$('head').append('<style>span#MODIFY_BTN, span#DELETE_BTN{display:none;}</style>');
			}
		}
		// 등록, 수정 페이지
		else if(param.REQUEST_URI === '/sys_new/sys_0300/registerForm' || param.REQUEST_URI === '/sys_new/sys_0300/modifyForm') {
			if(!param.WRT_YN) {
				alert(_MESSAGE.common.noPermission);
				history.back();
			}
		}
	},
	// Organization Management
	sys_0500: function(param) {
		// list 페이지 
		if(param.REQUEST_URI === '/sys_new/sys_0500/list') {
			// 등록 버튼 삭제 
//			if(!param.WRT_YN) $('a#REGISTER_BTN').remove();
			if(!param.WRT_YN) $('head').append('<style>a#REGISTER_BTN{display:none;}</style>');
		}
		// Detail 페이지
		else if(param.REQUEST_URI === '/sys_new/sys_0500/detailForm') {
			if(!param.WRT_YN) {
				// 수정, 삭제 버튼 삭제 
//				$('span#MODIFY_BTN, span#DELETE_BTN').remove();
				$('head').append('<style>span#MODIFY_BTN, span#DELETE_BTN{display:none;}</style>');
			}
		}
		// 등록, 수정 페이지
		else if(param.REQUEST_URI === '/sys_new/sys_0500/registerForm' || param.REQUEST_URI === '/sys_new/sys_0500/modifyForm') {
			if(!param.WRT_YN) {
				alert(_MESSAGE.common.noPermission);
				history.back();
			}
		}
	},
	// Menu Access Management
	sys_0600: function(param) {
		// list 페이지 
		if(param.REQUEST_URI === '/sys_new/sys_0600/list') {
			// 등록 버튼 삭제 
//			if(!param.WRT_YN) $('a#REGISTER_BTN').remove();
			if(!param.WRT_YN) $('head').append('<style>a#REGISTER_BTN{display:none;}</style>');
		}
		// Detail 페이지
		else if(param.REQUEST_URI === '/sys_new/sys_0600/detailForm') {
			if(!param.WRT_YN) {
				// 수정, 삭제 버튼 삭제 
//				$('span#MODIFY_BTN, span#DELETE_BTN').remove();
				$('head').append('<style>span#MODIFY_BTN, span#DELETE_BTN{display:none;}</style>');
			}
		}
		// 등록, 수정 페이지
		else if(param.REQUEST_URI === '/sys_new/sys_0600/registerForm' || param.REQUEST_URI === '/sys_new/sys_0600/modifyForm') {
			if(!param.WRT_YN) {
				alert(_MESSAGE.common.noPermission);
				history.back();
			}
		}
	},
	// Notice Management
	sys_0700: function(param) {
		// list 페이지 
		if(param.REQUEST_URI === '/sys_new/sys_0700/list') {
			// 등록 버튼 삭제 
//			if(!param.WRT_YN) $('a#REGISTER_BTN').remove();
			if(!param.WRT_YN) {
				// 등록 버튼 삭제 
				$('head').append('<style>a#REGISTER_BTN{display:none;}</style>');
			}
			if(!param.EXC_DN_YN) {
				// 다운로드 버튼 막기 
				$(document).ready(function() {
					var key = setInterval((e) => {
						// 버튼들 선택자로 선택 
						var target = $('[id*=DOWNLOAD_BTN]');
						if(target.length) {

							// 기존 이벤트 해제, 권한 경고 함수 추가   
							target.unbind('click').click(function() {
								alert(_MESSAGE.common.noPermission);
							});
							
							// interval 해제 
							clearInterval(key);
						}
					}, 100);
				});
			}
		}
		// Detail 페이지
		else if(param.REQUEST_URI === '/sys_new/sys_0700/detailForm') {
			if(!param.WRT_YN) {
				// 수정, 삭제 버튼 삭제 
				//$('span#MODIFY_BTN, span#DELETE_BTN').remove();
				$('head').append('<style>span#MODIFY_BTN, span#DELETE_BTN{display:none;}</style>');
			}
			if(!param.EXC_DN_YN) {
				// 다운로드 버튼 막기 
				$(document).ready(function() {
					var key = setInterval((e) => {
						// 버튼들 선택자로 선택 
						var target = $('[id*=FILE_NM]');
						if(target.length) {

							// 기존 이벤트 해제, 권한 경고 함수 추가   
							target.unbind('click').click(function() {
								alert(_MESSAGE.common.noPermission);
							});
							
							// interval 해제 
							clearInterval(key);
						}
					}, 100);
				});
			}
		}
		// 등록, 수정 페이지
		else if(param.REQUEST_URI === '/sys_new/sys_0700/registerForm' || param.REQUEST_URI === '/sys_new/sys_0700/modifyForm') {
			if(!param.WRT_YN) {
				alert(_MESSAGE.common.noPermission);
				history.back();
			}
		}
	},
	
	// Menu Management
	sys_0800: function(param) {
		// list 페이지 
		if(param.REQUEST_URI === '/sys_new/sys_0800/list') {

//			if(!param.WRT_YN) $('head').append('<style>[id*=ACTIVE-BTN-], [id*=ACTIVE-BTN-]+label, [id*=MODIFY-BTN-], [id*=ADD-BTN-], [id*=DELETE-BTN-]{display:none;}</style>');
			if(!param.WRT_YN) {
				$(document).ready(function() {
					var key = setInterval((e) => {
						// 버튼들 선택자로 선택 
						var target = $('[id*=ACTIVE-BTN-], [id*=MODIFY-BTN-], [id*=ADD-BTN-], [id*=DELETE-BTN-]');
						if(target.length) {
							// Active 버튼만 readonly 처리 input이라 on/off 실행 됨
							$('[id*=ACTIVE-BTN-]').prop('readonly', true);
							
							// 기존 이벤트 해제, 권한 경고 함수 추가   
							target.unbind('click').click(function() {
								alert(_MESSAGE.common.noPermission);
							});
							
							// interval 해제 
							clearInterval(key);
						}
					}, 100);
				});
			}
		}
	},
	// Alarm Code
	sys_0900: function(param) {
		// list 페이지 
		if(param.REQUEST_URI === '/sys_new/sys_0900/list') {
			if(!param.WRT_YN) $('head').append('<style>a#REGISTER_BTN{display:none;}</style>');
		}
		// Detail 페이지
		else if(param.REQUEST_URI === '/sys_new/sys_0900/detailForm') {
			if(!param.WRT_YN) {
				$('head').append('<style>span#MODIFY_BTN, span#DELETE_BTN{display:none;}</style>');
			}
		}
		// 등록, 수정 페이지
		else if(param.REQUEST_URI === '/sys_new/sys_0900/registerForm' || param.REQUEST_URI === '/sys_new/sys_0900/modifyForm') {
			if(!param.WRT_YN) {
				alert(_MESSAGE.common.noPermission);
				history.back();
			}
		}
	},
	// Maintenance Code
	sys_1000: function(param) {
		// list 페이지 
		if(param.REQUEST_URI === '/sys_new/sys_1000/list') {
			if(!param.WRT_YN) {
				$('head').append('<style>#ROOTADD-BTN, #ADD-BTN, #MODIFY-BTN, #DELETE-BTN{display:none !important;}</style>');
			}
		}
	},
	// Part Code
	sys_1100: function(param) {
		// list 페이지 
		if(param.REQUEST_URI === '/sys_new/sys_1100/list') {
			if(!param.WRT_YN) {
				$('head').append('<style>#ROOTADD-BTN, #ADD-BTN, #MODIFY-BTN, #DELETE-BTN{display:none !important;}</style>');
			}
		}
	},
	/*//SYSTEM */
}

console.log('Read :', _MENU_GRANT.READ_YN, ' Write :', _MENU_GRANT.WRT_YN, ' Download :', _MENU_GRANT.EXC_DN_YN, ' Grant :', _MENU_GRANT);
if(_GRANT_CONTROLL[_MENU_GRANT.PGM_ID]) _GRANT_CONTROLL[_MENU_GRANT.PGM_ID](_MENU_GRANT);


