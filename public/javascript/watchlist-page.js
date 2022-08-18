function cardDropdownHandler(event) {
    event.preventDefault();

    // gets the card that the button was clicked on and the id in the database from the attribute
    const card = $(this).closest('.content-card');
    const id = card.attr('data-watchlist-id');
    // if the button was a remove-button, then it will call the function to delete the item
    // otherwise it will call the function to update the status
    if ($(this).hasClass('remove-button')) {
        removeFromWatchlist(card, id);
    } else {
        const newStatus = $(this).attr('data-watch-status');
        changeWatchStatus(card, id, newStatus);
    }
}

// function to update the status of the specified content for the user
async function changeWatchStatus(card, id, status) {
    try {
        const response = await fetch('/api/watchlist/' + id, {
            method: 'PUT',
            body: JSON.stringify({
                status
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            // if the api call was successful, the card will be moved to the appropriate container
            card.appendTo($('ul.card-container[data-status-list="' + status + '"]'));
        } else {
            updateAlertBox();
        }
    } catch (err) {
        updateAlertBox();
        console.log(err);
    }
}

// function to delete the specified content for the user
async function removeFromWatchlist(card, id) {
    try {
        const response = await fetch('/api/watchlist/' + id, {
            method: 'DELETE',
        });
        if (response.ok) {
            // if the api call was successful the card will have a small scroll up animation and then be removed from the page
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

// listener for when one of the drop down options is clicked
$('.watchlist-container').on('click', '.watch-dropdown-btn', cardDropdownHandler);