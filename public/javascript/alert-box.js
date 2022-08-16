const alertBox = $('.alert-box');
const alertText = $('.alert-text');

let alertTimeout;

function updateAlertBox(message) {
    console.log('test');
    if (alertTimeout) {
        clearTimeout(alertTimeout);
    }
    alertText.text(message);
    alertBox.removeClass('is-hidden');
    alertTimeout = setTimeout(function () {
        alertBox.addClass('is-hidden');
    }, 5000);
}
console.log('attached');