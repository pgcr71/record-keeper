import { Directive, HostListener, ElementRef, HostBinding, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooptipDirective {
  height;
  left;
  top;
  bottom;
  right;
  cls = {
    width: '5px,',
    height: '10px',
    border: '5px solid red',
    position: 'absolute',
    top: this.top,
    left: this.left
  }

  @HostListener('mouseover') onmouseover() {
    this.getBoundingClientRect();
    let elem = this.renderer.createElement('div') as HTMLElement;
    elem.id = 'tooltip';
    elem.style.position = 'absolute';
    elem.style.border = '5px solid red';
    let h = 200;
    elem.style.height = h + 'px';
    elem.style.top = (-h) + this.top + 'px';
    elem.style.left = this.left;
    elem.style.width = '100px';

    let nativeEl = this.el.nativeElement as HTMLElement;
    nativeEl.insertAdjacentElement('afterbegin', elem);
    console.log(elem.getBoundingClientRect())
  };

  @HostListener('mouseout') onMouseOut() {
    (this.el.nativeElement as HTMLElement).querySelector('#tooltip').remove();
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  getBoundingClientRect() {
    var rect = this.el.nativeElement.getBoundingClientRect();
    this.left = rect.left + window.scrollY;
    this.top = rect.top + window.scrollX;
    return {
      top: this.top,
      left:this.left
    }
  }
}
