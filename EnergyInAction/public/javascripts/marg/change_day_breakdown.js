$(function() {

  var timer = setInterval( showDiv, 5000);

  var counter = 0;

  function showDiv() {
    if (counter ==0) { counter++; return; }

    $('#day_breakdown').empty();
    $('marg_day_breakdown','#day_breakdown')
      .stop()
      .hide()
      .filter( function() { return this.id.match('marg_day_breakdown' + counter); })
      .show('fast');
    counter == 3? counter = 0 : counter++;

  }

});
