
pieChartOne("pieChartOne");

//饼图绘制
function pieChartOne(id) {
	var pieChart = echarts.init(document.getElementById(id));
	option = {
    title : {
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'right',
        data: ['西北政法大学','陕西师范大学','西安建筑学院']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:500, name:'西北政法大学'},
                {value:310, name:'陕西师范大学'},
                {value:234, name:'西安建筑学院'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]};
	pieChart.setOption(option);
};



