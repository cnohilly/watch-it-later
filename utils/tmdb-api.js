const axios = require('axios').default;
var tmdbImgPath = 'https://image.tmdb.org/t/p/w500';

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

function getPopularContent(type) {
    var apiUrl = 'https://api.themoviedb.org/3/' + type + '/popular?api_key=' + process.env.TMDB_KEY + '&language=en-US';
    return axios(apiUrl);
}

function getTopRatedContent(type) {
    var apiUrl = 'https://api.themoviedb.org/3/' + type + '/top_rated?api_key=' + process.env.TMDB_KEY + '&language=en-US';
    return axios(apiUrl);
}

function createContentObj(data, type) {
    console.log(data);
    let contentObj = {
        id: ((data.id) ? data.id : null),
        type: ((data.title) ? 'movie' : 'tv'),
        title: ((data.title) ? data.title : data.name),
        release: ((data.release_date) ? data.release_date : data.first_air_date),
        popularity: ((data.vote_average) ? data.vote_average : 0),
        overview: ((data.overview) ? data.overview : 'There is no description for this title.'),
        poster: ((data.poster_path) ? (tmdbImgPath + data.poster_path) : './assets/images/No_Image_Available.jpg'),
        backdrop: ((data.backdrop_path) ? tmdbImgPath + data.backdrop_path : './assets/images/No_Image_Available.jpg')
    }
    if (contentObj.release) {
        let dateString = contentObj.release.split('-');
        contentObj.release = dateString[1] + '/' + dateString[2] + '/' + dateString[0];
    } else {
        contentObj.release = '00/00/0000';
    }
    if (data.genres) {
        let genres = [];
        data.genres.forEach(function (genre) {
            genres.push(genre.name);
        });
        contentObj.genres = genres;
    } else {
        data.genres = ['None'];
    }
    return contentObj;
}

module.exports = { getContentData, getPopularContent, getTopRatedContent, createContentObj };