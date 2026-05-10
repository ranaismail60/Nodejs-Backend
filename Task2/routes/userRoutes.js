const express = require('express');
const { body, param } = require('express-validator');
const { registerUser, getAllUsers, getUserById } = require('../controllers/userController');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validateRequest,
  registerUser
);

router.get('/', getAllUsers);

router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid user ID')],
  validateRequest,
  getUserById
);

module.exports = router;
