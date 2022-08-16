function cardDropdownHandler(event) {
    event.preventDefault();

    const card = $(this).closest('.content-card');
    const id = card.attr('data-watchlist-id');
    let response;
    if ($(this).hasClass('remove-button')) {
        removeFromWatchlist(card, id);
    } else {
        const newStatus = $(this).attr('data-watch-status');
        console.log(newStatus);
        changeWatchStatus(card, id, newStatus);
    }
}

async function changeWatchStatus(card, id, status) {
    console.log(status);
    try {
        const response = await fetch('/api/watchlist/' + id, {
            method: 'PUT',
            body: JSON.stringify({
                status
            }),
            headers: {
                'Content-Type': 'applications/json'
            }
        });
        console.log(response);
        if (response.ok) {
            card.appendTo($('ul.card-container[data-status-list="' + status + '"]'));
        } else {
            updateAlertBox();
        }
    } catch (err) {
        updateAlertBox();
        console.log(err);
    }
}

async function removeFromWatchlist(card, id) {
    try {
        const response = await fetch('/api/watchlist/' + id, {
            method: 'DELETE',
        });
        if (response.ok) {
            card.slideUp(250, function () {
                $(this).remove();
            })
        } else {
            updateAlertBox();
        }
    } catch (err) {
        updateAlertBox();
        console.log(err);
    }
}

// function to display card dropdown menu
$(document).ready(function () {
    $(".card-dropdown-btn").on('click', function () {
        $(this).toggleClass("is-active")
    });
});

$('.watchlist-container').on('click', '.watch-dropdown-btn', cardDropdownHandler);