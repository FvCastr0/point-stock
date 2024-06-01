const { Router } = require('express');
const User = require('../controller/User');

const router = new Router();

router.post('/create', User.createUser);
router.post('/login', User.login);
router.post('/verifyToken', User.verifyToken);

module.exports = router;
