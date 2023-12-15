const {
  getSurveyQuestionHandler,
  postSaveAnswerHandler,
  handlerrootHandler,
} = require('./handler')

const routes = [
  {
      method: 'GET',
      path: '/',
      handler: handlerrootHandler,
    },
  {
      method: 'GET',
      path: '/survey/question',
      handler: getSurveyQuestionHandler,
    },
    {
      method: 'POST',
      path: '/survey/answer',
      handler: postSaveAnswerHandler,
    },
];

module.exports = routes;