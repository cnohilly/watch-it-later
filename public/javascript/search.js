// API information
const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8da71b56dc2b287e98f9875203b81d2c&page=1'

const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=8da71b56dc2b287e98f9875203b81d2c&query=';

//Selecting Elements
const main = document.getElementById('main');

const form = document.getElementById('form');

//Search function
function searchContent(query, type) {
    var apiUrl = 'https://api.themoviedb.org/3/search/' + type + '?api_key=' + process.env.TMDB_KEY  + '&query=' + query;
    return axios(apiUrl)
}


// call the showMovies function that requests the movie data from the Api using fetch.
//Then it puts those data in the main HTML tag by creating elments for those data.
// showMovies(apiUrl);

    function search() {
    console.log('This button works!');
    console.log(apiUrl);
    fetch(apiUrl).then(res => res.json())
    .then(function(data){
        console.log(data);
    data.results.forEach(element => {
      // Creating elemnts for our data inside the main tag. 
        const el = document.createElement('div');
        const image = document.createElement('img');
        const text = document.createElement('h2');

        text.innerHTML = `${element.title}`;
        image.src = IMGPATH + element.poster_path;
        el.appendChild(image);
        el.appendChild(text);
        main.appendChild(el);
    }); 
});

  }
  

document.querySelector('#search').addEventListener('click', search);