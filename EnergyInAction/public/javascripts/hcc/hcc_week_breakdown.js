$(function () {
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
  var lastWeek_hvac  = [];
  var lastWeek_com   = [];
  var lastWeek_light = [];
  var lastWeek_etc   = [];

  var thisWeek_total = [];
  var thisWeek_hvac  = [];
  var thisWeek_com   = [];
  var thisWeek_light = [];
  var thisWeek_etc   = [];

  var comparing_breakdownColors = ['#b3d5c8', '#f5e0b3', '#e8c2c1', '#d3bdd1']; //com, light, hvac, etc
  var today_breakdownColors = ['#7db19f', '#eecf8d', '#f3a3a1', '#a889a5'];

  lastWeek_query = 'api/labs/hcc/energy/daily.json?day_from=' + dateFormatter(lastMonday) + '&day_to=' + dateFormatter(lastSunday) + '&offset=0';
  thisWeek_query = 'api/labs/hcc/energy/daily.json?day_from=' + dateFormatter(thisMonday) + '&day_to=' + dateFormatter(thisSunday) + '&offset=0';

  invokeOpenAPI(lastWeek_query, lastWeekCB);
  invokeOpenAPI(thisWeek_query, thisWeekCB);

  function lastWeekCB(lastWeek_) {
      lastWeek = lastWeek_;
      lastWeek_loading = true;

      for(var index = 0; index < lastWeek.length; index++){
        total = lastWeek[index].sum;
        hvac = accumulator(lastWeek[index], 'hvac');
        com  = accumulator(lastWeek[index], 'computer');
        light = accumulator(lastWeek[index], 'light');
        etc = total - (hvac + com + light);

        lastWeek_total.push(Number(total.toFixed(1)));
        lastWeek_hvac.push(Number(hvac.toFixed(1)));
        lastWeek_com.push(Number(com.toFixed(1)));
        lastWeek_light.push(Number(light.toFixed(1)));
        lastWeek_etc.push(Number(etc.toFixed(1)));
      }

      if (thisWeek_loading){
        drawChart();
      }
  }

  function thisWeekCB(thisWeek_) {
      thisWeek = thisWeek_;
      thisWeek_loading = true;

      for(var index = 0; index < thisWeek.length; index++){
        total = thisWeek[index].sum;
        hvac = accumulator(thisWeek[index], 'hvac');
        com  = accumulator(thisWeek[index], 'computer');
        light = accumulator(thisWeek[index], 'light');
        etc = total - (hvac + com + light);

        thisWeek_total.push(Number(total.toFixed(1)));
        thisWeek_hvac.push(Number(hvac.toFixed(1)));
        thisWeek_com.push(Number(com.toFixed(1)));
        thisWeek_light.push(Number(light.toFixed(1)));
        thisWeek_etc.push(Number(etc.toFixed(1)));
      }
      if (lastWeek_loading){
        drawChart();
      }
  }

  function drawChart() {
    $('#hcc_week_breakdown').highcharts({
        chart: {
            type: 'column'
        },

        title: {
           useHTML: true,
           text: '[ 주간 비교 및 오늘 상세 ]',
           style: {
             color: '#FFFFFF',
             fontWeight: 'bold',
             'background-color': '#8E8989',
             'border-radius': '6px',
             border: '4px solid #8E8989'
           }
       },
       credits: {
           enabled: false
       },
        xAxis: {
            categories: xAxis_categories,
            plotBands: [{ // visualize the weekend
                from: (0.5 * (baseDay.getDay()*2+1)) -2 ,
                to: (0.5 * (baseDay.getDay()*2+1)) -1,
                color: '#f9f3e8'
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
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        fontSize: "5px",
                        textShadow: '0 0 1px black'
                    }
                }
            }
        },
        exporting: {
            enabled: false
        },

        series: [
          {
              name: '컴퓨터',
              data: lastWeek_com,
              stack: 'lastWeek',
              color: comparing_breakdownColors[0]
          }, {
              name: '전등',
              data: lastWeek_light,
              stack: 'lastWeek',
              color: comparing_breakdownColors[1]
          }, {
              name: '냉난방',
              data: lastWeek_hvac,
              stack: 'lastWeek',
              color: comparing_breakdownColors[2]
          }, {
              name: '기타',
              data: lastWeek_etc,
              stack: 'lastWeek',
              color: comparing_breakdownColors[3]
          }, {
              name: '컴퓨터',
              data: thisWeek_com,
              stack: 'thisWeek',
              linkedTo: ':previous',
              color: today_breakdownColors[0]
          }, {
              name: '전등',
              data: thisWeek_light,
              stack: 'thisWeek',
              linkedTo: ':previous',
              color: today_breakdownColors[1]
          }, {
              name: '냉난방',
              data: thisWeek_hvac,
              stack: 'thisWeek',
              linkedTo: ':previous',
              color: today_breakdownColors[2]
          }, {
              name: '기타',
              data: thisWeek_etc,
              stack: 'thisWeek',
              linkedTo: ':previous',
              color: today_breakdownColors[3]
          }
        ],

        legend: {
            enabled: true,
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            // x: 800,
            y: 20,
            floating: true,
            borderWidth: 1,
            // backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            backgroundColor: 'rgba(255, 255, 255, .8)',
            borderColor: '#FFFFFF'
        },

    });
  }
});
