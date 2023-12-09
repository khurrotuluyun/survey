//////////////////// FITUR RATE MENTAL HEALTH ////////////////////////
const { queryDatabase } = require('./db');

const getSurveyQuestionHandler = async (request, h) => {
    try {
        const query = 'SELECT sq.id_question, sq.text_question, ao.id_options, ao.text_option FROM survey_questions sq JOIN answer_options ao ON sq.id_question = ao.id_question ORDER BY  sq.id_question, ao.id_options;'

        const result = await queryDatabase(query);
        return h.response(result).code(200);
    } catch (error) {
        console.error('Error getting questions:', error);
        return h.response('Internal Server Error').code(500);
    }
};

const postSaveAnswerHandler = async (request, h) => {
    try {
        const { id_question, id_options } = request.payload;

        // Pastikan questionId dan optionId sesuai dengan nama kolom pada tabel
        const query = `INSERT INTO user_answers (id_question, id_options) VALUES (${id_question}, ${id_options})`;

        // Eksekusi query untuk menyimpan jawaban
        await queryDatabase(query);

        return h.response('Jawaban berhasil disimpan').code(200);
    } catch (error) {
        console.error('Error saving answer:', error);
        return h.response('Internal Server Error').code(500);
    }
};

////////////////////////////// FITUR FORUM ////////////////////////////////////////

// Simpan cerita dari pengguna
const stories = [];

// Mengirim Cerita/Thread
const postStoryHandler = (request, h) => {
    const { username, story } = request.payload;

    if (!username || !story) {
        throw Boom.badRequest('Username dan cerita harus diisi.');
    }

    const newStory = {
        username,
        story,
        replies: [],
    };

    stories.push(newStory);

    return h.response(newStory).code(201);
};

// Mendapatkan Semua Cerita
const getAllStoriesHandler = (request, h) => {
    return h.response(stories);
};

// Mendapatkan Balasan/Komentar untuk Cerita Tertentu
const getRepliesHandler = (request, h) => {
    const storyId = request.params.storyId;

    const selectedStory = stories.find((story) => storyId === story.username);

    if (!selectedStory) {
        throw Boom.notFound('Cerita tidak ditemukan.');
    }

    return h.response(selectedStory.replies);
};

// Menambahkan Balasan/Komentar pada Cerita Tertentu
const postReplyHandler = (request, h) => {
    const storyId = request.params.storyId;
    const { reply } = request.payload;

    const selectedStory = stories.find((story) => storyId === story.username);

    if (!selectedStory) {
        throw Boom.notFound('Cerita tidak ditemukan.');
    }

    if (!reply) {
        throw Boom.badRequest('Balasan harus diisi.');
    }

    selectedStory.replies.push({ username: selectedStory.username, reply });

    return h.response(selectedStory.replies).code(201);
};


//////////////// FITUR DETEKSI SUASANA HATI ///////////////////////////



module.exports = {
    getSurveyQuestionHandler, postSaveAnswerHandler,
    postStoryHandler, getAllStoriesHandler, getRepliesHandler, postReplyHandler,
};
