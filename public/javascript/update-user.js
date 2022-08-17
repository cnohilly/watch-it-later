
async function updateUser(event) {
    event.preventDefault();
  
    let newUser= $('#newuser-input').val();

    const response = await fetch(`/api/users`, {
      method: 'PUT',
      body: JSON.stringify({
        newUser
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  

document.querySelector('#newuser-submit').addEventListener('click', updateUser);