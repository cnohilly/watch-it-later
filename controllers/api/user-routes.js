const router = require('express').Router();
const { User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth')

// route to get all entries in the user table, excluding their passwords
router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// route to get the information for the user with the specific id
router.get('/:id', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        id: req.body.id
      },
      attributes: { exclude: ['password'] }
    })
    res.json(dbUserData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// route to create a new user
// expects username: string, email: string, password: string
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    // creates the session variables 
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      req.session.pfp_path = dbUserData.pfp_path;

      res.json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// route for the user to use to login
// expects username and password, finds the specific username and checks that the password is correct
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username
      }
    });
    // if the username does not exist
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that username!' });
      return;
    }

    // checks if the password is valid, if it is not then it will return with status 400
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
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// route for logging out the current user
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
    // updates the username and profile picture if it needs to be
    req.session.username = (req.body.username) ? req.body.username : req.session.username;
    req.session.pfp_path = (req.body.pfp_path) ? req.body.pfp_path : req.session.pfp_path;

    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// route to delete the user for the specific id
router.delete('/:id', async (req, res) => {
  try {
    const dbUserData = await User.destroy({
      where: {
        id: req.params.id
      }
    });
    // if the id does not exist
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    // destroys the current session if the user deleted was the one logged in
    if (req.params.id == req.session.user_id) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

module.exports = router;