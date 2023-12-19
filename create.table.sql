
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
    FOREIGN KEY (question_id) REFERENCES survey_question(question_id),
    FOREIGN KEY (option_id) REFERENCES survey_option(option_id)
);

CREATE TABLE user_answer (
    question_id INT,
    option_id INT,
    question_text VARCHAR(255),
    option_text VARCHAR(255),
    PRIMARY KEY (question_id, option_id)
);

INSERT INTO survey_question (question_id, question_text) VALUES
(1, 'Apakah kamu sering merasa kesepian?'),
(2, ,Seberapa sering kamu mengalami emosi yang tidak terkontrol?'),
(3, 'Seberapa sering kamu bahagia?'),
(4, 'Seberapa sering kamu merasakan gelisah?'),
(5, 'Seberapa sering kamu merasa tidak berharga/tidak berguna?'),
(6, 'Seberapa sering kamu ingin menyakiti diri sendiri?'),
(7, 'Seberapa sering kamu mengalami insomnia?'),
(8, 'Seberapa sering kamu merasa ingin mengakhiri hidup?'),
(9, 'Seberapa sering kamu merasa sukar focus?'),
(10, 'Apakah kamu sering merasa mudah tersinggung dengan omongan dan respon orang lain?');

INSERT INTO survey_option (option_id, option_text) VALUES
(1,'Tidak Pernah'),
(2,'Jarang'),
(3,'Pernah'),
(4,'Selalu');

INSERT INTO question_option (question_id, option_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(5, 1),
(5, 2),
(5, 3),
(5, 4),
(6, 1),
(6, 2),
(6, 3),
(6, 4),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(8, 1),
(8, 2),
(8, 3),
(8, 4),
(9, 1),
(9, 2),
(9, 3),
(9, 4),
(10, 1),
(10, 2),
(10, 3),
(10, 4);