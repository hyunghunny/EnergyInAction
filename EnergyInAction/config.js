var Config = {
    
    mongodb: {
        host: 'datascience.snu.ac.kr',
        port: 27017,
        dbName: 'Encored'
    },

    collection: {
        secs: "site73_1sec",
        quarters: "site73_15min",
        hours: "site73_hour"
    },

    server: {
        port: 3000
    }
}

module.exports = Config;