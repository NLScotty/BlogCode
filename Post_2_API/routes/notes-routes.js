const express = require('express');

const notesControllers = require('../controllers/notes-controllers');

const router = express.Router();

router.get('/:nid', notesControllers.getNoteById);

router.get('/user/:uid', notesControllers.getNotesByUserId);

router.post('/', notesControllers.createNote);

router.patch('/:nid', notesControllers.updateNote);

router.delete('/:nid', notesControllers.deleteNote);

module.exports = router;
