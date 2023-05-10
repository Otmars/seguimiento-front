import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asingatura } from './inteface-materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  url = environment.url;
  private _refresh$ = new Subject<void>()
  constructor(private http : HttpClient) { }
  
  get refresh$(){
    return this._refresh$
  }

  getMarteria():Observable<Asingatura[]>{
    return this.http.get<Asingatura[]>(this.url+'asignatura');
  }
  getDocenteNombre(){
    return this.http.get(this.url+"docente/nombre")
  }
  postMateria(body : any):Observable<any>{
    return this.http.post(this.url+"asignatura",body).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    )
  }

  deleteMateria(id:number):Observable<any>{
    return this.http.delete(this.url+"asignatura/"+id).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    )
  }

  updatedaMateria (id:number,body:any):Observable<any>{
    return this.http.patch(this.url+'asignatura/'+id,body)
  }

  relacionMateriaCompetencia (body:any):Observable<any>{
    return this.http.post(this.url+"asignatura/asicom",body).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    )
  }
  getRelacionMateriaCompetencia(id:number){
    return this.http.get(this.url+"asignatura/asicom/"+id)
  }

}
