import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[selected]'
})
export class ActiveCompanyDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }
  private isSeleceted = false;
  @HostListener('click', ['$event.target'])
  onClick(btn) {
    if (this.isSeleceted) {
      this.renderer.removeClass(this.el.nativeElement, "selected");
      this.isSeleceted = false;
    } else {
      this.renderer.addClass(this.el.nativeElement, "selected");
      this.isSeleceted = true;
    }
  }
}
