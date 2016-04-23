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

function creatItem(parent,page) {
    creatIndex.getList(page, function (data) {
        console.log(data);
        if(data.Success){
            var _htmlArr = [];
            console.log(data.Data.List[0]);
            for (var i = 0; i < 10; i++) {
                var val = data.Data.List[i],
                    _type = config.ContentType[val.ContentType],
                    item = {
                        ContentType :  val.ContentType,
                        Content : val.Content,
                        CataId : val.Id
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
        }  else {
            tools.setGoLogin();
        }

    });
}

function del(el) {
    var val = $(el).parent().parent().data('item');
    api.delqrcode(val.Id,function (data) {
        if(data.Success){
            $(el).parent().parent().remove();
        } else {
            tools.setGoLogin();
        }
    })
}

function edit(el) {
    var editewm = $(el).parent().parent().data('item');
    sessionStorage.setItem('editewm',JSON.stringify(editewm));
     tools.goPage('index');
}

