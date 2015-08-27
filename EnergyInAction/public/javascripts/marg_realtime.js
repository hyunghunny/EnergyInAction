$(function () {
    //document.getElementById("date").innerHTML = (day.getMonth() + 1) + '월 ' + day.getDate() + '일 실시간 사용량';

    //showChart();
    $('#container').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    var margTotal = 0;
                    setInterval(function () {
                        //var x = (new Date()).getTime(); // current time
                        var x = ((new Date()).getTime() - (new Date()).getTimezoneOffset()*60000); // current local time
                        console.log(x);
                        //console.log(new Date());
                        invokeOpenAPI('/api/labs/marg/energy/latest.json', function (data) {
                          //console.log(data);
                          margTotal = data.sum/1000000;
                          console.log(data.location);
                        });
                        var y = margTotal;
                        //var y = margTotal.toFixed(2);
                        //var y = Highcharts.numberFormat(margTotal,2);
                        console.log(y);

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
            text: 'MARG 실시간 전력 사용량 (전체)'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100
        },
        yAxis: {
            title: {
                text: '사용량 (kW/s)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            minTickInterval: 0.5
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
              color :'#1e90ff'
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
            name: '전체 사용량',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = ((new Date()).getTime() - (new Date()).getTimezoneOffset()*60000),
                    i;

                for (i = -29; i <= 0; i += 1) {
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
