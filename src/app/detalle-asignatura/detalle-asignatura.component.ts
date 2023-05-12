import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../estudiante/estudiante.service';
import { DetalleAsignaturaService } from './detalle-asignatura.service';
import { ActivatedRoute } from '@angular/router';
import { MenuItem,MessageService } from 'primeng/api';

@Component({
  selector: 'app-detalle-asignatura',
  templateUrl: './detalle-asignatura.component.html',
  styleUrls: ['./detalle-asignatura.component.css']
})
export class DetalleAsignaturaComponent  implements OnInit{
 estudiantes :any
 layout: string = 'list';
 items: MenuItem[];


  ngOnInit() {
    
    this.cargarDatos()
    this.items = this.items = [
      {
          icon: 'pi pi-pencil',
          command: () => {
              this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          }
      },
      {
          icon: 'pi pi-refresh',
          command: () => {
              this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
          }
      },
      {
          icon: 'pi pi-trash',
          command: () => {
              this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
          }
      },
      {
          icon: 'pi pi-upload',
          routerLink: ['/fileupload']
      },
      {
          icon: 'pi pi-external-link',
          target: '_blank',
          url: 'http://angular.io'
      }
  ];
  }
  constructor (private detalleAsignaturaService: DetalleAsignaturaService,private route: ActivatedRoute,private messageService: MessageService){
  }
  cargarDatos(){
    const id = this.route.snapshot.queryParams['id']
    
    this.detalleAsignaturaService.getListaEstudiantes(id).subscribe(res=>{
      console.log(res);
      
      this.estudiantes = res
    })
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
  getnombrecompleto(dato: any) {
    const nombreCompleto = dato.iduser.nombres +
      ' ' +
      dato.iduser.apellidoPaterno +
      ' ' +
      dato.iduser.apellidoMaterno;
    return nombreCompleto
  }
}
