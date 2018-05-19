import {Component, Input} from "@angular/core";

/*
 Generated class for the BackDrop component.

 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
  selector: 'back-drop',
  templateUrl: 'back-drop.html'
})
export class BackDropComponent {

  text: string;
  @Input() state: boolean;
  @Input() tap;

  constructor() {
    console.log('Hello BackDrop Component');
    this.text = 'Hello World';
  }

  onBackDropClick() {
    console.log("backdrop clicked", this.tap);
    if (typeof this.tap == "function") {
      this.tap();
    }
  }
}
