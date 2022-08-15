const router = require('express').Router();
const { response } = require('express');
const e = require('express');
const axios = require('axios').default;
const { getContentData, getPopularContent, getTopRatedContent, createContentObj } = require('../utils/tmdb-api');
const { User, Comment, Vote, Watchlist } = require('../models');

router.get('/', async (req, res) => {
    const contentData = await Promise.all([getPopularContent('movie'), getTopRatedContent('movie'), getPopularContent('tv'), getTopRatedContent('tv')]);
    for (let x = 0; x < contentData.length; x++) {
        for (let y = 0; y < contentData[x].data.results.length; y++) {
            contentData[x].data.results[y] = createContentObj(contentData[x].data.results[y]);
        }
    }
    res.render('homepage', {
        popMovies: contentData[0].data.results,
        topMovies: contentData[1].data.results,
        popTV: contentData[2].data.results,
        topTV: contentData[3].data.results,
        loggedIn: req.session.loggedIn
    });
});

router.get('/movie/:id', async (req, res) => {
    try {
        let movieData = await getContentData('movie', req.params.id);
        movieData = createContentObj(movieData.data);
        console.log(movieData);
        res.render('content-page', {
            content: movieData,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.render('404-page');
    }
});

router.get('/tv/:id', async (req, res) => {
    try {
        let tvData = await getContentData('tv', req.params.id);
        tvData = createContentObj(tvData.data);
        console.log(tvData);
        res.render('content-page', {
            content: tvData,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.render('404-page');
    }
});

router.get('/watchlist', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    }
    try {
        const dbWatchlistData = await Watchlist.findAll({
            where: { user_id: req.session.loggedIn }
        });
        console.log(dbUserData);
        res.render('watchlist', {
            content: dbWatchlistData,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/watchlist/:id', async (req, res) => {
    try {
        const dbWatchlistData = await Watchlist.findAll({
            where: {
                user_id: req.params.id
            }
        });
        if (!dbWatchlistData) {
            res.render('404-page');
        }
        res.render('watchlist', {
            content: dbWatchlistData,
            loggedIn: req.session.loggedIn
        });
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