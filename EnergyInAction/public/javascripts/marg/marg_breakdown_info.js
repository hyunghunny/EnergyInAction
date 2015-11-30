// f9f3e8
var now = new Date();
var hours = now.getHours();
var minutes = now.getMinutes();
var counter = Math.floor((hours*60 + minutes)/15) % 2;
var local_counter = 1;

$(function () {
  // marg_day_breakdown();
  var timer = setInterval( marg_day_breakdown, 10000);
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


    function drawChart() {


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


      // {
      //     //name: '어제: ' + (comparingDay_queryReturn.getMonth() + 1) + '월 ' +  comparingDay_queryReturn.getDate() + '일(' + dayLabel[comparingDay_queryReturn.getDay()] + ')',
      //     name: '일주 전 이 시간: ' + limitedArraySum(comparingDay_hvac, today_queryReturn.length).toFixed(1) + ' kW/h',
      //     data: comparingDay_hvac.slice(0,today_plotData.length),
      //     type: 'area',
      //     lineWidth: 0,
      //     color: comparing_breakdownColors[2],//'#848174',
      //     fillOpacity: 1,
      //     zIndex: 0
      // },{
      //     name: '오늘 이 시간: ' + limitedArraySum(today_hvac, today_queryReturn.length).toFixed(1) + ' kW/h',
      //     data: today_hvac,
      //     // data: vsData,
      //     // color: stateColors[currentState],
      //     color: today_breakdownColors[2],
      //     type: 'area',
      //     lineWidth: 0,
      //     fillOpacity: 0.5,
      //     // linkedTo: ':previous',
      //     zIndex: 0
      // }, {
      //     data: today_hvac.slice(0,today_plotData.length),
      //     // data: vsData,
      //     // color: stateColors[currentState],
      //     color: today_breakdownColors[2],
      //     lineWidth: 1,
      //     linkedTo: ':previous',
      //     zIndex: 0
      // }
      var breakdown_info_percent = 0;
      var breakdown_info_title;
      $('#breakdown_info').empty();
      if(local_counter==1){
        local_counter=local_counter+1;
        breakdown_info_percent = limitedArraySum(today_hvac, today_queryReturn.length)/limitedArraySum(comparingDay_hvac, today_queryReturn.length);
        breakdown_info_percent.toFixed(1);
        breakdown_info_title=$("<div>").attr("id","breakdown_info_title").css({"font-size": "19px", "display" : "inline"}).text('어제 이시간 대비<br>'+breakdown_info_percent+'% 사용중');
        $('#breakdown_info').append('<img id="faces" src="./images/computer.png" />').append(breakdown_info_title);
      }else if (local_counter==2) {
        local_counter=local_counter+1;
        $('#breakdown_info').prepend('<img id="faces" src="./images/light.png" />');
      }else {
        local_counter=1;
        $('#breakdown_info').prepend('<img id="faces" src="./images/arrow_depth_tue.png" />');
      }





    }//drawChart()


}
