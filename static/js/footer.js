/*
 * @require /static/plugin/jquery-2.2.0.min.js
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
        $(this).addClass("on").siblings('li').removeClass("on");
        $('#infoTab').find('.info-form')
            .eq($(this).index()).addClass("on")
            .siblings('.info-form').removeClass("on");
        //$('#creat').css('top', 'auto');
        //$("#infoTab").height('auto');
        _infoTabHeight = $("#infoTab").outerHeight(true);
        //setHeight();
        index_animate();
    });
    // function setHeight() {
    //     if(_infoTabHeight > _height -_barHeight){
    //         _infoTabHeight = _height -_barHeight;
    //         $("#infoTab").height(_infoTabHeight);
    //     }

    //     if($('#sortTab').find('ul').is(":visible")){
    //         _barh = $('#sortTab').outerHeight(true);
    //         var _h = _height - _barh -_btnheight;

    //         if(_infoTabHeight+_btnheight > _h){
    //             // if(_harf < _infoTabHeight){
    //             //     $('#sortTab').css('bottom',-_harf+_barHeight/2+'px');
    //             // }
    //             $("#infoTab").height(_h);
    //             $('#creat').css('top',_h+'px');
    //         }else{
    //             $('#creat').css('top', 'auto');
    //             $("#infoTab").height(_infoTabHeight);
    //         }
    //     } else {
    //         $('#creat').css('top', 'auto');
    //         $("#infoTab").height(_infoTabHeight);
    //     }
    // }

    // .addEventListener('touchstart', function(event) {

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


}

widgt.footer();
