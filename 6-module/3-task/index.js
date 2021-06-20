import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.renderDiv(['carousel']);
    this.slideWRight = 0;
    this.slideWLeft = 0;
    this.slideNumber = 0;

    let classNameBthRight = ['carousel__arrow', 'carousel__arrow_right'];
    let classNameBtnLeft = ['carousel__arrow', 'carousel__arrow_left'];

    let btnRight = this.renderDiv(classNameBthRight);
    let btnImgRight = this.renderImg('/assets/images/icons/angle-icon.svg', 'icon');
    btnRight.appendChild(btnImgRight);

    btnRight.addEventListener('click', (event) => this.onClickRight(event));

    let btnLeft = this.renderDiv(classNameBtnLeft);
    let btnImgLeft = this.renderImg('/assets/images/icons/angle-left-icon.svg', 'icon');
    btnLeft.appendChild(btnImgLeft);
    btnLeft.style.display = 'none';
    btnLeft.addEventListener('click', (event) => this.onClickLeft(event));

    this.elem.appendChild(btnLeft);
    this.elem.appendChild(btnRight);

    let elemInner = this.renderDiv(['carousel__inner']);
    for (let iSlide = 0; iSlide < this.slides.length; iSlide++) {
      elemInner.appendChild(this.renderDivSlide(this.slides[iSlide]));
    }
    this.elem.appendChild(elemInner);
  }

  renderDivSlide(slide) {
    let elemSlide = this.renderDiv(['carousel__slide']);
    elemSlide.setAttribute('data-id', slide['id']);
    elemSlide.id = slide['id'];
    let elemImgSlide = this.renderImg(`/assets/images/carousel/${slide['image']}`, 'slide', 'carousel__img');
    elemSlide.appendChild(elemImgSlide);

    let elemCaption = this.renderDiv(['carousel__caption']);
    let elemCaptionSpan = this.renderSpan('carousel__price', `€${slide['price'].toFixed(2)}`);
    let elemTitle = this.renderDiv(['carousel__title'], slide['name']);
    let elemBtnCaption = this.renderButton('carousel__button');
    let elemImgBtnCaption = this.renderImg('/assets/images/icons/plus-icon.svg', 'icon');
    elemBtnCaption.addEventListener('click', (event) => this.onClickAdd(event));
    elemBtnCaption.appendChild(elemImgBtnCaption);
    elemCaption.appendChild(elemCaptionSpan);
    elemCaption.appendChild(elemTitle);
    elemCaption.appendChild(elemBtnCaption);
    elemSlide.appendChild(elemCaption);
    return elemSlide;
  }

  renderDiv(className, textValue) {
    let element = document.createElement('div');
    for (let iClass = 0; iClass < className.length; iClass++) {
      element.classList.toggle(className[iClass]);
    }
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

  onClickAdd(event) {
    let btn = event.target.parentNode;
    let slide = event.target.parentNode.parentNode.parentNode;
    btn.dispatchEvent(new CustomEvent('product-add', {
      detail: slide.id,
      bubbles: true
    }));
  }

  onClickRight(event) {
    let slide = this.elem.querySelector('.carousel__inner');
    this.slideWRight += slide.offsetWidth;
    this.slideWLeft -= slide.offsetWidth;
    slide.style.transform = `translateX(-${this.slideWRight}px)`;
    this.slideNumber++;
    if (this.slideNumber === this.slides.length - 1) {
      event.target.style.display = 'none';
    } else {
      event.target.style.display = '';
    }
    if (this.slideNumber > 0) {
      let btnLeft = this.elem.querySelector('.carousel__arrow_left');
      btnLeft.style.display = '';
    }
  }

  onClickLeft(event) {
    let slide = this.elem.querySelector('.carousel__inner');
    this.slideWRight -= slide.offsetWidth;
    this.slideWLeft += slide.offsetWidth;
    slide.style.transform = `translateX(${this.slideWLeft}px)`;
    this.slideNumber--;
    if (this.slideNumber === 0) {
      event.target.style.display = 'none';
    } else {
      event.target.style.display = '';
    }
    if (this.slideNumber < this.slides.length - 1) {
      let btnRight = this.elem.querySelector('.carousel__arrow_right');
      btnRight.style.display = '';
    }
  }
}
