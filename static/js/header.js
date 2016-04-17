//  @require /static/js/fn.js

var widgt = window.widgt || {};

widgt.header = function () {
    $('#header').on('click', '.menu', function (event) {
        event.stopPropagation();
        var _this = $(this);
        _this.next('.menu-bg').find('>ul').slideToggle(500,function () {
            $(this).find('ul').show();
        });
        $(document).on('click', function () {
            _this.next('.menu-bg').find('>ul').slideUp(500);
        });
        widgt.hide("header");
    });


    $('#header').on('click', '.menu-bg>ul>li', function (event) {
        event.stopPropagation();
        if($(this).find('ul').length){
            $(this).find('ul').animate({
                right : '-.8rem',
            }, 1000, function() {
            });
        }
    });
    $('#header').on('click', '.menu-bg>ul>li>ul>li:first-child', function (event) {
        event.stopPropagation();
        $(this).parent().animate({
            right : '-8rem',
        }, 1000, function() {
        });

    });
}

widgt.header();

widgt.hide = function (t) {
    //隐藏头部框架弹出
    if(t !== "header") $('#header').find('.menu-bg>ul').slideUp(500);

    //隐藏底部菜单弹出
    if(t !== "footer") $('#footer').find('.item>ul').slideUp(500);
}

$(document).on('click', function () {
    widgt.hide();
});