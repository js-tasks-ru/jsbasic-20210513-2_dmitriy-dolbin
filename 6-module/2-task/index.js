import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.renderDiv('card');

    let elemCardTop = this.renderDiv('card__top');
    let elemImgCardTop = this.renderImg(`/assets/images/products/${this.product.image}`, 'product', 'card__image');
    let elemSpanCardTop = this.renderSpan('card__price', `€${this.product.price.toFixed(2)}`);
    
    elemCardTop.appendChild(elemImgCardTop);
    elemCardTop.appendChild(elemSpanCardTop);

    let elemCardBody = this.renderDiv('card__body');
    let elemCardBodyTitle = this.renderDiv('card__title', this.product["name"]);
    let elemCardBodyBtn = this.renderButton('card__button');
    let elemImgBtn = this.renderImg('/assets/images/icons/plus-icon.svg', 'icon');

    elemCardBodyBtn.addEventListener('click', (event) => this.onClick(event));

    elemCardBodyBtn.appendChild(elemImgBtn);
    elemCardBody.appendChild(elemCardBodyTitle);
    elemCardBody.appendChild(elemCardBodyBtn);

    this.elem.appendChild(elemCardTop);
    this.elem.appendChild(elemCardBody);
  }

  renderDiv(className, textValue) {
    let element = document.createElement('div');
    element.classList.add(className);
    if (textValue) {
      element.innerHTML = textValue;
    }
    return element;
  }

  renderImg(srcValue, altValue, className) {
    let imgElement = document.createElement('img');
    imgElement.src = srcValue;
    if (className) {
      imgElement.classList.add(className);
    }
    imgElement.alt = altValue;
    return imgElement;
  }

  renderSpan(className, textValue) {
    let spanElement = document.createElement('span');
    spanElement.classList.add(className);
    spanElement.innerHTML = textValue;
    return spanElement;
  }

  renderButton(className) {
    let btnElem = document.createElement('button');
    btnElem.classList.add(className);
    return btnElem;
  }

  onClick(event) {
    event.target.parentNode.dispatchEvent(new CustomEvent('product-add', {
      detail: this.product.id,
      bubbles: true
    }));
  }
}
