var dayLabel = new Array('일', '월', '화', '수', '목', '금', '토');

var baseDay     = new Date('2015-07-01');
// var baseDay     = new Date();
// baseDay.setHours(0,0,0,0); // today 날짜만 깔끔히 잡도록 시간 초기화

var lastWeekDay = new Date(baseDay-(3600000*24*7)) // 7일 전 날짜

// console.log(baseDay);
// console.log(lastWeekDay);

var baseTime     = baseDay.getTime() + 3600000*9; // for time shift
var lastWeekTime = lastWeekDay.getTime() + 3600000*9; // for time shift;

// console.log(baseTime);
// console.log(lastWeekTime);

$(function () {
    document.getElementById("date").innerHTML = 'MARG ' +
                                                (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ') 사용량';

    baseDay_query  = '/api/labs/marg/energy/hours.json?base_time=' + baseTime;
    lastWeek_query = '/api/labs/marg/energy/hours.json?base_time=' + lastWeekTime;

    // console.log(baseDay_query);
    // console.log(lastWeek_query);

    var xAxis_categories = new Array();
    var lastWeek_data = new Array();
    var today_data = new Array();

    invokeOpenAPI(lastWeek_query, function (lastWeek) {
      console.log(lastWeek);
      for(var index = 0; index < lastWeek.length; index++){
        lastWeek_data.push(Number(lastWeek[index].sum.toFixed(1)));
        xAxis_categories.push(lastWeek[index].dateFrom.substring(11, 13) + '시');
      }
      // console.log(lastWeek[0].sum);
      // xAxis_categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      // lastWeek_data = [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6];
      // Today_data     = [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8];
      // console.log(lastWeek_data);

        invokeOpenAPI(baseDay_query, function (thisWeek) {
          console.log(thisWeek);
          for(var index = 0; index < thisWeek.length; index++){
            today_data.push(Number(thisWeek[index].sum.toFixed(1)));
          }
          // xAxis_categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          // lastWeek_data = [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6];
          // Today_data     = [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8];
          // console.log(lastWeek_data);

          console.log('lastWeek', lastWeek_data);
          console.log('thisWeek', today_data);
          //showChart();

          $('#container').highcharts({
                chart: {
                    type: 'line'
                },
                title: {
                    text: '하루 중 전력 사용량 변화 (' + lastWeek[0].location + '호)'
                },
                subtitle: {
                    text: 'SNU'
                },
                xAxis: {
                    categories: xAxis_categories
                },
                yAxis: {
                    title: {
                        text: '전력 사용량 (kW/h)'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: '지난주: ' + (lastWeekDay.getMonth() + 1) + '월 ' +  lastWeekDay.getDate() + '일(' + dayLabel[lastWeekDay.getDay()] + ')',
                    data: lastWeek_data,
                    color: '#d3d3d3'
                }, {
                    name: '오늘: ' + (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ')',
                    data: today_data,
                    color: '#4169e1'
                }]
            });
          });
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
