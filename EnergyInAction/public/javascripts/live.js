var dayLabel = new Array('일', '월', '화', '수', '목', '금', '토');
var baseDay = new Date('2015-04-03');
var toDay   = new Date('2015-04-06');

var baseTime = baseDay.getTime();
var   toTime = toDay.getTime();

$(function () {
    document.getElementById("date").innerHTML = 'MARG ' +
                                                (baseDay.getMonth() + 1) + '월 ' +  baseDay.getDate() + '일(' + dayLabel[baseDay.getDay()] + ') ~ ' +
                                                (  toDay.getMonth() + 1) + '월 ' +    toDay.getDate() + '일(' + dayLabel[  toDay.getDay()] + ') 사용량';
    query = '/api/labs/marg/energy/hours.json?base_time=' + baseTime + '&to_time=' + toTime;
    invokeOpenAPI(query, function (data) {

    //console.log(baseTime, toTime);
    //console.log(query);
    //console.log(data);

    plotData = "Day,Computer,Light,Others\n"

    for(var index = 0; index < data.length; index++){
      label = data[index].dateFrom.substring(5,7) + '/' + data[index].dateFrom.substring(8,10) + ' ' + data[index].dateFrom.substring(11,13) + '시,';
      margTotal = data[index].sum;
      margCom   = data[index].feeders[4].value +
                  data[index].feeders[5].value +
                  data[index].feeders[11].value;
      margLight = data[index].feeders[14].value;
      margOther = margTotal - margCom - margLight;

      //console.log(label, margCom.toFixed(2), margLight.toFixed(2), margOther.toFixed(2));

      plotData = plotData +
                 label + margCom.toFixed(2) + "," + margLight.toFixed(2) + "," + margOther.toFixed(2) + "\n";

    };

    console.log(plotData);
    console.log(query);

    showChart();

  });

});

function showChart() {

  Highcharts.setOptions({
          global : {
              useUTC : false
          }
      });

      // Create the chart
      $('#container').highcharts('StockChart', {
          chart : {
              events : {
                  load : function () {

                      // set up the updating of the chart each second
                      var series = this.series[0];
                      setInterval(function () {
                          var x = (new Date()).getTime(), // current time
                              y = Math.round(Math.random() * 100);
                          series.addPoint([x, y], true, true);
                      }, 1000);
                  }
              }
          },

          rangeSelector: {
              buttons: [{
                  count: 1,
                  type: 'minute',
                  text: '1M'
              }, {
                  count: 5,
                  type: 'minute',
                  text: '5M'
              }, {
                  type: 'all',
                  text: 'All'
              }],
              inputEnabled: false,
              selected: 0
          },

          title : {
              text : 'Live random data'
          },

          exporting: {
              enabled: false
          },

          series : [{
              name : 'Random data',
              data : (function () {
                  // generate an array of random data
                  var data = [], time = (new Date()).getTime(), i;

                  for (i = -999; i <= 0; i += 1) {
                      data.push([
                          time + i * 1000,
                          Math.round(Math.random() * 100)
                      ]);
                  }
                  return data;
              }())
          }]
      });

}

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
            alert("failed to retrieve:" + request);


        }
    });
}
