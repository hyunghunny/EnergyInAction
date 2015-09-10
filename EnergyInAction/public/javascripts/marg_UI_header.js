$(function () {
    setInterval("title()",1000);
});


function title(){
    var now = new Date();
    var month = now.getMonth()+1;
    var day = now.getDate();
    var dayOfWeek = now.getDay();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var ampm = "";
        month = month+"월 "
        day = day+"일 "
console.log(month+day);
        if (hours > 12){
            hours -= 12;
            ampm = "오후 ";
        }else{
            ampm = "오전 ";
        }
        if (hours < 10){
            hours = "0" + hours;
        }
        if (minutes < 10){
            minutes = "0" + minutes;
        }

        if(dayOfWeek==0){
          dayOfWeek=" 일요일 ";
        }else if (dayOfWeek==1) {
          dayOfWeek=" 월요일 ";
        }else if (dayOfWeek==2) {
          dayOfWeek=" 화요일 ";
        }else if (dayOfWeek==3) {
          dayOfWeek=" 수요일 ";
        }else if (dayOfWeek==4) {
          dayOfWeek=" 목요일 ";
        }else if (dayOfWeek==5) {
          dayOfWeek=" 금요일 ";
        }else {
          dayOfWeek=" 토요일 ";
        }
    $('#marg_title').empty();
    $('#marg_clock').empty();
    // var title=$("<div>").attr("id","title").css({"font-size": "40px","font-weight": "bolder","text-align": "center","background-color": "green"}).text("MARG Electricity Usage Monitor").css('color','white');
    // var titlediv=$("<div>").attr("id","titlediv").css({"font-size": "20px","text-align": "right", "background-color": "green"}).text(month+day+ampm+hours+":"+minutes).css('color','white');
    var title=$("<div>").attr("id","title").css({"font-size": "40px","font-weight": "bolder","text-align": "center"}).text("MARG Electricity Usage Monitor").css('color','white');
    // var titlediv=$("<div>").attr("id","titlediv").css({"font-size": "20px","text-align": "right", "padding-right": "10px"}).text(month+day+dayOfWeek+ampm+hours+":"+minutes).css('color','black');
    var titlediv=$("<div>").attr("id","titlediv").css({"font-size": "20px","text-align": "center"}).text(month+day+dayOfWeek+ampm+hours+":"+minutes).css('color','black');

    // $('#marg_title').append(title).append(titlediv);
    // $('#marg_title').prepend(titlediv).prepend(title);
    $('#marg_title').prepend(title);
    $('#marg_clock').append(titlediv);
}
