// @require /static/js/api.js
var forgot = function () {
    $('#imgCode').click(function(){
        if(!this._src){
            this._src =  this.src;
        }
        this.src = this._src + new Date();
    })

    var account;
    $('#forgotNext').on('click',function (event) {
        event.stopPropagation();
        var $_item = $('#forgot').find('.forgot-item.on');
        if($_item.hasClass('forgot1')){
            var _account = $_item.find('input[name="account"]').val();
            var _code = $_item.find('input[name="code"]').val();
            if(!_account) {
                tools.layer.toast('请输入手机号码!');
            } else if(!_code){
                tools.layer.toast('请输入验证码!');

            } else {
                api.checkimagecode(_account, _code, function (data) {
                    if(data.Success){
                        account = _account;
                        $_item.next().find('p').text('请输入' + _account + '收到的验证码');
                        $_item.removeClass('on').next().addClass('on');
                    } else {
                        tools.layer.toast('验证码有误，请重新输入！');
                    }
                })
            }

        } else if($_item.hasClass('forgot2')){
            var _code = $_item.find('input[name="code"]').val();
            if(!_code){
                tools.layer.toast('请输入验证码!');

            } else {
                api.checksendcode(account, _code, function (data) {
                    console.log(data);
                    if(data.Success){
                        $_item.removeClass('on').next().addClass('on');
                    } else {
                        tools.layer.toast('验证码有误，请重新输入！');
                    }
                })
            }
        } else if($_item.hasClass('forgot3')){
            var _code = $_item.prev().find('input[name="code"]').val();
            var Password = $_item.find('input[name="Password"]').val();
            var RePassword = $_item.find('input[name="RePassword"]').val();
            if(!Password || !RePassword){
                tools.layer.toast('请将信息填写完整!');

            } else if(Password !== RePassword){
                tools.layer.toast('两次输入的密码不一致！');
            }
            else {
                var _param = new FormData();
                _param.append('Password',Password);
                _param.append('RePassword',RePassword);
                _param.append('Account',account);
                _param.append('Code',_code);
                api.modifypwd(_param, function (data) {
                    console.log(data);
                    if(data.Success){
                        tools.layer.toast('登录成功',function () {
                            var goLogin = sessionStorage.getItem('goLogin');
                            tools.goPage(goLogin || 'creatIndex');
                        });
                    } else {
                        tools.layer.toast('修改失败');
                        tools.goPage('forgotPassword');
                    }
                })
            }
        }
    })
};
forgot();
