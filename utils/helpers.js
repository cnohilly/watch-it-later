var tmdbImgPath = 'https://image.tmdb.org/t/p/w500';

function createContentObj(data, type) {
    console.log(type, data);
    let contentObj = {
        id: ((data.id) ? data.id : null),
        type: type,
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

module.exports = createContentObj;