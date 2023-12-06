//////////////////// FITUR RATE MENTAL HEALTH ////////////////////////
const questions = [
];

const answers = {};

// Handler function untuk mendapatkan pertanyaan
const getQuestionsHandler = (request, h) => {
    return { questions };
};

// Handler function untuk mengirim jawawaban
const postAnswersHandler = (request, h) => {
    const data = request.payload;
    Object.assign(answers, data);
    return { message: 'Jawaban berhasil diterima' };
};


// Handler function untuk mendapatkan rating

const getRatingHandler = (request, h) => {
    const answeredQuestions = Object.values(answers);

    if (answeredQuestions.length !== questions.length) {
        return { error: 'Harap jawab semua pertanyaan terlebih dahulu.' };
    }

    const weightedSum = answeredQuestions.reduce((acc, answer, index) => acc + parseInt(ratingMap[answer]) * questions[index].weight, 0);
    const rating = weightedSum / questions.length;


    return { rating };
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


/////////////////////// FITUR SARAN MASALAH /////////////////////////

// Handler function untuk user mengirimkan masalah/keluhan
const getSuggestionsHandler = (request, h) => {
    const newSuggestion = {
        id: suggestions.length + 1,
        user: request.payload.user,
        issue: request.payload.issue,
    };
    suggestions.push(newSuggestion);
    return h.response(newSuggestion).code(201);
};

// Handler function untuk bot mengirimkan saran untuk masalah user
const postSuggestionsIDHandler = (request, h) => {
    const suggestionId = parseInt(request.params.id);
    const suggestion = suggestions.find((s) => s.id === suggestionId);
    if (!suggestion) {
        return h.response({ error: 'Suggestion not found' }).code(404);
    }

    const newBotResponse = {
        suggestionId: suggestionId,
        response: request.payload.response,
    };
    botResponses.push(newBotResponse);
    return h.response(newBotResponse).code(201);
};


//////////////// FITUR DETEKSI SUASANA HATI ///////////////////////////

// Handler function untuk route GET Question Mood 
const getQuestionsMoodHandler = (request, h) => {
    // Di sini Anda dapat mengembalikan daftar pertanyaan untuk mendeteksi suasana hati
    const questions = ['Pertanyaan 1?', 'Pertanyaan 2?', 'Pertanyaan 3?'];
    return { questions };
};

// Handler function untuk route POST Answer Mood
const postAnswersMoodHandler = (request, h) => {
    const { answers } = request.payload;

    // Di sini Anda dapat melakukan analisis terhadap jawaban untuk mendeteksi suasana hati
    const moodResult = 'Happy'; // Contoh sederhana, hasil deteksi suasana hati

    // Simpan jawaban dan hasil deteksi mood ke riwayat
    moodHistory.push({ answers, mood: moodResult });

    return h.response({ message: 'Deteksi suasana hati berhasil' }).code(201);
};

// Handler function untuk route  GET History Mood
const getHistoryMoodHandler = (request, h) => {
    return { moodHistory };
};

module.exports = {
    getQuestionsHandler, postAnswersHandler, getRatingHandler, getQuestionsMoodHandler,
    postStoryHandler, getAllStoriesHandler, getRepliesHandler, postReplyHandler,
    getSuggestionsHandler,
    postSuggestionsIDHandler,
    postAnswersMoodHandler,
    getHistoryMoodHandler,
};
