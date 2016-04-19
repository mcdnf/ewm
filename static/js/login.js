// @require /static/js/api.js
$("#loginSubmit").on('click',function () {
    var param = new FormData($(this).parent()[0]);
    api.login(param,function (data) {
        if(data.Success){
            sessionStorage.setItem('isLogin',true);
            tools.layer.toast('登录成功',function () {
                var goLogin = sessionStorage.getItem('goLogin');
                tools.goPage(goLogin || 'creatIndex');
            });
        } else{
            tools.layer.toast('用户名或密码错误!');
        }
    });

});
