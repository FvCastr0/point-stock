const mongoose = require('mongoose');
require('dotenv').config();

class Database {
  async connection() {
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(process.env.CONNECTION_URL);
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = new Database();
