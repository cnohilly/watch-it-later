// function to collect the data from the necessary fields and redirected the user to the 
function search(event) {
  event.preventDefault();
  // gets the search input and whether the user specified movies or tv shows
  const type = $('.search-filter-dropdown').val().trim();
  let searchQuery = $('#search-input').val().trim();
  // replaces the spaces in the search with + signs
  searchQuery = searchQuery.split(' ').join('+');
  // sends the user to the search page with the type and search query
  document.location.replace('/search/' + type + '/' + searchQuery);
}

$('.search-form').on('submit', search);