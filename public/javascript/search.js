//Searching for content 
function searchContent(query, type) {
  var apiUrl = 'https://api.themoviedb.org/3/search/' + type + '?api_key=' + process.env.TMDB_KEY + '&query=' + query;
  return axios(apiUrl)
}


function search(event) {
  event.preventDefault();
  const type = $('.search-filter-dropdown').val().trim();
  let searchQuery = $('#search-input').val().trim();
  searchQuery = searchQuery.split(' ').join('+');
  document.location.replace('/search/' + type + '/' + searchQuery)


  fetch(apiUrl).then(res => res.json())
    .then(function (data) {
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
$('.search-form').on('submit', search);