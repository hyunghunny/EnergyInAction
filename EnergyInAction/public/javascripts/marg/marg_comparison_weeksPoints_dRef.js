// import data file
// document.writeln("<script type='text/javascript' src='/javascripts/lib/environ_dRef.js'></script>");

$(function () {

  var LAB = "marg";

  var points_com = 0;
  var points_light = 0;
  var points_hvac = 0;

  query_today = new Date();
  query_yesterday = shiftDate(query_today, -1)
  thisWeek_query = 'api/labs/'+ LAB + '/energy/daily.json?day_from=' + DAY_FROM_MANUALLY + '&day_to=' + dateFormatter(new Date(query_yesterday)) + '&offset=0';

  invokeOpenAPI(thisWeek_query, thisWeekCB, errorCB);

  function errorCB(response) {
    console.log(response);

    document.getElementById("coffeeImg").src="././images/coffeeCapsule.png";
    document.getElementById("expectedPoints").innerHTML = '+'+30;
    document.getElementById("expectedPoints").style.color="#3e721f";
    document.getElementById("weekPoints").innerHTML = '- 0';
    document.getElementById("weekPoints").style.color= 'gray';
  }

  function thisWeekCB(thisWeek_) {
    var thisWeek = thisWeek_;

    var weekday_com_sum = 0;
    var weekday_light_sum = 0;
    var weekday_hvac_sum = 0;

    var weekend_com_sum = 0;
    var weekend_light_sum = 0;
    var weekend_hvac_sum = 0;
    // console.log("#thisWeek",thisWeek);

    for(var index = 0; index < thisWeek.length; index++){
      com  = accumulator(thisWeek[index], 'computer');
      light = accumulator(thisWeek[index], 'light');
      hvac = accumulator(thisWeek[index], 'hvac');

      var targetDate = new Date(thisWeek[index].dateFrom);
      var day = new Date(thisWeek[index].dateFrom).getDay();
      var isWeekend = (day == 6) || (day == 0);

      // console.log(targetDate, isWeekend);

      if(isWeekend){
        // get Ref
        var LAST_SEASON_WEEKEND = getRef(targetDate, LAB, 0)

        var LAST_SEASON_WEEKEND_COM   = LAST_SEASON_WEEKEND[95].computer;
        var LAST_SEASON_WEEKEND_LIGHT = LAST_SEASON_WEEKEND[95].light;
        var LAST_SEASON_WEEKEND_HVAC  = LAST_SEASON_WEEKEND[95].hvac;

        points_com   += (LAST_SEASON_WEEKEND_COM   - com);
        points_light += (LAST_SEASON_WEEKEND_LIGHT - light);
        points_hvac  += (LAST_SEASON_WEEKEND_HVAC  - hvac);
        console.log(new Date(thisWeek[index].dateFrom).toLocaleString(), "(주말):", ((LAST_SEASON_WEEKEND_COM-com)+(LAST_SEASON_WEEKEND_LIGHT-light)+(LAST_SEASON_WEEKEND_HVAC-hvac)).toFixed(0),
                    "(", (LAST_SEASON_WEEKEND_COM-com).toFixed(0), (LAST_SEASON_WEEKEND_LIGHT-light).toFixed(0), (LAST_SEASON_WEEKEND_HVAC-hvac).toFixed(0), ")");
        // console.log(new Date(thisWeek[index].dateFrom).toLocaleString(), "(주말):", ((LAST_SEASON_WEEKEND_COM-com)+(LAST_SEASON_WEEKEND_LIGHT-light)+(LAST_SEASON_WEEKEND_HVAC-hvac)).toFixed(0),
        //             "(", (LAST_SEASON_WEEKEND_COM-com), (LAST_SEASON_WEEKEND_LIGHT-light), (LAST_SEASON_WEEKEND_HVAC-hvac), ")");
        // console.log("3 point series", (LAST_SEASON_WEEKEND_COM   - com), (LAST_SEASON_WEEKEND_LIGHT - light), (LAST_SEASON_WEEKEND_HVAC  - hvac));
      } else {
        // get Ref
        var LAST_SEASON_WEEKDAY = getRef(targetDate, LAB, 1)

        var LAST_SEASON_WEEKDAY_COM   = LAST_SEASON_WEEKDAY[95].computer;
        var LAST_SEASON_WEEKDAY_LIGHT = LAST_SEASON_WEEKDAY[95].light;
        var LAST_SEASON_WEEKDAY_HVAC  = LAST_SEASON_WEEKDAY[95].hvac;

        points_com   += (LAST_SEASON_WEEKDAY_COM   - com);
        points_light += (LAST_SEASON_WEEKDAY_LIGHT - light);
        points_hvac  += (LAST_SEASON_WEEKDAY_HVAC  - hvac);
        console.log(new Date(thisWeek[index].dateFrom).toLocaleString(), "(주중):", ((LAST_SEASON_WEEKDAY_COM-com)+(LAST_SEASON_WEEKDAY_LIGHT-light)+(LAST_SEASON_WEEKDAY_HVAC-hvac)).toFixed(0),
                    "(", (LAST_SEASON_WEEKDAY_COM-com).toFixed(0), (LAST_SEASON_WEEKDAY_LIGHT-light).toFixed(0), (LAST_SEASON_WEEKDAY_HVAC-hvac).toFixed(0), ")");
        // console.log(new Date(thisWeek[index].dateFrom).toLocaleString(), "(주중):", ((LAST_SEASON_WEEKDAY_COM-com)+(LAST_SEASON_WEEKDAY_LIGHT-light)\+(LAST_SEASON_WEEKDAY_HVAC-hvac)).toFixed(0),
        //             "(", (LAST_SEASON_WEEKDAY_COM-com), (LAST_SEASON_WEEKDAY_LIGHT-light), (LAST_SEASON_WEEKDAY_HVAC-hvac), ")");
        // console.log("3 point series", (LAST_SEASON_WEEKDAY_COM   - com), (LAST_SEASON_WEEKDAY_LIGHT - light), (LAST_SEASON_WEEKDAY_HVAC  - hvac));
      }
      console.log("Each cumulated points :               ", points_com.toFixed(0), points_light.toFixed(0), points_hvac.toFixed(0));
      }
      writeText();
  }

  function writeText(){

    var signColorCode;
    var cumulatedSavingPoints = (points_com + points_light + points_hvac).toFixed(0);
    // console.log(cumulatedSavingPoints);

    // cumulatedSavingPoints = 0;
    var sign="";
    if (cumulatedSavingPoints > 0) {
      sign="+";
      signColorCode = "#3e721f";
    } else if(cumulatedSavingPoints == 0) {
      sign="";
      signColorCode = "gray";
    } else {
      sign="";
      signColorCode = "#a50a0a";
    }

    if (document.getElementById("coffeeImg2")) {
      document.getElementById("coffeeImg2").src="././images/coffeeCapsules2.png";
    } else {
      document.getElementById("coffeeImg").src="././images/coffeeCapsule.png";

      // document.getElementById("weekPoints").innerHTML =sign + cumulatedSavingPoints;
      document.getElementById("weekPoints").innerHTML =sign + cumulatedSavingPoints;
      document.getElementById("weekPoints").style.color=signColorCode;

      expectedSavingPoints = 30 + Number(cumulatedSavingPoints);
      expectedSavingPoints_color = "";

      if(expectedSavingPoints > 0) {
        expectedSavingPoints_color = "#3e721f";
        document.getElementById("expectedPoints").innerHTML = '+'+expectedSavingPoints;
        document.getElementById("expectedPoints").style.color=expectedSavingPoints_color;
      } else {
        expectedSavingPoints_color = "gray";
        document.getElementById("expectedPoints").innerHTML = "0";
        document.getElementById("expectedPoints").style.color=expectedSavingPoints_color;
      }
      document.getElementById("measure_expectedPoints").innerHTML = '개';
      document.getElementById("measure_expectedPoints").style.color="#3e721f";
    }
  }
});
