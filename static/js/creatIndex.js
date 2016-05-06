/*
 * @require /static/plugin/jquery-2.2.0.min.js
 * @require /static/plugin/iscroll-probe.js
 * @require /static/js/myScroll.js
 * @require /static/js/api.js
 */

var creatIndex = {
    getList : function (pageindex ,fn) {
        var url = '?pagesize=10&' +
            'pageindex=' + pageindex + '&' +
            'listtype=0&' +
            'catalogid=0';
        api.getqrcodelist(url,fn);
    },
    add :function () {
        api.addqrcode(param,function (data) {
            console.log(data);
        });
    },
    del: function (id) {
        url = '?id={' + id + '}';
        api.delqrcode(url,function (data) {
            console.log(data);
        });
    },
    edit: function () {
        var param = new FormData();
        param.append("Content", "发放");
        param.append("ContentType","Text(0)");
        param.append("CataId","0");

        api.editqrcode(param,function (data) {
            console.log(data);
        });
    }


}

function creatItem(parent,page,callBackFn) {
    creatIndex.getList(page, function (data) {
        if(data.Success){
            if(!data.Data) {
                tools.layer.toast('没有数据，快去添加数据');
                tools.goPage('index');
                return;
            }
            if(data.Data.List.length === 0) {
                next_page = page;
                tools.layer.toast('没有更多数据了');
                eval(callBackFn);
                return;
            }
            for (var i = 0; i < data.Data.List.length; i++) {
                var val = data.Data.List[i],
                    _type = config.ContentType[val.ContentType],
                    item = {
                        ContentType :  val.ContentType,
                        Content : val.Content,
                        ID : val.Id
                    };
                var $_item = $(
                    '<li>' +
                    '<i></i>' +
                    '<p><span>'+_type+'</span><span>'+val.CreateTime.replace(/[T]/ig," ")+'</span></p>' +
                    '<p>'+val.Content+'</p>' +
                    '<div class="bar">' +
                    '<a onclick="edit(this);">编辑</a>' +
                    '<a onclick="del(this);">删除</a>' +
                    '</div>' +
                    '</li>')
                    .data('item',item)
                    .appendTo(parent);
            }
            eval(callBackFn);
        }  else {
            tools.setGoLogin();
        }

    });
}


$('#main').on('click','#scroller ul>li>i',function (event) {
    event.stopPropagation();
    var text = $(this).parent().data('item').Content;
    if(!$('#showEwmBox').length){
        $('#view').after('<div id="showEwmBox" style="width: 100%;display: none;padding: 10px 0;"><div id="showEwm"></div><p>长安保存到手机</p></div>');
    }
    tools.ewmStyle(text,$('#showEwm'),.8);
    var _size = $(window).width()*.85;
    layer.open({
        title: '　',
        type: 1,
        area:[_size+'px'],
        scrollbar: false,
        content: $('#showEwmBox'),
        success: function(layero, index){

            console.log(layero, index);
        }
    });
})

function del(el) {
    layer.msg('您确定要删除吗？',
        {
            time: 20000, //20s后自动关闭
            btn: ['确定', '取消'],
            btn1: function () {
                var val = $(el).parent().parent().data('item');
                api.delqrcode(val.Id,function (data) {
                    if(data.Success){
                        $(el).parent().parent().remove();
                    } else {
                        tools.setGoLogin();
                    }
                })
            },
            btn2:function () {
                
            }
        }
    );
}
sessionStorage.removeItem('editewm');

function edit(el) {
    var editewm = $(el).parent().parent().data('item');
    sessionStorage.setItem('editewm',JSON.stringify(editewm));
    tools.goPage('index');
}

