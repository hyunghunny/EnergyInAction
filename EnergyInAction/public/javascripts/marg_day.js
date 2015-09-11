$(function () {
  marg_day();
  // // console.log('seconds: ',seconds);
  // // if (seconds == 15) {
  // //   marg_day();
  // // }
  // setInterval("marg_day()",3600000);
  });


function marg_day(){
    var elementObj = document.getElementById("date");
    if(elementObj){
      elementObj.innerHTML = 'MARG ' + (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ') 사용량';
    }


    // baseDay_query  = '/api/labs/marg/energy/quarters.json?base_time=' + baseTime;
    // comparingDay_query = '/api/labs/marg/energy/quarters.json?base_time=' + comparingDayTime;

    baseDay_query  = '/api/labs/marg/energy/hours.json?base_time=' + baseTime;
    comparingDay_query = '/api/labs/marg/energy/hours.json?base_time=' + comparingDayTime;

    // console.log(baseDay_query);
    // console.log(comparingDay_query);

    var yesterday = [];
    var today = [];

    var yesterday_loading = false;
    var     today_loading = false;

    var xAxis_categories = [];
    var comparingDay_data = [];
    var today_data = [];

    var comparingSum = 0;
    var todaySum     = 0;

    var data_currentHour = 0;

    console.log("baseDay_query", baseDay_query);
    console.log("comparingDay_query", comparingDay_query);

    invokeOpenAPI(comparingDay_query, yesterdayCB);
    invokeOpenAPI(baseDay_query, todayCB);

    function todayCB(today_){
      today = today_;
      today_loading = true;

      for(var index = 0; index < today.length; index++){
        today_data.push(Number(today[index].sum.toFixed(1)));
      }

      if (yesterday_loading) {
        drawChart();
      }
    }

    function yesterdayCB (yesterday_) {
      yesterday = yesterday_;
      yesterday_loading = true;

      for(var index = 0; index < yesterday.length; index++){
        comparingDay_data.push(Number(yesterday[index].sum.toFixed(1)));
        xAxis_categories.push(new Date(yesterday[index].dateFrom).getHours() + '시');
      }
      if (today_loading) {
        drawChart();
      }
    }

    function drawChart() {
      comparingSum = limitedArraySum(comparingDay_data, today.length);
      todaySum     = limitedArraySum(today_data, today.length);

      var legend_x = 50;
      var legend_y = 47;

      $('#marg_day').highcharts({

            chart: {
                type: 'line'
            },
            title: {
                // text: '어제와 오늘 (' + yesterday[0].location + '호 - 사용량 전체)'
                text: '[ 어제와 오늘 ]'
            },
            // subtitle: {
            //     text: 'SNU'
            // },
            credits: {
                enabled: false
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                // x: legend_x+(today.length - 1)*24,
                x:740,
                y: 320,
                floating: true,
                borderWidth: 1,
                //backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, .8)',
                borderColor: '#FFFFFF'
            },
            exporting: {
                enabled: false
            },

            xAxis: {
                categories: xAxis_categories,
                plotBands: [{ // visualize so far
                    from: -0.5,
                    to: today.length - 1,
                    color: 'rgba(68, 170, 213, .1)'
                }]
            },
            yAxis: {
              maxPadding: 0.2,
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
                //name: '어제: ' + (comparingDay.getMonth() + 1) + '월 ' +  comparingDay.getDate() + '일(' + dayLabel[comparingDay.getDay()] + ')',
                name: '어제 이 시간: ' + comparingSum.toFixed(1) + ' kW/h',
                data: comparingDay_data,
                color: '#d3d3d3'
            }, {
                //name: '오늘: ' + (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ')',
                name: '오늘 이 시간: ' + todaySum.toFixed(1) + ' kW/h (' + ((todaySum/comparingSum)*100).toFixed(1) +  '%)',
                data: today_data,
                color: '#4169e1'
            }]
        });
      }
}
