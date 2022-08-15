const router = require('express').Router();
const { response } = require('express');
const e = require('express');
const axios = require('axios').default;
const { getContentData, getPopularContent, getTopRatedContent, createContentObj } = require('../utils/tmdb-api');
const { User, Comment, Vote } = require('../models');

router.get('/', async (req, res) => {
    const contentData = await Promise.all([getPopularContent('movie'), getTopRatedContent('movie'), getPopularContent('tv'), getTopRatedContent('tv')]);
    for (let x = 0; x < contentData.length; x++) {
        for (let y = 0; y < contentData[x].data.results.length; y++) {
            contentData[x].data.results[y] = createContentObj(contentData[x].data.results[y]);
        }
    }
    contentData.forEach(resData => {
        console.log(resData.data.results);
    });
    res.render('homepage', {
        popMovies: contentData[0].data.results,
        topMovies: contentData[1].data.results,
        popTV: contentData[2].data.results,
        topTV: contentData[3].data.results,
        loggedIn: req.session.loggedIn
    });
});

router.get('/:type/:id', async (req, res) => {
    try {
        let movieData = await getContentData(req.params.type, req.params.id);
        movieData = createContentObj(movieData.data);
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

router.get('/watchlist', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    }
    try {
        const dbUserData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }
        });
        console.log(dbUserData);
        res.render('homepage');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

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