
-- Tabel Pertanyaan
CREATE TABLE survey_question (
    question_id INT PRIMARY KEY,
    question_text VARCHAR(255) NOT NULL
);

-- Tabel opsi
CREATE TABLE survey_option (
    option_id INT PRIMARY KEY,
    option_text VARCHAR(50) NOT NULL
);

-- Tabel penghubung antara pertanyaan dan opsi
CREATE TABLE question_option (
    question_id INT,
    option_id INT,
    PRIMARY KEY (question_id, option_id),
    FOREIGN KEY (question_id) REFERENCES question(question_id),
    FOREIGN KEY (option_id) REFERENCES option(option_id)
);

CREATE TABLE user_answer (
    question_id INT,
    option_id INT,
    question_text VARCHAR(255),
    option_text VARCHAR(255),
    PRIMARY KEY (question_id, option_id)
);

