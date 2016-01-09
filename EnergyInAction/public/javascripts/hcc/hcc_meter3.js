$(function () {
// 2014년 9월
//     10%      20%      30%      40%      50%      60%      70%      80%      90%     100%
// 1.456493 1.599573 1.700639 2.158003 2.595834 2.962424 3.333164 4.173286 5.741409 7.346176
    var yMax = 8;
    // var firstSeg = 4;
    // var secondSeg = 6;

    var hccTotal = 0;

    var gaugeOptions = {

        chart: {
            type: 'solidgauge',
            backgroundColor: 'rgba(227, 231, 241, 0.0)'//"#EAEAEA"
        },
        title: {
           useHTML: true,
           text: '<br><br>',
           style: {
             color: '#000000',
             fontWeight: 'bold',
            //  'background-color': '#8E8989',
            //  'border-radius': '6px',
            //  border: '4px solid #8E8989'
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
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'rgba(0, 0, 0, 0.05)',
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
            max: 5.0,
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
    $('#hcc_meter').highcharts(Highcharts.merge(gaugeOptions, {

        credits: {
            enabled: false
        },

        series: [{
            name: 'kW',
            data: [8],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:30px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span>' +
                       '<span style="font-size:15px;color:gray">kW</span></div>'
            },
            tooltip: {
                valueSuffix: ' kW'
            }
        }]
    }));

    // Bring life to the dials
    setInterval(function () {
        // Speed
        var chart = $('#hcc_meter').highcharts();

        if(chart) {
          invokeOpenAPI('/api/labs/hcc/energy/latest.json', function (data) {
            //console.log(data);
            hccTotal = data.sum/1000000;
            // console.log(data.location);
          });
          // console.log(hccTotal);

          var point = chart.series[0].points[0];

          if(hccTotal > yMax) hccTotal = 8;
          point.update(hccTotal);

        }
    }, 1000);

});
