function initCarousel() {
  
  let buttonRight = document.querySelector(".carousel__arrow_right");
  let buttonLeft = document.querySelector(".carousel__arrow_left");
  buttonLeft.style.display = 'none';
  let offsetWRight = 0;
  let offsetWLeft = 0;
  let nCurrentSlide = 1;
  buttonRight.addEventListener("click", function () {

    let slide = document.querySelector(".carousel__inner");
    offsetWRight += slide.offsetWidth;
    offsetWLeft -= slide.offsetWidth;
    slide.style.transform = `translateX(-${offsetWRight}px)`;
    nCurrentSlide = nCurrentSlide + 1;

    if (nCurrentSlide === 1) {
      buttonLeft.style.display = 'none';
    } else {
      buttonLeft.style.display = '';
    }

    if (nCurrentSlide === 4) {
      buttonRight.style.display = 'none';
    } else {
      buttonRight.style.display = '';
    }

  });

  buttonLeft.addEventListener("click", function () {

    let slide = document.querySelector(".carousel__inner");
    offsetWRight -= slide.offsetWidth;
    offsetWLeft += slide.offsetWidth;
    slide.style.transform = `translateX(${offsetWLeft}px)`;
    nCurrentSlide = nCurrentSlide - 1;

    if (nCurrentSlide === 1) {
      buttonLeft.style.display = 'none';
    } else {
      buttonLeft.style.display = '';
    }

    if (nCurrentSlide === 4) {
      buttonRight.style.display = 'none';
    } else {
      buttonRight.style.display = '';
    }

  });
}
