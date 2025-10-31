import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
   this.render();  }

  render() {
    this.elem = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>    
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>  
      <div class="carousel__inner">
        ${this.slides.map(slide => `
          <div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>    
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    `);   
    this.initCarousel();  
  }

  initCarousel() {
    const carouselInner = this.elem.querySelector('.carousel__inner');
    const slides = this.elem.querySelectorAll('.carousel__slide');
    const btnLeft = this.elem.querySelector('.carousel__arrow_left');
    const btnRight = this.elem.querySelector('.carousel__arrow_right');
    let currentIndex = 0; 
    const updateCarousel = () => {
      const offset = -currentIndex * carouselInner.offsetWidth;
      carouselInner.style.transform = `translateX(${offset}px)`;
      btnLeft.style.display = currentIndex === 0 ? 'none' : '';
      btnRight.style.display = currentIndex === slides.length - 1 ? 'none' : '';
    };

    btnLeft.style.display = 'none';   
    btnRight.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateCarousel();
      } 
    });

    btnLeft.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      } 
    });     

    this.elem.addEventListener('click', (event) => {
      const button = event.target.closest('.carousel__button');   
      if (button) {
        const slide = button.closest('.carousel__slide');
        const slideId = slide.dataset.id;        
        const customEvent = new CustomEvent('product-add', {
          detail: slideId,
          bubbles: true
        });
        this.elem.dispatchEvent(customEvent);
      } 
    }); 

    updateCarousel(); 



    
  }
 

    

  }

