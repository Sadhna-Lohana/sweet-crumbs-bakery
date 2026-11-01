
let cartCount = 0;
let cartTotal = 0;
let cartItems = [];

// Add a product to the cart
function addToCart(productName, price) {
  const existingItem = cartItems.find(
    item => item.name === productName
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({
      name: productName,
      price: price,
      quantity: 1
    });
  }

  updateCart();

  document.getElementById("message").textContent =
    productName + " added to your cart!";
}

// Update cart items and total
function updateCart() {
  const cartItemsContainer =
    document.getElementById("cart-items");

  cartCount = 0;
  cartTotal = 0;

  cartItems.forEach(item => {
    cartCount += item.quantity;
    cartTotal += item.price * item.quantity;
  });

  document.getElementById("cart-count").textContent =
    cartCount;

  document.getElementById("cart-total").textContent =
    cartTotal;

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart">Your cart is empty.</p>';
    return;
  }

  cartItemsContainer.innerHTML = "";

  cartItems.forEach((item, index) => {
    const itemRow = document.createElement("div");
    itemRow.className = "cart-item";

    const itemDetails = document.createElement("div");
    itemDetails.className = "cart-item-details";

    const itemName = document.createElement("span");
    itemName.className = "cart-item-name";
    itemName.textContent = item.name;

    const itemPrice = document.createElement("span");
    itemPrice.className = "cart-item-price";
    itemPrice.textContent =
      `Rs. ${item.price} × ${item.quantity} = Rs. ${
        item.price * item.quantity
      }`;

    itemDetails.appendChild(itemName);
    itemDetails.appendChild(itemPrice);

    const quantityControls = document.createElement("div");
    quantityControls.className = "quantity-controls";

    const minusButton = document.createElement("button");
    minusButton.type = "button";
    minusButton.textContent = "−";
    minusButton.setAttribute(
      "aria-label",
      `Decrease ${item.name} quantity`
    );

    minusButton.addEventListener("click", function () {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cartItems.splice(index, 1);
      }

      updateCart();
    });

    const quantity = document.createElement("span");
    quantity.className = "quantity-number";
    quantity.textContent = item.quantity;

    const plusButton = document.createElement("button");
    plusButton.type = "button";
    plusButton.textContent = "+";
    plusButton.setAttribute(
      "aria-label",
      `Increase ${item.name} quantity`
    );

    plusButton.addEventListener("click", function () {
      item.quantity++;
      updateCart();
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.className = "remove-button";

    removeButton.addEventListener("click", function () {
      const removedName = item.name;
      cartItems.splice(index, 1);
      updateCart();

      document.getElementById("message").textContent =
        removedName + " removed from your cart.";
    });

    quantityControls.appendChild(minusButton);
    quantityControls.appendChild(quantity);
    quantityControls.appendChild(plusButton);

    itemRow.appendChild(itemDetails);
    itemRow.appendChild(quantityControls);
    itemRow.appendChild(removeButton);

    cartItemsContainer.appendChild(itemRow);
  });
}

// Show checkout form
function placeOrder() {
  if (cartItems.length === 0) {
    document.getElementById("message").textContent =
      "Please add a bakery item first!";
    return;
  }

  const checkoutForm =
    document.getElementById("checkout-form");

  checkoutForm.hidden = false;

  checkoutForm.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// Contact form validation
const contactForm =
  document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name =
      document.getElementById("customer-name").value.trim();

    const email =
      document.getElementById("customer-email").value.trim();

    const message =
      document.getElementById("customer-message").value.trim();

    const feedback =
      document.getElementById("form-feedback");

    if (!name || !email || !message) {
      feedback.textContent = "Please fill in all fields.";
      feedback.style.color = "red";
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      feedback.textContent =
        "Please enter a valid email address.";
      feedback.style.color = "red";
      return;
    }

    feedback.textContent =
      "Thank you, " + name + "! Your form is valid.";

    feedback.style.color = "green";
    contactForm.reset();
  });
}

// Newsletter form
const newsletterForm =
  document.getElementById("newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput =
      document.getElementById("newsletter-email");

    const message =
      document.getElementById("newsletter-message");

    const email = emailInput.value.trim();

    if (!email) {
      message.textContent =
        "Please enter your email address.";
      return;
    }

    message.textContent =
      "Thank you for subscribing! (Demo only)";

    newsletterForm.reset();
  });
}

// Back to Top button
const backToTopButton =
  document.getElementById("back-to-top");

if (backToTopButton) {
  function toggleBackToTopButton() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  }

  window.addEventListener("scroll", toggleBackToTopButton);
  window.addEventListener("load", toggleBackToTopButton);

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  toggleBackToTopButton();
}

// Checkout form
const checkoutForm =
  document.getElementById("checkout-form");

if (checkoutForm) {
  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const checkoutMessage =
      document.getElementById("checkout-message");

    if (cartItems.length === 0) {
      checkoutMessage.textContent =
        "Your cart is empty. Please add a product first.";
      return;
    }

    const customerName =
      document.getElementById("checkout-name").value.trim();

    checkoutMessage.textContent =
      "Thank you, " + customerName +
      "! Your demo order has been confirmed.";

    cartItems = [];
    updateCart();
    checkoutForm.reset();
  });
}


const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("active");

    hamburger.setAttribute("aria-expanded", isOpen);
    hamburger.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open navigation menu");
    });
  });
}


/* Active Navigation Link Highlighting */

const navItems = document.querySelectorAll("#nav-links a");

const navSections = [
  { id: "products", href: "#products" },
  { id: "cart-section", href: "#cart-section" },
  { id: "about", href: "#about" },
  { id: "reviews", href: "#reviews" },
  { id: "contact-section", href: "#contact-section" },
  { id: "newsletter", href: "#newsletter" }
];

function setActiveLink(activeHref) {
  navItems.forEach(function (link) {
    const isActive = link.getAttribute("href") === activeHref;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateActiveLink() {
  if (window.scrollY < 50) {
    setActiveLink("#");
    return;
  }

  let activeHref = "#";

  for (const item of navSections) {
    const section = document.getElementById(item.id);

    if (section && section.getBoundingClientRect().top <= 180) {
      activeHref = item.href;
    }
  }

  setActiveLink(activeHref);
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("resize", updateActiveLink);

navItems.forEach(function (link) {
  link.addEventListener("click", function () {
    const href = link.getAttribute("href");

    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      setActiveLink("#");
    } else {
      setActiveLink(href);
    }
  });
});

updateActiveLink();
