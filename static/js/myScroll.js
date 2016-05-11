/*
 * @require static/plugin/jquery-2.2.0.min.js
 * @require static/plugin/iscroll-probe.js
 */



var next_page = 1;
var myScroll;
var isPullDown,IsPullUp;
var pullDownEl,pullUpEl,pullUpOffset;


//拖动调用
function scrollFn() {
    if (this.y >= 5 && pullDownEl && !pullDownEl.className.match('flip')) {
        pullDownEl.className = 'pullDown flip';
        this.minScrollY = 0;
        isPullDown = 1;
    } else if (this.y <= 5 && pullDownEl && pullDownEl.className.match('flip')) {
        pullDownEl.className = 'pullDown';
        this.minScrollY = -pullDownOffset;
    } else if(this.y<(this.maxScrollY-10)){
        isPullUp = 1;
        pullUpEl.className = 'pullUp flip';
    }
}
//拖动结束调用
function scrollEndFn() {
    if(isPullDown == 1){
        var $_ul = $('#scroller > ul');
        $_ul.empty();
        creatItem($_ul,1,scrollRefresh);
        isPullDown = 0;
    }else if(isPullUp === 1){
        next_page++;
        var $_ul = $('#scroller > ul');
        creatItem($_ul,next_page,scrollRefresh);
        isPullUp = 0;
    }
    pullDownEl.className = 'pullDown';

}
function scrollRefresh() {
    myScroll.refresh();
}


function loadIScroll() {
    var _el = '<div class="pullDown">' +
        '<span class="pullDownIcon"></span>' +
        '<span class="pullDownLabel"></span>' +
        '</div>' +
        '<ul>' +

        '</ul>' +
        '<div class="pullUp"></div>';
    if(!$('#scroller').find('.pullDown').length){
        $('#scroller').append(_el);
    }

    isPullDown = 0;
    isPullUp = 0;
    pullDownEl = document.querySelector('#wrapper .pullDown');
    pullUpEl = document.querySelector('#wrapper .pullUp');
    spinner = document.getElementById("spinner");
    pullDownOffset = pullDownEl.offsetHeight;
    //初始化IScroll
    myScroll = new IScroll('#wrapper', {
        probeType: 1,
        tap:true,
        click:false,
        mouseWheel: true,//鼠标滑轮开启
        scrollbars: true,//滚动条可见
        fadeScrollbars: true,//滚动条渐隐
        interactiveScrollbars: false,//滚动条可拖动
        shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩
        useTransform: true,//CSS转化
        bounce: true,//反弹
        keyBindings: false,
        useTransition: true,//CSS过渡
        freeScroll: false,//只能在一个方向上滑动
        startY: 0,
        preventDefaultException:{tagName:/.*/},
        deceleration:0.0002
    });

    myScroll.on('scroll', scrollFn);
    myScroll.on('scrollEnd', scrollEndFn);

    var $_ul = $('#scroller > ul');
    creatItem($_ul,1,scrollRefresh);

    // In order to prevent seeing the "pull down to refresh" before the iScoll is trigger - the wrapper is located at left:-9999px and returned to left:0 after the iScoll is initiated
    setTimeout(function() {
        $('#wrapper').css({left:0});
    }, 100);
}






document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


window.onload = function () {
    loadIScroll();
}

function upScroll() {
    if(myScroll){
        myScroll.destroy();
        myScroll = null;
    }
    $('#scroller').empty();
    loadIScroll();
}

$(document).on('click', '#scroller li', function (event) {
    event.stopPropagation();
    widgt.hide();
    $(this).toggleClass('on');
    scrollRefresh();
})