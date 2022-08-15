async function removeFromWatchlist(event) {
    event.preventDefault();

    const loc = window.location.toString().split('/');
    const type = this.getAttribute('data-content-type');
    const contentId = this.getAttribute('data-content-id');
    const response = await fetch('/api/watchlist/' + type + '/' + contentId, {
        method: 'DELETE',
    });

    if (response.ok) {
        $(this).closest('.content-card').slideUp(250, function () {
            $(this).remove();
        })
    }
    // const response = await fetch('/api/watchlist', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         type,
    //         id,
    //         title,
    //         poster,
    //         year
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });

    // if (response.ok) {
    //     document.location.reload();
    // }
}

$('.section').on('click', '.remove-button', removeFromWatchlist);