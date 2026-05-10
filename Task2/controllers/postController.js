const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

const createPost = async (req, res, next) => {
  try {
    const { title, content, author, tags } = req.body;

    const user = await User.findById(author);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Author does not exist' });
    }

    const post = await Post.create({ title, content, author, tags });
    res.status(201).json({ success: true, post });
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email')
      .select('-__v');
    res.status(200).json({ success: true, posts });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email')
      .select('-__v');

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const comments = await Comment.find({ post: post._id }).populate('user', 'username email');

    res.status(200).json({ success: true, post, comments });
  } catch (error) {
    next(error);
  }
};

const getPostsByTag = async (req, res, next) => {
  try {
    const posts = await Post.find({ tags: req.params.tag })
      .populate('author', 'username email')
      .select('-__v');

    res.status(200).json({ success: true, posts });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (tags) updateData.tags = tags;

    const post = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true })
      .populate('author', 'username email')
      .select('-__v');

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, post });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();

    res.status(200).json({ success: true, message: 'Post and related comments deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createPost, getAllPosts, getPostById, getPostsByTag, updatePost, deletePost };
