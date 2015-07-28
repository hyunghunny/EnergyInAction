var day = new Date();
var dayTime = day.getTime();

$(function () {
    //showChart();
    $('#hvac').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    // this is the target !!
                    var uxHVAC = 0;
                    setInterval(function () {
                        //var uxHVAC = 0;
                        var x = ((new Date()).getTime() - (new Date()).getTimezoneOffset()*60000); // current local time
                        //console.log(new Date());
                        invokeOpenAPI('/api/labs/ux/energy/latest.json', function (data) {
                          //console.log(data);
                          //console.log(data.feeders.length);

                          // accumulate the target feeders values
                          uxHVAC = accumulater(data, 'hvac')
                          //console.log(uxHVAC, data.feeders[5].description);

                        });
                        var y = uxHVAC;

                        try {
                          series.addPoint([x, y], true, true);
                        } catch (err) {
                          console.log(err);
                        }

                    }, 1000);
                }
            }
        },
        title: {
            text: 'ux 실시간 전력 사용량 (냉난방)'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: '사용량 (kW/s)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        plotOptions: {
          spline: {
            dataLabels: {
                enabled: true,
                formatter: function() {
                  return Highcharts.numberFormat(this.y, 2);
                }
              },
              enableMouseTracking: true,
              color :'#8a2be2'
            }
          },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2) + 'kW';
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: '냉난방 사용량',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = ((new Date()).getTime() - (new Date()).getTimezoneOffset()*60000),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: null
                    });
                }
                return data;
            }())
        }]
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
        result = result + (data.feeders[i].value/1000000);
        console.log(data.feeders[i].value/1000000, data.feeders[i].description, result)
      }
  }
  return result;
}
