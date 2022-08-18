async function logout() {
  // calls the api to log the current user out
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });

  // if the api call is successful, the user is redirected to the homepage, otherwise they are alerted an error occurred
  if (response.ok) {
    document.location.replace('/');
  } else {
    updateAlertBox();
  }
}

document.querySelector('#nav-logout').addEventListener('click', logout);