var code;
var checkedID = '';
var checkedName = '';
var v = [];
$(function() {
	$(function() {
		laypage({
			cont: 'pages',
			pages: 18, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
			groups: 3,
			curr: function() { //通过url获取当前页，也可以同上（pages）方式获取
				var page = location.search.match(/page=(\d+)/);
				return page ? page[1] : 1;
			}(),
			skip: true, //是否开启跳页
			last: 18,
			jump: function(e, first) { //触发分页后的回调
				if(!first) { //一定要加此判断，否则初始时会无限刷新
					location.href = '?page=' + e.curr;
				}
				$("#totals").text("共12条")
			}
		});
		$(".add_btn").on("click", function() {
			layer.open({
				type: 1,
				title: "添加",
				area: ['540px', '200px'],
				shadeClose: true,
				content: $('.layout_cont')
			});

		});
		$(".edit_icon").on("click", function() {
			layer.open({
				type: 1,
				title: "编辑",
				area: ['540px', '200px'],
				shadeClose: true,
				content: $('.layout_cont')
			});
			$("#echoData").val("随意勾选 1-2-2,随意勾选 2-2-1，随意勾选 1-1-1");
			var echoDataHidden = $("#echoDataHidden").val("111,121,221");
			echoDataHidden = "111,121,221".split(",");
			for(var i = 0; i < zNodes.length; i++) {
				for(var j = 0; j < echoDataHidden.length; j++) {
					if(zNodes[i].id == echoDataHidden[j]) {
						zNodes[i].checked = "true";
					}
				}
			}
			$(document).ready(function() {
				$.fn.zTree.init($("#treeDemo"), setting, zNodes);
				setCheck();
				$("#py").bind("change", setCheck);
				$("#sy").bind("change", setCheck);
				$("#pn").bind("change", setCheck);
				$("#sn").bind("change", setCheck);
				var zTreeObj = $.fn.zTree.getZTreeObj("treeDemo")
				var zTree = zTreeObj.getCheckedNodes(false);
				var pid = "${personCode}"; /**此处数据前后必须拼接;*/
				for(var i = 0; i < zTree.length; i++) {
					if(pid.indexOf(";" + zTree[i].id + ";") != -1) {
						zTreeObj.expandNode(zTree[i], true); //展开选中的  
						zTreeObj.checkNode(zTree[i], true);
					}
				}
				onCheck();
			});
		});
		$("#signupForm").Validform({
			tiptype: 4,
			btnSubmit: "#submit"
		});
		$("#echoData").on("click", function() {
			layer.open({
				type: 1,
				title: "人员选择",
				area: ['780px', '600px'],
				shadeClose: true,
				content: $('.echo_data_list')
			});
		});
		//关闭弹层
		$("#cancleBtn").on("click", function() {
			layer.close(layer.index);
		});
		$("#confirmBtn").on("click", function() {
			$("#echoDataHidden").val(checkedID);
			$("#echoData").val(checkedName).blur();
			layer.close(layer.index);
		});

	});
	//人员选择的参数配置=========================================================================
	var setting = {
		view: {
			showLine: false,
			showIcon: false
		},
		check: {
			enable: true
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			onCheck: onCheck
		}
	};

	var zNodes = [{
			id: 1,
			pId: 0,
			name: "随意勾选 1",
			open: true
		},
		{
			id: 11,
			pId: 1,
			name: "随意勾选 1-1",
			open: true
		},
		{
			id: 111,
			pId: 11,
			name: "随意勾选 1-1-1"
		},
		{
			id: 112,
			pId: 11,
			name: "随意勾选 1-1-2"
		},
		{
			id: 12,
			pId: 1,
			name: "随意勾选 1-2",
			open: true
		},
		{
			id: 121,
			pId: 12,
			name: "随意勾选 1-2-1"
		},
		{
			id: 122,
			pId: 12,
			name: "随意勾选 1-2-2"
		},
		{
			id: 2,
			pId: 0,
			name: "随意勾选 2",
			checked: true,
			open: true
		},
		{
			id: 21,
			pId: 2,
			name: "随意勾选 2-1"
		},
		{
			id: 22,
			pId: 2,
			name: "随意勾选 2-2",
			open: true
		},
		{
			id: 221,
			pId: 22,
			name: "随意勾选 2-2-1",
			checked: true
		},
		{
			id: 222,
			pId: 22,
			name: "随意勾选 2-2-2"
		},
		{
			id: 23,
			pId: 2,
			name: "随意勾选 2-3"
		}
	];

	$(document).ready(function() {
		$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		setCheck();
		$("#py").bind("change", setCheck);
		$("#sy").bind("change", setCheck);
		$("#pn").bind("change", setCheck);
		$("#sn").bind("change", setCheck);
		var zTreeObj = $.fn.zTree.getZTreeObj("treeDemo")
		var zTree = zTreeObj.getCheckedNodes(false);
		var pid = "${personCode}"; /**此处数据前后必须拼接;*/
		for(var i = 0; i < zTree.length; i++) {
			if(pid.indexOf(";" + zTree[i].id + ";") != -1) {
				zTreeObj.expandNode(zTree[i], true); //展开选中的  
				zTreeObj.checkNode(zTree[i], true);
			}
		}
		onCheck();
	});
});

function setCheck() {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
		py = $("#py").attr("checked") ? "p" : "",
		sy = $("#sy").attr("checked") ? "s" : "",
		pn = $("#pn").attr("checked") ? "p" : "",
		sn = $("#sn").attr("checked") ? "s" : "",
		type = {
			"Y": py + sy,
			"N": pn + sn
		};
	zTree.setting.check.chkboxType = type;
	showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
}

function showCode(str) {
	if(!code) code = $("#code");
	code.empty();
	code.append("<li>" + str + "</li>");
}

function onCheck(e, treeId, treeNode) { //这是将所有选中节点的名字 用,分割做拼接 用于持久化到数据库  
	var zTree = $.fn.zTree.getZTreeObj("treeDemo").getNodesByFilter(filter);
	var choose = "";
	for(var i = 0; i < zTree.length; i++) {
		if(zTree[i].name != null)
			choose += (i == (zTree.length - 1)) ? zTree[i].name : zTree[i].name + ",";
	}
	checkedName = choose;
	treeIds();
}

function filter(node) {
	return(node.checked == true);
}

function treeIds() { //这是将选中的节点的id用;分割拼接起来,用于持久化到数据库  
	var zTreeO = $.fn.zTree.getZTreeObj("treeDemo").getNodesByFilter(filter);
	var idListStr = "";
	for(var i = 0; i < zTreeO.length; i++) {
		if(zTreeO[i].id != null) {
			idListStr += (i == (zTreeO.length - 1)) ? zTreeO[i].id : zTreeO[i].id + ";";
		}
	};
	checkedID = idListStr;
};