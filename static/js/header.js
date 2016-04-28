// @require /static/js/api.js

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
    // $('#header').on('click', '.menu-bg>ul>li>ul>li:first-child', function (event) {
    //     event.stopPropagation();
    //     $(this).parent().animate({
    //         right : '-8rem',
    //     }, 1000, function() {
    //     });
    //
    // });
    var isLogin = sessionStorage.getItem('isLogin');
    if(isLogin) {
        $('#header').find('.back').show();
    } else {
        $('#header').find('.back').hide();
    }
}


api.getuser(function (data) {
    console.log(data)
    if(data.Success){
        $('#header').find('.menu').css({'display': 'block'});
        widgt.header();
        $('#login').text('退出');
    } else {
        sessionStorage.removeItem('isLogin');
        $('#login').text('登录');

    }
});

