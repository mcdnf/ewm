/*
 * @require /static/plugin/jquery-2.2.0.min.js
 * @require /static/plugin/iscroll-probe.js
 * @require /static/js/myScroll.js
 * @require /static/js/api.js
 */

var creatIndex = {
    getList : function (pagesize, pageindex, listtype, catalogid ) {
        var url = '?pagesize=' + pagesize + '&' +
            'pageindex=' + pageindex + '&' +
            'listtype=' + listtype + '&' +
            'catalogid=' + catalogid;
        api.getqrcodelist(url,function (data) {
            console.log(data);
        });
    },
    add :function () {
        var param = new FormData();
        param.append("Content", "发放");
        param.append("ContentType","Text(0)");
        param.append("CataId","0");

        api.addqrcode(param,function (data) {
            console.log('00',data);
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
creatIndex.add();
creatIndex.getList(10,1,0,0);
function creatItem() {
    var _htmlArr = [],
        _item =
            '<li>' +
            '<i></i>' +
            '<p><span>文本</span><span>2016-02-24</span></p>' +
            '<p>二维码作为图书内容的延展，可以以音频、视频等形式呈现书中没有的内容，形成与纸质图书的有益互补。</p>' +
            '<div class="bar">' +
            '<a>编辑</a>' +
            '<a>删除</a>' +
            '</div>' +
            '</li>';
    for(var i = 0; i < 10; i++){
        _htmlArr.push(_item);
    }

    return _htmlArr.join('');
}