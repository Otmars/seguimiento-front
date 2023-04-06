import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

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
  console.log(this.btn_open.nativeElement);
  const button= this.btn_open.nativeElement
  const menu = this.menu_side.nativeElement
  this.renderer2.addClass(menu,'menu__side_move')
  console.log(window.innerWidth);
  if (window.innerWidth) {
    
  }
  
}
}

