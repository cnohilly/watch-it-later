function goToLogin() {
    document.location.replace('/login');
}

$('.content-buttons').on('click', 'button', goToLogin);
