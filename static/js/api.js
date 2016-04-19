// @require /static/js/constants.js
// @require /static/js/tools.js


var api ={
    //登录
    login: function (param, callBackFn) {
        tools.ajax.post(
            website.auth + 'login/',
            param,
            callBackFn
        );
    },
    //请求用户信息
    getuser: function (callBackFn) {
        tools.ajax.get(
            website.auth + 'getuser/',
            callBackFn
        );
    },
    //注册
    register: function (param,callBackFn) {
        tools.ajax.post(
            website.user + 'register/',
            param,
            callBackFn
        );
    },
    //验证图形验证码
    checkimagecode: function (account,code,callBackFn) {
        tools.ajax.get(
            website.user + 'checkimagecode/?account=' + account + '&code=' + code,
            callBackFn
        );
    },
    //发送验证码
    sendcode: function (account,callBackFn) {
        tools.ajax.get(
            website.user + 'sendcode/?account=' + account,
            callBackFn
        );
    },
    //验证发送的验证码
    checksendcode: function (account,code,callBackFn) {
        tools.ajax.get(
            website.user + 'checksendcode/?account=' + account + '&code=' + code,
            callBackFn
        );
    },
    //修改密码
    modifypwd: function (param, callBackFn) {
        tools.ajax.post(
            website.user + 'modifypwd/',
            param,
            callBackFn
        );
    },
    userEdit: function (param, callBackFn) {
        tools.ajax.post(
            website.user + 'edit/',
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
};
