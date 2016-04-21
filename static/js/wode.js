// @require /static/js/api.js

var wode = function () {
    api.getuser(function (data) {
        console.log(data)
        if(data.Success){
            sessionStorage.setItem('userID',data.Data.ID);
            $.each(data.Data,function (k,v) {
                v = k === "Birthday" && v.split('T').shift() || v;
                if(k === "Portrait") $('#' + k).find('img').attr('src',v);
                else if(k === "Gender" && v) {
                    if(v === "male"){
                        $('#' + k).text('男').data('Gender',v);
                    } else {
                        $('#' + k).text('女').data('Gender',v);
                    }
                }
                else $('#' + k).text(v);
            });
        } else {
            tools.setGoLogin();
        }
    });

    var _naem,_value;
    
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
        creatForme(_naem,_value);
    });

    $('#header').on('click','.h-left',function () {
        back();
    });
    $('#header').on('click','.h-right',function () {
        var $_form = $('#change').find('form');
        var _param = new FormData($_form[0]);
        _param.append('ID',sessionStorage.getItem('userID'));
        api.userEdit(_param,function (data) {
            console.log(data);
          if(data.Success)  {
              _value = $_form.find('input[name="' + _naem + '"]').val();
              if(_naem == Portrait) {
                  $("#" + _naem).find('img').attr('src',_value);
                  back();
              } else {
                  back(_naem,_value);
              }
          }
        })
    });

    $('#change').on('change','lable>input',function () {
        $(this).parent().addClass('on').siblings().removeClass('on');
    });

    function creatForme(name,value,type) {
        var $_forme = $('<form  enctype="multipart/form-data"></form>');
        if(name === "Portrait"){
            $_forme.append('<input type="file" accept="image/*;capture=camera" name="Portrait" value="点击上传头像">');
        } else if(name === "Gender") {
            $_forme.append('<lable for="Gender1"><input id= "Gender1" type="radio" name="Gender" value="male">男 </lable><lable for="Gender2"> <input id="Gender2" type="radio" name="Gender" value="female">女</lable>');
        } else {
            $_forme.append('<input type="' + (type || "text") + '" name="' + name + '" value="' + value + '">');
        }
        $('#change').append($_forme);
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

