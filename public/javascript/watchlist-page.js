async function cardDropdownHandler(event) {
    event.preventDefault();


    const loc = window.location.toString().split('/');
    const type = $(this).closest('.card').attr('data-content-type');
    const contentId = $(this).closest('.card').attr('data-content-id');

    let response;
    if ($(this).hasClass('remove-button')) {
        console.log(type, contentId, 'remove');
        reponse = await const response = await fetch('/api/watchlist/' + type + '/' + contentId, {
            method: 'DELETE',
        });
    } else {
        const newStatus = $(this).attr('data-watch-status');
        console.log(type, contentId, newStatus);
    }


    // try {
    //     const response = await fetch('/api/watchlist/' + type + '/' + contentId, {
    //         method: 'DELETE',
    //     });

    //     if (response.ok) {
    //         $(this).closest('.content-card').slideUp(250, function () {
    //             $(this).remove();
    //         })
    //     } else {
    //         updateAlertBox('An error has occurred. Please try again.');
    //     }
    // } catch (err) {
    //     console.log(err);
    // }
}

function changeWatchStatus(type, id, status) {
    return fetch('/api/watchlist/', {
        method: 'PUT',
        body: {
            type,
            id,
            status
        }
    });
}

function removeFromWatchlist(type, id) {

}

// function to display card dropdown menu
$(document).ready(function () {
    $(".card-dropdown-btn").on('click', function () {
        $(this).toggleClass("is-active")
    });
});

$('.watchlist-container').on('click', '.watch-dropdown-btn', cardDropdownHandler);
console.log('attached');