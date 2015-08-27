$(function () {

    var elementObj = document.getElementById("date");
    if(elementObj){
      elementObj.innerHTML = 'MARG ' + (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ') 사용량';
    }


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

        com = accumulator(yesterday[index], 'computer'); // computer only
        comparingDay_data.push(Number(com.toFixed(1)));
        //comparingDay_data.push(com);
        xAxis_categories.push(new Date(yesterday[index].dateFrom).getHours() + '시');
      }

        invokeOpenAPI(baseDay_query, function (today) {
          // console.log(today);
          for(var index = 0; index < today.length; index++){

            com = accumulator(today[index], 'computer'); // computer only
            today_data.push(Number(com.toFixed(1)));
          }

          $('#marg_day_com').highcharts({
                chart: {
                    type: 'line'
                },
                title: {
                    text: '어제와 오늘 (' + yesterday[0].location + '호 - 컴퓨터 사용량)'
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
