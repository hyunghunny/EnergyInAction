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
    var title=$("<div>").attr("id","title").css({"font-size": "40px","font-weight": "bolder","text-align": "center","background-color": "green"}).text("MARG Electricity Usage Monitor").css('color','white');
    var titlediv=$("<div>").attr("id","titlediv").css({"font-size": "20px","text-align": "right", "background-color": "green"}).text(month+day+ampm+hours+":"+minutes).css('color','white');
    $('#marg_title').append(title).append(titlediv);
}
