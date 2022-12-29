const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notes')

router.get('/', noteController.getIndex)
router.post('/newNote', noteController.createNote)
router.get('/getNote', noteController.getNote)

module.exports = router