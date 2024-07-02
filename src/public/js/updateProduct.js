

document.addEventListener('DOMContentLoaded', () => {

  const productId = document.getElementById('productForm').getAttribute('data-id');

  const initialValues = {};
  document.getElementById('productForm').querySelectorAll('input').forEach(input => {
    initialValues[input.name] = input.value;
  });

  document.getElementById('updateProduct').addEventListener('click', async (event) => {
    event.preventDefault();
    console.log(productId)

    const changedValues = {};
    document.getElementById('productForm').querySelectorAll('input').forEach(input => {
      if (input.value !== initialValues[input.name]) {
        changedValues[input.name] = input.value;
      }
    });

    if (Object.keys(changedValues).length === 0) {
      alert('No hay cambios para actualizar');
      return;
    }

    const actionUrl = `/api/products/${productId}`;

    try {
      const response = await fetch(actionUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(changedValues)
      });

      if (response.ok) {
        window.location.href = `/api/products/myproducts`;
        console.log("ok")
      } else {
        console.error('Error:', response.statusText);
      }

    } catch (error) {
      console.error('Error updating role:', error);
    }
  });
});
