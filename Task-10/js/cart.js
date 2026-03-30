let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function getCart() {
  return cart;
}

export function addToCart(product) {
  const item = cart.find(p => p.id === product.id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
}

export function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
}

export function updateQty(id, change) {
  const item = cart.find(p => p.id === id);
  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    saveCart();
  }
}


function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getTotal() {
  let subtotal = 0;

  for (let item of cart) {
    subtotal += item.price * item.qty;
  }
  const tax = subtotal * 0.05;
  const discount = subtotal > 5000 ? 500 : 0;

  return {
    subtotal,
    tax,
    discount,
    total: subtotal + tax - discount
  };
}
