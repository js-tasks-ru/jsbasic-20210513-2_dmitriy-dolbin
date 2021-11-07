export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
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
    // ваш код
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
    // ваш код
    if (this.cartItems.length > 0) {
      return false;
    }
    return true;
  }

  getTotalCount() {
    // ваш код
    const nCntCard = this.cartItems.length;
    let nTotalCnt = 0;
    for (let iCard = 0; iCard < nCntCard; iCard++) {
      nTotalCnt = nTotalCnt + this.cartItems[iCard]["count"];
    }
    return nTotalCnt;
  }

  getTotalPrice() {
    // ваш код
    const nCntCard = this.cartItems.length;
    let nTotalPrice = 0;
    for (let iCard = 0; iCard < nCntCard; iCard++) {
      nTotalPrice = nTotalPrice + (this.cartItems[iCard]["count"] * this.cartItems[iCard]["product"]["price"]);
    }
    return nTotalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    
    this.cartIcon.update(this);
  }
}

