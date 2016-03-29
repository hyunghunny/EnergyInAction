
var EDMInfoFactory = function () {
    // UX EDM
    var uxEdm = new EDMInfo(1169, "D409");
    
    uxEdm.addFeeder(new FeederInfo(3, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(4, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(5, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(6, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(7, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(8, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(9, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(10, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(11, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(12, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(13, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(14, "computer"));
    uxEdm.addFeeder(new FeederInfo(15, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(16, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(17, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(18, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(19, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(20, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(21, "unclassified"));
    uxEdm.addFeeder(new FeederInfo(22, "hvac"));
    uxEdm.addFeeder(new FeederInfo(23, "light"));
    
    
    // MARG EDM
    var margEdm = new EDMInfo(1171, "D406");
    
    margEdm.addFeeder(new FeederInfo(3, "hvac"));
    margEdm.addFeeder(new FeederInfo(4, "hvac"));
    margEdm.addFeeder(new FeederInfo(5, "hvac"));
    margEdm.addFeeder(new FeederInfo(6, "unclassified"));
    margEdm.addFeeder(new FeederInfo(7, 'computer'));
    margEdm.addFeeder(new FeederInfo(8, 'computer'));
//    margEdm.addFeeder(new FeederInfo(9, "unclassified"));
//    margEdm.addFeeder(new FeederInfo(10, "unclassified"));
    margEdm.addFeeder(new FeederInfo(11, "unclassified"));
    margEdm.addFeeder(new FeederInfo(12, "unclassified"));
    margEdm.addFeeder(new FeederInfo(13, "unclassified"));
    margEdm.addFeeder(new FeederInfo(14, 'computer'));
    margEdm.addFeeder(new FeederInfo(15, "unclassified"));
    margEdm.addFeeder(new FeederInfo(16, "unclassified"));
    margEdm.addFeeder(new FeederInfo(17, 'light'));
    margEdm.addFeeder(new FeederInfo(18, "unclassified"));
    margEdm.addFeeder(new FeederInfo(21, "unclassified"));
    
    
    // HCC EDM
    var hccEdm = new EDMInfo(1168, "D410");
    
    hccEdm.addFeeder(new FeederInfo(3, "unclassified"));
    hccEdm.addFeeder(new FeederInfo(4, "unclassified"));
    hccEdm.addFeeder(new FeederInfo(5, "computer"));
    hccEdm.addFeeder(new FeederInfo(6, "unclassified"));
    hccEdm.addFeeder(new FeederInfo(7, "unclassified"));
    hccEdm.addFeeder(new FeederInfo(8, "unclassified"));
    hccEdm.addFeeder(new FeederInfo(9, "unclassified"));
    hccEdm.addFeeder(new FeederInfo(10, "unclassified"));
    hccEdm.addFeeder(new FeederInfo(11, "unclassified"));
    hccEdm.addFeeder(new FeederInfo(12, "computer"));
    hccEdm.addFeeder(new FeederInfo(13, "light"));
    hccEdm.addFeeder(new FeederInfo(14, "hvac"));
    hccEdm.addFeeder(new FeederInfo(15, "unclassified"));
    hccEdm.addFeeder(new FeederInfo(16, "unclassified"));
    hccEdm.addFeeder(new FeederInfo(17, "unclassified"));
    hccEdm.addFeeder(new FeederInfo(18, "unclassified"));
    hccEdm.addFeeder(new FeederInfo(19, "unclassified"));
    hccEdm.addFeeder(new FeederInfo(20, "unclassified"));
    hccEdm.addFeeder(new FeederInfo(21, "unclassified"));
    hccEdm.addFeeder(new FeederInfo(22, "unclassified"));
    hccEdm.addFeeder(new FeederInfo(23, "unclassified"));
    
    
    this.ux = uxEdm;
    this.marg = margEdm;
    this.hcc = hccEdm;

}

EDMInfoFactory.prototype.getDescription = function (labId, feederId) {
    if (!this[labId]) {
        return "invalid labId";
    } else {
        return this[labId].getDescription(feederId);
    }
}

var EDMInfo = function (id, location) {
    
    this.deviceID = id;
    this.location = location;
    this.feeders = [];

}

EDMInfo.prototype.setValue = function (feederId, value) {
    for (var i = 0; i < this.feeders.length; i++) {
        var feeder = this.feeders[i];
        if (feeder.feederID === feederId) {
            feeder.value = value;
            break;
        }
    }
}

EDMInfo.prototype.getDescription = function (feederId) {
    for (var i = 0; i < this.feeders.length; i++) {
        var feeder = this.feeders[i];
        if (feeder.feederID === feederId) {
            return feeder.description;
        }
    }
    return "invalid feeder Id";
}

EDMInfo.prototype.addFeeder = function (feedObj) {
    this.feeders.push(feedObj);
}

var FeederInfo = function (id, description) {
    this.feederID = id;
    this.value = 0; // default value
    this.description = description;
}

exports.labs = new EDMInfoFactory();