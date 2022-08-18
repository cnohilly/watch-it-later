function goToLogin() {
    document.location.replace('/login');
}

$('.content-buttons, .star-container').on('click', 'button,.fa-star', goToLogin);
