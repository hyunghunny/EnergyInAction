// import data file
document.writeln("<script type='text/javascript' src='/javascripts/lib/environ_dRef.js'></script>");

$(function () {

    var LAB = "marg";

    var today_hvac  = [];
    var today_com   = [];
    var today_light = [];
    // var today_etc   = [];

    var nowText = "";

    // 2. Today
    invokeOpenAPI('api/labs/' + LAB + '/energy/quarters.json', todayCB);

    function todayCB(today_) {
      today = today_;

      for(var index = 0; index < today.length; index++){
        // total = today[index].sum;
        hvac = accumulator(today[index], 'hvac');
        com  = accumulator(today[index], 'computer');
        light = accumulator(today[index], 'light');
        // etc = total - (hvac + com + light);

        // today_total.push(Number(total.toFixed(2)));
        today_hvac.push(Number(hvac.toFixed(2)));
        today_com.push(Number(com.toFixed(2)));
        today_light.push(Number(light.toFixed(2)));
        // today_etc.push(Number(etc.toFixed(2)));
      }

      if(today.length != 0) {
        nowText = (new Date(today[today.length-1].dateTo).getHours()) + ":";
        nowText_minute = new Date(today[today.length-1].dateTo).getMinutes();
        // console.log("month length:", nowText_minute));
        if (nowText_minute < 10) {
          nowText_minute = '0' + nowText_minute;
        }
        // nowText = weekDay_label + ' ' + nowText + nowText_minute + " 기준";
        nowText = nowText + nowText_minute + " 기준";
      } else {
        nowText = "데이터가 충분하지 않습니다";
      }
      writeText();
    }

    // 3. write text
    function writeText(){
      // get Ref
      TARGET = getRef(baseDay, LAB, weekDay_Indicator)
      // console.log("today's point ref:", TARGET)

      var todayLength = today_com.length;

      var points_Com   = (TARGET[todayLength].computer - limitedArraySum(today_com,   todayLength)).toFixed(0);
      var points_light = (TARGET[todayLength].light    - limitedArraySum(today_light, todayLength)).toFixed(0);
      var points_hvac  = (TARGET[todayLength].hvac     - limitedArraySum(today_hvac,  todayLength)).toFixed(0);

      console.log(Number(points_Com), Number(points_light), Number(points_hvac));

      // make the savingText
      var savingText = (Number(points_Com) + Number(points_light) + Number(points_hvac));
      var sign="";
      if (savingText > 0) {
        sign="+";
        signColorCode = "#3e721f";
        $('#smiley').prepend('<img id="faces" src="./images/green_v2.png" width="110%"/>');
      } else if(savingText == 0) {
        sign="";
        signColorCode = "gray";
        // $('#smiley').prepend('<img id="faces" src="./images/red_v2.png" style="max-width: 100%; height: auto;"/>');
        $('#smiley').prepend('<img id="faces" src="./images/green_v2.png" width="110%"/>');
      } else {
        sign="";
        signColorCode = "#a50a0a";
        $('#smiley').prepend('<img id="faces" src="./images/red_v2.png" width="110%"/>');
      }

      var savingPoints=$("<div>").css({"font-size": "20px", "display" : "inline", "color": "gray"}).text('절전 점수');
      // var percentage_title2=$("<div>").attr("id","percentage_title").css({"font-size": "40px", "font-weight" : "bold", "color": currentColor, "display" : "inline", "text-shadow" : "1px 1px #000000"}).text(percent_smile+'pts ');
      var savingPoints2=$("<div>").css({"font-size": "100px", "font-weight" : "bold", "color": signColorCode, "display" : "inline"}).text(sign + savingText);
      var savingPoints3=$("<div>").css({"font-size": "30px", "font-weight" : "bold", "color": signColorCode, "display" : "inline"}).text(' 점');

      $('#saving_points').append(savingPoints2).append(savingPoints3).append("<br><br>").append(savingPoints);
      $('#title_nowText').append(nowText);

      $('#triangle').prepend('<img src="./images/triangle.png" height: auto;"/>');
  }
});
