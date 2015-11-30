

$(function () {
  // marg_day_breakdown();
  var timer = setInterval( marg_day_breakdown, 10000);
  });


function marg_day_breakdown() {

  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var counter = Math.floor((hours*60 + minutes)/15) % 2;

    baseDay_query  = '/api/labs/marg/energy/hours.json?base_time=' + baseTime;
    comparingDay_query = '/api/labs/marg/energy/hours.json?base_time=' + lastWeekDayTime; // 지난 주 같은 요일로 설정

    console.log(baseDay_query);
    console.log(comparingDay_query);

    var comparingDay_queryReturn = [];
    var today_queryReturn = [];

    var comparingDay_loading = false;
    var        today_loading = false;

    var xAxis_categories = [];
    var comparingDay_plotData = [];
    var today_plotData = [];

    var comparingSum = 0;
    var todaySum     = 0;

    var currentState;
    var stateColors = ['#a50a0a','#f7cb00','#3e721f'];
    var comparing_breakdownColors = ['#b3d5c8', '#f5e0b3', '#e8c2c1', '#d3bdd1']; //com, light, hvac, etc
    var today_breakdownColors = ['#7db19f', '#eecf8d', '#f3a3a1', '#a889a5'];

    var today_total = [];
    var today_hvac  = [];
    var today_com   = [];
    var today_light = [];
    var today_etc   = [];

    var comparingDay_hvac   = [];
    var comparingDay_com   = [];
    var comparingDay_light   = [];
    var comparingDay_etc   = [];

    // console.log("baseDay_query", baseDay_query);
    // console.log("comparingDay_query", comparingDay_query);

    invokeOpenAPI(comparingDay_query, comparingDayCB);
    invokeOpenAPI(baseDay_query, todayCB);

    function todayCB(today_){
      today_queryReturn = today_;
      today_loading = true;

      for(var index = 0; index < today_queryReturn.length; index++){
        total = today_queryReturn[index].sum;
        hvac = accumulator(today_queryReturn[index], 'hvac');
        com  = accumulator(today_queryReturn[index], 'computer');
        light = accumulator(today_queryReturn[index], 'light');
        etc = total - (hvac + com + light);

        today_total.push(Number(total.toFixed(1)));
        today_hvac.push(Number(hvac.toFixed(3)));//현재 hvac값이 낮아 fixed(1)하면 모두 0으로 나와 week과 숫자 불일치, 추후 hvac사용량 높아지면 다시 수정
        today_com.push(Number(com.toFixed(1)));
        today_light.push(Number(light.toFixed(1)));
        today_etc.push(Number(etc.toFixed(1)));

        today_plotData.push(Number(today_queryReturn[index].sum.toFixed(1)));
      }
      if (comparingDay_loading) {
        drawChart();
      }
    }

    function comparingDayCB (comparingDay_) {
      comparingDay_queryReturn = comparingDay_;
      comparingDay_loading = true;

      for(var index = 0; index < comparingDay_queryReturn.length; index++){
        comparingDay_plotData.push(Number(comparingDay_queryReturn[index].sum.toFixed(1)));
        xAxis_categories.push(new Date(comparingDay_queryReturn[index].dateTo).getHours() + '시');


                hvac = accumulator(comparingDay_queryReturn[index], 'hvac');
                com  = accumulator(comparingDay_queryReturn[index], 'computer');
                light = accumulator(comparingDay_queryReturn[index], 'light');
                etc = total - (hvac + com + light);
                comparingDay_hvac.push(Number(hvac.toFixed(3))); //현재 hvac값이 낮아 fixed(1)하면 모두 0으로 나와 week과 숫자 불일치, 추후 hvac사용량 높아지면 다시 수정
                comparingDay_com.push(Number(com.toFixed(1)));
                comparingDay_light.push(Number(light.toFixed(1)));
                comparingDay_etc.push(Number(etc.toFixed(1)));
      }
      if (today_loading) {
        drawChart();
      }
    }

    // function hourlyMean(data){
    //   var result = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    //   denominator = data.length/24;
    //   // console.log(denominator);
    //   // var tmp = 0;
    //   for(var index=0; index < data.length; index++){
    //     // if(index%24==1) {
    //     //   console.log(data[index]);
    //     //   tmp = tmp + data[index];
    //     // }
    //     result[index % 24] = result[index % 24] + data[index];
    //   }
    //   // console.log(tmp, result);
    //
    //   for(var index=0; index < result.length; index++){
    //     result[index] = Number((result[index] / denominator).toFixed(1));
    //   }
    //   // console.log(result);
    //   return(result);
    // }


    function drawChart() {
      console.log(comparingDay_queryReturn);
      console.log(today_queryReturn);

      // weekDay_hourlyMean = hourlyMean(lastMonthWeekDay_data);
      // weekEnd_hourlyMean = hourlyMean(lastMonthWeekEnd_data);

      // console.log("weekDay_hourlyMean", weekDay_hourlyMean);
      // console.log("weekEnd_hourlyMean", weekEnd_hourlyMean);

      comparingSum = limitedArraySum(comparingDay_plotData, today_queryReturn.length);
      todaySum     = limitedArraySum(today_plotData, today_queryReturn.length);

      var savingRate_Day = todaySum / comparingSum;

      if(savingRate_Day > 1.20) {
         currentState = 0;
      } else if ( savingRate_Day > 1.00) {
         currentState = 1;
      } else {
         currentState = 2;
      }

      if(weekDay_Indicator){
        // var vsData = weekDay_hourlyMean;
      } else {
        // var vsData = weekEnd_hourlyMean;
      }

      var legend_x = 50;
      var legend_y = 47;

      console.log('currentState: ', currentState);
      console.log('colorcode: ', stateColors[currentState-1]);

      console.log('*************counter:',counter);
      if (Math.floor(seconds/10%3) == 1) {
        // counter=1;
        $('#marg_day_breakdown').highcharts({
              chart: {
                  backgroundColor: "#f9f3e8"
              },
              title: {
                  // text: '어제와 오늘 (' + comparingDay_queryReturn[0].location + '호 - 사용량 전체)'
                  // text: '[ 어제와 오늘 ]'
                  text: null
              },
              credits: {
                  enabled: false
              },
              legend: {
                  layout: 'vertical',
                  align: 'left',
                  verticalAlign: 'top',
                  // x: legend_x+(today_queryReturn.length - 1)*24,
                  x:777,
                  y: 305,
                  floating: true,
                  borderWidth: 1,
                  //backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                  backgroundColor: 'rgba(255, 255, 255, .8)',
                  borderColor: '#FFFFFF'
              },
              exporting: {
                  enabled: false
              },

              xAxis: {
                  categories: xAxis_categories
                  // plotBands: [{ // visualize so far
                  //     from: -0.5,
                  //     to: today_queryReturn.length - 1,
                  //     color: 'rgba(68, 170, 213, .1)'
                  // }]
              },
              yAxis: {
                maxPadding: 0.1,
                  title: {
                      text: '전력 사용량 (kW/h)'
                  }
              },
              plotOptions: {
                  line: {
                      dataLabels: {
                          enabled: true
                      },
                      enableMouseTracking: false
                  },
                  area: { /* or spline, area, series, areaspline etc.*/
                      marker: {
                         enabled: false
                      }
                  }
              },

              series: [{
                  //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                  name: '일주 전 냉난방 사용 패턴',
                  data: comparingDay_hvac,
                  // data: vsData,
                  color: comparing_breakdownColors[2],
                  lineWidth: 1,
                  // linkedTo: ':previous',
                  zIndex: 0
              },{
                  //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                  name: '일주 전 이 시간: ' + limitedArraySum(comparingDay_hvac, today_queryReturn.length).toFixed(1) + ' kW/h',
                  data: comparingDay_hvac.slice(0,today_plotData.length),
                  type: 'area',
                  lineWidth: 0,
                  color: comparing_breakdownColors[2],//'#848174',
                  fillOpacity: 1,
                  zIndex: 0
              },{
                  name: '오늘 이 시간: ' + limitedArraySum(today_hvac, today_queryReturn.length).toFixed(1) + ' kW/h',
                  data: today_hvac,
                  // data: vsData,
                  // color: stateColors[currentState],
                  color: today_breakdownColors[2],
                  type: 'area',
                  lineWidth: 0,
                  fillOpacity: 0.5,
                  // linkedTo: ':previous',
                  zIndex: 0
              }, {
                  data: today_hvac.slice(0,today_plotData.length),
                  // data: vsData,
                  // color: stateColors[currentState],
                  color: today_breakdownColors[2],
                  lineWidth: 1,
                  linkedTo: ':previous',
                  zIndex: 0
              }]
          });
      }else if (Math.floor(seconds/10%3) == 2) { //counter==1
        // counter++;
        $('#marg_day_breakdown').highcharts({
              chart: {
                  backgroundColor: "#f9f3e8"
              },
              title: {
                  // text: '어제와 오늘 (' + comparingDay_queryReturn[0].location + '호 - 사용량 전체)'
                  // text: '[ 어제와 오늘 ]'
                  text: null
              },
              credits: {
                  enabled: false
              },
              legend: {
                  layout: 'vertical',
                  align: 'left',
                  verticalAlign: 'top',
                  // x: legend_x+(today_queryReturn.length - 1)*24,
                  x:777,
                  y: 305,
                  floating: true,
                  borderWidth: 1,
                  //backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                  backgroundColor: 'rgba(255, 255, 255, .8)',
                  borderColor: '#FFFFFF'
              },
              exporting: {
                  enabled: false
              },

              xAxis: {
                  categories: xAxis_categories
                  // plotBands: [{ // visualize so far
                  //     from: -0.5,
                  //     to: today_queryReturn.length - 1,
                  //     color: 'rgba(68, 170, 213, .1)'
                  // }]
              },
              yAxis: {
                maxPadding: 0.1,
                  title: {
                      text: '전력 사용량 (kW/h)'
                  }
              },
              plotOptions: {
                  line: {
                      dataLabels: {
                          enabled: true
                      },
                      enableMouseTracking: false
                  },
                  area: { /* or spline, area, series, areaspline etc.*/
                      marker: {
                         enabled: false
                      }
                  }
              },

              series: [{
                  //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                  name: '일주 전 컴퓨터 사용 패턴',
                  data: comparingDay_com,
                  // data: vsData,
                  color: comparing_breakdownColors[0],
                  lineWidth: 1,
                  // linkedTo: ':previous',
                  zIndex: 0
              },{
                  //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                  name: '일주 전 이 시간: ' + limitedArraySum(comparingDay_com, today_queryReturn.length).toFixed(1) + ' kW/h',
                  data: comparingDay_com.slice(0,today_plotData.length),
                  type: 'area',
                  lineWidth: 0,
                  color: comparing_breakdownColors[0],//'#848174',
                  fillOpacity: 0.7,
                  zIndex: 0
              },{
                  name: '오늘 이 시간: ' + limitedArraySum(today_com, today_queryReturn.length).toFixed(1) + ' kW/h',
                  data: today_com,
                  // data: vsData,
                  // color: stateColors[currentState],
                  type: 'area',
                  color: today_breakdownColors[0],
                  fillOpacity: 0.7,
                  zIndex: 0
              }, {
                  data: today_com.slice(0,today_plotData.length),
                  // data: vsData,
                  // color: stateColors[currentState],
                  color: today_breakdownColors[0],
                  lineWidth: 1,
                  linkedTo: ':previous',
                  zIndex: 0
              }]
          });
      } else {//counter==0
        // counter++;
        $('#marg_day_breakdown').highcharts({
              chart: {
                  backgroundColor: "#f9f3e8"
              },
              title: {
                  // text: '어제와 오늘 (' + comparingDay_queryReturn[0].location + '호 - 사용량 전체)'
                  // text: '[ 어제와 오늘 ]'
                  text: null
              },
              credits: {
                  enabled: false
              },
              legend: {
                  layout: 'vertical',
                  align: 'left',
                  verticalAlign: 'top',
                  // x: legend_x+(today_queryReturn.length - 1)*24,
                  x:770,
                  y: 305,
                  floating: true,
                  borderWidth: 1,
                  //backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                  backgroundColor: 'rgba(255, 255, 255, .8)',
                  borderColor: '#FFFFFF'
              },
              exporting: {
                  enabled: false
              },

              xAxis: {
                  categories: xAxis_categories
                  // plotBands: [{ // visualize so far
                  //     from: -0.5,
                  //     to: today_queryReturn.length - 1,
                  //     color: 'rgba(68, 170, 213, .1)'
                  // }]
              },
              yAxis: {
                maxPadding: 0.1,
                  title: {
                      text: '전력 사용량 (kW/h)'
                  }
              },
              plotOptions: {
                  line: {
                      dataLabels: {
                          enabled: true
                      },
                      enableMouseTracking: false
                  },
                  area: { /* or spline, area, series, areaspline etc.*/
                      marker: {
                         enabled: false
                      }
                  }
              },

              series: [{
                  //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                  name: '일주 전 전등 사용 패턴',
                  data: comparingDay_light,
                  // data: vsData,
                  color: comparing_breakdownColors[1],
                  lineWidth: 1,
                  // linkedTo: ':previous',
                  zIndex: 0
              },{
                  //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                  name: '일주 전 이 시간: ' + limitedArraySum(comparingDay_light, today_queryReturn.length).toFixed(1) + ' kW/h',
                  data: comparingDay_light.slice(0,today_plotData.length),
                  type: 'area',
                  lineWidth: 0,
                  color: comparing_breakdownColors[1],//'#848174',
                  fillOpacity: 1,
                  zIndex: 0
              },{
                  name: '오늘 이 시간: ' + limitedArraySum(today_light, today_queryReturn.length).toFixed(1) + ' kW/h',
                  data: today_light,
                  // data: vsData,
                  // color: stateColors[currentState],
                  type: 'area',
                  color: today_breakdownColors[1],
                  fillOpacity: 0.7,
                  // linkedTo: ':previous',
                  zIndex: 0
              }, {
                  data: today_light.slice(0,today_plotData.length),
                  // data: vsData,
                  // color: stateColors[currentState],
                  color: today_breakdownColors[1],
                  lineWidth: 1,
                  linkedTo: ':previous',
                  zIndex: 0
              }]
          });
      }
      // else {
      //   counter=1;
      //   $('#marg_day_breakdown').highcharts({
      //         chart: {
      //             backgroundColor: "#f9f3e8"
      //         },
      //         title: {
      //             // text: '어제와 오늘 (' + comparingDay_queryReturn[0].location + '호 - 사용량 전체)'
      //             // text: '[ 어제와 오늘 ]'
      //             text: null
      //         },
      //         credits: {
      //             enabled: false
      //         },
      //         legend: {
      //             layout: 'vertical',
      //             align: 'left',
      //             verticalAlign: 'top',
      //             // x: legend_x+(today_queryReturn.length - 1)*24,
      //             x:745,
      //             y: 286,
      //             floating: true,
      //             borderWidth: 1,
      //             //backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
      //             backgroundColor: 'rgba(255, 255, 255, .8)',
      //             borderColor: '#FFFFFF'
      //         },
      //         exporting: {
      //             enabled: false
      //         },
      //
      //         xAxis: {
      //             categories: xAxis_categories
      //             // plotBands: [{ // visualize so far
      //             //     from: -0.5,
      //             //     to: today_queryReturn.length - 1,
      //             //     color: 'rgba(68, 170, 213, .1)'
      //             // }]
      //         },
      //         yAxis: {
      //           maxPadding: 0.1,
      //             title: {
      //                 text: '전력 사용량 (kW/h)'
      //             }
      //         },
      //         plotOptions: {
      //             line: {
      //                 dataLabels: {
      //                     enabled: true
      //                 },
      //                 enableMouseTracking: false
      //             },
      //             area: { /* or spline, area, series, areaspline etc.*/
      //                 marker: {
      //                    enabled: false
      //                 }
      //             }
      //         },
      //
      //         series: [{
      //             //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
      //             name: '일주 전 기타 사용 패턴',
      //             data: comparingDay_etc,
      //             // data: vsData,
      //             color: comparing_breakdownColors[3],
      //             lineWidth: 1,
      //             // linkedTo: ':previous',
      //             zIndex: 0
      //         },{
      //             //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
      //             name: '일주 전 이 시간: ' + limitedArraySum(comparingDay_etc, today_queryReturn.length).toFixed(1) + ' kW/h',
      //             data: comparingDay_etc.slice(0,today_plotData.length),
      //             type: 'area',
      //             lineWidth: 0,
      //             color: comparing_breakdownColors[3],//'#848174',
      //             fillOpacity: 0.7,
      //             zIndex: 0
      //         },{
      //             name: '오늘 이 시간: ' + limitedArraySum(today_etc, today_queryReturn.length).toFixed(1) + ' kW/h',
      //             data: today_etc,
      //             // data: vsData,
      //             // color: stateColors[currentState],
      //             type: 'area',
      //             color: today_breakdownColors[3],
      //             fillOpacity: 0.7,
      //             // linkedTo: ':previous',
      //             zIndex: 0
      //         }, {
      //             data: today_etc.slice(0,today_plotData.length),
      //             // data: vsData,
      //             // color: stateColors[currentState],
      //             color: today_breakdownColors[3],
      //             lineWidth: 1,
      //             linkedTo: ':previous',
      //             zIndex: 0
      //         }]
      //     });
      // }

      var day = baseDay.getDay();
      $('#arrow').empty();
      if(day==0){
        $('#arrow').prepend('<img id="faces" src="./images/arrow_depth_sun.png" />');
      }else if (day==1) {
        $('#arrow').prepend('<img id="faces" src="./images/arrow_depth_mon.png" />');
      }else if (day==2) {
        $('#arrow').prepend('<img id="faces" src="./images/arrow_depth_tue.png" />');
      }else if (day==3) {
        $('#arrow').prepend('<img id="faces" src="./images/arrow_depth_wed.png" />');
      }else if (day==4) {
        $('#arrow').prepend('<img id="faces" src="./images/arrow_depth_thu.png" />');
      }else if (day==5) {
        $('#arrow').prepend('<img id="faces" src="./images/arrow_depth_fri.png" />');
      }else {
        $('#arrow').prepend('<img id="faces" src="./images/arrow_depth_sat.png" />');
      }

      // var breakdown_info_percent = 0;
      // var breakdown_info_title;
      // $('#breakdown_info').empty();
      // if(Math.floor(seconds/10%3) == 1){
      //   console.log('#######info:',Math.floor(seconds/10%3));
      //   breakdown_info_percent = (limitedArraySum(today_hvac, today_queryReturn.length)/limitedArraySum(comparingDay_hvac, today_queryReturn.length)).toFixed(1);
      //   breakdown_info_title=$("<div>").attr("id","breakdown_info_title").css({"font-size": "19px", "display" : "inline"}).text('냉난방<br />어제 이시간 대비<br>'+breakdown_info_percent+'% 사용중');
      //   $('#breakdown_info').append('<img id="faces" src="./images/hvac.png" />').append(breakdown_info_title);
      // }else if (Math.floor(seconds/10%3)==2) {
      //   console.log('#######info:',Math.floor(seconds/10%3));
      //   breakdown_info_percent = limitedArraySum(today_com, today_queryReturn.length)/limitedArraySum(comparingDay_com, today_queryReturn.length);
      //   breakdown_info_percent.toFixed(1);
      //   breakdown_info_title=$("<div>").attr("id","breakdown_info_title").css({"font-size": "19px", "display" : "inline"}).text('컴퓨터<br />어제 이시간 대비<br>'+breakdown_info_percent+'% 사용중');
      //   $('#breakdown_info').append('<img id="faces" src="./images/computer.png" />').append(breakdown_info_title);
      // }else {
      //   console.log('#######info:',Math.floor(seconds/10%3));
      //   breakdown_info_percent = limitedArraySum(today_light, today_queryReturn.length)/limitedArraySum(comparingDay_light, today_queryReturn.length);
      //   breakdown_info_percent.toFixed(1);
      //   breakdown_info_title=$("<div>").attr("id","breakdown_info_title").css({"font-size": "19px", "display" : "inline"}).text('전등<br /> 어제 이시간 대비'+breakdown_info_percent+'% 사용중');
      //   $('#breakdown_info').append('<img id="faces" src="./images/light.png" />').append(breakdown_info_title);
      // }

    }//drawChart()


}
