function getDesignDefaultOpt(contextPath){
	if(contextPath == "/"){
		contextPath = "";
	}
	var designDefaultOpt = {
		    themes:"basic",
		    motion:{
		        type:"basic"/*,
		        color:""*/
		    },
		    /** 
		     * 부분적용
		     * */
		    component:{
		        width:"100%",
		        height:"130px",
		        class:"",
		        css:"position:relative; display:block;box-sizing:border-box;background-color:#f5f5f5;",
		        dropbox:{
		            css:"text-align:center;background:#f2f4f7;display:block;box-sizing:border-box;",
		            class:"",
		            coverImgText:{
		                img: contextPath + "/images/file.png",
		                text:"파일을 <b>마우스로 끌어</b> 넣어주세요",
		                textcolor:"#000",
		                accentTextcolor:"#00affe",
		                left:"calc(50% - 71px)",
		                top:"calc(50% - 50.5px)"
		            }
		        },
		        fileList:{
		            width:['40%','20%'],
		            height:["35px","35"],
		            header:{
		                class:"",
		                css:"background-color:#6282e6;border-bottom:2px solid #fff;text-align:left;padding-left:20px;color:#fff;"
		            },
		            columns:{
		                class:"",
		                css:"background-color:#f5f5f5;border-bottom:2px solid #fff;text-align:left;padding-left:20px;"
		            }
		        },
		        Toolbar:{
		            layout:"bottom",
		            size:"35",
		            css:"padding:5px 20px;border-top:2px solid #fff;box-sizing:border-box;background:#d6d6d6",
		            addbutton:{
		                text:"파일 추가",
		                width:"75px",
		                height:"100%",
		                img: contextPath + "/images/plus.png",
		                top:"",
						left:"",
		                class:"",
		                css:"background:#323a47;border:1px solid #131822;display:inline-block;text-align:center;" +
		                "vertical-align:middle;border-radius:3px;line-height:25px;text-decoration:none;color:white;"
		            },
		            delbutton:{
		                text:"",
		                width:"",
		                height:"",
		                img: contextPath + "/images/delete.png",
		                top:"",
						left:"",
		                class:"",
		                css:"display:inline-block;text-align:center;vertical-align:middle;text-decoration:none;"
		                },
		            downbutton:{
		                text:"",
		                width:"",
		                height:"",
		                img: contextPath + "/images/download.png",
		                top:"",
		                left:"",
		                class:"",
		                css:"display:inline-block;text-align:center;vertical-align:middle;text-decoration:none; padding:0px 20px"
		            },
		            info:{
		                textcolor:"#000",
		                accentTextcolor:"#00affe",
		                top:"",
		                left:"",
		                margin:""
		            }
		        }
		    },
		    uploadPopup:{
		        uploadImg: contextPath + "/images/upload.png",
		        deleteImg: contextPath + "/images/close.png"
		    },
		};
	return designDefaultOpt
}