<<<<<<< HEAD

//? -------  Sample Products Data (will be stored in localStorage)
const sampleProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 79.99,
    stock: 15,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    description: "High-quality wireless headphones with noise cancellation"
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 199.99,
    stock: 8,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    description: "Feature-rich smartwatch with fitness tracking"
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Sports",
    price: 89.99,
    stock: 20,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    description: "Comfortable running shoes for all terrains"
  },
  {
    id: 4,
    name: "Leather Backpack",
    category: "Fashion",
    price: 129.99,
    stock: 12,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    description: "Stylish leather backpack with multiple compartments"
  },
  {
    id: 5,
    name: "Coffee Maker",
    category: "Home",
    price: 149.99,
    stock: 10,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    description: "Programmable coffee maker with thermal carafe"
  },
  {
    id: 6,
    name: "Yoga Mat",
    category: "Sports",
    price: 29.99,
    stock: 25,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    description: "Non-slip yoga mat with carrying strap"
  },
  {
    id: 7,
    name: "Desk Lamp",
    category: "Home",
    price: 45.99,
    stock: 18,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    description: "LED desk lamp with adjustable brightness"
  },
  {
    id: 8,
    name: "Sunglasses",
    category: "Fashion",
    price: 59.99,
    stock: 30,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    description: "UV protection sunglasses with polarized lenses"
  },
  {
    id: 9,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 69.99,
    stock: 14,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    description: "Portable Bluetooth speaker with 360° sound"
  },
  {
    id: 10,
    name: "Water Bottle",
    category: "Sports",
    price: 24.99,
    stock: 40,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    description: "Insulated stainless steel water bottle"
  },
  {
    id: 11,
    name: "Canvas Sneakers",
    category: "Fashion",
    price: 49.99,
    stock: 22,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    description: "Classic canvas sneakers in multiple colors"
  },
  {
    id: 12,
    name: "Air Purifier",
    category: "Home",
    price: 179.99,
    stock: 7,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    description: "HEPA air purifier for clean indoor air"
  }
];

//? -------  Initialize Products in localStorage
function initializeProducts() {
  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(sampleProducts));
  }
}

//? -------  Get Products from localStorage
function getProducts() {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
}

//? -------  Get Categories from Products
function getCategories() {
  const products = getProducts();
  const categories = [...new Set(products.map(p => p.category))];
  return categories.sort();
}

//? -------  Create Product Card HTML
function createProductCard(product) {
  return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card h-100 shadow-sm border-0 product-card">
        <div class="position-relative overflow-hidden">
          <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 250px; object-fit: cover;">
          ${product.stock < 10 ? '<span class="badge bg-warning position-absolute top-0 end-0 m-2">Low Stock</span>' : ''}
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-truncate">${product.name}</h5>
          <p class="card-text text-secondary small flex-grow-1">${product.description}</p>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <span class="badge bg-secondary">${product.category}</span>
            <span class="fw-bold text-danger fs-5">$${product.price.toFixed(2)}</span>
          </div>
          <div class="d-flex gap-2 mt-3">
            <button class="btn btn-danger btn-sm flex-grow-1" onclick="addToCart(${product.id})">
              <i class="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
            <button class="btn btn-outline-danger btn-sm" onclick="addToWishlist(${product.id})">
              <i class="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

//? -------  Render Products
function renderProducts(productsToRender = null) {
  const productsContainer = document.getElementById('products');
  if (!productsContainer) return;

  const products = productsToRender || getProducts();

  if (products.length === 0) {
    productsContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fa-solid fa-box-open fs-1 text-secondary mb-3"></i>
        <h4 class="text-secondary">No products found</h4>
        <p class="text-muted">Try adjusting your filters</p>
      </div>
    `;
    return;
  }

  productsContainer.innerHTML = products.map(product => createProductCard(product)).join('');
}

//? -------  Filter Products
function filterProducts() {
  const nameFilter = document.getElementById('filter-name')?.value.toLowerCase() || '';
  const categoryFilter = document.getElementById('filter-category')?.value || '';
  const maxPriceFilter = parseFloat(document.getElementById('filter-max-price')?.value) || Infinity;

  let products = getProducts();

  // Apply filters
  products = products.filter(product => {
    const matchesName = product.name.toLowerCase().includes(nameFilter);
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    const matchesPrice = product.price <= maxPriceFilter;

    return matchesName && matchesCategory && matchesPrice;
  });

  renderProducts(products);
}

//? -------  Initialize Category Filter
function initializeCategoryFilter() {
  const categorySelect = document.getElementById('filter-category');
  if (!categorySelect) return;

  const categories = getCategories();
  const currentValue = categorySelect.value;

  // Keep "All" option and add categories
  categorySelect.innerHTML = '<option value="">All</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  categorySelect.value = currentValue;
}

//? -------  Reset Filters
function resetFilters() {
  const nameInput = document.getElementById('filter-name');
  const categorySelect = document.getElementById('filter-category');
  const priceInput = document.getElementById('filter-max-price');

  if (nameInput) nameInput.value = '';
  if (categorySelect) categorySelect.value = '';
  if (priceInput) priceInput.value = '';

  renderProducts();
}

//? -------  Add to Cart (placeholder)
function addToCart(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);

  if (!product) return;

  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');

  // Check if product already in cart
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  // Show success message with option to view cart
  const message = existingItem
    ? `${product.name} quantity increased in cart!`
    : `${product.name} added to cart!`;

  if (confirm(`${message}\n\nGo to cart now?`)) {
    window.location.href = 'cart.html';
  }
}

//? -------  Add to Wishlist (placeholder)
function addToWishlist(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);

  if (!product) return;

  // Get wishlist from localStorage
  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

  // Check if product already in wishlist
  if (wishlist.find(item => item.id === productId)) {
    alert(`${product.name} is already in your wishlist!`);
    return;
  }

  wishlist.push(product);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  if (confirm(`${product.name} added to wishlist!\n\nView wishlist now?`)) {
    window.location.href = 'wishlist.html';
  }
}

//? -------  Initialize Page
function initializePage() {
  // Initialize products in localStorage
  initializeProducts();

  // Render products
  renderProducts();

  // Initialize category filter
  initializeCategoryFilter();

  // Add event listeners for filters
  const nameInput = document.getElementById('filter-name');
  const categorySelect = document.getElementById('filter-category');
  const priceInput = document.getElementById('filter-max-price');
  const resetButton = document.getElementById('filters-reset');

  if (nameInput) {
    nameInput.addEventListener('input', filterProducts);
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', filterProducts);
  }

  if (priceInput) {
    priceInput.addEventListener('input', filterProducts);
  }

  if (resetButton) {
    resetButton.addEventListener('click', resetFilters);
  }

  // Handle logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
      }
    });
  }
}

//? -------  Navbar Active Link
const currentPage = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

const links = document.querySelectorAll("nav a");
links.forEach(link => {
  const href = link.getAttribute("href");
  if (href === currentPage) {
    link.classList.add("activeted");
  } else {
    link.classList.remove("activeted");
  }
});

//? -------  Run on Page Load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}
=======


//?-------      navbar

    // get pageName
  const currentPage = location.pathname.substring(1);
  
  const links = document.querySelectorAll("nav a");
  links.forEach(link => {
    if(link.getAttribute("href") === currentPage){
      link.classList.add("activeted");
    } else {
      link.classList.remove("activeted");
    }
  });
>>>>>>> eea37e17bd72eca5cfe2de38e8bea9e7e1bd364d
