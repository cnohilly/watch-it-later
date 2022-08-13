const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');


// get all votes
router.get('/', (req, res) => {
    Vote.findAll()
    .then(dbVoteData => res.json(dbVoteData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/upvote', withAuth, (req, res) => {
    // make sure the session exists first
    if (req.session) {
      // pass session id along with all destructured properties on req.body
      Vote.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });

  router.delete('/:id', (req, res) => {
    Vote.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


  module.exports = router;