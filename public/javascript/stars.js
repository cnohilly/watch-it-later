var flag = false;

async function starRating(event) {
  event.preventDefault();
  var id = $(this).attr("id");

  if (!flag) {
    for (var i = id; i >= 0; i--) {
      $("#" + i).addClass("checked");
    }
  }
}

async function starRemove(event) {
  event.preventDefault();
  if (!flag) {
    for (var i = 1; i <= 5; i++) {
      $("#" + i).removeClass("checked");
    }
  }
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
$(".fa-star").on("click", saveRating);
