async function removeFromWatchlist(event) {
    event.preventDefault();

    const loc = window.location.toString().split('/');
    const type = this.getAttribute('data-content-type');
    const contentId = this.getAttribute('data-content-id');
    try {
        const response = await fetch('/api/watchlist/' + type + '/' + contentId, {
            method: 'DELETE',
        });

        if (response.ok) {
            $(this).closest('.content-card').slideUp(250, function () {
                $(this).remove();
            })
        }
    } catch (err) {
        console.log(err);
    }
}

// function to display card dropdown menu
$(document).ready(function() {
    $(".card-dropdown-btn").on('click', function() {
        $(this).toggleClass("is-active")
    });
});

$('.section').on('click', '.remove-button', removeFromWatchlist);