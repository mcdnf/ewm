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
                        tools.goPage('login');
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
                        tools.goPage('login');
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
        remToPx : function () {
            return $('body').css('fontSize').replace(/[^\d|.]/g,'');
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
                var arr = v ? v.split(',') : v;
                if(arr && arr.length > 1) {
                    var _el = form.find('[name="'+k+'"]')[0];
                    $(_el).val(arr[0]);
                    $.each(arr,function (k1,v1) {
                        if(!v1) return true;
                        k1 > 0 && tools.creatInputBox(_el,v1,true);
                    });
                } else {
                    form.find('[name="'+k+'"]').val(v)
                        .next('.text-count').find('span').text(v && v.length);
                }
            })
        },
        setInputVals : function (form,data){
            $.each(data,function (k,v) {
                var arr = v ? v.split(',') : v;
                if(arr && arr.length > 1) {
                    var _el = form.find('[name="'+k+'"]')[0];
                    $(_el).val(arr[0]);
                    $.each(arr,function (k1,v1) {
                        if(!v1) return true;
                        k1 > 0 && tools.creatInputBox(_el,v1);
                    });
                } else if(v){
                    if(k === 'HeadImg'){
                        form.find('[name="'+k+'"]').prev().attr("src", v);
                    } else {
                        form.find('[name="'+k+'"]').val(v);
                    }
                }

            });
        },
        setOn : function (el1,el2) {
            el1.addClass('on').siblings().removeClass('on');
            el2.addClass('on').siblings().removeClass('on');
        },
        layer_getImg : function(addewm) {
            var _content = "";
            _content += '<ul>';
            _content += '  <li class="input-box">从手机中选取';
            _content += '    <input class="input-file" id="up" type="file" accept="image/*">';
            _content += '  </li>';
            _content += '  <li class="input-box" onclick="back();layer.closeAll()">取消</li>';
            _content += '</ul>';

            layer.open({
                type: 1,
                area: ['100%', 'auto'],
                closeBtn: 0,
                title: false,
                shadeClose: true, //点击遮罩关闭
                content: _content,
                success: function(layero, index){
                    if(addewm){
                        $('#up').change(function () {
                            layer.closeAll();
                            tools.readFile($(this));
                        })
                    } else {
                        $("#up").uploadPreview({ Img: "ImgPr", Width: 120, Height: 120 ,
                            Callback : function(){
                                layer.closeAll();
                                $('#ImgPr').cropper({
                                    aspectRatio: 1,
                                    strict: false
                                });
                            }
                        });
                    }
                }
            });

        },
        ewmStyle : function (text,el,size,imgEl,callback) {
            var _size = $(window).width()*(size || .7);
            el.css({'width':_size,'height':_size,'margin':'0 auto','position':'relative','zIndex':'9999'});
            var options = {
                size: _size,
                text: text,
                render: "image",//格式
                quiet: 1,
                ecLevel : 'H'
            };
            if(imgEl){
                var _qrcode  = el.empty().qrcode(options);
                el.find('img').css({'position':'relative','zIndex':'10000'});
                _qrcode.callback = callback();
                // tools.imgToBase64(imgEl.attr('src'),function (dataURL) {
                //     imgEl[0].src = dataURL;
                //     options.image = imgEl[0];
                //     options.imagesize = 0.1;
                //     options.mode = 4;// 4 是中心图片
                //     var _qrcode  = el.empty().qrcode(options);
                //     _qrcode.callback = callback();
                // });
            } else {
                var _qrcode  = el.empty().qrcode(options);
                el.find('img').css({'position':'relative','zIndex':'10000'});
                _qrcode.callback = callback();
            }
        },
        uuid : function () {
            var S4 = function () {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                };
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        },
        delCookie : function (name){
            document.cookie="WJUserToken=John Smith; expires=Thu, 18 Dec 2013 12:00:00 GMT; path=/";
            document.cookie = "WJUserToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/ ";
        },
        creatInputBox : function(el,text,ismian) {
            console.log(text)
            if(el){
                var _el = $(el).parent();
                var _item = _el.clone();
                _item.find('input').val(text).end().find('i')[0].className = ismian ? 'sub' : 'del';
                _el.after(_item);
            }
        },
        vr : function (FormEl) {
            var _inputArr = FormEl.find('input');
            $.each(_inputArr, function (k, v) {
                var _v = $(v),
                    _val = _v.val(),
                    _data = _v.data('vr');
                if(typeof _data === 'string'){
                    _data = JSON.parse(_data);
                }
                if(!_data) return true;
                var _required = _data.required || '',
                    _maxlength = _data.maxlength || '',
                    _minlength = _data.minlength || '',
                    _length = _data.length || '',
                    _type = _data.type || '';



                if (_type === 'tel' || _type === 'mobile' || _type === 'qq' || _type === 'number') {
                    _v.on('keyup',function (event) {
                        this.value = this.value.replace(/[^\d]/g,'');
                    })
                }
                if (_length) {
                    _v.on('keyup',function (event) {
                        var _text = $(this).val();
                        var _n = _text.length;
                        if(_maxlength < _n) {
                            $(this).val(_text.substring(0,_length));
                        }
                    })
                }

                if (_maxlength) {
                    _v.on('keyup',function (event) {
                        var _text = $(this).val();
                        var _n = _text.length;
                        if(_maxlength < _n) {
                            $(this).val(_text.substring(0,_maxlength));
                        }
                    })
                }

            });
        },
        required : function (FormEl) {
            var _inputArr = FormEl.find('input'),vr=true;
            var _textarea = FormEl.find('textarea');
            if(_textarea){
                _inputArr.push(_textarea[0]);
            }

            $.each(_inputArr, function (k, v) {
                var _v = $(v),
                    _val = _v.val(),
                    _data = _v.data('vr');
                if(typeof _data === 'string'){
                    _data = JSON.parse(_data);
                }
                if(!_data) return true;

                var _required = _data.required || '',
                    _maxlength = _data.maxlength || '',
                    _minlength = _data.minlength || '',
                    _length = _data.length || '',
                    _type = _data.type || '';

                if(_required && !_val){
                    tools.layer.toast('还有必填项未填写');
                    vr = false;
                    _v.focus();
                    return false;
                }

                if(!_val) {
                    return true;
                }

                if (_minlength && _val.length < _minlength) {
                    tools.layer.toast('输入长度不能小于'+_minlength+'位');
                    _v.focus();
                    vr =false;
                    return false;
                }

                if (_length && _val.length != _length) {
                    if(_type === 'mobile'){
                        tools.layer.toast('手机号码长度必须为'+_length+'位');
                    } else{
                        tools.layer.toast('输入长度必须为'+_length+'位');
                    }
                    vr =false;
                    _v.focus();
                    return false;
                }

                if (_type === 'password') {
                    if(!_val.match(/^[0-9|A-Z|a-z]{6,16}$/g)) {
                        tools.layer.toast('密码码格式不正确');
                        _v.focus();
                        vr =false;
                        return false;
                    }
                }
                if (_type === 'tel') {
                    if(!_val.match(/^\d{8,18}$/g)) {
                        tools.layer.toast('电话号码格式不正确');
                        _v.focus();
                        vr =false;
                        return false;
                    }
                }

                if (_type === 'mobile') {
                    if(!_val.match(/^1[3|4|5|6|7|8]\d{9}$/g)) {
                        tools.layer.toast('手机号码格式不正确');
                        vr =false;
                        _v.focus();
                        return false;
                    }
                }

                if (_type === 'email') {
                    if(!_val.match(/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/g))  {
                        tools.layer.toast('邮箱格式不正确');
                        _v.focus();
                        vr =false;
                        return false;
                    }
                }

                if (_type === 'url') {
                    if(!_val.match(/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/g))  {
                        tools.layer.toast('网址不正确');
                        _v.focus();
                        vr =false;
                        return false;
                    }
                }
                if (_type === 'birthday') {
                    if(!_val.match(/^\d{4}-\d{2}-\d{2}$/g))  {
                        tools.layer.toast('生日格式不不正确');
                        _v.focus();
                        vr =false;
                        return false;
                    }
                }
            });
            return vr;
        },
        readFile : function (el){
            var file = el[0].files[0],rel;
            //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
            if(!/image\/\w+/.test(file.type)){
                alert("请确保文件为图像类型");
                return false;
            }
            if(file.size/1024 > 400) {
                tools.layer.toast("选择文件必须小于400K");
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
                rel = {
                    name : file.name,
                    imgurl : e.currentTarget.result.split(',')[1]
                }
                var param2 = new FormData();
                param2.append("filename",rel.imgurl);
                param2.append("ResName",rel.name);
                api.decodeqrcode(param2,function (data) {
                    console.log(data);
                    if (data.Success) {
                        var param = new FormData($('#addCard')[0]);
                        var _imgurl = data.Data;
                        $(upFile.el).text('上传成功');
                        $(upFile.el).prev().val(_imgurl);
                        back();
                    } else {
                        tools.layer.toast(data.Data);
                    }
                });
            }
        },
        imgToBase64 : function (url, callback, outputFormat){
            var canvas = document.createElement('CANVAS'),
                ctx = canvas.getContext('2d'),
                img = new Image,
                outputFormat = url.split('.').pop();
            outputFormat = 'image/' + outputFormat;
            img.crossOrigin = 'Anonymous';
            img.onload = function(){
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img,0,0);
                var dataURL = canvas.toDataURL(outputFormat || 'image/png');
                callback.call(this, dataURL);
                canvas = null;
            };
            img.src = url;
        },
        getCookie : function (c_name)
        {
            if (document.cookie.length>0)
            {
                c_start=document.cookie.indexOf(c_name + "=")
                if (c_start!=-1)
                {
                    c_start=c_start + c_name.length+1
                    c_end=document.cookie.indexOf(";",c_start)
                    if (c_end==-1) c_end=document.cookie.length
                    return unescape(document.cookie.substring(c_start,c_end))
                }
            }
            return ""
        },
        isLogin : function () {
            if(!tools.getCookie('WJUserToken')){
                tools.setGoLogin();
            }
        }
};





