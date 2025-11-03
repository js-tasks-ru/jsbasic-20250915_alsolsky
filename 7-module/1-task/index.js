import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.initEventListeners();
      
  }
 
  render() {
    this.elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button> 
        <nav class="ribbon__inner">
          ${this.categories.map(category => `
            <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>    
          `).join('')}
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `); 
  }

  initEventListeners() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const leftArrow = this.elem.querySelector('.ribbon__arrow_left');
    const rightArrow = this.elem.querySelector('.ribbon__arrow_right'); 
    rightArrow.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    leftArrow.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    }); 
    ribbonInner.addEventListener('scroll', () => {
      const scrollLeft = ribbonInner.scrollLeft;
      const scrollWidth = ribbonInner.scrollWidth;
      const clientWidth = ribbonInner.clientWidth;
      const scrollRight = scrollWidth - scrollLeft - clientWidth; 
      if (scrollLeft === 0) {
        leftArrow.classList.remove('ribbon__arrow_visible');
      } else {
        leftArrow.classList.add('ribbon__arrow_visible');
      } 
      if (scrollRight < 1) {
        rightArrow.classList.remove('ribbon__arrow_visible');
      } else {
        rightArrow.classList.add('ribbon__arrow_visible');
      } 
    }); 
    const ribbonItems = this.elem.querySelectorAll('.ribbon__item');  
    ribbonItems.forEach(item => {
      item.addEventListener('click', (event) => {
        event.preventDefault(); 
        item.classList.add('ribbon__item_active'); 
        const ribbonSelectEvent = new CustomEvent('ribbon-select', {
          detail: item.dataset.id,
          bubbles: true
        });
        this.elem.dispatchEvent(ribbonSelectEvent);
      }); 

    });

  } 
    
}
