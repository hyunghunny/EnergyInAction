$(function () {
    var elementObj = document.getElementById("date");
    if(elementObj){
      elementObj.innerHTML = 'MARG ' + (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ')';
    }

    var savingRate_Day;

    var marg_baseDay_query  = '/api/labs/marg/energy/hours.json?base_time=' + baseTime;
    var marg_comparingDay_query = '/api/labs/marg/energy/hours.json?base_time=' + lastWeekDayTime;

    var hcc_baseDay_query  = '/api/labs/hcc/energy/hours.json?base_time=' + baseTime;
    var hcc_comparingDay_query = '/api/labs/hcc/energy/hours.json?base_time=' + lastWeekDayTime;

    var ux_baseDay_query  = '/api/labs/ux/energy/hours.json?base_time=' + baseTime;
    var ux_comparingDay_query = '/api/labs/ux/energy/hours.json?base_time=' + lastWeekDayTime;

    var xAxis_categories = [];
    var marg_comparingDay_data = [];
    var marg_today_data = [];
    var hcc_comparingDay_data = [];
    var hcc_today_data = [];
    var ux_comparingDay_data = [];
    var ux_today_data = [];
    var smile_date = 0;

    var currentState;

    invokeOpenAPI(marg_comparingDay_query, function (comparingDay) {
      for(var index = 0; index < comparingDay.length; index++){
        marg_comparingDay_data.push(Number(comparingDay[index].sum.toFixed(1)));
        xAxis_categories.push(new Date(comparingDay[index].dateFrom).getHours() + '시');
      }
    }

    invokeOpenAPI(hcc_comparingDay_query, function (comparingDay) {
      for(var index = 0; index < comparingDay.length; index++){
        hcc_comparingDay_data.push(Number(comparingDay[index].sum.toFixed(1)));
      }
    }

    invokeOpenAPI(ux_comparingDay_query, function (comparingDay) {
      for(var index = 0; index < comparingDay.length; index++){
        ux_comparingDay_data.push(Number(comparingDay[index].sum.toFixed(1)));
      }
    }

    invokeOpenAPI(marg_baseDay_query, function (today) {
      for(var index = 0; index < today.length; index++){
        marg_today_data.push(Number(today[index].sum.toFixed(1)));
      }
    }

    invokeOpenAPI(hcc_baseDay_query, function (today) {
      for(var index = 0; index < today.length; index++){
        hcc_today_data.push(Number(today[index].sum.toFixed(1)));
      }
    }

    invokeOpenAPI(ux_baseDay_query, function (today) {
      for(var index = 0; index < today.length; index++){
        ux_today_data.push(Number(today[index].sum.toFixed(1)));
      }
    }

    var marg_comparingSum = limitedArraySum(marg_comparingDay_data, today.length);
    var marg_todaySum     = limitedArraySum(marg_today_data, today.length);

    var hcc_comparingSum = limitedArraySum(marg_comparingDay_data, today.length);
    var hcc_todaySum     = limitedArraySum(marg_today_data, today.length);

    var ux_comparingSum = limitedArraySum(marg_comparingDay_data, today.length);
    var ux_todaySum     = limitedArraySum(marg_today_data, today.length);

    invokeOpenAPI(comparingDay_query, function (comparingDay) {

      for(var index = 0; index < comparingDay.length; index++){
        comparingDay_data.push(Number(comparingDay[index].sum.toFixed(1)));
        xAxis_categories.push(new Date(comparingDay[index].dateFrom).getHours() + '시');
      }

        invokeOpenAPI(baseDay_query, function (today) {

          for(var index = 0; index < today.length; index++){
            today_data.push(Number(today[index].sum.toFixed(1)));
          }


          var comparingSum = limitedArraySum(comparingDay_data, today.length);
          var todaySum     = limitedArraySum(today_data, today.length);

          savingRate_Day = todaySum / comparingSum;

          if(today.length == 0){
             smile_date = baseDay;
          } else {
             smile_date = new Date(today[today.length-1].dateTo);
          }
          var s_month = smile_date.getMonth()+1;
          var s_day = smile_date.getDate();
          var s_hours = smile_date.getHours();
          var s_minutes = smile_date.getMinutes();

          var currentColor = "";

          if(savingRate_Day > 1.20) {
            // $('#smiley').prepend('<img id="faces" src="./images/marg_red.png" />');
            $('#ranking_img').prepend('<img id="ranking_" src="./images/red_all.png"/>');
            $('#axis').prepend('<img src="./images/percent_red.png" />');
            currentColor = "#a50a0a";
          } else if ( savingRate_Day > 1.0) {
            // $('#smiley').prepend('<img id="faces" src="./images/marg_yellow.png" />');
            $('#ranking_img').prepend('<img id="ranking_" src="./images/yellow_all.png" />');
            $('#axis').prepend('<img src="./images/percent_yellow.png" />');
            currentColor = "#f7cb00";
          } else {
            // $('#smiley').prepend('<img id="faces" src="./images/marg_green.png" />');
            $('#ranking_img').prepend('<img id="ranking_" src="./images/green_all.png" />');
            $('#axis').prepend('<img src="./images/percent_green.png" />');
            currentColor = "#3e721f";
          }

          var percent_smile = "";

          if (savingRate_Day>=1) {
            percent_smile = (savingRate_Day*100).toFixed(1);
          }else {
            percent_smile = (savingRate_Day*100).toFixed(1);
          }
          if (isNaN(savingRate_Day)) {
            percentage_text = '아직 데이터가 들어오지 않았습니다';
          }else {
            percentage_text = '지난주 '+ dayLabel[baseDay.getDay()]+'요일 대비 ' ;
          }

          console.log(percent_smile);

          var percentage_title=$("<div>").attr("id","ranking_text").css({"font-size": "19px", "font-weight" : "bold", "display" : "inline"}).text(percentage_text);
          var percentage_title2=$("<div>").attr("id","ranking_text").css({"font-size": "19px", "font-weight" : "bold", "color": currentColor, "display" : "inline", "text-shadow" : "1px 1px #000000"}).text(percent_smile+'% ');
          var percentage_title3=$("<div>").attr("id","ranking_text").css({"font-size": "19px", "font-weight" : "bold", "display" : "inline"}).text('사용');

          $('#percentage_title').append(percentage_title).append(percentage_title2).append(percentage_title3);
        });
    });
});
