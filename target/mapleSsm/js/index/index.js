$(function() {
	//用户名的显示隐藏
//	$(".header_r dl dt b").on("click", function() {
//		if($(this).hasClass("curr")) $(this).removeClass("curr").parent().next("dd").stop(false, true).slideUp();
//		else $(this).addClass("curr").parent().next("dd").stop(false, true).slideDown();
//	});
	$(".header_r dl").hover(function(){
		$(this).children("dd").slideDown().siblings("dt").addClass("curr");
	},function(){
		$(this).children("dd").stop(true,false).slideUp().siblings("dt").removeClass("curr");
		
	});
	/*//通知的显示
	$(".notice dt i").on("click", function() {
		$(".notice").toggleClass("curr").children("dd").stop(false, true).toggle(300);
	});
	$(".notice dd ").on("click", "ul li a", function() {
		$(this).parents("dd").toggle(300).parent().removeClass("curr");
	});*/

	//侧边栏菜单上下滑动
	$(".menu_cont").on("click", " dl dt:eq(0)", function() {
		if($(this).hasClass("curr")) 
		$(this).removeClass("curr");
		else {
			$(".windows").hide();
			$(".main_body").css("top","0");
			$(".menu_cont dl dt").removeClass('curr');
			$(".menu_cont dl dd").slideUp();
			$(this).addClass("curr");
			var $url = $(this).attr("href").substr(1);
			var loadType = $(this).attr("loading-type");
			loadingType($url, loadType);
		}
	});
	$(".menu_cont").on("click", " dl dt:gt(0)", function() {
		if($(this).hasClass("curr")) {
			$(this).removeClass("curr").children("b").removeClass("curr");
			$(this).next("dd").removeClass("curr").slideUp();
		} else {
			$(".menu_cont dl dt").removeClass("curr").children("b").removeClass("curr");
			$(this).addClass("curr").children("b").addClass("curr");
			$(this).next("dd").addClass("curr").slideDown().siblings("dd").slideUp();
		}
	});
	/*//菜单栏的伸缩
	$(".menu > em").click(function() {
		if($(this).hasClass("active")) {
			$(this).removeClass("active").attr("title", "点击收起").parent(".menu").removeClass("menu_hidden");
			$(".main").removeClass("main_max");
		} else {
			$(this).addClass("active").attr("title", "点击弹出").parent(".menu").addClass("menu_hidden");
			$(".main").addClass("main_max");
		}
	});*/
	
	$(".menu_cont").on("click","dl a",function(){
		$(".windows").show();
		$(".main_body").css("top","52px");
		windowSmall($(this));
	});
	$(".windows>ul").on("click", "li", function() {
		var currWindow = $(this).children("b").text();
		$(".menu_cont dl dd a").each(function() {
			if($(this).text() == currWindow) {
				windowSmall($(this));
				return false;
			}
		});
		//		$("#mainBody").attr("src", $(this).attr("curr-url"))
	});
	//点击关闭窗口
	$(".windows>ul").on("click", "li i", function(e) {
		e.stopPropagation();
		if($(".windows>ul li").length==1) {
			$(".menu_cont dl dd a").eq(0).trigger("click");
		}
		if($(this).parent("li").index() == $(this).parents("ul").children("li").length - 1) {
			$(this).parent("li").prev().trigger("click");
			$(this).parent().remove()
		} else {
			$(this).parent("li").next().trigger("click");
			$(this).parent().remove();
		}
		
	});
	$(".windows>ul").on("contextmenu", "li", function(e) {
		e.stopPropagation();
		$(this).trigger("click");
		$(".contextmenu").css({
			left: e.pageX,
			top: e.pageY,
			display: "block"
		})
		mouseRightClose($(this));
		return false;
	});
	$(".menu_cont dl dt").eq(0).trigger("click");
	$(".windows ul").children().eq(0).trigger("click");
	//滚动条美化
	$('.menu_cont dl').niceScroll({
			cursorcolor: "#ccc", //#CC0071 光标颜色 
			cursoropacitymax: 0.8, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
			touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
			cursorwidth: "5px", //像素光标的宽度 
			cursorborder: "0", //     游标边框css定义 
			cursorborderradius: "5px", //以像素为光标边界半径 
			autohidemode: true //是否隐藏滚动条 
		});
		$('body').niceScroll({
			cursorcolor: "#ccc", //#CC0071 光标颜色 
			cursoropacitymax: 0.8, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
			touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
			cursorwidth: "5px", //像素光标的宽度 
			cursorborder: "0", //     游标边框css定义 
			cursorborderradius: "5px", //以像素为光标边界半径 
			autohidemode: true //是否隐藏滚动条 
		});
		$(document).on("click",function(){
			if(!$(".contextmenu").is(":hidden")){
				$(".contextmenu").hide();
			}
		});
});

function windowSmall(obj){
	var flag = true;
		$(".menu_cont dl a").removeClass("curr");
		obj.addClass("curr");
		$(".menu_cont dl dt").removeClass("curr").children("b").removeClass("curr");
		$(".menu_cont dl dd").css("display", "none").removeClass("curr");
		obj.parent().css("display", "block").addClass("curr").prev().addClass("curr").children("b").addClass("curr");
		var $url = obj.attr("href").substr(1);
		var loadType = obj.attr("loading-type");
		loadingType($url, loadType);
//		$(".curr_local em").text(obj.parent().prev().children("dfn").text());
//		$(".curr_local dfn").text(obj.text());
		//判断小窗口是否重复
		var currText = obj.text();
		$(".windows>ul li").each(function(li) {
			if($(this).children("b").text() == currText) {
				$(this).addClass("curr").siblings().removeClass("curr"); //如果重复，则执行小窗口点击时间，并将flag置为false
				flag = false;
			}
		});
		if(flag) { //如果不重复，则新增小窗口
			if(obj.attr("data-first") == "true") {
				var oLi = "<li curr-url='" + $url + "'><b>" + obj.text() + "</b></li>";
			} else var oLi = "<li curr-url='" + $url + "'><b>" + obj.text() + "</b><i></i></li>";
			$(".windows>ul").append(oLi);
		}
}
function setDate(id) {
	var myDate = new Date();
	var week;
	var demo1 = document.getElementById(id);
	if(myDate.getDay() == 0) {
		week = "星期日"
	} else if(myDate.getDay() == 1) {
		week = "星期一"
	} else if(myDate.getDay() == 2) {
		week = "星期二"
	} else if(myDate.getDay() == 3) {
		week = "星期三"
	} else if(myDate.getDay() == 4) {
		week = "星期四"
	} else if(myDate.getDay() == 5) {
		week = "星期五"
	} else if(myDate.getDay() == 6) {
		week = "星期六"
	}
	var h=myDate.getHours();
	var m=myDate.getMinutes();
	var s=myDate.getSeconds();
	if(h<10) h='0'+h;
	else h=h;
	if(m<10) m='0'+m;
	else m=m;
	if(s<10) s='0'+s;
	else s=s;
	demo1.innerHTML = myDate.getFullYear() + '年' + (myDate.getMonth() + 1) + '月' + myDate.getDate() + '日' + '&nbsp;'+h+':'+m+':'+s+ '&nbsp;' +
		week;
}