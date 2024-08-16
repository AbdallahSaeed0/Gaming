document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log('Cart:', cart);
    let checkoutItemsContainer = document.getElementById("checkout-items");
    let totalAmount = 0;
    let totalQuantity = 0;

    cart.forEach(item => {
      let row = document.createElement('tr');
      
      let price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      let itemTotal = price * item.count;
      totalAmount += itemTotal;
      totalQuantity += item.count;

      row.innerHTML = `
        <td>${item.title}</td>
        <td>$${price.toFixed(2)}</td>
        <td>${item.count}</td>
        <td>$${itemTotal.toFixed(2)}</td>
      `;

      checkoutItemsContainer.appendChild(row);
    });

    console.log('Total Quantity:', totalQuantity);
    console.log('Total Amount:', totalAmount); 
    
    let totalQuantityElement = document.getElementById('checkout-total-quantity');
    let totalPriceElement = document.getElementById('checkout-total-price');

    if (totalQuantityElement) {
      totalQuantityElement.textContent = totalQuantity;
    } else {
      console.error('Element with ID "checkout-total-quantity" not found');
    }

    if (totalPriceElement) {
      totalPriceElement.textContent = `$${totalAmount.toFixed(2)}`;
    } else {
      console.error('Element with ID "checkout-total-price" not found');
    }
  });