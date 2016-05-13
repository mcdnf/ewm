/*
 * @require /static/js/api.js
 */

var widgt = window.widgt || {};

widgt.footer = function() {
    var _height = $(window).height() - $("#header").height() - $("#footer").height();
    var _btnheight = $('#creat').outerHeight(true);
    var _barHeight = $('#sortTab').find('.bar').outerHeight(true);
    var _infoTabHeight = $("#infoTab").outerHeight(true);
    var _harf = ($('#sortTab').outerHeight(true))/2;

    //setHeight();

    var sortTab = $('#sortTab').find('li').on('click', function (event) {
        event.stopPropagation();
        // //切换时清空编辑内容
        // sessionStorage.removeItem('editewm');
        // $('#infoTab').find('.info-form')
        //     .eq($('#sortTab').find('li.on').index())
        //     .find('input').val('').end()
        //     .find('textarea').val();
        $(this).addClass("on").siblings('li').removeClass("on");
        $('#infoTab').find('.info-form')
            .eq($(this).index()).addClass("on")
            .siblings('.info-form').removeClass("on");
        tools.vr($('#infoTab').find('.info-form.on'));
        _infoTabHeight = $("#infoTab").outerHeight(true);
        index_animate();
    });

    $('#footer').on('click','.item',function (event) {
        event.stopPropagation();
        if($(this).hasClass("on")){
            $(this).find('>ul').slideToggle(500);
        } else{
            $(this).addClass("on").find('>ul').slideDown(500).end()
                .siblings().removeClass("on").find('>ul').slideUp(500);
        }
        widgt.hide("footer");
    });
    
    
    $('#login').on('click',function () {
        var isLogin = sessionStorage.getItem('isLogin');
        if(isLogin){
            api.outlogin(document.cookie,function (data){
                console.log(data);
                if(data.Success){
                    sessionStorage.removeItem('isLogin');
                    $('#login').text('登录');
                    tools.setGoLogin();
                }
            });
        } else {
            tools.setGoLogin();
        }
    });
}

widgt.footer();
