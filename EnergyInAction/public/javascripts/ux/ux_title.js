var seconds=0;
$(function () {

    setInterval("title()",1000);

});


function title(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var day = now.getDate();
    var dayOfWeek = now.getDay();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var fastHour=seconds;
//     console.log('fastHour: ',fastHour);
// console.log('currentHour: ',minutes);
    if(fastHour == 30) {
      // window.document.getElementById('#ux_day').contentWindow.location.reload(true);
      // $("#ux_day").load(location.href+"#ux_day>*","");
      // $('#ux_day').load('ux_dashboard.html #ux_day');
      // $('#ux_day').load('ux_dashboard.html #ux_day');
    }
    var ampm = "";
        month = month+"."
        day = day+" "
// console.log(month+day);
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
        if (seconds < 10){
            seconds = "0" + seconds;
        }


        if(dayOfWeek==0){
          dayOfWeek=" 일 ";
        }else if (dayOfWeek==1) {
          dayOfWeek=" 월 ";
        }else if (dayOfWeek==2) {
          dayOfWeek=" 화 ";
        }else if (dayOfWeek==3) {
          dayOfWeek=" 수 ";
        }else if (dayOfWeek==4) {
          dayOfWeek=" 목 ";
        }else if (dayOfWeek==5) {
          dayOfWeek=" 금 ";
        }else {
          dayOfWeek=" 토 ";
        }
    $('#ux_title').empty();
    // $('#ux_clock').empty();
    // var title=$("<div>").attr("id","title").css({"font-size": "40px","font-weight": "bolder","text-align": "center","background-color": "green"}).text("ux Electricity Usage Monitor").css('color','white');
    // var titlediv=$("<div>").attr("id","titlediv").css({"font-size": "20px","text-align": "right", "background-color": "green"}).text(month+day+ampm+hours+":"+minutes).css('color','white');
    var title=$("<div>").attr("id","title").css({"float": "left","clear":"none","font-size": "18px","font-weight": "bolder","text-align": "center", "padding-top": "5px", "padding-left": "900px", "text-shadow":"1px 1px 5px #A0A0A0"}).text("UX Electricity Usage Monitor").css('color','white');
    var titlediv=$("<div>").attr("id","titlediv").css({"float": "right","clear":"none","font-size": "18px","text-align": "right","font-weight": "bolder", "padding-right": "5px", "padding-top": "5px", "text-shadow":"1px 1px 5px #A0A0A0"}).text(year+"."+month+day+dayOfWeek+ampm+hours+":"+minutes+":"+seconds).css('color','white');
    // $('#ux_title').append(title).append(titlediv);
    $('#ux_title').prepend(titlediv).prepend(title);
    // $('#ux_title').prepend(title);
    // $('#ux_clock').append(titlediv);
}
