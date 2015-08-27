var dayLabel = new Array('일', '월', '화', '수', '목', '금', '토');

var baseDay     = new Date();
baseDay.setHours(0,0,0,0); // today 날짜만 깔끔히 잡도록 시간 초기화

var comparingDay = shiftDate(baseDay, -1) // 어제

function getLastMonday(date){
  var dayNumber = date.getDay();
  var offset = -7 - dayNumber + 1;

  return shiftDate(date, offset);
}

function shiftDate(date, offset) {
  var shiftedDate = new Date(date);
  shiftedDate.setDate(shiftedDate.getDate() + offset);

  return shiftedDate;
}

var baseTime     = baseDay.getTime();
var comparingDayTime = comparingDay.getTime();

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
            console.log("failed to retrieve:" + request);

        }
    });
}

function accumulator(data, targetDescription) {
  result = 0;
  for(i=0; i<data.feeders.length;i++){
      if(data.feeders[i].description == targetDescription) {
        result = result + (data.feeders[i].value);
        //console.log(data.feeders[i].value, data.feeders[i].description, result)
      }
  }
  return result;
}

function realtime_accumulator(data, targetDescription) {
  result = 0;
  for(i=0; i<data.feeders.length;i++){
      if(data.feeders[i].description == targetDescription) {
        result = result + (data.feeders[i].value);
        //console.log(data.feeders[i].value, data.feeders[i].description, result)
      }
  }
  return result/1000000;
}

function dateFormatter(input_date){
  //console.log('format year', input_date.getFullYear());
  //console.log('format month', input_date.getMonth()+1);
  //console.log('format date', input_date.getDate());

  result = input_date.getFullYear() + '-' + (input_date.getMonth()+1) + '-' + input_date.getDate();
  //console.log(result);
  return result;
}

function dateLabelMaker(input_date){
  //console.log('format year', input_date.getFullYear());
  //console.log('format month', input_date.getMonth()+1);
  //console.log('format date', input_date.getDate());

  //result = (input_date.getMonth()+1) + '/' + input_date.getDate() + '(' + dayLabel[input_date.getDay()] + ')';
  result = (input_date.getMonth()+1) + '/' + input_date.getDate();
  //console.log(result);
  return result;
}
