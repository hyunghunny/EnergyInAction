// import data file
document.writeln("<script type='text/javascript' src='/javascripts/lib/environ.js'></script>");

var marg_week_points = null;
var hcc_week_points  = null;
var ux_week_points   = null;

$(function () {

  query_today = new Date();
  query_yesterday = shiftDate(query_today, -1)
  marg_ThisWeek_query = 'api/labs/marg/energy/daily.json?day_from=' + DAY_FROM_MANUALLY + '&day_to=' + dateFormatter(new Date(query_yesterday)) + '&offset=0';
   hcc_ThisWeek_query = 'api/labs/hcc/energy/daily.json?day_from=' + DAY_FROM_MANUALLY + '&day_to=' + dateFormatter(new Date(query_yesterday)) + '&offset=0';
    ux_ThisWeek_query = 'api/labs/ux/energy/daily.json?day_from=' + DAY_FROM_MANUALLY + '&day_to=' + dateFormatter(new Date(query_yesterday)) + '&offset=0';

  // thisWeek_query = 'api/labs/UX/energy/daily.json?day_from=' + dateFormatter(new Date(firstDayOfThisweek)) + '&day_to=' + dateFormatter(new Date(yesterDay)) + '&offset=0';
  // thisWeek_query = 'api/labs/UX/energy/daily.json?day_from=' + '2015-12-01' + '&day_to=' + '2015-12-31' + '&offset=0';

  invokeOpenAPI(marg_ThisWeek_query, margThisWeekCB, errorCB);
  invokeOpenAPI( hcc_ThisWeek_query,  hccThisWeekCB, errorCB);
  invokeOpenAPI(  ux_ThisWeek_query,   uxThisWeekCB, errorCB);

  function errorCB(response) {
    $('#first').append("데이터가 충분하지 않습니다");
    $('#second').append("데이터가 충분하지 않습니다");
    $('#third').append("데이터가 충분하지 않습니다");
  }

  // 1. MARG
  function margThisWeekCB(thisWeek_) {

    var LAST_SEASON_WEEKDAY_COM   = 0;
    var LAST_SEASON_WEEKDAY_LIGHT = 0;
    var LAST_SEASON_WEEKDAY_HVAC  = 0;

    var LAST_SEASON_WEEKEND_COM   = 0;
    var LAST_SEASON_WEEKEND_LIGHT = 0;
    var LAST_SEASON_WEEKEND_HVAC  = 0;

    for(var index = 0; index < MARG_LAST_SEASON_WEEKDAY.length; index++){
      LAST_SEASON_WEEKDAY_COM   += MARG_LAST_SEASON_WEEKDAY[index].computer;
      LAST_SEASON_WEEKDAY_LIGHT += MARG_LAST_SEASON_WEEKDAY[index].light;
      LAST_SEASON_WEEKDAY_HVAC  += MARG_LAST_SEASON_WEEKDAY[index].hvac;
    }

    for(var index = 0; index < MARG_LAST_SEASON_WEEKEND.length; index++){
      LAST_SEASON_WEEKEND_COM   += MARG_LAST_SEASON_WEEKEND[index].computer;
      LAST_SEASON_WEEKEND_LIGHT += MARG_LAST_SEASON_WEEKEND[index].light;
      LAST_SEASON_WEEKEND_HVAC  += MARG_LAST_SEASON_WEEKEND[index].hvac;
    }

      marg_week_points = returnWeekPoints(thisWeek_, LAST_SEASON_WEEKDAY_COM, LAST_SEASON_WEEKDAY_LIGHT, LAST_SEASON_WEEKDAY_HVAC,
                                                    LAST_SEASON_WEEKEND_COM, LAST_SEASON_WEEKEND_LIGHT, LAST_SEASON_WEEKEND_HVAC, true);
      writeText();
  }

  // 2. hcc
  function hccThisWeekCB(thisWeek_) {

    var LAST_SEASON_WEEKDAY_COM   = 0;
    var LAST_SEASON_WEEKDAY_LIGHT = 0;
    var LAST_SEASON_WEEKDAY_HVAC  = 0;

    var LAST_SEASON_WEEKEND_COM   = 0;
    var LAST_SEASON_WEEKEND_LIGHT = 0;
    var LAST_SEASON_WEEKEND_HVAC  = 0;

    for(var index = 0; index < HCC_LAST_SEASON_WEEKDAY.length; index++){
      LAST_SEASON_WEEKDAY_COM   += HCC_LAST_SEASON_WEEKDAY[index].computer;
      LAST_SEASON_WEEKDAY_LIGHT += HCC_LAST_SEASON_WEEKDAY[index].light;
      LAST_SEASON_WEEKDAY_HVAC  += HCC_LAST_SEASON_WEEKDAY[index].hvac;
    }

    for(var index = 0; index < HCC_LAST_SEASON_WEEKEND.length; index++){
      LAST_SEASON_WEEKEND_COM   += HCC_LAST_SEASON_WEEKEND[index].computer;
      LAST_SEASON_WEEKEND_LIGHT += HCC_LAST_SEASON_WEEKEND[index].light;
      LAST_SEASON_WEEKEND_HVAC  += HCC_LAST_SEASON_WEEKEND[index].hvac;
    }

    hcc_week_points = returnWeekPoints(thisWeek_, LAST_SEASON_WEEKDAY_COM, LAST_SEASON_WEEKDAY_LIGHT, LAST_SEASON_WEEKDAY_HVAC,
                                                 LAST_SEASON_WEEKEND_COM, LAST_SEASON_WEEKEND_LIGHT, LAST_SEASON_WEEKEND_HVAC, false);
    writeText();
  }

  // 3. ux
  function uxThisWeekCB(thisWeek_) {

    var LAST_SEASON_WEEKDAY_COM   = 0;
    var LAST_SEASON_WEEKDAY_LIGHT = 0;
    var LAST_SEASON_WEEKDAY_HVAC  = 0;

    var LAST_SEASON_WEEKEND_COM   = 0;
    var LAST_SEASON_WEEKEND_LIGHT = 0;
    var LAST_SEASON_WEEKEND_HVAC  = 0;

    for(var index = 0; index < UX_LAST_SEASON_WEEKDAY.length; index++){
      LAST_SEASON_WEEKDAY_COM   += UX_LAST_SEASON_WEEKDAY[index].computer;
      LAST_SEASON_WEEKDAY_LIGHT += UX_LAST_SEASON_WEEKDAY[index].light;
      LAST_SEASON_WEEKDAY_HVAC  += UX_LAST_SEASON_WEEKDAY[index].hvac;
    }

    for(var index = 0; index < UX_LAST_SEASON_WEEKEND.length; index++){
      LAST_SEASON_WEEKEND_COM   += UX_LAST_SEASON_WEEKEND[index].computer;
      LAST_SEASON_WEEKEND_LIGHT += UX_LAST_SEASON_WEEKEND[index].light;
      LAST_SEASON_WEEKEND_HVAC  += UX_LAST_SEASON_WEEKEND[index].hvac;
    }

    ux_week_points = returnWeekPoints(thisWeek_, LAST_SEASON_WEEKDAY_COM, LAST_SEASON_WEEKDAY_LIGHT, LAST_SEASON_WEEKDAY_HVAC,
                                                LAST_SEASON_WEEKEND_COM, LAST_SEASON_WEEKEND_LIGHT, LAST_SEASON_WEEKEND_HVAC, false);
    writeText();
  }

  function returnWeekPoints(thisWeek, LAST_SEASON_WEEKDAY_COM, LAST_SEASON_WEEKDAY_LIGHT, LAST_SEASON_WEEKDAY_HVAC,
                                     LAST_SEASON_WEEKEND_COM, LAST_SEASON_WEEKEND_LIGHT, LAST_SEASON_WEEKEND_HVAC, HVAC){
     var points_com   = 0;
     var points_light = 0;
     var points_hvac  = 0;

    var weekday_com_sum = 0;
    var weekday_light_sum = 0;
    var weekday_hvac_sum = 0;

    var weekend_com_sum = 0;
    var weekend_light_sum = 0;
    var weekend_hvac_sum = 0;

    for(var index = 0; index < thisWeek.length; index++){
      com   = accumulator(thisWeek[index], 'computer');
      light = accumulator(thisWeek[index], 'light');
      hvac  = accumulator(thisWeek[index], 'hvac');

      var day = new Date(thisWeek[index].dateFrom).getDay();
      var isWeekend = (day == 6) || (day == 0);

      if(isWeekend){
        points_com   += (LAST_SEASON_WEEKEND_COM   - com);
        points_light += (LAST_SEASON_WEEKEND_LIGHT - light);
        points_hvac  += (LAST_SEASON_WEEKEND_HVAC  - hvac);
      } else {
        points_com   += (LAST_SEASON_WEEKDAY_COM   - com);
        points_light += (LAST_SEASON_WEEKDAY_LIGHT - light);
        points_hvac  += (LAST_SEASON_WEEKDAY_HVAC  - hvac);
      }
    }

    if(HVAC) {
        console.log("Each cumulated points :               ", points_com.toFixed(0), points_light.toFixed(0), points_hvac.toFixed(0));
        return (points_com + points_light + points_hvac).toFixed(0);
    } else {
        console.log("Each cumulated points :               ", points_com.toFixed(0), points_light.toFixed(0));
        return (points_com + points_light).toFixed(0);
    }
  }

  function writeText(){

    if(marg_week_points != null && hcc_week_points != null && ux_week_points != null) {

      var lab_points = [Number(marg_week_points), Number(hcc_week_points), Number(ux_week_points)];
      // console.log(lab_points);
      lab_points.sort(compareNumbers);
      console.log(lab_points);

      var first_points  = lab_points[0];
      var third_points  = lab_points[1];
      var second_points = lab_points[2];

      console.log("first:", first_points, "second:", second_points, "third:", third_points);

      var first_text  = $("<div>").css({"font-size": "40px", "font-weight" : "bold", "color": getColor(first_points), "background-color" : "#90a5b7" ,"position" : "absolute", "top" : "345px", "left" : "125px"}).text(getSign(first_points) + first_points);
      var second_text = $("<div>").css({"font-size": "40px", "font-weight" : "bold", "color": getColor(second_points), "background-color" : "#90a5b7" ,"position" : "absolute", "top" : "415px", "left" : "275px"}).text(getSign(second_points) + second_points);
      var third_text  = $("<div>").css({"font-size": "40px", "font-weight" : "bold", "color": getColor(third_points), "background-color" : "#90a5b7" ,"position" : "absolute", "top" : "485px", "left" : "425px"}).text(getSign(third_points) + third_points);

      // $('#first').append(first_text);
      // $('#second').append(second_text);
      // $('#third').append(third_text);

      $('#ranking').append(first_text).append(second_text).append(third_text);
      $('#ranking').append('<img src="./images/hcc_marg_ux.png" width="95%"/>');
      // console.log("first:", first_text, "second:", second_text, "third:", third_text);

      function compareNumbers(a, b) {
        return b - a;
      }

      function getSign(value){
        if (value > 0) {
          return "+";
        } else {
          return "";
        }
      }
      //
      function getColor(value){
        if (value > 0) {
          return "#3e721f";
        } else if(value == 0) {
          return "gray";
        } else {
          return "#a50a0a";
        }
      }
    }
  }
});
