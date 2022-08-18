const alertBox = $('.alert-box');
const alertText = $('.alert-text');

let alertTimeout;

// displays the alert box with the specified message or the default message of an error has occurred
function updateAlertBox(message) {
    if (!message) {
        message = 'An error has occurred. Please try again.';
    }
    // clears any already existing timeout
    if (alertTimeout) {
        clearTimeout(alertTimeout);
    }
    // sets the message in the alert box
    alertText.text(message);
    // makes the box unhidden
    alertBox.removeClass('is-hidden');
    // sets the new timeout to show the box for 5 seconds and then add the hidden class again
    alertTimeout = setTimeout(function () {
        alertBox.addClass('is-hidden');
    }, 5000);
}

// listener for the x button on the alert to dismiss it from the screen
$('#dismiss-notification-btn').on('click', function () {
    // clears the timeout and hides the box
    if (alertTimeout) {
        clearTimeout(alertTimeout);
    }
    alertBox.addClass('is-hidden');
});