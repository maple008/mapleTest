$(function() {
	$("#cancel").on("click", function() {
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		parent.location.reload(); //刷新父页面
		parent.layer.close(index); //再执行关闭  
	});
	//	<!--字体超出一定宽度加omit类名,并设置其title属性为原显示内容-->
	$(".omit").each(function() {
		$(this).attr("title", $(this).text())
	});
	$("body").find("input").attr("autocomplete", "off");
	//点击图片放大
	$(".pics_zoom").on("click", function() {
		var img = $(this).children("img");
		var realWidth; //真实的宽度
		var realHeight; //真实的高度 //这里做下说明，$("<img/>")这里是创建一个临时的img标签，类似js创建一个new Image()对象！ 
		var _w = parseInt($(window).width());
		var bigSize;
		var layoutConts;
		var $IMGuRL = $(this).children("img").attr("src");
		$(this).children("b").html('<img src="' + $IMGuRL + '"/>').css("display", "block").css({
			marginLeft: -($(this).children("b").children("img").width() + 20) / 2 + "px",
			top: -($(this).children("b").children("img").height() + 30) + "px"
		});
		$("<img/>").attr("src", $(img).attr("src")).load(function() {
			realWidth = this.width;
			realHeight = this.height;
			bigSize = clacImgZoomParam($(window).width() * 0.9, ($(window).height() * 0.9), realWidth, realHeight);
			var w = Math.ceil(bigSize.width)
			var h = Math.ceil(bigSize.height)
			var layoutConts = '<i id="bigView" style="display:block;overflow:auto;width:' + w + 'px;height:' + h + 'px;"><img src="' + img.attr("src") + '" style="width:100%"/></i>';
			layer.open({
				type: 1,
				title: false,
				anim: 3,
				scrollbar: false,
				shadeClose: true, //开启遮罩关闭
				area: [w + 'px', h + 'px'],
				content: layoutConts
			});
		});
	});
	pictureUpload($(".per_photo"), 1024000000);
	pictureUpload($(".pictures"), 1024000000);
	$(".lists").niceScroll({
		cursorcolor: "#ccc", //#CC0071 光标颜色 
		cursoropacitymax: 0.8, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
		touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
		cursorwidth: "5px", //像素光标的宽度 
		cursorborder: "0", //     游标边框css定义 
		cursorborderradius: "5px", //以像素为光标边界半径 
		autohidemode: true //是否隐藏滚动条 
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
});
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

function pictureUpload(obj, size) {
	var filePic = obj.find("input:file");
	filePic.each(function() {
		var $this = $(this);
		$this.change(function() {
			var files = !!this.files ? this.files : [];
			if(!files.length || !window.FileReader) return;
			if(/\.(jpg|jpeg|png|JPG|PNG)$/.test($this.val())) {
				var reader = new FileReader();
				reader.readAsDataURL(files[0]);
				if(0 < this.files[0].size < size) {
					reader.onloadend = function() {
						$this.parent().siblings("i").children("img").attr("src", this.result);
						$this.parent().siblings(".info").hide().removeClass("Validform_wrong");
					}
				} else {
					$this.parent().siblings(".info").css({
						left: "120px",
						top: "44px"
					}).show().children(".Validform_checktip").text("上传图片太大，请重新上传!").addClass("Validform_wrong");
					return false;
				}

			} else {
				$this.parent().siblings(".info").css({
					left: "120px",
					top: "44px"
				}).show().children(".Validform_checktip").text("上传文件类型有误，请重新上传!").addClass("Validform_wrong");
				return false;
			}
		});
	});
}
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