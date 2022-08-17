const alertBox = $('.alert-box');
const alertText = $('.alert-text');

let alertTimeout;

function updateAlertBox(message) {
    if (!message) {
        message = 'An error has occured. Please try again.';
    }
    if (alertTimeout) {
        clearTimeout(alertTimeout);
    }
    alertText.text(message);
    alertBox.removeClass('is-hidden');
    alertTimeout = setTimeout(function () {
        alertBox.addClass('is-hidden');
    }, 5000);
}

$('#dismiss-notification-btn').on('click', function () {
    if (alertTimeout) {
        clearTimeout(alertTimeout);
    }
    alertBox.addClass('is-hidden');
});