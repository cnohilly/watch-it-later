const router = require('express').Router();
const { response } = require('express');
const e = require('express');
const fetch = require('node-fetch');
const axios = require('axios').default;
const getContentData = require('../utils/tmdb-api');

router.get('/', (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/:type/:id', async (req, res) => {
    try {
        const movieData = await getContentData(req.params.type, req.params.id);
        console.log(movieData);
        res.render('content-page', {
            content: movieData.data
        });
    } catch (err) {
        console.log(err);
        console.log(err.response.status);
        res.status(err.response.status || 500).json(err.response.data);
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

module.exports = router;