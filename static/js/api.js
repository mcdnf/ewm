// @require /static/js/constants.js
// @require /static/js/tools.js


var api ={
    register: function (param,callBackFn) {
        tools.ajax.post(
            website.user + 'register/',
            param,
            callBackFn
        );
    },
    login: function (param, callBackFn) {
        tools.ajax.post(
            website.auth + 'login/',
            param,
            callBackFn
        );
    },
    //增加二维码
    addqrcode: function (param, callBackFn) {
        tools.ajax.post(
            website.qrcode + 'add/',
            param,
            callBackFn
        );
    },
    //删除二维码
    delqrcode: function (param, callBackFn) {
        tools.ajax.post(
            website.qrcode + 'del/',
            param,
            callBackFn
        );
    },
    //编辑二维码
    editqrcode: function (param, callBackFn) {
        tools.ajax.post(
            website.qrcode + 'edit/',
            param,
            callBackFn
        );
    },
    //解析二维码
    decodeqrcode: function (param, callBackFn) {
        tools.ajax.post(
            website.qrcode + 'edit/',
            param,
            callBackFn
        );
    },
    //获取二维码列表
    getqrcodelist: function (url,callBackFn) {
        tools.ajax.get(
            website.qrcode + 'getqrcodelist/' + url,
            callBackFn
        );
    }

}
