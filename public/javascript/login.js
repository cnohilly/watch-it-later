// function to collect information from the field and attempt to log the user in
async function loginFormHandler(event) {
  event.preventDefault();

  // gets the username and password from their respective fields in the form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // if both the username and password have a value, the api will be called passing those values in
  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // if the response was successful, the user is redirected to the homepage, or an error is displayed
    if (response.ok) {
      document.location.replace('/');
      document.location.reload();
    } else {
      console.log(response);
      updateAlertBox('Incorrect information.');
    }
  }
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

