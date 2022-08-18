const starControl = $('div.control.star');
let rated = false;
let starDefault;

// event to fire when the user's mouse enters a star
function starRating(event) {
  var id = $(this).attr("id");
  removeAllStars();
  let stars = id ? id : starDefault;
  addStars(stars);
}

// event to fire when the user's mouse leaves a star
function starRemove(event) {
  removeAllStars();
  if (starDefault) {
    addStars(starDefault);
  }
}

// removes the class from all stars to make them empty
function removeAllStars() {
  $('.fa-star').removeClass('checked');
}

// loops through the stars up to the specified number to add the class and make them filled
function addStars(int) {
  for (let i = 1; i <= int; i++) {
    $('#' + i).addClass('checked');
  }
}

// function to handle when the user clicks on a star, sending the data to the api to either post a new rating or update the existing rating
async function ratingHandler(event) {
  // rating to pass to the api, and the id and type of the content being rated
  var rating = $(this).attr("id");
  const loc = window.location.toString().split("/");
  const content_id = loc[loc.length - 1];
  const content_type = loc[loc.length - 2];
  // if the user has rated the content already, this will be a PUT call, otherwise it will be a POST
  let method = rated ? 'PUT' : 'POST';
  try {
    const response = await fetch('/api/votes', {
      method,
      body: JSON.stringify({
        content_type,
        content_id,
        rating
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (response.ok) {
      // if the api call was successful, reload the page
      document.location.reload();
    } else {
      updateAlertBox();
    }
  } catch (err) {
    console.log(err);
  }
}

// adds the necessary listeners to the stars
$(".fa-star").on("mouseover", starRating);
$(".fa-star").on("mouseout", starRemove);
$(".fa-star").on("click", ratingHandler);

// if the data-user-rated attribute has a value, then the user has rated the piece of content before
// rated is set to true, and the user's current rating is stored, and the 
if (starControl.attr('data-user-rated')) {
  starDefault = parseInt(starControl.attr('data-user-rating'));
  rated = true;
  starRating();
}