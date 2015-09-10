$(function () {
// 2014년 9월
//     10%      20%      30%      40%      50%      60%      70%      80%      90%     100%
// 1.456493 1.599573 1.700639 2.158003 2.595834 2.962424 3.333164 4.173286 5.741409 7.346176
    var yMax = 8;
    // var firstSeg = 4;
    // var secondSeg = 6;

    var margTotal = 0;

    var gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: {
            text: '[ 실시간 전력 사용량 ]'
        },

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // The speed gauge
    $('#marg_meter').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 8
            // title: {
            //     text: '[ 실시간 전력 사용량 ]'
            // }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Speed',
            data: [80],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                       '<span style="font-size:12px;color:silver">kW/h</span></div>'
            },
            tooltip: {
                valueSuffix: ' kW/h'
            }
        }]

    }));

    // Bring life to the dials
    setInterval(function () {
        // Speed
        var chart = $('#marg_meter').highcharts();

        if(chart) {
          invokeOpenAPI('/api/labs/marg/energy/latest.json', function (data) {
            //console.log(data);
            margTotal = data.sum/1000000;
            // console.log(data.location);
          });
          console.log(margTotal);

          var point = chart.series[0].points[0];

          if(margTotal > yMax) margTotal = 8;
          point.update(margTotal);

        }
    }, 1000);

});
