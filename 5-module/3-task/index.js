function initCarousel() {

  // ваш код...
  let carousel = document.querySelector('.carousel');
  let leftArrow = carousel.querySelector('.carousel__arrow_left');    
  let rightArrow = carousel.querySelector('.carousel__arrow_right'); 
  let inner = carousel.querySelector('.carousel__inner');
  let slideWidth = inner.offsetWidth;
  let position = 0;
  let slides = inner.children;
  let totalSlides = slides.length;  
  leftArrow.style.display = 'none';

  rightArrow.addEventListener('click', () => {
    position += slideWidth;
    inner.style.transform = `translateX(-${position}px)`;
    leftArrow.style.display = '';
    if (position >= slideWidth * (totalSlides - 1)) {
      rightArrow.style.display = 'none';
    }
  });
  leftArrow.addEventListener('click', () => {
    position -= slideWidth;
    inner.style.transform = `translateX(-${position}px)`;
    rightArrow.style.display = '';
    if (position <= 0) {
      leftArrow.style.display = 'none';
    }

  });


}
