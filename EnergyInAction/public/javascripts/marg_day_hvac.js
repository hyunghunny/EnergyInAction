var dayLabel = new Array('일', '월', '화', '수', '목', '금', '토');

//var baseDay     = new Date('2015-07-31');
var baseDay     = new Date();
baseDay.setHours(0,0,0,0); // today 날짜만 깔끔히 잡도록 시간 초기화

// var lastMonday = getLastMonday(baseDay);
// var lastSunday = shiftDate(lastMonday, 6);
// var thisMonday = shiftDate(lastMonday, 7);
// var thisSunday = shiftDate(thisMonday, 6);


var comparingDay = shiftDate(baseDay, -1) // 어제

function shiftDate(date, offset) {
  var shiftedDate = new Date(date);
  shiftedDate.setDate(shiftedDate.getDate() + offset);

  return shiftedDate;
}

console.log(baseDay);
console.log(comparingDay.getMonth());

// var baseTime     = baseDay.getTime() + 3600000*9;
// var comparingDayTime = comparingDay.getTime() + 3600000*9; // GMT + 09:00
var baseTime     = baseDay.getTime();
var comparingDayTime = comparingDay.getTime();

// console.log(baseTime);
// console.log(comparingDayTime);

$(function () {
    document.getElementById("date").innerHTML = 'MARG ' +
                                                (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ') 사용량';

    baseDay_query  = '/api/labs/marg/energy/hours.json?base_time=' + baseTime;
    comparingDay_query = '/api/labs/marg/energy/hours.json?base_time=' + comparingDayTime;

    // console.log(baseDay_query);
    // console.log(comparingDay_query);

    var xAxis_categories = new Array();
    var comparingDay_data = new Array();
    var today_data = new Array();

    invokeOpenAPI(comparingDay_query, function (yesterday) {
      // console.log(yesterday);
      for(var index = 0; index < yesterday.length; index++){

        com = accumulator(yesterday[index], 'hvac'); // hvac only
        comparingDay_data.push(Number(com.toFixed(1)));
        //comparingDay_data.push(com);
        xAxis_categories.push(new Date(yesterday[index].dateFrom).getHours() + '시');
      }
      // console.log(yesterday[0].sum);
      // xAxis_categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      // yesterday_data = [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6];
      // Today_data     = [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8];
      // console.log(yesterday_data);

        invokeOpenAPI(baseDay_query, function (today) {
          // console.log(today);
          for(var index = 0; index < today.length; index++){

            com = accumulator(today[index], 'hvac'); // hvac only
            today_data.push(Number(com.toFixed(1)));
          }
          // xAxis_categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          // yesterday_data = [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6];
          // Today_data     = [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8];
          // console.log(yesterday_data);

          //console.log('comparingDay', comparingDay_data);
          //console.log('today', today_data);
          //showChart();

          $('#container').highcharts({
                chart: {
                    type: 'line'
                },
                title: {
                    text: '어제와 오늘 (' + yesterday[0].location + '호 - 전등 사용량)'
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
                    name: '어제: ' + (comparingDay.getMonth() + 1) + '월 ' +  comparingDay.getDate() + '일(' + dayLabel[comparingDay.getDay()] + ')',
                    data: comparingDay_data,
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

function accumulator(data, targetDescription) {
  result = 0;
  for(i=0; i<data.feeders.length;i++){
      if(data.feeders[i].description == targetDescription) {
        result = result + (data.feeders[i].value);
        //console.log(data.feeders[i].value, data.feeders[i].description, result)
      }
  }
  return result;
}
