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
            poster_path: req.body.poster,
            release_year: req.body.year
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



router.delete('/:id', (req, res) => {
    Vote.destroy({
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