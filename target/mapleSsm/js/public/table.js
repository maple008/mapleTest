$(function(){
	checkboxSelect($("#allSelected"), $(".selected_l"));
	$("table tbody tr:even").addClass("even");
	$("table tbody tr:odd").addClass("odd");
	$(".wrap_table").css("min-width",$("body").width()*0.96);
//	<!--字体超出一定宽度加omit类名,并设置其title属性为原显示内容-->
				$(".omit").each(function(){
					$(this).attr("title",$(this).text())
				});
	$("body").niceScroll({
			cursorcolor: "#ccc", //#CC0071 光标颜色 
			cursoropacitymax: 0.8, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
			touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
			cursorwidth: "5px", //像素光标的宽度 
			cursorborder: "0", //     游标边框css定义 
			cursorborderradius: "5px", //以像素为光标边界半径 
			autohidemode: true //是否隐藏滚动条 
		});
		JPlaceHolder.init();
		$(".food_nav ul li a").on("click", function() {
					$(".food_nav ul li").children("em").remove();
					$(this).parent().append("<em></em>");
					var $url = $(this).attr("href").substr(1);
					$("#ordersList").attr("src", $url);
				});
				$(document).on("click",function(){
			if(!$(".contextmenu",parent.window.document).is(":hidden")){
				$(".contextmenu",parent.window.document).hide();
			}
		});
		
});
$(window).resize(function(){
	$(".wrap_table").css("min-width",$("body").width()*0.96);
});
var getCurrAbsPath = function() {
	var scripts = document.scripts;
	var isLt8 = ('' + document.querySelector).indexOf('[native code]') === -1;
	for(var i = scripts.length - 1, script; script = scripts[i--];) {
		if(script.readyState === 'interative') {
			return isLt8 ? script.getAttribute('src', 4) : script.src;
		}
	}
};
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
			self.wrap($('<div class="w_input"></div>').css({ zoom: '1', border: 'none', background: 'none', padding: 'none', margin: 'none' }));
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
document.onkeydown = function(event) {
	var target, code, tag;
	if(!event) {
		event = window.event; //针对ie浏览器  
		target = event.srcElement;
		code = event.keyCode;
		if(code == 13) {
			tag = target.tagName;
			if(tag == "TEXTAREA") {
				return true;
			} else {
				return false;
			}
		}
	} else {
		target = event.target; //针对遵循w3c标准的浏览器，如Firefox  
		code = event.keyCode;
		if(code == 13) {
			tag = target.tagName;
			if(tag == "INPUT") {
				return false;
			} else {
				return true;
			}
		}
	}
};