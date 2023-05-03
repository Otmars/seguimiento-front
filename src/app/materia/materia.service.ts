import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asingatura } from './inteface-materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  url = environment.url;
  private _refresh$ = new Subject<void>()
  constructor(private http : HttpClient) { }
  


  getMarteria():Observable<Asingatura[]>{
    return this.http.get<Asingatura[]>(this.url+'asignatura');
  }
  getDocenteNombre(){
    return this.http.get(this.url+"docente/nombre")
  }
  postMateria(body : any){
    return this.http.post(this.url+"asignatura",body)
  }

  deleteMateria(id:number){
    return this.http.delete(this.url+"asignatura/"+id)
  }

}
