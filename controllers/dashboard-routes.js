const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

// get all comments for dashboard
router.get('/', withAuth, (req, res) => {
  Comment.findAll({
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
  })
    .then(dbCommentData => {
      const comments = dbCommentData.map(comment => comment.get({ plain: true }));
      // sets to a string if the user has no comments
      const pfp_path = req.session.pfp_path;
      res.render('dashboard', { comments, pfp_path, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;