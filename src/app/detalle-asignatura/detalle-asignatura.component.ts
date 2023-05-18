import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../estudiante/estudiante.service';
import { DetalleAsignaturaService } from './detalle-asignatura.service';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-detalle-asignatura',
  templateUrl: './detalle-asignatura.component.html',
  styleUrls: ['./detalle-asignatura.component.css'],
})
export class DetalleAsignaturaComponent implements OnInit {
  sumaPracticas: number = 0;
  sumaParciales: number = 0;
  listaCalificaciones: any = [];
  listaCalificacionesParciales: any = [];
  estudiantes: any;
  layout: string = 'list';
  dialogCompetencia: boolean = false;
  id = this.route.snapshot.queryParams['id'];
  competenciaAsignatura: any = [];
  dialogPractica: boolean = false;
  tituloAsignatura :string
  showParcialesDialog() {
    this.dialogParcial = true;
    this.cargarCalificacionesParciales();

  }
  messages: any;
  tiposCa: { name: string }[];
  dialogParcial: boolean = false;

  showPracticasDialog() {
    this.dialogPractica = true;
    console.log(this.sumaParciales);
  }
  datosAsignatura :any = [] 
  
  guardarParciales() {
    console.log(this.formCalificacionParciales.value);
    const objeto = {
      descripcion: this.formCalificacionParciales.value.descripcion,
      puntaje: this.formCalificacionParciales.value.puntaje,
      asignaturaId: parseInt(this.id),
      tipoCalificacion: 'Parcial',
    };
    this.detalleAsignaturaService.crearCalificacion(objeto).subscribe((res) => {
      console.log(res);
    });
    this.dialogParcial = false
  }

  guardarPracticas() {
    console.log(this.formCalificacionPractica.value);
    const objeto = {
      descripcion: this.formCalificacionPractica.value.descripcion,
      puntaje: this.formCalificacionPractica.value.puntaje,
      asignaturaId: parseInt(this.id),
      tipoCalificacion: 'Practica',
    };
    this.detalleAsignaturaService.crearCalificacion(objeto).subscribe((res) => {
      console.log(res);
    });
    this.dialogPractica=false
  }

  cargarCalificaciones() {
    this.detalleAsignaturaService.cargarPracticas(this.id).subscribe((res) => {
      console.log(res);
      this.listaCalificaciones = res;
      for (let i = 0; i < this.listaCalificaciones.length; i++) {
        this.sumaPracticas =
          this.sumaPracticas + this.listaCalificaciones[i].puntaje;
      }
      this.formCalificacionPractica.controls.puntaje.setValidators([Validators.max(35-this.sumaPracticas)])
    });
  }
  cargarCalificacionesParciales() {
    this.detalleAsignaturaService.cargarParciales(this.id).subscribe((res) => {
      console.log(res);
      this.listaCalificacionesParciales = res;
      for (let i = 0; i < this.listaCalificacionesParciales.length; i++) {
        this.sumaParciales =
          this.sumaParciales + this.listaCalificacionesParciales[i].puntaje;
      }
      console.log(this.sumaParciales);
      this.formCalificacionParciales.controls.puntaje.setValidators([Validators.max(35-this.sumaParciales)])
    });
  }

  ngOnInit() {
    this.cargarDatosAsignatura();

    this.cargarDatos();
    this.messages = [{ severity: 'error', summary: 'Campo Obligatorio' }];
    this.tiposCa = [
      { name: 'Practica' },
      { name: 'Parcial' },
      { name: 'Final' },
    ];
    this.cargarCalificaciones();
    
  }
  constructor(
    private detalleAsignaturaService: DetalleAsignaturaService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private fb: FormBuilder
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
  
  cargarDatosAsignatura(){
    this.detalleAsignaturaService.datosAsignatura(this.id).subscribe(res=>{
      console.log(res);
      this.datosAsignatura = res
      this.tituloAsignatura = this.datosAsignatura[0].nombre
    })
  }
  
  formCalificacionPractica = new FormGroup({
    descripcion: new FormControl('', [
      Validators.minLength(10),
      Validators.required,
    ]),
    puntaje: new FormControl(null, [
      Validators.max(35 - this.sumaPracticas),
      Validators.required,
    ]),
    tipoCalificacion: new FormControl(''),
  });
  formCalificacionParciales = new FormGroup({
    descripcion: new FormControl('', [
      Validators.minLength(10),
      Validators.required,
    ]),
    puntaje: new FormControl(null, [
      Validators.max(35 - this.sumaParciales),
      Validators.required,
    ]),
    tipoCalificacion: new FormControl(''),
  });
}
