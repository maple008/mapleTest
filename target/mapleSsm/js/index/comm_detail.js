$(function() {
	$(".pic_c >b img").each(function() {
		var $this = $(this);
		$("<img/>").attr("src", $(this).attr("src")).load(function() {
			var realWidth = this.width;
			var realHeight = this.height;
			var recta = clacImgZoomParam(48, 48, realWidth, realHeight);
			$this.css({
				width: recta.width + "px",
				height: recta.height + "px",
				marginTop: recta.top + 'px',
				marginLeft: recta.left + 'px'
			});
		});
	});
	$(".pic_c >b").on("click", function() {
		if($(this).hasClass("curr")) return;
		else {
			$(".pic_c >b").removeClass("curr");
			if($(this).index() == 0) {
				$(".big_wrap >span.prev").hide().siblings("span").show();
			} else if($(this).index() == $(".pic_c >b").length - 1) {
				$(".big_wrap >span.next").hide().siblings("span").show();
			} else {
				$(".big_wrap >span").show();
			}
			$(this).addClass("curr");
			var Img = $(this).children("img");
			var img = $("<img/>").attr("src", Img.attr("src")).load(function() {
				var realWidth = this.width;
				var realHeight = this.height;
				var recta = clacImgZoomParam(500, 410, realWidth, realHeight);
				$(this).css({
					width: recta.width + "px",
					height: recta.height + "px"
				});
				$(this).parent().siblings(".big_wrap").children(".big_wrap").width(recta.width)
			});
			$(this).parent().siblings(".big_wrap").children(".big_piv").html(img);
		}
	});
	$(".big_piv").on("click", "img", function() {
		$(this).remove();
		$(".pic_c >b").removeClass("curr");
	});
	$(".big_wrap >span.prev").on("click", function() {
		$(".pic_c >b").each(function() {
			if($(this).hasClass("curr")) {
				$(this).prev("b").trigger("click");
				return false;
			};
		});
	});
	$(".big_wrap >span.next").on("click", function() {
		$(".pic_c >b").each(function() {
			if($(this).hasClass("curr")) {
				$(this).next("b").trigger("click");
				return false;
			};
		});
	});
	var num=0;
	$(".big_wrap>em.rotateL").on("click",function(){
		num--;
		if(num<0) num=3;
		$(".big_piv img").css("transform","rotate("+num*90+"deg)");
		if(num%2!=0){
			$(".big_piv img").css("margin-top",($(".big_piv img").width()-$(".big_piv img").height())/2);
			$(".big_wrap").height($(".big_piv img").width());
			$(".big_wrap").width($(".big_piv img").height());
		}else {
			$(".big_piv img").css("margin-top","0")
			$(".big_wrap").height($(".big_piv img").height());
			$(".big_wrap").width($(".big_piv img").width());
		}
	});
	$(".big_wrap>em.rotateR").on("click",function(){
		num++;
		if(num==4) num=0;
		$(".big_piv img").css("transform","rotate("+num*90+"deg)");
		if(num%2!=0){
			$(".big_piv img").css("margin-top",($(".big_piv img").width()-$(".big_piv img").height())/2);
			$(".big_wrap").height($(".big_piv img").width());
			$(".big_wrap").width($(".big_piv img").height());
		}else {
			$(".big_piv img").css("margin-top","0")
			$(".big_wrap").height($(".big_piv img").height());
			$(".big_wrap").width($(".big_piv img").width());
		}
	});
	//点击回复按钮出现多行文本域
	$(".wrap").on("click","span a.lx",function(){
		var Pa=$(this).parents(".spxx");
		if($(this).hasClass("curr")){
			var hfHtml=Pa.siblings(".hf_area").children("textarea").hide().val();
			Pa.siblings(".hf_area").children("span").text(hfHtml).show();
			$(this).removeClass("curr");
		}else {
			if($(this).parents(".comm_con").find("textarea").length==0){
			$('<div class="hf_area"><textarea></textarea><span></span></div>').insertBefore(Pa);
			$(this).addClass("curr");
		}else {
			Pa.siblings(".hf_area").children("textarea").show().siblings("span").hide();
			$(this).addClass("curr");
		};
		}
		
	});
});

function clacImgZoomParam(maxWidth, maxHeight, width, height) {
	var param = {
		top: 0,
		left: 0,
		width: width,
		height: height
	};
	if(width > maxWidth || height > maxHeight) {
		rateWidth = width / maxWidth;
		rateHeight = height / maxHeight;

		if(rateWidth > rateHeight) {
			param.width = maxWidth;
			param.height = Math.round(height / rateWidth);
		} else {
			param.width = Math.round(width / rateHeight);
			param.height = maxHeight;
		}
	}
	param.left = Math.round((maxWidth - param.width) / 2);
	param.top = Math.round((maxHeight - param.height) / 2);
	return param;
}