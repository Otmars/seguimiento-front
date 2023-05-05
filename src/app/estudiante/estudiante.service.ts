import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estudiante, User } from './estudiante-inteface';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  url = environment.url;
  private _refresh$ = new Subject<void>()
  constructor(private http : HttpClient) { }
  get refresh$(){
    return this._refresh$
  }
  getEstudiantes():Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(this.url+"estudiante")
  }
  postEstudiante(body :any){
    return this.http.post(this.url+"user",body).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    )
  }
  deleteEstudiante(id : number){
    return this.http.delete(this.url+"user/"+id).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    )
  }
  patchEstudiante(id:string, body : User ){
    return this.http.patch(this.url+"user/"+id,body).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    )
  }
}
