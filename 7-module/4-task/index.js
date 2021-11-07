export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.elem.innerHTML += this.render();
    this.elem.addEventListener('click', event => this.moveSlider(event));

    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.addEventListener('pointerdown', event => this.moveSliderPointerDown(event));
    thumb.addEventListener('pointerup', event => this.moveSliderPointerDown(event));
    thumb.ondragstart = () => false;
  }

  render() {
    return `<div class="slider__thumb">
              <span class="slider__value">${this.value}</span>
            </div>
            
            <div class="slider__progress" style="width: 0%;"></div>
            <div class="slider__steps">
            ${this.renderSpan()}
            </div>`;
  }

  renderSpan() {
    let elemSpans = '';
    for (let i = 0; i < this.steps; i++) {
      if (i === 0) {
        elemSpans += `<span id=${i} class="slider__step-active"></span>`;
      } else {
        elemSpans += `<span id=${i}></span>`;
      }
    }
    return elemSpans;
  }

  moveSlider(event) {
    
    let elemSpanActivity = this.elem.querySelector('.slider__step-active');
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');
    
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
  
    let widthStep = 1 / (this.steps - 1);
    let stepNumber = (leftRelative / widthStep).toFixed();
    let elemSpan = event.target.closest('span');
    
    if (!elemSpan) {
      elemSpan = document.getElementById(stepNumber);
    }

    if (elemSpan) {
      
      elemSpan.classList.toggle('slider__step-active');
      elemSpanActivity.classList.toggle('slider__step-active');
      sliderValue.innerHTML = Number(elemSpan.id);
      this.value = Number(elemSpan.id);
      
      let leftPercents = (100 / (this.steps - 1)) * Number(elemSpan.id);
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

    }

    let slider = event.target.closest('.slider');
    slider.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));

  }

  moveSliderPointerDown(event) {
    
    let thumb = event.target.closest('.slider__thumb');
    let slider = event.target.closest('.slider');
    slider.classList.toggle('slider_dragging');
    thumb.addEventListener('pointermove', event => this.moveSliderPointerMove(event));
    slider.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));

  }

  moveSliderPointerMove(event) {
  
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');

    let leftPercents = leftRelative * 100;
    let newValue = ((leftPercents / 100) * (this.steps - 1)).toFixed();
    
    let elemSpan = document.getElementById(newValue);
    sliderValue.innerHTML = Number(elemSpan.id);
    this.value = Number(elemSpan.id);

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    let slider = event.target.closest('.slider');
    slider.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));

  }

  moveSliderPoinerUp(event) {

    let slider = event.target.closest('.slider');
    slider.classList.toggle('slider_dragging');

  }

}
