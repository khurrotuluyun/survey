//////////////////// FITUR RATE MENTAL HEALTH ////////////////////////
const pool = require('./db');


const getSurveyQuestionHandler = async (request, h) => {
    try {
      const [rows, fields] = await pool.execute('SELECT * FROM survey_questions');
      const randomIndex = Math.floor(Math.random() * rows.length);
      const randomQuestion = rows[randomIndex];
  
      return { question: randomQuestion.question };
    } catch (error) {
      console.error(error);
      return h.response('Internal Server Error').code(500);
    }
  };
  
  const postSurveyAnswerHandler = async (request, h) => {
    const { questionId, answer } = request.payload;
    try {
      await pool.execute('INSERT INTO survey_answers (question_id, answer) VALUES (?, ?)', [questionId, answer]);
  
      return { success: true, message: 'Answer recorded successfully' };
    } catch (error) {
      console.error(error);
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
    getSurveyQuestionHandler, postSurveyAnswerHandler,
    postStoryHandler, getAllStoriesHandler, getRepliesHandler, postReplyHandler,
};
