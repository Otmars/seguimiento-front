import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Competencia } from './interface-competencia';

@Injectable({
  providedIn: 'root'
})
export class CompetenciaService {

  url = environment.url;
  private _refresh$ = new Subject<void>()
  constructor(private http : HttpClient) { }
  
  get refresh$(){
    return this._refresh$
  }

  getCompetencias():Observable<Competencia[]>{
    return this.http.get<Competencia[]>(this.url+'competencia');
  }

  postCompetencia(body : Competencia):Observable<Competencia>{
    return this.http.post<Competencia>(this.url+"competencia",body)
  }
  deleteCompetencia(id:number){
    return this.http.delete(this.url+"competencia/"+id)
  }
  editarCompetencia (id : number, body : Competencia){
    return this,this.http.patch(this.url+"competencia/"+id,body)
  }
}
