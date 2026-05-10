const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { validateStudent, validateStudentUpdate } = require('../middleware/validation');

// Routes
router.post('/', validateStudent, studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/search', studentController.searchStudents);
router.get('/:id', studentController.getStudentById);
router.put('/:id', validateStudent, studentController.updateStudent);
router.patch('/:id', validateStudentUpdate, studentController.partialUpdateStudent);
router.delete('/:id', studentController.deleteStudent);
router.patch('/:id/deactivate', studentController.deactivateStudent);

module.exports = router;