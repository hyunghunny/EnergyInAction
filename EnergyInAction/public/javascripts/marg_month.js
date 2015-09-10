$(function () {
  var firstDayOfThisMonth = new Date(baseDay).setDate(1);
  var firstDayOfLastMonth = new Date(baseDay).setMonth(baseDay.getMonth()-1, 1); // -1 means the last month
  var  lastDayOfLastMonth = shiftDate(firstDayOfThisMonth, -1);

  var xAxis_categories = [(new Date(firstDayOfLastMonth).getMonth()+1) + '월',
                          (new Date(firstDayOfThisMonth).getMonth()+1) + '월'];

  var lastMonth = [];
  var thisMonth = [];

  var lastMonth_loading = false;
  var thisMonth_loading = false;

  var lastMonth_total = [];
  var thisMonth_total = [];

  var savingRate_Month;

  lastMonth_query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(new Date(firstDayOfLastMonth)) + '&day_to=' + dateFormatter(new Date(lastDayOfLastMonth)) + '&offset=0';
  thisMonth_query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(new Date(firstDayOfThisMonth)) + '&day_to=' + dateFormatter(shiftDate(baseDay, 0)) + '&offset=0';

  console.log(lastMonth_query);
  console.log(thisMonth_query);

  invokeOpenAPI(lastMonth_query, lastMonthCB);
  invokeOpenAPI(thisMonth_query, thisMonthCB);

  function lastMonthCB(lastMonth_) {
    lastMonth = lastMonth_;
    lastMonth_loading = true;

    for(var index = 0; index < lastMonth.length; index++){
      total = lastMonth[index].sum;
      lastMonth_total.push(Number(total.toFixed(1)));
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
          thisMonth_total.push(Number(total.toFixed(1)));
      }
      if (lastMonth_loading){
        drawChart();
      }
  }

  function drawChart(){
    savingRate_Month = ((arrayMean(thisMonth_total) / arrayMean(lastMonth_total)));

    console.log(thisMonth);

    var sign="";
    if (savingRate_Month>=1) {
      sign="+";
    }else {
      sig="-";
    }

    var chart_month = $('#marg_month').highcharts({
      legend: {
        enabled: false
      },
      chart: {
          // type: 'column'
          type: 'bar'
      },
      title: {

          text: '[ 지난달과 이번달 (' +sign+ (savingRate_Month*100 - 100).toFixed(1) + '%) ]'
      },
      credits: {
          enabled: false
      },
      exporting: {
          enabled: false
      },
      xAxis: {
          categories: xAxis_categories
      },
      yAxis: {
          // min: 0,
          breaks: [{
                from: 0,
                to: 60,
                breakSize: 20
            }],
          title: {
              text: '하루 평균 사용량 (kW/h)'
          },
          stackLabels: {
              enabled: true,
              style: {
                  fontWeight: 'bold',
                  color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
              }
          }

      },
      tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
          column: {
              stacking: 'normal',
              dataLabels: {
                  enabled: false,
                  color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                  style: {
                      textShadow: '0 0 3px black'
                  }
              },
          },
          series: {
            colorByPoint: true
          }
      },
      series: [{
          //name: '전체사용량',
          data: [arrayMean(lastMonth_total), arrayMean(thisMonth_total)]
      }],
      colors: ['#D3D3D3','#63A8F6']
    });


  }
});
