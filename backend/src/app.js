const express = require('express');
const cors = require('cors');
const Database = require('./database');
const user = require('./routes/user');

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    Database.connection();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  routes() {
    this.app.use('/user', user);
  }
}

module.exports = new App();
