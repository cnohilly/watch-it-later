const router = require('express').Router();
const { User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/vote` endpoint

// get all vote data
router.get('/', (req, res) => {
  Vote.findAll({
    include: [
        {
            model: Comment,
            attributes: ['id']
        }
    ]
  })
    .then(dbVoteData => res.json(dbVoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post a new vote
router.post('/', withAuth, (req, res) => {
  Vote.create({
    id: req.body.id,
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

