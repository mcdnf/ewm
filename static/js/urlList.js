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
    $_h.find('.h-center').text('网址导航').end()
        .find('.h-left>a').text('取消').addClass('h-btn').end()
        .find('.h-right>a').removeClass('add').text('保存').addClass('h-btn');
}
function goList(name,text) {
    var $_h = $('#header');
    $('#wrapper').show();
    $('#addUrl').hide();
    $_h.find('.h-center').text('网址导航').end()
        .find('.h-left>a').text('').removeClass('h-btn').end()
        .find('.h-right>a').addClass('add').text('').removeClass('h-btn');
}


var url ='pagesize=10&'+
    'pageindex=1&codetype=1&catalogid=0';
api.geturlcodedatalist(url, function (data) {
    console.log(data);
});


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

function creatItem(parent,pageindex) {
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

    parent.append(_htmlArr.join(''));
}