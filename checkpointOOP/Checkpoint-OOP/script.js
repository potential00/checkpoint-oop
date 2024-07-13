document.addEventListener('DOMContentLoaded', function() {
  class ShoppingCart {
    constructor() {
      this.likeBtns = document.querySelectorAll('.fa-heart1');
      this.addToCartBtns = document.querySelectorAll('.button');
      this.totalPriceElement = document.getElementById('totalp');
      this.cartItemsContainer = document.querySelector('.items');

      this.init();
    }

    init() {
      this.addLikeBtnEventListeners();
      this.addAddToCartEventListeners();
    }

    addLikeBtnEventListeners() {
      this.likeBtns.forEach(btn => {
        btn.addEventListener('click', this.toggleLike);
      });
    }

    toggleLike(event) {
      const btn = event.target;
      btn.classList.toggle('liked');
      btn.classList.toggle('fa-regular');
      btn.classList.toggle('fa-solid');
    }

    addAddToCartEventListeners() {
      this.addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (event) => this.addToCart(event));
      });
    }

    addToCart(event) {
      const btn = event.target;
      const card = btn.closest('.card1');
      const itemName = card.querySelector('.cart-title').textContent;
      const itemPrice = card.querySelector('.cart-price').textContent;

      const cartItem = document.createElement('div');
      cartItem.classList.add('items1');
      cartItem.innerHTML = `
        <div class="values1">
          <div style="display: flex; align-items: center">
            <img src="${card.querySelector('.cart-img').src}" alt="${itemName}" width="150" />
            <p style="margin-left: 20px">${itemName}</p>
          </div>
          <p class="price">${itemPrice}</p>
          <div class="quantity1">
            <button class="minus">-</button>
            <input type="number" value="1" min="1">
            <button class="plus">+</button>
            <button class="remove">remove</button>
          </div>
        </div>
      `;

      this.cartItemsContainer.appendChild(cartItem);
      this.updateTotalPrice();

      cartItem.querySelector('.remove').addEventListener('click', () => {
        cartItem.remove();
        this.updateTotalPrice();
      });

      cartItem.querySelector('.minus').addEventListener('click', () => {
        const quantityInput = cartItem.querySelector('input');
        if (quantityInput.value > 1) {
          quantityInput.value--;
          this.updateTotalPrice();
        }
      });

      cartItem.querySelector('.plus').addEventListener('click', () => {
        const quantityInput = cartItem.querySelector('input');
        quantityInput.value++;
        this.updateTotalPrice();
      });

      cartItem.querySelector('input').addEventListener('change', () => {
        if (cartItem.querySelector('input').value < 1) {
          cartItem.querySelector('input').value = 1;
        }
        this.updateTotalPrice();
      });
    }

    updateTotalPrice() {
      let totalPrice = 0;
      document.querySelectorAll('.items1').forEach(item => {
        const quantity = parseInt(item.querySelector('input').value);
        const price = parseFloat(item.querySelector('.price').textContent.slice(1)); // Remove $ sign
        totalPrice += quantity * price;
      });
      this.totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
  }

  new ShoppingCart();
});
