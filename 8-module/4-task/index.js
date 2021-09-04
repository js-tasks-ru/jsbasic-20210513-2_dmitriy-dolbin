import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    function createCard(productItem) {

      const card = {};
      card["product"] = productItem;
      card["count"] = 1;
      return card;

    }

    if (product) {

      const aProducts = new Array();
      const nCntCard = this.cartItems.length;
      for (let iCard = 0; iCard < nCntCard; iCard++) {
        aProducts.push(this.cartItems[iCard]["product"]["id"]);
      }

      const nIndex = aProducts.indexOf(product["id"]);
      if (nIndex > -1) {
        
        this.cartItems[nIndex]["count"]++;
        this.onProductUpdate(this.cartItems[nIndex]);

      } else {
        
        const productCard = createCard(product);
        this.cartItems.push(productCard);
        this.onProductUpdate(this.cartItems[this.cartItems.length - 1]);

      }

    }

  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if (!this.isEmpty()) {

      for (let iCard = 0; iCard < this.cartItems.length; iCard++) {
        
        if (this.cartItems[iCard]["product"]["id"] === productId) {
          this.cartItems[iCard]["count"] += amount;
          this.onProductUpdate(this.cartItems[iCard]);
        }

        if (this.cartItems[iCard]["count"] === 0) {
          this.cartItems.splice(iCard, 1);
        }

      }

    }

  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if (this.cartItems.length > 0) {
      return false;
    }
    return true;
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    const nCntCard = this.cartItems.length;
    let nTotalCnt = 0;
    for (let iCard = 0; iCard < nCntCard; iCard++) {
      nTotalCnt = nTotalCnt + this.cartItems[iCard]["count"];
    }
    return nTotalCnt;

  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    const nCntCard = this.cartItems.length;
    let nTotalPrice = 0;
    for (let iCard = 0; iCard < nCntCard; iCard++) {
      nTotalPrice = nTotalPrice + (this.cartItems[iCard]["count"] * this.cartItems[iCard]["product"]["price"]);
    }
    return nTotalPrice;

  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  onClickBtn(event, amount) {
    const productId = event.target.closest('div').parentNode.parentNode.parentNode.getAttribute("data-product-id");
    this.updateProductCount(productId, amount);
  }

  renderModal() {
    // ...ваш код
    const modal = new Modal();
    modal.setTitle("Your order");
    
    const nCntCard = this.cartItems.length;
    for (let iCard = 0; iCard < nCntCard; iCard++) {
      modal.setBody(this.renderProduct(this.cartItems[iCard]["product"], this.cartItems[iCard]["count"]));
    }
    
    if (!document.body.classList.contains('is-modal-open')) {
      
      modal.open();

      const elemBtn = document.querySelectorAll('.cart-counter__button');
      const nCntBtn = elemBtn.length;
      for (let iBtn = 0; iBtn < nCntBtn; iBtn++) {
      
        if (elemBtn[iBtn].classList.contains('cart-counter__button_minus')) {
          elemBtn[iBtn].onclick = () => this.onClickBtn(event, -1);
        } else {
          elemBtn[iBtn].onclick = () => this.onClickBtn(event, 1);
        }
      
      }

    }

    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = modalTitle.textContent.trim();

    const modalBody = document.querySelector('.modal__body');
    const formDataDelivery = this.renderOrderForm();
    formDataDelivery["id"] = "form";
    formDataDelivery.onsubmit = () => this.onSubmit(event);
    modalBody.appendChild(formDataDelivery);

  }

  onProductUpdate(cartItem) {
    // ...ваш код
    this.cartIcon.update(this);
    if (document.body.classList.contains('is-modal-open')) {
      
      const productId = cartItem["product"]["id"];
      const productCount = document.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      const productPrice = document.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      const infoPrice = document.querySelector(`.cart-buttons__info-price`);

      if (cartItem["count"] > 0) {
      
        productCount.innerHTML = cartItem["count"];
        productPrice.innerHTML = `€${(cartItem["count"] * cartItem["product"]["price"]).toFixed(2)}`;
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      } else {

        const productDiv = document.querySelector(`[data-product-id="${productId}"]`);
        productDiv.parentNode.removeChild(productDiv);
        if (this.cartItems.length === 1) {
          
          const modalDiv = document.querySelector('.modal');
          modalDiv.parentNode.removeChild(modalDiv);
          document.body.classList.toggle('is-modal-open');

        }

      }

    }

  }

  async fetchPost(postData) {
    
    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: postData
    });

    if (response.ok) {
      return true;
    }
    return false;

  }

  onSubmit(event) {
    // ...ваш код
    event.preventDefault();
    const btnOrder = document.querySelector('.btn-group__button');
    btnOrder.classList.toggle('is-loading');

    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = 'Success!';

    const formData = document.getElementById('form');
    const formDataPost = new FormData();
    formDataPost.set("name", formData.querySelector('[name="name"]')["value"]);
    formDataPost.set("email", formData.querySelector('[name="email"]')["value"]);
    formDataPost.set("tel", formData.querySelector('[name="tel"]')["value"]);
    formDataPost.set("address", formData.querySelector('[name="address"]')["value"]);

    if (this.fetchPost(formDataPost)) {
      this.cartItems = [];
      const modalBody = document.querySelector('.modal__body');
      modalBody.innerHTML = `
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
      `;
    }

  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

