var controller = require('../control');

var labs = controller.labs;
uxlab = labs.find('ux');
console.log(uxlab.description);
var queries = {
    base_time: (new Date('2015-04-02')).getTime(),
    to_time: (new Date('2015-04-03')).getTime()
}

/*
var type = 'quarters' //'hours' // 'quarters' // 'secs'
uxlab.retrieveUsages(type, queries, function (results) {
    console.log(results);
});
 */

uxlab.accumulateUsages(queries, function (results) {
    console.log(results);
})