/*
 * @require static/plugin/jquery-2.2.0.min.js
 * @require static/plugin/iscroll-probe.js
 */



var items_per_page = 10;
var scroll_in_progress = false;
var myScroll;
var load_content = function(refresh, next_page) {
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

    var $_ul = $('#scroller > ul');
    if (!refresh) {
        // Loading the initial content
        creatItem($_ul,1,'initialScroll()');

    } else if (refresh && !next_page) {
        $_ul.empty();
        creatItem($_ul,1,'refreshScroll()');
    } else if (refresh && next_page) {
        creatItem($_ul,next_page,'refreshScroll()');
    }
};

function refreshScroll() {
    myScroll.refresh();
    pullActionCallback();
}
function initialScroll() {
    if (myScroll) {
        myScroll.destroy();
        $(myScroll.scroller).attr('style', ''); // Required since the styles applied by IScroll might conflict with transitions of parent layers.
        myScroll = null;
    }
    trigger_myScroll();
}
function pullDownAction() {
    load_content('refresh');
    $('#wrapper > #scroller > ul').data('page', 1);

    // Since "topOffset" is not supported with iscroll-5
    $('#wrapper > .scroller').css({top:0});

}
function pullUpAction(callback) {
    if ($('#wrapper > #scroller > ul').data('page')) {
        var next_page = parseInt($('#wrapper > #scroller > ul').data('page'), 10) + 1;
    } else {
        var next_page = 2;
    }
    load_content('refresh', next_page);
    $('#wrapper > #scroller > ul').data('page', next_page);

    if (callback) {
        callback();
    }
}
function pullActionCallback() {
    if (pullDownEl && pullDownEl.className.match('loading')) {

        pullDownEl.className = 'pullDown';

        myScroll.scrollTo(0, parseInt(pullUpOffset)*(-1), 160);

    } else if (pullUpEl && pullUpEl.className.match('loading')) {

        $('.pullUp').removeClass('loading').html('');

    }
}

var pullActionDetect = {
    count:0,
    limit:10,
    check:function(count) {
        if (count) {
            pullActionDetect.count = 0;
        }
        // Detects whether the momentum has stopped, and if it has reached the end - 200px of the scroller - it trigger the pullUpAction
        setTimeout(function() {
            if (myScroll.y <= (myScroll.maxScrollY + 160) && pullUpEl && !pullUpEl.className.match('loading')) {
                $('.pullUp').addClass('loading').html('<span class="pullUpIcon">&nbsp;</span><span class="pullUpLabel"></span>');
                pullUpAction();
            } else if (pullActionDetect.count < pullActionDetect.limit) {
                pullActionDetect.check();
                pullActionDetect.count++;
            }
        }, 200);
    }
}

function trigger_myScroll(offset) {
    pullDownEl = document.querySelector('#wrapper .pullDown');
    if (pullDownEl) {
        pullDownOffset = pullDownEl.offsetHeight;
    } else {
        pullDownOffset = 0;
    }
    pullUpEl = document.querySelector('#wrapper .pullUp');
    if (pullUpEl) {
        pullUpOffset = pullUpEl.offsetHeight;
    } else {
        pullUpOffset = 0;
    }

    if (!offset) {
        // If we have more than 1 page of results and offset is not manually defined - we set it to be the pullUpOffset.
        offset = pullUpOffset;
    }

    myScroll = new IScroll('#wrapper', {
        probeType:1, tap:true, click:false, preventDefaultException:{tagName:/.*/}, mouseWheel:true, scrollbars:true, fadeScrollbars:true, interactiveScrollbars:false, keyBindings:false,
        deceleration:0.0002,
        startY:(parseInt(offset)*(-1))
    });

    myScroll.on('scrollStart', function () {
        scroll_in_progress = true;
    });
    myScroll.on('scroll', function () {

        scroll_in_progress = true;

        if (this.y >= 5 && pullDownEl && !pullDownEl.className.match('flip')) {
            pullDownEl.className = 'pullDown flip';
            this.minScrollY = 0;
        } else if (this.y <= 5 && pullDownEl && pullDownEl.className.match('flip')) {
            pullDownEl.className = 'pullDown';
            this.minScrollY = -pullDownOffset;
        }

        pullActionDetect.check(0);

    });
    myScroll.on('scrollEnd', function () {
        setTimeout(function() {
            scroll_in_progress = false;
        }, 100);
        if (pullDownEl && pullDownEl.className.match('flip')) {
            pullDownEl.className = 'pullDown loading';
            pullDownAction();
        }
        // We let the momentum scroll finish, and if reached the end - loading the next page
        pullActionDetect.check(0);
    });

    // In order to prevent seeing the "pull down to refresh" before the iScoll is trigger - the wrapper is located at left:-9999px and returned to left:0 after the iScoll is initiated
    setTimeout(function() {
        $('#wrapper').css({left:0});
    }, 100);
}



document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


window.onload = function () {
    load_content();
}

$(document).on('click', '#scroller li', function (event) {
    event.stopPropagation();
    $(this).toggleClass('on');
})