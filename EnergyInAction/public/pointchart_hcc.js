// import data file
document.writeln("<script type='text/javascript' src='/javascripts/lib/environ_dRef.js'></script>");

$(function () {

  var LAB = "hcc";

  var points_com = 0;
  var points_light = 0;
  // var points_hvac = 0;

  var xAxis_categories   = new Array();
  var points_com_array   = new Array();
  var points_light_array = new Array();
  // var points_hvac_array  = new Array();
  var points_total_array = new Array();
  // var temperature_array  = [-2.0, -3.8, -2.9, -3.5, -0.3, 1.7, 2.5, -4.7, -10.5, -9.0, -5.8, -5.8, -9.5, -12.6, -8.2, -2.8, -0.7, 0.2, 2.0, 0.6, -2.6, -4.9, -4.7, -2.7, 0, -1.7, -2.3, -2.9, 2.0, 1.2, 2.4, 8.5]

  query_today = new Date();
  query_yesterday = shiftDate(query_today, -1)

  if(DAY_TO) {
    thisWeek_query = 'api/labs/'+ LAB +'/energy/daily.json?day_from=' + DAY_FROM + '&day_to=' + DAY_TO + '&offset=0';
  } else {
    thisWeek_query = 'api/labs/'+ LAB +'/energy/daily.json?day_from=' + DAY_FROM + '&day_to=' + dateFormatter(new Date(query_yesterday)) + '&offset=0';
  }

  invokeOpenAPI(thisWeek_query, thisWeekCB);

  function thisWeekCB(thisWeek_) {
    var thisWeek = thisWeek_;

    var weekday_com_sum = 0;
    var weekday_light_sum = 0;
    // var weekday_hvac_sum = 0;

    var weekend_com_sum = 0;
    var weekend_light_sum = 0;
    // var weekend_hvac_sum = 0;
    // console.log("#thisWeek",thisWeek);

    for(var index = 0; index < thisWeek.length; index++){
      com  = accumulator(thisWeek[index], 'computer');
      light = accumulator(thisWeek[index], 'light');
      // hvac = accumulator(thisWeek[index], 'hvac');

      var targetDate = new Date(thisWeek[index].dateFrom);
      var day = new Date(thisWeek[index].dateFrom).getDay();
      var isWeekend = (day == 6) || (day == 0);
      var shortDate = (new Date(thisWeek[index].dateFrom).getMonth() + 1) + "/" + (new Date(thisWeek[index].dateFrom).getDate());
      console.log(shortDate);

      //// Import approperate reference ///
      var LAST_SEASON_WEEKDAY = getRef(targetDate, LAB, 1)
      var LAST_SEASON_WEEKEND = getRef(targetDate, LAB, 0)

      var LAST_SEASON_WEEKDAY_COM   = LAST_SEASON_WEEKDAY[95].computer;
      var LAST_SEASON_WEEKDAY_LIGHT = LAST_SEASON_WEEKDAY[95].light;
      var LAST_SEASON_WEEKDAY_HVAC  = LAST_SEASON_WEEKDAY[95].hvac;

      var LAST_SEASON_WEEKEND_COM   = LAST_SEASON_WEEKEND[95].computer;
      var LAST_SEASON_WEEKEND_LIGHT = LAST_SEASON_WEEKEND[95].light;
      var LAST_SEASON_WEEKEND_HVAC  = LAST_SEASON_WEEKEND[95].hvac;

      if(isWeekend){
        points_com   += (LAST_SEASON_WEEKEND_COM   - com);
        points_light += (LAST_SEASON_WEEKEND_LIGHT - light);
        // points_hvac  += (LAST_SEASON_WEEKEND_HVAC  - hvac);
        console.log(new Date(thisWeek[index].dateFrom).toLocaleString(), "(주말):", ((LAST_SEASON_WEEKEND_COM-com)+(LAST_SEASON_WEEKEND_LIGHT-light),
                    "(", (LAST_SEASON_WEEKEND_COM-com).toFixed(0), (LAST_SEASON_WEEKEND_LIGHT-light).toFixed(0), ")"));
        // console.log(new Date(thisWeek[index].dateFrom).toLocaleString(), "(주말):", ((LAST_SEASON_WEEKEND_COM-com)+(LAST_SEASON_WEEKEND_LIGHT-light)+(LAST_SEASON_WEEKEND_HVAC-hvac)).toFixed(0),
        //             "(", (LAST_SEASON_WEEKEND_COM-com), (LAST_SEASON_WEEKEND_LIGHT-light), (LAST_SEASON_WEEKEND_HVAC-hvac), ")");
        // console.log("3 point series", (LAST_SEASON_WEEKEND_COM   - com), (LAST_SEASON_WEEKEND_LIGHT - light), (LAST_SEASON_WEEKEND_HVAC  - hvac));
        xAxis_categories.push(shortDate)
        points_com_array.push(LAST_SEASON_WEEKEND_COM - com);
        points_light_array.push(LAST_SEASON_WEEKEND_LIGHT - light);
        // points_hvac_array.push(LAST_SEASON_WEEKEND_HVAC - hvac);
        points_total_array.push(Number(((LAST_SEASON_WEEKEND_COM-com)+(LAST_SEASON_WEEKEND_LIGHT-light)).toFixed(0)))

      } else {
        points_com   += (LAST_SEASON_WEEKDAY_COM   - com);
        points_light += (LAST_SEASON_WEEKDAY_LIGHT - light);
        // points_hvac  += (LAST_SEASON_WEEKDAY_HVAC  - hvac);
        console.log(new Date(thisWeek[index].dateFrom).toLocaleString(), "(주중):", ((LAST_SEASON_WEEKDAY_COM-com)+(LAST_SEASON_WEEKDAY_LIGHT-light),
                    "(", (LAST_SEASON_WEEKDAY_COM-com).toFixed(0), (LAST_SEASON_WEEKDAY_LIGHT-light).toFixed(0), ")"));
        // console.log(new Date(thisWeek[index].dateFrom).toLocaleString(), "(주중):", ((LAST_SEASON_WEEKDAY_COM-com)+(LAST_SEASON_WEEKDAY_LIGHT-light)\+(LAST_SEASON_WEEKDAY_HVAC-hvac)).toFixed(0),
        //             "(", (LAST_SEASON_WEEKDAY_COM-com), (LAST_SEASON_WEEKDAY_LIGHT-light), (LAST_SEASON_WEEKDAY_HVAC-hvac), ")");
        console.log("point series", (LAST_SEASON_WEEKDAY_COM   - com), (LAST_SEASON_WEEKDAY_LIGHT - light));
        xAxis_categories.push(shortDate)
        points_com_array.push(LAST_SEASON_WEEKDAY_COM - com);
        points_light_array.push(LAST_SEASON_WEEKDAY_LIGHT - light);
        // points_hvac_array.push(LAST_SEASON_WEEKDAY_HVAC - hvac);
        points_total_array.push(Number(((LAST_SEASON_WEEKDAY_COM-com)+(LAST_SEASON_WEEKDAY_LIGHT-light)).toFixed(0)))
      }
      console.log("Each cumulated points :               ", points_com.toFixed(0), points_light.toFixed(0));
    }
      // console.log(xAxis_categories);
      console.log(points_com_array);
      console.log(points_light_array);
      // console.log(points_hvac_array);

      drawChart();
  }

  function drawChart(){

    $('#hcc').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'HCC'
        },
        // subtitle: {
        //     text: 'Source: WorldClimate.com'
        // },
        xAxis: {
            categories: xAxis_categories,
            crosshair: true,
            plotBands: [{ // visualize the weekend
                from: 4.5,
                to: 6.5,
                color: 'rgba(68, 170, 213, .1)'
            }, { // visualize the weekend
                from: 11.5,
                to: 13.5,
                color: 'rgba(68, 170, 213, .1)'
            }, { // visualize the weekend
                from: 18.5,
                to: 20.5,
                color: 'rgba(68, 170, 213, .1)'
            }, { // visualize the weekend
                from: 25.5,
                to: 27.5,
                color: 'rgba(68, 170, 213, .1)'
            }, { // visualize the weekend
                from: 32.5,
                to: 34.5,
                color: 'rgba(68, 170, 213, .1)'
            }, { // visualize the weekend
                from: 39.5,
                to: 41.5,
                color: 'rgba(68, 170, 213, .1)'
            }, { // visualize the weekend
                from: 46.5,
                to: 48.5,
                color: 'rgba(68, 170, 213, .1)'
            }, { // visualize the weekend
                from: 53.5,
                to: 55.5,
                color: 'rgba(68, 170, 213, .1)'
            }, { // visualize the weekend
                from: 60.5,
                to: 62.5,
                color: 'rgba(68, 170, 213, .1)'
            }, { // visualize the weekend
                from: 67.5,
                to: 69.5,
                color: 'rgba(68, 170, 213, .1)'
            }, { // visualize the weekend
                from: 74.5,
                to: 76.5,
                color: 'rgba(68, 170, 213, .1)'
            }, { // visualize the weekend
                from: 81.5,
                to: 83.5,
                color: 'rgba(68, 170, 213, .1)'
            }, { // visualize the weekend
                from: 88.5,
                to: 90.5,
                color: 'rgba(68, 170, 213, .1)'
            }, { // visualize the weekend
                from: 95.5,
                to: 97.5,
                color: 'rgba(68, 170, 213, .1)'
            }]
        },
        yAxis: [{ // Primary yAxis
            title: {
                text: 'Points',
            },
            labels: {
                  format: '{value}pts'
            }

          }
        //   , { // Secondary yAxis
        //     title: {
        //       text: 'Temperature',
        //     },
        //     labels: {
        //       format: '{value}°C'
        //     },
        //     opposite: true
        // }
      ],
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Computer',
            type: 'column',
            data: points_com_array

        }, {
            name: 'Light',
            type: 'column',
            data: points_light_array

        }, {
            name: 'Total',
            type: 'spline',
            color : Highcharts.getOptions().colors[3],
            data: points_total_array,
            dataLabels : {
              enabled : true
            }
        }
        // , {
        //     name: 'Temperature',
        //     type: 'spline',
        //     data: temperature_array,
        //     dataLabels : {
        //       enabled : true,
        //       color : 'gray'
        //     },
        //     yAxis: 1,
        //     color : 'gray'
        // }
      ]
    });
  }
});
