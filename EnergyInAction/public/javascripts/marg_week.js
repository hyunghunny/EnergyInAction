$(function () {

  var margWeekObj = function () {

  /////////////////////////////////////////////////
  // 1. hours data process
  // 오늘 1시간 단위 누적 사용량 (높이) 표현을 위함
  /////////////////////////////////////////////////

  var baseDay_query  = '/api/labs/marg/energy/hours.json?base_time=' + baseTime;
  var comparingDay_query = '/api/labs/marg/energy/hours.json?base_time=' + lastWeekDayTime;

  var comparingDay_queryReturn = [];
  var today_queryReturn = [];

  var comparingDay_loading = false;
  var        today_loading = false;

  var comparingDay_plotData_forWeek = [];
  var today_plotData_forWeek = [];

  var comparingSum_forWeek = 0;
  var todaySum_forWeek     = 0;

  var currentState;
  var stateColors = ['#a50a0a','#f7cb00','#3e721f'];

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

  var lastWeek_queryReturn = [];
  var thisWeek_queryReturn = [];

  var lastWeek_loading = false;
  var thisWeek_loading = false;

  var thisWeek_plotData = [];
  var lastWeek_plotData = [];

  var lastWeek_query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(lastMonday) + '&day_to=' + dateFormatter(lastSunday) + '&offset=0';
  var thisWeek_query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(thisMonday) + '&day_to=' + dateFormatter(thisSunday) + '&offset=0';


  ///// functions /////
  function isAllLoaded(){
    return(lastWeek_loading && thisWeek_loading && comparingDay_loading && today_loading);
  }

  function comparingDayCB (comparingDay_) {
    comparingDay_queryReturn = comparingDay_;
    comparingDay_loading = true;

    for(var index = 0; index < comparingDay_queryReturn.length; index++){
      comparingDay_plotData_forWeek.push(Number(comparingDay_queryReturn[index].sum.toFixed(1)));
    }
    console.log("comparingDay_plotData_forWeek",comparingDay_plotData_forWeek);
    if (isAllLoaded()){
    // if (thisWeek_loading){
      drawChart();
    }
  }

  function todayCB(today_){
    today_queryReturn = today_;
    today_loading = true;

    for(var index = 0; index < today_queryReturn.length; index++){
      today_plotData_forWeek.push(Number(today_queryReturn[index].sum.toFixed(1)));
    }
    console.log("today_plotData_forWeek", today_plotData_forWeek);
    if (isAllLoaded()){
    // if (thisWeek_loading){
      drawChart();
    }
  }

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
      if (isAllLoaded()){
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
          // thisWeek_plotData.push({y: Number(total.toFixed(1)),
          //                      color: ''});
          thisWeek_plotData.push(null);
        } else if(total == 0) {
          thisWeek_plotData.push(null);
        } else {
          thisWeek_plotData.push(Number(total.toFixed(1)));
        }
      }
      if (isAllLoaded()){
      // if (thisWeek_loading){
        drawChart();
      }
  }


  ///////////////////////
  // 3. draw chart
  ///////////////////////
  function drawChart() {
    console.log(today_queryReturn);
    console.log("today_queryReturn.length", today_queryReturn.length);

    comparingSum_forWeek = limitedArraySum(comparingDay_plotData_forWeek, today_queryReturn.length);
    comparingSum_forWeek = Number(comparingSum_forWeek.toFixed(1));

    todaySum_forWeek = limitedArraySum(today_plotData_forWeek, today_queryReturn.length);
    todaySum_forWeek = Number(todaySum_forWeek.toFixed(1));

    var savingRate_Day = todaySum_forWeek / comparingSum_forWeek;
    console.log("savingRate from week",savingRate_Day);

    if(savingRate_Day > 1.20) {
       currentState = 0;
    } else if ( savingRate_Day > 1.00) {
       currentState = 1;
    } else {
       currentState = 2;
    }


    // thisWeek_plotData[baseDay.getDay()-1].color = stateColors[currentState];
    // console.log("*********test: ",thisWeek_plotData);
    // console.log("*********test: ",thisWeek_plotData[0].color);

    var comparingDay_current_plotData = [null,null,null,null,null,null,null]
    var today_current_plotData        = [null,null,null,null,null,null,null]

    comparingDay_current_plotData[baseDay.getDay()-1] = comparingSum_forWeek;
    today_current_plotData[baseDay.getDay()-1] = todaySum_forWeek;
    lastWeek_plotData[baseDay.getDay()-1] = lastWeek_plotData[baseDay.getDay()-1] - comparingSum_forWeek;

    console.log("### comparingDay_current_plotData", comparingDay_current_plotData);
    console.log("### today_current_plotData", today_current_plotData);
    console.log("### thisWeek_plotData", lastWeek_plotData);
    console.log("### thisWeek_plotData", thisWeek_plotData);

    // console.log(lastWeek_plotData[baseDay.getDay()-1]);
    // console.log(lastWeek_plotData);
    // console.log("thisWeek_plotData",thisWeek_plotData);
    //
    // console.log("length from week: ",today_queryReturn.length);
    // // console.log("todaySum_forWeek", todaySum_forWeek);
    // console.log("comparingSum_forWeek", comparingSum_forWeek);

    var tickStart = 1;
    var tickEnd = 3;
    var rect = null;
    function drawRect(chart){
        if (rect){
            rect.element.remove();
        }
        var xAxis = chart.xAxis[0];
        var pixStart = 0;
        day = baseDay.getDay();
        if(day==0){
          pixStart = 843;
        }else if (day==1) {
          pixStart = 74;
        }else if (day==2) {
          pixStart = 202;
        }else if (day==3) {
          pixStart = 330;
        }else if (day==4) {
          pixStart = 459;
        }else if (day==5) {
          pixStart = 587;
        }else {
          pixStart = 715;
        }
        rect = chart.renderer.rect(pixStart, chart.chartHeight - xAxis.bottom+1, 127 , 70, 00)
         .attr({
            'stroke-width': 0,
            stroke: '#f9f3e8',
            fill: '#f9f3e8',
            zIndex: 3
         })
         .add();
    }

    $('#marg_week').highcharts({
        chart: {
            type: 'column',
            // events: {
            //   load: function() {
            //     drawRect(this);
            //   },
            //   redraw: function() {
            //     drawRect(this);
            //   }
            // }
        },
        title: {
           useHTML: true,
           text: '[ 지난주와 이번주 ]',
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
                color: '#f9f3e8'
                // borderColor: '#f9f3e8', //'rgba(50, 50, 213, .2)'
                // borderWidth: 3
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
              stack: 'lastWeek',
              //color: Highcharts.getOptions().colors[0]
              color: '#e6deda'
          },
          {
              name: '지난주',
              data: comparingDay_current_plotData,
              stack: 'lastWeek',
              linkedTo: ':previous',
              color: '#7f8c91',
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
              stack: 'thisWeek',
              //color: Highcharts.getOptions().colors[1]
              color: '#d8ccc6',
          },
          {
              name: '이번주',
              data: today_current_plotData,
              stack: 'thisWeek',
              //color: Highcharts.getOptions().colors[1]
              linkedTo: ':previous',
              color: stateColors[currentState],
              dataLabels: {
                  enabled: true,
                  color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                  style: {
                      textShadow: '0 0 3px black'
                  }
              }
          }
        ]
        });
      }

  invokeOpenAPI(comparingDay_query, comparingDayCB);
  invokeOpenAPI(baseDay_query, todayCB);

  invokeOpenAPI(lastWeek_query, lastWeekCB);
  invokeOpenAPI(thisWeek_query, thisWeekCB);

  }();

});
