const router = require('express').Router();
const { User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/comment` endpoint

// route to get all of the entries in the comment table
router.get('/', async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll()
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// route to get the comment at the specific id
router.get('/:id', async (req, res) => {
  try {
    const dbCommentData = await Comment.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: ['id']
        }
      ]
    });
    // if the id does not exist
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// route to create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    // expects => {comment_text: "This is the comment", user_id: 1, content_id: 200, content_type:'movie'}
    const dbCommentData = await Comment.create({
      comment_text: req.body.text,
      user_id: req.session.user_id,
      content_id: req.body.id,
      content_type: req.body.type
    });
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  };
});

// route to delete the comment at the specific id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    // if the id does not exist
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

module.exports = router;