async function updateUser(event) {
  event.preventDefault();

  const newUsername = $('input#username').val();
  const currentPassword = $('input#current-password').val();
  const newPassword = $('input#new-password').val();
  let body = {};
  if (currentPassword) {
    body.current_password = currentPassword;
  } else {
    updateAlertBox('Must enter your current password.');
    return;
  }
  if (!(newUsername || newPassword)) {
    updateAlertBox('Must provide a new username or password.');
    return;
  }
  if (newUsername) {
    body.username = newUsername;
  }
  if (newPassword) {
    body.new_password = newPassword;
  }

  const response = await fetch('/api/users', {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    document.location.reload();
  } else {
    console.log(response);
    updateAlertBox();
  }
}

// document.querySelector('#newuser-submit').addEventListener('click', updateUser);

$('.update-user-form').on('submit', updateUser);