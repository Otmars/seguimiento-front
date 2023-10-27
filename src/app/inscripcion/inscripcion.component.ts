import { Component, OnInit } from '@angular/core';
import { InscripcionService } from './inscripcion.service';
import { EstudianteService } from '../estudiante/estudiante.service';
import { MateriaService } from '../materia/materia.service';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css'],
})
export class InscripcionComponent implements OnInit {
  retirarMateria(dato: any) {
    console.log('-------------', dato);

    const objetoEliminar = {
      asignaturaId: dato.asignaturaId,
      estudianteId: dato.estudianteId,
    };
    console.log(objetoEliminar);
    this.inscripcionService.retirar(dato.id).subscribe((res) => {});
  }
  estudiantes: any[];
  selectedEstudiante: any;

  inscribir() {
    console.log(this.targetAsignatura, this.selectedEstudiante);
    for (let i = 0; i < this.targetAsignatura.length; i++) {
      const objeto = {
        asignaturaId: this.targetAsignatura[i].id,
        estudianteId: this.selectedEstudiante.id,
        gestion: 2023,
      };
      console.log(objeto);

      this.inscripcionService.inscribir(objeto).subscribe((res) => {
        this.inscripcionDialog = false
        console.log(res);
      });
    }
  }
  datos: any = [];
  sourceAsignatura: any[];
  targetAsignatura: any[];
  inscripcionDialog: any;
  subscription: Subscription;
  datoFiltro: string;
  constructor(
    private inscripcionService: InscripcionService,
    private estudianteService: EstudianteService,
    private materiaService: MateriaService
  ) {}
  ngOnInit(): void {
    this.cargarDatos();
    this.subscription = this.inscripcionService.refresh$.subscribe(() => {
      this.cargarDatos();
    });
  }
  cargarDatos() {
    this.inscripcionService.getDatos().subscribe((res) => {
      console.log(res);
      this.datos = res;
      this.loading = false
    });
  }
  cargarEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe((res) => {
      this.estudiantes = res;
      console.log(res);
    });
  }
  cargarMaterias() {
    this.materiaService.getMarteria().subscribe((res) => {
      this.sourceAsignatura = res;
    });
  }
  showModalInscripcion() {
    this.inscripcionDialog = true;
    this.cargarEstudiantes();
    this.cargarMaterias();
    this.targetAsignatura = [];
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
  clear(table: Table) {
    this.datoFiltro = '';
    table.clear();
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
  
  loading: boolean = true;
}
