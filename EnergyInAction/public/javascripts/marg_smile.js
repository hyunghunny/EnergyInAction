$(function () {
    var elementObj = document.getElementById("date");
    if(elementObj){
      elementObj.innerHTML = 'MARG ' + (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ')';
    }

    var savingRate_Day;

    var baseDay_query  = '/api/labs/marg/energy/quarters.json?base_time=' + baseTime;
    var comparingDay_query = '/api/labs/marg/energy/quarters.json?base_time=' + comparingDayTime;

    // console.log(baseDay_query);
    // console.log(comparingDay_query);

    var xAxis_categories = [];
    var comparingDay_data = [];
    var today_data = [];
var smile_date = 0;

    invokeOpenAPI(comparingDay_query, function (yesterday) {
      //console.log(yesterday);
      for(var index = 0; index < yesterday.length; index++){
        comparingDay_data.push(Number(yesterday[index].sum.toFixed(1)));
        xAxis_categories.push(new Date(yesterday[index].dateFrom).getHours() + '시');
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
          console.log(savingRate_Day);

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
          marg_smile.innerHTML = s_month+'월'+s_day+'일 '+s_hours+':'+s_minutes + ' 기준<br>어제 대비 ' + (savingRate_Day*100).toFixed(1) + '% 사용중';
          // marg_smile.innerHTML = (new Date(today[today.length-1].dateTo)) + '기준<br>어제 대비 ' + (savingRate_Day*100).toFixed(1) + '% 사용중';

          if(savingRate_Day > 1.05) {
            //$('#smiley').css("background-color","red");
            $('#smiley').prepend('<img id="faces" src="./images/red_all.png" />')
            $('#marg_title').css("background-color","#a50a0a");
          } else if ( savingRate_Day > .90) {
            // $('#smiley').css("background-color","#f7cb00");
            $('#smiley').prepend('<img id="faces" src="./images/yellow_all.png" />')
            $('#marg_title').css("background-color","#f7cb00");
          } else {
            // $('#smiley').css("background-color","#3e721f");
            $('#smiley').prepend('<img id="faces" src="./images/green_all.png" />')
            $('#marg_title').css("background-color","#3e721f");
          }
        });
    });
});
