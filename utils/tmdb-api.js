const axios = require('axios').default; // axios to handle third party api calls
var tmdbImgPath = 'https://image.tmdb.org/t/p/w500';    // starting url for img path for posters form tmdb

// third party api call to tmdb for information about the specific piece of content
function getContentData(type, id) {
    var apiUrl = 'https://api.themoviedb.org/3/' + type + '/' + id + '?api_key=' + process.env.TMDB_KEY + '&language=en-US';
    console.log(apiUrl);
    return axios(apiUrl);
}

// third party api call to tmdb for all popular content for the specific type
function getPopularContent(type) {
    var apiUrl = 'https://api.themoviedb.org/3/' + type + '/popular?api_key=' + process.env.TMDB_KEY + '&language=en-US';
    return axios(apiUrl);
}

// third party api call to tmdb for all top rated content for the specific type 
function getTopRatedContent(type) {
    var apiUrl = 'https://api.themoviedb.org/3/' + type + '/top_rated?api_key=' + process.env.TMDB_KEY + '&language=en-US';
    return axios(apiUrl);
}

// creates a uniform object to have the same data attributes for both movies and tv series
function createContentObj(data, type) {
    let contentObj = {
        id: ((data.id) ? data.id : null),
        type: ((data.title) ? 'movie' : 'tv'),
        title: ((data.title) ? data.title : data.name),
        release: ((data.release_date) ? data.release_date : data.first_air_date),
        popularity: ((data.vote_average) ? data.vote_average : 0),
        overview: ((data.overview) ? data.overview : 'There is no description for this title.'),
        poster: ((data.poster_path) ? (tmdbImgPath + data.poster_path) : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'),
        backdrop: ((data.backdrop_path) ? tmdbImgPath + data.backdrop_path : '')
    }
    // formats the release date or sets to 00/00/0000
    if (contentObj.release) {
        let dateString = contentObj.release.split('-');
        contentObj.release = dateString[1] + '/' + dateString[2] + '/' + dateString[0];
    } else {
        contentObj.release = '00/00/0000';
    }
    // formats the genres to a simple array or sets to None
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

// third party api call to tmdb to get search results for the specific type and query
function searchContent(query, type) {
    var apiUrl = 'https://api.themoviedb.org/3/search/' + type + '?api_key=' + process.env.TMDB_KEY + '&query=' + query;
    return axios(apiUrl)
}

module.exports = { getContentData, getPopularContent, getTopRatedContent, createContentObj, searchContent };