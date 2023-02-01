import { Component } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  displayBasic2!: boolean;
  showBasicDialog2() {
    this.displayBasic2 = true;
}
}
