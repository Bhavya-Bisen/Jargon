const esClient = require('../config/elasticsearch');

const indexFeedback = async (feedback) => {

};

const searchFeedback = async (query) => {

  return result.hits.hits;
};

module.exports = { indexFeedback, searchFeedback };
