// This file contains if auth user answer the survey questions so i tried for storing json data
// and for there response i will able to show the result

const sqlite3 = require("sqlite3").verbose();

const database = new sqlite3.Database("./my.db");
var survey = require("./survey_schema");
const user = require("./user_schema");

var surveyData = {
  SurveyUserData() {
    const sqlQuery = `
    CREATE TABLE IF NOT EXISTS  takingSurvey (
       
        user_id  integer,
        survey_id integer,
        question_id integer,
        answer boolean,
        FOREIGN KEY(user_id) REFERENCES  users(id),
        FOREIGN KEY(survey_id) REFERENCES  survey(id),
        FOREIGN KEY(question_id) REFERENCES  questions(id)
		)
`;

    return database.run(sqlQuery);
  },

  // auth user can add their survey page which contains multiple Questions

  AddTask(Task, cb) {
    return database.run(
      "INSERT INTO takingSurvey(user_id,survey_id,question_id,answer) VALUES (?,?,?,?)",
      Task,
      (err) => {
        cb(err);
      }
    );
  },

  // for user resonse generate result for that user

  getSurveyResult(userId, surveyId, cb) {
    console.log("id" + userId);
    console.log("uuu" + surveyId);
    return database.get(
      `select count(ts.answer) from takingSurvey ts,questions q where ts.question_id=q.id and ts.answer=q.solution and ts.user_id=${userId} and ts.survey_id=${surveyId}`,
      (err, row) => {
        cb(err, row);
      }
    );
  },
};

module.exports = surveyData;
