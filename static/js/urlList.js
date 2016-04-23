/*
 * @require /static/plugin/jquery-2.2.0.min.js
 * @require /static/plugin/iscroll-probe.js
 * @require /static/js/myScroll.js
 */


var param = {
    "Code": "string",
    "CatalogId": 0,
    "CodeType": "网址导航(1)",
    "Address": "string",
    "AddressMark": "string",
    "Company": "string",
    "Email": "string",
    "Fax": "string",
    "headImg": "string",
    "backImg": "string",
    "Mobile": "string",
    "Weibo": "string",
    "PersonNote": "string",
    "QQ": "string",
    "QQUrl": "string",
    "Station": "string",
    "Tel": "string",
    "Weixin": "string",
    "WeixinUrl": "string",
    "TemplateCode": "string",
    "TemplateNote": "string",
    "filePath": "string",
    "Note": "string",
    "Url": "string",
    "Content": "string"
}


function creatItem(parent,page) {
    var url ='pagesize=10&'+
        'pageindex={'+page+'}&codetype={1}&catalogid={0}';
    api.geturlcodedatalist(url, function (data) {
        console.log(data);
        if(data.Success){
            var _htmlArr = [];
            console.log(data.Data.List[0]);
            // for (var i = 0; i < 10; i++) {
            //     var val = data.Data.List[i],
            //         _type = config.ContentType[val.ContentType],
            //         item = {
            //             ContentType :  val.ContentType,
            //             Content : val.Content,
            //             CataId : val.Id
            //         };
            //     var $_item = $(
            //         '<li>' +
            //         '<i></i>' +
            //         '<p><span>'+_type+'</span><span>'+val.CreateTime.replace(/[T]/ig," ")+'</span></p>' +
            //         '<p>'+val.Content+'</p>' +
            //         '<div class="bar">' +
            //         '<a onclick="edit(this);">编辑</a>' +
            //         '<a onclick="del(this);">删除</a>' +
            //         '</div>' +
            //         '</li>')
            //         .data('item',item)
            //         .appendTo(parent);
            // }
        }  else {
            tools.setGoLogin();
        }

    });
}

function creatItem(pageindex) {
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