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
    if (!product) {
      return;
    } 
    
    let existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.count += 1;
    } else {
      this.cartItems.push({ product: product, count: 1 });
    }


    this.onProductUpdate(existingItem  || this.cartItems[this.cartItems.length - 1] );  

  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      item.count += amount;
      if (item.count <= 0) {
        this.cartItems = this.cartItems.filter(i => i.product.id !== productId);
      }
      this.onProductUpdate(item);
    } 
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.reduce((total, item) => total + item.product.price * item.count, 0);
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

  renderModal() {
    // ...ваш код
    this.modal = new Modal();
   
    this.modal.setTitle('Your order');  
    const modalBody = createElement('<div></div>');

    this.cartItems.forEach(({ product, count }) => {
      const productElem = this.renderProduct(product, count);
      modalBody.appendChild(productElem);
    }); 
    const orderForm = this.renderOrderForm();
    modalBody.appendChild(orderForm); 
    this.modal.setBody(modalBody);

    this.modal.open();  
    modalBody.querySelector('.cart-form').addEventListener('submit', this.onSubmit.bind(this));

    modalBody.addEventListener('click', (event) => {
      const button = event.target.closest('.cart-counter__button');
      if (!button) {
        return;
      } 
      const productElem = button.closest('.cart-product');
      const productId = productElem.dataset.productId;  
      if (button.classList.contains('cart-counter__button_plus')) {
        this.updateProductCount(productId, 1);
      } else if (button.classList.contains('cart-counter__button_minus')) {
        this.updateProductCount(productId, -1);
      } 
    });
  }

  onProductUpdate(cartItem) {
    // ...ваш код
   this.cartIcon.update(this);
    if (!document.body.classList.contains('is-modal-open')) {
      return;
    } 
    const modalBody = this.modal.elem.querySelector('.modal__body');

    if (this.isEmpty()) {
      this.modal.close();
      return;
    } 
    const productId = cartItem.product.id;
    const productElem = modalBody.querySelector(`[data-product-id="${productId}"]`);  
    if (cartItem.count === 0) {
      productElem.remove();
    } else {
      const countElem = productElem.querySelector('.cart-counter__count');
      countElem.textContent = cartItem.count;  
      const priceElem = productElem.querySelector('.cart-product__price');
      priceElem.textContent = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
    } 
    const infoPriceElem = modalBody.querySelector('.cart-buttons__info-price');
    infoPriceElem.textContent = `€${this.getTotalPrice().toFixed(2)}`;

  }

  



  onSubmit(event) {
    // ...ваш код
  event.preventDefault();

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.classList.add('is-loading');
    const formData = new FormData(form);

    fetch('https://httpbin.org/post', { 
      method: 'POST',
      body: formData
    })  
    .then(response => response.json())
    .then(data => {
      

      this.modal.setTitle('Success!');  
      //console.log('Success:', data);
      this.cartItems = [];
      this.modal.setBody(createElement(`
        <div class="modal__body-inner">
          <p>Your order is accepted. We will contact you soon.</p>
        </div>
      `));
      this.cartIcon.update(this);
    })
    .catch(error => {
      console.error('Error:', error);
    }); 
    this.modal.elem.querySelector('button[type="submit"]').classList.remove('is-loading');
   
  };
  
  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

