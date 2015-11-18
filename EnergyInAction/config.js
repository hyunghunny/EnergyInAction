var Config = {

    mongodb: {
        host: 'datascience.snu.ac.kr',
        port: 27017,
        dbName: 'Encored'
    },

    collection: {
        quarters: "site73_15min",
        hours: "site73_hour_new",
        messages: "site73_messages"
    },

    server: {
        port: 3000
    }
}

module.exports = Config;
