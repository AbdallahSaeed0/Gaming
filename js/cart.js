document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cartItems");

    cart.forEach(item => {
      let row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.recipe_id}</td>
        <td><img src="${item.image_url}" alt=""></td>
        <td>${item.title}</td>
        <td>${item.category}</td>
        <td>${item.price}</td>
        <td>${item.count}</td>
      `;
      cartItemsContainer.appendChild(row);
    });
  });