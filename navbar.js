document.addEventListener("DOMContentLoaded", () => {
    const navbarHTML = `
      <!-- Navbar -->
      <nav id="desktop-nav">
        <p><img class="logo" src="assets/images/ShopEaseIcon.png" alt="ShopEase Logo" />ShopEase</p>
        <ul class="navbar-links">
          <li><a href="home.html">Home</a></li>
          <li><a href="cart.html">Cart</a></li>
          <li><a href="checkout.html">Checkout</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    `;
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);
  });
  