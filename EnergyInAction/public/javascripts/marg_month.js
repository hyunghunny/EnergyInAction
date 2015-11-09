$(function () {
  var firstDayOfThisMonth = new Date(baseDay).setDate(1);
  var firstDayOfLastMonth = new Date(baseDay).setMonth(baseDay.getMonth()-1, 1); // -1 means the last month
  var  lastDayOfLastMonth = shiftDate(firstDayOfThisMonth, -1);


var firstDayofLastYear = shiftDate(firstDayOfThisMonth, -365)
var lastDayofLastYear = shiftDate(firstDayofLastYear, 30)

  console.log(firstDayofLastYear);
  console.log(lastDayofLastYear);

  var xAxis_categories = [(new Date(firstDayOfLastMonth).getMonth()+1) + '월',
                          (new Date(firstDayOfThisMonth).getMonth()+1) + '월'];
  var lastMonth = [];
  var thisMonth = [];

  var lastMonth_loading = false;
  var thisMonth_loading = false;

  var lastMonth_total = [];
  var thisMonth_total = [];

  var savingRate_Month;

  // lastMonth_query = 'api/labs/ux/energy/daily.json?day_from=' + dateFormatter(new Date(firstDayofLastYear)) + '&day_to=' + dateFormatter(new Date(lastDayofLastYear)) + '&offset=0';
  // thisMonth_query = 'api/labs/ux/energy/daily.json?day_from=' + dateFormatter(new Date(firstDayOfThisMonth)) + '&day_to=' + dateFormatter(shiftDate(baseDay, 0)) + '&offset=0';

  lastMonth_query = 'api/labs/marg/energy/daily.json?day_from=' + "2014-09-01" + '&day_to=' + "2014-09-30" + '&offset=0';
  thisMonth_query = 'api/labs/marg/energy/daily.json?day_from=' + "2015-09-01" + '&day_to=' + "2015-09-30" + '&offset=0';

  console.log(lastMonth_query);
  console.log(thisMonth_query);

  // if(baseDay.getDate() == 1){
  //   notEnoughData();
  // } else {
  //   invokeOpenAPI(lastMonth_query, lastMonthCB);
  //   invokeOpenAPI(thisMonth_query, thisMonthCB);
  // }
  //
  // function notEnoughData(){
  //   var divTag = "<div><b>NOTICE</b><br>데이터가 충분하지 않습니다.<br>Not enough data</div>"
  //   $('#marg_month').html(divTag);
  // }

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

    //console.log(thisMonth);

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
          type: 'column'
          // type: 'bar'
      },
      title: {
         useHTML: true,
         text: '[ 월 비교 (' +sign+ (savingRate_Month*100 - 100).toFixed(1) + '%) ]',
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
      exporting: {
          enabled: false
      },
      xAxis: {
          categories: xAxis_categories
      },
      yAxis: {
          // min: 0.00001,
          // type: 'logarithmic',
          type: 'bar',
          // minorTickInterval: '0.0001',
          // breaks: [{
          //       from: 0,
          //       to: 60,
          //       breakSize: 20
          //   }],
          opposite: true,
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
          // ,
          // labels: {
          //   formatter: function() {
          //       if(this.value === 0.00001){
          //           return 0;
          //       } else {
          //           return this.value;
          //       }
          //   }
          // }

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
          // bar: {
          //   dataLabels: {
          //     enabled: true
          //   }
          // },
          series: {
            colorByPoint: true,
            colors: ['#bed1d4','#9ab0b4']
          }
      },
      series: [{
          //name: '전체사용량',
          data: [arrayMean(lastMonth_total), arrayMean(thisMonth_total)],
          pointWidth: 120
      }]
    });


  }
});
