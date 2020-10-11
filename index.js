"use strict";

//some laibrary
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "secretkey23456";
const express = require("express");
const bodyParser = require("body-parser");

// schema of survey tables
var user = require("./user_schema");
var survey = require("./survey_schema");
var questionData = require("./question_schema");
var takingSurvey = require("./takingSurvey_schema");

// Image endpoints
const { create_thumbnail } = require("./image_download");

//Middleware auth
const { verifyToken } = require("./auth");

// if table is not exits
user.createUsersTable();
survey.createSurveyTable();
questionData.createQuestionTable();
takingSurvey.SurveyUserData();

const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// image Thumbnail  generation
router.post("/createThumbnail", verifyToken, create_thumbnail);

// register user router
router.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  //password protection
  const password = bcrypt.hashSync(req.body.password);

  //jwt
  //find if user register then jwt token
  user.createUser([name, email, password], (err) => {
    console.log(err);
    if (err) return res.status(500).send("Server error!");
    user.findUserByEmail(email, (err, user) => {
      if (err) return res.status(500).send("Server error!");
      const expiresIn = 24 * 60 * 60;
      const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: expiresIn,
      });
      res
        .status(200)
        .send({ user: user, access_token: accessToken, expires_in: expiresIn });
    });
  });
});

//login router

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  user.findUserByEmail(email, (err, user) => {
    if (err) return res.status(500).send("Server error!");
    if (!user) return res.status(404).send("User not found!");
    const result = bcrypt.compareSync(password, user.password);
    if (!result) return res.status(401).send("Password not valid!");

    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: expiresIn,
    });
    req.headers["token"] = accessToken;
    res
      .status(200)
      .send({ user: user, access_token: accessToken, expires_in: expiresIn });
  });
});

//survey

//create survey

router.post("/surveyForm", verifyToken, (req, res) => {
  const name = req.body.surveyName;

  survey.createSurvey([name], (err) => {
    if (err) return res.status(500).send("Server error!");
    survey.findSurvey(name, (err, survey) => {
      if (err) return res.status(500).send("Server error!");
      res.status(200).send({ survey: survey });
    });
  });
});

//questions
// add questions to the survey

router.post("/questioAdd", verifyToken, (req, res) => {
  const question = req.body.question;
  const solution = req.body.solution;
  const id = req.body.surveyId;
  questionData.AddQuestion([question, solution, id], (err, question) => {
    console.log(err);
    if (err) return res.status(500).send("Server error!");
    res.status(200).send({ questionData: question });
  });
});

//if user send resonse then taking response and generate result
//taking survey

router.post("/addTask", verifyToken, (req, res) => {
  const user_id = req.user.id;
  const survey_id = req.body.survey_id;
  const question_id = req.body.question_id;
  const answer = req.body.answer;

  takingSurvey.AddTask(
    [user_id, survey_id, question_id, answer],
    (err, task) => {
      console.log(err);
      if (err) return res.status(500).send("Server error!");
      res.status(200).send({ TaskData: task });
    }
  );
});


//result get 

app.get("/result", verifyToken, (req, res) => {
  takingSurvey.getSurveyResult(
    req.user.id,
    req.query.surveyId,
    (err, details) => {
      if (err) return res.status(500).send("Server error!");
      res.status(200).send({ TaskData: details });
    }
  );
});

router.get("/", (req, res) => {
  res.status(200).send("This is backend app");
});

app.use(router);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("Server listening at http://localhost:" + port);
});
