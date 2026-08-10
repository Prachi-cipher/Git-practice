const products = [
  {
    id: 1,
    name: 'Classic Sneaker',
    price: 59.99,
    image: '👟',
    description: 'Comfortable everyday sneakers for active days.'
  },
  {
    id: 2,
    name: 'Leather Backpack',
    price: 89.5,
    image: '🎒',
    description: 'A sleek backpack made for work and travel.'
  },
  {
    id: 3,
    name: 'Smart Watch',
    price: 129.0,
    image: '⌚',
    description: 'Track fitness, calls, and notifications with ease.'
  },
  {
    id: 4,
    name: 'Wireless Earbuds',
    price: 79.99,
    image: '🎧',
    description: 'Crisp sound and long battery life in one design.'
  }
];

const cart = [];

const productList = document.getElementById('product-list');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalPrice = document.getElementById('total-price');
const clearCartButton = document.getElementById('clear-cart');

function renderProducts() {
  productList.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image" aria-label="${product.name}">${product.image}</div>
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-meta">
              <span class="price">$${product.price.toFixed(2)}</span>
              <button class="add-btn" data-id="${product.id}">Add to cart</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');
}

function addToCart(productId) {
  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    const selectedProduct = products.find((product) => product.id === productId);
    cart.push({ ...selectedProduct, quantity: 1 });
  }

  updateCart();
}

function decreaseQuantity(productId) {
  const item = cart.find((entry) => entry.id === productId);

  if (!item) return;

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    const itemIndex = cart.findIndex((entry) => entry.id === productId);
    cart.splice(itemIndex, 1);
  }

  updateCart();
}

function updateCart() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty.</div>';
  } else {
    cartItemsContainer.innerHTML = cart
      .map(
        (item) => `
          <div class="cart-item">
            <div class="cart-item-info">
              <span class="item-name">${item.name}</span>
              <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <div class="qty-box">
              <button data-action="decrease" data-id="${item.id}">-</button>
              <span>${item.quantity}</span>
              <button data-action="increase" data-id="${item.id}">+</button>
            </div>
          </div>
        `
      )
      .join('');
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPrice.textContent = `$${total.toFixed(2)}`;
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

productList.addEventListener('click', (event) => {
  const button = event.target.closest('.add-btn');

  if (!button) return;

  addToCart(Number(button.dataset.id));
});

cartItemsContainer.addEventListener('click', (event) => {
  const button = event.target.closest('button');

  if (!button) return;

  const productId = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === 'increase') {
    addToCart(productId);
  }

  if (action === 'decrease') {
    decreaseQuantity(productId);
  }
});

clearCartButton.addEventListener('click', () => {
  cart.length = 0;
  updateCart();
});

renderProducts();
updateCart();
