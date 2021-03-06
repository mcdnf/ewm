/*
 * @require /static/js/api.js
 */

var widgt = window.widgt || {};

widgt.main = function () {

    var $_clone;

    //编辑时切换并赋值
    edit();

    tools.vr($('#infoTab').find('.info-form.on'));
    function edit() {
        var editewm = sessionStorage.getItem('editewm'),
            index,
            $_form,
            $_item;
        if(!editewm)  return;
        editewm = JSON.parse(editewm);
        console.log(editewm);
        index = editewm.ContentType < 3 ? editewm.ContentType : editewm.ContentType -1;
        $_form = $('#infoTab').find('.info-form').eq(index);
        $_item = $('#sortTab').find('li').eq(index);
        $_form.find('input[name="ID"]').val(editewm.ID);
        var _arr,_data;
        switch (editewm.ContentType){
            case 0 :
                _data = {Content1 : editewm.Content};
                tools.setOn($_form,$_item);
                tools.setInputVal($_form,_data);
                break;
            case 1 :
                _arr = editewm.Content.split(':');
                _data = {Content1 : _arr[2],
                    tel : _arr[1]
                };
                tools.setOn($_form,$_item);
                tools.setInputVal($_form,_data);
                break;
            case 2 :
                _arr = editewm.Content.split(';');
                _data = {};
                $.each(_arr,function (k,v) {
                    var ite = v && v.split(':');
                    if(ite[0] == 'TEL'){
                        if(_data['TEL']){
                            _data['TEL'] += (',' + ite[1]);
                        } else {
                            _data['TEL'] =  ite[1];
                        }
                    } else if(k === 0){
                        _data[ite[1]] = ite[2];
                    } else {
                        _data[ite[0]] = ite[1];
                    }
                });
                tools.setOn($_form,$_item);
                tools.setInputVal($_form,_data);
                break;
            case 4 :
                _data = {Content1 : editewm.Content};
                tools.setOn($_form,$_item);
                tools.setInputVal($_form,_data);
                break;
            case 5 :
                _data = {Content1 : editewm.Content.split(':')[1]};
                tools.setOn($_form,$_item);
                tools.setInputVal($_form,_data);
                break;
            case 6 :
                _data = {Content1 : editewm.Content};
                tools.setOn($_form,$_item);
                tools.setInputVal($_form,_data);
                break;
            default :
                break;

        }
    }
    $(document).on('click', '.add1', function (event) {
        event.stopPropagation();
        var $_clone = '<div class="input-box">'+
                '<span>电话：</span>'+
            '<input name="TEL" data-vr=\'{"maxlength":"20","required":"true"}\' type="tel">'+
                '<i class="sub"></i>'+
            '</div>';
        var $_parent = $(this).parent();
        if ($_parent.next().has('.sub').length) {
            $_parent.nextAll().has('.sub').eq(-1).after($_clone);
        } else {
            $_parent.after($_clone);
        }
    }).on('click', '.sub', function (event) {
        event.stopPropagation();
        $(this).parent().remove();
    }).on('click', '.creat>button', function (event) {
        event.stopPropagation();
        //点击生成按钮
        if(!tools.required($('#infoTab').find('.info-form.on'))){
            return;
        }
        var text = $(this).parent().find('textarea').val(),
            _creat = creat.check(),
            isLogin = sessionStorage.getItem('isLogin');
        if(isLogin){
            if(_creat && _creat.Content){
                console.log(_content);
                var _param = new FormData(_creat.form);
                _param.append("Content",_creat.Content);
                if(sessionStorage.getItem('editewm')){
                    api.addqrcode(_param,function (data) {
                        tools.layer.toast('修改成功!');
                        sessionStorage.removeItem('editewm');
                        tools.goPage('creatIndex');
                    });
                } else {
                    api.addqrcode(_param,function (data) {
                        tools.layer.toast('二维码生成成功!');
                        tools.goPage('creatIndex');
                    });
                }
            } else {
                tools.layer.toast('请按照格式输入内容!');
            }
        } else {
            tools.ewmStyle(_creat.Content,$('#grade_look'),.7,'',ewmStyleCallBack);
            function ewmStyleCallBack () {
                $('#createwm-box').show();
                $('#footer').hide();
            }

        }

    }).on('click', '.close', function () {
        $('#createwm-box').hide();
        $('#footer').show();
    });

    var creat = {
        check : function () {
            var $_form = $('#infoTab').find('.info-form.on'),
                _textarea = $_form.find('textarea[name="Content1"]').val() || "";
            if($_form.hasClass('text') && _textarea){
                _content = _textarea;
            } else if($_form.hasClass('sms') && _textarea){
                var _tel = $_form.find('input').val();
                _content = _tel.match(/^[\d]{11}$/g) && ('smsto:' + _tel + ':' + _textarea);
            } else if($_form.hasClass('vacrd')){
                var $_input = $_form.find('input');
                _content = "MECARD:";
                $.each($_input,function (k,v) {
                    _content += $(v).val() && ($(v).attr('name') + ':' + $(v).val() + ';');
                });
            } else if($_form.hasClass('email')){
                var _email = $_form.find('input').val();
                _content = _email.match(/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/g) && _email;
            } else if($_form.hasClass('tel')){
                var _tel = $_form.find('input').val();
                _content = _tel.match(/^[\d]{11}$/g) && 'tel:' + _tel;
            } else if($_form.hasClass('url')){
                var _url = $_form.find('input').val();
                _content = _url.match(/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/g) && _url;
            } else {
                tools.layer.toast('发生异常!');
            }
            return {
                Content : _content,
                form : $('#infoTab').find('.info-form.on')[0]
            };

        }
    }
}

widgt.main();