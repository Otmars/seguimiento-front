import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Product } from './Product';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MateriaService } from './materia.service';
import { Asingatura, relacionCompetencia } from './inteface-materia';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CompetenciaService } from '../competencias/competencia.service';
@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class MateriaComponent implements OnInit,OnDestroy {
guardarRelacion($event: Event) {
throw new Error('Method not implemented.');
}
asociarCompetencia(dato : any) {
  this.relacionDialog=true
  this.idAsignatura = dato.id
  console.log(this.idAsignatura);
  this.cargarCompetencias()
}
  subscription : Subscription
  public asignatura: any = [];
  datos!: Asingatura[];
  dato!: Asingatura;
  datosedit !: Asingatura;
  productDialog!: boolean;
  idAsignatura : number
  products!: Product[];

  product!: Product;

  selectedProducts!: any;

  submitted!: boolean;
  relacionDialog! : boolean 
  statuses!: any[];
  prerequisitos: any;
  asignaturaForm!: FormGroup;
  selectedPrerequisitos: any;
  inventoryStatus!: any;
  cols: { field: string; header: string }[];
  selectedDocente:any
  listadocentes:any
  tituloModal ="Asignatura"
  editar: boolean= false;
  sourceCompetencia!: any[];

  targetCompetencia!: any[];
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private materiaService: MateriaService,
    private fb:FormBuilder,
    private competenciaService:CompetenciaService
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log("suscripcion destuida");
    
  }

  ngOnInit(): void {
    this.asignaturaForm = this.initForm();

    this.cargarDatos();
    this.cargarDocente()
     this.subscription = this.materiaService.refresh$.subscribe(()=>{
      this.cargarDatos();
     })
     
     this.targetCompetencia = [];
  }
  guardarRelacionCompetencia(){
    console.log(this.idAsignatura);
    
    this.relacionDialog= false
    console.log(this.targetCompetencia);
    
    this.targetCompetencia
    for (let i = 0; i < this.targetCompetencia.length; i++) {
      console.log(this.targetCompetencia[i].id);
      var relaciones:relacionCompetencia = {
        asignaturaId : this.idAsignatura,
        competenciaId : this.targetCompetencia[i].id
      }
      this.materiaService.relacionMateriaCompetencia(relaciones).subscribe(res =>{
        console.log(res);
        
      })
    }
  }
  cargarCompetencias(){
    var reCompetencias: any = []
    var relacion : any=[]
    var competenciasrelacionadas : any= []
    this.competenciaService.getCompetencias().subscribe(res=>{
      console.log(res);
      
      reCompetencias = res
      
      this.materiaService.getRelacionMateriaCompetencia(this.idAsignatura).subscribe(ress => {
        console.log(ress);
        relacion = ress
        for (let i = 0; i < reCompetencias.length; i++) {
          for (let j = 0; j < relacion.length; j++) {
            
            
            if (reCompetencias[i].id == relacion[j].competenciaId) {
              console.log(reCompetencias[i].id, "------",relacion[j].competenciaId);
            console.log("hay");
            competenciasrelacionadas.push(reCompetencias[i])
            reCompetencias.splice(i, 1)
            console.log("----------",competenciasrelacionadas);
            console.log("----------", reCompetencias);
          }
          
            
          }
        }
        this.targetCompetencia = competenciasrelacionadas
        this.sourceCompetencia = reCompetencias
      })

      
    })
    
  }
  initForm(): FormGroup {
    return this.fb.group({
      id: [''],
      nombre:      ['',[Validators.required,Validators.minLength(7)]],
      siglaCodigo: [,[Validators.required,,Validators.minLength(7)]],
      cargaHoraria:[,[Validators.required]],
      nMeses:      [,[Validators.required]],
      paralelo:    ['',[Validators.required]],
      docente:    ['',[Validators.required]],
    });
  }
  cargarDatos() {
    this.materiaService.getMarteria().subscribe((respuesta: Asingatura[]) => {
      this.datos = respuesta;
      console.log("cargando tabla");
    });
  }
  nuevoAsignatura() {
    this.editar = false
    this.asignaturaForm = this.initForm();
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }
  cargarDocente(){
    this.materiaService.getDocenteNombre().subscribe(res =>{
      this.listadocentes = res
      console.log("cargando docentes");
      
    })
  }
  deleteSelectedAsignatura() {
    
    // console.log(this.selectedProducts[0].id);
    // for (let i = 0; i < this.selectedProducts.length; i++) {
    //   materiaBorrar.push(this.selectedProducts[i].id);
    //   console.log(materiaBorrar);
    // }
    this.confirmationService.confirm({
      message:
        '¿Está seguro de que desea eliminar las asignatura selecionadas seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle text-orange-500',
      accept: () => {
        const materiaBorrar: [] =[]
        
        for (let i = 0; i < this.selectedProducts.length; i++) {
          this.materiaService.deleteMateria(this.selectedProducts[i].id).subscribe(res=>{
            console.log(res);
          })
          
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
    
    const newAsignatura = this.asignaturaForm.value
    delete newAsignatura.id
    this.materiaService.postMateria(newAsignatura).subscribe(res =>{
      console.log(res);
      this.hideDialog()
    })

  }
  editMateria(dato:any){
    console.log(dato);
    this.asignatura= this.dato
    this.asignaturaForm.setValue({
      id: dato.id ,
      nombre:      dato.nombre,
      siglaCodigo: dato.siglaCodigo,
      cargaHoraria: dato.cargaHoraria,
      nMeses:     dato.nMeses,
      paralelo:   dato.paralelo,
      docente:   this.isnullid(dato),
    })
    this.editar = true
    this.productDialog = true;
  }
  guardarEditarMateria(asignatura:any ){
    console.log(asignatura);
    const id = asignatura.id
    delete asignatura.id
    console.log(id,"*",asignatura);
    
    this.materiaService.updatedaMateria(id,asignatura).subscribe(res=>{
      this.hideDialog()
      this.messageService.add({
        severity: 'success',
        summary: 'Operacion Realizada',
        detail: 'Eliminado con exito',
        life: 3000,
      });
    })
  }
  isnull(dato:any){
    if (dato == null) {
      return "Docente no registrado"
    }
    return dato.iduser.nombres
  }
  isnullid(dato:any){
    if (dato.docente == null) {
      console.log("aqui");
      return ""
    }
    return dato.docente.id
  }
}