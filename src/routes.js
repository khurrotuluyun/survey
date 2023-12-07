const {
    getQuestionsHandler,
    postAnswersHandler,
    getRatingHandler,
    getQuestionsMoodHandler,
    postAnswersMoodHandler,
    getHistoryMoodHandler,
    postStoryHandler,
    getAllStoriesHandler,
    getRepliesHandler,
    postReplyHandler,
} = require('./handler')

const routes = [
    // Endpoint ini digunakan untuk mendapatkan daftar pertanyaan pilihan ganda yang akan ditanyakan kepada pengguna
    {
        method: 'GET',
        path: '/rate/get-questions',
        handler: getQuestionsHandler,
    },
    // Endpoint ini digunakan untuk menerima jawaban dari pengguna setelah menjawab semua pertanyaan.
    {
        method: 'POST',
        path: '/rate/submit-answers',
        handler: postAnswersHandler,
    },
    // Endpoint ini digunakan untuk memberikan rating kondisi mental health pengguna setelah menjawab pertanyaan.
    {
        method: 'GET',
        path: '/rate/get-rating',
        handler: getRatingHandler,
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
    {
        method: 'GET',
        path: '/moods',
        handler: getQuestionsMoodHandler,
    },
    {
        method: 'POST',
        path: '/moods',
        handler: postAnswersMoodHandler,
    },
    {
        method: 'GET',
        path: '/moods/history',
        handler: getHistoryMoodHandler,
    },
];

module.exports = routes;