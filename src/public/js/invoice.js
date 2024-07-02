

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

  document.getElementById('finishPay').addEventListener('click', async () => {

    const actionUrl = '/api/carts/invoice';

    try {
      const response = await fetch(actionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        window.location.href = '/api/home';
      } else {
        console.error('Error:', response.statusText);
      }

    } catch (error) {
      console.error('Error updating role:', error);
      alert('Error updating role');
    }
  });

});
