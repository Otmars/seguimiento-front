import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleAsignaturaService {

  url = environment.url;
  private _refresh$ = new Subject<void>()
  constructor(private http : HttpClient) { }
  get refresh$(){
    return this._refresh$
  }
  getListaEstudiantes(id:number):Observable<any[]>{
    return this.http.get<any[]>(this.url+"asignatura/inscritos/"+id)
  }
  cargarCompetenciasmateria(id:number):Observable<any[]>{
    return this.http.get<any[]>(this.url+"asignatura/asicom/"+id)
  }
  cargarPracticas(id:number):Observable<any[]>{
    return this.http.get<any[]>(this.url+"calificacion/practicas/"+id)
  }
  cargarParciales(id:number):Observable<any[]>{
    return this.http.get<any[]>(this.url+"calificacion/parciales/"+id)
  }
  crearCalificacion(body : any){
    return this.http.post(this.url+"calificacion",body)
  }
}
