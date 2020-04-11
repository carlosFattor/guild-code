import { Component } from '@angular/core';
import { environment } from '@environment';

@Component({
  selector: 'gc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'guild-code';

  constructor() {
    console.log({ env: environment });
  }

}
