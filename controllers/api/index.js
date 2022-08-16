const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const commentRoutes = require('./comment-routes');
const voteRoutes = require('./vote-routes');
const watchRoutes = require('./watchlist-routes');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/votes', voteRoutes);
router.use('/watchlist', watchRoutes);

module.exports = router;