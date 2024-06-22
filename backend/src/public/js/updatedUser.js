
document.addEventListener('DOMContentLoaded', () => {
document.getElementById('roleForm').addEventListener('submit', async () => {
  const role = document.getElementById('roleSelect').value;
  const userId = document.getElementById('roleForm').getAttribute('data-id');

  const actionUrl = `/api/users/${userId}/${role}`;

  try {
    const response = await fetch(actionUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error updating role:', error);
    alert('Error updating role');
  }
});

document.getElementById('inactiveUsers').addEventListener('click', async (event) => {
  // Detener la propagación del evento para evitar que llegue al formulario
  event.stopPropagation();

  const actionUrl = '/api/users/inactive';

  try {
    const response = await fetch(actionUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      alert('Usuarios Eliminados');
    } else {
      console.error('Error:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating role:', error);
    alert('Error updating role');
  }
});

});
