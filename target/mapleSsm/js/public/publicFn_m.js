$(function() {
	clearText($("#clear"));
	tableAllSelect();
	//点击保存关闭弹出页面
	$(".del_dialog i").on("click", function() {
		$(".layout").hide();
		$(".del_dialog").hide();
	});
	$(".del_dialog dfn").on("click", function() {
		$(".layout").hide();
		$(".del_dialog").hide();
	});
	//点击删除弹出对话框
	$("a.del").on("click", function(e) {
		e.stopPropagation();
		$(".layout").show();
		$(".del_dialog").show()
	});
});
//清空
function clearText(obj) {
	obj.on("click", function() {
		$("input:text").val("");
		$("select").children().first().prop("selected", true);
		$("select").parent("dl").children("dd").children("a").first().trigger("click");
	});
};
//列表全选

function tableAllSelect() {
	$("table tr th:first-child").on("click", function() {
		if($(this).find('input:checkbox').prop("checked")) {
			$("table tbody tr td:first-child input:checkbox").prop("checked", true);
		} else $("table tbody tr td:first-child input:checkbox").prop("checked", false);
	});
	$(".table li b input").on("click", function() {
		if($(this).prop("checked")) {
			$(this).parents("li").siblings("li").children("em:first-child").children("input:checkbox").prop("checked", true);
		} else {
			$(this).parents("li").siblings("li").children("em:first-child").children("input:checkbox").prop("checked", false);
		}
	});
};
//删除对话框模拟confirm
//1.显示
function delDialogTree() {
	$(".tree b").on("click", function(e) {
		e.stopPropagation();
		$(".layout").show();
		delTar = $(this).parent();
		var delFlag = delTar.attr("del-flag");
		if($(this).parent("dt").length != 0) {
			if(delTar.next("dd").children("span").length == 0) {
				if(delFlag == 1) {
					$(".del_dialog").show().children("em").text("所选部门不可删除！");
					$(".del_dialog dfn").on("click", function() {
						$(".layout").hide();
						$(".del_dialog").hide();
					});
				} else {
					$(".del_dialog").show().children("em").text("确定删除所选部门！");
					$(".del_dialog dfn").on("click", function() {
						if($(this).attr("data-flag") == 1) {
							deleteNodeName(delTar.attr("id"));
							$(".layout").hide();
							$(".del_dialog").hide();
						} else {
							$(".layout").hide();
							$(".del_dialog").hide();
						}

					});
				}

			}
		} else {
			$(".del_dialog").show().children("em").text("请先删除子部门！");

		}
		$(".del_dialog").show()
	});
}

//操作完成后的提示
function optTip(Text) {
	$("#oTip").text(Text).css("display", "block");
	setTimeout(function() {
		$("#oTip").hide();
	}, 1500);
}
//弹出新增或编辑页面
function editUpdateP($url, id, Width, Height) {
	//	$(".posit_edit").html("");
	//	$(".layout").css('display', 'block');
	//	$.ajax({
	//		type: "get",
	//		url: $url,
	//		success: function(data) {
	//			$(".posit_edit").html(data).css('display', 'block').css({
	//				width: Width + "px",
	//				height: Height + "px",
	//				marginTop: -Height / 2 + "px",
	//				marginLeft: -Width / 2 + "px"
	//			});
	//			$(".posit_edit input:text").eq(0).focus();
	//			$(".dialog_tit i").on("click", function() {
	//				if($(".layout_sec").length != 0) {
	//					if($(".layout_sec").is(":hidden")) {
	//						$(".layout_sec").hide();
	//					} else {
	//						$(".layout").hide();
	//					}
	//				} else {
	//					
	//					$(".layout").hide();
	//				}
	//				$(".posit_edit").html("").hide();
	//			});
	//		},
	//		error: function() {
	//			alert("出错了")
	//		}
	//	});
	$.get($url, function(data) {
		layer.open({
			type: 1,
			title: '新增',
			shadeClose: false,
			shade: 0.3,
			area: [Width + 'px', Height + 'px'],
			content: data //注意，如果str是object，那么需要字符拼接。
		});
		var title=$(".layui-layer-content").find(".dialog_tit").text();
		$(".layui-layer-content").find(".dialog_tit").remove();
		$(".layui-layer-title").text(title);
	});

}

//placehoder兼容
var JPlaceHolder = {
	//检测
	_check: function() {
		return 'placeholder' in document.createElement('input');
	},
	//初始化
	init: function() {
		if(!this._check()) {
			this.fix();
		}
	},
	//修复 何问起
	fix: function() {
		jQuery(':input[placeholder]').each(function(index, element) {
			var self = $(this),
				txt = self.attr('placeholder');
			self.wrap($('<div class="w_input"></div>').css({
				zoom: '1',
				border: 'none',
				background: 'none',
				padding: 'none',
				margin: 'none'
			}));
			var pos = self.position(),
				h = self.outerHeight(true),
				paddingleft = self.css('padding-left');
			var holder = $('<em></em>').text(txt).appendTo(self.parent());
			self.focusin(function(e) {
				holder.hide();
			}).focusout(function(e) {
				if(!self.val()) {
					holder.show();
				}
			});
			holder.click(function(e) {
				holder.hide();
				self.focus();
			});
		});
	}

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

function closeDialog() {
	$(".layout").hide();
	$(".posit_edit").hide().html("");
}

//刷新页面
function refresh() {
	$(".slidebar_menu dl dd a").each(function() {
		if($(this).hasClass("curr")) {
			var mainUrl = $(this).attr("href").substr(1);
			$(this).addClass("curr").siblings("a").removeClass("curr");
			$.get(mainUrl, function(data) {
				$("#mainBody").html(data);
			});
		}
	});
}

