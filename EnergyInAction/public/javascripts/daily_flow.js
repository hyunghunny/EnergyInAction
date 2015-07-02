var day = new Date('2015-04-03');
var dayTime = day.getTime();

var margTotal = 0;
var margCom = 0;
var margLight = 0;
var margOther = 0;

var hccTotal = 0;
var hccCom = 0;
var hccLight = 0;
var hccOther = 0;

var uxTotal = 0;
var uxCom = 0;
var uxLight = 0;
var uxOther = 0;

// margComFeederID = [4,5,11]
// margLightFeederID = [14]

// hccComFeederID = [2,9]
// hccLightFeederID = [10]

// uxComFeederID = [11]
// uxLightFeederID = [20]

$(function () {
    document.getElementById("date").innerHTML = (day.getMonth() + 1) + '월 ' + day.getDate() + '일 사용량';
    invokeOpenAPI('/api/labs/marg/energy/total.json?base_time=' + dayTime, function (data) {
        //alert(data[0].sum + ' ' + data[0].unit);
        //console.log(data[0].feeders[4].value + ' ' + data[0].feeders[4].feederID);
        //console.log(data[0].feeders[5].value + ' ' + data[0].feeders[5].feederID);
        //console.log(data[0].feeders[11].value + ' ' + data[0].feeders[11].feederID);

        margTotal = data[0].sum;
        margCom   = data[0].feeders[4].value + 
                    data[0].feeders[5].value + 
                    data[0].feeders[11].value;
        margLight = data[0].feeders[14].value;
        margOther = margTotal - margCom - margLight;
        
        console.log(margTotal, margCom, margLight, margOther);

        invokeOpenAPI('/api/labs/hcc/energy/total.json?base_time=' + dayTime, function (data) {
            //alert(data[0].sum + ' ' + data[0].unit);
            
            hccTotal = data[0].sum;
            hccCom   = data[0].feeders[2].value + 
                       data[0].feeders[9].value;
            hccLight = data[0].feeders[10].value;
            hccOther = hccTotal - hccCom - hccLight;

            console.log(hccTotal, hccCom, hccLight, hccOther);
        
            invokeOpenAPI('/api/labs/ux/energy/total.json?base_time=' + dayTime, function (data) {
                //alert(data[0].sum + ' ' + data[0].unit);
                uxTotal = data[0].sum;
                uxCom   = data[0].feeders[11].value;
                uxLight = data[0].feeders[20].value;
                uxOther = uxTotal - uxCom - uxLight;

                console.log(uxTotal, uxCom, uxLight, uxOther);

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
            text: 'Daily Energy Consumption Chart'
        },
        xAxis: {
            categories: ['MARG', 'HCC', 'UX']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total energy consumption (kW/h)'
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
        /*
        series: [{
                name: 'Total',
                data: [data.margTotal, data.hccTotal, data.uxTotal]
            }]
        */
        series: [{
                name: 'Others',
                data: [margOther, hccOther, uxOther]
            }, {
                name: 'Light',
                data: [margLight, hccLight, uxLight]
            }, {
                name: 'Computer',
                data: [margCom, hccCom, uxCom]
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