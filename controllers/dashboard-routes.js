const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

// page for the user's dashboard with their comments and form to update their information
router.get('/', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'comment_text',
        'user_id',
        'content_id',
        'content_type',
        'createdAt'
      ],
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }
        }
      ]
    });
    // mapping comments to plain data
    const comments = dbCommentData.map(comment => comment.get({ plain: true }));
    // gets the user's username and profile picture path from the session
    const username = req.session.username;
    const pfp_path = req.session.pfp_path;
    const email = req.session.email;
    res.render('dashboard', { comments, username, pfp_path, email, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;