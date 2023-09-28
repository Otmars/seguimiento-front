import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import decode from 'jwt-decode';
import { HomeService } from './home.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  modalCompetencias: boolean;
  dataCompetencias: any
modalReportes: boolean;
changepasswordModal: boolean ;
oldpass: string;
newpass: string;
  showCompentecias() {
    this.modalCompetencias = true;
    this.homeService.cargarCompetenciaEstudiantes(this.iduser).subscribe(res=>{
     
      this.dataCompetencias=res
    })
  }
  cargarCalificaciones() {
    this.homeService
      .cargarCalificacionesEstudiante(this.iduser)
      .subscribe((res) => {
        this.calificacionesEstudiante = res;
      });
    this.modalAsignatura = true;
  }
  clear(table: Table) {
    table.clear();
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
  constructor(private homeService: HomeService,private router:Router) {}
  perfilModal: boolean;
  showmodalOtros() {}
  showModalPerfil() {
    this.perfilModal = true;
    console.log(this.materiasUser);
  }
  calificacionesEstudiante: any;
  materiasUser: string[] = [];
  modalAsignatura: boolean = false;
  saludo!: string;
  nombreusuario!: string;
  estadomenu!: boolean;
  menuLateral: boolean = true;
  roluser: string;
  iduser: any;
  user: any;
  ngOnInit() {
    this.roluser = this.rol();
    this.mostrarSaludo();
    console.log(this.roluser);
    this.iduser = this.getdatostoken().id;
    console.log(this.iduser);
    this.user = this.getdatostoken();

    this.homeService.getMateriasInscritas(this.iduser).subscribe((res: any) => {
      this.materiasUser=res[0].inscripcion

      // for (let i = 0; i < res[0].inscripcion.length; i++) {
      //   console.log(res[0].inscripcion[i].asignatura.nombre);
      //   this.materiasUser.push(res[0].inscripcion[i].asignatura.nombre);
      // }
    });
    this.homeService.getMateriasInscritas(this.iduser).subscribe((res:any)=>{
      this.materiasInscritasEstudiante = res[0].inscripcion
      // console.log(res[0].inscripcion);

    })
  }

  getiddocenteEstudiante() {
    if (this.roluser == 'docente') {
    }
  }

  rol() {
    const token: any = localStorage.getItem('token');
    const tokendecode: any = decode(token);
    console.log(tokendecode.rol);
    return tokendecode.rol;
  }
  nuevo(event: any) {
    this.menuLateral = true;
  }
  mostrarSaludo() {
    var texto = '';
    var ahora = new Date();
    var hora = ahora.getHours();
    if (hora >= 6 && hora < 12) {
      texto = 'Buenos días, ';
    } else if (hora >= 12 && hora < 18) {
      texto = 'Buenas tardes, ';
    } else {
      texto = 'Buenas noches, ';
    }
    this.nombreusuario = this.getdatostoken().nombres.split(' ');
    this.nombreusuario = this.nombreusuario[0];
    this.saludo = texto;
    console.log(ahora);
  }

  getdatostoken() {
    const token: any = localStorage.getItem('token');
    const tokendecode: any = decode(token);
    return tokendecode;
  }
  clickMenu() {
    var menu = this.menuLateral;
    if (menu == false) this.menuLateral = true;
    if (menu == true) this.menuLateral = false;
  }
  cerrarSesion() {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
    }

    changePass(){
      this.homeService.cambiarContraseña({
        id: this.iduser,
        password: this.oldpass,
        newpassword:this.newpass
      }).subscribe(res=>{
        console.log(res);
        
      })
      this.changepasswordModal=false
    }

  randomimage(){
    const imagenes= ['../../assets/images/doctors-animate.svg']
    console.log(imagenes[0]);
    
    return imagenes[0].toString()
  }
  modalAsignaturas:boolean = false
  materiasInscritasEstudiante= []
  showAsignaturas(){
    this.modalAsignaturas =true
    
  }
  datosAsignatura(dato: any){
    return dato.asignatura
  }
  getnombreCompleto(dato:any){
    if (dato == null) {
      return "No hay docente Designado"
    }
    return dato.iduser.nombres+" "+dato.iduser.apellidoPaterno+" "+dato.iduser.apellidoMaterno
  }
  getDato(dato:any){
    console.log(dato);
    
    if (dato==null) {
      return"No hay Datos"
      
    }
    return dato.docente

  }

  modalDocentes:boolean = false 
  showModalDocentes()
  {
    this.modalDocentes =true
  }

}
