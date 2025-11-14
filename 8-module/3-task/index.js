export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
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
    // ваш код
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
    // ваш код
    return this.cartItems.length === 0;



  }


  getTotalCount() {
    // ваш код
    return this.cartItems.reduce((total, item) => total + item.count, 0);


  }

  getTotalPrice() {
    // ваш код
    return this.cartItems.reduce((total, item) => total + item.product.price * item.count, 0);

  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

