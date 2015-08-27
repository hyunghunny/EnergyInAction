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
                    var margLight = 0;
                    setInterval(function () {
                        //var margLight = 0;
                        var x = ((new Date()).getTime() - (new Date()).getTimezoneOffset()*60000); // current local time
                        //console.log(new Date());
                        invokeOpenAPI('/api/labs/marg/energy/latest.json', function (data) {
                          //console.log(data);
                          //console.log(data.feeders.length);

                          // accumulate the target feeders values
                          margLight = realtime_accumulator(data, 'hvac')
                          //console.log(margLight, data.feeders[5].description);

                        });
                        var y = margLight;

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
            text: 'MARG 실시간 전력 사용량 (냉난방)'
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
