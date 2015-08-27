$(function () {
    setInterval("title()",1000);
});


function title(){
    var now = new Date();
    var month = now.getMonth();
    var day = now.getDay();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var ampm = "";

        month = month+"월 "
        day = day+"일 "

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
    $('#marg_title').empty();
    var title=$("<div>").attr("id","title").css({"font-size": "larger","font-weight": "bolder","text-align": "center"}).text("MARG Electricity Usage Monitor");
    var titlediv=$("<div>").attr("id","titlediv").css({"text-align": "right"}).text(month+day+ampm+hours+":"+minutes); //시간을 꾸밀 css 추가할것
    $('#marg_title').append(title).append(titlediv);
}
