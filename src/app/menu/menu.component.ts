import { Component } from '@angular/core';
import { JsService } from '../service/js.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {


  value3!: string;
  activo!:any
  constructor(private jsservice: JsService){
    this.jsservice.loadScript()
  }
  aqui(){
    
  }
}
