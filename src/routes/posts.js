const express = require('express');
const router = express.Router();

const PostController = require('../controllers/postController');

router
    .get('/', PostController.getPosts)
    .get('/:id', PostController.getPost)
    .post('/', PostController.savePost)
    .delete('/del/:id', PostController.deletePost)
    .patch('/:id', PostController.updatePost)

module.exports = router;