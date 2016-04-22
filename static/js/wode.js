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
                    setGender(k,v);
                }
                else $('#' + k).text(v);
            });
        } else {
            tools.setGoLogin();
        }
    });


    
    $('#main').find('.item').on('click',function (event) {
        var _naem,_value;
        var $_t = $(this),
            $_h = $('#header'),
            $_val = $_t.find('span:eq(1)');
        var _span = $_t.find('span:eq(0)').text();
        _naem = $_val.attr('id');

        if(_naem === "Gender") _value = $_val.data('Gender')
        else if (_naem === "Portrait") _value = $_val.find('img').attr('src');
        else _value = $_val.text();
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
              _naem = $_form.find('input').attr('name');
              _value = $_form.find('input').val();
              if(_naem == Portrait) {
                  $("#" + _naem).find('img').attr('src',_value);
                  back();
              } else {
                  back(_naem,_value);
              }
          }
        })
    });


    function creatForme(name,value) {
        var $_forme = $('<form  enctype="multipart/form-data"></form>');
        if(name === "Portrait"){
            $_forme.append('<input type="file" accept="image/*;capture=camera" name="Portrait" value="点击上传头像">');
        } else if(name === "Gender") {
            var ischeck = {
                male : false,
                female : false
            };
            if(value){
                value === "male" ? ischeck.male = true : ischeck.female = true;
            }
            $_forme.append('<label class="'+(ischeck.male ? "on" : "")+'">男<input type="radio" name="Gender" value="male" checked="'+ischeck.male+'"></label>' +
                '<label class="'+(ischeck.female ? "on" : "")+'">女<input type="radio" name="Gender" value="female" checked="'+ischeck.female+'"></label>');
            $('#change').on('change','label>input[type="radio"]',function () {
                $(this).parent().addClass('on').siblings().removeClass('on');
            });
        } else {
            $_forme.append('<input type="' + (type || "text") + '" name="' + name + '" value="' + value + '">');
        }
        $('#change').append($_forme);
    }
    function back(name,text) {
        var $_h = $('#header');
        $('#list').show();
        $_h.find('.h-center').text('我').end()
            .find('.h-left').hide().end()
            .find('.h-right').hide();
        if(name){
            if(name === "Gender") setGender(name,text);
            else $('#' + name).text(text);
        }
        $('#change').empty();
    }

    function setGender(id,v) {
        if(v === "male"){
            $('#' + id).text('男').data('Gender',v);
        } else {
            $('#' + id).text('女').data('Gender',v);
        }
    }
}

wode();

