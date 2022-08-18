const router = require('express').Router();

const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');
const apiRoutes = require('./api/');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

// renders a 404 page if going to a route that doesn't exist
router.use((req, res) => {
    res.render('404-page');
})

module.exports = router;