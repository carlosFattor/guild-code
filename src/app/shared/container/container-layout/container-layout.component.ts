import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'gc-container-layout',
  templateUrl: './container-layout.component.html',
  styleUrls: ['./container-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerLayoutComponent {

  style = 'dark';
  constructor() { }

  changeStyle(style: string): void {
    this.style = style;
  }

}
