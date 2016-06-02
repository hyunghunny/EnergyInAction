
var allSchedules = [];
var baseUrl = 'http://147.47.123.199:3300/';
var baseUrl = '../'; // for testing only

function extractSchedules(timeBox) {
    allSchedules = []; // clean up
    
    for (var i = 0; i < timeBox.length; i++) {
        var dayBox = timeBox[i];
        switch (i) {            
            case 0:
                if (dayBox.length > 0) extractInfo('Sunday', dayBox);
                break;
            case 1:
                if (dayBox.length > 0) extractInfo('Monday', dayBox);
                break;
            case 2:
                if (dayBox.length > 0) extractInfo('Tuesday', dayBox);
                break;
            case 3:
                if (dayBox.length > 0) extractInfo('Wednesday', dayBox);
                break;
            case 4:
                if (dayBox.length > 0) extractInfo('Thursday', dayBox);
                break;
            case 5:
                if (dayBox.length > 0) extractInfo('Friday', dayBox);
                break;
            case 6:
                if (dayBox.length > 0) extractInfo('Saturday', dayBox);
                break;
            default:
                console.log('Wrong timebox!')
                break;
        }
    }
}

function extractInfo(weekday, dayBoxes) {
    
    for (var i = 0; i < dayBoxes.length ; i++) {
        var dayBox = dayBoxes[i];
        //console.log(dayBox);
        //console.log("top : " + ($(dayBox).position()).top);
        //console.log("height1 :" + ($(dayBox).find('.t_box')).height());
        //console.log("height2 :" + ($(dayBox).find('.t_box2')).height());
        var schedule = {
            "weekday": weekday,
            "top": ($(dayBox).position()).top,
            "height1": ($(dayBox).find('.t_box')).height(),
            "height2": ($(dayBox).find('.t_box2')).height()
        }
        //console.log(JSON.stringify(schedule));
        
        allSchedules.push(schedule);
    }
}

// Export all schedules by calling Web API
function exportSchedules(userId, logs) {
    var postUrl = baseUrl + 'api/labs/ux/logs/calendars';
    var payload = {};
    payload.id = userId;
    payload.schedules = logs;
    console.log(JSON.stringify(payload)); // show payload to debug
    $.ajax({
        'url': postUrl,
        'type': 'post',
        'contentType': "application/json",
        'dataType': 'json',
        'statusCode': {
            '202': function (data) {
                alert('It have been exported successfully');
                
            }
        },
        'data': JSON.stringify(payload)
    });
}