const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Comment, Vote, Watchlist } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbWatchData = await Watchlist.findAll();
        res.json(dbWatchData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

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

router.put('/movie/:id', withAuth, async (req, res) => {
    try {
        const dbWatchData = await Watchlist.update(req.body, {
            where: {
                user_id: req.session.user_id,
                content_id: req.params.id,
                content_type: 'movie'
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/tv/:id', withAuth, async (req, res) => {
    try {
        const dbWatchData = await Watchlist.update(req.body, {
            where: {
                user_id: req.session.user_id,
                content_id: req.params.id,
                content_type: 'tv'
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/movie/:id', async (req, res) => {
    try {
        const dbWatchData = await Watchlist.destroy({
            where: {
                user_id: req.session.user_id,
                content_id: req.params.id,
                content_type: 'movie'
            }
        });
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

router.delete('/tv/:id', async (req, res) => {
    try {
        const dbWatchData = await Watchlist.destroy({
            where: {
                user_id: req.session.user_id,
                content_id: req.params.id,
                content_type: 'tv'
            }
        });
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