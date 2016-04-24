/*
 * @require /static/js/api.js
 * @require /static/plugin/swiper/swiper-3.2.7.min.css
 * @require /static/plugin/swiper/swiper-3.2.7.jquery.min.js
 */

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
    $('#addcard').find('.hide').removeClass('hide');
})

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


