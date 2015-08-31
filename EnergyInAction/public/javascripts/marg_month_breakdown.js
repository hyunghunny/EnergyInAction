$(function () {
    var firstDayOfThisMonth = new Date(baseDay).setDate(1);
    var firstDayOfLastMonth = new Date(baseDay).setMonth(baseDay.getMonth()-1, 1); // -1 means the last month
    var  lastDayOfLastMonth = shiftDate(firstDayOfThisMonth, -1);

    var xAxis_categories = [(new Date(firstDayOfThisMonth).getMonth()) + '월',
                            (new Date(firstDayOfThisMonth).getMonth()+1) + '월'];

    var lastMonth = [];
    var thisMonth = [];

    var lastMonth_loading = false;
    var thisMonth_loading = false;

    var lastMonth_total = [];
    var lastMonth_hvac  = [];
    var lastMonth_com   = [];
    var lastMonth_light = [];
    var lastMonth_etc   = [];
    //
    var thisMonth_total = [];
    var thisMonth_hvac  = [];
    var thisMonth_com   = [];
    var thisMonth_light = [];
    var thisMonth_etc   = [];
    //
    var savingRate_Month;

    lastMonth_query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(new Date(firstDayOfLastMonth)) + '&day_to=' + dateFormatter(new Date(lastDayOfLastMonth)) + '&offset=0';
    thisMonth_query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(new Date(firstDayOfThisMonth)) + '&day_to=' + dateFormatter(shiftDate(baseDay,0)) + '&offset=0';

    invokeOpenAPI(lastMonth_query, lastMonthCB);
    invokeOpenAPI(thisMonth_query, thisMonthCB);

    function lastMonthCB(lastMonth_) {
      lastMonth = lastMonth_;
      lastMonth_loading = true;

      for(var index = 0; index < lastMonth.length; index++){
        total = lastMonth[index].sum;
        hvac = accumulator(lastMonth[index], 'hvac');
        com  = accumulator(lastMonth[index], 'computer');
        light = accumulator(lastMonth[index], 'light');
        etc = total - (hvac + com + light);

        lastMonth_total.push(Number(total.toFixed(1)));
        lastMonth_hvac.push(Number(hvac.toFixed(1)));
        lastMonth_com.push(Number(com.toFixed(1)));
        lastMonth_light.push(Number(light.toFixed(1)));
        lastMonth_etc.push(Number(etc.toFixed(1)));
      }
      if (thisMonth_loading){
        drawChart();
      }
    }

    function thisMonthCB(thisMonth_) {
      thisMonth = thisMonth_;
      thisMonth_loading = true;

      for(var index = 0; index < thisMonth.length; index++){
        total = thisMonth[index].sum;
        hvac = accumulator(thisMonth[index], 'hvac');
        com  = accumulator(thisMonth[index], 'computer');
        light = accumulator(thisMonth[index], 'light');
        etc = total - (hvac + com + light);

        thisMonth_total.push(Number(total.toFixed(1)));
        thisMonth_hvac.push(Number(hvac.toFixed(1)));
        thisMonth_com.push(Number(com.toFixed(1)));
        thisMonth_light.push(Number(light.toFixed(1)));
        thisMonth_etc.push(Number(etc.toFixed(1)));
    }
        if (lastMonth_loading){
          drawChart();
        }
    }

    function drawChart(){
      savingRate_Month = ((arrayMean(thisMonth_total) / arrayMean(lastMonth_total)));

      $('#marg_month_breakdown').highcharts({
        chart: {
            type: 'column'
        },
        title: {
          text: '지난달과 이번달 하루사용량 평균 (' + (savingRate_Month*100 - 100).toFixed(1) + '%)'
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
            data: [arrayMean(lastMonth_hvac), arrayMean(thisMonth_hvac)]
        }, {
            name: '컴퓨터',
            data: [arrayMean(lastMonth_com), arrayMean(thisMonth_com)]
        }, {
            name: '전등',
            data: [arrayMean(lastMonth_light), arrayMean(thisMonth_light)]
        }, {
            name: '기타',
            data: [arrayMean(lastMonth_etc), arrayMean(thisMonth_etc)]
        }]
    });
  }
});
