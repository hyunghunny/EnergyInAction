var Config = {

    mongodb: {
        host: 'datascience.snu.ac.kr',
        port: 27017,
        dbName: 'Encored'
    },

    collection: {
        quarters: "site73_15min_new",
        hours: "site73_hour_new",
        messages: "site73_messages",
        logs : "site73_logs"
    },

    server: {
        port: 3000
    }
}

module.exports = Config;
