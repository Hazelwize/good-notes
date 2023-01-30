const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
const passport = require('passport')
const {ensureAuth, ensureLogin, ensureSignup, ensureUpdate} = require('../middleware/auth')

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.post("/updatePass", authController.updatePass);

module.exports = router