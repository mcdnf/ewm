// @require /static/js/api.js

tools.vr($("#loginSubmit").parent());
$("#loginSubmit").on('click',function () {
    var param = new FormData($(this).parent()[0]);
    if(!tools.required($(this).parent())){
        return;
    }
    api.login(param,function (data) {
        if(data.Success){
            sessionStorage.setItem('isLogin',true);
            var goLogin = sessionStorage.getItem('goLogin');
            tools.goPage(goLogin || 'creatIndex');
        } else{
            tools.layer.toast('用户名或密码错误!');
        }
    });

});