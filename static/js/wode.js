// @require /static/js/api.js

var wode = function () {
    api.getuser(function (data) {
        if(data.Success){
            $.each(data.Data,function (k,v) {
                v = k === "Birthday" && v.split('T').shift() || v;
                if(k === "Portrait") $('#' + k).find('img').attr('src',v);
                else $('#' + k).text(v);
            });
        } else {
            tools.setGoLogin();
        }
    });

    var _naem,_value,_forme;
    
    $('#main').find('.item').on('click',function (event) {
        var $_t = $(this),
            $_h = $('#header'),
            $_val = $_t.find('span:eq(1)');
        var _span = $_t.find('span:eq(0)').text();
        _naem = $_val.attr('id');
        _value = $_val.text();
        $_h.find('.h-center').text(_span).end()
            .find('.h-left').show().end()
            .find('.h-right').show();
        $('#list').hide();
        _forme = creatForme(_naem,_value);
    });

    $('#header').on('click','.h-left',function () {
        back();
    });
    $('#header').on('click','.h-right',function () {
        var _param = new FormData(_forme[0]);
        api.userEdit(_param,function (data) {
          if(data.Success)  {
              _value = _forme.find('input[name="' + _naem + '"]');
              back(_naem,_value);
          }
        })
    });
    
    
    function creatForme(name,value,type) {
        var $_forme = $('<forme  enctype="multipart/form-data"></forme>');
        if(name === "Portrait"){
            $_forme.append('<input type="file" accept="image/*;capture=camera" name="' + name + '" value="点击上传头像">');
        } else {
            $_forme.append('<input type="' + (type || "text") + '" name="' + name + '" value="' + value + '">');
        }
        $('#change').append($_forme);
        return $_forme;
    }
    function back(name,text) {
        var $_h = $('#header');
        $('#change').empty();
        $('#list').show();
        $_h.find('.h-center').text('我').end()
            .find('.h-left').hide().end()
            .find('.h-right').hide();
        name && $('#' + name).text(text);
    }
}

wode();

