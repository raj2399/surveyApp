// This file contain perticular survey name and create survey table

const sqlite3 = require("sqlite3").verbose();
const database = new sqlite3.Database("./my.db");
var survey = {
  createSurveyTable() {
    const sqlQuery = `
        CREATE TABLE IF NOT EXISTS survey (
        id integer PRIMARY KEY,
        surveyName text UNIQUE
      )`;

    return database.run(sqlQuery);
  },

  //find if all ready exits

  findSurvey(name, cb) {
    return database.get(
      `SELECT * FROM survey WHERE surveyName = ?`,
      [name],
      (err, row) => {
        cb(err, row);
      }
    );
  },
  findSurveyById(id, cb) {
    return database.get(
      `SELECT * FROM survey WHERE id = ?`,
      [id],
      (err, row) => {
        cb(err, row);
      }
    );
  },

  //create

  createSurvey(surveyForm, cb) {
    return database.run(
      "INSERT INTO survey (surveyName) VALUES (?)",
      surveyForm,
      (err) => {
        cb(err);
      }
    );
  },
};
module.exports = survey;
