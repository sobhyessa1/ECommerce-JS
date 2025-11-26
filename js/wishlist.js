//? ======================================
//? Wishlist Functionality
//? ======================================

//? -------  Get Wishlist Items
function getWishlist() {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
}

//? -------  Save Wishlist
function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

//? -------  Remove from Wishlist
function removeFromWishlist(productId) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(item => item.id !== productId);
    saveWishlist(wishlist);
    renderWishlist();
}

//? -------  Move to Cart
function moveToCart(productId) {
    const wishlist = getWishlist();
    const product = wishlist.find(item => item.id === productId);

    if (!product) return;

    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
        alert(`${product.name} quantity increased in cart!`);
    } else {
        cart.push({ ...product, quantity: 1 });
        alert(`${product.name} added to cart!`);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Remove from wishlist
    removeFromWishlist(productId);
}

//? -------  Create Wishlist Item HTML
function createWishlistItemHTML(item) {
    return `
    <tr class="wishlist-item" data-product-id="${item.id}">
      <td class="align-middle">
        <div class="d-flex align-items-center">
          <img src="${item.image}" alt="${item.name}" class="me-3" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
          <div>
            <h6 class="mb-0">${item.name}</h6>
            <small class="text-muted">${item.category}</small>
          </div>
        </div>
      </td>
      <td class="align-middle text-center">
        <strong class="text-danger">$${item.price.toFixed(2)}</strong>
      </td>
      <td class="align-middle text-center">
        <button class="btn btn-sm btn-danger me-2" onclick="moveToCart(${item.id})">
          <i class="fa-solid fa-cart-plus"></i> Add to Cart
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="removeFromWishlist(${item.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `;
}

//? -------  Render Wishlist
function renderWishlist() {
    const wishlist = getWishlist();
    const wishlistBody = document.getElementById('wishlist-body');
    const emptyMessage = document.getElementById('wishlist-empty');

    if (!wishlistBody) return;

    // Clear current content
    wishlistBody.innerHTML = '';

    if (wishlist.length === 0) {
        wishlistBody.innerHTML = `
      <tr class="text-center">
        <td colspan="3" class="py-5">
          <i class="fa-solid fa-heart fs-1 text-secondary mb-3 d-block"></i>
          <h4 class="text-secondary">Your wishlist is empty</h4>
          <p class="text-muted">Add products you love to your wishlist!</p>
          <a href="product.html" class="btn btn-danger mt-3">Browse Products</a>
        </td>
      </tr>
    `;
        return;
    }

    wishlistBody.innerHTML = wishlist.map(item => createWishlistItemHTML(item)).join('');
}

//? -------  Initialize Wishlist Page
function initializeWishlistPage() {
    renderWishlist();
}

//? -------  Run on Page Load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWishlistPage);
} else {
    initializeWishlistPage();
}

// Make functions globally available
window.removeFromWishlist = removeFromWishlist;
window.moveToCart = moveToCart;
