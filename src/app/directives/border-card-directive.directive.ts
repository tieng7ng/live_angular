import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBorderCardDirective]'
})
export class BorderCardDirectiveDirective {
  @Input('appBorderCardDirective') borderColor: string;


  constructor(private el: ElementRef) {
    this.setBorder('#f5f5f5');
    this.setHeight(180);
  }

  private setBorder(color: String) {
    let border = 'solid 4px ' + color;
    this.el.nativeElement.style.border = border;
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = height + 'px';
  }

  @HostListener('mouseenter') onmouseenter() { 
    this.setBorder(this.borderColor || '#009688');
  }

  @HostListener('mouseleave') onmouseleave() { 
    this.setBorder('#f5f5f5');
  }

}
