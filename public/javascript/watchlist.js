async function addToWatchlist(event) {
    event.preventDefault();

    const loc = window.location.toString().split('/');
    const type = loc[loc.length - 2];
    const id = loc[loc.length - 1];
    console.lo
    const poster = document.querySelector('img.poster').getAttribute('src');
    const year = document.querySelector('span.release-date').textContent.split('/')[2];
    console.log(poster, year);
    const response = await fetch('/api/watchlist', {
        method: 'POST',
        body: JSON.stringify({
            type,
            id,
            poster,
            year
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    }
}

document.querySelector('.add-btn').addEventListener('click', addToWatchlist);