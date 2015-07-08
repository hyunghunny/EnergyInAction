var base_day = new Date('2015-04-07');

var dayTime = base_day.getTime();

$(function () {
    document.getElementById("date").innerHTML = (base_day.getMonth() + 1) + '월 ' + base_day.getDate() + '일(' + base_day.getDay() + ') 사용량';
    invokeOpenAPI('/api/labs/marg/energy/hours.json?base_time=' + dayTime, function (data) {
    //alert(data[0].sum + ' ' + data[0].unit);
    //console.log(data[0].feeders[4].value + ' ' + data[0].feeders[4].feederID);
    //console.log(data[0].feeders[5].value + ' ' + data[0].feeders[5].feederID);
    //console.log(data[0].feeders[11].value + ' ' + data[0].feeders[11].feederID);

    plotData = "Day,Computer,Light,Others\n"

    for(var index = 0; index < data.length; index++){
      label = data[index].dateFrom.substring(11,13);
      margTotal = data[index].sum;
      margCom   = data[index].feeders[4].value +
                  data[index].feeders[5].value +
                  data[index].feeders[11].value;
      margLight = data[index].feeders[14].value;
      margOther = margTotal - margCom - margLight;

      console.log(label, margCom.toFixed(2), margLight.toFixed(2), margOther.toFixed(2));

      plotData = plotData +
                 label + "시," + margCom.toFixed(2) + "," + margLight.toFixed(2) + "," + margOther.toFixed(2) + "\n";

      console.log(plotData)
    };

    showChart(plotData);

  });

});

function showChart(data) {

      // Get the CSV and create the chart
//      $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=analytics.csv&callback=?', function (csv) {

//          console.log(csv);

//          csv = "Day,MARG,HCC,UX\n3/9/13,5691,4346,4546\n3/10/13,5403,4112,6112\n3/11/13,15574,11356,9356";

          $('#container').highcharts({

              data: {
                  //csv: csv
                  csv: data
              },
              title: {
                  text: 'Daily Electricity Usage'
              },
              subtitle: {
                  text: 'Source: SNU Encored data'
              },

              xAxis: {
                  tickInterval: 3, // 12 for quarters, 3 for hours
                  tickWidth: 0,
                  gridLineWidth: 1,
                  labels: {
                      align: 'left',
                      x: 3,
                      y: -3
                  }
              },

              yAxis: [{ // left y axis
                  title: {
                      text: null
                  },
                  labels: {
                      align: 'left',
                      x: 3,
                      y: 16,
                      format: '{value:.,0f}'
                  },
                  showFirstLabel: false
              }, { // right y axis
                  linkedTo: 0,
                  gridLineWidth: 0,
                  opposite: true,
                  title: {
                      text: null
                  },
                  labels: {
                      align: 'right',
                      x: -3,
                      y: 16,
                      format: '{value:.,0f}'
                  },
                  showFirstLabel: false
              }],

              legend: {
                  align: 'left',
                  verticalAlign: 'top',
                  y: 20,
                  floating: true,
                  borderWidth: 0
              },

              tooltip: {
                  shared: true,
                  crosshairs: true
              },

              plotOptions: {
                  series: {
                      cursor: 'pointer',
                      point: {
                          events: {
                              click: function (e) {
                                  hs.htmlExpand(null, {
                                      pageOrigin: {
                                          x: e.pageX || e.clientX,
                                          y: e.pageY || e.clientY
                                      },
                                      headingText: this.series.name,
                                      maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                          this.y + ' visits',
                                      width: 200
                                  });
                              }
                          }
                      },
                      marker: {
                          lineWidth: 1
                      }
                  }
              },

              series: [{
                  name: 'All visits',
                  lineWidth: 4,
                  marker: {
                      radius: 4
                  }
              }, {
                  name: 'New visitors'
              }]
          });
//      });
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
