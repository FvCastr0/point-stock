const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

class UserController {
  async createUser(req, res) {
    const { username, email, password } = req.body;

    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const verifyIfEmailExist = await User.findOne({ email });
      if (verifyIfEmailExist) {
        res.status(400).json({ msg: 'The email is already being used' });
      } else {
        await User.create({ username, email, password: hashedPassword });
        res.status(200).json({ msg: 'User created successfully!' });
      }
    } catch (e) {
      if (e.code === 11000) {
        res.status(401).json({ msg: 'The email is already being used' });
      } else res.status(500).json({ msg: 'Something went wrong!' });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const searchUser = await User.findOne({ email });
      if (!searchUser) {
        res.status(400).json({ msg: 'The email does not exist!' });
      } else if (await bcrypt.compare(password, searchUser.password)) {
        res.status(200).json({ msg: 'User logged in successfully!', token: jwt.sign(searchUser.id, process.env.SECRET) });
      } else res.status(400).json({ msg: 'The password is incorrect!' });
    } catch (e) {
      res.status(500).json({ msg: 'Something went wrong!' });
    }
  }

  async verifyToken(req, res) {
    const { token } = req.body;
    try {
      const tok = jwt.verify(token, process.env.SECRET);
      res.status(200).json({ link: tok });
    } catch (e) {
      res.status(500).json({ msg: 'Invalid token' });
    }
  }
}

module.exports = new UserController();
