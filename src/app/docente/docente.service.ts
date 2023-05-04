import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Docente } from './docente-inteface';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  url = environment.url;
  private _refresh$ = new Subject<void>()
  constructor(private http : HttpClient) { }

  getDocentes():Observable<Docente[]>{
    return this.http.get<Docente[]>(this.url+"docente")
  }
  postDocente(body :any){
    return this.http.post(this.url+"user",body)
  }
  deleteDocente(id : number){
    return this.http.delete(this.url+"user/"+id)
  }
}
