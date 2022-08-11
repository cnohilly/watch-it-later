const router = require('express').Router();

router.get('/', (req,res) => {
    res.render('homepage',{
        loggedIn: req.session.loggedIn
    });
});

router.get('/:type/:id', async (req,res) => {
    var apiUrl = 'https://api.themoviedb.org/3/' + req.params.type + '/' + req.params.id + '?api_key=' + process.env.TMDB_KEY + '&language=en-US'
    const movieData = await fetch(apiUrl);
    if (movieData.ok) {
        movieData = await movieData.json();
        console.log(movieData);
        res.render('content-page');
    }
});

module.exports = router;