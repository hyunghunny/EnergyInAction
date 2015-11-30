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
            type: 'solidgauge',
            backgroundColor: "#ecede7"
        },
        title: {
           useHTML: true,
           text: '[ 실시간 전력 사용량 ]',
           style: {
             color: '#FFFFFF',
             fontWeight: 'bold',
             'background-color': '#8E8989',
             'border-radius': '6px',
             border: '4px solid #8E8989'
           }
       },

        exporting: {
            enabled: false
        },
        pane: {
            center: ['50%', '85%'],
            size: '150%',
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
            min: 0,
            max: 8.5,
            stops: [
                [0.1, '#197F00'], // green
                [0.8, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
                // [0.1, '#4169e1'], // green
                // [0.8, '#4169e1'], // yellow
                // [0.9, '#4169e1'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 200,
            tickWidth: 0,
            title: {
                y: -60
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

        credits: {
            enabled: false
        },

        series: [{
            name: 'kW',
            data: [8],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:40px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                       '<span style="font-size:12px;color:silver">kW</span></div>'
            },
            tooltip: {
                valueSuffix: ' kW'
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
          // console.log(margTotal);

          var point = chart.series[0].points[0];

          if(margTotal > yMax) margTotal = 8;
          point.update(margTotal);

        }
    }, 1000);

});
