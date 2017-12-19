//多张图片上传
function PicturesUpLoad(obj, obj2, size) {
	filePic = obj.find("input:file");
	filePic.each(function(i) {
		var picUrl = [];
		var $this = $(this);
		var $hidden = $('<input type="hidden" id="picUrl' + i + '"/>').insertAfter($this);
		$this.change(function() {
			//			if($this.parent().siblings("b").length == 3) $this.parents("li").css("height", "136px");
			//			else if($this.parent().siblings("b").length < 3)$this.parents("li").css("height", "68px");
			//			else if($this.parent().siblings("b").length == 7) $this.parents("li").css("height", "204px");
			//			else if($this.parent().siblings("b").length < 7)$this.parents("li").css("height", "136px");
			//			else if($this.parent().siblings("b").length == 8) {
			//				alert("最多上传8张图片");
			//			}
			var files = !!this.files ? this.files : [];
			if(!files.length || !window.FileReader) return;
			if(/\.(jpg|jpeg|png|JPG|PNG)$/.test($this.val())) {
				var reader = new FileReader();
				reader.readAsDataURL(files[0]);
				if(0 < this.files[0].size < 300 * 1024 * 1024) {
					reader.onloadend = function() {
						$this.parent().siblings(obj2).prepend('<span><i><img src="' + this.result + '"/></i><b class="pic_del"></b></span>');
					}
					picUrl.push($this.val());
					$hidden.val(picUrl.join(","));
				} else {
					alert("上传图片太大，请重新上传!")
					//					$this.parent().siblings(".vail_tip").html("<i class='no'><b></b>上传图片太大，请重新上传!</i><strong></strong>").hide();
				}

			} else {
				alert("上传文件图片类型有误!")
				$this.parent().siblings(".vail_tip").html("<i class='no'><b></b>上传文件图片类型有误!</i><strong></strong>").show();
			}

		});
		$(obj2).on("click", ".pic_del", function() {
			$(this).parent().remove();
				picUrl.splice($(this).parent().index(), 1);
				$hidden.val(picUrl.join(","));
		});
	});

}
//单张图片上传
function onePicturesUpLoad(obj, obj2, size) {
	//obj2 预览图片存放显示容器
	filePic = obj.find("input:file");
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
						$this.parent().siblings(obj2).html("<span><i><img src='" + this.result + "'/></i></span>");
					}
				} else {
					alert("上传图片太大，请重新上传!")
					//					$this.parent().siblings(".vail_tip").html("<i class='no'><b></b>上传图片太大，请重新上传!</i><strong></strong>").hide();
				}

			} else {
				alert("上传文件图片类型有误!")
				//				$this.parent().siblings(".vail_tip").html("<i class='no'><b></b>上传文件图片类型有误!</i><strong></strong>").show();
				//				$("#confirm").addClass("ban");
			}
		});
	});
}
//一个文件上传
function fileName() {
	Files = $(".fj").find("input:file");
	Files.each(function() {
		var $this = $(this);
		$this.change(function() {
			var files = !!this.files ? this.files : [];
			if(!files.length || !window.FileReader) return;
			var reader = new FileReader();
			reader.readAsDataURL(files[0]);
			if(0 < this.files[0].size < 200 * 1024 * 1024) {
				reader.onloadend = function() {
					var fileText = $this.val().substring($this.val().lastIndexOf("\\") + 1);
					$this.parent().siblings("p").text(fileText);
					$this.parent().siblings(".vail_tip").html("").hide();
					flag = true;
				}
			}
			if(this.files[0].size > 200 * 1024 * 1024) {
				$this.parent().siblings(".vail_tip").html("<i class='no'><b></b>上传文件不超过200Mb!</i><strong><>").show();
				flag = false;
			}

		});
	});
}