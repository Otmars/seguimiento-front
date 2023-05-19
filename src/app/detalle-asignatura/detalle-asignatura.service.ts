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

  datosAsignatura(id:number){
    return this.http.get(this.url+"asignatura/"+id)
  }

  cargarCalificacionesEstudiante(id:number,asignaturaId:any){
    return this.http.post(this.url+"calificacion/estudiante/"+id,asignaturaId)
  }
  calificado(id:number, calificacion:any){
    return this.http.post(this.url+"calificacion/calificacion-estudiante/"+id,calificacion)
  }

  getcompetenciasEstudiante(id:number){
    return this.http.get(this.url+"estudiante/competencia/"+id)
  }
  guardarComptenciaEstudiante(body:any){
    return this.http.post(this.url+"estudiante/competencia",body)
  }
}
