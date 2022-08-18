async function updateUser(event) {
  event.preventDefault();

  // gets the values from each of the fields of the form
  const newUsername = $('input#username').val().trim();
  const currentPassword = $('input#current-password').val().trim();
  const newPassword = $('input#new-password').val().trim();
  const newEmail = $('input#email').val().trim();
  const newPFP = $('input#pfp_path').val().trim();
  let body = {};
  // if the current password is empty, the function exits and alerts the user
  if (currentPassword) {
    body.current_password = currentPassword;
  } else {
    updateAlertBox('Must enter your current password.');
    return;
  }
  // if no field has new information, the function exits and alerts the user
  if (!(newUsername || newPassword || newEmail || newPFP)) {
    updateAlertBox('Must provide a new username or password.');
    return;
  }
  // will only set the value for body if the field is not empty
  if (newUsername) {
    body.username = newUsername;
  }
  if (newPassword) {
    body.password = newPassword;
  }
  if (newEmail) {
    body.email = newEmail;
  }
  if (newPFP) {
    body.pfp_path = newPFP;
  }

  // calls the api to attempt update the user with the provided information
  const response = await fetch('/api/users', {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  // if the response comes back ok the page is reloaded, otherwise alert the user that an error has occured
  if (response.ok) {
    document.location.reload();
  } else {
    console.log(response);
    updateAlertBox();
  }
}

$('.update-user-form').on('submit', updateUser);