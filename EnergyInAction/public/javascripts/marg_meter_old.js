$(function () {
// 2014년 9월
//     10%      20%      30%      40%      50%      60%      70%      80%      90%     100%
// 1.456493 1.599573 1.700639 2.158003 2.595834 2.962424 3.333164 4.173286 5.741409 7.346176
    var yMax = 8;
    var firstSeg = 4;
    var secondSeg = 6;

    var margTotal = 0;

    $('#marg_meter').highcharts({
      chart: {
              type: 'gauge',
              plotBackgroundColor: null,
              plotBackgroundImage: null,
              plotBorderWidth: 0,
              plotShadow: false
          },

          title: {
              text: '실시간 전력 사용량'
          },

          pane: {
              startAngle: -150,
              endAngle: 150,
              background: [{
                  backgroundColor: {
                      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                      stops: [
                          [0, '#FFF'],
                          [1, '#333']
                      ]
                  },
                  borderWidth: 0,
                  outerRadius: '109%'
              }, {
                  backgroundColor: {
                      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                      stops: [
                          [0, '#333'],
                          [1, '#FFF']
                      ]
                  },
                  borderWidth: 1,
                  outerRadius: '107%'
              }, {
                  // default background
              }, {
                  backgroundColor: '#DDD',
                  borderWidth: 0,
                  outerRadius: '105%',
                  innerRadius: '103%'
              }]
          },

          // the value axis
          yAxis: {
              min: 0,
              max: yMax,

              minorTickInterval: 'auto',
              minorTickWidth: 1,
              minorTickLength: 10,
              minorTickPosition: 'inside',
              minorTickColor: '#666',

              tickPixelInterval: 30,
              tickWidth: 2,
              tickPosition: 'inside',
              tickLength: 10,
              tickColor: '#666',
              labels: {
                  step: 2,
                  rotation: 'auto'
              },
              title: {
                  text: '단위 kW/h'
              },
              plotBands: [{
                  from: 0,
                  to: firstSeg,
                  color: '#55BF3B' // green
              }, {
                  from: firstSeg,
                  to: secondSeg,
                  color: '#DDDF0D' // yellow
              }, {
                  from: secondSeg,
                  to: yMax,
                  color: '#DF5353' // red
              }]
          },

          series: [{
              // name: '실시간 전력사용량',
              data: [80]
              // tooltip: {
              //     valueSuffix: '단위 kW/h'
              // }
          }]

      },
      // Add some life
      function (chart) {
          if (!chart.renderer.forExport) {
              setInterval(function () {
                invokeOpenAPI('/api/labs/marg/energy/latest.json', function (data) {
                  //console.log(data);
                  margTotal = data.sum/1000000;
                  // console.log(data.location);
                });
                console.log(margTotal);

                var point = chart.series[0].points[0];
                //     newVal,
                //     inc = Math.round((Math.random() - 0.5) * 20);
                //
                // newVal = point.y + inc;
                // if (newVal < 0 || newVal > 200) {
                //     newVal = point.y - inc;
                // }
                if(margTotal > yMax) margTotal = 8;
                point.update(margTotal);

            }, 1000);
        }
    });
});
