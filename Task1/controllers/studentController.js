const Student = require('../models/Student');
const { validationResult } = require('express-validator');

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Roll number or email already exists' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all students with filtering and pagination
exports.getAllStudents = async (req, res) => {
  try {
    const { department, page = 1, limit = 10 } = req.query;
    const query = {};

    if (department) {
      query.department = department;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };

    const students = await Student.find(query)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit)
      .exec();

    const total = await Student.countDocuments(query);

    res.status(200).json({
      success: true,
      data: students,
      pagination: {
        currentPage: options.page,
        totalPages: Math.ceil(total / options.limit),
        totalStudents: total,
        hasNext: options.page * options.limit < total,
        hasPrev: options.page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search students by name
exports.searchStudents = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Name query parameter is required' });
    }

    const students = await Student.find({
      name: { $regex: name, $options: 'i' }
    });

    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a student (full update)
exports.updateStudent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Roll number or email already exists' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Partially update a student
exports.partialUpdateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Roll number or email already exists' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Soft delete (deactivate) a student
exports.deactivateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};