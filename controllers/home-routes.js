const router = require('express').Router();
const { response } = require('express');
const e = require('express');
const fetch = require('node-fetch');
const axios = require('axios').default;
const getContentData = require('../utils/tmdb-api');
const createContentObj = require('../utils/helpers');

router.get('/', (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/:type/:id', async (req, res) => {
    try {
        let movieData = await getContentData(req.params.type, req.params.id);
        movieData = createContentObj(movieData.data, req.params.type);
        console.log(movieData);
        res.render('content-page', {
            content: movieData
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    // fetch('https://api.github.com/users/github')
    //     .then(res => res.json())
    //     .then(json => console.log(json));
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;