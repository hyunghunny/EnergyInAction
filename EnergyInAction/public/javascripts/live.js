var dayLabel = new Array('일', '월', '화', '수', '목', '금', '토');
var day = new Date();
var dayTime = day.getTime();

$(function () {
    document.getElementById("date").innerHTML = (day.getMonth() + 1) + '월 ' + day.getDate() + '일 실시간 사용량';

    showChart();

});

function showChart() {

    Highcharts.setOptions({
        global : {
            useUTC : false
        }
    });

    // Create the chart
    $('#container').highcharts('StockChart', {
        chart : {
            events : {
                load : function () {
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(); // current time
                        invokeOpenAPI('/api/labs/marg/energy/latest.json', function (data) {
                            margTotal = data.sum;
                            console.log(data.sum);
                        });
                        var y = (margTotal/1000000);
                        series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },

        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },

        title : {
            text : 'Real-time consumption'
        },

        exporting: {
            enabled: false
        },

        series : [{
            name : '전력소비량',
            data : (function () {
                // generate an array of data
                var data = [], time = (new Date()).getTime(), i;

                for (i = -999; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000, 0
                    ]);
                }
                return data;
            }())
        }]
    });
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
