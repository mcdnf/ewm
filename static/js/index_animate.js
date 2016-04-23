var index_animate = function(){
	$(document).on('mouseup', function(event) {
		$("#main").find('.home_box').click();
	});
	var win_h = $(window).height();
	$("#benSlide").height(win_h);
		var header_h = $("#header").outerHeight();
		var footer_h = $("#footer").outerHeight();
		var main_h = win_h-footer_h-header_h; //获取主区域的高度
		$("#main").height(main_h);//设置主区域的高度
		var sortTab_h = $("#sortTab").outerHeight();    //tab盒子的高度 

		var	home_box_h = main_h - sortTab_h;

		$("#main").find('.home_box').height(home_box_h);

		var infoTab_h = $("#infoTab").height();
		var creat_H = $("#creat").height();
		//if(infoTab_h+creat_H>home_box_h){
			$("#infoTab").height(home_box_h-creat_H)
		//}
		

	}

var touch = function(btnId){
	var startY, old_h;
	var old_sortTab_h = $("#sortTab").height();
	function slide(startY,endY){
		var Y = endY - startY;		
        var new_sortTab_h = old_h - Y;
        if(old_sortTab_h+4>=new_sortTab_h && old_sortTab_h/2+15<=new_sortTab_h){
        	$("#sortTab").height(new_sortTab_h);
        	index_animate();
        }

	}
    //滑动处理
    document.getElementById(btnId).addEventListener('touchstart', function (ev) {
    	ev.stopPropagation();
    	ev.preventDefault();
    	old_h = $("#sortTab").height();
    	startY = ev.touches[0].pageY;
    }, false);

    document.getElementById(btnId).addEventListener('touchmove', function (ev) {

    	ev.stopPropagation();
    	ev.preventDefault();
    	//old = $("#dragMe").offset().top;
    	var endY = ev.touches[0].pageY;
    	slide(startY,endY)
    }, false);

    document.getElementById(btnId).addEventListener('touchend', function (ev) {
    	ev.stopPropagation();
    	ev.preventDefault();
    	var endY = ev.changedTouches[0].pageY;
    	slide(startY,endY);
    }, false);


}

index_animate();
touch("tag_btn");