const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({ node: process.env.ES_URI });

esClient.ping()
  .then(() => console.log('Elasticsearch connected'))
  .catch((error) => console.error('Elasticsearch error:', error));

module.exports = esClient;
