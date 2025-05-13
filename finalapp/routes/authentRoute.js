const express = require('express');
const { register, login, updatePassword } = require('../services/authent.service');
const authenticateToken = require('../middlewares/session.valid');
const authentRouter = express.Router();

authentRouter.post('/register', register);

authentRouter.post('/login', login);

authentRouter.post('/update', authenticateToken, updatePassword);

module.exports = authentRouter;
