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



function goAdd() {
    var $_h = $('#header');
    $('#wrapper').hide();
    $('#addUrl').show();
    $_h.find('.h-center').text('网址导航').end()
        .find('.h-left>a').text('取消').addClass('h-btn').end()
        .find('.h-right>a').removeClass('add').text('保存').addClass('h-btn');
}
function goList() {
    var $_h = $('#header');
    $('#wrapper').show();
    $('#addUrl').hide();
    $_h.find('.h-center').text('网址导航').end()
        .find('.h-left>a').text('').removeClass('h-btn').end()
        .find('.h-right>a').addClass('add').text('').removeClass('h-btn');
}



function creatItem(parent,page) {
    page = 1;
    var url ='?pagesize=10&'+
        'pageindex='+page+'&codetype=1&catalogid=0';
    api.geturlcodedatalist(url, function (data) {
        console.log(data);
        if(data.Success){
            var _htmlArr = [];
            for (var i = 0; i < data.Data.List.length; i++) {
                var val = data.Data.List[i],
                    item = {
                        Content : val.Content,
                        code : val.StringCode
                    };
                var spanArr = []
                    arr = JSON.parse(val.Content);
                $.each(arr,function (k,v) {
                    spanArr.push('<p><span>'+v.Note+'：</span>'+v.Url+'</p>');
                });
                var $_item = $(
                    _item =
                        '<li>' +
                        '<i></i>' +
                        '<p><span>网址</span><span>'+val.CreateTime.replace(/[T]/ig," ")+'</span></p>' +
                        '<div class="url-box">' +
                        spanArr.join('') +
                        '</div>' +
                        '<div class="bar">' +
                        '<a href="http://User.2wm.wj/phone/sitenav-phone?Code='+val.StringCode+'&UserId='+val.UserId+'">预览</a>' +
                        '<a onclick="edit(this)">编辑</a>' +
                        '<a onclick="del(this)">删除</a>' +
                        '</div>' +
                        '</li>')
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
    var Content = $(el).parent().parent().data('item');
    goAdd();
    var _note = $('#addUrl').find('input[name="Note"]');
    var _url = $('#addUrl').find('input[name="Url"]');
    if(JSON.parse(Content.Content).length > _note.length){
        var $clone = $('#addUrl').find('.item-new').clone();
        for(var i = 0; i < JSON.parse(Content.Content).length - _note.length; i++){
            $('#addItem'.prev($clone));
        }
    }
    _note = $('#addUrl').find('input[name="Note"]');
    _url = $('#addUrl').find('input[name="Url"]');
    $.each(JSON.parse(Content.Content),function (k,v) {
        $(_note[k]).val(v.Note);
        $(_url[k]).val(v.Url);
    })


}

