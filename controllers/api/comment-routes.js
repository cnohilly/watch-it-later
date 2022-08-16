const router = require('express').Router();
const { User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/comment` endpoint

// get all comments
router.get('/', (req, res) => {
  Comment.findAll()
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
        res.status(404).json({ message: 'No comment found with this id' });
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
router.post('/', withAuth, (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, content_id: 200, content_type:'movie'}
  Comment.create({
    comment_text: req.body.text,
    user_id: req.session.user_id,
    content_id: req.body.id,
    content_type: req.body.type
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// delete comment
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;