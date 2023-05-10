import { Component, EventEmitter, Output } from '@angular/core';
import { MateriaService } from '../materia/materia.service';
import { CompetenciaService } from '../competencias/competencia.service';

@Component({
  selector: 'app-asignatura-competencia',
  templateUrl: './asignatura-competencia.component.html',
  styleUrls: ['./asignatura-competencia.component.css']
})
export class AsignaturaCompetenciaComponent {
  @Output() newItemEvent = new EventEmitter<string>();
  guardar() {
    console.log(this.targetCompetencia);
  }
  constructor (
    private asicomservice : MateriaService,
    private comptenciaService:CompetenciaService
  ){}

  cargarCompetencias(){
    this.comptenciaService.getCompetencias().subscribe(res=>{
      console.log(res);

      this.sourceCompetencia = res
    })
  }
  ngOnInit(): void {
    this.cargarCompetencias()
    this.targetCompetencia = [];
  }
  title = 'primeng-pruebas';
  sourceCompetencia!: any[];

  targetCompetencia!: any[];
}
