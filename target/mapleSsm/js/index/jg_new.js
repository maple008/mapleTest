$(function() {

	//点击下一步
	$(".nextPage").on("click", function() {
		$(this).parent().parent().hide();
		var $page = $(this).attr("data-page");
		$("." + $page + "").show();
		
		$(".entry_title >ul >li span").each(function() {
			if($(this).hasClass("curr")) {
				$(this).removeClass("curr").parent().next().children("span").addClass("curr");
				return false;
			}
		});
	});
	$(".prevPage").on("click", function() {
		$(this).parent().parent().hide();
		var $page = $(this).attr("data-page");
		$("." + $page + "").show();
		
		$(".entry_title >ul >li span").each(function() {
			if($(this).hasClass("curr")) {
				$(this).removeClass("curr").parent().prev().children("span").addClass("curr");
				return false;
			}
		});
	});
	//其他服务
//	$(".nextPageqt").on("click", function() {
//		$(this).parent().parent().parent().parent().hide();
//		var $page = $(this).attr("data-page");
//		$("." + $page + "").show();
//		
//		$(".entry_title >ul >li span").each(function() {
//			if($(this).hasClass("curr")) {
//				$(this).removeClass("curr").parent().next().children("span").addClass("curr");
//				return false;
//			}
//		});
//	});
	$(".nextPagesp").on("click", function() {
		$(this).parent().parent().parent().parent().hide();
		var $page = $(this).attr("data-page");
		$("." + $page + "").show();
		
		$(".entry_title >ul >li span").each(function() {
			if($(this).hasClass("curr")) {
				$(this).removeClass("curr").parent().next().children("span").addClass("curr");
				return false;
			}
		});
	});
	$(".nextPage2").on("click", function() {
		$(this).parent().parent().hide();
		var $page = $(this).attr("data-page");
		$("." + $page + "").show();
		
		$(".entry_title >ul >li span").each(function() {
			if($(this).hasClass("curr")) {
				$(this).removeClass("curr").parent().next().children("span").addClass("curr");
				return false;
			}
		});
	});
});
