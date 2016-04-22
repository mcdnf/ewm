var index_animate = function(){
	var win_h = $(window).height();
		var header_h = $("#header").outerHeight();
		var footer_h = $("#footer").outerHeight();
		var main_h = win_h-footer_h-header_h; //获取主区域的高度
		$(".main").height(main_h);//设置主区域的高度
		var home_nav_pos_h = $(".home_nav_pos").height();  
		var btn_box_h = $("#creat").outerHeight();
		var home_nav_h = $("#home_nav").outerHeight();
		var txt_box_h = $(".txt_box").height();  

		if(main_h-txt_box_h>home_nav_pos_h){
			$(".home_box").height(main_h - txt_box_h);
			// $("#tag_btn").click(function() {
			// 	if($(".home_nav").height()>75){
			// 		$(".home_nav").animate({height: "75px"},500);
			// 	}else{
			// 		$(".home_nav").animate({height: "150px"},500);
			// 	}			
			// });
		}else{
			$(".txt_box").height(main_h - home_nav_pos_h - btn_box_h);
			$(".home_box").height(main_h - $(".txt_box").height());
			// $("#tag_btn").click(function() {
			// 	if($(".home_nav").height()>75){
			// 		$(".home_nav").animate({height: "75px"},500);
			// 		$(".txt_box").animate({height: $(".txt_box").height()+75},500);
			// 		$(".home_box").animate({height: $(".home_box").height()-75},500);
			// 	}else{
			// 		$(".home_nav").animate({height: "150px"},500);
			// 		$(".txt_box").animate({height: $(".txt_box").height()-75},500);
			// 		$(".home_box").animate({height: $(".home_box").height()+75},500);
			// 	}			
			// });
		}
		touch();
	}

var touch = function(){
	var startY, old;
	function slide(startY,endY){
		var Y = endY - startY;
		$("#dragMe").text(Y);
		$("#dragMe").animate({"top":endY+"px"},0)
	}
    //滑动处理
    document.getElementById("dragMe").addEventListener('touchstart', function (ev) {
    	ev.stopPropagation();
    	ev.preventDefault();
    	old = $("#dragMe").offset().top-$("#header").outerHeight()+0.5;
    	//alert(old)
    	startY = ev.touches[0].pageY;
    }, false);

    document.getElementById("dragMe").addEventListener('touchmove', function (ev) {

    	ev.stopPropagation();
    	ev.preventDefault();
    	var endY = ev.touches[0].pageY;
    	slide(startY,endY)
    }, false);

    document.getElementById("dragMe").addEventListener('touchend', function (ev) {
    	ev.stopPropagation();
    	ev.preventDefault();
    	var endY = ev.touches[0].pageY;
    	slide(startY,endY)
    }, false);
}

index_animate();