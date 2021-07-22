import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');
    
    let btnLeft = this.renderBtn(['ribbon__arrow', 'ribbon__arrow_left']);
    btnLeft.addEventListener('click', (event) => this.onClickLeft(event));
    this.elem.appendChild(btnLeft);

    let navElem = document.createElement('nav');
    navElem.classList.add('ribbon__inner');
    for (let iCategory = 0; iCategory < this.categories.length; iCategory++) {
      let linkElem = document.createElement('a');
      if (iCategory === 0) {
        linkElem.innerHTML += this.renderLink('ribbon__item ribbon__item_active', this.categories[iCategory]["id"], this.categories[iCategory]["name"]);
      } else {
        linkElem.innerHTML += this.renderLink('ribbon__item', this.categories[iCategory]["id"], this.categories[iCategory]["name"]);
      }
      linkElem.addEventListener('click', (event) => this.onClickLink(event));
      navElem.appendChild(linkElem);
    }
    navElem.addEventListener('scroll', () => this.onScroll(this));
    this.elem.appendChild(navElem);

    let btnRight = this.renderBtn(['ribbon__arrow', 'ribbon__arrow_right', 'ribbon__arrow_visible']);
    btnRight.addEventListener('click', (event) => this.onClickRight(event));
    this.elem.appendChild(btnRight);
  }

  renderBtn(aClassList) {
    let btnElem = document.createElement('button');
    btnElem.innerHTML += `${this.renderImg('/assets/images/icons/angle-icon.svg', 'icon')}`;
    for (let iClass = 0; iClass < aClassList.length; iClass++) {
      btnElem.classList.add(aClassList[iClass]);
    }
    return btnElem;
  }

  renderImg(srcValue, altValue) {
    return `<img src=${srcValue} alt=${altValue}>`;
  }
 
  renderLink(classNameValue, idValue, nameValue) {
    return `<a href="#" class="${classNameValue}" data-id="${idValue}" id="${idValue}">"${nameValue}"</a>`;
  }

  onClickLeft(event) {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    ribbonInner.scrollBy(-350, 0);
  }

  onClickRight(event) {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    ribbonInner.scrollBy(350, 0);
  }
  
  onScroll() {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let scrollLeft = ribbonInner.scrollLeft;
    
    let btnLeft = this.elem.querySelector('.ribbon__arrow_left');
    if (scrollLeft === 0) {
      btnLeft.classList.toggle('ribbon__arrow_visible');
    } else {
      btnLeft.classList.toggle('ribbon__arrow_visible');
    }

    let btnRight = this.elem.querySelector('.ribbon__arrow_right');
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;

    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    if (scrollRight < 1) {
      btnRight.classList.remove('ribbon__arrow_visible');
    } else {
      btnRight.classList.add('ribbon__arrow_visible');
    }
  }

  onClickLink(event) {
    let link = this.elem.querySelector('.ribbon__item_active');
    let activeLink = event.target;
    event.preventDefault();

    link.classList.toggle('ribbon__item_active');
    activeLink.classList.toggle('ribbon__item_active');
    
    activeLink.dispatchEvent(new CustomEvent('ribbon-select', {
      detail: activeLink.id,
      bubbles: true
    }));
  }

}
