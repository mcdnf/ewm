/*
 * @require /static/js/api.js
 * @require /static/plugin/uploadImg.js
 * @require /static/plugin/cropper/cropper.min.css
 * @require /static/plugin/cropper/cropper.min.js
 * @require /static/plugin/underscore-min.js
 * @require /static/plugin/swiper/swiper-3.3.1.min.css
 * @require /static/plugin/swiper/swiper-3.3.1.jquery.min.js
 * */

var upFile,editVcard = sessionStorage.getItem('editVcard');

tools.vr($('#addCard'));

if(editVcard){
    var $card = $('#addCard');
    editVcard = JSON.parse(editVcard);
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
        $('#addCard').find('input[name="TemplateCode"]').val(Code[1]);
        var backImg = $('#selectTpl').find('.swiper-bg .on').data('backImg');
        $('#addCard').find('input[name="BackImg"]').val(backImg);
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
    tools.creatInputBox($(this).prev());
    tools.vr($('#addCard'));
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
    tools.layer_getImg(true);
});

$('#swiper-bg').on('click','.swiper-slide',function (event) {
    $(this).addClass('on').siblings().removeClass('on');
});

$('#footer').on('click',function () {
    var remToPx = tools.remToPx();
    var tplH = $(window).height() - $('#header').height() - remToPx*6.5 - remToPx*2.5;
    $('#swiper-tpl').height(tplH);
    var $card = $('#addCard');
    var TemplateCode = $card.find('input[name="TemplateCode"]').val();
    var BackImg = $card.find('input[name="BackImg"]').val();
    api.gettemplatelist('?type=0',function (data) {
        if(data.Success){
            $('#addCard').hide();
            $('#selectTpl').show();
            $('#footer').hide();
            var itemArr = $('#selectTpl').find('.swiper-tpl .swiper-wrapper');
            var index1 = 0, index2 = 0;
            $.each(data.Data,function (k,v) {
                if(v.Code === TemplateCode){
                    index1 = k;
                };
            });
            $.each(data.Data[index1].BackImageList,function (k,v) {
                if(v === BackImg){
                    index2 = k;
                };
            });
            $.each(data.Data,function (k,v) {
                var _note = v.Note.split(',');
                var $slide = $('<div class="swiper-slide">' +
                    '    <img src="'+v.Cover+'" alt="" width="100%">'+
                        '<div class="tipp">' +
                            '<p>'+v.Name+'</p>'+
                            '<p>'+(_note[0] || "　")+'</p>'+
                            '<p>'+(_note[1] || "　")+'</p>'+
                        '</div>'+
                    '</div>').data('Code',[k,v.Code]);
                itemArr.append($slide);
                
            });

            var mySwiper1 = new Swiper('#swiper-tpl',{
                pagination : '#pagination-tpl',
                paginationType : 'custom',
                paginationCustomRender: function (swiper, current, total) {
                    return current + '/' + total;
                },
                loop: true,
                onSlideChangeEnd: function(swiper){
                    var index = swiper.activeIndex > data.Data.length ? 1 : swiper.activeIndex;
                    creatbg(data.Data[index-1].BackImageList,0);
                }
            });
            mySwiper1.slideTo(index1+1, 100, false);//切换到第一个slide，速度为1秒
            setTimeout(function () {
                creatbg(data.Data[index1].BackImageList,index2);
            },120);
        }
    });
    function creatbg(BackImageList,index) {
        var bgbox = $('#selectTpl').find('#swiper-bg .swiper-wrapper');
        bgbox.empty();
        $.each(BackImageList,function (k,v) {
            var $slide = $('<div class="swiper-slide">' +
                '    <img src="'+v+'" alt="" width="100%">'+
                '</div>').data('backImg',v);
            bgbox.append($slide);
        });
        var mySwiper2 = new Swiper('#swiper-bg',{
            pagination : true,
            slidesPerView : 4,
            onInit: function() {
                $('#swiper-bg').find('.swiper-slide').eq(index).addClass('on');
            }

        });
    }

});

function back() {
    var $_h = $('#header');
    $('#addCard').show();
    $_h.find('.h-center').text('名片');
    $('#footer').show();
    $('#change').empty();
}

