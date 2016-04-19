// @require /static/js/api.js

var wode = function () {
    api.getuser(function (data) {
        if(data.Success){
            $.each(data.Data,function (k,v) {
                if(k === "Birthday") v = v.split('T').shift();
                $('#' + k).text(v);
            });
            // Birthday: "1900-01-01T00:00:00"
            // CreateTime: "2016-04-11T20:47:48"
            // DeleteTime: "0001-01-01T00:00:00"
            // Email: "392567445@qq.com"
            // Gender: ""
            // ID: 38
            // Job: ""
            // Name: ""
            // NickName: ""
            // Password: "e10adc3949ba59abbe56e057f20f883e"
            // Phone: "18706756724"
            // Plats: ""
            // Portrait: ""
            // QQ: ""
            // Weixin: ""
        } else {
            tools.setGoLogin();
        }
        console.log(data);
    });
}

wode();

