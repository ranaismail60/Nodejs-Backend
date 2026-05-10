const express = require('express');
const { param } = require('express-validator');
const { deleteComment } = require('../controllers/commentController');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid comment ID')],
  validateRequest,
  deleteComment
);

module.exports = router;
