import { products } from "./products.js";
import { addToCart, getCart, removeFromCart, getTotal,updateQty } from "./cart.js";

const search = document.getElementById("search");
const filter = document.getElementById("filter");

function updateView() {
  let filtered = products;

  const query = search.value.toLowerCase();
  filtered = filtered.filter(p =>
    p.name.toLowerCase().includes(query)
  );

  
  if (filter.value !== "all") {
    filtered = filtered.filter(p => p.category === filter.value);
  }

  renderProducts(filtered);
}

search.addEventListener("input", updateView);
filter.addEventListener("change", updateView);

export function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = `<p class="empty-message">No products found.</p>`;
    return;
  }

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p>₹${p.price}</p>
      <button data-id="${p.id}">Add to Cart</button>
    `;

    div.addEventListener("click", e => {
      if (e.target.tagName === "BUTTON") {
        addToCart(p);
        renderCart();
      }
    });

    container.appendChild(div);
  });
}

export function renderCart() {
  const cartDiv = document.getElementById("cart");
  const cart = getCart();

  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = `<p class="empty-message">Cart is empty.</p>`;
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <h3 style="font-weight: bold;">${item.name}</h3>
      <p>₹${item.price} x ${item.qty}</p>
      <div class="cart-actions">
        <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
        <span>Qty: ${item.qty}</span>
        <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
        <button class="remove-btn" data-id="${item.id}"><i class="fa fa-trash"></i></button>
      </div>
    `;

    div.addEventListener("click", e => {
      const id = parseInt(e.target.dataset.id);

      if (e.target.classList.contains("remove-btn")) {
        removeFromCart(id);
        renderCart();
      } else if (e.target.dataset.action === "increase") {
        updateQty(id, +1);
        renderCart();
      } else if (e.target.dataset.action === "decrease") {
        updateQty(id, -1);
        renderCart();
      }
    });

    

    cartDiv.appendChild(div);
  });

  const totals = getTotal();

  const totalsDiv = document.createElement("div");
  totalsDiv.className = "totals";
  totalsDiv.innerHTML = `
    <p>Subtotal: ₹${totals.subtotal}</p>
    <p>Tax: ₹${totals.tax}</p>
    <p>Discount: ₹${totals.discount}</p>
    <h3 style="font-weight: bold;">Total: ₹${totals.total}</h3>
  `;

  cartDiv.appendChild(totalsDiv);
}


renderProducts(products);
renderCart();



