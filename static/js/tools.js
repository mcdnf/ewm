/* @require /static/plugin/jquery-2.2.0.min.js
 * @require /static/plugin/layer/layer.js
 * @require /static/js/constants.js
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
                    timeout : 10000,
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
                    .next('.text-count').find('span').text(v.length);
            })


        },
        setOn : function (el) {
            el.addClass('on').siblings().removeClass('on')
        }
    };





