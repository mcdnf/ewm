/*
 * @require /static/plugin/jquery-2.2.0.min.js
 * @require /static/plugin/iscroll-probe.js
 * @require /static/js/myScroll.js
 */

function creatItem() {
    var _htmlArr = [],
        _item =
            '<li>' +
            '<i></i>' +
            '<p><span>网址</span><span>2016-02-24</span></p>' +
            '<div class="url-box">' +
            '<p><span>网易：</span>http://www.163.com</p>' +
            '<p><span>网易：</span>http://www.163.com</p>' +
            '<p><span>网易：</span>http://www.163.com</p>' +
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

    return _htmlArr.join('');
}