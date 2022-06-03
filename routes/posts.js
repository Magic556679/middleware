var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/posts');



router.get('/', PostsControllers.getPosts);

// 不需要加上 chunk，express 已經處理好
router.post('/', PostsControllers.createdPosts);

router.delete('/', PostsControllers.deleteAllPosts);

router.delete('/:id', PostsControllers.deleteByIdPosts);

router.patch('/:id', PostsControllers.patchPosts);

module.exports = router;
