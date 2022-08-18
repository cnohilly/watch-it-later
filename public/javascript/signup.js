async function signupFormHandler(event) {
  event.preventDefault();

  // gets the username, email, and password from the signup page
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  // if a username and password were supplied then the api to create the new user will be called
  if (username && password) {
    const response = await fetch('/api/users/', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // if the api call is successful, go to the homepage, otherwise alert the user
    if (response.ok) {
      document.location.replace('/');
    } else {
      console.log(response);
      updateAlertBox('Invalid information.');
    }
  }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);