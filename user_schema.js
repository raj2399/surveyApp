//This is schema file of user
// create table user

const sqlite3 = require("sqlite3").verbose();

const database = new sqlite3.Database("./my.db");
var user = {
  createUsersTable() {
    const sqlQuery = `
        CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY,
        name text,
        email text UNIQUE,
        password text)`;

    return database.run(sqlQuery);
  },

  // create and find if user is exits or not

  findUserByEmail(email, cb) {
    return database.get(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      (err, row) => {
        cb(err, row);
      }
    );
  },

  createUser(user, cb) {
    return database.run(
      "INSERT INTO users (name, email, password) VALUES (?,?,?)",
      user,
      (err) => {
        cb(err);
      }
    );
  },
};
module.exports = user;
