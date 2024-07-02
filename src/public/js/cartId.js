

document.addEventListener('DOMContentLoaded', () => {
  const productQuantities = document.querySelectorAll('.productQuantity');
  const productPrices = document.querySelectorAll('.productPrice');
  let totalPrice = 0;
  let totalQuantity = 0;

  productPrices.forEach(priceElement => {
    totalPrice += parseInt(priceElement.textContent);
  });
  productQuantities.forEach(quantityElement => {
    totalQuantity += parseInt(quantityElement.textContent);
  });
  document.getElementById('cart__price').textContent = totalPrice;
  document.getElementById('cart__quantity').textContent = totalQuantity;
  const cartId = document.getElementById('cartPay').getAttribute('data-id');

  document.getElementById('cartPay').addEventListener('click', async () => {

    const actionUrl = `/api/carts/${cartId}/pay`;

    try {
      const response = await fetch(actionUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        window.location.href = `/api/carts/${cartId}/invoice`;
      } else {
        console.error('Error:', response.statusText);
      }

    } catch (error) {
      console.error('Error updating role:', error);
    }
  });


  const deleteButtons = document.querySelectorAll('.deleteProduct');

  deleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
      let productId = button.getAttribute('data-id');
      try {

        const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          window.location.href = `/api/carts/${cartId}`;
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating role:', error);
      }
    });
  });
});
