/*
 * @require /static/plugin/jquery-2.2.0.min.js
 */

var widgt = window.widgt || {};

widgt.forgot = function () {
    $('#forgotNext').on('click',function (event) {
        event.stopPropagation();
        $('#forgot').find('.on').removeClass('on').next().addClass('on');
    })
}

widgt.forgot();
