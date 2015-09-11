$(function () {


  comparingDay = lastWeekSameDay;

  baseDay_query  = '/api/labs/marg/energy/hours.json?base_time=' + baseTime;
  comparingDay_query = '/api/labs/marg/energy/hours.json?base_time=' + lastWeekDayTime;

  // console.log(baseDay_query);
  // console.log(comparingDay_query);

  // var comparingDay = [];
  // var today_length = 0;
  //
  // var comparingDay_loading = false;
  // var        today_loading = false;
  //
  // var xAxis_categories = [];
  // var comparingDay_data = [];
  // var today_data = [];
  //
  // var comparingSum = 0;
  // var todaySum     = 0;
  //
  // // console.log("baseDay_query", baseDay_query);
  // // console.log("comparingDay_query", comparingDay_query);
  //
  // invokeOpenAPI(comparingDay_query, comparingDayCB);
  // invokeOpenAPI(baseDay_query, todayCB);
  //
  // function todayCB(today_){
  //   today_length = today_.length;
  //   console.log(today_length);
  // }
  //
  // function comparingDayCB (comparingDay_) {
  //   comparingDay = comparingDay_;
  //   comparingDay_loading = true;
  //
  //   for(var index = 0; index < comparingDay.length; index++){
  //     comparingDay_data.push(Number(comparingDay[index].sum.toFixed(1)));
  //     xAxis_categories.push(new Date(comparingDay[index].dateFrom).getHours() + '시');
  //   }
  // }
  //
  // console.log(comparingDay_data.slice(0,today_data.length));


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

  var thisWeek = [];
  var lastWeek = [];

  var thisWeek_loading = false;
  var lastWeek_loading = false;

  var lastWeek_total = [];
  var thisWeek_total = [];

  lastWeek_query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(lastMonday) + '&day_to=' + dateFormatter(lastSunday) + '&offset=0';
  thisWeek_query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(thisMonday) + '&day_to=' + dateFormatter(thisSunday) + '&offset=0';

  invokeOpenAPI(lastWeek_query, lastWeekCB);
  invokeOpenAPI(thisWeek_query, thisWeekCB);

  function lastWeekCB(lastWeek_) {
      lastWeek = lastWeek_;
      lastWeek_loading = true;

      for(var index = 0; index < lastWeek.length; index++){
        total = lastWeek[index].sum;
        if(index == (baseDay.getDay()-1)) {
          lastWeek_total.push({y: Number(total.toFixed(1)),
                               color: 'green'});
        } else {
          lastWeek_total.push(Number(total.toFixed(1)));
        }
      }
      // if (thisWeek_loading && comparingDay_loading && today_loading)
      if (thisWeek_loading){
        drawChart();
      }
  }

  function thisWeekCB(thisWeek_) {
      thisWeek = thisWeek_;
      thisWeek_loading = true;

      for(var index = 0; index < thisWeek.length; index++){
        total = thisWeek[index].sum;
        if(index == (baseDay.getDay()-1)) {
          thisWeek_total.push({y: Number(total.toFixed(1)),
                               color: 'red'});
        } else {
          thisWeek_total.push(Number(total.toFixed(1)));
        }
      }
      // if (lastWeek_loading && comparingDay_loading && today_loading)
      if(lastWeek_loading){
        drawChart();
      }
  }

  function drawChart() {
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

        series: [{
              name: '지난주',
              data: lastWeek_total,
              stack: 'lastWeek',
              //color: Highcharts.getOptions().colors[0]
              color: '#D3D3D3'
          },
          // {
          //     name: '지난주',
          //     data: lastWeek_total,
          //     stack: 'lastWeek',
          //     linkedTo: ':previous',
          // },
          {
              name: '이번주',
              data: thisWeek_total,
              stack: 'thisWeek',
              //color: Highcharts.getOptions().colors[1]
              color: '#63A8F6'
          }]
        });
      }
});
