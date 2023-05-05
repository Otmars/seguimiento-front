import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../estudiante/estudiante.service';

@Component({
  selector: 'app-detalle-asignatura',
  templateUrl: './detalle-asignatura.component.html',
  styleUrls: ['./detalle-asignatura.component.css']
})
export class DetalleAsignaturaComponent  implements OnInit{
 estudiantes :any
 layout: string = 'list';

  ngOnInit() {
    
    this.cargarDatos()
    
  }
  constructor (private estudianteService : EstudianteService){
  }
  cargarDatos(){
    this.estudianteService.getEstudiantes().subscribe(res=>{
      this.estudiantes = res
    })
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
}
