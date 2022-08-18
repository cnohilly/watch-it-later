const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Watchlist } = require('../../models');
const withAuth = require('../../utils/auth');

// route to get all of the entries in the watchlist table
router.get('/', async (req, res) => {
    try {
        const dbWatchData = await Watchlist.findAll();
        res.json(dbWatchData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// route to post a new entry into the watchlist table
// expects type: string, id: int, title: string, poster path: string, release year: string, status: int
// and will get the user_id from the session
router.post('/', withAuth, async (req, res) => {
    try {
        const dbWatchData = await Watchlist.create({
            user_id: req.session.user_id,
            content_type: req.body.type,
            content_id: req.body.id,
            content_title: req.body.title,
            poster_path: req.body.poster,
            release_year: req.body.year,
            status: req.body.status
        });
        res.json(dbWatchData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// route to update the specific watchilst id, meant for updating the status of an entry
router.put('/:id', withAuth, async (req, res) => {
    try {
        const dbWatchData = await Watchlist.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        res.json(dbWatchData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// route to delete an entry in the table by the specific id
router.delete('/:id', async (req, res) => {
    try {
        const dbWatchData = await Watchlist.destroy({
            where: {
                id: req.params.id
            }
        });
        // if the id is not found
        if (!dbWatchData) {
            res.status(404).json({ message: 'No watchlist entry with this id.' });
            return;
        }
        res.json(dbWatchData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;