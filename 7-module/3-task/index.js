export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.elem.innerHTML += this.render();
    this.elem.addEventListener('click', event => this.moveSlider(event));

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
      
      elemSpan.classList.add('slider__step-active');
      elemSpanActivity.classList.remove('slider__step-active');
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

}
