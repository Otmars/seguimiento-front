import { Component, OnInit } from '@angular/core';
import { ComestService } from './comest.service';

@Component({
  selector: 'app-competencias-estudiantes',
  templateUrl: './competencias-estudiantes.component.html',
  styleUrls: ['./competencias-estudiantes.component.css'],
})
export class CompetenciasEstudiantesComponent implements OnInit {
  representatives: { name: string; image: string }[];
  constructor(private comestService: ComestService) {}
  ngOnInit(): void {
    this.cargarDatos();
    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' },
    ];
    
    
  }
  datos: any={};
  cargarDatos() {
    this.comestService.getCompetencias().subscribe((res) => {
      console.log(res);
      this.datos = res
      console.log(this.datos.estudiantes[0]);
      ;
    });
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
}
