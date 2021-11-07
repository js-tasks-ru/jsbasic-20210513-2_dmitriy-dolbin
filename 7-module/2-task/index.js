import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.innerHTML = this.render();
  }

  render() {
    return `
    <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
        </div>

      </div>
    </div>
    `;
  }

  setTitle(sTitleText) {
    let modalHeader = this.modal.querySelector('.modal__header');
    modalHeader.innerHTML += `
      <h3 class="modal__title">
        ${sTitleText}
      </h3>
    `;
  }

  setBody(elem) {
    let elemBody = document.createElement('div');
    elemBody.className = 'modal__body';
    elemBody.appendChild(elem);
    let modalInner = this.modal.querySelector('.modal__inner');
    modalInner.appendChild(elemBody);
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.modal);

    let elemBtnClose = this.modal.querySelector('.modal__close');
    
    elemBtnClose.addEventListener('click', (event) => this.close(event));

    document.addEventListener('keydown', (event) => this.close(event));
  }

  close(event) {
    if (event) {
      if (event.code === 'Escape' || event.type === 'click') {
        document.body.classList.remove('is-modal-open');
        this.modal.innerHTML = "";
        this.modal.className = "";
      }
    } else if (!event) {
      document.body.classList.remove('is-modal-open');
      this.modal.innerHTML = "";
      this.modal.className = "";
    }
  }
}