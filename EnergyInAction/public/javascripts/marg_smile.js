

$(function () {
    var elementObj = document.getElementById("date");
    if(elementObj){
      elementObj.innerHTML = 'MARG ' + (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ')';
    }

    var savingRate_Day;

    var baseDay_query  = '/api/labs/marg/energy/hours.json?base_time=' + baseTime;
    var comparingDay_query = '/api/labs/marg/energy/hours.json?base_time=' + lastWeekDayTime;

    // console.log(baseDay_query);
    // console.log(comparingDay_query);

    var xAxis_categories = [];
    var comparingDay_data = [];
    var today_data = [];
    var smile_date = 0;

    var currentState;

    invokeOpenAPI(comparingDay_query, function (comparingDay) {
      //console.log(comparingDay);
      for(var index = 0; index < comparingDay.length; index++){
        comparingDay_data.push(Number(comparingDay[index].sum.toFixed(1)));
        xAxis_categories.push(new Date(comparingDay[index].dateFrom).getHours() + '시');
      }

        invokeOpenAPI(baseDay_query, function (today) {
          //console.log(today);
          for(var index = 0; index < today.length; index++){
            today_data.push(Number(today[index].sum.toFixed(1)));
          }

          // console.log('comparingDay', comparingDay_data);
          // console.log('today', today_data);

          var comparingSum = limitedArraySum(comparingDay_data, today.length);
          var todaySum     = limitedArraySum(today_data, today.length);

          console.log(today.length, comparingSum);
          console.log(today.length, todaySum);

          // console.log(new Date(today[today.length].dateTo));
          console.log("today:", today);

          savingRate_Day = todaySum / comparingSum;
          console.log("today sum from smile",todaySum);
          console.log("comparing sum from smile",comparingSum);
          console.log(savingRate_Day);

          // if(savingRate_Day > 1.05) {
          //   currentState = 0;
          // } else if ( savingRate_Day > .90) {
          //   currentState = 1;
          // } else {
          //   currentState = 2;
          // }

          // var smile_date = new Date(today[today.length-1].dateTo);
          if(today.length == 0){
             smile_date = baseDay;
          } else {
             smile_date = new Date(today[today.length-1].dateTo);
          }
          var s_month = smile_date.getMonth()+1;
          var s_day = smile_date.getDate();
          var s_hours = smile_date.getHours();
          var s_minutes = smile_date.getMinutes();

console.log(baseDay);
          // marg_smile.innerHTML = s_month+'월'+s_day+'일 '+s_hours+':'+s_minutes + ' 기준<br>어제 대비 ' + (savingRate_Day*100).toFixed(1) + '% 사용중';
          // marg_smile.innerHTML = (new Date(today[today.length-1].dateTo)) + '기준<br>어제 대비 ' + (savingRate_Day*100).toFixed(1) + '% 사용중';
          var traffic_title=$("<div>").attr("id","title").css({"font-size": "18px","text-align": "center"}).text('오늘 누적 전기사용 현황').css('color','black','align-text','center');

          $('#marg_smile').append(traffic_title);

          console.log("savingRate_Day", savingRate_Day);

          if(savingRate_Day > 1.05) {
            //$('#smiley').css("background-color","red");
            $('#smiley').prepend('<img id="faces" src="./images/red_all.png" />');
            $('#axis').prepend('<img src="./images/percent_red.png" />');
            $('#marg_title').css("background-color","#a50a0a");
          } else if ( savingRate_Day > .90) {
            // $('#smiley').css("background-color","#f7cb00");
            $('#smiley').prepend('<img id="faces" src="./images/yellow_all.png" />');
            $('#axis').prepend('<img src="./images/percent_yellow.png" />');
            $('#marg_title').css("background-color","#f7cb00");
          } else {
            // $('#smiley').css("background-color","#3e721f");
            $('#smiley').prepend('<img id="faces" src="./images/green_all.png" />');
            $('#axis').prepend('<img src="./images/percent_green.png" />');
            $('#marg_title').css("background-color","#3e721f");
          }

          var sign="";
          if (savingRate_Day>=1) {
            sign="+";
          }else {
            sig="-";
          }
          percentage_text = '지난주 '+ dayLabel[baseDay.getDay()]+'요일 대비 ' + (sign+savingRate_Day.toFixed(3)*100)+'% 사용';

          var percentage_title=$("<div>").attr("id","percentage_title").css({"font-size": "18px","text-align": "center"}).text(percentage_text).css('color','black','align-text','center');
          $('#percentage_title').append(percentage_title);
        });
    });
});
