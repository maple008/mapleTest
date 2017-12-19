//鼠标右键事件
function mouseRightClose(obj) {
	var dataCloseType;
	$(".contextmenu ul li").on("click", function() {
		dataCloseType = $(this).attr("data-close")
		if(dataCloseType == "0") {
			$(".contextmenu").hide();
			obj.children("i").trigger("click");
		} else if(dataCloseType == "1") {
			$(".contextmenu").hide();
			obj.siblings("li").children("i").trigger("click");
		} else if(dataCloseType == "2") {
			$(".contextmenu").hide();
			obj.prevAll().children("i").trigger("click");
		} else if(dataCloseType == "3") {
			$(".contextmenu").hide();
			obj.nextAll().children("i").trigger("click");
		} else if(dataCloseType == "4") {
			$(".contextmenu").hide();
			$(".windows>ul li i").trigger("click");
		}
	});
}
//清空
function clearText(obj) {
	obj.on("click", function() {
		$("input:text").val("");
		$("select").children().first().prop("selected", true);
		$("select").parent("dl").children("dd").children("a").first().trigger("click");
	});
};
function checkboxBtn(obj) {
	obj.each(function() {
		var $this = $(this);
		var oEm = $(this).addClass("hidden").wrap("<b></b>").parent();
		if($this.prop("checked")) {
			oEm.addClass("curr");
		};
		oEm.on("click", function() {
			if($(this).children("input:checkbox").prop("checked")) {
				$(this).removeClass("curr").children("input:checkbox").prop("checked", false);
			} else {
				$(this).addClass("curr").children("input:checkbox").prop("checked", true);
			};
		});
	});
}
//页面主题加载方式
function loadingType(URL, loadingType) {
	if(loadingType == "iframe") {
		$(".main_body").html('<iframe src="' + URL + '" id="mainBody" width="100%" height="100%" frameborder="no"></iframe>');
	} else if(loadingType == "ajax") {
		$.ajax({
			type: "get",
			url: URL,
			dataType: "html",
			success: function(data) {
				$(".main_body").html(data);
				$("body").on("click", function() {
					$(".contextmenu").hide();
				});
			}
		});
	}
}

function checkboxSelect(obj, selector) {
	var checked = false;
	obj.on("click", function() {
		if($(this).prop("checked")) selector.find("input:checkbox").prop("checked", true);
		else selector.find("input:checkbox").prop("checked", false);
	});
	selector.find("input:checkbox").on("click", function() {
		selector.find("input:checkbox").each(function() {
			if($(this).prop("checked")) checked = true;
			else {
				checked = false;
				return false;
			}
		});
		if(checked) obj.prop("checked", true);
		else obj.prop("checked", false);
	});
}

//禁止文本框记录用户输入过的数据
function Autocomplete() {
	$("body").find("input").attr("autocomplete", "off");
}
selectForm();
function selectForm(){
	$("body").find("select").each(function(){
		var $this=$(this);
		$this.siblings("em").on("click",function(){
			$this.click();
		});
	});
}
