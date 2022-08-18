const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');


// route to get all of the entries in the vote table
router.get('/', async (req, res) => {
  try {
    const dbVoteData = await Vote.findAll();
    res.json(dbVoteData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// route to create a new vote (rating) entry
// expects id: int, type: string, rating: int
// gets user_id from the session
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

// route to update an existing vote entry, updating only the rating
// using the session user_id and the passed in id and type
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

// route to delete a vote entry for the specific id
router.delete('/:id', async (req, res) => {
  try {
    const dbVoteData = await Vote.destroy({
      where: {
        id: req.params.id
      }
    });
    // if id does not exist
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