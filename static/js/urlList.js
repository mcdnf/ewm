/*
 * @require /static/plugin/jquery-2.2.0.min.js
 * @require /static/plugin/iscroll-probe.js
 * @require /static/js/myScroll.js
 * @require /static/js/api.js
 */
tools.isLogin();

$('#addUrl').on('focus','input',function () {
    tools.vr($('#addUrl'));
});

$('#header').on('click','.add',function () {
    goAdd();
});

$('#header').on('click','.h-left',function () {
    empytInput($('#addUrl'),['Code','Note','Url']);
    goList();
});
$('#header').on('click','.h-right>a.h-btn',function () {
    if(!tools.required($('#addUrl'))){
        return;
    }
    var param = new FormData($('#addUrl')[0]);
    api.addurlcode(param,function (data) {
        console.log(data);
        if(data.Success){
            empytInput($('#addUrl'),['Code','Note','Url']);
            goList();
        }
    })
});

$('#addItem').on('click',function (event) {
    event.stopPropagation();
    var clone = '<div class="url-item item-new">'+
            '<div class="item-hd">'+
            '<div class="input-box">'+
            '<span>标题：</span>'+
            '    <input name="Note" data-vr=\'{"maxlength":"100","required":"true"}\' type="text" placeholder="请输入标题">'+
            '</div>'+
            '<div class="input-box">'+
            '<span>网址：</span>'+
            '    <input name="Url" data-vr=\'{"maxlength":"100","type":"url","required":"true"}\' type="text" placeholder="如http://2wm.cn">'+
            '</div>'+
            '</div>'+
            '<div class="item-bd del" ></div>'+
        '</div>';
    $(this).prev().after(clone);
});

$('#addUrl').on('click','.del',function () {
    $(this).parent().remove();
});

$('#main').on('click','#scroller ul>li>i',function (event) {
    event.stopPropagation();
    widgt.hide();
    var text = 'http://2v.ms/' + $(this).parent().data('item').code;
    if(!$('#showEwmBox').length){
        $('#view').after('<div id="showEwmBox" style="width: 100%;display: none;padding: 10px 0;">' +
            '<div id="showEwm"></div>' +
            '<p>长按识别二维码或将二维码图片保存至手机相册</p>' +
            '</div>');
    }

    tools.ewmStyle(text,$('#showEwm'),.7,'',ewmStyleCallBack);

    function ewmStyleCallBack () {
        var _size = $(window).width() * .85, remToPx = tools.remToPx();
        var _height = $(window).width() * .7  + 20 + 8 *remToPx;
        layer.open({
            title: '　',
            type: 1,
            area: [_size + 'px',_height + 'px'],
            scrollbar: false,
            content: $('#showEwmBox'),
            success: function (layero, index) {

            }
        });
    }
});


function goAdd() {
    var $_h = $('#header');
    $('#wrapper').hide();
    $('#addUrl').show();
    $_h.find('.h-center').text('网址导航').end()
        .find('.h-left>a').text('取消').addClass('h-btn').end()
        .find('.menu').hide().end()
        .find('.h-right>a').eq(1).removeClass('add').text('保存').addClass('h-btn');
    // var item =$('#addItem').find('.url-item:gt(2)').remove()
    //     .end().find('input').val('');
}
function goList() {
    var $_h = $('#header');
    $('#wrapper').show();
    $('#addUrl').hide();
    $_h.find('.h-center').text('网址导航').end()
        .find('.h-left>a').text('').removeClass('h-btn').end()
        .find('.menu').show().end()
        .find('.h-right>a').eq(1).addClass('add').text('').removeClass('h-btn');
    upScroll();
}



function creatItem(parent,page,callBackFn) {
    var url ='?pagesize=10&'+
        'pageindex='+page+'&codetype=1' +
        '&catalogid=' + catalogid;
    api.geturlcodedatalist(url, function (data) {
        if(data.Success){
            if(!data.Data) {
                tools.layer.toast('当前目录没有数据！');
                return;
            }
            next_page = page;
            if(data.Data.List.length === 0) {
                next_page--;
                tools.layer.toast('没有更多数据了');
                return;
            }
            next_page = page;
            for (var i = 0; i < data.Data.List.length; i++) {
                var val = data.Data.List[i],
                    item = {
                        Content : val.Content,
                        code : val.StringCode
                    };
                var spanArr = []
                    arr = JSON.parse(val.Content);
                if(!arr[0]) return false;
                $.each(arr,function (k,v) {
                    if(!v.Note) return false;
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
            callBackFn();
        }  else {
            tools.setGoLogin();
        }

    });
}
function del(el) {
    layer.msg('您确定要删除吗？',
        {
            time: 20000, //20s后自动关闭
            btn: ['确定', '取消'],
            btn1: function () {
                var val = $(el).parent().parent().data('item');
                api.delurlcode(val.code,function (data) {
                    console.log(data);
                    if(data.Success){
                        $(el).parent().parent().remove();
                    } else {
                        tools.setGoLogin();
                    }
                });
            },
            btn2:function () {

            }
        }
    );
}

function edit(el) {
    var Content = $(el).parent().parent().data('item');
    goAdd();
    $('#addUrl').find('input[name="Code"]').val(Content.code);;
    if(JSON.parse(Content.Content).length > 1){
        var clone = '<div class="url-item item-new">'+
            '<div class="item-hd">'+
            '<div class="input-box">'+
            '<span>标题：</span>'+
            '    <input name="Note" data-vr=\'{"maxlength":"100","required":"true"}\' type="text" placeholder="请输入标题">'+
            '</div>'+
            '<div class="input-box">'+
            '<span>网址：</span>'+
            '    <input name="Url" data-vr=\'{"maxlength":"100","type":"url","required":"true"}\' type="text" placeholder="如http://2wm.cn">'+
            '</div>'+
            '</div>'+
            '<div class="item-bd del" ></div>'+
            '</div>';
        for(var i = 0; i < JSON.parse(Content.Content).length - 1; i++){
            $('#addItem').prev().after(clone);
        }
    }
    var _note = $('#addUrl').find('input[name="Note"]'),
        _url = $('#addUrl').find('input[name="Url"]');
    $.each(JSON.parse(Content.Content),function (k,v) {
        $(_note[k]).val(v.Note);
        $(_url[k]).val(v.Url);
    })
}

function empytInput(Form,nameArr) {
    Form.find('.item-new').remove();
    $.each(nameArr,function (k,v) {
        Form.find('input[name="'+v+'"]').val('');
    })
}

