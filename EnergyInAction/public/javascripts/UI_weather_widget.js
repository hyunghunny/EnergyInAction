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
