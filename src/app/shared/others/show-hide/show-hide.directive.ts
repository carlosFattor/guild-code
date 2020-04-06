import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[gcShowHide]'
})
export class ShowHideDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
  }

  @HostListener('mouseover') onMouseOver(): void {
    debugger;
    this.showHideElement(true);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    debugger;
    this.showHideElement(false);
  }

  showHideElement(show: boolean): void {
    if (show) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}
