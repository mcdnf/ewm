/*
 * @require /static/js/api.js
 * @require /static/plugin/uploadImg.js
 * @require /static/plugin/cropper/cropper.min.css
 * @require /static/plugin/cropper/cropper.min.js
 * @require /static/plugin/swiper/swiper-3.2.7.min.css
 * @require /static/plugin/swiper/swiper-3.2.7.jquery.min.js
 * */

var upFile,editVcard = sessionStorage.getItem('editVcard');

tools.vr($('#addCard'));

if(editVcard){
    var $card = $('#addCard');
    editVcard = JSON.parse(editVcard);
    console.log(editVcard);
    $('#addVcardMore').remove();
    $card.find('.hide').removeClass('hide');
    tools.setInputVals($card,editVcard.Content);
}

$('#header').on('click','.h-left',function () {
    if($('#selectTpl').is(':visible')){
        $('#addCard').show();
        $('#selectTpl').hide();
        $('#footer').show();
    } else if($('#ImgPr').length) {
        back();
    } else {
        sessionStorage.removeItem('editVcard');
        tools.goPage('vcardList');
    }
});
$('#header').on('click','.h-right>a.h-btn',function () {
    var param = new FormData($('#addCard')[0]);
    if($('#selectTpl').is(':visible')){
        var Code = $('#selectTpl').find('.swiper-tpl .swiper-slide-active').data('Code');
        $('#addCard').find('input[name="12111141"]').val(Code);
        var backImg = $('#selectTpl').find('.swiper-bg .swiper-slide-active').data('backImg');
        $('#addCard').find('input[name="backImg"]').val(backImg);
        $('#addCard').show();
        $('#selectTpl').hide();
        $('#footer').show();
    } else if($('#ImgPr').length){
        var dataURL = $('#ImgPr').cropper("getCroppedCanvas");
        var imgurl = dataURL.toDataURL().substring(22);
        var param2 = new FormData();
        param2.append("filename",imgurl);
        param2.append("ResName",tools.uuid() + ".png");
        api.addhand(param2,function (data) {
            if (data.Success) {
                var param = new FormData($('#addCard')[0]);
                var _imgurl = data.Data;
                if(upFile.elname === 'Portrait'){
                    $("#Portrait").find('img').attr('src', _imgurl);
                    $("#Portrait").find('input').val(_imgurl);
                } else {
                    $(upFile.el).text('上传成功');
                    $(upFile.el).prev().val(_imgurl);
                }
                back();
            }
        });
    } else {
        if(!tools.required($('#addCard'))){
            return;
        }
        if(editVcard){
            param.append("Code",editVcard.code);
        }
        api.addurlcode(param,function (data) {
            if(data.Success){
                tools.goPage('vcardList');
            }
        });
    }
});

$('#main').on('click','.add',function () {
    tools.creatInputBox(this);
});
$('#main').on('click','.del',function () {
    $(this).parent().remove();
});

$('#main').on('click','#addVcardMore',function () {
    $(this).remove();
    $('#addCard').find('.hide').removeClass('hide');
});

$('#main').find('#Portrait').on('click',function (event) {
    upFile = {
        el : this,
        elname : 'Portrait'
    };
    var $_t = $(this),
        $_h = $('#header');
    $_h.find('.h-center').text('头像').end()
        .find('.h-left').show().end()
        .find('.h-right').show();
    $('#addCard').hide();
    $('#footer').hide();
    var $_forme = $('<form  enctype="multipart/form-data"></form>');
    $_forme.append('<div class="all"><img id="ImgPr" width="100%"/></div>');
    $('#change').append($_forme);
    tools.layer_getImg();
});

$('#main').find('.add-ewm').on('click',function (event) {
    upFile = {
        el : this,
        elname : 'add-ewm'
    };
    var $_t = $(this),
        $_h = $('#header');
    $_h.find('.h-center').text('上传二维码').end()
        .find('.h-left').show().end()
        .find('.h-right').show();
    $('#addCard').hide();
    $('#footer').hide();
    var $_forme = $('<form  enctype="multipart/form-data"></form>');
    $_forme.append('<div class="all"><img id="ImgPr" width="100%"/></div>');
    $('#change').append($_forme);
    tools.layer_getImg(true);

});

$('#footer').on('click',function () {
    var mainH = $('#main').height();
    var bgH = tools.remToPx()*6.5;
    console.log(bgH);
    api.gettemplatelist('?type=0',function (data) {
        if(data.Success){
            console.log(data);
            $('#addCard').hide();
            $('#selectTpl').show();
            $('#footer').hide();
            var itemArr = $('#selectTpl').find('.swiper-tpl .swiper-wrapper');
            $.each(data.Data,function (k,v) {
                var $slide = $('<div class="swiper-slide">' +
                    '    <img src="'+v.Cover+'" alt="" width="100%">'+
                    '</div>').data('Code',v.Code);
                itemArr.append($slide);
                
            });

            var mySwiper = new Swiper ('.swiper-tpl', {
                direction: 'horizontal',
                loop: true,
                pagination : '.swiper-tpl .swiper-pagination',
                paginationType : 'fraction',
                onTransitionEnd: function(swiper){
                    var code = $('#selectTpl').find('.swiper-tpl .swiper-slide-active').data('Code');
                    creatbg(code);
                    var swiper = new Swiper('.swiper-bg', {
                        slidesPerView: 4,
                        centeredSlides: true,
                        paginationClickable: true,
                        spaceBetween: 30
                    });
                }
            });
            creatbg('default');
            var swiper = new Swiper('.swiper-bg', {
                slidesPerView: 4,
                centeredSlides: true,
                paginationClickable: true,
                spaceBetween: 30
            });
        }
        console.log(data);
    });

    function creatbg(code) {
        var bgbox = $('#selectTpl').find('.swiper-bg .swiper-wrapper');
        bgbox.empty();
        for(var i = 1; i < 11; i++){
            var _src = 'http://utest.rs1.2wm.cn/manage/phone/tpl/'+code+'/backimages/'+i+'.jpg';
            var $slide = $('<div class="swiper-slide">' +
                '    <img src="'+_src+'" alt="" width="100%">'+
                '</div>').data('backImg',_src);
            bgbox.append($slide);
        }
    }

});

function back() {
    var $_h = $('#header');
    $('#addCard').show();
    $_h.find('.h-center').text('名片');
    $('#footer').show();
    $('#change').empty();
}

