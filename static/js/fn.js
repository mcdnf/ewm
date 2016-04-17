/*
 *js设置页面的导航选中状态
 *menuId 为导航的ulID
 *li 的选中样式为 on
 *调用方法：setMenuActive('nav-menu');//js设置页面的导航选中状态 程序可以删除
 */

// @require /static/plugin/jquery-2.2.0.min.js
function setMenuActive(menuId) {
  var _pathname = location.pathname.split('/').pop();
  $("#" + menuId).find('li').each(function(index, el) {
    var _href = $(this).find('a').attr('href') ? $(this).find('a').attr('href').split('/').pop() : "";
    if (_href === _pathname) {
      $(this).addClass('on').siblings().removeClass('on');
    }
  });
}

// @require /static/plugin/raty/jquery.raty.js
//设置星星
function seTstar(el, score, isBig) {
  if (isBig) {
    $(el).raty({
      starHalf: '/static/img/star/b-star-half.png',
      starOff: '/static/img/star/b-star-off.png',
      starOn: '/static/img/star/b-star-on.png',
      readOnly: true,
      score: score,
      hints: ['1星', '2星', '3星', '4星', '5星']
    });
  } else {
    $(el).raty({
      starHalf: '/static/img/star/star-half.png',
      starOff: '/static/img/star/star-off.png',
      starOn: '/static/img/star/star-on.png',
      readOnly: true,
      score: score,
      hints: ['1星', '2星', '3星', '4星', '5星']
    });
  }

  $(el).next('.star-text').text(score.toFixed(1));
}

//点击设置星星
function seTstars(el) {
  $(el).raty({
    starHalf: '/static/img/star/star-half.png',
    starOff: '/static/img/star/star-off.png',
    starOn: '/static/img/star/star-on.png',
    readOnly: false,
    hints: ['1星', '2星', '3星', '4星', '5星'],
    click: function(score) {
      $(el).next('.star-text').text(score);
    }
  });
}


var fn = fn || {};

fn.label = function() {
  // $(document).on('change','label>input',function(event){
  //     event.preventDefault();
  //     $(this).parent().toggleClass('on')
  // })
}

fn.label();

fn.inputNumber = function() {
  $(document).on('input propertychange', 'input[type="number"]', function(event) {
    event.preventDefault();
    if (isNaN($(this).val())) {
      $(this).val(1);
    }
  });
}
fn.inputNumber();



fn.maskbg = {
  show: function(parentId) {
    $("#maskbg").length || $("#view").append('<div class="maskbg" id="maskbg"></div>');
    if (parentId) {
      $("#" + parentId).append($("#maskbg"))
      $("#" + parentId).css("overflowY", "hidden");
    } else {
      $("#view").append($("#maskbg"));
    }
    $("#maskbg").show().removeClass('fadeOut-50').addClass('fadeIn-50');
  },
  hide: function(parentId) {
    $_maskbg = $("#maskbg");
    parentId ? $("#" + parentId).css("overflowY", "auto") : '';
    $_maskbg.removeClass('fadeIn-50').addClass('fadeOut-50');
    setTimeout(function() {
      $("#" + parentId).css("overflowY", "auto");
      $_maskbg.hide();
    }, 520)
  }
}

//获取标签中的纯文本不包含子元素的文本
fn.getText = function(el) {
  return el.contents().filter(function() {
    return this.nodeType === 3;
  }).text();
}



/*
 * o 为点击的对象 如 this
 * option 可选参数：waitTime 等待时间  默认为 ：60 
 * option 可选参数：textDef 默认文字  默认为 '获取验证码';
 * option 可选参数：disabledText 等待文字 默认为   '重新发送';
 * option 可选参数：disabledCss 等待时的样式名 默认为   disabled
 * 使用：
 * 默认<button onclick="fn.waitVerify(this);">获取验证码</button>
 * 设置参数<button onclick="fn.waitVerify(this,{waitTime:30,textDef:"获取验证码"});">获取验证码</button>
 */
fn.waitVerify = function(o, option) {
  var opt = option || {};
  opt.waitTime = opt.waitTime || 60;
  opt.textDef = opt.textDef || '获取验证码';
  opt.textDisabled = opt.disabledText || '重新发送';
  opt.disabledCss = opt.disabledCss || 'disabled';
  event.preventDefault();

  function time(o) {
    if (opt.waitTime == 0) {
      $(o).attr("disabled", false).html(opt.textDef).removeClass(opt.disabledCss);
      opt.waitTime = 60;
    } else {
      $(o).attr("disabled", true).html(opt.textDisabled + "(" + opt.waitTime + ")").addClass(opt.disabledCss);
      opt.waitTime--;
      setTimeout(function() {
        time(o)
      }, 1000)
    }
  }
  time(o);
}
