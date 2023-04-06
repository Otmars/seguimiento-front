import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  saludo!: string;
  nombreusuario!: string;
  estadomenu!:boolean;
  menuLateral:boolean= true;
  ngOnInit() {
    this.mostrarSaludo();
  }

  


  mostrarSaludo() {
    var texto = '';
    var ahora = new Date();
    var hora = ahora.getHours();
    if (hora >= 6 && hora < 13) {
      texto = 'Buenos días, ';
    } else if (hora >= 13 && hora < 21) {
      texto = 'Buenas tardes, ';
    } else {
      texto = 'Buenas noches, ';
    }
    this.nombreusuario = this.getdatostoken().nombres.split(' ');
    this.nombreusuario = this.nombreusuario[0]
    this.saludo = texto ;
  }

  getdatostoken() {
    const token: any = localStorage.getItem('token');
    const tokendecode: any = decode(token);
    console.log(tokendecode);

    return tokendecode;
  }
  clickMenu(){
    var menu = this.menuLateral
    if (menu==false) this.menuLateral=true
    if (menu == true) this.menuLateral = false
  }
}
