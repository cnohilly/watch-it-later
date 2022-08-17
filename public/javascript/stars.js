const starControl = $('div.control.star');
let rated = false;
let starDefault;

function starRating(event) {
  var id = $(this).attr("id");

  for (var i = id; i >= 0; i--) {
    $("#" + i).addClass("checked");
  }
}

function starRemove(event) {
  for (var i = 5; i >= starDefault || 1; i++) {
    $("#" + i).removeClass("checked");
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

function postRating(content_id, content_type, rating) {
  return fetch('/api/votes', {
    method: 'POST',
    body: JSON.stringify({
      content_id,
      content_type,
      rating
    })
  })
}

async function saveRating(event) {
  event.preventDefault();
  var rating = $(this).attr("id");

  if (!flag) {
    //save info

    const loc = window.location.toString().split("/");
    const content_id = loc[loc.length - 1];
    const content_type = loc[loc.length - 2];
    console.log(content_id, content_type);

    try {
      const response = await fetch("/api/votes", {
        method: "POST",
        body: JSON.stringify({
          content_id,
          content_type,
          rating
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        document.location.reload();
      } else {
        updateAlertBox();
      }
    } catch (err) {
      console.log(err);
    }
  }

  flag = true;
}

$(".fa-star").on("mouseover", starRating);
$(".fa-star").on("mouseout", starRemove);
$(".fa-star").on("click", ratingHandler);

if (starControl.attr('data-user-rated')) {
  starDefault = starControl.attr('data-user-rating');
  rated = true;
  starRating(starDefault);
}