import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Product } from './Product';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MateriaService } from './materia.service';
import { Asingatura, relacionCompetencia } from './inteface-materia';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CompetenciaService } from '../competencias/competencia.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class MateriaComponent implements OnInit, OnDestroy {
reporteCalificaciones(_t232: any) {
  console.log(_t232);
  
    var done: any = [];

    _t232.calificacion.forEach(function (object:any) {
        done.push([
          object.id,
          object.estudiante.iduser.nombres,
          object.estudiante.iduser.apellidoPaterno,
          object.estudiante.iduser.apellidoMaterno,
          object.estudiante.iduser.ci ,
          object.calificacionObtenida,
          new Date(object.createdAt).toLocaleDateString()
        ]);
      });
    

    const doc = new jsPDF({
      format: 'letter',
    });
    doc.addImage('../../assets/images/encabezado.png', 'PNG', 0, -10, 210, 55);
    doc.setFont('helvetica', 'bold');
    doc.text('REPORTE DE CALIFICACION', 70, 35);
    // doc.autoPrint({ variant: 'non-conform' });

    autoTable(doc, {
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0], font: 'helvetica', fontSize: 8 ,halign:'center'},
      bodyStyles: { font: 'helvetica', fontSize: 8 },
      startY: 45,
      tableWidth: 'auto',
      head: [
        [
          'id',
          'Nombres',
          'Apellido Paterno',
          'Apellido Materno',
          'C.I.',
          'Calificacion',
          'Fecha',
        ],
      ],
      body: done,
    });
    window.open(doc.output('bloburi'),'_blank')
    // doc.save()
  
}
mayorpuntaje(_t230: any) {
console.log(_t230);
this.mayor = _t230.puntaje
}
  dialogCalificaciones: boolean;
  calificacion :any = []
  mayor:number = 0
modalCalificaciones(dato : any) {
 this.dialogCalificaciones = true
 
 console.log(dato.id);
 this.materiaService.calificacionasignatura(dato.id).subscribe(res=>{
  console.log(res);
  this.calificacion=res
 })
}
  loading: boolean = true;
  guardarRelacion($event: Event) {
    throw new Error('Method not implemented.');
  }
  asociarCompetencia(dato: any) {
    this.relacionDialog = true;
    this.idAsignatura = dato.id;
    console.log(this.idAsignatura);
    this.cargarCompetencias();
  }
  subscription: Subscription;
  public asignatura: any = [];
  datos!: Asingatura[];
  dato!: Asingatura;
  datosedit!: Asingatura;
  productDialog!: boolean;
  idAsignatura: number;
  products!: Product[];

  product!: Product;

  selectedProducts!: any;

  submitted!: boolean;
  relacionDialog!: boolean;
  statuses!: any[];
  prerequisitos: any;
  asignaturaForm!: FormGroup;
  selectedPrerequisitos: any;
  inventoryStatus!: any;
  cols: { field: string; header: string }[];
  selectedDocente: any;
  listadocentes: any;
  tituloModal = 'Asignatura';
  editar: boolean = false;
  sourceCompetencia!: any[];

  targetCompetencia!: any[];
  datoFiltro: string;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private materiaService: MateriaService,
    private fb: FormBuilder,
    private competenciaService: CompetenciaService
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log('suscripcion destuida');
    
  }

  ngOnInit(): void {
    this.asignaturaForm = this.initForm();

    this.cargarDatos();
    this.cargarDocente();
    this.subscription = this.materiaService.refresh$.subscribe(() => {
      this.cargarDatos();
    });

    this.targetCompetencia = [];
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
  guardarRelacionCompetencia() {
    console.log(this.idAsignatura);

    this.relacionDialog = false;
    console.log(this.targetCompetencia);

    this.targetCompetencia;
    for (let i = 0; i < this.targetCompetencia.length; i++) {
      console.log(this.targetCompetencia[i].id);
      var relaciones: relacionCompetencia = {
        asignaturaId: this.idAsignatura,
        competenciaId: this.targetCompetencia[i].id,
      };
      this.materiaService
        .relacionMateriaCompetencia(relaciones)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
  async cargarCompetencias() {
    this.materiaService.getRelacionMateriaCompetencia(this.idAsignatura).subscribe((res:any)=>{
      console.log(res);
      
      this.targetCompetencia = res.competenciasAsignadas
      this.sourceCompetencia = res.competenciasNoAsignadas
    })
  }
  initForm(): FormGroup {
    return this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.minLength(7)]],
      siglaCodigo: [, [Validators.required]],
      cargaHoraria: [, [Validators.required]],
      nMeses: [, [Validators.required]],
      paralelo: ['', [Validators.required]],
      docente: ['', [Validators.required]],
    });
  }
  cargarDatos() {
    this.materiaService.getMarteria().subscribe((respuesta: Asingatura[]) => {
      this.datos = respuesta;
      // console.log('cargando tabla');
      // setTimeout(() => {
        
      // }, 5000);
      this.loading = false
    });
  }
  nuevoAsignatura() {
    this.editar = false;
    this.asignaturaForm = this.initForm();
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }
  cargarDocente() {
    this.materiaService.getDocenteNombre().subscribe((res) => {
      this.listadocentes = res;
      console.log('cargando docentes');
    });
  }
  deleteSelectedAsignatura() {
    // console.log(this.selectedProducts[0].id);
    // for (let i = 0; i < this.selectedProducts.length; i++) {
    //   materiaBorrar.push(this.selectedProducts[i].id);
    //   console.log(materiaBorrar);
    // }
    this.confirmationService.confirm({
      message:
        '¿Está seguro de que desea eliminar las asignatura selecionadas?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle text-orange-500',
      accept: () => {
        const materiaBorrar: [] = [];

        for (let i = 0; i < this.selectedProducts.length; i++) {
          this.materiaService
            .deleteMateria(this.selectedProducts[i].id)
            .subscribe((res) => {
              console.log(res);
            });
        }
        // this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Operacion Realizada',
          detail: 'Eliminado con exito',
          life: 3000,
        });
      },
    });
  }
  hideDialog() {
    this.productDialog = false;
  }
  guardarAsignatura() {
    const newAsignatura = this.asignaturaForm.value;
    delete newAsignatura.id;
    this.materiaService.postMateria(newAsignatura).subscribe((res) => {
      console.log(res);
      this.hideDialog();
    });
  }
  editMateria(dato: any) {
    console.log(dato);
    this.asignatura = this.dato;
    this.asignaturaForm.setValue({
      id: dato.id,
      nombre: dato.nombre,
      siglaCodigo: dato.siglaCodigo,
      cargaHoraria: dato.cargaHoraria,
      nMeses: dato.nMeses,
      paralelo: dato.paralelo,
      docente: this.isnullid(dato),
    });
    this.editar = true;
    this.productDialog = true;
  }
  guardarEditarMateria(asignatura: any) {
    console.log(asignatura);
    const id = asignatura.id;
    delete asignatura.id;
    console.log(id, '*', asignatura);

    this.materiaService.updatedaMateria(id, asignatura).subscribe((res) => {
      this.hideDialog();
      this.messageService.add({
        severity: 'success',
        summary: 'Operacion Realizada',
        detail: 'Eliminado con exito',
        life: 3000,
      });
    });
  }
  isnull(dato: any) {
    if (dato == null) {
      return 'Docente no registrado';
    }
    return dato.iduser.nombres;
  }
  isnullid(dato: any) {
    if (dato.docente == null) {
      console.log('aqui');
      return '';
    }
    return dato.docente.id;
  }
}
