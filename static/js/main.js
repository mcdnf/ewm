/*
 * @require /static/js/tools.js
 * @require /static/plugin/jquery.qrcode.js
 */

var widgt = window.widgt || {};

widgt.main = function () {
    var $_clone;
    $(document).on('click', '.add', function (event) {
        event.stopPropagation();
        var $_parent = $(this).parent();
        if ($_parent.next().has('.sub').length) {
            $_clone = $_parent.next().clone();
            $_clone = $_parent.next().after($_clone);
        } else {
            $_parent.after($_clone);
            $_last = $_parent.next();
        }
    }).on('click', '.sub', function (event) {
        event.stopPropagation();
        $(this).parent().remove();
    }).on('click', '.creat', function (event) {
        event.stopPropagation();
        //点击生成按钮
        var text = $(this).parent().find('textarea').val(),
            isLogin = sessionStorage.getItem('isLogin');
        if(isLogin){
            tools.goPage('creatIndex');
        } else {
            ewmStyle(text);
            $('#createwm-box').show();
            $('#footer').hide();
        }

    }).on('click', '.close', function () {
        $('#createwm-box').hide();
        $('#footer').show();
    });

    var ewmStyle = function (text) {
        var _size = $(window).width()*.7;
        var options = {
            size: _size,
            text: text,
            render: "canvas",//格式
            // fontcolor: '#' + $("#fontcolor").val(),//字体颜色
            quiet: ''
        };
        // if (bgColor != '#ffffff') {
        //     options['quiet'] = 1;
        // }
        $("#grade_look").empty().qrcode(options);

    };
}

widgt.main();