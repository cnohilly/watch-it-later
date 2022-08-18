const router = require('express').Router();
const { User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth')

// get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.body.id
    },
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {

  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that username!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      req.session.pfp_path = dbUserData.pfp_path;
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });


  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

// route to update current user requiring their current password
router.put('/', withAuth, async (req, res) => {
  try {
    // gets the currently logged in user
    let dbUserData = await User.findOne({
      where: {
        id: req.session.user_id
      }
    });
    // if the current password given is correct
    if (!dbUserData.checkPassword(req.body.current_password)) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
    // deletes the current_password from the body
    delete req.body.current_password;
    // will only set hooks to true if a new password is being set
    let hooks = req.body.password ? true : false;
    // updates the current user
    dbUserData = await User.update({ ...req.body }, {
      individualHooks: hooks,
      where: {
        id: req.session.user_id
      }
    });
    // updates the username if it needs to be
    req.session.save(() => {
      req.session.username = (req.body.username) ? req.body.username : req.session.username;
      req.session.pfp_path = (req.body.pfp_path) ? req.body.pfp_path : req.session.pfp_path;
    });
    console.log(dbUserData);
    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  User.destroy({
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