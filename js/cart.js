//? ======================================
//? Shopping Cart Functionality
//? ======================================

//? -------  Get Cart Items
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

//? -------  Save Cart
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

//? -------  Update Cart Item Quantity
function updateQuantity(productId, newQuantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = parseInt(newQuantity);
            saveCart(cart);
            renderCart();
        }
    }
}

//? -------  Remove Item from Cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
}

//? -------  Calculate Cart Total
function calculateTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

//? -------  Create Cart Item HTML
function createCartItemHTML(item) {
    return `
    <div class="row border-bottom py-3 align-items-center cart-item" data-product-id="${item.id}">
      <div class="col-md-5 d-flex align-items-center">
        <img src="${item.image}" alt="${item.name}" class="img-fluid me-3" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
        <div>
          <h6 class="mb-1">${item.name}</h6>
          <small class="text-muted">${item.category}</small>
          <p class="mb-0 text-danger fw-bold">$${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div class="col-md-2 text-center">
        <div class="input-group input-group-sm" style="max-width: 120px; margin: 0 auto;">
          <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <input type="number" class="form-control text-center" value="${item.quantity}" min="1" 
                 onchange="updateQuantity(${item.id}, this.value)" style="max-width: 50px;">
          <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
      </div>
      <div class="col-md-3 text-center">
        <strong class="text-danger">$${(item.price * item.quantity).toFixed(2)}</strong>
      </div>
      <div class="col-md-2 text-center">
        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
          <i class="fa-solid fa-trash"></i> Remove
        </button>
      </div>
    </div>
  `;
}

//? -------  Render Cart
function renderCart() {
    const cart = getCart();
    const cartContainer = document.getElementById('cart-container');
    const cartTotal = document.getElementById('cart-total');

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
      <div class="text-center py-5">
        <i class="fa-solid fa-cart-shopping fs-1 text-secondary mb-3"></i>
        <h4 class="text-secondary">Your cart is empty</h4>
        <p class="text-muted">Add some products to get started!</p>
        <a href="product.html" class="btn btn-danger mt-3">Continue Shopping</a>
      </div>
    `;
        if (cartTotal) cartTotal.textContent = '$0.00';
        return;
    }

    cartContainer.innerHTML = cart.map(item => createCartItemHTML(item)).join('');

    const total = calculateTotal();
    if (cartTotal) {
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

//? -------  Proceed to Checkout
function proceedToCheckout() {
    const cart = getCart();

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Here you would normally redirect to checkout page
    // For now, we'll just show a confirmation
    const total = calculateTotal();
    const confirmed = confirm(`Proceed to checkout?\n\nTotal: $${total.toFixed(2)}\nItems: ${cart.length}`);

    if (confirmed) {
        alert('Checkout functionality will be implemented soon!');
        // In a real app, you would:
        // 1. Create an order
        // 2. Clear the cart
        // 3. Redirect to order confirmation
    }
}

//? -------  Initialize Cart Page
function initializeCartPage() {
    renderCart();

    const checkoutBtn = document.getElementById('check-out');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
}

//? -------  Run on Page Load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCartPage);
} else {
    initializeCartPage();
}

// Make functions globally available
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
