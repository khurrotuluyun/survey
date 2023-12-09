const {
    getSurveyQuestionHandler,
    postSaveAnswerHandler,
    postStoryHandler,
    getAllStoriesHandler,
    getRepliesHandler,
    postReplyHandler,
} = require('./handler')

const routes = [
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
    // Mengirim Cerita/Thread
    {
        method: 'POST',
        path: '/stories',
        handler: postStoryHandler,
    },
    // Mendapatkan Semua Cerita
    {
        method: 'GET',
        path: '/stories',
        handler: getAllStoriesHandler,
    },
    // Mendapatkan Balasan/Komentar untuk Cerita Tertentu
    {
        method: 'GET',
        path: '/stories/{storyId}/replies',
        handler: getRepliesHandler,
    },
    // Menambahkan Balasan/Komentar pada Cerita Tertentu
    {
        method: 'POST',
        path: '/stories/{storyId}/replies',
        handler: postReplyHandler,
    },
];

module.exports = routes;