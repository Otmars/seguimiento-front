import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComestService {
  url = environment.url;
  private _refresh$ = new Subject<void>()
  constructor(private http : HttpClient) { }
  
  get refresh$(){
    return this._refresh$
  }

  getCompetencias():Observable<any[]>{
    return this.http.get<any[]>(this.url+'estudiante/competencias');
  }

  getCompeteciasNoObtenidas(id:number):Observable<any[]>{
    return this.http.get<any[]>(this.url+'estudiante/nocompetencias/'+id);
  }
}
