const express = require('express');
const router = express.Router();

const AuthorController = require('../controllers/authorController');

router
    .get('/', AuthorController.getAuthors)
    .post('/', AuthorController.saveAuthor)
    .get('/:id', AuthorController.getAuthor)

module.exports = router;