const router = require('express').Router();
const { User, Comment, Vote } = require('../../models');

// The `/api/comment` endpoint

// get all comments
router.get('/', (req, res) => {
  Comment.findAll({
    include: [
        {
            model: User,
            attributes: ['id']
        }
    ]
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a comment by id
router.get('/:id', (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: ['id']
        }
      ]
    })
      .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id'}); 
          return; 
        }
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// post a new comment
router.post('/', (req, res) => {
  Comment.create({
    id: req.body.id,
    comment_text: req.body.comment_text,
    user_id: req.body.user_id,
    post_id: req.body.post_id
  })
    .then(dbVoteData => res.json(dbVoteData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;