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
        'createdAt'
      ],
      include: [
        {
            model: User,
            attributes: ['username']
        }
      ]
    })
      .then(dbCommentData => {
        const comments = dbCommentData.map(comment => comment.get({ plain: true }));
        res.render('dashboard', { comments, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });

module.exports = router;