const express = require('express');
const authController = require('../controller/auth-controller');

const AuthRouter = express.Router();

const users = {};

AuthRouter.get('/login', authController.getLogin);
AuthRouter.post('/login', authController.postLogin);

AuthRouter.get('/signup', authController.getSignup);
AuthRouter.post('/signup', authController.postSignup);

AuthRouter.get('/profile', authController.getProfile);

module.exports = AuthRouter;
