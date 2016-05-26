// @require /static/js/api.js
// @require /static/plugin/underscore-min.js

var widgt = window.widgt || {};
var pageName = tools.getPageName();
var listtype = listPage[pageName] ,catalogid = 0;

widgt.header = function () {
    $('#header').on('click', '.menu', function (event) {
        event.stopPropagation();
        var _this = $(this);
        $('#catalogMenu').find('ul.on').slideToggle(500);
        $(document).on('click', function () {
            $('#catalogMenu').find('ul.on').slideUp(500);
        });
        widgt.hide("header");
    });

    $('#header').on('click', '.menu-bg>ul>li', function (event) {
        event.stopPropagation();
        var $ul = $(this).parent();
        var _id = $(this).data('id');
        var _Pid = $(this).data('parentid');
        if($(this).hasClass('back-parent')) {
            $('#Id' + _Pid).addClass('on').show();
            $ul.animate({
                right: '-12rem',
            }, 500, function () {
                $ul.hide().removeClass('on');
            });
            return;
        };
        catalogid = _id;
        upScroll();
        if ($('#Id' + _id).length) {
            $('#Id' + _id).addClass('on').show().animate({
                right: '.8rem',
            }, 500, function () {
                $ul.hide().removeClass('on');
            });
        }
    });

    var isLogin = sessionStorage.getItem('isLogin');
    if (isLogin) {
        $('#header').find('.back').show();
        $('#header').find('.menu').css({'display': 'block'});
        $('#login').text('退出');
        $('#footer .erqode').find('a').attr('href',pageUrl + '/page/creatIndex.html');
    } else {
        $('#header').find('.back').hide();
        $('#login').text('登录');
    }
    if(listtype !== undefined){
        api.getcataloglist(listtype, function (data) {
            if(data.Success && data.Data.List){
                var list = data.Data.List,
                    $list = $('#catalogMenu'),
                    Pid = 'root',
                    ulArrRel = [],
                    ParentIdArr = [];
                $list.append('<ul class="on" id="Idroot">'+
                    '<li data-id="0">全部类别 </li>'+
                    '</ul>');
                list = _.groupBy (list, function (item){
                    return item.ParentId;
                });
                $.each(list,function (k,v) {
                    var arr =[];
                    arr.push('<ul class="child" id="Id'+v[0].ParentId+'">');
                    arr.push('<li class="back-parent" data-parentid="'+Pid+'">返回</li>');
                    $.each(v, function (x,y) {
                        arr.push('<li data-id="'+y.Id+'">'+y.Name+'</li>');
                    });
                    arr.push('</ul>');
                    ulArrRel = ulArrRel.concat(arr);
                    Pid = k;
                });
                $list.append(ulArrRel.join(''));
            }
        })
    }
}

//判断是否登录
api.getuser(function (data) {
    if (data.Success) {
        sessionStorage.setItem('isLogin','true');
        widgt.header();
    } else {
        sessionStorage.removeItem('isLogin');
    }
});

