const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')

router.get('/notes/getNote', userController.getNote)
router.get('/notes/newNote', userController.newNote)
router.post('/notes/createNote', userController.createNote)


module.exports = router