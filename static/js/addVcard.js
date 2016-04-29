/*
 * @require /static/js/api.js
 * @require /static/plugin/uploadImg.js
 * @require /static/plugin/cropper/cropper.min.css
 * @require /static/plugin/cropper/cropper.min.js
 * @require /static/plugin/swiper/swiper-3.2.7.min.css
 * @require /static/plugin/swiper/swiper-3.2.7.jquery.min.js
 * */

var editVcard = sessionStorage.getItem('editVcard');

if(editVcard){
    var $card = $('#addCard');
    editVcard = JSON.parse(editVcard);
    $('#addVcardMore').remove();
    $card.find('.hide').removeClass('hide');
    tools.setInputVal($card,editVcard.Content);
}

$('#header').on('click','.h-left',function () {
    if($('#selectTpl').is(':visible')){
        $('#addCard').show();
        $('#selectTpl').hide();
        $('#footer').show();
    } else {
        sessionStorage.removeItem('editVcard');
        tools.goPage('vcardList');
    }
});
$('#header').on('click','.h-right>a.h-btn',function () {
    if($('#selectTpl').is(':visible')){
        var Code = $('#selectTpl').find('.swiper-slide-active').data('Code');
        $('#addCard').find('input[name="TemplateCode"]').val(Code);
        $('#addCard').show();
        $('#selectTpl').hide();
        $('#footer').show();
    } else if($('#select').is(':visible')){
        var dataURL = $('#ImgPr').cropper("getCroppedCanvas");
        var imgurl=dataURL.toDataURL("image/png",1.0);
        var param2 = new FormData();
        param2.append("filename",imgurl);
        param2.append("ResName",tools.uuid() + ".png");
        api.addhand(param2,function (data) {
            if(data.Success) {
                var _imgurl = data.Data;
            }
        })
    } else {
        var param = new FormData($('#addCard')[0]);
        api.addurlcode(param,function (data) {
            console.log(data);
            if(data.Success){
                tools.goPage('vcardList');
            }
        });
    }
});

$('#main').on('click','#addVcardMore',function () {
    $(this).remove();
    $('#addCard').find('.hide').removeClass('hide');
});
$('#main').find('#Portrait').on('click',function (event) {
    var $_t = $(this),
        $_h = $('#header');
    $_h.find('.h-center').text('头像').end()
        .find('.h-left').show().end()
        .find('.h-right').show();
    $('#addCard').hide();
    var $_forme = $('<form  enctype="multipart/form-data"></form>');
    $_forme.append('<div class="all"><img id="ImgPr" width="100%"/></div>');
    $('#change').append($_forme);
    tools.layer_getImg();

});

$('#footer').on('click',function () {
    api.gettemplatelist('?type=0',function (data) {
        if(data.Success){
            $('#addCard').hide();
            $('#selectTpl').show();
            $('#footer').hide();
            var itemArr = $('#selectTpl').find('.swiper-wrapper');
            $.each(data.Data,function (k,v) {
                var $slide = $('<div class="swiper-slide">' +
                    '    <img src="'+v.Cover+'" alt="" width="100%">' +
                    '</div>').data('Code',v.Code);
                itemArr.append($slide);
            });

            var mySwiper = new Swiper ('.swiper-container', {
                direction: 'horizontal',
                loop: true,
                pagination : '.swiper-pagination',
                paginationType : 'fraction'
            });
        }
        console.log(data);
    })

});


