$(function () {

  /////////////////////////////////////////////////
  // 1. hours data process
  // 오늘 1시간 단위 누적 사용량 (높이) 표현을 위함
  /////////////////////////////////////////////////

  baseDay_query  = '/api/labs/marg/energy/hours.json?base_time=' + baseTime;
  comparingDay_query = '/api/labs/marg/energy/hours.json?base_time=' + lastWeekDayTime;

  // console.log(baseDay_query);
  // console.log(comparingDay_query);

  var comparingDay_queryReturn = [];
  var today_queryReturn = [];

  var comparingDay_loading = false;
  var        today_loading = false;

  var comparingDay_plotData = [];
  var today_plotData = [];

  var comparingSum = 0;
  var todaySum     = 0;

  invokeOpenAPI(comparingDay_query, comparingDayCB);
  invokeOpenAPI(baseDay_query, todayCB);

  function todayCB(today_){
    today_queryReturn = today_;
    today_loading = true;

    for(var index = 0; index < today_queryReturn.length; index++){
      today_plotData.push(Number(today_queryReturn[index].sum.toFixed(1)));
    }
  }

  function comparingDayCB (comparingDay_) {
    comparingDay_queryReturn = comparingDay_;
    comparingDay_loading = true;

    for(var index = 0; index < comparingDay_queryReturn.length; index++){
      comparingDay_plotData.push(Number(comparingDay_queryReturn[index].sum.toFixed(1)));
    }
  }

  //////////////////////////
  // 2. WeekData process
  //////////////////////////
  var lastMonday = getLastMonday(baseDay);
  var lastSunday = shiftDate(lastMonday, 6);
  var thisMonday = shiftDate(lastMonday, 7);
  var thisSunday = shiftDate(thisMonday, 6);

  var xAxis_categories = ['월', '화', '수', '목', '금', '토', '일'];
  xAxis_categories[0] = dateLabelMaker(shiftDate(lastMonday, 0)) + ' ... ' + dateLabelMaker(shiftDate(thisMonday, 0)) + '<br>(월)';
  xAxis_categories[1] = dateLabelMaker(shiftDate(lastMonday, 1)) + ' ... ' + dateLabelMaker(shiftDate(thisMonday, 1)) + '<br>(화)';
  xAxis_categories[2] = dateLabelMaker(shiftDate(lastMonday, 2)) + ' ... ' + dateLabelMaker(shiftDate(thisMonday, 2)) + '<br>(수)';
  xAxis_categories[3] = dateLabelMaker(shiftDate(lastMonday, 3)) + ' ... ' + dateLabelMaker(shiftDate(thisMonday, 3)) + '<br>(목)';
  xAxis_categories[4] = dateLabelMaker(shiftDate(lastMonday, 4)) + ' ... ' + dateLabelMaker(shiftDate(thisMonday, 4)) + '<br>(금)';
  xAxis_categories[5] = dateLabelMaker(shiftDate(lastMonday, 5)) + ' ... ' + dateLabelMaker(shiftDate(thisMonday, 5)) + '<br>(토)';
  xAxis_categories[6] = dateLabelMaker(shiftDate(lastMonday, 6)) + ' ... ' + dateLabelMaker(shiftDate(thisMonday, 6)) + '<br>(일)';

  var thisWeek_queryReturn = [];
  var lastWeek_queryReturn = [];

  var thisWeek_loading = false;
  var lastWeek_loading = false;

  var lastWeek_plotData = [];
  var thisWeek_plotData = [];

  lastWeek_query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(lastMonday) + '&day_to=' + dateFormatter(lastSunday) + '&offset=0';
  thisWeek_query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(thisMonday) + '&day_to=' + dateFormatter(thisSunday) + '&offset=0';

  // console.log(lastWeek_query);
  // console.log(thisWeek_query);

  invokeOpenAPI(lastWeek_query, lastWeekCB);
  invokeOpenAPI(thisWeek_query, thisWeekCB);

  function lastWeekCB(lastWeek_) {
      lastWeek_queryReturn = lastWeek_;
      lastWeek_loading = true;

      for(var index = 0; index < lastWeek_queryReturn.length; index++){
        total = lastWeek_queryReturn[index].sum;
        lastWeek_plotData.push(Number(total.toFixed(1)));
        // if(index == (baseDay.getDay()-1)) {
        //   lastWeek_plotData.push({y: Number(total.toFixed(1)),
        //                        color: 'green'});
        // } else {
        //   lastWeek_plotData.push(Number(total.toFixed(1)));
        // }
      }
      if (thisWeek_loading && comparingDay_loading && today_loading){
      // if (thisWeek_loading){
        drawChart();
      }
  }

  function thisWeekCB(thisWeek_) {
      thisWeek_queryReturn = thisWeek_;
      thisWeek_loading = true;

      for(var index = 0; index < thisWeek_queryReturn.length; index++){
        total = thisWeek_queryReturn[index].sum;
        if(index == (baseDay.getDay()-1)) {
          thisWeek_plotData.push({y: Number(total.toFixed(1)),
                               color: 'red'});
        } else {
          thisWeek_plotData.push(Number(total.toFixed(1)));
        }
      }
      if (lastWeek_loading && comparingDay_loading && today_loading) {
      // if(lastWeek_loading){
        drawChart();
      }
  }


  ///////////////////////
  // 3. draw chart
  ///////////////////////
  function drawChart() {
    todaySum = limitedArraySum(today_plotData, today_queryReturn.length);
    comparingSum = limitedArraySum(comparingDay_plotData, today_queryReturn.length);

    var today_current_plotData = [0,0,0,0,0,0,0]
    today_current_plotData[baseDay.getDay()-1] = comparingSum;
    lastWeek_plotData[baseDay.getDay()-1] = lastWeek_plotData[baseDay.getDay()-1] - comparingSum;

    // console.log(comparingDay_queryReturn);
    // console.log(today_queryReturn);

    console.log(lastWeek_plotData[baseDay.getDay()-1]);
    console.log(lastWeek_plotData);
    // console.log(thisWeek_plotData);

    // console.log("todaySum", todaySum);
    console.log("comparingSum", comparingSum);
    console.log("today_current_plotData", today_current_plotData);


    $('#marg_week').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '[ 지난주와 이번주 ]'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
             column: {
                 colorByPoint: true
             }
         },
        xAxis: {
            categories: xAxis_categories,
            plotBands: [{ // visualize the weekend
                from: (0.5 * (baseDay.getDay()*2+1)) -2 ,
                to: (0.5 * (baseDay.getDay()*2+1)) -1,
                color: 'rgba(50, 50, 213, .2)'
            }]
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: '전력 사용량 (kW/h)'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },

        legend: {
            enabled: false,
            layout: 'horizontal',
            align: 'left',
            verticalAlign: 'top',
            x: 800,
            y: 45,
            floating: true,
            borderWidth: 1,
            // backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            backgroundColor: 'rgba(255, 255, 255, .8)',
            borderColor: '#FFFFFF'
        },
        exporting: {
            enabled: false
        },

        series: [
          {
              name: '지난주',
              data: lastWeek_plotData,
              stack: 'lastWeek_queryReturn',
              //color: Highcharts.getOptions().colors[0]
              color: '#D3D3D3'
          },
          {
              name: '지난주',
              data: today_current_plotData,
              stack: 'lastWeek_queryReturn',
              linkedTo: ':previous',
              color: 'green',
              dataLabels: {
                  enabled: true,
                  color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                  style: {
                      textShadow: '0 0 3px black'
                  }
              }
          },
          {
              name: '이번주',
              data: thisWeek_plotData,
              stack: 'thisWeek_queryReturn',
              //color: Highcharts.getOptions().colors[1]
              color: '#63A8F6',
              dataLabels: {
                  enabled: true,
                  color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                  style: {
                      textShadow: '0 0 3px black'
                  }
              }
          }]
        });
      }
});
