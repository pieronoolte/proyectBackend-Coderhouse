

document.addEventListener('DOMContentLoaded', () => {
  const cartId = document.getElementById('productsList').getAttribute('data-cart-id');
  document.getElementById('productsList').addEventListener('click', async (e) => {
    if (e.target && e.target.classList.contains('addProduct')) {
      const productId = e.target.getAttribute('data-id');
      const actionUrl = `/api/carts/${cartId}/product/${productId}`;

      try {
        // eslint-disable-next-line no-unused-vars
        const response = await fetch(actionUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // eslint-disable-next-line no-undef, no-console
        console.log(`se agrego a carrito el producto ${productId}`)

      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  });
});
