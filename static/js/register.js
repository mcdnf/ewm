// @require /static/js/api.js

$(function () {
    $('#registerSubmit').on('click', function () {
        var param = new FormData($(this).parent()[0]);
        api.register(param,function (data) {
            if(data.Success){
                tools.layer.toast('注册成功',function () {
                    tools.goPage('creatIndex');
                });
            } else{
                tools.layer.toast(data.Data);
            }
        })
    });
});