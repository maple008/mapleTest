memberChart("memberChart");
memberMonth("memberMonth");
memberQuarter("memberQuarter");
memberYears("memberYears");
//7天收入变化
function memberChart(id) {
	var lineChart = echarts.init(document.getElementById(id));
	var option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {},
		toolbox: {},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			top:'5',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: ['2017/5/1', '2017/5/2', '2017/5/3', '2017/5/4', '2017/5/5', '2017/5/6', '2017/5/7']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: '搜索引擎',
			type: 'line',
			stack: '总量',
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			},
			areaStyle: {
				normal: {
					color: ['#d9f2fa']
				}
			},
			itemStyle: {
				normal: {　　　
					color: ['#33bce7']
				}
			},
			data: [100, 120, 132, 101, 134, 140, 160]
		}]
	};
	lineChart.setOption(option);
}
//月收入变化
function memberMonth(id) {
	var lineChart = echarts.init(document.getElementById(id));
	var option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {},
		toolbox: {},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			top:'5',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: '搜索引擎',
			type: 'line',
			stack: '总量',
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			},
			areaStyle: {
				normal: {
					color: ['#d9f2fa']
				}
			},
			itemStyle: {
				normal: {　　　
					color: ['#33bce7']
				}
			},
			data: [100, 120, 132, 101, 134, 140, 160, 200, 240, 380, 120, 300]
		}]
	};
	lineChart.setOption(option);
}
//季度收入变化
function memberQuarter(id) {
	var lineChart = echarts.init(document.getElementById(id));
	var option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {},
		toolbox: {},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			top:'5',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: ['第1季度', '第2季度', '第3季度', '第4季度']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: '搜索引擎',
			type: 'line',
			stack: '总量',
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			},
			areaStyle: {
				normal: {
					color: ['#d9f2fa']
				}
			},
			itemStyle: {
				normal: {　　　
					color: ['#33bce7']
				}
			},
			data: [100, 120, 132, 101]
		}]
	};
	lineChart.setOption(option);
}
//年度收入变化
function memberYears(id) {
	var lineChart = echarts.init(document.getElementById(id));
	var option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {},
		toolbox: {},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			top:'5',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: ['2014年', '2015年', '2016年', '2017年']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: '搜索引擎',
			type: 'line',
			stack: '总量',
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			},
			areaStyle: {
				normal: {
					color: ['#d9f2fa']
				}
			},
			itemStyle: {
				normal: {　　　
					color: ['#33bce7']
				}
			},
			data: [240, 380, 120, 300]
		}]
	};
	lineChart.setOption(option);
}