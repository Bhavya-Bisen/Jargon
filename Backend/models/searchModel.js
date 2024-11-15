const esClient = require('../config/elasticsearch');

const indexFeedback = async (feedback) => {
  await esClient.index({
    index: 'feedback',
    body: feedback,
  });
};

const searchFeedback = async (query) => {
  const result = await esClient.search({
    index: 'feedback',
    body: {
      query: {
        match: { feedback: query },
      },
    },
  });
  return result.hits.hits;
};

module.exports = { indexFeedback, searchFeedback };
