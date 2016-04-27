/* @require /static/plugin/jquery-2.2.0.min.js
 * @require /static/plugin/layer/layer.js
 * @require /static/js/constants.js
 * @require /static/plugin/uploadImg.js
 * @require /static/plugin/jquery.qrcode.js
 */

var tools = window.tools || {
        layer : {
            toast : function (msg,callBackFn) {
                layer.msg(msg, {time : 2000},callBackFn)
            }
        },
        ajax : {
            post : function (url,param,successCallBack,isAsync) {
                //存储loading
                var loading;
                $.ajax({
                    url: url,
                    type: "post",
                    data: param,
                    dataType: "json",
                    cache : false,
                    async:  isAsync || true,
                    //超时
                    timeout : 200000,
                    processData: false,
                    contentType:false,
                    xhrFields:{
                        withCredentials:true
                    },
                    success: successCallBack,
                    error : function(jqXHR, textStatus, errorThrown) {
                        console.log("错误信息："+jqXHR.status+"***"+jqXHR.readyState+"***"+textStatus);
                    },
                    beforeSend : function () {
                        loading = layer.load(1, {shade: [0.65, '#000']});
                    },
                    complete:function(){
                        layer.close(loading);
                    }
                });
            },
            get : function (url,successCallBack) {
                //存储loading
                var loading;
                $.ajax({
                    url: url,
                    type: "get",
                    dataType: "json",
                    cache : false,
                    //超时
                    timeout : 30000,
                    processData: false,
                    contentType:false,
                    xhrFields:{
                        withCredentials:true
                    },
                    success: successCallBack,
                    error : function(jqXHR, textStatus, errorThrown) {
                        console.log("错误信息："+jqXHR.status+"***"+jqXHR.readyState+"***"+textStatus);
                    },
                    beforeSend : function () {
                        loading = layer.load(1, {shade: [0.65, '#000']});
                    },
                    complete:function(){
                        layer.close(loading);
                    }
                });
            }
        },
        goPage : function(pageName){
            var url = pageName !== 'index' ? 'page/'  : '';
            window.location.href = pageUrl + url + pageName + '.html';
        },
        getPageName : function () {
            var strUrl= window.location.href;
            return strUrl.split("/").pop().split(".").shift();
        },
        setGoLogin : function () {
            var strUrl= window.location.href;
            strUrl =  strUrl.split("/").pop().split(".").shift();
            sessionStorage.setItem('goLogin',strUrl);
            sessionStorage.setItem('isLogin',false);
            tools.goPage('login');
        },
        textareaLimt : function (el,num) {
            var _text = $(el).val();
            var _textConut =  $(el).next('.text-count').find('span');
            var _n = _text.length;
            if(num >= _n) {
                _textConut.text(_n);

            }else{
                $(el).val(_text.substring(0,300));
                _textConut.text(num);
            }
        },
        setInputVal : function (form,data){
            $.each(data,function (k,v) {
                form.find('[name="'+k+'"]').val(v)
                    .next('.text-count').find('span').text(v && v.length);
            })


        },
        setOn : function (el1,el2) {
            el1.addClass('on').siblings().removeClass('on');
            el2.addClass('on').siblings().removeClass('on');
        },
        layer_getImg : function() {
            var _content = "";
            _content += '<ul>';
            _content += '  <li class="input-box">从手机中选取';
            _content += '    <input class="input-file" id="up" type="file" accept="image/*">';
            _content += '  </li>';
            _content += '  <li class="input-box" onclick="layer.closeAll();">取消</li>';
            _content += '</ul>';

            layer.open({
                type: 1,
                area: ['100%', 'auto'],
                closeBtn: 0,
                title: false,
                shadeClose: true, //点击遮罩关闭
                content: _content,
                success: function(layero, index){
                    $("#up").uploadPreview({ Img: "ImgPr", Width: 120, Height: 120 ,
                        Callback : function(){
                            // console.log($("#up").val());
                            layer.closeAll();
                            $('#ImgPr').cropper({
                                aspectRatio: 1,
                                strict: false
                            });
                        }
                    });
                }
            });

        },
        ewmStyle : function (text,el,size) {
            var _size = $(window).width()*(size || .7);
            var options = {
                size: _size,
                text: text,
                render: "canvas",//格式
                quiet: ''
            };
            el.empty().qrcode(options);
        },
        uuid : function () {
            var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

    };





