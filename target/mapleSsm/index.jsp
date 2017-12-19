<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<body>
<h2>Hello World!11122</h2>
</body>

<form action="" method="post" name="thform" id="theform" >
<input type="text" id="name" name="name" value="">
<input type="text" id="password" name="password" value="">
<a id="submit">提交</a>
</form>
<script type="text/javascript" src="js/public/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="js/public/jquery.nicescroll.js" ></script>
		<script type="text/javascript" src="js/plug-in/laypage/laypage.js"></script>
		<script type="text/javascript" src="js/plug-in/layer/layer.js"></script>
		<script type="text/javascript" src="js/public/fn.js"></script>
		<script type="text/javascript" src="js/index/index.js"></script>
		<script>
		$('#submit').click(function(){
			$.ajax({
				   url: 'user/update_User' ,
				   type: 'POST',
				   data: {userName:"111",id:"222"},
				   async: false,
				   dataType:"json",
				   success: function (result) {
					   console.log(result);
					   //each循环遍历
					   $.each(result,function(name,value){
						   alert(name);
						   alert(value);
						   alert(value.name);
						   console.log(value);
					   });
// for循环遍历
for(i=0;result.length;i++){
	alert(result[i].name);
}
				   },
				   error:function(e){
					   layer.alert('提交失败', {
					    	skin: 'layui-layer-lan',
					    	closeBtn: 0,
					    	anim: 3 //动画类型
					  	});
	                }
				});
		});
		</script>
</html>
