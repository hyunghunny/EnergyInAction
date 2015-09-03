
/**
$(function () {
  function weather(){
    $(document).ready(function () {
    $('#marg_widget').weatherfeed(['UKXX0085','EGXX0011','UKXX0061','CAXX0518','CHXX0049'],{},function(e) {
    $("div.scrollable").scrollable({
            vertical: true,
            size: 1,
      circular: true
    }).navigator().autoscroll({
      interval: 3000
    });
    });
    });
  }

});
**/


$(function () {
  var w_widget = document.getElementById("marg_widget");
    setInterval("weather()",1000);
});


function weather(){
  $('#marg_widget').empty();
}

/**
<a href="http://www.accuweather.com/en/kr/suwon/223670/weather-forecast/223670" class="aw-widget-legal">
</a><div id="awcc1441096686355" class="aw-widget-current"  data-locationkey="223670" data-unit="c" data-language="en-us" data-useip="false" data-uid="awcc1441096686355"></div>
<script type="text/javascript" src="http://oap.accuweather.com/launch.js"></script>**/
