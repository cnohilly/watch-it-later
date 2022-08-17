const starControl = $('div.control.star');
let rated = false;
let starDefault;

function starRating(event) {
  var id = $(this).attr("id");
  removeAllStars();
  let stars = id ? id : starDefault;
  addStars(stars);
}

function starRemove(event) {
  removeAllStars();
  if (starDefault) {
    addStars(starDefault);
  }
}

function removeAllStars() {
  $('.fa-star').removeClass('checked');
}

function addStars(int) {
  for (let i = 1; i <= int; i++) {
    $('#' + i).addClass('checked');
  }
}

async function ratingHandler(event) {
  var rating = $(this).attr("id");
  const loc = window.location.toString().split("/");
  const content_id = loc[loc.length - 1];
  const content_type = loc[loc.length - 2];

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
      document.location.reload();
    } else {
      updateAlertBox();
    }
  } catch (err) {
    console.log(err);
  }
}

$(".fa-star").on("mouseover", starRating);
$(".fa-star").on("mouseout", starRemove);
$(".fa-star").on("click", ratingHandler);

if (starControl.attr('data-user-rated')) {
  starDefault = parseInt(starControl.attr('data-user-rating'));
  rated = true;
  starRating();
}