/*
 * @require /static/plugin/jquery-2.2.0.min.js
 **/

//接口地址
// var website = {
//     //登录注册接口
//     user: "http://account.api.2wm.wj/user/",
//     //授权接口
//     auth: "http://account.api.2wm.wj/auth/",
//     //二维码接口
//     qrcode: "http://personal.api.2wm.wj/qrcode/",
//     userurlcode : "http://personal.api.2wm.wj/userurlcode/",
//     template : "http://personal.api.2wm.wj/template/",
//     resource : "http://personal.api.2wm.wj/resource/",
//     catalog : "http://personal.api.2wm.wj/catalog/"
// };
var website = {
    //登录注册接口
    user: "http://account.api.2wm.cn/user/",
    //授权接口
    auth: "http://account.api.2wm.cn/auth/",
    //二维码接口
    qrcode: "http://personal.api.2wm.cn/qrcode/",
    userurlcode : "http://personal.api.2wm.cn/userurlcode/",
    template : "http://personal.api.2wm.cn/template/",
    resource : "http://personal.api.2wm.cn/resource/",
    catalog : "http://personal.api.2wm.cn/catalog/"
};

// var pageUrl = "http://mobile.2wm.wj/";
var pageUrl = "http://mobile.2wm.cn/";

var listPage = {
    'creatIndex' : 0,
    'urlList' : 4,
    'vcardList' : 1
}

var config = {
    ContentType : {
        "0" : "文本",
        "1" : "短信",
        "2" : "名片",
        "3" : "地图",
        "4" : "邮箱",
        "5" : "电话号码",
        "6" : "网址"
    }
}


var widgt = window.widgt || {};
widgt.hide = function (t) {
    //隐藏头部框架弹出
    if(t !== "header") $('#header').find('.menu-bg>ul').slideUp(500);

    //隐藏底部菜单弹出
    if(t !== "footer") $('#footer').find('.item>ul').slideUp(500);
}

$(document).on('click', function () {
    widgt.hide();
});

