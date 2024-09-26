const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

const client = new Client({
    cloud: {
        id: process.env.ES_COULD_ID
    },
    auth: {
        username: process.env.ES_USERNAME,
        password: process.env.ES_PASSWORD
    }
})

module.exports = client;
