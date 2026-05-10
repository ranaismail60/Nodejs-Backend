const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongodbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blog-api';
    if (!process.env.MONGODB_URI) {
      console.warn('MONGODB_URI is not set. Falling back to local MongoDB at', mongodbUri);
    }

    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
