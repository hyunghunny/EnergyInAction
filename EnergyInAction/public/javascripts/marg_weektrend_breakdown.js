var dayLabel = new Array('일', '월', '화', '수', '목', '금', '토');

var baseDay     = new Date('2015-07-16');
//var baseDay     = new Date(); // today 날짜 잡도록 시간 초기화가 필요함
var lastWeekDay = new Date(baseDay-(3600000*24*7))
//var toDay   = new Date('2015-04-04');

// var baseTime     = baseDay.getTime() //  + 3600000*9; // for time shift
// var lastWeekTime = lastWeekDay.getTime();
// var   toTime = toDay.getTime() / 1000;

$(function () {
    //document.getElementById("date").innerHTML = (today.getMonth() + 1) + '월 ' + today.getDate() + '일 사용량';

    var xAxis_categories = new Array();

    var data_total = [];
    var data_hvac  = []; //5, 3, 4, 7, 2, 3, 4];
    var data_com   = []; //3, 4, 4, 2, 5, 6, 3];
    var data_light = []; //2, 5, 6, 2, 1, 3, 2];
    var data_etc   = []; //3, 0.5, 4, 4, 3, 2, 1];

    query = 'api/labs/marg/energy/daily.json?day_from=' + dateFormatter(lastWeekDay) + '&day_to=' + dateFormatter(baseDay) + '&offset=9';
    invokeOpenAPI(query, function (data) {
      console.log(data);

      for(var index = 0; index < data.length; index++){
        total = data[index].sum;
        hvac = accumulater(data[index], 'hvac');
        com  = accumulater(data[index], 'computer');
        light = accumulater(data[index], 'light');
        etc = total - (hvac + com + light);

        date_label = data[index].dateFrom.substring(0,10);
        day_label = new Date(date_label);
        day_label = dayLabel[day_label.getDay()];
        xAxis_categories.push(date_label + '(' + day_label+ ')');

        data_total.push(Number(total.toFixed(1)));
        data_hvac.push(Number(hvac.toFixed(1)));
        data_com.push(Number(com.toFixed(1)));
        data_light.push(Number(light.toFixed(1)));
        data_etc.push(Number(etc.toFixed(1)));
      }

      console.log('total', data_total);
      console.log('hvac', data_hvac);
      console.log('com', data_com);
      console.log('light', data_light);
      console.log('etc', data_etc);

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

              series: [{
                  name: '냉난방',
                  data: data_hvac,
                  stack: 'stack',
                  color: '#8a2be2'
              }, {
                  name: '컴퓨터',
                  data: data_com,
                  stack: 'stack',
                  color: '#70AD47'
              }, {
                  name: '전등',
                  data: data_light,
                  stack: 'stack',
                  color: '#ffd700'
              }, {
                  name: '기타',
                  data: data_etc,
                  stack: 'stack',
                  color: '#808080'
              }, {
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
              }]
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
        console.log(data.feeders[i].value, data.feeders[i].description, result)
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
