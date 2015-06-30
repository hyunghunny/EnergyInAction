var day = new Date('2015-4-10');
var dayTime = day.getTime();
var hccTotal = 0;
var margTotal = 0;
var uxTotal = 0;
$(function () {
    document.getElementById("date").innerHTML = (day.getMonth() + 1) + '월 ' + day.getDate() + '일 사용량';
    invokeOpenAPI('/api/labs/hcc/energy/total.json?base_time=' + dayTime, function (data) {
        //alert(data[0].sum + ' ' + data[0].unit);
        hccTotal = data[0].sum;
        // TODO:get computer usage
        // TODO:get light usage
        // TODO:get others usage
        invokeOpenAPI('/api/labs/marg/energy/total.json?base_time=' + dayTime, function (data) {
            //alert(data[0].sum + ' ' + data[0].unit);
            margTotal = data[0].sum;
            // TODO:get computer usage
            // TODO:get light usage
            // TODO:get others usage
            invokeOpenAPI('/api/labs/ux/energy/total.json?base_time=' + dayTime, function (data) {
                //alert(data[0].sum + ' ' + data[0].unit);
                uxTotal = data[0].sum;
                // TODO:get computer usage
                // TODO:get light usage
                // TODO:get others usage
                data = {
                    'hccTotal' : hccTotal,
                    'margTotal' : margTotal,
                    'uxTotal' : uxTotal
                }
                showChart(data);

            });

        });

    });


});

function showChart(data) {
    $('#container').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Energy consumption chart'
        },
        xAxis: {
            categories: ['MARG', 'HCC', 'UX']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total energy consumption (kWh)'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
                name: 'Total',
                data: [data.margTotal, data.hccTotal, data.uxTotal]
            }]
        /*
        series: [{
                name: 'Light',
                data: [5, 3, 4]
            }, {
                name: 'Computer',
                data: [2, 2, 3]
            }, {
                name: 'Others',
                data: [3, 4, 4]
            }]
         */
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