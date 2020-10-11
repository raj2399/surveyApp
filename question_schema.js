// Survey may have multiple questions so create questions table which contains surveyID(ref Key)

const sqlite3 = require("sqlite3").verbose();
const database = new sqlite3.Database("./my.db");
var questionData = {
  createQuestionTable() {
    const sqlQuery = `
    CREATE TABLE IF NOT EXISTS questions (
        id integer PRIMARY KEY,
        question text,
        solution  boolean,
        surveyId  integer,
		FOREIGN KEY(surveyId) REFERENCES survey(id)
		)
`;

    return database.run(sqlQuery);
  },

  //add question

  AddQuestion(question, cb) {
    return database.run(
      "INSERT INTO questions (question,solution,surveyId) VALUES (?,?,?)",
      question,
      (err) => {
        cb(err);
      }
    );
  },
};
module.exports = questionData;
