

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('productsList').addEventListener('click', async (e) => {
    if (e.target && e.target.classList.contains('deleteProduct')) {
      const productId = e.target.getAttribute('data-id');
      const actionUrl = `/api/products/${productId}`;

      try {
        const response = await fetch(actionUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          // Redirigir a la página de productos actualizados
          window.location.href = '/api/products/myproducts';
        } else {
          // Manejar el caso en que la eliminación no fue exitosa
          console.error('Error eliminando producto:', response.statusText);
          alert('Error eliminando producto');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  });
});
