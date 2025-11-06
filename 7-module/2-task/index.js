import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
   this.render() 
   this.event


} 
render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>  
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">×</button>
            <h3 class="modal__title"></h3>
          </div>  
          <div class="modal__body"></div>
        </div>
      </div>
    `); 
    this.elem.querySelector('.modal__close').addEventListener('click', () => this.close());
      
  this.overlay = this.elem.querySelector('.modal__overlay');
  this.overlay.addEventListener('click', () => this.close()); 

      
}
  setTitle(title) {
    this.elem.querySelector('.modal__title').innerHTML = (`<h3 class="modal__title">
            Я главное модальное окно
          </h3>
        `); 
  }
   setBody(body) {
    const bodyContainer = this.elem.querySelector('.modal__body');
    bodyContainer.innerHTML = ''; 
    bodyContainer.appendChild(body); 
  } 
  open() {
    document.body.appendChild(this.elem); 
    document.body.classList.add('is-modal-open'); 
    document.body.addEventListener('keydown', () => {if(event.code === 'Escape') this.close()}) 
      
    
    }
  

 
  close() {
    this.elem.remove(); 
    document.body.classList.remove('is-modal-open'); 
   
  } 


  } 
   
 




