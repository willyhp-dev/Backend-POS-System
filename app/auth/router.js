const router = require('express').Router();
const AuthController = require('./controller');
const passport = require('passport');
const LocalStrategys = require('passport-local').Strategy;

passport.use(new LocalStrategys({usernameField:'email'}, AuthController.localStrategy));
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/me', AuthController.me);
router.get('/user',AuthController.getdata)

module.exports = router;