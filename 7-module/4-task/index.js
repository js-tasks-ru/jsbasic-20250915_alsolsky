export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
    this.initEvents();  
    this.initDragEvents()
    this.updateSlider();

  }
  render() {
    const slider = document.createElement('div');
    slider.className = 'slider';  
    slider.innerHTML = `
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">0</span>
      </div>
      <div class="slider__progress" style="width: 0%;"></div>
      <div class="slider__steps">
        ${'<span></span>'.repeat(this.steps)}
      </div>
    `;
    return slider;  
  }
  initEvents() {
    this.elem.addEventListener('click', (event) => {
      const rect = this.elem.getBoundingClientRect(); 
      const clickX = event.clientX - rect.left;
      const relativeClickX = clickX / rect.width;
      const segments = this.steps - 1;  
      const newValue = Math.round(relativeClickX * segments); 
      this.value = newValue;
      this.updateSlider();  
      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }));
    });
  }
  initDragEvents() {
    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.elem.classList.add('slider_dragging'); 
      const onPointerMove = (event) => {
        const rect = this.elem.getBoundingClientRect();
        let pointerX = event.clientX - rect.left; 
        if (pointerX < 0) pointerX = 0;
        if (pointerX > rect.width) pointerX = rect.width; 
        const relativeX = pointerX / rect.width;  
        const segments = this.steps - 1;
        //const newValue = Math.round(relativeX * segments); 
        const newValue = (relativeX * segments);

        this.value = newValue;
        this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }))
        this.updateSlider(); 
      };
      const onPointerUp = () => {
        this.elem.classList.remove('slider_dragging'); 
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
        this.value = Math.round(this.value);
        this.updateSlider();
        this.elem.dispatchEvent(new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        }));
      };
      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    });
  }

  updateSlider() {
    const percentage = (this.value / (this.steps - 1)) * 100;
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const valueDisplay = this.elem.querySelector('.slider__value');
    const stepsSpans = this.elem.querySelectorAll('.slider__steps span');
    thumb.style.left = `${percentage}%`;
    progress.style.width = `${percentage}%`;
    valueDisplay.textContent = Math.round(this.value);
    stepsSpans.forEach((span, index) => {
      span.classList.toggle('slider__step-active', index === this.value);
    });
  } 

 
}
