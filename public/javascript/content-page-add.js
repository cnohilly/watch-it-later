async function addToWatchlist(event) {
    event.preventDefault();

    const loc = window.location.toString().split('/');
    const type = loc[loc.length - 2];
    const id = loc[loc.length - 1];
    const title = document.querySelector('h2.title').textContent;
    const poster = document.querySelector('img.poster').getAttribute('src');
    const year = document.querySelector('span.release-date').textContent.split('/')[2];
    const response = await fetch('/api/watchlist', {
        method: 'POST',
        body: JSON.stringify({
            type,
            id,
            title,
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