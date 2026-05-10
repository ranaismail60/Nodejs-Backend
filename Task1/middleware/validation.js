const { body } = require('express-validator');

exports.validateStudent = [
  body('rollNumber')
    .notEmpty()
    .withMessage('Roll number is required')
    .isString()
    .withMessage('Roll number must be a string')
    .trim(),
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('department')
    .notEmpty()
    .withMessage('Department is required')
    .isString()
    .withMessage('Department must be a string')
    .trim(),
  body('cgpa')
    .optional()
    .isFloat({ min: 0.0, max: 4.0 })
    .withMessage('CGPA must be between 0.0 and 4.0'),
  body('enrollmentYear')
    .notEmpty()
    .withMessage('Enrollment year is required')
    .isInt({ min: 1900, max: new Date().getFullYear() + 10 })
    .withMessage('Please provide a valid enrollment year')
];

exports.validateStudentUpdate = [
  body('rollNumber')
    .optional()
    .isString()
    .withMessage('Roll number must be a string')
    .trim(),
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('department')
    .optional()
    .isString()
    .withMessage('Department must be a string')
    .trim(),
  body('cgpa')
    .optional()
    .isFloat({ min: 0.0, max: 4.0 })
    .withMessage('CGPA must be between 0.0 and 4.0'),
  body('enrollmentYear')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() + 10 })
    .withMessage('Please provide a valid enrollment year')
];