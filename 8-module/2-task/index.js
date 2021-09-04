import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.productFilter = [];
    
    this.elem = document.createElement('div');
    this.render();
    
  }

  render() {

    this.elem.classList.toggle('products-grid');
    
    const childElem = document.createElement('div');
    childElem.classList.toggle('products-grid__inner');
    this.renderCard(childElem);

    this.elem.appendChild(childElem);

  }

  renderCard(childElem) {

    let productCards = new Array();
    
    if (this.productFilter.length > 0 || Object.keys(this.filters).length > 0) {
      productCards = this.productFilter;
    } else {
      productCards = this.products;
    }

    const nCntProduct = productCards.length;
    for (let iProduct = 0; iProduct < nCntProduct; iProduct++) {
      
      const elemCard = new ProductCard(productCards[iProduct]);
      childElem.appendChild(elemCard.elem);
      
    }

  }

  showProductNoNuts(products) {

    const nCntProduct = products.length;
    const newProductNoNuts = new Array();

    for (let iProduct = 0; iProduct < nCntProduct; iProduct++) {
      
      if (products[iProduct]["nuts"] === false || !("nuts" in products[iProduct])) {
        newProductNoNuts.push(products[iProduct]);
      }

    }
    return newProductNoNuts;

  }

  showProductVegeterian(products) {

    const nCntProduct = products.length;
    const newProductVegetarian = new Array();

    for (let iProduct = 0; iProduct < nCntProduct; iProduct++) {
      
      if (products[iProduct]["vegeterian"] === true) {
        newProductVegetarian.push(products[iProduct]);
      }

    }
    return newProductVegetarian;

  }

  showProductMaxSpiciness(products, maxSpiciness) {
    
    const nCntProduct = products.length;
    const newProductMaxSpiciness = new Array();
    
    for (let iProduct = 0; iProduct < nCntProduct; iProduct++) {
      
      if (Number(products[iProduct]["spiciness"]) <= Number(maxSpiciness)) {
        newProductMaxSpiciness.push(products[iProduct]);
      }

    }
    return newProductMaxSpiciness;

  }
  
  showProductCategory(products, category) {
    
    const nCntProduct = products.length;
    const newProductCategory = new Array();

    for (let iProduct = 0; iProduct < nCntProduct; iProduct++) {
      
      if (products[iProduct]["category"] === category) {
        newProductCategory.push(products[iProduct]);
      }

    }
    return newProductCategory;

  }

  applyFilter() {

    this.productFilter = this.products;
    if (this.filters["noNuts"] === true) {
      this.productFilter = this.showProductNoNuts(this.productFilter);
    }
    if (this.filters["vegeterianOnly"] === true) {
      this.productFilter = this.showProductVegeterian(this.productFilter);
    }

    if (this.filters["maxSpiciness"]) {
      this.productFilter = this.showProductMaxSpiciness(this.productFilter, this.filters["maxSpiciness"]);
    }

    if (this.filters["category"]) {
      this.productFilter = this.showProductCategory(this.productFilter, this.filters["category"]);
    }

  }

  removeCards() {

    let cards = this.elem.querySelectorAll('.card');
    const nCntCards = cards.length;
    for (let iCard = 0; iCard < nCntCards; iCard++) {
      cards[iCard].remove();
    }

  }

  updateFilter(filters) {

    if (Object.keys(filters).length === 1) {
      
      const nameFilter = Object.keys(filters)[0];
      if (!(nameFilter in this.filters) || this.filters[nameFilter] !== filters[nameFilter]) {
        this.filters[nameFilter] = filters[nameFilter];
      }

    }
    this.removeCards();
    this.applyFilter();

    const childElem = document.querySelector('.products-grid__inner');
    this.renderCard(childElem);
    this.productFilter = [];
    
  }

}
