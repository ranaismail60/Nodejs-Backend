const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');

const addComment = async (req, res, next) => {
  try {
    const { text, user } = req.body;
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const comment = await Comment.create({ text, post: postId, user });
    res.status(201).json({ success: true, comment });
  } catch (error) {
    next(error);
  }
};

const getCommentsForPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const comments = await Comment.find({ post: postId }).populate('user', 'username email -_id');
    res.status(200).json({ success: true, comments });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }
    res.status(200).json({ success: true, message: 'Comment deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { addComment, getCommentsForPost, deleteComment };
