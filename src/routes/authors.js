const express = require('express');
const router = express.Router();

const AuthorController = require('../controllers/authorController');

router
    .get('/', AuthorController.getAuthors)
    .get('/:id', AuthorController.getAuthor)
    .post('/', AuthorController.saveAuthor)
    .delete('/del/:id', AuthorController.deleteAuthor)
    .patch('/:id', AuthorController.updateAuthor)

module.exports = router;