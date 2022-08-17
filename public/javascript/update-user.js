
async function updateUser(event) {
    event.preventDefault();
  
    let newUser= $('#newuser-input').val();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
      
    const response = await fetch(`/api/users/${{id}}`, {
      method: 'PUT',
      body: JSON.stringify({
        username: newUser
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