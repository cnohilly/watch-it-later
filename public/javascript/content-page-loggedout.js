function goToLogin() {
    document.location.replace('/login');
}

// adds a listener to these buttons to redirect the user to the login page if they attempt to rate or add to watchlist
$('.content-buttons, .star-container').on('click', 'button,.fa-star', goToLogin);
