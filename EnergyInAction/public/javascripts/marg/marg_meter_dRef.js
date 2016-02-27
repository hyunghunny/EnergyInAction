//////////////////////////
/// RealTime gauge Ref ///

var TODAY = new Date();
// console.log("# TODAY", TODAY);

if ((new Date('2016-2-1 00:00:00')) <= TODAY && TODAY <= (new Date('2016-2-29 00:00:00'))){
  console.log("## Realtime Ref for 2016-2-1 ~ 2016-2-29");
  // ## 90th percentiles: Last Winter (2014.12 ~ 2015.2) X 110%
  var MARG_REALTIME_MAX = 6.8;
  var HCC_REALTIME_MAX = 5.0;
  var UX_REALTIME_MAX = 2.4;

} else if ((new Date('2016-3-1 00:00:00')) <= TODAY && TODAY <= (new Date('2016-3-31 00:00:00'))){
  console.log("## Realtime Ref for 2016-3-1 ~ 2016-3-31");
  // ## 90th percentiles : Last Spring (2015.3 ~ 2015.5) X 110%
  var MARG_REALTIME_MAX = 4.2
  var HCC_REALTIME_MAX = 2.9
  var UX_REALTIME_MAX = 2.6

} else {
  console.log("## ERROR! Realtime Ref");
}

$(function () {

    var margTotal = 0;

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
            max: MARG_REALTIME_MAX,
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
        var chart = $('#marg_meter').highcharts();

        if(chart) {
          invokeOpenAPI('/api/labs/marg/energy/latest.json', function (data) {
            //console.log(data);
            margTotal = data.sum/1000000;
            // console.log(data.location);
          });
          // console.log(margTotal);

          var point = chart.series[0].points[0];

          // if(margTotal > yMax) margTotal = 8;
          point.update(margTotal);

        }
    }, 1000);

});
