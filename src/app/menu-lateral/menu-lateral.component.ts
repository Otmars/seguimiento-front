import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit{
@ViewChild('menu_side') menu_side: ElementRef
@ViewChild('btn_open') btn_open: ElementRef
// @ViewChild('menu_side') menu_side: ElementRef
getScreenWidth: any;
getScreenHeight: any;
@Input() menu :boolean;
@Output() newItemEvent = new EventEmitter<string>();
constructor(private renderer2 : Renderer2){
  

}
ngOnInit(){
  console.log("Iniciando");

  this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;
}
@HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }
@HostListener('window:resize', ['$event'])
button(){
  // console.log(this.btn_open.nativeElement);
  const button= this.btn_open.nativeElement
  this.renderer2.addClass(this.menu_side.nativeElement,'menu__side_move')
  // console.log(this.newItemEvent);
}
clickbutton(){
  this.newItemEvent.emit("click");
}
}

