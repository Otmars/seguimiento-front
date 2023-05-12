import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  url = environment.url;
  private _refresh$ = new Subject<void>()
  constructor(private http : HttpClient) { }
  get refresh$(){
    return this._refresh$
  }
  getDatos():Observable<any[]>{
    return this.http.get<any[]>(this.url+"estudiante/inscripcion")
  }
  inscribir(body: any):Observable<any>{
    return this.http.post<any>(this.url+"estudiante/inscripcion",body)
  }
  retirar(id:number){
    return this.http.delete(this.url+"estudiante/retirar/"+id)
  }
}
