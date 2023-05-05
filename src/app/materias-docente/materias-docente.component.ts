import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriasDocenteService } from './materias-docente.service';
@Component({
  selector: 'app-materias-docente',
  templateUrl: './materias-docente.component.html',
  styleUrls: ['./materias-docente.component.css'],
})
export class MateriasDocenteComponent implements OnInit {
  order: string;
  materias: any= []
  constructor(private route: ActivatedRoute, private materiasDocenteService : MateriasDocenteService) {}
  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams['id']);
    this.cargarMateria()
  }

  cargarMateria(){
    this.materiasDocenteService.getMarteria(this.route.snapshot.queryParams['id']).subscribe(res=>{
      this.materias=res
      console.log(res);
      
    })
  }
}
