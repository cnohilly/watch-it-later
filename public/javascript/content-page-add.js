// for displaying dropdown menu
$(document).ready(function () {
    $("#add-list-dropdown-btn").click(function () {
        $(".dropdown").toggleClass("is-active")
    });
});

//document.querySelector('#add-btn').addEventListener('click', addToWatchlist);

async function addToWatchlist(event) {
    event.preventDefault();

    // gets the type and id from the current location, the title from the title element on the page, the poster_path from the src attribute of the poster, 
    // the year from the date element, and the status from the data attribute of the button clicked
    const loc = window.location.toString().split('/');
    const type = loc[loc.length - 2];
    const id = loc[loc.length - 1];
    const title = $('h2.title').text().trim();
    const poster = document.querySelector('img.poster').getAttribute('src');
    const year = document.querySelector('span.release-date').textContent.split('/')[2];
    const status = $(this).attr('data-watch-status');
    try {
        // attempts to post this data using the watchlist api
        const response = await fetch('/api/watchlist', {
            method: 'POST',
            body: JSON.stringify({
                type,
                id,
                title,
                poster,
                year,
                status
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // if the response is ok, reload the page, otherwise alert the user the content is already in the watchlist
        if (response.ok) {
            document.location.reload();
        } else {
            updateAlertBox(`This is already in your watchlist.`);
        }
    } catch (err) {
        console.log(err);
    }
}

$('.watchlist-dropdown-menu').on('click', '.watch-status-btn', addToWatchlist);

