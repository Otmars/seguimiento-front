import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriasDocenteService {

  url = environment.url;

  constructor(private http : HttpClient) { }
  


  getMarteria(id : string):Observable<any>{
    return this.http.get(this.url+'asignatura/docasi/'+id);
  }
}
