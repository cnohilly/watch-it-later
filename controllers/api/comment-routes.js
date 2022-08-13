const router = require("express").Router();
const { User, Vote, Comment  } = require("../../models");

// get all comments
router.get("/", (req, res) => {
  Comment.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// get comments by id
router.get("/:id", (req, res) => {
  Comment.findOne({
    where:{
      id: req.body.id
    }
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create comment

router.post("/", (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });