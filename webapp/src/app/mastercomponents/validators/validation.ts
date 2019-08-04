import {Component, Input} from '@angular/core';
import { Globals } from '../../globals/global';

@Component({
  selector: 'validation',
  template: `
    <div class="validation">
      <div *ngFor="let message of messages">{{globals.switchLanguageValue && globals.switchLanguageValue[message] ? globals.switchLanguageValue[message] : message}}</div>
    </div>
  `,
  styles: [`
    .validation {
      color: red;
      margin: 12px;
	  display: block;
    }`
  ]
})
export class ValidationComponent {
  @Input() messages: Array<string>;
  constructor(private globals: Globals){
  }
}