//Cart.js is linked to cart.html - helps calculate the total price

// Cart Array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add product to cart
function addToCart(name, price, image) {
  const existingProduct = cart.find((item) => item.name === name);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1, image });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} has been added to your cart!`);
}

// Event for Add to Cart buttons
document.querySelector(".product-container").addEventListener("click", (event) => {
  const button = event.target.closest(".product-link");
  if (button) {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    const image = button.closest(".product-group").querySelector(".product-image").src; // Get the image source
    addToCart(name, price, image);
  }
});

// Load cart items on cart.html
if (window.location.pathname.endsWith("cart.html")) {
  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("subtotal");

  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const productGroup = document.createElement("div");
    productGroup.classList.add("product-group");

    productGroup.innerHTML = `
      <img class="product-image" src="${item.image}" alt="${item.name}" />
      <div class="product-description">
        <h2>${item.name}</h2>
        <div class="quantity-controls">
          <button class="decrease-quantity" onclick="updateQuantity(${index}, -1)">-</button>
          <span>Quantity: ${item.quantity}</span>
          <button class="increase-quantity" onclick="updateQuantity(${index}, 1)">+</button>
        </div>
        <p>Total: $${itemTotal.toFixed(2)}</p>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(productGroup);
  });

  // Update subtotal
  subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;

  // Handle checkout button
  document.getElementById("checkout-btn").addEventListener("click", () => {
    window.location.href = "checkout.html"; // Redirect to the checkout page
  });
}

// Update quantity
function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1); // Remove item if quantity is zero or less
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload(); // Reload page to update UI
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
