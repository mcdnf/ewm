/*
 * @require /static/plugin/jquery-2.2.0.min.js
 * @require /static/plugin/iscroll-probe.js
 * @require /static/js/myScroll.js
 * @require /static/js/api.js
 */


$('#header').on('click','.add',function () {
    goAdd();
});


$('#addItem').on('click',function () {
    var clone = $(this).prev().clone();
    $(this).prev().after(clone);
});

$('#addUrl').on('click','.del',function () {
    $(this).parent().remove();
});



function goAdd() {
    var $_h = $('#header');
    $('#wrapper').hide();
    $('#addUrl').show();
    $_h.find('.h-center').text('名片').end()
        .find('.h-left>a').text('取消').addClass('h-btn').end()
        .find('.h-right>a').removeClass('add').text('保存').addClass('h-btn');
}
function goList() {
    var $_h = $('#header');
    $('#wrapper').show();
    $('#addUrl').hide();
    $_h.find('.h-center').text('名片').end()
        .find('.h-left>a').text('').removeClass('h-btn').end()
        .find('.h-right>a').addClass('add').text('').removeClass('h-btn');
}

function creatItem(parent,page) {
    page = 1;
    var url ='?pagesize=10&'+
        'pageindex='+page+'&codetype=2&catalogid=0';
    api.geturlcodedatalist(url, function (data) {
        console.log(data);
        if(data.Success){
            var _htmlArr = [];
            if(!data.Data){
                return
            }
            for (var i = 0; i < data.Data.List.length; i++) {
                var val = data.Data.List[i].ContentData,
                    item = {
                        Content : val,
                        code : data.Data.List[i].StringCode
                    };
                var imgurl = val.HeadImg  ? val.HeadImg : "../static/img/p16.png";
                var $_item = $(
                    _item =
                        '<li>' +
                        '<i></i>' +
                        '<p><span>名片</span><span>'+data.Data.List[i].CreateTime.replace(/[T]/ig," ")+'</span></p>' +
                        '<div class="vcard">' +
                        '<img src="'+ imgurl +'">' +
                        '<dv class="vcard-bg"><p>'+val.CardName+'</p><p>'+val.Station+'</p><p>'+val.Company+'</p></dv>' +
                        '</div>' +
                        '<div class="bar">' +
                        '<a href="http://User.2wm.wj/phone/sitenav-phone?Code='+data.Data.List[i].StringCode+'&UserId='+data.Data.List[i].UserId+'">预览</a>' +
                        '<a onclick="edit(this)">编辑</a>' +
                        '<a onclick="del(this)">删除</a>' +
                        '</div>')
                    .data('item',item)
                    .appendTo(parent);
            }
        }  else {
            tools.setGoLogin();
        }

    });


}
function del(el) {
    var val = $(el).parent().parent().data('item');
    api.delurlcode(val.code,function (data) {
        console.log(data);
        if(data.Success){
            $(el).parent().parent().remove();
        } else {
            tools.setGoLogin();
        }
    });
}

function edit(el) {
    var editVcard = $(el).parent().parent().data('item');
    sessionStorage.setItem('editVcard',JSON.stringify(editVcard));
    tools.goPage('addVcard');
}
