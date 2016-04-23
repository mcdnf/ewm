/*
 * @require /static/js/api.js
 * @require /static/plugin/swiper/swiper-3.2.7.min.css
 * @require /static/plugin/swiper/swiper-3.2.7.jquery.min.js
 */

$('#header').on('click','.h-left',function () {
    tools.goPage('addVcard');
});
$('#header').on('click','.h-right>a.h-btn',function () {
    var param = new FormData($('#addUrl')[0]);
    api.addurlcode(param,function (data) {
        console.log(data);
        if(data.Success){
            tools.goPage('addVcard');
        }
    })
});

$('#footer').on('click',function () {
    api.gettemplatelist('?type=0',function (data) {
        if(data.Success){
            $('#addCard').hide();
            $('#selectTpl').show();
            $('#footer').hide();
            var itemArr = $('#selectTpl').find('.swiper-wrapper');
            $.each(data.Data,function (k,v) {
                itemArr.append(
                    '<div class="swiper-slide">' +
                    '    <img src="'+v.Cover+'" alt="" width="100%">' +
                    '</div>'
                );

            });

            var mySwiper = new Swiper ('.swiper-container', {
                direction: 'horizontal',
                loop: true,
                pagination : '.swiper-pagination',
                paginationType : 'fraction'
            });
        }
        console.log(data);
        // BackImageList: null
        // Code: "default"
        // Cover: "http://utest.rs1.2wm.cn/manage/phone/tpl/default/cover.png"
        // CreateTime: "2016-01-01T00:00:00"
        // DeleteTime: "0001-01-01T00:00:00"
        // Id: 3
        // Name: "简约商务"
        // Note: "头像尺寸为266px*266px,背景图尺寸为640px*376px"
        // Type: 0
    })

});


