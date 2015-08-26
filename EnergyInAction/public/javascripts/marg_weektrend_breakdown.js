var dayLabel = new Array('일', '월', '화', '수', '목', '금', '토');

var baseDay     = new Date('2015-07-31');
//var baseDay     = new Date(); // today 날짜 잡도록 시간 초기화가 필요함

var lastMonday = getLastMonday(baseDay);
var lastSunday = shiftDate(lastMonday, 6);
var thisMonday = shiftDate(lastMonday, 7);
var thisSunday = shiftDate(thisMonday, 6);

function getLastMonday(date){
  var dayNumber = date.getDay();
  var offset = -7 - dayNumber + 1;

  return shiftDate(date, offset);
}

function shiftDate(date, offset) {
  var shiftedDate = new Date(date);
  shiftedDate.setDate(shiftedDate.getDate() + offset);

  return shiftedDate;
}

// console.log(lastMonday);
// console.log(lastSunday);
// console.log(thisMonday);
// console.log(thisSunday);

$(function () {
    //document.getElementById("date").innerHTML = (today.getMonth() + 1) + '월 ' + today.getDate() + '일 사용량';

    //var xAxis_categories = new Array();
    var xAxis_categories = ['월', '화', '수', '목', '금', '토', '일'];
    var lastWeek_data_total = [];
    var lastWeek_data_hvac  = [];
    var lastWeek_data_com   = [];
    var lastWeek_data_light = [];
    var lastWeek_data_etc   = [];

    var thisWeek_data_total = [];
    var thisWeek_data_hvac  = [];
    var thisWeek_data_com   = [];
    var thisWeek_data_light = [];
    var thisWeek_data_etc   = [];

    //query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(lastMonday) + '&day_to=' + dateFormatter(baseDay) + '&offset=9';
    lastWeek_query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(lastMonday) + '&day_to=' + dateFormatter(lastSunday) + '&offset=9';

    //console.log(lastWeek_query);

    invokeOpenAPI(lastWeek_query, function (lastWeek_data) {

      //console.log(lastWeek_data);

      thisWeek_query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(thisMonday) + '&day_to=' + dateFormatter(thisSunday) + '&offset=9';
      invokeOpenAPI(thisWeek_query, function (thisWeek_data) {

      for(var index = 0; index < lastWeek_data.length; index++){
        total = lastWeek_data[index].sum;
        hvac = accumulater(lastWeek_data[index], 'hvac');
        com  = accumulater(lastWeek_data[index], 'computer');
        light = accumulater(lastWeek_data[index], 'light');
        etc = total - (hvac + com + light);

        // date_label = lastWeek_data[index].dateFrom.substring(0,10);
        // day_label = new Date(date_label);
        // day_label = dayLabel[day_label.getDay()];
        // xAxis_categories.push(date_label + '(' + day_label+ ')');

        lastWeek_data_total.push(Number(total.toFixed(1)));
        lastWeek_data_hvac.push(Number(hvac.toFixed(1)));
        lastWeek_data_com.push(Number(com.toFixed(1)));
        lastWeek_data_light.push(Number(light.toFixed(1)));
        lastWeek_data_etc.push(Number(etc.toFixed(1)));
      }

      for(var index = 0; index < thisWeek_data.length; index++){
        total = thisWeek_data[index].sum;
        hvac = accumulater(thisWeek_data[index], 'hvac');
        com  = accumulater(thisWeek_data[index], 'computer');
        light = accumulater(thisWeek_data[index], 'light');
        etc = total - (hvac + com + light);

        thisWeek_data_total.push(Number(total.toFixed(1)));
        thisWeek_data_hvac.push(Number(hvac.toFixed(1)));
        thisWeek_data_com.push(Number(com.toFixed(1)));
        thisWeek_data_light.push(Number(light.toFixed(1)));
        thisWeek_data_etc.push(Number(etc.toFixed(1)));
      }

      // console.log('total', data_total);
      // console.log('hvac', data_hvac);
      // console.log('com', data_com);
      // console.log('light', data_light);
      // console.log('etc', data_etc);

      //showChart();
      $('#container').highcharts({
              chart: {
                  type: 'column'
              },

              title: {
                  text: '지난 일주일 전력 사용 변화'
              },

              xAxis: {
                  categories: xAxis_categories
              },

              yAxis: {
                  allowDecimals: false,
                  min: 0,
                  title: {
                      text: '전력 사용량 (kW/h)'
                  },
                  stackLabels: {
                      enabled: true,
                      style: {
                          fontWeight: 'bold',
                          color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                      }
                  }
              },
              //
              // tooltip: {
              //     formatter: function () {
              //         return '<b>' + this.x + '</b><br/>' +
              //             this.series.name + ': ' + this.y + '<br/>' +
              //             'Total: ' + this.point.stackTotal;
              //     }
              // },

              plotOptions: {
                  column: {
                      stacking: 'normal'
                  }
              },

              series: [
                // {
                //     name: '지난주',
                //     data: lastWeek_data_total,
                //     stack: 'lastWeek',
                //     color: Highcharts.getOptions().colors[0]
                // }, {
                //     name: '이번주',
                //     data: thisWeek_data_total,
                //     stack: 'thisWeek',
                //     color: Highcharts.getOptions().colors[2]
                // }

                {
                    name: '냉난방',
                    data: lastWeek_data_hvac,
                    stack: 'lastWeek',
                    color: Highcharts.getOptions().colors[0]
                }, {
                    name: '컴퓨터',
                    data: lastWeek_data_com,
                    stack: 'lastWeek',
                    color: Highcharts.getOptions().colors[1]
                }, {
                    name: '전등',
                    data: lastWeek_data_light,
                    stack: 'lastWeek',
                    color: Highcharts.getOptions().colors[2]
                }, {
                    name: '기타',
                    data: lastWeek_data_etc,
                    stack: 'lastWeek',
                    color: Highcharts.getOptions().colors[3]
                }, {
                    name: '냉난방',
                    data: thisWeek_data_hvac,
                    stack: 'thisWeek',
                    color: Highcharts.getOptions().colors[0]
                }, {
                    name: '컴퓨터',
                    data: thisWeek_data_com,
                    stack: 'thisWeek',
                    color: Highcharts.getOptions().colors[1]
                }, {
                    name: '전등',
                    data: thisWeek_data_light,
                    stack: 'thisWeek',
                    color: Highcharts.getOptions().colors[2]
                }, {
                    name: '기타',
                    data: thisWeek_data_etc,
                    stack: 'thisWeek',
                    color: Highcharts.getOptions().colors[3]
                }

              /*, {
                  type: 'spline',
                  name: '전체',
                  data: data_total,
                  dataLabels: {
                      enabled: true,
                      format: '{y}'
                  },
                  marker: {
                      lineWidth: 2,
                      lineColor: '#1e90ff',
                      fillColor: 'white'
                  }
              }*/
              ]
          });
        });
      });
});


function invokeOpenAPI(url, scb) {
    $.ajax({
        url : url,
        type : "get",
        dataType : "json",
        success : function (data) {

            console.log('retrieve success:' + data);
            scb(data)

        },

        error : function (request) {
            console.log("failed to retrieve:" + request);

        }
    });
}

function accumulater(data, targetDescription) {
  result = 0;
  for(i=0; i<data.feeders.length;i++){
      if(data.feeders[i].description == targetDescription) {
        result = result + (data.feeders[i].value);
        //console.log(data.feeders[i].value, data.feeders[i].description, result)
      }
  }
  return result;
}

function dateFormatter(input_date){
  //console.log('format year', input_date.getFullYear());
  //console.log('format month', input_date.getMonth()+1);
  //console.log('format date', input_date.getDate());

  result = input_date.getFullYear() + '-' + (input_date.getMonth()+1) + '-' + input_date.getDate();
  //console.log(result);
  return result;
}
