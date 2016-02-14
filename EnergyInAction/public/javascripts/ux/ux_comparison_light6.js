// import data file
document.writeln("<script type='text/javascript' src='/javascripts/lib/environ_for6.js'></script>");

$(function () {

    // var today_total = [];
    // var today_hvac  = [];
    var today_com   = [];
    var today_light = [];
    // var today_etc   = [];

    var comparing_breakdownColors = ['#C4D5ED', '#F5C493', '#F4B8B8', '#d3bdd1']; //com, light, hvac, etc
    var today_breakdownColors = ['#497ecb', '#e3801c', '#dc5b5b', '#a889a5'];

    var fontSize_mainTitle = '25px';
    var fontSize_bar       = '15px';
    var fontSize_xAxis     = '15px';
    var fontSize_xSubTitle = '18px';

    // 1. Last Season
    if(weekDay_Indicator == 1){
      TARGET = UX_LAST_SEASON_WEEKDAY;
      xAxis_categories = ["평소", "오늘"]
    } else {
      TARGET = UX_LAST_SEASON_WEEKEND;
      xAxis_categories = ["평소", "오늘"]
    }

    // 2. Today
    invokeOpenAPI('api/labs/ux/energy/quarters.json', todayCB);

    function todayCB(today_) {
      today = today_;

      for(var index = 0; index < today.length; index++){
        // total = today[index].sum;
        // hvac = accumulator(today[index], 'hvac');
        com  = accumulator(today[index], 'computer');
        light = accumulator(today[index], 'light');
        // etc = total - (hvac + com + light);

        // today_total.push(Number(total.toFixed(2)));
        // today_hvac.push(Number(hvac.toFixed(2)));
        today_com.push(Number(com.toFixed(2)));
        today_light.push(Number(light.toFixed(2)));
        // today_etc.push(Number(etc.toFixed(2)));
      }
      drawChart();
    }

    // 3. draw chart
    function drawChart(){
      todayLength = today_light.length;
      // savingRateComparison = ((limitedArraySum(today_total,todayLength) / limitedArraySum(lastSeason_total,todayLength)));

      var lastSeason_maxFeederValue = Math.max(TARGET[todayLength].computer, TARGET[todayLength].light);
      var      today_maxFeederValue = Math.max(limitedArraySum(today_com, todayLength), limitedArraySum(today_light, todayLength));
      var yMax = Math.max(lastSeason_maxFeederValue, today_maxFeederValue);

      var lastRef = TARGET[todayLength].light;
      var thisUse = limitedArraySum(today_light, todayLength);
      var savingPoints = lastRef - thisUse;
      var signColorCode;

      // savingPoints sign & color
      var sign="";
      if (savingPoints.toFixed(0) == 0) {
        savingPoints = 0
        sign="";
        signColorCode = "gray";
      } else if(savingPoints > 0) {
        sign="+";
        signColorCode = "#3e721f";
      } else {
        sign="";
        signColorCode = "#a50a0a";
      }

      $('#ux_comparison_light').highcharts({
        chart: {
            type: 'column',
            marginTop: 43,
            backgroundColor: 'rgba(0, 0, 0, 0)'
        },
        title: {
           useHTML: true,
           text: sign+ savingPoints.toFixed(0) + '점',
           style: {
             color: signColorCode,
             fontWeight: 'bold',
             fontSize : fontSize_mainTitle,
            //  'background-color': '#F5F5F4',
             'border-radius': '6px',
            //  border: '4px solid #8E8989'
           }
       },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        xAxis: {
          title: {
              enabled: true,
              // text: '누적 사용량',
              style: {
                fontSize: fontSize_xSubTitle
              }
          },
          categories: xAxis_categories,
          labels: {
            style: {
              fontSize: fontSize_xAxis
            }
          },
          // lineColor: 'rgba(0, 0, 0, 0)',
          tickColor: 'rgba(0, 0, 0, 0)'
        },
        yAxis: {
            min: 0,
            max: yMax,
            labels: {
              enabled: false
            },
            gridLineColor: 'rgba(0, 0, 0, 0)',
            title: {
                enabled: false,
                text: '하루 평균 사용량 (kW/h)'
            },
            stackLabels: {
                enabled: false,
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
                        textShadow: '0 0 3px black', fontFamily: '\'Lato\', sans-serif', lineHeight: '18px', fontSize: fontSize_bar
                    },
                    format : '{point.y:.1f}'
                }
            }
        },
        series: [
          {
              name: '전등',
              data: [{y: lastRef, color: comparing_breakdownColors[1]}, {y: thisUse, color: today_breakdownColors[1]}]
          }
        ]
    });
  }
  $('#icon_light').append('<img src="./images/light2.png" width="60%"/>');
});
