/*
 * @require /static/plugin/jquery-2.2.0.min.js
 * @require /static/plugin/iscroll-probe.js
 * @require /static/js/myScroll.js
 * @require /static/js/api.js
 */




$('#addItem').on('click',function (event) {
    event.stopPropagation();
    var clone = $(this).prev().clone();
    $(this).prev().after(clone);
});

$('#addUrl').on('click','.del',function (event) {
    event.stopPropagation();
    $(this).parent().remove();
});


$('#main').on('click','#scroller ul>li>i',function (event) {
    event.stopPropagation();
    widgt.hide();
    var text = 'http://2v.ms/' + $(this).parent().data('item').code;
    if(!$('#showEwmBox').length){
        $('#view').after('<div id="showEwmBox" style="width: 100%;padding: 10px 0;">' +
            '<div id="showEwm"></div>' +
            '<p>长按识别二维码添加到通讯录或将二维码图片保存至手机相册</p>' +
            '</div>');
    }

    var img = $(this).parent().find('img');
    tools.ewmStyle(text,$('#showEwm'),.7,img,ewmStyleCallBack);

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


function creatItem(parent,page,callBackFn) {
    var url ='?pagesize=10&'+
        'pageindex='+page+'&codetype=2' +
        '&catalogid=' + catalogid;
    api.geturlcodedatalist(url, function (data) {
        if(data.Success){
            var _htmlArr = [];
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
                        '<img src="'+ imgurl.split('@')[0] +'">' +
                        '<dv class="vcard-bg"><p>'+val.CardName+'</p><p>'+val.Station+'</p><p>'+val.Company+'</p></dv>' +
                        '</div>' +
                        '<div class="bar">' +
                        '<a href="http://User.2wm.wj/phone/tpl/'+val.TemplateCode+'/index.html?UserId='+data.Data.List[i].UserId+'&Code='+data.Data.List[i].StringCode+'">预览</a>' +
                        '<a onclick="edit(this)">编辑</a>' +
                        '<a onclick="del(this)">删除</a>' +
                        '</div>')
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
    var editVcard = $(el).parent().parent().data('item');
    sessionStorage.setItem('editVcard',JSON.stringify(editVcard));
    tools.goPage('addVcard');
}
