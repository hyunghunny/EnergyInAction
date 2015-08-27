$(function () {
    var firstDayOfThisMonth = new Date(baseDay).setDate(1);
    var firstDayOfLastMonth = new Date(baseDay).setMonth(baseDay.getMonth()-1, 1); // -1 means the last month
    var  lastDayOfLastMonth = shiftDate(firstDayOfThisMonth, -1);

    var xAxis_categories = [(new Date(firstDayOfThisMonth).getMonth()) + '월',
                            (new Date(firstDayOfThisMonth).getMonth()+1) + '월'];

    var lastMonth_data_total = [];
    var lastMonth_data_hvac  = [];
    var lastMonth_data_com   = [];
    var lastMonth_data_light = [];
    var lastMonth_data_etc   = [];
    //
    var thisMonth_data_total = [];
    var thisMonth_data_hvac  = [];
    var thisMonth_data_com   = [];
    var thisMonth_data_light = [];
    var thisMonth_data_etc   = [];
    //
    // //query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(lastMonday) + '&day_to=' + dateFormatter(baseDay) + '&offset=9';
    lastMonth_query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(new Date(firstDayOfLastMonth)) + '&day_to=' + dateFormatter(new Date(lastDayOfLastMonth)) + '&offset=0';
    console.log(lastMonth_query);

    invokeOpenAPI(lastMonth_query, function (lastMonth_data) {
      console.log(lastMonth_data);

      thisMonth_query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(new Date(firstDayOfThisMonth)) + '&day_to=' + dateFormatter(shiftDate(baseDay,-1)) + '&offset=0';
      console.log(thisMonth_query);

        invokeOpenAPI(thisMonth_query, function (thisMonth_data) {
        console.log(thisMonth_data);

        for(var index = 0; index < lastMonth_data.length; index++){
          total = lastMonth_data[index].sum;
          hvac = accumulator(lastMonth_data[index], 'hvac');
          com  = accumulator(lastMonth_data[index], 'computer');
          light = accumulator(lastMonth_data[index], 'light');
          etc = total - (hvac + com + light);

          lastMonth_data_total.push(Number(total.toFixed(1)));
          lastMonth_data_hvac.push(Number(hvac.toFixed(1)));
          lastMonth_data_com.push(Number(com.toFixed(1)));
          lastMonth_data_light.push(Number(light.toFixed(1)));
          lastMonth_data_etc.push(Number(etc.toFixed(1)));
        }

          for(var index = 0; index < thisMonth_data.length; index++){
            total = thisMonth_data[index].sum;
            hvac = accumulator(thisMonth_data[index], 'hvac');
            com  = accumulator(thisMonth_data[index], 'computer');
            light = accumulator(thisMonth_data[index], 'light');
            etc = total - (hvac + com + light);

            thisMonth_data_total.push(Number(total.toFixed(1)));
            thisMonth_data_hvac.push(Number(hvac.toFixed(1)));
            thisMonth_data_com.push(Number(com.toFixed(1)));
            thisMonth_data_light.push(Number(light.toFixed(1)));
            thisMonth_data_etc.push(Number(etc.toFixed(1)));
        }
        savingRate_Month = arrayMean(thisMonth_data_total) / arrayMean(lastMonth_data_total);

        $('#marg_month_breakdown').highcharts({
          chart: {
              type: 'column'
          },
          title: {
            text: '지난달과 이번달 하루사용량 평균 (' + (Math.round(savingRate_Month*1000)/10 - 100) + '%)'
          },
          xAxis: {
              categories: xAxis_categories
          },
          yAxis: {
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
          // legend: {
          //     align: 'bottom',
          //     x: -30,
          //     verticalAlign: 'top',
          //     y: 25,
          //     floating: true,
          //     backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
          //     borderColor: '#CCC',
          //     borderWidth: 1,
          //     shadow: false
          // },
          tooltip: {
              headerFormat: '<b>{point.x}</b><br/>',
              pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
          },
          plotOptions: {
              column: {
                  stacking: 'normal',
                  dataLabels: {
                      enabled: true,
                      color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                      style: {
                          textShadow: '0 0 3px black'
                      }
                  }
              }
          },
          series: [{
              name: '냉난방',
              data: [arrayMean(lastMonth_data_hvac), arrayMean(thisMonth_data_hvac)]
          }, {
              name: '컴퓨터',
              data: [arrayMean(lastMonth_data_com), arrayMean(thisMonth_data_com)]
          }, {
              name: '전등',
              data: [arrayMean(lastMonth_data_light), arrayMean(thisMonth_data_light)]
          }, {
              name: '기타',
              data: [arrayMean(lastMonth_data_etc), arrayMean(thisMonth_data_etc)]
          }]
      });
    });
  });
});
