// var dayLabel = new Array('일', '월', '화', '수', '목', '금', '토');
//
// var today = new Date();
// var baseDay = new Date('2015-04-03');
//
// var dayTime = today.getTime();
//
// var start_day = new Date(today);
// start_day.setDate(today.getDate() - 30);
//
// var start_year  = start_day.getFullYear();
// var start_month = start_day.getMonth()+1;
// var start_date  = start_day.getDate();
//
// var from_date = start_day.setHours(9,0,0,0);


//var dayLabel = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
var dayLabel = new Array('일', '월', '화', '수', '목', '금', '토');

var baseDay = new Date('2015-04-03');
var toDay   = new Date('2015-04-04');

var baseTime = baseDay.getTime();
var   toTime = toDay.getTime();

var xAxis_categories = null;
var Yesterday_data;
var Today_data = null;

$(function () {
    document.getElementById("date").innerHTML = 'MARG ' +
                                                (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ') ~ ' +
                                                (  toDay.getMonth() + 1) + '월 ' +    toDay.getDate() + '일(' + dayLabel[  toDay.getDay()] + ') 사용량';
    query = '/api/labs/marg/energy/hours.json?base_time=' + baseTime + '&to_time=' + toTime;

     xAxis_categories = [];
     Yesterday_data = [];
     Today_data = [];

    invokeOpenAPI(query, function (data) {
      console.log(data);

      xAxis_categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      Yesterday_data = [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6];
      Today_data     = [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8];
      console.log(Yesterday_data);

    });

    console.log(Yesterday_data);
    //showChart();
    $('#container').highcharts({
          chart: {
              type: 'line'
          },
          title: {
              text: 'Monthly Average Temperature'
          },
          subtitle: {
              text: 'Source: WorldClimate.com'
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
              name: 'Yesterday',
              data: Yesterday_data
          }, {
              name: 'Today',
              data: Today_data
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
