import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../estudiante/estudiante.service';
import { DetalleAsignaturaService } from './detalle-asignatura.service';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle-asignatura',
  templateUrl: './detalle-asignatura.component.html',
  styleUrls: ['./detalle-asignatura.component.css'],
})
export class DetalleAsignaturaComponent implements OnInit {
showParcialesDialog() {
this.dialogParcial = true
this.restoDeCalificacionParciales()
}
  messages: any;
  tiposCa: { name: string }[];
dialogParcial: boolean= false;

  showPracticasDialog() {
    this.dialogPractica = true;
    console.log(this.sumaParciales);
    
  }

  guardarParciales() {
    console.log(this.formCalificacionParciales.value);
    const objeto = {
      descripcion: this.formCalificacionParciales.value.descripcion,
      puntaje: this.formCalificacionParciales.value.puntaje,
      asignaturaId: parseInt(this.id),
      tipoCalificacion: "Parcial",
    };
    this.detalleAsignaturaService.crearCalificacion(objeto).subscribe((res) => {
      console.log(res);
    });
  }

  guardarPracticas() {
    console.log(this.formCalificacionPractica.value);
    const objeto = {
      descripcion: this.formCalificacionPractica.value.descripcion,
      puntaje: this.formCalificacionPractica.value.puntaje,
      asignaturaId: parseInt(this.id),
      tipoCalificacion: "Practica",
    };
    this.detalleAsignaturaService.crearCalificacion(objeto).subscribe((res) => {
      console.log(res);
    });
  }
  

  sumaPracticas: number = 0;
  sumaParciales: number = 0;
  
  
  cargarCalificaciones() {
    this.detalleAsignaturaService
      .cargarPracticas(this.id)
      .subscribe((res) => {
        console.log(res);
        this.listaCalificaciones = res;
        this.restoDeCalificacionPracticas();
      });
  }
  cargarCalificacionesParciales() {
    this.detalleAsignaturaService
      .cargarParciales(this.id)
      .subscribe((res) => {
        console.log(res);
        this.listaCalificacionesParciales = res;

      });
  }
  listaCalificaciones: any = [];
  listaCalificacionesParciales: any = [];
  estudiantes: any;
  layout: string = 'list';
  dialogCompetencia: boolean = false;
  id = this.route.snapshot.queryParams['id'];
  competenciaAsignatura: any = [];
  dialogPractica: boolean = false;

  ngOnInit() {
    this.cargarDatos();
    this.messages = [{ severity: 'error', summary: 'Campo Obligatorio' }];
    this.tiposCa = [
      { name: 'Practica' },
      { name: 'Parcial' },
      { name: 'Final' },
    ];
    this.cargarCalificaciones()
    this.cargarCalificacionesParciales()
    this.restoDeCalificacionParciales();
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
restoDeCalificacionPracticas() {
    for (let i = 0; i < this.listaCalificaciones.length; i++) {
        this.sumaPracticas =
          this.sumaPracticas + this.listaCalificaciones[i].puntaje;
    }
    console.log("-----",this.sumaPracticas);
  }

  restoDeCalificacionParciales(){
    for (let i = 0; i < this.listaCalificacionesParciales.length; i++) {
      this.sumaParciales =
        this.sumaParciales + this.listaCalificacionesParciales[i].puntaje;
  }
  console.log("+++++++",this.sumaParciales);
  }
  
  formCalificacionPractica = new FormGroup({
    descripcion: new FormControl('', [
      Validators.minLength(10),
      Validators.required,
    ]),
    puntaje: new FormControl(null, [Validators.max(35-this.sumaPracticas), Validators.required]),
    tipoCalificacion: new FormControl(''),
  });
  formCalificacionParciales = new FormGroup({
    descripcion: new FormControl('', [
      Validators.minLength(10),
      Validators.required,
    ]),
    puntaje: new FormControl(35-this.sumaParciales, [Validators.max(35-this.sumaParciales), Validators.required]),
    tipoCalificacion: new FormControl(''),
  });
}
