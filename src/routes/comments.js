const express = require('express');
const router = express.Router();

const CommentController = require('../controllers/commentController');

router
    .get('/', CommentController.getComments)
    .get('/:id', CommentController.getComment)
    .post('/', CommentController.saveComment)
    .delete('/del/:id', CommentController.deleteComment)
    .patch('/:id', CommentController.updateComment)

module.exports = router;