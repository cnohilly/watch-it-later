const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');


// get all votes
router.get('/', async (req, res) => {
  try {
    const dbVoteData = await Vote.findAll();
    res.json(dbVoteData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post("/", withAuth, async (req, res) => {
  try {
    const dbVoteData = await Vote.create({
      user_id: req.session.user_id,
      content_id: req.body.content_id,
      content_type: req.body.content_type,
      rating: req.body.rating,
    });
    res.json(dbVoteData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/", withAuth, async (req, res) => {
  try {
    const dbVoteData = await Vote.update(
      {
        rating: req.body.rating
      }, {
      where: {
        user_id: req.session.user_id,
        content_id: req.body.content_id,
        content_type: req.body.content_type,
      }
    });
    res.json(dbVoteData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const dbVoteData = await Vote.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!dbVoteData) {
      res.status(404).json({ message: 'No vote entry found with this id' });
      return;
    }
    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;