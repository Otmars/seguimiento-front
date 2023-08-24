import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url = environment.url;
  constructor(private http : HttpClient) { }

  getMateriasInscritas(id:string):Observable<any[]>{
    return this.http.get<any[]>(this.url+"estudiante/inscripcion/"+id)
  }

  cargarCalificacionesEstudiante(id:string){
    return this.http.get(this.url+"calificacion/all_estudiante/"+id)
  }

  cargarCompetenciaEstudiantes(id:string){
    return this.http.get(this.url+"estudiante/competencia/"+id)
  }
}
