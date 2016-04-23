/*
 * @require /static/plugin/jquery-2.2.0.min.js
 * @require /static/plugin/iscroll-probe.js
 * @require /static/js/myScroll.js
 * @require /static/js/api.js
 */


$('#header').on('click','.add',function () {
    goAdd();
});

$('#header').on('click','.h-left',function () {
    goList();
});
$('#header').on('click','.h-right>a.h-btn',function () {
    var param = new FormData($('#addUrl')[0]);
    api.addurlcode(param,function (data) {
        console.log(data);
        if(data.Success){
            goList();
        }
    })
});

$('#addItem').on('click',function () {
    var clone = $(this).prev().clone();
    $(this).prev().after(clone);
});

$('#addUrl').on('click','.del',function () {
    $(this).parent().remove();
});



function goAdd(name,text) {
    var $_h = $('#header');
    $('#wrapper').hide();
    $('#addUrl').show();
    $_h.find('.h-center').text('名片').end()
        .find('.h-left>a').text('取消').addClass('h-btn').end()
        .find('.h-right>a').removeClass('add').text('保存').addClass('h-btn');
}
function goList(name,text) {
    var $_h = $('#header');
    $('#wrapper').show();
    $('#addUrl').hide();
    $_h.find('.h-center').text('名片').end()
        .find('.h-left>a').text('').removeClass('h-btn').end()
        .find('.h-right>a').addClass('add').text('').removeClass('h-btn');
}

function creatItem(parent,pageindex) {
    var _htmlArr = [],
        _item =
            '<li>' +
            '<i></i>' +
            '<p><span>名片</span><span>2016-02-24</span></p>' +
            '<div class="vcard">' +
                '<img src="../static/img/p16.png">' +
                '<dv class="vcard-bg"><p>董大宝</p><p>临时工</p><p>大宝有限公司</p></dv>' +
            '</div>' +
            '<div class="bar">' +
            '<a>预览</a>' +
            '<a href="addVcard.html">编辑</a>' +
            '<a>删除</a>' +
            '</div>' +
            '</li>';
    for(var i = 0; i < 10; i++){
        _htmlArr.push(_item);
    }

    parent.append(_htmlArr.join(''));
}