var counter = 2;
$(function () {
  marg_day_breakdown();
  var timer = setInterval( marg_day_breakdown, 3000);
  });


function marg_day_breakdown() {

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
    var breakdownColors = []; //hvac, com, light, etc

    var today_total = [];
    var today_hvac  = [];
    var today_com   = [];
    var today_light = [];
    var today_etc   = [];


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
        today_hvac.push(Number(hvac)); //현재 hvac값이 낮아 fixed(1)하면 모두 0으로 나와 week과 숫자 불일치, 추후 hvac사용량 높아지면 다시 수정
        today_com.push(Number(com.toFixed(1)));
        today_light.push(Number(light.toFixed(1)));
        today_etc.push(Number(etc.toFixed(1)));
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
      console.log('#########hvac: ',today_hvac);
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
      if (counter==1) {
        counter++;
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
                  x:745,
                  y: 205,
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
                  name: '일주 전 사용 패턴',
                  data: comparingDay_plotData,
                  // data: vsData,
                  color: '#848174',
                  lineWidth: 1,
                  // linkedTo: ':previous',
                  zIndex: 0
              },{
                  //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                  name: '일주 전 이 시간: ' + comparingSum.toFixed(1) + ' kW/h',
                  data: comparingDay_plotData.slice(0,today_plotData.length),
                  type: 'area',
                  lineWidth: 0,
                  color: '#7f8c91',//'#848174',
                  fillOpacity: 0.7,
                  zIndex: 0
              }, {
                  //name: '오늘: ' + (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ')',
                  name: '오늘 이 시간: ' + todaySum.toFixed(1) + ' kW/h (' + ((todaySum/comparingSum)*100).toFixed(1) +  '%)',
                  data: today_plotData,
                  type: 'area',
                  lineWidth: 0,
                  color: stateColors[currentState],
                  // color: Highcharts.getOptions().colors[9],
                  fillOpacity: 0.5,
                  zIndex: 0
              }, {
                  //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                  data: today_plotData,
                  // data: vsData,
                  color: stateColors[currentState],
                  linkedTo: ':previous',
                  zIndex: 0
              }, {
                  name: '냉난방: ' + limitedArraySum(today_hvac, today_queryReturn.length).toFixed(1) + ' kW/h',
                  data: today_hvac,
                  // data: vsData,
                  // color: stateColors[currentState],
                  color: Highcharts.getOptions().colors[0],
                  // linkedTo: ':previous',
                  zIndex: 0
              }, {
                  name: '컴퓨터: ' + limitedArraySum(today_com, today_queryReturn.length).toFixed(1) + ' kW/h',
                  data: today_com,
                  // data: vsData,
                  // color: stateColors[currentState],
                  color: Highcharts.getOptions().colors[1],
                  // linkedTo: ':previous',
                  zIndex: 0
              }, {
                  name: '전등: ' + limitedArraySum(today_light, today_queryReturn.length).toFixed(1) + ' kW/h',
                  data: today_light,
                  // data: vsData,
                  // color: stateColors[currentState],
                  color: Highcharts.getOptions().colors[2],
                  // linkedTo: ':previous',
                  zIndex: 0
              }, {
                  name: '기타: ' + limitedArraySum(today_etc, today_queryReturn.length).toFixed(1) + ' kW/h',
                  data: today_etc,
                  // data: vsData,
                  // color: stateColors[currentState],
                  color: Highcharts.getOptions().colors[3],
                  // linkedTo: ':previous',
                  zIndex: 0
              }]
          });
      }else if (counter==2) {
        counter++;
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
                  x:745,
                  y: 286,
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
                  name: '일주 전 사용 패턴',
                  data: comparingDay_plotData,
                  // data: vsData,
                  color: '#848174',
                  lineWidth: 1,
                  // linkedTo: ':previous',
                  zIndex: 0
              },{
                  //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                  name: '일주 전 이 시간: ' + comparingSum.toFixed(1) + ' kW/h',
                  data: comparingDay_plotData.slice(0,today_plotData.length),
                  type: 'area',
                  lineWidth: 0,
                  color: '#7f8c91',//'#848174',
                  fillOpacity: 0.7,
                  zIndex: 0
              }, {
                  //name: '오늘: ' + (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ')',
                  name: '오늘 이 시간: ' + todaySum.toFixed(1) + ' kW/h (' + ((todaySum/comparingSum)*100).toFixed(1) +  '%)',
                  data: today_plotData,
                  type: 'area',
                  lineWidth: 0,
                  color: stateColors[currentState],
                  // color: Highcharts.getOptions().colors[1],
                  fillOpacity: 0.5,
                  zIndex: 0
              }, {
                  //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                  data: today_plotData,
                  // data: vsData,
                  color: stateColors[currentState],
                  linkedTo: ':previous',
                  zIndex: 0
              }, {
                  name: '냉난방: ' + limitedArraySum(today_hvac, today_queryReturn.length).toFixed(1) + ' kW/h',
                  data: today_hvac,
                  // data: vsData,
                  // color: stateColors[currentState],
                  color: Highcharts.getOptions().colors[0],
                  // linkedTo: ':previous',
                  zIndex: 0
              }]
          });
      }else if (counter==3) {
        counter++;
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
                  x:745,
                  y: 286,
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
                  name: '일주 전 사용 패턴',
                  data: comparingDay_plotData,
                  // data: vsData,
                  color: '#848174',
                  lineWidth: 1,
                  // linkedTo: ':previous',
                  zIndex: 0
              },{
                  //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                  name: '일주 전 이 시간: ' + comparingSum.toFixed(1) + ' kW/h',
                  data: comparingDay_plotData.slice(0,today_plotData.length),
                  type: 'area',
                  lineWidth: 0,
                  color: '#7f8c91',//'#848174',
                  fillOpacity: 0.7,
                  zIndex: 0
              }, {
                  //name: '오늘: ' + (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ')',
                  name: '오늘 이 시간: ' + todaySum.toFixed(1) + ' kW/h (' + ((todaySum/comparingSum)*100).toFixed(1) +  '%)',
                  data: today_plotData,
                  type: 'area',
                  lineWidth: 0,
                  color: stateColors[currentState],
                  // color: Highcharts.getOptions().colors[1],
                  fillOpacity: 0.5,
                  zIndex: 0
              }, {
                  //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                  data: today_plotData,
                  // data: vsData,
                  color: stateColors[currentState],
                  linkedTo: ':previous',
                  zIndex: 0
              }, {
                  name: '컴퓨터: ' + limitedArraySum(today_com, today_queryReturn.length).toFixed(1) + ' kW/h',
                  data: today_com,
                  // data: vsData,
                  // color: stateColors[currentState],
                  color: Highcharts.getOptions().colors[1],
                  // linkedTo: ':previous',
                  zIndex: 0
              }]
          });
      } else if (counter==4) {
        counter++;
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
                  x:745,
                  y: 286,
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
                  name: '일주 전 사용 패턴',
                  data: comparingDay_plotData,
                  // data: vsData,
                  color: '#848174',
                  lineWidth: 1,
                  // linkedTo: ':previous',
                  zIndex: 0
              },{
                  //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                  name: '일주 전 이 시간: ' + comparingSum.toFixed(1) + ' kW/h',
                  data: comparingDay_plotData.slice(0,today_plotData.length),
                  type: 'area',
                  lineWidth: 0,
                  color: '#7f8c91',//'#848174',
                  fillOpacity: 0.7,
                  zIndex: 0
              }, {
                  //name: '오늘: ' + (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ')',
                  name: '오늘 이 시간: ' + todaySum.toFixed(1) + ' kW/h (' + ((todaySum/comparingSum)*100).toFixed(1) +  '%)',
                  data: today_plotData,
                  type: 'area',
                  lineWidth: 0,
                  color: stateColors[currentState],
                  // color: Highcharts.getOptions().colors[1],
                  fillOpacity: 0.5,
                  zIndex: 0
              }, {
                  //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                  data: today_plotData,
                  // data: vsData,
                  color: stateColors[currentState],
                  linkedTo: ':previous',
                  zIndex: 0
              }, {
                  name: '전등: ' + limitedArraySum(today_light, today_queryReturn.length).toFixed(1) + ' kW/h',
                  data: today_light,
                  // data: vsData,
                  // color: stateColors[currentState],
                  color: Highcharts.getOptions().colors[2],
                  // linkedTo: ':previous',
                  zIndex: 0
              }]
          });
      } else {
        counter=2;
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
                  x:745,
                  y: 286,
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
                  name: '일주 전 사용 패턴',
                  data: comparingDay_plotData,
                  // data: vsData,
                  color: '#848174',
                  lineWidth: 1,
                  // linkedTo: ':previous',
                  zIndex: 0
              },{
                  //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                  name: '일주 전 이 시간: ' + comparingSum.toFixed(1) + ' kW/h',
                  data: comparingDay_plotData.slice(0,today_plotData.length),
                  type: 'area',
                  lineWidth: 0,
                  color: '#7f8c91',//'#848174',
                  fillOpacity: 0.7,
                  zIndex: 0
              }, {
                  //name: '오늘: ' + (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ')',
                  name: '오늘 이 시간: ' + todaySum.toFixed(1) + ' kW/h (' + ((todaySum/comparingSum)*100).toFixed(1) +  '%)',
                  data: today_plotData,
                  type: 'area',
                  lineWidth: 0,
                  color: stateColors[currentState],
                  // color: Highcharts.getOptions().colors[1],
                  fillOpacity: 0.5,
                  zIndex: 0
              }, {
                  //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
                  data: today_plotData,
                  // data: vsData,
                  color: stateColors[currentState],
                  linkedTo: ':previous',
                  zIndex: 0
              }, {
                  name: '기타: ' + limitedArraySum(today_etc, today_queryReturn.length).toFixed(1) + ' kW/h',
                  data: today_etc,
                  // data: vsData,
                  // color: stateColors[currentState],
                  color: Highcharts.getOptions().colors[3],
                  // linkedTo: ':previous',
                  zIndex: 0
              }]
          });
      }

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

    }//drawChart()


}
