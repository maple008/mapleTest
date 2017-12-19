<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>

    <link rel="stylesheet" href="<%=basePath%>css/global.css"/>
    <link rel="stylesheet" type="text/css" href="<%=basePath%>css/home.css"/>
    <script src="<%=basePath%>js/public/jquery-1.10.2.min.js"></script>
</head>
<body>
<div class="login">
    <div class="loginSum">
        <div class="loginLeft">
            <p><img src="images/logoCar.png"/></p>
            <h2><%=basePath%>淼燊管理系统</h2>
            <em>深圳淼燊融资租赁有限公司（以下简称淼燊金融）创立于2008年，形成能源矿产、商业地产、生态旅游、汽车金融及产业互联网运营五大核心产业。</em>
            <em>总部坐落于深圳前海新区，注册资金3000万美金，旗下业务板块有煤矿、铁矿、石油矿井机械、交易所、酒店、娱乐城、商业地产、汽车综合服务、p2p牌照（已审核通过）、等数十家全资子公司及控股公司。</em>
        </div>
        <div class="loginRight">
            <div class="R_login">
                <h1>2018</h1>
                <form name="theform" id="theform" method="post" action="/login">
                    <ul>
                        <li>
                            <input type="text" id="userName" name="userName" placeholder="用户名" style="color:#FFFAF0;"/>
                        </li>
                        <li class="tinput">
                            <input type="password" id="password" name="password" placeholder="密码"
                                   style="color:#FFFAF0;"/>
                        </li>
                        <li>
                            <a id="login">登录</a>
                        </li>
                    </ul>
            </div>
            </form>
        </div>
    </div>
</div>
</body>
<script type="text/javascript" src="<%=basePath%>js/plug-in/layer/layer.js"></script>
<script>
    $(function () {
        $('#login').click(function () {
            $.post("/login",
                {
                    userName: $('#userName').val(),
                    password: $('#password').val()
                },
                function (data, status) {
                    alert("数据: \n" + data + "\n状态: " + status);
                });
        });

    })
</script>
</html>
