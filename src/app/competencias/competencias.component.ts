import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Competencia } from './interface-competencia';
import { CompetenciaService } from './competencia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styleUrls: ['./competencias.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class CompetenciasComponent implements OnInit {
  
  tipoCompetencia = [
    { nombre: 'Macro Competencia' },
    { nombre: 'Competencia Generica'},
    { nombre: 'Competencia Especifica'}
  ];
  competemciaDialog!: boolean;
  competencias!: Competencia[];
  competencia!: Competencia;
  selectedComeptencia!: any
  display: boolean = false;
  formCompetencia!: FormGroup;
  editar:boolean = false
  subscription : Subscription
  datoFiltro: string;
  loading: boolean = true;
  showDialog() {
    this.display = true;
  }
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private competenciaService: CompetenciaService,
    private fb: FormBuilder
  ) {}
  getEventValue($event: any): string {
    return $event.target.value;
  }
  ngOnInit() {
    this.formCompetencia = this.initForm();
    this.subscription = this.competenciaService.refresh$.subscribe(()=>{
      this.cargarCompetencia();
     })
    this.cargarCompetencia();
  }

  cargarCompetencia() {
    this.competenciaService.getCompetencias().subscribe((res) => {
      this.competencias = res;
      this.loading = false
    });
  }

  hideDialog() {
    this.competemciaDialog = false;
  }
  initForm(): FormGroup {
    return this.fb.group({
      id: [''],
      descripcion: ['',[Validators.required]],
      tipoCompetencia: ['',[Validators.required]],
    });
  }
  editCompetencia(competencia: Competencia) {
    this.tituloModal="Editar Competencia"
    this.editar=true
    this.competemciaDialog = true

    
    this.formCompetencia.setValue({
      id:competencia.id,
      descripcion: competencia.descripcion ,
      tipoCompetencia: competencia.tipoCompetencia,
    })
  }
  deleteSelectedCompetencia() {
    this.confirmationService.confirm({
      message:
        '¿Está seguro de que desea eliminar las competencias selecionadas?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle text-orange-500',
      accept: () => {

        for (let i = 0; i < this.selectedComeptencia.length; i++) {
          this.competenciaService.deleteCompetencia(this.selectedComeptencia[i].id).subscribe(res=>{
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
  guardarEditarCompetencia() {
    const editarCompetencia= this.formCompetencia.value
    const idcompetencia = this.formCompetencia.value.id
    delete editarCompetencia.id
    this.competenciaService.editarCompetencia(idcompetencia,editarCompetencia).subscribe(res =>{
      this.messageService.add({
        severity: 'success',
        summary: 'Operacion Realizada',
        detail: 'Editado con exito',
        life: 3000,
      })
      this.hideDialog()
    })
  }
  nuevaCompentecia() {
    this.formCompetencia.reset()
    this.tituloModal = 'Crear Competencia';
    this.competencia = {};
    this.competemciaDialog = true;
  }
  tituloModal: string;

  guardarCompetencia() {
    const nuevaCompetencia = this.formCompetencia.value
    delete nuevaCompetencia.id
    this.competenciaService.postCompetencia(nuevaCompetencia).subscribe(res =>{
      this.messageService.add({
        severity: 'success',
        summary: 'Operacion Realizada',
        detail: 'Creado con exito',
        life: 3000,
      })
      this.hideDialog()
    })
  }
}