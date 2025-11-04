


export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
    this.initEvents();

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
  updateSlider() {
    const percentage = (this.value / (this.steps - 1)) * 100;
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const valueDisplay = this.elem.querySelector('.slider__value');
    const stepsSpans = this.elem.querySelectorAll('.slider__steps span');
    thumb.style.left = `${percentage}%`;
    progress.style.width = `${percentage}%`;
    valueDisplay.textContent = this.value;  
    stepsSpans.forEach((span, index) => {
      span.classList.toggle('slider__step-active', index === this.value);
    });
  }
}

