//var dayLabel = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
var dayLabel = new Array('일', '월', '화', '수', '목', '금', '토');
var baseDay = new Date('2015-07-13');
var toDay   = new Date('2015-07-14');

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

    showChart(plotData);

  });

});

function showChart(data) {

          $('#container').highcharts({

              data: {
                  //csv: csv
                  csv: data
              },
              title: {
                  text: 'Daily Electricity Usage (kW/h)'
              },
              subtitle: {
                  text: 'Source: Encored SNU data'
              },

              xAxis: {
                  tickInterval: 3, // 12 for quarters, 3 for hours
                  tickWidth: 0,
                  gridLineWidth: 1,
                  labels: {
                      formatter: function() {
                        return this.value.substring(6,10);
                      },
                      align: 'left',
                      x: 3,
                      y: -5
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
                  align: 'center',
                  verticalAlign: 'bottom',
                  y: 20,
                  floating: true,
                  borderWidth: 0
              },

              tooltip: {
                  shared: true,
                  crosshairs: true
              },

              /*
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
                                          this.y + ' kW/h',
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
              */
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
