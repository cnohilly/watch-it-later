const { response } = require('express');

const router = require('express').Router();

router.get('/', (req,res) => {
    res.render('homepage',{
        loggedIn: req.session.loggedIn
    });
});

router.get('/:type/:id', async (req,res) => {
    var apiUrl = 'https://api.themoviedb.org/3/' + req.params.type + '/' + req.params.id + '?api_key=' + tmdbkey + '&language=en-US'
    const movieData = await fetch(apiUrl);
    if (response.ok) {
        movieData = await response.json();
        console.log(movieData);
        res.render('content-page');
    }
});

module.exports = router;