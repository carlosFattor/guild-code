import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'gc-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipsComponent {

  @Input() icon: string | null = null;
  @Input() tag: string | null = null;
  @Output() closeTag = new EventEmitter();

  removeTag(): void {
    this.closeTag.emit(this.tag);
  }

}
