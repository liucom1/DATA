
//获取月平均薪资
var url = "http://123.56.178.162:8088/salary";
axios.get(url + "/salaryAvgMonth", {
    params: {
        post: "前端工程师"
    }
}).then((res) => {
    console.log(res.data.data.salary);
    var salary = document.querySelector("#salary1");
    salary.innerHTML = res.data.data.salary;
});
//获取年平均薪资
axios.get(url + "/salaryYear", {
    params: {
        major: "前端工程师"
    }
}).then((res) => {
    console.log(res.data.data.salary);
    var salary = document.querySelector("#salary2");
    salary.innerHTML = res.data.data.salary;
});
//工作经验平均年薪
axios.get(url + "/salaryExper", {
    params: {
        major: "前端工程师"
    }
}).then((res) => {
    var roles = document.querySelectorAll(".role");
    var wage = document.querySelectorAll(".wage2");
    res.data.data.forEach((obj, index) => {
        roles[index].innerHTML = obj.experience;
        wage[index].innerHTML = obj.salary + "K";
    });
});
//获取地区竞争力
axios.get(url + "/salaryRegionCom", {
    params: {
        major: "前端工程师"
    }
}).then((res) => {
    var list = document.querySelector(".list");
    var str = "";
    res.data.data.forEach((obj, index) => {
        str += `<div class="item">
        <div class="order">
            <span>${index + 1}</span>
        </div>
        <div class="city">${obj.name}</div>
        <div class="wage3">${obj.wage}k</div>
    </div>`;
    });
    list.innerHTML = str;
    var oldValue;
    setInterval(() => {
        oldValue = list.scrollTop;
        list.scrollTop++;
        if (list.scrollTop === oldValue) {
            list.scrollTop = 0;
        }
    }, 100)
})
//历年工资变化趋势
axios.get(url + "/salaryChange", {
    params: {
        major: "前端工程师"
    }
}).then(res => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".charte1"));
    var xAxisData = res.data.data.map(v => v.year);
    var seriesData = res.data.data.map(v => v.salary);
    // 指定图表的配置项和数据
    var option = {
        xAxis: {
            data: xAxisData,
            axisLabel: {
                color: "#17fbd8"
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        //坐标系位置
        grid: {
            bottom: 30,
            left: "15%",
            top: 10,
        },
        yAxis: {
            axisLabel: {
                color: "#17fbd8"
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                type: 'bar',
                data: seriesData,
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#0e40ba' // 0% 处的颜色
                        }, {
                            offset: 0.47, color: '#285bd9' // 47% 处的颜色
                        },
                        {
                            offset: 1, color: '#4275f7' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    },
                    borderRadius: 15
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
})
//薪酬区间
axios.get(url + "/salaryRange", {
    params: {
        major: "前端工程师"
    }
}).then(res => {
    var myChart = echarts.init(document.querySelector(".charte2"));
    var seriesData = res.data.data.map(v => ({
        name: v.name,
        value: v.percentage
    }));
    var option = {
        series: [
            {
                type: 'pie',
                radius: [20, 60],
                center: ['50%', '50%'],
                roseType: 'area',
                data: seriesData,
                label: {
                    width: 50,
                    color: "#fff"
                }
            }
        ]
    };
    myChart.setOption(option);
})
//地图
axios.get(url + "/salaryArea", {
    params: {
        major: "前端工程师"
    }
}).then(res => {
    console.log(res);
    var myChart = echarts.init(document.querySelector(".charte3"));
    var seriesData = res.data.data.map(v => ({
        name: v.province,
        value: [v.longitude, v.latitude, v.num]
    }));
    var option = {
        geo: {
            map: "china",
            layoutCenter: ["50%", "50%"],
            layoutSize: "120%",
            itemStyle: {
                normal: {
                    borderColor: "#03e6ec",
                    borderWidth: 1,
                    areaColor: "#182754",
                    shadowColor: "#144169",
                    showdowBlue: 10
                },
                emphasis: {
                    areaColor: "#173e66",
                }
            }
        },
        series: [{
            type: "effectScatter",
            coordinateSystem: "geo",
            data: seriesData,
            Symbol: "circle",
            itemStyle: {
                color: "#4affd2",
                showdowBlue: 100,
                shadowColor: "#873b4b"
            }
        }],
        tooltip: {
            tigger: function (point) {
                return [point[0] + 30, potin[1] - 30]
            },
            formatter: function (params) {
                return params.data.name + "<br>招聘量" + params.data.value[2]
            },
            backgroundColor: "#475d73",
            borderColor: "#09b6c6",
            borderWidth: 1,
            textStyle: {
                color: "#ffffff"
            }
        }
    }


    myChart.setOption(option);
})
//趋势
var p1 = axios.get(url + "/salaryPosition", {
    params: {
        major: "前端工程师",
        year: 2020
    }
})
var p2 = axios.get(url + "/salaryPosition", {
    params: {
        major: "前端工程师",
        year: 2021
    }
});
Promise.all([p1, p2]).then(res => {
    console.log(res);
    var myChart = echarts.init(document.querySelector(".charte4"));
    var seriesData1 = res[0].data.data.map(v => v.num);
    var seriesData2 = res[1].data.data.map(v => v.num);
    var option = {
        legend: {
            data: ["2020", "2021"],
            textStyle: {
                color: "fff"
            }
        },
        xAxis: {
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            axisLabel: {
                color: "#17fbd8"
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        //坐标系位置
        grid: {
            bottom: 30,
            left: "10%",
            top: 10,
        },
        yAxis: {
            axisLabel: {
                color: "#17fbd8"
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: "2020",
                type: "line",
                stack: "总量",
                data: seriesData1,
                smooth: true,
                color: "#f6b37f",
                symbol: "none"
            },
            {
                name: "2021",
                type: "line",
                stack: "总量",
                data: seriesData1,
                smooth: true,
                color: "#15e5c8",
                symbol: "none"
            }
        ]
    }
    myChart.setOption(option);
})