const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')

router.get('/profile', userController.getProfile)
router.get('/notes/getNote', userController.getNote)
router.get('/notes/newNote', userController.newNote)
router.post('/notes/createNote', userController.createNote)
router.get('/getUsers', userController.getUsers)
router.post('/createUser', userController.createUser)


module.exports = router