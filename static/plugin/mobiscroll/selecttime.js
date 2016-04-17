/*
 * @require css/mobiscroll.css
 * @require css/mobiscroll_date.css
 * @require selecttime.less
 * @require /static/plugin/jquery-2.2.0.min.js
 * @require js/mobiscroll_date.js
 * @require js/mobiscroll.js
 */

var widgt = window.widgt || {};

widgt.selecttime = function() {
  var currYear = (new Date()).getFullYear();
  var opt = {};
  opt.date = {
    preset: 'datetime'
  };
  opt.datetime = {
    preset: 'datetime'
  };
  opt.time = {
    preset: 'time'
  };
  opt.default = {
    theme: 'android-ics light', //皮肤样式
    display: 'modal', //显示方式 
    mode: 'scroller', //日期选择模式
    dateFormat: 'yyyy-mm-dd',
    lang: 'zh',
    showNow: true,
    nowText: "今天",
    startYear: currYear - 20, //开始年份
    endYear: currYear + 20 //结束年份
  };
  $(".selecttime").mobiscroll($.extend(opt['date'], opt['default']));
}

widgt.selecttime();
