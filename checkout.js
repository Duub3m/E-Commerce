// Checkout Page 

//This page is connected to out chckout.html
//getting all the elements through their ID
if (window.location.pathname.endsWith("checkout.html")) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");
  const checkoutForm = document.getElementById("checkout-form");

  //sets our variables to their respective value
  const taxRate = 0.08;
  let shippingHandling = 4.49;
  let estimatedTax = 0;
  let orderTotal = 0;
  let subtotal = 0;
  let totalItems = 0;

  //calculates the cost of both the subtotal and the total items 

  //for subtotal we're multiplying the price 
  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
    totalItems += item.quantity;
  });

  //caclualtes the order total using the tax and shipping
  shippingHandling += Math.floor(totalItems / 2) * 0.25;
  estimatedTax = subtotal * taxRate;
  orderTotal = subtotal + estimatedTax + shippingHandling;

  subtotalElement.innerHTML = `
    <div>
      <img src="assets/images/ShopEaseIcon.png" alt="ShopEase Logo" class="logo" />
    </div>
    Subtotal: $${subtotal.toFixed(2)}
  `;
  totalElement.innerHTML = `
    Shipping & Handling: $${shippingHandling.toFixed(2)} <br>
    Estimated tax: $${estimatedTax.toFixed(2)} <br>
    Order total: $${orderTotal.toFixed(2)}
  `;

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;

    fetch("http://localhost:3000/purchase-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subtotal,
        shippingHandling,
        estimatedTax,
        orderTotal,
        address,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Purchase successful! A confirmation email has been sent.");
        } else {
          alert("Failed to send confirmation email. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  });
}
