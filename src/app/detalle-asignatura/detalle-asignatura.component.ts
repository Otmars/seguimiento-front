import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../estudiante/estudiante.service';
import { DetalleAsignaturaService } from './detalle-asignatura.service';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-detalle-asignatura',
  templateUrl: './detalle-asignatura.component.html',
  styleUrls: ['./detalle-asignatura.component.css'],
})
export class DetalleAsignaturaComponent implements OnInit {
  estudiantes: any;
  layout: string = 'list';
  dialogCompetencia: boolean = false;
  id = this.route.snapshot.queryParams['id'];
  competenciaAsignatura: any = [];

  ngOnInit() {
    this.cargarDatos();
  }
  constructor(
    private detalleAsignaturaService: DetalleAsignaturaService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}
  cargarDatos() {
    console.log(this.id);

    this.detalleAsignaturaService
      .getListaEstudiantes(this.id)
      .subscribe((res) => {
        console.log(res);

        this.estudiantes = res;
      });
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
  getnombrecompleto(dato: any) {
    const nombreCompleto =
      dato.iduser.nombres +
      ' ' +
      dato.iduser.apellidoPaterno +
      ' ' +
      dato.iduser.apellidoMaterno;
    return nombreCompleto;
  }
  cargarCompetenciasmateria() {
    this.detalleAsignaturaService
      .cargarCompetenciasmateria(this.id)
      .subscribe((res) => {
        console.log(res);
        this.competenciaAsignatura = res;
      });
  }
  guardarComptencias() {
    throw new Error('Method not implemented.');
  }
  showCompetenciaDialog(dato: any) {
    this.cargarCompetenciasmateria();
    this.dialogCompetencia = true;
  }
}
