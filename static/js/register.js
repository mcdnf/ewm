// @require /static/js/api.js
tools.vr($('#registerSubmit').parent());
$(function () {
    var remToPx = tools.remToPx();
    $('#main').find('.login-box').css({'minHeight':$('#main').find('.login-center').height()+10*remToPx +'px'});
    $('#registerSubmit').on('click', function () {
        var param = new FormData($(this).parent()[0]);
        if(!tools.required($(this).parent())){
            return;
        }
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