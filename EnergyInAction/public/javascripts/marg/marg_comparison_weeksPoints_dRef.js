// import data file
// document.writeln("<script type='text/javascript' src='/javascripts/lib/environ_dRef.js'></script>");

$(function () {

  var LAB = "marg";

  var points_com = 0;
  var points_light = 0;
  var points_hvac = 0;
  var total_pts = 0;

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

        // this_com   = Number((LAST_SEASON_WEEKEND_COM   - com).toFixed(0));
        // this_light = Number((LAST_SEASON_WEEKEND_LIGHT - light).toFixed(0));
        // this_hvac  = Number((LAST_SEASON_WEEKEND_HVAC  - hvac).toFixed(0));

        this_com   = Math.floor(Number((LAST_SEASON_WEEKEND_COM   - com)));
        this_light = Math.floor(Number((LAST_SEASON_WEEKEND_LIGHT - light)));
        this_hvac  = Math.floor(Number((LAST_SEASON_WEEKEND_HVAC  - hvac)));

        this_point = this_com + this_light + this_hvac;

        points_com   += this_com;
        points_light += this_light;
        points_hvac  += this_hvac;
        total_pts    += this_point;

        console.log(new Date(thisWeek[index].dateFrom).toLocaleString(), "(주말):",
                  this_point, "(", this_com, this_light, this_hvac, ")");
      } else {
        // get Ref
        var LAST_SEASON_WEEKDAY = getRef(targetDate, LAB, 1)

        var LAST_SEASON_WEEKDAY_COM   = LAST_SEASON_WEEKDAY[95].computer;
        var LAST_SEASON_WEEKDAY_LIGHT = LAST_SEASON_WEEKDAY[95].light;
        var LAST_SEASON_WEEKDAY_HVAC  = LAST_SEASON_WEEKDAY[95].hvac;

        // this_com   = Number((LAST_SEASON_WEEKDAY_COM   - com).toFixed(0));
        // this_light = Number((LAST_SEASON_WEEKDAY_LIGHT - light).toFixed(0));
        // this_hvac  = Number((LAST_SEASON_WEEKDAY_HVAC  - hvac).toFixed(0));

        this_com   = Math.floor(Number((LAST_SEASON_WEEKDAY_COM   - com)));
        this_light = Math.floor(Number((LAST_SEASON_WEEKDAY_LIGHT - light)));
        this_hvac  = Math.floor(Number((LAST_SEASON_WEEKDAY_HVAC  - hvac)));

        this_point = this_com + this_light + this_hvac;

        points_com   += this_com;
        points_light += this_light;
        points_hvac  += this_hvac;
        total_pts    += this_point;

        console.log(new Date(thisWeek[index].dateFrom).toLocaleString(), "(주중):",
                  this_point, "(", this_com, this_light, this_hvac, ")");
      }
      console.log("Each cumulated points :               ", points_com, points_light, points_hvac);
      }
      writeText();
  }

  function writeText(){

    var signColorCode;
    // var cumulatedSavingPoints = (points_com + points_light + points_hvac).toFixed(0);
    var cumulatedSavingPoints = total_pts;
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

    document.getElementById("weekPoints").innerHTML =sign + cumulatedSavingPoints;
    document.getElementById("weekPoints").style.color=signColorCode;

    document.getElementById("measure_expectedPoints").innerHTML = '점';
    document.getElementById("measure_expectedPoints").style.color="#3e721f";
  }
});
