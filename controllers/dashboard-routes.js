const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

// get all comments for dashboard
router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    console.log('======================');
    Comment.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'comment_text',
        'user_id',
        'movie_id',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'movie_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
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