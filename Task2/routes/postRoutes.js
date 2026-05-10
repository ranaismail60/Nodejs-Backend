const express = require('express');
const { body, param } = require('express-validator');
const { createPost, getAllPosts, getPostById, getPostsByTag, updatePost, deletePost } = require('../controllers/postController');
const { addComment, getCommentsForPost } = require('../controllers/commentController');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('author').isMongoId().withMessage('Valid author ID is required'),
    body('tags').optional().isArray().withMessage('Tags must be an array of strings'),
  ],
  validateRequest,
  createPost
);

router.get('/', getAllPosts);
router.get('/tag/:tag', getPostsByTag);
router.get('/:id', [param('id').isMongoId().withMessage('Invalid post ID')], validateRequest, getPostById);
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid post ID'),
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty'),
    body('tags').optional().isArray().withMessage('Tags must be an array of strings'),
  ],
  validateRequest,
  updatePost
);
router.delete('/:id', [param('id').isMongoId().withMessage('Invalid post ID')], validateRequest, deletePost);

router.post(
  '/:postId/comments',
  [
    param('postId').isMongoId().withMessage('Invalid post ID'),
    body('text').notEmpty().withMessage('Comment text is required'),
    body('user').isMongoId().withMessage('Valid user ID is required'),
  ],
  validateRequest,
  addComment
);

router.get(
  '/:postId/comments',
  [param('postId').isMongoId().withMessage('Invalid post ID')],
  validateRequest,
  getCommentsForPost
);

module.exports = router;
