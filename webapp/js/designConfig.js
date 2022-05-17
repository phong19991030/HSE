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
        height:"100%",
        class:"",
        css:"position:relative; display:block;border:1px solid #bac2cc;box-sizing:border-box;",
        dropbox:{
            css:"text-align:center;background:#f2f4f7;display:block;box-sizing:border-box;",
            class:"",
            coverImgText:{
                img:"/images/file.png",
                text:"파일을 <b>마우스로 끌어</b> 넣어주세요",
                textcolor:"#000",
                accentTextcolor:"#00affe",
                left:"40%",
                top:"30%"
            }
        },
        fileList:{
            width:['60%','40%'],
            height:["17%","17%"],
            header:{
                class:"",
                css:"background-color:#f2f4f7;border-bottom:1px solid #d1d8e4;text-align:left;padding-left:20px;"
            },
            columns:{
                class:"",
                css:"background-color:#fafafa;border-bottom:1px solid #d1d8e4;text-align:left;padding-left:20px;"
            }
        },
        Toolbar:{
            layout:"bottom",
            size:"15%",
            css:"padding:5px 20px;border-top:1px solid #bac2cc;box-sizing:border-box;",
            addbutton:{
                text:"파일 추가",
                width:"20%",
                height:"100%",
                img:"/images/plus.png",
                top:"",
                left:"",
                class:"",
                css:"background:#323a47;border:1px solid #131822;display:none;text-align:center;" +
                "vertical-align:middle;border-radius:3px;line-height:32px;text-decoration:none;color:white;"
            },
            delbutton:{
                text:"",
                width:"",
                height:"",
                img:"/images/delete.png",
                top:"",
                left:"",
                class:"",
                css:"display:none;text-align:center;vertical-align:middle;text-decoration:none;"
                },
            downbutton:{
                text:"",
                width:"",
                height:"",
                img:"/images/download.png",
                top:"",
                left:"",
                class:"",
                css:"display:inline-block;text-align:center;vertical-align:middle;text-decoration:none;"
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
        uploadImg:"/images/upload.png",
        deleteImg:"/images/close.png"
    },
};