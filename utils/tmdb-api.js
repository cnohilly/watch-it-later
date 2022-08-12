const axios = require('axios').default;

function getContentData(type, id) {
    var apiUrl = 'https://api.themoviedb.org/3/' + type + '/' + id + '?api_key=' + process.env.TMDB_KEY + '&language=en-US';
    return axios(apiUrl);
    // try {
    //     let movieData = await fetch(apiUrl);
    //     movieData = await movieData.json();
    //     console.log(movieData);
    //     return movieData;
    // } catch (err) {
    //     throw (err);
    // }
}

module.exports = getContentData;