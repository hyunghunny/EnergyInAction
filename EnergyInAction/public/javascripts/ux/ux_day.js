$(function () {
  ux_day();
  // // console.log('seconds: ',seconds);
  // // if (seconds == 15) {
  // //   ux_day();
  // // }
  // setInterval("ux_day()",3600000);
  });


function ux_day() {

  // 지난달 평일, 주말 시간별 평균 계산 ---> 지난주 같은 요일 대비로 계획 변경
// {
    // var firstDayOfThisMonth = new Date(baseDay).setDate(1);
    // var firstDayOfLastMonth = new Date(baseDay).setMonth(baseDay.getMonth()-1, 1); // -1 means the last month

    // var firstDayOfThisMonth_lastYear = new Date(firstDayOfThisMonth).setFullYear(baseDay.getFullYear() - 1);
    // var firstDayOfNextMonth_lastYear = new Date(firstDayOfThisMonth_lastYear).setMonth(new Date(firstDayOfThisMonth_lastYear).getMonth() + 1);
    // var  lastDayOfLastMonth_lastYear = new Date(shiftDate(firstDayOfNextMonth_lastYear, -1));

    // firstDayOfThisMonth_lastYear = new Date(firstDayOfThisMonth_lastYear).setHours(0,0,0,0);
    //  lastDayOfLastMonth_lastYear = new Date(lastDayOfLastMonth_lastYear).setHours(0,0,0,0)

    // console.log(firstDayOfThisMonth_lastYear, dateToString(new Date(firstDayOfThisMonth_lastYear)));
    // console.log(firstDayOfNextMonth_lastYear, dateToString(new Date(firstDayOfNextMonth_lastYear)));
    // console.log(lastDayOfLastMonth_lastYear, dateToString(new Date(lastDayOfLastMonth_lastYear)));

    // var lastMonth = [];
    // var lastMonthWeekDay_data = [];
    // var lastMonthWeekEnd_data = [];

    // for(var i=0; i < 31; i++){
    //   targetDate = new Date(shiftDate(firstDayOfThisMonth_lastYear, i)).setHours(0,0,0,0);
    //   if(targetDate < firstDayOfNextMonth_lastYear){
    //     // console.log(targetDate, dateToString(new Date(targetDate)));
    //     lastMonth_query = '/api/labs/ux/energy/hours.json?base_time=' + targetDate;
    //     invokeOpenAPI(lastMonth_query, lastYearMonthCB);
    //   }
    // }
    //
    // function lastYearMonthCB(lastMonth_){
    //   lastMonth = lastMonth_;
    //   if(lastMonth.length == 24) {
    //     for(var index = 0; index < lastMonth.length; index++){
    //       if(new Date(lastMonth[lastMonth.length-1].dateFrom).getDay() > 0 && new Date(lastMonth[lastMonth.length-1].dateFrom).getDay() < 6) {
    //         // WeekDay
    //         // console.log(index, lastMonth[index].sum)
    //         lastMonthWeekDay_data.push(lastMonth[index].sum);
    //         // console.log(new Date(lastMonth[lastMonth.length-1].dateFrom).getDay(), lastMonthWeekDay_data.length);
    //       } else {
    //         // WeekEnd
    //         lastMonthWeekEnd_data.push(lastMonth[index].sum);
    //         // console.log(new Date(lastMonth[lastMonth.length-1].dateFrom).getDay(), lastMonthWeekEnd_data.length);
    //       }
    //     }
    //   } else {
    //     console.log("data missing @", lastMonth_query, lastMonth);
    //   }
    // }
// }

    baseDay_query  = '/api/labs/ux/energy/hours.json?base_time=' + baseTime;
    comparingDay_query = '/api/labs/ux/energy/hours.json?base_time=' + lastWeekDayTime; // 지난 주 같은 요일로 설정

    console.log(baseDay_query);
    console.log(comparingDay_query);

    var comparingDay_queryReturn = [];
    var today_queryReturn = [];

    var comparingDay_loading = false;
    var        today_loading = false;

    var xAxis_categories = [];
    var comparingDay_plotData = [];
    var today_plotData = [];

    var comparingSum = 0;
    var todaySum     = 0;

    var currentState;
    var stateColors = ['#a50a0a','#f7cb00','#3e721f'];

    // console.log("baseDay_query", baseDay_query);
    // console.log("comparingDay_query", comparingDay_query);

    invokeOpenAPI(comparingDay_query, comparingDayCB);
    invokeOpenAPI(baseDay_query, todayCB);

    function todayCB(today_){
      today_queryReturn = today_;
      today_loading = true;

      for(var index = 0; index < today_queryReturn.length; index++){
        today_plotData.push(Number(today_queryReturn[index].sum.toFixed(1)));
      }
      if (comparingDay_loading) {
        drawChart();
      }
    }

    function comparingDayCB (comparingDay_) {
      comparingDay_queryReturn = comparingDay_;
      comparingDay_loading = true;

      for(var index = 0; index < comparingDay_queryReturn.length; index++){
        comparingDay_plotData.push(Number(comparingDay_queryReturn[index].sum.toFixed(1)));
        xAxis_categories.push(new Date(comparingDay_queryReturn[index].dateTo).getHours() + '시');
      }
      if (today_loading) {
        drawChart();
      }
    }

    // function hourlyMean(data){
    //   var result = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    //   denominator = data.length/24;
    //   // console.log(denominator);
    //   // var tmp = 0;
    //   for(var index=0; index < data.length; index++){
    //     // if(index%24==1) {
    //     //   console.log(data[index]);
    //     //   tmp = tmp + data[index];
    //     // }
    //     result[index % 24] = result[index % 24] + data[index];
    //   }
    //   // console.log(tmp, result);
    //
    //   for(var index=0; index < result.length; index++){
    //     result[index] = Number((result[index] / denominator).toFixed(1));
    //   }
    //   // console.log(result);
    //   return(result);
    // }


    function drawChart() {
      // console.log(lastMonthWeekDay_data);
      // console.log(lastMonthWeekEnd_data);


      console.log(comparingDay_queryReturn);
      console.log(today_queryReturn);

      // weekDay_hourlyMean = hourlyMean(lastMonthWeekDay_data);
      // weekEnd_hourlyMean = hourlyMean(lastMonthWeekEnd_data);

      // console.log("weekDay_hourlyMean", weekDay_hourlyMean);
      // console.log("weekEnd_hourlyMean", weekEnd_hourlyMean);

      comparingSum = limitedArraySum(comparingDay_plotData, today_queryReturn.length);
      todaySum     = limitedArraySum(today_plotData, today_queryReturn.length);

      var savingRate_Day = todaySum / comparingSum;

      if(savingRate_Day > 1.20) {
         currentState = 0;
      } else if ( savingRate_Day > 1.00) {
         currentState = 1;
      } else {
         currentState = 2;
      }

      if(weekDay_Indicator){
        // var vsData = weekDay_hourlyMean;
      } else {
        // var vsData = weekEnd_hourlyMean;
      }

      var legend_x = 50;
      var legend_y = 47;

      console.log('currentState: ',currentState);
      console.log('colorcode: ',stateColors[currentState-1]);

      $('#ux_day').highcharts({
            chart: {
                backgroundColor: "#f9f3e8"
            },
            title: {
                // text: '어제와 오늘 (' + comparingDay_queryReturn[0].location + '호 - 사용량 전체)'
                // text: '[ 어제와 오늘 ]'
                text: null
            },
            credits: {
                enabled: false
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                // x: legend_x+(today_queryReturn.length - 1)*24,
                x:745,
                y: 305,
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
                categories: xAxis_categories
                // plotBands: [{ // visualize so far
                //     from: -0.5,
                //     to: today_queryReturn.length - 1,
                //     color: 'rgba(68, 170, 213, .1)'
                // }]
            },
            yAxis: {
              maxPadding: 0.1,
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
                },
                area: { /* or spline, area, series, areaspline etc.*/
                    marker: {
                       enabled: false
                    }
                }
            },

            series: [{
                //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                name: '일주 전 사용 패턴',
                data: comparingDay_plotData,
                // data: vsData,
                color: '#848174',
                lineWidth: 1,
                // linkedTo: ':previous',
                zIndex: 0
            },{
                //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                name: '일주 전 이 시간: ' + comparingSum.toFixed(1) + ' kW/h',
                data: comparingDay_plotData.slice(0,today_plotData.length),
                type: 'area',
                lineWidth: 0,
                color: '#7f8c91',//'#848174',
                fillOpacity: 0.7,
                zIndex: 0
            }, {
                //name: '오늘: ' + (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ')',
                name: '오늘 이 시간: ' + todaySum.toFixed(1) + ' kW/h (' + ((todaySum/comparingSum)*100).toFixed(1) +  '%)',
                data: today_plotData,
                type: 'area',
                lineWidth: 0,
                color: stateColors[currentState],
                fillOpacity: 0.7,
                zIndex: 0
            }, {
                //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                data: today_plotData,
                // data: vsData,
                color: stateColors[currentState],
                linkedTo: ':previous',
                zIndex: 0
            }]
        });
      }

      var day = baseDay.getDay();
      if(day==0){
        $('#arrow').prepend('<img id="faces" src="./images/arrow_depth_sun.png" />');
      }else if (day==1) {
        $('#arrow').prepend('<img id="faces" src="./images/arrow_depth_mon.png" />');
      }else if (day==2) {
        $('#arrow').prepend('<img id="faces" src="./images/arrow_depth_tue.png" />');
      }else if (day==3) {
        $('#arrow').prepend('<img id="faces" src="./images/arrow_depth_wed.png" />');
      }else if (day==4) {
        $('#arrow').prepend('<img id="faces" src="./images/arrow_depth_thu.png" />');
      }else if (day==5) {
        $('#arrow').prepend('<img id="faces" src="./images/arrow_depth_fri.png" />');
      }else {
        $('#arrow').prepend('<img id="faces" src="./images/arrow_depth_sat.png" />');
      }
}
