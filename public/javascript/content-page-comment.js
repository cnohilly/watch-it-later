async function postComment(event) {
    event.preventDefault();

    // gets the type and id from the current location and gets the text from the comment form
    const loc = window.location.toString().split('/');
    const type = loc[loc.length - 2];
    const id = loc[loc.length - 1];
    const text = $('#comment-text').val().trim();
    // if text is not empty
    if (text) {
        try {
            // attempts to post the comment in the database
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({
                    text,
                    id,
                    type,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // if the api call was successful, reload the page, otherwise alert the user of an error
            if (response.ok) {
                document.location.reload();
            } else {
                updateAlertBox();
            }
        } catch (err) {
            console.log(err);
            updateAlertBox();
        }
    }
}

$('#comment-form').on('click', '#comment-submit-button', postComment);