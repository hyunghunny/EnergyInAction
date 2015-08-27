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

    var lastWeek_data_total = [];
    var lastWeek_data_hvac  = [];
    var lastWeek_data_com   = [];
    var lastWeek_data_light = [];
    var lastWeek_data_etc   = [];

    var thisWeek_data_total = [];
    var thisWeek_data_hvac  = [];
    var thisWeek_data_com   = [];
    var thisWeek_data_light = [];
    var thisWeek_data_etc   = [];

    //query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(lastMonday) + '&day_to=' + dateFormatter(baseDay) + '&offset=9';
    lastWeek_query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(lastMonday) + '&day_to=' + dateFormatter(lastSunday) + '&offset=0';
    console.log(lastWeek_query);

    invokeOpenAPI(lastWeek_query, function (lastWeek_data) {

      thisWeek_query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(thisMonday) + '&day_to=' + dateFormatter(thisSunday) + '&offset=0';
      console.log(thisWeek_query);

      invokeOpenAPI(thisWeek_query, function (thisWeek_data) {

      console.log(thisWeek_data);

      for(var index = 0; index < lastWeek_data.length; index++){
        total = lastWeek_data[index].sum;
        hvac = accumulator(lastWeek_data[index], 'hvac');
        com  = accumulator(lastWeek_data[index], 'computer');
        light = accumulator(lastWeek_data[index], 'light');
        etc = total - (hvac + com + light);

        lastWeek_data_total.push(Number(total.toFixed(1)));
        lastWeek_data_hvac.push(Number(hvac.toFixed(1)));
        lastWeek_data_com.push(Number(com.toFixed(1)));
        lastWeek_data_light.push(Number(light.toFixed(1)));
        lastWeek_data_etc.push(Number(etc.toFixed(1)));
      }

      for(var index = 0; index < thisWeek_data.length; index++){
        total = thisWeek_data[index].sum;
        hvac = accumulator(thisWeek_data[index], 'hvac');
        com  = accumulator(thisWeek_data[index], 'computer');
        light = accumulator(thisWeek_data[index], 'light');
        etc = total - (hvac + com + light);

        thisWeek_data_total.push(Number(total.toFixed(1)));
        thisWeek_data_hvac.push(Number(hvac.toFixed(1)));
        thisWeek_data_com.push(Number(com.toFixed(1)));
        thisWeek_data_light.push(Number(light.toFixed(1)));
        thisWeek_data_etc.push(Number(etc.toFixed(1)));
      }

      //showChart();
      $('#marg_week').highcharts({
              chart: {
                  type: 'column'
              },

              title: {
                  text: '일주일 전력 사용 변화'
              },

              xAxis: {
                  categories: xAxis_categories,
                  plotBands: [{ // visualize the weekend
                      from: (0.5 * (baseDay.getDay()*2+1)) -2 ,
                      to: (0.5 * (baseDay.getDay()*2+1)) -1,
                      color: 'rgba(68, 170, 213, .2)'
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

              series: [
                {
                    name: '지난주',
                    data: lastWeek_data_total,
                    stack: 'lastWeek',
                    color: Highcharts.getOptions().colors[0]
                }, {
                    name: '이번주',
                    data: thisWeek_data_total,
                    stack: 'thisWeek',
                    color: Highcharts.getOptions().colors[1]
                }
              ],

              legend: {
                  enabled: true
              }

          });
        });
      });
});
