// handler.js
const db = require('./db');

const handlerrootHandler = (request, h) => {
    console.log('Response success');
    return 'Response Success!';
  };

const getSurveyQuestionHandler = async (request, h) => {
    try {
        const [rows] = await db.execute('SELECT q.question_text, o.option_text FROM question_option qo INNER JOIN survey_question q ON qo.question_id = q.question_id INNER JOIN survey_option o ON qo.option_id = o.option_id ORDER BY q.question_id, o.option_id');
        
        return h.response(rows).code(200);
      } catch (error) {
        return h.response({ error: error.message }).code(500);
      }
};

const postSaveAnswerHandler = async (request, h) => {
    try {
      const { question_id, option_id } = request.payload; // Assuming you have question_id and option_id in the payload
      const [questionOptionRow] = await db.execute('SELECT q.question_text, o.option_text FROM question_option qo INNER JOIN survey_question q ON qo.question_id = q.question_id INNER JOIN survey_option o ON qo.option_id = o.option_id WHERE qo.question_id = ? AND qo.option_id = ?', [question_id, option_id]);
  
      const question_text = questionOptionRow[0].question_text;
      const option_text = questionOptionRow[0].option_text;
  
      await db.execute('INSERT INTO user_answer (question_id, option_id, question_text, option_text) VALUES (?, ?, ?, ?)', [question_id, option_id, question_text, option_text]);
  
      return h.response({ message: 'Answer saved successfully' }).code(201);
    } catch (error) {
      return h.response({ error: error.message }).code(500);
    }
  };
  
  

module.exports = {
    handlerrootHandler, getSurveyQuestionHandler,
  postSaveAnswerHandler,
};
