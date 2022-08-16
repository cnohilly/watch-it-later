async function postComment(event) {
    event.preventDefault();

    console.log('here');
    const loc = window.location.toString().split('/');
    const type = loc[loc.length - 2];
    const id = loc[loc.length - 1];
    const text = $('#comment-text').val().trim();
    console.log(text);
    if (text) {
        try {
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
            if (response.ok) {
                document.location.reload();
            } else {
                updateAlertBox();
            }
        } catch (err) {
            console.log(err);
        }
    }
}

$('#comment-form').on('click', '#comment-submit-button', postComment);