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

          console.log(new Date(today[today.length-1].dateTo));

          savingRate_Day = todaySum / comparingSum;
          console.log(savingRate_Day);

          marg_smile.innerHTML = (new Date(today[today.length-1].dateTo)) + '기준<br>어제 대비 ' + (savingRate_Day*100).toFixed(1) + '% 사용중';

          if(savingRate_Day > 1.05) {
            //$('#smiley').css("background-color","red");
            $('#smiley').prepend('<img id="faces" src="./images/RED3.png" />')
            $('#marg_title').css("background-color","#a50a0a");
          } else if ( savingRate_Day > .90) {
            $('#smiley').css("background-color","#f7cb00");
            $('#smiley').prepend('<img id="faces" src="./images/YELLOW.jpg" />')
          } else {
            $('#smiley').css("background-color","#3e721f");
            $('#smiley').prepend('<img id="faces" src="./images/GREEN.jpg" />')
          }
        });
    });
});
