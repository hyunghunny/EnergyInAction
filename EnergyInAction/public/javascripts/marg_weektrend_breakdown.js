var today = new Date();
var dayTime = today.getTime();

var start_day = new Date(today);
start_day.setDate(today.getDate() - 30);

var start_year  = start_day.getFullYear();
var start_month = start_day.getMonth()+1;
var start_date  = start_day.getDate();

var from_date = start_day.setHours(0,0,0,0);


$(function () {
    //document.getElementById("date").innerHTML = (today.getMonth() + 1) + '월 ' + today.getDate() + '일 사용량';
    console.log(start_day);
    console.log(from_date);
    console.log(start_year);
    console.log(start_month);
    console.log(start_date);

    data_hvac = [5, 3, 4, 7, 2, 3, 4];
    data_com  = [3, 4, 4, 2, 5, 6, 3];
    data_light = [2, 5, 6, 2, 1, 3, 2];
    data_etc = [3, 0.5, 4, 4, 3, 2, 1];

    data_total = [13, 12.5, 18, 15, 11, 14, 10];


    //showChart();
    $('#container').highcharts({
            chart: {
                type: 'column'
            },

            title: {
                text: '지난 일주일 전력 사용 변화'
            },

            xAxis: {
                categories: ['7/20(월)', '7/21(화)', '7/22(수)', '7/23(목)', '7/24(금)', '어제', '오늘 (14시 기준)']
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: '전력 사용량 (kW/h)'
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },

            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },

            series: [{
                name: '냉난방',
                data: data_hvac,
                stack: 'stack'
            }, {
                name: '컴퓨터',
                data: data_com,
                stack: 'stack'
            }, {
                name: '전등',
                data: data_light,
                stack: 'stack'
            }, {
                name: '기타',
                data: data_etc,
                stack: 'stack'
            }, {
                type: 'spline',
                name: '전체',
                data: data_total,
                dataLabels: {
                    enabled: true,
                    format: '{y}'
                },
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[0],
                    fillColor: 'white'
                }
            }]
        });
});


function invokeOpenAPI(url, scb) {
    $.ajax({
        url : url,
        type : "get",
        dataType : "json",
        success : function (data) {

            console.log('retrieve success:' + data);
            scb(data)

        },

        error : function (request) {
            console.log("failed to retrieve:" + request);


        }
    });
}
